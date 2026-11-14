"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HeroV3 } from "@/components/v3/HeroV3";
import { HomeV3Body } from "@/components/v3/HomeV3";
import { isDevIntroReplay } from "./entrance-diagnostics";

import { BrandContinuumStage } from "./BrandContinuumStage";
import { isForceReplay } from "./BrandContinuumFilm";
import { ENTRANCE_INTERIM_BYPASS } from "./entrance-interim";

export function HomepageVNextPhase1() {
  const [mounted, setMounted] = useState(false);
  const [showEntrance, setShowEntrance] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Interim bypass (DECISION-048 Amendment 1): never mount the entrance stage.
    if (ENTRANCE_INTERIM_BYPASS) {
      setShowEntrance(false);
      return;
    }

    const forceReplay = isForceReplay();

    try {
      const seen = !forceReplay && sessionStorage.getItem("ycn_v2_entrance_seen") === "true";
      const prefersReduced = !forceReplay && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (forceReplay || (!seen && !prefersReduced)) {
        setShowEntrance(true);
      } else {
        setShowEntrance(false);
      }
    } catch {
      setShowEntrance(false);
    }
  }, []);

  const handleHandoffComplete = () => {
    // Docking completed
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] overflow-x-clip">
      {/* Brand Continuum: Stage 1 Prototype (Film -> Real Logo -> Glitch -> Continuous Logo into Navbar -> Site Continues) */}
      {mounted && showEntrance && (
        <BrandContinuumStage
          active={showEntrance}
          onHandoffComplete={handleHandoffComplete}
        />
      )}

      {/* 3. Hero Foundation: Rendered beneath from frame one */}
      <HeroV3 />

      {/* 4. YCN-V3-UI Day 2: the new homepage body (COPY-V3.md, Owner-approved base) */}
      <HomeV3Body />
    </div>
  );
}
