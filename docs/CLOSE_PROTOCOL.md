# YCN Labs — Permanent Close, Consolidation & Cold-Resume Protocol

**Protocol Identifier:** `YCN-CLOSE-PROTOCOL-01`  
**Document ID:** `docs/CLOSE_PROTOCOL.md` (Canonical Specification)  
**Effective Date:** 2026-10-13  
**Controlling Authority:** Standing Owner Directive  
**Applies To:** All future YCN Labs work sessions, developers, and AI agents (GPT, Claude, AGY, Gemini) across all repositories.

---

## Standing Owner Rule

Whenever the Owner says **CLOSE**:
1. AGY / the active agent must complete a **full project reconciliation**, not merely stop working or output a chat summary.
2. The procedure must collect newly generated files, organize them into canonical locations, identify and eliminate redundant verified duplicates, synchronize approved repository states to GitHub, and establish a bulletproof **cold restart point**.
3. A future session starting tomorrow, next month, or a year later must be able to resume accurately from repository files alone, without access to conversational transcripts.
4. **The Owner's word CLOSE authorizes pushing housekeeping and close commits to `main`**, provided tests/checks pass and no unreviewed code or unapproved artwork is introduced. Unreviewed work-in-progress routes strictly to a `wip/<task-id>` branch.

---

## 1. Registered Working Locations & Architecture

The YCN Labs project operates across three tightly bounded locations:

1. **Website Repository (`ycn-labs-site`):**
   - GitHub: `https://github.com/yash-wd/ycn-labs-site`
   - Local Path: `/home/ycn-labs/Desktop/ycn-labs-site/`
   - Scope: Website source code, components, tests, configuration, approved web assets, and public technical documentation.
2. **Brand Library (`ycn-labs-brand-library`):**
   - GitHub: `https://github.com/yash-wd/ycn-labs-brand-library`
   - Local Path: `/home/ycn-labs/Desktop/YCN_LABS_MASTER/01_CURRENT_PROJECT/YCN_LABS_BRAND_LIBRARY/`
   - Scope: Authoritative original logo masters, candidate derivatives, color specifications, design guidelines, release QA gates, and AI continuity files.
3. **Local Private Vault (`YCN_LABS_MASTER`):**
   - Local Path: `/home/ycn-labs/Desktop/YCN_LABS_MASTER/`
   - Scope: Protected history, sensitive material (e.g. security audits, credentials), large assets (>25 MB), raw proof frames, and offline backups.
   - **Privacy Boundary:** Never commit the vault to GitHub. Both repositories are public; confidential audits and large intake archives remain strictly local.

---

## 2. Mandatory Pre-Close Procedure (Step-by-Step)

When **CLOSE** is issued, execute the following steps in sequence:

### Step A: Inventory Candidate Files
Scan **only registered working locations**:
- `~/Downloads` (recursive)
- `~/Desktop` (top-level only)
- Both active repositories (`git status`, untracked, uncommitted, unpushed)
- AGY scratch directories (`~/.gemini/antigravity-ide/brain/*/scratch/`)

**Candidate Filter:**
- Any file modified since `YCN_LABS_MASTER/LAST_CLOSE.txt` (or all files if `LAST_CLOSE.txt` is missing).
- Plus any file whose name matches the pattern `ycn|brand|logo|claude|gpt|agy` (case-insensitive).
- **Exclusion:** Unrelated personal files, OS system files, node_modules, and cache directories must never be touched.

### Step B: SHA-256 Identification & Duplicate Detection
Compute the SHA-256 hash of every candidate file.
- Compare against the cryptographic checksums of files in both repositories and the vault.
- If the hash matches an existing file in either repository or the vault, mark the file as an **EXACT DUPLICATE**.

### Step C: Classification & Canonical Routing
For every unique candidate file, classify and route before moving or copying:
1. **Brand Artifacts:** Official logo artwork, brand guidelines, color specifications, and AI brand handoffs → `ycn-labs-brand-library` in the appropriate numbered folder.
   - *Constraint:* New logo artwork enters **ONLY** as a candidate file under `11_HISTORICAL_ASSETS/` or `03_VECTOR_RECONSTRUCTION/`, **NEVER** directly into `04_APPROVED_LOGO_VARIANTS/`.
