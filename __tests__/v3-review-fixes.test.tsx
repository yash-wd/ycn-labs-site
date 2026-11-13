import { describe, it, expect } from "vitest";
import React from "react";
import fs from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";

// GPT review of PR #33 (13 Nov 2026), findings F1–F3. Browser evidence for F1/F2 is in the
// private vault (proof/YCN-V3-SPRINT/review-fixes); these checks guard the source contract.
import { DeviceStage } from "@/components/v3/DeviceStage";
import { metadata as howMeta } from "@/app/how-we-work/page";
import { HomeV3Body, FAQ } from "@/components/v3/HomeV3";
import { HERO_SUPPORT } from "@/components/v3/HeroV3";
import { BeforeAfterShot } from "@/components/v3/Shots";
import CreditsPage from "@/app/credits/page";

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

  it("F4: the two unguaranteed promises are softened (Owner decision 13 Nov 2026)", () => {
    expect(HERO_SUPPORT).toContain("enquiries are easier to follow up");
    expect(HERO_SUPPORT).not.toContain("nothing gets lost");
    const edit = FAQ.find((f) => f.q === "Will I be able to update it myself?");
    expect(edit?.a).toContain("where it is agreed in your scope");
  });

  it("F5: the before/after shows two websites, not photos", () => {
    const html = renderToStaticMarkup(<BeforeAfterShot />);
    expect(html).not.toMatch(/<img/);
    expect(html).toContain("Before: hard to act on");
    expect(html).toContain("After: clear next step");
    expect((html.match(/class="v3-site(?: v3-site-old)? flex-1"/g) || []).length).toBe(2);
  });

  it("homepage links to Work and About under Why YCN, and offers WhatsApp beside the final call", () => {
    const html = renderToStaticMarkup(<HomeV3Body />);
    const why = html.slice(html.indexOf('id="why-ycn"'), html.indexOf('id="questions"'));
    expect(why).toContain('href="/work"');
    expect(why).toContain('href="/about"');
    const cta = html.slice(html.indexOf('id="start"'));
    expect(cta).toContain('href="/contact"');
    expect(cta).toMatch(/href="https:\/\/wa\.me\/918341226694"[^>]*rel="noopener noreferrer"|rel="noopener noreferrer"[^>]*href="https:\/\/wa\.me\/918341226694"/);
    expect(cta).toContain("Chat on WhatsApp");
  });

  it("removed media are gone and Credits no longer lists them", () => {
    for (const f of ["media/hero/ycn-hero-team-v1.webp", "media/hero/ycn-hero-device-ui-v2.webp", "media/small_business_proprietor_counter.jpg", "media/clip1_hands_using_smartphone_6s.mp4", "media/studio_small_08_1k.hdr"]) {
      expect(fs.existsSync(path.join(process.cwd(), "public", f))).toBe(false);
    }
    const credits = renderToStaticMarkup(<CreditsPage />);
    expect(credits).not.toMatch(/small_business_proprietor|clip1_|Solmaz/);
    expect(credits).toContain("do not currently show any third-party photos or video");
  });
});
