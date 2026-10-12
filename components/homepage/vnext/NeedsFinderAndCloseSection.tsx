"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Compass } from "lucide-react";

interface NeedOption {
  id: string;
  title: string;
  description: string;
}

const NEED_OPTIONS: NeedOption[] = [
  {
    id: "find",
    title: "Help customers find my business",
    description: "Build a clear digital presence people can understand and act on.",
  },
  {
    id: "action",
    title: "Make enquiries, bookings or orders easier",
    description: "Give customers a simpler path from interest to action.",
  },
  {
    id: "manual",
    title: "Reduce repetitive work",
    description: "Connect information and remove avoidable manual steps where it makes sense.",
  },
  {
    id: "product",
    title: "Build a product",
    description: "Turn an idea or business process into a web, mobile or SaaS product.",
  },
  {
    id: "not-sure",
    title: "Not sure yet?",
    description: "Tell us what happens today.",
  },
];

export function NeedsFinderAndCloseSection() {
  const [selectedNeed, setSelectedNeed] = useState<string>("action");

  return (
    <section
      id="needs-finder-close-root"
      aria-label="Needs finder and start project close"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]"
    >
      {/* ============================================================== */}
      {/* 1. NEEDS FINDER INTERACTIVE GUIDE                              */}
      {/* ============================================================== */}
      <div className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto space-y-12 select-text">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] type-kicker text-[var(--action-blue)]">
              <Compass className="w-3.5 h-3.5" />
              <span>Paths to start</span>
            </div>
            {/* Ratified H2 */}
            <h2 className="type-heading-section text-[var(--text-primary)]">
              What would you like to make easier?
            </h2>
            <p className="type-copy-lead text-[var(--text-secondary)]">
              Select what describes your current goal or friction point:
            </p>
          </div>

          {/* Interactive Options (Local state only, zero analytics, zero external API) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NEED_OPTIONS.map((opt) => {
              const isSelected = selectedNeed === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedNeed(opt.id)}
                  className={`w-full p-5 sm:p-6 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                    isSelected
                      ? "bg-[var(--bg-surface-elevated)] border-[var(--action-blue)] shadow-md"
                      : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="space-y-1">
                    <span className="type-heading-card text-base font-semibold text-[var(--text-primary)] block leading-snug">
                      {opt.title}
                    </span>
                    <span className="type-copy-body text-xs sm:text-sm text-[var(--text-secondary)] block">
                      {opt.description}
                    </span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors mt-0.5 ${
                      isSelected
                        ? "bg-[var(--action-blue)] border-[var(--action-blue)] text-[var(--text-on-action)]"
                        : "border-[var(--border-strong)] bg-[var(--bg-surface)] text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    <Check className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. QUIET CLOSE SECTION (Ratified Copy)                          */}
      {/* ============================================================== */}
      <div className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 text-center select-text">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="inline-block type-kicker text-[var(--action-blue)]">
              Next Step
            </span>

            {/* Ratified H2 */}
            <h2 className="type-heading-section text-[var(--text-primary)]">
              What should work better next?
            </h2>

            {/* Ratified Support */}
            <p className="type-copy-lead text-[var(--text-secondary)] mx-auto">
              Start with the problem. We&apos;ll work out what the right product should be.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--action-blue)] hover:bg-[var(--action-blue-hover)] text-[var(--text-on-action)] type-control font-semibold text-sm normal-case tracking-[0.01em] shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] min-h-[48px] w-full sm:w-auto"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Ratified Descriptor */}
          <div className="pt-4">
            <span className="type-caption text-[var(--text-muted)]">
              Software, engineered to hold up.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
