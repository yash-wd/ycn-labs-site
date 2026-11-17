import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, FileText, Smartphone, Laptop, Key, ShieldCheck } from "lucide-react";
import styles from "@/components/inner/inner-pages.module.css";

export const metadata: Metadata = {
  title: "How We Work — YCN Labs",
  description:
    "From first conversation to a handover you can understand. Six clear steps from problem to delivery with a written scope and a quote in rupees before any work starts, and working previews.",
  alternates: {
    canonical: "https://ycnlabs.com/how-we-work",
  },
};

const STEPS = [
  {
    num: "01",
    title: "First conversation",
    desc: "We ask what happens today, what should change and who will use it.",
    get: "A plain-language summary of what we heard and the smallest useful first scope.",
    icon: FileText,
  },
  {
    num: "02",
    title: "Written scope and quote",
    desc: "What is included, what is not, the price and the payment stages.",
    get: "A written scope, a quote in rupees and clear milestones before any work starts.",
    icon: CheckCircle2,
  },
  {
    num: "03",
    title: "Previews",
    desc: "You open a working link, not a status report.",
    get: "Private preview links you can open directly on your browser and try out.",
    icon: Laptop,
  },
  {
    num: "04",
    title: "Testing",
    desc: "On your phone, with your content.",
    get: "Verification that the actual user journeys, validation rules, and forms work as agreed.",
    icon: Smartphone,
  },
  {
    num: "05",
    title: "Handover",
    desc: "Your accounts, written notes, and what the agreement says you receive.",
    get: "Direct access to your domain, accounts, documentation, and handover as listed in your agreement.",
    icon: Key,
  },
  {
    num: "06",
    title: "After launch",
    desc: "Fixes and support as written in your agreement.",
    get: "Post-launch warranty fixes and agreed support, with optional maintenance scope.",
    icon: ShieldCheck,
  },
];

export default function HowWeWorkPage() {
  return (
    <div className={styles.pageWrap}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>YCN LABS / HOW WE WORK</p>
          <h1>From first conversation to a handover you can understand.</h1>
          <p className={styles.heroLead}>
            You should know what we&apos;re building, when you&apos;ll review it and what you receive before the work begins.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <ol className={styles.stepsList} aria-label="The six delivery steps">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.num} className={styles.stepCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span className={styles.stepNum}>{s.num} / STEP</span>
                  <Icon size={18} strokeWidth={1.8} style={{ color: "var(--action-blue)" }} aria-hidden="true" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className={styles.stepGet}>
                  <strong>You get:</strong> {s.get}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Expectation Panels */}
        <section className={styles.splitPanels} aria-label="Expectations and adjustments">
          <div className={styles.infoBox}>
            <h3>What we need from you</h3>
            <p>
              Your content and photos, one person who decides, and feedback within the agreed time. Clear inputs keep projects moving without surprise delays.
            </p>
          </div>
          <div className={styles.infoBox}>
            <h3>What if the plan changes?</h3>
            <p>
              New work is quoted in writing before we start it. Nothing is added silently, and you always decide whether an addition is worth the extra scope.
            </p>
          </div>
        </section>

        {/* Closing Action */}
        <section className={styles.ctaBand} aria-labelledby="work-cta-heading">
          <div>
            <h2 id="work-cta-heading">Start with the problem, not the technology.</h2>
            <p>
              Tell us what is difficult today. We will help you define the smallest useful first version.
            </p>
          </div>
          <Link href="/contact" className={styles.ctaButton}>
            Start a Project <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
