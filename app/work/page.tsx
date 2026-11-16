import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { workStudies } from '@/lib/ycn-work-studies';
import { WorkVisual } from '@/components/work/WorkVisual';
import styles from '@/components/work/work.module.css';

export const metadata: Metadata = {
  title: 'Work & Evidence — YCN Labs',
  description:
    'We show our work honestly. How YCN Labs classifies client work, internal products, and concept builds.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <div className={styles.work}>
      {/* 1. Hero */}
      <section className={styles.hero} aria-labelledby="work-title">
        <div className={styles.container}>
          <p className={styles.eyebrow}>YCN LABS / WORK &amp; THINKING</p>
          <h1 id="work-title">
            We show our work honestly.
          </h1>
          <p className={styles.heroLead}>
            One project we are building. Three original, interactive concepts. See the decisions behind useful digital experiences—not invented client success stories.
          </p>
          <div className={styles.heroActions}>
            <a href="#work-studies" className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[var(--w-accent)] px-5 py-2.5 font-semibold text-[var(--w-actionText)] transition hover:opacity-90">
              Explore the work <ArrowDownRight size={16} strokeWidth={1.9} className="inline ml-1" aria-hidden="true" />
            </a>
            <Link href="/contact" className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--w-line)] bg-[var(--w-paper)] px-5 py-2.5 font-semibold text-[var(--w-ink)] transition hover:bg-[var(--w-surface)]">
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Portfolio Studies */}
      <section id="work-studies" className={styles.portfolioSection} aria-labelledby="work-studies-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>A CLOSER LOOK</p>
              <h2 id="work-studies-title">
                Four different problems.
                <br />
                Four considered approaches.
              </h2>
            </div>
            <p>
              Explore how a useful digital experience behaves. The labels explain what is internal development and what is an illustrative concept.
            </p>
          </div>

          <ul className={styles.grid}>
            {workStudies.map((study, index) => (
              <li key={study.slug} className={index === 0 ? styles.featureCard : styles.card}>
                <div className={styles.cardBody}>
                  <p className={styles.cardIndex}>{study.index} / {study.category}</p>
                  <span className={styles.status}>
                    {study.status === 'INTERNAL BUILD · IN DEVELOPMENT'
                      ? 'Internal build · In development'
                      : 'Studio concept'}
                  </span>
                  <h3>{study.heading}</h3>
                  <p>{study.lead}</p>
                  <Link
                    className="inline-flex min-h-[44px] items-center font-semibold text-[var(--w-accent)] hover:underline"
                    href={`/work/${study.slug}`}
                    aria-label={`Explore ${study.category.toLowerCase()}: ${study.heading}`}
                  >
                    Explore this case <ArrowUpRight size={16} strokeWidth={1.9} className="inline ml-1" aria-hidden="true" />
                  </Link>
                </div>
                <div className={styles.cardVisual}>
                  <WorkVisual scene={study.scene} />
                </div>
              </li>
            ))}

            {/* 5th Card: Direct Invitation */}
            <li className={styles.card}>
              <div className={styles.cardBody}>
                <h3>Have a project like this?</h3>
                <p>
                  Have an enquiry bottleneck or a manual process you want to automate? We begin with a written scope and quote in rupees.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center font-semibold text-[var(--w-accent)] hover:underline"
                >
                  Start a Project <ArrowUpRight size={16} strokeWidth={1.9} className="inline ml-1" aria-hidden="true" />
                </Link>
              </div>
              <div className={styles.cardVisual}>
                <div className={`${styles.visual} ${styles.visualInternal}`}>
                  <div className={styles.diagramHeader}>
                    <span>NEXT PROJECT</span>
                    <span>INVITATION</span>
                  </div>
                  <div className={styles.diagramChain}>
                    <span>Problem</span>
                    <ArrowRight size={16} strokeWidth={1.9} aria-hidden="true" />
                    <span>Scope</span>
                    <ArrowRight size={16} strokeWidth={1.9} aria-hidden="true" />
                    <span>Build</span>
                  </div>
                  <div className={styles.diagramNote}>
                    Written scope and fixed INR quote before work begins.
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <p className={styles.honesty}>
            We publish work when the scope, stage and evidence are clear. Each item is labelled as client work, an internal product or a concept build.
          </p>
        </div>
      </section>

      {/* 3. Closing Section */}
      <section className={styles.closing} aria-labelledby="work-close-heading">
        <div className={styles.container}>
          <div className={styles.closingGrid}>
            <div>
              <p className={styles.eyebrow}>YOUR SITUATION IS DIFFERENT</p>
              <h2 id="work-close-heading">
                Tell us what is difficult.
                <br />
                We will start there.
              </h2>
              <p>
                Not every business needs a custom system. A clearer page, a better spreadsheet or one well-designed workflow may be the right first step.
              </p>
            </div>
            <Link className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[var(--w-accent)] px-6 py-3 font-semibold text-[var(--w-actionText)] transition hover:opacity-90" href="/contact">
              Start a project <ArrowUpRight size={16} strokeWidth={1.9} className="inline ml-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
