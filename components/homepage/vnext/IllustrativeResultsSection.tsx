"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function IllustrativeResultsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pathRisingRef = useRef<SVGPathElement>(null);
  const pathFallingRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (pathRisingRef.current && pathFallingRef.current) {
        const risingLength = pathRisingRef.current.getTotalLength();
        const fallingLength = pathFallingRef.current.getTotalLength();

        gsap.set(pathRisingRef.current, {
          strokeDasharray: risingLength,
          strokeDashoffset: risingLength,
        });
        gsap.set(pathFallingRef.current, {
          strokeDasharray: fallingLength,
          strokeDashoffset: fallingLength,
        });

        gsap.to([pathRisingRef.current, pathFallingRef.current], {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="illustrative-results-root"
      aria-label="Illustrative process model"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono font-semibold uppercase tracking-wider text-[var(--action-blue)]">
            <Info className="w-3.5 h-3.5" />
            <span>Illustrative model</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-display">
            What structured workflow changes.
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            When customer requests arrive into an owned workflow instead of an unmanaged inbox, two directional patterns emerge.
          </p>
        </div>

        {/* Visual Charts Container (Inline SVG/DOM only, zero chart libraries) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Chart 1: Requests That Reach Someone (Rising) */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between space-y-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold">
                  Directional Trend · Rising
                </span>
                <h3 className="text-xl font-bold text-[var(--text-primary)] font-display">
                  Requests that reach someone
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Clear ownership ensures customer enquiries are acknowledged and moving forward.
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            {/* SVG Trend Graph (No numbers, pure directional trend curve) */}
            <div className="relative w-full h-40 bg-[var(--bg-canvas)] rounded-xl border border-[var(--border-subtle)] p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] uppercase">
                <span>Before structure</span>
                <span>With ownership</span>
              </div>

              <svg
                className="w-full h-24 overflow-visible"
                viewBox="0 0 300 80"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Subtle Grid line */}
                <line
                  x1="0"
                  y1="75"
                  x2="300"
                  y2="75"
                  stroke="var(--border-subtle)"
                  strokeWidth="1"
                />
                {/* Gradient area */}
                <defs>
                  <linearGradient id="risingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 70 C 80 65, 160 40, 290 10 L 290 75 L 10 75 Z"
                  fill="url(#risingGrad)"
                />
                {/* Rising Trend Line */}
                <path
                  ref={pathRisingRef}
                  d="M 10 70 C 80 65, 160 40, 290 10"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* End Point Marker */}
                <circle cx="290" cy="10" r="4.5" fill="#10B981" />
              </svg>

              <div className="text-right text-[10px] font-mono text-emerald-500 font-semibold">
                Rising ownership trend
              </div>
            </div>
          </div>

          {/* Chart 2: Requests Waiting (Falling) */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between space-y-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--action-blue)] font-semibold">
                  Directional Trend · Falling
                </span>
                <h3 className="text-xl font-bold text-[var(--text-primary)] font-display">
                  Requests waiting
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Unassigned items and overlooked enquiries are reduced as each has a defined next step.
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[var(--action-blue)]/10 text-[var(--action-blue)] flex items-center justify-center shrink-0">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>

            {/* SVG Trend Graph (No numbers, pure directional trend curve) */}
            <div className="relative w-full h-40 bg-[var(--bg-canvas)] rounded-xl border border-[var(--border-subtle)] p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] uppercase">
                <span>Before structure</span>
                <span>With ownership</span>
              </div>

              <svg
                className="w-full h-24 overflow-visible"
                viewBox="0 0 300 80"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Subtle Grid line */}
                <line
                  x1="0"
                  y1="75"
                  x2="300"
                  y2="75"
                  stroke="var(--border-subtle)"
                  strokeWidth="1"
                />
                {/* Gradient area */}
                <defs>
                  <linearGradient id="fallingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--action-blue)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--action-blue)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 15 C 90 20, 180 50, 290 70 L 290 75 L 10 75 Z"
                  fill="url(#fallingGrad)"
                />
                {/* Falling Trend Line */}
                <path
                  ref={pathFallingRef}
                  d="M 10 15 C 90 20, 180 50, 290 70"
                  fill="none"
                  stroke="var(--action-blue)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* End Point Marker */}
                <circle cx="290" cy="70" r="4.5" fill="var(--action-blue)" />
              </svg>

              <div className="text-right text-[10px] font-mono text-[var(--action-blue)] font-semibold">
                Falling latency trend
              </div>
            </div>
          </div>
        </div>

        {/* Textual Accessibility Table for Screen Readers */}
        <div className="sr-only">
          <table>
            <caption>Illustrative process model summary</caption>
            <thead>
              <tr>
                <th scope="col">Workflow Dimension</th>
                <th scope="col">Direction</th>
                <th scope="col">Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Requests that reach someone</td>
                <td>Rising</td>
                <td>Increases with defined ownership and direct assignment.</td>
              </tr>
              <tr>
                <td>Requests waiting</td>
                <td>Falling</td>
                <td>Decreases as unassigned items are given immediate next steps.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mandatory Factual Disclosure */}
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-center text-xs text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
          <p>
            Example workflow — not measured business results. Your numbers depend on your business.
          </p>
        </div>
      </div>
    </section>
  );
}
