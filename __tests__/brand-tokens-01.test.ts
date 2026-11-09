import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// YCN-TOKENS-T1-01 (Owner approval 9 Nov 2026): brand colours live in one palette;
// components keep their token names; neutral tokens never point at the brand.
// Comments are stripped so they cannot hide or fake a declaration.
const css = fs
  .readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf-8")
  .replace(/\/\*[\s\S]*?\*\//g, "");
const BRAND_HEX = ["#0470B4", "#035b94", "#8BD4FF", "#BCE5FF", "#7DD3FC", "#0299C3", "#017596", "#02C1F7"];
const PALETTE = ["--ycn-brand-700", "--ycn-brand-800", "--ycn-brand-300", "--ycn-brand-200", "--ycn-brand-link-300", "--ycn-signal-600", "--ycn-signal-800", "--ycn-logo-cyan"];
const ROLES = ["--brand-primary", "--brand-primary-hover", "--brand-on-primary", "--brand-link", "--brand-signal", "--brand-focus"];
const COMPONENT_NAMES: Record<string, string> = {
  "--action-blue": "--brand-primary",
  "--action-blue-hover": "--brand-primary-hover",
  "--text-on-action": "--brand-on-primary",
  "--link-text": "--brand-link",
  "--signal-cyan": "--brand-signal",
  "--focus-ring": "--brand-focus",
};
const NEUTRAL = ["--bg-canvas", "--bg-surface", "--bg-surface-elevated", "--border-subtle", "--border-strong", "--control-border", "--text-primary", "--text-secondary", "--text-muted"];

// Rule bodies keyed by selector, in source order.
// The selector is the text after the last ";" (drops preceding @import/@custom-variant lines).
const blocks = [...css.matchAll(/(^|\n)([^{}\n][^{}]*?)\s*\{([^{}]*)\}/g)].map((m) => ({
  sel: m[2].split(";").pop()!.trim(),
  body: m[3],
}));
const decls = (sel: string) => blocks.filter((b) => b.sel === sel).map((b) => b.body).join("\n");
const valueOf = (body: string, name: string) => body.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1].trim();

describe("YCN-TOKENS-T1-01: one brand palette", () => {
  it("writes each brand hex exactly once, inside the palette", () => {
    for (const hex of BRAND_HEX) {
      const hits = css.match(new RegExp(hex, "gi")) || [];
      expect(hits.length, hex).toBe(1);
    }
    const root = decls(":root");
    for (const name of PALETTE) expect(valueOf(root, name), name).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it("defines every brand role for light and dark, pointing at the palette (on-primary is a neutral contrast colour)", () => {
    const light = decls(":root");
    const dark = decls(".dark");
    for (const role of ROLES) {
      const l = valueOf(light, role);
      const d = valueOf(dark, role);
      expect(l, `${role} light`).toBeDefined();
      expect(d, `${role} dark`).toBeDefined();
      if (role !== "--brand-on-primary") {
        expect(l).toMatch(/^var\(--ycn-/);
        expect(d).toMatch(/^var\(--ycn-/);
      }
    }
  });

  it("keeps the component-facing names and points them at the brand roles for both themes", () => {
    const both = decls(":root,\n.dark");
    for (const [name, role] of Object.entries(COMPONENT_NAMES)) {
      expect(valueOf(both, name), name).toBe(`var(${role})`);
    }
  });

  it("neutral tokens are plain values and never point at brand tokens", () => {
    for (const sel of [":root", ".dark"]) {
      const body = decls(sel);
      for (const name of NEUTRAL) {
        const v = valueOf(body, name);
        expect(v, `${sel} ${name}`).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    }
    expect(css).not.toMatch(/--(bg|border|text-(primary|secondary|muted)|control)[a-z-]*:\s*var\(--(ycn|brand)-/);
  });

  it("documents how to change the brand in the design system", () => {
    const doc = fs.readFileSync(path.join(process.cwd(), "docs", "YCN_DESIGN_SYSTEM.md"), "utf-8");
    expect(doc).toContain("### Changing brand colours (YCN-TOKENS-T1-01");
  });
});
