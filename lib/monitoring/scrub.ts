// Removes personal data from an error event before it leaves the server (used as Sentry
// beforeSend). Enquiry contents, contact details, cookies and IP addresses never belong in
// monitoring: the route already tags events with a requestId, which is enough to find the
// stored lead. Kept dependency-free so it can be unit-tested without Sentry.

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
// Phone-like runs of 8+ digits, allowing spaces, dashes, dots and a leading +.
const PHONE = /\+?\d[\d\s().-]{6,}\d/g;
const SAFE_HEADERS = new Set(["content-type", "user-agent", "accept-language"]);

export function redactText(value: string): string {
  return value.replace(EMAIL, "[email]").replace(PHONE, "[number]");
}

function redactDeep(value: unknown, depth = 0): unknown {
  if (depth > 6) return "[truncated]";
  if (typeof value === "string") return redactText(value);
  if (Array.isArray(value)) return value.map((v) => redactDeep(v, depth + 1));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = redactDeep(v, depth + 1);
    return out;
  }
  return value;
}

// Minimal structural type: the parts of a Sentry event this function touches.
export interface ScrubbableEvent {
  message?: string;
  user?: unknown;
  request?: { data?: unknown; cookies?: unknown; query_string?: unknown; headers?: Record<string, string>; url?: string };
  extra?: Record<string, unknown>;
  exception?: { values?: Array<{ value?: string }> };
  breadcrumbs?: unknown;
}

export function scrubEvent<T extends ScrubbableEvent>(event: T): T {
  delete event.user;
  delete event.breadcrumbs;
  if (event.request) {
    delete event.request.data;
    delete event.request.cookies;
    delete event.request.query_string;
    if (event.request.url) event.request.url = event.request.url.split("?")[0];
    if (event.request.headers) {
      event.request.headers = Object.fromEntries(
        Object.entries(event.request.headers).filter(([k]) => SAFE_HEADERS.has(k.toLowerCase())),
      );
    }
  }
  if (event.message) event.message = redactText(event.message);
  if (event.extra) event.extra = redactDeep(event.extra) as Record<string, unknown>;
  for (const ex of event.exception?.values ?? []) if (ex.value) ex.value = redactText(ex.value);
  return event;
}
