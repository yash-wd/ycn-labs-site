# YCN Labs — Decisions Log

**Revision:** 1.2

This file distinguishes owner-final facts from the development baseline. Do not convert agent recommendations into “Owner approved” by silence.

## Status vocabulary

- **OWNER-FINAL** — explicitly final from the Owner.
- **OWNER-STATED** — direction clearly stated by the Owner, but not necessarily a permanent lock.
- **BASELINE** — selected in this canonical package so development can proceed; changeable through the protocol.
- **PROPOSED** — awaiting explicit decision.
- **SUPERSEDED** — retained for history only.

## Current decisions

- **DECISION-001 · Logo · OWNER-FINAL**  
  The supplied YCN Labs logo is the final brand asset. Do not redraw, recolor, re-proportion or replace it. Supporting caption can remain in the lockup; the website must explain the broader business independently.

- **DECISION-002 · Brand name · OWNER-STATED**  
  YCN Labs remains the master brand. Do not force a public acronym expansion.

- **DECISION-003 · Company breadth · OWNER-STATED**  
  YCN is intended to grow beyond web development into apps, SaaS, digital services, cybersecurity, teaching and future technology areas. The website must not present unavailable future capability as a current proven service.

- **DECISION-004 · Audience comprehension · OWNER-STATED**  
  The site must be understandable to Tier 2/Tier 3 business owners without technical knowledge, by experience/story rather than dense explanation.

- **DECISION-005 · Communication order · BASELINE**  
  Business value → visual example → capability → process → engineering → honest proof → action.

- **DECISION-006 · Hero · BASELINE**  
  “Websites and software. Built around your business.” + “You don’t need a technical brief to start.”

- **DECISION-007 · Signature example · SUPERSEDED by DECISION-019**  
  ~~Use one coherent fictional mobile-shop journey across the main story. Enquiry/availability request is the mechanism, not YCN’s identity.~~ (Superseded on 2026-09-21 by DECISION-019: visual concept is vertical-agnostic "Between" with unnamed Indian business counter, objects and light only).

- **DECISION-008 · Scene 5 labels · BASELINE**  
  “What your customers use / What your business does next / Less repetitive work, optionally / What keeps it dependable.”

- **DECISION-009 · Experience format · BASELINE**  
  Seven narrative beats are compact, skippable and natural-scroll; complete static/reduced-motion version exists; no scroll-jacking.

- **DECISION-010 · Design character · BASELINE**  
  Editorial storytelling + software precision + cinematic transformation + restraint. HTML/CSS/SVG first; WebGL only with justified value and measured budget.

- **DECISION-011 · Color policy · BASELINE**  
  Semantic neutral + blue/cyan system defined by Design. Logo cyan is decorative/brand only; readable link/button roles have separate tokens. No green/purple brand drift.

- **DECISION-012 · Typography policy · BASELINE**  
  Retain existing suitable licensed font when it works; otherwise Inter body/UI, optional Space Grotesk display after comparison; max two web-font families by default.

- **DECISION-013 · Honesty system · BASELINE**  
  Client Work / Internal Product / Concept Build are distinct. Stage and evidence are separate. Targets never render as achieved. No fake proof.

- **DECISION-014 · Enquiry reliability · BASELINE**  
  Validate → durable acceptance → visitor receipt → retryable operator notification → recovery. Success is not “email attempted.” Budget/timeline are optional planning fields by default.

- **DECISION-015 · Real-user gate · BASELINE**  
  A five-person comprehension pilot is required before release; AI agreement is not a substitute.

- **DECISION-016 · Documentation system · BASELINE**  
  These eleven files are the canonical website documentation set after M0 migration. Do not create another competing master plan.

- **DECISION-017 · First execution step · BASELINE**  
  A0 current-truth inspection precedes implementation when this package has not yet been reconciled with the actual repository.

