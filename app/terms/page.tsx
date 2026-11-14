import type { Metadata } from "next";
import type { ReactNode } from "react";

/*
 * DRAFT for legal review (14 Nov 2026). Not approved wording and not in force.
 * Built from the Owner's fact-sheet answers O1–O10 (private vault), DECISION-052 and DECISION-054.
 * Square-bracket items are placeholders: legal name, notice address, and the liability, governing-law
 * and disputes wording. The reviewer must settle all of them before this ships.
 */

export const metadata: Metadata = {
  title: "Terms of Service — YCN Labs",
  description:
    "How YCN Labs projects work: written agreements, ownership of the finished work, portfolio use and fixes after launch.",
  alternates: {
    canonical: "https://ycnlabs.com/terms",
  },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
      <h2 className="text-lg font-bold text-[var(--text-primary)] font-display">{title}</h2>
      {/* Line length capped near 70 characters; pretty wrapping (Modern Web Guidance: typography). */}
      <div className="max-w-[70ch] space-y-3 text-pretty">{children}</div>
    </section>
  );
}

function Placeholder({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-[var(--text-primary)]">[{children}]</span>;
}

export default function TermsPage() {
  return (
    <div className="py-12 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--action-blue)] font-mono">Legal</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-display">
          Terms of Service
        </h1>
        <p className="text-xs text-[var(--text-muted)] font-mono">Draft for legal review, 14 November 2026. Not yet in force.</p>
      </div>

      <div className="space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
        <Section title="1. Who we are">
          <p>
            YCN Labs is the trading name of <Placeholder>legal name to be added</Placeholder>, a sole proprietor based in Hyderabad,
            India. Address for legal notices: <Placeholder>to be confirmed</Placeholder>. Email:{" "}
            <a href="mailto:hello@ycnlabs.com" translate="no" className="break-words text-[var(--action-blue)] underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-2">hello@ycnlabs.com</a>.
          </p>
        </Section>

        <Section title="2. This website">
          <p>
            This website explains what we do. Demonstrations and sample screens are illustrations. Nothing on this website is an
            offer or a contract.
          </p>
        </Section>

        <Section title="3. Projects">
          <p>
            Every project runs under a separate written agreement. It sets out the scope, price, payment milestones, timeline and
            support. If the agreement and this page differ, the agreement applies.
          </p>
        </Section>

        <Section title="4. Your part">
          <p>
            You provide the content, brand assets and access to your accounts and services that the project needs, and give
            feedback within the agreed times. Changes to the agreed scope are quoted before we start them.
          </p>
        </Section>

        <Section title="5. Who owns the finished work">
          <p>Unless your agreement says otherwise:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Once you have paid in full, you own the custom code and designs we create for your project.</li>
            <li>Accounts and domains registered for your business stay in your name and under your control.</li>
            <li>
              We keep ownership of our own reusable tools, components and know-how. Where your project uses them, you receive a
              licence to use them as part of the delivered work.
            </li>
            <li>Third-party software, fonts, images and services stay under their own licences.</li>
          </ul>
        </Section>

        <Section title="6. Showing your project">
          <p>We show your project in our portfolio only with your written permission.</p>
        </Section>

        <Section title="7. Fixes after launch">
          <p>
            For 30 days after launch, we fix bugs in our own work free of charge. New features, changes, content updates, and
            problems caused by third-party services or by changes made by others are quoted separately, or covered by an optional
            maintenance plan.
          </p>
        </Section>

        <Section title="8. Liability, law and disputes">
          <p>
            <Placeholder>Limits of liability, governing law and where disputes are heard, to be written with legal review</Placeholder>
          </p>
        </Section>

        <Section title="9. Changes to these terms">
          <p>
            If these terms change, we will update this page and the date at the top. Signed agreements are not changed by updates
            to this page.
          </p>
        </Section>
      </div>
    </div>
  );
}
