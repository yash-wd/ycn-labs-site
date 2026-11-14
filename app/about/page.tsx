import type { Metadata } from "next";
import Image from "next/image";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { PageIntro, Section, CtaBand } from "@/components/v3/Section";

// YCN-V3-UI Day 3 (COPY-V3.md, Owner-approved base). Founder text is the Owner-approved
// wording (PR #22), verbatim; no title or location on this page (Owner ruling).
export const metadata: Metadata = {
  title: "About — YCN Labs",
  description:
    "Technology should make a business easier to understand and easier to run. Learn how YCN Labs approaches software engineering and business clarity.",
  alternates: {
    canonical: "https://ycnlabs.com/about",
  },
};

/** Owner decision (10 Nov 2026): the photo slot stays hidden until a real photo exists. */
const FOUNDER_PHOTO: string | null = null;

const COMMITMENTS = [
  { title: "Plain language", line: "Updates you can read in a minute." },
  { title: "A written agreement before work starts", line: "So you know what you own." },
  { title: "Demonstrations labelled as demonstrations", line: "Case studies follow as clients allow." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro title="Technology should make a business easier to understand and easier to run." />
      <Section size="tight" labelledBy="founder-heading">
        <div className={FOUNDER_PHOTO ? "grid items-start gap-[var(--space-5)] md:grid-cols-[1fr_320px]" : "max-w-3xl"}>
          <div>
            <h2 id="founder-heading" className="type-heading-section font-display text-[var(--text-primary)]">Yaseen</h2>
            <p className="type-copy-lead mt-[var(--space-2)] text-[var(--text-secondary)]">
              You can call me Yash. I started YCN Labs to help small and growing businesses in India build websites and web applications that fit the way they work. You don’t need a technical brief to talk to me. Tell me where an enquiry gets missed or what you keep doing by hand, and we’ll work out what’s worth building first.
            </p>
            <ul className="mt-[var(--space-4)] grid gap-[var(--space-3)] sm:grid-cols-3">
              {COMMITMENTS.map((c) => (
                <li key={c.title} className="border-t-2 border-[var(--action-blue)] pt-[var(--space-2)]">
                  <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">{c.title}</h3>
                  <p className="type-copy-body mt-1 text-[var(--text-secondary)]">{c.line}</p>
                </li>
              ))}
            </ul>
            <p className="type-copy-body mt-[var(--space-4)] text-[var(--text-secondary)]">
              We care about clarity on the surface and engineering discipline underneath. We do not present concepts as client work or future capabilities as services already proven.
            </p>
          </div>
          {FOUNDER_PHOTO ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-panel border border-[var(--border-subtle)]">
              <Image src={FOUNDER_PHOTO} alt="Yaseen, founder of YCN Labs" fill sizes="320px" className="object-cover" />
            </div>
          ) : null}
        </div>
      </Section>
      <CtaBand id="about-cta" title="Tell me what you want to make easier.">
        <YcnFlowButton href="/contact" variant="primary" size="lg" className="type-control min-h-[48px] w-full px-7 normal-case md:w-auto">
          Start a Project
        </YcnFlowButton>
      </CtaBand>
    </>
  );
}
