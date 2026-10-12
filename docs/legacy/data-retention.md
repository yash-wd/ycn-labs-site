> [!NOTE]
> **HISTORICAL REFERENCE ONLY — NOT ACTIVE PROJECT AUTHORITY**
> This document is preserved for engineering provenance and historical record.
> It has been superseded by the **YCN Canonical v1.2** specification suite.
> For current active project specifications, task queues, and architecture, consult [`docs/INDEX.md`](../INDEX.md).

---

# Data Retention and Privacy Policy

> [!NOTE]
> Retention periods marked **APPROVED** are owner-approved and are published on `/legal/privacy`. Rows still marked **PROPOSED** are not yet approved and must not be published. This document is not legal advice and remains subject to legal review.

---

## 1. Data Retention Schedules

| Data Category | Retention Period | Storage Location | Deletion Trigger |
|---|---|---|---|
| **Contact Form Leads** | **APPROVED: 24 Months** | PostgreSQL (`leads` table) | Purged 24 months after our last exchange, unless an active project engagement applies |
| **Newsletter Subscriptions** | **APPROVED: Until unsubscribed, plus 30 days** | PostgreSQL (`newsletter_signups` table) | Removed 30 days after an unsubscribe request, the delay existing only to honour the request itself |
| **Server Audit Logs** | **APPROVED: 90 Days** | Vercel / Server Console Logs | Rolling 90-day log expiration |
| **Rate Limit / Dedupe Keys** | **APPROVED: 10 minutes** | Upstash Redis | Redis TTL of 600 seconds set at write time (`lib/security/ratelimit.ts`) |

---

## 2. Data Processors List

| Processor | Role | Data Processed | Privacy Safeguards |
|---|---|---|---|
| **Vercel** | Web Hosting & Edge Infrastructure | Anonymized IP addresses, HTTP request headers | SSL/TLS in transit, SOC2 compliant |
| **PostgreSQL Provider** | Relational Database Storage | Form lead names, emails, company, project scope | Encrypted at rest, SSL in transit |
| **Upstash Redis** | Distributed Rate Limiting & Deduplication | **SHA-256 hashed IP strings**, SHA-256 payload hashes | Zero raw PII or raw IP storage |
| **Resend** | Transactional Email Dispatch | Contact lead submission notifications | TLS transmission, DMARC/DKIM/SPF authenticated |

---

## 3. User Data Rights & Deletion Request Handling

- **Data Subject Rights:** Users in India, the EU (GDPR), US (CCPA), and globally have the right to request access to or deletion of their submitted contact information.
- **Deletion Request Protocol:**
  1. Users email deletion requests to **`hello@ycnlabs.com`**.
  2. The site administrator verifies request identity and executes `DELETE FROM leads WHERE email = $1` and `DELETE FROM newsletter_signups WHERE email = $1`.
  3. Confirmation of deletion is dispatched within **7 business days**.

---

## 4. Privacy Contact Details

- **Data Controller:** YCN Labs Studio
- **Contact Email:** `hello@ycnlabs.com`
