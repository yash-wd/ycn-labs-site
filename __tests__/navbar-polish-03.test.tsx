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

describe("POLISH-NAV-03 + INPUT-GATE-01 Test Suite", () => {
  const headerSource = fs.readFileSync(
    path.join(process.cwd(), "components", "Header.tsx"),
    "utf-8"
  );
  const filmSource = fs.readFileSync(
    path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumFilm.tsx"),
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

  beforeEach(() => {
    mockPathname = "/";
    mockTheme = "dark";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("1. INPUT-GATE-01: Entrance Input Lock & Skip-Only Exit", () => {
    it("removes all early wheel/touch/keydown shortcuts from BrandContinuumFilm", () => {
      // Must not contain window.addEventListener for wheel/touch/keydown that trigger early exit
      expect(filmSource).not.toContain('window.addEventListener("wheel", handleWheel');
      expect(filmSource).not.toContain('window.addEventListener("touchmove", handleTouchMove');
      expect(filmSource).not.toContain('window.addEventListener("keydown", handleKeyDown');
    });

    it("enforces Skip button as the sole exit mechanism with aria-label='Skip entrance film'", () => {
      expect(filmSource).toContain('id="entrance-skip-button"');
      expect(filmSource).toContain('aria-label="Skip entrance film"');
      expect(filmSource).not.toContain("(or press Escape)");
    });

    it("centralizes interaction lock in BrandContinuumStage for film AND logo contraction", () => {
      expect(stageSource).toContain("isInputLocked");
      expect(stageSource).toContain('phase === "film"');
      expect(stageSource).toContain('phase === "logo_settle"');
      expect(stageSource).toContain("isScrollCueVisible");
    });

    it("locks wheel, touchmove, and scroll keys with non-passive preventDefault", () => {
      expect(stageSource).toContain('window.addEventListener("wheel", handleWheel, { passive: false })');
      expect(stageSource).toContain('window.addEventListener("touchmove", handleTouchMove, { passive: false })');
      expect(stageSource).toContain('window.addEventListener("keydown", handleKeyDown');
    });

    it("explicitly prevents Escape from skipping and suppresses scroll navigation keys", () => {
      expect(stageSource).toContain('if (key === "Escape")');
      expect(stageSource).toContain('key === "ArrowDown"');
      expect(stageSource).toContain('key === "PageDown"');
      expect(stageSource).toContain('key === " " || key === "Spacebar"');
    });

    it("enforces focus containment on Skip and inert attribute on hero and navbar while locked (Claude E4)", () => {
      expect(stageSource).toContain('hero.setAttribute("inert", "")');
      expect(stageSource).toContain('navbar.setAttribute("inert", "")');
      expect(stageSource).toContain('skipBtn.focus()');
    });

    it("unlocks interaction only after Pose B hold is reached and scroll cue is visible", () => {
      expect(stageSource).toContain("setIsScrollCueVisible(true)");
    });
  });

  describe("2. POLISH-NAV-03: Visually Transparent Floating Header", () => {
    it("makes #navbar-root visually transparent with zero permanent navbar strip, border, or shadow", () => {
      expect(headerSource).toContain('id="navbar-root"');
      expect(headerSource).toContain("bg-transparent");
      expect(headerSource).toContain("border-transparent");
      expect(headerSource).toContain("shadow-none");
      // Must not have scrolled background strip
      expect(headerSource).not.toContain("bg-[var(--bg-canvas)]/92");
    });

    it("applies pointer-events-none to #navbar-root and pointer-events-auto to interactive children", () => {
      expect(headerSource).toContain("pointer-events-none");
      expect(headerSource).toContain('id="navbar-logo-slot" className="flex items-center z-20 pointer-events-auto"');
      expect(headerSource).toContain('id="navbar-right-cta"');
    });

    it("strictly preserves 64px (h-16) header height for entrance docking geometry contract", () => {
      expect(headerSource).toMatch(/h-16/);
    });
  });

  describe("3. Collapsed State Layout: Left Logo · Center Cluster · Right CTA", () => {
    it("preserves exact id='navbar-logo-target' and dimensions at left", () => {
      expect(headerSource).toContain('id="navbar-logo-target"');
      expect(headerSource).toContain('className="relative w-[44px] h-[36px] sm:w-[52px] sm:h-[42px] shrink-0"');
    });

    it("renders optically centered cluster at left: 50% / translateX(-50%) on tablet/desktop", () => {
      expect(headerSource).toContain('id="navbar-center-cluster"');
      expect(headerSource).toContain("sm:left-1/2 sm:-translate-x-1/2");
    });

    it("places Menu capsule + Theme toggle together in the center cluster", () => {
      const html = renderToStaticMarkup(React.createElement(Header, { isTakeoverActive: false }));
      expect(html).toContain('id="navbar-center-cluster"');
      expect(html).toContain('id="navbar-menu-capsule-button"');
      expect(html).toContain('id="navbar-theme-toggle"');
      expect(html).toContain(">Menu<");
    });

    it("places Start a Project CTA permanently on the right outside the menu", () => {
      const html = renderToStaticMarkup(React.createElement(Header, { isTakeoverActive: false }));
      expect(html).toContain('id="navbar-right-cta"');
      expect(html).toContain('id="navbar-cta-button"');
      expect(html).toContain("Start a Project");
      expect(html).toContain('href="/contact"');
    });
  });

  describe("4. Menu Capsule Exception & Center-Origin Expansion", () => {
    it("implements smooth capsule shape (rounded-full) for the Menu control (Owner Ruling 27 Sep)", () => {
      expect(headerSource).toContain('id="navbar-menu-capsule-button"');
      expect(headerSource).toContain("rounded-full");
      expect(headerSource).toContain("min-h-[44px]");
    });

    it("expands desktop menu symmetrically from the center capsule", () => {
      expect(headerSource).toContain('id="desktop-nav-expanded"');
      expect(headerSource).toContain("hidden lg:flex items-center");
    });

    it("strictly preserves canonical navigation order inside expanded menu", () => {
      const html = renderToStaticMarkup(React.createElement(Header, { isTakeoverActive: false }));
      const workIndex = html.indexOf('href="/work"');
      const solveIndex = html.indexOf('href="/what-we-solve"');
      const howIndex = html.indexOf('href="/how-we-work"');
      const aboutIndex = html.indexOf('href="/about"');

      expect(workIndex).toBeGreaterThan(-1);
      expect(solveIndex).toBeGreaterThan(workIndex);
      expect(howIndex).toBeGreaterThan(solveIndex);
      expect(aboutIndex).toBeGreaterThan(howIndex);

      expect(html).toContain(">Work<");
      expect(html).toContain(">What We Solve<");
      expect(html).toContain(">How We Work<");
      expect(html).toContain(">About<");
      expect(html).toContain(">Engineering<");
    });

    it("does NOT put Theme toggle or Start a Project CTA inside expanded desktop menu", () => {
      // In the expanded desktop nav rail, neither the theme toggle nor CTA button are inside desktop-nav-expanded
      const desktopExpandedSnippet = headerSource.substring(
        headerSource.indexOf('id="desktop-nav-expanded"'),
        headerSource.indexOf('{/* Theme Toggle: Always adjacent')
      );
      expect(desktopExpandedSnippet).not.toContain("YcnThemeToggle");
      expect(desktopExpandedSnippet).not.toContain("Start a Project");
    });
  });

  describe("5. Theme Reveal Coordinate Contract", () => {
    it("computes radial View Transition origin strictly from getBoundingClientRect() center", () => {
      expect(themeToggleSource).toContain("buttonRef.current?.getBoundingClientRect()");
      expect(themeToggleSource).toContain("rect.left + rect.width / 2");
      expect(themeToggleSource).toContain("rect.top + rect.height / 2");
      expect(themeToggleSource).toContain("Math.hypot");
    });

    it("provides fallback for browsers without View Transitions or under reduced motion", () => {
      expect(themeToggleSource).toContain('!("startViewTransition" in document)');
      expect(themeToggleSource).toContain("prefersReduced");
    });
  });

  describe("6. Mobile Responsive Vertical Panel & Non-destructive Scroll Lock", () => {
    it("uses centered vertical navigation panel below header (< 1024px)", () => {
      expect(headerSource).toContain('id="mobile-nav-sheet"');
      expect(headerSource).toContain("fixed top-18 inset-x-4 max-w-sm mx-auto");
      expect(headerSource).toContain("lg:hidden");
    });

    it("intercepts mobile background scroll non-destructively without modifying body.style.overflow", () => {
      expect(headerSource).not.toContain("body.style.overflow");
      expect(headerSource).toContain('document.addEventListener("touchmove", preventBackgroundTouch, { passive: false })');
      expect(headerSource).toContain('document.addEventListener("wheel", preventBackgroundWheel, { passive: false })');
    });
  });
});
