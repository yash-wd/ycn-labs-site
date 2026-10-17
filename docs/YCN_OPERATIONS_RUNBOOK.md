# YCN Labs — Operations Runbook & System Engineering Protocol

**Version:** 1.3  
**Effective Date:** 17 October 2026  
**Status:** DRAFT — PENDING OWNER COMMIT APPROVAL (Gate E Deliverable — `YCN-V2-FOUNDATION-ALIGN-01`)  
**Repository:** `https://github.com/yash-wd/ycn-labs-site`  
**Target Environment:** Site V2 (Provisional planning target: 30 November 2026)

---

## 1. System Architecture & Operating Baseline

| Component | Technology / Exact Version | Configuration / Role |
| :--- | :--- | :--- |
| **Runtime & Package Manager** | Node.js 24.x LTS / pnpm v11.15.1 | Strict frozen lockfile, pure ESM (`"type": "module"`) |
| **Framework & Compiler** | Next.js 16.3.6 + React 19.2.0 | Webpack build (`next build --webpack`), strict server/client boundary |
| **Styling & Design System** | Tailwind CSS 4.3.2 + Vanilla CSS | YCN Design Tokens (`docs/YCN_DESIGN_SYSTEM.md` authoritative), ChaiUI component registry (`@chaiui/*`) |
| **Animation Engine** | GSAP 3.15.0 + CSS Transitions | 60fps GPU acceleration, mandatory `prefers-reduced-motion` handling |
| **Type Safety & Linting** | TypeScript 5.9.2 + typescript-eslint 8.71.2 + ESLint 9.39.1 | Strict `tsc --noEmit`, ESLint flat config with Node globals |
| **Testing Suite** | Vitest 4.1.10 + Playwright 1.63.0 | 18 test files, 280 passing tests, unit + integration suites |
| **Security Scanning** | Gitleaks 8.30+ | Local dual scan (`pnpm run gitleaks`) + GitHub Actions CI workflow |
| **Database & ORM** | Neon Serverless PostgreSQL + Drizzle ORM 0.45.2 | Serverless pooling, PostgreSQL transactional atomic deduplication (Target Architecture) |
| **Rate Limiting & Cache** | Upstash Redis 1.38+ | Sliding window rate-limiting + distributed cache (Target Architecture) |
| **Transactional Email** | Resend 6.17+ | Outbound email delivery with non-blocking error isolation (Target Architecture) |
| **Error Monitoring** | Sentry Next.js SDK 10.68+ | Production runtime error capture and performance profiling |
| **Hosting & CI/CD** | Vercel (Preview + Production) | GitHub Actions CI (`ci.yml` + `gitleaks.yml`) |

---

## 2. Core Operational Commands & Verification Matrix

Every engineer and agent must execute these commands locally and verify **zero errors** before proposing any commit:

```bash
# 1. Start local development server (Port 3005)
pnpm run dev

# 2. TypeScript & TSX Linting (Active across all components, routes, tests)
pnpm run lint

# 3. TypeScript Type Safety Check (Zero errors required)
pnpm run check-types

# 4. Automated Test Suite Execution (280/280 tests must pass)
pnpm run test

# 5. Dual Secret Leak Detection Scanning (Commits + Working Tree, 0 leaks required)
pnpm run gitleaks

# 6. Production Application Build (Webpack verification)
pnpm run build

# --- FULL PRE-FLIGHT VERIFICATION ONE-LINER ---
pnpm run lint && pnpm run check-types && pnpm run test && pnpm run gitleaks && pnpm run build
```

---

## 3. Governance, Three-Seat Review & Git Workflows

### 3.1 Three-Seat Shared Ownership Model
Governed by `AGENTS.md` Section "Three-Seat Shared Ownership & Cold-Start Protocol":
- **The Owner:** Sole authority on priorities, visual aesthetics, release gates, commits, pushes, and production deployments.
- **Three AI Seats (GPT, Claude, AGY):** Equal peers thinking across the entire project: business policy, architecture, code, design, cost, risk, and testing. No seat is confined to a single functional silo. All seats submit independent positions before synthesis.
- **AGY Seat (Local Execution):** Sole seat operating the local Linux machine: inspects code, runs builds/tests/linters, creates files, captures raw evidence in `YCN_LABS_MASTER/proof/<task-id>/`, commits only when authorized.

### 3.2 Branching & Commit Protocol
- **Canonical Branch:** `main`. GitHub branch protection settings are currently **pending Owner activation** (currently `protected: false` on GitHub).
- **Work-in-Progress Branches:** Named strictly `wip/<task-id>` (e.g., `wip/YCN-NAV-07`), as specified in `AGENTS.md`.
- **Cold-Start Verification:**
  ```bash
  git fetch origin
  git status --porcelain  # Must be empty
  git rev-parse HEAD      # Must match origin/main
  ```
- **Push Gate:** No push may occur without explicit Owner command (`push`).

---

## 4. Lead Intake & Storage Operations (Target Architecture 11a)

> **Notice:** The backend enquiry storage, deduplication, and recovery flow described below represents the approved **Target Architecture (11a)**. Full production implementation is scheduled under Task 12 (`YCN-LEAD-STAGING-01`) and is **NOT YET STARTED**.

