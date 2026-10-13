# YCN Labs — Master Website Plan

**Revision:** 1.2  
**Status:** Canonical development baseline. Repository implementation remains to be audited.

## 1. North star

YCN Labs should make a visitor think:

> **I understand what they can do for my business, I can see how they think, I trust the way they build, and I know how to start.**

The primary audience includes Tier 2/Tier 3 Indian business owners who may have little technical knowledge. Technical knowledge must never be required to understand the company.

The website itself should demonstrate YCN’s promise: **simple on the surface, serious underneath.**

## 2. Company positioning

YCN Labs is a broad technology company that can grow across websites, applications, SaaS, business systems, automation, digital services, security and education. The website must not reduce YCN to a cheap website agency, freelancer or generic “AI agency.”

Current website communication should focus on what YCN can responsibly discuss and deliver now. Future capabilities must not be advertised as active services without delivery evidence.

## 3. Locked asset

The supplied YCN Labs logo artwork is final and must not be redrawn, re-proportioned or reinterpreted. Its supporting caption may remain in the lockup, but website copy—not the caption—explains the broader company.

## 4. Communication hierarchy

Always reveal information in this order:

1. **Business value** — what can improve for the visitor.
2. **Visual example** — show the journey.
3. **Capability** — what YCN can build.
4. **Process** — what working with YCN feels like.
5. **Engineering depth** — performance, accessibility, security, reliability, testing, architecture.
6. **Honest proof** — only verified work/claims.
7. **Action** — a simple way to start.

Business language first; technical language deeper.

## 5. Homepage experience

*(STATUS: HISTORICAL / SUPERSEDED on 2026-09-21. The former seven-beat narrative, mobile-shop, and "Between" counter visual story are retired. Active homepage architecture and motion are governed by `docs/vnext/00_START_HERE.md`, `docs/vnext/04_HOMEPAGE_EXPERIENCE_MASTER.md`, and `docs/vnext/05_MOTION_AND_TRANSITION_SYSTEM.md`.)*

### Historical Narrative Baseline (Preserved for Context)

The original seven-beat conceptual logic (Gap → Make it easy → Pressure → Route → Layers → Held → Arrival) informed early explorations. Under the vNext product-led direction, the product being created is the conceptual protagonist across distinct visual chapters (Hero phone cluster → laptop portal → connected flow → proof → process), ending the single sticky-device gimmick.

## 6. Core pages

- **Home** — explanation, story, four problem paths, selected verified work, process, CTA.
- **What We Build** — problem-first services, not technology-first catalogue.
- **Work** — Client Work / Internal Product / Concept Build with unmistakable classification and evidence status.
- **How We Work** — Talk → Understand → Plan → Design → Build → Test → Launch → Improve.
- **Engineering** — technical depth for those who want it.
- **About** — honest purpose and approach; no invented company history/team.
- **Start a Project** — problem-first guided enquiry with a simple standard-form fallback.

## 7. Visual direction

**Editorial storytelling + software precision + restrained cinematic transformation.**

Avoid generic AI-site tropes: purple gradients, particles, random 3D, glowing blobs, card-grid overload, fake dashboards, technology-logo soup, meaningless motion.

Use recognizable UI, purposeful SVG/DOM diagrams and restrained depth. HTML/CSS/SVG first. Add WebGL/Three.js only when a scene becomes meaningfully clearer and performance evidence supports the cost.

## 8. Enquiry contract

The real contact journey is part of the product.

User-facing stages:

1. What would you like to improve?
2. What happens today / what should change?
3. How should we contact you?

Budget and timeline may be optional planning fields, not mandatory barriers.

Backend contract:

**validate → accept durably → issue receipt → notify responsible operator → recover from notification failure**

A success message must never mean only “we attempted an email.” Reuse a reliable existing provider when suitable; do not introduce architecture theatre.

## 9. Architecture principle

Audit the current stack first. Retain suitable existing framework/hosting/components. No mandated framework migration, microservices, queue cluster, new login, CRM or CMS without an actual requirement.

Preferred shape:

```text
Visitor
  → existing CDN/hosting
  → server-rendered/static public pages + small progressive enhancements
      ├─ local fictional story/demo (no production submission)
      ├─ public content/work/metadata
      └─ real enquiry → server validation
                        → durable intake/provider
                           ├─ visitor receipt
                           └─ retryable operator notification
```

## 10. Performance and accessibility

