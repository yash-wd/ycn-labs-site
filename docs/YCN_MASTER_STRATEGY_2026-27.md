# YCN Labs — Lean Launch, Real Proof and One-Year Business Strategy (2026–2027)

**Document Reference:** `docs/YCN_MASTER_STRATEGY_2026-27.md`
**Decision Authority:** `DECISION-055` (Owner, 18 October 2026)
**Strategic Horizon:** 18 October 2026 → 31 October 2027
**Baseline Git Anchor:** Site V2 `main` at commit `035e142ad9be4ba8f4b4ab36c2a171f589167c7a`

---

## 1. Governing Principle

> **The website is a tool for the business, not the business.**
> Finish it in its honest, fast, lean form in four weeks. Park every speculative or enterprise system in a dated, indexed, recoverable store. Spend the next six months in the market finding out what real customers pay for. Reopen the parked work in June 2027 on evidence, not opinion.

---

## 2. Four Checkpoints That Define the Year

| Target Date | Milestone | Success Criterion |
| :--- | :--- | :--- |
| **15 Nov 2026** (fallback 30 Nov) | **Lean V1.0 Live** | Public site live on `ycnlabs.com`, old site retired, working contact path, 10-check gate passed. |
| **31 Jan 2027** | **Proof & Pipeline** | Two real projects shown on `/work` (Case study #1 YCN site + 1 real local business pilot). |
| **31 May 2027** | **Operating Cashflow** | At least one active maintenance retainer paying monthly; tax and sole proprietorship setup in order. |
| **June 2027** | **V2.0 Evidence Gate** | Formal review of 6 months of client data; decision whether to build V2.0 or continue selling V1. |

---

## 3. Phase 0 — Close and Store (18–20 Oct 2026)

### A. What Finishes Immediately
1. **Real Disaster-Recovery Backup:** Vault essential records (`proof/`, `00_START_HERE/`, `foundation/`) packaged into an encrypted archive for the Owner to copy to a USB drive and personal cloud storage. Daily local snapshots to `/mnt/workSpace` handled by candidate script `ycnbackup.sh`.
2. **Historical Live-Site Hotfix:** Owner approves Vercel Preview for `5b0d971` → `promote` to neutralize live legal claims exposure. Old repo is never merged into Site V2.
3. **Governance Freeze:** Governance merge `035e142` stands. This strategy commit is the **last governance commit of the year**.
4. **Task 07 Navigation:** Owner visual review on `http://localhost:3005` → `visual pass` (merge to main) or `drop` (keep original simpler nav). No further animation iterations.
5. **Logo Ruling:** Authoritative 8K Master approved; scaled responsively via CSS. No derivative crop reviews.
6. **Deviation Ledger:** Formally closed at `DEV-20`. Future deviations logged as a single line in task `CHECKLIST.md`.

### B. What Gets Staged in the Parking Lot (`docs/V2_PARKING_LOT.md`)
Every deferred item is indexed with its source path and reopening condition:
- 143-point readiness spreadsheet → Release reference only, not a daily instrument.
- Full OI-19 unified operator notification hub, webhooks, and custom desk.
- Custom internal CRM and marketing automation.
- Web push notifications, blog/CMS engine, automated offers.
- 16-document enterprise technical suite & daily cold-start generator.
- Git tag `v1-scope-freeze` created on this adopted commit. Parked items remain untouched until June 2027.

---

## 4. Phase 1 — Lean V1 Launch (21 Oct → 15 Nov 2026)

### A. Exact Launch Scope (Nothing More, Nothing Less)
- **18 Existing Routes:** Home, Services, Work, How We Work, Engineering, About, Contact, Privacy, Terms, Credits, 404. No new routes.
- **Work Page (Honest Showcase):**
  - *Entry 1:* YCN Labs Website — Case Study #1 with measured numbers (18 routes, 280 tests, sub-2s mobile load, stack, challenges solved).
  - *Entry 2:* Demonstration: Local Business Workflow — Working interactive prototype built with YCN components, clearly labeled as a demonstration.
  - *No fabricated clients, fake logos, or unverified revenue claims.*
- **Backend Reliability (Task 12):**
  - Form generates UUID `idempotencyKey` per render, preserved across retries.
  - PostgreSQL `INSERT ... ON CONFLICT (idempotency_key) DO UPDATE` returning original `leadId`.
  - Database commit is the single durability boundary. Post-commit email failure updates status to `'failed'` in DB, but returns **HTTP 200 `{ accepted: true }`** with lead ID to visitor. Never return a false 503.
  - 5 core staging tests: (1) Valid lead stored + emailed; (2) DB down → honest 503; (3) Email fails post-commit → lead kept, visitor sees 200; (4) Double-submit → 1 DB row, original reference returned, no second email; (5) Invalid payload → rejected.
  - *Fallback Rule:* If staging credentials cannot be verified within 48 hours, launch with a tested direct email/WhatsApp contact link and custom form disabled, subject to Owner approval.
- **Content & Localization (Task 10):**
  - INR budget options replace GBP; `en_IN` metadata; form defaults to "Not sure yet".
  - Founder name and genuine technical background on `/about`.
  - Commercial policy: Custom INR quotations with 50/30/20 milestone billing.
- **Mobile Performance (Tasks 08 / 09):**
  - Fix 1024px overflow on Capability-03.
  - Measure on a real mobile phone on 4G:
    - *If Mobile LCP $\le$ 2.5s:* Keep cinematic entrance film.
    - *If Mobile LCP > 2.5s:* Serve static hero on mobile; keep film for desktop only. Zero debate.
- **Legal & Privacy:**
  - Concise privacy notice on `/contact`: specifies data collected, 12-month retention, processors (Supabase/Neon, Resend, Vercel), contact via `privacy@ycnlabs.com`.
  - `hello@` and `privacy@` mailboxes active.
- **Infrastructure:**
  - Vercel Pro ($20/mo), Neon free, Resend free, Sentry free.

### B. The 10-Point Launch Gate (Replaces 143-Item Tracker)
1. `git diff --check` passes with zero errors.
2. `tsc --noEmit` exits with code 0.
3. `pnpm run lint` passes (0 errors, warnings $\le 88$).
4. `pnpm test` passes 280/280 tests.
5. `pnpm run build` succeeds with all 18 routes static/dynamic.
6. Real test lead submitted from a mobile phone reaches PostgreSQL and Owner's email inbox.
7. Mobile 375px audit shows zero horizontal overflow or clipped text.
8. Mobile Lighthouse score $\ge 90$ with LCP $\le 2.5$s.
9. Privacy notice visible on form with working `privacy@` contact address.
10. Rollback verified: Vercel Instant Rollback to previous deployment confirmed working.

---

## 5. Phase 2 — Real-World Client Acquisition (15 Nov 2026 → 31 Jan 2027)

### A. The Objective
Secure **2 real projects delivered and shown on `/work`** and establish 10 business conversations per week.

### B. The Outreach Playbook
- **Channel 1: Personal & Professional Network (Week 1–2):**
  - 30 friends, past colleagues, and business owners you know.
  - *"I launched my studio YCN Labs. We build custom Next.js websites that load in 1 second on phones. Do you know anyone whose site is slow or outdated?"*
- **Channel 2: Hyper-Local Business Audits (Week 3–6):**
  - Target 10 local businesses a week (clinics, coaching centres, luxury salons, architects, boutique traders).
  - Find ONE specific flaw on their mobile site (e.g. broken phone link, 6-second load time, unreadable pricing).
  - Approach in person or via WhatsApp with an observation, not a generic sales pitch.
- **Channel 3: Digital Marketing Agency Overflow:**
  - Contact 10 digital marketing and SEO agencies in India.
  - Offer white-label Next.js frontend development for their clients.
- **First Client Terms:**
  - Delivered at cost or modest founder rate in exchange for a written case study and testimonial.
  - Never work without a written Scope of Work (SOW).

---

## 6. Phase 3 — Retainers and Cashflow (Feb → May 2027)

1. **YCN Care Plan Retainer:**
   - Offer every delivered client ongoing maintenance: ₹3,500 – ₹7,500/month.
   - Covers: hosting management, uptime monitoring, monthly backups, security updates, and up to 2 hours of content edits.
   - Target: 5 clients on retainer = ₹20,000 to ₹35,000/month baseline recurring revenue.
2. **Business & Tax Setup:**
   - Operate as a Sole Proprietorship with a dedicated current bank account and PAN.
   - GST registration mandatory once annual turnover exceeds ₹20 Lakhs (consult CA regarding reverse charge on foreign SaaS).
   - Account for 2% (194C/J technical) or 10% TDS withheld by corporate clients on payments over ₹50,000/year.
3. **Capture Client Demand:**
   - Record every client request in `docs/V2_IDEAS.md`. This file, not AI imagination, defines future upgrades.

---

## 7. Phase 4 — The June 2027 V2.0 Evaluation

In June 2027, review `docs/V2_PARKING_LOT.md` against real data:
1. **Demand:** Did clients repeatedly ask for this feature?
2. **Revenue:** Will building this increase revenue or prevent lost clients?
3. **Capacity:** Do you have the hours to maintain it?
4. **Simpler Alternative:** Can an off-the-shelf tool solve it without custom code?
*If the answers are weak, the feature remains parked. Continuing with a profitable, simple V1 is a valid commercial victory.*

---

## 8. Permanent Operating Rules (The Lean System)

1. **The 3-Hour Builder Cap:** Max 3 hours per day on site code during launch; max 3 hours per week after launch. All other hours go to client outreach, discovery, and paid delivery.
2. **Single Builder, Single Reviewer:**
   - AGY builds locally.
   - Exactly **one** independent reviewer (GPT or Claude alternating) per task.
   - Three seats convene **only** for production deployments, customer data handling, or legal text.
3. **Pull-Request Workflow on GitHub:** AGY opens a GitHub Pull Request for each task. The reviewer comments directly on the PR diff. The Owner merges. No pasting 500 lines of reports across chat windows.
4. **Demos for New UI Screens Only:** OI-18 HTML demos are created **only** when proposing a brand-new visual screen. Never create a demo for a backend bug fix, schema edit, or script.
5. **Zero Governance Expansion:** No new rules, registers, deviation tables, or protocol documents until June 2027. If a technical rule is needed, it is added as one line in `AGENTS.md`.
