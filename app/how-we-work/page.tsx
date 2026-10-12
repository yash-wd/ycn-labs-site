import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageSquare, Layers, ShieldAlert, GitPullRequest, SlidersHorizontal, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "How We Work — YCN Labs",
  description:
    "You know your business. We know technology. An honest, eight-step methodology for turning business problems into durable software.",
  alternates: {
    canonical: "https://ycnlabs.com/how-we-work",
  },
};

interface Step {
  num: string;
  name: string;
  description: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    name: "Talk",
    description: "Tell us what is happening.",
  },
  {
    num: "02",
    name: "Understand",
    description: "We study the problem before choosing technology.",
  },
  {
    num: "03",
    name: "Plan",
    description: "We agree what should be built and what is out of scope.",
  },
  {
    num: "04",
    name: "Design",
    description: "You can see and review the experience before full implementation.",
  },
  {
    num: "05",
    name: "Build",
    description: "We engineer the agreed solution.",
  },
  {
    num: "06",
    name: "Test",
    description: "We check important behavior under real conditions.",
  },
  {
    num: "07",
    name: "Launch",
    description: "We put the approved version into production.",
  },
  {
    num: "08",
    name: "Improve",
    description: "Ongoing support/improvements happen according to the agreement.",
  },
];

const WORKING_AREAS = [
  {
    title: "Roles",
    icon: Users,
    description:
      "You bring the domain expertise and practical knowledge of how your business operates. We bring the engineering discipline, architecture design, and implementation.",
  },
  {
    title: "Communication",
    icon: MessageSquare,
    description:
      "Clear, structured written updates and scheduled milestone reviews instead of endless unorganized meetings. You always know what is being worked on and what comes next.",
  },
  {
    title: "Scope",
    icon: Layers,
    description:
      "Every project begins with a clear written agreement specifying what is included and what is explicitly out of scope, avoiding unexpected surprises.",
  },
  {
    title: "Decisions",
    icon: SlidersHorizontal,
    description:
      "Technical trade-offs are presented in plain business terms—explaining the trade-offs in complexity, cost, and long-term maintenance before making decisions.",
  },
  {
    title: "Feedback",
    icon: GitPullRequest,
    description:
      "You review working interactive previews at distinct milestones, so you can test and confirm the user experience before production rollout.",
  },
  {
    title: "Change Control",
    icon: ShieldAlert,
    description:
      "If requirements evolve during development, changes are discussed, documented, and agreed upon before they affect timeline or pricing.",
  },
];

export default function HowWeWorkPage() {
  return (
    <div className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <header className="max-w-3xl mb-16 md:mb-20 space-y-4">
        <p className="type-kicker text-[var(--action-blue)]">
          Methodology & Delivery
        </p>
        <h1 className="type-display-page text-[var(--text-primary)]">
          You know your business. We know technology.
        </h1>
        <p className="type-copy-lead text-[var(--text-secondary)] pt-2 max-w-2xl">
          You don’t need to arrive with a technical specification. We work with business owners and operators to diagnose operational friction and engineer reliable software that holds up.
        </p>
      </header>

      {/* 8-Step Process Sequence */}
      <section aria-labelledby="eight-steps-heading" className="space-y-6 mb-20 md:mb-28">
        <div className="space-y-2">
          <span className="type-kicker text-[var(--text-muted)]">
            Step-by-Step Delivery
          </span>
          <h2 id="eight-steps-heading" className="type-heading-section text-[var(--text-primary)]">
            The Eight-Step Path
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-start gap-5 hover:border-[var(--border-strong)] transition-colors"
            >
              <span className="type-mono text-xs font-semibold text-[var(--action-blue)] px-2.5 py-1 rounded-md bg-[var(--action-blue)]/10 shrink-0 mt-0.5">
                {step.num}
              </span>
              <div className="space-y-1">
                <h3 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">
                  {step.name}
                </h3>
                <p className="type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explanatory Areas for Collaboration */}
      <section aria-labelledby="collaboration-heading" className="space-y-8 mb-20 md:mb-28">
        <div className="max-w-2xl space-y-2">
          <span className="type-kicker text-[var(--text-muted)]">
            Working Principles
          </span>
          <h2 id="collaboration-heading" className="type-heading-section text-[var(--text-primary)]">
            How we manage the engagement
          </h2>
          <p className="type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
            Good software projects succeed because expectations, communication, and boundaries are clear from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKING_AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--action-blue)]/10 text-[var(--action-blue)] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="type-heading-card text-base font-semibold text-[var(--text-primary)]">
                  {area.title}
                </h3>
                <p className="type-copy-body text-xs text-[var(--text-secondary)] leading-relaxed">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section
        aria-label="Start a project"
        className="p-8 sm:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl">
          <h2 className="type-heading-card text-[var(--text-primary)]">
            Ready to tell us about your project?
          </h2>
          <p className="type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
            Start with what happens in your business today. We will guide the scope and technical choices.
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
