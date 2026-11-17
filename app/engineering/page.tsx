import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Gauge, Accessibility, ShieldCheck, RefreshCcw, Boxes, FlaskConical, Activity, FileCheck, Database, MailCheck, ShieldAlert, Cpu } from "lucide-react";
import { EngineeringSimulator } from "@/components/inner/EngineeringSimulator";
import styles from "@/components/inner/inner-pages.module.css";

export const metadata: Metadata = {
  title: "Engineering Practices — YCN Labs",
  description:
    "What happens when something fails matters as much as when it works. Concrete engineering standards, reliable error handling, and test-verified code.",
  alternates: {
    canonical: "https://ycnlabs.com/engineering",
  },
};

const PROOF_POINTS = [
  {
    icon: Database,
    title: "Saved before \"thank you\"",
    desc: "The interface is designed to show success only after the enquiry is stored in the database, with no confirmation shown if storage fails.",
  },
  {
    icon: MailCheck,
    title: "Saved before notification email",
    desc: "The form is designed to save your enquiry before the notification email is sent, so that a failed email does not remove it.",
  },
  {
    icon: ShieldAlert,
    title: "Protected from misuse",
    desc: "The form incorporates rate limiting, honeypot fields, and input validation.",
  },
  {
    icon: FlaskConical,
    title: "Automated verification before merge",
    desc: "Each change goes through automated checks before it is merged: lint, type checks, unit tests and a production build. We also run browser tests on the main pages.",
  },
  {
    icon: Cpu,
    title: "Self-hosted fonts and assets",
    desc: "Fonts and files are served directly from the site itself. No external Google Fonts tracking or CDN single-points-of-failure.",
  },
];

const PRACTICES = [
  { icon: Gauge, title: "Performance", line: "Responsive interfaces built for mobile devices." },
  { icon: Accessibility, title: "Accessibility", line: "We design for keyboard use, reduced motion and readable colour contrast." },
  { icon: ShieldCheck, title: "Security", line: "Strict input validation with Zod and sanitized database parameters. Our code is scanned for passwords and keys before it is merged." },
  { icon: RefreshCcw, title: "Reliability", line: "Idempotent requests, transaction boundaries, and deliberate failure paths." },
  { icon: Boxes, title: "Architecture", line: "Standard Next.js with clean modular components rather than bloated framework stacks." },
  { icon: FlaskConical, title: "Automated Testing", line: "Continuous verification through Vitest unit tests, Playwright browser journeys, and type checks." },
  { icon: Activity, title: "Monitoring & Operations", line: "Documented recovery tools and procedures for failed notifications as agreed for your system." },
  { icon: FileCheck, title: "Transparent Handover", line: "Handover as listed in your agreement, including dependency licenses and operational notes." },
];

export default function EngineeringPage() {
  return (
    <div className={styles.pageWrap}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>YCN LABS / ENGINEERING</p>
          <h1>What happens when something fails matters as much as when it works.</h1>
          <p className={styles.heroLead}>
            Technical choices follow the actual problem. Here we explain how we choose technology, the practices behind this website, and how we check them before release.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        {/* Concrete Verified Proof Points */}
        <section aria-labelledby="proof-heading">
          <small className={styles.eyebrow}>VERIFIABLE ARCHITECTURE</small>
          <h2 id="proof-heading" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.8rem", letterSpacing: "-0.03em", margin: "6px 0 24px" }}>
            Five engineering rules grounded in our own code
          </h2>
          <div className={styles.engStudyGrid}>
            {PROOF_POINTS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className={styles.proofItem}>
                  <div className={styles.proofHeader}>
                    <Icon size={18} strokeWidth={1.8} style={{ color: "var(--action-blue)" }} aria-hidden="true" />
                    <h3>{p.title}</h3>
                  </div>
                  <p>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Simulator */}
        <EngineeringSimulator />

        {/* Eight Engineering Disciplines */}
        <section style={{ marginTop: "60px" }} aria-labelledby="practices-heading">
          <small className={styles.eyebrow}>ENGINEERING STANDARDS</small>
          <h2 id="practices-heading" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.8rem", letterSpacing: "-0.03em", margin: "6px 0 24px" }}>
            How we build for stability and longevity
          </h2>
          <div className={styles.engStudyGrid}>
            {PRACTICES.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className={styles.proofItem}>
                  <div className={styles.proofHeader}>
                    <Icon size={18} strokeWidth={1.8} style={{ color: "var(--action-blue)" }} aria-hidden="true" />
                    <h3>{p.title}</h3>
                  </div>
                  <p>{p.line}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing Action */}
        <section className={styles.ctaBand} aria-labelledby="eng-cta-heading">
          <div>
            <h2 id="eng-cta-heading">Want to see how we&apos;d approach your system?</h2>
            <p>
              Ask us any technical question about architecture, data safety, or hosting for your project.
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
