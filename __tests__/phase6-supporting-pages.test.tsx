import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

import WhatWeSolvePage from "@/app/what-we-solve/page";
import WorkPage from "@/app/work/page";
import HowWeWorkPage from "@/app/how-we-work/page";
import AboutPage from "@/app/about/page";
import EngineeringPage from "@/app/engineering/page";
import ContactPage from "@/app/contact/page";
import NotFound from "@/app/not-found";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contactSchema } from "@/lib/validation/contact";
import { SituationExplorer } from "@/components/inner/SituationExplorer";
import { SIM_SCENARIOS } from "@/components/inner/EngineeringSimulator";

describe("Phase 6: Supporting Pages & Canonical Navigation", () => {
  describe("1. Canonical Navigation & Footer Links", () => {
    it("renders primary nav labels and links matching canonical specification", () => {
      const html = renderToString(<Header />);
      expect(html).toContain('href="/work"');
      expect(html).toContain('href="/what-we-solve"');
      expect(html).toContain('href="/how-we-work"');
      expect(html).toContain('href="/about"');
      expect(html).toContain('href="/engineering"');
      expect(html).toContain('href="/contact"');
      expect(html).toContain("Start a Project");
      // Must not link to obsolete /what-we-build in header
      expect(html).not.toContain('href="/what-we-build"');
    });

    it("renders footer with canonical /what-we-solve and legal links", () => {
      const html = renderToString(<Footer />);
      expect(html).toContain('href="/what-we-solve"');
      expect(html).toContain("What We Solve");
      expect(html).not.toContain('href="/what-we-build"');
      expect(html).toContain("YCN Labs — technology and software built around how businesses work.");
      expect(html).toContain("Software, engineered to hold up.");
      expect(html).toContain('href="/credits"');
      expect(html).toContain('href="/privacy"');
      expect(html).toContain('href="/terms"');
    });
  });

  describe("2. /what-we-solve Route Specification", () => {
    it("renders ratified H1, situation explorer, decision guide, and honest CTA", () => {
      const html = renderToString(<WhatWeSolvePage />);
      expect(html).toContain("Which part of your business is harder than it should be?");
      for (const t of [
        "Customers ask the same five questions on WhatsApp all day.",
        "We can&#x27;t tell which enquiries we answered.",
        "Every quotation takes an hour in Word.",
        "Stock is in one sheet, orders in another, and nobody trusts either.",
        "Our website looks fine, but nobody enquires.",
        "Month-end reports take two days.",
      ]) {
        expect(html).toContain(t);
      }
      expect(html).toContain("A page, a shared sheet, or custom software?");
      expect(html).toContain("Sometimes the answer is a better spreadsheet.");
      expect(html).toContain("Start a Project");
      expect(html).toContain('href="/contact"');
    });

    it("contains zero unverified digital-marketing or cybersecurity claims", () => {
      const html = renderToString(<WhatWeSolvePage />);
      expect(html).not.toContain("digital marketing");
      expect(html).not.toContain("cybersecurity service");
      expect(html).not.toContain("penetration testing");
      expect(html).not.toContain("SEO growth guarantee");
    });
  });

  describe("3. /work Route & Truthful Evidence Fallback", () => {
    it("renders canonical H1, labels every item, and keeps the truthful empty state (YCN-V3-UI Day 3)", () => {
      const html = renderToString(<WorkPage />);
      expect(html).toContain("We show our work honestly.");
      expect(html).toContain("Internal build · In development");
      expect((html.match(/Studio concept/g) || []).length).toBe(3);
      expect(html).toContain("Have a project like this?");
      expect(html).toContain("client work, an internal product or a concept build");
      expect(html).toContain("We publish work when the scope, stage and evidence are clear.");
      expect(html).not.toMatch(/purple/);
    });

    it("does not fabricate client logos, metrics, or fictitious case studies", () => {
      const html = renderToString(<WorkPage />);
      expect(html).not.toContain("Fortune 500");
      expect(html).not.toContain("Increased revenue by");
      expect(html).not.toContain("Client Testimonial");
      expect(html).not.toContain("Acme Corp");
    });
  });

  describe("4. /how-we-work Route", () => {
    it("renders ratified headline and the six steps in order", () => {
      const html = renderToString(<HowWeWorkPage />);
      expect(html).toContain("From first conversation to a handover you can understand.");
      let last = -1;
      for (const step of [
        "First conversation",
        "Written scope and quote",
        "Previews",
        "Testing",
        "Handover",
        "After launch",
      ]) {
        const i = html.indexOf(step);
        expect(i).toBeGreaterThan(last);
        last = i;
      }
      expect((html.match(/You get:/g) || []).length).toBe(6);
      expect(html).toContain("a quote in rupees");
      expect(html).toContain("What we need from you");
      expect(html).toContain("What if the plan changes?");
      expect(html).toContain("Start a Project");
      expect(html).toContain('href="/contact"');
      expect(html).toContain("Handover of domain access, accounts and documentation, as listed in your agreement.");
      expect(html).not.toMatch(/fixed\s+(inr|price|pricing)/i);
    });

    it("makes no SLA, response-time or fixed fix-window promises", () => {
      const html = renderToString(<HowWeWorkPage />);
      expect(html).not.toContain("99.9% SLA");
      expect(html).not.toMatch(/30 days|within \d+ (hours|days)|guarantee/i);
    });
  });

  describe("5. /about Route", () => {
    it("renders canonical H1, commitments, and no photo until one exists", () => {
      const html = renderToString(<AboutPage />);
      expect(html).toContain("The work has someone accountable behind it.");
      expect(html).toContain("Four commitments we make to every client");
      expect(html).toContain("We care about clarity on the surface and engineering discipline underneath.");
      expect(html).toContain("We do not present concepts as client work or future capabilities as services already proven.");
      expect(html).not.toContain("<img");
    });

    it("does not invent quantitative team size, age, or false awards", () => {
      const html = renderToString(<AboutPage />);
      expect(html).not.toContain("team of 50+");
      expect(html).not.toContain("over 10 years");
      expect(html).not.toContain("Award-winning agency");
    });

    it("renders the Owner-approved founder section verbatim, with no title or location (Task 10b, 9 Nov 2026)", () => {
      const html = renderToString(<AboutPage />);
      expect(html).toContain('id="founder-heading"');
      expect(html).toMatch(/<h2[^>]*id="founder-heading"[^>]*>\s*Yaseen\s*<\/h2>/);
      expect(html).toContain(
        "You can call me Yash. I started YCN Labs to help small and growing businesses in India build websites and web applications that fit the way they work. You don’t need a technical brief to talk to me. Tell me where an enquiry gets missed or what you keep doing by hand, and we’ll work out what’s worth building first."
      );
      expect(html).not.toContain("Then I build it myself");
      expect(html).not.toMatch(/\b(CEO|Managing Director)\b/);
      expect(html).not.toContain("Hyderabad");
      expect(html).toContain("Start a Project");
      expect(html).toContain("Before work starts, the agreement sets out plainly what you own and what is licensed.");
      expect(html).toContain("The founder leads every project.");
      expect(html).toContain("When a project needs more hands, we will bring in specialists");
      expect(html).not.toContain("Yaseen leads every project");
    });
  });

  describe("6. /engineering Route", () => {
    it("renders exact H1, ratified proof points, simulator, and eight practice areas", () => {
      const html = renderToString(<EngineeringPage />);
      expect(html).toContain("What happens when something fails matters as much as when it works.");
      expect(html).toContain("Five engineering rules grounded in our own code");
      expect(html).toContain("Saved before");
      expect(html).toContain("The form is built to save your enquiry before the notification email is sent");
      expect(html).not.toContain("If the email fails, nothing is lost");
      expect(html).toContain("Automated verification before merge");
      expect(html).toContain("Each change goes through automated checks before it is merged: lint, type checks, unit tests and a production build. We also run browser tests on the main pages.");
      expect(html).toContain("How our enquiry pipeline handles failure");
      expect(html).toContain("Example only. This shows how the form is designed to behave.");
      expect(SIM_SCENARIOS.email_fails.outcome).toBe("The enquiry stays saved. The email can be re-sent.");
      expect(SIM_SCENARIOS.storage_fails.outcome).toBe("No enquiry is saved, and the visitor is told so. No false thank-you.");
      expect(SIM_SCENARIOS.normal.outcome).not.toContain("Zero data loss");
      expect(html).not.toContain("Zero data loss");
      expect(html).not.toContain("email retry scheduled");
      expect(html).not.toContain("recovered via scripts");
      expect(html).toContain("We design with colour contrast and keyboard use in mind.");
      expect(html).not.toContain("contrast compliance");
      expect(html).toContain("Our code is scanned for passwords and keys before it is merged.");
      expect(html).not.toContain("no secret leakage");
      expect(html).not.toContain("without PII leakage");
      expect(html).toContain("Documented recovery tools and procedures for failed notifications as agreed for your system.");
      expect(html).not.toContain("Clean structured logging");
      expect(html).toContain("Handover as listed in your agreement");
      expect(html).not.toContain("Complete source repository");

      const practices = [
        "Performance",
        "Accessibility",
        "Security",
        "Reliability",
        "Architecture",
        "Automated Testing",
        "Monitoring &amp; Operations",
        "Transparent Handover",
      ];

      for (const practice of practices) {
        expect(html).toContain(practice);
      }
      expect(html).toContain("Start a Project");
    });

    it("avoids false compliance or uptime guarantees", () => {
      const html = renderToString(<EngineeringPage />);
      expect(html).not.toContain("WCAG 2.2 AA certified");
      expect(html).not.toContain("100% secure");
      expect(html).not.toContain("99.99% uptime guarantee");
    });
  });

  describe("7. /contact Route", () => {
    it("renders canonical H1, direct channels, and reassurance", () => {
      const html = renderToString(<ContactPage />);
      expect(html).toContain("What&#x27;s difficult in your business right now?");
      expect(html).toContain("What happens after I send this?");
      expect(html).toContain("We discuss scope and send a written quote before anyone commits to anything.");
      expect(html).not.toMatch(/fixed\s+(inr|price)/i);
      expect(html).toContain("hello@ycnlabs.com");
      expect(html).toContain("+91 83412 26694");
      // Must not claim unverified response time guarantee per Claims register row 23
      expect(html).not.toContain("respond within one business day");
      expect(html).toContain("Send my enquiry");
    });

    it("defaults project type to 'Not sure yet — need guidance…' option and accepts free-text budget", () => {
      const html = renderToString(<ContactPage />);
      // Free-text budget input exists without select or GBP references
      expect(html).toContain('name="budget"');
      expect(html).toContain('type="text"');
      expect(html).not.toContain('<select name="budget"');
      expect(html).not.toContain("£");

      // Verify contactSchema validates free-text budget and default projectType
      const validated = contactSchema.parse({
        name: "Test Visitor",
        email: "visitor@example.in",
        projectType: "Not sure yet — need guidance on the right digital format",
        budget: "₹50,000 – ₹1,50,000 / Flexible",
        timeline: "Flexible",
        message: "Need guidance on setting up web operations.",
      });
      expect(validated.projectType).toBe(
        "Not sure yet — need guidance on the right digital format"
      );
      expect(validated.budget).toBe("₹50,000 – ₹1,50,000 / Flexible");
    });
  });

  describe("8. 404 / Not Found Experience", () => {
    it("renders canonical line and recovery links to Home, Work, and Start a Project", () => {
      const html = renderToString(<NotFound />);
      expect(html).toContain("This path does not go anywhere.");
      expect(html).toContain('href="/"');
      expect(html).toContain('href="/work"');
      expect(html).toContain('href="/contact"');
      expect(html).toContain("Start a Project");
    });
  });

  describe("9. Landmark & Accessibility Integrity Across Supporting Pages", () => {
    it("ensures no nested <main> landmarks exist across supporting pages", () => {
      expect(renderToString(<WhatWeSolvePage />)).not.toContain("<main");
      expect(renderToString(<HowWeWorkPage />)).not.toContain("<main");
      expect(renderToString(<AboutPage />)).not.toContain("<main");
      expect(renderToString(<EngineeringPage />)).not.toContain("<main");
      expect(renderToString(<ContactPage />)).not.toContain("<main");
    });

    it("ensures canonical primary CTA label 'Start a Project' on all four content inner pages", () => {
      for (const Component of [WhatWeSolvePage, HowWeWorkPage, AboutPage, EngineeringPage]) {
        const html = renderToString(<Component />);
        expect(html).toContain("Start a Project");
      }
    });

    it("provides accessible keyboard toggle and announced state in SituationExplorer", () => {
      const html = renderToString(<SituationExplorer />);
      expect(html).toContain('aria-pressed="false"');
      expect(html).toContain("Select");
      expect(html).toContain("<button");
    });
  });
});
