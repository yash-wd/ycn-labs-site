# YCN Labs — Owner's Complete Two-Repository Working Routine

**Permanent working guide | Version 1.0 | Prepared 13 October 2026**  
**Purpose:** A simple, repeatable routine for working with GPT, Claude and AGY on the **YCN Labs website and brand identity**, from the current checkpoint to final delivery, without repeatedly sharing old chats, files, or decisions.

> **Quick rule:** **START → SELECT ONE TASK → PLAN → REVIEW → AGY EXECUTES → VERIFY → APPROVE → SAVE → CLOSE.**  
> The GitHub repositories hold the current project records. The local vault holds protected historical and sensitive files. A past chat is never the source of truth.

---

## 1. The routine in one minute

| When | What you do | What the AI team must do |
|---|---|---|
| **Start a session** | Say **“RESUME YCN LABS”** and paste the startup message from §4. | Open the two repository start documents, inspect the latest Git state, and report exactly one next task for each workstream. |
| **Choose work** | Say **“WORK ON LOGO”** or **“WORK ON WEBSITE”**; approve an identified task. | Work on **only that task**. Do not restart historical work or make unrelated changes. |
| **Before execution** | Review GPT's proposed bounded task and Claude's verdict. | GPT scopes; Claude checks safety/scope; AGY waits for authorization. |
| **During work** | Give decisions when required; inspect proofs. | AGY performs the task, preserves originals, provides real evidence and stops at its authorized boundary. |
| **When work passes** | Approve the actual result and the specific release or push under the current charter. | Commit and publish only approved changes, verify remote commit and tests. |
| **End of session** | Say **“CLOSE”** to AGY. | Reconcile registered file locations, organize new files, check hashes, safely clean eligible duplicates, update both project states, publish authorized housekeeping changes, verify both remotes, and return **CLOSED** or **CLOSE BLOCKED**. |
| **Return any time later** | Start again with **“RESUME YCN LABS”**. | Read the **latest committed state**, not the state remembered from an older conversation. |

**You are not expected to run Git commands yourself.** AGY executes them on the Linux machine; Claude reviews evidence; you approve choices and final creative results.

---

## 2. Understand the three locations — only two are active GitHub repositories

### A. Website repository — `ycn-labs-site`

