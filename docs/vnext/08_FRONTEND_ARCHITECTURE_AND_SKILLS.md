# YCN Labs vNext — Frontend Architecture & Mandatory Skills Map

---

## 1. Architecture principle

Do not migrate frameworks simply to make the redesign possible.

Retain the current repository's React/Next-style architecture if it is healthy. Build motion as a well-contained enhancement layer.

The public site should remain:
- semantic;
- crawlable;
- accessible;
- progressively enhanced;
- testable without motion.

---

## 2. Component architecture

Suggested homepage structure:

- `EntranceFilm`
- `LogoTransitionStage`
- `Navbar`
- `HeroProductStage`
- `PhoneStoryStage`
- `EditorialReset`
- `LaptopPortalStage`
- `WorkflowStage`
- `RequestFlowStage`
- `ProofStage`
- `MethodStage`
- `WorkStage`
- `FaqStage`
- `ClosingCta`

Supporting primitives:
- `SectionShell`
- `DisplayText`
- `Eyebrow`
- `PrimaryCta`
- `DeviceShell`
- `PhoneShell`
- `LaptopShell`
- `IllustrativeProductScreen`
- `MotionBoundary`
- `ReducedMotionFallback`

Do not create a 100-component abstract design system before the experience needs it.

---

## 3. Animation architecture

Create a dedicated motion layer.

Recommended:
- scene-local GSAP setup;
- one orchestrated timeline per major scene;
- ScrollTrigger IDs for debugging;
- `gsap.matchMedia()` for breakpoint-specific choreography;
- React `useGSAP` or equivalent safe lifecycle;
- cleanup on unmount/route change;
- no global timeline touching unrelated components.

Shared product state can be a small explicit state model, not a large app state framework.

---

## 4. Phone continuity implementation

Preferred strategies:

### Strategy A — persistent stage
A single phone DOM node lives across Hero + chapter cluster inside a stage whose layout changes.

Pros:
- true continuity;
- no duplicate object.

### Strategy B — FLIP/shared layout
Measure source and destination rectangles and animate between them.

Pros:
- easier section ownership.

Do not use separate images and crossfade if the user should perceive one physical object.

---

## 5. Laptop portal implementation

Start with DOM/SVG/CSS.

Screen content is a nested DOM viewport with transform origin and clipping.

The portal transition:
- measures screen rectangle;
- scales/translates it toward viewport;
- expands border radius to zero;
- fades/clears bezel;
- transfers visual ownership to full-screen scene.

Only use WebGL/Three.js if DOM perspective cannot achieve the required quality and measured budget supports it.

---

## 6. Installed frontend skills — mandatory usage

### `frontend-design`
Use during:
- homepage composition;
- section hierarchy;
- art direction;
- responsive composition;
- non-template layout decisions.

### `design-taste-frontend`
Use as a rejection gate for:
- AI-slop;
- trendy generic sections;
- random decoration;
- weak composition;
- repeated cards;
- over-animation.

### `ui-ux-pro-max`
Use for:
- information hierarchy;
- responsive behavior;
- usability;
- accessibility;
- form flow;
- nav;
- interaction feedback.

It must not override locked brand tokens arbitrarily.

### GSAP skill family
- `gsap-master`
- `gsap-scrolltrigger`
- `gsap-timeline`
- `gsap-react`
- `gsap-performance`

Use for all primary narrative motion.

### `threejs-webgl`
Use only after documenting:
- exact scene benefit;
- fallback;
- desktop/mobile loading behavior;
- performance cost;
- disposal.

Three.js is optional, not a requirement.

### `vercel-react-best-practices`
Use for:
- image/media loading;
- route/component splitting;
- rendering boundaries;
- bundle control;
- LCP;
- avoiding waterfalls;
- client/server decisions.

### `motion-framer`
Use only for:
- drawer;
- nav micro-state;
- button;
- dialog;
- small independent transitions.

Do not let Framer and GSAP compete over narrative scene properties.

### shadcn MCP
Use for functional accessible primitives if they fit:
- dialog;
- accordion;
- form controls;
- sheet/drawer.

