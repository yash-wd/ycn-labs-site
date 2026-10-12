"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  MessageSquare,
  Calendar,
  ShoppingBag,
  Users,
  CheckCircle2,
  ArrowRight,
  Clock,
  User,
  Inbox,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 5 Ratified Plain-Language States
const WORKFLOW_STEPS = [
  {
    key: "received",
    label: "Received",
    description: "Request reached the business.",
    statusLabel: "Intake complete",
  },
  {
    key: "assigned",
    label: "Assigned",
    description: "Someone owns it.",
    statusLabel: "Owner: Team Lead",
  },
  {
    key: "next-action",
    label: "Next action",
    description: "The next step is clear.",
    statusLabel: "Scope review call",
  },
  {
    key: "in-progress",
    label: "In progress",
    description: "The work is moving.",
    statusLabel: "Building prototype",
  },
  {
    key: "complete",
    label: "Complete",
    description: "The request is closed.",
    statusLabel: "Delivered & verified",
  },
];

// Plain Input Sources
const INPUT_SOURCES = [
  { name: "Website", icon: Globe, detail: "Direct web visit" },
  { name: "Enquiry", icon: MessageSquare, detail: "Customer question" },
  { name: "Booking", icon: Calendar, detail: "Scheduled appointment" },
  { name: "Order", icon: ShoppingBag, detail: "Product or service order" },
  { name: "Team update", icon: Users, detail: "Internal handover" },
];

// Resolved Outputs
const RESOLVED_OUTPUTS = [
  { label: "One owner", detail: "Assigned directly to a team member" },
  { label: "One next step", detail: "Clear immediate forward action" },
  { label: "Clear status", detail: "Real-time visibility for everyone" },
  { label: "Follow-up", detail: "Scheduled checkpoint and confirmation" },
];