- **DECISION-018 · Development Documentation Model & Final Closeout Pack · OWNER-FINAL**  
  Lean documentation during active development; complete final MNC/GCC-grade technical documentation generated at project closeout from actual implementation and evidence. No daily development journals, session-by-session notes, per-task paperwork, or empty enterprise templates during active building. Development living records are strictly restricted to: Decisions (`YCN_DECISIONS.md`), Changelog (`YCN_CHANGELOG.md`), Claims & Proof (`YCN_CLAIMS_AND_PROOF.md`), Risks & Tech Debt (`YCN_RISKS_AND_TECH_DEBT.md`), and raw task output in `evidence/`. At release (Task D3), a comprehensive 16-document technical documentation package will be generated from the verified codebase, architecture, tests, and production evidence.

## New decisions

- **DECISION-019 · Visual Story Amendment ("Between" Concept) · SUPERSEDED by DECISION-020 (2026-09-21)**  
  ~~Supersedes DECISION-007 and mobile-phone-shop scenario. The story is vertical-agnostic: no mobile shop, salon, restaurant, clinic, office or any named business type. The visual concept is "Between": photography shows an unnamed Indian business counter and the customer's side of the exchange, objects and light only — no faces, no hands, no people. The customer request (#YCN-8041) is the protagonist and is always real DOM/SVG; the signal, layers, and Scene 5 3D remain code. Architecture D1–D8, dark-first #0D111A canvas, the four ratified captions (Scene 2: "Calls. Messages. Notes. Nobody sees all of it." / Scene 3: "Sent is not the same as received." / Scene 5: "One request. One clear path." / Scene 6 support: "Same customer. Same question. This time it arrives."), no Hero kicker, and no Scene 7 pre-line remain unchanged. No copy changes. Media pack replaces the character sheet: (1) styleframe, (2) Hero 16:9, (3) Hero 4:5, (4) Scene 3 16:9, (5) Scene 3 4:5, (6) Scene 6 16:9 matched to Scene 3, (7) Scene 6 4:5 matched. Scene 2/7 imagery deferred; Scene 4 is DOM/SVG/GSAP; no video.~~ (Superseded on 2026-09-21 by DECISION-020 and the Product-led vNext direction).

- **DECISION-020 · Homepage Subject = Product Object (Forge Pattern) · OWNER-STATED (2026-09-21)**  
  The homepage is about **YCN Labs and the digital products/business outcomes YCN creates**, not about a fictional shop or business scenario. The product YCN creates is the conceptual visual protagonist, shown as a live DOM screen the customer and business actually use (Forge pattern: one recurring subject). Supersedes DECISION-019 "Between" for current homepage direction.

- **DECISION-021 · Outcome-First Communication & No Tech Logo Wall · OWNER-STATED (2026-09-21)**  
  Do not organize the homepage as service cards such as web development, app development, e-commerce, digital marketing or custom software. Do not make technology names or framework logos (React, Next, TypeScript, SQL, MongoDB, AWS…) the sales argument. Show what the product makes easier for customers and the business.

- **DECISION-022 · Recurring Product Object · OWNER-STATED (2026-09-21)**  
  A product/device becomes YCN's visual protagonist in the first homepage chapter cluster, inspired by the recurring-subject principle of Forge.

- **DECISION-023 · Phone Continuity is Bounded · OWNER-STATED (2026-09-21)**  
  The phone can transfer from Hero into the next/pinned chapter and its screen can change while content moves. After the chapter completes, the phone settles and a new visual concept begins. Do not repeat the phone pattern across the entire site.

- **DECISION-024 · Laptop Portal · OWNER-STATED (2026-09-21)**  
  A later section uses a laptop with an initially quiet/blank screen. On scroll, product content appears, camera moves toward the screen, and the next full-screen section emerges from the screen. Reverse scroll reconstructs the transition.

- **DECISION-025 · Motion Reversibility · OWNER-STATED (2026-09-21)**  
  Scroll-linked narrative transitions must reverse correctly on upward scroll. The entrance film is the exception and does not replay on reverse scroll.

