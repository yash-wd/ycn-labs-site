import type { Metadata } from "next";
import type { ReactNode } from "react";

/*
 * DRAFT for legal review (14 Nov 2026). Not approved wording and not in force.
 * Built from the Owner's fact-sheet answers O1–O10 (private vault) and the code on main.
 * Square-bracket items are placeholders: legal name, notice address, server locations,
 * reply period, rate-limit statistics retention, the deletion process and the applicable-law wording.
 * The reviewer must settle all of them before this ships.
 * Facts behind the wording (GPT review, 14 Nov): lib/security/ratelimit.ts sets Upstash `analytics: true`;
 * the acknowledgement email is best-effort; purgeLeadsOlderThan (lib/db/recovery.ts) deletes by createdAt,
 * not by last contact, and no schedule runs it.
 */

export const metadata: Metadata = {
  title: "Privacy Policy — YCN Labs",
  description:
    "What YCN Labs collects through its contact form, why, who receives it, how long it is kept and how to ask about it.",
  alternates: {
    canonical: "https://ycnlabs.com/privacy",
  },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
      <h2 className="type-heading-card text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
      {/* Line length capped near 70 characters; pretty wrapping (Modern Web Guidance: typography). */}
      <div className="max-w-[70ch] space-y-3 text-pretty">{children}</div>
    </section>
  );
}

function Placeholder({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-[var(--text-primary)]">[{children}]</span>;
}

const EMAIL = <a href="mailto:hello@ycnlabs.com" translate="no" className="break-words text-[var(--action-blue)] underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-2">hello@ycnlabs.com</a>;

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-3">
        <p className="type-kicker text-[var(--action-blue)]">Legal</p>
        <h1 className="type-display-page text-[var(--text-primary)]">Privacy Policy</h1>
        <p className="type-caption text-[var(--text-muted)]">Draft for legal review, 14 November 2026. Not yet in force.</p>
      </div>

      <div className="space-y-8 type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
        <Section title="1. Who we are">
          <p>
            YCN Labs is run by <Placeholder>legal name to be added</Placeholder>, a sole proprietor based in Hyderabad, India.
            Address for legal notices: <Placeholder>to be confirmed</Placeholder>.
          </p>
          <p>For any question about your information, email {EMAIL}.</p>
        </Section>

        <Section title="2. What we collect">
          <p>When you send an enquiry through our contact form, we collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>your name and email address;</li>
            <li>what you want to improve, and what you tell us about what happens today and what you want to change;</li>
            <li>if you choose to give them: your business name, an approximate budget and a timeline.</li>
          </ul>
          <p>
            With each enquiry we also keep a reference number, its status, whether our notification email was sent, and when the
            enquiry was received and updated.
          </p>
          <p>
            If you contact us directly by phone, WhatsApp or email, we receive what you send through that service.
          </p>
          <p>
            We do not use visitor analytics or advertising trackers, so we do not track which pages you visit. Our own code sets no
            cookies. The abuse protection in section 4 keeps its own usage statistics.
          </p>
        </Section>

        <Section title="3. Why we use it">
          <ul className="list-disc pl-5 space-y-1">
            <li>To read and reply to your enquiry.</li>
            <li>To prepare a quote or proposal if you ask for one.</li>
            <li>To protect the form from spam and abuse.</li>
          </ul>
          <p>We do not sell or rent your information, and we do not use it for advertising.</p>
        </Section>

        <Section title="4. Protecting the form from abuse">
          <p>
            To limit repeated submissions, we turn your IP address into a one-way code and send only that code to our rate-limiting
            provider. It counts recent submissions over a one-hour window, and it also keeps rate-limiting statistics linked to the
            code. How long those statistics are kept: <Placeholder>to be confirmed</Placeholder>. We do not store your IP address with
            your enquiry.
          </p>
        </Section>

        <Section title="5. Who receives it">
          <p>We use these service providers to run the form:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="text-[var(--text-primary)]">Neon</span>: our database, which stores your enquiry.
            </li>
            <li>
              <span className="text-[var(--text-primary)]">Resend</span>: sends us a notification with your enquiry, and tries to send
              you a short email confirming we received it. If that email fails, your enquiry is still saved.
            </li>
            <li>
              <span className="text-[var(--text-primary)]">Upstash</span>: rate limiting and its statistics. It receives only the
              one-way code described above, not your enquiry.
            </li>
            <li>
              Our hosting provider, <Placeholder>to be confirmed when hosting is chosen</Placeholder>: runs this website and may keep
              standard request logs.
            </li>
            <li>
              <span className="text-[var(--text-primary)]">Sentry</span>, only if we switch on error monitoring: technical error
              details. It is set up to filter out what you type in the form, and that filter will be tested before monitoring is
              switched on.
            </li>
          </ul>
          <p>
            These providers may store data outside India. Server locations: <Placeholder>to be confirmed</Placeholder>.
          </p>
        </Section>

        <Section title="6. How long we keep it">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Enquiries that do not become projects: our policy is to delete them 12 months after our last meaningful contact with
              you. <Placeholder>Deletion is done by hand today; confirm the process before this page is published</Placeholder>
            </li>
            <li>
              If you become a client, the records needed for the project, the agreement and tax are kept separately, for as long as
              the law requires.
            </li>
            <li>
              In your browser: your light or dark theme choice stays until you clear it. Whether you paused the animation or saw the
              intro is kept only until you close the tab.
            </li>
          </ul>
        </Section>

        <Section title="7. Who can see it">
          <p>
            Only the owner of YCN Labs can see enquiries, in our database and in our enquiry inbox. Information sent through this
            website travels over an encrypted connection (HTTPS).
          </p>
        </Section>

        <Section title="8. Your choices">
          <p>
            You can ask us to show you, correct or delete the information we hold about you by emailing {EMAIL}. We will reply
            within <Placeholder>period to be confirmed</Placeholder>.
          </p>
          <p>
            <Placeholder>Your rights under the law that applies, to be confirmed by legal review</Placeholder>
          </p>
        </Section>

        <Section title="9. Changes to this policy">
          <p>If the way we handle information changes, we will update this page and the date at the top.</p>
        </Section>
      </div>
    </div>
  );
}