- Target WCAG 2.2 AA; do not claim conformance until verified.
- Full keyboard path and visible focus.
- Complete reduced-motion/static story parity.
- Meaningful text remains real DOM.
- Mobile is separately composed.
- Core Web Vitals “good” acceptance references at p75: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 where field data exists.
- Lighthouse mobile ≥95 is a lab target, not a public achieved metric.
- If field data is insufficient, report insufficient data.

## 11. Honesty

Do not fabricate social proof. Work classification, implementation stage and verification are separate fields. Targets never render as achieved. Unsupported promises remain unpublished.

## 12. Delivery Roadmap and Gates

*(Governed by `docs/vnext/13_IMPLEMENTATION_ROADMAP.md`. No independent or conflicting phases are maintained here.)*

- **Phase 0 — Adopt vNext docs and reconcile repo**: Clean consolidation, reconcile canon, retire historical concepts.
- **Phase 1 — Experience foundation**: Motion boundary, scene shells, entrance loader, logo transition, nav, reduced-motion.
- **Phase 2 — Hero + phone chapter**: Phone shell, DOM product screens, Hero, carry-over, state changes, phone resting state.
- **Phase 3 — Laptop portal + inside-product experience**: Laptop shell, blank-to-product state, camera/portal push-in, full-screen product, reversible scroll.
- **Phase 4 — Connected flow + proof + method**: Business request flow, proof/results, How We Work frame, Work preview, FAQ, close.
- **Phase 5 — Supporting pages**: `/what-we-solve`, `/work`, case-study template, `/how-we-work`, `/about`, `/engineering`, `/start-a-project`, legal/error routes.
- **Phase 6 — Enquiry backend**: Validation, durable queue/intake, receipt, retryable operator notifications, security.
- **Phase 7 — Work/case-study evidence**: Verified claims mapping, proof verification, limitation disclosure.
- **Phase 8 — Hardening**: Accessibility, SEO, performance, security, responsive, cross-browser.
- **Phase 9 — Real-user comprehension**: Five-person user comprehension test on Tier 2/3 business audience.
- **Phase 10 — Release candidate**: Strict quality gates (lint/type/test/build 0, claims gate, Owner browser review, rollback plan).
- **Phase 11 — Final technical closeout**: Generate 16-document MNC/GCC technical documentation suite from verified production implementation (DECISION-018).

Execution order from 13 Oct 2026: Master Plan §14.7. vNext phases define scope; §14.7 defines order.

## 13. Definition of done

A non-technical visitor can answer within a short visit:

- What is YCN?
- How can it help my business?
- What can it build?
- What happens if I contact them?
- What should I click next?

At the same time, a technical visitor can find credible engineering detail and evidence without that detail blocking the business story.

## 14. Launch Completion Control — 13 October 2026 (Launch Execution Roadmap)

> **Integration instruction:** This section is an **append-only amendment to this existing `docs/YCN_MASTER_PLAN.md`**, not a second master plan. Its status is **LOCALLY COMMITTED AMENDMENT AWAITING OWNER-APPROVED PUBLICATION** (`YCN-PLAN-ADOPT-01`). This section describes the approved launch execution framework without asserting that unpublished content is already on GitHub or that future task execution is automatically authorised. No direct GitHub push is authorized by incorporation of this text; publication to `origin/main` requires separate, explicit Owner authorization.
>
> **Purpose:** Ship the already-built YCN Labs website safely and promptly. Stop cycling through alternative plans, unbounded UI polish, and repeated audits. Every material engineering decision must produce a completed customer-facing outcome or reduce an identifiable launch risk.
>
> **Source baseline checked 13 Oct 2026:** Website `yash-wd/ycn-labs-site/main` at `a23dfdbfef407e56ed7e412e7ae7a5dd1984d57f`; brand library `yash-wd/ycn-labs-brand-library/main` at `063e6249d34179491a342fcdc140fd0dd1336624`. These are **inspection snapshots**, not permanent HEADs. Always verify current remote and local HEAD before work.

### 14.1 Authority, outcome and decision boundaries

