import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — YCN Labs",
  description:
    "Terms of service governing project proposals, code deliverables, ownership, and website access for YCN Labs.",
  alternates: {
    canonical: "https://ycnlabs.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--action-blue)] font-mono">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-display">
          Terms of Service
        </h1>
        <p className="text-xs text-[var(--text-muted)] font-mono">
          Last updated: 17 September 2026
        </p>
      </div>

      <div className="space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-primary)] font-display">
            1. Scope of Service & Proposals
          </h2>
          <p>
            YCN Labs provides software engineering, website development, and system integration services. Every engagement is defined by an agreed project proposal detailing specific deliverables, milestones, payment schedules, and support boundaries.
          </p>
          <p>
            Information provided on this website—including interactive demonstrations, sample workflows, and capability descriptions—is illustrative and does not constitute a binding unilateral contract until formal proposal acceptance.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-primary)] font-display">
            2. Intellectual Property & Code Ownership
          </h2>
          <p>
            We believe clients should own what they pay for:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>
              Upon full settlement of agreed project fees, you receive complete ownership of all bespoke code, design assets, and database schemas created for your project.
            </li>
            <li>
              You receive administrative ownership of all deployment accounts, hosting repositories, and domain settings associated with your deliverable.
            </li>
            <li>
              YCN Labs retains the right to reference non-confidential project completions in our portfolio, unless a specific non-disclosure agreement (NDA) provides otherwise.
            </li>
          </ul>
        </section>

        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-primary)] font-display">
            3. Client Responsibilities
          </h2>
          <p>
            Timely delivery requires active collaboration. Clients agree to provide necessary business assets (copy, branding, credentials to integrated services) and complete review cycles within agreed timeframes.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-primary)] font-display">
            4. Warranty & Support
          </h2>
          <p>
            We stand behind our engineering. Each deliverable includes a post-launch warranty period during which defects or regressions from agreed specifications are corrected at no additional charge. Ongoing feature development and maintenance are covered under agreed support packages.
          </p>
        </section>
      </div>
    </div>
  );
}
