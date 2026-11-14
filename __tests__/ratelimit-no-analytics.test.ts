import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// YCN-RATELIMIT-NO-ANALYTICS-01 (14 Nov 2026): Upstash rate-limit analytics stay off.
// With analytics on, every limit() call stores {identifier (hashed IP), time, success} in
// hourly Redis buckets. @upstash/core-analytics 0.0.10 declares a `retention` option but
// never applies an expiry, so those events would be kept indefinitely. The site never reads them.
const source = fs.readFileSync(path.join(process.cwd(), "lib", "security", "ratelimit.ts"), "utf-8");

describe("YCN-RATELIMIT-NO-ANALYTICS-01", () => {
  it("never enables Upstash analytics", () => {
    expect(source).not.toMatch(/analytics:\s*true/);
  });

  it("sets analytics: false explicitly on both limiters", () => {
    expect(source.match(/analytics:\s*false/g)).toHaveLength(2);
  });

  it("keeps the one-hour sliding windows", () => {
    expect(source).toContain('Ratelimit.slidingWindow(5, "1 h")');
    expect(source).toContain('Ratelimit.slidingWindow(3, "1 h")');
  });
});
