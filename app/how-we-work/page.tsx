import type { Metadata } from "next";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { PageIntro, Section, ShotRow, CtaBand } from "@/components/v3/Section";
import { UpdateShot } from "@/components/v3/Shots";

// YCN-V3-UI Day 3 (COPY-V3.md, Owner-approved base). Ratified H1 kept.
export const metadata: Metadata = {
  title: "How We Work — YCN Labs",
  description:
    "You know your business. We know technology. Four clear steps from your problem to a working website or tool: talk, agree the scope and price, build, then launch and hand over.",
  alternates: {
    canonical: "https://ycnlabs.com/how-we-work",
  },
};

const HOW_STEPS = [
  { title: "Tell us the problem", body: "A short call or message. You describe your day; we ask questions.", get: "a plain summary of what we heard." },
  { title: "Scope and price", body: "Nothing starts until you agree.", get: "a written scope, a price in INR and a timeline." },
  { title: "Build and show", body: "You see working previews, not just reports.", get: "plain-language updates and a say at each step." },
  { title: "Launch and look after", body: "We go live together.", get: "a handover of what you own, fixes after launch, and an optional maintenance plan." },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageIntro
        title="You know your business. We know technology."
        lead="Four steps, and you see progress at each one. You don’t need to arrive with a technical specification."
      />
      <Section tone="surface" labelledBy="steps-heading">
        <h2 id="steps-heading" className="sr-only">The four steps</h2>
        <ol className="v3-steps">
          {HOW_STEPS.map((s) => (
            <li key={s.title} className="v3-step">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="type-copy-body mt-[var(--space-1)] text-[var(--text-secondary)]">{s.body}</p>
              <p className="type-copy-body mt-[var(--space-1)] text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">You get:</strong> {s.get}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section size="tight">
        <ShotRow title="What we need from you" shot={<UpdateShot />}>
          <p>Someone who can answer questions, your existing content and logo, and decisions within a day or two. Each week you get a short update like this one.</p>
        </ShotRow>
      </Section>
      <CtaBand id="how-cta" title="Start with the problem, not the technology.">
        <YcnFlowButton href="/contact" variant="primary" size="lg" className="type-control min-h-[48px] w-full px-7 normal-case md:w-auto">
          Start a Project
        </YcnFlowButton>
      </CtaBand>
    </>
  );
}
