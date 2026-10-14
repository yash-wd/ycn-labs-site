# YCN Labs — System Architecture

**Document ID:** `docs/YCN_SYSTEM_ARCHITECTURE.md`\
**Version/status:** **CANDIDATE v0.9 — finalise after O-01/O-06; NOT approved; implementation NOT STARTED; legal clearance NOT GRANTED**\
**Prepared:** 14 October 2026\
**Repository baseline:** `yash-wd/ycn-labs-site`, `main` at `e56e0d7e3374ece8f26b62ddde9417c30d76b585`\
**Authority:** `docs/YCN_MASTER_PLAN.md` §14; `docs/YCN_DECISIONS.md` DECISION-051; `docs/YCN_REQUIREMENTS.md`; `docs/YCN_CONTENT_SPEC.md`; `docs/YCN_CLAIMS_AND_PROOF.md`.\
**Review:** Architecture and legal details require Claude's independent review, the Owner's explicit final approval, and competent legal counsel's separate clearance where applicable.\
**Implementation note:** “NOT STARTED” refers to **implementing the changes in this candidate**, not to the existing website/backend, which already contains live source code.\
**Provenance:** Reconstructed from the repository source and recorded project discussion; **not represented as a byte-identical recovery of an earlier GPT draft**.

---

## 1. Purpose and business constraints

YCN Labs will be a reliable, product-led technology business, not merely an animated marketing website. The initial public system must explain genuine offerings to nontechnical buyers; demonstrate a credible product experience; accept enquiries durably; route them to a responsible human; respect visitors' privacy; and remain operable after launch. It must also preserve extensibility for future business operations without prematurely building a CRM, quotation/invoicing engine, or SaaS platform.

**V1 goals:**
1. Clear, honest, accessible public information and useful customer journeys.
2. Accurate enquiry acceptance, idempotency, operator delivery and recovery.
3. Purpose-separated privacy records, versioned notices and auditable manual privacy operations.
4. Privacy-respecting analytics usable at launch, subject to legal review.
5. Operational readiness: verified email domain, monitoring, staging, backup/restore, ownership and rollback.
6. Modular boundaries that can later integrate commercial tools.

**Non-goals for V1:** client login or dashboard, company-owned CRM, automated proposals/quotes/invoices, native payment handling, newsletter automation, public SaaS tenant management, microservices, message brokers, Kubernetes, a new CMS, or more product demonstrations solely to appear sophisticated. These remain **future boundaries only** under DECISION-051 and Master Plan §14.4.

**Open business dependencies:** O-01 through O-10 in Master Plan §14.5, especially O-01 (entity/market), O-02 (real deliverable services), O-03 (operator and service commitment), O-05 (commercial/IP position), O-06 (retention/privacy/counsel), and O-10 (infrastructure). No unsupported business or legal assumption is approved by this candidate.

## 2. Architecture decisions and rules

| ID | Candidate decision | Rationale / boundary |
|---|---|---|
| ARCH-01 | **One deployable Next.js application** with internal, distinct modules | Keep the existing working stack; avoid distributed deployment overhead. |
| ARCH-02 | PostgreSQL/Drizzle is the **durable system of record** for accepted enquiries and related evidence | Neither email delivery nor Redis can be the sole acceptance record. |
| ARCH-03 | Redis/Upstash is a supporting rate-control / short-lived coordination facility | Redis deduplication alone cannot guarantee concurrency correctness. |
| ARCH-04 | Resend is the delivery provider, **not the lead database** | Operator notifications can fail independently of accepted leads. |
| ARCH-05 | Every published notice version is immutable and every processing/permission event is append-only | A current checkbox value alone is not historic evidence. |
| ARCH-06 | Marketing permission is **separate, optional, and OFF by default** | An enquiry is not a marketing subscription. |
| ARCH-07 | The enquiry legal processing basis is **not presumed to require consent** | Indian DPDP Act section 7(a) may support specific voluntarily supplied enquiry data; counsel decides applicability and notice/record wording. |
| ARCH-08 | Authenticated operator access, limited exports and manual rights register in V1 | No client portal or internal CRM required. |
| ARCH-09 | Existing vNext content/design/claims authorities continue to govern public UI | This architecture does not overrule ratified copy or frozen design systems. |
| ARCH-10 | Security, telemetry and scalability should grow from measured need | No speculative services or uncontrolled recurring spend. |

Decision status: **PROPOSED for final Owner sign-off**; none of the above independently authorizes source edits, migrations or production release.

