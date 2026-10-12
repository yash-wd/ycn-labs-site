import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { IllustrativeResultsSection } from "@/components/homepage/vnext/IllustrativeResultsSection";
import { HowWeWorkSection } from "@/components/homepage/vnext/HowWeWorkSection";
import { TheTurnSection } from "@/components/homepage/vnext/TheTurnSection";
import { WhatWeAreBuildingSection } from "@/components/homepage/vnext/WhatWeAreBuildingSection";
import { HomepageFAQSection } from "@/components/homepage/vnext/HomepageFAQSection";
import { NeedsFinderAndCloseSection } from "@/components/homepage/vnext/NeedsFinderAndCloseSection";
import { Footer } from "@/components/Footer";

// Mock next/link and next/image for SSR/test environment
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => React.createElement("a", { href, className }, children),
}));

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props),
}));

describe("Phase 5: Illustrative Results & Process Model", () => {
  const html = renderToStaticMarkup(React.createElement(IllustrativeResultsSection));

  it("1. DISCLOSURES & LABELS: Contains Illustrative model and mandatory disclosure", () => {
    expect(html).toContain("Illustrative model");
    expect(html).toContain(
      "Example workflow — not measured business results. Your numbers depend on your business."
    );
  });

  it("2. DIRECTIONAL TREND LABELS: Rising and falling trends exist", () => {
    expect(html).toContain("Requests that reach someone");
    expect(html).toContain("Requests waiting");
  });

  it("3. ZERO FAKE CLAIMS OR REVENUE METRICS: No percentages, dollars, or growth KPIs", () => {
    expect(html).not.toContain("$");
    expect(html).not.toContain("MRR");
    expect(html).not.toContain("ARR");
    expect(html).not.toContain("ROI");
    expect(html).not.toMatch(/\+\d+%/);
  });
});

describe("Phase 5: How We Work — Eight-Step Stable Frame", () => {
  const html = renderToStaticMarkup(React.createElement(HowWeWorkSection));

  it("1. RATIFIED HEADLINE: Exact canonical headline is present", () => {
    expect(html).toContain("You know your business. We know technology.");
  });

  it("2. RATIFIED REASSURANCE: Technical specification reassurance is present", () => {
    expect(html).toContain("You don’t need to arrive with a technical specification.");
  });

  it("3. EXACT EIGHT STEPS IN ORDER: All 8 ratified step titles and descriptions exist", () => {
    const steps = [
      { name: "Talk", desc: "Tell us what is happening." },
      { name: "Understand", desc: "We study the problem before choosing technology." },
      { name: "Plan", desc: "We agree what should be built and what is out of scope." },
      { name: "Design", desc: "You can see and review the experience before full implementation." },
      { name: "Build", desc: "We engineer the agreed solution." },
      { name: "Test", desc: "We check important behavior under real conditions." },
      { name: "Launch", desc: "We put the approved version into production." },
      { name: "Improve", desc: "Ongoing support/improvements happen according to the agreement." },
    ];

    for (const step of steps) {
      expect(html).toContain(step.name);
      expect(html).toContain(step.desc);
    }
  });
});

describe("Phase 5: The Turn — Software, engineered to hold up", () => {
  const html = renderToStaticMarkup(React.createElement(TheTurnSection));

  it("1. EXACT RATIFIED TURN COPY: Software, engineered to hold up is present", () => {
    expect(html).toContain("Software,");
    expect(html).toContain("engineered to hold up.");
  });
});

describe("Phase 5: Honest Work / Evidence Section", () => {
  const html = renderToStaticMarkup(React.createElement(WhatWeAreBuildingSection));

  it("1. TRUTHFUL FALLBACK HEADLINE: What we are building is rendered", () => {
    expect(html).toContain("What we are building");
  });

  it("2. CLAIMS COMPLIANCE: No fabricated client logos or unverified metrics", () => {
    expect(html).not.toContain("Fortune 500");
    expect(html).not.toContain("Trusted by 100+ clients");
    expect(html).toContain("Proof on this site reflects only verified, evidence-supported deliverables");
  });
});

describe("Phase 5: Frequently Asked Questions (8 Questions)", () => {
  const html = renderToStaticMarkup(React.createElement(HomepageFAQSection));

  it("1. ALL EIGHT RATIFIED QUESTIONS EXIST VERBATIM:", () => {
    const questions = [
      "I am not technical. Can I still start?",
      "Do I need to know whether I need a website, an app, or a system?",
      "Can YCN work with the tools and systems we already use?",
      "I already have a website or software. Can you improve it?",
      "How are cost and scope decided?",
      "Who owns the finished work?",
      "What happens after launch?",
      "What information should I bring to our first conversation?",
    ];

    for (const q of questions) {
      expect(html).toContain(q);
    }
  });

  it("2. SEMANTIC DETAILS/SUMMARY TAGS: Uses native details tag", () => {
    expect(html).toContain("<details");
    expect(html).toContain("<summary");
  });
});

describe("Phase 5: Needs Finder & Quiet Close", () => {
  const html = renderToStaticMarkup(React.createElement(NeedsFinderAndCloseSection));

  it("1. RATIFIED NEEDS FINDER HEADLINE & OPTIONS:", () => {
    expect(html).toContain("What would you like to make easier?");
    expect(html).toContain("Help customers find my business");
    expect(html).toContain("Make enquiries, bookings or orders easier");
    expect(html).toContain("Reduce repetitive work");
    expect(html).toContain("Build a product");
    expect(html).toContain("Not sure yet?");
  });

  it("2. QUIET CLOSE RATIFIED COPY:", () => {
    expect(html).toContain("What should work better next?");
    expect(html).toContain("Start with the problem.");
    expect(html).toContain("work out what the right product should be.");
    expect(html).toContain("Start a Project");
    expect(html).toContain("Software, engineered to hold up.");
  });
});

describe("Phase 5: Canonical Footer", () => {
  const html = renderToStaticMarkup(React.createElement(Footer));

  it("1. RATIFIED FOOTER TEXT:", () => {
    expect(html).toContain("YCN Labs — technology and software built around how businesses work.");
    expect(html).toContain("Software, engineered to hold up.");
  });
});
