> [!NOTE]
> **HISTORICAL REFERENCE ONLY — NOT ACTIVE PROJECT AUTHORITY**
> This document is preserved for engineering provenance and historical record.
> It has been superseded by the **YCN Canonical v1.2** specification suite.
> For current active project specifications, task queues, and architecture, consult [`docs/INDEX.md`](../INDEX.md).

---

# Route Inventory

Audited listing of all routes across `apps/web`.

## Route Category Counts

| Category | Count | Routes Included |
|---|---|---|
| **Public Page URLs (Static)** | **17** | `/`, `/about`, `/contact`, `/engineering`, `/process`, `/services`, `/services/web`, `/services/web-apps`, `/services/saas`, `/services/mobile`, `/services/ai`, `/services/software`, `/blog`, `/work`, `/legal/cookies`, `/legal/privacy`, `/legal/terms` |
| **Dynamic Route Definitions** | **2** | `/blog/[slug]`, `/work/[slug]` |
| **Generated Dynamic URLs (SSG)** | **3** | `/blog/targeting-95-lighthouse`, `/work/js-learning-platform`, `/work/saas-architecture` |
| **API Endpoints** | **3** | `/api/contact`, `/api/newsletter`, `/api/health` |
| **Framework & Special Routes** | **3** | `/_not-found`, `/sitemap.xml`, `/robots.txt` |
| **Total Canonical Public URLs** | **20** | 17 static + 3 SSG dynamic URLs |

---

## Counting Methodology

1. **Static Public Page URLs (17):** Identified by counting all `page.tsx` files located within non-dynamic subdirectories of `apps/web/app/`.
2. **Dynamic Route Definitions (2):** Identified by matching bracketed folder names (`[slug]`) containing `page.tsx` handlers.
3. **Generated Dynamic URLs (3):** Evaluated from data exports (`CASE_STUDIES` in `content/case-studies.ts` and `BLOG_POSTS` in `content/blog-posts.ts`) supplied to `generateStaticParams()`.
4. **API Endpoints (3):** Identified by counting all `route.ts` files inside `apps/web/app/api/` (`/api/contact`, `/api/newsletter`, `/api/health`).
5. **Framework & Special Routes (3):** Special Next.js app metadata/handler exports (`sitemap.ts`, `robots.ts`, `not-found.tsx`).

---

## Sitemap Inclusions

The production sitemap (`/sitemap.xml`) contains exactly the **20 canonical public URLs** (17 static public pages + 3 generated dynamic pages). API endpoints (`/api/*`) and error pages (`/_not-found`) are strictly excluded.
