import { describe, it, expect, vi, afterEach } from "vitest";
import { allowListEvent, projectFile } from "@/lib/monitoring/scrub";

// Monitoring allow-list (GPT reviews of PR #33 + Owner choice, 13 Nov 2026). All data invented.
const NAME = "Sample Visitor";
const NAME1 = "SampleVisitor";
const TEXT = "Please rebuild my clinic website";
const EMAIL = "sample.visitor@example.in";
const PHONE = "9876543210";
const REQ = "3f2a9c1e-7b4d-4e8a-9f10-2c3d4e5f6a7b";
const SECRETS = [NAME, NAME1, "Sample", TEXT, "clinic", EMAIL, PHONE, "98765", "1.2.3.4", "a=b"];

function leakyEvent() {
  return {
    event_id: "0123456789abcdef0123456789abcdef",
    timestamp: 1763000000,
    level: "error",
    platform: "node",
    environment: "production",
    release: `ycn@${NAME1}-${PHONE}`,
    message: `Lead from ${NAME}: ${TEXT}`,
    logentry: { message: `${NAME} ${TEXT}` },
    user: { email: EMAIL, ip_address: "1.2.3.4", username: NAME },
    breadcrumbs: [{ message: `${NAME} submitted ${TEXT}` }],
    tags: { route: "/api/contact", stage: "durable_acceptance", category: "NETWORK_TIMEOUT", visitor: NAME, note: TEXT },
    extra: { requestId: REQ, name: NAME, payload: { message: TEXT, nested: { deeper: { email: EMAIL, phone: PHONE } } } },
    contexts: { lead: { name: NAME, message: TEXT } },
    request: {
      url: `https://ycnlabs.com/customers/${PHONE}?name=${encodeURIComponent(NAME)}`,
      method: "POST",
      data: { name: NAME, message: TEXT },
      headers: { "x-forwarded-for": "1.2.3.4", cookie: "a=b" },
      cookies: { a: "b" },
      query_string: `name=${NAME}`,
    },
    exception: {
      values: [{
        type: "PostgresError",
        value: `duplicate key value: (${NAME}, ${TEXT})`,
        mechanism: { type: "generic", handled: true, data: { leaked: TEXT } },
        stacktrace: {
          frames: [
            {
              filename: `/home/${NAME}/ycn-labs-site/.next/server/app/api/contact/route.js`,
              function: "POST", lineno: 158, colno: 9, in_app: true,
              vars: { name: NAME, message: TEXT }, context_line: `const msg = "${TEXT}";`, pre_context: [NAME],
            },
            { filename: `/home/${NAME1}/customers/${PHONE}/handler.ts`, function: "handler", lineno: 1 },
            { filename: `/srv/ycn/node_modules/postgres/lib/connection.js`, function: "Connection.query", lineno: 7 },
            { filename: `webpack://ycn/./lib/db/recovery.ts`, function: `${NAME1}Fn ${PHONE}`, lineno: 3 },
          ],
        },
      }],
    },
    sdk: { name: "sentry.javascript.nextjs", version: "10.74.0", integrations: [NAME] },
  };
}

describe("monitoring allow-list", () => {
  it("keeps exactly the listed fields", () => {
    expect(allowListEvent(leakyEvent())).toEqual({
      event_id: "0123456789abcdef0123456789abcdef",
      timestamp: 1763000000,
      level: "error",
      platform: "node",
      environment: "production",
      tags: { route: "/api/contact", stage: "durable_acceptance", category: "NETWORK_TIMEOUT" },
      extra: { requestId: REQ },
      exception: {
        values: [{
          type: "PostgresError",
          mechanism: { type: "generic", handled: true },
          stacktrace: {
            frames: [
              { filename: "app/api/contact/route.js", function: "POST", lineno: 158, colno: 9, in_app: true },
              { function: "handler", lineno: 1 },
              { function: "Connection.query", lineno: 7 },
              { filename: "lib/db/recovery.ts", lineno: 3 },
            ],
          },
        }],
      },
      sdk: { name: "sentry.javascript.nextjs", version: "10.74.0" },
    });
  });

  it("no name, enquiry text, email, phone number, IP or cookie survives anywhere", () => {
    const serialised = JSON.stringify(allowListEvent(leakyEvent()));
    for (const s of SECRETS) expect(serialised).not.toContain(s);
  });

  it("every remaining field rejects visitor-like values", () => {
    const out = allowListEvent({
      event_id: `${NAME1}${PHONE}`,
      level: NAME1,
      platform: NAME1,
      environment: `production-${PHONE}`,
      tags: { route: `/customers/${PHONE}`, stage: NAME1, category: TEXT },
      extra: { requestId: `${NAME1}-${PHONE}` },
      exception: { values: [{ type: `${NAME} Error`, mechanism: { type: NAME1 }, stacktrace: { frames: [{ filename: `app/${NAME}/x.ts`, function: TEXT, lineno: -1 }] } }] },
      sdk: { name: NAME1, version: PHONE },
    });
    expect(out).toEqual({ exception: { values: [{ type: "Error", stacktrace: { frames: [{}] } }] } });
  });

  it("project file names lose any machine-specific prefix; anything else is dropped", () => {
    expect(projectFile(`/home/${NAME}/site/app/api/contact/route.ts`)).toBe("app/api/contact/route.ts");
    expect(projectFile(`/home/app/${NAME}/app/x.ts`)).toBe("app/x.ts");
    expect(projectFile(`C:\\Users\\${NAME1}\\site\\components\\v3\\HeroV3.tsx`)).toBe("components/v3/HeroV3.tsx");
    expect(projectFile(`/home/${NAME1}/site/instrumentation.ts`)).toBe("instrumentation.ts");
    expect(projectFile(`/home/${NAME1}/customers/${PHONE}.ts`)).toBeUndefined();
    expect(projectFile("/x/node_modules/lib/a.js")).toBeUndefined();
    expect(projectFile("app/../../etc/passwd.js")).toBeUndefined();
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

  it("with SENTRY_DSN: no PII, no tracing, no breadcrumbs, every event through the allow-list", async () => {
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
    const sent = JSON.stringify(opts.beforeSend(leakyEvent()));
    for (const s of SECRETS) expect(sent).not.toContain(s);
  });
});
