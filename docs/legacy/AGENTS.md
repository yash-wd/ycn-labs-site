> [!NOTE]
> **HISTORICAL REFERENCE ONLY — NOT ACTIVE PROJECT AUTHORITY**
> This document is preserved for engineering provenance and historical record.
> It has been superseded by the **YCN Canonical v1.2** specification suite.
> For current active project specifications, task queues, and architecture, consult [`docs/INDEX.md`](../INDEX.md).

---

# AGENTS.md — YCN Labs Final Operating Authority

**Status:** CUSTOMER-FIRST REDESIGN REVISION — prepared under owner delegation, 2026-09-12; repository adoption and production acceptance are separate  
**Scope:** YCN Labs UI, visual evidence, responsive design, accessibility, motion, cinematic experience, and presentation-layer release work  
**Primary concept:** **UNBROKEN — The Digital Business Core**  
**Redesign headline:** **Websites and software. Built around your business.**
**Brand philosophy retained:** Software, engineered to hold up.
**Current amendment:** §3.9 governs the bounded redesign exceptions. All other safety rules remain in force.  
**Location:** repository root as `AGENTS.md`

---

# 0. DOCUMENT CONTROL

## 0.1 This is the only active project instruction document

This file supersedes every earlier generated planning or AGY instruction document for the YCN Labs UI/cinematic programme, including all:

- `AGENTS*.md` variants
- `YCN_UNBROKEN_DIGITAL_CORE_EXECUTION_MASTER*.md` variants
- visual/motion enhancement plans
- cinematic master specifications
- decision packs
- UI remediation briefs
- execution briefs
- handover/status documents
- current-condition Markdown reports

Historical files may be archived outside the active repository for reference, but **AGY must not read or apply them** unless the owner explicitly restores one.

The only active instruction source for this programme is:

```text
AGENTS.md
```

The repository code, Git history, terminal output, deployed behaviour, and measured evidence remain the sources of truth for the current implementation.

## 0.2 Authority rule

Use this order:

1. **Verified runtime evidence and terminal output** for current facts
2. **Current repository code** for current implementation facts
3. **This file** for approved policy, scope, concept, sequence, and constraints

Examples:

- Code determines whether a line is 56 or 57.
- Runtime determines whether a route works.
- This file determines whether violet, WebGL, invented metrics, or a new dependency is allowed.
- Existing code does not authorise a prohibited design merely because it is present.

When code conflicts with this file:

- Do not silently change policy.
- Do not silently preserve the conflicting code.
- Stop and report the conflict.
- Wait for owner direction.

## 0.3 Acceptance

Placing this file at repository root means the owner adopts the decisions and defaults recorded here.

Any later exception must be:

- written,
- specific,
- approved by the owner,
- limited to one task or release,
- independently reversible.

## 0.4 No parallel planning-document generation

Do not create another competing strategy, master plan or AGENTS variant. The 2026-09-12 amendment updates the existing three canonical sources; package README, diffs, prototypes and test results are delivery artifacts, not additional authorities.

Allowed documentation after this point is limited to:

- measured evidence attached to a task,
- a short approved decision record inside this file,
- release notes,
- a rollback record.

Progress is measured through code, screenshots, tests, and verified results.

---

# 1. OWNER PREFLIGHT — COMPLETE BEFORE THE FIRST AGY SESSION

The owner performs these steps outside AGY.

## 1.1 Credential safety

A previous uploaded archive reportedly contained live-looking values for:

- database connection,
- Upstash URL/token,
- Sentry DSN/configuration.

Record only:

```text
Database credential rotated/reviewed: YES / NO
Upstash credentials rotated/reviewed: YES / NO
Sentry configuration rotated/reviewed: YES / NO
```

Never paste secret values into:

- AGY,
- ChatGPT,
- Git,
- screenshots,
- Markdown,
- terminal output shared publicly.

AGY must never:

- read `.env` values,
- print `.env` values,
- rotate credentials,
- request credentials.

## 1.2 Capture the untouched Git state

Before copying this file or removing old documents:

```bash
git branch --show-current
git rev-parse HEAD
git status --short --branch
git log --oneline -5
```

Save the output privately.

## 1.3 Place this file

Place this file at:

```text
<repository-root>/AGENTS.md
```

Do not commit it yet.

## 1.4 Raw asset safety

Keep raw, unreviewed screenshots and photographs outside the repository:

```text
assets-raw/
```

This folder must not be inside Git.

Only reviewed, redacted, rights-cleared, optimised assets may later enter:

```text
apps/web/public/media/
```

---

# 2. CURRENT PROJECT STATE REGISTER

Everything in this section is a **documented baseline that must be re-verified in Phase 0**.

## 2.1 Documented architecture

The supplied audits describe:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- Turborepo and pnpm
- Drizzle/Postgres
- Zod
- Upstash rate limiting
- Resend
- Sentry
- next-themes
- Framer Motion
- Vitest
- Playwright
- axe integration
- Vercel
- Geist and Geist Mono

The architecture is considered proportionate and must not be re-platformed during this programme.

## 2.2 Documented route inventory

The supplied audits describe 19 page files and 3 API routes.

### Public routes

```text
/
/about
/services
/services/web
/services/web-apps
/services/saas
/services/ai
/services/mobile
/services/software
/work
/work/[slug]
/process
/engineering
/blog
/blog/[slug]
/contact
/legal/privacy
/legal/terms
/legal/cookies
```

### API routes — out of UI scope

```text
/api/contact
/api/health
/api/newsletter
```

### Special files

```text
error.tsx
global-error.tsx
not-found.tsx
robots.ts
sitemap.ts
```

Phase 0 must re-verify this inventory.

## 2.3 Conflicting documented snapshots

Earlier reports reference different branches and commits. Therefore:

- do not assume the current branch,
- do not assume the current commit,
- do not assume which Stage 1 tasks are complete,
- do not assume the deployed build matches local code.

Phase 0 establishes the current truth.

## 2.4 Documented Stage 1 work that may already exist

Earlier status material reports that some or all of these may have landed:

- Tailwind semantic compatibility aliases
- type-scale tokens
- 16px form input text
- light/dark `color-scheme`
- differentiated muted text tier
- partial `/process` CTA correction
- passing lint, typecheck, unit tests, and build at that historical point

Phase 0 must inspect code before repeating any work.

## 2.5 Documented open or unverified issues

Phase 0 must establish the status of:

- light-theme elevation ramp
- `/process` inverse CTA surface
- dark error-text contrast
- hero icon non-text contrast
- F12: content initially hidden before hydration
- unused violet variants
- unused `CountUp`
- unused glow utilities
- dead Tailwind configuration
- F11: Vercel Analytics script status
- F5: Cal.com/booking weight and loading behaviour
- Lighthouse baseline
- LCP element identity
- real responsive behaviour
- keyboard and screen-reader behaviour
- deployed commit identity

## 2.6 Documented media gap

The supplied audits report effectively zero content media:

- no product screenshots,
- no founder photograph,
- no process photography,
- no case-study media,
- no architecture visuals.

This must be re-verified, but real evidence remains a critical path.

## 2.7 Status table — update only after owner approval

| Item | Status | Verified commit/date |
|---|---|---|
| Credential review | NOT RECORDED | |
| Phase 0 | NOT STARTED | |
| Stage 1 foundation | UNVERIFIED | |
| F12 | UNVERIFIED | |
| F11 | UNVERIFIED | |
| F5 | UNVERIFIED | |
| Asset inventory | NOT STARTED | |
| Static UNBROKEN build | NOT STARTED | |
| Light motion | NOT STARTED | |
| Cinematic layer | NOT AUTHORISED | |
| Deep-route enrichment | NOT STARTED | |
| Production release | NOT STARTED | |

Do not update this table without evidence and owner approval.

---

# 3. FINAL ADOPTED DECISIONS

These are the final defaults for the project.

## 3.1 Programme decisions

