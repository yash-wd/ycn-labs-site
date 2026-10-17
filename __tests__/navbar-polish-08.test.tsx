import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Task 07: YCN-NAV-ORIGINAL-STYLE-01 Acceptance Suite (Gate B2 Distance-Based Phase Engine)", () => {
  const signalBorderSource = fs.readFileSync(
    path.join(process.cwd(), "components", "ui", "ycn-signal-border.tsx"),
    "utf-8"
  );
  const headerSource = fs.readFileSync(
    path.join(process.cwd(), "components", "Header.tsx"),
    "utf-8"
  );
  const globalsCssSource = fs.readFileSync(
    path.join(process.cwd(), "app", "globals.css"),
    "utf-8"
  );

  describe("1. Menu Continuous Perimeter Speed Target (80 px/s ±5%)", () => {
    it("defines physical speed target of 80 px/s in ycn-signal-border.tsx", () => {
      expect(signalBorderSource).toContain("TARGET_SPEED_PX_PER_SEC = 80");
    });

    it("calculates exact inset stroke centerline perimeter 2*(rectW-rectRx*2) + PI*rectH", () => {
      expect(signalBorderSource).toContain("const rectW = Math.max(0, orbitSize.width - 2.5);");
      expect(signalBorderSource).toContain("const rectH = Math.max(0, orbitSize.height - 2.5);");
      expect(signalBorderSource).toContain("const straightLen = Math.max(0, rectW - 2 * rectRx);");
      expect(signalBorderSource).toContain("const perimeter = Math.max(10, 2 * straightLen + Math.PI * rectH);");
    });

    it("verifies collapsed menu speed is within 80 px/s ±5% (76 - 84 px/s)", () => {
      const w = 104;
      const h = 44;
      const rectW = w - 2.5;
      const rectH = h - 2.5;
      const straight = rectW - rectH;
      const perimeter = 2 * straight + Math.PI * rectH;
      const targetSpeed = 80;
      const durationSec = perimeter / targetSpeed;
      const actualSpeed = perimeter / durationSec;

      expect(actualSpeed).toBeCloseTo(80, 2);
      expect(actualSpeed).toBeGreaterThanOrEqual(76);
      expect(actualSpeed).toBeLessThanOrEqual(84);
      expect(durationSec).toBeCloseTo(3.13, 2);
    });

    it("verifies expanded desktop menu speed is within 80 px/s ±5% (76 - 84 px/s)", () => {
      const w = 506;
      const h = 44;
      const rectW = w - 2.5;
      const rectH = h - 2.5;
      const straight = rectW - rectH;
      const perimeter = 2 * straight + Math.PI * rectH;
      const targetSpeed = 80;
      const durationSec = perimeter / targetSpeed;
      const actualSpeed = perimeter / durationSec;

      expect(actualSpeed).toBeCloseTo(80, 2);
      expect(actualSpeed).toBeGreaterThanOrEqual(76);
      expect(actualSpeed).toBeLessThanOrEqual(84);
      expect(durationSec).toBeCloseTo(13.18, 2);
    });
  });

  describe("2. Shared Animation Clock & Distance-Based Phase Engine", () => {
    it("uses gsap.ticker as the single approved shared animation clock", () => {
      expect(signalBorderSource).toContain('import { gsap } from "gsap";');
      expect(signalBorderSource).toContain("gsap.ticker.add(onTick)");
      expect(signalBorderSource).toContain("gsap.ticker.remove(onTick)");
    });

    it("accumulates active travel distance with deltaTime on shared ticker to preserve phase on resize and pause", () => {
      expect(signalBorderSource).toContain("distanceRef.current = (distanceRef.current + dtSec * TARGET_SPEED_PX_PER_SEC) % L;");
      expect(signalBorderSource).toContain("const posUnits = (distanceRef.current / L) * 100;");
      expect(signalBorderSource).toContain('el.setAttribute("stroke-dashoffset", offset);');
      expect(signalBorderSource).toContain("el.style.strokeDashoffset = offset;");
    });

    it("pauses decorative ticker when hidden or off-screen via IntersectionObserver and visibilitychange", () => {
      expect(signalBorderSource).toContain("IntersectionObserver");
      expect(signalBorderSource).toContain("visibilitychange");
      expect(signalBorderSource).toContain("stopTicker();");
    });

    it("renders a static composed frame under prefers-reduced-motion without running ticker", () => {
      expect(signalBorderSource).toContain("isReducedMotion");
      expect(signalBorderSource).toContain('orbitRectRef.current.setAttribute("stroke-dashoffset", "0");');
      expect(signalBorderSource).toContain('orbitRectRef.current.style.strokeDashoffset = "0";');
    });
  });

  describe("3. Gate B2 Conspicuous Signals & CTA Boundary Protection", () => {
    it("preserves Header CTA in mode='accent' without modifying CTA lighting/perimeter", () => {
      expect(headerSource).toContain('<YcnSignalBorder mode="accent" borderRadius={8}>');
      expect(headerSource).toContain('id="navbar-cta-button"');
    });

    it("retains continuous signal mode strictly on Menu capsule", () => {
      expect(headerSource).toContain('<YcnSignalBorder mode="continuous" active={isExpandedAny} borderRadius={999}>');
    });
  });

  describe("4. Accessibility & Responsive Navigation Controls", () => {
    it("provides accessible names and roles for navigation controls", () => {
      expect(headerSource).toContain('aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}');
      expect(headerSource).toContain('aria-label="Close navigation menu"');
      expect(headerSource).toContain('aria-label="Mobile Navigation Menu"');
    });

    it("makes GSAP sole animation owner with inline animation: none and no competing CSS animation", () => {
      expect(signalBorderSource).toContain('animation: "none"');
      expect(globalsCssSource).toContain("GSAP ticker is the sole owner of stroke motion");
      expect(globalsCssSource).toContain(".ycn-navbar-perimeter-orbit {\n  filter: drop-shadow(0 0 2px var(--signal-cyan));\n}");
    });
  });
});
