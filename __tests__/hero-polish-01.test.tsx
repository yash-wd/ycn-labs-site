import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import path from "path";
import { HeroFoundation } from "@/components/homepage/vnext/HeroFoundation";

describe("POLISH-HOME-01: Hero Foundation & Product Protagonist", () => {
  const heroSource = fs.readFileSync(
    path.join(process.cwd(), "components", "homepage", "vnext", "HeroFoundation.tsx"),
    "utf-8"
  );
  const contentSpec = fs.readFileSync(
    path.join(process.cwd(), "docs", "YCN_CONTENT_SPEC.md"),
    "utf-8"
  );

  const markup = renderToStaticMarkup(React.createElement(HeroFoundation));

  describe("1. DOM Contract Preserved (Claude E3 & VF19 Continuity)", () => {
    it("contains #hero-foundation-root element", () => {
      expect(markup).toContain('id="hero-foundation-root"');
    });

    it("contains #hero-narrative-col element with strict children order (kicker -> H1 -> support -> CTAs -> reassurance)", () => {
      expect(markup).toContain('id="hero-narrative-col"');

      // Verify the sequential occurrence order of elements within the narrative column
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

    it("contains #hero-media-layer holding the editorial media composition", () => {
      expect(markup).toContain('id="hero-media-layer"');
      expect(markup).toContain('id="hero-editorial-team-frame"');
      expect(markup).toContain('id="hero-editorial-device-frame"');
    });
  });

  describe("2. Copy Authority — Exact to YCN_CONTENT_SPEC.md §3 HERO-01", () => {
    it("renders exactly ONE semantic H1 element with ratified copy", () => {
      const h1Matches = markup.match(/<h1[^>]*>([\s\S]*?)<\/h1>/g);
      expect(h1Matches).not.toBeNull();
      expect(h1Matches!.length).toBe(1);
      expect(h1Matches![0]).toContain("Websites and software. Built around your business.");
    });

    it("renders ratified support copy and excludes rejected candidate copy", () => {
      expect(markup).toContain(
        "We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving."
      );
      // Rejected candidate line MUST NOT exist anywhere
      expect(markup).not.toContain("Build what moves your business forward.");
      expect(heroSource).not.toContain("Build what moves your business forward.");
    });

    it("renders primary CTA as 'Start a Project' linking to /contact", () => {
      expect(markup).toContain('href="/contact"');
      expect(markup).toContain("Start a Project");
      expect(markup).toContain('id="hero-primary-cta"');
    });

    it("renders secondary CTA as 'See what we build' linking to /what-we-solve", () => {
      expect(markup).toContain('href="/what-we-solve"');
      expect(markup).toContain("See what we build");
      expect(markup).toContain('id="hero-secondary-cta"');
      // Ensure previous 'See what we solve' copy is superseded
      expect(markup).not.toContain("See what we solve");
    });

    it("renders canonical reassurance text: 'You don’t need a technical brief to start.'", () => {
      expect(markup).toContain("You don’t need a technical brief to start.");
    });

    it("preserves exact kicker text: 'Digital Products & Engineering' pending Owner ruling", () => {
      expect(markup).toContain("Digital Products &amp; Engineering");
      expect(heroSource).toContain("Digital Products & Engineering");
    });
  });

  describe("3. Interactive CTA System — Flow Button & Signal Border", () => {
    it("implements YcnFlowButton for primary CTA with directional arrow choreography", () => {
      expect(heroSource).toContain('import { YcnFlowButton } from "@/components/ui/ycn-flow-button";');
      expect(heroSource).toContain('variant="primary"');
      expect(markup).toContain("group-hover:translate-x-0.5");
    });

    it("wraps primary CTA in YcnSignalBorder for disciplined signal accent", () => {
      expect(heroSource).toContain('import { YcnSignalBorder } from "@/components/ui/ycn-signal-border";');
      expect(heroSource).toContain('<YcnSignalBorder mode="accent"');
      expect(markup).toContain("group/signal");
    });

    it("implements YcnFlowButton for secondary CTA with secondary hierarchy and no arrow competition", () => {
      expect(heroSource).toContain('variant="secondary"');
      expect(heroSource).toContain("showArrow={false}");
    });
  });

  describe("4. Editorial Photography Constellation (Owner 28 Sep Ruling)", () => {
    it("contains team collaborative editorial photo and dark-screen device photo in Hero", () => {
      expect(markup).toContain('id="hero-editorial-team-frame"');
      expect(markup).toContain('id="hero-editorial-device-frame"');
    });

    it("does NOT render Phone3D in the Hero (superseded for Hero per Owner 28 Sep)", () => {
      expect(markup).not.toContain("phone-3d-stage");
      expect(markup).not.toContain("phone-3d-chassis");
      expect(heroSource).not.toContain("Phone3D");
    });
  });

  describe("5. Hero Background & Local Depth", () => {
    it("includes restrained optical falloff / tonal depth field in #hero-media-layer", () => {
      expect(heroSource).toContain("blur-2xl");
      expect(heroSource).toContain("pointer-events-none");
    });

    it("preserves canonical canvas background token bg-[var(--bg-canvas)] without artificial borders or card panels", () => {
      expect(heroSource).toContain("bg-[var(--bg-canvas)]");
      expect(heroSource).not.toContain("border-b");
      expect(heroSource).not.toContain("shadow-2xl");
    });
  });
});
