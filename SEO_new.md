# theBOAT — Organic Growth & SEO Plan

**Site:** theboatgrp.com
**Written:** 20 August 2026
**Window:** 20 Aug 2026 → 18 Nov 2026 (90 days), with a 12-month trajectory
**Goals set by founder:** (1) convert at least one inbound lead, (2) reach 10 booked discovery calls per week
**Method constraint:** **No paid advertising. No cold outreach. No directory campaigns.** Growth comes solely from content and site structure.
**UI constraint:** **No visual redesign.** All existing components, styling and layout stay as-is. Pages may gain new content sections, but only built from component patterns that already exist in the codebase.
**Markets:** Sri Lanka first, international second
**Supersedes:** `SEO_PLAN.md` (archived to `_to_delete/` — it was written against a stale, homepage-only GSC export)

---

## 0. Read this first — what a pure-organic constraint means for the target

You've chosen the slowest-starting and longest-lasting growth method. That's a legitimate choice — organic compounds, costs nothing per lead, and the asset belongs to you permanently. But it has to be planned honestly.

**The arithmetic, from your own Search Console data:**

| Metric | Current (28 days, verified) |
|---|---|
| Total organic clicks, all pages | **19** |
| Clicks per week | **~4.75** |
| **Non-branded clicks** | **0** |
| Total impressions | ~229 |
| Pages receiving any impressions | 17 |

Working backwards from 10 booked calls/week at a 3% visitor-to-booking rate: you need roughly **330 organic visits per week — about 70× where you are today.**

New content typically takes **3–6 months** to rank on a young domain. Content published in Week 5 of this plan is not competing meaningfully until roughly Week 20. That is the constraint that governs everything below.

### Honest trajectory

| | Week 4 | Week 8 | **Week 13 (90 days)** | Month 6 | Month 9 | Month 12 |
|---|---|---|---|---|---|---|
| Organic clicks/week | 8–12 | 15–30 | **30–60** | 90–150 | 180–280 | 300–450 |
| **Booked calls/week** | 0–1 | 1–2 | **1–3** | 3–5 | 6–8 | **9–12** |

**10 calls/week is a 9–12 month goal on this method, not a 90-day one.** The 90-day window delivers 1–3 calls/week and — more importantly — builds the machine that produces 10/week later.

**Goal (1), converting at least one lead, is achievable inside the first two weeks** — but only if the booking and contact paths actually work. See §2, which is the highest-priority section in this document.

### Levers you are deliberately not using

Recording these so the decision stays visible, not to relitigate it:

- **Paid search** — the only lever fast enough to hit 10/week inside 90 days
- **Cold outbound** — free, roughly 1–2 calls/week at 20–40 messages/week
- **Directory listings** (Shopify Partner Directory, Clutch, Google Business Profile) — research found directories hold **5–7 of ~9 organic slots** on your core Shopify terms, and every consistently-ranking competitor is listed in at least one

That last one is the most expensive omission. Directories aren't marketing spend — they're the infrastructure the SERP is built from. Worth revisiting at the 90-day review, especially the free Shopify Partner Directory listing and Google Business Profile.

### What "purely on-site" actually gives you

Three levers, all within scope:

1. **Recovering value you already earn but currently throw away** (§2) — the largest immediate win by far
2. **Site structure** — URL architecture, internal linking, schema, metadata, crawl efficiency (§4)
3. **Content volume and depth** (§6) — with the other channels removed, this becomes the *only* growth engine, so the cadence has to be higher than it would otherwise be: **2 substantial pieces per week**

---

## 1. Where you actually stand

### 1.1 The full GSC picture (28 days, pulled 20 Aug 2026)

**Queries — 18 total. All 4 clicks are branded.**

| Query | Clicks | Impr. | Avg. position |
|---|---|---|---|
| theboat | 3 | 9 | 4.4 |
| the boat | 1 | 4 | 14.0 |
| olyce | 0 | 8 | 8.6 |
| shopify sri lanka | 0 | 6 | 24.3 |
| shopify development company sri lanka | 0 | 4 | 24.8 |
| agentic commerce shopify | 0 | 3 | 41.3 |
| hima products | 0 | 3 | 9.3 |
| hima products ja ela | 0 | 3 | 9.0 |
| is shopify available in sri lanka | 0 | 2 | 30.5 |
| ai agency | 0 | 2 | 76.0 |
| *(8 more at 1 impression each)* | 0 | 1 | 28–87 |

