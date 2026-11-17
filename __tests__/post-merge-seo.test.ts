import { describe, it, expect, beforeEach, afterEach } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("Post-Merge SEO: robots.ts & sitemap.ts fail-safe behavior", () => {
  const originalSiteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const originalEnv = process.env.NEXT_PUBLIC_ENV;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_ENV;
    delete process.env.NEXT_PUBLIC_ENV;
  });

  afterEach(() => {
    if (originalSiteEnv !== undefined) {
      process.env.NEXT_PUBLIC_SITE_ENV = originalSiteEnv;
    } else {
      delete process.env.NEXT_PUBLIC_SITE_ENV;
    }
    if (originalEnv !== undefined) {
      process.env.NEXT_PUBLIC_ENV = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_ENV;
    }
  });

  describe("Non-production / Staging / Unset Environment (Fail-Safe)", () => {
    it("disallows all crawlers from '/' and does not advertise production sitemap in robots.ts", () => {
      const res = robots();
      const rules = Array.isArray(res.rules) ? res.rules[0] : res.rules;

      expect(rules.userAgent).toBe("*");
      expect(rules.disallow).toBe("/");
      expect(res.sitemap).toBeUndefined();
    });

    it("returns an empty sitemap in staging so non-production builds do not advertise indexing URLs", () => {
      process.env.NEXT_PUBLIC_SITE_ENV = "staging";
      const entries = sitemap();
      expect(entries).toEqual([]);
    });
  });

  describe("Explicit Production Environment (NEXT_PUBLIC_SITE_ENV=production)", () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_SITE_ENV = "production";
    });

    it("allows '/' and disallows only '/api/' without disallowing '/_next/'", () => {
      const res = robots();
      const rules = Array.isArray(res.rules) ? res.rules[0] : res.rules;

      expect(rules.userAgent).toBe("*");
      expect(rules.allow).toBe("/");
      expect(rules.disallow).toEqual(["/api/"]);
      expect(rules.disallow).not.toContain("/_next/");
      expect(res.sitemap).toBe("https://ycnlabs.com/sitemap.xml");
    });

    it("includes canonical routes and excludes unpublished routes (/blog, /gallery, /updates)", () => {
      const entries = sitemap();
      const urls = entries.map((e) => e.url);

      expect(urls).toContain("https://ycnlabs.com");
      expect(urls).toContain("https://ycnlabs.com/what-we-solve");
      expect(urls).toContain("https://ycnlabs.com/work");
      expect(urls).toContain("https://ycnlabs.com/how-we-work");
      expect(urls).toContain("https://ycnlabs.com/engineering");
      expect(urls).toContain("https://ycnlabs.com/about");
      expect(urls).toContain("https://ycnlabs.com/contact");
      expect(urls).toContain("https://ycnlabs.com/credits");
      expect(urls).toContain("https://ycnlabs.com/privacy");
      expect(urls).toContain("https://ycnlabs.com/terms");

      // Verify unpublished routes remain excluded
      expect(urls).not.toContain("https://ycnlabs.com/blog");
      expect(urls).not.toContain("https://ycnlabs.com/gallery");
      expect(urls).not.toContain("https://ycnlabs.com/updates");
    });

    it("omits lastModified entirely and does not invent timestamps", () => {
      const entries = sitemap();
      for (const entry of entries) {
        expect(entry).not.toHaveProperty("lastModified");
      }
    });
  });
});
