"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

interface ExpandableValue {
  id: string;
  title: string;
  summary: string;
  expandedDetail: string;
}

const VALUES: ExpandableValue[] = [
  {
    id: "fast",
    title: "Fast",
    summary: "Pages that load without delay.",
    expandedDetail:
      "Built with modern Next.js server components, minimal JavaScript bundles, and optimized images so customers on mobile never leave because of a slow-loading screen.",
  },
  {
    id: "usable",
    title: "Usable by more people",
    summary: "Readable contrast and accessible controls.",
    expandedDetail:
      "Tested for screen readers, keyboard focus navigation, high-contrast text ratios (≥ 4.5:1), and responsive layouts that work naturally on screens as narrow as 360px.",
  },
  {
    id: "track",
    title: "Keep track of customer requests",
    summary: "Every enquiry lands in one reliable record.",
    expandedDetail:
      "Customer messages and booking requests are immediately persisted in a secure database and routed to your email or WhatsApp. No lost scraps of paper or overlooked messages.",
  },
  {
    id: "care",
    title: "Care with your information",
    summary: "Data safety and honest engineering standards.",
    expandedDetail:
      "Strict input sanitization, automated rate limiting to stop spam bots, encrypted database connections, and zero sale of customer data.",
  },
];

export function HowWeWork() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const steps = [
    {
      num: "01",
      title: "Understand",
      detail: "We listen to your current process, customer journeys, and what is taking too much time.",
    },
    {
      num: "02",
      title: "Design",
      detail: "A clear prototype showing exactly what customers see and what lands in your inbox.",
    },
    {
      num: "03",
      title: "Build",
      detail: "Clean, performant software created with modern standards, thoroughly documented.",
    },
    {
      num: "04",
      title: "Test",
      detail: "Tested across real mobile devices, slow connections, keyboard navigation, and form error states.",
    },
    {
      num: "05",
      title: "Launch & Support",
      detail: "We hand it over, show you how to run it, and provide ongoing help agreed as part of the project.",
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D111A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0470B4] dark:text-[#38BDF8] mb-2">
            Working Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            How we work
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A 5-step collaborative process focused on clarity, honest engineering, and software you own:
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141C2B] space-y-2"
            >
              <span className="text-xs font-bold text-[#0470B4] dark:text-[#38BDF8]">
                {step.num}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Four Expandable Value Lines */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Our Core Engineering Commitments
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Click any commitment to see how we deliver it in practice:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUES.map((val) => {
              const isExpanded = expandedId === val.id;

              return (
                <div
                  key={val.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141C2B] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleExpand(val.id)}
                    aria-expanded={isExpanded}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-100 dark:hover:bg-[#1A2438] transition-colors"
                  >
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{val.title}</span>
                        <span className="text-xs font-normal text-slate-400">· {val.summary}</span>
                      </h4>
                    </div>
                    <div className="text-slate-400 shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#0470B4]" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-[#0D111A]/60">
                      {val.expandedDetail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-right">
            <Link
              href="/how-we-work#for-technical-readers"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0470B4] dark:text-[#38BDF8] hover:underline"
            >
              Detailed breakdown for technical readers
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
