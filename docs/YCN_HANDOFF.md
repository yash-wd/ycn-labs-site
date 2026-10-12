# YCN LABS PROJECT HANDOFF — resume mid-workflow (prior chat contexts full)

ROLES: Owner (me, final approver, reviews rendered site in browser) |
GPT = strategy seat | Claude = challenge/review seat | AGY = execution
agent on my machine. I paste messages between the three chats.

REPO: /home/ycn-labs/Desktop/Web Dev - 2026/Practice/ycnlabs
Branch: site-v2 ONLY. Push always: git push origin refs/heads/site-v2:refs/heads/site-v2
NEVER touch main. origin/main = 6a017e0 (Vercel prod). Local main = 8fd4837
(guarded, 12 commits ahead, never mutate).
Docs: repo docs/ (YCN_CONTENT_SPEC, YCN_DESIGN_SYSTEM, YCN_CLAIMS_AND_PROOF
= binding, YCN_DECISIONS = active decisions authority, YCN_MASTER_PLAN;
Active site direction: docs/vnext/00_START_HERE.md;
Reference Master: YCN_BRAND_EXPERIENCE_REFERENCE_MASTER_FINAL —
REFERENCE / NON-BINDING: canonical documents and explicit Owner rulings always override it;
Legacy: docs/legacy/ = historical records only).
Evidence report: /home/ycn-labs/Desktop/ycnlabs.com/YCN-PROJECT/evidence/B2/12_AGY_ACCELERATED_BUILD_REPORT.md
Preview: localhost:3000 (local production-build preview). LAN preview URL is environment-dependent; derive and report the verified current host IP when starting the preview.

OPERATING MODE — DELIVERY-FIRST (Owner-approved 2026-09-24)
- One instruction per phase from the frozen canon.
- AGY implements the complete phase.
- Claude audits once at phase end, by exception.
- Owner reviews once at meaningful visual boundaries.
- Fix concrete defects only; no pre-audits, plans-for-approval, or sub-lettered work unless a genuine blocker exists.
- Four gates must exit 0 before every commit: lint, check-types, test, build.
- Explicit staging only; never `git add -A`; never touch `main`.
- Canon copy only; no fake proof or unsupported claims.
- Reduced-motion parity, mobile composition and dark/light theme correctness remain mandatory.
- No Three.js or entrance video on the homepage.
- Failed attempts are disclosed concisely.
- Normal phase evidence is proportional: desktop/mobile dark/light captures where relevant, reduced-motion proof once, four gate tails, changed-file list and known limitations.
- Lighthouse, full a11y audit, dependency audit and real-device QA occur at their scheduled homepage/hardening/QA gates rather than every commit.
- Investigations are one bundled AGY pre-step and are time-boxed.
- Documentation wording corrections accumulate rather than triggering standalone commits.
- Progress is measured by completed customer-visible experience, not document count, audit count or commit count.

LOCKED CANONICAL (violated before — enforce): official logo PNGs only
(/brand/ycn-logo-light|dark-transparent-448.png), no invented taglines;
palette: action blue #0470B4 light/#8BD4FF dark, signal cyan #0299C3
light/#017596 dark (cyan = enquiry signal ONLY, never decorative);
fonts Space Grotesk/Inter only; Hero: "Websites and software. Built around
your business." (canon) / candidate lines awaiting Owner ratification;
four canonical pathways per CONTENT_SPEC PATHS-01; no tech jargon
(Zod/PostgreSQL/Sentry/RLS) on customer surface — depth lives at
/engineering; no absolutes/guarantees (zero drop-off, never, SLAs); no
"direct access to engineers" promises (Owner ruling: dropped); no AI-slop
visuals (orbs, neon tubes, glass cards, particle fields, gradient text).

CURRENT STATE (2026-09-24):
- **PHASES 1–8 COMPLETE:**
  - Phase 2 (`a185ea1`): Phone3D chapters 01–04 with S0→S3 state progression.
  - Phase 3 (`98e6503`): Editorial reset + CSS laptop portal transition.
  - Phase 4 (`96e9f11`): Full-screen product + connected business requests flow.
  - Phase 5 (`157060f`): Complete homepage (Capabilities, Proof, How We Work, Buyer FAQ, Close).
  - Phase 6 (`57ddd9d`): Supporting routes (/what-we-solve, /work, /how-we-work, /about, /engineering, /contact, /legal) + /what-we-build redirect.
  - Phase 7 (`91fc278`): Contact backend durable persistence before visitor success; recoverable notification queue; rate limiters.
  - Phase 8 (`a827374`): Honest zero-fabrication gate for /work; notification error categorization.
