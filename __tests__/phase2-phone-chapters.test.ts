import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Phone3D } from "@/components/devices/Phone3D";
import { PhoneChaptersSection } from "@/components/homepage/vnext/PhoneChaptersSection";

// Mock next/link for SSR/test environment
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

describe("Phase 2: HOME-02D 'Visual Capability Stage' Specification Proof", () => {
  const sectionHtml = renderToStaticMarkup(React.createElement(PhoneChaptersSection));

  it("1. RATIFIED HEADLINE & CLOSE: Renders exact canonical CONTENT_SPEC §4 H1 and closing prompt", () => {
    expect(sectionHtml).toContain("What are you trying to change?");
    expect(sectionHtml).toContain("Not sure which one you need? Tell us what is happening today.");
    expect(sectionHtml).toContain("Start a Project");
  });

  it("2. RATIFIED FIVE CAPABILITIES COPY: Renders exact canonical titles, needs, and explanations", () => {
    // 01. Websites & digital presence
    expect(sectionHtml).toContain("01");
    expect(sectionHtml).toContain("Customers need to find me");
    expect(sectionHtml).toContain("Websites &amp; digital presence");
    expect(sectionHtml).toContain(
      "Make it easier for people to understand what you offer and contact you."
    );

    // 02. Customer experiences
    expect(sectionHtml).toContain("02");
    expect(sectionHtml).toContain("Customers need an easier way to act");
    expect(sectionHtml).toContain("Customer experiences");
    expect(sectionHtml).toContain(
      "Enquiries, bookings, ordering, portals and other clear customer journeys."
    );

    // 03. Business systems & automation
    expect(sectionHtml).toContain("03");
    expect(sectionHtml).toContain("My team does too much manually");
    expect(sectionHtml).toContain("Business systems &amp; automation");
    expect(sectionHtml).toContain(
      "Dashboards, workflows, integrations and tools built around how the work actually happens."
    );

    // 04. Software products
    expect(sectionHtml).toContain("04");
    expect(sectionHtml).toContain("I have a product idea");
    expect(sectionHtml).toContain("Software products");
    expect(sectionHtml).toContain(
      "Web apps, mobile products and SaaS built from a useful first version outward."
    );

    // 05. Custom software
    expect(sectionHtml).toContain("05");
    expect(sectionHtml).toContain("I need something specific");
    expect(sectionHtml).toContain("Custom software");
    expect(sectionHtml).toContain(
      "Start with the problem and design the appropriate system rather than forcing a standard package."
    );
  });

  it("3. ABSENCE OF RELAY & STANDALONE THREAD: No Relay copy or relay elements in HOME-02", () => {
    expect(sectionHtml).not.toContain("relay-stage");
    expect(sectionHtml).not.toContain("relay-thread");
    expect(sectionHtml).not.toContain("Relay");
  });

  it("4. ZERO PHONE3D IN HOME-02: Section does NOT render Phone3D or phone chassis", () => {
    expect(sectionHtml).not.toContain("phone-3d-stage");
    expect(sectionHtml).not.toContain("phone-3d-chassis");
    expect(sectionHtml).not.toContain("phone-screen-viewport");
    expect(sectionHtml).not.toContain("w-[50vw]");
    expect(sectionHtml).not.toContain("max-w-[207px]");
  });

  it("5. NORMAL DOCUMENT FLOW & NATIVE STICKY: Section does NOT use viewport pinning or scroll tracks", () => {
    expect(sectionHtml).not.toContain("sticky top-0");
    expect(sectionHtml).not.toContain("sticky top-16");
    expect(sectionHtml).not.toContain("min-h-[320vh]");
    expect(sectionHtml).not.toContain("phone-chapters-stage");
  });

  it("6. ABSENCE OF REJECTED FICTIONAL CONTENT: Zero invented proper nouns, brands, domains, or IDs", () => {
    expect(sectionHtml).not.toContain("facilities-group.com");
    expect(sectionHtml).not.toContain("Commercial Facilities Group");
    expect(sectionHtml).not.toContain("Westgate Compliance Portal");
    expect(sectionHtml).not.toContain("Westgate HVAC Overhaul");
    expect(sectionHtml).not.toContain("Westgate");
    expect(sectionHtml).not.toContain("Sector 4");
    expect(sectionHtml).not.toContain("YC-409");
    expect(sectionHtml).not.toContain("Plant Diagnostic Assessment");

    // Plain generic labels for Business systems mandated by vnext/06 §8
    expect(sectionHtml).toContain("Requests");
    expect(sectionHtml).toContain("Owner");
    expect(sectionHtml).toContain("Next step");
    expect(sectionHtml).toContain("Status");
  });

  it("7. PERMANENT IN-SURFACE DISCLOSURE (DECISION-037/035): All illustrative surfaces carry 'Sample · nothing is sent'", () => {
    expect(sectionHtml).toContain("Sample · nothing is sent");
  });

  it("8. ZERO SCROLL HIJACK: Code does NOT use programmatic scroll or forced positions", () => {
    const fs = require("fs");
    const path = require("path");
    const source = fs.readFileSync(
      path.join(process.cwd(), "components/homepage/vnext/PhoneChaptersSection.tsx"),
      "utf8"
    );
    expect(source).not.toContain("scrollTo(");
    expect(source).not.toContain("scrollIntoView(");
    expect(source).not.toContain("ScrollToPlugin");
    expect(source).not.toContain("pin: true");
    expect(source).not.toContain("pin:");
  });
});

