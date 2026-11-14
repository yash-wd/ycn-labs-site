import { describe, it, expect, vi } from "vitest";
import React from "react";
import fs from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";

// YCN-V3-UI Day 2 (Owner approval 12 Nov 2026): the homepage body from COPY-V3.md.
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => React.createElement("img", { src, alt }),
}));

import { HomeV3Body, SERVICES, STEPS, TRUST, FAQ, PROBLEMS } from "@/components/v3/HomeV3";
import { HERO_HEADLINE, HERO_SUPPORT } from "@/components/v3/HeroV3";

const html = renderToStaticMarkup(React.createElement(HomeV3Body));
const text = html.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " ");
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const home = fs.readFileSync(path.join(process.cwd(), "components", "homepage", "vnext", "HomepageVNextPhase1.tsx"), "utf-8");

describe("YCN-V3-UI Day 2: homepage body", () => {
  it("has the six approved sections in order, each labelled by its own heading", () => {
    const order = ["what-we-build", "problems", "how-it-works", "why-ycn", "questions", "start"].map((id) => html.indexOf(`id="${id}"`));
    expect(order.every((i) => i > -1)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    for (const h of ["build-heading", "problems-heading", "how-heading", "why-heading", "faq-heading", "cta-heading"]) {
      expect(html).toContain(`aria-labelledby="${h}"`);
      expect(html).toContain(`id="${h}"`);
    }
  });

  it("uses the approved content: 4 services, 4 problems, 4 steps, 4 trust points, 6 questions", () => {
    expect([SERVICES.length, PROBLEMS.length, STEPS.length, TRUST.length, FAQ.length]).toEqual([4, 4, 4, 4, 6]);
    for (const s of SERVICES) expect(html).toContain(s.title);
    for (const f of FAQ) expect(html).toContain(f.q);
    expect((html.match(/<details/g) || []).length).toBe(6);
  });

  it("stays short: hero + body under 600 words", () => {
    expect(words(text) + words(`${HERO_HEADLINE} ${HERO_SUPPORT}`)).toBeLessThan(600);
  });

  it("makes no unapproved promises (no fixed fix-window, price or result numbers)", () => {
    expect(text).not.toMatch(/30 days|₹|\b\d+%|guarantee|clients trust/i);
    expect(html).toContain("Screens are illustrative demonstrations.");
  });

  it("demonstration screens are decorative and not interactive", () => {
    expect((html.match(/class="v3-shot" aria-hidden="true"/g) || []).length).toBe(4);
    const shots = html.split('class="v3-shot"').slice(1).map((s) => s.slice(0, 1500));
    for (const s of shots) expect(s).not.toMatch(/<a |<button|<input|<form/);
  });

  it("the final call goes to /contact and the steps are an ordered list", () => {
    expect(html).toContain('href="/contact"');
    expect(html).toContain('<ol class="v3-steps">');
  });

  it("homepage renders hero then the new body, and none of the old sections", () => {
    expect(home.indexOf("<HeroV3 />")).toBeLessThan(home.indexOf("<HomeV3Body />"));
    for (const old of ["<PhoneChaptersSection", "<ConnectedRequestsSection", "<HomepageFAQSection", "<NeedsFinderAndCloseSection"]) {
      expect(home).not.toContain(old);
    }
  });
});
