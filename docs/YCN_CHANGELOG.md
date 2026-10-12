# YCN Labs — Changelog

**Revision:** 1.3  
Meaningful project/documentation changes only; not a Git commit log.

## 2026-09-21 — YCN vNext Product-Led Documentation Consolidation & Reconciled Canon

**Changed:** Consolidated the 17-file GPT vNext package, Claude files (01, 02, 03), and root documentation into `docs/vnext/` and reconciled repository canon. Zero application code or styles modified.
**Owner Ruling & Precedence:** DECISION-019 ("Between" scenario photography) superseded. Mobile-shop, Between/counter photography, SIGNAL→STRUCTURE, and former seven-scene visual directions are marked HISTORICAL / SUPERSEDED. The active website direction is product-led vNext (`docs/vnext/00_START_HERE.md`): the product YCN creates is the conceptual protagonist across distinct chapters (Hero phone cluster → laptop portal → connected flow → proof → process); phone continuity ends after the opening chapter; laptop portal is fully reversible on scroll-back; no service cards or tech logos on homepage.
**Decisions Recorded:** Carried VNEXT-001..015 into `docs/YCN_DECISIONS.md` as DECISION-020..034. Reconciled DECISION-029 and HANDOFF to explicitly reflect entrance variant pending Owner ratification (A code vs B clean video); updated DECISION-034 to reaffirm and point to DECISION-018. Marked DECISION-019 SUPERSEDED. Replaced vNext 14 with pointer `docs/vnext/14_DECISIONS_POINTER.md`.
**Governance & Pointers:** Replaced vNext 12 with `docs/vnext/12_AGENT_PROTOCOL_POINTER.md` referencing `docs/YCN_AGENT_OPERATING_PROTOCOL.md`. Added Section 10 to protocol mandating consultation and reporting of installed design skills (`frontend-design`, `design-taste-frontend`, `ui-ux-pro-max`, `gsap-master`, `vercel-react-best-practices`).
**Content & Migration:** Claude 01 merged into vNext 01, 08, 16. Claude 02 merged into vNext 04, 05, 10, 11. Full unabridged candidate copy list (Hero, Statement, Chapters 01–05, Laptop, Split, Results, Engineering rule, Turn support, Process steps, Nav label, ProductObject screens, FAQ accordion, Quiet close) merged into `docs/vnext/07_CONTENT_AND_MESSAGING_STANDARD.md` §13 (all explicitly tagged `[CANDIDATE — OWNER APPROVAL REQUIRED]`); Claude 03 archived to `docs/legacy/migrations/2026-09-21-vnext-adoption.md` with completed migration status. Added Section 12 to `docs/YCN_CONTENT_SPEC.md` pointing to candidate copy.
**Roadmap Alignment:** Aligned `docs/YCN_MASTER_PLAN.md` and `docs/YCN_AGY_TASKS.md` directly with `docs/vnext/13_IMPLEMENTATION_ROADMAP.md` (Phases 0–11).
**Root Cleaned:** No planning Markdown or temporary zips remain in repository root. Single pointer line added to root `AGENTS.md`.

## 2026-09-21 — DECISION-019 Visual Story Amendment ("Between" Concept)

**Changed:** Adopted Owner ruling DECISION-019 superseding DECISION-007 and the mobile-phone-shop scenario across active documentation (`YCN_HANDOFF.md`, `YCN_CONTENT_SPEC.md`, `YCN_DECISIONS.md`, `YCN_MASTER_PLAN.md`, `YCN_REQUIREMENTS.md`, `YCN_TEST_CHECKLIST.md`, `YCN_BRAND_EXPERIENCE_REFERENCE_MASTER_FINAL.md`).  
**Visual Concept:** Locked to "Between" — vertical-agnostic visual storytelling showing an unnamed Indian business counter and the customer's side of the exchange, focusing on objects and light only (no people, faces, or hands). The customer request (`#YCN-8041`) is the protagonist in DOM/SVG; signal, layers, and Scene 5 3D remain code.  
**Media Pack:** Retired character continuity sheet in favor of: (1) Styleframe (3 candidates, 1 selected), (2) Hero 16:9, (3) Hero 4:5, (4) Scene 3 Failure 16:9, (5) Scene 3 Failure 4:5, (6) Scene 6 Resolution 16:9 matched to Scene 3, (7) Scene 6 Resolution 4:5 matched. Scene 2 & 7 imagery deferred to DOM/SVG/motion; Scene 4 is pure DOM/SVG/GSAP; no video.  
**Integrity:** Architecture D1–D8, dark-first `#0D111A` canvas, four ratified captions, no Hero kicker, and no Scene 7 pre-line remain unchanged. Zero application code, styles, or runtime dependencies modified.

## 2026-09-18 — M0 Canonical Documentation Migration

**Changed:** Adopted the YCN Canonical v1.2 specification suite into the repository `docs/` hierarchy. Consolidated legacy documentation into `docs/legacy/` with prominent historical notices. Created `docs/INDEX.md` as master entry point and root `AGENTS.md` for AI agent governance.  
**Decisions Recorded:** Added `DECISION-018` (Lean development documentation; 16-document MNC/GCC final documentation pack generated at release/closeout).  
**Task Queue Updates:** Re-scoped Task A1/A2 from obsolete Scene 5 rebuild to reviewing current customer-facing replacement components (`WhatWeBuild.tsx`, `HowItConnects.tsx`). Added Task D3 (`FINAL PROJECT DOCUMENTATION & HANDOVER`).  
**Risk & Tech Debt:** Created `docs/YCN_RISKS_AND_TECH_DEBT.md` seeded with current operational risks (including mitigated `site-v2` backup) and technical debt items.  
**Integrity:** Zero application source code or runtime dependencies modified. All changes uncommitted pending Owner review.

## 2026-09-18 — Canonical package 1.2 created

**Changed:** Consolidated the competing GPT/Claude planning packages into one 11-file canonical development baseline.  
**Reason:** Remove duplicate authority, approval inflation, decision-ID collisions, palette/task contradictions and stale standalone audit/final-plan files.  
**Status:** Selected by Owner request to receive only the final files and begin development.

### Important corrections included

- Only the logo is treated as OWNER-FINAL from the earlier project history.
- Agent recommendations are no longer silently labelled Owner-approved.
- Old `YCN_FINAL_PLAN.md`, `WEBSITE_PLAN.md` and standalone `AGY_NEXT_TASK.md` are retired from active authority.
- First task is embedded as A0 in the canonical `YCN_AGY_TASKS.md`.
- A0 inspection, A0V verification and M0 documentation adoption are separate gates.
- Semantic Design tokens have one owner file; other specs reference roles rather than copying conflicting hex values.
- Dark-theme inline link color is separated from primary action fill for contrast.
- Content no longer publishes one-business-day reply, code ownership, WCAG conformance or portfolio classifications without evidence.
- Contact reliability requires durable acceptance and notification recovery.
- Mobile-shop signature example and compact/skippable seven-beat story are retained as the baseline.
- Five-person real-user comprehension test remains mandatory before release.

## Historical material

Prior packages should be kept only as external history if desired. They are not active project authority after M0 migration.
