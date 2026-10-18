# YCN Labs — Master Decisions Index & Stack (DECISION-001 to DECISION-055)

**Authority:** YCN Labs Founder & Owner
**Repository Location:** `docs/decisions/`
**Purpose:** Single authoritative chronological stack of every binding architectural, design, brand, commercial, and governance decision.

---

## Quick Navigation by Phase

| Phase | Decisions Range | Era & Focus | Status |
| :--- | :--- | :--- | :--- |
| **Phase 0** | [DECISION-001 to DECISION-017](#phase-0-brand-identity--foundational-rules-001--017) | Foundation, Brand Identity, Visual Tone & Communication Baseline | Ratified / Baseline |
| **Phase 1** | [DECISION-018 to DECISION-050](#phase-1-product-led-vnext-architecture--continuum-018--050) | Product-Led Direction, Forge Pattern, DOM/SVG Continuum, Mobile Viewports | Ratified / Active |
| **Phase 2** | [DECISION-051 to DECISION-052](#phase-2-business-systems--gate-a-operating-policy-051--052) | Business System Reality & Gate A Commercial/Operational Rules | Ratified / Active |
| **Phase 3** | [DECISION-053 to DECISION-054](#phase-3-gate-b1-content-messaging--legal-safeguards-053--054) | Gate B1 Content Spec, India-First Context & DPDP Legal Requirements | Ratified / Active |
| **Phase 4** | [DECISION-055](#phase-4-strategic-reset-scope-freeze--one-year-operating-strategy-055) | Strategic Reset, Lean V1 Scope Freeze, 1-Builder/1-Reviewer PR Workflow | Ratified / Current |

---

## Complete Chronological Stack

### Phase 0: Brand, Identity & Foundational Rules (001 – 017)
- **DECISION-001 · Logo Selection:** Authoritative Black 8K Master logo (`Main_YCN_LABS_logo_black_8K.png`) chosen; scalable via CSS.
- **DECISION-002 · Brand Name:** Canonical studio brand name ratified as "YCN Labs".
- **DECISION-003 · Company Breadth:** Web and bespoke digital product studio; broader ambitions preserved without over-promising.
- **DECISION-004 · Audience Comprehension:** Plain, unpretentious language for Indian business owners; zero tech buzzword soup.
- **DECISION-005 · Communication Order:** Value → Visual Example → Capability → Process → Engineering → Honest Proof → Action.
- **DECISION-006 · Hero Baseline:** Clean, focused hero section centered on clear value proposition.
- **DECISION-007 · Signature Example:** [SUPERSEDED by DECISION-019 / DECISION-020].
- **DECISION-008 · Scene 5 Labels:** Baseline architectural labels for product demonstration.
- **DECISION-009 · Experience Format:** Web-native interactive storytelling without heavy video assets.
- **DECISION-010 · Design Character:** Precision, restraint, premium typography, and dark-mode elegance.
- **DECISION-011 · Color Policy:** Deep dark canvas (`#0D111A`), crisp off-white text, refined amber/gold accents.
- **DECISION-012 · Typography Policy:** High-legibility modern sans-serif type pairing (Inter + JetBrains Mono for code/spec).
- **DECISION-013 · Honesty System:** Claims & Proof Register mandatory; no unverified claims or fake social proof.
- **DECISION-014 · Enquiry Reliability:** Atomic, durable lead capture. Database commit is the single durability barrier.
- **DECISION-015 · Real-User Gate:** Real device testing on consumer-grade mobile devices required before release.
- **DECISION-016 · Documentation System:** Markdown-based living records versioned in Git.
- **DECISION-017 · First Execution Step:** Foundation alignment and repository setup.

### Phase 1: Product-Led vNext Architecture & Continuum (018 – 050)
- **DECISION-018 · Technical Documentation Model:** Comprehensive 16-doc MNC closeout pack deferred to post-release.
- **DECISION-019 · Visual Story Amendment ("Between"):** [SUPERSEDED by DECISION-020].
- **DECISION-020 · Product Object Protagonist (Forge Pattern):** Homepage protagonist is real live DOM digital product interfaces.
- **DECISION-021 · Outcome-First Communication:** No generic tech logo walls; focus on business workflow solutions.
- **DECISION-022 · Recurring Product Object:** Continuity across chapters via persistent interactive elements.
- **DECISION-023 · Phone Continuity Bounded:** Mobile shell animations strictly bounded to avoid performance hitches.
- **DECISION-024 · Laptop Portal:** Clean responsive transition into desktop product view.
- **DECISION-025 · Motion Reversibility:** All scroll animations must reverse smoothly without layout snapping.
- **DECISION-026 · Motion Variety:** Thoughtful choreography rather than uniform animation speeds.
- **DECISION-027 · Premium Quality Bar:** Zero visual jitter; 60fps GPU acceleration across all animations.
- **DECISION-028 · Visual QA Baseline:** Strict cross-browser and mobile verification checklists.
- **DECISION-029 · Video Direction:** [SUPERSEDED by DECISION-048].
- **DECISION-030 · Route Architecture:** Canonical 18-route Next.js App Router structure.
- **DECISION-031 · Animation Performance:** `transform` and `opacity` only; `will-change` used sparingly.
- **DECISION-032 · Reduced Motion Compliance:** `prefers-reduced-motion` must render instantaneous static layout.
- **DECISION-033 · Layout Stability:** Zero Cumulative Layout Shift (CLS < 0.1) across all dynamic components.
- **DECISION-034 · Technology Depth Location:** Technical deep dives reserved for `/engineering`, not the homepage hero.
- **DECISION-035 · Proof & Results Data Contract:** Clear visual distinction between illustrative prototypes and verified client metrics.
- **DECISION-036 · Three.js Policy:** Zero WebGL / Three.js on launch site to protect mobile loading performance.
- **DECISION-037 · Authoritative Live DOM Rendering:** Real rendered DOM code rather than mock screenshots.
- **DECISION-038 · Mobile Viewport Composition:** Separate layout choreography for mobile screens under 768px.
- **DECISION-039 · Outcome Navigation Route:** Dedicated `/what-we-solve` route for solution discovery.
- **DECISION-040 · Homepage Candidate Copy Ratification:** Final hero H1 ("Websites and software. Built around your business.") and chapters 01-04 ratified.
- **DECISION-041 · Phone Chapter Boundary:** Four distinct chapters locked; Chapter 05 dropped.
- **DECISION-042 · Final Closeout Pack Confirmation:** Reaffirms lean documentation during development.
- **DECISION-043 · Modular 3D DOM/CSS Shell:** CSS 3D transforms for device frames instead of canvas/WebGL.
- **DECISION-044 · Asset Quality & CDN Delivery:** AVIF/WebP image formats with strict compression targets.
- **DECISION-045 · Next.js Modular Monolith:** Standardized App Router architecture without microservice sprawl.
- **DECISION-046 · Development Replay & Diagnostics:** URL debug parameters (`?intro=1`, `?debug=1`) for testing.
- **DECISION-047 · Visual QA Protocol:** Emulation and physical device testing criteria.
- **DECISION-048 · Code-Driven Entrance Continuum:** SVG/DOM + GSAP continuum supersedes video; instant escape & skip.
- **DECISION-049 · Mobile Phone3D Viewport Sizing:** Mobile width locked to 48–53vw (~207px max) to eliminate horizontal cutoff.
- **DECISION-050 · Homepage Logo Architecture:** Master RGBA lineage with seamless logo takeover stage.

### Phase 2: Business Systems & Gate A Operating Policy (051 – 052)
- **DECISION-051 · Business System Identity (13 Oct 2026):** YCN Labs is an operating business system, not merely a web project.
- **DECISION-052 · Gate A Policies (14 Oct 2026):**
  - *O-01:* Hyderabad operating context.
  - *O-02:* Focus on custom, high-speed Next.js business websites.
  - *O-03:* Custom INR pricing with 50/30/20 milestone billing.
  - *O-04:* Commercial contracts require written scope, exclusions, and IP release.
  - *O-05:* Reusable studio component library retained by YCN Labs; custom client assets transferred upon full payment.

### Phase 3: Gate B1 Content, Messaging & Legal Safeguards (053 – 054)
- **DECISION-053 · Service Copy & CTA (15 Oct 2026):**
  - Single enquiry destination: `/contact`.
  - Replaced speculative "SaaS/mobile products" claims with honest "useful web applications".
- **DECISION-054 · Canonical Messaging & DPDP Compliance (15 Oct 2026):**
  - Problem-first contact introduction ratified.
  - INR pricing defaults; "Not sure yet" budget option.
  - Services directed at businesses (not under 18); privacy notice on `/contact` with working `privacy@` channel.
  - Atomic lead capture: DB commit is the sole durability boundary; email failures post-commit return HTTP 200 with lead reference (never false 503).

### Phase 4: Strategic Reset, Scope Freeze & One-Year Operating Strategy (055)
- **DECISION-055 · Lean V1 Launch & Scope Freeze (18 Oct 2026):**
  - Full adoption of the Lean Launch Strategy with 8 Consolidated Amendments.
  - Target launch 15 Nov 2026 (fallback 30 Nov 2026) with existing 18 routes and 280 tests.
  - Speculative features parked in `docs/V2_PARKING_LOT.md` until June 2027.
  - Streamlined workflow: 1 builder (AGY) + 1 reviewer (GPT/Claude) on GitHub PR diffs.
  - 10-Point Launch Gate replaces 143-point tracker.
  - 10-minute essential vault backup to physical USB and cloud drive.
  - Tax realities checked: 194J TDS applies only from audited firms; GST reverse charge on foreign SaaS to be reviewed with CA.
  - First client pilot at cost (never free) with written scope and publishing rights.

---

## Detailed Texts & References
- Complete text of DECISION-055: [`docs/decisions/DECISION-055-LEAN-LAUNCH-STRATEGY.md`](DECISION-055-LEAN-LAUNCH-STRATEGY.md)
- Complete historical decision log: [`docs/YCN_DECISIONS.md`](../YCN_DECISIONS.md)
