import { describe, it, expect, vi } from "vitest";
import React from "react";
import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";

// YCN-V3-UI Day 4 (Owner approvals 12 Nov 2026): contact channels, status colours, Engineering intro.
vi.mock("next/navigation", () => ({ usePathname: () => "/contact", useSearchParams: () => new URLSearchParams() }));

import ContactPage from "@/app/contact/page";
import EngineeringPage from "@/app/engineering/page";

const read = (...p: string[]) => fs.readFileSync(path.join(process.cwd(), ...p), "utf-8");

describe("YCN-V3-UI Day 4", () => {
  const contact = renderToString(<ContactPage />);

  it("Contact keeps the ratified H1 and first-step paragraph", () => {
    expect(contact).toContain("Tell us what you’re trying to improve.");
    expect(contact).toContain("Tell us what is slow, lost or difficult in your business today.");
    expect((contact.match(/<h1/g) || []).length).toBe(1);
  });

  it("offers call, WhatsApp and email with the Owner-approved number", () => {
    expect(contact).toContain('href="tel:+918341226694"');
    expect(contact).toContain('href="https://wa.me/918341226694"');
    expect(contact).toContain('href="mailto:hello@ycnlabs.com"');
    expect(contact).toContain("+91 83412 26694");
    expect(contact).toMatch(/href="https:\/\/wa\.me\/918341226694"[^>]*rel="noopener noreferrer"|rel="noopener noreferrer"[^>]*href="https:\/\/wa\.me\/918341226694"/);
  });

  it("makes no response-time promise on Contact", () => {
    // "ASAP (within 1 month)" is the customer's project timeline option, not a reply promise.
    expect(contact).not.toMatch(/(reply|respond|get back)[^.]{0,20}within|within \d+ (hours|business days)|business day/i);
  });

  it("contact form colours come from the status tokens, not raw palette classes", () => {
    const form = read("components", "ContactForm.tsx");
    expect(form).not.toMatch(/rose-|emerald-/);
    expect(form).toContain("text-status-error");
    expect(form).toContain("text-status-success");
  });

  it("form fields, FAQ questions and the Work link are at least 44 px tall", () => {
    const form = read("components", "ContactForm.tsx");
    expect((form.match(/min-h-\[44px\] px-3\.5 py-2\.5/g) || []).length).toBe(5);
    expect(read("app", "globals.css")).toMatch(/\.v3-faq summary \{[^}]*min-height: 44px/);
    expect(read("app", "work", "page.tsx")).toContain("inline-flex min-h-[44px]");
  });

  it("Engineering intro uses the Owner-approved plain line", () => {
    const html = renderToString(<EngineeringPage />);
    expect(html).toContain("Technical choices should follow the actual problem. Here is how we build, and what we can show for it.");
    expect(html).not.toContain("must not turn targets into claims");
  });
});
