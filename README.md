# YCN Labs — Project Overview

> **Active Development Repository:** [https://github.com/yash-wd/ycn-labs-site](https://github.com/yash-wd/ycn-labs-site) (branch: `main`).  
> *Historical Notice:* The earlier private repository (`yash-wd/ycnlabs`) and branch `site-v2` are preserved for historical reference.  
> **AI sessions:** Read [docs/START_HERE.md](docs/START_HERE.md) first for active project context, current milestones, and engineering rules.

## 1. What is this Repository?
This is the official codebase for the **YCN Labs** website (`ycnlabs.com`). YCN Labs builds websites, business systems, applications, and bespoke software for businesses, communicating complex engineering capabilities in clear, approachable language for non-technical small business owners while providing architectural precision for technical buyers.

## 2. Core Architecture
- **Framework:** Next.js 16 (App Router, React 19) — `package.json:20,23`
- **Styling:** Tailwind CSS v4 with a CSS-variable token system in `app/globals.css` (hex values; brand palette → brand roles → component names, YCN-TOKENS-T1-01) — `package.json:33,37`
- **Typography:** Space Grotesk & Inter, self-hosted (`app/fonts.css`, `public/fonts/`, YCN-FONTS-LOCAL-01); no Google Fonts request at build or runtime — `app/layout.tsx`
- **Form & Validation:** React Hook Form & Zod 4 — `package.json:12,25,28`
- **Backend & Database:** Next.js Route Handlers, Drizzle ORM, Postgres client (`postgres`) — `package.json:17,22`
- **Rate Limiting & Deduplication:** Upstash Redis (`@upstash/redis`, `@upstash/ratelimit`) — `package.json`; when the Upstash credentials are absent the limiter lets requests through (`lib/security/ratelimit.ts`). In production, `getServerEnv()` (`lib/env/server.ts`) throws on missing required variables **when it is first called**, not at server start; so a production server can start and answer `/api/health` while `/api/contact` fails on first use. Startup-wide readiness is not yet proven. Behaviour when Redis is configured but unreachable, and trust of `x-forwarded-for`, are still to be verified on a deployed preview (Task 13).
- **Email Delivery:** Resend API integration with error categorization — `package.json:26`
- **Animation & UI:** GSAP 3.15 (`package.json:18`), Lucide React (`package.json:19`), Next Themes (`package.json:21`)
- **Observability:** the Sentry SDK (`@sentry/nextjs`) is installed and `app/api/contact/route.ts` calls `Sentry.captureException`, but **no `Sentry.init`, instrumentation file or `withSentryConfig` exists yet** (confirmed 10 Nov 2026). Error reporting is not operational until a separately approved task initialises it and a test alert is verified. `app/api/health` is a liveness check only; it does not test the database, Redis or email.
- **Testing:** Vitest (`package.json:39`), Playwright (`package.json:32`)
- **Deployment Platform:** Vercel (No production deployment authorized during active development)

## 3. Project Documentation & Single Authority
All active project documentation lives under `docs/`.

- **Documentation Entry Point:** [`docs/INDEX.md`](docs/INDEX.md)
- **Governance & Safety:** [`docs/YCN_AGENT_OPERATING_PROTOCOL.md`](docs/YCN_AGENT_OPERATING_PROTOCOL.md)
- **Task Queue:** [`docs/BACKLOG.md`](docs/BACKLOG.md) (current); [`docs/YCN_AGY_TASKS.md`](docs/YCN_AGY_TASKS.md) is historical (AGY retired from execution, DECISION-055 Amendment 1)
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
