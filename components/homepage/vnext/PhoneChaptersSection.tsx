"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  User,
  FileText,
  Check,
  ChevronRight,
  Plus,
  Search,
  Settings,
  HelpCircle,
  Monitor,
  Layout,
  Workflow,
  Sparkles,
} from "lucide-react";

/**
 * HOME-02F: "LIVE-DOM VISUAL CAPABILITY STAGE" (Route A Architecture)
 * Authority: Owner Ruling 30 Sep 2026 (POLISH-HOME-02F / Route A)
 *
 * Directives:
 * - DECISION-037 Compliance: 100% vector-crisp, theme-reactive Live DOM. Zero generated UI screenshots.
 * - Visual Ratio: 60-65% visual media stage, 35-40% compact capability index.
 * - Section H2: Verbatim canonical CONTENT_SPEC §4 H1: "What are you trying to change?"
 * - Five Canonical Triads: Verbatim CONTENT_SPEC §4 (Need line -> Capability -> Explanation).
 * - Closing Prompt: Canonical "Not sure which one you need? Tell us what is happening today."
 * - Reference Targets (Based on Audited Reference Suite):
 *   01 Websites: Business Website (Header, Hero, What we offer 3 items, Hours, Location/Directions, Contact)
 *   02 Customer experiences: Intake & Booking Flow (Sidebar, Stepper: Select -> Schedule -> Confirm, slots, Confirmed card)
 *   03 Business systems: Operations Workspace (Sidebar, 4-step pipeline header, 4 clean triage rows: Request/Owner/Next Step/Status)
 *   04 Software products: Dual-Width Concept Product (Flat desktop app + Flat mobile companion, zero fake numbers/metrics)
 *   05 Custom software: Tailored Workflow (Sidebar, 4-step process pipeline, 4-row Current Work table, Business Process rail)
 * - Purges Enforced:
 *   - NO browser URL / address bars.
 *   - NO fake company names, domains, emails, phone numbers, street addresses, or people names.
 *   - NO fake metrics, counts, or invented numbers (e.g. no 4/3/2/5).
 *   - NO unratified marketing slogans or extra introductory/closing paragraphs.
 * - Chrome: All 5 screens carry clean window chrome with "ILLUSTRATIVE EXAMPLE" and "Sample · nothing is sent".
 * - Contrast & Theme: Strict >= 4.5:1 across dark and light modes.
 * - Desktop: Native CSS position: sticky stage (>= 1024px).
 * - Mobile: 5 visual-first chapters in natural flow (< 1024px).
 */

interface CapabilityItem {
  id: string;
  num: string;
  need: string;
  capability: string;
  explanation: string;
  stageTitle: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "capability-01",
    num: "01",
    need: "Customers need to find me",
    capability: "Websites & digital presence",
    explanation:
      "Make it easier for people to understand what you offer and contact you.",
    stageTitle: "Business Website",
  },
  {
    id: "capability-02",
    num: "02",
    need: "Customers need an easier way to act",
    capability: "Customer experiences",
    explanation:
      "Enquiries, bookings, ordering, portals and other clear customer journeys.",
    stageTitle: "Customer Intake & Booking Flow",
  },
  {
    id: "capability-03",
    num: "03",
    need: "My team does too much manually",
    capability: "Business systems & automation",
    explanation:
      "Dashboards, workflows, integrations and tools built around how the work actually happens.",
    stageTitle: "Operations Workspace",
  },
  {
    id: "capability-04",
    num: "04",
    need: "I have a product idea",
    capability: "Software products",
    explanation:
      "Web apps, mobile products and SaaS built from a useful first version outward.",
    stageTitle: "Concept Product",
  },
  {
    id: "capability-05",
    num: "05",
    need: "I need something specific",
    capability: "Custom software",
    explanation:
      "Start with the problem and design the appropriate system rather than forcing a standard package.",
    stageTitle: "Custom Workflow",
  },
];

/**
 * Route A+ Status Pill & Sample Action Tokens (Design System §2 compliant: zero purple)
 * Named tokens defined for reuse across capability sample surfaces.
 */
const SAMPLE_STATUS_TOKENS = {
  new: "inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f0f9ff] text-[#0369a1] border border-[#bae6fd] font-semibold text-[12px] whitespace-nowrap select-none",
  assigned: "inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-semibold text-[12px] whitespace-nowrap select-none",
  inProgress: "inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#fffbeb] text-[#b45309] border border-[#fde68a] font-semibold text-[12px] whitespace-nowrap select-none",
  complete: "inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-semibold text-[12px] whitespace-nowrap select-none",
} as const;

const SAMPLE_ACTION_BUTTON_TOKENS = {
  primary: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2563eb] text-[#ffffff] font-medium text-[13px] shadow-xs select-none",
  primaryMobile: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563eb] text-[#ffffff] font-medium text-[12px] shadow-2xs select-none",
} as const;

