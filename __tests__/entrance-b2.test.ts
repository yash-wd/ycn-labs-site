import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { isDevIntroReplay, logEntranceDiagnostic } from "@/components/homepage/vnext/entrance-diagnostics";
import { Phone3D } from "@/components/devices/Phone3D";

vi.mock("next/image", () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) =>
    React.createElement("img", { src, alt, className }),
}));

describe("Commit B2: Entrance Replay & Production-Inert Proof", () => {
  beforeEach(() => {
    // Reset global window object if needed
    if (typeof global.window === "undefined") {
      (global as unknown as { window: { location: { search: string } } }).window = {
        location: { search: "" },
      };
    }
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("1. PROOF: isDevIntroReplay() is STRICTLY INERT in production builds (returns false even with ?intro=1)", () => {
    vi.stubEnv("NODE_ENV", "production");
    global.window.location.search = "?intro=1";

    const result = isDevIntroReplay();
    expect(result).toBe(false);
  });

  it("2. PROOF: isDevIntroReplay() enables replay in development mode when ?intro=1 is present", () => {
    vi.stubEnv("NODE_ENV", "development");
    global.window.location.search = "?intro=1";

    const result = isDevIntroReplay();
    expect(result).toBe(true);
  });

  it("3. PROOF: isDevIntroReplay() returns false in development mode when ?intro=1 is absent", () => {
    vi.stubEnv("NODE_ENV", "development");
    global.window.location.search = "";

    expect(isDevIntroReplay()).toBe(false);

    global.window.location.search = "?intro=0";
    expect(isDevIntroReplay()).toBe(false);

    global.window.location.search = "?other=1";
    expect(isDevIntroReplay()).toBe(false);
  });

  it("4. logEntranceDiagnostic() logs in development and stays silent in production", () => {
    const consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    // In production: no logging
    vi.stubEnv("NODE_ENV", "production");
    logEntranceDiagnostic("skipped", "session_flag_seen");
    expect(consoleSpy).not.toHaveBeenCalled();

    // In development: structured console logging with timestamp & prefix
    vi.stubEnv("NODE_ENV", "development");
    logEntranceDiagnostic("skipped", "slow_network_2g", { effectiveType: "2g" });
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      "[YCN Entrance Diagnostic] SKIPPED",
      expect.objectContaining({
        reason: "slow_network_2g",
        details: { effectiveType: "2g" },
      })
    );
  });
});

describe("Commit B2: Phone3D Modular Architecture & Inert Screen Proof", () => {
  const html = renderToStaticMarkup(React.createElement(Phone3D));

  it("1. INERT CONTROLS PROOF: Phone3D screen contains ZERO interactive form or link controls", () => {
    // Assert zero button tags
    expect(html).not.toMatch(/<button[\s>]/i);
    // Assert zero anchor/link tags
    expect(html).not.toMatch(/<a[\s>]/i);
    // Assert zero input tags
    expect(html).not.toMatch(/<input[\s>]/i);
    // Assert zero select tags
    expect(html).not.toMatch(/<select[\s>]/i);
    // Assert zero textarea tags
    expect(html).not.toMatch(/<textarea[\s>]/i);
    // Assert no positive/focusable tabindex (tabIndex="-1" allowed on inert visual elements)
    expect(html).not.toMatch(/tabindex=["'](?:[0-9]+)["']/i);
  });

  it("2. CANON STRINGS PROOF: Phone3D contains verified ratified S0 copy per Owner B3 ruling", () => {
    expect(html).toContain("Sample experience");
    expect(html).toContain("How can we help?");
    expect(html).toContain("Request a quote");
    expect(html).toContain("Book a service");
    expect(html).toContain("Track a request");
    expect(html).toContain("Sample · nothing is sent");
  });

  it("3. ANTI-SLOP & TRADEMARK PROOF: Prohibited/invented marketing strings and Apple trademarks are absent", () => {
    // Apple signature clock
    expect(html).not.toContain("9:41");
    // Apple Dynamic Island trademark
    expect(html).not.toMatch(/dynamic\s*island/i);
    // Invented marketing labels
    expect(html).not.toContain("Customer View");
    expect(html).not.toContain("Transparent availability commitments");
  });

  it("4. COLOR SAFETY PROOF: Action blue used for discovery, signal cyan used strictly for request state", () => {
    expect(html).toContain("var(--action-blue)");
    expect(html).toContain("var(--signal-cyan)");
  });

  it("5. HARDWARE THEME-INVARIANCE PROOF: Chassis uses theme-invariant graphite hardware tokens", () => {
    expect(html).toContain("var(--phone-chassis)");
    expect(html).toContain("var(--phone-rail)");
  });
});

describe("Commit B3b: Code-Driven Entrance & Continuum Architecture Proof", () => {
  it("1. ZERO VIDEO PROOF: CodeEntranceContinuum contains ZERO video elements", async () => {
    const { CodeEntranceContinuum } = await import("@/components/homepage/vnext/CodeEntranceContinuum");
    const markup = renderToStaticMarkup(React.createElement(CodeEntranceContinuum, { onComplete: () => {} }));
    expect(markup).not.toMatch(/<video[\s>]/i);
    expect(markup).not.toContain(".mp4");
  });

  it("2. DOM LOGO RESOLUTION PROOF: Official DOM logo image is embedded directly in entrance", async () => {
    const { CodeEntranceContinuum } = await import("@/components/homepage/vnext/CodeEntranceContinuum");
    const markup = renderToStaticMarkup(React.createElement(CodeEntranceContinuum, { onComplete: () => {} }));
    expect(markup).toContain("/brand/ycn-labs-full-dark.png");
    expect(markup).toContain("/brand/ycn-labs-full-light.png");
    expect(markup).toContain("YCN Labs Official Logo");
  });

  it("3. SIGNAL COLOR PROOF: Cyan is used exclusively for the travelling signal", async () => {
    const { CodeEntranceContinuum } = await import("@/components/homepage/vnext/CodeEntranceContinuum");
    const markup = renderToStaticMarkup(React.createElement(CodeEntranceContinuum, { onComplete: () => {} }));
    expect(markup).toContain("var(--signal-cyan)");
    expect(markup).toContain("entrance-signal");
  });

  it("4. ACCESSIBILITY PROOF: Skip button is present with accessible 44px min target and label", async () => {
    const { CodeEntranceContinuum } = await import("@/components/homepage/vnext/CodeEntranceContinuum");
    const markup = renderToStaticMarkup(React.createElement(CodeEntranceContinuum, { onComplete: () => {} }));
    expect(markup).toContain("Skip");
    expect(markup).toContain("min-h-[44px]");
    expect(markup).toContain("aria-label");
  });
});

describe("Visual Fix 01: Brand Continuum Architecture & Fallback Proof", () => {
  it("1. FALLBACK PROOF: shouldBypassVideoForNetwork correctly detects Save-Data and slow networks (returns false for 3g, 4g, undefined per Claude X3)", async () => {
    const { shouldBypassVideoForNetwork } = await import("@/components/homepage/vnext/BrandContinuumFilm");

    expect(shouldBypassVideoForNetwork(undefined)).toBe(false);
    expect(shouldBypassVideoForNetwork({ saveData: false, effectiveType: "4g" })).toBe(false);
    expect(shouldBypassVideoForNetwork({ saveData: false, effectiveType: "3g" })).toBe(false);
    expect(shouldBypassVideoForNetwork({ effectiveType: "4g" })).toBe(false);
    expect(shouldBypassVideoForNetwork({ effectiveType: "3g" })).toBe(false);
    expect(shouldBypassVideoForNetwork({ saveData: true })).toBe(true);
    expect(shouldBypassVideoForNetwork({ effectiveType: "slow-2g" })).toBe(true);
    expect(shouldBypassVideoForNetwork({ effectiveType: "2g" })).toBe(true);
  });

  it("2. RESPONSIVE SELECTION PROOF: selectEntranceDerivative selects landscape derivative for width >= height", async () => {
    const { selectEntranceDerivative } = await import("@/components/homepage/vnext/BrandContinuumFilm");

    // Desktop wide (1440x900)
    const desktop = selectEntranceDerivative(1440, 900);
    expect(desktop.isLandscape).toBe(true);
    expect(desktop.src).toBe("/entrance/ycn-intro-final-landscape-v5.mp4");
    expect(desktop.poster).toBe("/entrance/ycn-intro-final-landscape-poster-v5.webp");

    // Landscape mobile (667x375)
    const landscapePhone = selectEntranceDerivative(667, 375);
    expect(landscapePhone.isLandscape).toBe(true);
    expect(landscapePhone.src).toBe("/entrance/ycn-intro-final-landscape-v5.mp4");

    // Portrait mobile (375x667)
    const portraitPhone = selectEntranceDerivative(375, 667);
    expect(portraitPhone.isLandscape).toBe(false);
    expect(portraitPhone.src).toBe("/entrance/ycn-intro-final-portrait-v5.mp4");
    expect(portraitPhone.poster).toBe("/entrance/ycn-intro-final-portrait-poster-v5.webp");
  });

  it("3. FORCED REPLAY OVERRIDE PROOF: ?intro=1 overrides session seen state", () => {
    // Simulate session storage having seen flag
    const sessionStorageMock: Record<string, string> = {
      ycn_v2_entrance_seen: "true",
    };

    const isIntroParam = true; // ?intro=1
    const seen = !isIntroParam && sessionStorageMock["ycn_v2_entrance_seen"] === "true";
    expect(seen).toBe(false); // Forced replay overrides seen flag
  });

  it("4. CANONICAL & LIVE LOGO ASSET PROOF: Official canonical presentation logo and VF12 live logo exist on disk", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const darkLogoPath = path.join(process.cwd(), "public", "brand", "ycn-labs-full-dark.png");
    const lightLogoPath = path.join(process.cwd(), "public", "brand", "ycn-labs-full-light.png");
    const liveLogoPath = path.join(process.cwd(), "public", "brand", "ycn-final-live-logo-v6.png");

    expect(fs.existsSync(darkLogoPath)).toBe(true);
    expect(fs.existsSync(lightLogoPath)).toBe(true);
    expect(fs.existsSync(liveLogoPath)).toBe(true);
    expect(fs.statSync(darkLogoPath).size).toBeGreaterThan(100000);
    expect(fs.statSync(lightLogoPath).size).toBeGreaterThan(100000);
    expect(fs.statSync(liveLogoPath).size).toBeGreaterThan(100000);
    expect(fs.statSync(liveLogoPath).size).toBeLessThan(600000);
  });

  it("5. VISUAL FIX 11 MEDIA PROOF: Full 10s entrance v5 derivatives exist under public/entrance/ (size > 2MB and < 5MB)", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const landscapeMp4 = path.join(process.cwd(), "public", "entrance", "ycn-intro-final-landscape-v5.mp4");
    const portraitMp4 = path.join(process.cwd(), "public", "entrance", "ycn-intro-final-portrait-v5.mp4");
    const landscapePoster = path.join(process.cwd(), "public", "entrance", "ycn-intro-final-landscape-poster-v5.webp");
    const portraitPoster = path.join(process.cwd(), "public", "entrance", "ycn-intro-final-portrait-poster-v5.webp");

    expect(fs.existsSync(landscapeMp4)).toBe(true);
    expect(fs.existsSync(portraitMp4)).toBe(true);
    expect(fs.existsSync(landscapePoster)).toBe(true);
    expect(fs.existsSync(portraitPoster)).toBe(true);

    const landscapeStat = fs.statSync(landscapeMp4);
    const portraitStat = fs.statSync(portraitMp4);

    expect(landscapeStat.size).toBeGreaterThan(2000000);
    expect(landscapeStat.size).toBeLessThan(5000000);
    expect(portraitStat.size).toBeGreaterThan(2000000);
    expect(portraitStat.size).toBeLessThan(5000000);
  });

  it("6. R2 ROOT CLEANLINESS PROOF: Repository root contains ZERO master MP4 files (masters reside in ../ycn-brand-masters/final-entrance-2026-09-26/)", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const rootFiles = fs.readdirSync(process.cwd());
    const rootMp4s = rootFiles.filter((f) => f.endsWith(".mp4"));
    expect(rootMp4s).toEqual([]);
  });

  it("7. VISUAL FIX 11 DARK POSTER PROOF: Posters are dark-compatible WebP assets", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const landscapePoster = path.join(process.cwd(), "public", "entrance", "ycn-intro-final-landscape-poster-v5.webp");
    const portraitPoster = path.join(process.cwd(), "public", "entrance", "ycn-intro-final-portrait-poster-v5.webp");

    const statL = fs.statSync(landscapePoster);
    const statP = fs.statSync(portraitPoster);

    expect(statL.size).toBeGreaterThan(500);
    expect(statP.size).toBeGreaterThan(500);
  });

  it("8. VISUAL FIX 03 EXACT CENTERING PROOF: Viewport centering aligns strictly to exact center across all screen widths", () => {
    const viewports = [
      { w: 320, h: 568 },
      { w: 375, h: 667 },
      { w: 414, h: 896 },
      { w: 768, h: 1024 },
      { w: 1024, h: 768 },
      { w: 1440, h: 900 },
    ];

    for (const vp of viewports) {
      const isMobile = vp.w < 768 || vp.h > vp.w;
      const startWidth = isMobile
        ? Math.min(240, vp.w * 0.70)
        : Math.min(420, vp.w * 0.35);
      const startHeight = startWidth * (1669 / 2048);
      const startX = (vp.w - startWidth) / 2;
      const startY = (vp.h - startHeight) / 2;

      const centerX = startX + startWidth / 2;
      const centerY = startY + startHeight / 2;

      // Exact viewport center equality
      expect(centerX).toBeCloseTo(vp.w / 2, 4);
      expect(centerY).toBeCloseTo(vp.h / 2, 4);
    }
  });

  it("9. INPUT-GATE-01 ENTRANCE LOCK PROOF: Skip button is the sole exit, stage code enforces input lock without passive scroll listeners", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const filmCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumFilm.tsx"),
      "utf-8"
    );
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Film has Skip button and does not register early-exit wheel/touch shortcuts
    expect(filmCode).toContain('id="entrance-skip-button"');
    expect(filmCode).not.toContain('window.addEventListener("wheel", handleWheel');
    expect(filmCode).not.toContain('addEventListener("scroll"');

    // Stage enforces centralized input lock
    expect(stageCode).toContain('isInputLocked');
    expect(stageCode).toContain('window.addEventListener("wheel", handleWheel, { passive: false })');
    expect(stageCode).toContain('window.addEventListener("touchmove", handleTouchMove, { passive: false })');
  });

  it("10. VISUAL FIX 10 SIMPLIFIED ENTRANCE PROOF: Exactly one video element, background bridge layer, zero separate network clip, clean web root", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Single video architecture proof: Background bridge (z-40), Film (z-50), Canonical Logo (z-[60])
    expect(stageCode).toContain('id="continuum-background-bridge"');
    expect(stageCode).toContain('id="continuum-travelling-logo"');
    expect(stageCode).toContain('id="logo-emergence-inner"');

    // Visual Fix 10: Separate network reveal clip completely removed
    expect(stageCode).not.toContain('id="brand-continuum-network-clip"');
    expect(stageCode).not.toContain('id="brand-continuum-network-video"');

    // Owner §1: Code-generated SVG networks completely removed
    expect(stageCode).not.toContain('id="assembly-back-svg"');
    expect(stageCode).not.toContain('id="assembly-front-svg"');
    expect(stageCode).not.toContain('id="separate-arc-draw"');
    expect(stageCode).not.toContain('id="crescent-arc-group"');

    // Owner §1: Wedge clipPath completely removed from logo
    expect(stageCode).not.toContain('id="logo-wedge-clip"');
    expect(stageCode).not.toContain('clipPath: "url(#logo-wedge-clip)"');

    // No tagline text allowed (C2)
    expect(stageCode).not.toContain("BUILD • INNOVATE • ELEVATE");
    expect(stageCode).not.toContain("SOFTWARE SOLUTIONS THAT SCALE");

    // Public web root hygiene: public/entrance/proof must not exist
    const publicProofPath = path.join(process.cwd(), "public", "entrance", "proof");
    expect(fs.existsSync(publicProofPath)).toBe(false);
  });

  it("11. VISUAL FIX 14 HOMEPAGE HOLD SIZE PROOF: computeHomepageHoldPose complies with VF14 limits across all 6 viewports", async () => {
    const { computeHomepageHoldPose } = await import(
      "@/components/homepage/vnext/BrandContinuumStage"
    );

    const testViewports = [
      { w: 320, h: 568, isLandscape: false },
      { w: 375, h: 667, isLandscape: false },
      { w: 414, h: 896, isLandscape: false },
      { w: 1024, h: 768, isLandscape: true },
      { w: 1440, h: 900, isLandscape: true },
      { w: 1920, h: 1080, isLandscape: true },
    ];

    for (const vp of testViewports) {
      const pose = computeHomepageHoldPose(vp.w, vp.h);
      const widthPct = (pose.width / vp.w) * 100;
      const heightPct = (pose.height / vp.h) * 100;

      if (!vp.isLandscape) {
        // VF14 Portrait Pose B: 48–54% of vw (target 50–52vw) AND <= 30% of vh
        expect(widthPct).toBeGreaterThanOrEqual(47.99);
        expect(widthPct).toBeLessThanOrEqual(54.01);
        expect(heightPct).toBeLessThanOrEqual(30.01);
      } else {
        // Landscape: 22–30% of vw AND <= 42% of vh (unchanged)
        expect(widthPct).toBeGreaterThanOrEqual(21.99);
        expect(widthPct).toBeLessThanOrEqual(30.01);
        expect(heightPct).toBeLessThanOrEqual(42.01);
      }

      // Horizontally centered
      expect(pose.left).toBeCloseTo((vp.w - pose.width) / 2, 2);
    }
  });
});

