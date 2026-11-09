import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// YCN-FONTS-LOCAL-01 (Owner approval 9 Nov 2026): fonts are self-hosted so the
// build never downloads from Google Fonts.
const root = process.cwd();
const read = (...p: string[]) => fs.readFileSync(path.join(root, ...p), "utf-8");

describe("YCN-FONTS-LOCAL-01: self-hosted fonts", () => {
  const layout = read("app", "layout.tsx");
  const fontsCss = read("app", "fonts.css");

  it("layout no longer imports next/font/google and applies the font variables class", () => {
    expect(layout).not.toMatch(/from\s+["']next\/font\/google["']/);
    expect(layout).toContain('import "./fonts.css";');
    expect(layout).toContain('className="ycn-font-vars ');
  });

  it("defines both font variables exactly as next/font did", () => {
    expect(fontsCss).toContain('--font-space-grotesk: "Space Grotesk", "Space Grotesk Fallback";');
    expect(fontsCss).toContain('--font-inter: "Inter", "Inter Fallback";');
  });

  it("declares 30 font faces plus the two metric fallbacks", () => {
    expect((fontsCss.match(/@font-face\{/g) || []).length).toBe(32);
    expect(fontsCss).toContain("font-family:Inter Fallback;");
    expect(fontsCss).toContain("font-family:Space Grotesk Fallback;");
  });

  it("every referenced font file exists locally and nothing points at Google", () => {
    const urls = [...fontsCss.matchAll(/url\((\/fonts\/[^)]+\.woff2)\)/g)].map((m) => m[1]);
    expect(urls.length).toBe(30);
    for (const u of new Set(urls)) {
      expect(fs.existsSync(path.join(root, "public", u))).toBe(true);
    }
    expect(fontsCss).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
    expect(layout).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
  });

  it("preloads the two Latin files that exist", () => {
    for (const f of ["/fonts/inter/inter-latin.woff2", "/fonts/space-grotesk/space-grotesk-latin.woff2"]) {
      expect(layout).toContain(`href="${f}"`);
      expect(fs.existsSync(path.join(root, "public", f))).toBe(true);
    }
  });

  it("ships the SIL Open Font License with each family", () => {
    const inter = read("public", "fonts", "inter", "OFL.txt");
    const sg = read("public", "fonts", "space-grotesk", "OFL.txt");
    expect(inter).toContain("Copyright 2016 The Inter Project Authors");
    expect(sg).toContain("Copyright 2020 The Space Grotesk Project Authors");
    for (const t of [inter, sg]) expect(t).toContain("SIL OPEN FONT LICENSE");
  });
});
