import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, ShieldCheck, FileText, Scale } from "lucide-react";
import styles from "@/components/inner/inner-pages.module.css";

export const metadata: Metadata = {
  title: "About — YCN Labs",
  description:
    "The work has someone accountable behind it. Learn about YCN Labs, our founder-led approach, and our working commitments.",
  alternates: {
    canonical: "https://ycnlabs.com/about",
  },
};

/** Owner decision (10 Nov 2026): the photo slot stays hidden until a real photo exists. */
const FOUNDER_PHOTO: string | null = null;

const PRINCIPLES = [
  {
    icon: FileText,
    title: "Scope before code",
    desc: "We write the scope before the code. Know exactly what is included and agreed before development begins.",
  },
  {
    icon: ShieldCheck,
    title: "Your accounts stay yours",
    desc: "No proprietary lock-in. You own your domain, your accounts, your data, and the code you pay for.",
  },
  {
    icon: CheckCircle2,
    title: "Concepts are labelled as concepts",
    desc: "We do not present concept demonstrations as client case studies or claim unproven marketing results.",
  },
  {
    icon: Scale,
    title: "Advice before sales",
    desc: "We would rather lose a job than oversell it. If a shared spreadsheet or an existing tool is enough, we say so.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.pageWrap}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>YCN LABS / ABOUT</p>
          <h1>The work has someone accountable behind it.</h1>
          <p className={styles.heroLead}>
            YCN Labs is an independent software and web studio built around clear conversations, useful design and maintainable delivery.
          </p>
        </div>
      </header>

      <main className={styles.container}>
        {/* Founder & Studio Sections */}
        <div className={styles.splitPanels}>
          <div className={styles.infoBox}>
            <span className={styles.eyebrow}>FOUNDER</span>
            <h2 id="founder-heading" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.4rem", margin: "4px 0 12px" }}>
              Yaseen
            </h2>
            <p style={{ marginBottom: "14px" }}>
              I&apos;m Yaseen. Most people call me Yash. I started YCN Labs in Hyderabad to help small and growing businesses in India build websites and web applications that fit the way they work.
            </p>
            <p>
              You don&apos;t need a technical brief to talk to me. Tell me where an enquiry gets missed or what you keep doing by hand, and we&apos;ll work out what&apos;s worth building first.
            </p>
            {FOUNDER_PHOTO ? (
              <div style={{ position: "relative", aspectRatio: "4/5", marginTop: "20px", borderRadius: "14px", overflow: "hidden" }}>
                <Image src={FOUNDER_PHOTO} alt="Yaseen, founder of YCN Labs" fill sizes="320px" style={{ objectFit: "cover" }} />
              </div>
            ) : null}
          </div>

          <div className={styles.infoBox}>
            <span className={styles.eyebrow}>STUDIO STRUCTURE</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.4rem", margin: "4px 0 12px" }}>
              Founder-led studio
            </h2>
            <p style={{ marginBottom: "14px" }}>
              YCN Labs is a founder-led studio. I lead every project myself. When a project needs more hands, we bring in specialists, and you are told who is doing what before work starts.
            </p>
            <p>
              You communicate directly with the person responsible for the delivery. There are no account managers in the middle and no unexpected subcontractors.
            </p>
            <p style={{ marginTop: "14px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
              We care about clarity on the surface and engineering discipline underneath. We do not present concepts as client work or future capabilities as services already proven.
            </p>
          </div>
        </div>

        {/* Operating Principles */}
        <section style={{ marginTop: "50px" }} aria-labelledby="principles-heading">
          <small className={styles.eyebrow}>HOW WE OPERATE</small>
          <h2 id="principles-heading" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.8rem", letterSpacing: "-0.03em", margin: "6px 0 24px" }}>
            Four commitments we make to every client
          </h2>
          <div className={styles.engStudyGrid}>
            {PRINCIPLES.map((p) => {
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

        {/* Closing Action */}
        <section className={styles.ctaBand} aria-labelledby="about-cta-heading">
          <div>
            <h2 id="about-cta-heading">Tell me what you&apos;re trying to make easier.</h2>
            <p>
              A short description of where your day gets slowed down is all we need to start.
            </p>
          </div>
          <Link href="/contact" className={styles.ctaButton}>
            Tell me what you&apos;re trying to make easier <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </section>
      </main>
    </div>
  );
}
