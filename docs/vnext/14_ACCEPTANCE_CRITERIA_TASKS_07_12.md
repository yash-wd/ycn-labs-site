# YCN Labs — Testable Acceptance Criteria & Engineering Verification Gates (Tasks 07–12)

**Version:** 1.3  
**Effective Date:** 17 October 2026  
**Status:** DRAFT — PENDING OWNER COMMIT APPROVAL (Gate E Deliverable — `YCN-V2-FOUNDATION-ALIGN-01`)  
**Scope:** Testable preconditions, execution boundaries, and verification criteria for V2 Implementation Tasks 07 through 12.

---

## 1. Overview & Verification Protocol

Every task in the Site V2 queue proceeds only upon explicit Owner authorization and must satisfy the exact testable criteria defined below before proposing a commit. All verification evidence must be captured with raw stdout and file hashes in `YCN_LABS_MASTER/proof/<task-id>/`.

---

## 2. Task-by-Task Acceptance Specifications

### 2.1 Task 07 — `YCN-NAV-ORIGINAL-STYLE-01` (Navigation & Menu Continuous Motion)
- **Scope:** Header and navigation restoration, mobile drawer, and Menu button perimeter animation in continuous mode (BACKLOG item 07). Primary CTA changes are excluded and reserved for separately authorized Task 07b.
- **Preconditions:** Clean working tree on `main`. Frozen navigation structure (NAV-07) authoritative.
- **Testable Acceptance Criteria:**
  1. **Sticky Header & Blur:** Header renders fixed/sticky; transparent at top, applying backdrop blur cleanly on scroll without visual jump or hydration mismatch.
  2. **Menu Continuous Perimeter Motion:** The Menu button in `continuous` mode features a physical perimeter travel signal moving at **80 px/s** (±5%) using CSS offset-path / SVG perimeter coordinates.
  3. **Gate B2 Conspicuous Signals Rule:** No more than two conspicuous animated signals active simultaneously on the first screen, verified in design review (BACKLOG item 07). *(Note: Pausing the header CTA while the Hero CTA is visible belongs to Task 07b).*
  4. **CTA Boundary Protection:** The primary CTA is untouched by Task 07 (CTA lighting and perimeter changes belong strictly to Task 07b).
  5. **Responsive Breakpoint (768px):** Desktop navigation links collapse into mobile menu trigger below 768px viewport width.
  6. **Mobile Navigation Drawer:** Toggling menu opens accessible drawer/sheet with trap focus; Escape key closes drawer; focus returns to trigger.
  7. **Theme Switching:** Dark/Light theme toggle operates cleanly without hydration mismatch or flash of unstyled content (FOUC).
  8. **Accessibility (WCAG 2.2 AA):** All interactive elements have accessible names (`aria-label` on icon-only buttons), minimum 44x44px touch targets, visible focus rings, and full keyboard navigability.
  9. **Reduced Motion:** When `prefers-reduced-motion: reduce` is active, continuous perimeter motion disables cleanly.
  10. **Test Suite:** `__tests__/navbar-polish-*.test.tsx` passes 100% green.

---

