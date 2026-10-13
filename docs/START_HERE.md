# YCN Labs — Canonical Project Entry & Context

Open this file on branch `main`. Before any work run `git fetch && git status --porcelain` to verify a clean working tree aligned with `origin/main`.

> "Websites and software. Built around your business. We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving."  
> — *docs/YCN_CONTENT_SPEC.md:28-31 (Ratified DECISION-040, docs/YCN_DECISIONS.md:136-137)*

**Active Development Repository:** `https://github.com/yash-wd/ycn-labs-site`  
**Active Development Branch:** `main` (Verified starting HEAD: `5dbab54fbbba7317efe7b8f5616ae250ce16b0f5`)  
**Historical Private Reference:** `11468f4b36b3fdf451cd0bf04e5f2ee2868b45a5` (retained in `yash-wd/ycnlabs` on `site-v2`; preserved strictly for historical/recovery records)  
**Local Vault Isolation:** Backups, business records, and raw proof frames remain in a local private vault outside GitHub.  
**Production Deployment:** NO production deployment is authorized during active development.

---

## 1. Document Authority (Canon Order)
1. **Owner Rulings** (Supreme authority; sole visual approval seat)
2. `docs/YCN_DECISIONS.md` (Governing architecture and product choices)
3. `docs/YCN_CLAIMS_AND_PROOF.md` (Verified claims, evidence thresholds, benchmarks)
4. `docs/YCN_CONTENT_SPEC.md` (Authoritative copy, hierarchy, narrative architecture)
5. `docs/YCN_DESIGN_SYSTEM.md` (Tokens, layout, typography, motion standards)
6. `docs/vnext/*` (VNext homepage and component specifications)
7. `docs/CLOSE_PROTOCOL.md` (Permanent close, consolidation, and cold-resume protocol)
8. [`docs/YCN_LABS_OWNER_WORKING_ROUTINE.md`](https://github.com/yash-wd/ycn-labs-site/blob/main/docs/YCN_LABS_OWNER_WORKING_ROUTINE.md) (Owner's complete two-repository working routine)

---

## 2. Active Homepage Rendering Path
- **Canonical Route Entry:** `app/page.tsx`
- **Component Chain:** `app/page.tsx` → `components/CinematicHomepage.tsx` → `components/homepage/vnext/HomepageVNextPhase1.tsx`
- **Component Status Notice:** Older homepage components in `components/` are NOT current simply because they exist in the repository tree. Retain them pending verified import analysis.

---

## 3. Frozen Systems (Do Not Alter Without Written Approval)
- **Entrance:** VF19 + INPUT-GATE-01 (Natural scroll cue & skip controller)
- **Navigation:** NAV-07 structure (Navbar original glow restoration pending)
- **Typography:** POLISH-TYPE-01 (Semantic scale, Space Grotesk / Inter)
- **Hero Foundation:** HOME-01C Hero layout, CTA, typography, and theme tokens

---

## 4. Historical Owner Decisions (9 Oct Handoff §6) & Current Dispositions
| Item | Topic | Status | Disposition |
| :---: | :--- | :--- | :--- |
| **1** | Capability-03 pilot | OPEN | Defect verified (table 446px in 352px container); visual verdict pending. |
| **2** | Navbar border and scroll cue | PENDING OWNER | Option A recommended (80 px/s lap average); test update pending. |
| **3** | Interim commit on `site-v2` | **RESOLVED (12 Oct)** | Committed locally (`11468f4b…`); historical private checkpoint. |
| **4** | Rulebook update | PENDING | DECISION-051+, CONTENT_SPEC §3, INDEX.md scheduled. |
| **5** | Homepage structure (7 vs 6 chapters) | PENDING OWNER | 7 vs 6 chapters and results section review pending. |
| **6** | UK metadata (GB metadata) | PENDING OWNER | Scheduled for business review gate. |
| **7** | Staging credentials and lead retention | PENDING OWNER | Staging environment credentials and retention policy pending. |
| **8** | Replacement wording for two form lines | PENDING OWNER | Copy review for two form lines pending. |
| **9** | Carried items (Esc, scope, export, kicker) | PENDING GATES | Esc key handler, brand scope, Hero kicker in delivery backlog. |

---

## 5. The Four Roles (Owner + Three AI Seats)
- **Owner:** Final authority, sole visual verdict, commercial and release approval.
- **GPT Strategy:** Strategic planning, task scoping, drafts exactly ONE instruction at a time.
- **Claude Review:** Pre-execution audit, exception verification against raw outputs, technical gatekeeper.
- **AGY Execution:** Local Linux seat, reports raw output, strictly enforces checkpoints, never commits unapproved.

---

## 6. Source Publishing & Code Workflow
- Every approved code change must undergo explicit code commit and push following quality gate validation (`lint`, `check-types`, `test`, `build`).
- Do NOT treat the state-only `tools/close-day.sh` script as a substitute for committing and publishing source code changes.
- **Permanent Close Protocol:** End-of-day closing across both repositories and the vault is governed by [`docs/CLOSE_PROTOCOL.md`](CLOSE_PROTOCOL.md). The preflight check is available at `tools/close-preflight.sh`.

---

## 7. Next Immediate Workstream
Pending Owner decision on Navbar (Option A vs B) and bounded test update approval (`__tests__/navbar-polish-04.test.tsx`), execute `YCN-NAV-ORIGINAL-STYLE-01`.
