import React from "react";
import {
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Send,
  User,
  ShieldCheck,
  Activity,
  Headphones,
} from "lucide-react";

export type PhoneScreenState = "S0" | "S1" | "S2" | "S3";

interface Phone3DProps {
  className?: string;
  state?: PhoneScreenState;
  tiltAngle?: number;
}

/**
 * Phone3D — Modular DOM/CSS Device Shell (PRODUCT IN MOTION protagonist)
 *
 * Geometric architecture reconstructed from Owner's industrial-design specification:
 * - perspective: 1200px stage with preserve-3d chassis
 * - Chassis: Theme-invariant matte graphite aerospace shell (var(--phone-chassis))
 * - Edge Rails: Restrained metallic edge bezel (var(--phone-rail)) with subtle specular highlight
 * - Front Glass: Restrained specular reflection sheen (pointer-events-none)
 * - Generic Sensor: Discrete centered micro-punchhole sensor (no Apple trademark mimicry)
 * - Live DOM Screen Viewport: Adapts to website theme, hosting S0–S3 product states
 * - In-Device Disclosure: Permanent "Sample · nothing is sent" footer on all states
 * - Controls: 100% INERT — zero button/a/input descendants, non-submitting
 */
export function Phone3D({ className = "", state = "S0", tiltAngle = 0 }: Phone3DProps) {
  return (
    <div
      className={`phone-3d-stage relative flex items-center justify-center ${className}`}
      style={{ perspective: "1200px" }}
      aria-label="Interactive illustrative product preview"
      role="region"
    >
      {/* Phone Chassis with 3D transform preserve — theme-invariant matte graphite */}
      <div
        className="phone-3d-chassis relative w-full aspect-[9/19] rounded-[32px] sm:rounded-[36px] p-2 sm:p-2.5 bg-[var(--phone-chassis)] border border-[var(--phone-rail)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)_inset] flex flex-col justify-between overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${tiltAngle}deg)`,
          willChange: "transform",
        }}
      >
        {/* Restrained specular edge rail highlight */}
        <div
          className="absolute inset-0 rounded-[32px] sm:rounded-[36px] pointer-events-none border border-white/[0.08]"
          aria-hidden="true"
        />

        {/* Generic micro-sensor cutout per Owner reference sheet */}
        <div
          className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[11.5px] h-[11.5px] bg-black rounded-full z-30 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-[5px] h-[5px] rounded-full bg-slate-800" />
        </div>

        {/* Live DOM Screen Viewport — follows website theme */}
        <div
          className="phone-screen-viewport relative w-full h-full rounded-[24px] sm:rounded-[28px] bg-[var(--bg-canvas)] border border-[var(--border-subtle)] overflow-hidden flex flex-col justify-between pt-5 pb-3 px-3 sm:px-3.5 select-none"
          aria-hidden="true"
        >
          {/* Top Status Bar: Clock & Ratified Sample Experience indicator */}
          <div className="flex items-center justify-between text-[10px] font-semibold text-[var(--text-secondary)] pb-1.5 border-b border-[var(--border-subtle)] shrink-0">
            <span>
              {state === "S0" ? "10:00" : state === "S1" ? "10:01" : state === "S2" ? "10:02" : "10:03"}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[9px] font-medium tracking-tight text-[var(--text-secondary)]">
              Sample experience
            </span>
          </div>

          {/* Screen Content Container: Smooth state transitions S0 -> S3 */}
          <div className="relative w-full flex-1 flex flex-col justify-center overflow-hidden py-1">
            {/* S0 — find (Discovery: B3a Ratified Hero State) */}
            <div
              className={`w-full transition-all duration-400 ease-out space-y-1.5 ${
                state === "S0"
                  ? "opacity-100 translate-y-0 relative pointer-events-auto"
                  : "opacity-0 -translate-y-2 absolute inset-x-0 pointer-events-none"
              }`}
            >
              <div className="pt-0.5 pb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-blue)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--action-blue)]">
                    YCN Product Flow
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-[var(--text-primary)] mt-0.5 font-display">
                  How can we help?
                </h3>
              </div>

              {/* Three Ratified S0 Action Pathways */}
              <div className="space-y-1.5">
                <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[var(--action-blue)]" />
                    <span className="font-medium text-[var(--text-primary)]">Request a quote</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[var(--text-secondary)]" />
                </div>

                <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[var(--action-blue)]" />
                    <span className="font-medium text-[var(--text-primary)]">Book a service</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[var(--text-secondary)]" />
                </div>

                <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[var(--action-blue)]" />
                    <span className="font-medium text-[var(--text-primary)]">Track a request</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[var(--text-secondary)]" />
                </div>
              </div>
            </div>

            {/* S1 — ask (Customer Action & Submission) */}
            <div
              className={`w-full transition-all duration-400 ease-out space-y-1.5 ${
                state === "S1"
                  ? "opacity-100 translate-y-0 relative pointer-events-auto"
                  : "opacity-0 translate-y-2 absolute inset-x-0 pointer-events-none"
              }`}
            >
              <div className="pt-0.5 pb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-blue)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--action-blue)]">
                    Step 1 · Customer Action
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-[var(--text-primary)] mt-0.5 font-display">
                  Ask a question
                </h3>
              </div>

              {/* Sample Request Field */}
              <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                <div className="text-[9px] uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
                  Your Enquiry
                </div>
                <p className="text-[11px] text-[var(--text-primary)] leading-snug">
                  &ldquo;We need to modernise our customer booking flow and connect it to our existing schedule.&rdquo;
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[9px] text-[var(--text-muted)]">Attachments (1)</span>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--action-blue)] text-[var(--text-on-action)] text-[10px] font-semibold">
                    <span>Send</span>
                    <Send className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>

              {/* Immediate Confirmation Banner */}
              <div className="p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--action-blue)]/40 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--action-blue)] shrink-0" />
                <div className="text-[10px] leading-tight">
                  <span className="font-semibold text-[var(--text-primary)] block">
                    Sent · Received by your business
                  </span>
                  <span className="text-[9px] text-[var(--text-secondary)]">
                    Logged to request pipeline
                  </span>
                </div>
              </div>
            </div>

            {/* S2 — handle (Business Request Visibility) */}
            <div
              className={`w-full transition-all duration-400 ease-out space-y-1.5 ${
                state === "S2"
                  ? "opacity-100 translate-y-0 relative pointer-events-auto"
                  : "opacity-0 translate-y-2 absolute inset-x-0 pointer-events-none"
              }`}
            >
              <div className="pt-0.5 pb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-cyan)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--signal-cyan)]">
                    Step 2 · Business Pipeline
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-[var(--text-primary)] mt-0.5 font-display">
                  Active Requests
                </h3>
                <p className="text-[9px] text-[var(--text-secondary)] mt-0.5">
                  Every request has a name and a next step.
                </p>
              </div>

              {/* Request Cards Pipeline */}
              <div className="space-y-1.5">
                <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-[10px]">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-[var(--text-primary)] block text-[11px]">
                      Booking flow revamp
                    </span>
                    <span className="text-[9px] text-[var(--text-secondary)] flex items-center gap-1">
                      <User className="w-2.5 h-2.5" /> Sarah K.
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--action-blue)]/15 border border-[var(--action-blue)]/30 text-[9px] font-semibold text-[var(--action-blue)]">
                    Assigned
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-[10px]">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-[var(--text-primary)] block text-[11px]">
                      Service intake audit
                    </span>
                    <span className="text-[9px] text-[var(--text-secondary)] flex items-center gap-1">
                      <User className="w-2.5 h-2.5" /> Dave M.
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--signal-cyan)]/15 border border-[var(--signal-cyan)]/30 text-[9px] font-semibold text-[var(--signal-cyan)]">
                    Confirmed
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-[10px]">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-[var(--text-primary)] block text-[11px]">
                      Web portal quotation
                    </span>
                    <span className="text-[9px] text-[var(--text-secondary)] flex items-center gap-1">
                      <User className="w-2.5 h-2.5" /> Operations
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] text-[9px] font-semibold text-[var(--text-primary)]">
                    Reply sent
                  </span>
                </div>
              </div>
            </div>

            {/* S3 — keep (Business Continuity & Ongoing Health) */}
            <div
              className={`w-full transition-all duration-400 ease-out space-y-1.5 ${
                state === "S3"
                  ? "opacity-100 translate-y-0 relative pointer-events-auto"
                  : "opacity-0 translate-y-2 absolute inset-x-0 pointer-events-none"
              }`}
            >
              <div className="pt-0.5 pb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                    Step 3 · Continuity
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-[var(--text-primary)] mt-0.5 font-display">
                  Today
                </h3>
              </div>

              {/* Status Row 1: Everything running OK */}
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-medium text-[var(--text-primary)]">Everything running OK</span>
                </div>
                <span className="text-[9px] font-semibold text-emerald-500">Running OK</span>
              </div>

              {/* Status Row 2: Database & Backups */}
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--action-blue)]" />
                  <span className="font-medium text-[var(--text-primary)]">Automated backups</span>
                </div>
                <span className="text-[9px] font-semibold text-[var(--text-secondary)]">Daily OK</span>
              </div>

              {/* Reassurance Callout: You know who to call */}
              <div className="p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] flex items-start gap-2">
                <Headphones className="w-3.5 h-3.5 text-[var(--action-blue)] shrink-0 mt-0.5" />
                <div className="text-[10px] leading-snug">
                  <span className="font-semibold text-[var(--text-primary)] block">
                    Something wrong?
                  </span>
                  <span className="text-[9px] text-[var(--text-secondary)]">
                    You know who to call. Direct support retained.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footnote: Ratified disclosure on all states */}
          <div className="pt-1.5 border-t border-[var(--border-subtle)] text-center shrink-0">
            <span className="text-[10px] text-[var(--text-secondary)] font-medium">
              Sample · nothing is sent
            </span>
          </div>

          {/* Specular Front Glass Sheen (pointer-events-none) */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Inert bottom home-indicator bar */}
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-slate-700/60 rounded-full pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
