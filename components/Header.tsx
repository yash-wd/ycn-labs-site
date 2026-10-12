"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { isDevIntroReplay } from "@/components/homepage/vnext/entrance-diagnostics";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { YcnSignalBorder } from "@/components/ui/ycn-signal-border";
import { YcnThemeToggle } from "@/components/ui/ycn-theme-toggle";

/**
 * POLISH-NAV-04: Minimal Floating Navbar & Motion System
 * Authority: Owner Ruling 28 Sep 2026 (POLISH-NAV-04)
 *
 * Architecture & Defect Resolutions:
 * - Transparent Header: #navbar-root is visually transparent (no background fill, no blur, no borders, no shadow).
 * - Pointer Events Contract: #navbar-root has pointer-events-none; interactive children use pointer-events-auto.
 *   64px (h-16) fixed height preserved for docking geometry.
 * - Left Zone: Fixed YCN logo mark (#navbar-logo-target) preserved with exact geometry contract.
 * - Center Zone: Optically centered cluster (left: 50%, transform: translateX(-50%)) containing:
 *   [ Menu Capsule ] [ Theme Toggle ]
 *   - Menu Capsule: Explicit Owner-approved compact control exception (rounded-full, 44px height, min 44px tap target).
 *   - Continuous Signal Border: ~5s calm moving continuous light border, increasing emphasis on hover/focus/open.
 *   - Deliberate Menu Motion (POLISH-NAV-05): GSAP-driven sequenced opening (~650ms perceived) and closing (~540ms perceived) with reverse stagger and delayed collapse.
 *   - Desktop Expansion (>= 1024px): Symmetrically expands outward from the center Menu capsule.
 *   - Mobile Expansion (< 1024px): Deliberate vertical navigation panel with reverse-choreographed closing.
 * - Narrow Mobile Layout (< 640px):
 *   - Control cluster (Menu capsule + theme toggle) explicitly RIGHT-ANCHORED.
 *   - Standalone right-side CTA removed from collapsed header.
 *   - Canonical 'Start a Project' CTA placed INSIDE the opened mobile menu (min 44px tap target).
 *   - Logo remains fixed on the left with generous separation across 360px, 375px, 414px.
 * - Full-Navbar Backdrop Blur: 16px backdrop blur covering the full 64px header footprint without border or shadow, inert during entrance takeover.
 * - Site-Wide Shared Architecture: One shared Header globally mounted in root layout across all public routes.
 * - Theme Transition: Native View Transition (780ms) with radial expansion on LIGHT->DARK, true reverse radial contraction on DARK->LIGHT, and synchronized icon micro-motion.
 */
