import React from 'react';
import Link from 'next/link';
import { HeroDeviceVisual } from './HeroDeviceVisual';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className={styles.heroWrap}>
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1 id="hero-title" tabIndex={-1}>
            Websites that earn trust.
            <span className={styles.accent}>Software that saves time.</span>
          </h1>
          <p className={styles.heroLead}>
            We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving.
          </p>
          <div className={styles.ctas}>
            <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">
              Start a Project <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.btn} href="/what-we-solve">
              See what we solve <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className={styles.reassure}>You don’t need a technical brief to start.</p>
          <p className={styles.heroInvite}>
            <a href="#showroom">Explore interactive examples ↓</a>
          </p>
        </div>

        <a
          className={styles.heroPreview}
          href="#showroom"
          aria-label="Example shop on a laptop and a phone. See the interactive examples below."
        >
          <HeroDeviceVisual />
        </a>
      </div>
    </section>
  );
}
