import { CheckCircle2 } from "lucide-react";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { YcnSignalBorder } from "@/components/ui/ycn-signal-border";
import { DeviceStage } from "./DeviceStage";

// YCN-V3-UI homepage hero (Owner choices 10 Nov 2026: concept H1 "device stage", headline A).
// Keeps the ids other code relies on: hero-foundation-root, hero-narrative-col,
// hero-media-layer, hero-primary-cta, hero-secondary-cta.
export const HERO_HEADLINE = "Websites and software that bring your business enquiries.";
export const HERO_SUPPORT =
  "We build the site, the forms and the follow-up, so customers can reach you and nothing gets lost.";

export function HeroV3() {
  return (
    <section
      id="hero-foundation-root"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[var(--bg-canvas)] pt-24 pb-[var(--space-5)] sm:pt-28 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center"
    >
      <div className="mx-auto grid w-full max-w-[var(--container-max)] items-center gap-[var(--space-5)] px-[var(--container-gutter)] lg:grid-cols-[1.05fr_1fr] lg:gap-[var(--space-4)]">
        <div id="hero-narrative-col" className="max-w-[40rem]">
          <h1 id="hero-heading" className="type-display-hero font-display text-[var(--text-primary)]">
            {HERO_HEADLINE}
          </h1>
          <p className="type-copy-lead mt-[var(--space-3)] max-w-[var(--measure)] text-[var(--text-secondary)]">
            {HERO_SUPPORT}
          </p>
          <div className="mt-[var(--space-4)] flex flex-col gap-3 sm:flex-row sm:items-center">
            <YcnSignalBorder mode="accent" borderRadius={8} className="w-full sm:w-auto">
              <YcnFlowButton
                href="/contact"
                variant="primary"
                size="lg"
                id="hero-primary-cta"
                className="type-control min-h-[48px] w-full px-7 normal-case sm:w-auto"
              >
                Start a Project
              </YcnFlowButton>
            </YcnSignalBorder>
            <YcnFlowButton
              href="/how-we-work"
              variant="secondary"
              size="lg"
              showArrow={false}
              id="hero-secondary-cta"
              className="type-control min-h-[48px] w-full px-6 normal-case sm:w-auto"
            >
              See how it works
            </YcnFlowButton>
          </div>
          <p className="type-caption mt-[var(--space-3)] flex items-center gap-2 text-[var(--text-secondary)]">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--action-blue)]" aria-hidden="true" />
            <span>You don’t need a technical brief to start.</span>
          </p>
        </div>
        <div id="hero-media-layer">
          <DeviceStage />
        </div>
      </div>
    </section>
  );
}
