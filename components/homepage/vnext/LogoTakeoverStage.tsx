"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LogoTakeoverStageProps {
  active: boolean;
  onHandoffComplete?: () => void;
}

export function LogoTakeoverStage({ active, onHandoffComplete }: LogoTakeoverStageProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const presLogoRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !active) {
      // In reduced motion or inactive, immediately reveal navbar and hero
      gsap.set(
        ["#navbar-logo-image", "#navbar-brand-name", "#navbar-nav-items", "#navbar-actions"],
        {
          opacity: 1,
          x: 0,
          y: 0,
          clearProps: "all",
        }
      );
      if (onHandoffComplete) onHandoffComplete();
      return;
    }

    setIsReady(true);

    const ctx = gsap.context(() => {
      const pres = presLogoRef.current;
      const backdrop = backdropRef.current;
      const scrollHint = scrollHintRef.current;
      const track = trackRef.current;
      const stage = stageRef.current;
      const target = document.getElementById("navbar-logo-target");

      if (!pres || !backdrop || !track || !stage) return;

      // Function to measure exact source and destination coordinates
      const measure = () => {
        if (!pres || !target) return { dx: 0, dy: 0, scale: 0.12 };

        // Temporarily clear inline transforms to measure true untransformed center
        gsap.set(pres, { clearProps: "transform" });

        // Measure currently visible theme variant per B3c instruction §5
        const visibleLogo =
          (Array.from(pres.children).find((el) => {
            return window.getComputedStyle(el).display !== "none";
          }) as HTMLElement) || pres;

        const presRect = visibleLogo.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const presCenterX = presRect.left + presRect.width / 2;
        const presCenterY = presRect.top + presRect.height / 2;

        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        const dx = targetCenterX - presCenterX;
        const dy = targetCenterY - presCenterY;
        const scale = targetRect.width / presRect.width;

        return { dx, dy, scale };
      };

      // Set initial states for clean entrance
      gsap.set(pres, { opacity: 1, scale: 1, x: 0, y: 0, transformOrigin: "center center" });
      gsap.set(backdrop, { opacity: 1 });
      gsap.set(scrollHint, { opacity: 1, y: 0 });
      gsap.set("#navbar-logo-image", { opacity: 0 });
      gsap.set("#navbar-brand-name", { opacity: 0, x: -8 });
      gsap.set("#navbar-nav-items", { opacity: 0, y: -12 });
      gsap.set("#navbar-actions", { opacity: 0, y: -12 });

      let { dx, dy, scale } = measure();

      // Master Scroll-Scrubbed Handoff Timeline (100vh scrub)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Once scrub passes 98%, trigger handoff completion callback
            if (self.progress >= 0.98 && onHandoffComplete) {
              onHandoffComplete();
            }
          },
          onLeave: () => {
            // Beyond the scroll track, hide takeover stage to prevent any pointer blocking
            gsap.set(stage, { visibility: "hidden" });
          },
          onEnterBack: () => {
            // Re-entering on reverse scroll, restore visibility immediately
            gsap.set(stage, { visibility: "visible" });
          },
        },
      });

      // 1. Scroll hint disappears early (0% -> 15%)
      tl.to(
        scrollHint,
        {
          opacity: 0,
          y: 10,
          duration: 0.15,
          ease: "none",
        },
        0
      );

      // 2. Logo scale & translation towards navbar target (0% -> 70%)
      tl.to(
        pres,
        {
          x: () => measure().dx,
          y: () => measure().dy,
          scale: () => measure().scale,
          duration: 0.7,
          ease: "power1.inOut",
        },
        0
      );

      // 3. Dark takeover backdrop dissolves to reveal Hero (35% -> 80%)
      tl.to(
        backdrop,
        {
          opacity: 0,
          duration: 0.45,
          ease: "power1.inOut",
        },
        0.35
      );

      // 4. Logo ownership swap: presentation logo fades out (70% -> 80%)
      tl.to(
        pres,
        {
          opacity: 0,
          duration: 0.1,
          ease: "none",
        },
        0.7
      );

      // 5. Real navbar logo fades in seamlessly (70% -> 80%)
      tl.to(
        "#navbar-logo-image",
        {
          opacity: 1,
          duration: 0.1,
          ease: "none",
        },
        0.7
      );

      // 6. Navbar brand name & nav items reveal with restrained stagger (80% -> 92%)
      tl.to(
        "#navbar-brand-name",
        {
          opacity: 1,
          x: 0,
          duration: 0.1,
          ease: "power2.out",
        },
        0.8
      );

      tl.to(
        "#navbar-nav-items",
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: "power2.out",
        },
        0.82
      );

      tl.to(
        "#navbar-actions",
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: "power2.out",
        },
        0.84
      );

      // 7. Hero unblurs/settles to 100% sharpness (85% -> 100%)
      tl.to(
        "#hero-media-layer",
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.15,
          ease: "none",
        },
        0.85
      );

      // Handle resize recalculations cleanly
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    });

    return () => {
      ctx.revert();
    };
  }, [active, onHandoffComplete]);

  if (!active && !isReady) return null;

  return (
    <>
      {/* Scroll track: drives the 100vh scroll hand-off */}
      <div
        ref={trackRef}
        id="logo-takeover-track"
        className="relative h-[100vh] w-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Fixed presentation stage: pinned during takeover */}
      <div
        ref={stageRef}
        id="logo-takeover-stage"
        className="fixed inset-0 z-30 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Full-screen dark backdrop */}
        <div
          ref={backdropRef}
          id="logo-takeover-backdrop"
          className="absolute inset-0 bg-[var(--bg-canvas)] pointer-events-auto"
        />

        {/* Presentation Logo: Held centered on the screen */}
        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
          <div
            ref={presLogoRef}
            id="presentation-logo"
            className="relative w-[280px] sm:w-[360px] md:w-[448px] aspect-[2048/1669] flex items-center justify-center"
          >
            {/* Dark-letter logo on light canvas */}
            <Image
              src="/brand/ycn-labs-full-light.png"
              alt="YCN Labs Logo"
              fill
              priority
              sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 448px"
              className="object-contain block dark:hidden"
            />
            {/* White-letter logo on dark canvas */}
            <Image
              src="/brand/ycn-labs-full-dark.png"
              alt="YCN Labs Logo"
              fill
              priority
              sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 448px"
              className="object-contain hidden dark:block"
            />
          </div>
        </div>

        {/* Restrained scroll hint: "Scroll to explore" */}
        <div
          ref={scrollHintRef}
          id="takeover-scroll-hint"
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-[var(--text-secondary)] pointer-events-none"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--text-secondary)]">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-[var(--border-strong)] flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </>
  );
}
