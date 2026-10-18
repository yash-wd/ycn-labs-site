import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock DB
const mockInsert = vi.fn();
const mockInsertValues = vi.fn();
const mockInsertReturning = vi.fn();
const mockOnConflictDoNothing = vi.fn().mockReturnValue({ returning: mockInsertReturning });
mockInsert.mockReturnValue({ values: mockInsertValues });
mockInsertValues.mockReturnValue({ onConflictDoNothing: mockOnConflictDoNothing, returning: mockInsertReturning });

const mockUpdate = vi.fn();
const mockSet = vi.fn();
const mockUpdateWhere = vi.fn();
mockUpdate.mockReturnValue({ set: mockSet });
mockSet.mockReturnValue({ where: mockUpdateWhere });
mockUpdateWhere.mockResolvedValue({ rowCount: 1 });

const mockSelect = vi.fn();
const mockFrom = vi.fn();
const mockSelectWhere = vi.fn();
const mockLimit = vi.fn();
mockSelect.mockReturnValue({ from: mockFrom });
mockFrom.mockReturnValue({ where: mockSelectWhere });
mockSelectWhere.mockReturnValue({ limit: mockLimit });
mockLimit.mockResolvedValue([]);

const mockDelete = vi.fn();
const mockDeleteWhere = vi.fn();
const mockReturning = vi.fn();
mockDelete.mockReturnValue({ where: mockDeleteWhere });
mockDeleteWhere.mockReturnValue({ returning: mockReturning });
mockReturning.mockResolvedValue([{ id: 1 }]);

vi.mock("@/lib/db/db", () => ({
  db: {
    insert: (...args: any[]) => mockInsert(...args),
    update: (...args: any[]) => mockUpdate(...args),
    select: (...args: any[]) => mockSelect(...args),
    delete: (...args: any[]) => mockDelete(...args),
  },
}));

// Mock Security & Ratelimit
const mockCheckRateLimit = vi.fn();
const mockIsDuplicateSubmission = vi.fn();
const mockReserveDuplicateKey = vi.fn();

vi.mock("@/lib/security/ratelimit", () => ({
  checkRateLimit: (...args: any[]) => mockCheckRateLimit(...args),
  isDuplicateSubmission: (...args: any[]) => mockIsDuplicateSubmission(...args),
  reserveDuplicateKey: (...args: any[]) => mockReserveDuplicateKey(...args),
  hashClientIp: (req: Request) => "mock_hashed_ip_123",
}));

// Mock Resend
const mockSendEmail = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: (...args: any[]) => mockSendEmail(...args),
    };
  },
}));

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

import { POST } from "@/app/api/contact/route";
import {
  retryLeadNotification,
  getPendingOrFailedLeads,
  deleteLeadByEmail,
  deleteLeadById,
  purgeLeadsOlderThan,
} from "@/lib/db/recovery";
import { sanitizeNotificationError } from "@/lib/security/sanitize";
import crypto from "crypto";