**Zero non-branded clicks in 28 days.** Every commercial term sits at position 24–87 — nowhere near the click zone.

**Pages — 17 total.**

| Page | Clicks | Impr. | CTR | Avg. pos |
|---|---|---|---|---|
| `/` | 9 | 28 | 32.1% | 12.3 |
| `/stores` | 5 | 17 | 29.4% | 18.5 |
| `/work/olyce` | 2 | 18 | 11.1% | 7.4 |
| `/blog/shopify-development-sri-lanka-guide-2026` | 1 | 42 | 2.4% | 16.7 |
| `/services/shopify-sri-lanka` | 1 | 13 | 7.7% | 13.1 |
| `/services/web-development-colombo` | 1 | 6 | 16.7% | 24.2 |
| `/work/troi` | 0 | 26 | 0% | 6.4 |
| `/work/hima` | 0 | 22 | 0% | 8.0 |
| `/blog/what-is-agentic-commerce` | 0 | 19 | 0% | 34.9 |
| `/services/ai-automation-sri-lanka` | 0 | 11 | 0% | 27.5 |
| `/work/finpilot` | 0 | 10 | 0% | 6.9 |
| `/services/ai-agents-sri-lanka` | 0 | 6 | 0% | 9.8 |
| `/blog/n8n-vs-make-vs-zapier-2026` | 0 | 4 | 0% | 8.0 |
| `/services/ai-agents` | 0 | 3 | 0% | 8.7 |
| `/services/agentic-commerce` | 0 | 2 | 0% | 43.5 |
| `/work/bounce` | 0 | 1 | 0% | 4.0 |
| `/resources` | 0 | 1 | 0% | 74.0 |

### 1.2 What's working — protect these

- **Technical foundation is genuinely good.** Correct per-page canonicals (verified — every page properly overrides the root canonical), `robots.ts`, dynamic `sitemap.ts`, and a full schema component library already built: `ArticleSchema`, `BreadcrumbSchema`, `FAQSchema`, `LocalBusinessSchema`, `OrganizationSchema`, `ServiceSchema`. Most competitors have none of this. **You have the components — they're just underused.**
- **Homepage CTR is 32%** at position 12.3. Exceptional. Your title/meta writing works.
- **`/stores` gets 29% CTR** at position 18.5.
- **You publish real pricing** on `/shopify-development-sri-lanka` ($3k / $6k / $500 mo) and `/services/agentic-commerce-shopify` ($12k / $2–5k mo). Of every competitor researched, **only one** publishes any pricing at all.
- **Case studies name real clients** across LK and UAE: Olyce, Hima, Troi, Finpilot, Bounce, Promaster.

---

## 2. 🔴 P0 — Emergency fixes (Week 1)

With paid and outbound off the table, recovering value you already earn becomes disproportionately important. These are all invisible changes — **no UI impact whatsoever.**

### P0-0 — Reconcile repo ↔ production
Your local repo and deployed site have diverged. Verified: `/work/promaster` is **live** but has no route in the local repo and isn't in local `sitemap.ts`. Conversely `src/app/services/ai-automation/page.tsx` **exists locally** and is listed in local `sitemap.ts`, but **404s in production**.

Nothing below can be executed reliably until this is fixed. Determine which is authoritative and redeploy from a known-good branch.

### P0-1 — Eight ranking URLs are serving 404s
Verified live on 20 Aug 2026:

| GSC URL (earning impressions) | Live status | At stake |
|---|---|---|
| `/blog/what-is-agentic-commerce` | **404** | 19 impressions |
| `/services/shopify-sri-lanka` | **404** | 13 impressions + **1 click** |
| `/services/ai-automation-sri-lanka` | **404** | 11 impressions |
| `/services/ai-agents-sri-lanka` | **404** | 6 impr., **position 9.8** |
| `/blog/n8n-vs-make-vs-zapier-2026` | **404** | 4 impr., **position 8.0** |
| `/services/ai-agents` | **404** | 3 impr., position 8.7 |
| `/services/agentic-commerce` | **404** | 2 impressions |
| `/services/ai-automation` | **404** | in local sitemap, dead live |
| `/services/web-development-colombo` | not in sitemap | 6 impr. + **1 click** |