| ID | Final decision |
|---|---|
| E-1 / D2 | GSAP and ScrollTrigger may be proposed only after the static experience and clean measured baseline. Install only after written owner approval |
| E-2 / D7 | Atmosphere motion is OFF by default. Maximum one approved atmosphere element per route |
| E-3 / D5 | Any future Gallery is self-hosted. No Instagram/Meta embeds |
| E-4 | Lottie, Rive, WebGL, Three.js, and WebGPU are deferred beyond the launch-quality SVG/CSS version |
| E-5 | Animated counters are allowed only for genuinely measured values. Targets and budgets stay static |
| E-6 / D1 | Sequence: verify → repair → measure → gather evidence → static experience → light motion → measured cinematic layer → deep routes → release |
| E-7 / D4 | The performance and media budgets in this file are binding |
| E-8 | Screenshot rights, redaction, EXIF removal, and two-person review are mandatory |
| E-9 / D16 | The cinematic homepage is a gated feature. A static launch is acceptable |
| E-10 / D15 | The launch Integrity Core/Signal Line uses server-rendered inline SVG, not WebGL |
| E-11 / D17 | Seven desktop scenes collapse to four mobile chapters without losing content |
| E-12 | `/gallery` is deferred until at least 12 real stories, a named owner, and a publishing cadence exist |
| E-13 | Reference sites are inspiration for discipline only. Do not copy or keep redesigning toward them |
| E-14 / D21 | Blog teaser is conditional. Omit rather than fill with weak content |

## 3.2 Truth and content decisions

| ID | Final decision |
|---|---|
| D8 | Founder identity uses a real approved photograph or remains text-led. No synthetic person |
| D9 | Testimonials are real and authorised or omitted |
| D10 | Work labels: Client Work / Internal Product / Concept Build / Open-Source Experiment |
| D14 | Screenshots use dual-theme captures or theme-neutral framing |
| D18 | Historical target superseded for this redesign by §3.9 G: comprehension-first density, no word-count minimum; prior PASS preserved |
| D19 | OG image derives from the same static Signal Line/Core visual source |
| D20 | Locked anchor IDs are retained; “See how we build” points to `#how-we-build` |
| D22 | Show only verified service routes and capabilities |
| D26 | Asset verdicts: PUBLISHABLE / NEEDS-RECAPTURE / NEEDS-DESIGN-TREATMENT / NOT-PUBLISHABLE |
| D27 | Booking is intent-gated; the direct contact form remains available |

## 3.3 Operational decisions

| ID | Final decision |
|---|---|
| D23 | Review production INP when sufficient field data exists |
| D24 | Every phase and cinematic scene is independently revertible |
| D25 | Route disposition is recorded below |
| G4 | Two-person screenshot review is mandatory for systems holding real data |
| G15 | Bundle analysis is required before adding the cinematic library |
| N27 | Description is not authorisation. Only the phase gates in this file authorise work |

## 3.4 Route dispositions

| Route | Disposition |
|---|---|
| `/` | ENRICH — full UNBROKEN experience |
| `/about` | ENRICH — studio operating model and accountability |
| `/services` | ENRICH — outcome-led selector |
| `/services/web` | ENRICH — one service-specific demonstration |
| `/services/web-apps` | ENRICH — one service-specific demonstration |
| `/services/saas` | ENRICH — one service-specific demonstration |
| `/services/ai` | ENRICH — one service-specific demonstration |
| `/services/mobile` | ENRICH — one service-specific demonstration |
| `/services/software` | ENRICH — one service-specific demonstration |
| `/work` | ENRICH — real evidence |
| `/work/[slug]` | ENRICH — visual case-study narrative |
| `/process` | ENRICH — readable Signal Line timeline |
| `/engineering` | ENRICH — technical proof centre |
| `/blog` | KEEP — calm and readable |
| `/blog/[slug]` | KEEP — diagrams only when useful |
| `/contact` | ENRICH UI ONLY — preserve all behaviour |
| Legal routes | KEEP — calm and text-led |
| Error/404 states | KEEP and make theme-consistent |
| `/gallery` | DEFER — do not create now |

## 3.5 Named roles

One person may hold several roles, but names must be recorded before relevant gates close.

| Role | Name |
|---|---|
| Business truth and spend owner | |
| Architecture and performance owner | |
| Visual/story owner | |
| QA/release owner | |
| Rollback owner | |
| Asset redaction second reviewer | |
| Future Gallery owner | |
| Post-launch field-performance reviewer | |

## 3.6 Owner decision record — 2026-08-09 — positioning
The company is described as an engineering studio. The "founder-led"
framing is withdrawn. Supersedes: line 580 (What), line 742
(founder-led model), line 372 (/about founder-led proof), line 846
(real founder), line 852 (do not imply a large office or team).
The site must not claim headcount, departments, staff numbers, or an
office, and must not imply a single-person company. Work may be
delivered with engaged specialists; this is stated only where true.
Asset register §13.1 "1 founder photograph" is SUSPENDED pending
owner replacement decision — do not capture it.

## 3.7 Owner decision record — 2026-08-17 — brand alignment and asset governance

BRAND PRIMITIVES: §11.1 is amended to permit the addition of hue-anchored
accessible tokens (action family 203°, signal family 193°, derived from the
measured logo hues) and the remapping of the semantic layer onto them.
--brand-ink is RETAINED at #0a0c10. --brand-secondary is RETAINED pending the
logo decision, because Logo.tsx:36 depends on it. --brand-primary and
--brand-accent remain defined but are reclassified as logo/decoration values
and are removed from text and interactive roles. Amendment is limited to
apps/web/app/globals.css token definitions and their call sites, and is
independently reversible by reverting that commit.

TYPOGRAPHY: Geist and Geist Mono are RETAINED for all interface and body text.
The logo wordmark is artwork, not live text. No webfont is added.

SECOND REVIEWER (Q7): E-8/§13.3 two-person review is amended. For assets that
contain NO real client, personal or third-party data, single-owner review
recorded with a date is sufficient. Two-person review remains mandatory for any
asset showing real system data. Rationale: the studio has one person; an
unsatisfiable gate has blocked Phases 3 and 5 since 2026-08-10.

CAPABILITY COPY: Service-route copy states architecture and offerings, not
first-person assertions of completed practice. This is truth-preserving whether
or not a given capability has been delivered, and extends the D22 ruling of
2026-08-13 to all six service routes.

DOCUMENT STATUS: docs/brand/YCN_LABS_BRAND_TECHNICAL_RECORD_v1.2_FINAL.md is
admitted under §0.4 as a technical specification, not a planning document.
AGENTS.md remains the only plan; PROJECT_STATE.md the only state file.

LOGO ASSETS: The logo enters the §13.2 register as A-13 dark master (stored
outside Git), A-14 light variant, A-15 icon set, A-16 OG image, A-17 header
mark. Whether the new artwork replaces the existing Logo.tsx monogram is a
separate owner decision, not authorised by this amendment.