- **DECISION-026 · Motion Variety · OWNER-STATED (2026-09-21)**  
  Use multiple section-appropriate motion concepts. Do not repeat the same gimmick every section.

- **DECISION-027 · Premium Quality Bar · OWNER-STATED (2026-09-21)**  
  The finished site must feel like senior MNC/principal-level product design and frontend engineering: premium, professional, precise, not funky, not AI-slop.

- **DECISION-028 · Reference Set · OWNER-STATED (2026-09-21)**  
  Primary references: Forge Automotive, Celsior, Octaboot, ULMIND. Secondary interaction references: Fourmula, E Dey Happen, Frontify, Kal Store, Honda Wing Mark, BudgetDev. References provide principles only; do not copy.

- **DECISION-029 · Entrance Variant & Assets · OWNER-FINAL (2026-09-21)**  
  Variant B (Owner-supplied horizontal/vertical video entrance) is RATIFIED. Implementation uses Owner-created horizontal (desktop) and vertical (mobile) films, transitioning to a full-screen official YCN logo, which then scales/moves into the navbar on scroll. Requirements: clean re-export before production without watermarks or portrait taglines; muted autoplay by default (audio requires explicit user interaction); Skip/Esc available immediately; once per session/tab; full reduced-motion, Save-Data, and failure fallbacks directly revealing the navbar and Hero without blocking access.

- **DECISION-030 · Standing Frontend Skills · OWNER-STATED (2026-09-21)**  
  Relevant installed frontend skills/MCPs (`frontend-design`, `design-taste-frontend`, `ui-ux-pro-max`, `gsap-master`, `vercel-react-best-practices`, etc.) must be actively consulted throughout the project. The Owner does not need to repeat this instruction.

- **DECISION-031 · Prototypes are Directional Only · OWNER-STATED (2026-09-21)**  
  Current v3 HTML prototypes represent roughly 20% of the expected final experience. They are references, not production source of truth.

- **DECISION-032 · Claims Remain Evidence-Controlled · BASELINE (2026-09-21)**  
  No fake clients, testimonials, metrics, growth numbers, partnerships or performance/accessibility claims. Result graphs require real proof or explicit illustrative labeling.

- **DECISION-033 · Brand Fundamentals Retained · BASELINE (2026-09-21)**  
  Official logo only; YCN Labs master brand; no forced public acronym; Space Grotesk / Inter baseline; YCN semantic blue/cyan palette; "Software, engineered to hold up." retained as descriptor unless Owner later changes it.

- **DECISION-034 · Technology Depth Location · OWNER-STATED / BASELINE (2026-09-21)**  
  Technology details belong primarily on Engineering (`/engineering`) and technical case-study depth. Homepage first reading remains business/product/outcome-led.

- **DECISION-035 · Proof & Results Data Contract (Illustrative vs Verified) · OWNER-FINAL (2026-09-21)**  
  The results section is retained for launch as an illustrative, clearly labelled workflow progression. It must display an explicit "Illustrative workflow" label and avoid fake numbers, percentages (+48%), multipliers (3.2×), or invented metrics. It illustrates qualitative operational flow (e.g., Unclear → Assigned → In progress → Done; Waiting ↓ / Owned ↑). Verified metrics can replace this section only when real permissioned client data exists per `YCN_CLAIMS_AND_PROOF.md`.

- **DECISION-036 · Three.js Policy (None for Launch) · OWNER-FINAL (2026-09-21)**  
  Three.js is excluded from the homepage for launch. The entire cinematic experience is built using performant DOM, CSS, SVG, and GSAP. No Three.js/WebGL bundles or chunks will be fetched or executed on the homepage. Three.js is parked until an isolated scene explicitly earns it through performance and design review.

