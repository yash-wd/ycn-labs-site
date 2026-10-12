"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { SkipForward } from "lucide-react";
import { gsap } from "gsap";
import { isDevIntroReplay, logEntranceDiagnostic } from "./entrance-diagnostics";

interface CodeEntranceContinuumProps {
  onComplete: () => void;
}

/**
 * CodeEntranceContinuum — Code-Driven SVG/DOM + GSAP Entrance Experience
 *
 * Narrative per Owner Ruling & vNext Canon:
 * "A business has separate pieces. YCN turns them into one clear path a customer can follow."
 *
 * Timeline (8.0s total):
 * 0.0–1.2s: Disconnected near-white modules floating in dark #0D111A canvas with generous negative space.
 * 1.2–2.4s: Single cyan signal enters the visual system (only element with cyan).
 * 2.4–4.5s: Modules respond: orienting, aligning, connecting as signal passes.
 * 4.5–6.0s: Single clear continuous path forms across the system.
 * 6.0–7.0s: Structure simplifies, secondary geometry retreats.
 * 7.0–8.0s: Geometry focuses into the center while official DOM YCN logo resolves seamlessly.
 *
 * Direct Handoff: The DOM logo in the entrance matches the exact coordinates, scale, and background
 * of LogoTakeoverStage, guaranteeing zero flash of the Hero, zero layout shift, and zero scene cut.
 */
