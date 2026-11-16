"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

type SceneType = "website" | "app" | "automation";

interface SceneMeta {
  title: string;
  tagline: string;
  description: string;
}

const SCENE_META: Record<SceneType, SceneMeta> = {
  website: {
    title: "Websites",
    tagline: "Look credible in five seconds.",
    description: "A clear digital first impression, built around your real customers.",
  },
  app: {
    title: "Web apps",
    tagline: "One place for every request.",
    description: "Structured requests and clear ownership for your team.",
  },
  automation: {
    title: "Automation",
    tagline: "Stop typing it twice.",
    description: "Connect incoming forms directly to the right person and record.",
  },
};

/* -------------------------------------------------------------------------- */
/* SCENE 1: REALISTIC MINI BUSINESS WEBSITE (IN CODE)                         */
/* -------------------------------------------------------------------------- */
function RealisticWebsiteDemo() {
  return (
    <div className="ycnr-scene" id="scene-website">
      <div className="ycnr-labelrow">
        <b>01 / A CLEAR FIRST IMPRESSION</b>
        <span>Look credible in five seconds</span>
      </div>

      <div className="ycnr-browser" aria-label="Illustrative healthcare business website">
        <div className="ycnr-browser-head" aria-hidden="true">
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-url">metro-diagnostics.in / full-body-checkup</span>
        </div>

        <div className="ycnr-site-realistic">
          {/* Mini Nav */}
          <div className="ycnr-mini-nav" aria-hidden="true">
            <div className="ycnr-mini-brand">
              <span className="ycnr-mini-logo-dot" />
              <strong>METRO DIAGNOSTICS</strong>
            </div>
            <div className="ycnr-mini-links">
              <span>Tests</span>
              <span>Home Visit</span>
              <span className="ycnr-mini-nav-btn">Book Scan ↗</span>
            </div>
          </div>

          {/* Mini Hero */}
          <div className="ycnr-mini-hero">
            <span className="ycnr-mini-badge">NABL ACCREDITED LAB · HYDERABAD</span>
            <h4 className="ycnr-mini-title">
              Diagnostic Care You Can Trust at Home.
            </h4>
            <p className="ycnr-mini-sub">
              Certified phlebotomists at your doorstep in 60 minutes. Verified digital reports delivered via WhatsApp the same day.
            </p>
            <div className="ycnr-mini-cta-row">
              <span className="ycnr-mini-primary-btn">Book Home Collection ↗</span>
              <span className="ycnr-mini-secondary-btn">View Health Packages</span>
            </div>
          </div>

          {/* Mini Service Cards */}
          <div className="ycnr-mini-cards">
            <div className="ycnr-mini-card">
              <div className="ycnr-mini-card-head">
                <strong>Executive Health Panel</strong>
                <span className="ycnr-mini-save">Save 40%</span>
              </div>
              <p>76 Parameters · Complete Blood, Liver, Kidney &amp; Thyroid Profile</p>
              <div className="ycnr-mini-card-foot">
                <span className="ycnr-mini-price">₹1,499 <small>₹2,500</small></span>
                <span className="ycnr-mini-add">Select +</span>
              </div>
            </div>

            <div className="ycnr-mini-card">
              <div className="ycnr-mini-card-head">
                <strong>Diabetes &amp; Heart Screen</strong>
                <span className="ycnr-mini-save">Popular</span>
              </div>
              <p>HbA1c, Lipid Profile, Fasting Sugar &amp; Cardiac Risk Factor</p>
              <div className="ycnr-mini-card-foot">
                <span className="ycnr-mini-price">₹899 <small>₹1,400</small></span>
                <span className="ycnr-mini-add">Select +</span>
              </div>
            </div>
          </div>

          {/* Floating Confirmation Pill */}
          <div className="ycnr-mini-live-pill" aria-hidden="true">
            <span className="ycnr-pulse-green" />
            <span>Sample collected for Rahul K. · Report arriving in 3.5 hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SCENE 2: REALISTIC OPERATIONS & REQUEST PORTAL (IN CODE)                  */
/* -------------------------------------------------------------------------- */
function RealisticWebAppDemo() {
  return (
    <div className="ycnr-scene" id="scene-app">
      <div className="ycnr-labelrow">
        <b>02 / WORK IN ONE PLACE</b>
        <span>One place for every request</span>
      </div>

      <div className="ycnr-browser" aria-label="Illustrative operational request management web app">
        <div className="ycnr-browser-head" aria-hidden="true">
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-url">ops.citylogistics.in / dispatch-queue</span>
        </div>

        <div className="ycnr-app-realistic">
          {/* Top Operational Bar */}
          <div className="ycnr-app-topbar">
            <div>
              <strong className="ycnr-app-company">FieldOps Dispatch</strong>
              <span className="ycnr-app-active-tag">🟢 8 Teams Active</span>
            </div>
            <div className="ycnr-app-filter-tabs">
              <span className="ycnr-app-tab active">All (12)</span>
              <span className="ycnr-app-tab">Urgent (2)</span>
              <span className="ycnr-app-tab">In Transit (5)</span>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="ycnr-app-metrics-strip">
            <div className="ycnr-metric-box">
              <span className="ycnr-metric-label">Pending Dispatch</span>
              <span className="ycnr-metric-val">3</span>
            </div>
            <div className="ycnr-metric-box">
              <span className="ycnr-metric-label">In Transit</span>
              <span className="ycnr-metric-val">5</span>
            </div>
            <div className="ycnr-metric-box">
              <span className="ycnr-metric-label">Avg Resolution</span>
              <span className="ycnr-metric-val">42m</span>
            </div>
          </div>

          {/* Live Request Queue */}
          <div className="ycnr-app-table">
            <div className="ycnr-table-row">
              <div className="ycnr-row-left">
                <span className="ycnr-id">#WO-9042</span>
                <div>
                  <strong>Cold-Chain Pharma Delivery</strong>
                  <small>Apollo Med Supply (Gachibowli) · Tech: Ramesh V.</small>
                </div>
              </div>
              <div className="ycnr-row-right">
                <span className="ycnr-badge-urgent">URGENT</span>
                <span className="ycnr-eta">ETA 18m</span>
              </div>
            </div>

            <div className="ycnr-table-row">
              <div className="ycnr-row-left">
                <span className="ycnr-id">#WO-9039</span>
                <div>
                  <strong>Substation Transformer Overhaul</strong>
                  <small>Schneider Electric Unit 3 · Tech: Imran S.</small>
                </div>
              </div>
              <div className="ycnr-row-right">
                <span className="ycnr-badge-progress">ON SITE</span>
                <span className="ycnr-eta">Started 45m ago</span>
              </div>
            </div>

            <div className="ycnr-table-row">
              <div className="ycnr-row-left">
                <span className="ycnr-id">#WO-9031</span>
                <div>
                  <strong>Regional Branch Document Sync</strong>
                  <small>HDFC Regional Hub · Tech: Kiran P.</small>
                </div>
              </div>
              <div className="ycnr-row-right">
                <span className="ycnr-badge-done">DELIVERED</span>
                <span className="ycnr-eta">Signed (OTP)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SCENE 3: REALISTIC INTAKE & DISPATCH AUTOMATION (IN CODE)                 */
/* -------------------------------------------------------------------------- */
function RealisticAutomationDemo() {
  return (
    <div className="ycnr-scene" id="scene-automation">
      <div className="ycnr-labelrow">
        <b>03 / LESS REPETITION</b>
        <span>Stop typing it twice</span>
      </div>

      <div className="ycnr-browser" aria-label="Illustrative automated workflow pipeline">
        <div className="ycnr-browser-head" aria-hidden="true">
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-url">pipeline.ycnlabs.com / live-intake</span>
        </div>

        <div className="ycnr-flow-realistic">
          <div className="ycnr-pipeline-steps">
            {/* Step 1: Inbound Lead */}
            <div className="ycnr-pipeline-card">
              <div className="ycnr-card-head">
                <span className="ycnr-step-num">01 / INTAKE</span>
                <span className="ycnr-step-pill">Website Form</span>
              </div>
              <div className="ycnr-card-body">
                <strong>Enquiry from Sunita Rao (Managing Director, Rao Logistics)</strong>
                <p>Requirement: Automated Invoice Generation &amp; WhatsApp Dispatch</p>
                <div className="ycnr-card-status">
                  <span className="ycnr-check">✓</span>
                  <span>Form validated &amp; sanitized (0.04s)</span>
                </div>
              </div>
            </div>

            {/* Connecting Signal Arrow 1 */}
            <div className="ycnr-pipeline-arrow" aria-hidden="true">
              <div className="ycnr-arrow-pulse" />
              <span>Automatic Webhook · Instant Payload</span>
              <div className="ycnr-arrow-line">↓</div>
            </div>

            {/* Step 2: Structured Storage */}
            <div className="ycnr-pipeline-card">
              <div className="ycnr-card-head">
                <span className="ycnr-step-num">02 / DATABASE &amp; CRM</span>
                <span className="ycnr-step-pill">PostgreSQL Engine</span>
              </div>
              <div className="ycnr-card-body">
                <strong>Row #341 Created · Deduplicated by PAN/Mobile</strong>
                <p>Unique contact verification passed. Stored with AES-256 encryption.</p>
                <div className="ycnr-card-status">
                  <span className="ycnr-check">✓</span>
                  <span>Record persisted · Assigned to: Yash (Lead Engineer)</span>
                </div>
              </div>
            </div>

            {/* Connecting Signal Arrow 2 */}
            <div className="ycnr-pipeline-arrow" aria-hidden="true">
              <div className="ycnr-arrow-pulse" />
              <span>Multi-Channel Dispatcher</span>
              <div className="ycnr-arrow-line">↓</div>
            </div>

            {/* Step 3: Instant Owner Alert */}
            <div className="ycnr-pipeline-card highlight">
              <div className="ycnr-card-head">
                <span className="ycnr-step-num">03 / INSTANT DISPATCH</span>
                <span className="ycnr-step-pill cyan">WhatsApp &amp; Email</span>
              </div>
              <div className="ycnr-card-body">
                <div className="ycnr-whatsapp-bubble">
                  <div className="ycnr-wa-head">📱 WhatsApp Notification to Founder</div>
                  <p>
                    &quot;🚨 <strong>New Project:</strong> Sunita Rao requested Invoice Automation. Tap to open project brief or call customer directly.&quot;
                  </p>
                </div>
                <div className="ycnr-card-status">
                  <span className="ycnr-check">✓</span>
                  <span>Delivered to mobile in 0.38s total · Zero manual data entry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN HOMEPAGE R2 COMPONENT                                                 */
/* -------------------------------------------------------------------------- */
export function HomepageR2() {
  const [activeScene, setActiveScene] = useState<SceneType>("website");
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sceneWrapRef = useRef<HTMLDivElement>(null);

  // Purposeful, lightweight entrance choreography with GSAP
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scene transition animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sceneWrapRef.current) return;

    gsap.fromTo(
      sceneWrapRef.current,
      { opacity: 0.6, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [activeScene]);

  return (
    <div className="ycnr" data-ycn-prototype="R2">
      {/* 1. HERO SECTION */}
      <section
        className="ycnr-hero"
        id="hero-foundation-root"
        aria-labelledby="hero-heading"
        ref={heroRef}
      >
        <div className="ycnr-container ycnr-hero-grid">
          {/* Left Column: Bold Narrative */}
          <div id="hero-narrative-col">
            <div className="ycnr-kicker">
              Business websites · Web apps · Automation
            </div>
            <h1 className="ycnr-heading" id="hero-heading" ref={headingRef}>
              Websites that build trust.
              <br />
              <span className="ycnr-accent">Software that saves time.</span>
            </h1>
            <p className="ycnr-lead">
              We build websites, web apps and automations for growing businesses.
              Clear for your customers. Simple for your team.
            </p>
            <div className="ycnr-cta-row">
              <Link
                id="hero-primary-cta"
                className="ycnr-cta ycnr-cta-primary"
                href="/contact"
              >
                Start a project{" "}
                <span aria-hidden="true" className="ycnr-cta-arrow">
                  ↗
                </span>
              </Link>
              <Link
                id="hero-secondary-cta"
                className="ycnr-cta ycnr-cta-outline"
                href="#what-we-build"
              >
                Explore what we build
              </Link>
            </div>
            <p className="ycnr-reassure">
              <strong>No technical brief needed.</strong> Start with the problem.
            </p>
          </div>

          {/* Right Column: Interactive 3-Service Showcase */}
          <div id="hero-media-layer" className="ycnr-stage-area">
            <div className="ycnr-showcase">
              <div className="ycnr-showcase-top">
                <strong>See what we can build</strong>
                <small>Choose an example</small>
              </div>

              {/* 3 Interactive Tabs */}
              <div
                className="ycnr-switch"
                role="group"
                aria-label="Explore examples of YCN Labs services"
              >
                <button
                  type="button"
                  data-scene="website"
                  aria-pressed={activeScene === "website"}
                  onClick={() => setActiveScene("website")}
                >
                  <span className="ycnr-tab-title">Websites</span>
                  <small className="ycnr-tab-sub">Look credible in 5s</small>
                </button>
                <button
                  type="button"
                  data-scene="app"
                  aria-pressed={activeScene === "app"}
                  onClick={() => setActiveScene("app")}
                >
                  <span className="ycnr-tab-title">Web apps</span>
                  <small className="ycnr-tab-sub">Work in one place</small>
                </button>
                <button
                  type="button"
                  data-scene="automation"
                  aria-pressed={activeScene === "automation"}
                  onClick={() => setActiveScene("automation")}
                >
                  <span className="ycnr-tab-title">Automation</span>
                  <small className="ycnr-tab-sub">Stop typing twice</small>
                </button>
              </div>

              {/* Dynamic Interactive Stage */}
              <div
                className="ycnr-scene-wrap"
                ref={sceneWrapRef}
                role="region"
                aria-label={`${SCENE_META[activeScene].title} — illustrative concept demonstration`}
              >
                {activeScene === "website" && <RealisticWebsiteDemo />}
                {activeScene === "app" && <RealisticWebAppDemo />}
                {activeScene === "automation" && <RealisticAutomationDemo />}
              </div>

              {/* Stage Outcome Footer */}
              <div className="ycnr-stage-foot">
                <span id="stage-outcome">
                  <strong>{SCENE_META[activeScene].tagline}</strong>
                  <br />
                  {SCENE_META[activeScene].description}
                </span>
                <span className="ycnr-proof-label">CONCEPT · NOT CLIENT WORK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE BUILD (Bento Services) */}
      <section
        id="what-we-build"
        className="ycnr-section alt"
        aria-labelledby="ycnr-build-heading"
      >
        <div className="ycnr-container">
          <div className="ycnr-split-head">
            <div>
              <p className="ycnr-kicker">What we build</p>
              <h2 id="ycnr-build-heading" className="ycnr-h2">
                Clear for your customers.
                <br />
                Useful for your team.
              </h2>
            </div>
            <p className="ycnr-section-lead">
              Look professional. Be found. Be easy to reach. The right digital tools
              should remove friction—not add another complicated system to manage.
            </p>
          </div>
          <div className="ycnr-offers">
            <Link className="ycnr-offer" href="/contact">
              <span className="ycnr-offer-num">01 / BUSINESS WEBSITES</span>
              <span className="ycnr-offer-icon" aria-hidden="true">
                ↗
              </span>
              <h3>Make a strong first impression.</h3>
              <p>
                Business websites that explain what you offer and make contacting
                you easy.
              </p>
            </Link>
            <Link className="ycnr-offer" href="/contact">
              <span className="ycnr-offer-num">02 / WEB APPLICATIONS</span>
              <span className="ycnr-offer-icon" aria-hidden="true">
                ▦
              </span>
              <h3>Bring the work together.</h3>
              <p>
                Useful web apps that bring requests, people and next steps
                together.
              </p>
            </Link>
            <Link className="ycnr-offer" href="/contact">
              <span className="ycnr-offer-num">03 / AUTOMATION</span>
              <span className="ycnr-offer-icon" aria-hidden="true">
                ⇢
              </span>
              <h3>Less copying. More doing.</h3>
              <p>
                Practical automations for the routine steps your team does again
                and again.
              </p>
            </Link>
          </div>
          <p className="ycnr-understated">
            Need support after launch? We also offer maintenance under an agreed
            scope.
          </p>
        </div>
      </section>

      {/* 3. HOW WE WORK (Step-by-Step Delivery) */}
      <section
        className="ycnr-section"
        id="how-it-works"
        aria-labelledby="ycnr-process-heading"
      >
        <div className="ycnr-container">
          <div className="ycnr-split-head">
            <div>
              <p className="ycnr-kicker">How we work</p>
              <h2 id="ycnr-process-heading" className="ycnr-h2">
                A clear plan.
                <br />
                From day one.
              </h2>
            </div>
            <p className="ycnr-section-lead">
              A practical process that starts with your business, not a
              technology sales pitch.
            </p>
          </div>
          <ol className="ycnr-numbergrid">
            <li>
              <span>01 / UNDERSTAND</span>
              <h3>Talk through the problem.</h3>
              <p>
                Tell us what is difficult today. No technical language needed.
              </p>
            </li>
            <li>
              <span>02 / SHOW</span>
              <h3>See the plan take shape.</h3>
              <p>
                Agree on the scope, see the design, and know the cost before work
                begins.
              </p>
            </li>
            <li>
              <span>03 / DELIVER</span>
              <h3>Build, test, hand over.</h3>
              <p>
                Review progress, check what matters, and receive the agreed
                deliverables.
              </p>
            </li>
          </ol>
          <p className="ycnr-understated">
            Concept demonstrations are clearly labelled; we do not present them as
            client results.
          </p>
        </div>
      </section>

      {/* 4. TRUST & ACCOUNTABILITY (One Person. Full Responsibility.) */}
      <section
        className="ycnr-section ycnr-trust-section"
        id="why-ycn"
        aria-labelledby="ycnr-trust-heading"
      >
        <div className="ycnr-container">
          <div className="ycnr-split-head">
            <div>
              <p className="ycnr-kicker">Accountability</p>
              <h2 className="ycnr-h2" id="ycnr-trust-heading">
                One person.
                <br />
                Full responsibility.
              </h2>
            </div>
            <p className="ycnr-section-lead">
              You work directly with the founder and engineer building your
              product. No middle managers. No lost context.
            </p>
          </div>
          <div className="ycnr-trust-layout">
            <div className="ycnr-trust-feature">
              <span className="ycnr-trust-overline">Who you work with</span>
              <div className="ycnr-trust-glyph" aria-hidden="true">
                YCN<span>•</span>
              </div>
              <h3>Talk directly with the person building your project.</h3>
              <p>
                Understand the proposal, see what is being made, and know the next
                step.
              </p>
              <Link href="/about">Meet the founder ↗</Link>
            </div>
            <div className="ycnr-trust-notes">
              <div>
                <span>01</span>
                <div>
                  <h3>Agree on the scope.</h3>
                  <p>Know what is included before development begins.</p>
                </div>
              </div>
              <div>
                <span>02</span>
                <div>
                  <h3>Review the work.</h3>
                  <p>
                    See progress and ask questions without needing technical
                    language.
                  </p>
                </div>
              </div>
              <div>
                <span>03</span>
                <div>
                  <h3>See honest examples.</h3>
                  <p>
                    Concepts are labelled as concepts—not passed off as client
                    results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="ycnr-faq-mini">
            <h3>Before we talk</h3>
            <div>
              <details>
                <summary>Do I need a technical brief?</summary>
                <p>
                  No. Explain what is difficult today and what you would like to
                  improve.
                </p>
              </details>
              <details>
                <summary>How do we agree on the cost?</summary>
                <p>
                  We discuss the scope, then provide a written quote in INR
                  before work starts.
                </p>
              </details>
              <details>
                <summary>Are the demonstrations real client projects?</summary>
                <p>
                  No. The examples marked concept are demonstrations of possible
                  approaches, not completed client work.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section
        className="ycnr-final"
        id="start"
        aria-labelledby="ycnr-final-heading"
      >
        <div className="ycnr-container">
          <div className="ycnr-final-box">
            <div>
              <p className="ycnr-kicker">Start with a conversation</p>
              <h2 id="ycnr-final-heading">
                What could work better
                <br />
                in your business?
              </h2>
              <p>
                Tell us what is slowing things down. We will help identify a
                practical next step.
              </p>
            </div>
            <div className="ycnr-final-actions">
              <Link className="ycnr-cta ycnr-cta-primary" href="/contact">
                Start a project{" "}
                <span className="ycnr-cta-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
              <a
                className="ycnr-cta ycnr-cta-outline"
                href="https://wa.me/918341226694"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
