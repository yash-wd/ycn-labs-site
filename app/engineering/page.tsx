import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Server,
  Shield,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
  Layers,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Practices — YCN Labs",
  description:
    "Simple for the user. Deliberate underneath. Technical choices and engineering practices used by YCN Labs.",
  alternates: {
    canonical: "https://ycnlabs.com/engineering",
  },
};

export default function EngineeringPage() {
  const practices = [
    {
      title: "Performance",
      description: "Keep important experiences responsive on real devices/networks.",
      icon: Activity,
    },
    {
      title: "Accessibility",
      description: "Design and test so more people can complete the journey.",
      icon: CheckCircle2,
    },
    {
      title: "Security",
      description: "Use appropriate boundaries, validation, secret handling and least privilege.",
      icon: Lock,
    },
    {
      title: "Reliability",
      description: "Handle errors, retries, fallbacks and recovery deliberately.",
      icon: Shield,
    },
    {
      title: "Architecture",
      description: "Choose structure based on requirements, not fashion.",
      icon: Layers,
    },
    {
      title: "Testing",
      description: "Verify the behavior that matters instead of relying on visual confidence.",
      icon: Code2,
    },
    {
      title: "Monitoring & operations",
      description: "Know when a production path fails and who is responsible.",
      icon: Server,
    },
    {
      title: "Handover",
      description: "Documentation, ownership and support follow the actual agreement.",
      icon: FileText,
    },
  ];

  return (
    <div className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <header className="max-w-3xl mb-16 md:mb-20 space-y-4">
        <p className="type-kicker text-[var(--action-blue)]">
          Engineering & Architecture
        </p>
        <h1 className="type-display-page text-[var(--text-primary)]">
          Simple for the user. Deliberate underneath.
        </h1>
        <p className="type-copy-lead text-[var(--text-secondary)] pt-2 max-w-2xl">
          Technical choices should follow the actual problem. This page explains the practices we use and the evidence available for this website/project; it must not turn targets into claims.
        </p>
      </header>

      {/* 8 Canonical Engineering Practices */}
      <section aria-labelledby="practices-heading" className="space-y-6 mb-20 md:mb-28">
        <div className="space-y-2">
          <span className="type-kicker text-[var(--text-muted)]">
            Core Disciplines
          </span>
          <h2 id="practices-heading" className="type-heading-section text-[var(--text-primary)]">
            The Eight Engineering Practices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {practices.map((practice) => {
            const Icon = practice.icon;
            return (
              <div
                key={practice.title}
                className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-start gap-4 hover:border-[var(--border-strong)] transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--action-blue)]/10 text-[var(--action-blue)] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">
                    {practice.title}
                  </h3>
                  <p className="type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
                    {practice.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section
        id="for-technical-readers"
        aria-labelledby="technical-specs-heading"
        className="p-8 sm:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] scroll-mt-24 space-y-8 mb-20 md:mb-28"
      >
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md type-kicker bg-[var(--action-blue)]/10 text-[var(--action-blue)]">
            <Terminal className="w-3.5 h-3.5" />
            <span>Implementation Details</span>
          </div>
          <h2 id="technical-specs-heading" className="type-heading-section text-[var(--text-primary)]">
            For Technical Evaluators
          </h2>
          <p className="type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
            A transparent breakdown of how this website and our production systems are engineered:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-3">
            <div className="flex items-center gap-2.5 type-heading-card text-sm font-semibold text-[var(--text-primary)]">
              <Code2 className="w-4 h-4 text-[var(--action-blue)]" />
              <span>Architecture & App Router</span>
            </div>
            <p className="type-copy-body text-xs text-[var(--text-secondary)] leading-relaxed">
              Built on Next.js 16 with React Server Components. Client-side JavaScript bundles are kept minimal and scoped to interactive components. Initial rendering performance is evaluated on simulated mobile profiles in lab testing.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-3">
            <div className="flex items-center gap-2.5 type-heading-card text-sm font-semibold text-[var(--text-primary)]">
              <Shield className="w-4 h-4 text-[var(--action-blue)]" />
              <span>Strict Type Safety & Schemas</span>
            </div>
            <p className="type-copy-body text-xs text-[var(--text-secondary)] leading-relaxed">
              TypeScript strict mode is enforced end-to-end across components, database models, and automated tests. Runtime input validation is performed using Zod schemas at both client form and server API boundaries.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-3">
            <div className="flex items-center gap-2.5 type-heading-card text-sm font-semibold text-[var(--text-primary)]">
              <Server className="w-4 h-4 text-[var(--action-blue)]" />
              <span>Data Boundaries & Deduplication</span>
            </div>
            <p className="type-copy-body text-xs text-[var(--text-secondary)] leading-relaxed">
              API routes enforce a 64 KB payload cap, hidden honeypots, and sliding-window rate limiting keyed with secret-keyed HMAC-SHA-256. Form requests compute cryptographic SHA-256 idempotency hashes, reserving submission keys only after database persistence succeeds.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-3">
            <div className="flex items-center gap-2.5 type-heading-card text-sm font-semibold text-[var(--text-primary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--action-blue)]" />
              <span>Accessibility & Reduced Motion</span>
            </div>
            <p className="type-copy-body text-xs text-[var(--text-secondary)] leading-relaxed">
              Semantic HTML elements, visible keyboard focus treatment, and high contrast targets (4.5:1 body minimum) are prioritized across all pages. Hardware animations strictly observe OS <code>prefers-reduced-motion</code> settings.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 type-mono text-xs text-[var(--text-muted)]">
          <span>Automated test verification via Vitest · Deterministic production builds</span>
          <Link
            href="/contact"
            className="type-control text-xs font-semibold text-[var(--action-blue)] hover:text-[var(--action-blue-hover)] hover:underline inline-flex items-center gap-1"
          >
            <span>Start a project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        aria-label="Start a conversation"
        className="p-8 sm:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl">
          <h2 className="type-heading-card text-[var(--text-primary)]">
            Need software engineered around how your team works?
          </h2>
          <p className="type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
            Tell us about your operations. We design systems that hold up over time.
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
