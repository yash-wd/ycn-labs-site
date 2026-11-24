import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) =>
    React.createElement("a", { href, ...rest }, children),
}));

import {
  HomepageR2,
  RealisticWebsiteDemo,
  RealisticWebAppDemo,
  RealisticAutomationDemo,
} from "@/components/r2/HomepageR2";

describe("Homepage R2 Candidate: Exact Copy & Integrity Verification", () => {
  const html = renderToStaticMarkup(React.createElement(HomepageR2));

  it("renders the exact Claude-approved H1 and subtitle without agency jargon", () => {
    expect(html).toContain("Websites that earn trust.");
    expect(html).toContain("Software that saves time.");
    expect(html).toContain(
      "We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving."
    );
  });

  it("renders exactly one H1 headline and approved section headings", () => {
    const h1Matches = html.match(/<h1[^>]*>/g) || [];
    expect(h1Matches.length).toBe(1);
    expect(html).toContain('id="hero-title"');
    expect(html).toContain('id="showroom-title"');
    expect(html).toContain("Explore what we can build");
  });

  it("unifies primary call to action to 'Start a Project' across sections", () => {
    const startMatches = html.match(/Start a Project/g) || [];
    expect(startMatches.length).toBeGreaterThanOrEqual(2);
    expect(html).not.toContain("Start a project");
    expect(html).toContain("See what we solve");
    expect(html).toContain("You don’t need a technical brief to start.");
    expect(html).toContain("Explore interactive examples ↓");
  });

  it("contains all three service offerings with approved concise benefits", () => {
    expect(html).toContain("Clear for your customers.");
    expect(html).toContain("Useful for your team.");
    expect(html).toContain("Make a strong first impression.");
    expect(html).toContain("A clear, fast website: what you offer, where you are, how to reach you.");
    expect(html).toContain("Bring the work together.");
    expect(html).toContain("Orders, bookings and requests on one screen, with a name against each.");
    expect(html).toContain("Less copying. More doing.");
    expect(html).toContain("When a form comes in, the sheet updates and the right person is told.");
  });

  it("renders the transparent 3-step delivery process with scope in rupees", () => {
    expect(html).toContain("A clear plan.");
    expect(html).toContain("From day one.");
    expect(html).toContain("Talk through the problem.");
    expect(html).toContain("Tell us what is difficult today, in your own words.");
    expect(html).toContain("See the plan and the price.");
    expect(html).toContain("A written scope and a quote in rupees before work starts.");
    expect(html).toContain("Build. Test. Hand over.");
    expect(html).toContain("You see progress, check it, and receive what was agreed.");
  });

  it("enforces solo-builder accountability without corporate obfuscation", () => {
    expect(html).toContain("Founder-led.");
    expect(html).toContain("Fully accountable.");
    expect(html).toContain(
      "The founder leads every project. When a project needs more hands, we will bring in specialists, and you will be told who is doing what before work starts."
    );
    expect(html).not.toContain("Yaseen leads every project personally");
    expect(html).toContain("Talk directly with the person building your project.");
  });

  it("enforces the final section prompt without aggressive sales pressure", () => {
    expect(html).toContain("What would you like to make easier?");
    expect(html).toContain("Tell us what is happening today. We&#x27;ll suggest a first step.");
  });

  it("P0 Check: strictly excludes misleading certifications, corporate names, and unverified claims", () => {
    // Prohibited strings per repository safety standards and GPT review
    expect(html).not.toMatch(/NABL/i);
    expect(html).not.toMatch(/Schneider/i);
    expect(html).not.toMatch(/HDFC/i);
    expect(html).not.toMatch(/Apollo/i);
    expect(html).not.toMatch(/AES-256/i);
    expect(html).not.toMatch(/0\.38s/i);
    expect(html).not.toMatch(/revolutionary|cutting-edge|guaranteed growth/i);

    // Concept is explicitly labelled with ratified disclosures
    expect(html).toContain(
      "Examples only. Example Home Repairs, Example Home Supplies, Example Learning Hub and the example shop shown above are not real businesses or clients. Nothing you do here is submitted, bought or sent."
    );
    expect(html).toContain(
      "Concept demonstrations are clearly labelled; we do not present them as client results."
    );
  });

  it("P0 Check: removes false submission and mobile delivery feedback from browser simulations", () => {
    const websiteIdleHtml = renderToStaticMarkup(<RealisticWebsiteDemo />);
    const websiteBookedHtml = renderToStaticMarkup(<RealisticWebsiteDemo initialBookingStatus="booked" />);
    const appHtml = renderToStaticMarkup(<RealisticWebAppDemo />);
    const autoStep1Html = renderToStaticMarkup(<RealisticAutomationDemo />);
    const autoStep3Html = renderToStaticMarkup(<RealisticAutomationDemo initialStep={3} />);

    expect(websiteIdleHtml).not.toContain("Clinic receives details directly");
    expect(websiteIdleHtml).toContain("Request a visit");

    expect(websiteBookedHtml).toContain("Example only. On a real site, the clinic would receive this request.");
    expect(websiteBookedHtml).toContain("Reset example");

    expect(appHtml).toContain("Terminal until reset");
    expect(appHtml).toContain("Reset example");

    expect(autoStep1Html).not.toContain("Delivered to mobile");
    expect(autoStep1Html).toContain("Simulation demonstration only. No real data is recorded");

    expect(autoStep3Html).toContain("Example only. Nothing is actually sent.");
  });

  it("contains accessible six-mode showroom controls and ARIA attributes", () => {
    expect(html).toContain('role="tablist"');
    expect(html).toContain('aria-label="Choose an example"');
    expect(html).toContain('id="tab-website"');
    expect(html).toContain('id="tab-webapp"');
    expect(html).toContain('id="tab-automation"');
    expect(html).toContain('id="tab-crm"');
    expect(html).toContain('id="tab-store"');
    expect(html).toContain('id="tab-learning"');
    expect(html).toContain('id="showroom"');
    expect(html).toContain('id="showroom-title"');
  });
});