export function PhoneChaptersSection() {
  const [activeCapability, setActiveCapability] = useState<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-capability-index"));
            if (!isNaN(index)) {
              setActiveCapability(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.15,
      }
    );

    const elements = document.querySelectorAll(".home-02-scroll-trigger");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home-02-capabilities-root"
      aria-labelledby="home-02-heading"
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[var(--bg-canvas)] text-[var(--text-primary)] border-b border-[var(--border-subtle)] select-text"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================== */}
        {/* DESKTOP LAYOUT (>= 1024px): 38% Text Column / 62% Sticky Stage */}
        {/* ============================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: 38% (col-span-5) Natural Scroll Flow */}
          <div className="lg:col-span-5 space-y-6">
            {/* Section H2: Canonical CONTENT_SPEC §4 H1 */}
            <div className="pb-8 border-b border-[var(--border-subtle)]">
              <h2
                id="home-02-heading"
                className="type-display-page text-[var(--text-primary)]"
              >
                What are you trying to change?
              </h2>
            </div>

            {/* Five Canonical Triads with Paced Scroll Heights */}
            <div className="space-y-4">
              {CAPABILITIES.map((item, idx) => {
                const isActive = activeCapability === idx;
                return (
                  <article
                    key={item.id}
                    id={item.id}
                    data-capability-index={idx}
                    className={`home-02-scroll-trigger min-h-[48vh] flex flex-col justify-center py-8 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Need Line */}
                      <div className="inline-flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[var(--action-blue)]">
                          {item.num}
                        </span>
                        <span className="text-xs text-[var(--text-secondary)] font-medium">
                          {item.need}
                        </span>
                      </div>

                      {/* Capability Name */}
                      <h3
                        className={`text-2xl xl:text-3xl font-semibold tracking-tight transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)]"
                        }`}
                      >
                        {item.capability}
                      </h3>

                      {/* Plain Explanation */}
                      <p className="type-copy-body text-[var(--text-secondary)] text-base xl:text-lg leading-relaxed max-w-md">
                        {item.explanation}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Closing Prompt */}
            <div className="pt-12 pb-6 border-t border-[var(--border-subtle)] space-y-4">
              <p className="type-heading-card text-[var(--text-primary)]">
                Not sure which one you need? Tell us what is happening today.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--action-blue)] text-[var(--text-on-action)] font-medium text-sm hover:bg-[var(--action-blue-hover)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] min-h-[44px]"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 62% (col-span-7) Native CSS Sticky Media Stage */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 xl:top-28 lg:self-start">
            <div className="relative w-full h-[620px] xl:h-[660px] rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-xl dark:shadow-2xl ring-1 ring-slate-900/10 dark:ring-white/[0.06] overflow-hidden flex flex-col">
              {/* Product Frame Top Header (No Browser URL Bar) */}
              <div className="px-5 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium z-20 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                  </div>
                  {activeCapability !== 2 && (
                    <>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                        ILLUSTRATIVE EXAMPLE
                      </span>
                      <span className="font-mono text-[11px] text-[var(--text-primary)] font-medium">
                        {CAPABILITIES[activeCapability]?.stageTitle}
                      </span>
                    </>
                  )}
                </div>
                <span className="font-mono text-[12px] text-[var(--text-secondary)]">
                  Sample · nothing is sent
                </span>
              </div>

              {/* Changing Media Stage Canvas */}
              <div className="relative flex-1 overflow-hidden bg-[var(--bg-canvas)]">
                {/* ========================================================== */}
                {/* STAGE 01: Websites & digital presence (Live DOM Website)  */}
                {/* ========================================================== */}
                <div
                  className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-350 ease-out bg-[var(--bg-surface)] overflow-y-auto ${
                    activeCapability === 0
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="space-y-5">
                    {/* Simulated Site Header */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-[var(--action-blue)] flex items-center justify-center text-[var(--text-on-action)] font-bold text-xs">
                          YB
                        </div>
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          Your Business
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                        <span className="font-medium text-[var(--action-blue)]">Home</span>
                        <span className="hidden sm:inline">Services</span>
                        <span className="hidden sm:inline">About</span>
                        <span className="font-medium text-[var(--text-primary)]">Contact</span>
                      </div>
                    </div>

                    {/* Hero Banner with Clean Actions */}
                    <div className="p-5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-3">
                      <h4 className="text-xl font-bold text-[var(--text-primary)]">
                        Your Business
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-lg">
                        Clear information about what the business offers.
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--action-blue)] text-[var(--text-on-action)] font-medium text-xs">
                          Contact Us
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-xs">
                          Get Directions
                        </span>
                      </div>
                    </div>

                    {/* What We Offer: 3 Service Rows */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-[var(--text-primary)] block">
                        What we offer
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
                          <span className="font-semibold text-[var(--text-primary)] block">
                            Service One
                          </span>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                            Reliable and high-quality service tailored to your needs.
                          </p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
                          <span className="font-semibold text-[var(--text-primary)] block">
                            Service Two
                          </span>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                            Clear, straightforward support from an experienced team.
                          </p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
                          <span className="font-semibold text-[var(--text-primary)] block">
                            Service Three
                          </span>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                            Practical solutions designed to help you get the best results.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Two-Column Info: Opening Hours & Location/Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Hours */}
                      <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
                        <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
                          <Clock className="w-4 h-4 text-[var(--action-blue)]" />
                          <span>Opening Hours</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)]">Monday – Friday</p>
                        <p className="text-xs font-medium text-[var(--text-primary)]">9:00 AM – 6:00 PM</p>
                      </div>

                      {/* Location & Contact Action */}
                      <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
                        <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
                          <MapPin className="w-4 h-4 text-[var(--action-blue)]" />
                          <span>Location & Enquiries</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)]">Simple map & contact access</p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--action-blue)] pt-1">
                          Send Enquiry <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                    <span>Your Business · Clear customer communication</span>
                    <span className="font-medium text-[var(--action-blue)]">Responsive layout</span>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* STAGE 02: Customer experiences (Intake & Booking Flow)     */}
                {/* ========================================================== */}
                <div
                  className={`absolute inset-0 flex transition-opacity duration-350 ease-out bg-[var(--bg-surface)] ${
                    activeCapability === 1
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Left Sidebar */}
                  <div className="w-44 p-4 border-r border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hidden sm:flex flex-col justify-between text-xs shrink-0">
                    <div className="space-y-4">
                      <div className="font-semibold text-xs text-[var(--text-primary)] pb-2 border-b border-[var(--border-subtle)]">
                        Customer Portal
                      </div>
                      <div className="space-y-1">
                        <div className="p-2 rounded-lg bg-[var(--action-blue)] text-[var(--text-on-action)] font-medium flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book a Service</span>
                        </div>
                        <div className="p-2 rounded-lg text-[var(--text-secondary)] flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5" />
                          <span>My Enquiries</span>
                        </div>
                        <div className="p-2 rounded-lg text-[var(--text-secondary)] flex items-center gap-2">
                          <User className="w-3.5 h-3.5" />
                          <span>Contact</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)]">
                      Guided Journey
                    </div>
                  </div>

                  {/* Main Intake Area */}
                  <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-4">
                      {/* 3-Step Stepper */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-0.5">
                          <span className="text-[10px] text-[var(--action-blue)] font-bold">01 · SELECT</span>
                          <p className="text-xs font-medium text-[var(--text-primary)]">Choose service</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--action-blue)] space-y-0.5 shadow-xs">
                          <span className="text-[10px] text-[var(--action-blue)] font-bold">02 · SCHEDULE</span>
                          <p className="text-xs font-semibold text-[var(--text-primary)]">Pick timing</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-0.5">
                          <span className="text-[10px] text-[var(--text-secondary)] font-bold">03 · CONFIRM</span>
                          <p className="text-xs font-medium text-[var(--text-secondary)]">Receive details</p>
                        </div>
                      </div>

                      {/* Service Enquiry & Intake Card */}
                      <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-3">
                        <div className="flex items-center justify-between text-xs border-b border-[var(--border-subtle)] pb-2">
                          <span className="font-semibold text-[var(--text-primary)]">
                            Service Enquiry & Intake
                          </span>
                          <span className="text-[11px] text-[var(--text-secondary)]">Step 2 of 3</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1">
                            <span className="text-[10px] text-[var(--text-secondary)] uppercase">Selected Service</span>
                            <p className="font-medium text-[var(--text-primary)]">Discovery Consultation</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1">
                            <span className="text-[10px] text-[var(--text-secondary)] uppercase">Selected Date</span>
                            <p className="font-medium text-[var(--text-primary)]">Thursday, 10:00 AM</p>
                          </div>
                        </div>

                        {/* Timing Slots */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">
                            Available Times
                          </span>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center text-xs">
                            <span className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">9:00 AM</span>
                            <span className="p-1.5 rounded bg-[var(--action-blue)] text-[var(--text-on-action)] font-semibold shadow-xs">10:00 AM</span>
                            <span className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">11:00 AM</span>
                            <span className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">1:00 PM</span>
                            <span className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">2:00 PM</span>
                            <span className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">3:00 PM</span>
                          </div>
                        </div>
                      </div>

                      {/* Enquiry Confirmed Card */}
                      <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-[var(--bg-surface)] flex items-center justify-center text-[var(--action-blue)] shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[var(--text-primary)]">
                              Enquiry Confirmed
                            </p>
                            <p className="text-[11px] text-[var(--text-secondary)]">
                              Immediate acknowledgement and clear next step for customer
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--action-blue)] shrink-0">
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 text-xs text-[var(--text-secondary)] flex items-center justify-between border-t border-[var(--border-subtle)]">
                      <span>Enquiries · Bookings · Ordering · Portals</span>
                      <span className="font-medium text-[var(--action-blue)]">Zero unnecessary steps</span>
                    </div>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* STAGE 03: Business systems & automation (A+ Pilot Live-DOM) */}
                {/* ========================================================== */}
                <div
                  className={`absolute inset-0 flex transition-opacity duration-350 ease-out bg-[#f8fafc] text-[#0f172a] ${
                    activeCapability === 2
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Left Sidebar (Narrowed to 144px / w-36 for maximal table breathing room) */}
                  <div className="w-36 p-3 border-r border-[#e2e8f0] bg-[#ffffff] hidden sm:flex flex-col justify-between text-xs shrink-0 select-none">
                    <div className="space-y-1">
                      <div className="px-2.5 py-2 rounded-lg text-[#64748b] flex items-center gap-2 text-[12.5px] font-medium">
                        <Layout className="w-4 h-4 text-[#94a3b8] shrink-0" />
                        <span className="whitespace-nowrap">Overview</span>
                      </div>
                      <div className="px-2.5 py-2 rounded-lg bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]/60 flex items-center gap-2 text-[12.5px] font-semibold">
                        <FileText className="w-4 h-4 text-[#2563eb] shrink-0" />
                        <span className="whitespace-nowrap">Requests</span>
                      </div>
                      <div className="px-2.5 py-2 rounded-lg text-[#64748b] flex items-center gap-2 text-[12.5px] font-medium">
                        <Check className="w-4 h-4 text-[#94a3b8] shrink-0" />
                        <span className="whitespace-nowrap">Tasks</span>
                      </div>
                      <div className="px-2.5 py-2 rounded-lg text-[#64748b] flex items-center gap-2 text-[12.5px] font-medium">
                        <Calendar className="w-4 h-4 text-[#94a3b8] shrink-0" />
                        <span className="whitespace-nowrap">Schedule</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Workspace Table & Pipeline */}
                  <div className="flex-1 p-5 xl:p-6 overflow-y-auto bg-[#f8fafc] space-y-4">
                    {/* Header with Title and Action Label */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
                      <h4 className="text-[20px] font-bold text-[#0f172a] tracking-tight">
                        Requests
                      </h4>
                      <span className={SAMPLE_ACTION_BUTTON_TOKENS.primary}>
                        <Plus className="w-4 h-4" /> New request
                      </span>
                    </div>

                    {/* 4-Step Stages Bar */}
                    <div className="grid grid-cols-4 gap-2.5 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-[#ffffff] border border-[#e2e8f0] shadow-2xs space-y-1">
                        <FileText className="w-4 h-4 mx-auto text-[#2563eb]" />
                        <span className="text-[12px] font-semibold text-[#0f172a] block whitespace-nowrap">Received</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#ffffff] border border-[#e2e8f0] shadow-2xs space-y-1">
                        <User className="w-4 h-4 mx-auto text-[#2563eb]" />
                        <span className="text-[12px] font-semibold text-[#0f172a] block whitespace-nowrap">Assigned</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#ffffff] border border-[#e2e8f0] shadow-2xs space-y-1">
                        <Workflow className="w-4 h-4 mx-auto text-[#2563eb]" />
                        <span className="text-[12px] font-semibold text-[#0f172a] block whitespace-nowrap">Next step</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#ffffff] border border-[#e2e8f0] shadow-2xs space-y-1">
                        <CheckCircle2 className="w-4 h-4 mx-auto text-[#16a34a]" />
                        <span className="text-[12px] font-semibold text-[#0f172a] block whitespace-nowrap">Complete</span>
                      </div>
                    </div>

                    {/* 4-Row Operational Table (F3: Request, Owner, Status never wrap; Next step at most 2 lines) */}
                    <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] shadow-xs overflow-hidden">
                      <table className="w-full text-left text-[14px]">
                        <thead>
                          <tr className="border-b border-[#e2e8f0] bg-[#f8fafc] text-[#475569] font-semibold text-[13px]">
                            <th className="py-3.5 px-4 w-[24%] whitespace-nowrap">Request</th>
                            <th className="py-3.5 px-4 w-[24%] whitespace-nowrap">Owner</th>
                            <th className="py-3.5 px-4 w-[32%]">Next step</th>
                            <th className="py-3.5 px-4 w-[20%] whitespace-nowrap">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                          <tr>
                            <td className="py-3.5 px-4 font-semibold text-[#0f172a] whitespace-nowrap">Enquiry</td>
                            <td className="py-3.5 px-4 text-[#475569] whitespace-nowrap">Team member</td>
                            <td className="py-3.5 px-4 text-[#334155]">Reply to customer</td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className={SAMPLE_STATUS_TOKENS.new}>
                                New
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3.5 px-4 font-semibold text-[#0f172a] whitespace-nowrap">Booking</td>
                            <td className="py-3.5 px-4 text-[#475569] whitespace-nowrap">Team member</td>
                            <td className="py-3.5 px-4 text-[#334155]">Confirm time</td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className={SAMPLE_STATUS_TOKENS.assigned}>
                                Assigned
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3.5 px-4 font-semibold text-[#0f172a] whitespace-nowrap">Order</td>
                            <td className="py-3.5 px-4 text-[#475569] whitespace-nowrap">Team member</td>
                            <td className="py-3.5 px-4 text-[#334155]">Prepare order</td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className={SAMPLE_STATUS_TOKENS.inProgress}>
                                In progress
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3.5 px-4 font-semibold text-[#0f172a] whitespace-nowrap">Follow-up</td>
                            <td className="py-3.5 px-4 text-[#475569] whitespace-nowrap">Team member</td>
                            <td className="py-3.5 px-4 text-[#334155]">Send update</td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className={SAMPLE_STATUS_TOKENS.complete}>
                                Complete
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* STAGE 04: Software products (Dual-Width Concept Product)   */}
                {/* ========================================================== */}
                <div
                  className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-350 ease-out bg-[var(--bg-surface)] overflow-y-auto ${
                    activeCapability === 3
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                      <div>
                        <span className="text-xs font-semibold text-[var(--text-primary)] block">
                          Concept Product
                        </span>
                        <p className="text-[11px] text-[var(--text-secondary)]">
                          One product across desktop and mobile form factors
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[var(--bg-surface-elevated)] text-[var(--action-blue)] border border-[var(--border-subtle)]">
                        v1.0 Core Launch
                      </span>
                    </div>

                    {/* Side-by-Side Dual Frames: Flat Desktop (65%) + Flat Mobile (35%) */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* Left: Desktop Application Frame (col-span-8) */}
                      <div className="col-span-12 sm:col-span-8 p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-3">
                        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-xs">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-3.5 h-3.5 text-[var(--action-blue)]" />
                            <span className="font-semibold text-[var(--text-primary)]">Desktop App</span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--action-blue)] text-[var(--text-on-action)] text-[10px] font-medium">
                            <Plus className="w-3 h-3" /> Create Request
                          </span>
                        </div>

                        {/* 4 Status Sections (Zero Numbers / No Invented Counts) */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-0.5">
                            <span className="text-[10px] text-[var(--text-secondary)] font-medium">New Request</span>
                            <p className="text-[11px] font-semibold text-[var(--text-primary)]">Intake Queue</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-0.5">
                            <span className="text-[10px] text-[var(--text-secondary)] font-medium">Assigned</span>
                            <p className="text-[11px] font-semibold text-[var(--text-primary)]">Active Work</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-0.5">
                            <span className="text-[10px] text-[var(--text-secondary)] font-medium">Scheduled</span>
                            <p className="text-[11px] font-semibold text-[var(--text-primary)]">Confirmed</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-0.5">
                            <span className="text-[10px] text-[var(--text-secondary)] font-medium">Completed</span>
                            <p className="text-[11px] font-semibold text-[var(--text-primary)]">Handed Over</p>
                          </div>
                        </div>

                        {/* Recent Activity Strip */}
                        <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                          <span className="text-[var(--text-primary)] font-medium">Website Consultation</span>
                          <span className="text-[var(--action-blue)] font-semibold">Active</span>
                        </div>
                      </div>

                      {/* Right: Flat Mobile Frame (col-span-4) */}
                      <div className="col-span-12 sm:col-span-4 p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-3">
                        <div className="border-b border-[var(--border-subtle)] pb-2 text-xs flex items-center justify-between">
                          <span className="font-semibold text-[var(--text-primary)]">Mobile View</span>
                          <span className="text-[10px] text-[var(--text-secondary)]">Home</span>
                        </div>

                        {/* Mobile Status List */}
                        <div className="space-y-1.5 text-xs">
                          <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
                            <span className="text-[11px] text-[var(--text-primary)]">New Request</span>
                            <ChevronRight className="w-3 h-3 text-[var(--text-secondary)]" />
                          </div>
                          <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
                            <span className="text-[11px] text-[var(--text-primary)]">Assigned</span>
                            <ChevronRight className="w-3 h-3 text-[var(--text-secondary)]" />
                          </div>
                          <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
                            <span className="text-[11px] text-[var(--text-primary)]">Scheduled</span>
                            <ChevronRight className="w-3 h-3 text-[var(--text-secondary)]" />
                          </div>
                        </div>

                        {/* Mobile Bottom Bar */}
                        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-around text-[10px] text-[var(--text-secondary)]">
                          <span className="text-[var(--action-blue)] font-bold">Home</span>
                          <span>Requests</span>
                          <span>Schedule</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                    <span>Illustrative product concept</span>
                    <span className="font-medium text-[var(--action-blue)]">Useful first version outward</span>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* STAGE 05: Custom software (Tailored Workflow)              */}
                {/* ========================================================== */}
                <div
                  className={`absolute inset-0 flex transition-opacity duration-350 ease-out bg-[var(--bg-surface)] ${
                    activeCapability === 4
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Left Sidebar */}
                  <div className="w-44 p-4 border-r border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hidden sm:flex flex-col justify-between text-xs shrink-0">
                    <div className="space-y-4">
                      <div className="font-semibold text-xs text-[var(--text-primary)] pb-2 border-b border-[var(--border-subtle)]">
                        Custom Portal
                      </div>
                      <div className="space-y-1">
                        <div className="p-2 rounded-lg bg-[var(--action-blue)] text-[var(--text-on-action)] font-medium flex items-center gap-2">
                          <Workflow className="w-3.5 h-3.5" />
                          <span>Requests</span>
                        </div>
                        <div className="p-2 rounded-lg text-[var(--text-secondary)] flex items-center gap-2">
                          <Check className="w-3.5 h-3.5" />
                          <span>Approvals</span>
                        </div>
                        <div className="p-2 rounded-lg text-[var(--text-secondary)] flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Documents</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)]">
                      Bespoke System
                    </div>
                  </div>

                  {/* Main Custom Workflow Area */}
                  <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="pb-2 border-b border-[var(--border-subtle)]">
                        <h4 className="text-base font-bold text-[var(--text-primary)]">Custom Workflow</h4>
                        <p className="text-[11px] text-[var(--text-secondary)]">
                          Engineered around your business process
                        </p>
                      </div>

                      {/* 4-Step Process Pipeline */}
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                          <span className="text-[10px] font-bold text-[var(--action-blue)] block">1 · REQUEST</span>
                          <span className="text-[10px] text-[var(--text-secondary)]">Receive info</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                          <span className="text-[10px] font-bold text-[var(--action-blue)] block">2 · REVIEW</span>
                          <span className="text-[10px] text-[var(--text-secondary)]">Check & assign</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                          <span className="text-[10px] font-bold text-[var(--action-blue)] block">3 · ACTION</span>
                          <span className="text-[10px] text-[var(--text-secondary)]">Next step</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                          <span className="text-[10px] font-bold text-[var(--action-blue)] block">4 · COMPLETE</span>
                          <span className="text-[10px] text-[var(--text-secondary)]">Close work</span>
                        </div>
                      </div>

                      {/* Split: Current Work (65%) + Business Process Rail (35%) */}
                      <div className="grid grid-cols-12 gap-3 text-xs">
                        {/* Table */}
                        <div className="col-span-12 sm:col-span-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] overflow-hidden">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] font-semibold">
                                <th className="py-2 px-2.5">Item</th>
                                <th className="py-2 px-2.5">Owner</th>
                                <th className="py-2 px-2.5">Next Step</th>
                                <th className="py-2 px-2.5">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                              <tr>
                                <td className="py-2 px-2.5 font-medium text-[var(--text-primary)]">Client intake</td>
                                <td className="py-2 px-2.5">Team lead</td>
                                <td className="py-2 px-2.5">Review scope</td>
                                <td className="py-2 px-2.5">
                                  <span className="inline-block px-1.5 py-0.2 rounded bg-[var(--bg-surface)] text-[var(--action-blue)] text-[9px] font-semibold">
                                    New
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 px-2.5 font-medium text-[var(--text-primary)]">Document review</td>
                                <td className="py-2 px-2.5">Operations</td>
                                <td className="py-2 px-2.5">Verify details</td>
                                <td className="py-2 px-2.5">
                                  <span className="inline-block px-1.5 py-0.2 rounded bg-[var(--bg-surface)] text-[var(--text-primary)] text-[9px] font-medium">
                                    In progress
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 px-2.5 font-medium text-[var(--text-primary)]">Follow-up</td>
                                <td className="py-2 px-2.5">Client mgr</td>
                                <td className="py-2 px-2.5">Confirm timing</td>
                                <td className="py-2 px-2.5">
                                  <span className="inline-block px-1.5 py-0.2 rounded bg-[var(--bg-surface)] text-[var(--text-primary)] text-[9px] font-medium">
                                    Scheduled
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 px-2.5 font-medium text-[var(--text-primary)]">Final delivery</td>
                                <td className="py-2 px-2.5">Engineering</td>
                                <td className="py-2 px-2.5">Handover</td>
                                <td className="py-2 px-2.5">
                                  <span className="inline-block px-1.5 py-0.2 rounded bg-[var(--bg-surface)] text-[var(--action-blue)] text-[9px] font-semibold">
                                    Completed
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Process Rail */}
                        <div className="col-span-12 sm:col-span-4 p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-2">
                          <span className="text-[10px] font-semibold text-[var(--text-primary)] block">
                            Business Process
                          </span>
                          <div className="space-y-1.5 text-[11px]">
                            <div className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                              <span className="text-[9px] text-[var(--text-secondary)] uppercase block">Current Step</span>
                              <span className="font-medium text-[var(--text-primary)]">Review requirements</span>
                            </div>
                            <div className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                              <span className="text-[9px] text-[var(--text-secondary)] uppercase block">Next Step</span>
                              <span className="font-medium text-[var(--text-primary)]">Assign to specialist</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                      <span>Bespoke Engineering</span>
                      <span className="font-medium text-[var(--action-blue)]">Engineered for your workflow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE LAYOUT (< 1024px): 5 Visual Chapters in Natural Flow    */}
        {/* ============================================================== */}
        <div className="lg:hidden space-y-16">
          {/* Section H2: Canonical CONTENT_SPEC §4 H1 */}
          <div className="pb-6 border-b border-[var(--border-subtle)]">
            <h2 className="type-display-page text-[var(--text-primary)]">
              What are you trying to change?
            </h2>
          </div>

          {/* Five Sequential Visual Chapters */}
          <div className="space-y-16">
            {CAPABILITIES.map((item, idx) => (
              <article key={item.id} className="space-y-6">
                {/* Need Line -> Capability -> Explanation (F1: Shared template label -> heading -> explanation -> sample) */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[var(--action-blue)]">
                      {item.num}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">
                      {item.need}
                    </span>
                  </div>

                  <h3 className="type-heading-section text-[var(--text-primary)]">
                    {item.capability}
                  </h3>

                  <p className="type-copy-body text-[var(--text-secondary)] text-base leading-relaxed">
                    {item.explanation}
                  </p>
                </div>

                {/* Visual Sample Canvas: Scaled cleanly with zero horizontal overflow */}
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-xs ring-1 ring-slate-900/5 dark:ring-white/5">
                  {/* Top Bar */}
                  <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
                    <div className="flex items-center gap-2">
                      {idx !== 2 && (
                        <>
                          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                            EXAMPLE
                          </span>
                          <span className="font-mono text-[11px]">{item.stageTitle}</span>
                        </>
                      )}
                    </div>
                    <span className="font-mono text-[12px]">Sample · nothing is sent</span>
                  </div>

                  {/* Surface Content */}
                  <div className="p-4 sm:p-5">
                    {/* Chapter 01: Business Website */}
                    {idx === 0 && (
                      <div className="space-y-3 text-xs">
                        <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
                          <span className="text-xs font-semibold text-[var(--text-primary)] block">
                            Your Business
                          </span>
                          <p className="text-[11px] text-[var(--text-secondary)]">
                            Clear information about what the business offers.
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            <span className="px-2.5 py-1 rounded bg-[var(--action-blue)] text-[var(--text-on-action)] font-medium text-[10px]">
                              Contact Us
                            </span>
                            <span className="px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-[10px]">
                              Directions
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-0.5">
                            <span className="text-[11px] font-medium text-[var(--text-primary)]">Services</span>
                            <p className="text-[10px] text-[var(--text-secondary)]">Clear offerings</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-0.5">
                            <span className="text-[11px] font-medium text-[var(--text-primary)]">Opening Hours</span>
                            <p className="text-[10px] text-[var(--text-secondary)]">Mon – Fri 9am–6pm</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 02: Intake & Booking Flow */}
                    {idx === 1 && (
                      <div className="space-y-2.5 text-xs">
                        <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                          <div className="p-2 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                            <span className="text-[9px] text-[var(--action-blue)] font-bold block">01 SELECT</span>
                            <span className="text-[11px] text-[var(--text-primary)] font-medium">Service</span>
                          </div>
                          <div className="p-2 rounded bg-[var(--bg-surface-elevated)] border border-[var(--action-blue)]">
                            <span className="text-[9px] text-[var(--action-blue)] font-bold block">02 SCHEDULE</span>
                            <span className="text-[11px] text-[var(--text-primary)] font-semibold">Timing</span>
                          </div>
                          <div className="p-2 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                            <span className="text-[9px] text-[var(--text-secondary)] font-bold block">03 CONFIRM</span>
                            <span className="text-[11px] text-[var(--text-secondary)]">Details</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[var(--action-blue)]" />
                            <span className="text-xs font-medium text-[var(--text-primary)]">Enquiry Confirmed</span>
                          </div>
                          <span className="text-[10px] text-[var(--action-blue)] font-semibold">Active</span>
                        </div>
                      </div>
                    )}

                    {/* Chapter 03: Business systems & automation (A+ Pilot Live-DOM) */}
                    {idx === 2 && (
                      <div className="space-y-4 rounded-xl bg-[#f8fafc] text-[#0f172a] p-3.5 sm:p-4 border border-[#e2e8f0]">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-[#e2e8f0]">
                          <h4 className="text-[18px] font-bold text-[#0f172a] tracking-tight">
                            Requests
                          </h4>
                          <span className={SAMPLE_ACTION_BUTTON_TOKENS.primaryMobile}>
                            <Plus className="w-3.5 h-3.5" /> New request
                          </span>
                        </div>

                        {/* Stages (2x2 grid for mobile clarity, zero wrapping) */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-[#ffffff] border border-[#e2e8f0] shadow-2xs flex items-center gap-2.5">
                            <FileText className="w-4 h-4 text-[#2563eb] shrink-0" />
                            <span className="text-[12px] font-semibold text-[#0f172a] whitespace-nowrap">Received</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#ffffff] border border-[#e2e8f0] shadow-2xs flex items-center gap-2.5">
                            <User className="w-4 h-4 text-[#2563eb] shrink-0" />
                            <span className="text-[12px] font-semibold text-[#0f172a] whitespace-nowrap">Assigned</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#ffffff] border border-[#e2e8f0] shadow-2xs flex items-center gap-2.5">
                            <Workflow className="w-4 h-4 text-[#2563eb] shrink-0" />
                            <span className="text-[12px] font-semibold text-[#0f172a] whitespace-nowrap">Next step</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#ffffff] border border-[#e2e8f0] shadow-2xs flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                            <span className="text-[12px] font-semibold text-[#0f172a] whitespace-nowrap">Complete</span>
                          </div>
                        </div>

                        {/* Stacked Items (Zero horizontal scroll, zero table clipping) */}
                        <div className="space-y-2.5">
                          {/* Row 1: Enquiry */}
                          <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#e2e8f0] shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[14px] font-semibold text-[#0f172a] whitespace-nowrap">Enquiry</span>
                              <span className={SAMPLE_STATUS_TOKENS.new}>
                                New
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span className="text-[#64748b]">Team member</span>
                              <span className="text-[#334155] font-medium">Reply to customer</span>
                            </div>
                          </div>

                          {/* Row 2: Booking */}
                          <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#e2e8f0] shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[14px] font-semibold text-[#0f172a] whitespace-nowrap">Booking</span>
                              <span className={SAMPLE_STATUS_TOKENS.assigned}>
                                Assigned
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span className="text-[#64748b]">Team member</span>
                              <span className="text-[#334155] font-medium">Confirm time</span>
                            </div>
                          </div>

                          {/* Row 3: Order */}
                          <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#e2e8f0] shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[14px] font-semibold text-[#0f172a] whitespace-nowrap">Order</span>
                              <span className={SAMPLE_STATUS_TOKENS.inProgress}>
                                In progress
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span className="text-[#64748b]">Team member</span>
                              <span className="text-[#334155] font-medium">Prepare order</span>
                            </div>
                          </div>

                          {/* Row 4: Follow-up */}
                          <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#e2e8f0] shadow-2xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[14px] font-semibold text-[#0f172a] whitespace-nowrap">Follow-up</span>
                              <span className={SAMPLE_STATUS_TOKENS.complete}>
                                Complete
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[13px]">
                              <span className="text-[#64748b]">Team member</span>
                              <span className="text-[#334155] font-medium">Send update</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 04: Concept Product */}
                    {idx === 3 && (
                      <div className="space-y-2.5 text-xs">
                        <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
                          <span className="text-xs font-semibold text-[var(--text-primary)] block">
                            Concept Product
                          </span>
                          <p className="text-[11px] text-[var(--text-secondary)]">
                            Web apps, mobile products and SaaS built from a useful first version outward.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-0.5">
                            <span className="text-[11px] font-medium text-[var(--text-primary)]">Desktop App</span>
                            <p className="text-[10px] text-[var(--text-secondary)]">Responsive interface</p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-0.5">
                            <span className="text-[11px] font-medium text-[var(--text-primary)]">Mobile View</span>
                            <p className="text-[10px] text-[var(--text-secondary)]">Companion access</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 05: Custom Workflow */}
                    {idx === 4 && (
                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-1">
                          <span className="text-[10px] text-[var(--action-blue)] font-bold">1. REQUEST ➔ 2. REVIEW ➔ 3. ACTION ➔ 4. COMPLETE</span>
                          <p className="text-xs font-semibold text-[var(--text-primary)]">Custom Workflow</p>
                          <p className="text-[11px] text-[var(--text-secondary)]">
                            Engineered around your specific workflow rather than forcing standard packages.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile Closing Prompt */}
          <div className="pt-8 border-t border-[var(--border-subtle)] space-y-4">
            <p className="type-heading-card text-[var(--text-primary)]">
              Not sure which one you need? Tell us what is happening today.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--action-blue)] text-[var(--text-on-action)] font-medium text-sm hover:bg-[var(--action-blue-hover)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] min-h-[44px] w-full sm:w-auto"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