1. **One governing plan:** `docs/YCN_MASTER_PLAN.md` is the strategic and launch-execution map. `docs/BACKLOG.md` is the ordered task register; `docs/STATE.md` is verified current status and the single next task. The vNext specifications continue to govern the ratified **visual and architectural solution**. `docs/YCN_DECISIONS.md`, `docs/YCN_CONTENT_SPEC.md`, `docs/YCN_CLAIMS_AND_PROOF.md` and `docs/YCN_DESIGN_SYSTEM.md` remain binding in their own domains. This section **operationalizes**, not supersedes, `docs/vnext/13_IMPLEMENTATION_ROADMAP.md`.
2. **Owner authority:** The Owner decides actual services, market, legal entity, commercial promises, design acceptance, brand rulings, production release, irreversible operations and every push to public `main` except exceptions specifically and **knowingly** ratified by the Owner. A plan, GPT recommendation, Claude PASS or AGY success report is not approval.
3. **No reset:** Retain the current Next.js App Router + React + TypeScript + Tailwind + GSAP, PostgreSQL/Drizzle, Upstash, Resend, Vitest and Playwright architecture unless a measured defect justifies changing a part. Do not rebuild the homepage, add microservices, a CMS, new login/CRM, WebGL, AI chatbot or new framework for launch prestige.
4. **Hard launch target:** **Tuesday, 10 November 2026** is a **conditional management target, not a promise or permission to bypass gates**. It assumes rapid decisions, available engineering time, functioning infrastructure and no unforeseen P0 defects. Reforecast once from the verified local baseline and resource capacity; document evidence for any shift. A target date never overrides security, legal or Owner gates.
5. **Definition of launch:** a truthful, user-tested, responsive YCN Labs website at the approved production domain; working durable enquiry path and reachable operator; verified security/privacy, deployment, monitoring, rollback and support ownership; explicit Owner release acceptance. Commercial traction and SaaS products are *not* launch prerequisites.
6. **No new master-plan documents:** Do not create separate V4/V5 plans or migrate history again. Record completed task IDs and only material decisions/risks in their canonical documents. Changes to this master require a documented reason and Owner approval.

### 14.2 What is already built, what is NOT proven

**Implemented in tracked source (not automatically launch-ready):** route and homepage structure, entrance/hero, DOM product demonstrations and later chapters; Menu, theme toggle and CTA; supporting routes (`/what-we-solve`, `/work`, `/how-we-work`, `/about`, `/engineering`, `/contact`, `/privacy`, `/terms`); API routes; PostgreSQL lead model, Zod validation, Redis rate-limit/dedupe support, Resend notification, recovery functions, metadata/robots/sitemap, Vitest coverage, Playwright dependency. `app/page.tsx` → `components/CinematicHomepage.tsx` → `components/homepage/vnext/HomepageVNextPhase1.tsx` is the current homepage import chain.

**Known defects / concerns:** Menu border currently has a fixed-duration SVG orbit unlike the CTA-style lighting the Owner wants, with physical speed changing on expansion; Capability-03 clips at 1024 px (reported 446 px content versus 352 px container); some large interactive components; out-of-date `site-v2` instructions and conflicting technical descriptions; staging credentials and real end-to-end lead tests not evidenced; UK/GBP/legal text potentially inconsistent with intended primary market; claims on the *existing live production site* need factual review.

**Not established by a green build or an agent statement:** actual live lead delivery, correct deployment branch, case-study accuracy, accessibility conformance, external vault backup, production error monitoring, lawful jurisdiction-specific terms, mobile field CWV, real customer satisfaction. Record these as **NOT VERIFIED** until tested with appropriate evidence.

**Evidence language:** `VERIFIED` = raw/source or runtime evidence tied to exact SHA; `REPORTED` = agent assertion; `INFERRED` = analysis requiring test; `NOT CHECKED` = absent evidence; `BLOCKED` = exact dependency. Never turn `REPORTED` into `PASS` through repetition.

### 14.3 Protect the business this week — not optional polish

**P0-A: Vault backup (Owner + AGY, separate authorised task).** Existing project records say the confidential vault is **LOCAL ONLY, no verified external copy**. Choose a trusted encrypted external drive or private, access-controlled backup destination. AGY inventories sizes without reading or publishing private contents, performs an explicitly permitted *copy* (never `--delete` or move) to the destination, verifies file manifests/checksums, and tests recovery of representative files. Never upload the vault, tokens, credentials or private audits to public GitHub. Record destination identifier, verification timestamp, source/destination manifests in **private** evidence and `docs/STATE.md` only as a high-level backup status. Owner must authorise the actual destination and write operation.