## 3. High-Level Design (HLD)

### 3.1 System context and deployment

```text
Public visitor — web browser
    |
    | HTTPS (approved domain, accessible and crawlable content)
    v
Existing hosting/CDN (provider + live production mapping: O-10 / task 04)
    |
    v
Next.js App Router application — ONE deployable unit
    |-- Public UI and product-led demonstrations (no fake production lead)
    |-- Contact/enquiry API (validation, rate control, durable acceptance)
    |-- Notice + consent/permission evidence services
    |-- Notification sender, recovery and monitoring interfaces
    |-- Privacy operations and operator-controlled export
    `-- Privacy-respecting, cookieless analytics boundary
           |
           +--> PostgreSQL / Drizzle [system of record; sensitive]
           +--> Upstash Redis [abuse limits / transient keys]
           +--> Resend [operator + acknowledgement email]
           +--> Sentry/operational alerts [redacted technical diagnostics]
           `--> Analytics provider [TBD; no personal data in events]

Future, *not deployed V1*: commercially chosen CRM / quotes / GST invoicing,
integrations with approved providers, and future SaaS/product modules.
```

Public pages are semantic and progressively enhanced. Static content remains readable without animation or JavaScript enhancements; the signature homepage scenes may add motion without becoming the only source of meaning. Mobile, keyboard and reduced-motion parity remain governed by the existing design and requirements specifications.

### 3.2 Module map and V1 implementation boundary

| Module | V1 responsibility | Existing evidence / change needed | Scope |
|---|---|---|---|
| Public site / content | Home, What We Solve, Work, How We Work, About, Engineering, Contact, legal pages, metadata and honest product demonstration | Current App Router pages + vNext components; final content/legal review pending | V1 |
| Enquiry intake | Parse, validate, rate-control, durably accept, return accurate receipt; **atomic dedupe** | `app/api/contact/route.ts`; false-503 and check-then-set races need task 12 remediation | V1 |
| Lead store | Lead lifecycle/status, timestamp, immutable submitted facts as needed | Existing `lib/db/schema.ts` leads table; scoped additive migrations after approval | V1 |
| Notices and evidence | `privacy_notice_versions`; append-only `lead_consent_events`; notice-version and purpose mapping | **Not yet modeled** in current database; approval and migrations required | V1 |
| Notification / recovery | Acknowledgement and operator email, provider failures, retryable recovery and escalation | `lib/db/recovery.ts` and Resend client exist; staging correctness unproved | V1 |
| Operator export | Manual, controlled data access/export to legitimate operating owner | No public export API; least-privilege operation/export path to be specified and tested | V1, minimal |
| Privacy operations | Contact point, rights requests, verification, restricted manual register, deletion/retention workflow | `data_rights_requests` table **or** secure manual register acceptable for V1; no automated purge until O-06/counsel | V1 |
| Analytics | Cookieless events without personal data (no email, phone, names, free text, raw IP, query-string contact fields); track funnel at launch | Provider and consent requirement subject to counsel; launch requirement Master Plan §14 C7 | V1 |
| Monitoring and recovery | Redacted error/events, real lead failure alert owner, tested rollback and backup | Sentry code exists; deployment/alerting evidence pending | V1 |
| CRM and client operations | Integrate with a purchased CRM when justified; only define an export/adapter boundary today | No CRM product built | Future boundary |
| Quotations and GST invoicing | Use approved off-the-shelf tools, with templates when commercial work begins | No bespoke quoting/invoicing code built | Future boundary |
| SaaS and other products | Separate product lifecycle and architecture when warranted by evidence | No tenant / billing / customer-access system built | Future boundary |

The **four required additions from the 14 Oct Claude review** are carried into §§3.2, 4.6, 7 and 8: children, privacy analytics, SPF/DKIM/DMARC, and mandatory task-12 correction of false-503/concurrent dedupe.

### 3.3 Trust boundaries and critical invariants

- The public browser is untrusted; all input is validated on the server, with a bounded body size, abuse protection and safe error messages.
- Credentials, environment configuration, lead content and raw sensitive diagnostic evidence never enter the public repos or analytics.
- No public route exposes stored leads, consent history, or rights registers.
- **Durable acceptance = database transaction committed.** Email failure or diagnostic update failure **after** that point must not downgrade the visitor's result to a false “not received” response.
- Duplicate replay returns the original acceptance identity only if the original durable record exists; a transient key without a committed lead cannot manufacture a success.
- Every accepted enquiry has a versioned privacy notice reference plus a historical purpose/basis/permission event record in the same atomic unit of work.
- Marketing consent is neither implied by submitting an enquiry nor derived from `newsletter_signups` merely containing an email address.
- All destructive privacy operations require verified requester authority and an auditable, legally reviewed procedure. Evidence retention and actual erasure requirements must be reconciled by counsel, including applicable statutory/log retention duties.