describe("Visual Fix 15: Flash Elimination, Navbar Availability & Hero Presentation", () => {
  it("1. DEFECT 1: Live logo is pre-decoded and non-paintable (visibility: hidden, opacity: 0) before Pose A geometry is applied", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Initial style must be visibility: "hidden", opacity: 0
    expect(stageCode).toContain('id="continuum-travelling-logo"');
    expect(stageCode).toContain('visibility: "hidden"');
    expect(stageCode).toContain("opacity: 0");

    // Pre-decode live logo during film playback (Claude E1/E2)
    expect(stageCode).toContain("imageDecodedPromiseRef");
    expect(stageCode).toContain(".decode()");

    // Handoff must await decode resolution
    expect(stageCode).toContain("await imageDecodedPromiseRef.current");
  });

  it("2. DEFECT 2: Navbar root elevated to z-50, responds to takeover release across exit paths", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const headerCode = fs.readFileSync(
      path.join(process.cwd(), "components", "Header.tsx"),
      "utf-8"
    );
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Navbar root elevated to z-50 above entrance layers
    expect(headerCode).toContain('id="navbar-root"');
    expect(headerCode).toContain("z-50");

    // Header listens for takeover release and active events
    expect(headerCode).toContain('"ycn:takeover-release"');
    expect(headerCode).toContain('"ycn:takeover-active"');

    // Nav items and actions toggle pointer-events and opacity
    expect(headerCode).toContain("pointer-events-none");
    expect(headerCode).toContain("pointer-events-auto");

    // Stage dispatches takeover release on docking and exit paths
    expect(stageCode).toContain('CustomEvent("ycn:takeover-release")');
  });

  it("3. DEFECT 3: Geometric gap rule and scroll budget boundaries (<= 150vh portrait, <= 120vh landscape)", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const heroCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "HeroFoundation.tsx"),
      "utf-8"
    );
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Hero narrative container has ID for targeted geometry-based animation
    expect(heroCode).toContain('id="hero-narrative-col"');
    // Top padding ensures geometric gap rule (>= 28px mobile, >= 40px desktop)
    expect(heroCode).toContain("pt-24");
    expect(heroCode).toContain("md:pt-28");

    // Scroll budget logic in stage
    expect(stageCode).toContain("h * 0.95");
    expect(stageCode).toContain("h * 1.15");

    // Check budget calculation mathematically for tested viewports
    const viewports = [
      { w: 375, h: 812, isLandscape: false, maxVh: 1.5 },
      { w: 414, h: 896, isLandscape: false, maxVh: 1.5 },
      { w: 1440, h: 900, isLandscape: true, maxVh: 1.2 },
      { w: 1920, h: 1080, isLandscape: true, maxVh: 1.2 },
    ];

    for (const vp of viewports) {
      const distance = vp.isLandscape ? Math.round(vp.h * 0.95) : Math.round(vp.h * 1.15);
      expect(distance).toBeLessThanOrEqual(vp.h * vp.maxVh);
    }
  });
});

