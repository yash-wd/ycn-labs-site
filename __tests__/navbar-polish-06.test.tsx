import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import path from "path";
import { Header } from "@/components/Header";

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

describe("POLISH-NAV-06: True Visible Menu Morph Suite", () => {
  const headerSource = fs.readFileSync(
    path.join(process.cwd(), "components", "Header.tsx"),
    "utf-8"
  );

  beforeEach(() => {
    mockPathname = "/";
    mockTheme = "dark";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("1. Single Persistent Visual Shell Architecture", () => {
    it("renders exactly ONE persistent visual shell #navbar-morphing-shell containing both trigger and expanded navigation", () => {
      const html = renderToStaticMarkup(<Header isTakeoverActive={false} />);
      expect(html).toContain('id="navbar-morphing-shell"');
      expect(headerSource).toContain('id="navbar-morphing-shell"');
      expect(headerSource).toContain('data-testid="navbar-morphing-shell"');
    });

    it("ensures both #navbar-menu-capsule-button and #desktop-nav-expanded are housed within #navbar-morphing-shell", () => {
      const shellStart = headerSource.indexOf('id="navbar-morphing-shell"');
      const shellEnd = headerSource.indexOf('id="navbar-theme-toggle-wrapper"');
      const shellSnippet = headerSource.substring(shellStart, shellEnd);

      expect(shellSnippet).toContain('id="navbar-menu-capsule-button"');
      expect(shellSnippet).toContain('id="desktop-nav-expanded"');
      expect(shellSnippet).toContain('id="navbar-close-button"');
    });

    it("does NOT swap to a second separate rail outside the morphing shell", () => {
      // #navbar-center-cluster contains only the morphing shell and the adjacent theme toggle
      const clusterStart = headerSource.indexOf('id="navbar-center-cluster"');
      const ctaStart = headerSource.indexOf('id="navbar-right-cta"');
      const clusterSnippet = headerSource.substring(clusterStart, ctaStart);

      const shellMatches = clusterSnippet.match(/\bid="navbar-morphing-shell"/g);
      expect(shellMatches).toHaveLength(1);
    });
  });

  describe("2. Desktop Open Choreography (Physical Width Interpolation)", () => {
    it("interpolates shell width from collapsed width (104px) to dynamic expanded width in 580ms with power3.out", () => {
      expect(headerSource).toContain("tl.fromTo(");
      expect(headerSource).toContain("shell,");
      expect(headerSource).toContain("{ width: collapsedWidth },");
      expect(headerSource).toContain("width: targetExpandedWidth,");
      expect(headerSource).toContain("duration: 0.58");
      expect(headerSource).toContain('ease: "power3.out"');
    });

    it("initiates link entrance only after 90ms physical room delay with 50ms stagger", () => {
      expect(headerSource).toContain("0.09 // 90ms delay after shell begins");
      expect(headerSource).toContain("duration: 0.36");
      expect(headerSource).toContain("stagger: 0.05");
      expect(headerSource).toContain('ease: "power2.out"');
    });

    it("fades trigger button out at t=0 over 100ms so glyph morph begins immediately", () => {
      expect(headerSource).toContain("duration: 0.10");
      expect(headerSource).toContain('pointerEvents: "none"');
    });

    it("lays navigation content out at its full width with whitespace-nowrap and lets shell clip it", () => {
      expect(headerSource).toContain("whitespace-nowrap min-w-max");
      expect(headerSource).toContain("overflow-hidden");
    });
  });

  describe("3. Desktop Close Choreography (True Reverse Contraction)", () => {
    it("exits links in reverse order with 220ms duration before shell fully contracts", () => {
      expect(headerSource).toContain("duration: 0.22");
      expect(headerSource).toContain('from: "end"');
      expect(headerSource).toContain('ease: "power2.in"');
    });

    it("contracts shell physically to collapsed width (104px) over 480ms with power2.inOut", () => {
      expect(headerSource).toContain("width: collapsedWidth,");
      expect(headerSource).toContain("duration: 0.48");
      expect(headerSource).toContain('ease: "power2.inOut"');
    });

    it("fades trigger button back in near the end of contraction (~360ms delay)", () => {
      expect(headerSource).toContain("duration: 0.18");
      expect(headerSource).toContain('pointerEvents: "auto"');
      expect(headerSource).toContain("0.36");
    });

    it("retains shell mounted without instantaneous display:none until contraction completes", () => {
      expect(headerSource).toContain("setIsRailVisible(false)");
      expect(headerSource).toContain("gsap.set(shell, { width: collapsedWidth })");
    });
  });

  describe("4. Continuous Signal Border & Theme Toggle Gliding Contract", () => {
    it("wraps the morphing shell in continuous YcnSignalBorder that travels with the expanding container", () => {
      expect(headerSource).toContain('<YcnSignalBorder mode="continuous" active={isExpandedAny} borderRadius={999}>');
    });

    it("places Theme Toggle adjacent in flex cluster so its center X naturally glides in 1:1 lockstep with shell edge", () => {
      expect(headerSource).toContain('id="navbar-theme-toggle-wrapper"');
      expect(headerSource).toContain("flex items-center shrink-0");
    });

    it("restores keyboard focus to trigger button on Close button click and Escape key", () => {
      expect(headerSource).toContain("desktopMenuTriggerRef.current?.focus()");
      expect(headerSource).toContain('if (e.key === "Escape")');
    });
  });
});
