"use client";

import Image from "next/image";
import { Check, ArrowRight, ShieldCheck, Database, BellRing } from "lucide-react";

export function HowItConnects() {
  return (
    <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0E17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Connection Flow */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-[#0D111A]">
              <div className="relative w-full h-64 sm:h-80">
                <Image
                  src="/media/clean_organised_laptop_desk.jpg"
                  alt="Clean organised workspace with connected digital dashboard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8] mb-1">
                    System Architecture in Practice
                  </span>
                  <p className="text-lg font-bold">
                    From customer click to your organised inbox.
                  </p>
                </div>
              </div>

              {/* Step Flow List below photo */}
              <div className="p-6 space-y-4 bg-white dark:bg-[#141C2B]">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/60 text-[#0470B4] dark:text-[#38BDF8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Customer submits request
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Validated instantly on the device, preventing invalid or spam submissions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/60 text-[#0470B4] dark:text-[#38BDF8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Direct notification & database entry
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Enquiry is written to persistent storage and routed to your email or WhatsApp in real time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/60 text-[#0470B4] dark:text-[#38BDF8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Customer receives instant acknowledgement
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Clear expectations set: "We received your request and will reply within 24 hours."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Explanatory Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0470B4] dark:text-[#38BDF8] mb-2">
                Behind the Scenes
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                One purposeful flow. No lost leads or forgotten notes.
              </h2>
            </div>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              When software isn’t connected, business owners juggle WhatsApp chats, email inboxes, scrap paper, and memory. That leads to delayed quotes, missed bookings, and frustrated customers.
            </p>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We design every touchpoint so data moves directly where you need it—into an organized dashboard, an existing spreadsheet, or immediate phone notifications—ready for action.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                  <BellRing className="w-3.5 h-3.5 text-[#0470B4]" />
                  Instant Alerts
                </div>
                <p className="text-xs text-slate-500">
                  Know the second a qualified buyer reaches out.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                  <Database className="w-3.5 h-3.5 text-[#0470B4]" />
                  Single Record
                </div>
                <p className="text-xs text-slate-500">
                  Customer history preserved in one place.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0470B4]" />
                  No Data Leaks
                </div>
                <p className="text-xs text-slate-500">
                  Secure transmission with rate limiting and deduplication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
