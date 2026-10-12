"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TheTurnSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const secondLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!trackRef.current || !secondLineRef.current) return;

      gsap.fromTo(
        secondLineRef.current,
        { opacity: 0.15, y: 16 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="the-turn-root"
      aria-label="Editorial statement: Software, engineered to hold up"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]"
    >
      <div
        ref={trackRef}
        className="min-h-[70vh] lg:min-h-[110vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center select-text"
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block type-kicker text-[var(--action-blue)]">
            Standard & Commitment
          </span>

          <h2 className="type-display-page text-[var(--text-primary)] font-display leading-[1.05]">
            <span className="block">Software,</span>
            <span
              ref={secondLineRef}
              className="block text-[var(--text-secondary)] transition-colors duration-300"
            >
              engineered to hold up.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
