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

describe("POLISH-HOME-01B/01C: Two-Photograph Editorial Constellation Suite", () => {
  const heroSource = fs.readFileSync(
    path.join(process.cwd(), "components", "homepage", "vnext", "HeroFoundation.tsx"),
    "utf-8"
  );
  const markup = renderToStaticMarkup(React.createElement(HeroFoundation));

  describe("1. Frozen Entrance DOM Contract Preservation", () => {
    it("contains #hero-foundation-root element", () => {
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

    it("contains #hero-media-layer holding the two-photo editorial composition", () => {
      expect(markup).toContain('id="hero-media-layer"');
    });

    it("does not render Phone3D in the Hero (superseded per Owner 28 Sep)", () => {
      expect(markup).not.toContain("phone-3d-stage");
      expect(heroSource).not.toContain("Phone3D");
    });
  });

  describe("2. Layered Asymmetric Constellation (Two Editorial Photographs)", () => {
    it("integrates editorial device photograph (v1 or v2) in #hero-editorial-device-frame", () => {
      expect(markup).toContain('id="hero-editorial-device-frame"');
      const hasDeviceImage =
        markup.includes("/media/hero/ycn-hero-device-v1.webp") ||
        markup.includes("/media/hero/ycn-hero-device-ui-v2.webp");
      expect(hasDeviceImage).toBe(true);
    });

    it("integrates team collaborative editorial photograph (ycn-hero-team-v1.webp) in #hero-editorial-team-frame", () => {
      expect(markup).toContain('id="hero-editorial-team-frame"');
      expect(markup).toContain("/media/hero/ycn-hero-team-v1.webp");
      expect(heroSource).toContain('src="/media/hero/ycn-hero-team-v1.webp"');
    });

    it("uses neutral, descriptive, non-claiming alt text without inventing team or client claims", () => {
      const hasNeutralDeviceAlt =
        markup.includes('alt="Refined digital workspace featuring modern smartphone hardware beside a slim laptop with subtle reflective dark screens"') ||
        markup.includes('alt="Modern smartphone and laptop displaying illustrative messaging and data interfaces"');
      expect(hasNeutralDeviceAlt).toBe(true);
      expect(markup).toContain(
        'alt="Professionals collaborating around laptops in a dark modern workspace"'
      );
      expect(markup).not.toContain('alt="our team"');
      expect(markup).not.toContain('alt="our client"');
    });
  });

  describe("3. Visual Sophistication & Atmosphere Details", () => {
    it("includes deep optical falloff / tonal depth field blur-2xl", () => {
      expect(heroSource).toContain("blur-2xl");
      expect(heroSource).toContain("var(--action-blue)");
    });

    it("applies 16px corner radius (rounded-2xl) and shadow depth to editorial frames", () => {
      expect(heroSource).toContain("rounded-2xl");
      expect(heroSource).toContain("shadow-[0_20px_45px_-15px_rgba(0,0,0,0.45)]");
      expect(heroSource).toContain("shadow-[0_24px_50px_-10px_rgba(0,0,0,0.55)]");
    });
  });
});