**P0-B: Existing live `ycnlabs.com` exposure (Owner + deployment operator).** The existing public site is different from the replacement under development. Its visible one-business-day reply commitment and any performance, accessibility, ownership, case-study or product claims must be substantiated or revised. First determine **which repository, branch, provider project and environment actually deploy the live domain**. If `ycnlabs.com` deploys from the private `ycnlabs` repository, the task must name that repository explicitly (as a specific Owner-authorized exception to the read-only rule). A narrow, separately authorised live-site correction may occur immediately; do not accidentally deploy the unapproved vNext replacement. Report all affected page URLs and proof before/after. Decide an actual response owner and policy; remove the promise if not reliably staffed. *(Correction C6)*

**P0-C: Preserve evidence and correct agent operation.** `DEV-VIEW-01` confirmed port 3005 and HTTP 200 but its first report hid `git checkout AGENTS.md next-env.d.ts`. The correction recovered the original diff and reported Next.js 16's managed AGENTS block and `next-env.d.ts` generation. Keep the incident in the decision/risk record **once** and enforce: no `git checkout`, `git restore`, `git reset`, `git clean` or other worktree discard without explicit Owner approval. Next.js may update tracked `AGENTS.md` during `next dev`; investigate and adopt the documented `agentRules` configuration or deliberately commit the managed block **only through a separate reviewed task (`YCN-DEV-GENERATION-01`)**. Do not solve a dirty tree by silently reverting it. `next-env.d.ts` may change between dev and build and must be handled transparently.

**P0-D: Confirm `CLOSE_PROTOCOL.md` authority.** The protocol and its AGENTS amendment exist on GitHub, but the Owner's specific approval of automatic duplicate deletion and the CLOSE push exception is **not recorded in the repository**. Do not enlarge or presume the deletion/commit scope. Record an explicit Owner yes/no decision (Decision O-08); until resolved, no unprompted deletion or exceptional push. Existing committed history is preserved.

### 14.4 Freeze release scope (v1.0) and defer non-essential ideas

**Must ship:**

- Ratified YCN positioning, factual market/location/entity identity, honest offers and contact route; preserve the product-led homepage and its four phone chapters, later laptop/connected-flow/proof/process narrative subject to Owner review.
- Home; What We Solve; Work (real verified items only; a truthful non-case-study fallback is acceptable); How We Work; Engineering; About; Contact; legally reviewed privacy and terms; usable 404/error states; correct metadata, robots, sitemap and OG image.
- Responsive navigation, consistent CTA-inspired Menu border animation at 80 **physical px/s**, working keyboard/mobile menus, static/reduced-motion parity; fix Capability-03 overflow and other objectively evidenced P0/P1 defects.
- Durable enquiry acceptance before visitor success; operator notification and *real* replay/recovery; anti-abuse controls; staging verification of database, Redis, Resend; incident alerts, backup/restore and retention rules.
- Approved logo assets/usage or an explicitly authorised interim lineage; licensed media; accessible forms/content; acceptable mobile performance, security controls; CI and a separately approved production release with rollback.
- **Privacy-respecting analytics live at launch**; otherwise the §14.10 funnel has no data for the first weeks. *(Correction C7)*

**Explicitly defer to v1.1 or later unless a tested release blocker:** new scene rewrites, arbitrary visual experiments, advanced motion variants beyond approved fixes, further premium animation polishing, more than necessary logo variants/vector perfection, multilingual rollout, multi-industry pages, a blog, CMS, lead portal, subscriptions, marketing automation, AI chat, microservices, Kubernetes, speculative SaaS, new internal dashboards, unproven capabilities. Do not invent new public case studies to fill space.

**Scope exception:** a new feature becomes v1.0 only if the Owner explains which measurable launch blocker it resolves and expressly substitutes or removes another item. Avoid endless additive scope.

### 14.5 Owner business decisions — answer once, record and proceed

> **Decision Session Rule (Correction C8):** Owner decisions O-01 through O-10 must be answered in **one session by 16 Oct 2026**. If M1 slips by more than 3 days, reforecast once, immediately, with the cause recorded. Do not wait until the end.

