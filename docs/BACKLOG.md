# YCN Labs — Prioritized Delivery Backlog

**Strategy:** Ship customer-facing functionality and verify real enquiry workflows under risk-tiered gates.  
**Operating Principle:** Raw command evidence strictly outranks narrative summaries.

---

## Gate 0: Inventory & Publication Readiness (Tier 0 — Read-Only)
- [x] **`REPO-READINESS-00`:** Verified repository privacy, outgoing single commit, limited keyword scan 0 matches, drafted canonical context files.
- [x] **`BRAND-FIND-01`:** [SUPERSEDED] Replaced by Owner RULING-01. Authoritative 6675px master ratified; brand library established (`ycn-labs-brand-library`). Brand Next: RULING-02a/b approval, then BRAND-EXPORT-05.

---

## Gate 1: Public Development Repository Initialization (Tier 1 — Separate Authorization)
*Note: A commit is NEVER Tier 0 (Tier 0 is strictly read-only inspection; staging/committing requires Tier 1/2 authorization).*
- [x] **`PUBLISH-01A`:** Clean source snapshot exported, context layer installed, audited for secrets and oversized objects.
- [x] **First Public Push:** Initialized Git on `main`, pushed to `yash-wd/ycn-labs-site` under personal SSH key with GitHub no-reply committer identity (`3a792e0`).
- [x] **Permanent Close Protocol (`YCN-CLOSE-PROTOCOL-01`):** Installed canonical `docs/CLOSE_PROTOCOL.md` and read-only `tools/close-preflight.sh`. Cross-project reconciliation and cold-resume standard ratified.
- [ ] **State Script Integration:** Review and test proposed closer integration without overwriting existing `tools/close-day.sh`.

---

## Gate 2: High-Impact Website Defects (Tier 1 — Source Edits)
- [ ] **`YCN-NAV-ORIGINAL-STYLE-01`:** Restore original cyan glow with fading tail at 80 px/s (Option A) with bounded test update to `__tests__/navbar-polish-04.test.tsx` (PENDING OWNER APPROVAL).
- [ ] **`HOME-02-CAP-03-1024`:** Fix responsive table overflow at 1024px breakpoint in Capability-03.
- [ ] **Owner Visual Review:** Present before/after frames for Owner visual verdicts.

---

## Gate 3: Minimum Viable Business Website (Tier 1)
- [ ] **Homepage Finalization:** Complete remaining chapters (01, 02, 04, 05) with verified claims and assets.
- [ ] **Service & Capability Pages:** Tighten engineering scope, exclusions, and conversion calls-to-action.
- [ ] **Enquiry Pipeline:** End-to-end integration test of contact form, email dispatch, rate-limiting, and error handling.
- [ ] **Compliance & Trust:** Privacy policy, terms, UK metadata, and security header hardening.
- [ ] **Asset Replacement:** Replace generic stock video clips with authentic YCN studio footage before production release (per `public/media/SOURCES.md`).

---

## Gate 4: Production Release & Operations (Tier 2)
- [ ] **Release Gates:** Full TypeScript check, 280+ tests passing, production build, Lighthouse/a11y audit.
- [ ] **Deployment Audit:** Deploy to production with rollback verification and live domain sanity check.
- [ ] **Owner Sign-off:** Final commercial and public release approval.
