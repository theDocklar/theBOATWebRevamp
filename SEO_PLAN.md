# theBOAT SEO Execution Plan

This file gives Claude (via Claude Code) everything needed to execute the striking-distance
keyword optimization and content expansion plan for theboatgrp.com. Drop this at the repo
root and run Claude Code from there.

## ⚠️ Data prerequisite — read first

The current Search Console export (`theboatgrp_com-Performance-on-Search-2026-08-19.xlsx`)
only covers:
- **1 page** (homepage only — filtered)
- **Last 3 months**
- **5 queries total**, all branded ("theboat", "the boat", "the boat website", "the boat web",
  "the boats")

It does **not** contain the Sri Lanka/Shopify/agentic-commerce striking-distance keywords or
client names (Olyce, Hima Products) referenced in the strategy below. Before Claude Code runs
the keyword-mapping steps in Phase 1, re-export GSC with:
- Page filter removed (all URLs)
- Date range: last 16 months
- Query + Page dimensions both enabled

Save the new export as `/data/gsc-export-full.csv` — Phase 1 scripts read from that path.
Until it's present, Phase 1 tasks should be treated as a template to fill in, not run blind.

---

## Project context

- **Site:** theboatgrp.com
- **Verticals:** Product Development, AI Automation, E-commerce (Shopify)
- **Goal:** Move position 11–20 ("striking distance") keywords into the top 10, and stand up
  new content for emerging high-intent topics (agentic commerce) ahead of competitors.

---

## Phase 1 — Striking-Distance Optimization (positions 11–20)

**Input:** `/data/gsc-export-full.csv` (see prerequisite above)

1. **Identify targets**
   - Filter GSC export to `Position >= 11 AND Position <= 20`.
   - Sort by Impressions descending — highest-impression rows are highest priority (most
     recoverable traffic per rank gain).
   - Output a working list to `/data/striking-distance-targets.csv` with columns:
     `query, url, position, impressions, ctr`.

2. **Heading alignment** — for each target URL:
   - Confirm the primary keyword (or close variant) appears in the `<h1>`.
   - Add or edit one `<h2>` per page to contain the keyword naturally. Examples from the
     brief:
     - `## Shopify Development Company in Sri Lanka`
     - `## Unlocking Agentic Commerce on Shopify`
   - Do not keyword-stuff — one clean, natural heading per target term is enough.

3. **Internal linking**
   - Search the codebase/CMS for existing case studies and blog posts that could reasonably
     link to each striking-distance page.
   - Replace generic anchors ("read more", "learn more", "click here") with descriptive,
     keyword-relevant anchor text, e.g.:
     - *"our Shopify development services in Sri Lanka"*
     - *"how agentic commerce works"*
   - Log every link added to `/data/internal-links-log.csv` (source page, target page, anchor
     text) so this is auditable and not repeated.

4. **On-page FAQs**
   - Add a short FAQ block (3–5 Q&As) to each striking-distance page, sourced from real
     "People Also Ask" / query variants in the GSC export where available.
   - Suggested topics from the brief:
     - Local payment gateway integration (PayHere, WEBXPAY) for Sri Lankan e-commerce
     - Automated AI checkout flows
   - Mark up FAQs with `FAQPage` schema (JSON-LD).

**Definition of done for Phase 1:** every position 11–20 URL has an aligned H1/H2, at least
one new descriptive internal link pointing to it, and an FAQ block with schema.

---

## Phase 2 — Content Expansion Blueprint

| Target Theme | Content Type | Path convention | Focus Angle |
|---|---|---|---|
| Regional Shopify Dev | Regional service page | `/services/shopify-development-sri-lanka/` | PayHere & WEBXPAY integration, multi-currency routing, localization for Sri Lankan businesses |
| Agentic Commerce | Technical guide | `/guides/agentic-commerce-shopify/` | How AI agents, automated buying protocols, and headless APIs interact with Shopify's backend |
| Portfolio & Case Studies | Client deep-dive | `/case-studies/<client-slug>/` | Technical architecture, performance improvements, real metrics — confirm client names/permissions before publishing |

### Build order
1. **Regional Shopify Dev page** — highest commercial intent, ships first.
2. **Agentic Commerce guide** — early-mover content; ships second while the topic is still
   emerging (time-sensitive).
3. **Case studies** — verify with the account/sales team which client names and metrics are
   cleared for public use before drafting; do not publish placeholder client names.

### Per-page checklist (apply to all three)
- [ ] Target keyword in H1 and at least one H2
- [ ] Meta title ≤ 60 chars, meta description ≤ 155 chars, both containing the target keyword
- [ ] 3–5 question FAQ block with `FAQPage` schema
- [ ] At least 2 internal links in, at least 2 internal links out
- [ ] One clear CTA matching the page's vertical (Product Dev / AI Automation / E-commerce)
- [ ] Added to XML sitemap
- [ ] Logged in `/data/content-expansion-tracker.csv` (title, url, publish date, target keyword,
      status)

---

## Phase 3 — Tracking & Iteration

- Re-pull the GSC export monthly to the same `/data/gsc-export-full.csv` path (overwrite) so
  Phase 1's target list can be regenerated and progress compared month over month.
- Track for each striking-distance URL: starting position → position 30/60/90 days after
  optimization.
- Any keyword that reaches position ≤ 10 moves out of the striking-distance list and into a
  "maintain" list — don't keep re-optimizing pages that have already converted.

---

## Notes for Claude Code

- Don't hardcode the client names or metrics referenced in the original brief (Olyce, Hima
  Products) into published copy — confirm with the user first; treat them as placeholders.
- Keep all new pages consistent with the existing site's design system/component library
  rather than introducing new page templates per piece of content.
- Log every change (heading edits, links added, pages created) so this file's checklists can
  be re-run as a progress audit, not just a one-time task list.

---

## Investigation notes (2026-08-19)

Before running Phase 2, verify current state — it has already moved since this plan was written:

- **`/shopify-development-sri-lanka` and `/services/agentic-commerce-shopify` already exist**
  as fully-built pages (`src/app/shopify-development-sri-lanka/page.tsx`,
  `src/app/services/agentic-commerce-shopify/page.tsx`), both already in the sitemap at
  priority 0.95 — the highest on the site. Do not create new pages at the plan's proposed
  paths (`/services/shopify-development-sri-lanka/`, `/guides/agentic-commerce-shopify/`) —
  that would create duplicate content cannibalizing these existing pages. Treat Phase 2 items
  1–2 as "optimize existing page," not "create new page."
- **Both pages have zero internal links pointing to them** from anywhere else in `src/` — the
  only reference outside their own page file is `sitemap.ts`. This is the concrete, real
  target for the Phase 1/2 internal-linking task.
- **Neither page has an FAQ block**, despite the codebase already having reusable FAQ
  infrastructure (`src/components/FAQBlock.tsx`, `FAQSection.tsx`,
  `src/components/schema/FAQSchema.tsx`, which renders `FAQPage` JSON-LD) currently only used
  on the homepage (`src/app/page.tsx`). Adding FAQs to these two pages is a drop-in job.
- The GSC export in `~/Downloads/theboatgrp.com-Performance-on-Search-2026-08-19.xlsx` is
  confirmed to exist but matches the plan's own description of the limited export (homepage
  only, 3 months, 5 branded queries) — Phase 1 remains blocked on a proper re-export.