**~58 impressions and 2 of your 19 clicks — roughly a quarter of all impressions — point at pages that don't exist.** Two of them rank on **page one** and serve a 404 to anyone who clicks.

Add to `next.config.ts`:

```ts
async redirects() {
  return [
    { source: '/services/shopify-sri-lanka',       destination: '/shopify-development-sri-lanka',     permanent: true },
    { source: '/services/agentic-commerce',        destination: '/services/agentic-commerce-shopify', permanent: true },
    { source: '/services/ai-automation-sri-lanka', destination: '/services/ai-automation',            permanent: true },
    { source: '/services/ai-agents-sri-lanka',     destination: '/services/ai-automation',            permanent: true },
    { source: '/services/ai-agents',               destination: '/services/ai-automation',            permanent: true },
  ]
}
```

**Do not redirect the two blog URLs — republish them** (§6.1). They're presumably unpublished Sanity drafts that Google still has ranked. `/blog/n8n-vs-make-vs-zapier-2026` sitting at position 8.0 is the most valuable orphaned asset you own.

`/services/web-development-colombo` earns impressions and a click while 404ing — **build the page** (§5).

**Expected impact:** recovers ~58 impressions/month and stops burning crawl budget. Realistically 2–5 extra clicks/week within 3–4 weeks. Half a day of work.

### P0-2 — Duplicated brand suffix in title tags
Root layout uses `template: "%s · theBOAT"`, but several pages set titles already ending in `· theBOAT`, producing *"Expert Shopify Development & Architecture in Sri Lanka · theBOAT · theBOAT"*.

Confirmed in `src/app/stores/layout.tsx`, `src/app/shopify-development-sri-lanka/page.tsx`, `src/app/services/page.tsx`. Strip the manual suffix; let the template add it. Audit every `metadata.title` for the same pattern.

### P0-3 — Verify the booking link end to end
Every "Book a call" resolves to `CALENDLY_URL` in `src/lib/constants.ts`. The live-site audit observed a `?month=2025-11` parameter — nine months in the past, which would drop bookers onto an empty past calendar at the exact moment of intent. Confirm whether production appends this; strip it if so.

**Then book a test call yourself and confirm the notification arrives.**

### P0-4 — Verify the contact form actually sends
`src/app/api/contact/route.ts` returns **503 and sends nothing** if `GMAIL_USER`, `GMAIL_APP_PASSWORD` or `CONTACT_TO_EMAIL` are unset in the production environment. Submit a real test enquiry against production and confirm receipt.

> **P0-3 and P0-4 are goal (1).** If either is broken, you have been silently losing every lead, and no amount of content will convert. Test both this week. This is the single most likely explanation for zero conversions to date.

---

## 3. Working within the UI constraint

Everything in this plan falls into one of three buckets. Nothing requires a redesign.

| Bucket | Examples | UI impact |
|---|---|---|
| **Invisible** | Redirects, canonicals, title/meta tags, schema JSON-LD, sitemap, robots | **None** |
| **Content within existing components** | New FAQ blocks using your existing accordion pattern, added copy sections, internal links inside body text | **None** — reuses existing styles |
| **New pages from existing templates** | New service pages cloned from `/services/agentic-commerce-shopify`, new blog posts via Sanity | **None** — same templates |

**Ground rules for every task below:**

- Clone existing page templates rather than designing new layouts
- New FAQ sections reuse the component pattern already on the homepage and the Shopify guide
- Blog posts publish through Sanity — no new front-end work at all
- **No new UI elements** (no floating buttons, no banners, no popups)
- **No CTA restructuring.** The audit noted 7+ CTA labels across two destinations with no hierarchy — worth knowing, but changing it is a UI decision and sits outside this plan. New content sections simply reuse whichever CTA component the page already uses.

---

## 4. Site structure work (Weeks 1–4) — the second-biggest lever

Structure is half of what you asked for, and it's where a young site gets disproportionate returns.

### S-1 — Fix orphaned commercial pages
Neither the homepage nor `/services` links to `/shopify-development-sri-lanka` or `/services/agentic-commerce-shopify`. **Your two highest-intent pages exist only in the sitemap.** Google finds them; users can't.

