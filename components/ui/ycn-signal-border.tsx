"use client";

import React, { useEffect, useRef, useState, forwardRef } from "react";
import { gsap } from "gsap";

export interface YcnSignalBorderProps {
  children: React.ReactNode;
  mode?: "interactive" | "accent" | "ambient" | "continuous";
  className?: string;
  borderRadius?: number;
  active?: boolean;
  id?: string;
  style?: React.CSSProperties;
  "data-testid"?: string;
}

/**
 * YcnSignalBorder
 *
 * Core YCN animated border primitive:
 * - A point of energy / signal traveling along a technical datum line.
 * - Derived from the luminous signal endpoint in the YCN Labs identity.
 * - Modes:
 *   * interactive: calm/static base border, one single signal pass on hover/focus.
 *   * continuous: subtle continuous moving signal border (calm 80 px/s loop) with hover/focus/active enhancement.
 *   * accent: slightly enhanced visibility for primary actions.
 *   * ambient: very slow, restrained continuous sweep reserved for key conversion controls.
 * - Claude E4 Progressive Enhancement & Gate B2 Engine:
 *   * Feature-detects CSS Houdini / modern animation support.
 *   * Continuous mode: distance-based phase driven by shared gsap.ticker at 80 px/s (±5%).
 *   * Preserves exact physical travel distance across resize/morphing without position jumps.
 *   * Off-screen and background tab pausing via IntersectionObserver + visibilitychange.
 *   * Under prefers-reduced-motion, renders a crisp static composed frame (static highlight).
 *   * 100% theme-aware using CSS variables (--action-blue, --border-subtle, --signal-cyan).
 *   * Cyan is strictly contained to the optical signal point and never text.
 */
