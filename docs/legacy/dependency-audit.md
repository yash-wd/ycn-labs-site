> [!NOTE]
> **HISTORICAL REFERENCE ONLY — NOT ACTIVE PROJECT AUTHORITY**
> This document is preserved for engineering provenance and historical record.
> It has been superseded by the **YCN Canonical v1.2** specification suite.
> For current active project specifications, task queues, and architecture, consult [`docs/INDEX.md`](../INDEX.md).

---

# Production Dependency Audit Findings

**Date:** 2026-07-30
**Status:** Reviewed. Written exceptions accepted for all outstanding findings. No upgrades applied, by ruling.
**Supersedes:** the 2026-07-22 revision of this file, which recorded 23 vulnerabilities and a `shadcn` production-dependency finding. Both were incorrect against the current tree. See §5.

---

## 1. Vulnerability Findings (`pnpm audit --prod`)

**Total: 5 findings — 4 high, 1 moderate.** No critical and no low findings were reported.

| Package | Severity | Finding | Advisory |
|---|---|---|---|
| `sharp` | high | Inherited vulnerabilities in libvips | GHSA-f88m-g3jw-g9cj |
| `postcss` | high | Arbitrary file read and information disclosure | see advisory in audit output |
| `postcss` | high | Path traversal in previous source map | see advisory in audit output |
| `postcss` | moderate | XSS via unescaped `</style>` in CSS stringify output | GHSA-qx2v-qp2m-jg93 |
| `brace-expansion` | high | Denial of service via unbounded expansion length | GHSA-mh99-v99m-4gvg |

Three distinct packages. All three arrive transitively; none is a direct dependency of `apps/web`.

---

## 2. Outdated Dependencies (`pnpm outdated`)

| Package | Workspace | Current | Latest | Type |
|---|---|---|---|---|
| `prettier` | Root | `3.7.4` | `3.9.6` | DevDependency |
| `typescript` | Root / Apps | `5.9.2` | `7.0.2` | DevDependency |

Neither is upgraded. TypeScript 5.9 to 7.x is a major-version jump and is a locked decision, not a patch.

---

## 3. Dependency Structure

- `shadcn` is declared in **devDependencies** (`apps/web/package.json:54`; the `devDependencies` block opens at line 42). It is a CLI and build-time tool and is not in the production dependency graph. `pnpm audit --prod` reports no `shadcn` finding and no finding for any package in its dependency chain.
- `next` is pinned to the exact version `16.2.11` (`apps/web/package.json:31`).
- `sharp` is not a direct dependency of `apps/web`; it arrives transitively through `next`.
- Lockfile (`pnpm-lock.yaml`) is maintained and every gate runs `--frozen-lockfile`.

---

## 4. Accepted Exceptions

All three exceptions below share one expiry: **the next Next.js patch or minor upgrade, or 22 October 2026, whichever comes first.**

### 1. `sharp` (GHSA-f88m-g3jw-g9cj, high)

- **Path:** transitive via `next@16.2.11`.
- **Non-reachability:** image optimization is not in use. `apps/web/next.config.js` contains no `images` key, therefore no `remotePatterns`, no custom loader and no `unoptimized` flag. No `next/image` import and no `<Image>` element exists in `apps/web/app` or `apps/web/components`. Static assets only; no user-uploaded or server-transformed images.
- **VOID CONDITION:** this exception is void the moment remote image optimization, a custom image loader, or any user-supplied image processing is enabled. Re-audit before enabling any of them.
- **Verification scope, stated honestly:** the reachability check covered `*.tsx` under `apps/web/app` and `apps/web/components`, and read `apps/web/next.config.js`. A usage in another file extension, under `packages/`, or an image config injected from another source would not have been detected.

### 2. `postcss` (3 findings: 2 high, 1 moderate)

- **Path:** transitive via `next@16.2.11`.
- **Non-reachability:** build-time CSS tooling only. It never appears in the runtime request path. All three findings require processing untrusted CSS input; this project compiles only first-party CSS at build time.

### 3. `brace-expansion` (GHSA-mh99-v99m-4gvg, high)

- **Path:** transitive via `@sentry/bundler-plugins` → `glob` → `minimatch` → `brace-expansion`.
- **Non-reachability:** the Sentry bundler plugin runs at build time to upload source maps. It is not part of the deployed runtime, and the vulnerable expansion path processes glob patterns authored in this repository, not user input.

---

## 5. Corrections to the previous revision

The 2026-07-22 revision of this file was wrong in four places. Recording them rather than silently overwriting:

1. It reported **23 vulnerabilities (2 Low, 9 Moderate, 12 High)**. A fresh `pnpm audit --prod` reports **5 — 4 high, 1 moderate**.
2. It stated `shadcn` was "listed as a production dependency." It is in `devDependencies`. The same document contradicted itself on this point between its §1 and §3.
3. It recorded a finding against **Next.js 16.2.0** recommending an upgrade to `>=16.2.5`. The declared version is **16.2.11**, which already satisfies that floor. No Next.js advisory appears in the current audit.
4. It carried exceptions for `sharp` and `postcss` only. `brace-expansion` was unexceptioned.

**Why this matters beyond bookkeeping:** V3 §19 gates "dependency findings reviewed," and this document was the evidence for that gate. For several days the gate was failing against a vulnerability count roughly four times the real one, while a genuinely unexceptioned package went unrecorded. A wrong audit document is itself the defect.

---

## 6. Re-audit trigger

Re-run `pnpm audit --prod` and revise this document on any of: a Next.js upgrade, a Sentry SDK upgrade, enabling image optimization, adding any direct production dependency, or 22 October 2026.