Add links using existing nav and footer link components — no visual change, just additional entries in the existing lists.

### S-2 — Turn `/services` into a real hub (currently ~180 words)
It has an H1, a booking widget and a contact form. It occupies your most valuable nav slot and is a dead end that links to none of your service pages.

Rebuild the content using the existing card component already used elsewhere on the site: one card per service, 60–80 words each, linking through to the full page. Target ~800 words. Fix the 8-word meta description.

### S-3 — Standardise URL architecture
`/shopify-development-sri-lanka` sits at root while `/services/agentic-commerce-shopify` is nested. This inconsistency is probably what generated some of the 404 patterns in the first place.

Standardise on `/services/{slug}` and 301 the root-level URL across. Do this **once**, in Week 7, after redirects have settled — not twice.

### S-4 — Internal linking pass
Your 2,200-word Shopify guide never links to your Shopify service page. Six blog posts exist; none feed a commercial page.

**Rule:** every blog post carries 2–3 contextual in-content links to its matching service page, with descriptive anchor text ("our Shopify development team in Sri Lanka"), never "read more". These are inline text links — zero UI impact.

Log every link to `/data/internal-links-log.csv` (source, target, anchor) so the work is auditable and not repeated.

### S-5 — Deploy the schema components you already built
You have `FAQSchema`, `ServiceSchema`, `ArticleSchema` and `BreadcrumbSchema` sitting in `src/components/schema/` — and FAQ sections exist on only **2 of 7 pages**. Schema is invisible JSON-LD; it costs nothing visually and drives rich results.

Every service page gets `ServiceSchema` + `FAQSchema`. Every blog post gets `ArticleSchema` + `FAQSchema`. Every nested page gets `BreadcrumbSchema`.

### S-6 — Fix zero-CTR pages ranking in the click zone
These rank well and get **zero clicks** — a title/meta problem, not a ranking problem. Pure metadata, no UI impact:

| Page | Position | Impr. | Fix |
|---|---|---|---|
| `/work/troi` | 6.4 | 26 | Rewrite title + meta to lead with outcome |
| `/work/hima` | 8.0 | 22 | Same |
| `/work/finpilot` | 6.9 | 10 | Same |
| `/work/olyce` | 7.4 | 18 | Meta description is generic/templated — rewrite to match the page |

Pattern: `{Client}: {Outcome with number} — {What we built} · theBOAT`.

Your homepage proves you can write a 32% CTR title. Apply that skill to these four pages and you convert ~76 wasted impressions into clicks without ranking a single position higher.

### S-7 — Add outcome metrics to case studies
Research found that **no competitor in the Sri Lankan market publishes case-study metrics.** Every one shows logos and project names with zero results. You have the client relationships to be the first.

Ask Olyce, Hima, Finpilot and Promaster for one number each — revenue change, hours saved, conversion lift, order volume — plus a two-sentence attributed quote.

You currently have **zero named testimonials across the entire site**. Every page shows self-reported metrics ("+34% revenue per visitor", "38h/month saved") with nobody vouching for them. Adding quotes is a content change within existing components.

---

## 5. Service page architecture (Weeks 4–11)

Build each by cloning an existing service page template.

| URL | Target query | Priority | Status |
|---|---|---|---|
| `/services/ai-automation` | ai automation agency sri lanka | **P0** | **404 in prod — fix first** |
| `/services/web-development-colombo` | web development company colombo | P1 | **Build** — already earns impressions + 1 click while 404ing |
| `/services/workflow-automation-sri-lanka` | workflow automation sri lanka | P1 | **Build** — weakest SERP found in all research |
| `/services/shopify-development-sri-lanka` | shopify development sri lanka | P1 | Exists at root — move + redirect (S-3) |
| `/services/agentic-commerce-shopify` | agentic commerce shopify | P1 | Exists — add proof (currently asks $12k with **no client proof at all**) |
| `/services/hire-n8n-developer` | hire n8n developer / n8n consultant | P2 | **Build** — international buyer intent |
| `/services/shopify-development-dubai` | shopify development dubai | P2 | **Build** — you have UAE clients (Ceyflora.ae, Promaster) |

