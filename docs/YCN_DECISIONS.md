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
  The Owner ratifies the refined candidate copy set for the homepage production pass with the canonical Hero H1 retained: Hero H1 ("Websites and software. Built around your business." retained; candidate "Build what moves your business forward." REJECTED / SUPERSEDED for Hero H1), refined Hero support ("We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving."), Statement ("Your customers shouldn't need an explanation."), Chapters 01–04 titles/bodies, Editorial hand-off, Laptop portal, Customer/Business split, Flow lead ("One action. A clear next step."), Needs finder ("What would you like to make easier?"), and Quiet close. These ratified lines are incorporated into `docs/YCN_CONTENT_SPEC.md` as canon. Needs Finder option 'Turn an idea or business process into a web, mobile or SaaS product.' superseded by DECISION-053 (15 Oct 2026); all other DECISION-040 lines unchanged. FAQ §10 answer 6 sentence 'You will always know exactly what code and assets belong to you.' is separately superseded by DECISION-054 (15 Oct 2026); its first sentence and all other ratified FAQ responses remain unchanged.

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

### DECISION-051: YCN Labs is a business system, not only a website (Owner, 13 Oct 2026)
Status: Owner-stated strategic direction; does not by itself expand v1.0 scope.
1. YCN Labs is built as the foundation of a scalable business: website → lead capture → client communication → quotations/invoices → integrations → future SaaS.
2. Consent first, from v1.0: each lead stores purpose-specific consent (enquiry handling; separately and optionally, updates about YCN products), the notice version shown, timestamp, source and withdrawal state. Enquiry consent is never reused for marketing. Design to the DPDP Act 2023 and DPDP Rules 2025 now (core notice, consent, security and breach duties apply 18 months after the Rules' publication, i.e. mid-May 2027); legal review before launch.
3. Buy before build: quotations, invoices and CRM start on off-the-shelf GST-compliant tools with YCN templates; own modules only when client volume and revenue justify them.
4. Architecture: one HLD plus a lead/consent LLD (task 11a) precede backend work; module boundaries leave room for CRM, billing and SaaS without building them early.
5. Quality bar: senior-level content from Owner-supplied facts with professional editorial review; a complete design system (colour, type, spacing, motion tokens); accessibility, security and operations to production standard.
6. Every new capability passes its own requirements, design, build and verification gates, justified by customer value, cost, revenue and maintainability.
7. Experience: the public site must feel visionary, modern and product-led — conceptual storytelling of a technology company, never a template or AI-generated look. Governed by Master Plan §7 and the vNext specifications; content and visuals pass Owner acceptance.

### DECISION-052: Gate A — business foundation and initial operating policies (14 Oct 2026)

**Status: OWNER-APPROVED policies (Owner, 14 Oct 2026). Facts marked OWNER-STATED are not independently verified. Items marked OPEN remain release prerequisites and are not approved by this entry.**

**Scope:** Implements Master Plan §14.5 (O-01–O-10) and is subordinate to the existing DECISION-051 / Master Plan §14. This decision does not approve source-code changes, deployment, legal compliance, logo candidates, spending, automatic file cleanup, or public claims unsupported by `docs/YCN_CLAIMS_AND_PROOF.md`.

1. **O-01 — Identity and market.** OWNER-STATED: Operations based in Hyderabad, India; registrations not yet completed. APPROVED: India-first, serving SMEs, especially Tier 2/3 businesses, plus growing companies/startups; INR quotations for Indian clients, selective international enquiries without foreign-office or experience claims. OPEN: Legal contracting entity and registration choice, CA advice, GST/Udyam position, final jurisdiction/company copy. UK/GBP on existing site must be reconciled in the scoped content phase.
2. **O-02 — Offers.** OWNER-STATED: Owner will lead delivery with team support when needed; exact bench capacity unverified. APPROVED: business websites as lead service; selective web applications; suitably scoped automation/integrations; optional paid maintenance. Do not advertise unsupported cybersecurity, ERP, native mobile, digital marketing or 24/7 delivery as proven services. OPEN: Verified capacity, team responsibility, support hours and concurrent workload.
3. **O-03 — Leads.** OWNER-STATED: Domain email and WhatsApp Business reportedly work. APPROVED: primary monitored `hello@ycnlabs.com` when address confirmed; approved WhatsApp Business channel as optional; durable acceptance before receipt; personal response within two working days as **internal target only** until operator/backups and process are verified. Marketing requires separate lawful permission. OPEN: Named lead/backup operators, official public WhatsApp number, authentication (SPF/DKIM/DMARC), inbox testing and staging acceptance.
4. **O-04 — Evidence.** OWNER-STATED: No projects currently approved for a public client portfolio; future permissions will be requested. APPROVED: verified client work with permission, otherwise clearly labeled internal products or concept builds with real scope and limitations. Never invent customer references or numeric results. OPEN: Proof for actual internal examples and future permissions.
5. **O-05 — Commercial and backup boundaries.** OWNER-STATED: Owner intends to maintain client backups until handover, and throughout purchased maintenance terms; operational restore capability not proven. APPROVED: custom INR pricing, 50/30/20 milestone billing template, contracts governing scope, client rights in bespoke deliverables after payment, YCN retained reusable components and applicable third-party licences, proposed 30-day specification-defect correction, and separately paid maintenance. Backup obligations must specify cadence, restore checks, retention, handover and termination. OPEN: Formal contractual/IP/payment approval, CA/legal review, delivery/backups evidence; no blanket ownership or warranty claim in public copy.
6. **O-06 — Privacy.** APPROVED: inactive pre-sales enquiries retained up to 12 months from last meaningful contact, subject to counsel-approved schedules/exceptions; separate records for client/tax matters; notice version and purpose-specific legal basis, separate optional marketing permission off by default, verified privacy contact, controlled rights requests. No automated purge or children's-data collection targeting. OPEN: Explicit retention and policy approval, registered entity, jurisdiction, legal counsel, privacy-contact operation and DPDP/privacy analysis.
7. **O-07 — Interim logo.** APPROVED: existing verified site logo can be considered for launch only following Owner visual acceptance; authoritative logo source untouched. Brand candidate work remains on `wip/brand-export-05`, not brand `main`. OPEN: Visual ruling on exact assets, future approved derivatives; no automatic logo work.
8. **O-08 — CLOSE and Downloads.** AGY-REPORTED: `YCN-DOWNLOADS-VERIFY-01` traced all inventoried unique YCN project work into preserved GitHub/vault archives, including eight older intake entries; six loose copies were not individually hashed before deletion and there was no exhaustive original Downloads manifest, so zero loss beyond inventory is not certifiable. APPROVED: plan-first CLOSE, no automatic deletion/move/overwrite or unreviewed repository pushes, exact per-file manifests and Owner approval, no brand-main push of WIP artwork. RATIFIED: supersedes the automatic deletion and CLOSE push exception in docs/CLOSE_PROTOCOL.md. No guarantee of an exhaustive whole-computer audit.
9. **O-09 — Date and reviews.** OWNER-STATED: Owner can review 10 hours per week. APPROVED: 30 November 2026 provisional planning target, not a public promise; reforecast once based on actual status after business decisions, with production go/no-go unchanged. OPEN: Explicit launch-date approval and feasible delivery forecast.
10. **O-10 — Access and budget.** OWNER-STATED: Owner reports domain/DNS login, Vercel account and working domain-based business mailbox. These do NOT establish correct live project mapping or email-provider admin access. APPROVED: retain the existing modular Next.js/Postgres/Upstash/Resend/Sentry stack; ₹5,000/month candidate ceiling plus separately approved CA/legal and encrypted external backup costs. OPEN: Actual provider-admin/domain permissions, live deployment/repo/branch, Postgres, Upstash, Resend, Sentry, analytics, Search Console and budget authorization. No secrets or personal credentials in the repo.

**Gate A:** COMPLETE for business policy (Owner-approved 14 Oct 2026). OPEN items above remain release prerequisites. Architecture v0.9 stays CANDIDATE; application coding remains paused until Gate E and a separate Owner authorization.


### DECISION-053: Gate B1 — V1 Service Copy and Start a Project Destination (Owner, 15 October 2026)

**Status: OWNER-FINAL (Owner-delegated decisions, 15 October 2026).** The Owner expressly delegated Decisions A and B to the AI review team and directed it to select the sensible approach. GPT adopted the consistent YES/YES recommendation following Claude's review. This approval concerns only the exact V1 content decisions below.

1. **Primary enquiry destination.** The ratified CTA label remains "Start a Project". Its single V1 destination is the existing `/contact` route. Do not create another enquiry system or implement any route change through this decision. Any future redirect or code change requires a separate authorized task.
2. **Two exact Content Spec replacements.** In `docs/YCN_CONTENT_SPEC.md` §3 PATHS-01, replace "Turn an idea or business process into a web, mobile or SaaS product." with "Turn a defined idea or business workflow into a useful web application." In §4 What We Build, Need 4, replace "Web apps, mobile products and SaaS built from a useful first version outward." with "Selected web applications designed around a clearly agreed first version."
3. **Prior ratification preserved.** The §3 Needs Finder description is expressly superseded within DECISION-040's homepage candidate copy. All other DECISION-040 copy, headings, chapter structure and CTA labels remain unchanged.
4. **Completeness and vNext disposition.** These are the only two canonical Content Spec lines changed by DECISION-053, not a claim that no other mobile/SaaS references exist. Existing vNext planning references, including `docs/vnext/03_INFORMATION_ARCHITECTURE_AND_PAGE_PLAN.md` and `docs/vnext/16_PAGE_BLUEPRINTS_DETAILED.md`, remain unchanged and are not automatically approved as public V1 service claims. The complete logged search results will be reviewed during the relevant Gate B1 page pass before implementation.
5. **Authority and messaging.** DECISION-005's order remains: business value → visual example → capability → process → engineering → honest proof → action. DECISION-052 O-02 governs V1 offers; DECISION-003 and DECISION-051 preserve future mobile/SaaS ambitions without representing them as currently proven services. India-first/INR direction and truthful-claims rules remain binding. Legal identity, children's-data wording and privacy notice requirements remain subject to their existing approval gates.

**Scope limitation:** DECISION-053 authorizes only the two specified canonical copy changes and their decision-log recording through this task. It does not authorize application code, redirects, design changes, provider configuration, spending, legal clearance, deployment or a Git push.

### DECISION-054: Gate B1 — Canonical Messaging, India-First Contact and Legal Requirements (Owner, 15 October 2026)

**Status: OWNER-FINAL (Owner-delegated decisions, 15 October 2026).** The Owner delegated the selection of sensible V1 content decisions to the GPT, Claude and AGY review process. This decision records the team's reviewed and agreed scope under that delegation; it does not represent that the Owner personally selected each sentence. It authorizes the specific canonical documentation changes below, not their implementation or legal publication clearance.

1. **India-first business identity.** The approved About operating-location statement is "Based in Hyderabad, India, working with businesses across India." Hyderabad is Owner-stated operational context, not independently verified company-registration or registered-office evidence. DECISION-052 O-01 remains binding.
2. **Problem-first contact.** `/contact` remains the only V1 Start a Project destination under DECISION-053. The approved additional first-step line is "Tell us what is slow, lost or difficult in your business today. We'll tell you plainly what could help and what it would cost, before you commit to anything." Do not imply a guaranteed technical solution. Quotation and scope are agreed before a commercial commitment.
3. **INR and planning defaults.** Indian quotations use INR. No preset V1 monetary budget bands are authorized without a further explicit decision; an optional free-text budget estimate may default to "Not sure yet". The project-type control defaults to "Not sure yet — need guidance on the right digital format", not an assumed website requirement. Do not carry historical GBP bands into V1.
4. **Limited FAQ supersession.** In Content Spec §10, FAQ answer 6 retains the first sentence about the written agreement but replaces "You will always know exactly what code and assets belong to you." with "Before work starts, the agreement sets out plainly what you own and what is licensed." This supersedes only that previously ratified sentence. Client rights, YCN reusable components and third-party licences follow the actual approved agreement under DECISION-052 O-05.
5. **Engineering introduction and claims.** The approved Engineering public introduction is "Technical choices follow the actual problem. Here we explain how we choose technology, the practices behind this website, and how we check them before release." A definite technical performance, conformance, security or reliability claim requires evidence supporting that exact statement in the Claims & Proof Register. Unverified targets and planned architecture remain distinguishable from implemented and staging-verified facts.
6. **Business-directed services and children's data.** The approved candidate public statement is "YCN Labs works with businesses. Our services are not directed at people under 18." It is subject to counsel's approval before publication. No age-verification system, children's-data targeting or automatic purge is authorized for V1. Incidental receipt of a minor's data requires a legally reviewed handling procedure.
7. **Privacy and legal publication requirements.** Privacy and Terms publication requires competent legal review of entity and jurisdiction, applicable Indian DPDP and any other relevant legal duties, purposes/basis, notices, service providers, analytics, retention and rights, marketing permissions, security statements, intellectual-property limitations, affirmative permission for portfolio publication, warranty boundaries and verified contact channels. This decision is not a Privacy Policy, Terms of Service, legal opinion or clearance to deploy existing legal-page copy.
8. **Truthful enquiry acceptance.** A successful visitor receipt must follow committed durable lead acceptance and an affirmative accepted response, not simply HTTP status 200 or attempted email delivery. Preserve the two distinct problem questions in the V1 journey; their clean DTO/API implementation, append-only processing evidence, atomic deduplication and recovery tests remain under Architecture v1.0 and Task 12. Redis is not the durable acceptance record.
9. **Authority preserved.** DECISION-040 is superseded only as expressly identified here, DECISION-053 remains binding, and all other ratified copy remains unchanged. Historical vNext blueprints are preserved. H-03 homepage chapter implementation and the W-06 five-panel layout disposition remain separately governed by Gate E. No website-code, infrastructure, provider, migration, spending or release authorization is granted.

**Scope limitation:** DECISION-054 authorizes only the specified changes to `docs/YCN_CONTENT_SPEC.md` and `docs/YCN_DECISIONS.md` through the bounded task `YCN-B1-DEC-054-01`. Publication of legal text, application implementation and Git push remain separately gated.


### DECISION-055: Lean Launch, Preserved V2.0 Scope and Business Proof

**Status: PROPOSED — OWNER ADOPTION PENDING**

**Effective on approval:** From acceptance through the June 2027 review; commercial focus to October 2027.

**Precedence:** Supersedes *delivery priorities and routine review/demo procedures* only to the extent explicitly described. Previously approved business policies and security, privacy, data-integrity, brand, frozen-system, main-merge and deploy authority are preserved. Keep Master Plan §14 and existing Task IDs.

## 1. Direction and success definition

**The website is a tool to help a small studio earn trust and start conversations, not an enterprise software platform to administer.** Finish the actual current Site V2 codebase as a lean, honest, responsive, commercial studio site; prove the visitor can contact YCN; show only genuine attributable work; and initiate client outreach immediately. June 2027 is a decision about V2.0, not a mandate to build it.

Success by January 2027 is measured with evidence: a live working studio site, verified customer-contact path, genuinely working demonstration or client project, regular outreach, proposals and an initial paid engagement if demand supports one. There is no guaranteed conversion, revenue, Lighthouse score or customer count.

## 2. Eight consolidated amendments to the previous strategy

**A1 — Proportional reviews and GitHub PRs.** AGY remains the only local workstation builder. For routine, bounded work use **one independent reviewer** (GPT or Claude, alternating). Review the actual GitHub diff plus tests; Owner authorizes merge into `main` and any deployment. Elevate independently for data migrations, security, sensitive customer data, legal publication, destructive operations and live production. A single PR is the communication center instead of forwarding transcripts. Owner must ratify changes to standing three-seat rules and explicitly scope any WIP push delegation.

**A2 — Keep integrity; consolidate tests, don't just delete them.** Task 12's minimum five *smoke journeys* are: valid durable acceptance plus tested notification; DB unavailable gives truthful failure; email/status-update fails after commit yet acceptance remains true and recoverable; concurrent retries yield one stored lead, original reference and no duplicate email; malformed/invalid input is rejected. The existing architecture's 12 staging scenarios still include consent, provider failure, analytics, retention, operational recovery and rollback. Group by risk and avoid repeating tests, but do **not** silently waive requirements for a publicly active custom form. If verified staging remains blocked, propose a **separately approved** direct-email/WhatsApp contact path that never falsely claims server-side receipt, and disable the unfinished custom form.

**A3 — Bounded pilot projects, not speculative free work.** Aim for small, realistically priced pilot work with explicit written scope, milestones, acceptance, revision limits, publishing permission and truthful attribution. Discount only when the exchange is commercially reasonable. Never promise a fixed price or a two-week delivery without estimating and verifying capacity.

**A4 — Recovery with accurate labels.** First verify critical source and private records are preserved. The `proof/` subset is not the whole 18.9 GB master. Local Restic snapshots to `/mnt/workSpace` are optional convenience recovery on the **same physical SSD**. A second physical/off-device copy is the stronger resilience measure but remains deferred by Owner pending an explicit ruling. No unreviewed `ycnbackup` installation, source deletion, pruning or scripted full-folder move.

**A5 — No invented pricing, metrics or capabilities.** The business foundation specifies India-first positioning, **custom INR quotes**, and a proposed 50/30/20 commercial framework—not publicly authorized price bands, a ₹35,000 one-size-fits-all offer or unmeasured 99/100 Lighthouse promises. Measure performance, demonstrate actual scope and cost the first project before publishing pricing promises. Retain claims register.

**A6 — Launch with authentic evidence, not a portfolio deadline.** The YCN Labs site itself may be a truthful internal project **once it is live**, with verified code, measured performance, limitations and test outcomes. A working local-business pilot or an honestly labelled independent demonstration may be added when complete. Do not block launch waiting for two or three invented case studies or purchased testimonials.

**A7 — Parking lot by pointers, not duplicate copies.** Create one `docs/V2_PARKING_LOT.md` on Site V2 `main`, pointing to current canonical documents, historical SHAs, WIP branches and private vault locations; keep existing files and evidence intact. A scope-freeze Git tag goes on the exact **Owner-adopted scope commit after approved integration**, not on the old governance merge. Do not move/copy hundreds of files into a second archive or delete original records.

**A8 — Minimal administration, real business setup.** No daily full governance reviews, hours tables, cold-start-generator rollout or ordinary typo deviation numbering. Keep a short native Git preflight, single scoped task, raw necessary test evidence, one reviewer, actual approval and a truthful close note. Log material destructive, provenance, security, privacy or wrong-push incidents. Consult an India-qualified CA before commercial invoicing for the actual legal form, GST/RCM on foreign SaaS, TDS classification, invoices, accounts and tax thresholds; don't codify unverified tax interpretations or defer essential setup to 2027.

## 3. Immediate V1 deliverables (keep existing task IDs)

| Task | Ship/resolve now | Explicitly *not* required for the first launch |
|---|---|---|
| `03` | Record source and recoverability risk, a safe minimum recovery method and honest limits; implement local automation only if specifically approved | Backup-dashboard programme, automatic pruning, invented whole-master backup claims |
| `04` | Inspect the historical live-claims hotfix Preview, then Owner decides promote/hold separately | Direct merging of historical private site into Site V2 |
| `07` | Owner visually accept or reject the preserved navigation WIP; test and integrate only if approved | New multi-round glow/CTA exploration |
| `08` | Fix actual Capability-03 overflow at 1024px and verify at 375px plus desktop | New page architecture |
| `09` | Correct only verified severe visual, motion, accessibility and mobile performance defects | Additional cinematic scene invention |
| `10` | Honest India-first services, contact and identity; GBP/UK metadata cleanup; no fabricated projects, price bands or service guarantees | New blog, multilingual funnel, CMS |
| `11` | Use only explicitly Owner-approved logo/brand assets, with actual source/licensing rights | All future crop/derivative campaigns |
| `12` | Fix false-503, atomic per-intent idempotency and original-ID recovery; staging acceptance or verified fallback contact | CRM, notification dashboard, marketing funnel tracking |
| `13–14` | CI, real phones/375px, keyboard/theme/reduced motion, credible performance checks; show a few real owners the site | A new formal user-research programme |
| `15–16` | Verify privacy, operators/inbox, commercial hosting, alerts, rollback/cutover and obtain exact-SHA Owner deploy authorization | Unverified commercial claims, automatic production deploy |
| `17` | Basic postlaunch monitoring, inbox response ownership and incident recovery | Custom internal operating suite |

No new Task 18/19 is silently created. Deferred OI-19 items stay indexed with reopen evidence.

## 4. Release acceptance: ten outcome-based checks

1. Exact release SHA is clean; lint, types, tests, build, secret scanning and scoped regression checks pass.
2. Public identity, service scope, portfolio/project provenance, copy, India market and currency/metadata are truthful.
3. All critical routes, main CTA, keyboard, links, responsive layouts at 375/1024px, both themes and reduced motion work on real devices.
4. The actual customer contact route is tested end-to-end, accurately distinguishes *stored* from *not stored*, and reaches a monitored human (or an explicitly approved tested fallback replaces the custom form).
5. Real email sender/inbox and DNS authentication work **if the selected route sends email**; an accountable lead/backup operator owns failures.
6. Public notices, terms, privacy contact, retention, marketing permissions and data-processing disclosures are accurate and receive applicable professional/legal review.
7. Mobile performance is measured on a representative physical phone and agreed test profile; no fabricated Lighthouse/Core Web Vitals claims.
8. Secrets, essential abuse controls, error/uptime alerts and incident response responsibility are verified for the actual environment.
9. The selected commercial hosting plan, exact repository/branch, staging, domain/DNS cutover, rollback and relevant data recovery are verified; no automatic unapproved deployment.
10. Owner visually accepts the **actual** candidate and issues an explicit separate deployment decision for the exact commit and environment; postlaunch smoke test and follow-up operator are scheduled.

The 143-item control list stays as historical reference and a source of risk-specific checks, not a daily daily sign-off requirement.

## 5. Timeboxed execution

| When | Work | Proof of progress |
|---|---|---|
| **18–20 Oct 2026** | Owner adopts scoped decision; single no-delete source index and canonical reconciliation prepared/reviewed; Task 07 visual verdict; first customer-contact conversations start | Adopted SHA, one approved PR, owner decisions, outreach log |
| **19–25 Oct** | Authorized Task 12 bug fix on isolated WIP, Task 08 overflow preflight, staged lead operator access; select actual V1 contact path | Code diff, targeted tests, real staging blockers named |
| **26 Oct–1 Nov** | Task 10 copy, metadata/INR correction, logo decision, honest Work page plan, privacy wording and real-device perf sampling | Reviewed route-level changes and factual screenshots |
| **2–8 Nov** | Contact staging or fallback acceptance, responsive/perf corrections, monitoring and hosting/cutover preparation | Working verified Preview, real enquiry, measurable page results |
| **9–15 Nov** | Ten release outcomes, Owner acceptance, controlled production cutover only when safe | Exact live SHA, customer journey smoke, rollback path |
| **16–30 Nov** | Existing fallback launch checkpoint if critical issues hold the accelerated target; begin/continue external pilot | No falsely rushed go-live, signed small pilot scope |
| **Dec 2026–Jan 2027** | Outreach, deliver scoped pilot, publish verified work; lean studio maintenance | Conversations → proposals → paid work, attributable case evidence |
| **Feb–May 2027** | Repeat what sells, define viable optional client maintenance, track costs/revenue | Measured delivery effort, invoices and support obligations |
| **June 2027** | Decide whether to invest in V2.0 using demand, lead volume, repeat asks, cash, and capacity | Continue V1, make one targeted enhancement or explicitly start V2.0 |
| **Jul–Oct 2027** | If justified, build one V2.0 improvement at a time; otherwise prioritize client delivery | Incremental customer value rather than new imagined platform scope |

**Commercial experiment:** list 30 warm contacts; make ~10 relevant personalized outreaches weekly; record *replies, conversations, proposals, paid wins, revenue collected* in one simple sheet. Do not wait for site launch to initiate genuine conversations. Spend at most about 3 hours/day of your own time on the YCN marketing site during launch and ~3 hours/week on routine site upkeep afterward (exceptions for incidents).

## 6. Source-control and Owner authority

1. One builder (AGY), one independent reviewer for ordinary approved tasks; elevated appropriate reviewers when safety/customer-data/legal/release risks demand. One PR per bounded change. Reviewer should inspect the actual diff, tests and impact—not re-review other reviewers' prose.
2. AGY cannot author or revise GPT/Claude standalone visual demos. Proposed narrower demo requirement applies only after Owner approves the change to OI-18. Approved demo is not authorization for coding or release.
3. Owner explicitly authorizes protected merges, public pushes where required by standing rules, schema migrations, deletions, file moves, spend, frozen-system edits, live hotfixes and production releases. PR creation or WIP push is allowed only within the exact delegation granted by the Owner.
4. Existing foundation/historical records remain recoverable. No blanket `git clean`, `reset`, `restore`, bulk moves, or new source-of-truth duplicate files.
5. A new control/process document is added only to remedy a demonstrable operational risk or an actual approved decision. No governance ceremony for its own sake.

## 7. Adoption words (Owner only)

`ADOPT DECISION-055: lean-launch scope and operating changes as written in this candidate. Authorize AGY to prepare a docs-only canonical reconciliation on a new WIP branch for one reviewer. Do not move/delete files, commit/push/merge/deploy, spend, install timers, change frozen systems or run database migrations without separate approval. After integration, prioritize Task 12 and actual customer outreach.`

If the Owner wants to allow a WIP commit/push for that single doc reconciliation, grant it explicitly with its allowed file list. Do **not** treat the candidate as adopted merely because other AI seats recommend it.

**Evidence boundary:** All launch dates, customer count and price conclusions above are targets/hypotheses, not verified results.
