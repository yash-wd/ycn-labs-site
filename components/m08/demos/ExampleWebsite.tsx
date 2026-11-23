'use client';

import React, { useState, useRef } from 'react';
import { ExampleTabletFrame } from './ExampleDeviceFrames';
import styles from './ExampleDemos.module.css';

interface ServiceItem {
  name: string;
  description: string;
}

const WEB_SERVICES: ServiceItem[] = [
  {
    name: 'Plumbing',
    description: 'Leaking taps, blocked drains and pipe repairs.',
  },
  {
    name: 'Electrical',
    description: 'Wiring checks, switches and fittings.',
  },
  {
    name: 'Painting',
    description: 'Interior walls and touch-up work.',
  },
];

/**
 * Basin and tap vector illustration.
 * Accessible image text: "Illustration of a basin and tap" (v3 approved).
 */
function BasinAndTapArtwork() {
  return (
    <svg
      viewBox="0 0 570 395"
      role="img"
      aria-label="Illustration of a basin and tap"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wall04" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f9fdff" />
          <stop offset="1" stopColor="#bad3e5" />
        </linearGradient>
        <linearGradient id="steel04">
          <stop stopColor="#587996" />
          <stop offset="0.5" stopColor="#e5f1f8" />
          <stop offset="1" stopColor="#678ba5" />
        </linearGradient>
      </defs>
      <rect width="570" height="395" fill="url(#wall04)" />
      <path
        d="M0 102h570M0 204h570M0 306h570M110 0v395M225 0v395M340 0v395M455 0v395"
        stroke="#bcd5e7"
        strokeWidth="2"
        opacity="0.7"
      />
      <rect x="26" y="249" width="525" height="110" rx="11" fill="#99b7cd" />
      <rect x="52" y="241" width="463" height="72" rx="30" fill="#f1f8fc" stroke="#8ba8bd" strokeWidth="7" />
      <ellipse cx="285" cy="270" rx="156" ry="31" fill="#b4d4e8" opacity="0.7" />
      <path
        d="M230 253V140c0-37 31-67 69-67h66c32 0 50 23 50 51v43"
        fill="none"
        stroke="#436c8d"
        strokeWidth="25"
        strokeLinecap="round"
      />
      <path
        d="M230 253V140c0-37 31-67 69-67h66c32 0 50 23 50 51v43"
        fill="none"
        stroke="url(#steel04)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <rect x="397" y="158" width="36" height="17" rx="7" fill="#7297b2" />
      <path d="M414 180c-10 16-8 24 0 31 9-8 9-16 0-31Z" fill="#59b3df" />
      <rect x="200" y="251" width="63" height="24" rx="7" fill="#5d849d" />
      <rect x="178" y="244" width="24" height="9" rx="4" fill="#6286a1" />
      <rect x="42" y="339" width="489" height="43" rx="6" fill="#365671" opacity="0.72" />
      <circle cx="286" cy="279" r="10" fill="#6688a1" />
    </svg>
  );
}

/**
 * Decorative house SVG icon replacing bare text symbol ⌂ (v3 approved).
 */
function HomeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'inline-block', verticalAlign: '-1px' }}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function ExampleWebsite() {
  const [selectedService, setSelectedService] = useState<string>('Plumbing');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);

  const contactRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const homeRef = useRef<HTMLElement>(null);

  const scrollToSection = (section: string) => {
    setIsMenuOpen(false);
    if (section === 'home') {
      homeRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'services') {
      servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'contact') {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestVisitSubmit = () => {
    setSubmissionResult('Demo only. Nothing was submitted.');
  };

  return (
    <ExampleTabletFrame>
      <article
        className={styles.website}
        aria-label="Example website, shown on a landscape tablet or responsive screen"
      >
        {/* Top Header Bar */}
        <header className={styles.webTopbar}>
          <span className={styles.pBrand}>
            <HomeIcon />
            <span>Example Home Repairs</span>
          </span>

          <nav className={styles.webMenu} aria-label="Example site menu">
            <button type="button" onClick={() => scrollToSection('home')}>
              Home
            </button>
            <button type="button" onClick={() => scrollToSection('services')}>
              Services
            </button>
            <button type="button" onClick={() => scrollToSection('about')}>
              About
            </button>
            <button type="button" onClick={() => scrollToSection('contact')}>
              Contact
            </button>
          </nav>

          <button
            type="button"
            className={`${styles.pSecondary} ${styles.webResponsiveNav}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? 'Close menu' : 'Menu'}
          </button>
        </header>

        {/* Mobile Dropdown Navigation */}
        {isMenuOpen && (
          <div className={styles.webMenuMobile}>
            <button type="button" onClick={() => scrollToSection('home')}>
              Home
            </button>
            <button type="button" onClick={() => scrollToSection('services')}>
              Services
            </button>
            <button type="button" onClick={() => scrollToSection('about')}>
              About
            </button>
            <button type="button" onClick={() => scrollToSection('contact')}>
              Contact
            </button>
          </div>
        )}

        {/* Hero Section */}
        <section className={styles.webHero} id="web-home" ref={homeRef}>
          <div>
            <span className={styles.pKicker}>HOME REPAIRS · EXAMPLE</span>
            <h2>Need a repair at home? Ask for a visit.</h2>
            <p>
              Tell us what needs fixing and when suits you. We will get back to you to agree a time.
            </p>
            <button
              type="button"
              className={styles.pPrimary}
              onClick={() => scrollToSection('contact')}
            >
              Request a visit →
            </button>
          </div>
          <div className={styles.webGraphic}>
            <BasinAndTapArtwork />
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.webSection} id="web-services" ref={servicesRef}>
          <span className={styles.pKicker}>SERVICES</span>
          <h3>What we fix</h3>
          <div className={styles.webServices}>
            {WEB_SERVICES.map((s) => (
              <button
                key={s.name}
                type="button"
                className={styles.webService}
                onClick={() => setSelectedService(s.name)}
                aria-pressed={selectedService === s.name}
              >
                <strong>{s.name}</strong>
                <small>{s.description}</small>
              </button>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section
          className={`${styles.webSection} ${styles.webAbout}`}
          id="web-about"
          ref={aboutRef}
        >
          <span className={styles.pKicker}>ABOUT</span>
          <h3>About us</h3>
          <p className={styles.pMuted}>
            We are a small local team that handles everyday repairs at home.
          </p>
        </section>

        {/* Contact Section */}
        <section
          className={`${styles.webSection} ${styles.webContact}`}
          id="web-contact"
          ref={contactRef}
        >
          <div>
            <span className={styles.pKicker}>CONTACT</span>
            <h3>Request a visit</h3>
            <p className={styles.pMuted}>
              The quickest way to reach us is to request a visit.
              <br />
              <span className={styles.webHighlight}>Selected: {selectedService}</span>
            </p>
          </div>
          <button
            type="button"
            className={styles.pPrimary}
            onClick={handleRequestVisitSubmit}
          >
            Request a visit
          </button>
        </section>

        {/* Local-only submission result announcement */}
        <div className={styles.webResult} role="status" aria-live="polite">
          {submissionResult}
        </div>
      </article>
    </ExampleTabletFrame>
  );
}