export function ConnectedRequestsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const movementOneRef = useRef<HTMLDivElement>(null);
  const movementTwoRef = useRef<HTMLDivElement>(null);

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [signalProgress, setSignalProgress] = useState(0);
  const [movementPhase, setMovementPhase] = useState<1 | 2>(1);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!desktopTrackRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopTrackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            setSignalProgress(p);

            // Movement 1: 0% – 50%
            if (p < 0.5) {
              setMovementPhase(1);
              // Map 0 -> 0.45 to step index 0 -> 4
              const step = Math.min(4, Math.floor((p / 0.45) * 5));
              setActiveStepIndex(step);
            } else {
              // Movement 2: 50% – 100%
              setMovementPhase(2);
              setActiveStepIndex(4);
            }
          },
        },
      });

      // Movement 1 to Movement 2 transition:
      // Fade out Movement 1 at progress ~0.42 to 0.52
      if (movementOneRef.current && movementTwoRef.current) {
        tl.to(
          movementOneRef.current,
          {
            opacity: 0,
            y: -20,
            scale: 0.98,
            duration: 0.1,
            pointerEvents: "none",
          },
          0.44
        ).fromTo(
          movementTwoRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.98,
            pointerEvents: "none",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.12,
            pointerEvents: "auto",
          },
          0.48
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="connected-requests-root"
      aria-label="Connected requests workflow"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] overflow-visible"
    >
      {/* ============================================================== */}
      {/* 1. DESKTOP CONTINUOUS STORY (Pinned Stage ~260vh)              */}
      {/* ============================================================== */}
      {!isReducedMotion ? (
        <div ref={desktopTrackRef} className="hidden lg:block relative h-[260vh] w-full">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 lg:px-12 overflow-hidden bg-[var(--bg-canvas)]">
            {/* Background Structural Grid (Subtle, non-distracting) */}
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none"
              aria-hidden="true"
            />

            {/* ---------------------------------------------------------- */}
            {/* MOVEMENT 1: CUSTOMER SIDE ↔ BUSINESS SIDE RELATIONSHIP      */}
            {/* ---------------------------------------------------------- */}
            <div
              ref={movementOneRef}
              className={`w-full max-w-6xl transition-opacity duration-300 ${
                movementPhase === 1 ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="text-center mb-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--action-blue)] font-mono mb-2">
                  System Architecture · Two Sides of One Product
                </span>
                <p className="text-sm text-[var(--text-secondary)]">
                  Scroll to trace the request from customer action into business ownership.
                </p>
              </div>

              {/* Two-Column Relationship Canvas */}
              <div className="grid grid-cols-12 gap-8 items-center relative">
                {/* Left Column: Customer Side */}
                <div className="col-span-5 flex flex-col space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                      Customer side
                    </span>
                    {/* Ratified Customer Headline */}
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] font-display">
                      Make the next step obvious.
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      A simple, frictionless interface so interest turns into action without confusion.
                    </p>
                  </div>

                  {/* Customer Action Surface Card */}
                  <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-lg space-y-4 relative overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--action-blue)]" />
                        <span className="text-xs font-semibold text-[var(--text-primary)]">
                          Service Enquiry
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">
                        Step 1 of 1
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                        Customer Request
                      </span>
                      <p className="text-xs text-[var(--text-primary)] leading-snug">
                        &ldquo;We need a modern enquiry pipeline connected to our schedule.&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[var(--text-secondary)]">
                        Zero unnecessary steps
                      </span>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--action-blue)] text-[var(--text-on-action)] text-xs font-semibold shadow-sm">
                        <span>Send enquiry</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Active pulse on customer card */}
                    <div
                      className="absolute inset-0 border-2 border-[var(--signal-cyan)]/40 rounded-2xl pointer-events-none transition-opacity duration-300"
                      style={{ opacity: signalProgress < 0.25 ? 1 : 0.2 }}
                    />
                  </div>
                </div>

                {/* Center Signal Connector Path */}
                <div className="col-span-2 flex flex-col items-center justify-center relative">
                  <svg
                    className="w-full h-24 overflow-visible"
                    viewBox="0 0 160 60"
                    fill="none"
                    aria-hidden="true"
                  >
                    {/* Background neutral conduit */}
                    <path
                      d="M 10 30 C 60 30, 100 30, 150 30"
                      stroke="var(--border-strong)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* Active Signal Cyan Conduit */}
                    <path
                      d="M 10 30 C 60 30, 100 30, 150 30"
                      stroke="var(--signal-cyan)"
                      strokeWidth="3"
                      strokeDasharray="140"
                      strokeDashoffset={Math.max(0, 140 * (1 - signalProgress * 2.5))}
                      strokeLinecap="round"
                    />

                    {/* Signal Pulse Dot */}
                    <circle
                      cx={Math.min(150, Math.max(10, 10 + signalProgress * 2.5 * 140))}
                      cy="30"
                      r="5"
                      fill="var(--signal-cyan)"
                      className="shadow-[0_0_12px_var(--signal-cyan)]"
                    />
                  </svg>
                  <span className="text-[10px] font-mono text-[var(--signal-cyan)] uppercase tracking-wider font-semibold -mt-2">
                    Direct Signal
                  </span>
                </div>

                {/* Right Column: Business Side */}
                <div className="col-span-5 flex flex-col space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--signal-cyan)] font-semibold">
                      Business side
                    </span>
                    {/* Ratified Business Headline */}
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] font-display">
                      Make the next step visible.
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Instant ownership, clear forward steps, and total visibility for your team.
                    </p>
                  </div>

                  {/* Business State Progression Card */}
                  <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-lg space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                      <span className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                        <Inbox className="w-3.5 h-3.5 text-[var(--action-blue)]" />
                        <span>Live Request Flow</span>
                      </span>
                      <span className="text-[10px] text-[var(--signal-cyan)] font-mono font-medium">
                        State {activeStepIndex + 1} of 5
                      </span>
                    </div>

                    {/* Step-by-Step State Indicators */}
                    <div className="space-y-2">
                      {WORKFLOW_STEPS.map((st, i) => {
                        const isActive = i === activeStepIndex;
                        const isPast = i < activeStepIndex;

                        return (
                          <div
                            key={st.key}
                            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                              isActive
                                ? "bg-[var(--bg-surface-elevated)] border-[var(--signal-cyan)] shadow-md"
                                : isPast
                                ? "bg-[var(--bg-surface)] border-[var(--border-subtle)] opacity-75"
                                : "bg-[var(--bg-surface)]/50 border-transparent opacity-40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
                                  isActive
                                    ? "bg-[var(--signal-cyan)] text-[#0B0D13]"
                                    : isPast
                                    ? "bg-[var(--action-blue)] text-[var(--text-on-action)]"
                                    : "bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]"
                                }`}
                              >
                                {isPast ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
                              </div>
                              <div>
                                <span className="font-semibold text-xs text-[var(--text-primary)] block">
                                  {st.label}
                                </span>
                                <span className="text-[10px] text-[var(--text-secondary)]">
                                  {st.description}
                                </span>
                              </div>
                            </div>

                            <span
                              className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md ${
                                isActive
                                  ? "bg-[var(--signal-cyan)]/15 text-[var(--signal-cyan)] border border-[var(--signal-cyan)]/30"
                                  : "text-[var(--text-muted)]"
                              }`}
                            >
                              {st.statusLabel}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* MOVEMENT 2: CONNECTED REQUESTS FLOW                       */}
            {/* ---------------------------------------------------------- */}
            <div
              ref={movementTwoRef}
              className={`w-full max-w-6xl absolute transition-opacity duration-300 ${
                movementPhase === 2 ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Ratified Lead for Connected Flow */}
              <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--signal-cyan)] font-mono">
                  Convergence · Connected Channels
                </span>
                <h2 className="text-4xl xl:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-display">
                  One action. A clear next step.
                </h2>
              </div>

              {/* Three-Column Connected Convergence Grid */}
              <div className="grid grid-cols-12 gap-6 items-center">
                {/* 1. Left Column: Input Channels */}
                <div className="col-span-4 space-y-2.5">
                  <div className="pb-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                      Inputs
                    </span>
                  </div>
                  {INPUT_SOURCES.map((inp) => {
                    const Icon = inp.icon;
                    return (
                      <div
                        key={inp.name}
                        className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[var(--action-blue)]/10 text-[var(--action-blue)] flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-semibold text-xs text-[var(--text-primary)] block">
                              {inp.name}
                            </span>
                            <span className="text-[10px] text-[var(--text-secondary)]">
                              {inp.detail}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      </div>
                    );
                  })}
                </div>

                {/* 2. Center Column: Converging Engine Node */}
                <div className="col-span-4 flex flex-col items-center justify-center px-2">
                  <div className="w-full p-6 rounded-2xl border-2 border-[var(--signal-cyan)]/40 bg-[var(--bg-surface-elevated)] shadow-2xl text-center space-y-4 relative overflow-hidden">
                    <div className="inline-flex p-3 rounded-2xl bg-[var(--signal-cyan)]/15 text-[var(--signal-cyan)] border border-[var(--signal-cyan)]/30">
                      <Sparkles className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">
                        Request Flow
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Every incoming request receives an owner, a next step and a clear status.
                      </p>
                    </div>

                    {/* Active State Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono font-semibold">
                      <span className="py-1 px-2 rounded-lg bg-[var(--action-blue)]/15 text-[var(--action-blue)] border border-[var(--action-blue)]/30">
                        Assigned
                      </span>
                      <span className="py-1 px-2 rounded-lg bg-[var(--signal-cyan)]/15 text-[var(--signal-cyan)] border border-[var(--signal-cyan)]/30">
                        In Progress
                      </span>
                      <span className="py-1 px-2 rounded-lg bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                        Resolved
                      </span>
                      <span className="py-1 px-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                        Logged
                      </span>
                    </div>

                    {/* Ambient Glow */}
                    <div
                      className="absolute -inset-10 bg-[var(--signal-cyan)]/5 blur-2xl pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* 3. Right Column: Resolved Outputs */}
                <div className="col-span-4 space-y-2.5">
                  <div className="pb-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--signal-cyan)] font-semibold">
                      Outputs
                    </span>
                  </div>
                  {RESOLVED_OUTPUTS.map((out) => (
                    <div
                      key={out.label}
                      className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-xs text-[var(--text-primary)] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--signal-cyan)]" />
                          <span>{out.label}</span>
                        </span>
                        <span className="text-[10px] text-[var(--text-secondary)] block">
                          {out.detail}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--signal-cyan)]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Disclosure Footnote */}
              <div className="text-center pt-8 border-t border-[var(--border-subtle)] mt-8">
                <span className="text-xs text-[var(--text-secondary)] font-mono">
                  Sample · connected product flow
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================== */
        /* REDUCED MOTION PRESENTATION (Static high-clarity layout)      */
        /* ============================================================== */
        <div className="hidden lg:block py-20 px-8 max-w-6xl mx-auto space-y-16">
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Customer side
              </span>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] font-display">
                Make the next step obvious.
              </h2>
              <p className="text-base text-[var(--text-secondary)]">
                A simple interface so interest turns into action without confusion.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--signal-cyan)] font-semibold">
                Business side
              </span>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] font-display">
                Make the next step visible.
              </h2>
              <p className="text-base text-[var(--text-secondary)]">
                Instant ownership, clear forward steps, and total visibility for your team.
              </p>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto pt-8 border-t border-[var(--border-subtle)] space-y-3">
            <h3 className="text-3xl font-bold text-[var(--text-primary)] font-display">
              One action. A clear next step.
            </h3>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. MOBILE SEPARATE COMPOSITION (Native vertical scrolling)     */}
      {/* ============================================================== */}
      <div className="block lg:hidden px-4 sm:px-6 py-16 space-y-12 select-text">
        {/* Mobile Part 1: Customer Side */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            Customer side
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] font-display leading-tight">
            Make the next step obvious.
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            A simple, clear customer action so enquiry, booking or order happens without friction.
          </p>

          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3 mt-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
              <span>Customer action</span>
              <span className="text-[10px] text-[var(--action-blue)] font-mono">Step 1</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Enquiry submitted directly through the product interface.
            </p>
            <div className="w-full py-2 px-3 rounded-lg bg-[var(--action-blue)] text-[var(--text-on-action)] text-center text-xs font-semibold">
              Send enquiry
            </div>
          </div>
        </div>

        {/* Mobile Vertical Connector */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="w-0.5 h-8 bg-gradient-to-b from-[var(--action-blue)] to-[var(--signal-cyan)]" />
          <span className="text-[9px] font-mono text-[var(--signal-cyan)] uppercase tracking-wider font-semibold py-1">
            Connected signal
          </span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-[var(--signal-cyan)] to-[var(--border-strong)]" />
        </div>

        {/* Mobile Part 2: Business Side */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--signal-cyan)] font-semibold">
            Business side
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] font-display leading-tight">
            Make the next step visible.
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Every request has an owner, a next step and a clear status.
          </p>

          <div className="space-y-2 mt-3">
            {WORKFLOW_STEPS.map((st, i) => (
              <div
                key={`mobile-${st.key}`}
                className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--signal-cyan)]/15 text-[var(--signal-cyan)] flex items-center justify-center text-[10px] font-bold font-mono">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-xs text-[var(--text-primary)] block">
                      {st.label}
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)]">
                      {st.description}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-[var(--text-muted)]">
                  {st.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Part 3: Connected Requests Convergence */}
        <div className="space-y-4 pt-6 border-t border-[var(--border-subtle)]">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--action-blue)] font-semibold">
            Convergence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] font-display leading-tight">
            One action. A clear next step.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {INPUT_SOURCES.slice(0, 4).map((inp) => {
              const Icon = inp.icon;
              return (
                <div
                  key={`m-inp-${inp.name}`}
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2"
                >
                  <Icon className="w-3.5 h-3.5 text-[var(--action-blue)]" />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    {inp.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 pt-2">
            {RESOLVED_OUTPUTS.map((out) => (
              <div
                key={`m-out-${out.label}`}
                className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--signal-cyan)]" />
                  <span>{out.label}</span>
                </span>
                <span className="text-[10px] text-[var(--text-secondary)]">
                  {out.detail}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <span className="text-[10px] font-mono text-[var(--text-secondary)]">
              Sample · connected product flow
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
