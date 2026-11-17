"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Circle,
  Globe,
  LayoutDashboard,
  RotateCcw,
  Smartphone,
  Workflow,
} from "lucide-react";

type SceneType = "website" | "app" | "automation";

interface SceneMeta {
  title: string;
  tagline: string;
  description: string;
}

const SCENE_META: Record<SceneType, SceneMeta> = {
  website: {
    title: "Websites",
    tagline: "Make the next step obvious.",
    description: "A service business page with services, opening hours and one clear 'Book a visit' button. No glowing square.",
  },
  app: {
    title: "Web apps",
    tagline: "Every request in one place.",
    description: "Three requests moving from New to Assigned to Replied, each with a person's role against it.",
  },
  automation: {
    title: "Automation",
    tagline: "Stop typing it twice.",
    description: "A form comes in, the sheet updates, the owner gets a message.",
  },
};

/* -------------------------------------------------------------------------- */
/* SCENE 1: REALISTIC MINI BUSINESS WEBSITE (INTERACTIVE IN CODE)              */
/* -------------------------------------------------------------------------- */
export interface RealisticWebsiteDemoProps {
  initialBookingStatus?: "idle" | "booked";
}

export function RealisticWebsiteDemo({ initialBookingStatus = "idle" }: RealisticWebsiteDemoProps = {}) {
  const [selectedService, setSelectedService] = useState<string>("consultation");
  const [bookingStatus, setBookingStatus] = useState<"idle" | "booked">(initialBookingStatus);

  const services = [
    {
      id: "consultation",
      title: "Initial Consultation",
      duration: "45 mins",
      summary: "In-person or video evaluation with clinical history review.",
    },
    {
      id: "review",
      title: "Annual Health Review",
      duration: "60 mins",
      summary: "Full preventative wellness checkup and diagnostic discussion.",
    },
  ];

  return (
    <div className="ycnr-scene" id="scene-website">
      <div className="ycnr-labelrow">
        <b>01 / A CLEAR FIRST IMPRESSION</b>
        <span>Make the next step obvious</span>
      </div>

      <div className="ycnr-browser" aria-label="Illustrative healthcare service website demonstration">
        <div className="ycnr-browser-head" aria-hidden="true">
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-url">sample-care.in / book-visit</span>
        </div>

        <div className="ycnr-site-realistic">
          {/* Mini Nav */}
          <div className="ycnr-mini-nav" aria-hidden="true">
            <div className="ycnr-mini-brand">
              <span className="ycnr-mini-logo-dot" />
              <strong>APEX CARE PRACTICE</strong>
            </div>
            <div className="ycnr-mini-links">
              <span>Services</span>
              <span>Hours: Mon–Sat 9AM–7PM</span>
              <span className="ycnr-mini-nav-btn">Call Clinic</span>
            </div>
          </div>

          {/* Mini Hero */}
          <div className="ycnr-mini-hero">
            <span className="ycnr-mini-badge">SERVICE BUSINESS CONCEPT · SAMPLE STUDIO</span>
            <h4 className="ycnr-mini-title">
              Clear Healthcare Consultations. Easy Scheduling.
            </h4>
            <p className="ycnr-mini-sub">
              What we offer, when we are open, and one simple button to request an appointment.
            </p>
          </div>

          {/* Service Selector (Interactive) */}
          <div className="ycnr-service-selector" role="group" aria-label="Select sample service">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`ycnr-service-card ${selectedService === s.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedService(s.id);
                  setBookingStatus("idle");
                }}
                aria-pressed={selectedService === s.id}
              >
                <div className="ycnr-service-head">
                  <strong>{s.title}</strong>
                  <span className="ycnr-service-tag">{s.duration}</span>
                </div>
                <p>{s.summary}</p>
              </button>
            ))}
          </div>

          {/* Interactive Booking Action */}
          <div className="ycnr-mini-booking-bar">
            {bookingStatus === "idle" ? (
              <button
                type="button"
                className="ycnr-demo-action-btn"
                onClick={() => setBookingStatus("booked")}
              >
                Request a visit
              </button>
            ) : (
              <div className="ycnr-booked-notice" role="status">
                <CheckCircle2 size={16} strokeWidth={2.2} className="ycnr-icon-success" style={{ flexShrink: 0 }} />
                <span>Example only. On a real site, the clinic would receive this request.</span>
                <button
                  type="button"
                  className="ycnr-reset-demo-btn"
                  onClick={() => setBookingStatus("idle")}
                >
                  <RotateCcw size={12} strokeWidth={2} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Reset example
                </button>
              </div>
            )}
            <small className="ycnr-hint-text">
              Interactive concept: click services or button to test the flow. Nothing is sent.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SCENE 2: REALISTIC OPERATIONS & REQUEST PORTAL (INTERACTIVE IN CODE)       */
/* -------------------------------------------------------------------------- */
interface SampleRequest {
  id: string;
  title: string;
  role: string;
  status: "new" | "assigned" | "replied";
}

export function RealisticWebAppDemo() {
  const [filter, setFilter] = useState<"all" | "new" | "assigned" | "replied">("all");
  const [requests, setRequests] = useState<SampleRequest[]>([
    {
      id: "#REQ-101",
      title: "Commercial site inspection inquiry",
      role: "Lead: Senior Surveyor",
      status: "new",
    },
    {
      id: "#REQ-102",
      title: "Equipment preventive maintenance",
      role: "Lead: Field Operations",
      status: "assigned",
    },
    {
      id: "#REQ-103",
      title: "Customer rescheduling request",
      role: "Lead: Client Support",
      status: "replied",
    },
  ]);

  const advanceStatus = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (r.status === "replied") return r;
        const nextStatus = r.status === "new" ? "assigned" : "replied";
        return { ...r, status: nextStatus };
      })
    );
  };

  const resetRequests = () => {
    setRequests([
      {
        id: "#REQ-101",
        title: "Commercial site inspection inquiry",
        role: "Lead: Senior Surveyor",
        status: "new",
      },
      {
        id: "#REQ-102",
        title: "Equipment preventive maintenance",
        role: "Lead: Field Operations",
        status: "assigned",
      },
      {
        id: "#REQ-103",
        title: "Customer rescheduling request",
        role: "Lead: Client Support",
        status: "replied",
      },
    ]);
  };

  const filtered = requests.filter((r) => (filter === "all" ? true : r.status === filter));

  const counts = {
    all: requests.length,
    new: requests.filter((r) => r.status === "new").length,
    assigned: requests.filter((r) => r.status === "assigned").length,
    replied: requests.filter((r) => r.status === "replied").length,
  };

  return (
    <div className="ycnr-scene" id="scene-app">
      <div className="ycnr-labelrow">
        <b>02 / WORK IN ONE PLACE</b>
        <span>Every request in one place</span>
      </div>

      <div className="ycnr-browser" aria-label="Illustrative request queue web app demonstration">
        <div className="ycnr-browser-head" aria-hidden="true">
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-url">ops.samplehub.in / request-board</span>
        </div>

        <div className="ycnr-app-realistic">
          {/* Top Operational Bar */}
          <div className="ycnr-app-topbar">
            <div>
              <strong className="ycnr-app-company">Operations Hub</strong>
              <span className="ycnr-app-active-tag">Active Queue</span>
            </div>
            <div className="ycnr-app-filter-tabs" role="group" aria-label="Filter requests by status">
              {(["all", "new", "assigned", "replied"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={filter === key}
                  className={`ycnr-app-tab ${filter === key ? "active" : ""}`}
                  onClick={() => setFilter(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)} ({counts[key]})
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Request Queue */}
          <div className="ycnr-app-table" role="region" aria-label="Sample requests list">
            {filtered.map((item) => (
              <div key={item.id} className="ycnr-table-row">
                <div className="ycnr-row-left">
                  <span className="ycnr-id">{item.id}</span>
                  <div>
                    <strong className="ycnr-row-title">{item.title}</strong>
                    <small className="ycnr-row-role">{item.role}</small>
                  </div>
                </div>
                <div className="ycnr-row-right">
                  <button
                    type="button"
                    className={`ycnr-badge-${item.status}`}
                    onClick={() => advanceStatus(item.id)}
                    disabled={item.status === "replied"}
                    title={item.status === "replied" ? "Status is Replied (terminal). Click Reset example to restart." : "Click to advance status"}
                    aria-label={`Advance status for ${item.id}, currently ${item.status}`}
                  >
                    {item.status === "replied" ? (
                      <>
                        REPLIED <Check size={11} strokeWidth={2.5} style={{ display: "inline", verticalAlign: "middle" }} />
                      </>
                    ) : (
                      <>
                        {item.status.toUpperCase()} <ArrowRight size={11} strokeWidth={2} style={{ display: "inline", verticalAlign: "middle" }} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="ycnr-interactive-guide">
            <small>Advance status: New ➔ Assigned ➔ Replied (Terminal until reset)</small>
            <button
              type="button"
              className="ycnr-reset-demo-btn"
              onClick={resetRequests}
              style={{ marginLeft: "12px" }}
            >
              <RotateCcw size={12} strokeWidth={2} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
              Reset example
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SCENE 3: REALISTIC INTAKE & DISPATCH AUTOMATION (INTERACTIVE IN CODE)       */
/* -------------------------------------------------------------------------- */
export interface RealisticAutomationDemoProps {
  initialStep?: number;
}

export function RealisticAutomationDemo({ initialStep = 1 }: RealisticAutomationDemoProps = {}) {
  const [activeStep, setActiveStep] = useState<number>(initialStep);

  const steps = [
    {
      num: "01",
      name: "Form intake",
      channel: "Simulated Web Form",
      desc: "Concept: A structured form collects only what the team needs to reply.",
      status: "Form received (example)",
    },
    {
      num: "02",
      name: "Structured record",
      channel: "Illustrative Database",
      desc: "Concept: Data stores reliably before notifications to prevent lost leads.",
      status: "Record created (example)",
    },
    {
      num: "03",
      name: "Internal alert",
      channel: "Notification Concept",
      desc: "Concept: An automated notification alerts the responsible owner.",
      status: "Owner notified (example)",
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => (prev < 3 ? prev + 1 : 1));
  };

  return (
    <div className="ycnr-scene" id="scene-automation">
      <div className="ycnr-labelrow">
        <b>03 / LESS REPETITION</b>
        <span>Stop typing it twice</span>
      </div>

      <div className="ycnr-browser" aria-label="Illustrative automated workflow simulation">
        <div className="ycnr-browser-head" aria-hidden="true">
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-dot" />
          <span className="ycnr-url">pipeline.sampleworkflow.in / intake-flow</span>
        </div>

        <div className="ycnr-flow-realistic">
          <div className="ycnr-automation-controls">
            <span className="ycnr-flow-indicator">
              Active stage: <strong>{activeStep} of 3</strong>
            </span>
            <button
              type="button"
              className="ycnr-run-flow-btn"
              onClick={handleNext}
            >
              {activeStep < 3 ? (
                <>
                  Simulate next step <ArrowRight size={13} strokeWidth={2} style={{ display: "inline", marginLeft: "4px", verticalAlign: "middle" }} />
                </>
              ) : (
                <>
                  Reset example <RotateCcw size={13} strokeWidth={2} style={{ display: "inline", marginLeft: "4px", verticalAlign: "middle" }} />
                </>
              )}
            </button>
          </div>

          <div className="ycnr-pipeline-steps">
            {steps.map((st, idx) => {
              const stepNumber = idx + 1;
              const isActive = activeStep >= stepNumber;
              const isCurrent = activeStep === stepNumber;

              return (
                <div
                  key={st.num}
                  className={`ycnr-pipeline-card ${isActive ? "active" : ""} ${isCurrent ? "highlight" : ""}`}
                >
                  <div className="ycnr-card-head">
                    <span className="ycnr-step-num">
                      {st.num} / {st.name.toUpperCase()}
                    </span>
                    <span className="ycnr-step-pill">{st.channel}</span>
                  </div>
                  <div className="ycnr-card-body">
                    <strong>{st.name}</strong>
                    <p>{st.desc}</p>
                    <div className="ycnr-card-status">
                      <span className="ycnr-check">
                        {isActive ? (
                          <Check size={11} strokeWidth={2.5} />
                        ) : (
                          <Circle size={8} strokeWidth={2} opacity={0.35} />
                        )}
                      </span>
                      <span>{isActive ? st.status : "Waiting for trigger..."}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {activeStep === 3 && (
            <div className="ycnr-whatsapp-bubble" role="status">
              <div className="ycnr-wa-head">
                <Smartphone size={18} strokeWidth={1.8} style={{ display: "inline", marginRight: "6px", verticalAlign: "text-bottom" }} aria-hidden="true" />
                Illustrative Team Alert Concept
              </div>
              <p>
                &quot;Simulation: New project inquiry from sample customer. All details mapped to sheet preview.&quot;
              </p>
              <small style={{ display: "block", marginTop: "4px", opacity: 0.8 }}>
                Example only. Nothing is actually sent.
              </small>
            </div>
          )}

          <div className="ycnr-interactive-guide">
            <small>Simulation demonstration only. No real data is recorded, and no mobile message is delivered.</small>
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sceneWrapRef.current,
        { opacity: 0.7, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }, sceneWrapRef);

    return () => ctx.revert();
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
              Websites · Web apps · Automation
            </div>
            <h1 className="ycnr-heading" id="hero-heading" ref={headingRef}>
              Websites that earn trust.
              <br />
              <span className="ycnr-accent">Software that saves time.</span>
            </h1>
            <p className="ycnr-lead">
              We design and build websites, web apps and practical automations that
              make your business easier to understand and easier to run.
            </p>
            <div className="ycnr-cta-row">
              <Link
                id="hero-primary-cta"
                className="ycnr-cta ycnr-cta-primary"
                href="/contact"
              >
                Start a Project{" "}
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.2}
                  className="ycnr-cta-arrow"
                  aria-hidden="true"
                />
              </Link>
              <Link
                id="hero-secondary-cta"
                className="ycnr-cta ycnr-cta-outline"
                href="#what-we-build"
              >
                See what we build
              </Link>
            </div>
            <p className="ycnr-reassure">
              <strong>No technical brief needed.</strong> Just tell us what isn&apos;t working.
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
                  <span className="ycnr-tab-title">
                    <Globe size={13} strokeWidth={1.75} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                    Websites
                  </span>
                  <small className="ycnr-tab-sub">Make next step obvious</small>
                </button>
                <button
                  type="button"
                  data-scene="app"
                  aria-pressed={activeScene === "app"}
                  onClick={() => setActiveScene("app")}
                >
                  <span className="ycnr-tab-title">
                    <LayoutDashboard size={13} strokeWidth={1.75} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                    Web apps
                  </span>
                  <small className="ycnr-tab-sub">Every request in 1 place</small>
                </button>
                <button
                  type="button"
                  data-scene="automation"
                  aria-pressed={activeScene === "automation"}
                  onClick={() => setActiveScene("automation")}
                >
                  <span className="ycnr-tab-title">
                    <Workflow size={13} strokeWidth={1.75} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                    Automation
                  </span>
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
                <Globe size={24} strokeWidth={1.8} />
              </span>
              <h3>Make a strong first impression.</h3>
              <p>
                A clear, fast website: what you offer, where you are, how to reach you.
              </p>
            </Link>
            <Link className="ycnr-offer" href="/contact">
              <span className="ycnr-offer-num">02 / WEB APPLICATIONS</span>
              <span className="ycnr-offer-icon" aria-hidden="true">
                <LayoutDashboard size={24} strokeWidth={1.8} />
              </span>
              <h3>Bring the work together.</h3>
              <p>
                Orders, bookings and requests on one screen, with a name against each.
              </p>
            </Link>
            <Link className="ycnr-offer" href="/contact">
              <span className="ycnr-offer-num">03 / AUTOMATION</span>
              <span className="ycnr-offer-icon" aria-hidden="true">
                <Workflow size={24} strokeWidth={1.8} />
              </span>
              <h3>Less copying. More doing.</h3>
              <p>
                When a form comes in, the sheet updates and the right person is told.
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
                Tell us what is difficult today, in your own words.
              </p>
            </li>
            <li>
              <span>02 / SHOW</span>
              <h3>See the plan and the price.</h3>
              <p>
                A written scope and a quote in rupees before work starts.
              </p>
            </li>
            <li>
              <span>03 / DELIVER</span>
              <h3>Build. Test. Hand over.</h3>
              <p>
                You see progress, check it, and receive what was agreed.
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
                Founder-led.
                <br />
                Fully accountable.
              </h2>
            </div>
            <p className="ycnr-section-lead">
              The founder leads every project. When a project needs more hands,
              we will bring in specialists, and you will be told who is doing
              what before work starts.
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
              <Link href="/about">
                Meet the founder{" "}
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  style={{ display: "inline", verticalAlign: "middle" }}
                  aria-hidden="true"
                />
              </Link>
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
                What would you like to make easier?
              </h2>
              <p>
                Tell us what is happening today. We&apos;ll suggest a first step.
              </p>
            </div>
            <div className="ycnr-final-actions">
              <Link className="ycnr-cta ycnr-cta-primary" href="/contact">
                Start a Project{" "}
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.2}
                  className="ycnr-cta-arrow"
                  aria-hidden="true"
                />
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
