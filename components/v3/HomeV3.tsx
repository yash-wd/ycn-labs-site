import Link from "next/link";
import { ArrowRight, Globe, LayoutDashboard, MessageCircle, Workflow, Wrench } from "lucide-react";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { Section, SectionHead } from "./Section";
import { RequestsShot, FlowShot, SiteShot, BeforeAfterShot } from "./Shots";

// YCN-V3-UI Day 2: the homepage below the hero, from COPY-V3.md (Owner-approved base, 10 Nov 2026).
// Rules: no invented clients or numbers; demonstrations are labelled; claims stay inside DECISION-052/054.

export const SERVICES = [
  { icon: Globe, title: "Business websites", line: "A clear site that says what you do and makes contacting you easy." },
  { icon: LayoutDashboard, title: "Web applications", line: "Bookings, orders and requests: the tools your team uses every day." },
  { icon: Workflow, title: "Automation and integrations", line: "Connect the pieces, stop retyping, get notified." },
  { icon: Wrench, title: "Maintenance", line: "Keep it fast, safe and up to date, on a monthly plan." },
];

export const STEPS = [
  { title: "Tell us the problem", line: "What is slow, lost or difficult today." },
  { title: "We propose the fix and the price", line: "A written scope, in INR, before you commit to anything." },
  { title: "We build and show you progress", line: "Plain-language updates, not jargon." },
  { title: "We launch and look after it", line: "Fixes after launch, then optional maintenance." },
];

export const TRUST = [
  { title: "Hyderabad, India", line: "Working with businesses across India." },
  { title: "A written agreement first", line: "You know what you own before work starts." },
  { title: "One person who knows your project", line: "Your messages get a real reply." },
  { title: "Honest demonstrations", line: "Our examples are labelled. Case studies will follow as clients allow." },
];

export const FAQ = [
  { q: "Do I need a technical brief?", a: "No. Most owners know what is slow, lost or painful. Choosing the right format is our job." },
  { q: "How much will it cost?", a: "We quote each project in INR after a short conversation. There are no preset price bands." },
  { q: "How long does a website take?", a: "It depends on the content and the number of pages. The written scope gives you the timeline." },
  { q: "Will I be able to update it myself?", a: "Yes, where it is agreed in your scope. We set that up and show you how." },
  { q: "Who owns the finished work?", a: "Ownership and licensing terms are set out plainly in the written agreement before work starts." },
  { q: "What happens after launch?", a: "We fix problems after launch, then offer a monthly maintenance plan if you want one." },
];

export const PROBLEMS = [
  { title: "Enquiries get missed.", line: "Every request gets an owner, a next step and a clear status.", Shot: RequestsShot },
  { title: "Everything is done by hand.", line: "Forms, sheets and messages connected, so the work moves without retyping.", Shot: FlowShot },
  { title: "Customers can’t find you, or don’t trust what they find.", line: "A site that answers their questions before they call, and loads fast on a phone.", Shot: SiteShot },
  { title: "Your old site doesn’t bring work.", line: "Rebuilt around what customers want to do, not around a template.", Shot: BeforeAfterShot },
];

export function HomeV3Body() {
  return (
    <>
      <Section id="what-we-build" labelledBy="build-heading" size="tight">
        <SectionHead id="build-heading" title="What we build" />
        <ul className="grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, line }) => (
            <li key={title} className="border-t-2 border-[var(--action-blue)] pt-[var(--space-2)]">
              <Icon className="h-6 w-6 text-[var(--action-blue)]" aria-hidden="true" />
              <h3 className="mt-[var(--space-2)] font-display text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
              <p className="type-copy-body mt-[var(--space-1)] text-[var(--text-secondary)]">{line}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="problems" labelledBy="problems-heading">
        <SectionHead id="problems-heading" title="Problems we solve" lead="Each one shown on the screen your team would actually use." />
        <div className="grid gap-[var(--space-4)] md:gap-[var(--space-5)]">
          {PROBLEMS.map(({ title, line, Shot }, i) => (
            <div key={title} className="grid items-center gap-[var(--space-3)] border-t border-[var(--border-subtle)] pt-[var(--space-4)] md:grid-cols-2 md:gap-[var(--space-5)]">
              <div className={i % 2 ? "md:order-2" : ""}>
                <h3 className="font-display text-2xl font-semibold leading-tight text-[var(--text-primary)]">{title}</h3>
                <p className="type-copy-body mt-[var(--space-2)] max-w-[var(--measure)] text-[var(--text-secondary)]">{line}</p>
              </div>
              <div>
                <Shot />
              </div>
            </div>
          ))}
        </div>
        <p className="type-caption mt-[var(--space-4)] text-[var(--text-secondary)]">Screens are illustrative demonstrations.</p>
      </Section>

      <Section id="how-it-works" labelledBy="how-heading" tone="surface">
        <SectionHead id="how-heading" title="How it works" />
        <ol className="v3-steps">
          {STEPS.map((s) => (
            <li key={s.title} className="v3-step">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="type-copy-body mt-[var(--space-1)] text-[var(--text-secondary)]">{s.line}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="why-ycn" labelledBy="why-heading">
        <SectionHead id="why-heading" title="Why YCN Labs" />
        <ul className="grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <li key={t.title} className="border-t-2 border-[var(--border-strong)] pt-[var(--space-2)]">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{t.title}</h3>
              <p className="type-copy-body mt-[var(--space-1)] text-[var(--text-secondary)]">{t.line}</p>
            </li>
          ))}
        </ul>
        {/* Owner decision 13 Nov 2026: a route to the evidence and to the person behind it. */}
        <div className="mt-[var(--space-3)] flex flex-wrap gap-x-[var(--space-3)]">
          {[
            { href: "/work", label: "See our work" },
            { href: "/about", label: "Who you’ll work with" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-[var(--link-text)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              {l.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Section>

      <Section id="questions" labelledBy="faq-heading" size="tight">
        <div className="mx-auto max-w-3xl">
          <SectionHead id="faq-heading" title="Questions" />
          <div className="v3-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section id="start" labelledBy="cta-heading" size="tight">
        <div className="grid items-center gap-[var(--space-3)] rounded-panel border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-[var(--space-4)] md:grid-cols-[1fr_auto] lg:p-[var(--space-5)]">
          <div>
            <h2 id="cta-heading" className="type-heading-section font-display text-[var(--text-primary)]">
              Tell us what is slow, lost or difficult today.
            </h2>
            <p className="type-copy-lead mt-[var(--space-2)] max-w-[var(--measure)] text-[var(--text-secondary)]">
              We&rsquo;ll tell you plainly what could help and what it would cost, before you commit to anything.
            </p>
          </div>
          <div className="flex flex-col gap-[var(--space-1)] sm:flex-row md:flex-col lg:flex-row">
            <YcnFlowButton href="/contact" variant="primary" size="lg" className="type-control min-h-[48px] w-full px-7 normal-case md:w-auto">
              Start a Project
            </YcnFlowButton>
            {/* Owner decision 13 Nov 2026: a secondary, visitor-started WhatsApp chat. */}
            <a
              href="https://wa.me/918341226694"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-control border border-[var(--border-strong)] px-6 font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--action-blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] md:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