Do not use it to make the homepage look like a component demo.

### 21st.dev MCP
Use for:
- implementation references;
- interaction ideas;
- solving a specific component need.

Never copy an entire fashionable section into YCN.

---

## 7. Skills reporting rule

For each substantial implementation report, AGY states:

- skills consulted;
- what each influenced;
- skills intentionally not used and why.

Never claim a skill was consulted if the runtime did not provide it.

---

## 8. Technology visibility

Technology can exist in source code without appearing on the homepage.

The best implementation may use React/Next/TypeScript/etc., but the visitor should see:
- clarity;
- product;
- action;
- ownership;
- progress;
- evidence.

---

## 9. Data model for work/proof

Case-study content should be structured.

Suggested fields:
- slug
- title
- classification
- stage
- problem
- scope
- media
- verifiedClaims[]
- limitations[]
- technologies[] (technical appendix only)
- publishedAt
- permissions/evidence reference

Never render a claim without its allowed publication state.

---

## 10. Progressive enhancement

Without JS:
- core copy;
- navigation;
- work;
- contact;
- static product frames;
- FAQ;

remain usable.

Without WebGL:
- no loss of meaning.

With reduced motion:
- full content parity.

---

## 11. Standing Implementation & Governance Rules (Claude Brief §5)

- **One animation owner per element:** GSAP owns scroll choreography, FLIP object transitions, and timeline playback; Framer Motion is reserved strictly for isolated micro-interactions (e.g. mobile nav sheet, modals) and never touches the same transform/opacity properties.
- **Git & branch safety:** Work on branch `site-v2` only; push `refs/heads/site-v2:refs/heads/site-v2`; never touch `main` (local `8fd4837`, origin `6a017e0`) until the controlled release promotion. `pnpm run lint`, `pnpm run check-types`, `pnpm test`, and `pnpm run build` must all exit 0 before every commit.
- **Evidence discipline:** Every AGY report must display raw terminal tails and exit codes and disclose any failed attempts. No generated images as evidence; no self-approved visuals; no "Owner ruling" the Owner did not state; measured numbers only (bundle, LCP, chunk sizes) with the measurement method named.
- **Copy & claims discipline:** Canonical public copy is governed by `docs/YCN_CONTENT_SPEC.md`. Candidate lines are marked `CANDIDATE` until the Owner ratifies them and `CONTENT_SPEC` is amended. Claims register (`docs/YCN_CLAIMS_AND_PROOF.md`) is binding.
- **Tool exclusions:** Explicitly not used on this project: Spline, Lottie, Convex, React Native.

---

## 12. Standing UI/Frontend Skills & MCP Rule — Project-wide (2026-09-21)

For every substantial UI, UX, frontend or motion implementation phase, the execution/review agent MUST actively consult the relevant installed project skills and MCPs. This is a standing Owner instruction for the entire YCN Labs project and does not need to be repeated in future tasks.

Mandatory baseline for UI/frontend phases: `frontend-design`, `design-taste-frontend`, `ui-ux-pro-max`, and `vercel-react-best-practices`.

For narrative/scroll motion, also consult the relevant GSAP skills (`gsap-master`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-react`, `gsap-performance`, plus applicable GSAP plugin guidance).

`motion-framer` is restricted to isolated micro-interactions. `shadcn-ui` MCP is for accessible functional primitives only. `21st.dev` MCP is for targeted implementation/reference ideas only and must never replace YCN's bespoke art direction. Three.js/Spline/Lottie require explicit scene justification and, where applicable, Owner approval/performance review. Convex is used only for genuine backend/module requirements; React Native skills do not apply to the website.

Agents must not use tools merely because they are installed. Use the smallest relevant set that improves the result.

Every substantial implementation report MUST state:
- skills/MCPs actually available;
- skills/MCPs actually consulted;
- what each influenced;
- relevant optional skills intentionally not used and why.

Never claim a skill or MCP was consulted when it was not.

This rule applies to the homepage, supporting pages, mobile/responsive work, forms, case studies, Engineering, Work, accessibility, performance and future visual-polish phases until project completion.


