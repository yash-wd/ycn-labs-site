import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileCheck, Layers, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Work & Evidence — YCN Labs",
  description:
    "We show our work honestly. How YCN Labs classifies client work, internal products, and concept builds.",
  alternates: {
    canonical: "https://ycnlabs.com/work",
  },
};

export default function WorkPage() {
  const classifications = [
    {
      label: "CLIENT WORK",
      badgeClass: "bg-[var(--action-blue)]/10 text-[var(--action-blue)] border-[var(--action-blue)]/20",
      description: "Paid work performed for a real client and publishable with permission.",
      criteria: "Requires signed commercial permission, verified scope, and documented production delivery.",
    },
    {
      label: "INTERNAL PRODUCT",
      badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      description: "A product actually built and used by YCN.",
      criteria: "Requires operational codebase ownership, verified runtime, and explicit feature limitations.",
    },
    {
      label: "CONCEPT BUILD",
      badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      description: "An engineering or design demonstration, not a production client result.",
      criteria: "Evaluated as an interactive architectural prototype; strictly separated from commercial outcomes.",
    },
  ];

  const standardsCriteria = [
    "Context / business problem — why the system was needed and what was broken.",
    "What YCN actually did — concrete engineering, design, and architecture deliverables.",
    "Current stage — development, testing, private beta, or verified live production.",
    "Verified scope & evidence — verifiable codebase facts, tests, and configuration.",
    "Limitations & targets — targets clearly distinguished from achieved production results.",
  ];

  return (
    <div className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <header className="max-w-3xl mb-16 md:mb-20 space-y-4">
        <p className="type-kicker text-[var(--action-blue)]">
          Portfolio & Claims Register
        </p>
        <h1 className="type-display-page text-[var(--text-primary)]">
          We show our work honestly.
        </h1>
        <p className="type-copy-lead text-[var(--text-secondary)] pt-2 max-w-2xl">
          Agency websites are full of fabricated case studies, stock logos, and unverified growth metrics. YCN Labs operates under an explicit Claims Register: we do not invent client testimonials, present prototypes as client victories, or publish unverified claims as facts.
        </p>
      </header>

      {/* Classification Standards Grid */}
      <section aria-labelledby="classification-heading" className="space-y-6 mb-16 md:mb-24">
        <div className="space-y-2">
          <h2 id="classification-heading" className="type-heading-section text-[var(--text-primary)]">
            How we classify work
          </h2>
          <p className="type-copy-body text-sm text-[var(--text-secondary)]">
            Every project or system we reference is categorized under one of three strict definitions:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classifications.map((item) => (
            <div
              key={item.label}
              className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className={`inline-block type-mono text-xs font-semibold px-3 py-1 rounded-md border ${item.badgeClass}`}>
                  {item.label}
                </span>
                <p className="type-copy-body text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] type-caption text-[var(--text-muted)]">
                {item.criteria}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Truthful Empty/Evidence State per YCN_CLAIMS_AND_PROOF.md */}
      <section
        aria-labelledby="evidence-status-heading"
        className="p-8 sm:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-8 mb-16 md:mb-24"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--action-blue)]/10 text-[var(--action-blue)] flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="type-kicker text-[var(--text-muted)]">
              Claims Status
            </span>
            <h2 id="evidence-status-heading" className="type-heading-section text-[var(--text-primary)]">
              We publish work when the scope, stage and evidence are clear.
            </h2>
          </div>
        </div>

        <p className="type-copy-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          Under our Claims Register (<code>docs/YCN_CLAIMS_AND_PROOF.md</code>), case studies and client projects appear publicly only after client permission is confirmed and technical deliverables have completed verified stage audits. We do not pre-fill placeholder clients, create dummy case studies, or publish unverified metrics simply to make this portfolio look full.
        </p>

        {/* 5 Publication Requirements */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-4">
          <h3 className="type-heading-card text-sm font-semibold text-[var(--text-primary)]">
            Every published item must satisfy five criteria:
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {standardsCriteria.map((criterion, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="type-mono text-xs font-semibold text-[var(--action-blue)] w-5 shrink-0 mt-0.5">
                  {idx + 1}.
                </span>
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Zero fabricated logos, testimonials, or fake case studies.</span>
          </div>

          <Link
            href="/engineering"
            className="inline-flex items-center gap-1.5 type-control text-xs font-semibold text-[var(--action-blue)] hover:text-[var(--action-blue-hover)] transition-colors group"
          >
            <span>Inspect our engineering standards</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Closing Action */}
      <section
        aria-label="Start a conversation"
        className="p-8 sm:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl">
          <h2 className="type-heading-card text-[var(--text-primary)]">
            Want to see how this engineering discipline applies to your project?
          </h2>
          <p className="type-copy-body text-sm text-[var(--text-secondary)]">
            We can walk you through our approach, architecture decisions, and code structure before you commit to building.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--action-blue)] hover:bg-[var(--action-blue-hover)] text-[var(--text-on-action)] type-control font-semibold text-sm normal-case tracking-[0.01em] transition-colors shrink-0 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] min-h-[44px]"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