### 3.4 Existing stack and source-of-truth reference

| Layer | Current tracked stack | Preserve / review |
|---|---|---|
| Web | Next.js 16 App Router, React 19, TypeScript, Tailwind 4, GSAP | Preserve; current `app/page.tsx` → `components/CinematicHomepage.tsx` → `components/homepage/vnext/HomepageVNextPhase1.tsx`. |
| Validation | Zod, react-hook-form | Preserve; align form fields and copy with O-01/O-02. |
| Data | PostgreSQL via `postgres` + Drizzle | Preserve; add only approved migrations, tested on staging. |
| Abuse control | Upstash Redis + HMAC-based IP-keyed rate limiter | Preserve with environment isolation; review availability and failure behaviors. |
| Email | Resend | Authenticate sending domain, prove delivery and recovery. |
| Monitoring | Sentry | Review redaction, recipient, alerts and retention. |
| Quality | Vitest, Playwright; GitHub CI | Keep gated lint/type/test/build and environment-specific staging tests. |

This HLD is intentionally not an infrastructure provisioning mandate. The exact deployment provider, domain, secrets, analytics tool, alerts, operations owner and spend are O-10/task-04 decisions.

## 4. Low-Level Design (LLD): enquiry, consent and operations

### 4.1 Current implemented data (as inspected at baseline)

`lib/db/schema.ts` currently defines:
- `leads`: `id`, unique `lead_id`, `name`, `email`, optional `company`, `project_type`, `budget`, `timeline`, `preferred_contact_method`, `message`, `status`, `notification_status`, notification attempt/error/timestamps and row timestamps.
- `newsletter_signups`: unique email plus timestamp only; **not valid evidence of optional marketing permission**.
- `lib/db/migrations/0001_phase7_leads_hardening.sql`: additive lead metadata/indexes for recovery.

No current `privacy_notice_versions`, `lead_consent_events`, or `data_rights_requests` schema was found in the inspected `lib/db/schema.ts`. No actual runtime staging database was accessed, so production database state is **NOT VERIFIED**.

### 4.2 Proposed data model (NOT YET IMPLEMENTED)

**`privacy_notice_versions` — immutable notice snapshot**

| Field (candidate) | Meaning |
|---|---|
| `notice_version_id` PK | Stable opaque version, e.g. `privacy-2026-10-v1` |
| `notice_type` | `enquiry` / `product_updates` or mapped bundled notice |
| `locale`, `jurisdiction_scope` | Actual published language and applicable market; final via O-01 and counsel |
| `published_at`, `effective_at`, `superseded_at` | Audit timing (supersession does not overwrite old notice content) |
| `content_sha256`, `content_snapshot` or immutable referenced content | Exact statement displayed to visitor (hash **alone** is insufficient without retained content) |
| `owner_approved_by`, `owner_approved_at` | Publication authorization, subject to counsel |

A notice version cannot be edited in place after use. Publish a new version and reference it prospectively.

**`lead_consent_events` — append-only permission and processing evidence**

| Field (candidate) | Meaning |
|---|---|
| `event_id` PK, `lead_id` FK | Unique audit event and accepted lead reference |
| `purpose_code` | Exactly `enquiry_processing` or `product_updates` |
| `event_action` | `notice_presented`, `processing_recorded`, `granted`, `declined`, `withdrawn` as applicable |
| `processing_basis_code` | Distinguish `voluntary_provision` from `consent`; final legal designation requires counsel |
| `notice_version_id` FK | Immutable copy of the terms presented at that event |
| `occurred_at`, `captured_at` | User action time and server persistence time (UTC) |
| `source_channel`, `form_revision` | Which entry point and UI version supplied it |
| `evidence_metadata` | Minimal, non-sensitive confirmation of checkbox/default UI state and server request correlation; **never store raw IP solely for consent evidence without an approved basis** |

Strict rule: **No UPDATE/DELETE of historical consent events during normal operation**. Withdrawal produces a *new* event and changes the **derived current permission**; the evidence history stays intact subject to counsel-approved erasure/retention handling. The effective notice and action are linked transactionally to the lead acceptance. Current permission can be calculated from events or maintained as a synchronized projection; event history is authoritative.

