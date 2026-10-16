# YCN Labs — Canonical Project Entry & Context

Open this file on branch `main`. Before any work run `git fetch && git status --porcelain` to verify a clean working tree aligned with `origin/main`.

> "Websites and software. Built around your business. We turn business problems into digital products that help customers act, teams work clearly, and the business keep moving."  
> — *docs/YCN_CONTENT_SPEC.md:28-31 (Ratified DECISION-040, docs/YCN_DECISIONS.md:136-137)*

- **Active Development Repository:** `https://github.com/yash-wd/ycn-labs-site`
- **Active Development Branch:** `main` (Current commit: verify with `git rev-parse HEAD` and check `docs/STATE.md`)
- **Historical Private Reference:** `11468f4b36b3fdf451cd0bf04e5f2ee2868b45a5` (preserved on remote branch `site-v2` in `yash-wd/ycnlabs`; preserved strictly for historical/recovery records)
- **Local Vault Isolation:** Backups, business records, and raw proof frames remain in a local private vault outside GitHub (`/home/ycn-labs/Desktop/YCN_LABS_MASTER/proof/`).
- **Production Deployment:** NO production deployment is authorized during active development for `ycn-labs-site`. The historical `yash-wd/ycnlabs` live site may receive only Owner-authorized, preview-first hotfixes under isolated tasks.

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
| **1** | Capability-03 pilot | OPEN | Defect verified (table 446px in 352px container); visual verdict pending Gate E. |
| **2** | Navbar border and scroll cue | PENDING GATE E | Option A (80 px/s lap average) ratified in `docs/YCN_DESIGN_SYSTEM.md`; coding paused until Gate E. |
| **3** | Interim commit on `site-v2` | **RESOLVED (12 Oct)** | Committed locally and pushed to remote `site-v2` (`11468f4b…`); historical private checkpoint. |
| **4** | Rulebook update | **RESOLVED** | DECISION-051+ ratified; CONTENT_SPEC §3 aligned. |
| **5** | Homepage structure (7 vs 6 chapters) | PENDING GATE E | DECISION-053/054 copy ratified; chapter implementation H-03 / W-06 layout pending Gate E. |
| **6** | UK metadata (GB metadata) | PENDING IMPLEMENTATION | India-first/INR policy approved (DECISION-052 O-01 / DECISION-054); metadata cleanup and route implementation pending. |
| **7** | Staging credentials and lead retention | PENDING IMPLEMENTATION & LEGAL | 12-month retention policy approved (DECISION-052 O-06 / ARCH-V1-01); staging credentials (O-10) and legal clearance pending. |
| **8** | Replacement wording for two form lines | RESOLVED IN SPEC | DECISION-053 ratified exact lines in CONTENT_SPEC; application implementation pending. |
| **9** | Carried items (Esc, scope, export, kicker) | PENDING GATES | Esc key handler, brand scope, Hero kicker in delivery backlog. |

---

## 5. Roles & Operating Model
Roles are governed by [`AGENTS.md`](../AGENTS.md) › Shared ownership and task leadership. Strategy, challenge, research, architecture, review and execution are functions any seat may perform; AGY is the only local execution seat.

- **Owner:** Final authority on business direction, priorities, scope, legal wording, visual verdicts, releases, commits, pushes, deployments, and close.
- **Three Collaborative AI Seats (GPT, Claude, AGY):** Proactive intellectual contributors across business, architecture, code, design, cost, risk, and testing. Independent written assessments precede task synthesis; task leadership is assigned or confirmed by the Owner per task based on domain evidence.
- **AGY Execution Authority:** AGY is the sole seat authorized to operate the local Linux filesystem, execute shell commands, and generate raw proof artifacts under the file intake and evidence rules.

---

## 6. Source Publishing & Code Workflow
- Every approved code change must undergo explicit code commit and push following quality gate validation (`lint`, `check-types`, `test`, `build`).
- Do NOT treat the state-only `tools/close-day.sh` script as a substitute for committing and publishing source code changes.
- **Permanent Close Protocol:** End-of-day closing across both repositories and the vault is governed by [`docs/CLOSE_PROTOCOL.md`](CLOSE_PROTOCOL.md). The preflight check is available at `tools/close-preflight.sh`.

---

## 7. Next Immediate Workstream
Current priorities and the single next operational task are governed dynamically by [`docs/STATE.md`](STATE.md) §2 and [`docs/BACKLOG.md`](BACKLOG.md). UI and backend coding (including Navbar Task 07 and Capability-03 Task 08) remain PAUSED until Gate E readiness and explicit Owner approval.
