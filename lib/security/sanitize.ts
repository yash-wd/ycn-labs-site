/**
 * Security sanitization and string escaping utilities.
 */

export function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Maps raw provider errors to bounded, non-PII operational error categories.
 * Prevents raw provider payloads, recipient emails, tokens, or headers from leaking into database diagnostics.
 */
export function sanitizeNotificationError(err: unknown): string {
  if (!err) return "NOTIFICATION_FAILED";
  const raw = typeof err === "string" ? err : (err as any)?.message || String(err);
  const lower = raw.toLowerCase();

  if (lower.includes("rate limit") || lower.includes("quota") || lower.includes("429")) {
    return "RATE_LIMIT_EXCEEDED";
  }
  if (lower.includes("timeout") || lower.includes("timed out") || lower.includes("econnreset")) {
    return "NETWORK_TIMEOUT";
  }
  if (
    lower.includes("auth") ||
    lower.includes("api_key") ||
    lower.includes("unauthorized") ||
    lower.includes("401") ||
    lower.includes("403")
  ) {
    return "PROVIDER_AUTH_ERROR";
  }
  if (lower.includes("domain") || lower.includes("unverified") || lower.includes("from")) {
    return "SENDER_DOMAIN_UNVERIFIED";
  }
  if (lower.includes("network") || lower.includes("connection") || lower.includes("econnrefused")) {
    return "NETWORK_ERROR";
  }
  if (lower.includes("invalid") || lower.includes("validation") || lower.includes("format")) {
    return "PAYLOAD_VALIDATION_ERROR";
  }

  return "NOTIFICATION_DISPATCH_FAILED";
}
