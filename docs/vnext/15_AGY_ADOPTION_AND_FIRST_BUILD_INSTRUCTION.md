# YCN Labs vNext — AGY Adoption & First Build Instruction

This is an execution handoff template. The Owner may paste it to AGY after reviewing this documentation pack.

---

## AGY — VNEXT SITE DIRECTION ADOPTION

Read, in order:

1. `00_START_HERE.md`
2. `01_OWNER_VISION_AND_NON_NEGOTIABLES.md`
3. `14_DECISIONS_VNEXT.md`
4. `03_INFORMATION_ARCHITECTURE_AND_PAGE_PLAN.md`
5. `04_HOMEPAGE_EXPERIENCE_MASTER.md`
6. `05_MOTION_AND_TRANSITION_SYSTEM.md`
7. `06_DESIGN_SYSTEM_AND_ART_DIRECTION.md`
8. `07_CONTENT_AND_MESSAGING_STANDARD.md`
9. `08_FRONTEND_ARCHITECTURE_AND_SKILLS.md`
10. `09_MEDIA_ASSET_PRODUCTION_SPEC.md`
11. `10_PERFORMANCE_ACCESSIBILITY_SEO.md`
12. `11_QA_VISUAL_ACCEPTANCE_GATES.md`
13. `12_AGENT_OPERATING_PROTOCOL_AND_CHANGE_CONTROL.md`
14. `13_IMPLEMENTATION_ROADMAP.md`
15. current repo Claims & Proof + brand record

### Owner direction

The old "Between" homepage concept and old scenario-led visual story are superseded.

The new homepage is **product/outcome-led**. Do not build a service-card catalogue and do not use a technology-logo wall. YCN's first recurring visual protagonist is the digital product/device itself. Phone continuity is used for the Hero + one chapter cluster only, then it settles. A later laptop portal introduces a new visual concept. Scroll-linked transitions reverse on backscroll. Quality target is premium MNC/principal-level product design/engineering, with no AI-slop.

### Standing skills requirement

Before implementation, inspect and use the relevant installed skills:
- frontend-design
- design-taste-frontend
- ui-ux-pro-max
- gsap-master
- gsap-scrolltrigger
- gsap-timeline
- gsap-react
- gsap-performance
- vercel-react-best-practices
- motion-framer only for isolated micro-interactions
- threejs-webgl only if justified
- shadcn / 21st.dev only for appropriate functional/reference needs

Report which were used.

---

## STEP A — repository truth, no code changes

Report raw:
- branch;
- HEAD;
- origin/site-v2;
- working tree;
- local main;
- origin/main;
- relevant package versions;
- current homepage route/component map;
- current animation architecture;
- code/assets tied to old Between/scene architecture;
- current entrance assets available;
- installed skills resolution.

Then stop if repo state is unexpected.

---

## STEP B — docs adoption (Claude 03 §3 Reconciliation)

1. **Verify repository state:** Check branch (`site-v2`), HEAD (`3d358a6`), origin sync, clean working tree, and confirm local/origin `main` are untouched.
2. **Consolidate vNext documentation:** Active directory `docs/vnext/` with 17 numbered files + `MANIFEST.md` + `_prototypes/`. No duplicate README or master guides.
3. **`YCN_DECISIONS.md`:** Mark `DECISION-019` SUPERSEDED (preserve historical text); carry VNEXT-001..015 as `DECISION-020..034` (OWNER-STATED / BASELINE).
4. **`YCN_HANDOFF.md`:** Set current direction to Product-led vNext; set active entry to `docs/vnext/00_START_HERE.md`; mark old Between/shop directions superseded; list pending Owner decisions (entrance variant, candidate copy, Ch.05, results, 3D).
5. **`YCN_CONTENT_SPEC.md`:** Retain canon copy; add `## Candidate copy under review` block referencing `docs/vnext/07_CONTENT_AND_MESSAGING_STANDARD.md`.
6. **`YCN_AGENT_OPERATING_PROTOCOL.md`:** Add Section 10 enshrining mandatory frontend design skills consultation and reporting.
7. **`YCN_MASTER_PLAN.md` & `YCN_AGY_TASKS.md`:** Align phases with `docs/vnext/13_IMPLEMENTATION_ROADMAP.md`; mark old seven-scene story superseded.
8. **`YCN_V2_EXPERIENCE_MASTER.md`:** Header note: `STATUS: HISTORICAL / SUPERSEDED FOR HOMEPAGE — see docs/vnext/00, 04, 05`.
9. **`YCN_UNIFIED_ENTRANCE_ARCHITECTURE_FINAL_v2.md`:** Header note: `STATUS: PARTIALLY SUPERSEDED — homepage choreography and mandatory Scene-5 3D yield to docs/vnext/04–05; non-blocking, accessibility, loading and progressive-enhancement rules remain in force`.
10. **`YCN_BRAND_EXPERIENCE_REFERENCE_MASTER_FINAL.md`:** §31–32 marked superseded ("no scenario photography; the product object is DOM").
11. **`INDEX.md` & `AGENTS.md`:** Register `docs/vnext/00_START_HERE.md` as current site direction.
12. **`YCN_CHANGELOG.md`:** Add single dated entry for 2026-09-21 vNext consolidation.
13. **Validation & verification:** Run `pnpm run lint`, `pnpm run check-types`, `pnpm test`, `pnpm run build` (all exit 0).
14. **Commit & push:** Commit docs-only on `site-v2`, push `refs/heads/site-v2:refs/heads/site-v2`. Never touch main.


---

## STEP C — first implementation milestone only

After docs adoption is reviewed, implement **Phase 1 only**:

- entrance media selection/fallback;
- full-screen logo stage;
- logo-to-navbar scroll transition;
- final nav shell;
- reduced-motion/skip behavior;
- motion infrastructure / scene boundary;
- Hero foundation prepared for Product-in-Motion object.

Do **not** implement the whole homepage in one uncontrolled pass.

Required:
- reversible timeline where applicable;
- no scroll trap;
- no fake copy/proof;
- no Three.js unless required (it should not be needed in Phase 1);
- mobile/desktop composition;
- performance-safe video handling.

Validate:
- lint;
- check-types;
- test;
- build.

Raw output + exit codes.

Owner browser reviews Phase 1 before Phase 2 phone/product chapter.

---

## Push discipline

Never touch `main`.

Use the project's exact `site-v2` push refspec.

Disclose every failed attempt.

Do not self-approve visuals.