- **GitHub:** https://github.com/yash-wd/ycn-labs-site
- **Linux:** `/home/ycn-labs/Desktop/ycn-labs-site/`
- **Contains:** Website components and code, content, public-ready assets, configuration excluding secrets, tests, project decisions and the website roadmap.
- **Canonical start:** [`docs/START_HERE.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/START_HERE.md)
- **Current status:** [`docs/STATE.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/STATE.md)
- **Next work queue:** [`docs/BACKLOG.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/BACKLOG.md)
- **Agent rules:** [`AGENTS.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/AGENTS.md)
- **Permanent CLOSE specification:** [`docs/CLOSE_PROTOCOL.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/CLOSE_PROTOCOL.md)
- **Read-only close inspection:** `tools/close-preflight.sh`

**Website rule:** Do not replace live logo assets, alter frozen components or deploy to production simply because the brand work advanced. Brand-to-website integration is a **separately approved task**.

### B. Brand repository — `ycn-labs-brand-library`

- **GitHub:** https://github.com/yash-wd/ycn-labs-brand-library
- **Linux:** `/home/ycn-labs/Desktop/YCN_LABS_MASTER/01_CURRENT_PROJECT/YCN_LABS_BRAND_LIBRARY/`
- **Contains:** Official logo source files, immutable reference, transparent candidates, historical vector attempts, palette study, usage rules, QA evidence, source ZIP, AI handoffs, release manifests and continuity documents.
- **Most important entry:** [`14_CONTINUITY/RESUME_HERE.md`](https://github.com/yash-wd/ycn-labs-brand-library/blob/main/14_CONTINUITY/RESUME_HERE.md)
- **Source of logo authority:** [`00_GOVERNANCE/CURRENT_SOURCE_AUTHORITY.md`](https://github.com/yash-wd/ycn-labs-brand-library/blob/main/00_GOVERNANCE/CURRENT_SOURCE_AUTHORITY.md)
- **Open decisions:** [`14_CONTINUITY/OPEN_OWNER_DECISIONS.md`](https://github.com/yash-wd/ycn-labs-brand-library/blob/main/14_CONTINUITY/OPEN_OWNER_DECISIONS.md)
- **Brand-specific close rules:** [`14_CONTINUITY/CLOSE_PROTOCOL.md`](https://github.com/yash-wd/ycn-labs-brand-library/blob/main/14_CONTINUITY/CLOSE_PROTOCOL.md)
- **Integrity check:** `sha256sum -c 14_CONTINUITY/SHA256SUMS.txt` (run from the brand repository root).

**Brand rule:** All *new, unapproved* logo designs remain candidates. No one promotes them to `04_APPROVED_LOGO_VARIANTS/` or publishes them to the website without your approval of the actual file/version.

### C. Protected local vault — not a third active work repository

- **Linux:** `/home/ycn-labs/Desktop/YCN_LABS_MASTER/`
- **Contains:** Large and sensitive archives, historical/recovery material, private site/security audits, intake records and protected local references.
- **Latest close marker:** `YCN_LABS_MASTER/LAST_CLOSE.txt` (local-only; verify GitHub HEADs independently).
- **Protected Desktop original:** `/home/ycn-labs/Desktop/Main_YCN_LABS_logo_black_8K.png` — **never delete**.
- **Backup:** Vault backup status is reported at every CLOSE. Copy the protected vault to a separate external device, verify the copy, and have AGY update this status. A GitHub repository is not a substitute for this backup.

Both active repositories are currently **public**. Never put credentials, security weakness reports, private customer data, or other sensitive material in either repository. The brand repository's public status is a **temporary collaboration decision**, not a waiver of confidentiality rules.

---

## 3. Project responsibilities — who does what?

| Role | Responsibility | Must never assume |
|---|---|---|
| **You — Owner** | Decide priorities, approve scope, visually judge logo/site changes, authorize releases and exceptional operations. | That an AI's “PASS” automatically means you approved the artwork. |
| **GPT — strategy/task designer** | Read active state, explain options, prepare one clear bounded AGY task with acceptance criteria. | That an old conversation or a generated preview supersedes repository decisions. |
| **Claude — independent reviewer** | Check proposed work, inspect real commands/diffs/metrics, identify risks, issue **PASS / HOLD**. | That an AGY narrative summary proves every claim without evidence. |
| **AGY — Linux execution seat** | Read current rules, run approved commands, create/verify files, commit under the charter, publish when permitted, report paths/hashes and stop. | That it may silently redesign the logo, delete protected history, deploy, or skip a failed gate. |

**Normal work sequence:** **Owner chooses → GPT scopes → Claude reviews → Owner authorizes → AGY executes → Claude verifies → Owner accepts → approved code/assets are committed and pushed.**

**CLOSE exception:** The standing [`docs/CLOSE_PROTOCOL.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/CLOSE_PROTOCOL.md) allows your word **CLOSE** to authorize **safe housekeeping/status pushes**, once its required checks pass. This does **not** authorize unreviewed production code or unapproved logo artwork on `main`. Such work remains blocked or follows the permitted `wip/<task-id>` flow, with public-repository safety checks.

---

## 4. Exactly what to say at the START of every working session

Open a **new** GPT or Claude chat and paste this message. You do not need to attach yesterday's chat or upload the logo again.

```text
RESUME YCN LABS.

Read the LATEST files from BOTH repositories, not cached chat summaries:

WEBSITE:
https://github.com/yash-wd/ycn-labs-site/blob/main/docs/START_HERE.md
https://github.com/yash-wd/ycn-labs-site/blob/main/docs/STATE.md
https://github.com/yash-wd/ycn-labs-site/blob/main/docs/BACKLOG.md
https://github.com/yash-wd/ycn-labs-site/blob/main/docs/CLOSE_PROTOCOL.md

BRAND:
https://github.com/yash-wd/ycn-labs-brand-library/blob/main/14_CONTINUITY/RESUME_HERE.md
https://github.com/yash-wd/ycn-labs-brand-library/blob/main/00_GOVERNANCE/CURRENT_SOURCE_AUTHORITY.md
https://github.com/yash-wd/ycn-labs-brand-library/blob/main/14_CONTINUITY/OPEN_OWNER_DECISIONS.md

Report, briefly:
1. Last verified close and actual current main commit for BOTH repos.
2. Exactly ONE next authorized task per workstream (or NONE).
3. Open Owner decisions/blockers.
4. Items marked SUPERSEDED, which must NOT restart.
5. Any uncommitted or unpushed work that AGY must check locally.

Do NOT start implementing. Wait for me to select LOGO or WEBSITE.
```

