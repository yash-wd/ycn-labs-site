# YCN Labs — Claims & Proof Register

**Revision:** 1.2

Public factual claims require evidence appropriate to the wording. Owner approval can authorize copy or a business commitment; it cannot magically turn an untested technical claim into VERIFIED evidence.

## Statuses

- **VERIFIED** — evidence supports the exact factual wording.
- **COMMITMENT** — Owner/operations intentionally adopts a future behavior (for example a response-time promise); publish only if it can actually be honored.
- **TARGET** — an internal engineering target; publish only as a target/budget when useful.
- **UNVERIFIED** — do not publish as fact.
- **DO NOT PUBLISH** — prohibited until circumstances fundamentally change.
- **NOT APPLICABLE** — not currently part of the public site.

## Register

| Claim/topic | Evidence needed | Current status | Publication rule |
|---|---|---|---|
| “WCAG 2.2 AA” / conformance | Full scope accessibility evaluation including manual keyboard/AT checks | UNVERIFIED | Do not claim conformance yet. Describe specific practices only when true. |
| Lighthouse score | Raw agreed-profile report tied to candidate/production | UNVERIFIED | Keep as internal target unless measured. |
| Core Web Vitals result | Sufficient field data for correct population/time window | UNVERIFIED | Do not infer from lab data. |
| One-business-day reply | Named operator + Owner operational commitment + process | UNVERIFIED | Omit promise until intentionally adopted and staffed. |
| “You own the code/software” | Actual contract/IP/licensing terms | UNVERIFIED | Say ownership follows the signed agreement. |
| JavaScript Learning Platform = Internal Product | Repo/runtime ownership and actual stage | UNVERIFIED in this package | Publish classification only after audit evidence. |
| Multi-Tenant SaaS Architecture = Concept Build | Actual repo/design artifact and scope | UNVERIFIED in this package | Publish only after audit confirms classification/scope. |
| Client work/testimonials/logos | Real client + permission + source evidence | DO NOT PUBLISH until real | Never fabricate. |
| “Trusted by X businesses” | Countable real customer evidence | DO NOT PUBLISH until true | Never estimate/fake. |
| Uptime guarantee | Contract + monitoring + service design | DO NOT PUBLISH by default | Never casually promise. |
| Cybersecurity as active service | Defined service, qualified delivery capability, process/insurance/legal readiness as applicable | UNVERIFIED | Future direction only until capability is established. |
| Digital marketing as active service | Defined offer + delivery capability | UNVERIFIED | Do not list as current proven offer until established. |
| International client experience | Actual client evidence | UNVERIFIED | Capability to work remotely can be stated only if operationally true; do not imply past clients. |
| Security practices | Actual implementation/checklist evidence | UNVERIFIED until audit | Describe specific implemented practices, never “100% secure.” |
| Enquiry durability/recovery | Staging/production acceptance + failure/recovery evidence | UNVERIFIED until B3/D1 | Do not promise reliable receipt until proven. |
| “Internal product”, “concept”, “deployed” statuses | Repo/runtime/source classification | UNVERIFIED until audit | Use explicit stage/limitations. |

## Process

New public factual claim → add row → identify required evidence → gather evidence → independent review → Owner publication decision → publish exact supported wording.

A schema validator can prove required metadata exists; it cannot prove the external fact is true.
