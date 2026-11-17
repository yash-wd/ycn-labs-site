import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import ContactPage from "@/app/contact/page";

// Mock DB operations
const mockInsert = vi.fn();
const mockValues = vi.fn();
const mockOnConflictDoNothing = vi.fn();
const mockReturning = vi.fn();
const mockUpdate = vi.fn();
const mockSet = vi.fn();
const mockWhere = vi.fn();

vi.mock("@/lib/db/db", () => ({
  db: {
    insert: (...args: unknown[]) => mockInsert(...args),
    update: (...args: unknown[]) => mockUpdate(...args),
  },
}));

// Mock Security & Ratelimit
const mockCheckRateLimit = vi.fn();
vi.mock("@/lib/security/ratelimit", () => ({
  checkRateLimit: (...args: unknown[]) => mockCheckRateLimit(...args),
}));

// Mock Resend
const mockSendEmail = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: (...args: unknown[]) => mockSendEmail(...args),
    };
  },
}));

// Mock Sentry
vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

import { POST } from "@/app/api/contact/route";

function createValidRequest(): Request {
  const payload = {
    name: "Test Customer",
    email: "customer@example.com",
    company: "Test Co",
    projectType: "Build a product",
    budget: "Not sure yet",
    timeline: "Not sure yet",
    message: "What happens today:\nManual orders.\n\nWhat we want to change:\nAutomated portal.",
    honeypot: "",
    idempotencyKey: "123e4567-e89b-12d3-a456-426614174000",
  };

  return new Request("http://127.0.0.1:3005/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "198.51.100.1",
    },
    body: JSON.stringify(payload),
  });
}