export function Header({ isTakeoverActive = false }: { isTakeoverActive?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isRailVisible, setIsRailVisible] = useState(false);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const desktopMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const desktopRailRef = useRef<HTMLDivElement>(null);
  const desktopShellRef = useRef<HTMLDivElement>(null);
  const hasDesktopOpenedRef = useRef(false);

  const pathname = usePathname();
  const [takeoverMode, setTakeoverMode] = useState(false);

  // Entrance Takeover Synchronization
  useEffect(() => {
    if (pathname === "/") {
      try {
        const devReplay = isDevIntroReplay();
        const isIntroParam =
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).get("intro") === "1";
        const isIntroZero =
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).get("intro") === "0";
        const forceReplay = devReplay || isIntroParam;
        const seen = !forceReplay && (isIntroZero || sessionStorage.getItem("ycn_v2_entrance_seen") === "true");
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (forceReplay || (!seen && !prefersReduced)) {
          setTakeoverMode(true);
        } else {
          setTakeoverMode(false);
        }
      } catch {
        setTakeoverMode(false);
      }

      const handleRelease = () => setTakeoverMode(false);
      const handleActive = () => setTakeoverMode(true);
      window.addEventListener("ycn:takeover-release", handleRelease);
      window.addEventListener("ycn:takeover-active", handleActive);

      return () => {
        window.removeEventListener("ycn:takeover-release", handleRelease);
        window.removeEventListener("ycn:takeover-active", handleActive);
      };
    } else {
      setTakeoverMode(false);
      // Clean up any lingering opacity overrides if navigating away from homepage (Claude E3)
      const header = document.querySelector("header");
      if (header) {
        gsap.set(header, { opacity: 1, clearProps: "opacity" });
      }
    }
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Escape key handler: closes desktop rail or mobile menu, restoring focus to trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isDesktopExpanded) {
          setIsDesktopExpanded(false);
          desktopMenuTriggerRef.current?.focus();
        }
        if (isMenuOpen) {
          setIsMenuOpen(false);
          desktopMenuTriggerRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDesktopExpanded, isMenuOpen]);

  // Viewport resize handler: close appropriate menu when crossing the 1024px desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (window.innerWidth < 1024 && isDesktopExpanded) {
        setIsDesktopExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, isDesktopExpanded]);

  // Close menus on route navigation
  useEffect(() => {
    setIsDesktopExpanded(false);
    setIsMenuOpen(false);
  }, [pathname]);

  // Mobile Menu Focus Trap
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !mobileSheetRef.current) return;
      const focusableEls = mobileSheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length === 0) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTabKey);
    return () => window.removeEventListener("keydown", handleTabKey);
  }, [isMenuOpen]);

  // Non-destructive mobile scroll lock:
  // Intercepts touchmove and wheel outside mobile-nav-sheet without setting overflow on document body
  // so ScrollTrigger pins and scroll measurements remain undisturbed (scrollY delta = 0).
  useEffect(() => {
    if (!isMenuOpen) return;

    const preventBackgroundTouch = (e: TouchEvent) => {
      const sheet = mobileSheetRef.current;
      if (sheet && sheet.contains(e.target as Node)) {
        return;
      }
      e.preventDefault();
    };

    const preventBackgroundWheel = (e: WheelEvent) => {
      const sheet = mobileSheetRef.current;
      if (sheet && sheet.contains(e.target as Node)) {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventBackgroundTouch, { passive: false });
    document.addEventListener("wheel", preventBackgroundWheel, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventBackgroundTouch);
      document.removeEventListener("wheel", preventBackgroundWheel);
    };
  }, [isMenuOpen]);

  // Desktop Menu Morph Motion (POLISH-NAV-06: single persistent shell width interpolation)
  useEffect(() => {
    const shell = desktopShellRef.current;
    const trigger = desktopMenuTriggerRef.current;
    const rail = desktopRailRef.current;
    if (!shell || !trigger || !rail) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      if (isDesktopExpanded) {
        setIsRailVisible(true);
        gsap.set(trigger, { opacity: 0, pointerEvents: "none" });
        gsap.set(rail, { opacity: 1, pointerEvents: "auto" });
        gsap.set(shell, { width: 484 });
      } else {
        setIsRailVisible(false);
        gsap.set(trigger, { opacity: 1, pointerEvents: "auto" });
        gsap.set(rail, { opacity: 0, pointerEvents: "none" });
        gsap.set(shell, { width: 104 });
      }
      return;
    }

    const items = rail.querySelectorAll("nav > a, button, #navbar-close-button");
    if (isDesktopExpanded) {
      hasDesktopOpenedRef.current = true;
      gsap.killTweensOf([shell, trigger, rail, items]);

      // Calculate required expanded width dynamically from rail's scrollWidth
      const targetExpandedWidth = Math.max(484, Math.ceil(rail.scrollWidth) + 4);
      const collapsedWidth = 104;

      gsap.set(rail, { opacity: 1, pointerEvents: "auto" });
      gsap.set(items, { opacity: 0, x: -8 });

      const tl = gsap.timeline();
      // 0–80ms: Trigger glyph/button begins transforming out
      tl.to(
        trigger,
        {
          opacity: 0,
          duration: 0.10,
          ease: "power2.out",
          pointerEvents: "none",
        },
        0
      );
      // 0–580ms: Expansion shell grows continuously from collapsed width to measured expanded width
      tl.fromTo(
        shell,
        { width: collapsedWidth },
        {
          width: targetExpandedWidth,
          duration: 0.58, // 580ms (target: 540-600ms)
          ease: "power3.out",
        },
        0
      );

      // C/D. After ~90ms, links begin appearing with 50ms stagger (duration ~360ms)
      tl.to(
        items,
        {
          opacity: 1,
          x: 0,
          duration: 0.36,
          stagger: 0.05, // 50ms stagger (target: 45-60ms)
          ease: "power2.out",
        },
        0.09 // 90ms delay after shell begins
      );
    } else if (hasDesktopOpenedRef.current) {
      gsap.killTweensOf([shell, trigger, rail, items]);

      const currentWidth = shell.getBoundingClientRect().width || 484;
      const collapsedWidth = 104;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsRailVisible(false);
          gsap.set(rail, { opacity: 0, pointerEvents: "none" });
          gsap.set(shell, { width: collapsedWidth });
        },
      });

      // A. Links leave first, reverse stagger
      tl.to(
        items,
        {
          opacity: 0,
          x: 4,
          duration: 0.22,
          stagger: {
            each: 0.03,
            from: "end", // reverse stagger
          },
          ease: "power2.in",
        },
        0
      );

      // B. Expansion shell collapses (480ms power2.inOut)
      tl.to(
        shell,
        {
          width: collapsedWidth,
          duration: 0.48, // 480ms (target: 480-580ms)
          ease: "power2.inOut",
        },
        0.06
      );

      // C. Trigger button fades back in near end of shell contraction
      tl.to(
        trigger,
        {
          opacity: 1,
          duration: 0.18,
          ease: "power2.out",
          pointerEvents: "auto",
        },
        0.36
      );
    }
  }, [isDesktopExpanded]);

  // Mobile Sheet Motion (POLISH-NAV-05: vertical panel 520ms power3.out, items delayed 80ms w/ 45ms stagger; reverse close 420ms power2.inOut)
  useEffect(() => {
    const sheet = mobileSheetRef.current;
    if (!sheet) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      if (!isMenuOpen) {
        setIsSheetVisible(false);
      }
      return;
    }

    const items = sheet.querySelectorAll("nav > a, #mobile-menu-cta-button");

    if (isMenuOpen) {
      setIsSheetVisible(true);
      gsap.killTweensOf([sheet, items]);
      gsap.set(sheet, { opacity: 0, y: -10, scale: 0.95, transformOrigin: "top center" });

      const tl = gsap.timeline();
      tl.to(sheet, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.52, // 520ms deliberate opening
        ease: "power3.out",
      });
      tl.fromTo(
        items,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.045, // 45ms stagger
          ease: "power2.out",
        },
        0.08 // 80ms delay
      );
    } else if (isSheetVisible) {
      gsap.killTweensOf([sheet, items]);
      const tl = gsap.timeline({
        onComplete: () => {
          setIsSheetVisible(false);
        },
      });
      tl.to(items, {
        opacity: 0,
        y: -4,
        duration: 0.20,
        stagger: { each: 0.025, from: "end" },
        ease: "power2.in",
      });
      tl.to(
        sheet,
        {
          opacity: 0,
          y: -8,
          scale: 0.96,
          duration: 0.42, // 420ms deliberate collapse
          ease: "power2.inOut",
        },
        0.06
      );
    }
  }, [isMenuOpen, isSheetVisible]);

  const activeTakeover = isTakeoverActive || takeoverMode;
  const isExpandedAny = isDesktopExpanded || isMenuOpen;

  const handleMenuToggle = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsDesktopExpanded((prev) => !prev);
    } else {
      setIsMenuOpen((prev) => !prev);
    }
  }, []);

  // Canonical Primary Routes (docs/YCN_CONTENT_SPEC.md §2, DECISION-039)
  const primaryLinks = [
    { href: "/work", label: "Work" },
    { href: "/what-we-solve", label: "What We Solve" },
    { href: "/how-we-work", label: "How We Work" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      id="navbar-root"
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-transparent border-transparent shadow-none pointer-events-none transition-opacity duration-250"
    >
      {/* Full-Navbar Backdrop Blur Layer (POLISH-NAV-05 & Claude E1/E2) */}
      <div
        id="navbar-backdrop"
        data-testid="navbar-backdrop"
        data-takeover={activeTakeover ? "true" : "false"}
        aria-hidden="true"
        style={{
          backdropFilter: activeTakeover ? "none" : "blur(16px) saturate(115%)",
          WebkitBackdropFilter: activeTakeover ? "none" : "blur(16px) saturate(115%)",
          border: "none",
          boxShadow: "none",
        }}
        className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-400 ${
          activeTakeover
            ? "opacity-0"
            : "opacity-100 bg-[var(--bg-canvas)]/15 dark:bg-[var(--bg-canvas)]/20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative">
        {/* LEFT ZONE: Fixed Brand Logo Target (Exact geometry contract preserved) */}
        <div id="navbar-logo-slot" className="flex items-center z-20 pointer-events-auto">
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-md"
            aria-label="YCN Labs — home"
          >
            <div id="navbar-logo-target" className="relative w-[44px] h-[36px] sm:w-[52px] sm:h-[42px] shrink-0">
              <div
                id="navbar-logo-image"
                className={`w-full h-full relative transition-opacity duration-300 ${
                  activeTakeover ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* Dark-letter logo on light canvas */}
                <Image
                  src="/brand/ycn-logo-light-transparent-448.png"
                  alt="YCN Labs"
                  fill
                  priority
                  sizes="(max-width: 640px) 44px, 52px"
                  className="object-contain block dark:hidden"
                />
                {/* White-letter logo on dark canvas */}
                <Image
                  src="/brand/ycn-logo-dark-transparent-448.png"
                  alt="YCN Labs"
                  fill
                  priority
                  sizes="(max-width: 640px) 44px, 52px"
                  className="object-contain hidden dark:block"
                />
              </div>
            </div>
            <span id="navbar-brand-name" className="sr-only">
              YCN Labs
            </span>
          </Link>
        </div>

        {/* CENTER / RIGHT ZONE: Control Cluster (Menu Capsule + Theme Toggle) */}
        {/* On narrow mobile (<640px): Right-anchored per Owner Ruling 28 Sep */}
        {/* On tablet/desktop (>=640px): Symmetrically centered */}
        <div
          id="navbar-center-cluster"
          data-testid="navbar-center-cluster"
          className={`absolute right-4 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 z-30 flex items-center transition-all duration-300 ${
            activeTakeover
              ? "opacity-0 pointer-events-none -translate-y-4"
              : "opacity-100 pointer-events-auto"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* ONE PERSISTENT VISUAL MORPHING SHELL (POLISH-NAV-06) */}
            <div
              ref={desktopShellRef}
              id="navbar-morphing-shell"
              data-testid="navbar-morphing-shell"
              className="w-[104px] relative flex items-center rounded-full overflow-hidden select-none pointer-events-auto"
              style={{
                minHeight: "44px",
                height: "44px",
              }}
            >
              <YcnSignalBorder mode="continuous" active={isExpandedAny} borderRadius={999}>
                <div className="relative w-full h-full min-h-[44px] flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur-md shadow-xs overflow-hidden pointer-events-auto">
                  {/* Trigger Button: Menu Capsule (Visible when collapsed on desktop, and on mobile) */}
                  <button
                    id="navbar-menu-capsule-button"
                    ref={desktopMenuTriggerRef}
                    type="button"
                    onClick={handleMenuToggle}
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isExpandedAny}
                    aria-controls={isDesktopExpanded ? "desktop-nav-expanded" : "mobile-nav-sheet"}
                    className="w-full h-full min-h-[44px] px-3.5 sm:px-4 py-2 flex items-center justify-center gap-2 text-[var(--text-primary)] text-xs font-semibold uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    <span>{isMenuOpen ? "Close" : "Menu"}</span>
                    {/* 2-line glyph morphing to Close X on mobile */}
                    <span className="relative w-3.5 h-3.5 flex items-center justify-center shrink-0">
                      <span
                        aria-hidden="true"
                        className={`absolute h-[1.5px] w-3.5 bg-current transition-all duration-250 ease-out ${
                          isMenuOpen ? "rotate-45" : "-translate-y-1"
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className={`absolute h-[1.5px] w-3.5 bg-current transition-all duration-250 ease-out ${
                          isMenuOpen ? "-rotate-45" : "translate-y-1"
                        }`}
                      />
                    </span>
                  </button>

                  {/* DESKTOP (>= 1024px): Symmetrically Expanded Centre Menu Rail */}
                  <div
                    id="desktop-nav-expanded"
                    ref={desktopRailRef}
                    role="region"
                    aria-label="Expanded Navigation"
                    className="hidden lg:flex items-center gap-1.5 px-3 py-1 whitespace-nowrap min-w-max absolute left-0 top-0 bottom-0 pointer-events-none"
                    style={{
                      opacity: 0,
                    }}
                  >
                    <nav className="flex items-center gap-0.5" aria-label="Primary Navigation">
                      {primaryLinks.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => setIsDesktopExpanded(false)}
                            className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-160 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] group ${
                              isActive
                                ? "text-[var(--text-primary)] font-semibold"
                                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                          >
                            <span>{item.label}</span>
                            <span
                              aria-hidden="true"
                              className={`absolute bottom-0.5 left-3 right-3 h-[1.5px] bg-[var(--action-blue)] transition-all duration-160 ease-out origin-left ${
                                isActive
                                  ? "opacity-100 scale-x-100"
                                  : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                              }`}
                            />
                          </Link>
                        );
                      })}
                      <Link
                        href="/engineering"
                        aria-current={pathname === "/engineering" ? "page" : undefined}
                        onClick={() => setIsDesktopExpanded(false)}
                        className={`relative px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                          pathname === "/engineering"
                            ? "text-[var(--text-primary)] font-semibold"
                            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        Engineering
                      </Link>
                    </nav>

                    <span aria-hidden="true" className="w-[1px] h-4 bg-[var(--border-subtle)] mx-1" />

                    {/* Close Button within the expanded capsule */}
                    <button
                      id="navbar-close-button"
                      type="button"
                      onClick={() => {
                        setIsDesktopExpanded(false);
                        desktopMenuTriggerRef.current?.focus();
                      }}
                      aria-label="Close navigation menu"
                      className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-full hover:bg-[var(--border-subtle)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </YcnSignalBorder>
            </div>

            {/* Theme Toggle: Always adjacent to Menu in the center cluster on desktop and mobile */}
            <div id="navbar-theme-toggle-wrapper" className="flex items-center shrink-0 pointer-events-auto">
              <YcnThemeToggle size="sm" className="rounded-full min-h-[44px] min-w-[44px] shadow-xs" />
            </div>
          </div>
        </div>

        {/* RIGHT ZONE: Start a Project CTA (Visible on tablet/desktop >=640px; removed from collapsed header on narrow mobile <640px per Owner Ruling 28 Sep) */}
        <div
          id="navbar-right-cta"
          data-testid="navbar-right-cta"
          className={`hidden sm:flex items-center justify-end z-20 pointer-events-auto transition-all duration-300 ${
            activeTakeover
              ? "opacity-0 pointer-events-none -translate-y-4"
              : "opacity-100 pointer-events-auto"
          }`}
        >
          <YcnSignalBorder mode="accent" borderRadius={8}>
            <YcnFlowButton
              id="navbar-cta-button"
              href="/contact"
              variant="primary"
              size="sm"
              className="px-2.5 sm:px-4 text-xs font-semibold tracking-normal whitespace-nowrap min-h-[44px] normal-case"
            >
              Start a Project
            </YcnFlowButton>
          </YcnSignalBorder>
        </div>
      </div>

      {/* MOBILE VERTICAL NAVIGATION PANEL (< 1024px): Compact centered panel below header */}
      {(isMenuOpen || isSheetVisible) && (
        <div
          id="mobile-nav-sheet"
          ref={mobileSheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed top-18 inset-x-4 max-w-sm mx-auto z-40 bg-[var(--bg-surface)]/95 rounded-2xl border border-[var(--border-subtle)] shadow-2xl backdrop-blur-md p-5 lg:hidden pointer-events-auto"
        >
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[var(--text-muted)]">
              Navigation
            </p>
            <nav className="space-y-1">
              {primaryLinks.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-semibold tracking-tight transition-colors ${
                      isActive
                        ? "bg-[var(--action-blue)]/10 text-[var(--action-blue)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--bg-canvas)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono font-normal text-[var(--text-muted)]">
                      0{idx + 1}
                    </span>
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-[var(--border-subtle)]/60">
                <Link
                  href="/engineering"
                  aria-current={pathname === "/engineering" ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                    pathname === "/engineering"
                      ? "text-[var(--action-blue)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span>Engineering</span>
                  <span className="text-[var(--text-muted)]">→</span>
                </Link>
              </div>
            </nav>

            {/* Canonical Start a Project CTA inside opened mobile menu (Owner Ruling 28 Sep NAV-04) */}
            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <YcnSignalBorder mode="accent" borderRadius={8} className="w-full">
                <YcnFlowButton
                  id="mobile-menu-cta-button"
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full min-h-[44px] justify-center text-xs font-semibold tracking-wider whitespace-nowrap"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start a Project
                </YcnFlowButton>
              </YcnSignalBorder>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