**Ask AGY additionally:** “Run the mandatory preflight from `AGENTS.md`. Compare local HEAD with GitHub `origin/main`, show clean/dirty state of both repositories and report any local-only files before starting. Do not overwrite or reset.”

**If the internet or a GitHub file is unavailable:** Stop and say which source could not be verified. Do **not** reconstruct “current status” from old chats.

---

## 5. Your daily work routine, in order

### Step 1 — Select one workstream

Say **“WORK ON LOGO”** or **“WORK ON WEBSITE.”** Choosing a workstream is **not** blanket approval for modifications. AGY should name the proposed task and ask for the necessary authorization.

### Step 2 — Request one bounded task from GPT

Example:

```text
Using the verified current repository state, prepare ONE AGY task for
[WORK ON LOGO / WORK ON WEBSITE]. Include exact scope, approved sources,
file paths, safety boundaries, evidence to return, tests, expected outputs,
and an explicit STOP point. Do not execute or include unrelated tasks.
```

### Step 3 — Have Claude review before AGY runs it

```text
Review this single AGY task against the latest AGENTS.md, Owner decisions,
source authority, repository status, and CLOSE protocol. Give PASS or HOLD,
with exact corrections. Do not execute it.
```

### Step 4 — Authorize and execute with AGY

If Claude says PASS and you agree, give AGY the reviewed task. AGY must report its starting commit, touched paths, real commands and exit codes, generated evidence, changes, known limitations and STOP status.

### Step 5 — Approve the result, not just the tool's report

- **Logo:** Inspect side-by-side artwork/overlays and file-specific version/hash. Approve or reject each candidate explicitly.
- **Website:** Inspect actual page screenshots/behavior and test results at relevant viewports and both themes; request fixes before approval.
- **Code or release:** Claude checks diff and evidence. Follow the applicable gate before any main-branch push or deployment.

### Step 6 — Save significant work as it happens

Ask AGY to place genuine working results into the canonical project folder promptly, mark approvals accurately, and record open items. **Do not wait until the last minute to preserve hours of creative or engineering work.** Use a named WIP branch or protected local vault where appropriate.

### Step 7 — Say CLOSE

At the end of your session, say **“CLOSE”** to AGY and expect the complete reconciliation described in §8—not just a goodbye message.

---

## 6. How to finish the LOGO work without changing your approved design

### Current authority — do not reselect a logo

- **Owner-ratified 6675 × 5195 source PNG:** `01_IMMUTABLE_SOURCE/Main_YCN_LABS_logo_black_8K__6675x5195.png`  
  SHA-256: `0ceebe4ccf81c478b8b2b2b6674f98ccc4dc93308c8a0e053243984c3a2c2be3`.
- **Preserved uploaded 2048 × 1593 reference:** `01_IMMUTABLE_SOURCE/Main_YCN_LABS_logo_black_8K.png`  
  SHA-256: `8b982547e2c0b5990b710941d29ada29cadfcf6142278998ddf10ae0ace1d943`.
- **5620 × 4580 dark/light transparent candidates:** Located under `11_HISTORICAL_ASSETS/masters/`; pending final Owner decisions.
- **Historic SVGs g211/g212 and earlier vectors:** Unapproved candidate/reference files, **not** release masters.

**Do not use AI generation or an unreviewed auto-trace to redraw your official mark.** Your logo's crescent, constellation lines, orbital rings, custom lettering, gradients, glow and flare must be preserved. Scalable geometry requires a properly reviewed professional vector master; a PNG embedded inside an SVG is still raster artwork.

### The remaining logo stages