**`lead_submission_claims` — recommended minimal atomic dedupe identity**

| Field (candidate) | Meaning |
|---|---|
| `environment_namespace`, `fingerprint_hmac` PK/UNIQUE | Server-secret-keyed, normalized semantic submission identity; no raw message/email stored in key |
| `lead_id` FK to durable `leads` | Claim never points to a nonexistent accepted lead |
| `expires_at`, `created_at` | Finite deduplication interval, e.g. current intended ten minutes |

Implementation design for Task 12: create/reclaim the claim using a **PostgreSQL transaction and unique constraint/row locking**, insert the lead and initial evidence **in the same transaction**, and commit atomically. Concurrent matching requests must converge on **one** durable `lead_id`. Redis may add a performance hint or abuse window; Redis's existing `GET` followed by `SET` is **not** the concurrency source of truth. Expiry/renewal must be tested at the boundary; the detailed SQL locking approach is subject to staging proof. The design can use a semantically equivalent database idempotency strategy if it satisfies these invariants and tests without more infrastructure.

**`data_rights_requests` (optional table in V1; manual secure register acceptable)**

Record request ID, request type, minimal contact locator, verification status, opened/closed timestamps, responsible operator, final action and legal-hold reason if applicable. Restrict access; do not duplicate the underlying lead message. Retention and access policy require O-06/counsel.

### 4.3 UI/permission design and legal-basis separation

1. Before the enquiry is submitted, display a concise, reviewable notice explaining the actual processing purpose, contact and notice version. The full policy must be accessible. Do not bundle optional marketing into the act of submitting an enquiry.
2. **Enquiry processing** (`enquiry_processing`): the visitor voluntarily provides data for the described response to their enquiry. The system records the notice version, purpose, action and whichever processing basis counsel selects. **Do not presume an obligatory “I consent” checkbox when section 7(a) is applicable.** Acknowledging a notice is not by itself legal consent.
3. **Product updates** (`product_updates`): separate optional, unchecked-by-default control; capture `granted` or `declined` with its notice version and timestamp. Never precheck, infer or silently migrate from `newsletter_signups`.
4. Visitor can withdraw optional product-update permission through a simple supported contact/mechanism; withdrawal is recorded as a new event and stops future marketing use. The mechanism and lawful handling of previously collected evidence need counsel review.
5. An unchosen marketing control must not block an enquiry. Accessibility, understandable language and narrow data collection are mandatory.
6. Enquiry data is not repurposed for an unrelated campaign or product telemetry merely because it was submitted.

### 4.4 API, transaction boundary and response contract

**Existing public entry point:** `POST /api/contact`, JSON, server Zod validation (`lib/validation/contact.ts`). Do not silently change URLs or add unauthorised public mutation routes. Form and route changes follow page/content approval.

Candidate logical request contract:

```json
{
  "name": "string",
  "email": "string",
  "company": "optional string",
  "projectType": "current field; consider optional after approved content review",
  "budget": "optional string",
  "timeline": "optional string",
  "preferredContactMethod": "optional string",
  "message": "string",
  "honeypot": "must be empty",
  "privacyNoticeVersion": "immutable published version ID",
  "productUpdatesOptIn": false
}
```

The two new fields above are **candidate API additions**, not present in current source. The final DTO will be specified against approved O-01/O-02 copy; an equivalent server-bound immutable notice reference may be used if auditability is preserved.

**Happy path sequence:** bounded content type/body → honeypot/rate limit → parse and validate → normalize → resolve published notice version → begin DB transaction → atomically reserve/reuse dedupe identity → insert `leads` and required initial `lead_consent_events` → COMMIT → return success for an accepted lead → attempt operator/visitor email independently or through durable recoverable work. Notifications never determine whether a lead was accepted.

| Result | Public response behavior | Invariant |
|---|---|---|
| Invalid/oversized/unsupported input | 400/413/415 with safe details as appropriate | No accepted lead. |
| Abuse/rate limited | 429 as appropriate | No accepted lead. |
| Database acceptance transaction fails | 503 with safe retry guidance | No accepted lead. |
| Durable commit succeeds | 200/2xx accepted with stable `leadId` and request correlation | Must **never later become false 503** due to email or status update. |
| Duplicate within dedupe window with previous committed lead | 200/2xx, `duplicate:true`, original lead ID | Exactly one accepted lead; no phantom acceptance. |
| Email/ack failed after commit | 200/2xx accepted; private retry/alert status | Persisted lead remains accepted. |

