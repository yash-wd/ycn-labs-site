# YCN Labs vNext — Implementation Roadmap to Release

---

## PHASE 0 — Adopt vNext docs and reconcile repo

### Tasks
- verify branch/HEAD/sync;
- read vNext pack;
- inspect current homepage implementation;
- identify code tied to old Between/seven-scene concept;
- identify reusable foundations;
- record supersession in existing Decisions/Handoff/Index/Changelog;
- preserve history.

### Exit
- one current authority;
- no contradictory active homepage direction;
- no application changes unless separately authorized.

---

## PHASE 1 — Experience foundation

### Build
- motion boundary/utilities;
- responsive scene shell;
- entrance film loader/fallback;
- logo transition stage;
- final nav structure;
- reduced-motion infrastructure;
- scroll debug setup;
- media loading strategy.

### Review
Owner tests:
- first load;
- skip;
- logo-to-nav;
- mobile/desktop;
- reduced motion.

---

## PHASE 2 — Hero + phone chapter

### Build
- premium phone shell;
- DOM product screens;
- Hero;
- carry-over transition;
- pinned chapter story;
- state changes;
- phone resting end state.

### Review
Owner tests:
- whether the product acts as YCN's "red car";
- clarity to non-technical audience;
- forward/reverse scroll;
- mobile.

Do not continue to advanced sections if this core story fails.

---

## PHASE 3 — Laptop portal + inside-product experience

### Build
- laptop shell;
- blank-to-product state;
- camera/portal timeline;
- full-screen workflow;
- reverse behavior;
- mobile fallback.

### Review
- transition quality;
- no seam;
- no performance regression;
- no tech-jargon drift.

---

## PHASE 4 — Connected flow + proof + method

### Build
- business request flow;
- result/proof section;
- stable "How we work" frame;
- Work preview;
- FAQ;
- close.

### Proof decision
If verified metrics are unavailable, use non-numeric/illustrative treatment.

---

## PHASE 5 — Supporting pages

Order:
1. What We Solve
2. Work
3. Case-study template
4. How We Work
5. About
6. Engineering
7. Start a Project
8. legal/error routes

Supporting pages inherit the system but do not all become cinematic scrollytelling pages.

---

## PHASE 6 — Enquiry backend

Implement reliable acceptance:
- validate;
- durable record/queue;
- success only after acceptance;
- operator notification;
- recovery/retry;
- spam/rate protection;
- privacy-safe logging.

---

## PHASE 7 — Work/case-study evidence

Audit actual material before publication.

For each item:
- classify;
- verify scope;
- verify permission;
- map claims to evidence;
- add limitations.

---

## PHASE 8 — Hardening

- accessibility;
- SEO;
- performance;
- security;
- error handling;
- responsive;
- browser matrix;
- analytics/privacy;
- content review.

---

## PHASE 9 — Real-user comprehension

Five-person pilot or equivalent agreed sample.

Record actual answers.

Fix comprehension failures before release.

---

## PHASE 10 — Release candidate

Required:
- lint 0;
- types 0;
- tests 0;
- build 0;
- claims gate;
- owner desktop/mobile browser approval;
- rollback plan;
- production candidate identity.

Promotion to production follows repo-specific guarded-main procedure.

---

## PHASE 11 — Final technical closeout

Generate the full final MNC/GCC-grade technical documentation from the actual implemented and verified system.

This does not replace the vNext experience pack; it records what was finally built.
