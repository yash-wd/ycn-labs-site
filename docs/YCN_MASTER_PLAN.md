# YCN Labs — Master Website Plan

**Revision:** 1.2  
**Status:** Canonical development baseline. Repository implementation remains to be audited.

## 1. North star

YCN Labs should make a visitor think:

> **I understand what they can do for my business, I can see how they think, I trust the way they build, and I know how to start.**

The primary audience includes Tier 2/Tier 3 Indian business owners who may have little technical knowledge. Technical knowledge must never be required to understand the company.

The website itself should demonstrate YCN’s promise: **simple on the surface, serious underneath.**

## 2. Company positioning

YCN Labs is a broad technology company that can grow across websites, applications, SaaS, business systems, automation, digital services, security and education. The website must not reduce YCN to a cheap website agency, freelancer or generic “AI agency.”

Current website communication should focus on what YCN can responsibly discuss and deliver now. Future capabilities must not be advertised as active services without delivery evidence.

## 3. Locked asset

The supplied YCN Labs logo artwork is final and must not be redrawn, re-proportioned or reinterpreted. Its supporting caption may remain in the lockup, but website copy—not the caption—explains the broader company.

## 4. Communication hierarchy

Always reveal information in this order:

1. **Business value** — what can improve for the visitor.
2. **Visual example** — show the journey.
3. **Capability** — what YCN can build.
4. **Process** — what working with YCN feels like.
5. **Engineering depth** — performance, accessibility, security, reliability, testing, architecture.
6. **Honest proof** — only verified work/claims.
7. **Action** — a simple way to start.

Business language first; technical language deeper.

## 5. Homepage experience

*(STATUS: HISTORICAL / SUPERSEDED on 2026-09-21. The former seven-beat narrative, mobile-shop, and "Between" counter visual story are retired. Active homepage architecture and motion are governed by `docs/vnext/00_START_HERE.md`, `docs/vnext/04_HOMEPAGE_EXPERIENCE_MASTER.md`, and `docs/vnext/05_MOTION_AND_TRANSITION_SYSTEM.md`.)*

### Historical Narrative Baseline (Preserved for Context)

The original seven-beat conceptual logic (Gap → Make it easy → Pressure → Route → Layers → Held → Arrival) informed early explorations. Under the vNext product-led direction, the product being created is the conceptual protagonist across distinct visual chapters (Hero phone cluster → laptop portal → connected flow → proof → process), ending the single sticky-device gimmick.

## 6. Core pages

- **Home** — explanation, story, four problem paths, selected verified work, process, CTA.
- **What We Build** — problem-first services, not technology-first catalogue.
- **Work** — Client Work / Internal Product / Concept Build with unmistakable classification and evidence status.
- **How We Work** — Talk → Understand → Plan → Design → Build → Test → Launch → Improve.
- **Engineering** — technical depth for those who want it.
- **About** — honest purpose and approach; no invented company history/team.
- **Start a Project** — problem-first guided enquiry with a simple standard-form fallback.

## 7. Visual direction

**Editorial storytelling + software precision + restrained cinematic transformation.**

Avoid generic AI-site tropes: purple gradients, particles, random 3D, glowing blobs, card-grid overload, fake dashboards, technology-logo soup, meaningless motion.

Use recognizable UI, purposeful SVG/DOM diagrams and restrained depth. HTML/CSS/SVG first. Add WebGL/Three.js only when a scene becomes meaningfully clearer and performance evidence supports the cost.

## 8. Enquiry contract

The real contact journey is part of the product.

User-facing stages:

1. What would you like to improve?
2. What happens today / what should change?
3. How should we contact you?

Budget and timeline may be optional planning fields, not mandatory barriers.

Backend contract:

**validate → accept durably → issue receipt → notify responsible operator → recover from notification failure**

A success message must never mean only “we attempted an email.” Reuse a reliable existing provider when suitable; do not introduce architecture theatre.

## 9. Architecture principle

Audit the current stack first. Retain suitable existing framework/hosting/components. No mandated framework migration, microservices, queue cluster, new login, CRM or CMS without an actual requirement.

Preferred shape:

```text
Visitor
  → existing CDN/hosting
  → server-rendered/static public pages + small progressive enhancements
      ├─ local fictional story/demo (no production submission)
      ├─ public content/work/metadata
      └─ real enquiry → server validation
                        → durable intake/provider
                           ├─ visitor receipt
                           └─ retryable operator notification
```

## 10. Performance and accessibility

- Target WCAG 2.2 AA; do not claim conformance until verified.
- Full keyboard path and visible focus.
- Complete reduced-motion/static story parity.
- Meaningful text remains real DOM.
- Mobile is separately composed.
- Core Web Vitals “good” acceptance references at p75: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 where field data exists.
- Lighthouse mobile ≥95 is a lab target, not a public achieved metric.
- If field data is insufficient, report insufficient data.

## 11. Honesty

Do not fabricate social proof. Work classification, implementation stage and verification are separate fields. Targets never render as achieved. Unsupported promises remain unpublished.

## 12. Delivery Roadmap and Gates

*(Governed by `docs/vnext/13_IMPLEMENTATION_ROADMAP.md`. No independent or conflicting phases are maintained here.)*

- **Phase 0 — Adopt vNext docs and reconcile repo**: Clean consolidation, reconcile canon, retire historical concepts.
- **Phase 1 — Experience foundation**: Motion boundary, scene shells, entrance loader, logo transition, nav, reduced-motion.
- **Phase 2 — Hero + phone chapter**: Phone shell, DOM product screens, Hero, carry-over, state changes, phone resting state.
- **Phase 3 — Laptop portal + inside-product experience**: Laptop shell, blank-to-product state, camera/portal push-in, full-screen product, reversible scroll.
- **Phase 4 — Connected flow + proof + method**: Business request flow, proof/results, How We Work frame, Work preview, FAQ, close.
- **Phase 5 — Supporting pages**: `/what-we-solve`, `/work`, case-study template, `/how-we-work`, `/about`, `/engineering`, `/start-a-project`, legal/error routes.
- **Phase 6 — Enquiry backend**: Validation, durable queue/intake, receipt, retryable operator notifications, security.
- **Phase 7 — Work/case-study evidence**: Verified claims mapping, proof verification, limitation disclosure.
- **Phase 8 — Hardening**: Accessibility, SEO, performance, security, responsive, cross-browser.
- **Phase 9 — Real-user comprehension**: Five-person user comprehension test on Tier 2/3 business audience.
- **Phase 10 — Release candidate**: Strict quality gates (lint/type/test/build 0, claims gate, Owner browser review, rollback plan).
- **Phase 11 — Final technical closeout**: Generate 16-document MNC/GCC technical documentation suite from verified production implementation (DECISION-018).

## 13. Definition of done

A non-technical visitor can answer within a short visit:

- What is YCN?
- How can it help my business?
- What can it build?
- What happens if I contact them?
- What should I click next?

At the same time, a technical visitor can find credible engineering detail and evidence without that detail blocking the business story.
