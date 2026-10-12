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

describe("POLISH-NAV-07: Repair Menu Morph & DOM Contract Suite", () => {
  const headerSource = fs.readFileSync(
    path.join(process.cwd(), "components", "Header.tsx"),
    "utf-8"
  );
  const signalBorderSource = fs.readFileSync(
    path.join(process.cwd(), "components", "ui", "ycn-signal-border.tsx"),
    "utf-8"
  );

  beforeEach(() => {
    mockPathname = "/";
    mockTheme = "dark";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("1. Rendered DOM Counts at Desktop (1440)", () => {
    it("renders exactly ONE #navbar-morphing-shell in DOM", () => {
      const html = renderToStaticMarkup(<Header isTakeoverActive={false} />);
      const shellMatches = html.match(/\bid="navbar-morphing-shell"/g);
      expect(shellMatches).toHaveLength(1);
    });

    it("renders exactly ONE #navbar-menu-capsule-button in DOM", () => {
      const html = renderToStaticMarkup(<Header isTakeoverActive={false} />);
      const btnMatches = html.match(/\bid="navbar-menu-capsule-button"/g);
      expect(btnMatches).toHaveLength(1);
    });

    it("renders exactly ONE #desktop-nav-expanded in DOM", () => {
      const html = renderToStaticMarkup(<Header isTakeoverActive={false} />);
      const railMatches = html.match(/\bid="desktop-nav-expanded"/g);
      expect(railMatches).toHaveLength(1);
    });

    it("renders exactly ONE Close control in DOM at 1440 (no duplicate Close labels or competing controls)", () => {
      const html = renderToStaticMarkup(<Header isTakeoverActive={false} />);
      // Only #navbar-close-button has aria-label="Close navigation menu" in desktop markup
      const closeMatches = html.match(/aria-label="Close navigation menu"/g);
      expect(closeMatches).toHaveLength(1);
      expect(html).toContain('id="navbar-close-button"');
    });
  });

  describe("2. Single-Run Animation & Re-render Prevention", () => {
    it("does NOT include isRailVisible in useEffect dependency array to prevent timeline double-run", () => {
      expect(headerSource).toContain("}, [isDesktopExpanded]);");
      expect(headerSource).not.toContain("}, [isDesktopExpanded, isRailVisible]);");
    });

    it("uses hasDesktopOpenedRef to guard close animation execution", () => {
      expect(headerSource).toContain("hasDesktopOpenedRef");
      expect(headerSource).toContain("hasDesktopOpenedRef.current = true;");
      expect(headerSource).toContain("} else if (hasDesktopOpenedRef.current) {");
    });
  });

  describe("3. Unified Shell & Signal Border Geometry", () => {
    it("ensures YcnSignalBorder with borderRadius 999 automatically adopts w-full h-full", () => {
      expect(signalBorderSource).toContain('borderRadius === 999 ? "w-full h-full" : ""');
    });

    it("maintains persistent morphing shell containing both trigger and rail", () => {
      const clusterStart = headerSource.indexOf('id="navbar-center-cluster"');
      const clusterEnd = headerSource.indexOf('id="navbar-right-cta"');
      const clusterSnippet = headerSource.substring(clusterStart, clusterEnd);

      expect(clusterSnippet).toContain('id="navbar-morphing-shell"');
      expect(clusterSnippet).toContain('id="navbar-menu-capsule-button"');
      expect(clusterSnippet).toContain('id="desktop-nav-expanded"');
      expect(clusterSnippet).toContain('id="navbar-close-button"');
      expect(clusterSnippet).toContain('id="navbar-theme-toggle-wrapper"');
    });
  });
});
