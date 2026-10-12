"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Laptop3D } from "@/components/devices/Laptop3D";
import { BusinessScreenView } from "./BusinessScreenView";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function EditorialLaptopPortalSection() {
  const containerRef = useRef<HTMLElement>(null);
  const desktopPortalTriggerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const laptopRigRef = useRef<HTMLDivElement>(null);
  const fullScreenOverlayRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [screenDim, setScreenDim] = useState(0.85);
  const [bezelOpacity, setBezelOpacity] = useState(1);
  const [portalProgress, setPortalProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!desktopPortalTriggerRef.current || !laptopRigRef.current) return;

      // Master Desktop 200vh Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopPortalTriggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            setPortalProgress(p);

            // Band 1: 0% – 25% (Quiet -> Awake)
            if (p <= 0.25) {
              const dim = 0.85 * (1 - p / 0.25);
              setScreenDim(Math.max(0, dim));
              setBezelOpacity(1);
            } else if (p <= 0.7) {
              // Band 2: 25% – 70% (Camera Push)
              setScreenDim(0);
              setBezelOpacity(1);
            } else {
              // Band 3: 70% – 100% (Screen becomes the page)
              setScreenDim(0);
              const bOpacity = Math.max(0, 1 - (p - 0.7) / 0.25);
              setBezelOpacity(bOpacity);
            }
          },
          onToggle: (self) => {
            if (laptopRigRef.current) {
              laptopRigRef.current.style.willChange = self.isActive
                ? "transform, opacity"
                : "auto";
            }
          },
        },
      });

      // Semantic Animation Steps
      // 1. Headline & Support: visible at 0%, fade out between 20% and 45%
      if (headlineRef.current) {
        tl.to(
          headlineRef.current,
          {
            opacity: 0,
            y: -30,
            ease: "power1.inOut",
            duration: 0.4,
          },
          0.15
        );
      }

      // 2. Camera Push: Scale laptop from 1.0 -> 2.1 (screen fills viewport at ~1440x900)
      tl.to(
        laptopRigRef.current,
        {
          scale: 2.15,
          y: "8%",
          ease: "power2.inOut",
          duration: 0.7,
        },
        0.2
      );

      // 3. Full-screen Portal Surface: Fades in seamlessly as bezel scales beyond viewport
      if (fullScreenOverlayRef.current) {
        tl.fromTo(
          fullScreenOverlayRef.current,
          { opacity: 0, pointerEvents: "none" },
          { opacity: 1, pointerEvents: "auto", ease: "power1.in", duration: 0.3 },
          0.7
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
      id="editorial-laptop-portal"
      aria-label="Editorial reset and product portal"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] overflow-visible"
    >
      {/* 1. EDITORIAL RESET — EXACT RATIFIED COPY (Breathing space section) */}
      <div
        id="editorial-reset"
        className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-24 select-text"
        aria-label="Editorial transition"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Eyebrow / Transition Indicator */}
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--action-blue)] font-mono">
            Behind the screen
          </span>

          {/* Ratified Lead */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] font-display">
            The product people see is only the beginning.
          </h2>

          {/* Ratified Support */}
          <p className="text-lg sm:text-xl lg:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            What happens after someone acts matters just as much.
          </p>
        </div>
      </div>

      {/* 2. DESKTOP LAPTOP PORTAL: PINNED STAGE (~220vh) */}
      {!isReducedMotion ? (
        <div
          ref={desktopPortalTriggerRef}
          className="hidden lg:block relative h-[220vh] w-full"
        >
          {/* Sticky Viewport Stage */}
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-canvas)]">
            {/* Ratified Copy Header (0% - 25% prominent, fades on zoom) */}
            <div
              ref={headlineRef}
              className="absolute top-[10vh] inset-x-0 mx-auto text-center px-6 max-w-2xl z-20 pointer-events-none select-text"
            >
              <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight font-display">
                Simple outside. Structured inside.
              </h2>
              <p className="text-base xl:text-lg text-[var(--text-secondary)] leading-relaxed mt-2.5">
                Customers get a clear experience. Your team gets the information,
                ownership and next step behind it.
              </p>
            </div>

            {/* Laptop Rig (Scales toward camera) */}
            <div
              ref={laptopRigRef}
              className="relative w-full max-w-[780px] xl:max-w-[860px] flex items-center justify-center pt-16 z-10 origin-center transition-transform"
            >
              <Laptop3D
                screenDimOpacity={screenDim}
                bezelOpacity={bezelOpacity}
                className="w-full"
              >
                <BusinessScreenView isFullScreen={false} />
              </Laptop3D>
            </div>

            {/* Viewport Portal Surface (Handoff surface for Phase 4 at 100% progress) */}
            <div
              ref={fullScreenOverlayRef}
              className="absolute inset-0 w-full h-full bg-[var(--bg-canvas)] z-30 flex flex-col justify-center items-center opacity-0 pointer-events-none"
              aria-label="Full-screen product surface"
            >
              <div className="w-full max-w-6xl px-6 sm:px-8 py-8">
                <div className="mb-4 text-center">
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--action-blue)] font-semibold">
                    Product Surface · Operational View
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] font-display mt-1">
                    Structured inside.
                  </h3>
                </div>
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] shadow-2xl overflow-hidden">
                  <BusinessScreenView isFullScreen={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* REDUCED MOTION DESKTOP PRESENTATION (No heavy scale/pinned stage) */
        <div className="hidden lg:block py-16 px-6 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] font-display">
              Simple outside. Structured inside.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mt-2">
              Customers get a clear experience. Your team gets the information,
              ownership and next step behind it.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] shadow-xl overflow-hidden p-6">
            <BusinessScreenView isFullScreen={true} />
          </div>
        </div>
      )}

      {/* 3. MOBILE SEPARATELY COMPOSED PRESENTATION (< lg) */}
      <div className="block lg:hidden px-4 sm:px-6 py-12 space-y-12">
        {/* Mobile Portal Headline & Support */}
        <div className="text-center space-y-2.5 max-w-md mx-auto select-text">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] leading-tight font-display">
            Simple outside. Structured inside.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Customers get a clear experience. Your team gets the information,
            ownership and next step behind it.
          </p>
        </div>

        {/* Mobile Restrained Laptop Object (90vw) */}
        <div className="w-[90vw] max-w-[400px] mx-auto">
          <Laptop3D screenAwake={true} screenDimOpacity={0} bezelOpacity={1}>
            <BusinessScreenView isFullScreen={false} />
          </Laptop3D>
        </div>

        {/* Mobile Full-Width Responsive Business Interface (No horizontal overflow) */}
        <div className="w-full pt-4">
          <div className="text-center mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--action-blue)] font-semibold">
              Live Business Pipeline
            </span>
          </div>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2">
            <BusinessScreenView isFullScreen={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