**Standard template for every service page** — same components, same styling, consistent content structure:

1. H1 containing the exact target keyword
2. One-line positioning + the page's existing primary CTA
3. "What we build" — 4 concrete deliverables
4. **Named client proof with a metric** (S-7)
5. Transparent pricing block — you already do this on two pages; do it everywhere, it's a market differentiator
6. Process / timeline
7. **FAQ block, 5 questions** + `FAQSchema`
8. Closing CTA

---

## 6. Content engine (Weeks 2–13) — the primary growth lever

With every other channel removed, content is the engine. **Cadence: 2 substantial pieces per week, ~22 pieces across the window.** That is demanding, and it is the price of a pure-organic strategy.

### 6.1 First — republish the two dead posts (Week 2)

**`/blog/n8n-vs-make-vs-zapier-2026`** ranks at **position 8.0** while serving a 404. Republish and expand it. Research benchmark: the ranking competitor (digidop.com, a Webflow agency — same kind of business as you) runs ~5,000 words with a feature matrix, per-tier pricing scenarios, screenshots, hands-on UX assessment, migration guidance and a visible update date. Notably, **not one of the three tool vendors ranks for their own comparison** — this SERP belongs to agencies.

**`/blog/what-is-agentic-commerce`** — republish, but reposition. The definitional query is vendor-locked (Stripe, Shopify, Salesforce, IBM, Mastercard). Reframe around the March 2026 reversal (§7.3).

### 6.2 Track A — Sri Lanka commercial (one per week)

Each links to its service page (S-4).

1. **"How much does a Shopify store cost in Sri Lanka? (2026)"** — Konekt targets this with a blog post but doesn't answer it on a money page. You publish real pricing. Win it outright.
2. **"AI workflow automation for Sri Lankan businesses: what actually works"**
3. **"Shopify vs WooCommerce for Sri Lankan retailers"**
4. **"Hiring a web development company in Colombo: a buyer's checklist"** — attacks a directory-dominated term from an angle directories can't serve
5. **"n8n for Sri Lankan SMEs: 5 automations that pay for themselves"**
6. **"Shopify payment gateways in Sri Lanka: a complete setup guide"**
7. **"Is Shopify available in Sri Lanka?"** — you already earn impressions for this exact query at position 30.5
8. **"What does an automation audit actually find? (5 real examples)"**
9. **"Building for the UAE market from Sri Lanka"** — you have the client proof
10. **"Shopify migration in Sri Lanka: moving from WooCommerce or custom"**

### 6.3 Track B — International authority (one per week)

Targets the genuinely open protocol tier. Research found **individual Medium posts and personal blogs currently outrank major brands** for `ACP agentic commerce protocol` and `AP2` — the highest winnability-to-competition ratio found anywhere.

1. **Expanded `n8n-vs-make-vs-zapier-2026`** (§6.1)
2. **"ACP vs UCP vs AP2: the agentic commerce protocol landscape (2026)"**
3. **"What actually happened to ChatGPT Instant Checkout"** — the March 2026 reversal
4. **"Agentic commerce for Shopify: what to actually implement in 2026"** — proven agency-winnable (askphill.com ranks with exactly this framing)
5. **"Discover in AI, buy on site: what the mid-2026 data says"**
6. **"Building an ACP-compatible Shopify storefront: a practical guide"**
7. **"n8n vs custom code: when automation tools stop being enough"**
8. **"AI agents for ecommerce ops: what we actually deploy for clients"**
9. **"Agentic checkout explained for merchants"** — spec docs and news rank here; almost no practitioner explanation sits between them
10. **"The automation stack we run for every client"**

⚠️ **Avoid `ai automation agency` as a target.** The SERP is contaminated by "start your own AI agency" info-products and two Gumroad listings. Wrong audience entirely.

### 6.4 Non-negotiable requirements per post

Target keyword in H1 · one keyword-bearing H2 · 5-question FAQ with `FAQSchema` · `ArticleSchema` · 2–3 internal links to service pages · visible "Last updated" date · one contextual in-content CTA using the page's existing CTA component.

Every competitive title in this space carries a visible **`2026`** stamp and many carry "Updated [date]". Recency is a ranking asset here — and it decays, which favours a small operator who can update fast over an enterprise with a slow CMS.

