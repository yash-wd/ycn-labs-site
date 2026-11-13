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
    // YCN-V3-UI (Owner approvals 10–12 Nov 2026): the V3 homepage copy (COPY-V3.md, headline A)
    // replaced the earlier ratified homepage narrative; the old sections were archived on Day 5.
    // CONTENT_SPEC is updated with the V3 copy at sprint end. Support line softened by Owner decision 13 Nov 2026.
    it("renders the Owner-approved V3 hero headline and support line", () => {
      expect(normalizedCode).toContain(normalize("Websites and software that bring your business enquiries."));
      expect(normalizedCode).toContain(
        normalize("We build the site, the forms and the follow-up, so customers can reach you and enquiries are easier to follow up.")
      );
    });

    it("keeps the earlier unratified Connected Flow sentences out of the code", () => {
      expect(normalizedCode).not.toContain(
        normalize("Every channel converges into one organized system with an owner, a next step and a clear status.")
      );
      expect(normalizedCode).not.toContain(
        normalize("Multiple plain input sources converge into one organized workflow.")
      );
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
