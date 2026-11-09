import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { ENTRANCE_INTERIM_BYPASS } from "@/components/homepage/vnext/entrance-interim";

// Interim first-impression correction (Owner ruling, 9 Nov 2026 — DECISION-048 Amendment 1).
const read = (...p: string[]) => fs.readFileSync(path.join(process.cwd(), ...p), "utf-8");
const exists = (...p: string[]) => fs.existsSync(path.join(process.cwd(), ...p));

describe("YCN-FIRST-IMPRESSION-01: interim entrance bypass", () => {
  const homepage = read("components", "homepage", "vnext", "HomepageVNextPhase1.tsx");
  const header = read("components", "Header.tsx");

  it("is switched on", () => {
    expect(ENTRANCE_INTERIM_BYPASS).toBe(true);
  });

  it("homepage returns before any entrance evaluation, so the stage (and film) never mounts", () => {
    const bypassIdx = homepage.indexOf("if (ENTRANCE_INTERIM_BYPASS) {");
    const replayIdx = homepage.indexOf("const forceReplay = isForceReplay();");
    expect(bypassIdx).toBeGreaterThan(-1);
    expect(replayIdx).toBeGreaterThan(bypassIdx);
    expect(homepage.slice(bypassIdx, replayIdx)).toContain("setShowEntrance(false);");
    expect(homepage.slice(bypassIdx, replayIdx)).toContain("return;");
  });

  it("header never enters entrance takeover mode while the bypass is on", () => {
    expect(header).toContain(
      "if (!ENTRANCE_INTERIM_BYPASS && (forceReplay || (!seen && !prefersReduced))) {"
    );
  });

  it("preserves every entrance component, film and logo asset (nothing deleted)", () => {
    for (const f of ["BrandContinuumStage.tsx", "BrandContinuumFilm.tsx", "CodeEntranceContinuum.tsx"]) {
      expect(exists("components", "homepage", "vnext", f)).toBe(true);
    }
    expect(exists("public", "entrance", "ycn-intro-final-landscape-v5.mp4")).toBe(true);
    expect(exists("public", "entrance", "ycn-intro-final-portrait-v5.mp4")).toBe(true);
    expect(exists("public", "brand", "ycn-final-live-logo-v6.png")).toBe(true);
    // The homepage still wires the stage, so turning the bypass off restores it.
    expect(homepage).toContain("<BrandContinuumStage");
  });

  it("is recorded as a temporary decision amendment", () => {
    const decisions = read("docs", "YCN_DECISIONS.md");
    expect(decisions).toContain("DECISION-048 Amendment 1");
  });
});
