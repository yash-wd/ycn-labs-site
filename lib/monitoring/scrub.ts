// Monitoring allow-list (used as Sentry beforeSend). GPT review of PR #33, 13 Nov 2026:
// pattern redaction let names and enquiry text through, so this builds a NEW event that
// carries only fields known to be safe. Anything not listed below is dropped, including
// exception messages (database/provider errors can echo submitted values), extra data
// other than requestId, contexts, user, request bodies/headers/query, breadcrumbs and
// stack-frame variables or source lines.
//
// What an alert still tells the operator: the error type (e.g. "PostgresError"), the route
// and stage tags, the requestId (to find the stored lead and its notification state), the
// code location, environment and time. Kept dependency-free so it can be unit-tested.

const ALLOWED_TAGS = new Set(["route", "stage"]);
const SAFE_TAG_VALUE = /^[A-Za-z0-9_\-/.]{1,64}$/;
const SAFE_ID = /^[A-Za-z0-9-]{1,64}$/;
const SAFE_TYPE = /^[A-Za-z0-9_.$]{1,80}$/;
const SAFE_FRAME_TEXT = /^[A-Za-z0-9_\-./:<>$@ ]{1,200}$/;

type Json = Record<string, unknown>;

function pickTags(tags: unknown): Json | undefined {
  if (!tags || typeof tags !== "object") return undefined;
  const out: Json = {};
  for (const [k, v] of Object.entries(tags as Json)) {
    if (ALLOWED_TAGS.has(k) && typeof v === "string" && SAFE_TAG_VALUE.test(v)) out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

function pickFrames(stacktrace: unknown): Json | undefined {
  const frames = (stacktrace as { frames?: unknown })?.frames;
  if (!Array.isArray(frames)) return undefined;
  const safe = frames.map((f: Json) => {
    const out: Json = {};
    for (const key of ["filename", "module", "function"] as const) {
      const v = f?.[key];
      if (typeof v === "string" && SAFE_FRAME_TEXT.test(v)) out[key] = v;
    }
    for (const key of ["lineno", "colno"] as const) if (typeof f?.[key] === "number") out[key] = f[key];
    if (typeof f?.in_app === "boolean") out.in_app = f.in_app;
    return out;
  });
  return { frames: safe };
}

function pickException(exception: unknown): Json | undefined {
  const values = (exception as { values?: unknown })?.values;
  if (!Array.isArray(values)) return undefined;
  return {
    values: values.map((ex: Json) => {
      const out: Json = { type: typeof ex?.type === "string" && SAFE_TYPE.test(ex.type) ? ex.type : "Error" };
      const mech = ex?.mechanism as Json | undefined;
      if (mech && typeof mech.type === "string" && SAFE_TYPE.test(mech.type)) {
        out.mechanism = { type: mech.type, ...(typeof mech.handled === "boolean" ? { handled: mech.handled } : {}) };
      }
      const st = pickFrames(ex?.stacktrace);
      if (st) out.stacktrace = st;
      return out;
    }),
  };
}

/** Returns a new event containing only allow-listed diagnostic fields. */
export function allowListEvent<T extends object>(event: T): T {
  const e = event as Json;
  const out: Json = {};
  for (const key of ["event_id", "timestamp", "start_timestamp", "level", "platform", "environment", "release", "dist", "type"]) {
    const v = e[key];
    if (typeof v === "string" || typeof v === "number") out[key] = v;
  }
  const tags = pickTags(e.tags);
  if (tags) out.tags = tags;
  const requestId = (e.extra as Json | undefined)?.requestId;
  if (typeof requestId === "string" && SAFE_ID.test(requestId)) out.extra = { requestId };
  const exception = pickException(e.exception);
  if (exception) out.exception = exception;
  const req = e.request as Json | undefined;
  if (req && typeof req.url === "string") {
    // Path only: no host-supplied query, body, cookies or headers.
    const path = req.url.replace(/^[a-z]+:\/\/[^/]+/i, "").split(/[?#]/)[0];
    if (SAFE_TAG_VALUE.test(path)) out.request = { url: path, ...(typeof req.method === "string" && /^[A-Z]{3,7}$/.test(req.method) ? { method: req.method } : {}) };
  }
  if (e.sdk && typeof e.sdk === "object") {
    const sdk = e.sdk as Json;
    if (typeof sdk.name === "string" && typeof sdk.version === "string") out.sdk = { name: sdk.name, version: sdk.version };
  }
  return out as T;
}
