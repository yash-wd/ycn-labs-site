// Server error monitoring (prepared 13 Nov 2026; OFF until configured).
// Sentry starts only when SENTRY_DSN is set in the server environment. Without it, the
// Sentry.captureException calls in app/api/contact/route.ts do nothing, exactly as before.
// Every event is rebuilt by allowListEvent: only the error type, route/stage tags, requestId,
// code location, environment and time are sent. Exception messages, extra data, contexts,
// user, request contents and breadcrumbs are dropped. No tracing, no client-side SDK.
import { allowListEvent } from "@/lib/monitoring/scrub";

export async function register() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn || process.env.NEXT_RUNTIME !== "nodejs") return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.init({
    dsn,
    environment: process.env.SENTRY_ENVIRONMENT ?? "production",
    sendDefaultPii: false,
    tracesSampleRate: 0,
    sendClientReports: false,
    beforeSend: (event) => allowListEvent(event),
    beforeBreadcrumb: () => null,
  });
}
