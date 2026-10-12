import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

function normalize(text: string): string {
  return text
    .replace(/[\u2018\u2019']/g, "'")
    .replace(/[\u201c\u201d"]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function getTsxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getTsxFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
      files.push(fullPath);
    }
  }
  return files;
}

describe("Content Specification Authority & Anti-Drift Suite", () => {
  const root = process.cwd();

  // Read all TSX/TS files in app and components
  const codeFiles = [
    ...getTsxFiles(path.join(root, "app")),
    ...getTsxFiles(path.join(root, "components")),
  ];
  const codeContent = codeFiles
    .map((f) => fs.readFileSync(f, "utf8"))
    .join("\n");
  const normalizedCode = normalize(codeContent);

  describe("1. Homepage Canonical Narrative", () => {
    it("renders exact ratified Hero H1 and Support line", () => {
      const heroH1 = "Websites and software. Built around your business.";
      const heroSub =
        "We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving.";

      expect(normalizedCode).toContain(normalize(heroH1));
      expect(normalizedCode).toContain(normalize(heroSub));
    });

    it("renders exact ratified HOME-02 'What are you trying to change?' capabilities, needs, and explanations", () => {
      // Headline
      expect(normalizedCode).toContain(normalize("What are you trying to change?"));

      // 5 Canonical Capabilities, Needs, and Explanations
      expect(normalizedCode).toContain(normalize("Customers need to find me"));
      expect(normalizedCode).toContain(normalize("Websites & digital presence"));
      expect(normalizedCode).toContain(
        normalize("Make it easier for people to understand what you offer and contact you.")
      );

      expect(normalizedCode).toContain(normalize("Customers need an easier way to act"));
      expect(normalizedCode).toContain(normalize("Customer experiences"));
      expect(normalizedCode).toContain(
        normalize("Enquiries, bookings, ordering, portals and other clear customer journeys.")
      );

      expect(normalizedCode).toContain(normalize("My team does too much manually"));
      expect(normalizedCode).toContain(normalize("Business systems & automation"));
      expect(normalizedCode).toContain(
        normalize("Dashboards, workflows, integrations and tools built around how the work actually happens.")
      );

      expect(normalizedCode).toContain(normalize("I have a product idea"));
      expect(normalizedCode).toContain(normalize("Software products"));
      expect(normalizedCode).toContain(
        normalize("Web apps, mobile products and SaaS built from a useful first version outward.")
      );

      expect(normalizedCode).toContain(normalize("I need something specific"));
      expect(normalizedCode).toContain(normalize("Custom software"));
      expect(normalizedCode).toContain(
        normalize("Start with the problem and design the appropriate system rather than forcing a standard package.")
      );

      // Close
      expect(normalizedCode).toContain(
        normalize("Not sure which one you need? Tell us what is happening today.")
      );
    });

    it("renders exact ratified Editorial Reset lead and support", () => {
      const lead = "The product people see is only the beginning.";
      const support = "What happens after someone acts matters just as much.";

      expect(normalizedCode).toContain(normalize(lead));
      expect(normalizedCode).toContain(normalize(support));
    });

    it("renders exact ratified Laptop Portal headline, support, and headings", () => {
      expect(normalizedCode).toContain(normalize("Simple outside. Structured inside."));
      expect(normalizedCode).toContain(
        normalize("Customers get a clear experience. Your team gets the information, ownership and next step behind it.")
      );
      expect(normalizedCode).toContain(normalize("Make the next step obvious."));
      expect(normalizedCode).toContain(normalize("Make the next step visible."));
    });

    it("renders ratified Connected Flow lead and strictly excludes unratified support sentence", () => {
      expect(normalizedCode).toContain(normalize("One action. A clear next step."));

      // Unratified copy that drifted into code must remain absent
      expect(normalizedCode).not.toContain(
        normalize("Every channel converges into one organized system with an owner, a next step and a clear status.")
      );
      expect(normalizedCode).not.toContain(
        normalize("Multiple plain input sources converge into one organized workflow.")
      );
    });

    it("renders exact ratified Needs Finder & Quiet Close", () => {
      expect(normalizedCode).toContain(normalize("What would you like to make easier?"));
      expect(normalizedCode).toContain(normalize("Help customers find my business"));
      expect(normalizedCode).toContain(normalize("Make enquiries, bookings or orders easier"));
      expect(normalizedCode).toContain(normalize("Reduce repetitive work"));
      expect(normalizedCode).toContain(normalize("Build a product"));
      expect(normalizedCode).toContain(normalize("What should work better next?"));
      expect(normalizedCode).toContain(normalize("Start with the problem. We'll work out what the right product should be."));
    });
  });

  describe("2. Supporting Pages Canonical H1s", () => {
    it("renders exact ratified H1 across all canonical supporting routes", () => {
      const canonicalRoutes = [
        { route: "app/what-we-solve/page.tsx", h1: "What are you trying to change?" },
        { route: "app/work/page.tsx", h1: "We show our work honestly." },
        { route: "app/how-we-work/page.tsx", h1: "You know your business. We know technology." },
        { route: "app/about/page.tsx", h1: "Technology should make a business easier to understand and easier to run." },
        { route: "app/engineering/page.tsx", h1: "Simple for the user. Deliberate underneath." },
        { route: "app/contact/page.tsx", h1: "Tell us what you're trying to improve." },
      ];

      for (const { route, h1 } of canonicalRoutes) {
        const fileContent = fs.readFileSync(path.join(root, route), "utf8");
        expect(normalize(fileContent)).toContain(normalize(h1));
      }
    });

    it("verifies verbatim ratified copy on /about callout panel", () => {
      const aboutContent = fs.readFileSync(path.join(root, "app/about/page.tsx"), "utf8");
      expect(aboutContent).toContain("We care about clarity on the surface and engineering discipline underneath.");
      expect(aboutContent).toContain(
        "We do not present concepts as client work or future capabilities as services already proven."
      );
    });
  });

  describe("3. Footer Canonical Statements", () => {
    it("renders primary and secondary ratified footer statements", () => {
      expect(normalizedCode).toContain(
        normalize("YCN Labs - technology and software built around how businesses work.")
      );
      expect(normalizedCode).toContain(normalize("Software, engineered to hold up."));
    });
  });
});
