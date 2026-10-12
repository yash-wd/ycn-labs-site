import Link from "next/link";
import { Globe, LayoutGrid, Cpu, Smartphone, ArrowRight } from "lucide-react";

export function WhatWeBuild() {
  const pathways = [
    {
      icon: Globe,
      title: "Websites & digital presence",
      description:
        "Fast, accessible websites that explain what you do immediately, help local and online customers find you, and make taking action obvious.",
      deliverables: "High-speed Next.js frontend, semantic SEO, mobile responsiveness, fast hosting setup.",
      link: "/what-we-build#websites",
    },
    {
      icon: LayoutGrid,
      title: "Web applications & workflows",
      description:
        "Custom web applications that replace messy paper trails, repetitive spreadsheet copy-pasting, and manual dispatching with a clean web interface.",
      deliverables: "Custom portals, internal task trackers, quotation generators, client intake tools.",
      link: "/what-we-build#web-applications",
    },
    {
      icon: Cpu,
      title: "Business systems & integrations",
      description:
        "Connect the tools you already rely on—WhatsApp, Google Sheets, Stripe, calendar apps, or bespoke databases—so data flows automatically.",
      deliverables: "API integrations, webhook listeners, automated alerts, synchronization pipelines.",
      link: "/what-we-build#systems-integrations",
    },
    {
      icon: Smartphone,
      title: "Software products",
      description:
        "Turn your idea or process into an app or platform.",
      deliverables: "Product architecture, user authentication, subscription billing, multi-tenant databases.",
      link: "/what-we-build#software-products",
    },
  ];

  return (
    <section id="what-we-build" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D111A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0470B4] dark:text-[#38BDF8] mb-2">
            Scope & Outcomes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            What we build
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Four pathways designed to solve specific operational and commercial challenges without unnecessary layers or buzzwords:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pathways.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#141C2B]/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#0D111A] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#0470B4] dark:text-[#38BDF8] shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <p className="text-xs text-slate-500">
                      <strong className="text-slate-700 dark:text-slate-300">Includes:</strong> {item.deliverables}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0470B4] dark:text-[#38BDF8] hover:underline"
                  >
                    View details & examples
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
