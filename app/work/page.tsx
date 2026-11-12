import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageIntro, Section } from "@/components/v3/Section";
import { RequestsShot, IntakeShot, FlowShot, SiteShot, StatusShot } from "@/components/v3/Shots";

// YCN-V3-UI Day 3 (COPY-V3.md, Owner-approved base). Ratified H1 and classification kept;
// every item is a concept build until real client work may be published.
export const metadata: Metadata = {
  title: "Work & Evidence — YCN Labs",
  description:
    "We show our work honestly. How YCN Labs classifies client work, internal products, and concept builds.",
  alternates: {
    canonical: "https://ycnlabs.com/work",
  },
};

const ITEMS: { title: string; line: string; shot: ReactNode }[] = [
  { title: "Requests list", line: "Every enquiry with an owner, a next step and a status.", shot: <RequestsShot /> },
  { title: "Phone intake", line: "A short form customers can finish on a phone.", shot: <IntakeShot /> },
  { title: "Automation flow", line: "An order creates the record and tells the right person.", shot: <FlowShot /> },
  { title: "Business website", line: "What you do, where you are, and how to reach you.", shot: <SiteShot /> },
  { title: "Status and follow-up", line: "Who needs a call back, and who already has a reply.", shot: <StatusShot /> },
];

export default function WorkPage() {
  return (
    <>
      <PageIntro
        title="We show our work honestly."
        lead="We are a young studio. These screens are demonstrations we built to show how our work behaves. Real client case studies will appear here as clients allow."
      />
      <Section size="tight" labelledBy="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">Demonstrations</h2>
        <ul className="grid gap-[var(--space-4)] md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <li key={it.title}>
              <span className="inline-block rounded-full border border-[var(--border-strong)] px-3 py-0.5 text-xs text-[var(--text-secondary)]">Concept build</span>
              <div className="mt-[var(--space-2)]">{it.shot}</div>
              <h3 className="mt-[var(--space-2)] font-display text-lg font-semibold text-[var(--text-primary)]">{it.title}</h3>
              <p className="type-copy-body mt-1 text-[var(--text-secondary)]">{it.line}</p>
            </li>
          ))}
          <li className="flex flex-col justify-center rounded-card border border-dashed border-[var(--border-strong)] p-[var(--space-4)]">
            <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">Your project could be the first case study.</h3>
            <Link href="/contact" className="mt-[var(--space-2)] font-semibold text-[var(--link-text)] underline-offset-4 hover:underline">Start a Project</Link>
          </li>
        </ul>
        <p className="type-caption mt-[var(--space-4)] max-w-[var(--measure)] text-[var(--text-secondary)]">
          We publish work when the scope, stage and evidence are clear. Each item is labelled as client work, an internal product or a concept build.
        </p>
      </Section>
    </>
  );
}
