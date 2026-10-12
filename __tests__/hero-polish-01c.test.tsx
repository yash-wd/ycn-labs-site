import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import path from "path";
import { HeroFoundation } from "@/components/homepage/vnext/HeroFoundation";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
    priority,
    fill,
    sizes,
  }: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    fill?: boolean;
    sizes?: string;
  }) =>
    React.createElement("img", {
      src,
      alt,
      className,
      "data-priority": priority ? "true" : undefined,
      "data-fill": fill ? "true" : undefined,
      "data-sizes": sizes,
    }),
}));

describe("POLISH-HOME-01C: Two-Photograph Asymmetric Editorial System", () => {
  const heroSource = fs.readFileSync(
    path.join(process.cwd(), "components", "homepage", "vnext", "HeroFoundation.tsx"),
    "utf-8"
  );
  const markup = renderToStaticMarkup(React.createElement(HeroFoundation));

  describe("1. Frozen Entrance DOM Contract Preservation", () => {
    it("preserves #hero-foundation-root element", () => {
      expect(markup).toContain('id="hero-foundation-root"');
    });

    it("preserves #hero-narrative-col with strict children order (kicker -> H1 -> support -> CTAs -> reassurance)", () => {
      expect(markup).toContain('id="hero-narrative-col"');

      const kickerIdx = markup.indexOf("Digital Products &amp; Engineering");
      const h1Idx = markup.indexOf("Websites and software. Built around your business.");
      const supportIdx = markup.indexOf(
        "We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving."
      );
      const ctaIdx = markup.indexOf('id="hero-primary-cta"');
      const reassuranceIdx = markup.indexOf("You don’t need a technical brief to start.");

      expect(kickerIdx).toBeGreaterThan(-1);
      expect(h1Idx).toBeGreaterThan(kickerIdx);
      expect(supportIdx).toBeGreaterThan(h1Idx);
      expect(ctaIdx).toBeGreaterThan(supportIdx);
      expect(reassuranceIdx).toBeGreaterThan(ctaIdx);
    });

    it("preserves #hero-media-layer holding the two-photo editorial composition", () => {
      expect(markup).toContain('id="hero-media-layer"');
    });
  });

  describe("2. Two-Photo Editorial Visual System (Owner Checkpoint Ruling)", () => {
    it("Hero contains dominant team editorial image in #hero-editorial-team-frame", () => {
      expect(markup).toContain('id="hero-editorial-team-frame"');
      expect(markup).toContain("/media/hero/ycn-hero-team-v1.webp");
      expect(heroSource).toContain('src="/media/hero/ycn-hero-team-v1.webp"');
      expect(markup).toContain(
        'alt="Professionals collaborating around laptops in a dark modern workspace"'
      );
    });

    it("Hero contains secondary device editorial image (v2) in #hero-editorial-device-frame per Owner Override 28 Sep", () => {
      expect(markup).toContain('id="hero-editorial-device-frame"');
      expect(markup).toContain("/media/hero/ycn-hero-device-ui-v2.webp");
      expect(heroSource).toContain('src="/media/hero/ycn-hero-device-ui-v2.webp"');
      expect(markup).toContain(
        'alt="Modern smartphone and laptop displaying illustrative messaging and data interfaces"'
      );
    });

    it("Hero does NOT render Phone3D (superseded for Hero per Owner 28 Sep)", () => {
      expect(markup).not.toContain("phone-3d-stage");
      expect(markup).not.toContain("phone-3d-chassis");
      expect(heroSource).not.toContain("Phone3D");
    });

    it("ensures all image alt text is neutral and non-claiming (no team size or client claims)", () => {
      expect(markup).not.toContain('alt="our team"');
      expect(markup).not.toContain('alt="YCN team"');
      expect(markup).not.toContain('alt="our client"');
    });

    it("does NOT introduce raster or generated software UI to the Hero", () => {
      // Excludes workshop image
      expect(markup).not.toContain("ycn-workshop");
      expect(heroSource).not.toContain("ycn-workshop");
    });
  });

  describe("3. Visual Sophistication & Atmosphere Details", () => {
    it("includes deep optical falloff / tonal depth field blur-2xl", () => {
      expect(heroSource).toContain("blur-2xl");
      expect(heroSource).toContain("var(--action-blue)");
    });

    it("includes subtle technical datum signal connection line", () => {
      expect(heroSource).toContain("w-[90px] h-[1px]");
      expect(heroSource).toContain("from-transparent via-[var(--action-blue)]/30 to-transparent");
    });

    it("applies 16px corner radius (rounded-2xl) and shadow depth to editorial frames", () => {
      expect(heroSource).toContain("rounded-2xl");
      expect(heroSource).toContain("shadow-[0_20px_45px_-15px_rgba(0,0,0,0.45)]");
      expect(heroSource).toContain("shadow-[0_24px_50px_-10px_rgba(0,0,0,0.55)]");
    });
  });
});
