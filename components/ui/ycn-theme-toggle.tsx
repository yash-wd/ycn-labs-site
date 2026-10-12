"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export interface YcnThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

/**
 * YcnThemeToggle
 *
 * Smooth native theme switch primitive inspired by the 21st.dev View Transitions pattern:
 * - Native document.startViewTransition() with radial clip reveal from the button coordinate.
 * - Zero external animation dependencies (no Framer Motion).
 * - Instant fallback for browsers without View Transitions API or under prefers-reduced-motion.
 * - Full integration with next-themes, preserving SSR hydration, persistence, and token consistency.
 * - Accessible state label describing action: "Switch to dark theme" / "Switch to light theme".
 * - Min 44x44px interactive tap target.
 */
export function YcnThemeToggle({ className = "", size = "md" }: YcnThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" || theme === "dark" : true;
  const nextTheme = isDark ? "light" : "dark";
  const actionLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

  const toggleTheme = useCallback(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Direct switch if View Transitions API is unsupported or reduced motion requested
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      prefersReduced
    ) {
      setTheme(nextTheme);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const isGoingDark = nextTheme === "dark";
    document.documentElement.dataset.themeTransition = isGoingDark ? "light-to-dark" : "dark-to-light";

    const transition = (
      document as unknown as {
        startViewTransition: (callback: () => void) => { ready: Promise<void>; finished?: Promise<void> };
      }
    ).startViewTransition(() => {
      // Synchronous DOM mutation inside startViewTransition callback (Claude E2)
      flushSync(() => {
        setTheme(nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      });
    });

    const duration = 780; // Approximately 700-850ms tuned per visual acceptance (target: ~780ms)
    const easing = "cubic-bezier(0.32, 0, 0.24, 1)";

    transition.ready
      .then(() => {
        if (isGoingDark) {
          // LIGHT -> DARK: Dark theme ::view-transition-new(root) expands outward from toggle
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration,
              easing,
              pseudoElement: "::view-transition-new(root)",
            }
          );
        } else {
          // DARK -> LIGHT: Dark theme ::view-transition-old(root) contracts smoothly back into toggle
          const toggleRadius = rect ? Math.max(rect.width, rect.height) / 2 : 18;
          document.documentElement.animate(
            {
              clipPath: [
                `circle(${endRadius}px at ${x}px ${y}px)`,
                `circle(${toggleRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration,
              easing,
              pseudoElement: "::view-transition-old(root)",
            }
          );
        }
      })
      .catch(() => {
        delete document.documentElement.dataset.themeTransition;
      });

    if (transition.finished) {
      transition.finished.finally(() => {
        delete document.documentElement.dataset.themeTransition;
      });
    } else {
      setTimeout(() => {
        delete document.documentElement.dataset.themeTransition;
      }, duration + 100);
    }
  }, [nextTheme, setTheme]);

  const targetSizeClasses = size === "sm" ? "w-9 h-9 min-h-[36px] min-w-[36px]" : "w-11 h-11 min-h-[44px] min-w-[44px]";

  return (
    <button
      id="navbar-theme-toggle"
      data-testid="navbar-theme-toggle"
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={actionLabel}
      title={actionLabel}
      className={`group relative inline-flex items-center justify-center rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--action-blue)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] cursor-pointer ${targetSizeClasses} ${className}`}
    >
      <span className="relative flex items-center justify-center w-full h-full">
        {/* Sun Icon (shown in dark mode) */}
        <Sun
          className={`w-4 h-4 transition-all duration-[780ms] ease-[cubic-bezier(0.32,0,0.24,1)] transform ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50 absolute"
          }`}
          aria-hidden="true"
        />
        {/* Moon Icon (shown in light mode) */}
        <Moon
          className={`w-4 h-4 transition-all duration-[780ms] ease-[cubic-bezier(0.32,0,0.24,1)] transform ${
            isDark
              ? "opacity-0 rotate-90 scale-50 absolute"
              : "opacity-100 rotate-0 scale-100"
          }`}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
