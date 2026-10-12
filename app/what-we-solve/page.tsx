import type { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowRight, Compass, Cpu, Layers, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "What We Solve — Websites, Software & Business Systems",
  description:
    "We start with the business problem and build websites, apps, automated workflows, and custom software that fit how you actually work.",
  alternates: {
    canonical: "https://ycnlabs.com/what-we-solve",
  },
};

interface NeedChapter {
  id: string;
  number: string;
  problem: string;
  capability: string;
  explanation: string;
  details: string[];
  icon: typeof Globe;
}

const OUTCOME_NEEDS: NeedChapter[] = [
  {
    id: "find-me",
    number: "01",
    problem: "Customers need to find me",
    capability: "Websites & digital presence",
    explanation: "Make it easier for people to understand what you offer and contact you.",
    details: [
      "Fast, responsive websites that load cleanly across phones, tablets, and desktops.",
      "Clear positioning and copywriting that explains what you do without marketing fluff.",
      "Accessible contact pathways so prospective clients can reach you with zero friction.",
    ],
    icon: Globe,
  },
  {
    id: "easier-to-act",
    number: "02",
    problem: "Customers need an easier way to act",
    capability: "Customer experiences",
    explanation: "Enquiries, bookings, ordering, portals and other clear customer journeys.",
    details: [
      "Frictionless intake forms and self-service booking flows tailored to your service model.",
      "Customer portals where clients can view updates, project progress, and verified records.",
      "Clear confirmations that give customers an obvious and reassuring next step.",
    ],
    icon: Sparkles,
  },
  {
    id: "manual-work",
    number: "03",
    problem: "My team does too much manually",
    capability: "Business systems & automation",
    explanation: "Dashboards, workflows, integrations and tools built around how the work actually happens.",
    details: [
      "Internal dispatch boards and operational queues that replace scattered messages and paper notes.",
      "Reliable software integrations that connect your existing tools and eliminate manual copy-pasting.",
      "Structured status tracking so every team member knows who owns each incoming task.",
    ],
    icon: Cpu,
  },
  {
    id: "product-idea",
    number: "04",
    problem: "I have a product idea",
    capability: "Software products",
    explanation: "Web apps, mobile products and SaaS built from a useful first version outward.",
    details: [
      "Disciplined first versions (MVPs) designed around core user value instead of feature bloat.",
      "Scalable web and mobile architectures built on clean TypeScript code and relational data models.",
      "Direct user feedback loops to refine the software based on actual operational usage.",
    ],
    icon: Compass,
  },
  {
    id: "custom-software",
    number: "05",
    problem: "I need something specific",
    capability: "Custom software",
    explanation: "Start with the problem and design the appropriate system rather than forcing a standard package.",
    details: [
      "Purpose-built software engineered when off-the-shelf templates cannot meet your operational requirements.",
      "Deep analysis of your current operational bottlenecks before recommending or writing code.",
      "Full code ownership, transparent documentation, and ongoing maintenance agreements.",
    ],
    icon: Layers,
  },
];

export default function WhatWeSolvePage() {
  return (
    <div className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <header className="max-w-3xl mb-16 md:mb-24 space-y-4">
        <p className="type-kicker text-[var(--action-blue)]">
          Outcomes & Capabilities
        </p>
        <h1 className="type-display-page text-[var(--text-primary)]">
          What are you trying to change?
        </h1>
        <p className="type-copy-lead text-[var(--text-secondary)] pt-2 max-w-2xl">
          Technology choices should follow the actual problem. We do not sell generic packages or force business processes into rigid templates. We start with what is painful, lost, or slow today, then engineer the digital solution that fits.
        </p>
      </header>

      {/* Outcome Chapters — Editorial sequence rather than identical cards */}
      <div className="space-y-12 md:space-y-16 mb-20 md:mb-28">
        {OUTCOME_NEEDS.map((item, index) => {
          const Icon = item.icon;
          return (
            <article
              key={item.id}
              id={item.id}
              className="p-8 sm:p-10 lg:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Identification & Need */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="type-mono text-xs font-semibold text-[var(--action-blue)] px-2.5 py-1 rounded-md bg-[var(--action-blue)]/10">
                      Need {item.number}
                    </span>
                    <span className="type-kicker text-[var(--text-muted)]">
                      {item.capability}
                    </span>
                  </div>

                  <h2 className="type-heading-section text-[var(--text-primary)]">
                    {item.problem}
                  </h2>

                  <p className="type-copy-body font-medium text-[var(--text-primary)]">
                    {item.explanation}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 type-control text-xs font-semibold text-[var(--action-blue)] hover:text-[var(--action-blue-hover)] transition-colors group"
                      aria-label={`Discuss solutions for: ${item.problem}`}
                    >
                      <span>Discuss this need with us</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right: Concrete Practical Deliverables */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] space-y-4">
                  <div className="flex items-center gap-2.5 type-kicker text-[var(--text-secondary)]">
                    <Icon className="w-4 h-4 text-[var(--action-blue)]" />
                    <span>How we address this</span>
                  </div>

                  <ul className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--action-blue)] shrink-0 mt-2" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Closing CTA */}
      <section
        aria-label="Start a conversation"
        className="p-8 sm:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl">
          <h2 className="type-heading-card text-[var(--text-primary)]">
            Not sure which one you need? Tell us what is happening today.
          </h2>
          <p className="type-copy-body text-sm text-[var(--text-secondary)]">
            Most business owners know where friction happens in their business. Deciding whether the answer is a website, tool, or software system is our job.
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
