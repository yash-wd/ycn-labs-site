"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How much does a project cost?",
    answer:
      "The price depends on what you need. We explain the work and cost before you decide.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We hand it over and show you how to use it. Ongoing help is agreed as part of the project.",
  },
  {
    question: "Can you work with WhatsApp, spreadsheets or how we do things now?",
    answer:
      "Yes. We design around your existing workflow—whether that's spreadsheets, WhatsApp messages, or manual steps—and connect what you already use.",
  },
  {
    question: "Who owns the website or software?",
    answer:
      "Your proposal explains what you receive, including the code and account access.",
  },
  {
    question: "Do I need a technical brief to start?",
    answer:
      "No. You don’t need a technical brief to start. Just tell us what you do and what you'd like to make easier, and we will propose a practical solution.",
  },
];

export function BuyerFAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-subtle)] bg-slate-50 dark:bg-[#0A0E17]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--action-blue)] mb-2">
            Common Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            Straightforward answers about pricing, ownership, and how we collaborate:
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 mb-16">
          {FAQS.map((faq, index) => {
            const isOpen = openIndices.includes(index);

            return (
              <div
                key={index}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] dark:bg-[var(--bg-surface)] overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-[#1A2438] transition-colors"
                >
                  <span className="text-base font-bold text-[var(--text-primary)]">
                    {faq.question}
                  </span>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[var(--action-blue)]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Clear Invitation to Contact */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-r from-sky-50/80 to-white dark:from-[var(--bg-surface)] dark:to-[var(--bg-canvas)] p-8 sm:p-10 text-center shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
            Ready to talk about your project?
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto mb-6">
            Tell us what you'd like to make easier. We'll reply with a clear assessment of how we can help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[var(--action-blue)] hover:bg-[var(--action-blue-hover)] text-[var(--text-on-action)] font-semibold text-sm shadow-sm transition-colors"
          >
            Tell us what you need
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
