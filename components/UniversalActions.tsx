"use client";

import React, { useState, useEffect } from "react";
import {
  Compass,
  MessageSquareQuote,
  CalendarCheck,
  ShoppingBag,
  Calculator,
  Users,
  Check,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export interface ActionDetail {
  id: string;
  icon: React.ElementType;
  label: string;
  shortDesc: string;
  customerExperience: string;
  businessOutcome: string;
  previewTitle: string;
  previewPoints: string[];
  mockupBadge: string;
}

export const UNIVERSAL_ACTIONS: ActionDetail[] = [
  {
    id: "find",
    icon: Compass,
    label: "Help customers find me",
    shortDesc: "Show what you offer and how to reach you.",
    customerExperience:
      "A clear website that explains who you are, where you are, and what you offer.",
    businessOutcome:
      "Gives customers a clearer way to find and understand your business online.",
    previewTitle: "Clear Presence & Offer Directory",
    previewPoints: [
      "Designed for clear use on phones",
      "Clear service or product information",
      "Location, contact and click-to-call options",
    ],
    mockupBadge: "Websites",
  },
  {
    id: "ask",
    icon: MessageSquareQuote,
    label: "Let customers ask",
    shortDesc: "Give questions a clear place to arrive.",
    customerExperience:
      "A clear enquiry form that lets customers ask without creating an account.",
    businessOutcome:
      "Keeps incoming questions in one organised place for your team to follow up.",
    previewTitle: "Structured Enquiry Routing",
    previewPoints: [
      "Guided enquiry fields",
      "Email notification for a new enquiry",
      "Acknowledgement email confirming the enquiry was received",
    ],
    mockupBadge: "Enquiries",
  },
  {
    id: "time",
    icon: CalendarCheck,
    label: "Let them choose a time",
    shortDesc: "Show times and request a booking.",
    customerExperience:
      "Available times and a simple way to request a booking.",
    businessOutcome:
      "Reduces back-and-forth when arranging appointments.",
    previewTitle: "Self-Serve Appointment Booking",
    previewPoints: [
      "Calendar connection options",
      "Reminder options",
      "Booking buffers and operating hours",
    ],
    mockupBadge: "Bookings",
  },
  {
    id: "buy",
    icon: ShoppingBag,
    label: "Take orders online",
    shortDesc: "Show items and keep order details together.",
    customerExperience:
      "A straightforward way for customers to choose items and place an order.",
    businessOutcome:
      "Lets customers send an order without needing a phone call.",
    previewTitle: "Direct Checkout & Order Capture",
    previewPoints: [
      "Clear product or order details",
      "Order confirmation for customer and business",
      "Inventory or capacity options where needed",
    ],
    mockupBadge: "Orders",
  },
  {
    id: "price",
    icon: Calculator,
    label: "Let them ask for a price",
    shortDesc: "Collect the details needed for a quote.",
    customerExperience:
      "A quote form that gathers the details needed for an estimate.",
    businessOutcome:
      "Gives your team useful information before a follow-up call.",
    previewTitle: "Interactive Estimator & Quote Request",
    previewPoints: [
      "Package, size or feature choices",
      "Price guidance or formal quote request",
      "Project details kept together for your team",
    ],
    mockupBadge: "Estimates",
  },
  {
    id: "team",
    icon: Users,
    label: "Keep my team organised",
    shortDesc: "Give each task a person and next step.",
    customerExperience:
      "Customer status and notes can be kept in one place for the team.",
    businessOutcome:
      "Gives the team one place to track enquiries, active work, notes and handoffs.",
    previewTitle: "Unified Operations Dashboard",
    previewPoints: [
      "Enquiry status such as New, In Progress and Complete",
      "Shared internal notes",
      "Records that can be exported when needed",
    ],
    mockupBadge: "Business Systems",
  },
];

export function UniversalActions() {
  const [selectedId, setSelectedId] = useState<string>(UNIVERSAL_ACTIONS[0].id);

  // Listen for external filter events from the Hero search field
  useEffect(() => {
    const handleSelectAction = (e: CustomEvent<string>) => {
      const match = UNIVERSAL_ACTIONS.find((a) => a.id === e.detail);
      if (match) setSelectedId(match.id);
    };
    window.addEventListener("ycn-select-action" as any, handleSelectAction);
    return () => window.removeEventListener("ycn-select-action" as any, handleSelectAction);
  }, []);

  const selectedAction = UNIVERSAL_ACTIONS.find((a) => a.id === selectedId) || UNIVERSAL_ACTIONS[0];

  return (
    <section id="actions-section" className="py-16 md:py-24 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--action-blue)] mb-2">
            Ways we can help
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            What would you like to make easier?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)]">
            Every business begins with one or two key moments where customers interact. Pick the action you want to streamline:
          </p>
        </div>

        {/* Interactive Grid & Action Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Action Choice Pills / Buttons */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-2.5">
            {UNIVERSAL_ACTIONS.map((action) => {
              const Icon = action.icon;
              const isSelected = action.id === selectedAction.id;

              return (
                <button
                  key={action.id}
                  onClick={() => setSelectedId(action.id)}
                  className={`text-left p-4 rounded-xl border transition-all flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                    isSelected
                      ? "border-[var(--action-blue)] bg-sky-50/60 dark:bg-sky-950/30 shadow-xs"
                      : "border-[var(--border-subtle)] bg-slate-50/50 dark:bg-[#141C2B]/50 hover:bg-slate-100/80 dark:hover:bg-[#1A2438]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[var(--action-blue)] text-[var(--text-on-action)]"
                        : "bg-[var(--bg-canvas)] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[var(--border-subtle)]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <span
                      className={`text-sm font-semibold block transition-colors ${
                        isSelected
                          ? "text-[var(--action-blue)]"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {action.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      {action.shortDesc}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform shrink-0 ${
                      isSelected
                        ? "text-[var(--action-blue)] translate-x-1"
                        : "text-slate-400 opacity-40"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Action Screen Preview Card */}
          <div className="lg:col-span-7">
            <div
              key={selectedAction.id}
              className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xs space-y-6 transition-all duration-300 animate-in fade-in"
            >
              {/* Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--action-blue)]/10 dark:bg-[var(--action-blue)]/20 text-[var(--action-blue)] mb-1.5">
                    {selectedAction.mockupBadge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    {selectedAction.previewTitle}
                  </h3>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--action-blue)] hover:underline"
                >
                  Build this for your business →
                </Link>
              </div>

              {/* Customer vs Business Dual Narrative */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    What your customer sees
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {selectedAction.customerExperience}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    What happens for your business
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {selectedAction.businessOutcome}
                  </p>
                </div>
              </div>

              {/* Technical Features & Outcomes */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Examples we can build
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedAction.previewPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visible Product-Building Path & Undecided-Visitor Fallback */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Want to build a product?
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                If you have an idea for an app or software product, see what YCN can build.
              </p>
            </div>
            <div className="mt-4">
              <Link
                href="/what-we-build"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--action-blue)] hover:underline"
              >
                See what YCN can build →
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Not sure what you need? Tell us what is happening in your business today.
              </p>
            </div>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--action-blue)] hover:underline"
              >
                Start a conversation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
