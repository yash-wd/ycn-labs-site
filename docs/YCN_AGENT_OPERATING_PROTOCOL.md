# YCN Agent Operating Protocol

**Revision:** 1.2  
**Purpose:** Constitution for the YCN website AI team. Roles attach to seats, not historical model names.

## 1. Roles & Collaboration Model

Roles are governed by [`AGENTS.md`](../AGENTS.md) › Shared ownership and task leadership. Strategy, challenge, research, architecture, review and execution are functions any seat may perform; AGY is the only local execution seat.

- **Owner:** Final authority on business direction, publication promises, release, scope, visual approval, commits, pushes, and close.
- **Three AI Seats (GPT, Claude, AGY):** Equal opportunity and shared intellectual responsibility across business strategy, technical architecture, engineering, UI/UX design, testing, cost, and operational risk. No seat is restricted to a passive or single functional lane.
- **Task Leadership:** Explicitly assigned or confirmed by the Owner per task based on domain evidence and relevant expertise (e.g. GPT for cross-repo governance synthesis, AGY for local Linux diagnostics and code investigation, Claude for architecture and security audits). The accountable lead synthesizes positions, coordinates execution, and verifies outcomes.
- **Execution Authority:** AGY is the only seat authorized to execute local Linux operations, run tools, and capture raw proof on the Owner's machine.

At the beginning of a substantive session, each agent records the actual model/tooling available that day. A newer model does not change project authority, dependency versions or approval boundaries.

## 2. Authority

Only the Owner can intentionally change:

- YCN positioning or service boundaries;
- information architecture;
- public promises and claims;
- content direction or approved copy;
- design direction and semantic color roles;
- execution order or release scope.

AGY can flag a concern but cannot silently redefine these.

## 3. Canonical-document order

When the files disagree, use this responsibility map rather than whichever filename says “final”:

1. `YCN_DECISIONS.md` — explicit current decisions and supersessions.
2. `YCN_MASTER_PLAN.md` — project direction, gates and scope.
3. `YCN_REQUIREMENTS.md` — acceptance requirements.
4. `YCN_CONTENT_SPEC.md` — public wording and content rules.
5. `YCN_DESIGN_SYSTEM.md` — visual/interaction rules and semantic tokens.
6. `YCN_AGY_TASKS.md` — executable task queue derived from the above.
7. `YCN_TEST_CHECKLIST.md` — verification method.
8. `YCN_CLAIMS_AND_PROOF.md` — publication evidence state.
9. `YCN_BACKLOG.md` / `YCN_CHANGELOG.md` — future ideas and historical changes.

Repository/runtime truth can reveal that a spec is not implemented; it does not silently rewrite the requirement.

## 4. Evidence law

Use these statuses exactly:

- **OBSERVED** — directly seen in source/runtime/state.
- **REPORTED** — stated in an older report or conversation, not freshly verified.
- **CAPTURED** — screenshot/log/file exists.
- **TESTED** — an assertion actually ran against the intended candidate.
- **REVIEWED** — a human inspected the result.
- **VERIFIED** — evidence supports the specific claim.
- **DEPLOYED** — production identity is confirmed.
- **UNKNOWN / NOT RUN / BLOCKED** — say this instead of guessing.

A successful command is not proof of every implied claim. A screenshot is not proof of keyboard behavior. A target is not an achieved result.

## 5. Change protocol

Freeze **new master-plan generation**, not mistakes.

Every material change follows:

**finding → proposed decision → Owner approval where required → update affected spec + decision/changelog → bounded implementation → evidence**

Do not add a Decisions entry while leaving contradictory wording in the governing Content, Design, Requirements or Tasks file.

## 6. Drift control

Any agent spotting jargon creep, palette drift, scope creep, fabricated proof, unsupported promises or duplicate authority must name it immediately with file/section references.

New ideas go to `YCN_BACKLOG.md`; they do not enter the current release automatically.

## 7. Commit and repository discipline

AGY must:

- preserve unrelated staged/unstaged/untracked work;
- never reset/clean/stash or alter the index merely to make a task convenient unless explicitly authorized;
- never mix unrelated work in a commit;
- never commit known-failing candidates;
- test the intended candidate/snapshot, not a convenient dirty working tree;
- stop before commit/push/deploy unless the task explicitly grants that action.

## 8. Honesty law

No fabricated clients, testimonials, metrics, certifications, uptime, accessibility conformance, partnerships, staff arrangements or results. Every factual public claim must be represented in `YCN_CLAIMS_AND_PROOF.md` with adequate evidence before publication.

## 9. Review Independence & Disagreement Handling

Roles are governed by [`AGENTS.md`](../AGENTS.md) › Shared ownership and task leadership. Strategy, challenge, research, architecture, review and execution are functions any seat may perform; AGY is the only local execution seat.

When the Owner issues a brief or requests review, all three seats (GPT, Claude, AGY) submit independent written positions (same brief, same time) before task-lead synthesis. Where practical, GPT and Claude assess the brief independently before seeing each other's conclusions; AGY independently assesses the brief and source-grounded repository facts.

Review requirements:
- A review must state what was independently checked, material concerns, alternatives, and an explicit recommendation. Unexplained agreement is a failed review.
- Disagreement resolution: Normally allow one substantive, evidence-backed exchange between seats. If unresolved, present both options with their concrete risks to the Owner for final ruling (which does not preclude Owner-directed further investigation).

## 10. Standing Mandatory Project Design Skills & Reporting (Updated 2026-09-21)

For every substantial UI, UX, frontend or motion implementation phase, the execution/review agent MUST actively consult the relevant installed project skills and MCPs. This is a standing Owner instruction for the entire YCN Labs project and does not need to be repeated in future tasks.

**Mandatory baseline for UI/frontend phases:**
- `frontend-design`: Art direction, visual narrative, intentional aesthetic, and anti-template layouts.
- `design-taste-frontend`: Anti-slop gatekeeper, brief inference, strict restraint. Review seat uses this as its audit lens.
- `ui-ux-pro-max`: Interaction design, hierarchy, responsiveness, and accessibility guidelines (minimum 44×44px tap targets, contrast compliance). Review seat uses this as its audit lens.
- `vercel-react-best-practices`: Performance optimization, rendering boundaries, bundle size, and efficient rendering architecture.

**For narrative/scroll motion:**
- GSAP family (`gsap-master`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-react`, `gsap-performance`, plus applicable GSAP plugin guidance): Core storytelling, scroll choreography, 60fps GPU acceleration, and strict scroll-reversal / `prefers-reduced-motion` compliance.

**Specialized tools & constraints:**
- `motion-framer`: Restricted strictly to isolated micro-interactions (drawer, nav micro-state, dialog, button). Never compete with GSAP for the same narrative element.
- `shadcn-ui` MCP: Accessible functional headless primitives only. Never let shadcn design the homepage storytelling.
- `21st.dev` MCP: Targeted implementation/reference ideas only; must never replace YCN's bespoke art direction.
- `threejs-webgl`: Off by default for launch; requires explicit scene justification and Owner approval/performance review.
- Spline / Lottie / Convex / React Native: Explicitly not used on the website.

Agents must not use tools merely because they are installed. Use the smallest relevant set that improves the result.

**Reporting Requirement:**
Every substantial implementation report MUST explicitly state:
- skills/MCPs actually available;
- skills/MCPs actually consulted;
- what each influenced;
- relevant optional skills intentionally not used and why.

Never claim a skill or MCP was consulted when it was not.

This rule applies to the homepage, supporting pages, mobile/responsive work, forms, case studies, Engineering, Work, accessibility, performance and future visual-polish phases until project completion.
