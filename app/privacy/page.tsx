import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — YCN Labs",
  description:
    "Privacy policy detailing data handling, contact form submissions, and analytics transparency for YCN Labs.",
  alternates: {
    canonical: "https://ycnlabs.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-3">
        <p className="type-kicker text-[var(--action-blue)]">
          Legal
        </p>
        <h1 className="type-display-page text-[var(--text-primary)]">
          Privacy Policy
        </h1>
        <p className="type-caption text-[var(--text-muted)]">
          Last updated: 17 September 2026
        </p>
      </div>

      <div className="space-y-8 type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <h2 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">
            1. Information We Collect
          </h2>
          <p>
            When you submit an enquiry through our contact form, we collect the details you explicitly provide: your name, email address, company name (if provided), project category, approximate budget range, target timeline, and your project message.
          </p>
          <p>
            We collect minimal technical connection data (IP address, user agent) solely for the purpose of distributed abuse prevention, rate limiting, and deduplication of automated form submissions.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <h2 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">
            2. How We Use Your Information
          </h2>
          <p>
            We use your submitted details exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>Review and respond to your commercial project enquiry</li>
            <li>Prepare custom project proposals and technical specifications</li>
            <li>Communicate directly with you regarding agreed project milestones</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to any third parties for advertising or marketing purposes.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <h2 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">
            3. Data Storage & Security
          </h2>
          <p>
            Form submissions are securely stored in encrypted cloud databases and transmitted over HTTPS. Access to lead records is restricted strictly to authorized engineering personnel evaluating your project.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
          <h2 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">
            4. Your Rights
          </h2>
          <p>
            Under UK and GDPR data protection regulations, you have the right to request a copy of the personal information we hold about you, or to request its deletion. To make an inquiry, email us at <code className="text-[var(--action-blue)] type-mono">hello@ycnlabs.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