- **PHASE 9 RELEASE HARDENING COMPLETE:**
  - Security: Server-secret HMAC-SHA-256 for rate limit keys (`RATE_LIMIT_HASH_SECRET` in Zod env schema); strict security headers (CSP `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS preload).
  - Dependencies: Fresh audit resolved all 8 vulnerabilities (Next.js 16.3.6, Sharp 0.35.4, PostCSS 8.5.28 overrides); `pnpm audit --prod` reports 0 vulnerabilities.
  - Dead Code: Unused `three` / `@types/three` and dead `components/cinematic/` removed (-3,641 lines).
  - Performance: Mobile median Lighthouse 93 / LCP 2.63s / CLS 0.032 / TBT 210ms (baseline: 92 / 2.63s / 0.032 / 200ms). Total transfer reduced by 80 KB. Next image AVIF/WebP enabled (logo transfer -55%).
  - Responsive: Automated matrix across 9 viewport widths (320px–1920px) passes with zero overflow.
  - Accessibility & SEO: Unique metadata, canonical tags, 1 H1 per page, visible skip links, crawlable copy across all canonical routes.
  - Tooling: DEBT-001 resolved (`import.meta.dirname` in `vitest.config.ts`).
  - Copy: `/about` callout subtext updated to exact verbatim ratified sentences from `docs/YCN_CONTENT_SPEC.md` §8.
  - Tests: 118/118 tests passing across 9 test suites. All four gates pass (`lint`, `check-types`, `test`, `build`).
- **OPEN RELEASE BLOCKERS & STATUS RECORD:**
  1. **Owner Visual Review:** Full homepage and supporting pages visual review pending Owner browser evaluation.
  2. **Mobile Lab Performance:** Median Score 93 / LCP 2.63s carries as RELEASE BLOCKER / OWNER ACCEPTANCE REQUIRED (CLS 0.032 passes). Field CWV: INSUFFICIENT DATA.
  3. **Live Integration Verification:** BLOCKED ON STAGING CREDENTIALS (PostgreSQL, Upstash Redis, Resend). Isolated mock tests pass 100%.
  4. **Data Retention Policy:** PENDING OWNER RULING. Lead auto-purge held; Redis TTL active at 10 min.
  5. **Vector Logo Master:** BLOCKED ON OWNER-SUPPLIED SOURCE. Existing raster derivatives retained.
  6. **Asset Protection:** Private masters kept private; CDN-level hotlink/signed URL protection BLOCKED ON CDN CONFIGURATION.
- Next implementation milestone: **Phase 10 — Real-Device / User QA & Release Preparation**.

R4 — VISUAL QUALITY BENCHMARK / FRONTEND SKILLS (Owner ruling):
Owner has selected https://forgeautomotive.co.uk/ as the QUALITY BENCHMARK for
premium, cinematic, media-led, scroll-driven storytelling. This is inspiration only:
NEVER copy Forge's branding, assets, text, source code, automotive identity or exact layouts.
YCN translates those principles into its own identity:
- product as protagonist (live DOM screen, never screenshot, never generated image);
- phone continuity bounded to Hero + first chapter cluster;
- later laptop portal sequence (blank screen → product → camera push → screen becomes page);
- strong typography and negative space (each screen has one clear job);
- scroll progression where motion communicates story and reverses cleanly on backscroll;
- business outcome first, technology underneath;
- premium still frames at every scroll position;
- zero AI-slop, no service cards, no tech-logo dumps.

Continuity & execution rules:
1. Direction: Product-led vNext per DECISION-020 through DECISION-042 in `docs/YCN_DECISIONS.md`.
2. Canvas: Homepage is dark-first (#0D111A canvas; light theme remains supported).
3. Animation Stack: GSAP 3.15 + ScrollTrigger is primary animation engine for scroll choreography.
   Framer-motion reserved strictly for isolated micro-interactions.
4. Performance & Measurements: Target mobile LCP <2.5s; measure with `next start` + Lighthouse mobile (never report achieved without real measurement).
5. Frontend Skills Active: Standing mandatory requirement to consult `frontend-design`, `ui-ux-pro-max`,
   `design-taste-frontend`, `gsap-master` / `gsap-*`, `vercel-react-best-practices`.