describe("Phase 2: Phone3D Shared Component Proof (Preserved for Later Product Contexts)", () => {
  it("1. S0 (find): Discovery state renders verified Hero/discovery strings", () => {
    const s0Html = renderToStaticMarkup(React.createElement(Phone3D, { state: "S0" }));
    expect(s0Html).toContain("How can we help?");
    expect(s0Html).toContain("Request a quote");
    expect(s0Html).toContain("Book a service");
    expect(s0Html).toContain("Track a request");
    expect(s0Html).toContain("Sample · nothing is sent");
  });

  it("2. S1 (ask): Customer action state renders enquiry and submission acknowledgement", () => {
    const s1Html = renderToStaticMarkup(React.createElement(Phone3D, { state: "S1" }));
    expect(s1Html).toContain("Ask a question");
    expect(s1Html).toContain("We need to modernise our customer booking flow");
    expect(s1Html).toContain("Sent · Received by your business");
    expect(s1Html).toContain("Sample · nothing is sent");
  });

  it("3. S2 (handle): Business request queue renders active pipeline and statuses", () => {
    const s2Html = renderToStaticMarkup(React.createElement(Phone3D, { state: "S2" }));
    expect(s2Html).toContain("Active Requests");
    expect(s2Html).toContain("Every request has a name and a next step.");
    expect(s2Html).toContain("Assigned");
    expect(s2Html).toContain("Confirmed");
    expect(s2Html).toContain("Reply sent");
    expect(s2Html).toContain("Sample · nothing is sent");
  });

  it("4. S3 (keep): Business continuity state renders operational stability and support", () => {
    const s3Html = renderToStaticMarkup(React.createElement(Phone3D, { state: "S3" }));
    expect(s3Html).toContain("Today");
    expect(s3Html).toContain("Everything running OK");
    expect(s3Html).toContain("Running OK");
    expect(s3Html).toContain("Automated backups");
    expect(s3Html).toContain("Daily OK");
    expect(s3Html).toContain("Something wrong?");
    expect(s3Html).toContain("You know who to call.");
    expect(s3Html).toContain("Sample · nothing is sent");
  });

  it("5. PERMANENT IN-DEVICE DISCLOSURE: 'Sample · nothing is sent' is present across all states", () => {
    for (const state of ["S0", "S1", "S2", "S3"] as const) {
      const html = renderToStaticMarkup(React.createElement(Phone3D, { state }));
      expect(html).toContain("Sample · nothing is sent");
    }
  });

  it("6. ZERO HARDWARE VENDOR DEPENDENCIES: Zero Three.js, WebGL, or Canvas in Phone3D DOM", () => {
    const html = renderToStaticMarkup(React.createElement(Phone3D));
    expect(html).not.toMatch(/<canvas[\s>]/i);
    expect(html).not.toContain("three");
    expect(html).not.toContain("webgl");
    expect(html).not.toMatch(/<video[\s>]/i);
  });
});
