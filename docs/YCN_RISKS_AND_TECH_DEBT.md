# YCN Labs — Risk Register & Technical Debt Ledger

**Revision:** 1.3  
**Governance:** Governed by `docs/INDEX.md` and `docs/YCN_AGENT_OPERATING_PROTOCOL.md`.  
**Update Policy:** This is a lean living record. It is **NOT** updated daily or per-task. It is updated only when a material risk or debt item is:
- discovered;
- materially changed;
- mitigated;
- accepted;
- closed.

---

## 1. Active Risk Register

| Risk ID | Description | Severity | Status | Mitigation / Control |
|---|---|---|---|---|
| **RISK-001** | **`site-v2` Local-Only Backup Risk**<br>The active development branch previously existed only on the local machine disk. | High | **MITIGATED** | Bounded backup push executed on 2026-09-18 (`ddbca97` pushed to `origin/site-v2`). Branch now has full remote backup on GitHub. |
| **RISK-002** | **Accidental Production Deployment via `main`**<br>Local `main` is ahead of production (`origin/main`) by 12 commits (`8fd4837`). Vercel automatically deploys commits pushed to `main` to the live domain `ycnlabs.com`. | Critical | **ACTIVE / GUARDED** | `main` is strictly BLOCKED from push operations during development. Only `site-v2` receives pushes. Production deployment is deferred to Task D2 with explicit Owner authorization. |
| **RISK-003** | **Documentation Authority Fragmentation**<br>Project memory was split across `PROJECT.md`, legacy ledgers (`docs/legacy/`), and external docs. | High | **RESOLVED IN M0** | M0 establishes `docs/INDEX.md` and the v1.2 canonical suite as the single source of truth. All legacy files consolidated under `docs/legacy/` with historical headers. |
| **RISK-004** | **Offline Production Build Secret Suppression**<br>A0V verified that `pnpm run build` succeeds cleanly offline because `lib/env/server.ts` suppresses missing-secret checks during `phase-production-build`. This proves build/compilation integrity, not live production runtime integration. | Medium | **ACCEPTED FOR DEV** | Live credentials and integration health (PostgreSQL, Upstash Redis, Resend) will be validated at staging/release verification. |
| **RISK-005** | **Production Serving Older Commit**<br>Live production `https://ycnlabs.com` serves commit `6a017e01e39da8d68bcca6475bbbbc6dc82821f0`, which runs an older monorepo architecture. | Medium | **ACTIVE / MONITORED** | Expected during active redesign. Production remains stable while new site is verified in isolation. |
| **RISK-006** | **Client IP Hash Enumerability**<br>Unsalted `sha256(client_ip)` in rate limiter had an enumerable 32-bit IPv4 space. | High | **RESOLVED IN PHASE 9** | Replaced with server-secret-keyed HMAC-SHA-256 (`RATE_LIMIT_HASH_SECRET`). Startup schema throws in production if secret is missing. Raw IP is never stored or logged. |
| **RISK-007** | **Production Dependency Vulnerabilities**<br>Fresh dependency audit identified 8 production vulnerabilities in unpatched dependencies: Next.js RCE (GHSA-4342-x724-ch99, GHSA-5v9g-55ch-7223), Sharp libvips/libheif CVEs, and PostCSS. Old July `sharp` exception was void due to active `next/image` usage. | High | **RESOLVED IN PHASE 9** | Upgraded Next.js to 16.3.6; enforced `sharp >= 0.35.4` and `postcss >= 8.5.28` via workspace overrides. `pnpm audit --prod` now reports 0 vulnerabilities. |
| **RISK-008** | **Live Integration Verification**<br>End-to-end integration with live PostgreSQL, Upstash Redis, and Resend has not been verified against live external staging endpoints due to missing environment credentials. | High | **RELEASE BLOCKER / BLOCKED ON CREDENTIALS** | Mocked/isolated test suites verify durable persistence before visitor success, non-PII error categorization, and recovery paths (118/118 tests pass). Live staging run remains blocked until credentials are provided. |
| **RISK-009** | **Data Retention Policy Status**<br>Lead and log retention periods require formal Owner ratification before automated deletion jobs run. | Medium | **RELEASE BLOCKER / PENDING OWNER RULING** | Technical Redis dedupe TTL is active at 10 minutes. Lead purge automation is held pending Owner ruling. |
| **RISK-010** | **Asset Protection & CDN Boundaries**<br>Public website assets cannot be made cryptographically non-downloadable in browser runtimes. | Low | **ACCEPTED / CDN BLOCKED** | Private masters remain outside Git/public. Derivatives served with sensible caching and no download UI. Hotlink protection/signed URLs remain BLOCKED ON CDN CONFIGURATION. |
| **RISK-011** | **Homepage Mobile Lab Performance**<br>Current lab median across 3 consecutive Lighthouse mobile runs: Score 93, LCP 2.63s, CLS 0.032. Lab target is Score ≥95, LCP ≤2.5s, CLS ≤0.1. CLS passes cleanly; Score/LCP represent simulated mobile 4G CPU/network throttling ceiling preserving brand animation fidelity. Field CWV: INSUFFICIENT DATA. | Medium | **RELEASE BLOCKER / OWNER ACCEPTANCE REQUIRED** | Requires Owner review and acceptance of lab mobile performance profile prior to production release. |