export function CodeEntranceContinuum({ onComplete }: CodeEntranceContinuumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleFinish = useCallback(() => {
    if (hasCompleted) return;
    setHasCompleted(true);

    // Persist session seen flag unless in dev replay mode
    if (!isDevIntroReplay()) {
      try {
        sessionStorage.setItem("ycn_v2_entrance_seen", "true");
      } catch {
        // storage disabled fallback
      }
    }

    logEntranceDiagnostic("completed", undefined, {
      type: "code_entrance_continuum",
      timestamp: new Date().toISOString(),
    });

    onComplete();
  }, [hasCompleted, onComplete]);

  const handleManualSkip = useCallback(() => {
    logEntranceDiagnostic("skipped", undefined, {
      reasonText: "user_skip_button",
    });
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    handleFinish();
  }, [handleFinish]);

  useEffect(() => {
    const checkOrientation = () => {
      setIsMobile(window.innerWidth < 768 || window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    // Escape key listener for immediate accessibility skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleManualSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleManualSkip]);

  useEffect(() => {
    // Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion && !isDevIntroReplay()) {
      logEntranceDiagnostic("skipped", "prefers_reduced_motion", {
        mediaQuery: "(prefers-reduced-motion: reduce)",
      });
      handleFinish();
      return;
    }

    // Diagnostics on start
    if (isDevIntroReplay()) {
      logEntranceDiagnostic("forced_replay", undefined, {
        trigger: "?intro=1",
        note: "Development replay active; code entrance playing from frame 0",
      });
    } else {
      logEntranceDiagnostic("playing", undefined, {
        mode: isMobile ? "9:16 mobile portrait" : "16:9 desktop landscape",
        technology: "SVG/DOM + GSAP",
      });
    }

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        onComplete: handleFinish,
      });
      timelineRef.current = tl;

      // 0. Initial Setup: Elements start slightly dispersed and unaligned
      tl.set(".entrance-module", {
        transformOrigin: "center center",
      });
      tl.set(".entrance-path-line", {
        strokeDasharray: 300,
        strokeDashoffset: 300,
        opacity: 0,
      });
      tl.set(".entrance-signal", {
        opacity: 0,
        scale: 0.5,
      });
      tl.set(".entrance-resolved-logo", {
        opacity: 0,
        scale: 0.94,
      });

      // Stage 1 (0.0s - 1.2s): Calm initial state — disconnected pieces floating
      tl.fromTo(
        ".entrance-module-1",
        { x: isMobile ? -12 : -25, y: isMobile ? -10 : 15, rotation: -3, opacity: 0 },
        { opacity: 0.75, duration: 1.0, ease: "power2.out" },
        0.1
      );
      tl.fromTo(
        ".entrance-module-2",
        { x: isMobile ? 15 : -15, y: isMobile ? -5 : -20, rotation: 2, opacity: 0 },
        { opacity: 0.75, duration: 1.0, ease: "power2.out" },
        0.2
      );
      tl.fromTo(
        ".entrance-module-3",
        { x: isMobile ? -10 : 20, y: isMobile ? 10 : -15, rotation: -2, opacity: 0 },
        { opacity: 0.8, duration: 1.0, ease: "power2.out" },
        0.3
      );
      tl.fromTo(
        ".entrance-module-4",
        { x: isMobile ? 12 : 25, y: isMobile ? 15 : 20, rotation: 3, opacity: 0 },
        { opacity: 0.75, duration: 1.0, ease: "power2.out" },
        0.4
      );
      if (!isMobile) {
        tl.fromTo(
          ".entrance-module-5",
          { x: 35, y: -10, rotation: -1.5, opacity: 0 },
          { opacity: 0.75, duration: 1.0, ease: "power2.out" },
          0.5
        );
        tl.fromTo(
          ".entrance-module-6",
          { x: -30, y: -25, rotation: 2.5, opacity: 0 },
          { opacity: 0.7, duration: 1.0, ease: "power2.out" },
          0.55
        );
      }

      // Stage 2 (1.2s - 2.4s): Single cyan signal enters the visual system
      tl.to(
        ".entrance-signal",
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        1.2
      );

      // Signal travels smoothly
      tl.to(
        ".entrance-signal",
        {
          x: isMobile ? 0 : 220,
          y: isMobile ? 220 : 0,
          duration: 4.8,
          ease: "power1.inOut",
        },
        1.6
      );

      // Stage 3 (2.4s - 4.5s): As signal passes, pieces respond, orient, and connect
      tl.to(
        [".entrance-module-1", ".entrance-module-2", ".entrance-module-3", ".entrance-module-4", ".entrance-module-5", ".entrance-module-6"],
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.8,
          stagger: 0.25,
          ease: "power2.inOut",
        },
        2.2
      );

      // Connecting paths draw in between modules
      tl.to(
        ".entrance-path-line",
        {
          strokeDashoffset: 0,
          opacity: 0.65,
          duration: 2.2,
          stagger: 0.3,
          ease: "power1.inOut",
        },
        2.4
      );

      // Stage 4 (4.5s - 6.0s): One clear connected path forms and illuminates
      tl.to(
        ".entrance-path-line",
        {
          opacity: 0.9,
          duration: 0.8,
          ease: "power1.inOut",
        },
        4.5
      );
      tl.to(
        ".entrance-module",
        {
          boxShadow: "0 0 20px rgba(2, 153, 195, 0.15)",
          duration: 0.8,
        },
        4.6
      );

      // Stage 5 (6.0s - 7.0s): Structure simplifies; secondary pieces quietly retreat
      tl.to(
        [".entrance-module-5", ".entrance-module-6", ".entrance-secondary-path"],
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.9,
          ease: "power2.in",
        },
        5.8
      );
      tl.to(
        ".entrance-signal",
        {
          opacity: 0.4,
          scale: 0.8,
          duration: 0.8,
        },
        6.2
      );

      // Stage 6 (7.0s - 8.0s): Geometry gracefully converges into the central logo
      tl.to(
        [".entrance-module", ".entrance-path-line", ".entrance-signal"],
        {
          opacity: 0,
          scale: 0.7,
          duration: 0.9,
          ease: "power2.inOut",
        },
        6.9
      );

      // Official DOM YCN Logo resolves smoothly at the exact center coordinates
      tl.to(
        ".entrance-resolved-logo",
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power2.out",
        },
        7.1
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [handleFinish, isMobile]);

  return (
    <div
      ref={containerRef}
      id="code-entrance-continuum"
      data-testid="code-entrance-continuum"
      role="region"
      aria-label="YCN Continuum Entrance"
      className="fixed inset-0 z-50 bg-[var(--bg-canvas)] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Accessible Skip Button: Always visible from frame zero, min 44x44px touch target */}
      <button
        type="button"
        onClick={handleManualSkip}
        aria-label="Skip entrance animation (or press Escape)"
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-60 min-h-[44px] min-w-[44px] px-4 py-2 flex items-center gap-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-white transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--action-blue)]"
      >
        <span>Skip</span>
        <SkipForward className="w-3.5 h-3.5 text-[var(--action-blue)]" />
      </button>

      {/* SVG Canvas for Desktop (1000x600) or Mobile (400x700) */}
      <div className="relative w-full h-full flex items-center justify-center">
        {isMobile ? (
          // Mobile Composition (Vertical 400x700): 4-5 organized vertical modules
          <svg
            className="w-full h-full max-w-[420px] max-h-[720px] pointer-events-none"
            viewBox="0 0 400 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connecting Paths */}
            <path
              className="entrance-path-line"
              d="M200 130 V220 H160 V330 H240 V450 H200 V530"
              stroke="var(--border-strong)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="entrance-path-line entrance-secondary-path"
              d="M160 220 L130 280 H170"
              stroke="var(--control-border)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Vertical Modules */}
            <g className="entrance-module entrance-module-1">
              <rect x="140" y="100" width="120" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--control-border)" strokeWidth="1" />
              <line x1="155" y1="120" x2="215" y2="120" stroke="var(--border-strong)" strokeWidth="1" />
            </g>
            <g className="entrance-module entrance-module-2">
              <rect x="110" y="210" width="100" height="38" rx="6" fill="var(--bg-surface)" stroke="var(--control-border)" strokeWidth="1" />
              <line x1="125" y1="229" x2="175" y2="229" stroke="var(--border-strong)" strokeWidth="1" />
            </g>
            <g className="entrance-module entrance-module-3">
              <rect x="180" y="320" width="110" height="44" rx="6" fill="var(--bg-surface-elevated)" stroke="var(--border-strong)" strokeWidth="1.2" />
              <line x1="195" y1="342" x2="265" y2="342" stroke="var(--text-secondary)" strokeWidth="1.2" />
            </g>
            <g className="entrance-module entrance-module-4">
              <rect x="135" y="440" width="120" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--control-border)" strokeWidth="1" />
              <line x1="150" y1="460" x2="220" y2="460" stroke="var(--border-strong)" strokeWidth="1" />
            </g>

            {/* Single Travelling Cyan Signal Dot */}
            <circle
              className="entrance-signal"
              cx="200"
              cy="110"
              r="4.5"
              fill="var(--signal-cyan)"
              filter="drop-shadow(0 0 6px var(--signal-cyan))"
            />
          </svg>
        ) : (
          // Desktop Composition (Landscape 1000x600): 6-7 modular architectural blocks
          <svg
            className="w-full h-full max-w-[1100px] max-h-[660px] pointer-events-none"
            viewBox="0 0 1000 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connecting Paths */}
            <path
              className="entrance-path-line"
              d="M160 280 H280 V190 H420 V300 H580 V310 H740"
              stroke="var(--border-strong)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="entrance-path-line entrance-secondary-path"
              d="M280 190 V140 H360"
              stroke="var(--control-border)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              className="entrance-path-line entrance-secondary-path"
              d="M580 310 V400 H660"
              stroke="var(--control-border)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Modules */}
            <g className="entrance-module entrance-module-1">
              <rect x="120" y="258" width="90" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--control-border)" strokeWidth="1" />
              <line x1="135" y1="280" x2="185" y2="280" stroke="var(--border-strong)" strokeWidth="1" />
            </g>
            <g className="entrance-module entrance-module-2">
              <rect x="245" y="168" width="85" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--control-border)" strokeWidth="1" />
              <line x1="260" y1="190" x2="310" y2="190" stroke="var(--border-strong)" strokeWidth="1" />
            </g>
            <g className="entrance-module entrance-module-3">
              <rect x="380" y="168" width="95" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--control-border)" strokeWidth="1" />
              <line x1="395" y1="190" x2="455" y2="190" stroke="var(--border-strong)" strokeWidth="1" />
            </g>
            <g className="entrance-module entrance-module-4">
              <rect x="450" y="278" width="110" height="48" rx="6" fill="var(--bg-surface-elevated)" stroke="var(--border-strong)" strokeWidth="1.2" />
              <line x1="468" y1="302" x2="540" y2="302" stroke="var(--text-secondary)" strokeWidth="1.2" />
            </g>
            <g className="entrance-module entrance-module-5">
              <rect x="580" y="288" width="90" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--control-border)" strokeWidth="1" />
              <line x1="595" y1="310" x2="650" y2="310" stroke="var(--border-strong)" strokeWidth="1" />
            </g>
            <g className="entrance-module entrance-module-6">
              <rect x="700" y="198" width="85" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--control-border)" strokeWidth="1" />
              <line x1="715" y1="220" x2="765" y2="220" stroke="var(--border-strong)" strokeWidth="1" />
            </g>

            {/* Single Travelling Cyan Signal Dot */}
            <circle
              className="entrance-signal"
              cx="160"
              cy="280"
              r="5"
              fill="var(--signal-cyan)"
              filter="drop-shadow(0 0 8px var(--signal-cyan))"
            />
          </svg>
        )}

        {/* The Official Real DOM YCN Logo: Resolves seamlessly at the exact center */}
        <div className="entrance-resolved-logo absolute inset-0 flex items-center justify-center pointer-events-none z-55">
          <div className="relative w-[280px] sm:w-[360px] md:w-[448px] aspect-[2048/1669] flex items-center justify-center">
            {/* Dark-letter logo on light canvas */}
            <Image
              src="/brand/ycn-labs-full-light.png"
              alt="YCN Labs Official Logo"
              fill
              sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 448px"
              className="object-contain block dark:hidden"
            />
            {/* White-letter logo on dark canvas */}
            <Image
              src="/brand/ycn-labs-full-dark.png"
              alt="YCN Labs Official Logo"
              fill
              sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 448px"
              className="object-contain hidden dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
