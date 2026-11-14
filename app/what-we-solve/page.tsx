import type { Metadata } from "next";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { PageIntro, Section, ShotRow, CtaBand } from "@/components/v3/Section";
import { RequestsShot, FlowShot, SiteShot, BeforeAfterShot } from "@/components/v3/Shots";

// YCN-V3-UI Day 3 (COPY-V3.md, Owner-approved base). Ratified H1 kept.
export const metadata: Metadata = {
  title: "What We Solve — Websites, Software & Business Systems",
  description:
    "We start with the business problem and build websites, apps, automated workflows, and custom software that fit how you actually work.",
  alternates: {
    canonical: "https://ycnlabs.com/what-we-solve",
  },
};

export default function WhatWeSolvePage() {
  return (
    <>
      <PageIntro title="What are you trying to change?" lead="Four problems we see in most businesses, and what the fix looks like on screen." />
      <Section size="tight">
        <div className="grid gap-[var(--space-4)] md:gap-[var(--space-5)]">
          <ShotRow title="Enquiries get missed." shot={<RequestsShot />}>
            <p><strong className="text-[var(--text-primary)]">Before:</strong> messages across phone, WhatsApp and email, and nobody is sure who replied.</p>
            <p className="mt-[var(--space-1)]"><strong className="text-[var(--text-primary)]">After:</strong> one requests list with an owner, a next step and a status for each.</p>
          </ShotRow>
          <ShotRow title="Everything is done by hand." shot={<FlowShot />} flip>
            <p><strong className="text-[var(--text-primary)]">Before:</strong> retyping orders into sheets.</p>
            <p className="mt-[var(--space-1)]"><strong className="text-[var(--text-primary)]">After:</strong> forms that create the record, notify the right person and update the sheet.</p>
          </ShotRow>
          <ShotRow title="Customers can’t find you." shot={<SiteShot />}>
            <p><strong className="text-[var(--text-primary)]">Before:</strong> an old page, or no page.</p>
            <p className="mt-[var(--space-1)]"><strong className="text-[var(--text-primary)]">After:</strong> a site that says what you do, where you are and how to reach you, and loads fast on a phone.</p>
          </ShotRow>
          <ShotRow title="The old site doesn’t bring work." shot={<BeforeAfterShot />} flip>
            <p><strong className="text-[var(--text-primary)]">Before:</strong> a template that explains nothing.</p>
            <p className="mt-[var(--space-1)]"><strong className="text-[var(--text-primary)]">After:</strong> pages built around the customer’s next step.</p>
          </ShotRow>
        </div>
        <p className="type-caption mt-[var(--space-4)] text-[var(--text-secondary)]">Screens are illustrative demonstrations.</p>
      </Section>
      <CtaBand id="solve-cta" title="Not sure which one you need?" lead="Tell us what is happening today. We’ll work out what’s worth building first.">
        <YcnFlowButton href="/contact" variant="primary" size="lg" className="type-control min-h-[48px] w-full px-7 normal-case md:w-auto">
          Start a Project
        </YcnFlowButton>
      </CtaBand>
    </>
  );
}
