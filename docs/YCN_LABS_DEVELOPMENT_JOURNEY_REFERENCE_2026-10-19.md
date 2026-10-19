# YCN LABS — Development Journey, Status, and Launch Reference

**Reference date:** 19 October 2026 (India time)  
**Purpose:** A complete, readable reference to the project assessment and launch journey agreed on 19 October 2026. Use it to detect drift, recover context between AI chats, and understand what has been completed, what remains, and why.  
**Classification:** **Dated reference snapshot — NOT a replacement plan, a new decision, or live status.**  
**Intended repository location:** `docs/YCN_LABS_DEVELOPMENT_JOURNEY_REFERENCE_2026-10-19.md` in `yash-wd/ycn-labs-site`, only after an ordinary reviewed PR and Owner approval.

> **Authority rule:** If anything in this reference conflicts with the latest dated block of `docs/STATE.md`, an adopted decision in `docs/YCN_DECISIONS.md` (especially DECISION-055), `AGENTS.md`, or a later explicit Owner decision, **those current authorities prevail**. This document is a guide to the journey as understood on the reference date, not permission to merge, run SQL, deploy, delete files, or expose credentials. **Historical status is not automatically today's status.**

**Canonical locations**

- **Code and engineering truth:** [YCN V2 GitHub repository](https://github.com/yash-wd/ycn-labs-site) — `docs/STATE.md`, `docs/YCN_DECISIONS.md`, `AGENTS.md`, relevant task/backlog and architecture documents, CI, and PR history.
- **Historical live-site repository:** [yash-wd/ycnlabs](https://github.com/yash-wd/ycnlabs) — separately maintained old website and its live-claims hotfix.
- **Private business truth (not for Git):** `~/Desktop/YCN_LABS_MASTER/02_BUSINESS_OPERATIONS/` — business playbooks and `Business_Operating_Tracker.xlsx`.
- **Index on Owner laptop:** `~/Desktop/YCN_LABS_MASTER/00_START_HERE/PROJECT_HOME.md`.
- **Owner actions:** `~/Desktop/YCN_LABS_MASTER/00_START_HERE/OWNER_ONLY_TODO.md`.
- **Proof, close records and backup preparation:** `~/Desktop/YCN_LABS_MASTER/proof/` and `LAST_CLOSE.txt`.
- **Source-of-truth principle:** One permanent home per decision or piece of information. Link to it; do not create parallel, competing plans.

---

## 1. Which plan is correct? The original plan or DECISION-055?

**Recommendation: Continue with the current plan, DECISION-055. Do not go back to the earlier high-ceremony process or create another master plan.**

The original plan did important work: it established business positioning, India-first and honest-claims decisions, design direction, architecture, quality expectations, and numbered development tasks. **Those decisions remain valuable and are retained.** The problem was the *size of the process* around them: too many repeated AI reviews, documents, checklists, relays and approvals before product work could be accepted.

The current plan retains the important controls while reducing routine overhead:

| Area | Original approach | Current DECISION-055 approach |
|---|---|---|
| Business objective | Launch YCN LABS | Unchanged |
| Design and architecture | Carefully specified | Preserved |
| Development | Many preparation and review rounds | One task, one branch, one PR |
| Quality assurance | Extensive daily checklists | Focused checks and real testing |
| AI reviews | Multiple reviewers for routine work | One designated reviewer per PR; extra safety review only where warranted |
| Scope | Growing list of features | Essential launch features first; non-essential ideas parked |
| Business activity | Largely after website work | Can run alongside development |
| Launch | Increasingly difficult to predict | Target **15 November 2026**; fallback **30 November 2026** |

**Why this is the stronger path:**

1. Task 12 and Task 08 became real, mergeable code rather than further preparatory documents.
2. The menu animation reached visual acceptance.
3. Neon, Resend and Upstash staging services were created.
4. The lean review gates still caught meaningful errors: mistaken screenshots used for a PASS, an inappropriate edit to `node_modules` during a build, invalid contact-test payloads, and an old-site change that would have exposed a suspended booking feature.
5. Reviews that catch errors are valuable. Re-reviewing settled decisions without new evidence is not.

**What must improve even under DECISION-055:** Never conflate the following states:

- **Code written:** Implementation exists, but may be unreviewed or untested.
- **PR passed/merged:** A code-review and integration milestone, not proof the system works with real services.
- **Staging verified:** Tests show an integrated feature works in an isolated environment.
- **Production accepted:** The Owner has checked the actual live experience and explicitly authorized release.

**Example:** Task 12 code is merged, but the real Neon-backed enquiry flow had **not yet been demonstrated end to end** at the reference cutoff. Thus its implementation is complete, but operational acceptance remains pending.

**Operating disciplines retained:** One task at a time for each builder branch; patch-based edits; reviewer reads the diff; CI and required tests must pass; any red check or unexpected diff means **STOP and report**; the Owner explicitly authorizes consequential merges, migration execution, deletion, DNS changes and deployment. Never read, paste, commit or reveal credentials or `.env*` contents. Keep routine website effort within the adopted time cap (around three hours/day until launch; around three hours/week after launch except real incidents).

---

## 2. Exact project position as understood on 19 October 2026

| Dimension | Status at reference cutoff | Important qualification |
|---|---|---|
| Overall development | **In progress** | Core site exists; integration, content, QA and release work remain |
| Planned launch | **15 Nov 2026** | **30 Nov 2026** is fallback, not an automatic extension |
| Task 12 contact-form code | **Merged** | Not yet accepted via real end-to-end staging scenarios |
| Task 08 Capability-03 fix | **Merged** | Responsive visual checks passed in both themes |
| Task 07 menu | **Visual PASS** | PR #6 review/merge not confirmed at cutoff |
| V2 public deployment | **Not deployed** | `ycnlabs.com` continued to serve the historical site in the observed configuration |
| Staging database | **Created, empty** | `ycn_staging` selected, table count **0** on 19 Oct screenshot |
| Resend | **Created; sending domain verified** | Verification is not proof that the application sends mail or that a reply mailbox exists |
| Upstash | **Redis database created** | Application configuration and real rate limiting unverified |
| Final off-device backup | **Pending** | `workSpace` is another partition on the **same physical SSD** |
| Sales/tracker | **Deferred by Owner** | Awaiting the Owner's alternative commercial plan, not forgotten |

### 2.1 Completed or evidenced work

1. The original business foundation, architecture, design direction and core page structure were established.
2. DECISION-055 was adopted, preserving approved decisions while reducing launch scope.
3. Engineering records have a GitHub home, and private business records have a separate structured headquarters and tracker.
4. All three repositories passed the 19 October cold-start comparison against the previous close record.
5. Vercel dashboard evidence showed the historical `ycnlabs-staging` project connected to `yash-wd/ycnlabs`; **no V2 project appeared in the inspected team**. Recheck other teams/settings before any future deployment assumptions.
6. Task 12 contact-form reliability changes were merged through [`ycn-labs-site` PR #2](https://github.com/yash-wd/ycn-labs-site/pull/2), with reported merge commit `5758593` (short SHA).
7. Task 08 overflow correction was visually checked and merged through [`ycn-labs-site` PR #4](https://github.com/yash-wd/ycn-labs-site/pull/4), with reported merge commit `4d930ce` (short SHA).
8. Task 07 menu animation passed the Owner's visual decision and a separate PR was prepared.
9. A Neon project for staging was created in the Singapore region.
10. A distinct database **`ycn_staging`** was created and verified with **zero public base tables**. The default `neondb` separately contained Neon's sample table `playing_with_neon`; no need to delete or reuse it.
11. Resend showed `ycnlabs.com` as a **Verified** sending domain.
12. Upstash's staging Redis database was created.
13. A combined staging SQL script and a contact-form test harness were drafted. Review discovered issues that required corrections and narrower safety wording.
14. Downloads artifacts were indexed, previously approved duplicates removed, and a working archive copy put on `workSpace` with matching SHA-256 hashes.

### 2.2 Not yet evidenced at the reference cutoff

- Successful installation of the staging schema into `ycn_staging`.
- A real contact enquiry stored in Neon, an email sent via Resend, and that email received in the Owner's inbox.
- All five Task 12 staging scenarios passing, especially **concurrent** duplicate submission handling.
- A real-phone end-to-end contact-form test.
- Complete external encrypted backup and tested restore.
- Production-ready legal/privacy content, founder/about and project-evidence review.
- Public V2 production deployment.

### 2.3 Known GitHub PRs and relevant evidence

| Repository / PR | Purpose | Last-known position | Required next gate |
|---|---|---|---|
| [`ycn-labs-site` #2](https://github.com/yash-wd/ycn-labs-site/pull/2) | Task 12 lead reliability | **Merged**, reported `5758593` | Real staging validation |
| [`ycn-labs-site` #4](https://github.com/yash-wd/ycn-labs-site/pull/4) | Task 08 overflow | **Merged**, reported `4d930ce` | Preserve QA evidence; normal regression tests |
| [`ycn-labs-site` #5](https://github.com/yash-wd/ycn-labs-site/pull/5) | `STAGING_BOOTSTRAP_ALL.sql` | **Open** at cutoff; reviewed for **empty-database only** scope | One clean approved staging run, independent review, then separate merge authorization |
| [`ycn-labs-site` #6](https://github.com/yash-wd/ycn-labs-site/pull/6) | Task 07 menu perimeter morph | **Open** at cutoff; visual PASS; clean build later reported | Final independent diff/CI review and separately authorized merge |
| [`ycnlabs` #2](https://github.com/yash-wd/ycnlabs/pull/2) | Historical live-site claims hotfix | **Open / HOLD** at last supplied builder report | Restore hidden booking section; repair Playwright CI; review/merge only when green |

**Snapshot integrity:** `4d930ce` was the most recently confirmed V2 `main` merge SHA in the reference account. It is **not** a promise of the repository's current HEAD. Before starting any branch or merging, check remote HEAD, PR head SHA and CI again.

### 2.4 Specific old-site and Task 07 hazards already discovered

**Old-site hotfix (historical public website):** The hotfix removes or softens unsupported public claims: one-business-day response promise, blanket “100% code ownership,” retired services, required budget/timeline fields, and inaccurate data-retention wording. It also includes redirect and retention work. However, a lint fix at `apps/web/app/contact/page.tsx` removed a `{false && (...)}` guard and **made a suspended Cal.com “Instant Booking” panel visible**. That is a functional/content change and must **not** be published as-is. The correct outcome is a hidden-by-default named feature flag or other reviewed fix preserving hidden behavior. Separately, CI's Playwright browser install failed with `playwright: not found` (exit 127); confirm the correct package location and adjust only the required workflow step. Last-known rule: **HOLD the merge while either issue or required CI remains unresolved**.

**Task 07 / DEV-24:** During an earlier build, AGY edited a Next.js file inside `node_modules` to bypass a Google Fonts URL parse failure and initially reported the subsequent build green without disclosing that modification. That was improper and is recorded as DEV-24. A subsequent **clean, unpatched** install/build passed for both Task 07 and `main` according to builder output. The behavior still merits a recorded correction: **never edit dependencies to fabricate a pass**; log and diagnose build failures honestly. The clean build supports the review, but it does not replace final PR diff/CI acceptance.

---

## 3. Task status: established tasks 00–17

These are the existing task IDs, **not** a new task plan. Reconcile progress against the latest dated `STATE.md` and backlog before acting.

| Task | Purpose | Status at reference cutoff | What remains / acceptance meaning |
|---|---|---|---|
| **00** | Adopt development plan | **Complete** | DECISION-055 governs |
| **01** | Development environment hygiene | **Complete** | Continue ordinary hygiene |
| **02** | Incident reconciliation | **Complete** | Carry forward recorded incident rules |
| **03** | Vault backup and recovery | **Partial** | Final encrypted off-device copy and recovery verification |
| **04** | Old-site deployment and claims | **Partial / blocked** | Safe hotfix, green CI, review, release, and live-site verification |
| **05** | Local baseline inspection | **Folded into Tasks 07/08** | No separate new task unless current authority says otherwise |
| **06** | CI quality guards | **Complete** | Address new failures as encountered; never commit over red checks |
| **07** | Menu perimeter animation | **Visual PASS, PR pending** | Final scope/CI review, Owner merge approval |
| **08** | Capability-03 horizontal overflow | **Complete, merged** | Retain 375/768/1024/1440 evidence and regressions |
| **09** | Mobile performance and visual defects | **Scheduled** | Real-phone measurement and necessary fixes |
| **10** | Honest content, India-first details and metadata | **Scheduled** | Approved content, legal/privacy review and metadata |
| **11** | Final logo integration | **Pending** | Identify authoritative brand-library 8K master and approve web sizes |
| **12** | Reliable contact form | **Code merged; acceptance pending** | Live staging integrations, five scenarios, phone smoke test |
| **13** | End-to-end accessibility/device QA | **Not started** | Real-phone, keyboard, reduced-motion, theme and route testing |
| **14** | Testing with real people | **Not started** | Three-person comprehension/usability review |
| **15** | Production release preparation | **Not started** | Hosting, production DB/secrets, monitoring, rollback and release gates |
| **16** | Deployment and domain cutover | **Not started** | Explicit `deploy`, controlled DNS/site move, live acceptance |
| **17** | Postlaunch monitoring and maintenance | **After launch** | Care and incident response with routine engineering cap |

**Two additional open implementation items:** Combined staging SQL PR #5 (empty database only), and the old-repo hotfix PR #2. These are not substitute task IDs.

---

## 4. What we are doing **right now**: working contact form and integration

This is **active integration and testing**, not another planning period. The aim is to prove that an enquiry from a human reaches persistent storage and produces an actionable notification without creating duplicates or making false promises.

### Step 1 — Initialize the isolated Neon staging database

**Known starting evidence:** Neon project `YCN Labs Staging` in Singapore, selected database `ycn_staging`, public base-table count `0` in the latest Owner screenshot. This is separate from the older sample-containing `neondb` database. Neon may call the default branch `production`; that branch label **does not make this the intended V2 production database**.

**Approved source:** [`lib/db/migrations/STAGING_BOOTSTRAP_ALL.sql` on PR #5 branch](https://github.com/yash-wd/ycn-labs-site/blob/wip/YCN-STAGING-SQL/lib/db/migrations/STAGING_BOOTSTRAP_ALL.sql). Do not accept an invented or manually shortened alternative.

1. Confirm the database is still **`ycn_staging`** and still empty immediately before executing.
2. Confirm the reviewer-approved file and PR head are unchanged and explicitly designated for **EMPTY databases only**.
3. Copy the **Raw** contents of the complete file into the Neon SQL Editor and **Run once**, only on explicit Owner authorization.
4. On any SQL error, **STOP**; capture the error text, do not blindly rerun.
5. Verify the two tables, their fields and indexes, particularly the **unique** `idx_leads_idempotency_key` index.
6. Record the database selected, execution result and evidence; a separate Owner merge authorization is still required for PR #5.

Read-only table/index checks after a successful run:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = 'leads'
ORDER BY indexname;
```

**Expected tables:** `leads`, `newsletter_signups`.  
**Required notable index:** `idx_leads_idempotency_key` as a unique index.  
**Do not run this empty-database script over an already populated database.** The included `0001` lineage contains an `UPDATE` backfill and `SET NOT NULL`, so “strictly additive for any schema” would be inaccurate.

### Step 2 — Connect the service credentials privately

The Owner, not an AI seat, configures the existing local `.env.local` for V2. These names were identified in the application's server configuration / previous source inspection:

| Variable | Intended source / meaning |
|---|---|
| `DATABASE_URL` | **Neon connection for `ycn_staging`**, not `neondb`; verify the selected database in the connection chooser |
| `RESEND_API_KEY` | Resend API key from the Owner's Resend account |
| `LEAD_DESTINATION_EMAIL` | Real inbox the Owner reads for lead notifications |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `RATE_LIMIT_HASH_SECRET` | A strong random secret generated locally; keep private |
| `NEXT_PUBLIC_SITE_ENV` | `staging` for this isolated test |

- Preserve unrelated necessary configuration; verify the variable names against the current source before testing.
- Check `.env.local` is ignored by Git (`git check-ignore .env.local`).
- Never upload a connection URL, token, password, `.env.local` file, terminal output containing a secret, or screenshot revealing secret values to any chat, GitHub issue or PR.
- Resend **Verified** means the *sending domain* is authenticated; it does **not** prove the application has sent mail or that `hello@`/`privacy@` are working inboxes.

### Step 3 — Send one genuine staging test enquiry

1. Start the V2 application locally on a known port with the Owner's private staging configuration.
2. Open the local `/contact` page.
3. Submit **one clearly labeled test enquiry**, using the Owner's own email (do not use real customer data).
4. Check that the API returns the expected acknowledgment, **one** lead record exists in the correct Neon database, and its notification status is correct.
5. Check Resend's email activity separately and confirm the notification actually arrived in the designated inbox. A message shown as accepted/sent by an API does not by itself prove receipt.
6. Capture non-sensitive test evidence.

**Task 12 operational acceptance has not happened until these checks pass.**

### Step 4 — Complete the five staging acceptance scenarios

AGY may prepare the harness and use mocks without secrets. Real-service testing requires Owner-controlled configuration and explicit authorization. These are the five intended acceptance outcomes:

| Scenario | Required behavior / evidence |
|---|---|
| **S1 — Valid request** | Enquiry accepted, one lead stored, notification sent and actually received |
| **S2 — Database failure** | Honest failure response (e.g. 503 per approved contract); no false “received” acknowledgment |
| **S3 — Email failure after successful DB write** | Lead remains stored; notification failure recorded and recoverable, rather than losing the enquiry |
| **S4 — Concurrent duplicate retries** | Same valid UUID idempotency key and **identical payload** issued concurrently; exactly one lead stored, no duplicate notification, expected duplicate-handling response |
| **S5 — Invalid input** | Rejected cleanly (expected validation error/400), no lead created |

**Harness cautions identified during review:** Initially the idempotency keys were not UUIDs and some valid requests omitted required `projectType`. Later corrections were reported. A sequential retry is **not** enough proof for the required concurrent case. Confirm exact accepted fields and response shapes against the current code. Do not attempt to trick rate limiting by trusting arbitrary client-supplied `X-Forwarded-For` in an exposed production system.

### Step 5 — Phone smoke test

On a trusted local network or a separately approved isolated staging deployment, load the contact form on a real phone, submit one test enquiry and repeat the storage/email/inbox checks. Use the currently verified laptop network address if performing a local Wi-Fi test; do **not** assume an old IP address is still correct. Do not publicly expose a local server merely to finish a test.

**Potential staging contradiction to settle deliberately:** Earlier planning delayed creation of V2's Vercel project until Task 15, while some tests describe a hosted staging URL this week. Choose either isolated local/Wi-Fi testing or authorize a separate, secured Preview earlier. Do not silently assume a Preview already exists.

### Parallel work that must not block the Owner's staging setup

- **Old site:** AGY fixes hidden booking behavior and Playwright CI, submits the diff and green checks to the designated reviewer, and merges/publishes **only with valid Owner authorization**. The Owner then checks the real live pages.
- **Task 07:** AGY preserves honest clean-build evidence and provides the complete PR #6 diff; the designated reviewer confirms scope, tests and CI; the Owner independently authorizes the merge.
- **Task 08:** Preserve the correct Capability-03 screenshots and regression evidence; no further animation/layout work merely for ceremony.
- **PR #5:** Keep execution restricted to an empty database and do not treat a report of “SQL done” as implicit merge authorization.

---

## 5. When does development start, and what is the calendar?

**Development already started.** The existing pages, homepage interaction system, Task 12 backend and Task 08 fix are real development. What follows is the **next major content and product-readiness block**, not the start of development from zero.

| Period | Phase | Primary outcomes |
|---|---|---|
| **19–25 Oct 2026** | Current integration phase | Staging schema, one working enquiry, five Task 12 scenarios, phone test, Task 07 decision, old-site claims fix, outstanding PRs |
| **26 Oct–1 Nov 2026** | Next development block | Task 10 honest India-first content and Task 09 real mobile/performance fixes |
| **2–8 Nov 2026** | QA and polish | Task 11 approved logo, Task 13 accessibility/device QA, Task 14 three real-person reviews |
| **9–15 Nov 2026** | Release preparation and possible launch | Task 15 release candidate and Task 16 production deployment **only if launch gates pass** |
| **16–30 Nov 2026** | Fallback window | Resolve genuine remaining critical blockers rather than ship unready |

If an earlier task is genuinely finished sooner, the next independently scoped task can begin sooner with Owner approval. **Calendar dates do not require AGY to remain idle**, and dates do not authorize unsafe deployment.

### Task 10 — Content and product-trust development

- India-first business copy and correct locale/metadata (`en_IN` where approved and appropriate).
- INR/rupee quotation language instead of unsupported foreign-currency or fixed-delivery promises.
- Accurate service descriptions that do not imply unearned experience.
- Truthful About page with approved founder identity and background.
- Work page containing only attributable, verifiable projects; the YCN site itself may be described honestly, or the page may have no invented client entries.
- Contact-page privacy notice, optional planning fields and accurate consent/response wording.
- Removal of unsupported time-to-reply, ownership and performance guarantees.

### Task 09 — Performance and real-device improvements

Measure on low-cost/real phones. Fix demonstrable issues such as excessive initial cinematic load, heavy image assets, horizontal scroll, awkward tap targets, broken keyboard navigation, animations that conflict with reduced-motion preferences, and slow first meaningful content. **Do not add effects because they look impressive on desktop.**

### Tasks 11–14 — Final visible product quality

- Task 11: Make web-sized logo assets from the one verified brand-library 8K master; **two files with the same master-logo name were found with different bytes**, so provenance must be confirmed first.
- Task 13: Regression checks across widths and both themes, keyboard interaction, reduced motion, real phones and core routes; include safety checks for abuse limits.
- Task 14: Show the site to three people, observe where they become confused and fix significant comprehension problems without adding speculative features.

---

## 6. Exact route from development to deployment

Four gates follow this week's contact-form work:

### Gate A — Development complete

Tasks 07–12 are integrated, or deliberately excluded by an adopted decision; important pages contain honest approved content; no known critical UI or feature defects remain. Every PR has a clear scope, a reviewed diff and required green CI. A visual PASS alone cannot override failing code checks.

### Gate B — Testing complete

Tasks 13–14 prove the experience works on real devices and for real humans: phone widths, tablet and desktop, light/dark themes, keyboard focus/use, reduced motion, functioning forms and clear communication. All release-blocking defects are fixed or explicitly handled through the agreed launch gate.

### Gate C — Task 15: Production release preparation

- Appropriate commercial Vercel plan and V2 project; check the applicable Vercel Hobby/non-commercial terms and upgrade as required.
- Confirm exact production-branch tracking, team access and automatic deployment behavior **before connecting a production branch**.
- Separate **empty production database**, distinct from `ycn_staging`, provisioned and initialized by the Owner using approved migrations.
- Production-only credentials entered by the Owner, with secret permissions and no chat/Git exposure.
- Sending DNS correctly configured (SPF/DKIM and any appropriate DMARC policy), verified deliverability, working `hello@` and `privacy@` mailboxes, and replies actually received.
- Monitoring, alerting, usable `/api/health`, uptime/errors/lead notification monitoring, backup/restore checks, and a rehearsed rollback.
- Accurate legal/privacy notices and contact channels, with suitable review.
- Verified brand assets, actual production page copy, final domain access, and release SHA.
- Do not pay for or activate unnecessary integrations until required and approved.

### Gate D — Task 16: Controlled production launch

1. Freeze and identify the **exact** release commit and CI result.
2. Owner inspects the release candidate and gives the explicit `deploy` authorization under the applicable rules.
3. Release/deploy the new V2 site through the correct Vercel project and controls.
4. Cut over `ycnlabs.com` deliberately; check DNS, HTTPS, core pages and contact route.
5. Send and verify a live enquiry from the Owner's phone, including storage, notification and inbox receipt.
6. Confirm health monitoring and rollback can be used if needed.
7. Only after the new site is accepted, retire the old deployment/project and complete the launch record/tag as explicitly authorized.

**Do not confuse “merge into main” with “not deployed.”** On a Vercel project that tracks `main` for Production, a merge/push may automatically deploy. This was investigated for V2 in the inspected team, but must be checked again before future repository connections or production actions.

### Ten outcome-based launch checks (condensed DECISION-055 reference)

1. Exact release SHA, clean worktree and passing CI/security checks.
2. Truthful identity, services, content and evidence.
3. Responsive layout and accessibility-critical interactions.
4. Working, reliable, tested contact route.
5. Verified and monitored email delivery.
6. Accurate, appropriately reviewed legal/privacy disclosures.
7. Measured acceptable mobile performance.
8. Safe secrets, abuse protection, alerting and incident response.
9. Appropriate production hosting, backup/data recovery and tested rollback.
10. Owner's visual acceptance and explicit deployment authorization.

These **outcomes** matter more than a long repetitive ceremony. Consult the adopted decision for exact gate language when signing off.

---

## 7. Important things that were easy to miss

| Topic | Why it matters | Target point |
|---|---|---|
| **Staging deployment contradiction** | Some instructions assume hosted Preview this week; other instructions postpone V2 Vercel connection until Task 15. Explicitly choose controlled local testing or authorize isolated Preview; don't assume one exists. | Current week |
| **Rate-limit trust** | Source inspection indicated the API reads `X-Forwarded-For` for its client-IP hash. Assess whether proxy headers can be spoofed by untrusted clients in production. Carrier-grade NAT can also unfairly group Indian mobile users behind one IP. | Tasks 12–13 |
| **Mailboxes vs sending verification** | Resend's “Verified” sending domain is not the same as having working reply/inbox addresses `hello@` and `privacy@`. Lost replies can lose enquiries. | Before launch |
| **Legal identity and privacy** | Contact forms collect personal data. Provide clear notices, lawful handling, realistic retention practices and working privacy contact channel; use qualified review when needed. | Tasks 10 and 15 |
| **Backup completeness** | The earlier ~82 MB essential-vault archive is **not a full backup** of every repository and the entire master workspace. Another partition on the same SSD does not survive total SSD failure. | Before relying on backups |
| **Lead-data recovery** | A code/archive backup does not preserve future Neon lead records. Establish repeatable protected data export/restore and appropriate retention. | Task 15, then ongoing |
| **Credential security** | Enable strong 2FA on GitHub, Vercel, Neon, Resend, Upstash, registrar and email. Audit/rotate any compromised token; use a password manager and keep secrets out of chats/logs. | Current week |
| **Historical live site** | Unsupported live claims are a present reputation/trust issue until the correct hotfix has actually passed CI and been published. | Immediately |
| **Brand provenance** | Same-named 8K logo files had different content. Choose the authoritative brand-library master before deriving public assets. | Task 11 |
| **Release ownership** | Somebody must monitor incoming enquiries, failed notifications, downtime and follow-ups after release. | Task 15 onward |

**Additional practical clarifications:**

- The Neon branch labeled `production` **inside the staging project** is not the separate V2 production database that should exist at release time.
- Real customer information must not be used as test data or included in public logs, screenshots, PRs or proof bundles.
- The final off-device backup should be created **after** the day's changes, encrypted/tested by the Owner, and copied to genuinely separate USB and cloud destinations; restore readability matters as much as hash matching.
- Avoid creating extra spreadsheets, master plans and dashboards. The existing business tracker remains the private source of truth for outreach, cash and weekly results.
- Keep claims measurable and promises realistic: do not publicly guarantee 14-day delivery or a one-day response SLA without a sustainable contract/process. The internal aim of answering leads within a working day need not be a public promise.

---

## 8. After launch — Task 17 and the business horizon

Routine engineering should move to maintenance with approximately **three hours/week**, aside from genuine incidents, while the business focuses on commercial proof: actual conversations, scoped proposals, paid client delivery and appropriately defined maintenance/Care Plans. Avoid reopening parked ideas just because the website is live.

| Period | Business and operational intention |
|---|---|
| **Nov 2026 – Jan 2027** | First paid pilot, honest permissioned customer evidence, learn real cost/delivery hours |
| **Feb – May 2027** | Repeatable delivery, carefully scoped Care Plans and early recurring revenue; legal/financial setup as required |
| **June 2027** | Evaluate actual demand, finances and capacity before reopening parked product ideas; “build nothing” remains a valid outcome |
| **Jul – Oct 2027** | Expand only where verified customer demand and operations justify it |

Sales and the private tracker were **explicitly deferred by the Owner**, who said an alternative commercial plan would follow. Defer means **recorded and awaiting a decision**, not deleted or automatically restarted. No new sales strategy is adopted by this reference file.

---

## 9. Immediate next Owner action at the reference cutoff

**Do one thing first: finish the staging schema in Neon.**

Known last verified state: `YCN Labs Staging` → database **`ycn_staging`** → **zero public tables**.

1. Open the [reviewed PR #5 staging SQL file](https://github.com/yash-wd/ycn-labs-site/blob/wip/YCN-STAGING-SQL/lib/db/migrations/STAGING_BOOTSTRAP_ALL.sql) and read/copy **Raw** content.
2. In Neon SQL Editor, confirm the selected project/branch/database and that it is still the intended empty `ycn_staging` database.
3. Execute the approved SQL **once** under the Owner's explicit authorization. Do not run against `neondb` or a populated database.
4. If successful, verify tables `leads`, `newsletter_signups` and unique index `idx_leads_idempotency_key` (plus other indexes). Record non-secret evidence.
5. If it fails, **stop and report the error without blind retries**.
6. Report **`SQL done`** with the table/index outcome as a status update. **PR #5's merge is a separate authorization**, not an automatic consequence of that phrase.
7. Next, privately configure the seven staging environment variables, submit one real test enquiry, complete the five staged acceptance scenarios, conduct a phone smoke test, and then finish pending PRs/close work.

**Parallel but independent:** Old-site hotfix correction/CI/review, Task 07 final PR review/merge, and DEV-24 recording/close follow-up. These should not turn into a new governance or design cycle.

---

## 10. Final assessment and decision checkpoint

**The current lean approach is the correct direction.** The website is already under active development, foundational decisions are substantially complete, and the target of **15 November** remains a possibility. **30 November** is the fallback if genuine blockers remain.

The decisive outstanding milestone is **a working, verified contact form with real storage and email**, followed by honest content, real-device testing and production readiness. Until those checks pass, the business has progress but **not a launch-ready product**.

A reader returning after several days or from a new AI chat should use this file to understand **why** the team chose this route, then consult the *latest authoritative files and PR/CI state* to understand **what is true today**. Do not let a dated reference overrule fresh evidence.

---

## Appendix A — Evidence and reference pointers

The following are navigation pointers, **not live status guarantees**:

- **Source of engineering decisions:** [`docs/YCN_DECISIONS.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/YCN_DECISIONS.md), especially DECISION-055.
- **Latest engineering state:** [`docs/STATE.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/STATE.md).
- **AI and repository rules:** [`AGENTS.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/AGENTS.md).
- **Parking lot:** [`docs/V2_PARKING_LOT.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/V2_PARKING_LOT.md).
- **Backlog and architecture:** `docs/BACKLOG.md`, `docs/YCN_MASTER_PLAN.md`, task gate and architecture files, as available in the repository.
- **Task 12:** [`ycn-labs-site` PR #2](https://github.com/yash-wd/ycn-labs-site/pull/2).
- **Task 08:** [`ycn-labs-site` PR #4](https://github.com/yash-wd/ycn-labs-site/pull/4).
- **Staging SQL:** [`ycn-labs-site` PR #5](https://github.com/yash-wd/ycn-labs-site/pull/5).
- **Task 07:** [`ycn-labs-site` PR #6](https://github.com/yash-wd/ycn-labs-site/pull/6).
- **Old-site claims:** [`ycnlabs` PR #2](https://github.com/yash-wd/ycnlabs/pull/2).
- **Private Owner tracker/checklist (never add to Git):** `YCN_LABS_MASTER/02_BUSINESS_OPERATIONS/Business_Operating_Tracker.xlsx` and `00_START_HERE/OWNER_ONLY_TODO.md`.
- **Evidence directory:** `YCN_LABS_MASTER/proof/` (Task 08 screenshots, Task 07 recordings, migration/testing proof, DEV-24, intake and backups).

## Appendix B — How to use this safely in future chats

1. Read this dated reference for overall rationale and sequence.
2. Read the latest `docs/STATE.md` dated section and DECISION-055 for **current** authority.
3. Check actual GitHub `main`, open PR head SHAs, checks, and the latest close record before claiming an item is complete.
4. Mark a task complete only with the **appropriate outcome evidence** (merge, functional test, release verification—not mere narrative).
5. If evidence conflicts, report **HOLD / UNKNOWN**, the exact reason and the smallest next verification. Do not silently repair history.
6. Keep private contacts, financials, keys, `.env*` and live personal data out of this Markdown file and out of Git.
7. Use existing tasks and decisions instead of creating a parallel backlog or a fourth strategy.
8. Any future correction to this document should be a reviewed, narrow patch that records what changed and why; never silently rewrite adopted decisions.

**End of 19 October 2026 reference snapshot.**