§3.7 AMENDMENT 2026-08-18 — BRAND PRIMITIVES, second revision.
The retention clause for --brand-secondary is discharged: its stated reason
(Logo.tsx:36) was removed in T-24/T-25. Measurement on 2026-08-18 established
that no single value can clear 4.5:1 on both #ffffff and #182234 — the
luminance windows do not overlap (≤0.1630 versus ≥0.2464; the binding light
constraint is #f1f5f9, not #ffffff) — so a theme-agnostic §11.1 primitive can
never carry a text role. --brand-secondary is RETAINED as a DECORATION-ONLY
primitive and re-pointed from #0e7c7b to #0294BD (signal family, hue 193°).
Its permitted consumers are --semantic-gradient-frame and the decorative
radial glows only. --semantic-accent-secondary is repointed onto the
per-theme --signal token (light #02799B, dark #0294BD) because it reaches a
text role in ProblemsSection.tsx, where #0e7c7b measures 3.77:1 on #0d111a
and 3.18:1 on #182234 and fails AA today. Deleting --brand-secondary is NOT
authorised.


## 3.8 Owner decision record — 2026-08-20 — visual/motion specification and governance re-lock

The previously referenced but unavailable §3.8 wording is ABANDONED. It must
not be reconstructed, paraphrased, inferred, or presented as historical owner
text. This section is a new owner-authorised decision record dated 2026-08-20.

VISUAL/MOTION SPECIFICATION: `docs/design/YCN_LABS_VISUAL_MOTION_EXPERIENCE_SPEC_v1.0.md`
is admitted under §0.4 as the single canonical visual/motion technical
specification, not a planning document. Its named art direction is **The
Instrument Field**. It defines the approved target visual grammar, scene
composition, responsive behaviour, and future motion behaviour inside
already-authorised tasks. It does not create a new phase, task queue,
dependency authorisation, or permission to skip an existing gate.

The separate draft file `YCN_LABS_VISUAL_MOTION_RECORD_v1.0.md` is NOT an active
authority source. Its useful ideas are consolidated into the canonical
experience specification. Do not keep both files active, point AGY to both, or
create another visual/motion master.

AUTHORITY MODEL is re-locked to three operative roles:

1. `AGENTS.md` — policy, prohibitions, budgets, phase gates, and authority.
2. `PROJECT_STATE.md` — append-only verified state, evidence, and the single
   operative next-task pointer.
3. `docs/design/YCN_LABS_VISUAL_MOTION_EXPERIENCE_SPEC_v1.0.md` — target visual
   and interaction behaviour within an authorised task.

Existing admitted technical records such as
`docs/brand/YCN_LABS_BRAND_TECHNICAL_RECORD_v1.2_FINAL.md` remain subordinate
specifications under `AGENTS.md`; they do not create a fourth task pointer or
competing visual authority.

The repository code, runtime behaviour, terminal output, Git history, and
measured evidence remain the sources of truth for current implementation facts.
If current code materially conflicts with this specification, report the
conflict and wait for owner direction rather than silently rewriting either.
Existing code never authorises a policy breach.

MOTION RULE OF THUMB is adopted verbatim:

> Render immediately. Reveal progressively. Never make essential content depend on animation.

OPENING EXPERIENCE: the first viewport must continue to satisfy §7. A large
brand mark may dominate the composition but must share the viewport with the
locked headline, supporting sentence, required CTAs, story bypass to #solutions, and
usable navigation. A mandatory autoplay intro film or a full-screen gate that
blocks content is NOT authorised by this amendment and remains prohibited.

LOGO-TO-NAVBAR TARGET: the future cinematic treatment may use a separate
presentational logo layer that scales/translates toward the stable accessible
navbar logo, then crossfades ownership at the target position. The real navbar
DOM remains structurally stable. This records target behaviour only; it does
not authorise Phase 5/6 implementation or a new dependency.

MEDIA DELIVERY: no ImageKit, Cloudinary, Cloudflare Images/Stream, or other
managed-media procurement/integration is authorised by this record. The vendor
shortlist may be retained in the visual/motion specification for future
evaluation. Same-origin self-hosting remains the default until a separate owner
ruling changes it.

SUPERSEDED: former §22 "IMMEDIATE NEXT ACTION" (Phase 0 bootstrap, now
complete) is replaced by §22 "EXECUTION POINTER RULE". This supersession by
itself changes no other policy.

FREEZE RULE: after adoption of this record and the visual/motion specification,
AGY and other agents must not rewrite `AGENTS.md` or the specification for
ordinary execution work. A later change requires an explicit owner-authorised,
specific decision record. `PROJECT_STATE.md` remains the only file that changes
as verified work progresses.

---

## 3.9 Owner-delegated redesign record — 2026-09-12 — customer clarity and purposeful cinema

### A. Authority, attribution and adoption

The owner explicitly requested a better, customer-convincing, visually appealing storytelling website, authorised document changes, and invited the use of Blender, Three.js, GSAP, Spline and comparable technologies where useful. This record is **designer-authored under that delegation**, not a verbatim historical owner quotation. It defines one bounded customer-first redesign release. The exact resulting implementation still requires evidence, owner visual review and release approval.

This revision may be adopted at the existing canonical file paths after checking the repository against the uploaded snapshots. It does not claim that these local document copies have been committed or deployed. Preserve the previous committed versions through Git history; do not maintain competing active masters.

### B. The product decision

**YCN must explain the service before asking a visitor to understand its engineering metaphor.**

The public first sentence names websites and software. The principal demonstration follows a recognisable customer enquiry from a customer-facing screen into a business workflow. Bookings, ordering, internal work and product development remain outcome pathways, with deliverability checked before they are sold as current capabilities. The visual story is still UNBROKEN, expressed through The Instrument Field; the customer action gives that language an understandable subject.

Successful comprehension is a release criterion alongside technical QA. AI agreement, owner enthusiasm and a clean automated audit are not substitutes for an actual visitor understanding the offer. No conversion uplift, sales volume or client result is guaranteed by this redesign.

### C. Explicit supersession map — only for this release

| Existing rule | Redesign decision | Boundary retained |
|---|---|---|
| §7 and §8 locked hero and supporting text | Revised business-first copy below governs; the former headline remains a philosophy line | One visible H1; essential text and contact visible without JS |
| §8 scene copy and T-83 Scene 2 freeze | Reopen copy hierarchy and the scene-local customer example where required for this release | Do not undo accepted geometry/motion merely to restyle it; new changed surfaces need fresh sign-off |
| §8.2 mirror and final peak | RETAINED | Same test, opposite outcome; only Scene 7 is the narrative culmination |
| D18 ≤220 narrative words; 900–1,400 body floor/ceiling; T-71 900-word floor | Replace with §3.9 G comprehension-first density contract | Historical D18 PASS is preserved, not retroactively failed |
| E-1/E-4, §12.4, §16 Phase 5/9: prototype only after proving existing tier cannot succeed | Isolated GSAP/Three.js/Blender experiments are permitted in a non-production prototype after source/preflight checks | No automatic production installation, procurement or release; performance and fallback gates still apply |
| §15.1 scene JS budget | Core automatic motion stays within 45 KiB gzip; a separately requested 3D viewer has the explicit separate budget below | No global 3D runtime; no hidden preload of opt-in assets |
| §0.4 / §3.8 freeze | These three canonical files may be amended for this owner-requested redesign | No parallel strategy, no alternate queue, no undocumented drift |
| §16 / §19 earlier phase examples | PROJECT_STATE's R-series queue governs this bounded release | Do not restart Phase 0 foundations or accepted pilots from historical examples |

Existing records may contain older wording. On a policy conflict **inside this amendment's listed scope**, §3.9 wins. Elsewhere existing policy stands. The render/code evidence hierarchy governs facts, not permission.

### D. Offer and proof integrity

Use two independent fields for every portfolio item: **classification** (the existing D10 taxonomy) and **implementation stage** (design study / working prototype / shipped / maintained). A third field records **verification scope and date**, or explicitly says no implementation verification is being claimed. “Internal Product” can be accurate for a design-stage internal initiative; it is not evidence of shipment. Never change the taxonomy merely to conceal missing implementation.

The R4 design-only status remains the starting point for the two existing case studies unless current evidence establishes otherwise. Remove or qualify “built”, “Full Product Build”, “checked”, “production-ready”, performance numbers, security assurances and universal quality badges wherever they imply unperformed implementation/testing. A label at the top does not cure conflicting copy underneath.

The historical Q6 statement says the advertised AI capabilities could not then be built. Softer conditional language does not prove that this capability now exists. Before publishing an available service, record current delivery ownership, an appropriate demonstration or other support, limits and specialist needs. Until resolved, `/services/ai` is an **AI feasibility/discovery discussion**, not an assurance of implementation. Do not invent equivalent incapability findings for other services based solely on this marketing repository's silence.

Future cybersecurity, education and digital-marketing ambitions remain parent-brand possibilities, not automatically launched services. No new route, staff biography, customer logo, price, SLA or guarantee is created without its factual basis. Existing Q3/Q4 owner-attested contact commitments are not automatically removed; their original scope remains as recorded.

### E. Technology choice, not technology accumulation

**Production direction:** CSS/SVG for the complete base; existing Framer Motion for existing UI interactions; GSAP/ScrollTrigger is the selected candidate for coordinated native-scroll choreography; Three.js is the selected candidate for the optional Scene 5 system cutaway; Blender is an offline asset-authoring option. This is approval to evaluate these named tools for this redesign, not a claim that they are installed or that a paid service has been purchased.

Only one owner may animate a given property. If GSAP owns scene transforms, Framer must not animate those transforms. Do not add a second smooth-scroll implementation, Spline runtime, R3F wrapper, particle engine or media vendor by default. Spline may be used as an alternative authoring/runtime experiment, not stacked beside another renderer for the same scene. Verify licence, export rights and actual shipped bytes before adoption; no paid procurement is authorised.

The delivery prototype uses an **original native 3D viewer (WebGL with a software-projected fallback)** for the explorable 3D cutaway and CSS perspective for the customer/business devices. It is not a claim of a GSAP, Three.js or Blender-rendered production implementation. A generated GLB is provided for authoring; the supplied Blender import/render script must be executed and reviewed separately.

Default experience: no mandatory film, no boot screen, no cursor takeover, no audio autoplay, no forced scroll completion, no random decorative 3D. Cinematic movement explains a real action, a connection, a failure, a layer or a confirmation.

### F. Bounded technical gates (targets, not measured achievements)

- Essential offer, navigation, text, service links and contact path are available immediately. Animation never owns their existence or readiness.
- Core automatic scene enhancement: **≤45 KiB added gzip** over the accepted current baseline, including orchestration and adapters, measured from the same production bundler. No added global animation runtime.
- Optional viewer: requested by a clearly labelled **Explore in 3D** action; **≤250 KiB additional JS gzip** and **≤500 KiB GLB + texture transfer** for one complete scene, counted including decoders/loaders and duplicate imports. These are ceilings, not allocations to spend. No preload, speculative prefetch or hidden import of that path.
- Initial media budget remains ≤250 KiB added per route; zero video is required. A scene that needs several megabytes is redesigned, not silently exempted.
- Draw only on state/input changes; stop when hidden/offscreen; cap DPR initially at 1.5 for the prototype, tune through measurement. Dispose GPU resources and observers on close/unmount, handle context loss, and retain the complete HTML alternative.
- Lighthouse ≥95 median of three remains the **new cinematic release gate** for measured routes/profiles; lab values must not be represented as field values. Below-target historical evidence does not block offline design or corrective implementation. It does block calling a release clean. Define the measured current baseline before attributing a regression or improvement.
- Preserve CLS <0.05 and identify the LCP element. Field LCP/INP need real-user evidence; do not substitute localhost timings.
- Keep no-JS, reduced motion, Save-Data/reduced-data and forced-colors paths. Preserve the T-82 request-time static route architecture after verifying current code; never treat “rendered static” as proof that scene JS was not delivered. The standalone prototype is not a test of Next.js request rewriting.
- Do not deploy optional 3D in Save-Data/forced-colors paths. Reduced-motion gets static geometry and explicit controls, not scroll-driven camera movement. Below 768px there is no parallax or long pinning. The primary phone experience uses a stacked composition, not a shrunken desktop stage.
- No background continuous render loop, excessive bloom, motion blur, high-resolution environment map, live reflection, film grain, cursor effect or audio track is justified by this release.

### G. Density and comprehension contract

Remove the arbitrary 900-word minimum for this release. Do not manufacture filler or delete useful explanations merely to hit a total. Do not move sentences into badges to evade counting.

Design budgets: a hero H1 of no more than 12 words; hero supporting text around 20–35 words; seven-scene headline/supporting narrative target **≤350 words**; nonessential technical explanations behind real disclosure controls or deep links. Full-homepage word counts remain a diagnostic, not a lower-bound requirement. Any exception must improve a tested customer task, not serve a visual preference.

The first viewport must answer: what YCN offers, who it is for, one recognisable business use and what to do next. Scene headings communicate a business meaning without needing to interpret terms such as “conduit”, “datum”, “core” or “RLS”. Instrument numbers are allowed but remain a secondary visual language. Service choices must be reachable directly from the hero and header; no visitor needs to finish seven scenes before finding an offer.

Comprehension protocol (proposed acceptance test; not an existing result): recruit six non-technical business visitors, plus three startup/product visitors and three technical evaluators. Show the first viewport for five seconds, then ask open questions: “What does this company help you do?” and “What would you click next?” Target at least five of the six business visitors identifying websites/software and an appropriate next step without coaching. Then allow normal browsing; check that visitors can choose a fitting pathway, distinguish a concept from shipped work, and reach contact. Any repeated confusion triggers a copy/hierarchy fix before more motion polish. Report counts and observations, not population-level conversion predictions.

### H. Conversion, contact and privacy

The homepage and services page offer a direct, optional conversation, not an AI chatbot gate. A guided brief is editable and explicitly copied or inserted by the visitor. No personal data, form values, email, selected goals or free text may be silently persisted, sent to analytics or placed in shareable URLs. Theme/motion preferences are not marketing consent.

Contact remains a working protected system. UI copy may welcome uncertain visitors, but existing API, validation, error states, persistence, spam protection and acknowledgement behavior must not be replaced with a prototype form. Add “not sure” budget/timeline values only if supported by the existing schema; otherwise use reassuring text and an existing direct contact alternative. Touching the actual form reopens the recorded PERF-3 evaluation condition; create its coupled test/verification scope before changing behavior.

No fake countdown, project scarcity, invented discounts, implied ranking, “FAANG-level” claim, automated-personalization claim or guaranteed sales uplift.

### I. Multi-agent working agreement

The owner remains business-truth and release authority. Suggested assignment: **AGY implements**, **GPT owns the customer/story/design specification**, **Claude independently reviews evidence and regression risk**. These are recommended roles; this package does not claim those agents have already collaborated on its code.

One active implementation owner per change set. One exact scope and acceptance contract in the operative ledger task. Reviewers return pass / changes required with reason and observed evidence; they do not create competing roadmaps. Bundle related copy/layout edits into coherent customer-facing slices. Do not spend repeated rounds measuring imperceptible subpixel choices unless they affect an explicit engineering boundary or accessibility requirement.

Classify status separately: **specified → implemented locally → technically checked → visually reviewed → user-tested → committed → deployed → production-verified**. None implies the next. Fold prior-commit reconciliation into the next substantive task. Preserve historical evidence; do not reconstruct terminal output, pretend an image was inspected or fabricate measurements.

### J. Completion for this release

A meaningful improvement is a coherent, implemented path from first impression → recognised need → understandable demonstration → honest proof → contact. Stop after the release criteria pass; do not keep redesigning toward unrelated reference sites. A polished prototype is not the finished production site, and business effectiveness remains an empirically tested outcome.

---

## 3.10 Owner decision record — 2026-09-14 — Skip-the-story hero control withdrawn

Owner ruling: the separate "Skip the story" hero control is withdrawn, because "Explore what we build" already provides the approved bypass to #solutions. This supersedes the former #mode-b-proof requirement and removes duplicate controls targeting one destination. Narrow, reversible, changes no other navigation policy. R-01 shipped a "Skip the story ↓" control in Scene1Promise.tsx; removing it is implementation work for R-05 and is recorded here as a known documentation-ahead-of-code divergence.

---

## 3.11 Owner decision record — 2026-09-14 — Full Customer-First Homepage Rebuild Authorised

**Objective:** A non-technical business owner must immediately understand what YCN Labs sells, see how it applies to a business like theirs, trust the studio, and know what to do next. Customer comprehension outranks preservation of the current visual system.

**SUPERSEDED FOR THE PRESENTATION LAYER ONLY:**
- **§7 "Preserve the seven historical scene anchors":** Superseded for visual scene layout. Historical anchors are preserved as ANCHOR IDs mapped onto the new sections, not as seven distinct legacy scenes.
- **§8 Seven-row scene/headline table:** Scene copy is reopened for the new structure. The locked H1 (`Websites and software. Built around your business.`) and supporting sentence (`Help customers find you, make it easier to enquire or book, and connect the work behind the scenes.`) are NOT reopened.
- **§8.2 Scene 3 / Scene 6 dramatic rule:** Superseded. The failure/success mirror is compressed into Section 3 (the same frame shown once with the order never arriving, once with it arriving and accepted), satisfying the intent of §8.2 without requiring two full-width fields.
- **§9 Four mobile chapters mapped to scenes 1 / 2+3 / 4+5 / 6+7:** Remapped over the 6 new sections:
  - Mobile Chapter 1: Section 1 (Instant Understanding & Dual-Surface Hero)
  - Mobile Chapter 2: Section 2 (See Your Business Here / Breadth Showcase)
  - Mobile Chapter 3: Section 3 (How It Connects / Compressed Failure & Success Mirror)
  - Mobile Chapter 4: Section 4 + Section 5 + Section 6 (What We Build + How We Work + Closing)
- **§3.1 E-11 / D17 & §15.1 "Desktop/mobile scenes | 7 / 4":** Superseded to reflect the 6-section structure collapsing to 4 mobile narrative chapters.
- **D20 Locked anchor IDs:** RETAINED as IDs; their section assignments change to the new map.
- **Spec §5.0–§5.7, §2.3, §3.1.1 paired pressure fields, §15.1(4) mirror exception:** Superseded and rewritten in implementation for the 6-section structure.

**NOT SUPERSEDED, STILL BINDING:**
- Every truth rule (no invented clients, metrics, performance scores, uptime, or guarantees; sample concepts clearly labelled).
- Every protected system (contact form, `/api/contact`, validation schemas, persistence, email, rate limiting, deployment settings, production infrastructure).
- Locked H1 and locked supporting sentence; primary action `Tell us what you need` $\rightarrow$ `/contact`; secondary action `Explore what we build` $\rightarrow$ `#solutions` (the approved story bypass).
- Four canonical service pathways (Websites & digital experiences, Web applications & workflows, Business systems & integrations, Product discovery & SaaS planning).
- Four fallback paths (no-JS, reduced-motion, Save-Data, forced-colors).
- Mobile ~390px first-class responsive design, touch targets, and accessibility requirements (WCAG 2.2 AA conformance evaluated against SC 2.5.8; 44×44 CSS px internal usability target where practicable).
- Zero new runtime dependencies (semantic HTML/CSS/SVG + existing Framer Motion; Three.js/GLB remains a gated future experiment only).
- Performance budgets (total bundle size, Lighthouse $\ge$ 95).
- §3.9 G comprehension protocol (6 business visitors, 3 product evaluators, 3 technical evaluators recruited in parallel).
- Locked Octaboot craft-only reference boundary (discipline, finish, restraint; NOT a template).
- Group D quarantine (strictly isolated outside index).
- No git push without explicit owner approval.

**NEW SECTION & ANCHOR MAP (Six Sections):**
1. **S1 Instant Understanding (`#promise`):** Locked H1, locked supporting sentence, primary CTA `/contact`, secondary CTA `#solutions`, reassurance microcopy. Premium dual-surface demonstration: customer phone on one side, business screen on the other, recognisable everyday UI (restaurant sample order `₹480 · 3 items`). Staging depth only.
2. **S2 See Your Business Here (`#quality-budgets`):** Premium visual showcase of recognisable business contexts (restaurant, salon/appointment, wholesale/retail, professional services, startup/digital product). Real-looking device compositions; one strong visual idea.
3. **S3 How It Connects (`#the-pressure` & `#the-foundation`):** One running transaction with the business object (`Order #104 · ₹480 · 3 items`) as the visual subject. Contains compressed failure/success mirror: `#the-pressure` on the unreached failure state, `#the-foundation` on the connected/accepted state.
4. **S4 What We Build (`#services` & `#solutions`):** Four major visually distinct pathways with outcome language, recognisable interface previews, and real links (`/services/web`, `/services/web-apps`, `/services/software`, `/services/saas`).
5. **S5 How We Work (`#how-we-build`):** Understand $\rightarrow$ Design $\rightarrow$ Build $\rightarrow$ Test $\rightarrow$ Launch/support as scoped. Craft and process evidence without jargon walls; links to `/engineering`.
6. **S6 Closing (`#proof`):** "You don’t need a technical brief. Tell us what needs to work better." Primary action `Start a conversation` $\rightarrow$ `/contact`.
7. **`#mode-b-proof` container:** Retained on the page container after S6.

---

# 4. STOP CONDITIONS

AGY must stop immediately if:

1. Phase 0 has not been reviewed and it is about to edit code.
2. F12 is open and it is about to add animation.
3. An image-dependent scene has no approved asset or fallback.
4. It is about to invent a claim, metric, client, screenshot, outcome, team, facility, or testimonial.
5. It is about to publish an asset without rights and redaction review.
6. It is about to touch a protected backend/system file.
7. It is about to add a dependency without owner approval.
8. It is about to create a new route not authorised here.
9. It cannot state the user and business purpose of a motion.
10. It cannot provide no-JS, reduced-motion, Save-Data, and forced-colors paths.
11. A measured Lighthouse category drops below 95 on a measured route.
12. It is about to state a number it did not measure.
13. A task conflicts materially with current code.
14. The working tree contains unrelated changes that could be overwritten.
15. It is uncertain whether a command is destructive.

A blocked report is better than fabricated completion.

---

# 5. SCOPE AND PROTECTED SYSTEMS

## 5.1 Allowed UI scope

UI work may touch, when authorised:

```text
apps/web/app/** presentation files
apps/web/components/**
apps/web/content/**
apps/web/app/globals.css
apps/web/public/media/**
UI-specific utilities
```

## 5.2 Protected files and systems

Do not touch during UI/cinematic work:

```text
apps/web/app/api/**
lib/db/**
lib/security/**
lib/validation/**
lib/env/**
lib/monitoring/**
database schemas
migrations
email behaviour
rate limiting
lead persistence
analytics event contracts
deployment settings
production environment variables
```

Test files are changed only in a separate approved test task.

Never run:

```bash
npx shadcn init
git add .
git push
```

Do not stage, discard, regenerate, or commit:

```text
apps/web/screenshots/**
```

unless a separate visual-baseline task is approved.

---

# 6. FINAL CREATIVE CONCEPT

# UNBROKEN — The Digital Business Core

## 6.1 One-sentence idea

> Every business depends on a customer finding it, understanding it, and getting through. YCN Labs engineers that connection so it holds.

## 6.2 The persistent object

A single server-rendered SVG Signal Line connects:

```text
Customer → Digital Business Core → Business
```

The line:

- begins incomplete,
- breaks under pressure,
- is deliberately rebuilt,
- passes through four layers,
- survives the same pressure,
- carries a final signal end to end.

The line doubles as:

- narrative spine,
- progress indicator,
- system diagram,
- proof metaphor.

## 6.3 Four layers

| Layer | Business language | Engineering detail | Service mapping |
|---|---|---|---|
| Customer experience | Help customers find, understand, and act | responsive UI, accessibility, performance | Web, Mobile, UI/UX |
| Operations | Move information and work reliably | validation, persistence, notification, workflow | Web apps, Enterprise |
| Intelligence | Save time and improve decisions | structured input, guardrails, human review | AI |
| Resilience | Keep the system dependable | testing, security, monitoring, handover | All services |

Business language is visible by default. Technical detail is progressive disclosure. Intelligence is optional, not a mandatory billable layer; apply the current capability gate in §3.9 D.

## 6.4 What this concept is not

Do not build:

- a digital factory,
- a fake office,
- a futuristic facility,
- a glowing reactor,
- robotic arms,
- a JARVIS-style control room,
- a decorative cube,
- a random 3D object,
- a fake dashboard,
- an autoplay video,
- a fake boot loader,
- scroll-jacked camera navigation,
- a WebGL-dependent launch experience.

## 6.5 Octaboot lesson

Adopt:

- strong point of view,
- short copy,
- one idea per screen,
- one memorable interaction,
- clear qualification,
- simple conversion.

Reject:

- copying its cube,
- copying its words or choreography,
- decorative interaction without purpose,
- stock imagery as proof,
- emotion without engineering evidence.

---

# 7. AUDIENCE AND FIVE-SECOND CONTRACT — REDESIGN REVISION

Priority audiences remain: non-technical business owners; startup/product leaders; technical evaluators. The first viewport serves the least technical appropriate buyer. Deeper evidence serves the technical evaluator. Local businesses are explicitly included without turning the brand into a discount website agency.

Required first impression:

```text
YOUR BUSINESS. BETTER CONNECTED.
Websites and software. Built around your business.
Help customers find you, make it easier to enquire or book, and connect the work behind the scenes.
Tell us what you need
Explore what we build
You don’t need a technical brief to start.
```

The primary CTA targets `/contact` in production; the second targets `#solutions` or the approved services hub (serving as the approved story bypass; the separate `Skip the story` control is withdrawn per §3.10). The former headline, **Software, engineered to hold up.**, is retained as a secondary philosophy line—not discarded and not competing with a second H1.

A new `#solutions` in-page anchor is approved; this is not a new route. Preserve the seven historical scene anchors. Normal navigation uses understandable labels and the existing route paths; “What we build” may label `/services`, and “How we work” may label `/process`. No duplicate `/what-we-build` or `/how-we-work` route.

The hero demonstrates one sample enquiry with literal customer and business screens. It must be labelled “Interactive concept · sample data, not client work”. In the prototype no data is sent. In production a sample action also must never reach the real contact API. Real lead conversion stays separate.

On narrow/short screens prioritise the offer and contact over displaying the full illustration above the fold. The illustration may follow immediately below. Keep a bypass near the opening copy. No logo-only viewport, no intro film and no essential text hidden until interaction.

---

# 8. HOMEPAGE SCENES — RETAINED ANCHORS, CUSTOMER-FIRST COPY

The seven anchors, cause/effect sequence and Scene 3/6 dramatic contract remain. These new headline/supporting defaults supersede the previous exact-string locks for this redesign only. Existing component filenames may remain; filenames are not visitor-facing copy.

| Scene / anchor | Headline | Supporting meaning |
|---|---|---|
| Gap / `#promise` | Websites and software. Built around your business. | Help customers find you, make it easier to enquire or book, and connect the work behind the scenes. |
| Conditions / `#quality-budgets` | Your customers shouldn’t have to work this hard. | A useful digital experience gets out of the way. It helps people understand your business and finish what they came to do. |
| Pressure / `#the-pressure` | A click means little if nothing happens next. | Slow pages, confusing forms and lost requests interrupt the journey between your customer and your business. |
| Route / `#the-foundation` | First, understand the business. Then, connect the dots. | Start with what your customer wants to do and what your business needs to happen next—not a list of technologies. |
| Layers / `#services` | One smooth experience. Not a collection of disconnected tools. | Your website is the front door. The work underneath connects customer actions to the people, information and processes behind them. |
| Held / `#how-we-build` | Their action reaches you. Your business moves it forward. | The same customer journey, designed with clear actions, confirmation, appropriate access and a defined next step. |
| Arrival / `#proof` | From “I’m interested” to “let’s talk.” | That’s the kind of connection your website should make. |

## 8.1 Supporting-copy and demonstration discipline

The table above is the exact default narrative string set. A reviewed content module should source it once, including the reduced-data path. Add exact-string/protected-anchor tests only in the approved test scope. A line break may change visual wrapping but not remove a space between words.

The customer action is the connective subject. “The Gap / Conditions / Pressure / The Route / The Layers / Held / Arrival” remain internal scene names and may be secondary labels. They must not displace the plain business headline.

The first demo uses fictional, minimal sample data. It is not a customer testimonial, a live order, a tested delivery architecture or a real client result. Distinguish **simulated desired behavior** from measured evidence. Numbers asserting delivered software quality require the existing target/budget/measurement labels and provenance; scene ordinals are not fabricated performance metrics.

Preserve all four pressure themes: slow access, inaccessible interaction, lost/invalid request and incorrect account boundary. Source the same joint definitions for S3 and S6. Do not imply that a drawn padlock or animated check is a security audit.

The layers retain Customer Experience / Operations / Intelligence / Resilience internally. The visible business titles are: “What your customers use”; “What your business does next”; “Less repetitive work”; “What keeps it dependable”. Intelligence is explicitly optional and feasibility-gated. Three-dimensional modelling must not imply every website requires AI or enterprise complexity.

## 8.2 Dramatic rule

Scene 3 and Scene 6 are the same test with a different result.

Do not:

- merge them,
- remove either,
- weaken the early failure,
- add a second cinematic peak.

Scene 7 is the only peak. After it, motion settles and proof begins.

## 8.3 Outcome selector

Scene 1 asks:

> What should digital do for your business?

Options:

- Help customers find us
- Turn visitors into enquiries
- Let customers buy or book online
- Replace repetitive manual work
- Build a customer portal
- Launch a software product
- Add useful AI
- Modernise an existing system

Rules:

- selection is optional,
- stored in client state only,
- changes emphasis, not routes,
- no silent tracking,
- page works fully without selection.

## 8.4 Brief builder

Explicit `+ Add to brief` controls may build:

```text
Your digital direction
- goal
- customer experience
- operations
- optional capability
```

Rules:

- explicit additions only,
- each item editable/removable,
- no inferred private profiling,
- no silent persistence,
- existing direct form always available,
- existing API remains unchanged.

## 8.5 Mode B — proof

After Scene 7, normal scroll continues with:

- real work,
- screenshots,
- honest labels,
- architecture,
- engineering evidence,
- studio operating model,
- process and handover,
- service pathways,
- FAQ,
- guided brief,
- direct contact/booking.

---

# 9. MOBILE CONTRACT

Below 768px, use four chapters:

| Mobile chapter | Contains |
|---|---|
| 1 | Scene 1 |
| 2 | Scenes 2 and 3 |
| 3 | Scenes 4 and 5 |
| 4 | Scenes 6 and 7 |

Rules:

- all text is retained,
- semantic chapter landmarks and one logical heading tree; retain the T-36A owner-accepted heading-level exception unless separately reviewed,
- scene headings remain a consistent level in the shared SSR document; no duplicate responsive heading elements,
- no long pinned viewport,
- no parallax below 768px,
- native vertical reading,
- no forced scroll distance,
- contact reachable in one action,
- static states under reduced motion.

---

# 10. ROUTE EXPERIENCE STRATEGY

## 10.1 Homepage

Full UNBROKEN narrative and proof mode.

## 10.2 Services hub

Lead with:

> What are you trying to change?

Map business outcomes to existing service routes.

## 10.3 Individual services

One meaningful visual demonstration per route:

| Route | Demonstration |
|---|---|
| Web | discovery → responsive experience → enquiry |
| Web apps | user → interface → workflow → data |
| SaaS | account → workspace → core action → reporting/subscription |
| AI | input → validation → model → guardrails → review → output |
| Mobile | interface → API → sync → notification → offline/online |
| Software/enterprise | roles → workflow → integrations → auditability |

No second full cinematic sequence.

## 10.4 Work

Each project includes:

- honest classification,
- problem,
- constraints,
- key screens,
- architecture,
- decisions,
- verification,
- measured outcome only when proven,
- CTA.

## 10.5 Process

Use the Signal Line as:

```text
Understand → Define → Design → Engineer → Verify → Launch → Support
```

No long mobile pinning.

## 10.6 Engineering

This is the technical proof centre:

- tests,
- accessibility,
- performance,
- security,
- monitoring,
- ownership,
- handover,
- real artefacts.

## 10.7 About

Show:

- studio accountability,
- client relationship,
- delivery system,
- specialists only when truthful,
- ownership and handover.

Do not imply a large office or team.

## 10.8 Contact

Preserve the reliable direct form.

The guided brief may sit above it, but never replace or block it.

## 10.9 Blog/legal

Remain calm, readable, and mostly text-led.

---

# 11. VISUAL AND DESIGN SYSTEM

## 11.1 Locked primitives

```css
--brand-ink: #0a0c10;
--brand-primary: #1e5bff;
--brand-secondary: #0e7c7b;
--brand-accent: #22d3ee;

--status-success: #15803d;
--status-warning: #b45309;
--status-danger: #b91c1c;
```

Do not change these during this programme.

## 11.2 Rules

- No violet/purple
- Amber is warning/status only
- Cyan is data/signal only
- Glass only on navigation, small metric cards, and one compact hero panel
- Exactly three card families
- Exactly three button families
- One diagram language
- Three elevation levels
- Use spacing/container tokens
- No arbitrary visual language per route

## 11.3 Visual personality

The site should feel like:

> A precision instrument for business transformation.

Use:

- hairline borders,
- controlled depth,
- large calm spaces,
- real interfaces,
- precise annotations,
- Geist Mono for technical evidence,
- restrained CSS perspective.

Avoid:

- cyberpunk,
- Web3 gradients,
- floating glow,
- decorative particles,
- glass everywhere,
- fake terminal typing,
- manufactured exclusivity,
- stock-office imagery.

---

# 12. MOTION GOVERNANCE

For this redesign, §3.9 E–F explicitly amends dependency eligibility and opt-in viewer budgets. The remaining rules below still apply.

## 12.1 Approved classes

Every motion is classified as:

- **DEMONSTRATES**
- **NAVIGATES**
- **CONFIRMS**

Atmosphere requires a separate owner-approved exception.

## 12.2 Hard motion rules

- Content is visible before hydration.
- Critical text never starts at `opacity: 0`.
- LCP content sits outside animation wrappers.
- Native scroll only.
- No scroll-jacking.
- State derives from scroll position.
- Reverse scrolling reverses state.
- One rAF loop maximum.
- No React state update on every scroll event.
- No synchronous layout reads inside scroll handlers.
- Kill switch per scene.
- Teardown all listeners/timelines on unmount.

Allowed properties:

```text
transform
opacity, except hiding LCP/critical content
stroke-dashoffset, after measurement
```

Avoid:

```text
width
height
top
left
margin
large blur
large animated box-shadow
```

## 12.3 Motion approval questions

Before implementing any animation, record:

1. What information or state does it communicate?
2. Which class is it: demonstrates, navigates, or confirms?
3. What user action or scroll range controls it?
4. What is the static state?
5. What is the no-JS state?
6. What is the reduced-motion state?
7. What is the Save-Data state?
8. What is the forced-colors state?
9. What happens on mobile?
10. What is its expected JS/media cost?
11. What is the measured impact?
12. How is it destroyed on unmount?
13. How is it disabled/reverted independently?

Unanswered question means no implementation.

## 12.4 Technology responsibilities

### CSS

- hover/focus,
- perspective,
- small transforms,
- responsive depth,
- static reduced-motion presentation.

### Inline SVG

- Signal Line,
- Core,
- process routes,
- pressure states,
- quality markers.

### Existing Framer Motion

- state-driven component transitions,
- accordions,
- cards,
- menus,
- form feedback.

### GSAP/ScrollTrigger

Proposal first. Install later only after approval.

Use only for:

- homepage scene timing,
- reversible Signal Line choreography,
- Core state transitions,
- one controlled pin when justified.

### Three.js/WebGL

Deferred.

A later experiment may enhance one state only if the SVG/CSS version already passes and remains the fallback.

---

# 13. ASSET POLICY AND REGISTER

## 13.1 Minimum useful launch set

- 4–6 real product/interface screenshots
- 1 founder photograph
- 1 workspace/process photograph
- 1 real Lighthouse/performance artefact
- 1 real CI/test artefact
- 1 real PR, handover, or architecture artefact
- 2–3 coded SVG diagrams

## 13.2 Asset register template

| ID | Asset | Source | Route/scene | Rights owner | Real data? | Redaction | EXIF removed | Second reviewer | Theme handling | Verdict | Target weight |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A-01 | | | | | | | | | | | |

## 13.3 Rules

- Prefer seeded demo data.
- Remove names, email addresses, phones, addresses, IDs, tokens, internal hosts, staging URLs, and third-party data.
- Strip EXIF/GPS.
- Two-person review for systems holding real data.
- Confirm publication rights.
- No AI-generated founder.
- No fake dashboard presented as work.
- Missing proof results in a simpler honest design.

## 13.4 Asset technical limits

- `next/image`
- explicit width/height
- responsive `sizes`
- lazy load below fold
- one priority image per route, only for declared LCP
- meaningful alt text
- no important text baked only into raster images
- same-origin self-hosting by default

---

# 14. TECHNICAL STRUCTURE

Create only when the static phase begins and only as needed.

```text
apps/web/
├── components/
│   └── experience/
│       ├── SceneShell.tsx
│       ├── SignalLine.tsx
│       ├── DigitalCore.tsx
│       ├── GoalSelector.tsx
│       ├── BriefBuilder.tsx
│       ├── ExperienceNavigator.tsx
│       ├── StaticExperience.tsx
│       ├── scenes/
│       └── motion/
│           ├── motion-tokens.ts
│           ├── timelines.ts
│           └── feature-flags.ts
├── content/
│   └── experience.ts
└── public/
    └── media/
        ├── work/
        ├── process/
        ├── founder/
        └── evidence/
```

Do not abstract before a real need exists.

---

# 15. PERFORMANCE AND ACCESSIBILITY CONTRACT

§3.9 F governs the explicitly separated optional-viewer budget for this release. Do not combine opt-in cost with first-load cost or conceal either.

## 15.1 Budgets

| Constraint | Limit |
|---|---|
| Lighthouse categories | ≥95 median of 3 on each measured route |
| Lab LCP | report value and element identity; no regression accepted |
| Field LCP | target <1.5s after sufficient production field data exists |
| CLS | <0.05 |
| Added global animation JS | 0 KB |
| Added route-level scene JS | ≤45 KB gzipped |
| Inline SVG | ≤15 KB each |
| Added image weight per route | ≤250 KB |
| Work cover | ≤120 KB |
| Blog/OG image | ≤80 KB |
| Desktop/mobile scenes | 7 / 4 |
| rAF loops | 1 per page |
| Parallax layers | maximum 2 per section |
| Atmosphere elements | maximum 1 per route after approval |

Lighthouse is lab evidence and does not prove field LCP or field INP.

Every performance, accessibility, contrast, and bundle claim is a hypothesis until measured and recorded.

## 15.2 Four mandatory fallback paths

| Path | Requirement |
|---|---|
| No JavaScript | complete text, headings, CTAs, nav, images, static diagram, contact path |
| Reduced motion | no GSAP; static vertical sequence; interaction feedback retained |
| Save-Data/reduced-data | no scene JS; smallest media; all content retained |
| Forced colors | line/diagrams understandable through strokes/shapes; verify before PASS |

## 15.3 Accessibility

Verify:

- semantic landmarks,
- one `<h1>`,
- logical heading order,
- hash navigation moves focus,
- visible focus,
- keyboard access,
- touch targets,
- accessible forms/errors,
- live announcements,
- 320px reflow,
- 200% and 400% zoom,
- screen-reader reading order,
- no information available only through motion/color.

---

# 16. PHASES AND AUTHORISATION

Historical programme phases below remain reference contracts. For the 2026-09-12 redesign, the R-series task in PROJECT_STATE is operative under §3.9; completed T-80–T-83 work is not restarted. No old “authorised now” example supersedes the current pointer.

Only the current authorised phase may run.

## PHASE 0 — Establish truth

**Historical Phase-0 instruction. Current task permission comes from PROJECT_STATE.**

No tracked source may be edited, formatted, staged, committed, discarded, regenerated, or overwritten.

`pnpm install --frozen-lockfile` may populate ignored dependencies. Stop if any tracked file changes.

The audit report must go to `/tmp`.

```bash
git branch -a
git log --oneline -5
git status --short --branch
git diff --name-only
git diff --cached --name-only

grep -n "color-scheme" apps/web/app/globals.css
grep -n -- "--color-card\|--color-background\|--color-muted-foreground" apps/web/app/globals.css
grep -n "semantic-surface-raised\|semantic-surface:" apps/web/app/globals.css
grep -n -- "--text-body\|--transition-duration-normal" apps/web/app/globals.css

sed -n '1,80p' apps/web/lib/motion.tsx
sed -n '145,165p' apps/web/app/process/page.tsx

pnpm install --frozen-lockfile
git status --short --branch
git diff --name-only

pnpm lint; echo "lint=$?"
pnpm check-types; echo "types=$?"
pnpm run test; echo "test=$?"
pnpm build; echo "build=$?"

AUDIT_SCRIPT=""
if [ -f "ycn-site-condition-audit.sh" ]; then
  AUDIT_SCRIPT="ycn-site-condition-audit.sh"
elif [ -f "tools/ycn-site-condition-audit.sh" ]; then
  AUDIT_SCRIPT="tools/ycn-site-condition-audit.sh"
else
  echo "audit-script=NOT_FOUND"
fi

if [ -n "$AUDIT_SCRIPT" ]; then
  sed 's|^OUT="CURRENT_SITE_CONDITION.md"$|OUT="/tmp/CURRENT_SITE_CONDITION.md"|' "$AUDIT_SCRIPT" | bash
  echo "audit-report=/tmp/CURRENT_SITE_CONDITION.md"
fi

git status --short --branch
git diff --name-only
```

### Phase 0 report

Report:

- branch and commit,
- full working tree,
- intentional untracked files,
- tracked state before/after install and audit,
- current route count,
- current dependency versions,
- which Stage 1 items exist,
- which remain open,
- F12 state,
- relevant token values,
- all four command exit codes,
- audit path,
- code/instruction conflicts,
- unverified items.

Stop after reporting.

## PHASE 1 — Close foundation

Runs only after owner accepts Phase 0 and names one task.

One task per change set. Show diff and evidence before commit.

### Candidate tasks — verify before executing

| Task | Expected location | Documented correction |
|---|---|---|
| Elevation ramp | `globals.css` light root | surface `#f1f5f9`; raised `#f8fafc`; verify contrast |
| Process CTA | `/process` page | `bg-brand-ink` → semantic inverse surface |
| Dark danger contrast | dark semantic danger | adjust until measured ≥4.5:1 on relevant surface |
| Hero icon contrast | Hero Terminal icon | remove weakening opacity if still present; verify ≥3:1 |
| F12 | motion utility | content visible before hydration; transform-only enhancement |
| Dead UI capability | badge/icon/motion/CSS/config | remove violet, unused CountUp/glows, dead config after verifying |
| F11 | deployment | establish Analytics script status |
| Clean baseline | runtime | eight routes, median of 3, LCP identity, top-5 assets |

After each task:

```bash
pnpm lint
pnpm check-types
pnpm run test
pnpm build
```

Commit only after owner approves evidence.

## PHASE 2 — Formal asset inventory

Runs in parallel after Phase 0 review.

AGY organises approved assets but cannot create genuine evidence.

## PHASE 3 — Static UNBROKEN build

Entry gate:

- Phase 1 clean,
- F11 status and clean baseline recorded,
- route dispositions confirmed,
- scene copy/storyboard approved,
- each scene has approved asset/diagram/fallback.

Build seven scenes with zero motion and zero new dependencies.

Requirements:

- server-rendered content,
- fixed anchor IDs,
- one `<h1>`,
- one `<h2>` per scene/chapter,
- static inline SVG,
- no-JS complete,
- mobile four-chapter layout,
- declared LCP,
- OG image from the same source,
- outcome selector skippable.

The static experience must be launchable.

## PHASE 4 — Light motion

CSS and existing Framer Motion only.

- central motion tokens,
- transform-based enhancement,
- card/form/accordion feedback,
- measured SVG draw,
- reduced-motion path,
- motion inventory,
- no GSAP,
- no new dependency.

Measure after implementation.

## PHASE 5 — Cinematic proposal

Before installation, AGY proposes **one scene**:

- trigger/end,
- user/business purpose,
- native scroll,
- reverse behaviour,
- mobile path,
- no-JS path,
- reduced-motion path,
- Save-Data path,
- forced-colors path,
- kill switch,
- teardown,
- expected cost,
- measurement plan.

No GSAP installation or scene code until owner approval.

## PHASE 6 — Cinematic implementation

Prerequisites:

- F12 closed,
- Phase 3 launchable,
- Phase 4 measured clean,
- real assets reviewed,
- bundle analysis available,
- E-1/E-9/E-10/E-11 policy accepted by use of this file,
- one scene proposal approved.

Implement one scene per change set behind a kill switch.

Measure with and without the scene.

If a measured category drops below 95, disable/revert the scene and retain the static version.

## PHASE 7 — Deep routes

One signature visual per deep route. No second cinematic sequence.

## PHASE 8 — Final QA and release

Run:

- lint,
- typecheck,
- unit tests,
- production build,
- E2E,
- automated accessibility,
- keyboard,
- screen reader,
- required viewports,
- landscape,
- 200/400% zoom,
- no-JS,
- reduced motion,
- Save-Data,
- forced colors,
- Lighthouse medians,
- contact,
- booking,
- analytics,
- monitoring,
- headers,
- SEO,
- social preview,
- rollback rehearsal.

## PHASE 9 — Optional post-launch experiments

Only after production evidence:

- isolated WebGL/R3F experiment,
- Gallery with 12 real stories,
- additional atmosphere motion.

The base experience remains the fallback.

---

# 17. EVIDENCE TEMPLATE

```text
PHASE:
TASK:
BRANCH:
COMMIT BEFORE:

CURRENT VERIFIED STATE:

FILES INTENDED:
- path

ROOT CAUSE:

CHANGE:

FILES CHANGED:
- path : reason

COMMANDS:
pnpm lint         exit:
pnpm check-types  exit:
pnpm run test     exit:
pnpm build        exit:

MEASUREMENTS:
route | perf | a11y | bp | seo | lab LCP | LCP element | CLS

CONTRAST:
element | foreground | background | ratio | pass/fail

FALLBACKS:
no-JS:
reduced-motion:
Save-Data:
forced-colors:

WORKING TREE AFTER:

COULD NOT VERIFY:

CONFLICT WITH THIS FILE:

REVERT:

OWNER APPROVAL TO COMMIT:
```

---

# 18. AGY EXECUTION PROTOCOL

Before editing:

1. Read this file completely.
2. State the authorised phase/task.
3. Verify current code.
4. State root cause.
5. List exact files.
6. State smallest correction.
7. State acceptance criteria.
8. State risks/fallbacks.
9. Stop if ambiguous.

After editing:

1. Show the diff.
2. Run required checks.
3. Report raw exit codes.
4. Report measurements.
5. Report unverified items.
6. Wait for owner approval.
7. Commit only after approval.
8. Never push.

Execution safeguards:

- AGY must not use `git checkout`, `git restore`, `git stash` or `git reset` to discard tracked-file state without explicit owner authorisation.
- Every file deletion must be listed explicitly in the pre-commit task report.

---

# 19. PHASE PROMPTS

## P0 — first session only

```text
Read AGENTS.md completely.

Execute Phase 0 only.

Do not edit, format, stage, commit, push, discard, regenerate screenshots,
overwrite repository reports, or fix anything.

Run every Phase 0 command and report:
- branch and commit
- complete working tree
- intentional untracked files
- tracked state before/after install and audit
- route/dependency truth
- Stage 1 items landed/open
- F12 state
- token values
- lint/type/test/build exit codes
- audit script/report path
- conflicts
- unverified items

Stop after the report.
```

## P1 — one foundation task

```text
Execute only the single Phase 1 task named by the owner.
Change nothing else.
Show the diff and evidence.
Run lint, typecheck, unit tests, and build.
Do not commit until owner approval.
```

## P3 — static experience

```text
Build the approved seven-scene static UNBROKEN experience.
Zero motion. Zero new dependencies.
Use fixed anchors, semantic HTML, server-rendered copy, static SVG,
four mobile chapters, no-JS completeness, and working contact access.
Use only approved real media or labelled diagram/text fallbacks.
```

## P4 — light motion

```text
Enhance the approved static experience with CSS and existing Framer Motion only.
Classify every motion.
Keep critical content visible before hydration.
Provide and verify all four fallback paths.
Measure the route impact.
```

## P5 — proposal only

```text
Do not install GSAP and do not write scene code.
Propose one scene using the thirteen-question contract.
Include cost, fallbacks, kill switch, teardown, and measurement plan.
Wait for owner approval.
```

## P6 — one approved scene

```text
Implement only the approved scene behind its kill switch.
Do not change another scene.
Measure with and without the scene.
Show evidence and wait before committing.
```

---

# 20. DEFINITION OF DONE

The programme is complete only when:

- the offer is understood in five seconds,
- the client is the hero,
- the Signal Line communicates one coherent story,
- business owners understand outcomes,
- technical buyers can inspect depth,
- real evidence supports claims,
- one cinematic peak is memorable,
- the rest remains calm,
- contact is always available,
- mobile is intentionally designed,
- no-JS is complete,
- reduced motion is complete,
- Save-Data is complete,
- forced colors is verified,
- no fabricated proof exists,
- all protected systems remain unchanged,
- required checks pass,
- performance does not regress,
- rollback is proven,
- each phase is independently reversible.

---

# 21. ACTIVE-FILE HYGIENE

## Keep as active governance/specification sources

```text
AGENTS.md
PROJECT_STATE.md
docs/brand/YCN_LABS_BRAND_TECHNICAL_RECORD_v1.2_FINAL.md
docs/design/YCN_LABS_VISUAL_MOTION_EXPERIENCE_SPEC_v1.0.md
```

Optional non-document tool:

```text
tools/ycn-site-condition-audit.sh
```

## Keep outside the repository

```text
../assets-raw/
../ycn-evidence/
../ycn-brand-masters/
../ycn-archive-2026-08/
```

Do not create active duplicates, alternate masters, handover documents, or
parallel planning files. Historical material stays outside the active authority
set and AGY must not be pointed to it unless the owner explicitly restores it.

---

# 22. EXECUTION POINTER RULE

This file no longer carries a mutable task queue.

For every new session:

1. Read `AGENTS.md` completely.
2. Read `PROJECT_STATE.md` completely.
3. Read `docs/design/YCN_LABS_VISUAL_MOTION_EXPERIENCE_SPEC_v1.0.md` when the named task affects presentation, layout, scenes, responsive behaviour, or motion.
4. Use `PROJECT_STATE.md` CURRENT POSITION / NEXT ACTIONS as the only operative task pointer.
5. Execute only the single task named by the owner.
6. Do not infer current work from older phase examples, historical log entries, or archived documents.

`AGENTS.md` and the visual/motion specification are frozen under §3.8 except for a later explicit owner-authorised exception.
