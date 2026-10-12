"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HeroFoundation } from "./HeroFoundation";
import { PhoneChaptersSection } from "./PhoneChaptersSection";
import { EditorialLaptopPortalSection } from "./EditorialLaptopPortalSection";
import { ConnectedRequestsSection } from "./ConnectedRequestsSection";
import { IllustrativeResultsSection } from "./IllustrativeResultsSection";
import { HowWeWorkSection } from "./HowWeWorkSection";
import { TheTurnSection } from "./TheTurnSection";
import { WhatWeAreBuildingSection } from "./WhatWeAreBuildingSection";
import { HomepageFAQSection } from "./HomepageFAQSection";
import { NeedsFinderAndCloseSection } from "./NeedsFinderAndCloseSection";
import { isDevIntroReplay } from "./entrance-diagnostics";

import { BrandContinuumStage } from "./BrandContinuumStage";
import { isForceReplay } from "./BrandContinuumFilm";

export function HomepageVNextPhase1() {
  const [mounted, setMounted] = useState(false);
  const [showEntrance, setShowEntrance] = useState(false);

  useEffect(() => {
    setMounted(true);

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
      <HeroFoundation />

      {/* 4. HOME-02F: Live-DOM Visual Capability Stage (Route A Architecture) */}
      <PhoneChaptersSection />

      {/* 5. Editorial Reset + Laptop Portal: Transition into Structured Business Surface */}
      <EditorialLaptopPortalSection />

      {/* 6. Full-Screen Product + Connected Requests Workflow */}
      <ConnectedRequestsSection />

      {/* 7. Illustrative Results / Process Model */}
      <IllustrativeResultsSection />

      {/* 8. How We Work: Eight-Step Methodology */}
      <HowWeWorkSection />

      {/* 9. The Turn: Software, engineered to hold up */}
      <TheTurnSection />

      {/* 10. Honest Work / Evidence: What We Are Building */}
      <WhatWeAreBuildingSection />

      {/* 11. Frequently Asked Questions */}
      <HomepageFAQSection />

      {/* 12. Needs Finder & Quiet Close */}
      <NeedsFinderAndCloseSection />
    </div>
  );
}
