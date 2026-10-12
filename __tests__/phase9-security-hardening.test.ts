import { describe, it, expect } from "vitest";
import { hashClientIp, getRateLimitSecret } from "@/lib/security/ratelimit";
import crypto from "crypto";
import nextConfig from "@/next.config.mjs";
import fs from "fs";
import path from "path";

describe("Phase 9: Security & Environmental Hardening", () => {
  describe("1. HMAC Client IP Hashing", () => {
    it("uses HMAC-SHA-256 with secret rather than unsalted sha256", () => {
      const secret = "custom-test-secret-at-least-32-chars-long";
      const request = new Request("http://localhost:3000/api/contact", {
        headers: { "x-forwarded-for": "203.0.113.195, 10.0.0.1" },
      });

      const hashed = hashClientIp(request, secret);
      const unsalted = crypto.createHash("sha256").update("203.0.113.195").digest("hex");
      const expectedHmac = crypto.createHmac("sha256", secret).update("203.0.113.195").digest("hex");

      expect(hashed).toBe(expectedHmac);
      expect(hashed).not.toBe(unsalted);
      expect(hashed).not.toContain("203.0.113.195");
    });

    it("produces distinct digests when secret changes for the same IP (keyed HMAC property)", () => {
      const request = new Request("http://localhost:3000/api/contact", {
        headers: { "x-real-ip": "198.51.100.42" },
      });

      const hashA = hashClientIp(request, "secret-key-alpha-version-12345678");
      const hashB = hashClientIp(request, "secret-key-beta-version-87654321");

      expect(hashA).not.toBe(hashB);
      expect(hashA).toHaveLength(64);
      expect(hashB).toHaveLength(64);
    });

    it("falls back to deterministic dev secret in non-production environments", () => {
      const secret = getRateLimitSecret();
      expect(typeof secret).toBe("string");
      expect(secret.length).toBeGreaterThanOrEqual(16);
    });
  });

  describe("2. Security Headers in next.config.mjs", () => {
    it("declares comprehensive security headers including clickjacking and nosniff", async () => {
      expect(nextConfig.headers).toBeDefined();
      const headersConfig = (await nextConfig.headers?.()) ?? [];
      const globalHeaders = headersConfig.find((h: any) => h.source === "/:path*");
      expect(globalHeaders).toBeDefined();

      const headerMap = new Map(
        globalHeaders?.headers.map((h: any) => [h.key, h.value]) ?? []
      );

      expect(headerMap.get("X-Content-Type-Options")).toBe("nosniff");
      expect(headerMap.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
      expect(headerMap.get("X-Frame-Options")).toBe("DENY");
      expect(headerMap.get("Permissions-Policy")).toContain("camera=()");
      expect(headerMap.get("Permissions-Policy")).toContain("microphone=()");
      expect(headerMap.get("Content-Security-Policy")).toBe("frame-ancestors 'none';");
    });

    it("disables poweredByHeader", () => {
      expect(nextConfig.poweredByHeader).toBe(false);
    });

    it("preserves /what-we-build redirect to /what-we-solve", async () => {
      expect(nextConfig.redirects).toBeDefined();
      const redirects = (await nextConfig.redirects?.()) ?? [];
      const redirect = redirects.find((r: any) => r.source === "/what-we-build");
      expect(redirect).toBeDefined();
      expect(redirect?.destination).toBe("/what-we-solve");
      expect(redirect?.permanent).toBe(true);
    });
  });

  describe("3. Native ESM Vitest Config (DEBT-001)", () => {
    it("uses import.meta.dirname instead of legacy __dirname", () => {
      const vitestConfigContent = fs.readFileSync(
        path.join(process.cwd(), "vitest.config.ts"),
        "utf8"
      );
      expect(vitestConfigContent).toContain("import.meta.dirname");
      expect(vitestConfigContent).not.toContain("__dirname");
    });
  });

  describe("4. Verbatim Ratified Copy on /about", () => {
    it("ensures callout panel uses strictly verbatim ratified copy", () => {
      const aboutContent = fs.readFileSync(
        path.join(process.cwd(), "app/about/page.tsx"),
        "utf8"
      );
      expect(aboutContent).toContain(
        "We care about clarity on the surface and engineering discipline underneath."
      );
      expect(aboutContent).toContain(
        "We do not present concepts as client work or future capabilities as services already proven."
      );
      expect(aboutContent).not.toContain(
        "Serving businesses taking a first step online and teams outgrowing the way they work today."
      );
    });
  });

  describe("5. Complete Three.js & Dead Scene Removal", () => {
    it("confirms three and @types/three are completely absent from package.json", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8")
      );
      expect(pkg.dependencies?.three).toBeUndefined();
      expect(pkg.devDependencies?.["@types/three"]).toBeUndefined();
    });

    it("confirms dead legacy cinematic directory and scene files are completely removed", () => {
      expect(fs.existsSync(path.join(process.cwd(), "components/cinematic"))).toBe(false);
      expect(fs.existsSync(path.join(process.cwd(), "components/homepage/Scene0Entrance.tsx"))).toBe(false);
      expect(fs.existsSync(path.join(process.cwd(), "components/homepage/Scene5System.tsx"))).toBe(false);
    });
  });

  describe("6. Next.js Image Optimization & Security Overrides", () => {
    it("configures modern AVIF and WebP image formats in next.config.mjs", () => {
      expect(nextConfig.images?.formats).toContain("image/avif");
      expect(nextConfig.images?.formats).toContain("image/webp");
    });

    it("enforces patched dependencies in pnpm-workspace.yaml", () => {
      const workspaceYaml = fs.readFileSync(
        path.join(process.cwd(), "pnpm-workspace.yaml"),
        "utf8"
      );
      expect(workspaceYaml).toContain("sharp: '>=0.35.4'");
      expect(workspaceYaml).toContain("postcss: '>=8.5.28'");
    });
  });
});
