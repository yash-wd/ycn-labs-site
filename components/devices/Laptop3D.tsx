"use client";

import React, { forwardRef } from "react";

export interface Laptop3DProps {
  children?: React.ReactNode;
  screenAwake?: boolean;
  screenDimOpacity?: number; // 0 = fully awake, 1 = quiet/black
  bezelOpacity?: number; // 1 = full bezel, 0 = faded for full-screen portal
  className?: string;
  screenClassName?: string;
}

/**
 * Laptop3D: Architectural DOM/CSS Laptop Shell
 * Theme-invariant hardware geometry (anodized space gray #1A1E29)
 * Structural bezel, camera notch, recessed display, and aluminum chassis lip.
 * Screen content is 100% real DOM.
 */
export const Laptop3D = forwardRef<HTMLDivElement, Laptop3DProps>(function Laptop3D(
  {
    children,
    screenAwake = true,
    screenDimOpacity,
    bezelOpacity = 1,
    className = "",
    screenClassName = "",
  },
  ref
) {
  const dimValue = screenDimOpacity !== undefined ? screenDimOpacity : screenAwake ? 0 : 0.85;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center select-none ${className}`}
      aria-label="Product display: Laptop view"
    >
      {/* 1. TOP ASSEMBLY: DISPLAY LID */}
      <div
        className="w-full relative transition-opacity duration-300"
        style={{ opacity: bezelOpacity }}
      >
        {/* Exterior Aluminum Shell */}
        <div
          className="w-full bg-[#181C26] rounded-t-2xl sm:rounded-t-3xl p-2 sm:p-3 lg:p-4 border border-[#2A3142] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden"
          style={{
            boxShadow:
              "0 20px 50px -10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 1px rgba(0,0,0,0.8)",
          }}
        >
          {/* Top Bezel: Camera Indicator */}
          <div
            className="w-full flex items-center justify-center pb-1.5 sm:pb-2"
            aria-hidden="true"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0B0D13] border border-white/10 flex items-center justify-center">
              <span className="w-0.5 h-0.5 rounded-full bg-emerald-500/60" />
            </div>
          </div>

          {/* Inner Display Screen Area (16:10 Aspect Ratio) */}
          <div
            className={`relative w-full aspect-[16/10] bg-[#0A0D14] rounded-lg sm:rounded-xl overflow-hidden border border-[#242A38] shadow-inner ${screenClassName}`}
          >
            {/* Real DOM Screen Content */}
            <div className="relative w-full h-full overflow-hidden">
              {children}
            </div>

            {/* Quiet / Sleep Standby Overlay (Controlled via GSAP scrub) */}
            <div
              className="absolute inset-0 bg-[#0A0D14] pointer-events-none transition-opacity duration-200"
              style={{ opacity: dimValue }}
              aria-hidden="true"
            />

            {/* Specular Glare / Physical Glass Sheen */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* 2. CHASSIS HINGE & CLUTCH BARREL */}
      <div
        className="w-28 sm:w-36 lg:w-44 h-1.5 sm:h-2 bg-[#10131B] rounded-t-sm mx-auto transition-opacity duration-300"
        style={{ opacity: bezelOpacity }}
        aria-hidden="true"
      />

      {/* 3. BOTTOM BASE: KEYBOARD DECK & THUMB NOTCH */}
      <div
        className="w-[104%] -mt-0.5 h-3 sm:h-4 lg:h-5 bg-gradient-to-b from-[#252C3D] via-[#1B202D] to-[#12151F] rounded-b-xl sm:rounded-b-2xl border-t border-white/15 relative flex justify-center items-start shadow-2xl transition-opacity duration-300"
        style={{
          opacity: bezelOpacity,
          boxShadow:
            "0 15px 35px -5px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
        aria-hidden="true"
      >
        {/* Thumb Opening Notch */}
        <div className="w-16 sm:w-20 lg:w-28 h-1 sm:h-1.5 bg-[#0F121A] rounded-b-md mx-auto border-t border-black/50" />
      </div>

      {/* 4. BASE GROUND SHADOW */}
      <div
        className="w-[96%] h-3 sm:h-4 bg-black/60 blur-md mx-auto -mt-1 rounded-full pointer-events-none transition-opacity duration-300"
        style={{ opacity: bezelOpacity }}
        aria-hidden="true"
      />
    </div>
  );
});
