import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// YCN-HERO-STACKED-01 (Owner layout 2, then staggered option C, 9 Nov 2026): both hero photos
// stay visible and nothing overlaps. Device photo first, then team photo; no absolute positioning
// or negative offsets anywhere in the media column.
const hero = fs.readFileSync(
  path.join(process.cwd(), "components", "homepage", "vnext", "HeroFoundation.tsx"),
  "utf-8"
);
const frameClass = (id: string) => {
  const m = hero.match(new RegExp(`id="${id}"\\s+className="([^"]+)"`));
  expect(m).not.toBeNull();
  return m![1];
};

describe("YCN-HERO-STACKED-01: non-overlapping two-photo hero", () => {
  it("renders the device frame before the team frame (mobile order: device, then team)", () => {
    const device = hero.indexOf('id="hero-editorial-device-frame"');
    const team = hero.indexOf('id="hero-editorial-team-frame"');
    expect(device).toBeGreaterThan(-1);
    expect(team).toBeGreaterThan(device);
  });

  it("frames sit in normal flow: no absolute positioning, negative margins or z-stacking", () => {
    for (const id of ["hero-editorial-device-frame", "hero-editorial-team-frame"]) {
      const cls = frameClass(id);
      expect(cls).not.toMatch(/(^|\s)(lg:)?absolute(\s|$)/);
      expect(cls).not.toMatch(/(^|\s)-m[tblrxy]?-/);
      expect(cls).not.toMatch(/(^|\s)z-\d/);
    }
    expect(hero).not.toContain("min-h-[320px]");
  });

  it("stacks on mobile, side by side on tablet, staggered stack on desktop", () => {
    expect(hero).toContain("flex flex-col sm:flex-row lg:flex-col");
    expect(hero).toContain("lg:max-w-[436px] xl:max-w-[476px]");
    expect(frameClass("hero-editorial-device-frame")).toContain("lg:w-[calc(100%-36px)] lg:self-start");
    expect(frameClass("hero-editorial-team-frame")).toContain("lg:w-[calc(100%-36px)] lg:self-end");
  });

  it("keeps the team photo at its natural ratio everywhere and the device at 4:5, or 4:3 on desktop", () => {
    expect(frameClass("hero-editorial-team-frame")).toContain("aspect-[1672/941]");
    expect(frameClass("hero-editorial-device-frame")).toContain("aspect-[4/5] lg:aspect-[4/3]");
  });

  it("keeps the signal line in the 28px desktop gap with no negative margin", () => {
    expect(hero).toContain("lg:gap-[13.5px]");
    expect(hero).toContain("hidden lg:block self-center w-[90px] h-[1px] bg-gradient");
    const media = hero.slice(hero.indexOf('id="hero-media-layer"'));
    expect(media).not.toMatch(/(^|[\s"])-?m[tblrxy]?-\[-/);
    expect(media).not.toMatch(/(^|[\s"])-m[tblrxy]?-/);
  });

  it("image sizes switch at the real Tailwind breakpoints (640 and 1024)", () => {
    expect(hero).toContain('sizes="(max-width: 639px) 282px, (max-width: 1023px) 220px, 440px"');
    expect(hero).toContain('sizes="(max-width: 639px) 343px, (max-width: 1023px) 480px, 440px"');
  });
});
