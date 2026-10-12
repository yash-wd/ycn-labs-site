# YCN Labs — AGY Execution Queue & Engineering Specification

**Revision:** 1.2  
**Status:** Canonical task queue. The Owner still authorizes each executable task/batch.

## 1. Execution contract

**Next action for a repository not yet audited against this package: A0 inspection only.**

A task report identifies expected customer outcome, authorized paths/hunks, protected work, candidate identity, tests, raw evidence, limitations and the next Owner decision. Code-writing tasks stop before commit unless explicit commit permission is included. Push/deploy always requires separate authorization.

## 2. Active Roadmap Phases and Execution Queue

*(Aligned with `docs/vnext/13_IMPLEMENTATION_ROADMAP.md`. No independent or contradictory roadmap is maintained here.)*

| Phase | Focus | Scope | Governance / Exit Gate |
|---|---|---|---|
| **Phase 0** | Adopt vNext docs & reconcile repo | Reconcile canon, retire old concepts, establish single authority | One active authority set; clean root; history preserved |
| **Phase 1** | Experience foundation | Motion boundary, scene shells, entrance loader, logo transition, nav | Owner reviews first load, skip, logo-to-nav, reduced motion |
| **Phase 2** | Hero + phone chapter | Phone shell, DOM product screens, Hero, carry-over, state changes | Owner reviews phone chapter, DOM product narrative, scroll reverse |
| **Phase 3** | Laptop portal + inside-product | Laptop shell, blank-to-product state, camera push-in, full-screen product | Seamless portal transition, strict forward/reverse parity |
| **Phase 4** | Connected flow + proof + method | Business request flow, proof/results, How We Work frame, FAQ | Verified or illustrative proof; no tech-jargon drift |
| **Phase 5** | Supporting pages | `/what-we-solve`, `/work`, case-study, `/how-we-work`, `/about`, `/engineering`, `/start-a-project` | Semantic hierarchy, responsive composition, outcome-led copy |
| **Phase 6** | Enquiry backend | Validation, durable intake/queue, visitor receipt, operator recovery | Durable acceptance; security headers; no secrets in client |
| **Phase 7** | Work/case-study evidence | Verified claims mapping, proof verification, limitation disclosure | Every public claim backed by `YCN_CLAIMS_AND_PROOF.md` |
| **Phase 8** | Production hardening | Accessibility, SEO, performance, security, responsive, cross-browser | WCAG 2.2 AA audit, Lighthouse mobile targets, security headers |
| **Phase 9** | Real-user comprehension | Five-person user comprehension pilot on Tier 2/3 business audience | Documented real responses; fix comprehension gaps |
| **Phase 10** | Release candidate | Full regression, claims gate, Owner browser review, rollback plan | Lint 0, types 0, tests 0, build 0, signed Owner approval |
| **Phase 11** | Final technical closeout | 16-document MNC/GCC technical documentation suite (DECISION-018) | Complete documentation generated from real implementation |

*(Note: The former C1–C6 seven-scene task series and standalone Scene 5 tasks are historical and superseded by the vNext product-led homepage architecture.)*

## 3. A0 — exact first instruction