2. **Website Artifacts:** Website source code, components, styles, tests, and public website documentation → `ycn-labs-site`.
3. **Sensitive & Vault Artifacts:** Security audits, credentials, personal data, files exceeding 25 MB, or unclassified project items → `/home/ycn-labs/Desktop/YCN_LABS_MASTER/01_CURRENT_PROJECT/_INTAKE/<YYYY-MM-DD>/` (use `UNSORTED/` subfolder if classification is ambiguous).
4. **Unclassified Images/PDFs without YCN naming:** Do NOT move; list the path in the close report for the Owner.
5. **Non-YCN Personal Files:** Leave untouched.
6. **Copy Semantics:**
   - Always copy using `cp -p` to preserve timestamps and permissions.
   - Verify the destination file's SHA-256 hash immediately after copying.
   - Never overwrite a file with different content based on filename alone; append `__<sha8>` if a collision occurs.

### Step D: Safe Duplicate Deletion
Delete only redundant duplicates in `~/Downloads`, top-level `~/Desktop`, and AGY scratch directories.
**Strict Safety Gates Before Deletion:**
1. Destination copy exists and its SHA-256 hash is verified byte-for-byte.
2. If the destination is inside a Git repository, confirm that the file is committed and pushed to remote origin.
3. If the destination is in the vault, confirm the vault copy is intact.
4. Execute deletions strictly file-by-file using non-recursive `rm -- "exact_path"`.
5. **PROTECTED LOCATIONS (NEVER DELETED):**
   - `/home/ycn-labs/Desktop/Main_YCN_LABS_logo_black_8K.png` (Permanent physical desktop master anchor).
   - Any file inside `ycn-labs-site/`.
   - Any file inside `ycn-labs-brand-library/`.
   - Any file inside `/home/ycn-labs/Desktop/YCN_LABS_MASTER/`.

### Step E: Status Synchronization (Single Source of Truth)
Update the authoritative continuity records in both repositories:
- **Website:** `docs/STATE.md` and `docs/BACKLOG.md`.
- **Brand Library:** `14_CONTINUITY/RESUME_HERE.md` (`START_TOMORROW.md` is a 1-line pointer to it).

**Mandatory Content in Every Close Record:**
1. Exact close timestamp and current Git HEAD hashes of both repositories.
2. List of completed task IDs.
3. **Exactly ONE next authorized task per active workstream**, or explicitly `NONE`.
4. Register of pending Owner decisions.
5. Superseded tasks marked clearly as `SUPERSEDED` alongside their authorized replacement (never silently deleted).
6. Explanations for any files retained outside Git repositories.
7. **Vault Backup Status:** Report status of `/home/ycn-labs/Desktop/YCN_LABS_MASTER/` (report `LOCAL ONLY — NO EXTERNAL BACKUP` until Owner copies to an external drive).

### Step F: Verification & Quality Gates
- **Brand Library:** Verify all tracked files with `sha256sum -c 14_CONTINUITY/SHA256SUMS.txt`.
- **Website Repository:** Run quality gates (`pnpm run lint`, `check-types`, `test`, `build`) **only if website code changed** since the previous close.

### Step G: Git Commit & Remote Synchronization
- Stage files using **explicit paths only** (never `git add .` or `git add -A`).
- Scan staged text for secrets (API keys, private tokens).
- Ensure no staged file exceeds 25 MB.
- Commit message format: `close: <YYYY-MM-DD> — <summary>`.
- **Push Authorization:** The Owner's instruction **CLOSE** authorizes pushing approved housekeeping/status commits to `main`.
- Unreviewed code or unapproved artwork must be committed to branch `wip/<task-id>` and pushed, never to `main`.
- Ensure zero uncommitted, untracked, or unpushed work remains undisclosed.

### Step H: Close Completion & Report
- Update `YCN_LABS_MASTER/LAST_CLOSE.txt` with the ISO timestamp and both repository HEAD hashes.
- If all checks pass, declare **CLOSED**.
- If any check fails, declare **CLOSE BLOCKED** with the exact failure reason.
- Output the full reconciliation report containing:
  - File disposition table (Path, SHA-256, Action, Destination).
  - Deletions performed.
  - Remote verification (`git ls-remote origin`).
  - Next authorized task per workstream.

---

## 3. Cold-Resume Guarantee

When an AI agent (GPT, Claude, or AGY) starts a session weeks or years later, it must execute the following cold-start sequence:
1. Open `https://github.com/yash-wd/ycn-labs-site/blob/main/docs/START_HERE.md` and `docs/STATE.md`.
2. Open `https://github.com/yash-wd/ycn-labs-brand-library/blob/main/14_CONTINUITY/RESUME_HERE.md`.
3. Check the last close timestamp, the one authorized next task per workstream, and pending Owner decisions.
4. Ignore any task marked `SUPERSEDED`.
5. Do not invent approvals or execute historical backlog items without explicit Owner instruction.
