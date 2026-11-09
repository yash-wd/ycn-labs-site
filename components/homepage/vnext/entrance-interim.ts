// components/homepage/vnext/entrance-interim.ts

/**
 * Interim first-impression correction (Owner ruling, 9 Nov 2026 — DECISION-048 Amendment 1).
 *
 * While this is `true`, every homepage visit takes the existing "already seen" path:
 * the entrance stage is never mounted, no entrance video is requested, input is never
 * locked, and the Hero and navbar are visible from first paint. This is the same path
 * returning (session-seen) and reduced-motion visitors already take.
 *
 * Temporary: DECISION-048 (code-driven entrance) remains the intended architecture.
 * Every entrance component, film, logo asset and code path is preserved unchanged.
 * Set this back to `false` only after a truthful entrance is separately approved
 * by the Owner.
 */
export const ENTRANCE_INTERIM_BYPASS = true;