| ID | Required decision | Default until decided | Release impact |
|---|---|---|---|
| O-01 | Primary sales market, legal entity and genuine operating location (India, UK or other); preferred customer segment | No invented country, office, international proof or misleading GBP copy | P0 publication gate |
| O-02 | 2–3 currently deliverable initial services; named delivery capacity and clear exclusions | Only describe evidenced capability in plain language | P1 content gate |
| O-03 | Named lead recipient, response policy and support owner | No "within one business day" promise unless operationally staffed | P0 live-site and replacement gate |
| O-04 | Real publishable work/examples, client permissions and claims substantiation | Honest conceptual/internal demonstration with explicit label; no fake case study | P1 trust gate |
| O-05 | Approved initial cost/scope process, lead qualification, contract and IP/warranty boundaries | Custom scoped proposal; no invented prices, unlimited warranties or blanket IP assignment | P1 commercial/legal gate |
| O-06 | Lead retention periods, deletion requests, applicable privacy framework, legal review owner | No automated purge; no inaccurate legal jurisdiction claim | P0 data/legal gate |
| O-07 | Approve RULING-02a/02b logo master variants independently, or explicitly permit existing verified site assets for v1.0 | Do not promote candidate artwork; no unapproved asset swap | P1 release gate |
| O-08 | Confirm `CLOSE_PROTOCOL.md` approval, deletion scope, exceptional push policy | No speculative authorization for deletion or exceptional pushes | P0 governance gate |
| O-09 | Confirm management target (proposed 10 Nov 2026) and minimum weekly Owner review availability | Target is conditional; no fictitious commitment | Schedule, not a quality waiver |
| O-10 | Infrastructure & platform access: Owner confirms working access to domain registrar/DNS, Vercel, Postgres host, Upstash, Resend, Sentry, and Google Search Console, plus a monthly infrastructure budget *(Correction C5)* | Missing access blocks tasks 12 and 16 late in the schedule | P0 prerequisite gate |

Owner decisions needed for a task should be gathered together briefly, then recorded in `YCN_DECISIONS.md` or a single decision register area; do not ask repeatedly once supplied.

### 14.6 Execution calendar — accelerated, conditional

| Checkpoint | Target | Deliverable / go-no-go | If blocked |
|---|---|---|---|
| M0 — Protect / baseline | **16 Oct** | Vault copy verified or blocked on specific destination; live-domain mapping and public claims triaged; clean preflight; Owner decisions O-01..O-10 session completed | Escalate P0; proceed with safe unrelated work |
| M1 — Delivery system + two critical UI fixes | **23 Oct** | CI PR checks evidenced, safe dev/build behavior decided (`YCN-DEV-GENERATION-01`), navbar and Capability-03 Owner-accepted | If M1 slips >3 days, reforecast once immediately with cause recorded; scope-cut non-essential polish |
| M2 — Content + staged enquiry | **30 Oct** | Main pages and logo/media usage approved; legal/claims gate; PostgreSQL/Redis/Resend staging E2E and failure recovery witnessed | Hold release, parallelize unaffected content work |
| M3 — Release candidate | **6 Nov** | Cross-device/keyboard/reduced-motion review, security/performance/SEO review, privacy analytics verified, 5-person comprehension feedback, owner visual acceptance, rollback drill | Fix P0/P1; defer v1.1 items; reforecast honestly |
| M4 — Public launch | **10 Nov** | Owner authorizes exact SHA/environment; deploy, smoke test, monitor, verify enquiry, live analytics and rollback availability | **NO-GO** if release gates unmet |

Targets are **planning hypotheses**, not work estimates or promises; refresh once from local capacity and evidence. Daily execution should favor **one completed bounded task** over multiple simultaneous speculative reviews. If a task exceeds one working block, split at a safe verifiable boundary; preserve WIP according to authorised Git rules and public-private separation.

### 14.7 Single priority queue (execution register; sync to `docs/BACKLOG.md`)

> **Task Sequence Notice (Correction C2):** `YCN-DEV-GENERATION-01` is moved to position `01` directly after adoption so that `next dev` rewriting `AGENTS.md` / `next-env.d.ts` is permanently resolved before subsequent preflights.

**Status convention:** `DONE` requires verifiable artifact and applicable approval; `READY` means independently scoped, not automatically authorized; `BLOCKED` means a named gate or person; `PENDING` is unscheduled. Only `docs/STATE.md` names the immediate executable task, never the whole queue. A dependency may proceed in parallel **only if the Owner explicitly allocates an independent workstream**.

