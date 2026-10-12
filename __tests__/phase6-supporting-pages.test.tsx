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
    it("renders ratified H1 and all five outcome needs", () => {
      const html = renderToString(<WhatWeSolvePage />);
      expect(html).toContain("What are you trying to change?");
      expect(html).toContain("Customers need to find me");
      expect(html).toContain("Websites &amp; digital presence");
      expect(html).toContain("Customers need an easier way to act");
      expect(html).toContain("Customer experiences");
      expect(html).toContain("My team does too much manually");
      expect(html).toContain("Business systems &amp; automation");
      expect(html).toContain("I have a product idea");
      expect(html).toContain("Software products");
      expect(html).toContain("I need something specific");
      expect(html).toContain("Custom software");
      expect(html).toContain("Not sure which one you need? Tell us what is happening today.");
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
    it("renders canonical H1, strict classifications, and truthful empty state", () => {
      const html = renderToString(<WorkPage />);
      expect(html).toContain("We show our work honestly.");
      expect(html).toContain("CLIENT WORK");
      expect(html).toContain("INTERNAL PRODUCT");
      expect(html).toContain("CONCEPT BUILD");
      expect(html).toContain("We publish work when the scope, stage and evidence are clear.");
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
    it("renders exact eight steps in order and ratified headline", () => {
      const html = renderToString(<HowWeWorkPage />);
      expect(html).toContain("You know your business. We know technology.");
      expect(html).toContain("You don’t need to arrive with a technical specification.");

      const steps = [
        "Talk",
        "Understand",
        "Plan",
        "Design",
        "Build",
        "Test",
        "Launch",
        "Improve",
      ];

      let lastIndex = 0;
      for (const step of steps) {
        const index = html.indexOf(step);
        expect(index).toBeGreaterThan(lastIndex);
        lastIndex = index;
      }
    });

    it("includes the six collaboration areas without SLA promises", () => {
      const html = renderToString(<HowWeWorkPage />);
      expect(html).toContain("Roles");
      expect(html).toContain("Communication");
      expect(html).toContain("Scope");
      expect(html).toContain("Decisions");
      expect(html).toContain("Feedback");
      expect(html).toContain("Change Control");
      expect(html).not.toContain("99.9% SLA");
    });
  });

  describe("5. /about Route", () => {
    it("renders canonical H1 and ratified body paragraphs verbatim", () => {
      const html = renderToString(<AboutPage />);
      expect(html).toContain("Technology should make a business easier to understand and easier to run.");
      expect(html).toContain(
        "YCN Labs starts with the business problem, then chooses the digital solution that fits."
      );
      expect(html).toContain(
        "We care about clarity on the surface and engineering discipline underneath."
      );
      expect(html).toContain(
        "We do not present concepts as client work or future capabilities as services already proven."
      );
    });

    it("does not invent quantitative team size, age, or false awards", () => {
      const html = renderToString(<AboutPage />);
      expect(html).not.toContain("team of 50+");
      expect(html).not.toContain("over 10 years");
      expect(html).not.toContain("Award-winning agency");
    });
  });

  describe("6. /engineering Route", () => {
    it("renders exact H1, ratified intro, and all eight canonical practice areas", () => {
      const html = renderToString(<EngineeringPage />);
      expect(html).toContain("Simple for the user. Deliberate underneath.");
      expect(html).toContain(
        "Technical choices should follow the actual problem. This page explains the practices we use and the evidence available for this website/project; it must not turn targets into claims."
      );

      const practices = [
        "Performance",
        "Accessibility",
        "Security",
        "Reliability",
        "Architecture",
        "Testing",
        "Monitoring &amp; operations",
        "Handover",
      ];

      for (const practice of practices) {
        expect(html).toContain(practice);
      }
    });

    it("avoids false compliance or uptime guarantees", () => {
      const html = renderToString(<EngineeringPage />);
      expect(html).not.toContain("WCAG 2.2 AA certified");
      expect(html).not.toContain("100% secure");
      expect(html).not.toContain("99.99% uptime guarantee");
    });
  });

  describe("7. /contact Route", () => {
    it("renders canonical H1 and sub-headline", () => {
      const html = renderToString(<ContactPage />);
      expect(html).toContain("Tell us what you’re trying to improve.");
      expect(html).toContain(
        "You don’t need to know whether you need a website, app, automation or custom software."
      );
      expect(html).toContain("hello@ycnlabs.com");
      // Must not claim unverified response time guarantee per Claims register row 23
      expect(html).not.toContain("respond within one business day");
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
});
