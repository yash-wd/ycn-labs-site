import type { Metadata } from "next";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/v3/Section";

// YCN-V3-UI Day 4. Ratified H1 and first-step paragraph (DECISION-054) kept; form logic unchanged.
// Phone/WhatsApp: Owner approval 12 Nov 2026; the same number is already public on ycnlabs.com.
export const metadata: Metadata = {
  title: "Start a Project — YCN Labs",
  description:
    "Tell us what you’re trying to improve. You don’t need to know whether you need a website, app, automation or custom software.",
  alternates: {
    canonical: "https://ycnlabs.com/contact",
  },
};

const CHANNELS = [
  { icon: Phone, label: "Call", value: "+91 83412 26694", href: "tel:+918341226694" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/918341226694", external: true },
  { icon: Mail, label: "Email", value: "hello@ycnlabs.com", href: "mailto:hello@ycnlabs.com" },
];

export default function ContactPage() {
  return (
    <div className="bg-[var(--bg-canvas)] pb-[var(--space-5)] pt-28 sm:pt-32 lg:pb-[var(--space-6)] lg:pt-36">
      <Container>
        <div className="grid items-start gap-[var(--space-5)] lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="type-display-page font-display text-[var(--text-primary)]">
              Tell us what you’re trying to improve.
            </h1>
            <p className="type-copy-lead mt-[var(--space-3)] text-[var(--text-secondary)]">
              Tell us what is slow, lost or difficult in your business today. We’ll tell you plainly what could help and what it would cost, before you commit to anything.
            </p>

            <section aria-labelledby="channels-heading" className="mt-[var(--space-4)]">
              <h2 id="channels-heading" className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Prefer to talk?
              </h2>
              <ul className="mt-[var(--space-2)] grid gap-[var(--space-1)]">
                {CHANNELS.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex min-h-[56px] items-center gap-[var(--space-2)] rounded-card border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-[var(--space-2)] py-[var(--space-1)] transition-colors hover:border-[var(--action-blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-[var(--action-blue)]" aria-hidden="true" />
                      <span className="flex flex-col">
                        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
                        <span className="font-semibold text-[var(--text-primary)]">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="type-caption mt-[var(--space-2)] text-[var(--text-secondary)]">
                Based in Hyderabad, India, working with businesses across India.
              </p>
            </section>
          </div>

          <div className="rounded-panel border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-[var(--space-3)] shadow-soft sm:p-[var(--space-4)] lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
