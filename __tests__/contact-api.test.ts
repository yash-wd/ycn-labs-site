import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock database operations
const mockReturning = vi.fn();
const mockOnConflictDoNothing = vi.fn();
const mockValues = vi.fn();
const mockInsert = vi.fn();

const mockUpdateWhere = vi.fn();
const mockSet = vi.fn();
const mockUpdate = vi.fn();

const mockLimit = vi.fn();
const mockSelectWhere = vi.fn();
const mockFrom = vi.fn();
const mockSelect = vi.fn();

vi.mock("@/lib/db/db", () => ({
  db: {
    insert: (...args: any[]) => mockInsert(...args),
    update: (...args: any[]) => mockUpdate(...args),
    select: (...args: any[]) => mockSelect(...args),
  },
}));

const mockCheckRateLimit = vi.fn();

vi.mock("@/lib/security/ratelimit", () => ({
  checkRateLimit: (...args: any[]) => mockCheckRateLimit(...args),
}));

const mockSendEmail = vi.fn();
vi.mock("resend", () => {
  return {
    Resend: class {
      emails = {
        send: (...args: any[]) => mockSendEmail(...args),
      };
    },
  };
});

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

// Import route handler
import { POST } from "@/app/api/contact/route";

describe("Contact API Route Handler (/api/contact) - Task 12 Scenarios", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test_12345";
    process.env.LEAD_DESTINATION_EMAIL = "hello@ycnlabs.com";

    // Setup default healthy mocks
    mockCheckRateLimit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      resetSeconds: 3600,
    });

    mockInsert.mockReturnValue({ values: mockValues });
    mockValues.mockReturnValue({ onConflictDoNothing: mockOnConflictDoNothing });
    mockOnConflictDoNothing.mockReturnValue({ returning: mockReturning });
    mockReturning.mockResolvedValue([{ id: 1, leadId: "lead_test_123" }]);

    mockUpdate.mockReturnValue({ set: mockSet });
    mockSet.mockReturnValue({ where: mockUpdateWhere });
    mockUpdateWhere.mockResolvedValue({ rowCount: 1 });

    mockSelect.mockReturnValue({ from: mockFrom });
    mockFrom.mockReturnValue({ where: mockSelectWhere });
    mockSelectWhere.mockReturnValue({ limit: mockLimit });
    mockLimit.mockResolvedValue([]);

    mockSendEmail.mockResolvedValue({ data: { id: "email_123" }, error: null });
  });

  const validPayload = {
    name: "Alex Morgan",
    email: "alex@example.com",
    company: "Morgan Consulting",
    projectType: "Web applications & workflows",
    budget: "£5,000 – £15,000",
    timeline: "1 – 3 months",
    message: "We need a custom dispatch tool for our field engineers.",
    idempotencyKey: "11111111-2222-3333-4444-555555555555",
  };

  // Scenario 1: valid lead stored + email attempted
  it("Scenario 1: valid lead stored + email attempted returns 200", async () => {
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.accepted).toBe(true);
    expect(body.data.leadId).toBeDefined();
    expect(body.data.message).toBe("We received your request.");
    expect(body.data.acknowledgementSent).toBe(true);

    expect(mockInsert).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalled();
  });

  // Scenario 2: DB down → 503
  it("Scenario 2: DB down returns honest 503 and no email attempted", async () => {
    mockValues.mockImplementationOnce(() => {
      throw new Error("PostgreSQL connection timeout");
    });

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("SERVICE_UNAVAILABLE");
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  // Scenario 3: email fails after commit → 200 + lead kept + status failed
  it("Scenario 3: email fails after commit returns 200 with lead kept and notificationStatus failed", async () => {
    mockSendEmail.mockResolvedValue({
      data: null,
      error: { message: "Resend quota exceeded" },
    });

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.accepted).toBe(true);
    expect(body.data.leadId).toBeDefined();
    expect(body.data.acknowledgementSent).toBe(false);

    // Lead was kept in DB
    expect(mockInsert).toHaveBeenCalledTimes(1);

    // Status updated to failed
    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        notificationStatus: "failed",
      })
    );
  });

  // Scenario 4: same key twice → one row, same leadId, one email
  it("Scenario 4: same key twice results in one row, same leadId, and exactly one email", async () => {
    const fixedIdempotencyKey = "22222222-3333-4444-5555-666666666666";
    const payload = {
      ...validPayload,
      idempotencyKey: fixedIdempotencyKey,
    };

    // First request: inserts successfully and returns the lead row
    mockReturning.mockResolvedValueOnce([{ id: 10, leadId: "lead_first_call" }]);

    const request1 = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response1 = await POST(request1);
    const body1 = await response1.json();

    expect(response1.status).toBe(200);
    expect(body1.success).toBe(true);
    expect(body1.data.accepted).toBe(true);
    expect(body1.data.leadId).toBe("lead_first_call");
    const emailCallsAfterFirst = mockSendEmail.mock.calls.length;
    expect(emailCallsAfterFirst).toBeGreaterThan(0);

    // Second request: conflict on idempotency key, returns [] from insert
    mockReturning.mockResolvedValueOnce([]);
    mockLimit.mockResolvedValueOnce([{ id: 10, leadId: "lead_first_call" }]);

    const request2 = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response2 = await POST(request2);
    const body2 = await response2.json();

    expect(response2.status).toBe(200);
    expect(body2.success).toBe(true);
    expect(body2.data.accepted).toBe(true);
    expect(body2.data.leadId).toBe("lead_first_call");
    expect(body2.data.duplicate).toBe(true);

    // No second email sent!
    expect(mockSendEmail.mock.calls.length).toBe(emailCallsAfterFirst);
  });

  // Scenario 5: invalid payload → 400
  it("Scenario 5: invalid payload returns 400 and rejects without DB insert", async () => {
    const invalidPayload = {
      name: "A", // too short (<2 chars)
      email: "not-an-email",
      message: "Short", // too short (<10 chars)
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("INVALID_INPUT");
    expect(mockInsert).not.toHaveBeenCalled();
    expect(mockSendEmail).not.toHaveBeenCalled();
  });
});
