> [!NOTE]
> **HISTORICAL REFERENCE ONLY — NOT ACTIVE PROJECT AUTHORITY**
> This document is preserved for engineering provenance and historical record.
> It has been superseded by the **YCN Canonical v1.2** specification suite.
> For current active project specifications, task queues, and architecture, consult [`docs/INDEX.md`](../INDEX.md).

---

# Production Release & Rollback Checklist

This document details required GitHub branch protection policies, pre-release verification steps, and automated/manual rollback protocols for YCN Labs.

---

## 1. Required GitHub Branch Protection Settings (Repository Owner Tasks)

The repository owner must configure the following rules on the `main` branch under **Repository Settings ➔ Branches ➔ Branch Protection Rules**:

- [x] **Require a pull request before merging:**
  - Minimum 1 approving review required.
  - Dismiss stale pull request approvals when new commits are pushed.
- [x] **Require status checks to pass before merging:**
  - Status check name: `Verify Quality Gates` (from `.github/workflows/ci.yml`).
  - Require branches to be up to date before merging.
- [x] **Require linear history:** Enforce rebase or squash merging to maintain a clean git log.
- [x] **Do not allow bypassing the above settings:** Include administrators in protection rules.
- [x] **Restrict who can push to matching branches:** Only authorized studio maintainers.

---

## 2. Pre-Release Verification Checklist

Before triggering a production deployment:

1. **Local Quality Gate Verification:**
   ```bash
   pnpm install --frozen-lockfile && pnpm lint && pnpm check-types && pnpm test && pnpm build && pnpm test:e2e
   ```
2. **Environment Variable Audit:** Ensure all production operational secrets are set in Vercel project environment variables (`DATABASE_URL`, `RESEND_API_KEY`, `LEAD_DESTINATION_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`).
3. **Database Migration Verification:** Ensure `apps/web/lib/db/migrations/` contains generated SQL files matching `schema.ts`.

---

## 3. Production Rollback Procedure

If a critical incident or regression occurs post-deployment:

### Step 1: Immediate Instant Rollback (Vercel Console)
1. Open the Vercel Project Dashboard ➔ **Deployments** tab.
2. Locate the last known healthy deployment prior to the incident.
3. Click the **`...`** menu and select **Instant Rollback**.
4. Confirm rollback. Traffic routes to the prior build artifact within seconds.

### Step 2: Identify Failed Commit & Isolate Root Cause
1. Identify the failing git commit SHA: `git log -n 5 --oneline`.
2. Revert the broken commit locally: `git revert <failed-commit-sha>`.
3. Open a fix PR containing the revert and trigger CI verification.

### Step 3: Failed Database Migration Handling
- Drizzle migrations use additive/non-destructive schemas.
- If a migration added a column/table, instant application rollback will not break reading from existing columns.
- If a destructive schema change failed, execute a compensating rollback SQL script manually using `pnpm --filter web db:migrate` or directly on the PostgreSQL host console.

---

## 4. Designated Release Approvers

- **QA/release owner:** `hello@ycnlabs.com`
