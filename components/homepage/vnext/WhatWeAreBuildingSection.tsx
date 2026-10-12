"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Layers, Sparkles } from "lucide-react";

export function WhatWeAreBuildingSection() {
  return (
    <section
      id="work-evidence-root"
      aria-label="What we are building: Honest work evidence"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="inline-block type-kicker text-[var(--action-blue)]">
            Evidence & Practice
          </span>

          {/* Truthful Fallback Headline per YCN_CONTENT_SPEC.md & CLAIMS_AND_PROOF */}
          <h2 className="type-heading-section text-[var(--text-primary)]">
            What we are building
          </h2>

          <p className="type-copy-lead text-[var(--text-secondary)]">
            We build software and websites around real business workflows. We do not invent client logos, publish concept work as completed client results, or claim unverified performance figures.
          </p>
        </div>

        {/* Editorial Presentation: Real Engineering Focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--action-blue)]/10 text-[var(--action-blue)] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">
                Customer Intake & Action
              </h3>
              <p className="type-copy-body text-xs text-[var(--text-secondary)]">
                Clear enquiry pathways, quote requests, and self-service booking flows that give customers an obvious next step without unnecessary form friction.
              </p>
            </div>
            <div className="pt-2 text-[10px] type-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
              Front-of-house interfaces
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--signal-cyan)]/10 text-[var(--signal-cyan)] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">
                Request Visibility & Routing
              </h3>
              <p className="type-copy-body text-xs text-[var(--text-secondary)]">
                Connecting incoming submissions directly to designated team members, automated acknowledgements, and traceable statuses so work stays organized.
              </p>
            </div>
            <div className="pt-2 text-[10px] type-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
              Operational coordination
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">
                Reliable Long-Term Systems
              </h3>
              <p className="type-copy-body text-xs text-[var(--text-secondary)]">
                Engineering websites and custom applications built with clean code, modern performance baselines, and clear documentation that hold up past launch day.
              </p>
            </div>
            <div className="pt-2 text-[10px] type-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
              Continuity & engineering
            </div>
          </div>
        </div>

        {/* Truthful Evidence Footer & Engineering Link */}
        <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="type-caption text-[var(--text-secondary)] max-w-xl">
            Proof on this site reflects only verified, evidence-supported deliverables in our Claims Register.
          </p>
          <Link
            href="/engineering"
            className="inline-flex items-center gap-1.5 type-control text-xs font-semibold text-[var(--action-blue)] hover:text-[var(--action-blue-hover)] transition-colors shrink-0 group"
          >
            <span>Read our engineering standards</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