| Order / Task ID | Scope | Evidence / definition of done | Gate |
|---|---|---|---|
| 00 `YCN-PLAN-ADOPT-01` | Append this reviewed section to existing master; add §12 pointer; align BACKLOG/STATE pointers without reworking history; no code | One reviewed documentation diff; no duplicate plan; Owner-authorized docs push | Owner + Claude |
| 01 `YCN-DEV-GENERATION-01` | Verify Next.js `agentRules` behavior and choose documented mitigation; reconcile `next-env.d.ts`, untrack via `.gitignore` if confirmed generated; commit Next managed block or set `agentRules: false` (Owner picks) *(Correction C2)* | Reproducible clean dev workflow and focused docs/config diff; no silent checkout | Claude/Owner |
| 02 `YCN-INCIDENT-RECON-01` | Accept DEV-VIEW-01 corrected report; assess cause and no-silent-restore rule without replay/destruction | Original AGENTS/next-env diff in existing report; unresolved facts labeled | Owner verdict |
| 03 `YCN-VAULT-BACKUP-01` | Exact approved destination; encrypted copy and checksum/restore verification; **no deletes** | Private manifests and restore sample, recorded backup status | Owner destination approval |
| 04 `YCN-DEPLOY-LIVE-CLAIMS-01` | Map live Vercel/domain branch; enumerate unverified live promises; if live site deploys from private `ycnlabs` repo, name that repo explicitly *(Correction C6)*; separate narrow hotfix if approved | Configuration evidence and live URL inventory; unsupported claims corrected or ruled | Owner live changes |
| 05 `YCN-LOCAL-BASELINE-01` | **Local gaps only**, clean preflight, env **names** only, port status, existing proof paths and capability dimensions; avoid repeat of GitHub inventory | Exact stdout/exit codes and verification status, no file resets | Read-only review |
| 06 `YCN-CI-GUARDS-01` | Add minimal GitHub Actions PR jobs for lint/types/tests/build; verify real Vercel mapping; protect main when checks exist; no unintended production auto-deploy | Checks run on a real PR, no secrets exposed, Owner-approved guard settings | Owner branch settings |
| 07 `YCN-NAV-ORIGINAL-STYLE-01` | **Owner approved A + bounded test yes**; CTA lighting *appearance*, SVG/offset-path physical perimeter motion at 80 px/s; natural longer expanded lap, smooth tail; do not alter CTA | Measured speed collapsed/expanded, viewport/theme/reduced-motion proof, targeted and full green tests, Owner visuals | Claude/Owner, no push yet |
| 08 `HOME-02-CAP-03-1024` | Fix existing table overflow at 1024 without changing approved content/other chapters | Computed scrollWidth ≤ clientWidth or intentional accessible scroll; full viewports and tests | Owner visuals |
| 09 `YCN-HOME-FINAL-01` | Review and correct **verified** remaining homepage/entrance/phone/laptop/flow/FAQ defects only; keep ratified copy and frozen systems | One issue manifest → before/after evidence → signed-off mobile/desktop and motion/fallback | Owner visuals |
| 10 `YCN-PAGES-CONTENT-01` | Route-by-route content, clear services/contact, jurisdiction/currency and claims reconciliation, correct metadata | Canonical claims mapping for every public promise; Owner copy approval | O-01..O-06 |
| 11 `YCN-BRAND-MEDIA-01` | Approve 02a/02b or explicit existing-asset interim; integrate only approved releases, validate source/license and video rights | Asset manifest/checksums, no fake/uncleared images; both themes, all sizes | O-07 |
| 12 `YCN-LEAD-STAGING-01` | Validated staging env with real Postgres/Upstash/Resend, failure/retry/dedupe tests; confirm lead operator ownership | DB ID and notification state proof (redacted), 4xx/5xx/fault cases, no false success, recovery/alert evidence | O-03/O-06/O-10 + credentials |
| 13 `YCN-QUALITY-GATE-01` | Full lint/types/test/build on exact RC; Playwright browsers; accessibility, security/CSP report-only, performance/SEO audits | Recorded raw jobs/artifacts; zero unresolved P0 or unaccepted P1; truthful lab versus field metrics | Technical reviewer |
| 14 `YCN-COMPREHENSION-01` | Observe at least five representative nontechnical users performing find/understand/contact tasks | Raw anonymized findings; critical confusion corrected and retested | Owner/customer sample |
| 15 `YCN-RELEASE-RC-01` | Freeze SHA, staged smoke, domain/DNS/SSL, required env names, backup, rollback, privacy-respecting analytics live *(Correction C7)*, and incident owner | Signed candidate manifest, rehearsed rollback, live analytics verified, all gates green | Owner release approval |
| 16 `YCN-PRODUCTION-LAUNCH-01` | **Separate** authorized deploy of exact approved SHA, no incidental source changes | Correct live SHA/content/form path, performance/security smoke, monitoring and immediate rollback available | Explicit "release" approval |
| 17 `YCN-POSTLAUNCH-01` | Operations and measurement after launch | Lead SLA/response tracking, uptime/alerts, proposal funnel data from live analytics, incident playbook, maintenance backlog | Operating owner |

