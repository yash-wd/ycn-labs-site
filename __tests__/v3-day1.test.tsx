import { describe, it, expect, vi } from "vitest";
import React from "react";
import fs from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";

// YCN-V3-UI Day 1 (Owner choices 10 Nov 2026): tokens, section kit, hero H1 with headline A.
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { HeroV3, HERO_HEADLINE } from "@/components/v3/HeroV3";
import { DEVICE_STAGE_LABEL } from "@/components/v3/DeviceStage";
import { Section, SectionHead, Card } from "@/components/v3/Section";

const css = fs.readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf-8");
const home = fs.readFileSync(path.join(process.cwd(), "components", "homepage", "vnext", "HomepageVNextPhase1.tsx"), "utf-8");

describe("YCN-V3-UI Day 1: hero", () => {
  const html = renderToStaticMarkup(React.createElement(HeroV3));

  it("renders exactly one H1 with the Owner-chosen headline", () => {
    expect((html.match(/<h1/g) || []).length).toBe(1);
    expect(HERO_HEADLINE).toBe("Websites and software that bring your business enquiries.");
    expect(html).toContain(HERO_HEADLINE);
  });

  it("primary action goes to /contact and keeps the ids other code relies on", () => {
    expect(html).toMatch(/id="hero-primary-cta"[^>]*href="\/contact"|href="\/contact"[^>]*id="hero-primary-cta"/);
    for (const id of ["hero-foundation-root", "hero-narrative-col", "hero-media-layer", "hero-secondary-cta"]) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("the demonstration is labelled for screen readers and visibly marked as illustrative", () => {
    expect(html).toContain('role="img"');
    expect(html).toContain(`aria-label="${DEVICE_STAGE_LABEL.replace(/'/g, "&#x27;")}"`);
    expect(html).toContain("Demonstration screens. Names and requests are illustrative.");
  });

  it("the demonstration contains no form, input or link (nothing can be sent)", () => {
    // The demonstration image ends where the caption starts; the caption holds the only
    // control, the visitor's Pause/Play button (GPT review F2), which sends nothing.
    const stage = html.slice(html.indexOf('class="v3-stage"'), html.indexOf("<figcaption"));
    expect(stage).not.toMatch(/<form|<input|<button|<a /);
    const caption = html.slice(html.indexOf("<figcaption"), html.indexOf("</figure>"));
    expect(caption).not.toMatch(/<form|<input|<a /);
    expect((caption.match(/<button/g) || []).length).toBe(1);
  });

  it("homepage renders the new hero instead of the old photo hero", () => {
    expect(home).toContain('import { HeroV3 } from "@/components/v3/HeroV3";');
    expect(home).toContain("<HeroV3 />");
    expect(home).not.toContain("<HeroFoundation />");
  });
});

describe("YCN-V3-UI Day 1: tokens and motion", () => {
  it("defines the spacing, shape, elevation and status tokens", () => {
    for (const t of ["--space-1: 8px", "--space-6: 104px", "--radius-card: 16px", "--radius-panel: 24px", "--elev-lift", "--status-error", "--status-success", "--shadow-lift: var(--elev-lift)"]) {
      expect(css).toContain(t);
    }
  });

  it("status colours are plain values, never brand tokens", () => {
    expect(css).not.toMatch(/--status-[a-z]+:\s*var\(--(brand|ycn|action)/);
  });

  it("the screen accent follows the brand palette, not a typed colour", () => {
    expect(css).toContain("--v3-accent: var(--ycn-brand-300);");
  });

  it("reduced motion stops every stage animation and shows a complete still frame", () => {
    const rm = css.slice(css.lastIndexOf("@media (prefers-reduced-motion: reduce)"));
    expect(rm).toContain("animation: none !important");
    expect(rm).toContain(".v3-anim-travel { display: none; }");
    expect(rm).toContain(".v3-anim-arrive { opacity: 1; transform: none; }");
  });
});

describe("YCN-V3-UI Day 1: section kit", () => {
  it("sections use token spacing and container width", () => {
    const html = renderToStaticMarkup(
      React.createElement(Section, { id: "x", labelledBy: "x-h", children: React.createElement(SectionHead, { id: "x-h", title: "T", lead: "L" }) }),
    );
    expect(html).toContain("sm:py-[var(--space-5)]");
    expect(html).toContain("max-w-[var(--container-max)]");
    expect(html).toContain('aria-labelledby="x-h"');
    expect(html).toContain("<h2");
  });

  it("cards use the shared radius token", () => {
    const html = renderToStaticMarkup(React.createElement(Card, { title: "A", children: "b" }));
    expect(html).toContain("rounded-card");
  });
});