- **DECISION-037 · Authoritative Live DOM / Interface Rendering · OWNER-FINAL (2026-09-21)**  
  The product object is rendered exclusively as an authored, responsive live DOM/SVG interface within device shells. Static screenshots, mocked photo wrappers, and generated UI images are prohibited. The sample interface is clearly marked "Sample · nothing is sent".

- **DECISION-038 · Mobile Viewport Separately Composed · OWNER-FINAL (2026-09-21)**  
  Mobile viewports (≤768px) must be composed independently, never as a clipped or scaled desktop layout. Pinned scrollytelling is restrained on mobile to preserve natural touch momentum, prevent viewport overflow, and maintain readability.

- **DECISION-039 · Site Navigation & Outcome Route (/what-we-solve) · OWNER-FINAL (2026-09-21)**  
  `/what-we-solve` (nav label "What We Solve") is ratified as the outcome-led primary route and concept, replacing the former `/what-we-build` when the supporting-page implementation phase is reached. Primary navigation: Work · What We Solve · How We Work · About (with Engineering accessible secondary/depth). Primary CTA: Start a Project.

- **DECISION-040 · Homepage Candidate Copy Ratification · OWNER-FINAL (2026-09-21)**  
  The Owner ratifies the refined candidate copy set for the homepage production pass with the canonical Hero H1 retained: Hero H1 ("Websites and software. Built around your business." retained; candidate "Build what moves your business forward." REJECTED / SUPERSEDED for Hero H1), refined Hero support ("We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving."), Statement ("Your customers shouldn't need an explanation."), Chapters 01–04 titles/bodies, Editorial hand-off, Laptop portal, Customer/Business split, Flow lead ("One action. A clear next step."), Needs finder ("What would you like to make easier?"), and Quiet close. These ratified lines are incorporated into `docs/YCN_CONTENT_SPEC.md` as canon.

- **DECISION-041 · Phone Chapter Boundary (Four Chapters Locked; Chapter 05 Dropped) · OWNER-FINAL (2026-09-21)**  
  The phone cluster is strictly limited to four chapters: Chapter 01 (Be understood), Chapter 02 (Make action easy), Chapter 03 (Make every request visible), and Chapter 04 (Keep the work moving). Proposed Chapter 05 ("Room for what comes next") is dropped from the phone chapter to avoid repeating the device gimmick. After Chapter 04, the phone treatment ends and hands off to the editorial reset and laptop portal.

- **DECISION-042 · Final Technical Documentation Closeout Pack · BASELINE (2026-09-21)**  
  Reaffirms and points to **DECISION-018**: at release/closeout (Phase 11 / Task D3), the comprehensive 16-document MNC/GCC technical documentation suite will be generated from the verified codebase, architecture, tests, and production evidence. Lean documentation remains active during development.

- **DECISION-043 · Device Architecture (Modular 3D DOM/CSS Shell & Compact Hero Scale) · OWNER-FINAL (2026-09-21)**  
  The product device is authored strictly as a modular 3D-looking DOM/CSS shell (`Phone3D`: Chassis, Edge bevels, BackPlate, FrontGlass, ScreenViewport holding live DOM product UI) using CSS `perspective` and `preserve-3d`. Raster phone photos and Three.js are prohibited for the launch device. All future device choreography (perspective rotation, tilts, section transfers, backscroll reversal) is controlled via GSAP transform-only properties (`translate3d`, `rotateX`, `rotateY`, `rotateZ`, `scale`). Initial Hero composition must be compact and understated: desktop object approximately 24–30vw (sensible physical max ~380px); mobile separately composed at ~58–68vw (sensible max ~270–300px). Camera push-in is reserved for later scroll chapters, not the Hero opening.

