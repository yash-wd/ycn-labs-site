# YCN Labs — Requirements

**Revision:** 1.2  
Requirement → implementation → evidence → PASS/FAIL. `YCN_TEST_CHECKLIST.md` maps verification to these IDs.

## Functional requirements

- **FR-001 — Immediate comprehension:** A non-technical visitor can identify what YCN does without learning software terminology.
- **FR-002 — Problem-first entry:** Home presents clear business-problem paths before deep technical categories.
- **FR-003 — Signature example:** (HISTORICAL / SUPERSEDED: DECISION-019 and former counter/shop story are superseded by the vNext product-led direction per DECISION-020). The product YCN creates is the conceptual protagonist across distinct chapters (phone chapter → laptop portal → connected flow → proof); live DOM interfaces show the business outcome.
- **FR-004 — Story fallback:** The complete story remains understandable when animation, WebGL or JavaScript enhancement is unavailable.
- **FR-005 — Problem-first services:** “What We Build” is organized by customer problem/outcome, with capability/engineering detail deeper.
- **FR-006 — Honest work:** Each work item has classification, stage, verified scope, limitations and claim references. Missing evidence blocks publication of the claim, not the whole page.
- **FR-007 — Customer process:** “How We Work” explains Talk → Understand → Plan → Design → Build → Test → Launch → Improve in ordinary language.
- **FR-008 — Engineering depth:** Technical visitors can access architecture, performance, accessibility, security, reliability, testing and operations detail without blocking first-reading comprehension.
- **FR-009 — Problem-first enquiry:** A visitor can describe a business problem without knowing whether they need a website, app or software system.
- **FR-010 — Optional planning fields:** Budget/timeline/project type are optional unless a later owner decision makes a specific field necessary.
- **FR-011 — Enquiry durability:** Accepted enquiries are durably recorded/queued before success is presented; notification failure is recoverable.
- **FR-012 — Safe sample:** Fictional/demo forms are clearly labelled and cannot submit to production handlers.
- **FR-013 — Buyer-first FAQ:** FAQ answers uncertainty, existing systems, cost approach, ownership/support boundaries and non-technical concerns before technology questions.
- **FR-014 — Broad footer:** Footer positions YCN as a technology company; engineering philosophy remains secondary.
- **FR-015 — Navigation clarity:** Primary navigation remains small and understandable; no mega-navigation of future capabilities.
- **FR-016 — Error/recovery states:** 404, form errors and system fallbacks are understandable and actionable.

## Non-functional requirements

- **NFR-001 — Mobile-first:** 320–430px is intentionally composed, not a squeezed desktop design.
- **NFR-002 — Responsive:** Layout is reviewed at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px classes.
- **NFR-003 — Reduced motion:** `prefers-reduced-motion` provides complete meaningful-content parity.
- **NFR-004 — Keyboard:** Every interactive element is reachable in logical order with visible focus and no traps.
- **NFR-005 — Semantics:** Meaningful content is semantic HTML/DOM; canvas/WebGL is enhancement, not the only representation.
- **NFR-006 — Contrast:** Normal text meets WCAG AA contrast in the actual rendered state; automated tools must not invent fallback colors.
- **NFR-007 — Touch:** Interactive targets meet appropriate touch sizing (44 CSS px target where practical).
- **NFR-008 — Field performance:** Where enough RUM data exists, use CWV good thresholds at p75: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
- **NFR-009 — Lab performance:** Lighthouse mobile ≥95 is a target on the agreed test profile, not an achieved/public claim by default.
- **NFR-010 — Progressive loading:** Heavy visual assets do not block hero copy/navigation; below-fold media is lazy where appropriate.
- **NFR-011 — Font budget:** Prefer existing suitable licensed fonts; maximum two web-font families unless explicitly approved.
- **NFR-012 — No random motion:** Every animation communicates entering, connecting, transforming, progressing, receiving or settling.
- **NFR-013 — Security:** Server-side validation, secret isolation, appropriate headers, spam/rate protection and safe logging for public forms.
- **NFR-014 — Privacy:** Collect the minimum needed information; never put free-text/contact values in analytics URLs/events.
- **NFR-015 — SEO:** Unique titles/descriptions, one logical H1, canonical, OG, sitemap/robots and crawlable plain text.
- **NFR-016 — Reliability:** Critical form acceptance and notification failures are observable and recoverable.
- **NFR-017 — Evidence:** Test reports identify candidate/source fingerprint, command/profile, raw result, limitations and status.
- **NFR-018 — Repository safety:** Verification does not destroy or mix unrelated staged/unstaged/untracked work.
- **NFR-019 — Claims control:** No unverified factual performance/accessibility/client/operational claim is published as achieved.
- **NFR-020 — Maintainability:** Reuse semantic design/content records and existing suitable components; no unnecessary framework migration.

## Out of scope unless separately approved

- new client portal/login;
- payment processing for YCN website itself;
- bespoke company CRM;
- major CMS migration;
- microservice/queue infrastructure solely for the marketing site;
- industry landing-page expansion before customer evidence;
- multilingual rollout;
- AI chatbot/scoping bot;
- new Three.js scenes not justified and tested;
- advertising cybersecurity/marketing/education as active offerings without delivery capability evidence.
