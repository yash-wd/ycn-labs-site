# YCN Labs — Project Overview

## 1. What is this Repository?
This is the official codebase for the **YCN Labs** website (`ycnlabs.com`). YCN Labs builds websites, business systems, applications, and bespoke software for businesses, communicating complex engineering capabilities in clear, approachable language for non-technical small business owners while providing architectural precision for technical buyers.

## 2. Core Architecture
- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4 with a CSS-variable token system in `app/globals.css` (hex values; brand palette → brand roles → component names, YCN-TOKENS-T1-01)
- **Typography:** Space Grotesk (display) and Inter (body), self-hosted from `public/fonts/` via `app/fonts.css` (YCN-FONTS-LOCAL-01)
- **Form & Validation:** React Hook Form, Zod 4 (`lib/validation/contact.ts`); server-side escaping and error sanitising in `lib/security/sanitize.ts` (no DOMPurify dependency)
- **Backend & Database:** Next.js Route Handlers, Drizzle ORM, Postgres client (`postgres`)
- **Rate Limiting & Deduplication:** Upstash Redis sliding window (`lib/security/ratelimit.ts`); duplicate enquiries are deduplicated by a database idempotency key, not by Redis. There is no in-memory fallback: without Upstash credentials the limiter passes requests. In production, `getServerEnv()` (`lib/env/server.ts`) throws on missing required variables when first called (runtime validation, not a startup check); `/api/health` is liveness only and does not exercise it.
- **Email Delivery:** Resend API integration with partial-failure error capture
- **Observability:** Sentry SDK installed and called from the contact route, but **not initialised** (no `Sentry.init`/instrumentation as of 10 Nov 2026); a separately approved task must set it up and verify an alert. `app/api/health` is liveness only.
- **Deployment Platform:** Vercel is planned; no Vercel project exists for this repository yet and no production deployment is authorized during active development

## 3. Project Documentation & Single Authority
All active project documentation lives under `docs/`.

- **Documentation Entry Point:** [`docs/INDEX.md`](docs/INDEX.md)
- **Governance & Safety:** [`docs/YCN_AGENT_OPERATING_PROTOCOL.md`](docs/YCN_AGENT_OPERATING_PROTOCOL.md)
- **Task Queue:** [`docs/BACKLOG.md`](docs/BACKLOG.md) (current); [`docs/YCN_AGY_TASKS.md`](docs/YCN_AGY_TASKS.md) is historical
- **AI Agent Instructions:** [`AGENTS.md`](AGENTS.md)
- **Historical Records:** Legacy monorepo documents and superseded ledgers are archived in [`docs/legacy/`](docs/legacy/) and are non-authoritative.

## 4. Safe Development Workflow
Prerequisites: Node.js 24+, pnpm 11+.

```bash
# Check code formatting & lint
pnpm run lint

# Validate static types
pnpm run check-types

# Run automated tests (offline mocks)
pnpm run test

# Production build verification
pnpm run build

# Start local development server (port 3005)
pnpm run dev
```

*Note: Environment variables for local development can be configured in `.env.local`. Do not commit production secrets or credentials.*
