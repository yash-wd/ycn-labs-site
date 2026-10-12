"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SkipForward } from "lucide-react";

export interface BrandContinuumFilmProps {
  onTimeTick?: (currentTime: number, mainVideo: HTMLVideoElement) => void;
  onFilmEnd: (video?: HTMLVideoElement) => void;
  onEarlyExit: () => void;
  onError: (reason?: string) => void;
}

/**
 * BrandContinuumFilm — Visual Fix 11 Authoritative 3-Asset Entrance
 *
 * Requirements:
 * - Plays silent, faststart H.264 v5 derivative to its natural ended event (full 10.0s duration).
 * - Reports media-clock time tick on every rAF frame via onTimeTick(currentTime, mainVideo).
 * - Only ONE video element exists in the DOM.
 * - Native 'ended' event transitions to post-film stage with last-frame canvas snapshot.
 * - Explicit input only (wheel, touch, keyboard, Skip button); zero passive scroll listeners.
 * - Clean fade-in from matching dark background (~250-350ms) with dark-compatible poster.
 */
export function isForceReplay(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("intro") === "1";
  } catch {
    return false;
  }
}

export function shouldBypassVideoForNetwork(conn?: { saveData?: boolean; effectiveType?: string }): boolean {
  if (!conn) return false;
  if (isForceReplay()) return false; // Forced replay strictly overrides Save-Data & 2g
  return Boolean(conn.saveData || conn.effectiveType === "slow-2g" || conn.effectiveType === "2g");
}

export function selectEntranceDerivative(width: number, height: number): { isLandscape: boolean; src: string; poster: string } {
  const isLandscape = width >= height;
  return {
    isLandscape,
    src: isLandscape
      ? "/entrance/ycn-intro-final-landscape-v5.mp4"
      : "/entrance/ycn-intro-final-portrait-v5.mp4",
    poster: isLandscape
      ? "/entrance/ycn-intro-final-landscape-poster-v5.webp"
      : "/entrance/ycn-intro-final-portrait-poster-v5.webp",
  };
}

export function BrandContinuumFilm({
  onTimeTick,
  onFilmEnd,
  onEarlyExit,
  onError,
}: BrandContinuumFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState<{
    src: string;
    poster: string;
    isLandscape: boolean;
  } | null>(() => {
    if (typeof window !== "undefined") {
      return selectEntranceDerivative(window.innerWidth, window.innerHeight);
    }
    return null;
  });
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [mountedVisible, setMountedVisible] = useState(false);
  const exitHandledRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMountedVisible(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  const safeEarlyExit = useCallback(() => {
    if (exitHandledRef.current) return;
    exitHandledRef.current = true;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    onEarlyExit();
  }, [onEarlyExit]);

  const safeFilmEnd = useCallback(() => {
    if (exitHandledRef.current) return;
    exitHandledRef.current = true;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    onFilmEnd(videoRef.current || undefined);
  }, [onFilmEnd]);

  // 1. Initial responsive orientation evaluation & source selection
  useEffect(() => {
    // Check Save-Data / constrained network
    if (typeof navigator !== "undefined") {
      const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
        .connection;
      if (shouldBypassVideoForNetwork(conn)) {
        onError("save_data_or_constrained_network");
        return;
      }
    }

    const checkSource = () => {
      const current = selectEntranceDerivative(window.innerWidth, window.innerHeight);
      setSource((prev) => {
        if (!prev || prev.isLandscape !== current.isLandscape) {
          return current;
        }
        return prev;
      });
    };
    checkSource();
    window.addEventListener("resize", checkSource);
    return () => window.removeEventListener("resize", checkSource);
  }, [onError]);

  // 2. Interaction lock: Wheel, touch, keyboard, and Escape do NOT skip or advance the intro.
  // The ONLY intentional exit is the Skip button (INPUT-GATE-01 Owner Ruling 27 Sep 2026).
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  // 3. Autoplay & media event lifecycle
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    let hasStarted = false;
    let safetyTimeout: NodeJS.Timeout | null = null;
    const forceReplay = isForceReplay();

    // Stage 3 Playback Contract: enforce attributes before calling play()
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const clearWatchdog = () => {
      if (safetyTimeout) {
        clearTimeout(safetyTimeout);
        safetyTimeout = null;
      }
    };

    const handlePlaying = () => {
      hasStarted = true;
      clearWatchdog();
    };

    // Authoritative rAF media-clock ticker
    const tick = () => {
      if (video && !video.paused && !video.ended) {
        const t = video.currentTime;
        if (t > 0 && !hasStarted) {
          hasStarted = true;
          clearWatchdog();
        }

        if (onTimeTick) {
          onTimeTick(t, video);
        }
      }

      if (!exitHandledRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);

    const handleEnded = () => {
      safeFilmEnd();
    };

    const handleVideoError = () => {
      if (!exitHandledRef.current) {
        clearWatchdog();
        const err = video.error;
        console.error("[BrandContinuumFilm] Native video element error:", {
          code: err?.code,
          message: err?.message,
          networkState: video.networkState,
          readyState: video.readyState,
          currentSrc: video.currentSrc
        });
        onError("video_element_error");
      }
    };

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleVideoError);

    // Initial watchdog: 8s safety timeout (bypassed on forced replay to allow slow mobile buffer)
    if (!forceReplay) {
      safetyTimeout = setTimeout(() => {
        if (!hasStarted && video.currentTime < 0.1 && !exitHandledRef.current) {
          console.warn("[BrandContinuumFilm] Watchdog timeout triggered (currentTime < 0.1s after 8s)");
          onError("playback_timeout");
        }
      }, 8000);
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          hasStarted = true;
          clearWatchdog();
        })
        .catch((err: Error) => {
          console.error(`[BrandContinuumFilm] play() promise REJECTED with ${err.name}:`, err.message);
          if (!hasStarted && !exitHandledRef.current) {
            clearWatchdog();
            onError(err.name || "autoplay_blocked");
          }
        });
    }

    return () => {
      clearWatchdog();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleVideoError);
    };
  }, [source, onError, safeFilmEnd, onTimeTick]);

  if (!source) return null;

  return (
    <div
      ref={containerRef}
      id="brand-continuum-film-layer"
      data-testid="brand-continuum-film"
      role="region"
      aria-label="YCN Labs Brand Introduction Film"
      className={`fixed inset-0 z-50 ${
        source.isLandscape ? "bg-[#0F1216]" : "bg-[#010101]"
      } flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
        isFadingOut ? "opacity-0 pointer-events-none" : mountedVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Accessible Skip Button: Top-Right, 44x44px min target */}
      <button
        id="entrance-skip-button"
        data-testid="entrance-skip-button"
        type="button"
        onClick={safeEarlyExit}
        aria-label="Skip entrance film"
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-60 min-h-[44px] min-w-[44px] px-4 py-2 flex items-center gap-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-[var(--border-subtle)] text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--action-blue)] cursor-pointer pointer-events-auto"
      >
        <span>Skip</span>
        <SkipForward className="w-3.5 h-3.5 text-[var(--action-blue)]" />
      </button>

      {/* Video Viewport Container */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <video
          id="brand-continuum-film-element"
          ref={videoRef}
          src={source.src}
          poster={source.poster}
          playsInline
          muted
          autoPlay
          controls={false}
          loop={false}
          preload="auto"
          className="w-full h-full object-cover"
        />

        {/* Upscale Masking 1: Very subtle restrained vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(circle at center, transparent 55%, rgba(13, 17, 26, 0.42) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Upscale Masking 2: Very light micro-grain overlay (mix-blend-overlay) */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