**Task 00 must not silently treat earlier A/yes as global approval:** those words authorised the navbar design and bounded test only. The Owner's previous **"do not push"** remains binding until a specific push authorization.

### 14.8 Verification discipline — automate evidence, protect data

1. Every code task produces: task ID and base SHA; declared file boundary; actual changed paths; test commands with exit codes; screenshot/recording proof where visual; limitations; updated exact HEAD after commit; clear statement of what was NOT done.
2. **Never discard changes silently:** `git checkout --`, `git restore`, `git reset`, `git clean`, destructive shell commands and bulk removal require Owner-specific approval. Do not rewrite logs or hide retries. If preflight fails, STOP and report.
3. **No tests falsely called read-only:** `pnpm run build`, Next.js dev and some tools generate files. For baseline validation prefer an approved isolated worktree/clone or CI runner; snapshot status before/after. Do not stop the running dev server in a read-only task unless separately approved.
4. **Early CI:** minimal job with `contents: read`, frozen lockfile, pinned or reviewed action versions, isolated runner, lint/type/test/build, secret-safe logs, no privileged PR execution and no deployment side effects. First demonstrate a real green PR check; **then** configure required check on `main`. Do not lock the team out by requiring a non-existent job. Branch protections/rulesets may require Owner/admin UI access. CI cannot replace the Owner visual, legal or production acceptance gates.
5. **Browser proof:** at least 375 / 768 / 1024 / 1280 / 1440 widths and two themes for affected UI; reduced-motion, keyboard, menu closed/open, route reload and responsive transition. Store raw screenshots/videos privately with a task ID and exact tested SHA; record actual measurable values, never approximate fabricated FPS or LCP.
6. **Two-round visual rule:** Every visual task fixes its acceptance reference before any code (for the navbar, a short screen recording of the Start a Project border plus 80 physical px/s). Maximum two revision rounds. This rule applies strictly to non-blocking visual polish: after round 2, non-blocking polish is either accepted by the Owner or deferred to v1.1. P0 or genuine release-blocking defects cannot be deferred automatically; they remain blocked until fixed, verified, or lawfully resolved through an explicit Owner release decision.
7. **Production claims:** `WCAG 2.2 AA`, Lighthouse score, uptime, ISO compliance, project outcomes, client work, ownership, reply SLA and data-processing promises cannot be claimed achieved without suitable evidence and Owner approval. Remove unsupported statements rather than invent evidence.
8. **Backend:** run controlled test leads in **staging**, not accidentally in production; test DB-down and email-down behavior, concurrent duplicates, rate limit misconfiguration, failed notification recovery, privacy-safe logs, backup/restore, and retention procedures. A successful HTTP status or mocked unit test alone is insufficient.
9. **No credentials in public:** both current repositories are public; vault, private audits, customer data, secrets, raw sensitive logs and full backups stay private. Enforce least privilege and `sha256sum` checks of transferred evidence. Stage files via explicit paths, never `git add -A`.
10. **Review by risk tier (Proposed Owner Ruling — Pending Approval):**
    The following risk-tiered review workflow is proposed to streamline delivery:
    - **Read-only and docs-only tasks:** AGY → GPT check → Owner (no Claude seat).
    - **Code tasks:** CI + Claude diff review + Owner visual + "push".
    - **Release, destructive, credential and database tasks:** All gates required.
    *Status:* This procedure is a proposed Owner ruling and does NOT supersede the existing AGENTS charter or multi-seat review gates until explicitly ratified by the Owner. The existing AGENTS charter remains controlling. Furthermore, the `CLOSE_PROTOCOL.md` deletion scope and exceptional push authorization remain pending explicit Owner decision O-08.
11. **Mandatory platform truth:** confirm which GitHub branch and Vercel project deploys `ycnlabs.com` before *any* push or branch-policy change that might trigger live deployment. Read-only GitHub metadata is not proof of Vercel configuration.

### 14.9 Launch go/no-go acceptance checklist

A release may be declared **READY** only with linked evidence for each item:

