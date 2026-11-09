import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { YcnSignalBorder } from "@/components/ui/ycn-signal-border";

export function HeroFoundation() {
  return (
    <section
      id="hero-foundation-root"
      aria-label="Hero"
      className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-28 md:pb-16 overflow-hidden bg-[var(--bg-canvas)]"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
        {/* Left Column: Hero Narrative & Canonical Copy (Desktop 6 cols, Mobile stacked first) */}
        {/* DOM Contract (Claude E3): Child 0 = Kicker, Child 1 = H1, Child 2 = Support */}
        <div id="hero-narrative-col" className="lg:col-span-6 xl:col-span-6 flex flex-col items-start space-y-4 sm:space-y-6 lg:space-y-8 z-10">
          {/* Child 0: Eyebrow badge / brand status (Kicker preserved pending Owner ruling) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] type-kicker text-[var(--action-blue)]">
            <span className="w-2 h-2 rounded-full bg-[var(--action-blue)] animate-pulse" />
            <span>Digital Products & Engineering</span>
          </div>

          {/* Child 1: Canonical H1 from docs/YCN_CONTENT_SPEC.md HERO-01 */}
          <h1 className="type-display-hero text-[var(--text-primary)] max-w-xl font-display">
            Websites and software. Built around your business.
          </h1>

          {/* Child 2: Canonical Support line */}
          <p className="type-copy-lead text-[var(--text-secondary)]">
            We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving.
          </p>

          {/* Child 3: Action Row — Primary (Flow Button + Signal Border) & Secondary (Flow Button) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pt-1 sm:pt-2">
            {/* Primary CTA: Start a Project (YcnFlowButton + YcnSignalBorder) */}
            <YcnSignalBorder mode="accent" borderRadius={8} className="w-full sm:w-auto">
              <YcnFlowButton
                href="/contact"
                variant="primary"
                size="lg"
                id="hero-primary-cta"
                className="w-full sm:w-auto min-h-[46px] sm:min-h-[48px] px-6 sm:px-7 py-3 sm:py-3.5 type-control normal-case"
              >
                Start a Project
              </YcnFlowButton>
            </YcnSignalBorder>

            {/* Secondary CTA: See what we build (YcnFlowButton variant="secondary" -> /what-we-solve) */}
            <YcnFlowButton
              href="/what-we-solve"
              variant="secondary"
              size="lg"
              showArrow={false}
              id="hero-secondary-cta"
              className="w-full sm:w-auto min-h-[46px] sm:min-h-[48px] px-5 sm:px-6 py-3 sm:py-3.5 type-control normal-case"
            >
              See what we build
            </YcnFlowButton>
          </div>

          {/* Child 4: Canonical Reassurance */}
          <p className="type-caption text-[var(--text-secondary)] flex items-center gap-2 pt-0.5 sm:pt-1">
            <CheckCircle2 className="w-4 h-4 text-[var(--action-blue)] shrink-0" />
            <span>You don’t need a technical brief to start.</span>
          </p>
        </div>

        {/* Right Column: Single Device Editorial Image.
            Interim first-impression correction (Owner, 9 Nov 2026 — DECISION-048 Amendment 1):
            the team/office photograph is removed from the Hero; its asset file is preserved. */}
        <div
          id="hero-media-layer"
          className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center w-full relative pt-4 sm:pt-6 lg:pt-0"
        >
          {/* Restrained local optical falloff / tonal depth field */}
          <div
            className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div className="w-[320px] sm:w-[420px] lg:w-[480px] h-[320px] sm:h-[420px] lg:h-[480px] rounded-full bg-[radial-gradient(circle,var(--action-blue)/0.05_0%,transparent_70%)] dark:bg-[radial-gradient(circle,var(--action-blue)/0.08_0%,transparent_70%)] blur-2xl" />
          </div>

          {/* Device editorial photo: Conceptual UI workstation hardware (Owner Override 28 Sep) */}
          <div
            id="hero-editorial-device-frame"
            className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border-subtle)]/90 dark:border-white/[0.12] shadow-[0_24px_50px_-10px_rgba(0,0,0,0.55)] dark:shadow-[0_32px_65px_-10px_rgba(0,0,0,0.95)] transition-transform duration-500 group"
          >
            <Image
              src="/media/hero/ycn-hero-device-ui-v2.webp"
              alt="Modern smartphone and laptop displaying illustrative messaging and data interfaces"
              fill
              priority
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, (max-width: 1280px) 380px, 420px"
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Restrained cyan datum detail */}
            <div
              className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[var(--action-blue)]/60 dark:bg-[var(--action-blue)] shadow-[0_0_8px_var(--action-blue)] pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

