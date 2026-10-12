# YCN Labs — Project Overview

> **AI sessions:** Read [docs/START_HERE.md](docs/START_HERE.md) first for active project context, current milestones, and engineering rules.

## 1. What is this Repository?
This is the official codebase for the **YCN Labs** website (`ycnlabs.com`). YCN Labs builds websites, business systems, applications, and bespoke software for businesses, communicating complex engineering capabilities in clear, approachable language for non-technical small business owners while providing architectural precision for technical buyers.

## 2. Core Architecture
- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4 with custom HSL token architecture (`app/globals.css`)
- **Typography:** Geist Sans via `next/font/google`
- **Form & Validation:** React Hook Form, Zod 4, DOMPurify sanitization
- **Backend & Database:** Next.js Route Handlers, Drizzle ORM, Postgres client (`postgres`)
- **Rate Limiting & Deduplication:** Upstash Redis with robust in-memory sliding-window fallback
- **Email Delivery:** Resend API integration with partial-failure error capture
- **Observability:** Sentry (`@sentry/nextjs`) exception tracking and JSON structured audit logs
- **Deployment Platform:** Vercel

## 3. Project Documentation & Single Authority
All active project documentation lives under `docs/`.

- **Documentation Entry Point:** [`docs/INDEX.md`](docs/INDEX.md)
- **Governance & Safety:** [`docs/YCN_AGENT_OPERATING_PROTOCOL.md`](docs/YCN_AGENT_OPERATING_PROTOCOL.md)
- **Task Queue:** [`docs/YCN_AGY_TASKS.md`](docs/YCN_AGY_TASKS.md)
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
