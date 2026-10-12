"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  UserCheck,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Send,
  Smartphone,
  Workflow,
  Check,
} from "lucide-react";

export function CinematicLayersSlice() {
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [showOptionalBranch, setShowOptionalBranch] = useState<boolean>(true);

  return (
    <section
      id="cinematic-layers"
      className="relative py-20 md:py-32 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070A11] text-slate-900 dark:text-slate-100"
      aria-label="YCN Experience Architecture — Connecting Customer Experience to Business Workflow"
    >
      {/* Background Soft Depth Gradient */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-sky-50/50 to-transparent dark:from-[#0E1726]/40 dark:to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-36">

        {/* ========================================================================= */}
        {/* SCENE 04 ENTRY: The Connection Gap & Pathways (Compact, high-impact)      */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0470B4] dark:text-[#8BD4FF]">
            Scene 04 · The Connection Gap
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            When customer interest reaches your business, what happens next?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Most software either leaves the customer waiting or leaves the business juggling scattered notes. YCN connects the front-of-house customer action directly to what your team needs to do next.
          </p>

          {/* Clean 4-Pathway Orientation (Typographic, no pill-badge noise) */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Pathway 01
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                Customer Experiences
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Pathway 02
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                Business Workflows
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Pathway 03
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                Optional Automation
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Pathway 04
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                Dependable Engineering
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 05: THE LAYERS (Spacious, Central Vocabulary Test)                   */}
        {/* ========================================================================= */}
        <div className="space-y-12">
          {/* Scene 05 Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0470B4] dark:text-[#8BD4FF]">
              Scene 05 · The System in Action
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Four deliberate layers. One unbroken connection.
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Follow the customer’s enquiry signal as it travels from the first interaction to confirmed business follow-up.
            </p>

            {/* Cyan Signal Flow Indicator */}
            <div className="inline-flex items-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span
                className="w-2 h-2 rounded-full bg-[#0299C3] dark:bg-[#017596] animate-signal-pulse shrink-0"
                aria-hidden="true"
              />
              <span>Signal Path:</span>
              <span className="text-slate-700 dark:text-slate-300 font-sans">Customer</span>
              <span className="text-slate-400">→</span>
              <span className="text-slate-700 dark:text-slate-300 font-sans">Experience</span>
              <span className="text-slate-400">→</span>
              <span className="text-slate-700 dark:text-slate-300 font-sans">Workflow</span>
              <span className="text-slate-400">→</span>
              <span className="font-semibold text-[#0470B4] dark:text-[#8BD4FF] font-sans">Result</span>
            </div>
          </div>

          {/* Interactive Layer Selector Tabs */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 max-w-xl mx-auto p-1 rounded-xl bg-slate-100 dark:bg-[#121927] border border-slate-200 dark:border-slate-800">
            {[
              { id: 1, label: "Layer 1: Customer UI" },
              { id: 2, label: "Layer 2: Business Action" },
              { id: 3, label: "Layer 3: Optional Rules" },
              { id: 4, label: "Layer 4: Foundation" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveLayer(tab.id)}
                className={`flex-1 py-2 px-2.5 text-xs font-semibold rounded-lg transition-all ${
                  activeLayer === tab.id
                    ? "bg-white dark:bg-[#182337] text-[#0470B4] dark:text-[#8BD4FF] shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ======================================================================= */}
          {/* THE 3D PERSPECTIVE STAGE (Desktop) / NATIVE STACK (Mobile)              */}
          {/* ======================================================================= */}
          <div className="relative max-w-4xl mx-auto pt-4">

            {/* Continuous SVG Cyan Signal Spine on Desktop */}
            <div className="hidden lg:block absolute left-8 top-10 bottom-10 w-6 -z-0 pointer-events-none" aria-hidden="true">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 24 900" fill="none">
                {/* Background Track */}
                <path
                  d="M 12 0 L 12 900"
                  stroke="#CBD5E1"
                  className="dark:stroke-slate-800"
                  strokeWidth="2"
                />
                {/* Active Pulsing Signal Path */}
                <path
                  d="M 12 0 L 12 900"
                  stroke="var(--signal-cyan, #0299C3)"
                  strokeWidth="3"
                  className="animate-signal-flow"
                />
                {/* Signal Nodes at each layer */}
                <circle cx="12" cy="60" r="5" fill="var(--signal-cyan, #0299C3)" />
                <circle cx="12" cy="320" r="5" fill="var(--signal-cyan, #0299C3)" />
                <circle cx="12" cy="580" r="5" fill="var(--signal-cyan, #0299C3)" />
                <circle cx="12" cy="820" r="5" fill="var(--signal-cyan, #0299C3)" />
              </svg>
            </div>

            {/* Stacked Spatial Planes */}
            <div className="space-y-8 lg:pl-20 [perspective:1400px]">

              {/* ------------------------------------------------------------------- */}
              {/* LAYER 1: What your customers use                                    */}
              {/* ------------------------------------------------------------------- */}
              <div
                onClick={() => setActiveLayer(1)}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 border cursor-pointer ${
                  activeLayer === 1
                    ? "border-[#0299C3] dark:border-[#017596] bg-white dark:bg-[#101726] shadow-xl ring-1 ring-[#0299C3]/20 dark:ring-[#017596]/30 lg:[transform:rotateX(2deg)_translateZ(10px)]"
                    : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0E1422]/70 hover:border-slate-300 dark:hover:border-slate-700 lg:[transform:rotateX(2deg)_translateZ(0px)]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-[#0470B4] dark:text-[#8BD4FF] font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100 dark:border-sky-900/40">
                      01
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#0470B4] dark:text-[#8BD4FF]">
                        Layer 01 · Front of House
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        What your customers use
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Intuitive Customer Touchpoint
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      A clean interface built for real customer intent: requesting a consultation, booking a service, or asking for pricing without friction or confusing account setups.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Responsive layout tuned for mobile touch and fast loading</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Clear input validation so visitors don’t submit missing details</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Immediate confirmation message reassuring the customer</span>
                      </li>
                    </ul>
                  </div>

                  {/* Sample Customer Mini-Interface */}
                  <div className="md:col-span-5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141C2B] space-y-3 shadow-inner">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700/60 text-[11px]">
                      <span className="font-bold text-slate-900 dark:text-white">
                        Service Request Demo
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                        Sample · Nothing is sent
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="text-[10px] uppercase font-medium text-slate-500 dark:text-slate-400 block">
                          Customer Name
                        </label>
                        <div className="p-2 rounded bg-white dark:bg-[#182337] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium">
                          Sample Customer
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-medium text-slate-500 dark:text-slate-400 block">
                          Required Service
                        </label>
                        <div className="p-2 rounded bg-white dark:bg-[#182337] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium">
                          Commercial Consultation & Review
                        </div>
                      </div>
                      <div className="pt-1">
                        <div className="w-full py-2 px-3 rounded bg-[#0470B4] dark:bg-[#8BD4FF] text-white dark:text-[#070A11] font-bold text-center text-xs flex items-center justify-center gap-1.5 shadow-xs">
                          <Send className="w-3 h-3" />
                          Sample: Submit Request (Demo)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* LAYER 2: What your business does next                               */}
              {/* ------------------------------------------------------------------- */}
              <div
                onClick={() => setActiveLayer(2)}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 border cursor-pointer ${
                  activeLayer === 2
                    ? "border-[#0299C3] dark:border-[#017596] bg-white dark:bg-[#101726] shadow-xl ring-1 ring-[#0299C3]/20 dark:ring-[#017596]/30 lg:[transform:rotateX(2deg)_translateZ(10px)]"
                    : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0E1422]/70 hover:border-slate-300 dark:hover:border-slate-700 lg:[transform:rotateX(2deg)_translateZ(0px)]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-[#0470B4] dark:text-[#8BD4FF] font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100 dark:border-sky-900/40">
                      02
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#0470B4] dark:text-[#8BD4FF]">
                        Layer 02 · Operational Workflow
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        What your business does next
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    State Progression Flow
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  The enquiry moves into a structured sequence so the team knows exactly who is responsible and what action is required next.
                </p>

                {/* State Progression Tracker (Generic, illustrative) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141C2B] space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-400 block">Stage 01</span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Enquiry Logged
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                      Contact details and request scope recorded into the operational queue.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#0299C3]/50 dark:border-[#017596]/60 bg-sky-50/40 dark:bg-[#131F33] space-y-1.5">
                    <span className="text-[11px] font-mono text-[#0470B4] dark:text-[#8BD4FF] font-semibold block">Stage 02 · Active</span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Assigned to Team
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                      Dispatched to the designated team member with full context attached.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141C2B] space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-400 block">Stage 03</span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Follow-up Dispatched
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                      Confirmation and scheduling details communicated directly to the customer.
                    </p>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* LAYER 3: Less repetitive work, optionally                           */}
              {/* ------------------------------------------------------------------- */}
              <div
                onClick={() => setActiveLayer(3)}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 border cursor-pointer ${
                  activeLayer === 3
                    ? "border-[#0299C3] dark:border-[#017596] bg-white dark:bg-[#101726] shadow-xl ring-1 ring-[#0299C3]/20 dark:ring-[#017596]/30 lg:[transform:rotateX(2deg)_translateZ(10px)]"
                    : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0E1422]/70 hover:border-slate-300 dark:hover:border-slate-700 lg:[transform:rotateX(2deg)_translateZ(0px)]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-[#0470B4] dark:text-[#8BD4FF] font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100 dark:border-sky-900/40">
                      03
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#0470B4] dark:text-[#8BD4FF]">
                        Layer 03 · Optional Efficiency
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        Less repetitive work, optionally
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    Clearly Optional
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Not every business wants or needs automated processing. Keep your workflow entirely manual when personal review is preferred, or allow simple branching rules to handle recurring administrative tasks.
                  </p>

                  {/* Branching Path Demonstration */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141C2B] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#0470B4] dark:text-[#8BD4FF]" />
                        Illustrative Automation Branches
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowOptionalBranch(!showOptionalBranch);
                        }}
                        className="text-[11px] font-semibold text-[#0470B4] dark:text-[#8BD4FF] hover:underline"
                      >
                        {showOptionalBranch ? "Hide optional paths" : "Show optional paths"}
                      </button>
                    </div>

                    {showOptionalBranch && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                        <div className="p-3 rounded-lg bg-white dark:bg-[#182337] border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <Calendar className="w-4 h-4 text-[#0470B4] dark:text-[#8BD4FF] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white block">
                              Calendar Hold
                            </span>
                            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                              Blocks out the consultation slot in the team calendar automatically.
                            </span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-white dark:bg-[#182337] border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <Send className="w-4 h-4 text-[#0470B4] dark:text-[#8BD4FF] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white block">
                              Instant Acknowledgement
                            </span>
                            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                              Sends an automatic confirmation email with next steps.
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* LAYER 4: What keeps it dependable                                   */}
              {/* ------------------------------------------------------------------- */}
              <div
                onClick={() => setActiveLayer(4)}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 border cursor-pointer ${
                  activeLayer === 4
                    ? "border-[#0299C3] dark:border-[#017596] bg-white dark:bg-[#101726] shadow-xl ring-1 ring-[#0299C3]/20 dark:ring-[#017596]/30 lg:[transform:rotateX(2deg)_translateZ(10px)]"
                    : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0E1422]/70 hover:border-slate-300 dark:hover:border-slate-700 lg:[transform:rotateX(2deg)_translateZ(0px)]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-[#0470B4] dark:text-[#8BD4FF] font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100 dark:border-sky-900/40">
                      04
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#0470B4] dark:text-[#8BD4FF]">
                        Layer 04 · The Foundation
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        What keeps it dependable
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Quiet Infrastructure
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Beneath the surface, the software is engineered to handle errors, validate payloads, and maintain fast, accessible performance across devices. Specific technical practices and architecture are documented on our Engineering page for verification.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-t border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">
                      Looking for architecture details and security practices?
                    </span>
                    <Link
                      href="/engineering#for-technical-readers"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#0470B4] dark:text-[#8BD4FF] hover:underline shrink-0"
                    >
                      Explore our Engineering practices
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 06 EXIT: The Resolution & Opposite Outcome (Same-shot contrast)     */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-slate-200 dark:border-slate-800 space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Scene 06 · The Resolution
            </span>

            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              The same afternoon. An entirely different outcome.
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Compare the friction of disconnected communication with the reliability of a deliberate system.
            </p>
          </div>

          {/* Illustrative Scenarios Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Disconnected Scenario */}
            <div className="p-6 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/10 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700 dark:text-rose-400 block font-semibold">
                Illustrative Scenario · Disconnected Tools
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                The enquiry is buried in an unread personal inbox.
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Hours pass before anyone sees the message. The team is unsure who should reply. Frustrated by delayed communication, the customer contacts another provider.
              </p>
            </div>

            {/* Connected Scenario */}
            <div className="p-6 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/10 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block font-semibold">
                Illustrative Scenario · Connected System
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                The enquiry is captured, assigned, and followed up promptly.
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The customer receives immediate confirmation. The assigned team member responds with full context. The booking is secured without confusion or misplaced notes.
              </p>
            </div>
          </div>

          {/* Callout & Primary Action */}
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#101726] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Ready to connect your customer experience to real execution?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                We study your business requirements before selecting technology.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#0470B4] hover:bg-[#035b94] dark:bg-[#8BD4FF] dark:hover:bg-[#BCE5FF] text-white dark:text-[#070A11] text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                Start a project
              </Link>
              <Link
                href="/how-we-work"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                How we work
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