**P0 bug existing in baseline:** the handler inserts into Postgres, then calls notification-status updates inside outer request handling. If a later database update throws, the outer `catch` can report 503 although the lead remains saved. Task 12 **must** isolate all post-commit failures and preserve a truthful accepted response.

**P0 bug existing in baseline:** `isDuplicateSubmission()` checks Redis, followed by lead insert, then `reserveDuplicateKey()` writes Redis. Two simultaneous submissions may both pass the check and insert. Task 12 **must** use a durable atomic dedupe/claim mechanism.

### 4.5 Notification/recovery design

- Save acceptance before notifying; maintain `pending` / `sent` / `failed` operational states. The accepted enquiry must remain retrievable if email is unavailable.
- Operator email routes to the named O-03 recipient; visitor acknowledgement uses only the correct authenticated sender. Notification attempts, timestamps and safe error categories are visible to the responsible operator.
- Retry must not create a second lead. Use bounded retry/backoff, idempotent handling where supported by the provider, escalation for repeated failure and an operator-owned replay/recovery method.
- A **manual recoverable path is sufficient for V1** if it is documented, access-controlled, tested and actively owned; do not invent a queue cluster.
- Persist minimal details needed for recovery, do not place full lead text in public logging, analytics or unrelated monitoring context.
- `lib/db/recovery.ts` already supports retrieving pending/failed leads and retrying, but actual staging behavior, operational access and provider side-effects remain **NOT VERIFIED**.

### 4.6 Authenticated domain and delivery proof (required addition)

**Before staging notification testing**, authenticate the chosen sending domain via the relevant mail provider: publish and verify **SPF, DKIM and DMARC** records (with alignment/policy appropriate to provider and domain). Confirm the domain and From address are authorized; do not assume an API key proves domain authentication. Verify inbound operator mailbox, spam/junk placement, bounce/error observation and acknowledgement delivery to at least two approved test domains/accounts. Redact test PII and credential values from reports. These are **staging acceptance conditions**, not optional visual polish.

### 4.7 Operator export and administrative access

V1 may use a restricted one-off server-side script/export process, not a public admin UI. Require an explicit authorized operator, minimal data columns, approved purpose and secure transfer/storage. Record who exported, date, scope and destination in protected operational evidence. Do not put raw lead exports into either public GitHub repository or general screenshots.

### 4.8 Rights requests, retention, deletion and evidence

O-06 determines business retention duration, contact/rights owner and request response process after counsel review. Maintain an auditable request register and identity verification before disclosure/deletion. Apply data minimization and security measures; avoid public deletion links that accept only an unverified email address. Current helper functions `deleteLeadByEmail`, `deleteLeadById` and `purgeLeadsOlderThan` exist in source but must not run automatically or as an unauthenticated endpoint. The architecture must reconcile immutable historic evidence with applicable erasure and statutory retention/exception obligations; **do not make absolute delete-everything or keep-forever promises**.

### 4.9 Privacy-preserving analytics (required addition)

Per Master Plan §14.4/C7, analytics must be **operational at launch**, not added weeks later. V1 collects only aggregate, business-useful events, for example `page_view`, `primary_cta_clicked`, `enquiry_started` and `enquiry_accepted` (no personally identifiable payload). Never emit names, email, phone, message, IP, exact form values, full query strings, precise fingerprints, unique lead IDs or rich free text to analytics. Prefer **cookieless** tooling with no personal data in events and strict provider configuration/retention review; however, **cookieless is not automatically exempt from consent or other privacy duties**. Counsel determines whether consent, disclosure or a blocker is necessary in the chosen jurisdiction and configuration. Synthetic/product demo interactions must be distinguishable from genuine enquiries. Do not deploy an analytics provider before security/legal review and operational budget approval.

### 4.10 Enquiry processing and data lifecycle states

```text
Visitor form: DRAFT → VALIDATING → SUBMITTING
                                 |
                                 +--> VALIDATION_ERROR / RATE_LIMITED
                                 +--> NOT_ACCEPTED_RETRYABLE (DB failed)
                                 `--> ACCEPTED(leadId) [database commit]
                                              |
                                              +--> NOTIFY_PENDING
                                              +--> NOTIFY_SENT
                                              `--> NOTIFY_FAILED → RECOVERY → SENT/ESCALATED

Product updates: OFF_BY_DEFAULT → GRANTED → WITHDRAWN
                                     `-- future REGRANTED event (if chosen)

