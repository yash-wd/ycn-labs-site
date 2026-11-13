// Monitoring allow-list (used as Sentry beforeSend). Built from GPT's reviews of PR #33 and the
// Owner's choice on 13 Nov 2026 to keep a trimmed code location. It builds a NEW event that
// carries only these fields, each from a fixed list or a strict format:
//
//   level, platform           fixed lists
//   environment               fixed list (production, preview, staging, development)
//   event_id, timestamp       Sentry's own id (32 hex) and a number
//   tags.route                "/api/contact"
//   tags.stage                the six stage names used in app/api/contact/route.ts
//   tags.category             the six notification error categories (sanitizeNotificationError)
//   extra.requestId           a server-generated UUID (crypto.randomUUID in the route)
//   exception type            an error class name, e.g. "PostgresError"
//   mechanism                 type (lower-case identifier) and handled flag
//   stack frames              function name, line, column, and a project-relative file name
//                             under app/, lib/ or components/ (or instrumentation.ts);
//                             any machine-specific prefix is cut off, node_modules dropped
//   sdk                       sentry.* name and a version number
//
// Everything else is dropped: messages, exception values, other extra data, contexts, user,
// the whole request (path, body, headers, query, cookies), breadcrumbs, release, frame
// variables and source lines. Dependency-free so it can be unit-tested without Sentry.

type Json = Record<string, unknown>;

const LEVELS = new Set(["fatal", "error", "warning", "info", "debug", "log"]);
const PLATFORMS = new Set(["node", "javascript"]);
const ENVIRONMENTS = new Set(["production", "preview", "staging", "development"]);
const ROUTES = new Set(["/api/contact"]);
const STAGES = new Set([
  "durable_acceptance",
  "idempotency_lookup",
  "idempotency_validation",
  "owner_notification",
  "post_commit_operations",
  "route_exception",
]);
const CATEGORIES = new Set([
  "NETWORK_ERROR",
  "NETWORK_TIMEOUT",
  "NOTIFICATION_FAILED",
  "PROVIDER_AUTH_ERROR",
  "RATE_LIMIT_EXCEEDED",
  "SENDER_DOMAIN_UNVERIFIED",
]);

const EVENT_ID = /^[0-9a-f]{32}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const ERROR_TYPE = /^[A-Z][A-Za-z0-9_]{0,59}$/;
const MECHANISM = /^[a-z][a-z0-9_.]{0,39}$/;
const FUNCTION_NAME = /^[A-Za-z_$<][A-Za-z0-9_$.<>]{0,99}$/;
const PROJECT_FILE = /^(?:app|lib|components)\/[A-Za-z0-9_\-./[\]()]{1,180}\.(?:ts|tsx|js|mjs|cjs)$/;
const SDK_NAME = /^sentry\.[a-z.]{1,40}$/;
const SEMVER = /^\d{1,3}\.\d{1,3}\.\d{1,3}$/;

/** Cuts a frame's file name down to a project-relative path, or returns undefined. */
export function projectFile(filename: unknown): string | undefined {
  if (typeof filename !== "string" || filename.length > 500 || filename.includes("node_modules")) return undefined;
  const path = filename.replace(/^[a-z]+:\/\/[^/]*/i, "").replace(/\\/g, "/");
  if (/(^|\/)instrumentation\.(?:ts|js)$/.test(path)) return path.endsWith(".js") ? "instrumentation.js" : "instrumentation.ts";
  // Try every app/, lib/ or components/ segment; keep the first suffix that is a clean project path.
  const re = /(?:^|\/)((?:app|lib|components)\/.*)$/;
  let rest = path;
  for (let guard = 0; guard < 20; guard++) {
    const m = rest.match(re);
    if (!m) return undefined;
    if (PROJECT_FILE.test(m[1]) && !m[1].includes("..")) return m[1];
    rest = m[1].slice(m[1].indexOf("/") + 1);
  }
  return undefined;
}

function pickFrames(stacktrace: unknown): Json | undefined {
  const frames = (stacktrace as { frames?: unknown })?.frames;
  if (!Array.isArray(frames)) return undefined;
  return {
    frames: frames.slice(-50).map((f: Json) => {
      const out: Json = {};
      const file = projectFile(f?.filename);
      if (file) out.filename = file;
      if (typeof f?.function === "string" && FUNCTION_NAME.test(f.function)) out.function = f.function;
      for (const key of ["lineno", "colno"] as const) {
        if (Number.isInteger(f?.[key]) && (f[key] as number) >= 0 && (f[key] as number) < 1e6) out[key] = f[key];
      }
      if (typeof f?.in_app === "boolean") out.in_app = f.in_app;
      return out;
    }),
  };
}

function pickException(exception: unknown): Json | undefined {
  const values = (exception as { values?: unknown })?.values;
  if (!Array.isArray(values)) return undefined;
  return {
    values: values.slice(0, 5).map((ex: Json) => {
      const out: Json = { type: typeof ex?.type === "string" && ERROR_TYPE.test(ex.type) ? ex.type : "Error" };
      const mech = ex?.mechanism as Json | undefined;
      if (mech && typeof mech.type === "string" && MECHANISM.test(mech.type)) {
        out.mechanism = { type: mech.type, ...(typeof mech.handled === "boolean" ? { handled: mech.handled } : {}) };
      }
      const st = pickFrames(ex?.stacktrace);
      if (st) out.stacktrace = st;
      return out;
    }),
  };
}

const inSet = (set: Set<string>, v: unknown): v is string => typeof v === "string" && set.has(v);

/** Returns a new event containing only the allow-listed diagnostic fields above. */
export function allowListEvent<T extends object>(event: T): T {
  const e = event as Json;
  const out: Json = {};
  if (typeof e.event_id === "string" && EVENT_ID.test(e.event_id)) out.event_id = e.event_id;
  if (typeof e.timestamp === "number" && Number.isFinite(e.timestamp)) out.timestamp = e.timestamp;
  if (inSet(LEVELS, e.level)) out.level = e.level;
  if (inSet(PLATFORMS, e.platform)) out.platform = e.platform;
  if (inSet(ENVIRONMENTS, e.environment)) out.environment = e.environment;

  const t = (e.tags ?? {}) as Json;
  const tags: Json = {};
  if (inSet(ROUTES, t.route)) tags.route = t.route;
  if (inSet(STAGES, t.stage)) tags.stage = t.stage;
  if (inSet(CATEGORIES, t.category)) tags.category = t.category;
  if (Object.keys(tags).length) out.tags = tags;

  const requestId = (e.extra as Json | undefined)?.requestId;
  if (typeof requestId === "string" && UUID.test(requestId)) out.extra = { requestId };

  const exception = pickException(e.exception);
  if (exception) out.exception = exception;

  const sdk = e.sdk as Json | undefined;
  if (sdk && typeof sdk.name === "string" && SDK_NAME.test(sdk.name) && typeof sdk.version === "string" && SEMVER.test(sdk.version)) {
    out.sdk = { name: sdk.name, version: sdk.version };
  }
  return out as T;
}