---

## 2. Technical Debt Register

| Debt ID | Description | Area | Impact | Planned Resolution |
|---|---|---|---|---|
| **DEBT-001** | **Legacy `__dirname` in `vitest.config.ts`**<br>`vitest.config.ts` previously used CommonJS `__dirname` in native ESM mode. | Tooling / Config | Low | **RESOLVED IN PHASE 9** via `import.meta.dirname`. Zero ESM deprecation warnings. |
| **DEBT-002** | **Thin Automated UI Component Test Coverage**<br>Repository has automated API route tests (`contact-api.test.ts`), but lacks component-level render/interaction tests for core customer UI. | Testing / QA | Medium | Expanded test suite to 118 automated tests across 9 suites covering API, security headers, HMAC keys, and components. |
| **DEBT-003** | **Obsolete Scene 5 Task References**<br>Historical task lists referred to rebuilding Scene 5, whereas `site-v2` collapsed the monorepo scenes into `WhatWeBuild.tsx` and `HowItConnects.tsx`. | Governance / Planning | Low | Resolved in M0 by re-scoping A1/A2 to customer-facing replacement components. |
| **DEBT-004** | **Unmatched Semantic Token in BuyerFAQ**<br>BuyerFAQ dark section background `#0A0E17` has no matching semantic token. | Design System / Styling | Low | Resolved in Phase 6: All components use canonical tokens (`var(--bg-canvas)`, `var(--bg-surface)`, etc.). |
| **DEBT-005** | **Logo Master Scalability Debt**<br>Current raster logo sources have large pixel grids (5620×4580), but measured effective optical detail sits in the ≈1254–1600 px band under Brand Record §6 round-trip testing. They do not satisfy true-detail 4K/8K master objective for unrestricted large-format presentation. | Brand Assets / Resolution | Low (Current Presentation) / Medium (Large 4K+ displays) | **BLOCKED ON OWNER-SUPPLIED SOURCE.** Raster assets remain production assets until Owner supplies official vector/source masters. |
| **DEBT-006** | **Dual-Theme Presentation Asset Prefetch (~800 KB)**<br>Previous unoptimized presentation derivatives prefetched ~800 KB on initial load. | Performance / Network | Medium | **RESOLVED IN PHASE 9:** Removed `priority` from delayed entrance images and enabled Next.js AVIF/WebP image optimization. Transfer reduced from 148 KB to 66 KB. |

---

## 3. Working Practices

- **Targeted Rollbacks Only:** Blanket `git clean -fd` is strictly prohibited as a rollback method. Rollbacks must target exact file manifests only (targeted `git restore` and targeted deletion of explicitly listed untracked paths) to avoid destroying unrelated untracked work.
- **Evidence Immutability:** Filed evidence reports in `evidence/` are strictly immutable. Corrections and addenda must be filed as new numbered files (e.g., `02_...`, `03_...`), never direct in-place edits to original filed reports.
