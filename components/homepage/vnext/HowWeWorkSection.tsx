"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "01",
    name: "Talk",
    description: "Tell us what is happening.",
  },
  {
    num: "02",
    name: "Understand",
    description: "We study the problem before choosing technology.",
  },
  {
    num: "03",
    name: "Plan",
    description: "We agree what should be built and what is out of scope.",
  },
  {
    num: "04",
    name: "Design",
    description: "You can see and review the experience before full implementation.",
  },
  {
    num: "05",
    name: "Build",
    description: "We engineer the agreed solution.",
  },
  {
    num: "06",
    name: "Test",
    description: "We check important behavior under real conditions.",
  },
  {
    num: "07",
    name: "Launch",
    description: "We put the approved version into production.",
  },
  {
    num: "08",
    name: "Improve",
    description: "Ongoing support/improvements happen according to the agreement.",
  },
];

export function HowWeWorkSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!trackRef.current) return;

      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const stepIndex = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length)
          );
          setActiveStep(stepIndex);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="how-we-work-root"
      aria-label="How we work: Eight step methodology"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]"
    >
      {/* ============================================================== */}
      {/* 1. DESKTOP STABLE-FRAME TREATMENT (~300vh Working Area)       */}
      {/* ============================================================== */}
      {!isReducedMotion ? (
        <div ref={trackRef} className="hidden lg:block relative h-[300vh] w-full">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center px-8 lg:px-16 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center">
              {/* Left Column: Stable Headline & Reassurance (5 cols) */}
              <div className="col-span-5 space-y-6 select-text">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--action-blue)] font-mono">
                  Methodology · Eight Steps
                </span>

                {/* Ratified H1/H2 Headline */}
                <h2 className="text-4xl xl:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-display leading-[1.1]">
                  You know your business. We know technology.
                </h2>

                {/* Ratified Reassurance */}
                <p className="text-base text-[var(--text-secondary)] leading-relaxed pt-2 flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--action-blue)] shrink-0 mt-0.5" />
                  <span>You don’t need to arrive with a technical specification.</span>
                </p>

                {/* Progress Counter */}
                <div className="pt-4 font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
                  <span className="text-[var(--action-blue)] font-bold text-sm">
                    {STEPS[activeStep].num}
                  </span>
                  <span>/ 08</span>
                  <span className="text-[var(--text-secondary)] ml-2">
                    — {STEPS[activeStep].name}
                  </span>
                </div>
              </div>

              {/* Right Column: Progressive Step Showcase (7 cols) */}
              <div className="col-span-7 relative flex items-center">
                {/* Step List Progression */}
                <div className="w-full space-y-3">
                  {STEPS.map((step, idx) => {
                    const isActive = idx === activeStep;
                    const isPast = idx < activeStep;

                    return (
                      <div
                        key={step.num}
                        className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                          isActive
                            ? "bg-[var(--bg-surface-elevated)] border-[var(--action-blue)] shadow-lg scale-[1.02]"
                            : isPast
                            ? "bg-[var(--bg-surface)] border-[var(--border-subtle)] opacity-70"
                            : "bg-[var(--bg-surface)]/40 border-transparent opacity-35"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`font-mono text-sm font-bold w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              isActive
                                ? "bg-[var(--action-blue)] text-[var(--text-on-action)]"
                                : isPast
                                ? "bg-[var(--bg-surface-elevated)] text-[var(--action-blue)] border border-[var(--border-subtle)]"
                                : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
                            }`}
                          >
                            {step.num}
                          </span>
                          <div>
                            <span
                              className={`text-base font-bold font-display block ${
                                isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                              }`}
                            >
                              {step.name}
                            </span>
                            <span className="text-xs text-[var(--text-secondary)] mt-0.5 block">
                              {step.description}
                            </span>
                          </div>
                        </div>

                        {isActive && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--action-blue)] font-semibold px-2 py-0.5 rounded bg-[var(--action-blue)]/10">
                            Active Step
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Reduced Motion Fallback for Desktop */
        <div className="hidden lg:block py-20 px-8 max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] font-display">
              You know your business. We know technology.
            </h2>
            <p className="text-base text-[var(--text-secondary)]">
              You don’t need to arrive with a technical specification.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--action-blue)]">
                    {step.num}
                  </span>
                  <span className="text-base font-bold text-[var(--text-primary)] font-display">
                    {step.name}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. MOBILE NORMAL STACKED DOCUMENT FLOW (< lg)                  */}
      {/* ============================================================== */}
      <div className="block lg:hidden px-4 sm:px-6 py-16 space-y-8 select-text">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--action-blue)] font-mono">
            Methodology · Eight Steps
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] font-display leading-tight">
            You know your business. We know technology.
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex items-start gap-2 pt-1">
            <CheckCircle2 className="w-4 h-4 text-[var(--action-blue)] shrink-0 mt-0.5" />
            <span>You don’t need to arrive with a technical specification.</span>
          </p>
        </div>

        {/* Stacked Step Cards */}
        <div className="space-y-3">
          {STEPS.map((step) => (
            <div
              key={`m-${step.num}`}
              className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-start gap-3.5"
            >
              <span className="font-mono text-xs font-bold w-6 h-6 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--action-blue)] flex items-center justify-center shrink-0 mt-0.5">
                {step.num}
              </span>
              <div>
                <span className="text-sm font-bold text-[var(--text-primary)] font-display block">
                  {step.name}
                </span>
                <span className="text-xs text-[var(--text-secondary)] mt-0.5 block leading-relaxed">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
