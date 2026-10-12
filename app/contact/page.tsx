import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Clock, Shield, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Start a Project — YCN Labs",
  description:
    "Tell us what you’re trying to improve. You don’t need to know whether you need a website, app, automation or custom software.",
  alternates: {
    canonical: "https://ycnlabs.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Context & Expectations */}
        <div className="lg:col-span-5 space-y-8">
          <header className="space-y-4">
            <p className="type-kicker text-[var(--action-blue)] font-sans">
              Start a Project
            </p>
            <h1 className="type-display-page text-[var(--text-primary)] font-display">
              Tell us what you’re trying to improve.
            </h1>
            <p className="type-copy-lead text-[var(--text-secondary)] pt-1">
              You don’t need to know whether you need a website, app, automation or custom software. Tell us what happens today and what you want to change.
            </p>
          </header>

          <section aria-labelledby="expectations-heading" className="p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-5">
            <h2 id="expectations-heading" className="type-control text-[var(--text-primary)] uppercase tracking-[0.06em]">
              What to expect
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--action-blue)] shrink-0 mt-0.5" />
                <p>
                  <strong>Problem-led review:</strong> We analyze the operational problem you describe before proposing any architecture or tools.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[var(--action-blue)] shrink-0 mt-0.5" />
                <p>
                  <strong>No pressure consultation:</strong> We share initial thoughts on feasibility, scope boundaries, and estimated pricing before you make a commitment.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-[var(--action-blue)] shrink-0 mt-0.5" />
                <p>
                  <strong>Clear written terms:</strong> Deliverables, full code ownership, and support terms are defined in a written agreement before work begins.
                </p>
              </div>
            </div>
          </section>

          <div className="text-xs text-[var(--text-muted)] space-y-1.5 font-mono">
            <p>
              <strong className="text-[var(--text-secondary)] font-sans">Direct contact:</strong> hello@ycnlabs.com
            </p>
            <p>
              <strong className="text-[var(--text-secondary)] font-sans">Location:</strong> United Kingdom · Remote delivery worldwide
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xs">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