describe("Staging Contact Isolation (Fail-Closed Non-Production Boundary)", () => {
  const originalSiteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const originalEnv = process.env.NEXT_PUBLIC_ENV;
  const originalResendKey = process.env.RESEND_API_KEY;
  const originalDestEmail = process.env.LEAD_DESTINATION_EMAIL;

  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.NEXT_PUBLIC_SITE_ENV;
    delete process.env.NEXT_PUBLIC_ENV;
    process.env.RESEND_API_KEY = "re_test_dummy";
    process.env.LEAD_DESTINATION_EMAIL = "hello@ycnlabs.com";

    // Setup mocks
    mockCheckRateLimit.mockResolvedValue({ success: true, limit: 5, remaining: 4, resetSeconds: 3600 });
    mockInsert.mockReturnValue({ values: mockValues });
    mockValues.mockReturnValue({ onConflictDoNothing: mockOnConflictDoNothing });
    mockOnConflictDoNothing.mockReturnValue({ returning: mockReturning });
    mockReturning.mockResolvedValue([{ leadId: "lead_test_01" }]);
    mockUpdate.mockReturnValue({ set: mockSet });
    mockSet.mockReturnValue({ where: mockWhere });
    mockWhere.mockResolvedValue([]);
    mockSendEmail.mockResolvedValue({ data: { id: "email_test_01" }, error: null });
  });

  afterEach(() => {
    if (originalSiteEnv !== undefined) {
      process.env.NEXT_PUBLIC_SITE_ENV = originalSiteEnv;
    } else {
      delete process.env.NEXT_PUBLIC_SITE_ENV;
    }
    if (originalEnv !== undefined) {
      process.env.NEXT_PUBLIC_ENV = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_ENV;
    }
    if (originalResendKey !== undefined) {
      process.env.RESEND_API_KEY = originalResendKey;
    }
    if (originalDestEmail !== undefined) {
      process.env.LEAD_DESTINATION_EMAIL = originalDestEmail;
    }
  });

  describe("Fail-Closed Boundary: Non-Production Environments Refuse Submissions", () => {
    it("1. Unset environment: refuses submissions with 503 and zero side-effects", async () => {
      delete process.env.NEXT_PUBLIC_SITE_ENV;
      delete process.env.NEXT_PUBLIC_ENV;

      const req = createValidRequest();
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(503);
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("SERVICE_UNAVAILABLE");
      expect(json.error.message).toBe("Preview only. Enquiries are switched off here, so nothing will be sent.");
      expect(json).not.toHaveProperty("data");
      expect(json).not.toHaveProperty("leadId");
      expect(json.error).not.toHaveProperty("accepted");

      // Verify zero side effects
      expect(mockInsert).not.toHaveBeenCalled();
      expect(mockCheckRateLimit).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("2. Explicit staging environment: refuses submissions with 503 and zero side-effects", async () => {
      process.env.NEXT_PUBLIC_SITE_ENV = "staging";

      const req = createValidRequest();
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(503);
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("SERVICE_UNAVAILABLE");
      expect(mockInsert).not.toHaveBeenCalled();
      expect(mockCheckRateLimit).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("3. Explicit preview environment: refuses submissions with 503", async () => {
      process.env.NEXT_PUBLIC_SITE_ENV = "preview";

      const req = createValidRequest();
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(503);
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("SERVICE_UNAVAILABLE");
      expect(mockInsert).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("4. Misspelled or unexpected non-production values fail closed", async () => {
      const nonProdValues = ["prod", "Production", "stg", "development", "local", "preview-123"];

      for (const val of nonProdValues) {
        process.env.NEXT_PUBLIC_SITE_ENV = val;
        const req = createValidRequest();
        const res = await POST(req);
        const json = await res.json();

        expect(res.status).toBe(503);
        expect(json.success).toBe(false);
        expect(json.error.code).toBe("SERVICE_UNAVAILABLE");
      }

      expect(mockInsert).not.toHaveBeenCalled();
      expect(mockCheckRateLimit).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("5. Response never claims durable acceptance or returns fake receipts in non-production", async () => {
      process.env.NEXT_PUBLIC_SITE_ENV = "staging";

      const req = createValidRequest();
      const res = await POST(req);
      const json = await res.json();

      expect(json.success).toBe(false);
      expect(json.accepted).toBeUndefined();
      expect(json?.data?.accepted).toBeUndefined();
      expect(json?.leadId).toBeUndefined();
    });

    it("6. Direct HTTP POST with arbitrary headers cannot bypass non-production refusal", async () => {
      process.env.NEXT_PUBLIC_SITE_ENV = "staging";

      const bypassAttempts: Record<string, string>[] = [
        { "x-bypass": "true" },
        { "x-preview-mode": "false" },
        { "authorization": "Bearer dummy" },
        { "cookie": "admin=1" },
      ];

      for (const headers of bypassAttempts) {
        const req = new Request("http://127.0.0.1:3005/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({ name: "Bypass", email: "test@example.com", message: "test message here" }),
        });

        const res = await POST(req);
        expect(res.status).toBe(503);
      }

      expect(mockInsert).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });
  });

  describe("Production Environment: Normal Verified Contract Preserved", () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_SITE_ENV = "production";
    });

    it("processes valid submission and returns durable acceptance", async () => {
      const req = createValidRequest();
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.accepted).toBe(true);
      expect(json.data.leadId).toBe("lead_test_01");

      expect(mockCheckRateLimit).toHaveBeenCalledTimes(1);
      expect(mockInsert).toHaveBeenCalledTimes(1);
      expect(mockSendEmail).toHaveBeenCalled();
    });

    it("rejects invalid payload with 400 without database write", async () => {
      const req = new Request("http://127.0.0.1:3005/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "A", email: "invalid" }),
      });

      const res = await POST(req);
      expect(res.status).toBe(400);

      expect(mockInsert).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });
  });

  describe("Environment Precedence & Staging Safeguards (NEXT_PUBLIC_SITE_ENV vs NEXT_PUBLIC_ENV)", () => {
    it("primary 'staging' with fallback 'production' remains in staging (primary precedence)", async () => {
      process.env.NEXT_PUBLIC_SITE_ENV = "staging";
      process.env.NEXT_PUBLIC_ENV = "production";

      const req = createValidRequest();
      const res = await POST(req);
      expect(res.status).toBe(503);
      const json = await res.json();
      expect(json.error.message).toBe("Preview only. Enquiries are switched off here, so nothing will be sent.");
    });

    it("both variables absent remains in staging (fail-safe inversion)", async () => {
      delete process.env.NEXT_PUBLIC_SITE_ENV;
      delete process.env.NEXT_PUBLIC_ENV;

      const req = createValidRequest();
      const res = await POST(req);
      expect(res.status).toBe(503);
    });

    it("primary absent with fallback 'production' activates production (documented fallback behavior)", async () => {
      delete process.env.NEXT_PUBLIC_SITE_ENV;
      process.env.NEXT_PUBLIC_ENV = "production";

      const req = createValidRequest();
      const res = await POST(req);
      expect(res.status).toBe(200);
    });
  });

  describe("Server-Rendered Initial HTML & No-JavaScript Form Safety", () => {
    it("in preview mode: initial SSR HTML renders approved notice and disabled button with POST method", () => {
      process.env.NEXT_PUBLIC_SITE_ENV = "staging";

      const html = renderToString(React.createElement(ContactPage));

      // Warning banner present verbatim
      expect(html).toContain("Preview only. Enquiries are switched off here, so nothing will be sent.");

      // Button is disabled with aria-disabled in initial HTML
      expect(html).toContain('disabled=""');
      expect(html).toContain('aria-disabled="true"');

      // Button text remains canonical "Send my enquiry"
      expect(html).toContain("Send my enquiry");

      // Form method is POST and action is # to prevent implicit GET URL data leakage
      expect(html).toContain('method="POST"');
      expect(html).toContain('action="#"');
    });

    it("in production mode: initial SSR HTML has disabled button until client hydration, with POST method", () => {
      process.env.NEXT_PUBLIC_SITE_ENV = "production";

      const html = renderToString(React.createElement(ContactPage));

      // Warning banner absent in production
      expect(html).not.toContain("Preview only. Enquiries are switched off here");

      // Initial SSR button starts disabled before hydration (pre-hydration safety)
      expect(html).toContain('disabled=""');
      expect(html).toContain('aria-disabled="true"');

      // Button text is canonical "Send my enquiry"
      expect(html).toContain("Send my enquiry");

      // Form method is POST and action is #
      expect(html).toContain('method="POST"');
      expect(html).toContain('action="#"');
    });
  });
});