```text
AGY — A0 CURRENT-TRUTH INSPECTION. NO IMPLEMENTATION.

Read the existing repository instructions before doing anything. Treat the attached
YCN canonical v1.2 files as the selected development baseline, but do not overwrite
repository-native control/spec files during A0.

Preserve source, index, staged/unstaged/untracked work and repository history.
Do not reset, clean, stash, stage, install packages, run build/typecheck/dev scripts,
move evidence, commit, fetch, push, deploy or modify production. Do not paste secrets.

Report:
1. Actual repository root, sanitized remote identity, branch, HEAD, staged/unstaged/
   untracked summaries and locally known upstream comparison. State that local remote-
   tracking information may be stale.
2. Exact current canonical instruction/spec/state files (for example AGENTS.md,
   PROJECT_STATE.md, visual/content specs) and contradictions with the v1.2 package.
3. Actual R-01/R-02/R-03/R-04 state if those identifiers exist. Inventory protected
   Group D or other unrelated paths/hunks from evidence, not assumptions.
4. Scene 5 source location and visible-copy candidates. Distinguish source strings
   from browser-rendered strings. Inspect an already-running permitted preview only
   if its source identity is known; otherwise mark runtime NOT OBSERVED.
5. Current logo asset path/hash and current semantic token definitions. No redraw,
   recolouring, global palette replacement or unsupported logo-sampling claim.
6. Package manager/lockfile, scripts/hooks, relevant dependencies and current test
   definitions. Explain what a safe isolated build/runtime test would execute.
7. Real enquiry path, validation, persistence/provider, configured destination
   presence (not secret values), failure/retry behaviour, analytics and operational
   ownership evidence.
8. Actual production release identity only if available through authorized read
   access; otherwise UNKNOWN. Do not infer it from appearance or old transcripts.
9. Location/checksum/declared scope of existing review evidence. Preserve it.
10. KEEP / CHANGE / REMOVE / ADD findings with exact source locations, each marked
    OBSERVED / REPORTED / UNVERIFIED; propose the smallest safe next task.

Return an owner-readable summary first, then technical evidence.
Build/runtime results not obtained in A0 remain NOT RUN/NOT OBSERVED.
STOP. No code or documentation migration.
```

## 4. A0V — isolated verification

Only after explicit authorization:

- create an isolated snapshot outside the owner working tree using an inspected method;
- record whether it represents HEAD, index, working tree or intended commit;
- preserve staged/unstaged context needed for the intended candidate without dragging unrelated work into conclusions;
- exclude production secrets/private data;
- inspect package lifecycle scripts before installation/run;
- use test-safe destinations only;
- run supported lint/type/build/test with exact command, exit code and source fingerprint;
- start a preview only when authorized and tie it to a source snapshot;
- re-check original repository/index state afterward.

Missing scripts are NOT AVAILABLE, not PASS. Unsafe verification is BLOCKED.

## 5. M0 — documentation adoption

After A0/A0V identify current authority:

- keep root `AGENTS.md` as entry point where useful;
- keep `PROJECT_STATE.md` observation-only where present;
- establish these eleven files as the active YCN website documentation set;
- preserve old docs in history rather than silently erasing owner amendments;
- assign one active token/content/task authority;
- resolve duplicate decision IDs before adding new entries;
- record import hashes and migration in `YCN_CHANGELOG.md`;
- no automatic commit/push.

## 6. A1/A2 — customer-facing component alignment (formerly Scene 5)

The active `site-v2` application no longer contains the old standalone Scene 5 architecture; that historical scene was replaced by `components/WhatWeBuild.tsx` and `components/HowItConnects.tsx`. Do NOT recreate the retired Scene 5 architecture merely because an old task mentions it.

Compare actual current replacement components (`WhatWeBuild.tsx`, `HowItConnects.tsx`) against:
- `STORY-03/04/06`, `LAYER-01..04` in Content Spec;
- semantic tokens/motion/fallback rules in Design System;
- relevant Requirements.

For confirmed discrepancies only:
- KEEP correct existing customer-first copy and interactive structures;
- CHANGE only confirmed discrepancies;
- REMOVE only confirmed obsolete or drifting content;
- ADD only missing approved requirements;
- ensure all first-reading language is strictly understandable to a Tier-2/Tier-3 shop owner;
- ensure fictional/demo interactions cannot submit to production;
- use adopted semantic tokens.

A1 stops before commit. A2 requires explicit commit permission and inspection of the entire index.

## 7. B-series

### B1 — Core business communication
Home, nav, What We Build and buyer-first FAQ. Implement approved Content IDs/structure. No new visual system invented inside a copy task.

### B2 — Trust/depth pages
Work, How We Work, Engineering, About and footer. Any unresolved factual claim is omitted/blocked rather than invented.

### B3 — Enquiry
Implement the contract:

```text
validate
→ durable acceptance / approved managed store
→ receipt to visitor
→ retryable notification
→ operator visibility / manual recovery
```

Separate fictional story/sample from real intake. Use server-side validation and idempotency where appropriate. Do not put contact/free-text values in analytics.

