/**
 * Detects whether the application is running in a staging, preview, or unconfigured environment.
 * FAIL-SAFE INVERSION: Returns true (triggering noindex/disallow) UNLESS
 * process.env.NEXT_PUBLIC_SITE_ENV === "production".
 */
export function isStaging(): boolean {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV || process.env.NEXT_PUBLIC_ENV;
  return siteEnv !== "production";
}