export const YcnSignalBorder = forwardRef<HTMLDivElement, YcnSignalBorderProps>(
  function YcnSignalBorder(
    {
      children,
      mode = "interactive",
      className = "",
      borderRadius = 8,
      active = false,
      id,
      style,
      "data-testid": dataTestId,
    },
    ref
  ) {
  const [mounted, setMounted] = useState(false);
  const [supportsAdvancedAnimation, setSupportsAdvancedAnimation] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // SVG path dimensions follow the actual menu-pill width, including GSAP's
  // desktop expand/collapse. Unlike a rotated conic square, this makes the
  // luminous dash traverse the *entire* rounded perimeter on every viewport.
  const orbitSvgRef = useRef<SVGSVGElement>(null);
  const orbitRectRef = useRef<SVGRectElement>(null);
  const actualPerimeterRef = useRef<number>(250.38);
  const distanceRef = useRef<number>(0);
  const [orbitSize, setOrbitSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
    // Feature detect CSS @property / animation composition support
    try {
      const isPropertySupported =
        typeof window !== "undefined" &&
        typeof (window as unknown as { CSS?: { registerProperty?: unknown } }).CSS?.registerProperty === "function";
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsReducedMotion(prefersReduced);
      // SVG dash-offset motion does not require CSS Houdini. Keep the original
      // advanced-gradient fallback policy for non-continuous CTA variants.
      const isContinuousMode = mode === "continuous";
      setSupportsAdvancedAnimation(
        isContinuousMode ? true : (isPropertySupported && !prefersReduced)
      );
    } catch {
      setSupportsAdvancedAnimation(false);
    }
  }, [mode]);

  useEffect(() => {
    if (!mounted || mode !== "continuous") return;
    const svg = orbitSvgRef.current;
    if (!svg) return;

    const measure = () => {
      const rect = svg.getBoundingClientRect();
      const width = Math.max(0, Math.round(rect.width * 10) / 10);
      const height = Math.max(0, Math.round(rect.height * 10) / 10);
      if (width < 4 || height < 4) return;
      setOrbitSize((prior) =>
        prior.width === width && prior.height === height ? prior : { width, height }
      );
    };
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(svg);
    if (!observer) window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      if (!observer) window.removeEventListener("resize", measure);
    };
  }, [mounted, mode]);

  // Animation timing & intensity per mode
  const isContinuous = mode === "continuous";
  const isAmbient = mode === "ambient";
  const isAccent = mode === "accent";
  const isInteractive = mode === "interactive";

  // Inset rectangle path coordinates (stroke centerline):
  // <rect x={1.25} y={1.25} width={rectW} height={rectH} rx={rectRx} strokeWidth={2.25} />
  const rectW = Math.max(0, orbitSize.width - 2.5);
  const rectH = Math.max(0, orbitSize.height - 2.5);
  const rectRx = Math.max(0, rectH / 2);
  const straightLen = Math.max(0, rectW - 2 * rectRx);
  const perimeter = Math.max(10, 2 * straightLen + Math.PI * rectH);
  const dashPct = Math.min(45, Math.max(2, (24 / perimeter) * 100));
  const strokeDasharray = `${dashPct.toFixed(2)} ${(100 - dashPct).toFixed(2)}`;

  // Keep actualPerimeterRef in sync with measured inset perimeter
  actualPerimeterRef.current = perimeter;

  // NAV-07 / Gate B2: Shared rAF Ticker & Monotonic Distance-Based Phase Engine
  // Target physical travel speed: 80 px/s (±5%).
  // Uses gsap.ticker (the single approved animation clock) to accumulate distance = distance + deltaTime/1000 * 80 px.
  // Physical offset along path = distance % perimeter.
  // Preserves exact travel distance through resize/morph (no position jumps).
  // Automatically suspends decorative ticker when hidden (visibilitychange) or off-screen (IntersectionObserver).
  useEffect(() => {
    if (!mounted || mode !== "continuous") return;
    const svg = orbitSvgRef.current;
    if (!svg) return;

    if (isReducedMotion) {
      // Gate B2: Static composed frame under prefers-reduced-motion (no ticker, visible static highlight)
      if (orbitRectRef.current) {
        orbitRectRef.current.style.strokeDashoffset = "0";
        orbitRectRef.current.setAttribute("stroke-dashoffset", "0");
      }
      return;
    }

    const TARGET_SPEED_PX_PER_SEC = 80;
    let isRunning = false;

    const onTick = (_time: number, deltaTime: number) => {
      const el = orbitRectRef.current;
      if (!el) return;
      const L = actualPerimeterRef.current;
      if (L <= 0) return;
      const dtSec = Math.min(0.1, Math.max(0, deltaTime / 1000));
      distanceRef.current = (distanceRef.current + dtSec * TARGET_SPEED_PX_PER_SEC) % L;
      const posUnits = (distanceRef.current / L) * 100;
      const offset = (-posUnits).toFixed(3);
      el.style.strokeDashoffset = offset;
      el.setAttribute("stroke-dashoffset", offset);
    };

    const startTicker = () => {
      if (isRunning) return;
      isRunning = true;
      gsap.ticker.add(onTick);
    };

    const stopTicker = () => {
      if (!isRunning) return;
      isRunning = false;
      gsap.ticker.remove(onTick);
    };

    // Off-screen pause via IntersectionObserver
    let isIntersecting = true;
    let isDocVisible = typeof document !== "undefined" ? !document.hidden : true;

    const updatePlayState = () => {
      if (isIntersecting && isDocVisible) {
        startTicker();
      } else {
        stopTicker();
      }
    };

    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((entries) => {
          for (const entry of entries) {
            isIntersecting = entry.isIntersecting;
            updatePlayState();
          }
        }, { threshold: 0.01 })
      : null;

    observer?.observe(svg);

    // Tab visibility pause
    const handleVisibility = () => {
      isDocVisible = typeof document !== "undefined" ? !document.hidden : true;
      updatePlayState();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Call updatePlayState() at start, not startTicker() blindly
    updatePlayState();

    return () => {
      stopTicker();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mounted, mode, isReducedMotion]);

  return (
    <div
      ref={ref}
      id={id}
      data-testid={dataTestId}
      className={`relative inline-flex ${borderRadius === 999 ? "w-full h-full" : ""} p-[1px] group/signal overflow-hidden ${className}`}
      style={{ borderRadius: `${borderRadius}px`, ...style }}
    >
      {/* Background static base border (fallback & baseline) */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] border border-[var(--border-subtle)] pointer-events-none transition-colors duration-300 group-hover/signal:border-[var(--action-blue)]/50"
      />

      {/* Continuous mode: one dash travels a normalized 100-unit SVG outline.
          ResizeObserver recalculates the real rounded rectangle through every
          expanded/collapsed menu width, including 375px mobile layouts.
          Dynamic dash calculation keeps the highlight ~24px long at any width.
          Shared gsap.ticker drives monotonic distance-based phase at 80 px/s. */}
      {mounted && isContinuous && (
        <svg
          ref={orbitSvgRef}
          aria-hidden="true"
          focusable="false"
          className={`absolute inset-0 z-20 h-full w-full pointer-events-none transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-60 group-hover/signal:opacity-100 group-focus-within/signal:opacity-100"
          }`}
          viewBox={`0 0 ${Math.max(1, orbitSize.width)} ${Math.max(1, orbitSize.height)}`}
          preserveAspectRatio="none"
        >
          {supportsAdvancedAnimation && orbitSize.width > 4 && orbitSize.height > 4 && (
            <rect
              ref={orbitRectRef}
              x={1.25}
              y={1.25}
              width={rectW}
              height={rectH}
              rx={rectRx}
              fill="none"
              stroke="var(--signal-cyan)"
              strokeWidth={2.25}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={100}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={0}
              style={{
                animation: "none",
                strokeDashoffset: isReducedMotion ? "0" : undefined,
              }}
              className="ycn-navbar-perimeter-orbit"
            />
          )}
        </svg>
      )}

      {/* Other signal modes retain the pre-existing progressive enhancement (R6 protection for Hero button). */}
      {mounted && supportsAdvancedAnimation && !isContinuous && (
        <span
          aria-hidden="true"
          className={`absolute -inset-[150%] pointer-events-none transition-opacity duration-400 motion-reduce:hidden ${
            isAmbient
              ? "opacity-80 animate-[spin_8s_linear_infinite]"
              : isAccent || active
              ? "opacity-90 group-hover/signal:opacity-100 animate-[spin_4s_linear_infinite]"
              : isInteractive
              ? "opacity-0 group-hover/signal:opacity-100 group-focus-within/signal:opacity-100 animate-[spin_3s_linear_infinite]"
              : "opacity-0"
          }`}
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 310deg, var(--signal-cyan) 345deg, var(--action-blue) 355deg, #FFFFFF 360deg)`,
          }}
        />
      )}

      {/* Inner surface mask container */}
      <div className="relative z-10 w-full h-full rounded-[inherit] overflow-hidden">
        {children}
      </div>
    </div>
  );
});

YcnSignalBorder.displayName = "YcnSignalBorder";