### 4.1 Connection & Configuration
- Connection string configured via `DATABASE_URL` (pooled connection for serverless endpoints).
- Drizzle ORM schema defined in `lib/db/`.

### 4.2 Lead Storage & Failure Isolation Boundaries (Architecture §8 & §14.7)
The target architecture enforces strict transactional boundaries:
1. **Zod Input Validation:** Rejects invalid payloads with HTTP 400 immediately; no database transaction is opened.
2. **Rate Limiting:** Sliding window enforced via Upstash Redis. If rate limit exceeded, returns HTTP 429 with `Retry-After` header; no database hit.
3. **Database Insertion & Atomic Deduplication:** Deduplication and idempotency are enforced transactionally at the PostgreSQL layer. If database write succeeds, failure downstream must NOT return false-503 to avoid duplicate client re-submissions.
4. **Failure Boundaries:**
   - *Lead committed, operator notification fails:* Visitor still gets accepted response with original lead ID; no false 503; recoverable pending/failed work.
   - *Concurrent racing submissions:* Only one durable lead and one atomic claim; replay gets same accepted ID; no duplicate side effects.
   - *Provider degradation:* If Redis or Resend throws or degrades, lead durability in Postgres is preserved; error categorized cleanly without data loss or unhandled crash.

---

## 5. Retention & Data Governance Operations

### 5.1 Inactive Lead Retention Policy (DECISION-052 O-06)
- **Policy:** Inactive pre-sales enquiries are retained for **up to 12 months** from the date of last meaningful contact, for business continuity and relationship management.
- **Legal Clearance Status:** **NOT YET GRANTED** (Open Prerequisite 10: formal counsel review of Privacy Policy and DPDP compliance is pending).
- **Purge Protocol:**
  - **No automated purge.** Deletion is performed solely via manual Owner review.
  - Periodic review of inactive leads performed by the Owner in the Neon database console.
  - Purged lead counts, dates, and Owner attestations are recorded in `YCN_LABS_MASTER/proof/RETENTION/retention-log.md`.

---

## 6. Secrets Management & Rotation Protocol

### 6.1 Environment Variables Inventory
| Variable Name | Scope | Sensitivity | Purpose |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | Server-only | HIGH | Neon PostgreSQL connection string |
| `UPSTASH_REDIS_REST_URL` | Server-only | HIGH | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Server-only | HIGH | Upstash Redis authentication token |
| `RESEND_API_KEY` | Server-only | HIGH | Resend API key for outbound transactional emails |
| `SENTRY_AUTH_TOKEN` | CI / Build-only | HIGH | Sentry sourcemap upload token |
| `NEXT_PUBLIC_SITE_ENV` | Public / Client | LOW | Environment indicator (`staging` / `production`) |

### 6.2 Emergency Secret Rotation Runbook
In the event of suspected secret exposure:
1. **Neon Database:** Reset password in Neon Console -> update `DATABASE_URL` in Vercel -> redeploy.
2. **Upstash Redis:** Rotate token in Upstash Console -> update `UPSTASH_REDIS_REST_TOKEN` in Vercel.
3. **Resend:** Revoke API key in Resend Console -> issue new key -> update `RESEND_API_KEY` in Vercel.
4. **Log Incident:** Record rotation timestamp and key IDs (never values) in `YCN_LABS_MASTER/proof/INCIDENTS/secret-rotation-log.md`.

---

## 7. Incident Response, Rollback & Disaster Recovery

### 7.1 Incident Severity Levels
- **P0 (Critical):** Site down, contact form dropping leads, active security vulnerability. Immediate mitigation required.
- **P1 (Major):** Visual regression on primary breakpoint, rate-limiter degraded, notification failures. Resolve within 4 hours.
- **P2 (Minor):** Non-blocking console warning, minor copy typo, documentation discrepancy. Resolve in normal cycle.

### 7.2 Emergency Rollback Procedure
1. **Vercel Instant Rollback (Recommended):**
   - Navigate to Vercel Dashboard -> Deployments -> Last known good deployment -> Click `...` -> **Instant Rollback**. Traffic diverts in < 5 seconds.
2. **Git Revert Protocol:**
   ```bash
   git fetch origin
   git checkout main
   git revert <bad-commit-sha>
   pnpm run lint && pnpm run check-types && pnpm run test && pnpm run gitleaks && pnpm run build
   # Request Owner authorization before pushing revert
   ```

---

## 8. Pre-Flight Release Checklist (Gate 10)

Before promoting any release to production:
- [ ] All 18 test files (280 tests) pass: `pnpm run test`
- [ ] TypeScript typecheck clean (0 errors): `pnpm run check-types`
- [ ] ESLint clean across all TS/TSX files: `pnpm run lint`
- [ ] Gitleaks dual scan clean (0 leaks): `pnpm run gitleaks`
- [ ] Production build succeeds: `pnpm run build`
- [ ] Security headers verified (CSP, HSTS, X-Frame-Options, Permissions-Policy)
- [ ] Staging end-to-end lead submission verified in database
- [ ] Owner visual review and explicit signed approval recorded
