"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandContinuumFilm, isForceReplay } from "./BrandContinuumFilm";
import { CodeEntranceContinuum } from "./CodeEntranceContinuum";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BrandContinuumStageProps {
  active: boolean;
  onHandoffComplete?: () => void;
}

export type StagePhase = "film" | "fallback_code" | "logo_settle" | "logo_hold" | "docking" | "docked";

/**
 * Compute the on-screen bounding box of the logo in the video's ending frame (Pose A: VIDEO_END_POSE).
 * Mapped through CSS object-fit: cover intrinsic scaling and offsets.
 * Used strictly for the seamless invisible handoff from video to continuity layer.
 */
export function computeVideoLogoPose(vw: number, vh: number) {
  const isLandscape = vw >= vh;
  const W = isLandscape ? 1280 : 720;
  const H = isLandscape ? 720 : 1280;

  // Intrinsic video pose in 1280x720 / 720x1280 matching visible logo artwork in ycn-final-live-logo-v6.png (2100x1678)
  const pose = isLandscape
    ? { x: 296, y: 86, w: 648, h: 518 }
    : { x: 99, y: 275, w: 536, h: 428 };

  const s = Math.max(vw / W, vh / H);
  const ox = (vw - W * s) / 2;
  const oy = (vh - H * s) / 2;

  return {
    left: pose.x * s + ox,
    top: pose.y * s + oy,
    width: pose.w * s,
    height: pose.h * s,
  };
}

/**
 * Compute the resting homepage hold bounding box (Pose B: HOMEPAGE_HOLD_POSE).
 * Visual Fix 13 / 14 (Owner Rulings):
 * - Portrait: target 50–52vw, height cap 30vh.
 * - Landscape: 22–30% of vw AND <= 42% of vh.
 * - Generous negative space around the brandmark.
 * - Centered horizontally; vertically balanced above content area.
 */
export function computeHomepageHoldPose(vw: number, vh: number) {
  const isLandscape = vw >= vh;
  const targetWidthRatio = isLandscape ? 0.26 : 0.51;
  const maxWidthRatio = isLandscape ? 0.30 : 0.54;
  const minWidthRatio = isLandscape ? 0.22 : 0.48;
  const maxHeightRatio = isLandscape ? 0.42 : 0.30;
  const aspect = 1678 / 2100; // height / width = 0.7990476

  let width = vw * targetWidthRatio;
  let height = width * aspect;

  if (height > vh * maxHeightRatio) {
    height = vh * maxHeightRatio;
    width = height / aspect;
  }

  if (width > vw * maxWidthRatio) {
    width = vw * maxWidthRatio;
    height = width * aspect;
  } else if (width < vw * minWidthRatio) {
    width = vw * minWidthRatio;
    height = width * aspect;
  }

  const left = (vw - width) / 2;
  const verticalBias = isLandscape ? 0.48 : 0.44;
  const top = (vh - height) * verticalBias;

  return { left, top, width, height };
}

/**
 * Extract the film logo from the final video frame onto the continuity canvas
 * using soft alpha derived from luminance/chroma above the local film background
 * with continuous falloff and boundary feathering (Claude E2 & VF17 §2).
 */
