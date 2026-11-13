"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

// GPT review F2 (13 Nov 2026): the hero demonstration loops every 8 s, so visitors need a way
// to stop it (WCAG 2.2.2 Pause, Stop, Hide). The button sets data-paused on the enclosing
// figure; CSS pauses every animation inside .v3-stage. The choice is kept for this browser tab.
// Hidden under prefers-reduced-motion, where the hero is already a still frame.
const KEY = "ycn-hero-paused";

export function MotionToggle() {
  const ref = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") setPaused(true);
    } catch {
      /* storage unavailable: start playing */
    }
  }, []);

  useEffect(() => {
    const figure = ref.current?.closest(".v3-stage-wrap");
    if (!figure) return;
    if (paused) figure.setAttribute("data-paused", "");
    else figure.removeAttribute("data-paused");
    try {
      sessionStorage.setItem(KEY, paused ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [paused]);

  const Icon = paused ? Play : Pause;
  return (
    <button
      ref={ref}
      type="button"
      id="hero-motion-toggle"
      aria-pressed={paused}
      onClick={() => setPaused((p) => !p)}
      className="v3-motion-toggle -ml-3 inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center gap-2 rounded-control px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {paused ? "Play animation" : "Pause animation"}
    </button>
  );
}
