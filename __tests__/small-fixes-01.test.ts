import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// YCN-SMALL-FIXES-01 (Owner approval 9 Nov 2026): public defects from the UI/UX audit.
const read = (...p: string[]) => fs.readFileSync(path.join(process.cwd(), ...p), "utf-8");

describe("YCN-SMALL-FIXES-01", () => {
  it("Work page no longer prints the internal docs path", () => {
    const work = read("app", "work", "page.tsx");
    expect(work).not.toContain("docs/YCN_CLAIMS_AND_PROOF.md");
    expect(work).toContain("We publish work when the scope, stage and evidence are clear.");
  });

  it("Footer uses the same logo pairing as the Header (dark letters on light, white letters on dark)", () => {
    const footer = read("components", "Footer.tsx");
    const light = footer.indexOf('src="/brand/ycn-logo-light-transparent-224.png"');
    const dark = footer.indexOf('src="/brand/ycn-logo-dark-transparent-224.png"');
    expect(light).toBeGreaterThan(-1);
    expect(dark).toBeGreaterThan(-1);
    expect(footer.slice(light, dark)).toContain('className="object-contain block dark:hidden"');
    expect(footer.slice(dark)).toContain('className="object-contain hidden dark:block"');
  });

  it("Footer captions meet 4.5:1 in dark theme (slate-400 instead of slate-500)", () => {
    const footer = read("components", "Footer.tsx");
    expect(footer).not.toContain("dark:text-slate-500");
    expect((footer.match(/text-slate-500 dark:text-slate-400/g) || []).length).toBe(2);
  });

  it("homepage chapters keep tracking under reduced motion", () => {
    const chapters = read("components", "homepage", "vnext", "PhoneChaptersSection.tsx");
    expect(chapters).not.toContain("if (prefersReduced) return;");
    expect(chapters).toContain("new IntersectionObserver(");
    // Instant swaps come from the global reduced-motion rule.
    expect(read("app", "globals.css")).toContain("transition-duration: 0.01ms !important;");
  });

  it("contact form errors are readable in light theme and announced", () => {
    const form = read("components", "ContactForm.tsx");
    expect(form).not.toMatch(/className="text-xs text-rose-400/);
    // YCN-V3-UI Day 4: error colours moved onto the status tokens (independent of the brand).
    expect((form.match(/text-xs text-status-error/g) || []).length).toBe(4);
    expect(form).not.toMatch(/rose-|emerald-/);
    expect(form).toContain('<div role="alert"');
  });

  it("contact goal buttons are grouped and expose their selected state", () => {
    const form = read("components", "ContactForm.tsx");
    expect(form).toContain('role="group" aria-labelledby="improvement-goal-label"');
    expect(form).toContain('id="improvement-goal-label"');
    expect(form).toContain("aria-pressed={isSelected}");
  });
});
