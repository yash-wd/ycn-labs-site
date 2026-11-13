import { describe, it, expect, vi, afterEach } from "vitest";
import { allowListEvent } from "@/lib/monitoring/scrub";

// Monitoring allow-list (GPT review of PR #33, 13 Nov 2026). All data below is invented.
const NAME = "Sample Visitor";
const TEXT = "Please rebuild my clinic website";
const EMAIL = "sample.visitor@example.in";
const PHONE = "+91 98765 43210";

function leakyEvent() {
  return {
    event_id: "abc123",
    timestamp: 1763000000,
    level: "error",
    platform: "node",
    environment: "production",
    message: `Lead from ${NAME}: ${TEXT}`,
    logentry: { message: `${NAME} ${TEXT}` },
    user: { email: EMAIL, ip_address: "1.2.3.4", username: NAME },
    breadcrumbs: [{ message: `${NAME} submitted ${TEXT}` }],
    tags: { route: "/api/contact", stage: "durable_acceptance", visitor: NAME, note: TEXT },
    extra: { requestId: "req-7f3a", name: NAME, payload: { message: TEXT, nested: { deeper: { email: EMAIL, phone: PHONE } } } },
    contexts: { lead: { name: NAME, message: TEXT }, runtime: { name: "node" } },
    request: {
      url: `https://ycnlabs.com/api/contact?name=${encodeURIComponent(NAME)}`,
      method: "POST",
      data: { name: NAME, message: TEXT },
      headers: { "content-type": "application/json", "x-forwarded-for": "1.2.3.4", cookie: "a=b" },
      cookies: { a: "b" },
      query_string: `name=${NAME}`,
    },
    exception: {
      values: [{
        type: "PostgresError",
        value: `duplicate key value: (${NAME}, ${TEXT})`,
        mechanism: { type: "generic", handled: true, data: { leaked: TEXT } },
        stacktrace: {
          frames: [{
            filename: "app/api/contact/route.ts",
            function: "POST",
            lineno: 158,
            colno: 9,
            in_app: true,
            vars: { name: NAME, message: TEXT },
            context_line: `const msg = "${TEXT}";`,
            pre_context: [NAME],
            post_context: [EMAIL],
          }],
        },
      }],
    },
    sdk: { name: "sentry.javascript.nextjs", version: "10.74.0", integrations: ["x"] },
  };
}

describe("monitoring allow-list", () => {
  it("keeps only safe diagnostic fields", () => {
    const out = allowListEvent(leakyEvent());
    expect(out).toEqual({
      event_id: "abc123",
      timestamp: 1763000000,
      level: "error",
      platform: "node",
      environment: "production",
      tags: { route: "/api/contact", stage: "durable_acceptance" },
      extra: { requestId: "req-7f3a" },
      exception: {
        values: [{
          type: "PostgresError",
          mechanism: { type: "generic", handled: true },
          stacktrace: { frames: [{ filename: "app/api/contact/route.ts", function: "POST", lineno: 158, colno: 9, in_app: true }] },
        }],
      },
      request: { url: "/api/contact", method: "POST" },
      sdk: { name: "sentry.javascript.nextjs", version: "10.74.0" },
    });
  });

  it("no name, enquiry text, email, phone, IP or cookie survives anywhere in the event", () => {
    const serialised = JSON.stringify(allowListEvent(leakyEvent()));
    for (const secret of [NAME, "Sample", TEXT, "clinic", EMAIL, "98765", "1.2.3.4", "a=b"]) {
      expect(serialised).not.toContain(secret);
    }
  });

  it("drops unsafe values even in allowed places", () => {
    const out = allowListEvent({
      tags: { route: `/api/contact ${TEXT}`, stage: "ok" },
      extra: { requestId: `${NAME} req` },
      exception: { values: [{ type: `${NAME} Error`, value: TEXT }] },
    });
    expect(out).toEqual({ tags: { stage: "ok" }, exception: { values: [{ type: "Error" }] } });
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

  it("with SENTRY_DSN: no PII, no tracing, no breadcrumbs, and every event goes through the allow-list", async () => {
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
    expect(opts.beforeBreadcrumb({ message: TEXT })).toBeNull();
    expect(JSON.stringify(opts.beforeSend(leakyEvent()))).not.toContain(NAME);
  });
});