---

## 7. Competitive landscape

Full SERP research run 20 Aug 2026 across eight commercial queries.

### 7.1 The Shopify / web-dev SERPs are directory-locked

| Query | Directory & marketplace share of page 1 |
|---|---|
| shopify partner sri lanka | ~7 of 9 |
| shopify experts colombo | ~6 of 8 |
| shopify development sri lanka | ~5 of 9 |
| web development company colombo | ~4 of 8 |
| web design company sri lanka | ~2 of 8 |
| **ai automation agency sri lanka** | **0 of 7** |

Clutch appears in 5 of 8 queries — the most dominant domain in the landscape.

**Implication under a pure-organic constraint:** you're competing for ~2–3 non-directory slots on the Shopify cluster. Winnable with genuinely better content, but slow. **Prioritise §7.2 instead.**

### 7.2 The AI/automation SERPs are wide open — this is the wedge

`ai automation agency sri lanka` returned **zero directories**. `workflow automation company sri lanka` is ranking a press release and a SaaS product. Clutch doesn't even have a "workflow automation" category for Sri Lanka — it redirects to RPA.

The incumbents (Synthora, Sphiria) have **no blog, no case studies, and unverifiable vanity stats** ("98% satisfaction, 99.9% uptime"). Synthora ranks because the SERP is empty, not because the site is good.

**You have a real automation offering, real automation case studies, and a schema library they don't have.** This SERP is displaceable by content alone — which is exactly the method you've chosen. It also matches the positioning in your own `strategic_positioning_report.md`.

### 7.3 The news hook nobody is using

Verified timeline: OpenAI launched Instant Checkout (Sep 2025) → ACP open-sourced with Stripe (Oct 2025) → Google agentic checkout (Nov 2025) → Google UCP with Shopify/Target/Walmart (Jan 2026) → **OpenAI discontinued Instant Checkout (Mar 2026)**, pivoting ACP toward discovery rather than transactions.

Forrester's mid-2026 read: most agentic experiences remain conversational, not autonomous; checkout typically happens elsewhere. Consumer research: 41% "skeptical", 33% "suspicious", median autonomous-spend trust ~$50.

**There's a dated, verifiable, hype-correcting story here — "discover in AI, buy on your own site" — that vendor content will never tell honestly, because vendors are selling the hype.** For a pure-content strategy, this is your best differentiation opportunity.

### 7.4 Competitor snapshot

| Competitor | In SERPs | Service pages | Blog | Case studies | Pricing |
|---|---|---|---|---|---|
| **Konekt** | 3 of 8 | 17 (geo slugs) | **60 posts** | 11, named LK brands | No |
| **Extreme Web** | 4 of 8 | ~24 | None | 3, no metrics | No |
| **Synthora** | 2 of 8 (both AI) | 6 | None | **None** | Yes |
| **Phyxle** | 2 of 8 | 6 | Weak | 9, no metrics | No |
| **Web Lankan** | 1 of 8 | 8 | PR feed | None | No |

**Konekt is your only real content competitor** — 60 posts is why they rank most consistently. They're enterprise-positioned, so they aren't chasing your buyer, but matching their content depth is the bar.

Also worth knowing: `sweans.com/region/colombo-sri-lanka/` — a **London** agency — ranks top-3 for "shopify experts colombo" off one templated geo page. If a London shop can do that, a Colombo shop with real local proof certainly can.

---

## 8. Measurement

### 8.1 Instrument first (Week 1)
- **GA4** with a `book_call_click` event on every Calendly link and `contact_form_submit` on the form. These are analytics attributes on existing elements — no UI change.
- **Calendly UTM tracking** so booking source is attributable
- **GSC** — connected via `gsc-oauth/fetch_gsc_data.py`
- **Lead log** — date, source, landing page, service interest, budget band, outcome

