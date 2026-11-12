import Image from "next/image";
import { Globe, LayoutDashboard, Workflow, Wrench } from "lucide-react";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { Section, SectionHead } from "./Section";

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
  { q: "Will I be able to update it myself?", a: "Yes, for the content you need to change. We set that up and show you how." },
  { q: "Who owns the finished work?", a: "Ownership and licensing terms are set out plainly in the written agreement before work starts." },
  { q: "What happens after launch?", a: "We fix problems after launch, then offer a monthly maintenance plan if you want one." },
];

function RequestsShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-shot-title"><span>Requests</span><small>Today</small></div>
      <div className="v3-row v3-row-new"><span className="v3-av">PS</span><span className="v3-who">Priya S.</span><span className="v3-req">Catering for 40</span><span className="v3-pills"><span className="v3-pill v3-pill-new">New</span></span></div>
      <div className="v3-row"><span className="v3-av">RK</span><span className="v3-who">Ravi K.</span><span className="v3-req">AC repair quote</span><span className="v3-pills"><span className="v3-pill">Assigned · Arjun</span></span></div>
      <div className="v3-row"><span className="v3-av">MT</span><span className="v3-who">Meena T.</span><span className="v3-req">200 boxes</span><span className="v3-pills"><span className="v3-pill">Call back today</span></span></div>
    </div>
  );
}

function FlowShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-shot-title"><span>New order</span><small>Automatic</small></div>
      <div className="v3-flow">
        <div className="v3-flow-step"><b>1</b>Order form received</div>
        <div className="v3-flow-arrow" />
        <div className="v3-flow-step"><b>2</b>Row added to the orders sheet</div>
        <div className="v3-flow-arrow" />
        <div className="v3-flow-step"><b>3</b>WhatsApp message to dispatch</div>
      </div>
    </div>
  );
}

function SiteShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="v3-site">
        <div className="v3-site-bar"><i /><i /><i /><span>yourbusiness.in</span></div>
        <div className="v3-site-body">
          <strong>What you do, in one clear line.</strong>
          <span>Open today 9 am – 9 pm · Near the main market</span>
          <div className="v3-site-actions"><span>Call now</span><span>WhatsApp</span><span>Directions</span></div>
        </div>
      </div>
    </div>
  );
}

function BeforeAfterShot() {
  return (
    <div className="v3-shot" aria-hidden="true">
      <div className="grid grid-cols-2 gap-3">
        {[
          { src: "/media/messy_desk_books_papers_iphone.jpg", label: "Before: scattered" },
          { src: "/media/clean_organised_laptop_desk.jpg", label: "After: organised" },
        ].map((p) => (
          <figure key={p.src} className="m-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
              <Image src={p.src} alt="" fill sizes="(max-width: 900px) 45vw, 260px" className="object-cover" />
            </div>
            <figcaption className="mt-1 text-[11px] text-[#94A3B8]">{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

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
          <YcnFlowButton href="/contact" variant="primary" size="lg" className="type-control min-h-[48px] w-full px-7 normal-case md:w-auto">
            Start a Project
          </YcnFlowButton>
        </div>
      </Section>
    </>
  );
}