- [ ] The release candidate is an immutable identified SHA, compiled/tested with zero failing required gates; CI status checks tied to that SHA.
- [ ] Actual business identity, market, contact route, services and exact public claims match approved content and legal review; live production promises corrected.
- [ ] Navigation, hero, page flows, responsive layout, keyboard/focus, reduced-motion parity, accessible forms and broken-link check accepted on representative devices/browsers.
- [ ] Brand and every published visual/media asset is approved/licensed; logo source lineage and metadata are verified.
- [ ] Realistic staging enquiry: validation → durable DB record → receipt → operator notification or monitored, repeatable recovery, with failure simulations and privacy-safe evidence.
- [ ] Lead response owner, data retention policy, backup/restore, error alerts and documented operational escalation are established; Owner infrastructure access (O-10) confirmed.
- [ ] Security audit (including request validation, distributed abuse control, dependencies, headers/CSP trial, no exposed secrets), accessibility and performance findings are resolved or explicitly accepted where lawful/safe.
- [ ] SEO & Analytics: correct canonical domain, indexing/noindex transitions, sitemap/robots, locale/location metadata, social previews, and privacy-respecting analytics live *(Correction C7)*.
- [ ] Five-person comprehension test run; critical usability defects fixed and retested, or Owner records justified equivalent acceptance under project rules.
- [ ] Production branch and Vercel connection independently verified; deploy and rollback rehearsed; live smoke test instructions ready.
- [ ] The Owner approves **the exact release**, not a general plan. No production launch based solely on AGY/Claude PASS.

If any legal/security/data-loss/false-success or deployment-identity blocker remains, **NO-GO**, even if target date passes. All non-essential visual polish should move to v1.1.

### 14.10 After launch: measurable operation and rational scaling

Track a minimal funnel: qualified visits → enquiries accepted → enquiries actually reviewed → discovery calls → proposals → wins → delivered projects → gross margin/recurring care. Privacy-respecting event measurement needs a consent/legal basis decision where applicable; no PII in analytics. Establish a weekly operating review with data, not another multi-seat planning meeting.

**Business model hypothesis:** paid client projects (websites, customer apps, business workflows/integrations and custom software) first; maintenance/care retainers only after a staffed support process exists; SaaS/reusable products later, when multiple paying clients confirm a recurring pain point. Price by scoped deliverables, risk and genuine cost, not invented fixed packages. Validate one initial customer segment before broad expansion to UK + India + every technology vertical.

**Scale conditions, not speculative deadlines:** optimise existing server/client boundaries, media, caching and database usage when field data shows constraints; adopt worker/queue infrastructure only when enquiry retries or background jobs demonstrably require it; establish a dedicated CRM/CMS only after team workflow cost justifies it; split services only when modular-monolith boundaries become a proved operational bottleneck. No mandatory AI assistant, microservices, Kubernetes, or WebGL stage.

**Final handover:** after successful public release and operational stabilisation, generate the comprehensive technical closeout documentation from the **actual released code and evidence**, as previously required by DECISION-018. Preserve historical references without reviving superseded build instructions.

### 14.11 Rules for accepting this amendment

Before AGY edits this file, Claude must review this **append-only text** against Owner Decisions 001–050, active content/claims/specs, and the existing vNext roadmap. Check for contradictions, unsupported approvals or accidentally authorised tasks. The Owner then authorises incorporation of the reviewed amendment as `YCN-PLAN-ADOPT-01`.

Implementation conditions:
- Append this exact approved section to **`docs/YCN_MASTER_PLAN.md`**; retain the original Sections 1–13 byte-for-byte except for the single sentence permitted by C1 at the end of Section 12.
- Add the pointer banner at the top of **`docs/vnext/13_IMPLEMENTATION_ROADMAP.md`** per C1.
- Adjust **`docs/BACKLOG.md`** and **`docs/STATE.md`** **only** to reference the accepted launch order, note the conditional target, record corrected Owner decision status, and set **one** next executable task (`01 YCN-DEV-GENERATION-01`). Never rewrite historical approvals; mark contradictions and supersession explicitly.
- If required to activate this plan for future AI sessions, update existing pointers in `docs/START_HERE.md` / `docs/INDEX.md` only as a minimal, separately reviewed part of the same bounded docs adoption; no new master docs or AGENT charter rewrite.
- Show `git diff --check`, explicit staged paths, actual diff and SHA; one task-ID commit after review. **Do not push to `main` until the Owner separately says `push`**, and verify the deployment mapping before that push.
- After the authorized push, confirm the full GitHub commit SHA, matching `origin/main`, and that no unapproved production deployment occurred. **STOP.** The next task is then selected from `docs/STATE.md`.