- **DECISION-044 · Asset Quality, Master Archive & CDN Delivery · OWNER-FINAL (2026-09-21)**  
  All final YCN visual and media assets must originate from professional high-resolution masters (still images 4K minimum, 8K where beneficial; video masters at 4K). Masters are preserved in the protected brand master archive outside the public delivery payload. Web delivery must use responsive, optimized derivatives (AVIF, WebP, modern codecs) sized strictly for target breakpoints; visitors are never forced to download heavy master assets. ImageKit or an equivalent media CDN is approved for responsive transformation, delivery, and caching. The execution agent must request missing media from the Owner rather than generating substitute production assets without explicit approval.

- **DECISION-045 · Architecture Model (Next.js Modular Monolith) · OWNER-FINAL (2026-09-21)**  
  The public YCN platform is architected and maintained as a Next.js modular monolith (`app/`, `components/{devices,homepage,brand,motion,ui}`, `lib/{animation,media}`). Microservices, auxiliary frontend frameworks, separate animation services, or multi-repo infrastructure are prohibited for the website. Heavy media assets reside in external object/CDN storage, not application services.

- **DECISION-046 · Development Replay & Skip Diagnostics · OWNER-FINAL (2026-09-21)**  
  To ensure reliable developer and reviewer inspection of the entrance sequence without breaking production once-per-tab session behavior, the entrance architecture must support a development-only forced replay parameter (`?intro=1`). Additionally, development console diagnostics must explicitly log which branch evaluated the entrance on page load (session storage flag, media error, `prefers-reduced-motion`, or Save-Data / constrained network).

- **DECISION-047 · Visual QA & Device Emulation Protocol · OWNER-FINAL (2026-09-21)**  
  For all intermediate design iterations and visual checkpoints, Chrome DevTools device emulation across standard viewports (375 × 812, 390 × 844, 430 × 932, 768 × 1024, 1024 × 768) is accepted for visual review. Physical device validation (one real iOS Safari pass and one real Android Chrome pass) is required strictly at final pre-release QA, not during iterative component development.

- **DECISION-048 · Code-Driven Entrance Continuum Superseding Video · OWNER-FINAL (2026-09-24)**  
  The homepage entrance experience is authored and executed strictly as a code-driven SVG/DOM + GSAP continuum experience (`CodeEntranceContinuum`). This supersedes the earlier entrance-video direction in **DECISION-029**. No entrance video (`.mp4`) is fetched or executed on the homepage. The entrance experience enforces accessible Skip controls, immediate Escape-key handling, reduced-motion bypass, dev replay (`?intro=1`), and seamless transition into the logo takeover stage.

- **DECISION-049 · Mobile Phone3D Sizing & Viewport Band Ratification · OWNER-FINAL (2026-09-24)**  
  Supersedes the mobile sizing band in **DECISION-043** where they conflict. Mobile Phone3D width is ratified at approximately 48–53vw (maximum physical width ~207px) rather than the earlier 58–68vw / 270–300px band. This ensures proportionate negative space, eliminates vertical viewport cutoff on compact mobile screens (375–390px widths), and preserves visual balance between the product shell and supporting copy.

- **DECISION-050 · Homepage Logo Architecture (Path 2: RGBA MASTER Lineage & Deferred Replacement) · OWNER-FINAL (2026-09-24)**  
  The existing private RGBA MASTER files (`../ycn-brand-masters/masters/ycn-logo-{dark,light}-transparent-MASTER.png`) are ratified as the authoritative source for entrance and presentation derivatives (`public/brand/ycn-labs-full-{dark,light}.*`, 2048×1669). The canonical navbar marks (`public/brand/ycn-logo-{dark,light}-transparent-448.png`) are retained, establishing a single verified deterministic Lanczos lineage from full-screen presentation through takeover to navbar without background removal. The 23 Sep 2026 opaque 8K files (`Main_YCN_LABS_logo_*_8K.png`) are private alternate renders, not production assets, and are removed from the repository root. Final official logo replacement is established as a separate, independently scoped task following B2 acceptance and documentation closeout.

Append unique IDs only after checking the active log. Never reuse an ID for a different topic. Supersede; do not silently rewrite historical meaning.