### 2.2 Task 08 — `HOME-02-CAP-03-1024` (1024px Viewport Layout Overflow Fix)
- **Scope:** Resolve horizontal scroll overflow on Capability-03 card at 1024px tablet/small-desktop viewport.
- **Preconditions:** Task 07 completed or independent branch authorized.
- **Testable Acceptance Criteria:**
  1. **Zero Horizontal Overflow:** At exact viewport widths of 1024px, 1280px, and 1440px, `document.documentElement.scrollWidth === document.documentElement.clientWidth`. No horizontal scrollbar appears.
  2. **Capability-03 Grid Flow:** Grid container in Capability-03 uses responsive column sizing (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3` or fluid flex with `min-w-0`) preventing fixed-width blowout.
  3. **Content Preservation:** Zero deletion of approved text, metrics, or labels inside Capability-03.
  4. **Responsive Integrity:** Mobile (<768px) and large desktop (>1440px) visual appearance remain completely unchanged.
  5. **Automated Layout Assertion:** DOM measurement tests verify `scrollWidth <= clientWidth` across 375px, 768px, 1024px, 1280px, and 1920px viewports.

---

### 2.3 Task 09 — `YCN-HOME-FINAL-01` (Homepage Cinematic Flow & Chapters Polish)
- **Scope:** Visual and interactive verification of the full homepage narrative chapters.
- **Preconditions:** Tasks 07 and 08 completed; design tokens aligned.
- **Testable Acceptance Criteria:**
  1. **Entrance Continuum:** Initial loader executes smoothly; logo transitions cleanly into header mark; entrance dismisses on first scroll or skip trigger.
  2. **Hero Chapter:** Hero typography displays Space Grotesk headline, subhead, and primary CTA with zero layout shift (CLS < 0.05).
  3. **Phone Chapter:** 3D/DOM phone frame renders sharp; scroll triggers state transitions forward and backward with 1:1 reversible parity.
  4. **Laptop Portal Chapter:** Laptop container pushes in on scroll; DOM product UI smoothly transitions to full-screen view without stutter (60fps GPU transforms).
  5. **Connected Flow & FAQ:** Business request flow renders connected nodes; FAQ accordion expands/collapses with accessible ARIA attributes.
  6. **Zero AI-Slop Discipline:** Strict compliance with `AGENTS.md` quality floor; no cliché drop shadows, no generic purple gradients, no unmotivated card radiuses.
  7. **Full Test Regression:** All homepage Vitest tests (`__tests__/phase*.test.ts`) pass with 0 errors.

---

### 2.4 Task 10 — `YCN-PAGES-CONTENT-01` (Supporting Routes Content Alignment)
- **Scope:** Route-by-route content review and alignment for supporting pages.
- **Target Routes:** `/what-we-solve`, `/work`, `/how-we-work`, `/about`, `/engineering`, `/privacy`, `/terms`.
- **Testable Acceptance Criteria:**
  1. **Service Scope Alignment:** All copy strictly reflects approved scope: high-performance websites lead, selective custom web apps, and maintenance (no generic SaaS/AI hype).
  2. **India-First / Currency Realism:** Any pricing or commercial copy denotes custom INR proposals and transparent milestone billing (DECISION-052 O-05).
  3. **Response Commitment:** Response wording conforms strictly to Owner-approved operational target: `two working days` internal, `honest actionable next steps` public.
  4. **SEO & Metadata:** Every route defines unique canonical `<title>`, meta description, OpenGraph tags, and semantic `<h1>` hierarchy.
  5. **Legal Routes Safeguard:** `/privacy` and `/terms` carry clear provisional notice until formal legal counsel review is completed (Open Prerequisite 10).
  6. **Unit Tests:** `__tests__/phase6-supporting-pages.test.tsx` passes 100%.

---

### 2.5 Task 11 — `YCN-BRAND-MEDIA-01` (Brand Assets & Proof Verification)
- **Scope:** Verified media asset integration, logo presentation, and public claims mapping.
- **Testable Acceptance Criteria:**
  1. **Authoritative Asset Mapping:** Every image, video, and SVG diagram maps to authorized assets in the canonical brand library (`/home/ycn-labs/Desktop/YCN_LABS_MASTER/01_CURRENT_PROJECT/YCN_LABS_BRAND_LIBRARY/`, checksum register `14_CONTINUITY/SHA256SUMS.txt`). Assets must map to the immutable master (`01_IMMUTABLE_SOURCE/`) or to variants carrying an explicit Owner visual approval; none exist at the time of writing. Unapproved WIP branches (`wip/*`) are strictly excluded.
  2. **Typography Compliance (POLISH-TYPE-01):** Strictly Space Grotesk for display/headlines and Inter for body/interface text.
  3. **Custody & Licensing:** 100% of integrated visual assets are verified: original Owner captures, licensed fonts, or custom coded SVGs. No third-party copyrighted stock.
  4. **Dual-Theme Optimization:** All graphic assets look intentional in both dark mode (`#0a0a0a` background) and light mode.
  5. **Lighthouse Performance:** Image optimization uses modern formats (`image/avif`, `image/webp`) with explicit `width`, `height`, and `sizes` attributes; LCP target < 2.0s on mobile.
  6. **Claims Verification Gate:** Every public outcome metric or case study references verified proof documented in canonical `docs/YCN_CLAIMS_AND_PROOF.md`.

---

### 2.6 Task 12 — `YCN-LEAD-STAGING-01` (Enquiry Backend Staging Verification)
- **Scope:** Full-stack end-to-end verification of contact enquiry workflow on live staging environment, strictly preserving the complete 12-scenario matrix from `docs/YCN_SYSTEM_ARCHITECTURE.md` §8 and §14.7.
- **Preconditions:** Staging deployment URL available; staging database, Redis, and Resend credentials configured.
- **Verbatim Architectural Scenarios Matrix (`docs/YCN_SYSTEM_ARCHITECTURE.md` §8):**
  1. **Scenario 1 — Valid accepted enquiry with optional marketing OFF:** One durable lead, exact notice version/events, accurate successful receipt, separate marketing OFF, operator delivery/recovery observable.
  2. **Scenario 2 — Invalid, malformed, oversized, honeypot and rate-limited submissions:** Correct safe error/status and no falsely accepted lead.
  3. **Scenario 3 — Database unavailable or transaction rollback:** No accepted receipt and no orphan dedupe/consent event.
  4. **Scenario 4 — Lead committed; operator notification or subsequent status update fails:** Visitor still gets accepted response with original lead ID; no false 503; recoverable pending/failed work.
  5. **Scenario 5 — Two or more identical submissions race concurrently:** Only one durable lead and one atomic claim; replay gets same accepted ID; no duplicate side effects.
  6. **Scenario 6 — Duplicate replay plus Redis/provider failure around the acceptance boundary:** No phantom success, no lost accepted lead, no duplicate insertion; failure in transient infrastructure does not bypass DB correctness.
  7. **Scenario 7 — Product-updates permission, channel separation and withdrawal:** Email permission does not authorize WhatsApp marketing; WhatsApp requires its separate recorded opt-in. Exact notice/action history is preserved, withdrawal stops the relevant marketing use, and the manual WhatsApp evidence path is verified without an API integration.
  8. **Scenario 8 — Email identity/delivery and privacy forwarding:** Existing SPF/DKIM/DMARC and operator/visitor delivery tests pass; `hello@ycnlabs.com` receipt and `privacy@ycnlabs.com` forwarding/reply handling reach the verified authorized operators, with bounce/error observations and safe redaction.
  9. **Scenario 9 — Rights/retention manual operation:** Requester authority and action are verified; inactivity is measured from last meaningful contact, not maintenance timestamps; the counsel-approved 12-month pre-sales schedule and exceptions are exercised manually, with distinct record classes and no automated purge.
  10. **Scenario 10 — Analytics:** Provider cookieless configuration inspected; event payload has no personal data; approved consent/disclosure decision and launch event proof.
  11. **Scenario 11 — Security and operations:** Secrets isolated; rate limiting/environment boundaries tested; actionable alert and operator ownership confirmed.
  12. **Scenario 12 — Backup/recovery/rollback:** Representative restore and exact SHA rollback documented; live-production deploy branch verified independently.
