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
    it("renders ratified H1 and the four V3 problems with before/after (YCN-V3-UI Day 3, COPY-V3.md)", () => {
      const html = renderToString(<WhatWeSolvePage />);
      expect(html).toContain("What are you trying to change?");
      for (const t of ["Enquiries get missed.", "Everything is done by hand.", "Customers can’t find you.", "The old site doesn’t bring work."]) {
        expect(html).toContain(t);
      }
      expect((html.match(/>Before:<\/strong>/g) || []).length).toBe(4);
      expect((html.match(/>After:<\/strong>/g) || []).length).toBe(4);
      expect(html).toContain("Screens are illustrative demonstrations.");
      expect(html).toContain("Not sure which one you need?");
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
      expect((html.match(/>Concept build</g) || []).length).toBe(5);
      expect(html).toContain("client work, an internal product or a concept build");
      expect(html).toContain("We publish work when the scope, stage and evidence are clear.");
      expect(html).toContain("Your project could be the first case study.");
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
    it("renders ratified headline and the four V3 steps in order (YCN-V3-UI Day 3)", () => {
      const html = renderToString(<HowWeWorkPage />);
      expect(html).toContain("You know your business. We know technology.");
      expect(html).toContain("You don’t need to arrive with a technical specification.");
      let last = -1;
      for (const step of ["Tell us the problem", "Scope and price", "Build and show", "Launch and look after"]) {
        const i = html.indexOf(step);
        expect(i).toBeGreaterThan(last);
        last = i;
      }
      expect((html.match(/You get:/g) || []).length).toBe(4);
      expect(html).toContain("a price in INR");
    });

    it("makes no SLA, response-time or fixed fix-window promises", () => {
      const html = renderToString(<HowWeWorkPage />);
      expect(html).not.toContain("99.9% SLA");
      expect(html).not.toMatch(/30 days|within \d+ (hours|days)|guarantee/i);
    });
  });

  describe("5. /about Route", () => {
    it("renders canonical H1, the ratified commitments, and no photo until one exists (YCN-V3-UI Day 3)", () => {
      const html = renderToString(<AboutPage />);
      expect(html).toContain("Technology should make a business easier to understand and easier to run.");
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
      // Ending A only; no titles; Hyderabad omitted by Owner ruling
      expect(html).not.toContain("Then I build it myself");
      expect(html).not.toMatch(/\b(CEO|Managing Director)\b/);
      expect(html).not.toContain("Hyderabad");
    });
  });

  describe("6. /engineering Route", () => {
    it("renders exact H1, ratified intro, and all eight canonical practice areas", () => {
      const html = renderToString(<EngineeringPage />);
      expect(html).toContain("Simple for the user. Deliberate underneath.");
      expect(html).toContain(
        "Technical choices should follow the actual problem. Here is how we build, and what we can show for it."
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
    it("renders canonical H1 and the single first-step intro paragraph", () => {
      const html = renderToString(<ContactPage />);
      expect(html).toContain("Tell us what you’re trying to improve.");
      expect(html).toContain(
        "Tell us what is slow, lost or difficult in your business today."
      );
      // Owner ruling 5 Nov 2026 (Task 10b): the former sub-headline is removed from the intro
      expect(html).not.toContain(
        "Tell us what happens today and what you want to change."
      );
      expect(html).toContain("hello@ycnlabs.com");
      // Must not claim unverified response time guarantee per Claims register row 23
      expect(html).not.toContain("respond within one business day");
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
});