describe("Phase 7: Contact / Enquiry Backend Hardening", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.LEAD_DESTINATION_EMAIL = "hello@ycnlabs.com";

    mockCheckRateLimit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      resetSeconds: 3600,
    });
    mockIsDuplicateSubmission.mockResolvedValue(false);
    mockReserveDuplicateKey.mockResolvedValue(undefined);
    mockInsertReturning.mockResolvedValue([{ id: 1, leadId: "lead_test_phase7" }]);
    mockInsertValues.mockReturnValue({ onConflictDoNothing: mockOnConflictDoNothing, returning: mockInsertReturning });
    mockUpdateWhere.mockResolvedValue({ rowCount: 1 });
    mockSendEmail.mockResolvedValue({ data: { id: "email_ok_1" }, error: null });
  });

  const validEnquiry = {
    name: "Sarah Jenkins",
    email: "sarah@acme-logistics.co.uk",
    company: "Acme Logistics",
    projectType: "Business systems & automation",
    budget: "£15,000 – £30,000",
    timeline: "1 – 3 months",
    preferredContactMethod: "Email",
    message: "Our warehouse dispatch tracking requires a bespoke mobile tool.",
  };

  describe("1. Validation & Input Sanitization", () => {
    it("accepts valid enquiry and trims whitespace", async () => {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validEnquiry),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.message).toBe("We received your request.");
      expect(json.data.accepted).toBe(true);
      expect(json.data.leadId).toMatch(/^lead_/);

      expect(mockInsert).toHaveBeenCalledTimes(1);
    });

    it("rejects whitespace-only message (< 10 chars after trimming)", async () => {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validEnquiry,
          message: "          ",
        }),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("INVALID_INPUT");
      expect(mockInsert).not.toHaveBeenCalled();
    });

    it("rejects invalid email formats", async () => {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validEnquiry,
          email: "invalid-email-address",
        }),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error.code).toBe("INVALID_INPUT");
      expect(mockInsert).not.toHaveBeenCalled();
    });

    it("rejects payload exceeding 64KB size limit", async () => {
      const largeMessage = "A".repeat(70 * 1024);
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": String(largeMessage.length),
        },
        body: JSON.stringify({
          ...validEnquiry,
          message: largeMessage,
        }),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(413);
      expect(json.error.code).toBe("PAYLOAD_TOO_LARGE");
      expect(mockInsert).not.toHaveBeenCalled();
    });

    it("rejects unsupported media type (non-JSON)", async () => {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "name=Sarah",
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(415);
      expect(json.error.code).toBe("UNSUPPORTED_MEDIA");
      expect(mockInsert).not.toHaveBeenCalled();
    });

    it("handles honeypot silently without database insertion", async () => {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validEnquiry,
          honeypot: "spam_bot_data",
        }),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.processed).toBe(true);
      expect(json.data.accepted).toBe(false);
      expect(mockInsert).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });
  });

  describe("2. Durable Acceptance & Storage Failure Boundaries", () => {
    it("returns 503 temporary failure and NO false success when database insert fails", async () => {
      mockInsertValues.mockRejectedValueOnce(new Error("Connection terminated unexpectedly"));

      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validEnquiry),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(503);
      expect(json.success).toBe(false);
      expect(json.error.code).toBe("SERVICE_UNAVAILABLE");
      expect(json.error.message).toBe(
        "We could not accept your request safely. Your message has not been confirmed—please try again or use the listed contact route."
      );
      // Dedupe key MUST NOT be reserved, allowing retry
      expect(mockReserveDuplicateKey).not.toHaveBeenCalled();
      // Operator notification MUST NOT be called
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("persists lead upon successful database insertion", async () => {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validEnquiry),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);

      expect(mockInsert).toHaveBeenCalledTimes(1);
    });
  });

  describe("3. Notification Failure & Recovery Isolation", () => {
    it("preserves accepted lead in DB and returns 200 when Resend email throws", async () => {
      mockSendEmail.mockRejectedValueOnce(new Error("Resend rate limit exceeded"));

      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validEnquiry),
      });

      const res = await POST(req);
      const json = await res.json();

      // Lead is still accepted and recorded
      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.accepted).toBe(true);
      expect(json.data.message).toBe("We received your request.");
      expect(mockInsert).toHaveBeenCalledTimes(1);

      // Status marked failed for operator recovery
      expect(mockUpdate).toHaveBeenCalled();
    });

    it("preserves accepted lead in DB and records failure when Resend returns error object", async () => {
      mockSendEmail.mockResolvedValueOnce({
        data: null,
        error: { message: "Domain unverified" },
      });

      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validEnquiry),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.data.accepted).toBe(true);
      expect(mockInsert).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalled();
    });

    it("sanitizes raw provider errors to bounded non-PII error categories", async () => {
      mockSendEmail.mockResolvedValueOnce({
        data: null,
        error: { message: "Failed to send to user@confidential.com with token tok_secret_999: domain unverified" },
      });

      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validEnquiry),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);

      expect(mockSet).toHaveBeenCalledWith(
        expect.objectContaining({
          notificationStatus: "failed",
          lastNotificationError: "SENDER_DOMAIN_UNVERIFIED",
        })
      );
    });

    it("sanitizeNotificationError unit test strips PII and tokens into safe operational codes", () => {
      expect(sanitizeNotificationError("Rate limit exceeded 429")).toBe("RATE_LIMIT_EXCEEDED");
      expect(sanitizeNotificationError("Network timeout connecting to provider")).toBe("NETWORK_TIMEOUT");
      expect(sanitizeNotificationError("Invalid api_key sk_live_123456789")).toBe("PROVIDER_AUTH_ERROR");
      expect(sanitizeNotificationError("Sender from domain unverified")).toBe("SENDER_DOMAIN_UNVERIFIED");
      expect(sanitizeNotificationError("Arbitrary exception with email private@example.com")).toBe("NOTIFICATION_DISPATCH_FAILED");
    });
  });

  describe("4. Recovery Functions & Data Operations", () => {
    it("retryLeadNotification successfully delivers and updates notification status to sent", async () => {
      const testLead = {
        id: 42,
        leadId: "lead_test_retry_1",
        name: "Marcus Aurelius",
        email: "marcus@rome.com",
        company: "Empire",
        projectType: "Custom software",
        budget: "£30,000+",
        timeline: "Flexible",
        preferredContactMethod: "Email",
        message: "Building a philosophy library management system.",
        status: "accepted",
        notificationStatus: "failed",
        notificationAttempts: 1,
        lastNotificationError: "Network timeout",
        createdAt: new Date(),
      };

      mockLimit.mockResolvedValueOnce([testLead]);
      mockSendEmail.mockResolvedValueOnce({ data: { id: "resend_retry_ok" }, error: null });

      const result = await retryLeadNotification("lead_test_retry_1");

      expect(result.success).toBe(true);
      expect(result.leadId).toBe("lead_test_retry_1");
      expect(mockSendEmail).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalled();
    });

    it("retryLeadNotification avoids resending if lead was already sent", async () => {
      const testLead = {
        id: 43,
        leadId: "lead_already_sent",
        notificationStatus: "sent",
        name: "Test",
        email: "test@example.com",
        notificationAttempts: 1,
      };

      mockLimit.mockResolvedValueOnce([testLead]);

      const result = await retryLeadNotification("lead_already_sent");

      expect(result.success).toBe(true);
      expect(result.alreadySent).toBe(true);
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("getPendingOrFailedLeads queries undelivered leads", async () => {
      mockLimit.mockResolvedValueOnce([
        { leadId: "lead_fail_1", notificationStatus: "failed" },
        { leadId: "lead_pend_2", notificationStatus: "pending" },
      ]);

      const list = await getPendingOrFailedLeads(10);
      expect(list.length).toBe(2);
      expect(list[0].leadId).toBe("lead_fail_1");
    });

    it("deleteLeadByEmail removes data subjects records cleanly", async () => {
      mockReturning.mockResolvedValueOnce([{ id: 1 }, { id: 2 }]);

      const result = await deleteLeadByEmail("user@example.com");

      expect(result.success).toBe(true);
      expect(result.deletedCount).toBe(2);
      expect(mockDelete).toHaveBeenCalled();
    });

    it("deleteLeadById deletes specific lead by ID", async () => {
      const result = await deleteLeadById("lead_123");
      expect(result.success).toBe(true);
      expect(mockDelete).toHaveBeenCalled();
    });

    it("purgeLeadsOlderThan deletes records before cutoff date", async () => {
      mockReturning.mockResolvedValueOnce([{ id: 10 }]);
      const cutoff = new Date(Date.now() - 24 * 30 * 24 * 60 * 60 * 1000);

      const result = await purgeLeadsOlderThan(cutoff);
      expect(result.success).toBe(true);
      expect(result.deletedCount).toBe(1);
    });
  });

  describe("5. Deduplication & Idempotency", () => {
    it("recognizes duplicate submission and returns 200 without duplicate DB insert", async () => {
      mockInsertReturning.mockResolvedValueOnce([]);
      mockLimit.mockResolvedValueOnce([{ id: 42, leadId: "lead_orig_dup" }]);

      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validEnquiry),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.duplicate).toBe(true);
      expect(json.data.message).toBe("We received your request.");
      expect(json.data.leadId).toBe("lead_orig_dup");
      expect(mockSendEmail).not.toHaveBeenCalled();
    });
  });

  describe("6. Rate Limiting Protection", () => {
    it("returns 429 when rate limit is exceeded", async () => {
      mockCheckRateLimit.mockResolvedValueOnce({
        success: false,
        limit: 5,
        remaining: 0,
        resetSeconds: 60,
      });

      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validEnquiry),
      });

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(429);
      expect(json.error.code).toBe("RATE_LIMITED");
      expect(res.headers.get("Retry-After")).toBe("60");
      expect(mockInsert).not.toHaveBeenCalled();
    });
  });

  describe("7. Privacy-Safe Logging & No PII Leaks", () => {
    it("does not leak enquiry text, email, or full name into audit log output", async () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validEnquiry),
      });

      await POST(req);

      expect(consoleSpy).toHaveBeenCalled();
      const loggedJson = consoleSpy.mock.calls[0]?.[0];
      const parsed = JSON.parse(loggedJson);

      expect(parsed.route).toBe("/api/contact");
      expect(parsed.status).toBe(200);
      expect(parsed.leadId).toBeDefined();

      // PII verification:
      expect(loggedJson).not.toContain(validEnquiry.email);
      expect(loggedJson).not.toContain(validEnquiry.name);
      expect(loggedJson).not.toContain(validEnquiry.message);

      consoleSpy.mockRestore();
    });
  });
});