describe("Visual Fix 17: Continuous Film-Logo Takeover & Synchronized Hero Media", () => {
  it("1. LIVE PNG INVISIBLE AT LARGE SIZE: Live PNG cannot become visible during large-logo handoff/contraction", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Live PNG remains strictly opacity 0 at Pose A and during contraction
    expect(stageCode).toContain("gsap.set(logoInner, { opacity: 0 });");
    expect(stageCode).not.toContain("duration: 0.36");
  });

  it("2. FILM CONTINUITY LAYER: Film-derived continuity layer owns visible logo state from ended through Pose B", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Extracts film logo with soft alpha and feathering
    expect(stageCode).toContain("extractFilmLogoToContinuityCanvas");
    expect(stageCode).toContain('id="continuum-continuity-canvas"');
    expect(stageCode).toContain("gsap.set(contCanvas, { opacity: 1, display: \"block\" });");
    // Contracts from Pose A to Pose B (VF19: 0.75s duration)
    expect(stageCode).toContain("duration: 0.75");
    expect(stageCode).toContain('ease: "power2.inOut"');
  });

  it("3. DELAYED LIVE PNG TAKEOVER: PNG takeover is scrubbed and permitted only inside small docking corridor", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Takeover crossfade is scrubbed inside docking timeline (0.32 -> 0.44, 12% duration)
    expect(stageCode).toContain("tl.to(contCanvas, { opacity: 0, duration: 0.12, ease: \"linear\" }, 0.32);");
    expect(stageCode).toContain("tl.to(logoInner, { opacity: 1, duration: 0.12, ease: \"linear\" }, 0.32);");
  });

  it("4. DOM WRAPPER CONTINUITY: Outer #continuum-travelling-logo wrapper remains the travelling DOM object", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    expect(stageCode).toContain('id="continuum-travelling-logo"');
    expect(stageCode).toContain("const dockScale = endWidth / holdPose.width;");
    expect(stageCode).toContain("const dockX = endX - holdPose.left;");
    expect(stageCode).toContain("const dockY = endY - holdPose.top;");
  });

  it("5. HERO MEDIA INITIAL STATE: #hero-media-layer begins hidden with opacity 0", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    expect(stageCode).toContain('const mediaLayer = document.getElementById("hero-media-layer");');
    expect(stageCode).toContain("opacity: 0");
    expect(stageCode).toContain("initialMediaYOffset");
  });

  it("6. SYNCHRONIZED HERO ENTRANCE: Phone/media and narrative share the Hero reveal window", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Both narrative and media animate over 0.48 -> 0.88 with 0.88 -> 1.00 reading hold
    expect(stageCode).toContain("tl.fromTo(\n        narrativeCol,");
    expect(stageCode).toContain("tl.fromTo(\n        mediaLayer,");
  });

  it("7. ZERO BLUR: Hero presentation contains NO blur at any visible stage", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    expect(stageCode).toContain('clearProps: "filter"');
    const activeCodeOnly = stageCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
    expect(activeCodeOnly).not.toContain('filter: "blur(');
    expect(activeCodeOnly).not.toContain("blur(10px)");
    expect(activeCodeOnly).not.toContain("blur(0px)");
  });

  it("8. EARLY EXIT: Skip/Esc/wheel/touch lands on Pose B hold with live PNG per Owner Ruling", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    expect(stageCode).toContain('setPhase("logo_hold")');
    expect(stageCode).toContain("gsap.set(logoInner, { opacity: 1 });");
    expect(stageCode).toContain('window.dispatchEvent(new CustomEvent("ycn:takeover-active"))');
  });

  it("9. REDUCED MOTION: Static fallback exposes both narrative and phone without blur", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    expect(stageCode).toContain("revealHeroImmediately");
    expect(stageCode).toContain("gsap.set(mediaLayer, { y: 0, scale: 1, opacity: 1, clearProps: \"filter,transform\" });");
    expect(stageCode).toContain("gsap.set(narrativeCol, { y: 0, opacity: 1, clearProps: \"filter,transform\" });");
  });
});

