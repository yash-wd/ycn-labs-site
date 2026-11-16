import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) =>
    React.createElement("a", { href, ...rest }, children),
}));

import { HomepageR2 } from "@/components/r2/HomepageR2";

describe("Homepage R2 Candidate: Exact Copy & Integrity Verification", () => {
  const html = renderToStaticMarkup(React.createElement(HomepageR2));

  it("renders the exact Claude-approved H1 and subtitle without agency jargon", () => {
    expect(html).toContain("Websites that earn trust.");
    expect(html).toContain("Software that saves time.");
    expect(html).toContain(
      "We design and build websites, web apps and practical automations that make your business easier to understand and easier to run."
    );
  });

  it("unifies primary call to action to 'Start a project' across sections", () => {
    const startMatches = html.match(/Start a project/g) || [];
    expect(startMatches.length).toBeGreaterThanOrEqual(2);
    expect(html).toContain("See what we build");
    expect(html).toContain("Just tell us what isn&#x27;t working.");
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
    expect(html).toContain("One person.");
    expect(html).toContain("Full responsibility.");
    expect(html).toContain("You deal with the person who builds it.");
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

    // Concept is explicitly labelled
    expect(html).toContain("CONCEPT · NOT CLIENT WORK");
  });

  it("contains interactive controls and accessible ARIA attributes", () => {
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Explore examples of YCN Labs services"');
    expect(html).toContain('data-scene="website"');
    expect(html).toContain('data-scene="app"');
    expect(html).toContain('data-scene="automation"');
  });
});
