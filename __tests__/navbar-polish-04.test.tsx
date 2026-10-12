import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import path from "path";
import { Header } from "@/components/Header";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { YcnSignalBorder } from "@/components/ui/ycn-signal-border";
import { YcnThemeToggle } from "@/components/ui/ycn-theme-toggle";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) =>
    React.createElement("img", { src, alt, className }),
}));

// Mock next/navigation
let mockPathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

// Mock next-themes
let mockTheme = "dark";
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockTheme,
    resolvedTheme: mockTheme,
    setTheme: vi.fn((t: string) => {
      mockTheme = t;
    }),
  }),
}));

describe("POLISH-NAV-04: Owner-Reported Defects & Polish Suite", () => {
  const headerSource = fs.readFileSync(
    path.join(process.cwd(), "components", "Header.tsx"),
    "utf-8"
  );
  const stageSource = fs.readFileSync(
    path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
    "utf-8"
  );
  const themeToggleSource = fs.readFileSync(
    path.join(process.cwd(), "components", "ui", "ycn-theme-toggle.tsx"),
    "utf-8"
  );
  const signalBorderSource = fs.readFileSync(
    path.join(process.cwd(), "components", "ui", "ycn-signal-border.tsx"),
    "utf-8"
  );
  const globalsCssSource = fs.readFileSync(
    path.join(process.cwd(), "app", "globals.css"),
    "utf-8"
  );

  beforeEach(() => {
    mockPathname = "/";
    mockTheme = "dark";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("1. Intro / Scrollbar Lifecycle & Input Lock (Defect 1 & Claude E1)", () => {
    it("hides browser scrollbar via overflow: hidden on lock and records scrollbar width (sbw)", () => {
      expect(stageSource).toContain("document.documentElement.style.overflow = \"hidden\"");
      expect(stageSource).toContain("const sbw =");
      expect(stageSource).toContain("document.documentElement.dataset.ycnSbw = String(sbw)");
    });

    it("restores overflow cleanly in ONE synchronous handler at the unlock boundary", () => {
      expect(stageSource).toContain("document.documentElement.style.overflow = prevHtmlOverflowRef.current || \"\"");
      expect(stageSource).toContain("delete document.documentElement.dataset.ycnSbw");
    });

    it("re-derives Pose B hold geometry from document.documentElement.clientWidth/Height and applies with gsap.set without animation", () => {
      expect(stageSource).toContain("const newW = document.documentElement.clientWidth");
      expect(stageSource).toContain("const pose = computeHomepageHoldPose(newW, newH)");
      expect(stageSource).toContain("gsap.set(logoWrapperRef.current");
      expect(stageSource).toContain("ScrollTrigger.refresh()");
    });

    it("preserves non-passive wheel, touchmove, and key listeners while locked", () => {
      expect(stageSource).toContain('window.addEventListener("wheel", handleWheel, { passive: false })');
      expect(stageSource).toContain('window.addEventListener("touchmove", handleTouchMove, { passive: false })');
      expect(stageSource).toContain('window.addEventListener("keydown", handleKeyDown, { capture: true })');
    });

    it("records Escape as currently disabled pending Owner ruling (ESC PENDING)", () => {
      expect(stageSource).toContain("ESC remains PENDING");
      expect(stageSource).toContain('if (key === "Escape")');
    });
  });

  describe("2. Menu Open / Close Motion (Defect 2)", () => {
    it("implements deliberate GSAP-driven desktop menu expansion (open power3.out / close power2.inOut)", () => {
      expect(headerSource).toMatch(/duration:\s*0\.(44|58)/);
      expect(headerSource).toContain('ease: "power3.out"');
      expect(headerSource).toMatch(/duration:\s*0\.(36|48)/);
      expect(headerSource).toContain('ease: "power2.inOut"');
    });

    it("applies staggered entrance to desktop navigation items", () => {
      expect(headerSource).toMatch(/stagger:\s*0\.0[45]/);
    });

    it("implements deliberate GSAP-driven mobile sheet animation", () => {
      expect(headerSource).toMatch(/duration:\s*0\.(42|52)/);
      expect(headerSource).toMatch(/duration:\s*0\.(32|35)/);
    });

    it("respects prefers-reduced-motion for both desktop and mobile menu animations", () => {
      expect(headerSource).toContain('window.matchMedia("(prefers-reduced-motion: reduce)").matches');
    });
  });

  describe("3. Theme Transition — Forward and True Reverse (Defect 3 & Claude E2)", () => {
    it("wraps next-themes setTheme in flushSync for synchronous DOM capture within startViewTransition", () => {
      expect(themeToggleSource).toContain('import { flushSync } from "react-dom"');
      expect(themeToggleSource).toContain("flushSync(() => {");
      expect(themeToggleSource).toContain("setTheme(nextTheme)");
    });

    it("tunes duration to visual acceptance window", () => {
      expect(themeToggleSource).toMatch(/const duration = (620|780)/);
    });

    it("expands ::view-transition-new(root) outward on LIGHT -> DARK", () => {
      expect(themeToggleSource).toContain('pseudoElement: "::view-transition-new(root)"');
      expect(themeToggleSource).toContain("circle(${endRadius}px at ${x}px ${y}px)");
    });

    it("contracts ::view-transition-old(root) back into toggle circle on DARK -> LIGHT (true visual reverse)", () => {
      expect(themeToggleSource).toContain('pseudoElement: "::view-transition-old(root)"');
      expect(themeToggleSource).toContain("const toggleRadius = rect ? Math.max(rect.width, rect.height) / 2 : 18");
      expect(themeToggleSource).toContain("circle(${toggleRadius}px at ${x}px ${y}px)");
    });

    it("configures CSS pseudo-element stacking context in globals.css for forward and reverse transitions", () => {
      expect(globalsCssSource).toContain('[data-theme-transition="light-to-dark"]::view-transition-new(root)');
      expect(globalsCssSource).toContain('[data-theme-transition="dark-to-light"]::view-transition-old(root)');
      expect(globalsCssSource).toContain("z-index: 9999");
    });

    it("computes radial center per click from live button getBoundingClientRect()", () => {
      expect(themeToggleSource).toContain("buttonRef.current?.getBoundingClientRect()");
      expect(themeToggleSource).toContain("rect.left + rect.width / 2");
      expect(themeToggleSource).toContain("rect.top + rect.height / 2");
    });
  });

  describe("4. Menu Signal Border — Continuous (Defect 4)", () => {
    it("supports mode='continuous' in YcnSignalBorder with ~5s calm moving loop", () => {
      expect(signalBorderSource).toContain('mode?: "interactive" | "accent" | "ambient" | "continuous"');
      expect(signalBorderSource).toContain('pathLength={100}');
      expect(signalBorderSource).toContain('ResizeObserver');
      expect(globalsCssSource).toContain('animation: ycn-navbar-full-orbit 5s linear infinite');
      expect(signalBorderSource).toContain("opacity-60");
    });

    it("increases emphasis on hover, focus-within, or active state while baseline animation continues", () => {
      expect(signalBorderSource).toContain("group-hover/signal:opacity-100");
      expect(signalBorderSource).toContain("group-focus-within/signal:opacity-100");
    });

    it("applies mode='continuous' to Menu capsule in Header.tsx", () => {
      expect(headerSource).toContain('<YcnSignalBorder mode="continuous" active={isExpandedAny} borderRadius={999}>');
    });

    it("renders crisp static border under prefers-reduced-motion", () => {
      expect(signalBorderSource).toContain("motion-reduce:hidden");
    });
  });

  describe("5. Narrow Mobile Header & Menu Composition (Defect 5 - Owner Ruling)", () => {
    it("removes standalone right-side CTA from collapsed header on narrow mobile (< 640px)", () => {
      expect(headerSource).toContain('id="navbar-right-cta"');
      expect(headerSource).toContain("hidden sm:flex");
    });

    it("places canonical Start a Project CTA inside the opened mobile menu (< 1024px)", () => {
      expect(headerSource).toContain('id="mobile-menu-cta-button"');
      expect(headerSource).toContain("Start a Project");
      expect(headerSource).toContain('href="/contact"');
    });

    it("preserves min 44px tap target on the mobile menu CTA button", () => {
      expect(headerSource).toContain("min-h-[44px]");
    });

    it("renders Menu capsule and Theme toggle in the header on mobile", () => {
      const html = renderToStaticMarkup(React.createElement(Header, { isTakeoverActive: false }));
      expect(html).toContain('id="navbar-menu-capsule-button"');
      expect(html).toContain('id="navbar-theme-toggle"');
      expect(html).toContain('id="navbar-logo-slot"');
    });

    it("retains standalone CTA on right for tablet/desktop (>= 640px)", () => {
      expect(headerSource).toMatch(/hidden sm:flex items-center justify-end/);
    });
  });
});