Privacy notice: DRAFT → REVIEWED → PUBLISHED_IMMUTABLE → SUPERSEDED
```

There is **no** transition from `ACCEPTED` to “not accepted” caused by an email failure, metrics failure or status-update exception. Separate user-facing acceptance state from private operational notification state.

## 5. Security, privacy and non-functional controls

### 5.1 Security architecture

- TLS everywhere; server-only secrets; principle of least privilege for database/provider credentials and operator exports.
- Validate authorization and scope for every private tool; no public lead/search/export endpoints without explicit design and review.
- Treat all form data as untrusted and HTML-escape all user-supplied content used in email or rendered pages.
- Strict size limits, rate limits, honeypot and abuse response; verify behavior under Redis unavailable, including fail-open/fail-closed choice explicitly.
- Password and access controls for production services and GitHub; staging/prod separation; no production test submissions without permission.
- Keep public repos free of private audits, raw proof, `.env` values and lead/customer records. Vault data needs a separately approved external encrypted backup and restore test.
- Verify provider claims about encryption at rest rather than repeating existing legal-page text as a proven fact.
- Limit monitoring/log retention, strip content and identifiers where unnecessary, and set real alert recipients.
- Assess dependency and package changes, CSP/security headers, browser storage, and cross-site request abuse before release.

### 5.2 Scalability and availability strategy

Prefer stateless Next.js request handlers and horizontally scalable deployment **when and if required by traffic**. PostgreSQL remains the authoritative write store; use transactions/uniqueness for correctness. Upstash controls bursts, not durable truth. For low volume, a recoverable table/status flow and operator-managed retries are sufficient. Add managed queues, background scheduling or CRM integration only on demonstrated failure, volume or revenue triggers. Capacity, provider cost limits, error budgets and recovery objectives require the named operator and O-10 budget; do not claim SLAs before proof.

### 5.3 Backup and resilience

- Separate **P0 vault backup task**: encrypted copy to Owner-approved external destination, checksum comparison and sampled restore; no delete/move of originals.
- Database/provider backup and restore strategy, monitoring recipient and rollback are launch gates, not deductions from a green CI build.
- Test lead acceptance DB-down, email-down, Redis-down, partial-update failures and concurrent submissions in a controlled staging environment.
- Public pages and form recovery guidance must remain useful when the backend is degraded.

## 6. Commercial and future integration boundaries

A person submits an enquiry → named operator reviews it → qualifies the request → communicates a tailored scope/quote through an approved external tool → commercial agreement/contract → delivery and support under actual signed terms. V1 ends at intake and secure operator handoff. No quotation record, invoice/payment engine, portal or SaaS tenant tables are part of this architecture candidate. Future integrations should consume permitted, purpose-scoped exported data, respect permissions and retain a reliable mapping to the original enquiry without adding that complexity now.

O-05 must define whether proposals are custom or packaged, responsibility for scope changes, legal IP/licensing language, payment terms and warranties. Website claims must never exceed those actual agreements.

## 7. Privacy and regulatory control map — **LEGAL REVIEW REQUIRED**

**This table is a design review checklist, not a legal opinion.** The applicability, commencement, data roles, lawful basis and final notice wording are **NOT APPROVED**. Requirements must be determined by qualified counsel for the actual O-01 entity, market, hosting and recipients.

| Topic | Candidate product treatment | Review / open gate |
|---|---|---|
| Entity, jurisdictions, role | Identify actual legal operator, contact and data processor relationships | O-01 + O-06; India/UK/cross-border applicability review. **LEGAL REVIEW REQUIRED** |
| Processing basis for enquiry | Disclose enquiry purpose; record version and selected basis | DPDP Act section 7(a) may address data voluntarily provided for a specified purpose; do not conflate with consent. **LEGAL REVIEW REQUIRED** |
| Optional product updates | Unchecked-by-default independent permission and withdrawal trail | Consent wording, notice and evidence sufficiency. **LEGAL REVIEW REQUIRED** |
| Notice and transparency | Publish clear, accessible, versioned notice; retain exact displayed text | Contact and rights links, itemised data/purposes, accessibility. **LEGAL REVIEW REQUIRED** |
| Children's data (under 18) | **State publicly: YCN's service is directed at businesses, not people under 18. No age-verification system in V1.** Do not deliberately solicit children's enquiries; define a response/escalation path if a minor's information arrives. | **DPDP Act §9 / DPDP Rule 10 applicability, whether a no-verification design is acceptable and any needed compensating control: LEGAL REVIEW REQUIRED.** B2B targeting does **not** automatically exempt processing. |
| Privacy analytics | Cookieless, no personal-data events; launch live per §14 C7 | Whether any consent, disclosure, retention or provider agreement required. **LEGAL REVIEW REQUIRED** |
| Data minimisation | Collect only enquiry-relevant fields and optional separate product-updates preference | Revise field categories against O-02; no fabricated compulsory fields. **LEGAL REVIEW REQUIRED** |
| Data rights / grievance | Contact + secure manual request register, identity verification, operator ownership | Applicable rights, timelines and response rules. **LEGAL REVIEW REQUIRED** |
| Retention and erasure | O-06 retention decision, manual workflow, statutory exception/log record review | DPDP Rule 8 and other applicable laws may affect timing and one-year processing/log requirements in defined cases. **LEGAL REVIEW REQUIRED** |
| Security and breach | Least privilege, incident/alert owner, recovery and privacy-safe monitoring | Statutory breach reporting duties, processors, breach response timelines. **LEGAL REVIEW REQUIRED** |
| Transfers and vendors | Name actual deployment, DB, Redis, email, analytics and error-monitoring vendors | Processing agreements, data locations and international transfers. **LEGAL REVIEW REQUIRED** |
| UK/GDPR | Current privacy/terms pages mention UK and GDPR, and `/contact` says UK operating location | Retain no unverified jurisdiction/office claim; applicability depends on O-01 and counsel. **LEGAL REVIEW REQUIRED** |

**Legislative date checkpoint, not a substitute for legal advice:** The Government of India notification dated 13 November 2025 staged DPDP Act commencement, with relevant sections 3–17 substantially scheduled eighteen months later; the notified DPDP Rules 2025 stage Rules 3, 5–16, 22–23 at eighteen months. Recheck official gazette, subsequent amendments, decisions and current law when counsel reviews, including the December 2025 corrigendum. No assumption that obligations are absent solely because an effective date is in the future.

**Official references for counsel:**
- DPDP Act commencement Gazette (G.S.R. 843(E), 13 Nov 2025): https://egazette.gov.in/WriteReadData/2025/267647.pdf
- Final DPDP Rules Gazette (G.S.R. 846(E), 13 Nov 2025): https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf
- Ministry rules and corrigendum index: https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digit

## 8. Mandatory Task 12 staging acceptance matrix

**Task:** `12 YCN-LEAD-STAGING-01` in Master Plan §14.7. Scenarios **4–6 are explicitly non-optional** and must cover the false-503 and non-atomic-dedupe findings. Numbering here is a proposed design-level mapping for reconciliation with Task 12's authoritative test checklist; it does not claim to quote an unavailable original test script.

| # | Acceptance scenario | Pass condition |
|---|---|---|
| 1 | Valid accepted enquiry with optional marketing OFF | One durable lead, exact notice version/events, accurate successful receipt, separate marketing OFF, operator delivery/recovery observable. |
| 2 | Invalid, malformed, oversized, honeypot and rate-limited submissions | Correct safe error/status and **no** falsely accepted lead. |
| 3 | Database unavailable or transaction rollback | No accepted receipt and no orphan dedupe/consent event. |
| **4** | **Lead committed; operator notification or subsequent status update fails** | **Visitor still gets accepted response with original lead ID; no false 503; recoverable pending/failed work.** |
| **5** | **Two or more identical submissions race concurrently** | **Only one durable lead and one atomic claim; replay gets same accepted ID; no duplicate side effects.** |
| **6** | **Duplicate replay plus Redis/provider failure around the acceptance boundary** | **No phantom success, no lost accepted lead, no duplicate insertion; failure in transient infrastructure does not bypass DB correctness.** |
| 7 | Product-updates opt-in and later withdrawal | Separate OFF-by-default choice, exact notice history, append-only events, no marketing after withdrawal. |
| 8 | Email identity/delivery | SPF/DKIM/DMARC verified; operator and visitor email tested with bounce/error observations and safe redaction. |
| 9 | Rights/retention manual operation | Identity verification, authorized action, auditable outcome and legally approved retention handling. |
| 10 | Analytics | Provider cookieless configuration inspected; event payload has no personal data; approved consent/disclosure decision and launch event proof. |
| 11 | Security and operations | Secrets isolated; rate limiting/environment boundaries tested; actionable alert and operator ownership confirmed. |
| 12 | Backup/recovery/rollback | Representative restore and exact SHA rollback documented; live-production deploy branch verified independently. |

For each scenario record exact tested SHA, environment, redacted raw output, counts/IDs, incident category, actual result, reviewer verdict and any open blocker. Unit tests alone are not a substitute for real controlled staging integration.

## 9. Open decisions and readiness gates

| Owner decision | Required before final architecture/content release |
|---|---|
| O-01 | Actual legal entity, operating place, market(s), customer segments, and privacy jurisdiction. |
| O-02 | Two or three truly deliverable V1 services, capability exclusions, named delivery capacity. |
| O-03 | Human lead recipient, contact methods, response policy, escalation and support ownership. |
| O-04 | Publishable actual work/permissions; unverified work stays `CONCEPT BUILD`/truthful fallback. |
| O-05 | Pricing/scope process and contract/IP, warranty and post-launch terms. |
| O-06 | Retention, rights/privacy contact, legal counsel, processors and legally reviewed privacy notice. |
| O-07 | Approved production logo or explicitly authorized interim; no WIP brand promotion. |
| O-08 | CLOSE safety/deletion/push authority; plan-first handling for mixed brand repo state. |
| O-09 | Conditional management launch target and actual weekly review time. |
| O-10 | Verified platform/domain/DNS, Postgres, Redis, Resend, Sentry, analytics and monthly operating budget. |

**Foundation sequence (14 Oct Owner direction):** Gate A (business facts, 16 Oct) → B1 (content/IA, target 20 Oct), B2 (design tokens, target 16 Oct), C/D (candidate now; finalize HLD/LLD after relevant Gate A answers, target 17 Oct) → Gate E cross-spec Owner approval (target 21 Oct) → bounded approved code tasks. B1/B2 and C/D may be researched in parallel without starting implementation. Task 07–09 coding is paused during these gates. Separately approved P0 vault backup/live-claims containment remains allowed.

The specified dates are **management targets**, not permission to bypass legal review or testing. Master Plan §14 continues to be the single plan; no new program/roadmap is created by this record.

## 10. Source traceability, review and change control

| Source | What this candidate derives from |
|---|---|
| `docs/YCN_MASTER_PLAN.md` §14 and `docs/BACKLOG.md` | Launch/non-goal scope, exact task IDs, release gates, protective work, conditional date. |
| `docs/YCN_DECISIONS.md` DECISION-051 | Scalable business foundation; purpose-separated consent/evidence; buy-before-build; customer-facing quality. |
| `docs/YCN_REQUIREMENTS.md` FR-009–011, NFR-013–020 | Understandable forms, durable acceptance, minimization, security, operations and integrity. |
| `docs/YCN_CONTENT_SPEC.md`; `docs/YCN_CLAIMS_AND_PROOF.md` | Ratified copy, honest promises and terms, optional planning fields. |
| `app/api/contact/route.ts` | Current validation, Redis dedupe, DB acceptance and notification failure path. |
| `lib/db/schema.ts`; `lib/db/migrations/0001_phase7_leads_hardening.sql` | Actual implemented lead and newsletter schema, migration baseline. |
| `lib/db/recovery.ts`; `lib/security/ratelimit.ts`; `lib/validation/contact.ts` | Retry/delete helpers, rate/dedupe behavior, form validation. |
| `docs/vnext/*`; `docs/YCN_DESIGN_SYSTEM.md` | Public experience, motion, interface and quality boundaries. |
| Claude review conveyed by Owner 14 October 2026 | Four additions: child visitor scope/Rule 10; cookieless analytics; SPF/DKIM/DMARC; Task 12 mandatory acceptance. |

### Change control before v1.0

1. Owner resolves applicable business facts and explicitly approves the proposed architecture. Claude independently checks the full candidate and its cross-references before any status promotion.
2. Qualified counsel reviews legal basis, age treatment, notice wording, retention, rights, processor geography and analytics. Counsel's review is distinct from Owner's technical approval.
3. Update this **same file** to `v1.0 — Owner-approved [actual date]; implementation NOT STARTED; legal clearance [actual status]` **only after approval exists**, with open legal blockers accurately reflected.
4. Keep `docs/STATE.md` and `docs/BACKLOG.md` truthful: 11a **CANDIDATE COMMITTED** is not `DONE/APPROVED`.
5. No code, database migration, provider configuration or production deployment may be justified merely by committing this document.

**End of architecture candidate v0.9.**
