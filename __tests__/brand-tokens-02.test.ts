import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// YCN-TOKENS-T2-01 (Owner approval 10 Nov 2026): the footer, error page and skip link use tokens,
// so a brand change reaches them and nothing there carries a typed brand colour.
const read = (...p: string[]) => fs.readFileSync(path.join(process.cwd(), ...p), "utf-8");
const BRAND_LIKE = /#(0470B4|035b94|8BD4FF|BCE5FF|7DD3FC|0299C3|017596|02C1F7|38BDF8)\b/i;

describe("YCN-TOKENS-T2-01: leftovers use tokens", () => {
  it("footer: no typed colours for hover or background", () => {
    const footer = read("components", "Footer.tsx");
    expect(footer).not.toMatch(BRAND_LIKE);
    expect(footer).not.toContain("#0A0E17");
    expect((footer.match(/hover:text-\[var\(--link-text\)\]/g) || []).length).toBe(9);
    expect(footer).toContain("bg-[var(--footer-bg)]");
  });

  it("footer surface is a neutral component token for both themes, independent of the brand", () => {
    const css = read("app", "globals.css").replace(/\/\*[\s\S]*?\*\//g, "");
    const defs = [...css.matchAll(/--footer-bg:\s*([^;]+);/g)].map((m) => m[1].trim());
    expect(defs).toEqual(["#F8FAFC", "#0A0E17"]);
  });

  it("error page 'Try again' uses the brand button tokens", () => {
    const err = read("app", "error.tsx");
    expect(err).not.toMatch(BRAND_LIKE);
    expect(err).toContain("bg-[var(--action-blue)] hover:bg-[var(--action-blue-hover)] text-[var(--text-on-action)]");
  });

  it("skip link uses the brand button tokens when focused", () => {
    const layout = read("app", "layout.tsx");
    expect(layout).not.toMatch(BRAND_LIKE);
    expect(layout).toContain("focus:bg-[var(--action-blue)] focus:text-[var(--text-on-action)]");
  });

  it("skip link sits above the fixed header (z-50) when focused, so it is visible", () => {
    const layout = read("app", "layout.tsx");
    expect(layout).toContain("focus:z-[60]");
    expect(layout).not.toContain("focus:z-50 ");
  });
});
