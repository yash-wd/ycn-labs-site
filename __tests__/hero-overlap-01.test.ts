import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// YCN-HERO-OVERLAP-01 (Owner choice A, 9 Nov 2026; replaces the YCN-HERO-STACKED-01 layout tests).
// The device photo overlaps the team photo, but only its empty bottom-left sideboard/floor.
// The geometry below is what guarantees that; changing it needs a new coverage check.
const hero = fs.readFileSync(
  path.join(process.cwd(), "components", "homepage", "vnext", "HeroFoundation.tsx"),
  "utf-8"
);
const frameClass = (id: string) => {
  const m = hero.match(new RegExp(`id="${id}"\\s+className="([^"]+)"`));
  expect(m).not.toBeNull();
  return m![1];
};

// Composition maths, as fractions of the collage width W (container aspect 100/72).
const W_TEAM = 0.82;
const W_DEVICE = 0.34;
const H_BOX = 0.72;
const TEAM_RATIO = 1672 / 941;

describe("YCN-HERO-OVERLAP-01: device photo overlaps only empty background", () => {
  it("uses the measured geometry: 100/72 box, team 82% top-right, device 34% bottom-left in front", () => {
    expect(hero).toContain("mx-auto aspect-[100/72]");
    const team = frameClass("hero-editorial-team-frame");
    const device = frameClass("hero-editorial-device-frame");
    expect(team).toContain("absolute top-0 right-0 w-[82%] aspect-[1672/941]");
    expect(device).toContain("absolute bottom-0 left-0 z-10 w-[34%] aspect-[4/5]");
  });

  it("the covered part of the team photo stays inside its empty bottom-left (x <= 21%, y >= 60%)", () => {
    const teamH = W_TEAM / TEAM_RATIO;
    const deviceTop = H_BOX - W_DEVICE * 1.25;
    const coveredX = (W_DEVICE - (1 - W_TEAM)) / W_TEAM; // fraction of team width
    const coveredYFrom = deviceTop / teamH; // fraction of team height
    expect(coveredX).toBeLessThanOrEqual(0.21); // the left man's chair starts at ~22%, his body at ~26%
    expect(coveredYFrom).toBeGreaterThanOrEqual(0.6); // the sculpture and wall end above this
  });

  it("the team photo is never cropped and the device photo keeps its 4:5 framing", () => {
    expect(frameClass("hero-editorial-team-frame")).toContain("aspect-[1672/941]");
    expect(frameClass("hero-editorial-device-frame")).toContain("aspect-[4/5]");
  });

  it("removes the hover zoom from both photos", () => {
    expect(hero).not.toContain("group-hover:scale");
    expect(hero).not.toContain("scale-[1.02]");
  });

  it("keeps the signal line in the empty space below the team photo", () => {
    expect(hero).toContain("absolute top-[74%] right-[6%] w-[90px] h-[1px] bg-gradient");
  });

  it("requests images at the rendered sizes", () => {
    expect(hero).toContain('sizes="(max-width: 639px) 290px, 460px"');
    expect(hero).toContain('sizes="(max-width: 639px) 120px, 190px"');
  });
});
