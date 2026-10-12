import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EditorialLaptopPortalSection } from "@/components/homepage/vnext/EditorialLaptopPortalSection";
import { Laptop3D } from "@/components/devices/Laptop3D";
import { BusinessScreenView } from "@/components/homepage/vnext/BusinessScreenView";

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

describe("Phase 3: Editorial Reset Specification Proof", () => {
  const portalHtml = renderToStaticMarkup(React.createElement(EditorialLaptopPortalSection));

  it("1. RATIFIED EDITORIAL LEAD: Exact ratified sentence is present", () => {
    expect(portalHtml).toContain("The product people see is only the beginning.");
  });

  it("2. RATIFIED EDITORIAL SUPPORT: Exact ratified sentence is present", () => {
    expect(portalHtml).toContain("What happens after someone acts matters just as much.");
  });

  it("3. SUPERSEDED COPY STRICTLY ABSENT: No 'The experience is only the front'", () => {
    expect(portalHtml).not.toContain("The experience is only the front");
  });
});

describe("Phase 3: Laptop Portal Specification Proof", () => {
  const portalHtml = renderToStaticMarkup(React.createElement(EditorialLaptopPortalSection));

  it("1. RATIFIED LAPTOP HEADLINE: Exact ratified headline is present", () => {
    expect(portalHtml).toContain("Simple outside. Structured inside.");
  });

  it("2. RATIFIED LAPTOP SUPPORT: Exact ratified support copy is present", () => {
    expect(portalHtml).toContain(
      "Customers get a clear experience. Your team gets the information, ownership and next step behind it."
    );
  });

  it("3. SUPERSEDED LAPTOP COPY STRICTLY ABSENT: No long unratified body text", () => {
    expect(portalHtml).not.toContain("A single platform for everything");
    expect(portalHtml).not.toContain("Enterprise grade solutions");
  });

  it("4. DOM/CSS LAPTOP SHELL: Renders without Three.js, WebGL, or Canvas", () => {
    const laptopHtml = renderToStaticMarkup(React.createElement(Laptop3D));
    expect(laptopHtml).not.toMatch(/<canvas[\s>]/i);
    expect(laptopHtml).not.toContain("three");
    expect(laptopHtml).not.toContain("webgl");
    expect(laptopHtml).not.toMatch(/<video[\s>]/i);
  });
});

describe("Phase 3: Business Screen Content (S2 Continuity)", () => {
  const businessHtml = renderToStaticMarkup(React.createElement(BusinessScreenView));

  it("1. REQUESTS HEADING & SEMANTICS: Exposes Requests with plain language tagline", () => {
    expect(businessHtml).toContain("Requests");
    expect(businessHtml).toContain("Every request has a name and a next step.");
  });

  it("2. S2 TABLE COLUMNS & ATTRIBUTES: Contains Request, Owner, Next step, and Status", () => {
    expect(businessHtml).toContain("Request");
    expect(businessHtml).toContain("Owner");
    expect(businessHtml).toContain("Next step");
    expect(businessHtml).toContain("Status");
  });

  it("3. RATIFIED REQUEST SAMPLES: Renders neutral request labels and team ownership", () => {
    expect(businessHtml).toContain("Website enquiry");
    expect(businessHtml).toContain("Design Lead");
    expect(businessHtml).toContain("Service booking");
    expect(businessHtml).toContain("Delivery Lead");
    expect(businessHtml).toContain("Order request");
    expect(businessHtml).toContain("Operations");
  });

  it("4. RATIFIED STATUSES: Assigned, Confirmed, and Reply sent are rendered", () => {
    expect(businessHtml).toContain("Assigned");
    expect(businessHtml).toContain("Confirmed");
    expect(businessHtml).toContain("Reply sent");
  });

  it("5. SAMPLE DISCLOSURE: In-device footnote is present", () => {
    expect(businessHtml).toContain("Sample · business view");
  });

  it("6. ZERO FAKE METRICS: No revenue, KPI percentages, or tech vendor names", () => {
    expect(businessHtml).not.toContain("$");
    expect(businessHtml).not.toContain("MRR");
    expect(businessHtml).not.toContain("ARR");
    expect(businessHtml).not.toContain("AWS");
    expect(businessHtml).not.toContain("Supabase");
  });
});
