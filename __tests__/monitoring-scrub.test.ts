import { describe, it, expect, vi, afterEach } from "vitest";
import { scrubEvent, redactText } from "@/lib/monitoring/scrub";

// Prepared monitoring (13 Nov 2026): off without SENTRY_DSN; personal data never sent.
describe("monitoring scrubber", () => {
  it("redacts emails and phone numbers in text", () => {
    expect(redactText("Write to priya@example.in or call +91 98765 43210")).toBe("Write to [email] or call [number]");
    expect(redactText("RequestID 3f2a-1 failed at stage durable_acceptance")).toBe("RequestID 3f2a-1 failed at stage durable_acceptance");
  });

  it("drops request bodies, cookies, query strings, user and unsafe headers; keeps tags and requestId", () => {
    const event = scrubEvent({
      message: "failed for priya@example.in",
      user: { email: "priya@example.in", ip_address: "1.2.3.4" },
      breadcrumbs: [{ message: "x" }],
      request: {
        data: { message: "Catering for 40", email: "priya@example.in" },
        cookies: { a: "b" },
        query_string: "email=priya@example.in",
        url: "https://ycnlabs.com/api/contact?email=priya@example.in",
        headers: { "content-type": "application/json", "x-forwarded-for": "1.2.3.4", cookie: "a=b" },
      },
      extra: { requestId: "req-1", note: { phone: "9876543210" } },
      exception: { values: [{ value: "insert failed for priya@example.in" }] },
      tags: { route: "/api/contact" },
    });
    expect(event.user).toBeUndefined();
    expect(event.breadcrumbs).toBeUndefined();
    expect(event.request).toEqual({ url: "https://ycnlabs.com/api/contact", headers: { "content-type": "application/json" } });
    expect(event.message).toBe("failed for [email]");
    expect(event.extra).toEqual({ requestId: "req-1", note: { phone: "[number]" } });
    expect(event.exception?.values?.[0].value).toBe("insert failed for [email]");
    expect(event.tags).toEqual({ route: "/api/contact" });
  });
});

describe("instrumentation", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    vi.doUnmock("@sentry/nextjs");
  });

  it("does not start Sentry without SENTRY_DSN", async () => {
    const init = vi.fn();
    vi.doMock("@sentry/nextjs", () => ({ init }));
    vi.stubEnv("SENTRY_DSN", "");
    vi.stubEnv("NEXT_RUNTIME", "nodejs");
    const { register } = await import("@/instrumentation");
    await register();
    expect(init).not.toHaveBeenCalled();
  });

  it("starts Sentry with no PII, no tracing and the scrubber when SENTRY_DSN is set", async () => {
    const init = vi.fn();
    vi.doMock("@sentry/nextjs", () => ({ init }));
    vi.stubEnv("SENTRY_DSN", "https://public@example.ingest.sentry.io/1");
    vi.stubEnv("NEXT_RUNTIME", "nodejs");
    const { register } = await import("@/instrumentation");
    await register();
    expect(init).toHaveBeenCalledTimes(1);
    const opts = init.mock.calls[0][0];
    expect(opts.sendDefaultPii).toBe(false);
    expect(opts.tracesSampleRate).toBe(0);
    expect(opts.beforeSend({ message: "a@b.co" }).message).toBe("[email]");
  });
});