function extractFilmLogoToContinuityCanvas(
  video: HTMLVideoElement,
  continuityCanvas: HTMLCanvasElement,
  poseA: { left: number; top: number; width: number; height: number },
  isLandscape: boolean
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const outW = Math.round(poseA.width * dpr);
  const outH = Math.round(poseA.height * dpr);

  continuityCanvas.width = outW;
  continuityCanvas.height = outH;

  const intrinsicPose = isLandscape
    ? { x: 296, y: 86, w: 648, h: 518 }
    : { x: 99, y: 275, w: 536, h: 428 };

  // 1. Draw raw intrinsic video crop onto an offscreen canvas
  const offscreen = document.createElement("canvas");
  offscreen.width = outW;
  offscreen.height = outH;
  const offCtx = offscreen.getContext("2d");
  if (!offCtx) return;

  offCtx.drawImage(
    video,
    intrinsicPose.x,
    intrinsicPose.y,
    intrinsicPose.w,
    intrinsicPose.h,
    0,
    0,
    outW,
    outH
  );

  const rawImgData = offCtx.getImageData(0, 0, outW, outH);
  const rawData = rawImgData.data;

  // 2. Compute soft alpha and edge feathering
  const ctx = continuityCanvas.getContext("2d");
  if (!ctx) return;
  const contImgData = ctx.createImageData(outW, outH);
  const contData = contImgData.data;

  const feather = Math.round(18 * dpr);

  for (let y = 0; y < outH; y++) {
    const bgLum = isLandscape ? (41 - (41 - 18) * (y / outH)) : 2;
    const bgR = isLandscape ? Math.round(34 - (34 - 16) * (y / outH)) : 1;
    const bgG = isLandscape ? Math.round(42 - (42 - 18) * (y / outH)) : 1;
    const bgB = isLandscape ? Math.round(49 - (49 - 21) * (y / outH)) : 1;
    const distY = Math.min(y, outH - 1 - y);

    for (let x = 0; x < outW; x++) {
      const idx = (y * outW + x) * 4;
      const r = rawData[idx];
      const g = rawData[idx + 1];
      const b = rawData[idx + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      const deltaLum = Math.max(0, lum - bgLum);
      const deltaChroma = isLandscape
        ? Math.max(0, (b - r) - 15) * 1.5 + Math.max(0, (g - r) - 8) * 1.2
        : Math.max(0, b - 5) + Math.max(0, g - 5);

      const signal = Math.max(deltaLum, deltaChroma);
      const floor = isLandscape ? 4 : 2;
      const ceiling = isLandscape ? 45 : 30;

      let alpha = 0;
      if (signal > floor) {
        const t = Math.min(1, (signal - floor) / (ceiling - floor));
        alpha = t * t * (3 - 2 * t);
      }

      // Boundary feather to ensure zero hard rectangular edge
      const distX = Math.min(x, outW - 1 - x);
      const edgeDist = Math.min(distX, distY);
      if (edgeDist < feather) {
        const f = edgeDist / feather;
        alpha *= (f * f * (3 - 2 * f));
      }

      let fgR = r;
      let fgG = g;
      let fgB = b;
      if (alpha > 0.01 && isLandscape) {
        fgR = Math.min(255, Math.max(0, Math.round((r - (1 - alpha) * bgR) / alpha)));
        fgG = Math.min(255, Math.max(0, Math.round((g - (1 - alpha) * bgG) / alpha)));
        fgB = Math.min(255, Math.max(0, Math.round((b - (1 - alpha) * bgB) / alpha)));
      }

      contData[idx] = fgR;
      contData[idx + 1] = fgG;
      contData[idx + 2] = fgB;
      contData[idx + 3] = Math.round(alpha * 255);
    }
  }

  ctx.putImageData(contImgData, 0, 0);
}

/**
 * BrandContinuumStage — Visual Fix 17 Architecture (Owner Rulings 27 Sep 2026)
 *
 * Sequence:
 * 1. Full 10.0s responsive intro video plays continuously.
 * 2. At video ended, last frame is snapshotted to full-screen canvas (#continuum-last-frame-canvas).
 * 3. Film Continuity Handoff (§1–§4):
 *    - Film logo extracted into continuity canvas inside #continuum-travelling-logo at Pose A.
 *    - Full-screen snapshot fades out over ~180ms.
 *    - The film-derived logo itself smoothly contracts from Pose A to Pose B over 600ms (power2.inOut).
 *    - Live PNG (/brand/ycn-final-live-logo-v6.png) remains opacity 0; no large live PNG appears.
 * 4. State enters `logo_hold`. Content remains hidden (narrative & phone opacity 0). Scroll cue fades in.
 * 5. On user scroll:
 *    - Starting from HOMEPAGE_HOLD_POSE (p=0.00), logo travels toward navbar (p=0.45).
 *    - Delayed Live PNG Takeover (§5 & Claude E3):
 *      When logo width <= 96px inside navbar corridor (0.32 -> 0.44), internal crossfade
 *      from continuity canvas to live PNG is scrubbed by dock progress.
 *    - Header reveals (0.20 -> 0.45).
 *    - Synchronized Hero Chapter Presentation (§7–§8):
 *      Hero narrative AND phone media layer enter together (0.48 -> 0.88),
 *      STRICTLY zero blur (filter: none), followed by reading hold (0.88 -> 1.00).
 *    - Reverse scroll mirrors back coherently.
 */
export function BrandContinuumStage({ active, onHandoffComplete }: BrandContinuumStageProps) {
  const [phase, setPhase] = useState<StagePhase>("film");
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSnapshotEstablished, setIsSnapshotEstablished] = useState(false);
  const [isScrollCueVisible, setIsScrollCueVisible] = useState(false);
  const snapshotEstablishedRef = useRef(false);

  // Centralized Input Gate 01 lock state (Owner Ruling 27 Sep 2026):
  // Locked during film AND post-film contraction until Pose B hold is reached AND scroll cue is visible.
  const isInputLocked = active && (phase === "film" || phase === "logo_settle" || (phase === "logo_hold" && !isScrollCueVisible));

  // DOM References
  const stageRef = useRef<HTMLDivElement>(null);
  const bgBridgeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const continuityCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoInnerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // State References
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const settleTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasCanvasSnapshotRef = useRef(false);
  const crossfadeTriggeredRef = useRef(false);
  const handoffCompletedRef = useRef(false);
  const hasReachedLogoHoldRef = useRef(false);
  const imageDecodedPromiseRef = useRef<Promise<void> | null>(null);
  const prevLockedRef = useRef(false);
  const prevHtmlOverflowRef = useRef<string>("");

  // Robust Input Lock & Synchronous Scrollbar Lifecycle (POLISH-NAV-04 & Claude E1)
  useEffect(() => {
    if (isInputLocked) {
      if (!prevLockedRef.current) {
        prevLockedRef.current = true;
        // On lock: record sbw = window.innerWidth - document.documentElement.clientWidth
        const sbw = typeof window !== "undefined"
          ? window.innerWidth - document.documentElement.clientWidth
          : 0;
        prevHtmlOverflowRef.current = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
        document.documentElement.dataset.ycnSbw = String(sbw);
      }
    } else {
      if (prevLockedRef.current) {
        prevLockedRef.current = false;
        // On unlock: in ONE synchronous handler:
        // 1. restore overflow
        document.documentElement.style.overflow = prevHtmlOverflowRef.current || "";
        delete document.documentElement.dataset.ycnSbw;

        // 2. re-derive Pose B hold geometry from the new document.documentElement.clientWidth / Height
        const newW = document.documentElement.clientWidth;
        const newH = window.innerHeight;
        const pose = computeHomepageHoldPose(newW, newH);

        // 3. apply with gsap.set before the next paint (no animation of that correction)
        if (logoWrapperRef.current) {
          gsap.set(logoWrapperRef.current, {
            left: pose.left,
            top: pose.top,
            width: pose.width,
            height: pose.height,
          });
        }

        // 4. ScrollTrigger.refresh()
        ScrollTrigger.refresh();
      }
    }

    return () => {
      if (prevLockedRef.current) {
        prevLockedRef.current = false;
        document.documentElement.style.overflow = prevHtmlOverflowRef.current || "";
        delete document.documentElement.dataset.ycnSbw;
        ScrollTrigger.refresh();
      }
    };
  }, [isInputLocked]);

  // Robust Input Lock Implementation (INPUT-GATE-01, Sections 3, 5, 6, 7 & Claude E4)
  useEffect(() => {
    if (!isInputLocked) return;

    // 1. Prevent wheel scrolling (mouse wheel & trackpad momentum)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // 2. Prevent touchmove scrolling (swipes & mobile gestures)
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // 3. Prevent scroll-producing keyboard events and Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      // Escape currently implemented as disabled — NOT an Owner ruling; ESC remains PENDING (A: Esc = Skip / B: disabled)
      if (key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Scroll navigation keys
      if (
        key === "ArrowUp" ||
        key === "ArrowDown" ||
        key === "PageUp" ||
        key === "PageDown" ||
        key === "Home" ||
        key === "End"
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Space: allow activation of Skip when focused, otherwise prevent page scroll!
      if (key === " " || key === "Spacebar") {
        const target = e.target as HTMLElement | null;
        if (target?.id === "entrance-skip-button" || target?.closest("#entrance-skip-button")) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Tab containment (Claude E4): cycle focus only within entrance controls (Skip)
      if (key === "Tab") {
        const skipBtn = document.getElementById("entrance-skip-button");
        if (skipBtn) {
          if (document.activeElement !== skipBtn) {
            e.preventDefault();
            skipBtn.focus();
          } else {
            e.preventDefault();
            skipBtn.focus();
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [isInputLocked]);

  // Inert attribute enforcement during lock (Claude E4)
  useEffect(() => {
    const hero = document.getElementById("hero-foundation-root");
    const navbar = document.getElementById("navbar-root");

    if (isInputLocked) {
      if (hero) {
        hero.setAttribute("inert", "");
        hero.setAttribute("aria-hidden", "true");
      }
      if (navbar) {
        navbar.setAttribute("inert", "");
        navbar.setAttribute("aria-hidden", "true");
      }
    } else {
      if (hero) {
        hero.removeAttribute("inert");
        hero.removeAttribute("aria-hidden");
      }
      if (navbar) {
        navbar.removeAttribute("inert");
        navbar.removeAttribute("aria-hidden");
      }
    }

    return () => {
      if (hero) {
        hero.removeAttribute("inert");
        hero.removeAttribute("aria-hidden");
      }
      if (navbar) {
        navbar.removeAttribute("inert");
        navbar.removeAttribute("aria-hidden");
      }
    };
  }, [isInputLocked]);

  // Position logo initially at Pose B (HOMEPAGE_HOLD_POSE) completely hidden until verified
  const setupHomepageHoldPose = useCallback(() => {
    const logoEl = logoWrapperRef.current;
    if (!logoEl || typeof window === "undefined") return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const pose = computeHomepageHoldPose(w, h);

    gsap.set(logoEl, {
      left: pose.left,
      top: pose.top,
      width: pose.width,
      height: pose.height,
      x: 0,
      y: 0,
      scale: 1,
      transformOrigin: "top left",
      visibility: "hidden",
      opacity: 0,
    });
  }, []);

  // Reveal Hero foundation helper (used on reduced motion and immediate exit paths)
  const revealHeroImmediately = useCallback(() => {
    const hero = document.getElementById("hero-foundation-root");
    if (hero) {
      gsap.set(hero, { opacity: 1, clearProps: "filter" });
    }
    const narrativeCol = document.getElementById("hero-narrative-col");
    if (narrativeCol) {
      gsap.set(narrativeCol, { y: 0, opacity: 1, clearProps: "filter,transform" });
    }
    const mediaLayer = document.getElementById("hero-media-layer");
    if (mediaLayer) {
      gsap.set(mediaLayer, { y: 0, scale: 1, opacity: 1, clearProps: "filter,transform" });
    }
  }, []);

  const revealNavbarImmediately = useCallback(() => {
    const header = document.querySelector("header");
    if (header) {
      gsap.to(header, { opacity: 1, duration: 0.4, ease: "power2.out" });
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("ycn:takeover-release"));
    }
  }, []);

  const markSessionSeen = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("ycn_v2_entrance_seen", "true");
      } catch {}
    }
  }, []);

  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Initialize viewport, hide Hero and Header during entrance
  useEffect(() => {
    setIsClient(true);

    // Pre-fetch and pre-decode live-logo PNG during film playback (Claude E1 & E2)
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = "/brand/ycn-final-live-logo-v6.png";
      imageDecodedPromiseRef.current = img.decode().catch((err) => {
        console.warn("[BrandContinuum] Logo pre-decode notice:", err);
      });
    }

    // Ensure hero and header are hidden during film / settle / logo_hold with zero blur
    const hero = document.getElementById("hero-foundation-root");
    if (hero) {
      gsap.set(hero, { opacity: 0, clearProps: "filter" });
    }
    const initialNarrativeY = (window.innerWidth < 768 || window.innerHeight > window.innerWidth) ? 52 : 44;
    const initialMediaY = Math.round(initialNarrativeY * 0.6);

    const narrativeCol = document.getElementById("hero-narrative-col");
    if (narrativeCol) {
      gsap.set(narrativeCol, {
        opacity: 0,
        y: initialNarrativeY,
        transformOrigin: "center top",
        clearProps: "filter",
      });
    }
    const mediaLayer = document.getElementById("hero-media-layer");
    if (mediaLayer) {
      gsap.set(mediaLayer, {
        opacity: 0,
        y: initialMediaY,
        scale: 0.96,
        transformOrigin: "center top",
        clearProps: "filter",
      });
    }
    const header = document.querySelector("header");
    if (header) {
      gsap.set(header, { opacity: 0 });
    }
    const navbarImage = document.getElementById("navbar-logo-image");
    if (navbarImage) {
      navbarImage.style.opacity = "0";
      navbarImage.style.visibility = "hidden";
    }

    const checkViewport = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w < 768 || h > w);

      // Set initial background bridge tone based on orientation (#0F1216 landscape / #010101 portrait)
      if (bgBridgeRef.current) {
        bgBridgeRef.current.style.backgroundColor = w >= h ? "#0F1216" : "#010101";
      }

      if (phaseRef.current === "logo_hold") {
        const holdPose = computeHomepageHoldPose(w, h);
        const logoEl = logoWrapperRef.current;
        if (logoEl) {
          gsap.set(logoEl, {
            left: holdPose.left,
            top: holdPose.top,
            width: holdPose.width,
            height: holdPose.height,
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: "top left",
          });
        }
      } else if (phaseRef.current === "film") {
        setupHomepageHoldPose();
      }
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    const forceReplay = isForceReplay();
    const seen = !forceReplay && typeof window !== "undefined" && sessionStorage.getItem("ycn_v2_entrance_seen") === "true";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ((prefersReducedMotion || seen) && !forceReplay) {
      setPhase("docked");
      revealHeroImmediately();
      revealNavbarImmediately();
      if (onHandoffComplete) onHandoffComplete();
      return;
    }

    return () => {
      window.removeEventListener("resize", checkViewport);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [onHandoffComplete, revealHeroImmediately, revealNavbarImmediately, setupHomepageHoldPose]);

  // Video native 'ended' event handler: captures canvas snapshot, extracts film continuity layer, contracts to Pose B
  const handleFilmEnd = useCallback(async (video?: HTMLVideoElement) => {
    console.info("[BrandContinuum] Film ended event received, starting VF17 continuous film-logo handoff");

    const canvas = canvasRef.current;
    const contCanvas = continuityCanvasRef.current;
    const logoEl = logoWrapperRef.current;
    const logoInner = logoInnerRef.current;
    const videoEl = video || (typeof document !== "undefined" ? document.querySelector<HTMLVideoElement>("#brand-continuum-film-element") || undefined : undefined);
    const videoRect = videoEl
      ? videoEl.getBoundingClientRect()
      : (typeof window !== "undefined"
          ? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
          : { left: 0, top: 0, width: 1440, height: 900 });
    const vw = Math.round(videoRect.width);
    const vh = Math.round(videoRect.height);
    const isLandscape = vw >= vh;

    // 1. Draw canvas snapshot of final video frame (full-screen backdrop)
    if (canvas && videoEl && videoEl.readyState >= 2) {
      try {
        const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 3);

        // Synchronously set CSS display size to match video element rect
        canvas.style.position = "fixed";
        canvas.style.left = `${Math.round(videoRect.left)}px`;
        canvas.style.top = `${Math.round(videoRect.top)}px`;
        canvas.style.width = `${vw}px`;
        canvas.style.height = `${vh}px`;

        // Backing store is DPR-scaled for high-resolution render
        canvas.width = Math.round(vw * dpr);
        canvas.height = Math.round(vh * dpr);

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          const vidW = videoEl.videoWidth || (isLandscape ? 1280 : 720);
          const vidH = videoEl.videoHeight || (isLandscape ? 720 : 1280);
          const s = Math.max(vw / vidW, vh / vidH);
          const rw = vidW * s;
          const rh = vidH * s;
          const ox = (vw - rw) / 2;
          const oy = (vh - rh) / 2;

          ctx.drawImage(videoEl, ox, oy, rw, rh);
          hasCanvasSnapshotRef.current = true;

          // Verify CSS display geometry before making visible to prevent oversized presentation
          const rect = canvas.getBoundingClientRect();
          if (Math.abs(rect.width - vw) <= 1 && Math.abs(rect.height - vh) <= 1) {
            gsap.set(canvas, { opacity: 1, visibility: "visible", display: "block" });
            snapshotEstablishedRef.current = true;
            setIsSnapshotEstablished(true);
          } else {
            console.warn("[BrandContinuum] Canvas snapshot CSS geometry mismatch:", rect, { vw, vh });
            snapshotEstablishedRef.current = false;
            setIsSnapshotEstablished(false);
          }
        }
      } catch (err) {
        console.warn("[BrandContinuum] Canvas snapshot drawImage failed:", err);
        snapshotEstablishedRef.current = false;
        setIsSnapshotEstablished(false);
      }
    }

    // Await pre-decode promise so live-logo PNG is fully decoded before starting handoff
    if (imageDecodedPromiseRef.current) {
      try {
        await imageDecodedPromiseRef.current;
      } catch {}
    }

    const poseA = computeVideoLogoPose(vw, vh);
    const holdPose = computeHomepageHoldPose(vw, vh);

    // 2. Extract film logo to continuity canvas at Pose A
    if (contCanvas && videoEl && videoEl.readyState >= 2) {
      try {
        extractFilmLogoToContinuityCanvas(videoEl, contCanvas, poseA, isLandscape);
        gsap.set(contCanvas, { opacity: 1, display: "block" });
      } catch (err) {
        console.warn("[BrandContinuum] Continuity canvas extraction failed:", err);
      }
    }

    // Live PNG remains strictly invisible (opacity: 0) during large logo state
    if (logoInner) {
      gsap.set(logoInner, { opacity: 0 });
    }

    // 3. Establish travelling wrapper at Pose A sitting directly over the final frame
    if (logoEl) {
      gsap.set(logoEl, {
        left: poseA.left,
        top: poseA.top,
        width: poseA.width,
        height: poseA.height,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        visibility: "visible",
        display: "flex",
        transformOrigin: "top left",
      });
    }

    setPhase("logo_settle");

    const settleTl = gsap.timeline({
      onComplete: () => {
        hasReachedLogoHoldRef.current = true;
        setPhase("logo_hold");
        snapshotEstablishedRef.current = false;
        setIsSnapshotEstablished(false);
        if (canvas) {
          canvas.style.display = "none";
        }
        // Exactly one visibility owner: set the cue synchronously at Pose B.
        // A competing ScrollTrigger opacity tween at progress 0 previously
        // raced this fade, leaving the prompt faint or invisible after film.
        const hint = scrollHintRef.current;
        if (hint) gsap.set(hint, { opacity: 1 });
        setIsScrollCueVisible(true);
      },
    });
    settleTimelineRef.current = settleTl;

    // Dissolve backdrop over 280ms: snapshot canvas if established, or fallback video layer if not
    if (snapshotEstablishedRef.current && canvas) {
      settleTl.to(canvas, {
        opacity: 0,
        duration: 0.28,
        ease: "power1.out",
      }, 0);
    } else {
      const videoLayer = document.getElementById("brand-continuum-film-layer");
      if (videoLayer) {
        settleTl.to(videoLayer, {
          opacity: 0,
          duration: 0.28,
          ease: "power1.out",
        }, 0);
      }
    }

    // Film-derived continuity logo contracts from Pose A to Pose B over 750ms (delay 0.18s per VF19)
    if (logoEl) {
      settleTl.to(logoEl, {
        left: holdPose.left,
        top: holdPose.top,
        width: holdPose.width,
        height: holdPose.height,
        duration: 0.75,
        ease: "power2.inOut",
      }, 0.18);
    }
  }, []);

  // Immediate early exit (Skip / Esc / wheel / touch during video)
  // Per Claude E4 & Owner Ruling: land at Pose B hold with live PNG directly visible, navbar hidden
  const finalizeEntranceImmediately = useCallback(() => {
    if (handoffCompletedRef.current) return;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (settleTimelineRef.current) {
      settleTimelineRef.current.kill();
      settleTimelineRef.current = null;
    }

    const logoEl = logoWrapperRef.current;
    const logoInner = logoInnerRef.current;
    const contCanvas = continuityCanvasRef.current;
    const bgBridge = bgBridgeRef.current;
    const canvas = canvasRef.current;
    if (canvas) canvas.style.display = "none";
    if (contCanvas) {
      contCanvas.style.opacity = "0";
      contCanvas.style.display = "none";
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const holdPose = computeHomepageHoldPose(vw, vh);

    if (bgBridge) {
      bgBridge.style.backgroundColor = vw >= vh ? "#0F1216" : "#010101";
      bgBridge.style.display = "block";
      bgBridge.style.opacity = "1";
    }

    // On early exit without final frame, show live PNG directly at Pose B
    if (logoInner) {
      gsap.set(logoInner, { opacity: 1 });
    }

    if (logoEl) {
      gsap.set(logoEl, {
        left: holdPose.left,
        top: holdPose.top,
        width: holdPose.width,
        height: holdPose.height,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        visibility: "visible",
        display: "flex",
        transformOrigin: "top left",
      });
    }

    const header = document.querySelector("header");
    if (header) {
      gsap.set(header, { opacity: 0 });
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("ycn:takeover-active"));
    }

    const hero = document.getElementById("hero-foundation-root");
    if (hero) {
      gsap.set(hero, { opacity: 0, clearProps: "filter" });
    }
    const initialNarrativeY = (vw < 768 || vh > vw) ? 52 : 44;
    const initialMediaY = Math.round(initialNarrativeY * 0.6);

    const narrativeCol = document.getElementById("hero-narrative-col");
    if (narrativeCol) {
      gsap.set(narrativeCol, {
        opacity: 0,
        y: initialNarrativeY,
        transformOrigin: "center top",
        clearProps: "filter",
      });
    }
    const mediaLayer = document.getElementById("hero-media-layer");
    if (mediaLayer) {
      gsap.set(mediaLayer, {
        opacity: 0,
        y: initialMediaY,
        scale: 0.96,
        transformOrigin: "center top",
        clearProps: "filter",
      });
    }

    setPhase("logo_hold");
    markSessionSeen();

    const hint = scrollHintRef.current;
    if (hint) {
      gsap.set(hint, { opacity: 1 });
    }
    setIsScrollCueVisible(true);
  }, [markSessionSeen]);

  // Media-clock tick handler (pre-position accurately if needed)
  const handleTimeTick = useCallback((t: number) => {
    const isLandscape = window.innerWidth >= window.innerHeight;
    const crossfadeStart = isLandscape ? 9.68 : 9.72;

    if (t >= crossfadeStart && !crossfadeTriggeredRef.current) {
      crossfadeTriggeredRef.current = true;
      setupHomepageHoldPose();
    }
  }, [setupHomepageHoldPose]);

  // Fallback to code continuum if video fails
  const handleFilmError = useCallback((reason?: string) => {
    console.warn("[BrandContinuum] Film playback failed/bypassed:", reason);
    setPhase("fallback_code");
  }, []);

  // Post-video ScrollTrigger Docking: Logo -> Navbar, Delayed PNG Takeover, Synchronized Hero Entrance
  useEffect(() => {
    if (phase !== "logo_hold") return;

    const logoEl = logoWrapperRef.current;
    if (!logoEl || typeof window === "undefined") return;

    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    const navbarTarget = document.getElementById("navbar-logo-target") || document.getElementById("navbar-logo-slot");
    const navbarImage = document.getElementById("navbar-logo-image");
    if (navbarImage) {
      navbarImage.style.opacity = "0";
      navbarImage.style.visibility = "hidden";
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobileScreen = w < 768 || h > w;

    const holdPose = computeHomepageHoldPose(w, h);
    const targetRect = navbarTarget ? navbarTarget.getBoundingClientRect() : null;
    const endWidth = targetRect ? targetRect.width : (isMobileScreen ? 44 : 52);
    const endHeight = endWidth * (1678 / 2100);
    const endX = targetRect ? targetRect.left : 24;
    const endY = targetRect ? targetRect.top + (targetRect.height - endHeight) / 2 : 16;

    // Pose C (NAVBAR DOCKED POSE) relative to holdPose (Pose B):
    const dockScale = endWidth / holdPose.width;
    const dockX = endX - holdPose.left;
    const dockY = endY - holdPose.top;

    const bgBridge = bgBridgeRef.current;
    const scrollHint = scrollHintRef.current;
    const contCanvas = continuityCanvasRef.current;
    const logoInner = logoInnerRef.current;
    const hero = document.getElementById("hero-foundation-root");
    const header = document.querySelector("header");
    const narrativeCol = document.getElementById("hero-narrative-col");
    const mediaLayer = document.getElementById("hero-media-layer");

    // Scroll budget: Sequence completes within 150vh on portrait and 120vh on landscape.
    const isLandscape = w >= h;
    const endDistance = isLandscape
      ? Math.round(h * 0.95)   // e.g. 855px on 900h (95vh <= 120vh)
      : Math.round(h * 1.15);  // e.g. 934px on 812h (115vh <= 150vh)

    const initialYOffset = isMobileScreen ? 52 : 44;
    const initialMediaYOffset = Math.round(initialYOffset * 0.6);

    // Ensure initial hidden state for Hero narrative & media layer before scroll starts with NO blur
    if (hero) {
      gsap.set(hero, { opacity: 1, clearProps: "filter" });
    }
    if (narrativeCol) {
      gsap.set(narrativeCol, {
        opacity: 0,
        y: initialYOffset,
        transformOrigin: "center top",
        clearProps: "filter",
      });
    }
    if (mediaLayer) {
      gsap.set(mediaLayer, {
        opacity: 0,
        y: initialMediaYOffset,
        scale: 0.96,
        transformOrigin: "center top",
        clearProps: "filter",
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "brand-continuum-docking",
        trigger: hero || "body",
        start: "top top",
        end: () => `+=${endDistance}`,
        pin: hero || false,
        pinSpacing: true,
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Exactly one deterministic cue controller, reversible at the top.
          // Guarded: only acts after the entrance has settled into logo_hold.
          // Before that state, scrolling must never reveal the cue.
          if (scrollHint && (hasReachedLogoHoldRef.current || phase === "logo_hold")) {
            gsap.set(scrollHint, { opacity: self.progress <= 0.02 ? 1 : 0 });
          }
          if (stageRef.current) {
            stageRef.current.setAttribute(
              "data-stage-phase",
              self.progress >= 0.95 ? "docked" : self.progress > 0.02 ? "docking" : "logo_hold"
            );
          }

          // Manage navbar takeover release dynamically
          if (self.progress >= 0.40) {
            window.dispatchEvent(new CustomEvent("ycn:takeover-release"));
          } else {
            window.dispatchEvent(new CustomEvent("ycn:takeover-active"));
          }

          if (self.progress >= 0.95 && !handoffCompletedRef.current) {
            handoffCompletedRef.current = true;
            markSessionSeen();
            if (onHandoffComplete) onHandoffComplete();
          }
        },
      },
    });

    // 1. Logo travels from Pose B hold directly to navbar target over 0.00 -> 0.45
    tl.fromTo(
      logoEl,
      {
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: "top left",
      },
      {
        x: dockX,
        y: dockY,
        scale: dockScale,
        transformOrigin: "top left",
        ease: "power2.out",
        duration: 0.45,
      },
      0
    );

    // Logo stays docked from 0.45 to 1.00
    tl.to(
      logoEl,
      {
        x: dockX,
        y: dockY,
        scale: dockScale,
        duration: 0.55,
        ease: "none",
      },
      0.45
    );

    // 2. Delayed Live PNG Takeover inside the navbar corridor (Claude E3 & §5)
    // Scrubbed by scroll progress: 0.32 -> 0.44 (spans 12% of docking timeline)
    // When width <= 96px inside the navbar corridor, crossfade continuity canvas -> live PNG
    if (contCanvas && logoInner) {
      tl.to(contCanvas, { opacity: 0, duration: 0.12, ease: "linear" }, 0.32);
      tl.to(logoInner, { opacity: 1, duration: 0.12, ease: "linear" }, 0.32);
    }

    // 3. Scroll hint is controlled solely by ScrollTrigger.onUpdate above (no timeline tween fight)

    // 4. Background bridge transitions out
    if (bgBridge) {
      tl.to(bgBridge, { opacity: 0, duration: 0.35, ease: "power1.out" }, 0);
      tl.set(bgBridge, { display: "none" }, 0.95);
    }

    // 5. Header reveals as logo docks (0.20 -> 0.45)
    if (header) {
      tl.fromTo(
        header,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power1.out" },
        0.20
      );
    }

    // 6. Synchronized Hero Chapter Presentation (0.48 -> 0.88) (§7–§8)
    // Both Narrative and Phone Media enter together as one first-section composition
    // STRICTLY zero blur (filter: none) across all states
    if (narrativeCol) {
      tl.fromTo(
        narrativeCol,
        {
          y: initialYOffset,
          opacity: 0,
          clearProps: "filter",
        },
        {
          y: 0,
          opacity: 1,
          clearProps: "filter",
          duration: 0.40,
          ease: "power2.out",
        },
        0.48
      );

      // Perceptual reading hold from 0.88 -> 1.00
      tl.to(
        narrativeCol,
        {
          y: 0,
          opacity: 1,
          clearProps: "filter",
          duration: 0.12,
          ease: "none",
        },
        0.88
      );
    }

    if (mediaLayer) {
      tl.fromTo(
        mediaLayer,
        {
          y: initialMediaYOffset,
          scale: 0.96,
          opacity: 0,
          clearProps: "filter",
        },
        {
          y: 0,
          scale: 1.0,
          opacity: 1,
          clearProps: "filter",
          duration: 0.40,
          ease: "power2.out",
        },
        0.48
      );

      // Perceptual reading hold from 0.88 -> 1.00
      tl.to(
        mediaLayer,
        {
          y: 0,
          scale: 1.0,
          opacity: 1,
          clearProps: "filter",
          duration: 0.12,
          ease: "none",
        },
        0.88
      );
    }

    scrollTriggerRef.current = tl.scrollTrigger || null;

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [markSessionSeen, onHandoffComplete, phase]);

  return (
    <div
      ref={stageRef}
      id="brand-continuum-stage"
      data-testid="brand-continuum-stage"
      data-input-locked={isInputLocked ? "true" : "false"}
      className={`pointer-events-none ${isInputLocked ? "touch-none overscroll-none" : ""}`}
    >
      {/* 1. Background Bridge Layer (dark tone matching video edges -> dissolves on scroll) */}
      <div
        ref={bgBridgeRef}
        id="continuum-background-bridge"
        className="fixed inset-0 z-40 transition-colors pointer-events-none"
        style={{
          backgroundColor: isMobile ? "#010101" : "#0F1216",
          display: phase === "docked" ? "none" : "block",
        }}
      />

      {/* 2. Video Last-Frame Canvas Snapshot (holds pixel-identical film ending during contraction) */}
      <canvas
        ref={canvasRef}
        id="continuum-last-frame-canvas"
        className="fixed inset-0 w-full h-full z-55 pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* 3. Main 10-Second Video Entrance (z-50) */}
      {(phase === "film" || (phase === "logo_settle" && !isSnapshotEstablished)) && (
        <BrandContinuumFilm
          onTimeTick={handleTimeTick}
          onFilmEnd={handleFilmEnd}
          onEarlyExit={finalizeEntranceImmediately}
          onError={handleFilmError}
        />
      )}

      {/* 4. Fallback Code Continuum */}
      {phase === "fallback_code" && (
        <CodeEntranceContinuum
          onComplete={finalizeEntranceImmediately}
        />
      )}

      {/* 5. Authoritative Travelling Logo Wrapper (z-[60]) */}
      <div
        ref={logoWrapperRef}
        id="continuum-travelling-logo"
        data-testid="continuum-travelling-logo"
        className="fixed z-[60] aspect-[2100/1678] flex items-center justify-center pointer-events-none"
        style={{
          visibility: "hidden",
          opacity: 0,
          willChange: "transform, opacity, left, top, width, height",
        }}
      >
        {/* Film-Derived Continuity Canvas (Visible from ended through Pose B and early docking) */}
        <canvas
          ref={continuityCanvasRef}
          id="continuum-continuity-canvas"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ opacity: 1 }}
          aria-hidden="true"
        />

        {/* Live Brandmark Asset (Scrubbed takeover when width <= 96px inside navbar corridor) */}
        <div
          ref={logoInnerRef}
          id="logo-emergence-inner"
          className="relative w-full h-full"
          style={{ opacity: 0 }}
        >
          <Image
            src="/brand/ycn-final-live-logo-v6.png"
            alt="YCN Labs Official Brandmark"
            fill
            priority
            sizes="(max-width: 768px) 360px, 720px"
            className="object-contain"
          />
        </div>
      </div>

      {/* 6. Restrained Scroll Hint (Appears in logo_hold state) */}
      <div
        ref={scrollHintRef}
        id="continuum-scroll-hint"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center gap-1 rounded-full border border-white/40 bg-[#111827]/95 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.55)] pointer-events-none opacity-0"
        aria-label="Scroll to explore"
      >
        <span className="text-[13px] font-medium tracking-[0.08em] text-white uppercase whitespace-nowrap">
          Scroll to explore
        </span>
        <span aria-hidden="true" className="text-[18px] leading-none font-bold text-[#7DD3FC]">↓</span>
      </div>
    </div>
  );
}
