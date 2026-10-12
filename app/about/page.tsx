import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "About — YCN Labs",
  description:
    "Technology should make a business easier to understand and easier to run. Learn how YCN Labs approaches software engineering and business clarity.",
  alternates: {
    canonical: "https://ycnlabs.com/about",
  },
};

export default function AboutPage() {
  const principles = [
    {
      title: "Business problem first",
      description: "We diagnose what is slow, manual, or lost in your day-to-day operations before writing code or choosing technology stacks.",
      icon: Compass,
    },
    {
      title: "Clarity on the surface",
      description: "Customer interfaces and team dashboards should be immediately understandable without requiring technical tutorials or training manuals.",
      icon: CheckCircle2,
    },
    {
      title: "Engineering discipline underneath",
      description: "We use strict type safety, verified schemas, automated test suites, and clean relational databases so systems hold up reliably over time.",
      icon: Code,
    },
    {
      title: "Honest representation",
      description: "We do not present concepts as completed client work, claim unverified performance figures, or inflate our capabilities.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <header className="max-w-3xl mb-16 md:mb-20 space-y-4">
        <p className="type-kicker text-[var(--action-blue)] font-sans">
          Company & Principles
        </p>
        <h1 className="type-display-page text-[var(--text-primary)] font-display">
          Technology should make a business easier to understand and easier to run.
        </h1>
        <p className="type-copy-lead text-[var(--text-secondary)] pt-2">
          YCN Labs starts with the business problem, then chooses the digital solution that fits. We are building the company to serve businesses taking a first step online and teams that have outgrown the way they work today.
        </p>
      </header>

      {/* Main Narrative & Philosophy Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 md:mb-28">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="type-heading-section text-[var(--text-primary)] font-display">
            Software built for clarity, not complexity.
          </h2>

          <p className="type-copy-body text-[var(--text-secondary)]">
            Many businesses struggle with digital technology not because their operational challenges are unsolvable, but because software vendors often over-complicate solutions: brittle drag-and-drop builders, opaque agency contracts, unneeded subscription layers, and months of unproductive jargon.
          </p>

          <p className="type-copy-body text-[var(--text-secondary)]">
            We care about clarity on the surface and engineering discipline underneath. We do not present concepts as client work or future capabilities as services already proven.
          </p>

          <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] leading-relaxed">
            We do not inflate our company history with unearned awards, fabricated client logos, or false claims of international scale. We are an engineering-led software studio committed to disciplined execution.
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-10 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--action-blue)] font-mono">
              Core Approach
            </span>
            <blockquote className="text-base sm:text-lg font-medium text-[var(--text-primary)] font-display leading-snug">
              “YCN Labs starts with the business problem, then chooses the digital solution that fits.”
            </blockquote>
            <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-2">
              <p>We care about clarity on the surface and engineering discipline underneath.</p>
              <p>We do not present concepts as client work or future capabilities as services already proven.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Grid */}
      <section aria-labelledby="principles-heading" className="space-y-8 mb-20 md:mb-28">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Our Standards
          </span>
          <h2 id="principles-heading" className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display">
            How we think about software
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--action-blue)]/10 text-[var(--action-blue)] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section
        aria-label="Start a conversation"
        className="p-8 sm:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-display">
            Ready to discuss your business?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Tell us where lost time or confusion happens today. No obligation and no sales pressure.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--action-blue)] hover:bg-[var(--action-blue-hover)] text-[var(--text-on-action)] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors shrink-0 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] min-h-[44px]"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
