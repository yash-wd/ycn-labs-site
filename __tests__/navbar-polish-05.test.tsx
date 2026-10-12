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

describe("POLISH-NAV-05: Owner Visual Refinement Suite", () => {
  const headerSource = fs.readFileSync(
    path.join(process.cwd(), "components", "Header.tsx"),
    "utf-8"
  );
  const layoutSource = fs.readFileSync(
    path.join(process.cwd(), "app", "layout.tsx"),
    "utf-8"
  );
  const themeToggleSource = fs.readFileSync(
    path.join(process.cwd(), "components", "ui", "ycn-theme-toggle.tsx"),
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

  describe("1. Menu Open / Close — Perceptual Smoothness (Finding 1)", () => {
    it("orchestrates desktop expansion shell in 580ms power3.out with links delayed 90ms w/ 50ms stagger", () => {
      expect(headerSource).toContain("duration: 0.58");
      expect(headerSource).toContain('ease: "power3.out"');
      expect(headerSource).toContain("stagger: 0.05");
      expect(headerSource).toContain("0.09 // 90ms delay after shell begins");
    });

    it("orchestrates desktop close with links reverse stagger (220ms) and shell collapse (480ms power2.inOut)", () => {
      expect(headerSource).toContain("duration: 0.22");
      expect(headerSource).toContain('from: "end"');
      expect(headerSource).toContain("duration: 0.48");
      expect(headerSource).toContain('ease: "power2.inOut"');
      expect(headerSource).toContain("setIsRailVisible(false)");
    });

    it("orchestrates mobile sheet opening in 520ms power3.out with links delayed 80ms w/ 45ms stagger", () => {
      expect(headerSource).toContain("duration: 0.52");
      expect(headerSource).toContain("stagger: 0.045");
      expect(headerSource).toContain("0.08 // 80ms delay");
    });

    it("orchestrates mobile sheet reverse closing in 420ms power2.inOut retaining DOM mounted via isSheetVisible", () => {
      expect(headerSource).toContain("duration: 0.42");
      expect(headerSource).toContain("setIsSheetVisible(false)");
      expect(headerSource).toContain("(isMenuOpen || isSheetVisible)");
    });
  });

  describe("2. Theme Transition — Slower, Cleaner, More Organic (Finding 2)", () => {
    it("tunes duration to 780ms (within 700-850ms target) with calibrated cubic-bezier", () => {
      expect(themeToggleSource).toContain("duration = 780");
      expect(themeToggleSource).toContain('easing = "cubic-bezier(0.32, 0, 0.24, 1)"');
    });

    it("synchronizes Sun and Moon micro-motion to 780ms duration with matched cubic-bezier", () => {
      expect(themeToggleSource).toContain("duration-[780ms] ease-[cubic-bezier(0.32,0,0.24,1)]");
    });

    it("preserves synchronous DOM capture via flushSync inside startViewTransition", () => {
      expect(themeToggleSource).toContain("flushSync(() => {");
      expect(themeToggleSource).toContain("setTheme(nextTheme)");
    });

    it("maintains true reverse stacking context for DARK -> LIGHT via globals.css", () => {
      expect(globalsCssSource).toContain('[data-theme-transition="dark-to-light"]::view-transition-old(root)');
      expect(globalsCssSource).toContain("z-index: 9999");
    });
  });

  describe("3. Small-Screen Header — Right-Anchored Control Cluster (Finding 3)", () => {
    it("anchors the control cluster to the right on narrow mobile (<640px) and centers on tablet/desktop (>=640px)", () => {
      expect(headerSource).toContain("right-4 sm:right-auto sm:left-1/2 sm:-translate-x-1/2");
      expect(globalsCssSource).toContain("@media (max-width: 639.98px)");
      expect(globalsCssSource).toContain("right: max(1rem, env(safe-area-inset-right)) !important");
      expect(globalsCssSource).toContain("left: auto !important");
    });

    it("removes standalone right CTA on narrow mobile (<640px) via hidden sm:flex", () => {
      const html = renderToStaticMarkup(<Header isTakeoverActive={false} />);
      expect(html).toContain('id="navbar-right-cta"');
      expect(headerSource).toContain('className={`hidden sm:flex');
    });

    it("preserves canonical Start a Project CTA inside opened mobile menu with min 44px tap target", () => {
      expect(headerSource).toContain('id="mobile-menu-cta-button"');
      expect(headerSource).toContain("Start a Project");
      expect(headerSource).toContain("min-h-[44px]");
    });
  });

  describe("4. Full Navbar Backdrop Blur — All Viewports (Finding 4, Claude E1/E2)", () => {
    it("renders dedicated backdrop element covering full header footprint as an absolute child without making root a containing block", () => {
      const html = renderToStaticMarkup(<Header isTakeoverActive={false} />);
      expect(html).toContain('id="navbar-backdrop"');
      expect(headerSource).toContain('id="navbar-backdrop"');
      expect(headerSource).toContain("absolute inset-0 -z-10 pointer-events-none");
    });

    it("enforces backdrop blur without visible border or box-shadow in globals.css", () => {
      expect(globalsCssSource).toContain("#navbar-backdrop {");
      expect(globalsCssSource).toContain("backdrop-filter: blur(16px) saturate(115%)");
      expect(globalsCssSource).toContain("border: none !important");
      expect(globalsCssSource).toContain("box-shadow: none !important");
    });

    it("deactivates backdrop blur completely while entrance takeover is active (Claude E1)", () => {
      expect(globalsCssSource).toContain('#navbar-backdrop[data-takeover="true"] {');
      expect(globalsCssSource).toContain("backdrop-filter: none !important");
      expect(globalsCssSource).toContain("opacity: 0 !important");
      expect(headerSource).toContain('data-takeover={activeTakeover ? "true" : "false"}');
    });
  });

  describe("5. Site-Wide Shared Architecture (Finding 5, Claude E3)", () => {
    it("mounts single shared Header instance globally in root layout", () => {
      expect(layoutSource).toContain("<Header />");
      expect(layoutSource).toContain('import { Header } from "@/components/Header"');
    });

    it("defaults takeoverMode to false on initial load and non-homepage routes", () => {
      expect(headerSource).toContain("const [takeoverMode, setTakeoverMode] = useState(false)");
      expect(headerSource).toContain("setTakeoverMode(false)");
    });

    it("restores header opacity cleanly when navigating away from homepage during entrance", () => {
      expect(headerSource).toContain('gsap.set(header, { opacity: 1, clearProps: "opacity" })');
    });

    it("confirms public user-facing routes inherit root layout", () => {
      const publicRoutes = [
        "work",
        "what-we-solve",
        "how-we-work",
        "about",
        "engineering",
        "contact",
        "credits",
        "privacy",
        "terms",
      ];
      publicRoutes.forEach((route) => {
        const pagePath = path.join(process.cwd(), "app", route, "page.tsx");
        expect(fs.existsSync(pagePath)).toBe(true);
      });
    });
  });
});