| Stage | Task | What closes this stage |
|---|---|---|
| **A — visual ruling** | Review [`RULING-02-SHEET.png`](https://github.com/yash-wd/ycn-labs-brand-library/blob/main/08_QUALITY_AND_EVIDENCE/RULING-02/RULING-02-SHEET.png) with [`RULING-02-NUMBERS.txt`](https://github.com/yash-wd/ycn-labs-brand-library/blob/main/08_QUALITY_AND_EVIDENCE/RULING-02/RULING-02-NUMBERS.txt). Decide **02a dark** and **02b light** separately. | Your written approval/rejection of the **exact candidate filename and hash** is registered. Strong image metrics do not equal automatic approval. |
| **B — raster exports** | After relevant master approval, execute **BRAND-EXPORT-05**: approved PNG/web/app/favicons/social/OG/slide/print raster sizes. | Validated export matrix, correctly proportioned assets, legibility tests, reproducible build instructions, manifest/checksums and Owner approval. Tiny icons may need a separately approved simplified mark. |
| **C — scalable vector** | Commission or authorize a skilled vector artist to draw a faithful layered **SVG/AI** master using the ratified source as a locked underlay, with matching gradients/filter treatment. | A genuine vector/hybrid declaration, rendered comparison at key regions, high-zoom proof, file hashes and your written visual approval. **This stage is not finished yet.** |
| **D — final brand rules** | Approve design tokens/color profiles, safe space, minimum sizes, dark/light usage, monochrome only if designed/approved, accessibility, print/reproduction rules. | Signed-off brand guide and controlled release record. Provisional sampled colors are not automatically your final palette. |
| **E — website integration** | Under a **separate website task**, switch `BrandLogo`/relevant assets to an approved brand release and verify all themes, resolutions and viewports. | Site tests, build, screenshots, rollback, review and separate Owner release authorization. |
| **F — archive and private migration** | After the final brand files and checks pass, preserve tags, manifests and history in the intended private long-term repository. | Verified private transfer and backups **before** any decision to delete the temporary public brand repo. Public copies already downloaded may remain elsewhere. |

The current logo task is always the one named in brand 14_CONTINUITY/RESUME_HERE.md.

---

## 7. How to finish the WEBSITE work without losing the current site state

- Begin with `docs/START_HERE.md`, `docs/STATE.md`, `docs/BACKLOG.md` and `AGENTS.md` in the **website** repo.
- The current website task is always the one named in docs/STATE.md.
- The latest website state, not a generic roadmap, determines the next task. Other known backlog items include responsive Capability-03 corrections, remaining homepage/service/enquiry work, and final accessibility/release gates.
- Follow the site's existing safety rules and frozen-system list. Do not change entrance, navbar, typography or hero behavior outside an approved bounded task.
- For actual website code changes, AGY runs the required lint/typecheck/tests/build and captures results. Design work also needs screenshots and visual review, including accessibility/reduced-motion checks as applicable.
- Do not treat a green development build as permission to deploy to production. Production deployment, security/compliance readiness and rollback need separate approval.

### When the logo needs to appear on the website

1. Finish and approve the logo **in the brand repository** first.
2. Create an immutable, versioned approved export set with checksums.
3. Authorize a separate website integration task; copy **only the approved production assets** into `ycn-labs-site/public/brand/`.
4. Validate screenshots, tests, build, themes, sizing, favicon and social preview; approve release/rollback plan.
5. Update both repositories' status to reflect exactly which brand release was integrated.

---

## 8. What AGY must do when you say CLOSE

The **binding technical specification** is [`ycn-labs-site/docs/CLOSE_PROTOCOL.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/CLOSE_PROTOCOL.md). This section is your easy-to-follow owner checklist, not a replacement specification.

1. **Preflight:** Check both local repos and remotes; run the read-only `tools/close-preflight.sh` and capture the full candidate inventory.
2. **Collect project files:** Check registered Downloads, Desktop top level, both repo working trees, and project-specific AGY scratch. Include files generated during the session; do not scan or move unrelated personal data indiscriminately.
3. **Classify and copy:** Route brand files to the brand library, website files to the site repo, confidential/large/history material to the protected vault. Preserve original bytes, version collisions safely, and report anything unresolved.
4. **Clean duplicates safely:** Delete only eligible files in designated temporary locations **after exact SHA-256 and canonical-copy checks**. Do not delete originals, repo files or vault records. Protected Desktop logo is never removed.
5. **Refresh active truth:** Update `site/docs/STATE.md`, `site/docs/BACKLOG.md`, brand `14_CONTINUITY/RESUME_HERE.md`, asset index, approval status and checksums. Mark superseded items; record **one next task per workstream** and all blockers.
6. **Validate:** Brand `sha256sum -c`; website test suite if code changed; check file sizes, staged secret scan and any task-specific QA. Never claim a pass without supporting output.
7. **Review and synchronize:** Use explicit Git paths, correct branches and permissions; publish only permitted housekeeping/approved work. Never send unreviewed code or sensitive files to public `main`. Check remote HEAD and worktree cleanliness in both repos.
8. **Record real close:** Update local `YCN_LABS_MASTER/LAST_CLOSE.txt` **after** the remote verification, using the actual pushed commit IDs. Return **CLOSED** with evidence or **CLOSE BLOCKED** with the exact reason.

**What you should expect to see in the final AGY close message:** Date/time; file disposition & deletion summary; both repository full commit hashes; main/remote match; checksum/test evidence; any local-only/vault-backup warning; the current next authorized task for **Website** and **Brand**.

**Do not accept as fully CLOSED** a report that says the relevant changes are only committed locally or that a required review, approval or remote check is pending. Ask AGY to finish or mark **CLOSE BLOCKED** accurately.

> **Important:** `tools/close-day.sh` is the older state-only script. It is **not**, by itself, the full two-repository CLOSE procedure. Use the canonical protocol and its read-only preflight for reconciliation.

---

## 9. What to do if you come back a year later

It works the same way as tomorrow:

1. Open the **latest** [website START_HERE](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/START_HERE.md) and [brand RESUME_HERE](https://github.com/yash-wd/ycn-labs-brand-library/blob/main/14_CONTINUITY/RESUME_HERE.md).
2. Have AGY run Git preflight and compare local HEAD with remote `main`. If the local copy is behind, investigate and safely synchronize—**never force reset or discard work**.
3. Have the AI present the **last closed checkpoint**, **one current next task per workstream**, **pending decisions**, and **superseded tasks**. The elapsed time is irrelevant.
4. Select a workstream and run the single-task review/execution workflow in §§4–5.

**A previous “next task” is not permission to execute it.** Confirm it remains current and receive your approval before implementation. If the repository went private, use your authorized GitHub access instead of assuming a public link will work.

---

## 10. Final project-completion and archive procedure

**Brand completion gate:** Authoritative original preserved; exact production artwork approved; both required theme strategies resolved; vector deliverable finished if you require true unlimited scaling; full-size export suite validated; colors/guidelines documented; reproducible manifests/hashes; website release completed if in scope; final Owner sign-off and backup verified.

**Website completion gate:** Required features and content verified; privacy/security/compliance checks met; accessibility and responsive QA passed; all approved images and logos integrated; functional enquiry paths tested; deployment and rollback approved; live release checked; final Owner sign-off recorded.

**After each workstream is complete:** Tag its immutable final release, publish final documentation, confirm backups and ensure `RESUME_HERE.md`/`STATE.md` say **COMPLETE** rather than “next task pending.” Historical material stays archived and clearly labeled, not silently erased.

**Final brand-repository privacy transition:** Prepare the new private destination, migrate **all needed assets, tags and history**, run checksums/fresh clone tests, confirm future AI authorized access, then separately approve any public-repository deletion. Deleting the public repo cannot retract existing public forks/downloads/caches.

---

## 11. Current verified checkpoint (snapshot, NOT a future source of truth)

Current state is never written here. Read docs/STATE.md and brand 14_CONTINUITY/RESUME_HERE.md.

---

## 12. How to keep this one guide available permanently

**Recommended canonical placement:**

`ycn-labs-site/docs/YCN_LABS_OWNER_WORKING_ROUTINE.md`

Give AGY this downloaded guide and ask for a **docs-only** task to copy it there, add a short link in `docs/START_HERE.md`, and add a pointer from brand `14_CONTINUITY/RESUME_HERE.md`. Keep **one canonical copy** rather than two diverging manuals. Follow the usual review and push rules. No logo or website functionality should change just to install this guide.

The detailed technical source of truth remains the current `AGENTS.md`, `docs/CLOSE_PROTOCOL.md`, Owner rulings and current repository state. **If rules change, update the canonical guide through a reviewed documentation task; never silently treat this static file as higher authority.**

### The three phrases you need to remember

> **RESUME YCN LABS** — Load both repositories' latest verified state.  
> **WORK ON LOGO / WORK ON WEBSITE** — Choose one bounded approved task.  
> **CLOSE** — Reconcile, preserve, safely clean, update, verify and push under the approved protocol; report CLOSED or BLOCKED.

**That's the complete repeatable routine until both projects are formally finished.**
