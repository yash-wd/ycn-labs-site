import { describe, it, expect } from "vitest";
import React from "react";
import fs from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";

// GPT review of PR #33 (13 Nov 2026), findings F1–F3. Browser evidence for F1/F2 is in the
// private vault (proof/YCN-V3-SPRINT/review-fixes); these checks guard the source contract.
import { DeviceStage } from "@/components/v3/DeviceStage";
import { metadata as howMeta } from "@/app/how-we-work/page";

const css = fs.readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf-8");

describe("PR #33 review fixes", () => {
  it("F1: pill cycling and reduced-motion hiding apply only inside the hero stage", () => {
    for (const pill of ["new", "assigned", "sent"]) {
      // No unscoped rule may animate a pill (static screens reuse these classes).
      expect(css).not.toMatch(new RegExp(`(^|\\n)\\.v3-pill-${pill} \\{ animation`));
      expect(css).toContain(`.v3-stage .v3-pill-${pill} { animation:`);
    }
    expect(css).not.toMatch(/\n\s*\.v3-pill-assigned, \.v3-pill-sent \{ opacity: 0; \}/);
    expect(css).toContain(".v3-stage .v3-pill-assigned, .v3-stage .v3-pill-sent { opacity: 0; }");
  });

  it("F2: the hero has a pause control outside the image, and paused stops every animation", () => {
    const html = renderToStaticMarkup(<DeviceStage />);
    const img = html.indexOf('role="img"');
    const button = html.indexOf('id="hero-motion-toggle"');
    expect(button).toBeGreaterThan(-1);
    expect(html.indexOf("<figcaption")).toBeLessThan(button);
    expect(img).toBeLessThan(html.indexOf("<figcaption"));
    expect(html).toContain('aria-pressed="false"');
    expect(html).toContain("Pause animation");
    expect(css).toContain(".v3-stage-wrap[data-paused] .v3-stage * { animation-play-state: paused !important; }");
    expect(css).toMatch(/\.v3-motion-toggle \{ display: none !important; \}/);
  });

  it("F3: How We Work metadata matches the four-step page", () => {
    expect(String(howMeta.description)).not.toMatch(/eight/i);
    expect(String(howMeta.description)).toMatch(/Four clear steps/);
  });
});
