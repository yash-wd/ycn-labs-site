import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ConnectedRequestsSection } from "@/components/homepage/vnext/ConnectedRequestsSection";

// Mock next/link if needed
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

describe("Phase 4: Customer Side ↔ Business Side Specification Proof", () => {
  const html = renderToStaticMarkup(React.createElement(ConnectedRequestsSection));

  it("1. RATIFIED CUSTOMER HEADING: Exact customer heading is present", () => {
    expect(html).toContain("Make the next step obvious.");
  });

  it("2. RATIFIED BUSINESS HEADING: Exact business heading is present", () => {
    expect(html).toContain("Make the next step visible.");
  });

  it("3. RATIFIED CONNECTED-FLOW LEAD: Exact lead headline is present", () => {
    expect(html).toContain("One action. A clear next step.");
  });

  it("4. SUPERSEDED HEADINGS ABSENT: No unratified marketing copy", () => {
    expect(html).not.toContain("Automate your business effortlessly");
    expect(html).not.toContain("AI-powered request intelligence");
  });
});

describe("Phase 4: Workflow States & Semantics Proof", () => {
  const html = renderToStaticMarkup(React.createElement(ConnectedRequestsSection));

  it("1. FIVE RATIFIED WORKFLOW STATES: All plain-language states are present", () => {
    expect(html).toContain("Received");
    expect(html).toContain("Assigned");
    expect(html).toContain("Next action");
    expect(html).toContain("In progress");
    expect(html).toContain("Complete");
  });

  it("2. STATE DESCRIPTIONS & MEANINGS: Each state has accessible explanatory text", () => {
    expect(html).toContain("Request reached the business.");
    expect(html).toContain("Someone owns it.");
    expect(html).toContain("The next step is clear.");
    expect(html).toContain("The work is moving.");
    expect(html).toContain("The request is closed.");
  });

  it("3. ZERO TECH ARCHITECTURE JARGON: No database nodes, API keys, or code schemas", () => {
    expect(html).not.toContain("PostgreSQL");
    expect(html).not.toContain("GraphQL");
    expect(html).not.toContain("REST API");
    expect(html).not.toContain("Kafka");
    expect(html).not.toContain("Webhook endpoint");
    expect(html).not.toContain("Unified Pipeline");
  });
});

describe("Phase 4: Connected Request Flow & Channels Proof", () => {
  const html = renderToStaticMarkup(React.createElement(ConnectedRequestsSection));

  it("1. PLAIN INPUT SOURCES: Inputs are represented neutrally", () => {
    expect(html).toContain("Website");
    expect(html).toContain("Enquiry");
    expect(html).toContain("Booking");
    expect(html).toContain("Order");
    expect(html).toContain("Team update");
  });

  it("2. RESOLVED OUTPUTS: All 4 output semantics exist with clear labels", () => {
    expect(html).toContain("One owner");
    expect(html).toContain("One next step");
    expect(html).toContain("Clear status");
    expect(html).toContain("Follow-up");
  });

  it("3. SAMPLE DISCLOSURE: In-component disclosure footnote is present", () => {
    expect(html).toContain("Sample · connected product flow");
  });

  it("4. ZERO FAKE METRICS: No revenue numbers, percentages, or KPI tiles", () => {
    expect(html).not.toContain("$");
    expect(html).not.toContain("MRR");
    expect(html).not.toContain("ARR");
    expect(html).not.toContain("ROI");
    expect(html).not.toContain("KPI");
    expect(html).not.toMatch(/\+\d+%/);
  });

  it("5. ZERO THREE.JS / WEBGL: SVG/DOM implementation only", () => {
    expect(html).not.toMatch(/<canvas[\s>]/i);
    expect(html).not.toContain("three");
    expect(html).not.toContain("webgl");
    expect(html).not.toMatch(/<video[\s>]/i);
  });
});