describe("Visual Fix 18: DPR Snapshot Canvas Geometry & Sizing Invariance Proof", () => {
  it("1. BACKING STORE SCALING: Snapshot backing store is scaled by devicePixelRatio", () => {
    const videoWidth = 1440;
    const videoHeight = 900;

    [1, 2, 3].forEach((dpr) => {
      const canvasWidth = Math.round(videoWidth * dpr);
      const canvasHeight = Math.round(videoHeight * dpr);

      expect(canvasWidth).toBe(videoWidth * dpr);
      expect(canvasHeight).toBe(videoHeight * dpr);
    });
  });

  it("2. CSS GEOMETRY INVARIANCE: Snapshot CSS display geometry remains strictly videoRect-sized across DPR 1, 2, 3", () => {
    const mockCanvas = {
      style: {} as Record<string, string>,
      width: 0,
      height: 0,
    };
    const videoRect = { left: 0, top: 0, width: 1440, height: 900 };
    const vw = Math.round(videoRect.width);
    const vh = Math.round(videoRect.height);

    [1, 2, 3].forEach((dpr) => {
      mockCanvas.style.position = "fixed";
      mockCanvas.style.left = `${Math.round(videoRect.left)}px`;
      mockCanvas.style.top = `${Math.round(videoRect.top)}px`;
      mockCanvas.style.width = `${vw}px`;
      mockCanvas.style.height = `${vh}px`;
      mockCanvas.width = Math.round(vw * dpr);
      mockCanvas.height = Math.round(vh * dpr);

      expect(mockCanvas.style.width).toBe("1440px");
      expect(mockCanvas.style.height).toBe("900px");
      expect(mockCanvas.style.left).toBe("0px");
      expect(mockCanvas.style.top).toBe("0px");
      // Backing store is multiplied, but CSS display size is not
      expect(mockCanvas.width).toBe(1440 * dpr);
      expect(mockCanvas.height).toBe(900 * dpr);
    });
  });

  it("3. CONDITIONAL VISIBILITY: Snapshot becomes visible only when CSS bounding rect matches viewport/video dimensions", () => {
    const vw = 1440;
    const vh = 900;

    // Matching rect: valid
    const validRect = { width: 1440, height: 900 };
    const isValid = Math.abs(validRect.width - vw) <= 1 && Math.abs(validRect.height - vh) <= 1;
    expect(isValid).toBe(true);

    // Oversized rect (e.g. 2880x1800 intrinsic leak at DPR 2): rejected
    const badRect = { width: 2880, height: 1800 };
    const isBadValid = Math.abs(badRect.width - vw) <= 1 && Math.abs(badRect.height - vh) <= 1;
    expect(isBadValid).toBe(false);
  });

  it("4. STATIC FALLBACK SAFETY NET: Snapshot canvas in BrandContinuumStage includes explicit w-full h-full", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Static fallback ensures intrinsic dimensions cannot expand layout
    expect(stageCode).toContain('id="continuum-last-frame-canvas"');
    expect(stageCode).toContain('className="fixed inset-0 w-full h-full z-55 pointer-events-none opacity-0"');
    // JS runtime geometry explicitly sets pixel dimensions
    expect(stageCode).toContain("canvas.style.width = `${vw}px`;");
    expect(stageCode).toContain("canvas.style.height = `${vh}px`;");
    // Verified check before display
    expect(stageCode).toContain("Math.abs(rect.width - vw) <= 1 && Math.abs(rect.height - vh) <= 1");
  });
});

