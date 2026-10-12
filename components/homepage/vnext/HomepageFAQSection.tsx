"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: "I am not technical. Can I still start?",
    answer:
      "Yes. Start with the problem in your business. We work out what kind of website, tool, or software makes sense after we understand what happens today.",
  },
  {
    question: "Do I need to know whether I need a website, an app, or a system?",
    answer:
      "No. Most business owners know what is slow, lost, or painful in their day-to-day work. Deciding the right format is our job.",
  },
  {
    question: "Can YCN work with the tools and systems we already use?",
    answer:
      "Yes. We look at what is already working first. We keep, connect, or replace only what makes business sense.",
  },
  {
    question: "I already have a website or software. Can you improve it?",
    answer:
      "Yes, if improving it is sensible and cost-effective. If rebuilding from scratch would save you money and headaches in the long run, we explain exactly why before starting.",
  },
  {
    question: "How are cost and scope decided?",
    answer:
      "Scope, technical complexity, risk, and ongoing support determine price. Scope and pricing are agreed before work begins. Changes are discussed before they affect cost.",
  },
  {
    question: "Who owns the finished work?",
    answer:
      "Ownership and licensing terms are clearly specified in our written agreement before any work begins. You will always know exactly what code and assets belong to you.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Post-launch support depends on the agreed scope. We make the support arrangement clear before launch.",
  },
  {
    question: "What information should I bring to our first conversation?",
    answer:
      "Just an honest description of what your business does, where friction or lost work happens today, and what you would like to work better.",
  },
];

export function HomepageFAQSection() {
  // Only one item open at a time; null if none open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number, e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq-root"
      aria-label="Frequently Asked Questions"
      className="relative bg-[var(--bg-canvas)] text-[var(--text-primary)] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-4xl mx-auto space-y-12 select-text">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="inline-block type-kicker text-[var(--action-blue)]">
            Practical Questions
          </span>
          <h2 className="type-heading-section text-[var(--text-primary)]">
            Frequently asked questions.
          </h2>
          <p className="type-copy-lead text-[var(--text-secondary)]">
            Straightforward answers about our collaboration, process, and ownership.
          </p>
        </div>

        {/* Semantic Details & Summary Accordion */}
        <div className="space-y-3">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <details
                key={faq.question}
                open={isOpen}
                className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-colors overflow-hidden"
              >
                <summary
                  onClick={(e) => handleToggle(idx, e)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer text-left list-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] transition-colors hover:bg-[var(--bg-surface-elevated)]"
                  aria-expanded={isOpen}
                >
                  <span className="type-heading-card text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                    {faq.question}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-transform"
                    aria-hidden="true"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[var(--action-blue)]" : ""
                      }`}
                    />
                  </div>
                </summary>

                {/* Answer Content */}
                <div className="px-5 sm:px-6 pb-6 pt-1 type-copy-body text-sm text-[var(--text-secondary)] border-t border-[var(--border-subtle)]/50 mt-1">
                  <p>{faq.answer}</p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
