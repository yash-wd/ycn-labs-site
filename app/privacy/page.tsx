import type { Metadata } from "next";
import type { ReactNode } from "react";

/*
 * DRAFT (14 Nov 2026). Not in force until the Owner approves a merge.
 * Built from the Owner's fact-sheet answers O1–O10 (private vault), his approval to show his name
 * (14 Nov), and the code on main. Legal basis researched from primary texts:
 * - In force now: IT Act 2000 s.43A and the IT (Reasonable Security Practices and Procedures and
 *   Sensitive Personal Data or Information) Rules 2011, G.S.R. 313(E): Rule 4 (published privacy policy),
 *   Rule 5(9) (named Grievance Officer, grievances redressed within one month).
 * - From 13 May 2027 (G.S.R. 843(E) and 846(E)): DPDP Act 2023 ss.5–14 and DPDP Rules 2025, Rule 3
 *   (itemised notice; withdrawal, rights and Board complaint), Rule 9 (contact person), Rule 14
 *   (means of requests; grievance period not over 90 days), Rule 8(3) (logs kept at least one year).
 * Remaining placeholders: hosting provider and server locations (hosting not chosen yet).
 * Depends on PR #36: Upstash rate-limit analytics switched off. Merge #36 before this page.
 * Facts: acknowledgement email is best-effort; deletion is the Owner's monthly manual review
 * (docs/YCN_LABS_OWNER_WORKING_ROUTINE.md); purgeLeadsOlderThan deletes by createdAt and is not scheduled.
 */

export const metadata: Metadata = {
  title: "Privacy Policy — YCN Labs",
  description:
    "What YCN Labs collects through its contact form, why, who receives it, how long it is kept, your rights and how to raise a complaint.",
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
        <p className="type-caption text-[var(--text-muted)]">Draft, 14 November 2026. Not yet in force.</p>
      </div>

      <div className="space-y-8 type-copy-body text-sm text-[var(--text-secondary)] leading-relaxed">
        <Section title="1. Who we are">
          <p>
            YCN Labs is the trading name of Yaseen Sayyad, a sole proprietor based in Hyderabad, India. This policy explains how we
            handle the personal information you give us through this website.
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
            cookies. We do not ask for passwords, payment details or other sensitive information through this website.
          </p>
        </Section>

        <Section title="3. Why we use it">
          <p>You give us this information so that we can reply. We use it only to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>read and reply to your enquiry;</li>
            <li>prepare a quote or proposal if you ask for one;</li>
            <li>protect the form from spam and abuse.</li>
          </ul>
          <p>
            We do not sell or rent your information, and we do not use it for advertising or send you marketing emails because you
            sent an enquiry.
          </p>
        </Section>

        <Section title="4. Protecting the form from abuse">
          <p>
            To limit repeated submissions, we turn your IP address into a one-way code and send only that code to our rate-limiting
            provider, which uses it to count submissions over a one-hour window. We do not store your IP address with your enquiry.
          </p>
        </Section>

        <Section title="5. Who receives it">
          <p>We use these service providers to run the form. Each receives only what it needs:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="text-[var(--text-primary)]">Neon</span>: our database, which stores your enquiry.
            </li>
            <li>
              <span className="text-[var(--text-primary)]">Resend</span>: sends us a notification with your enquiry, and tries to send
              you a short email confirming we received it. If that email fails, your enquiry is still saved.
            </li>
            <li>
              <span className="text-[var(--text-primary)]">Upstash</span>: rate limiting. It receives only the one-way code described
              above, not your enquiry.
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
            These providers may store data outside India. Server locations: <Placeholder>to be confirmed</Placeholder>. We do not
            share your information with anyone else unless the law requires it.
          </p>
        </Section>

        <Section title="6. How long we keep it">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Enquiries that do not become projects: we review stored enquiries every month and delete those with no meaningful
              contact for 12 months.
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

        <Section title="7. How we protect it">
          <p>
            Only the owner of YCN Labs can see enquiries, in our database and in our enquiry inbox. Information sent through this
            website travels over an encrypted connection (HTTPS). If a security breach affects your information, we will tell you
            and the authorities as the law requires.
          </p>
        </Section>

        <Section title="8. Your rights">
          <p>You can ask us to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>tell you what information we hold about you and who we shared it with;</li>
            <li>correct, complete or update it;</li>
            <li>delete it, unless the law requires us to keep it;</li>
            <li>stop using it. You can withdraw your agreement as easily as you gave it, by email.</li>
          </ul>
          <p>
            You can also name someone to act for you if you die or cannot act yourself. Email {EMAIL} from the address you used in
            your enquiry; we may ask you to confirm the request from that address before we act. We reply within 30 days.
          </p>
        </Section>

        <Section title="9. Grievance Officer and complaints">
          <p>
            Grievance Officer: Yaseen Sayyad, {EMAIL}. We resolve complaints about how we handle your information within 30 days of
            receiving them.
          </p>
          <p>
            If you are not satisfied with our response, you can complain to the Data Protection Board of India once the Digital
            Personal Data Protection Act, 2023 gives it that role (from 13 May 2027).
          </p>
        </Section>

        <Section title="10. Children">
          <p>Our services are for businesses. If you are under 18, please do not send us an enquiry.</p>
        </Section>

        <Section title="11. The law and changes to this policy">
          <p>
            We handle personal information under India&rsquo;s Information Technology Act, 2000 and its rules and, as its
            provisions come into force, the Digital Personal Data Protection Act, 2023 and its rules. If the way we handle
            information changes, we will update this page and the date at the top.
          </p>
        </Section>
      </div>
    </div>
  );
}