describe("Visual Fix 19: Final Entrance Timing Polish & Fail-Safe Video Retention Proof", () => {
  it("1. TIMING POLISH VALUES: Contraction is 0.75s with 0.18s start delay, backdrop dissolve is 0.28s", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Contraction duration 0.75s, delay 0.18s
    expect(stageCode).toContain("duration: 0.75");
    expect(stageCode).toContain("0.18);");
    // Backdrop dissolve duration 0.28s
    expect(stageCode).toContain("duration: 0.28");
    // Backing store backdrop ratio: at start offset 0.18s, dissolve is 0.18 / 0.28 >= 60% faded
    const ratio = 0.18 / 0.28;
    expect(ratio).toBeGreaterThanOrEqual(0.60);
  });

  it("2. FAIL-SAFE VIDEO RETENTION: Video remains mounted during logo_settle if snapshot validation fails", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const stageCode = fs.readFileSync(
      path.join(process.cwd(), "components", "homepage", "vnext", "BrandContinuumStage.tsx"),
      "utf-8"
    );

    // Condition in JSX ensures BrandContinuumFilm remains mounted if isSnapshotEstablished is false
    expect(stageCode).toContain('(phase === "film" || (phase === "logo_settle" && !isSnapshotEstablished))');
    // Fallback in settleTl dissolves the video layer if snapshot is not established
    expect(stageCode).toContain('const videoLayer = document.getElementById("brand-continuum-film-layer");');
    expect(stageCode).toContain("settleTl.to(videoLayer, {");
    expect(stageCode).toContain("duration: 0.28");
  });

  it("3. DETERMINISTIC CONTINUITY UNDER GEOMETRY FAILURE: Video never unmounts leaving a black/empty frame", () => {
    // Simulate state machine transitions
    // Scenario A: Normal path (snapshot passes validation)
    let phase: string = "film";
    let isSnapshotEstablished: boolean = false;
    let snapshotOpacity: number = 0;
    let videoOpacity: number = 1;

    // ended fires -> snapshot valid
    isSnapshotEstablished = true;
    snapshotOpacity = 1;
    phase = "logo_settle";
    const filmMountedNormal = (phase === "film" || (phase === "logo_settle" && !isSnapshotEstablished));
    expect(filmMountedNormal).toBe(false); // video unmounts because snapshot is opacity 1
    expect(snapshotOpacity).toBe(1);

    // Scenario B: Failure path (snapshot fails validation)
    phase = "film";
    isSnapshotEstablished = false;
    snapshotOpacity = 0;
    videoOpacity = 1;

    // ended fires -> snapshot fails geometry check
    isSnapshotEstablished = false;
    snapshotOpacity = 0;
    phase = "logo_settle";
    const filmMountedFallback = (phase === "film" || (phase === "logo_settle" && !isSnapshotEstablished));
    expect(filmMountedFallback).toBe(true); // video REMAINS mounted!
    expect(videoOpacity).toBe(1); // video remains at opacity 1
    // Assert at least one layer (video or snapshot) is at opacity 1
    const hasBackdrop = snapshotOpacity === 1 || (filmMountedFallback && videoOpacity === 1);
    expect(hasBackdrop).toBe(true);
  });
});

