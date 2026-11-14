import type { Metadata } from "next";
import { Gauge, Accessibility, ShieldCheck, RefreshCcw, Boxes, FlaskConical, Activity, FileCheck } from "lucide-react";
import { YcnFlowButton } from "@/components/ui/ycn-flow-button";
import { PageIntro, Section, ShotRow, CtaBand } from "@/components/v3/Section";
import { ProtectShot } from "@/components/v3/Shots";

// YCN-V3-UI Day 3. Ratified H1, intro and eight practice areas kept, one line each.
export const metadata: Metadata = {
  title: "Engineering Practices — YCN Labs",
  description:
    "Simple for the user. Deliberate underneath. Technical choices and engineering practices used by YCN Labs.",
  alternates: {
    canonical: "https://ycnlabs.com/engineering",
  },
};

const PRACTICES = [
  { icon: Gauge, title: "Performance", line: "Keep important experiences responsive on real devices/networks." },
  { icon: Accessibility, title: "Accessibility", line: "Design and test so more people can complete the journey." },
  { icon: ShieldCheck, title: "Security", line: "Use appropriate boundaries, validation, secret handling and least privilege." },
  { icon: RefreshCcw, title: "Reliability", line: "Handle errors, retries, fallbacks and recovery deliberately." },
  { icon: Boxes, title: "Architecture", line: "Choose structure based on requirements, not fashion." },
  { icon: FlaskConical, title: "Testing", line: "Verify the behavior that matters instead of relying on visual confidence." },
  { icon: Activity, title: "Monitoring & operations", line: "Know when a production path fails and who is responsible." },
  { icon: FileCheck, title: "Handover", line: "Documentation, ownership and support follow the actual agreement." },
];

export default function EngineeringPage() {
  return (
    <>
      <PageIntro
        title="Simple for the user. Deliberate underneath."
        lead="Technical choices should follow the actual problem. Here is how we build, and what we can show for it."
      />
      <Section size="tight" labelledBy="practices-heading">
        <h2 id="practices-heading" className="sr-only">Practices</h2>
        <ul className="grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-4">
          {PRACTICES.map(({ icon: Icon, title, line }) => (
            <li key={title} className="border-t-2 border-[var(--border-strong)] pt-[var(--space-2)]">
              <Icon className="h-5 w-5 text-[var(--action-blue)]" aria-hidden="true" />
              <h3 className="mt-[var(--space-1)] font-display text-base font-semibold text-[var(--text-primary)]">{title}</h3>
              <p className="type-copy-body mt-1 text-[var(--text-secondary)]">{line}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section size="tight">
        <ShotRow title="How this site handles an enquiry" shot={<ProtectShot />} flip>
          <p>The form saves your enquiry before it says it was received. If our email fails, the enquiry is still kept, so it can be sent again. Pressing the button twice does not create a duplicate.</p>
        </ShotRow>
      </Section>
      <CtaBand id="eng-cta" title="Want the technical detail for your project?" lead="Ask us. We explain the choices in plain language.">
        <YcnFlowButton href="/contact" variant="primary" size="lg" className="type-control min-h-[48px] w-full px-7 normal-case md:w-auto">
          Start a Project
        </YcnFlowButton>
      </CtaBand>
    </>
  );
}
