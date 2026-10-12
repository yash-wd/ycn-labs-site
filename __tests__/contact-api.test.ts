import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies before importing route
const mockInsert = vi.fn();
const mockValues = vi.fn();
mockInsert.mockReturnValue({ values: mockValues });

const mockUpdate = vi.fn();
const mockSet = vi.fn();
const mockWhere = vi.fn();
mockUpdate.mockReturnValue({ set: mockSet });
mockSet.mockReturnValue({ where: mockWhere });
mockWhere.mockResolvedValue({ rowCount: 1 });

vi.mock("@/lib/db/db", () => ({
  db: {
    insert: (...args: any[]) => mockInsert(...args),
    update: (...args: any[]) => mockUpdate(...args),
  },
}));

const mockCheckRateLimit = vi.fn();
const mockIsDuplicateSubmission = vi.fn();
const mockReserveDuplicateKey = vi.fn();

vi.mock("@/lib/security/ratelimit", () => ({
  checkRateLimit: (...args: any[]) => mockCheckRateLimit(...args),
  isDuplicateSubmission: (...args: any[]) => mockIsDuplicateSubmission(...args),
  reserveDuplicateKey: (...args: any[]) => mockReserveDuplicateKey(...args),
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

// Now import the route
import { POST } from "@/app/api/contact/route";

describe("Contact API Route Handler (/api/contact)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test_12345";
    process.env.LEAD_DESTINATION_EMAIL = "hello@ycnlabs.com";

    // Default healthy mocks
    mockCheckRateLimit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      resetSeconds: 3600,
    });
    mockIsDuplicateSubmission.mockResolvedValue(false);
    mockReserveDuplicateKey.mockResolvedValue(undefined);
    mockValues.mockResolvedValue({ rowCount: 1 });
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
  };

  // Test 1: Valid Submission
  it("1. Valid submission returns 200, inserts lead, and sends notification", async () => {
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.message).toBe("We received your request.");
    expect(body.data.acknowledgementSent).toBe(true);

    expect(mockInsert).toHaveBeenCalledTimes(1);
    expect(mockReserveDuplicateKey).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalled();
  });

  // Test 2: Invalid Input
  it("2. Invalid input returns 400 and rejects without DB insert", async () => {
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
    expect(mockReserveDuplicateKey).not.toHaveBeenCalled();
  });

  // Test 3: Rate Limiting
  it("3. Rate limited request returns 429 with Retry-After header", async () => {
    mockCheckRateLimit.mockResolvedValueOnce({
      success: false,
      limit: 5,
      remaining: 0,
      resetSeconds: 120,
    });

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error.code).toBe("RATE_LIMITED");
    expect(response.headers.get("Retry-After")).toBe("120");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  // Test 4: Duplicate Prevention
  it("4. Duplicate submission returns 200 silently without re-inserting into DB", async () => {
    mockIsDuplicateSubmission.mockResolvedValueOnce(true);

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.processed).toBe(true);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  // Test 5: DB Failure Then Retry
  it("5. DB failure returns 503 and does NOT reserve duplicate key, allowing subsequent retry", async () => {
    // First attempt: DB throws error
    mockValues.mockRejectedValueOnce(new Error("Connection timeout to PostgreSQL"));

    const request1 = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const response1 = await POST(request1);
    const body1 = await response1.json();

    expect(response1.status).toBe(503);
    expect(body1.error.code).toBe("SERVICE_UNAVAILABLE");
    // Duplicate key MUST NOT be reserved when DB fails!
    expect(mockReserveDuplicateKey).not.toHaveBeenCalled();

    // Second attempt: User retries, DB is healthy
    mockValues.mockResolvedValueOnce({ rowCount: 1 });

    const request2 = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const response2 = await POST(request2);
    const body2 = await response2.json();

    expect(response2.status).toBe(200);
    expect(body2.success).toBe(true);
    expect(mockReserveDuplicateKey).toHaveBeenCalledTimes(1);
  });

  // Test 6: Resend Email Error Handling
  it("6. Lead persists successfully even if Resend returns an error", async () => {
    // Resend returns an error object (e.g. rate limited or bad domain)
    mockSendEmail.mockResolvedValue({
      data: null,
      error: { message: "Resend daily sending quota exceeded" },
    });

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    // Lead was saved in DB!
    expect(mockInsert).toHaveBeenCalledTimes(1);
    expect(mockReserveDuplicateKey).toHaveBeenCalledTimes(1);

    // API still returns success to user, but acknowledgementSent is false
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.acknowledgementSent).toBe(false);
  });
});