### B4 — Hardening
Metadata, security headers, dependency hygiene, monitoring/error capture, analytics minimization, performance budgets and operational runbook based on actual stack.

## 8. C-series (Historical Baseline)

*(STATUS: HISTORICAL / SUPERSEDED. The former C1–C6 seven-scene visual propagation is retired. Active homepage visual implementation follows `docs/vnext/13_IMPLEMENTATION_ROADMAP.md` Phases 1–4, detailed in `docs/vnext/04_HOMEPAGE_EXPERIENCE_MASTER.md` and `docs/vnext/05_MOTION_AND_TRANSITION_SYSTEM.md`.)*

## 9. D1 — full candidate verification

Run `YCN_TEST_CHECKLIST.md` against the named candidate and produce the requirements matrix. Include the real five-person comprehension pilot; AI simulation does not count.

## 10. D2 — release

Requires explicit push/deploy approval, rollback/recovery readiness and known operator responsibility.

After deployment verify:

- production release identity matches intended candidate;
- critical navigation/content works;
- real enquiry acceptance/recovery is operationally observable using authorized test data;
- analytics/metadata/security configuration is as approved;
- no new critical console/runtime failures;
- rollback remains available.

Stop and report. Do not begin “next ideas” automatically.

## 11. D3 — final project documentation & handover

D3 runs only after the final production implementation and release evidence exist (post-D2).

D3 must generate/update the following final 16-document technical documentation package from REAL implementation and evidence:

1. `INDEX.md` — Master portal and reading guide explaining every final document.
2. `01_PROJECT_OVERVIEW.md` — Problem, goals, audience, scope, non-goals, outcome, final technology stack.
3. `02_BUSINESS_AND_PRODUCT_REQUIREMENTS.md` — Final approved functional/non-functional requirements with traceability.
4. `03_USER_EXPERIENCE_AND_CONTENT.md` — Tier-2/Tier-3 user journeys, information architecture, content principles.
5. `04_DESIGN_SYSTEM.md` — Semantic tokens, responsive scale, typography, motion, accessibility.
6. `05_SYSTEM_ARCHITECTURE_HLD.md` — High-Level Design diagram and system architecture narrative.
7. `06_TECHNICAL_DESIGN_LLD.md` — Low-Level Design (folders, components, routes, schema, data flows).
8. `07_ARCHITECTURE_DECISIONS.md` — Consolidated major architecture decisions (ADR summary).
9. `08_DATA_AND_INTEGRATIONS.md` — PostgreSQL, Upstash Redis, Resend, Sentry, data flows, personal data handling.
10. `09_DEVELOPMENT_GUIDE.md` — Engineer onboarding, prerequisites, commands, repo structure, workflow.
11. `10_SECURITY_AND_PRIVACY.md` — Validation, rate limiting, bot protection, headers, DPDP compliance.
12. `11_TEST_AND_QA_REPORT.md` — Verified lint, typecheck, test, build, and five-person pilot results.
13. `12_PERFORMANCE_AND_ACCESSIBILITY.md` — Measured Lighthouse, Core Web Vitals, reduced motion, contrast.
14. `13_DEPLOYMENT_AND_ENVIRONMENTS.md` — Vercel environments, DNS, deployment pipelines.
15. `14_OPERATIONS_MONITORING_AND_RECOVERY.md` — Monitoring, lead recovery, error triage, runbook.
16. `15_RELEASE_AND_ROLLBACK.md` — Release process, production verification, rollback procedures.
17. `16_FINAL_PROJECT_REPORT.md` — Flagship case study: problem → requirements → architecture → QA → release → lessons.

These documents must reflect the ACTUAL finished system with zero fabricated architecture or unverified claims. Do not create empty templates during active development.

## 12. Documentation update rule for future tasks

Future tasks do NOT update documentation mechanically every time.
At task completion, the agent answers: **Documentation impact: YES / NO**.
- If NO: no documentation update.
- If YES: name the specific canonical document that genuinely became stale and propose/update only that file.
CSS spacing changes, typo fixes, normal implementation details, and ordinary test runs do NOT require documentation churn. No daily development journals, session notes, or empty templates.
