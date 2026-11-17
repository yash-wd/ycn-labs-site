import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SituationExplorer } from "@/components/inner/SituationExplorer";
import styles from "@/components/inner/inner-pages.module.css";

export const metadata: Metadata = {
  title: "What We Solve — YCN Labs",
  description:
    "Which part of your business is harder than it should be? Pick the situation that sounds familiar. We build websites, web apps, and practical automations.",
  alternates: {
    canonical: "https://ycnlabs.com/what-we-solve",
  },
};

export default function WhatWeSolvePage() {
  return (
    <div className={styles.pageWrap}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>YCN LABS / WHAT WE SOLVE</p>
          <h1>Which part of your business is harder than it should be?</h1>
          <p className={styles.heroLead}>
            You don&apos;t need to know what to ask for. Pick the situation that sounds familiar.
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <SituationExplorer />

        {/* Decision Triad: A page, a shared sheet, or custom software? */}
        <section className={styles.decisionGuide} aria-labelledby="decision-guide-heading">
          <h2 id="decision-guide-heading">A page, a shared sheet, or custom software?</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            The right tool depends on your team size, request volume, and where errors hurt the most:
          </p>
          <div className={styles.decisionCols}>
            <div className={styles.decisionCol}>
              <h3>A clear page</h3>
              <p>
                Best when information already exists but customers can&apos;t find it. Answering pricing, timing, and location upfront stops repetitive calls without building software.
              </p>
            </div>
            <div className={styles.decisionCol}>
              <h3>A shared spreadsheet</h3>
              <p>
                Best when handling fewer than 10 enquiries a week and one person manages follow-up. A well-organized, shared sheet is often all you need before custom tooling.
              </p>
            </div>
            <div className={styles.decisionCol}>
              <h3>Custom software</h3>
              <p>
                Best when multiple people need distinct roles, records change frequently across systems, or manual copying mistakes cost actual revenue and customer trust.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Action */}
        <section className={styles.ctaBand} aria-labelledby="solve-cta-heading">
          <div>
            <h2 id="solve-cta-heading">
              Sometimes the answer is a better spreadsheet.
              <br />
              We&apos;ll tell you when it is.
            </h2>
            <p>
              Tell us what is happening today in your business. We will suggest a practical first step.
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
