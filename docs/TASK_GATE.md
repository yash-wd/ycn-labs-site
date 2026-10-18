# YCN Task Gate — read before starting or resuming ANY task
Authority: pointers only. If this page disagrees with a file it points to, the file wins; fix this page.
Applies to all seats. AGY may not begin a step until the step above it has evidence.

## 0. Day gate (once per day, before any task)
- CLOSE_PROTOCOL.md §3 cold-start: raw `git fetch`, `status --porcelain`, `branch -vv`, `ls-remote` for all 3 repos,
  each branch vs its OWN upstream. Dirty tree or upstream mismatch = STOP.
- Read today's generated brief (tools/cold-start-brief, with the vault owner-addendum). Chat memory is MEMORY, never evidence.
- Check LAST_CLOSE.txt vs ls-remote. Any branch moved after close = DAY REOPENED; record before working.

## 1. Files to read for every task (pinned SHA, in this order)
AGENTS.md → docs/START_HERE.md → docs/STATE.md (§2 + Last Session) → docs/BACKLOG.md (your task line)
→ docs/YCN_OWNER_INSTRUCTIONS_REGISTER.md (OI-01…, DEV-…) → docs/YCN_DECISIONS.md (search your task ID)
→ docs/YCN_MASTER_PLAN.md §14 (your task's scope + exit evidence).

## 2. Files to read when the task touches…
- Any UI/visual: docs/YCN_DESIGN_SYSTEM.md (wins), docs/YCN_DESIGN_TO_CODE_CONTRACT.md, app/globals.css (note its SHA).
  Frozen systems (VF19, INPUT-GATE-01, NAV-07, POLISH-TYPE-01, HOME-01C): Owner ruling required before any change.
- Contact/leads/email/data: docs/YCN_SYSTEM_ARCHITECTURE.md (11a), Task 12 acceptance criteria.
- Brand/logo: RULING-01 — only the 8K master is approved; derivatives need an Owner sitting.
- Historical repo: never git-merged into V2; copy-only intake.
- Deletion/moving of anything: Owner-approved manifest first (OI-16 for artifacts).

## 3. Legal triggers (if the task touches the row, the check is mandatory before PASS)
| Task touches | Check | Reference |
|---|---|---|
| Personal data (form, DB, logs, analytics) | Standalone itemised notice; purpose; 12-month retention executed; privacy@ contact; no bundled consent | DPDP Act 2023 + Rules 2025 (phased to ~May 2027); lawyer confirms specifics |
| Public claims about YCN (copy, metadata, case studies) | Every claim traceable in the claims register; no unverifiable "scale/years/offices" | Consumer Protection Act 2019 misleading-ads; live-claims hotfix precedent |
| Outbound email | SPF/DKIM/DMARC verified; transactional vs marketing separated; unsubscribe on marketing; no open-tracking automation | Gmail/Yahoo sender rules; OI-19 |
| Analytics / tracking | Cookieless, aggregate, no identifiers; disclosed on privacy page; identifying tracking = NEVER | OI-19; DPDP |
| WhatsApp / push / offers | Channel-specific OFF-by-default opt-in; iOS push only via home-screen + gesture | OI-19; WhatsApp Business policy |
| Hosting / spend | Commercial use needs Vercel Pro; stay inside ₹5,000/month unless Owner authorises | DECISION-052 |
| Copying/using third-party assets or code | Licence recorded in the task checklist | — |

## 4. OI-18 demo gate
GPT or Claude authors `proof/<task-id>/DEMO-vN.html` (single file, offline, both themes, 375px + desktop, Demo Card,
tokens SHA noted). Owner says `demo pass` / `demo change: …` / `demo drop`. AGY never authors or edits demos.
Demo pass ≠ frozen-system ruling ≠ implementation pass. Exempt: Tier-2 trivia and Owner-waived emergencies (record the waiver).

## 5. Evidence
`proof/<task-id>/CHECKLIST.md` + append-only `log.txt` before the first command. Nothing ticked without raw output.
Deviations → register DEV-nn same day. Artifacts → OI-16 intake (name, size, SHA-256, destination).

## 6. Review and words
Tier 1 (push to main, deletion, customer data, legal text, deploy, spend): three seats, one review of the finished package.
Tier 2 (everything else): one reviewer, alternating GPT/Claude, one review. (Tier split binding only after Owner rules `lean`.)
Owner words are the only authorisation. pnpm only. No `rm -rf`, no `git checkout` of uncommitted work, no inline file rewrites.

## 7. STOP conditions
Conflicting evidence · missing Owner word · frozen system touched · legal row unchecked · dirty worktree · artifact without intake.
