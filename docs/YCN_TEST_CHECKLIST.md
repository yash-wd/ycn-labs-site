# YCN Labs — Test & Evidence Checklist

**Revision:** 1.2

## 1. Evidence header for every test run

Record:

- candidate/source fingerprint;
- branch/commit/index/snapshot identity;
- environment and viewport/device profile;
- command/tool/version;
- exit code/raw artifact path;
- relevant configuration;
- limitations;
- result status (TESTED / VERIFIED / BLOCKED etc.).

## 2. Repository safety

- [ ] Original repository/source/index unchanged by read-only tasks.
- [ ] Unrelated staged/unstaged/untracked work inventoried and preserved.
- [ ] Verification candidate identity is explicit.
- [ ] No production secret values appear in evidence.
- [ ] No accidental real notifications/migrations in test runs.

## 3. Functional

- [ ] All primary nav/CTA/footer links work desktop + mobile.
- [ ] “What We Build” paths land on relevant content.
- [ ] Guided enquiry back/next/validation works.
- [ ] Real enquiry acceptance is durably recorded before success.
- [ ] Notification failure is visible/recoverable without losing an accepted enquiry.
- [ ] Duplicate/idempotent behavior is understood and tested where implemented.
- [ ] Sample/demo forms are labelled and cannot call real intake.
- [ ] 404/error/fallback states are helpful.

## 4. Story/content

- [ ] Product-led story example (vNext: product is conceptual protagonist across phone chapter, laptop portal, connected flow, and proof; former counter/shop story superseded) maintains clear customer/product/business entities.
- [ ] Pressure and Held visibly reuse the same situation/composition.
- [ ] Layer first-reading labels exactly communicate customer use / business next step / optional automation / dependability.
- [ ] Enquiry example broadens immediately back to the four YCN problem paths.
- [ ] Technical jargon does not dominate first-reading surfaces.
- [ ] No unsupported timeline, ownership, staffing, accessibility or performance promise appears.
- [ ] Work classification/stage/evidence are visually distinct.
- [ ] Target values never render as achieved results.

## 5. Pause/motion

- [ ] Representative paused frames in each scene still look intentional and understandable.
- [ ] Motion communicates a meaningful state change.
- [ ] Natural scroll remains usable; no scroll trap.
- [ ] Skip path works where choreography is optional.
- [ ] Reversing/back-scrolling does not corrupt state.
- [ ] Transition boundaries do not overlap/crop important text.

## 6. Responsive

Review at least:

- [ ] 320
- [ ] 375
- [ ] 390
- [ ] 430
- [ ] 768
- [ ] 1024
- [ ] 1280
- [ ] 1440
- [ ] 1920

Check no horizontal overflow, text collision, inaccessible control, unreadable diagram or desktop-shrunk story.

## 7. Accessibility

- [ ] Full keyboard traversal with visible focus and logical order.
- [ ] No traps.
- [ ] Home + Contact screen-reader pass (headings, landmarks, labels, status messages).
- [ ] All meaningful images have appropriate alt; decorative visuals hidden appropriately.
- [ ] Reduced-motion version has complete meaningful-content/action parity.
- [ ] All normal text meets applicable contrast in actual rendered state.
- [ ] Automated checker never substitutes assumed white/black background and calls it verified.
- [ ] Touch targets around 44px where practical.
- [ ] No meaning by color alone.
- [ ] No essential text only inside canvas/WebGL.
- [ ] 200% zoom and 400% reflow remain usable.

WCAG 2.2 AA is an acceptance target; do not publish conformance until the required scope is actually verified.

## 8. Performance

### Lab
- [ ] Agreed Lighthouse mobile profile run; target ≥95, raw report attached.
- [ ] Hero text/navigation available without waiting for cinematic assets.
- [ ] JS/asset inventory identifies unused/heavy resources.
- [ ] Fonts comply with adopted budget.
- [ ] Below-fold heavy media lazy-loaded where appropriate.
- [ ] WebGL/3D has fallback and does not block content.

### Field
Where sufficient real-user data exists:
- [ ] LCP p75 ≤2.5s
- [ ] INP p75 ≤200ms
- [ ] CLS p75 ≤0.1

If field data is insufficient, record **INSUFFICIENT DATA**, not PASS.

## 9. Security/privacy

- [ ] HTTPS in production.
- [ ] Appropriate security headers.
- [ ] Server-side validation.
- [ ] Spam/rate controls appropriate to provider.
- [ ] No client-side secrets.
- [ ] Logs redact sensitive values.
- [ ] Analytics excludes raw form values/free text.
- [ ] Dependency findings documented and risk-assessed.
- [ ] Failure paths do not leak stack traces/private configuration.

## 10. SEO/content delivery

- [ ] Unique title/description per public page.
- [ ] One logical H1.
- [ ] Canonical/OG where appropriate.
- [ ] sitemap/robots correct.
- [ ] Story copy is crawlable/readable as HTML.
- [ ] Structured data only where factually accurate.

## 11. Claims gate

For every public factual claim:

- [ ] Claim exists in `YCN_CLAIMS_AND_PROOF.md`.
- [ ] Evidence scope matches wording.
- [ ] Status permits publication.
- [ ] Limitation/target language is visible where needed.

## 12. Five-person comprehension pilot

Participants:

- 1 shop/retail business owner;
- 1 restaurant/food/service business owner;
- 1 non-technical adult;
- 1 startup/product person;
- 1 technical person.

Use their own phone/network where practical. Explain nothing before the first observation.

Ask:

1. What does YCN Labs do?
2. What could YCN help your business with?
3. What would you click next?
4. What was the main visual story showing?
5. Did you need to understand technology to understand the site?

Pass bar:

- all three non-technical/business-owner profiles answer Q1–Q3 reasonably;
- at least 4/5 overall answer Q1–Q3 reasonably;
- non-technical profiles answer Q5 “No” in substance;
- technical participant can find credible depth on Engineering.

Record their actual answers; AI simulations do not count.

## 13. Release gate

Before release:

- [ ] Requirements matrix complete.
- [ ] Critical failures resolved or explicitly accepted.
- [ ] Claims gate passes.
- [ ] Operator for real enquiries is known.
- [ ] Rollback/recovery documented.
- [ ] Owner authorizes exact candidate.

After release:

- [ ] production identity confirmed;
- [ ] critical smoke checks complete;
- [ ] real intake can be observed/recovered;
- [ ] monitoring/alerts accessible to responsible operator.
