"use client";

import React, { useState } from "react";
import Link from "next/link";

type SceneType = "website" | "app" | "automation";

interface SceneOutcome {
  title: string;
  description: string;
}

const OUTCOMES: Record<SceneType, SceneOutcome> = {
  website: {
    title: "Make the next step obvious.",
    description: "A clear digital first impression, built around your customers.",
  },
  app: {
    title: "Track the work in one place.",
    description: "Structured requests and clear ownership for your team.",
  },
  automation: {
    title: "Remove the repetitive steps.",
    description: "Connect incoming forms directly to the right person and record.",
  },
};

export function HomepageR2() {
  const [activeScene, setActiveScene] = useState<SceneType>("website");

  return (
    <div className="ycnr">
      {/* 1. HERO SECTION */}
      <section
        className="ycnr-hero"
        id="hero-foundation-root"
        aria-labelledby="hero-heading"
      >
        <div className="ycnr-container ycnr-hero-grid">
          {/* Left Column: Bold Narrative */}
          <div id="hero-narrative-col">
            <div className="ycnr-kicker">
              Business websites · Web apps · Automation
            </div>
            <h1 className="ycnr-heading" id="hero-heading">
              Websites that build trust.
              <br />
              <span className="ycnr-accent">Software that cuts busywork.</span>
            </h1>
            <p className="ycnr-lead">
              YCN Labs builds business websites, web apps and practical
              automations—helping customers understand what you offer and teams
              get work done.
            </p>
            <div className="ycnr-cta-row">
              <Link
                id="hero-primary-cta"
                className="ycnr-cta ycnr-cta-primary"
                href="/contact"
              >
                Discuss your project{" "}
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
          <div id="hero-media-layer">
            <div className="ycnr-stage-area">
              <div className="ycnr-showcase">
                <div className="ycnr-showcase-top">
                  <strong>See what we can build</strong>
                  <small>Choose an example</small>
                </div>
                <div className="ycnr-switch" aria-label="Explore YCN Labs services">
                  <button
                    type="button"
                    data-scene="website"
                    aria-pressed={activeScene === "website"}
                    onClick={() => setActiveScene("website")}
                  >
                    Websites
                  </button>
                  <button
                    type="button"
                    data-scene="app"
                    aria-pressed={activeScene === "app"}
                    onClick={() => setActiveScene("app")}
                  >
                    Web apps
                  </button>
                  <button
                    type="button"
                    data-scene="automation"
                    aria-pressed={activeScene === "automation"}
                    onClick={() => setActiveScene("automation")}
                  >
                    Automation
                  </button>
                </div>

                <div
                  className="ycnr-scene-wrap"
                  id="scene-wrap"
                  role="region"
                  aria-label={`${activeScene} — illustrative demonstration`}
                >
                  {/* Scene 1: Website Concept */}
                  {activeScene === "website" && (
                    <div className="ycnr-scene" id="scene-website">
                      <div className="ycnr-labelrow">
                        <b>01 / A BETTER FIRST IMPRESSION</b>
                        <span>Website concept</span>
                      </div>
                      <div className="ycnr-browser">
                        <div className="ycnr-browser-head" aria-hidden="true">
                          <span className="ycnr-dot" />
                          <span className="ycnr-dot" />
                          <span className="ycnr-dot" />
                          <span className="ycnr-url">example-business / services</span>
                        </div>
                        <div className="ycnr-site-demo">
                          <div>
                            <div className="ycnr-demo-eyebrow">
                              YOUR BUSINESS, CLEARLY
                            </div>
                            <h3>
                              Good work.
                              <br />
                              Easy to discover.
                            </h3>
                            <p>
                              Show what you offer. Answer the important questions.
                              Make getting in touch simple.
                            </p>
                            <span className="ycnr-site-cta">Request a quote ↗</span>
                          </div>
                          <div className="ycnr-site-visual" aria-hidden="true">
                            <span className="ycnr-site-caption">
                              A clear next step
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scene 2: Web App Concept */}
                  {activeScene === "app" && (
                    <div className="ycnr-scene" id="scene-app">
                      <div className="ycnr-labelrow">
                        <b>02 / WORK YOU CAN FOLLOW</b>
                        <span>Web app concept</span>
                      </div>
                      <div className="ycnr-browser">
                        <div className="ycnr-browser-head" aria-hidden="true">
                          <span className="ycnr-dot" />
                          <span className="ycnr-dot" />
                          <span className="ycnr-dot" />
                          <span className="ycnr-url">
                            business-workspace / overview
                          </span>
                        </div>
                        <div className="ycnr-app-demo">
                          <div className="ycnr-app-head">
                            <h3>Work, in one place.</h3>
                            <span>Illustrative interface</span>
                          </div>
                          <div className="ycnr-app-grid">
                            <div className="ycnr-app-card">
                              <h4>What&apos;s next</h4>
                              <div className="ycnr-app-event">
                                <span>
                                  New booking
                                  <small>Customer enquiry</small>
                                </span>
                                <b>NEW</b>
                              </div>
                              <div className="ycnr-app-event">
                                <span>
                                  Project estimate
                                  <small>Assigned to team</small>
                                </span>
                                <b>IN PROGRESS</b>
                              </div>
                              <div className="ycnr-app-event">
                                <span>
                                  Order update
                                  <small>Reply prepared</small>
                                </span>
                                <b>READY</b>
                              </div>
                            </div>
                            <div className="ycnr-app-card">
                              <h4>At a glance</h4>
                              <div className="ycnr-app-metric">
                                Clear
                                <span style={{ color: "#67E8F9" }}>.</span>
                              </div>
                              <p className="ycnr-app-metric-sub">
                                Know what arrived, who owns it, and what needs
                                attention.
                              </p>
                              <div
                                className="ycnr-app-line"
                                aria-hidden="true"
                              />
                              <div
                                className="ycnr-app-line"
                                style={{ width: "72%", opacity: 0.7 }}
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scene 3: Automation Concept */}
                  {activeScene === "automation" && (
                    <div className="ycnr-scene" id="scene-automation">
                      <div className="ycnr-labelrow">
                        <b>03 / LESS REPETITION</b>
                        <span>Workflow concept</span>
                      </div>
                      <div className="ycnr-browser">
                        <div className="ycnr-browser-head" aria-hidden="true">
                          <span className="ycnr-dot" />
                          <span className="ycnr-dot" />
                          <span className="ycnr-dot" />
                          <span className="ycnr-url">
                            connected-workflow / example
                          </span>
                        </div>
                        <div className="ycnr-flow-demo">
                          <h3>One request. Fewer manual steps.</h3>
                          <p className="ycnr-flow-sub">
                            An example of a repeatable process—not a deployed
                            client integration.
                          </p>
                          <div className="ycnr-flow-steps">
                            <div className="ycnr-flow-step">
                              <span>
                                <b>Customer submits a form</b>
                                <small>Information comes in</small>
                              </span>
                              <span
                                className="ycnr-flow-check"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                            </div>
                            <div className="ycnr-flow-path" aria-hidden="true">
                              ↓
                            </div>
                            <div className="ycnr-flow-step">
                              <span>
                                <b>Request is recorded</b>
                                <small>One place to find it</small>
                              </span>
                              <span
                                className="ycnr-flow-check"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                            </div>
                            <div className="ycnr-flow-path" aria-hidden="true">
                              ↓
                            </div>
                            <div className="ycnr-flow-step">
                              <span>
                                <b>Right person is notified</b>
                                <small>Clear next action</small>
                              </span>
                              <span
                                className="ycnr-flow-check"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ycnr-stage-foot">
                  <span id="stage-outcome">
                    <strong>{OUTCOMES[activeScene].title}</strong>
                    <br />
                    {OUTCOMES[activeScene].description}
                  </span>
                  <span className="ycnr-proof-label">CONCEPT</span>
                </div>
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
              The right digital tools should remove friction—not add another
              complicated system to manage.
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
          <div className="ycnr-numbergrid">
            <div>
              <span>01 / UNDERSTAND</span>
              <h3>Talk through the problem.</h3>
              <p>
                Tell us what&apos;s difficult today. No technical language needed.
              </p>
            </div>
            <div>
              <span>02 / SHOW</span>
              <h3>See the plan take shape.</h3>
              <p>
                Agree on the scope, see the design, and know the cost before work
                begins.
              </p>
            </div>
            <div>
              <span>03 / DELIVER</span>
              <h3>Build, test, hand over.</h3>
              <p>
                Review progress, check what matters, and receive the agreed
                deliverables.
              </p>
            </div>
          </div>
          <p className="ycnr-understated">
            Concept demonstrations are clearly labelled; we do not present them as
            client results.
          </p>
        </div>
      </section>

      {/* 4. TRUST & ACCOUNTABILITY (Founder & FAQ) */}
      <section
        className="ycnr-section ycnr-trust-section"
        id="why-ycn"
        aria-labelledby="ycnr-trust-heading"
      >
        <div className="ycnr-container">
          <div className="ycnr-split-head">
            <div>
              <p className="ycnr-kicker">Trust comes from clarity</p>
              <h2 className="ycnr-h2" id="ycnr-trust-heading">
                Real people.
                <br />
                Clear decisions.
              </h2>
            </div>
            <p className="ycnr-section-lead">
              No invented results or client names. Just a practical way to
              understand what is being built and who is responsible.
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
                Tell us what&apos;s slowing things down. We&apos;ll help identify a
                useful next step.
              </p>
            </div>
            <Link className="ycnr-cta ycnr-cta-primary" href="/contact">
              Start a project{" "}
              <span className="ycnr-cta-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
