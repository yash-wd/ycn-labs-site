# YCN Labs — Project Overview

> **Active Development Repository:** [https://github.com/yash-wd/ycn-labs-site](https://github.com/yash-wd/ycn-labs-site) (branch: `main`).  
> *Historical Notice:* The earlier private repository (`yash-wd/ycnlabs`) and branch `site-v2` are preserved for historical reference.  
> **AI sessions:** Read [docs/START_HERE.md](docs/START_HERE.md) first for active project context, current milestones, and engineering rules.

## 1. What is this Repository?
This is the official codebase for the **YCN Labs** website (`ycnlabs.com`). YCN Labs builds websites, business systems, applications, and bespoke software for businesses, communicating complex engineering capabilities in clear, approachable language for non-technical small business owners while providing architectural precision for technical buyers.

## 2. Core Architecture
- **Framework:** Next.js 16 (App Router, React 19) — `package.json:20,23`
- **Styling:** Tailwind CSS v4 with custom HSL token architecture (`app/globals.css`) — `package.json:33,37`
- **Typography:** Space Grotesk & Inter via `next/font/google` — `app/layout.tsx:2-18`
- **Form & Validation:** React Hook Form & Zod 4 — `package.json:12,25,28`
- **Backend & Database:** Next.js Route Handlers, Drizzle ORM, Postgres client (`postgres`) — `package.json:17,22`
- **Rate Limiting & Deduplication:** Upstash Redis (`@upstash/redis`, `@upstash/ratelimit`) — `package.json:14-15`; bypassed when Upstash credentials are absent (`lib/security/ratelimit.ts:18-28`, warning emitted when `NODE_ENV !== "production"`)
- **Email Delivery:** Resend API integration with error categorization — `package.json:26`
- **Animation & UI:** GSAP 3.15 (`package.json:18`), Lucide React (`package.json:19`), Next Themes (`package.json:21`)
- **Observability:** Sentry (`@sentry/nextjs`) exception tracking — `package.json:13`
- **Testing:** Vitest (`package.json:39`), Playwright (`package.json:32`)
- **Deployment Platform:** Vercel (No production deployment authorized during active development)

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
