// Server error monitoring (prepared 13 Nov 2026; OFF until configured).
// Sentry starts only when SENTRY_DSN is set in the server environment. Without it, the
// Sentry.captureException calls in app/api/contact/route.ts do nothing, exactly as before.
// Every event passes through scrubEvent, so enquiry contents, emails, phone numbers,
// cookies and IP addresses are not sent. No performance tracing, no client-side SDK.
import { scrubEvent } from "@/lib/monitoring/scrub";

export async function register() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn || process.env.NEXT_RUNTIME !== "nodejs") return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.init({
    dsn,
    environment: process.env.SENTRY_ENVIRONMENT ?? "production",
    sendDefaultPii: false,
    tracesSampleRate: 0,
    beforeSend: (event) => scrubEvent(event),
  });
}
