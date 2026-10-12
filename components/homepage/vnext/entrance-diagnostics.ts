// components/homepage/vnext/entrance-diagnostics.ts

export type EntranceSkipReason =
  | "session_flag_seen"
  | "prefers_reduced_motion"
  | "save_data_active"
  | "slow_network_2g"
  | "autoplay_rejected"
  | "video_media_error"
  | "timeout_safety";

export interface EntranceDiagnosticDetails {
  reason?: EntranceSkipReason;
  details?: Record<string, unknown>;
  timestamp: string;
}

/**
 * Checks whether development forced intro replay (?intro=1) is active.
 * STRICTLY INERT in production builds (returns false unconditionally via process.env.NODE_ENV check).
 */
export function isDevIntroReplay(): boolean {
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("intro") === "1";
  } catch {
    return false;
  }
}

/**
 * Emits development console diagnostics detailing entrance evaluation.
 * Disabled completely in production builds.
 */
export function logEntranceDiagnostic(
  event: "playing" | "skipped" | "error" | "forced_replay" | "completed",
  reason?: EntranceSkipReason,
  details?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.info(`[YCN Entrance Diagnostic] ${event.toUpperCase()}`, {
    reason,
    details,
    timestamp: new Date().toISOString(),
  });
}