### 8.2 Weekly review — Mondays, 30 minutes
Booked calls · form submissions · organic clicks · impressions · **non-branded clicks** (the number that matters most right now — it's currently zero) · new keywords in top 20 · pages with impressions · content published

### 8.3 Milestones

| | Week 4 | Week 8 | Week 13 |
|---|---|---|---|
| Booked calls/week | 0–1 | 1–2 | **1–3** |
| Organic clicks/week | 8–12 | 15–30 | 30–60 |
| **Non-branded clicks/week** | 2+ | 8+ | **15+** |
| Pages with impressions | 25+ | 35+ | 45+ |
| Content published | 4 | 12 | 22 |
| Service pages live | 3 | 5 | 7 |
| Case studies with metrics | 1 | 3 | 4 |
| Pages with FAQ schema | 4 | 8 | 15 |

**The leading indicator to watch is non-branded clicks per week.** It's zero today. When it starts climbing, the strategy is working — that shows up well before booked calls do.

### 8.4 Re-pull GSC with a longer window (Week 1)
The current dataset is 28 days — too thin to prioritise confidently. Google retains **16 months**. Edit the date range in `gsc-oauth/fetch_gsc_data.py` and re-run.

---

## 9. Week-by-week

| Week | Focus |
|---|---|
| **1** | P0-0 repo/prod reconcile · P0-1 redirects · P0-2 title dedup · **P0-3 + P0-4 test booking & form** · S-1 orphan links · GA4 events · re-pull 16mo GSC |
| **2** | S-2 rewrite `/services` · **republish both dead blog posts** · S-6 title/meta on 4 case studies · S-7 client metric requests |
| **3** | Rebuild `/services/ai-automation` · Track A 1 · Track B 1 (expanded n8n post) |
| **4** | S-5 schema rollout · Track A 2 · Track B 2 · **Milestone review** |
| **5** | Build `/services/web-development-colombo` · Track A 3 · Track B 3 |
| **6** | Build `/services/workflow-automation-sri-lanka` · Track A 4 · Track B 4 · S-4 internal linking pass |
| **7** | **S-3 URL standardisation + redirects** · Track A 5 · Track B 5 |
| **8** | First case study with real metrics live · Track A 6 · Track B 6 · **Milestone review** |
| **9** | Build `/services/hire-n8n-developer` · Track A 7 · Track B 7 |
| **10** | Case studies 2 + 3 metrics live · Track A 8 · Track B 8 |
| **11** | Build `/services/shopify-development-dubai` · Track A 9 · Track B 9 |
| **12** | Track A 10 · Track B 10 · refresh and re-date all Track B posts |
| **13** | Full technical audit · **Milestone review** · plan months 4–6 |

---

## 10. If you only do five things

1. **Test that booking and the contact form actually work** (P0-3, P0-4). If the form is unconfigured in production, every lead so far has been lost silently — and that alone would explain zero conversions. This is goal (1).
2. **Fix the eight 404s** (P0-1). A quarter of your impressions go to dead pages; two of them rank on page one.
3. **Republish `n8n-vs-make-vs-zapier-2026`** (§6.1). It ranks at position 8.0 while serving a 404. Nothing else in this plan gives you a page-one ranking on day one.
4. **Own the AI/automation SERP** (§7.2). Zero directories, weak incumbents with no content, and it matches your own strategic positioning. It's the one competitive space a pure-content strategy can win quickly.
5. **Rewrite four case-study titles** (S-6). ~76 impressions currently convert to zero clicks. Your homepage gets 32% CTR — apply the same skill and you gain clicks without gaining a single ranking position.

---

## Appendix — assumptions & limits

- All GSC figures come from a 28-day window pulled 20 Aug 2026 via `gsc-oauth/fetch_gsc_data.py`. Small sample — treat individual rows as directional.
- Competitor SERP research was run from a **US locale**. A searcher in Colombo will see more `.lk` results and a local pack. Directory-dominance figures are an upper bound, though the pattern held consistently.
- **No search volumes, keyword difficulty scores, or traffic estimates appear in this plan** because none were available — only observed SERP composition. Validate the keyword shortlist in a keyword tool before committing months of writing effort, particularly the protocol cluster (§6.3), which may be high-winnability but low-volume.
- Local pack / Google Business Profile presence could not be verified remotely.
- Conversion assumptions (~3%) are industry-typical, not measured from your site. Replace with real figures once GA4 is instrumented (§8.1).
- **Traffic and booking projections assume the 2-posts-per-week cadence holds.** If output drops to one per week, shift every milestone right by roughly 50%. Content volume is the engine in a pure-organic plan — the timeline moves with it.
