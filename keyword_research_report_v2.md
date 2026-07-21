# SEO Keyword Research & Strategy Report v2: theBOAT (theboatgrp.com)

**Updated: July 2026** — refreshed with mid-2026 search landscape data (AI Overviews at ~82–90% coverage for B2B tech queries, 68% zero-click rate, agentic commerce rollout, Hydrogen rebuild). This document is written to be fed into Claude as the strategy brief for a website revamp.

---

## 0. Context for the Website Revamp (READ FIRST)

### Current site snapshot (as of July 2026)
- theboatgrp.com is a **single-page site** with anchor sections (`#process`, `#services`, `#work`, `#why`, `#contact`) plus a handful of real URLs: `/work/finpilot`, `/work/bounce`, `/work/hima`, `/work/troi`, `/work/olyce`, `/frames` (creative studio), `/stores` (commerce work).
- Current meta keywords: automation agency Sri Lanka, web development Colombo, Shopify agency Sri Lanka, digital agency Colombo, business automation, workflow automation, ecommerce development Sri Lanka, UI UX design Colombo, brand identity Sri Lanka, Next.js agency.
- Positioning on-page: "systems-first automation and web studio", 4 pillars (Product development, AI workflow automation, Shopify + commerce, Creative studio/Frames), Colombo + remote worldwide, clients in Sri Lanka/UAE/USA.
- Stack signals on-page: Next.js + tRPC, n8n + Make, Claude/OpenAI, Shopify Plus, Hydrogen, Klaviyo, Stripe, HubSpot, Notion, Linear.

### The single biggest SEO gap
**A one-page site cannot rank for a multi-pillar keyword portfolio.** Every keyword cluster below needs a dedicated, indexable URL. The revamp must break the homepage into a real page architecture (`/services/*`, `/work/*`, `/blog/*`) — this is the #1 action item.

### 2026 search reality (why this report differs from v1)
- **68% of Google searches now end without a click** (up from 56% in May 2024); ~83% of searches showing an AI Overview produce no click.
- **AI Overviews now trigger on ~82% of B2B tech queries** — theBOAT's entire market.
- Organic CTR on AI Overview queries fell as much as 61%, **but** surviving clicks convert ~23% better, and **AI-referred visitors (ChatGPT, Perplexity, Claude) convert ~3× more often and are ~4.4× more valuable** than average organic visitors.
- Conclusion: raw volume matters less than in 2024–25. The strategy prioritizes (a) high-intent transactional keywords where a click still happens, and (b) **citation share inside AI answers** (Section 7).
- Volume/KD figures below are directional estimates for planning; validate in Ahrefs/Semrush before committing content budget. Trend arrows (↑↓→) show movement vs. the v1 report.

---

## 1. Executive Summary & Brand Positioning

**theBOAT** sits at the intersection of **custom AI agent development**, **workflow automation (n8n/Make/Zapier)**, **product development (Next.js/tRPC SaaS)**, **Shopify & agentic commerce**, and **high-end creative** — from Colombo, serving Sri Lanka, UAE, USA, UK, and Australia.

### What changed since v1
1. **"AI agent development" has overtaken generic "automation" as the money keyword class.** The autonomous AI/agent software market hits ~$11.8B in 2026; Gartner projects 40% of enterprise apps will embed task-specific agents by end of 2026 (vs <5% in 2025). ~70% of executives call agentic AI important to their future. theBOAT already ships "narrow agents, not chat boxes" — the site copy is ahead of its SEO.
2. **n8n has broken out.** It won the 2026 cost benchmarks (~$73/mo for 10k tasks vs Zapier's $599), raised a $55M Series B, and is now the preferred enterprise/self-hosted choice. n8n-related keywords have grown sharply while staying low-competition — still theBOAT's best asymmetric bet.
3. **Shopify went agentic.** Agentic Storefront enabled by default for 5.6M stores (Spring 2026); AI-mediated orders up 11× YoY; AI-driven traffic up 393%; every storefront is now an agent-readable MCP endpoint via the Universal Commerce Protocol. Hydrogen was rebuilt as a framework-neutral modular toolkit. This creates a brand-new, near-zero-competition keyword class (Section 4).
4. **GEO/AEO is now table stakes, not a roadmap item.** Section 7 is substantially expanded.

---

## 2. Pillar 1: AI Agents & Workflow Automation Keywords
Fastest-growing, highest-yield pillar. Targets Done-For-You buyers with manual bottlenecks and mid-market teams procuring agentic AI.

| Keyword | Est. Monthly Volume (Global) | Difficulty | Trend | Intent | Target URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AI agent development services** | 4,000 – 6,000 | Med (42%) | ↑↑ | Transactional | `/services/ai-agents` |
| **AI agent development company** | 3,000 – 5,000 | Med-High (50%) | ↑↑ | Transactional | `/services/ai-agents` |
| **AI automation agency** | 15,000 – 20,000 | High (70%) | ↑ | Commercial | `/services/ai-automation` |
| **n8n automation agency** | 1,500 – 2,500 | Low (25%) | ↑↑ | Transactional | `/services/n8n-automation` |
| **n8n consultant / n8n expert hire** | 800 – 1,200 | Low (20%) | ↑↑ | Transactional | `/services/n8n-automation` |
| **self-hosted n8n consultant** | 300 – 500 | Low (12%) | ↑↑ | Transactional | `/services/n8n-automation` |
| **agentic workflow automation services** | 1,000 – 1,500 | Low-Med (28%) | ↑↑ NEW | Commercial | `/services/ai-agents` |
| **multi-agent orchestration services** | 400 – 700 | Low (18%) | ↑ NEW | Transactional | `/services/ai-agents` |
| **business process automation consultant** | 1,800 – 2,500 | Med (45%) | → | Transactional | `/services/business-automation` |
| **Make.com automation expert** | 600 – 900 | Low (20%) | → | Transactional | `/services/make-automation` |
| **Zapier integration agency** | 1,000 – 1,500 | Med (40%) | ↓ (losing share to n8n) | Transactional | `/services/zapier-integration` |
| **AI agent for [function] (lead routing / inbound triage / billing recovery)** | 300 – 600 each | Low (10–20%) | ↑↑ NEW | Commercial | Case-study pages |
| **automate client onboarding workflow** | 500 – 800 | Low (15%) | → | Informational | `/blog/automate-client-onboarding` |
| **n8n vs Make vs Zapier** | 3,000 – 5,000 | Med (35%) | ↑↑ | Informational (BOFU-adjacent) | `/blog/n8n-vs-make-vs-zapier-2026` |

> [!TIP]
> **Positioning shift:** lead with "AI agent development", support with "workflow automation". The v1 report had this inverted. theBOAT's live agents (FinPilot finance ops, Stripe failed-payment revival, Gmail triage, lead routing) are exactly what "AI agent development services" buyers search for — each named flow on the current homepage should become a keyword-targeted case-study or landing section.

> [!TIP]
> **n8n remains the moat.** Enterprise preference for self-hosting/data privacy accelerated through 2025–26 and pricing pressure pushed buyers off Zapier. "n8n agency", "n8n consultant", and "self-hosted n8n" queries have multiplied while KD stayed low. Own this cluster before competitors arrive.

---

## 3. Pillar 2: Product & Custom Web Development Keywords
Targets tech-forward founders and SMBs. Note: App Router / React Server Components expertise is now the differentiating signal buyers look for.

| Keyword | Est. Monthly Volume (Global) | Difficulty | Trend | Intent | Target URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Next.js development agency** | 3,500 – 5,000 | Med (55%) | ↑ | Transactional | `/services/nextjs-development` |
| **SaaS MVP development studio/agency** | 1,000 – 1,500 | Med (40%) | ↑ | Transactional | `/services/mvp-development` |
| **MVP development in 8 weeks** (speed-framed) | 300 – 500 | Low (18%) | ↑ NEW | Transactional | `/services/mvp-development` |
| **custom web application development** | 8,000 – 10,000 | High (72%) | → | Commercial | `/services/custom-web-apps` |
| **App Router migration services** | 300 – 600 | Low (15%) | ↑ NEW | Transactional | `/services/nextjs-development` |
| **Next.js tRPC developer hire** | 250 – 450 | Low (15%) | → | Transactional | `/services/nextjs-development` |
| **headless CMS integration services** | 700 – 1,000 | Med (30%) | → | Commercial | `/services/headless-cms` |
| **AI-powered SaaS development** | 800 – 1,200 | Med (35%) | ↑↑ NEW | Commercial | `/services/mvp-development` |

> [!NOTE]
> 2026 buyer signals for this pillar: App Router + React Server Components + streaming SSR, edge runtime, Prisma/Drizzle, Server Actions. Content proving fluency here ("Why we build SaaS MVPs with Next.js App Router + tRPC") captures technical founders. theBOAT's "8-week sprint" model is itself a keyword angle — speed-to-market framing converts.

---

## 4. Pillar 3: Shopify, E-Commerce & Agentic Commerce Keywords
**This pillar changed the most since v1.** Shopify's Spring 2026 Editions made every store an agent-readable endpoint (Universal Commerce Protocol / MCP), AI-mediated orders grew 11× YoY, and Hydrogen was rebuilt as a modular, framework-neutral toolkit. A new keyword class exists with almost no competition — and theBOAT already builds "AI agents, not chatbots" into stores.

| Keyword | Est. Monthly Volume (Global) | Difficulty | Trend | Intent | Target URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **agentic commerce agency/services** | 500 – 1,000 | Low (15%) | ↑↑↑ NEW | Transactional | `/services/agentic-commerce` |
| **AI-native Shopify storefront** | 300 – 600 | Low (12%) | ↑↑ NEW | Commercial | `/services/agentic-commerce` |
| **make my Shopify store agent-ready / MCP** | 200 – 400 | Low (8%) | ↑↑↑ NEW | Transactional | `/services/agentic-commerce` |
| **Shopify AI agents (inventory / pricing / cart recovery)** | 600 – 1,000 | Low (18%) | ↑↑ NEW | Commercial | `/services/shopify-ai-agents` |
| **Shopify headless commerce agency** | 1,200 – 1,800 | Med (48%) | → | Transactional | `/services/headless-shopify` |
| **Shopify Hydrogen development agency** | 500 – 900 | Low-Med (28%) | ↑ | Transactional | `/services/headless-shopify` |
| **custom Shopify app developers** | 1,500 – 2,500 | Med (45%) | → | Transactional | `/services/shopify-apps` |
| **Shopify inventory automation services** | 500 – 800 | Low (22%) | ↑ | Commercial | `/services/ecommerce-automation` |
| **Shopify site speed optimization agency** | 800 – 1,200 | Med (35%) | → | Transactional | `/services/shopify-optimization` |

> [!IMPORTANT]
> **Drop the v1 "Hydrogen to Next.js migration" keyword.** Hydrogen 2026 is now framework-neutral and mature (quarterly releases, React Router v7 + Oxygen); the migration angle is stale. Replace with the agentic commerce cluster above — theBOAT's existing `/stores` retrofit work (+34% revenue per visitor, inventory/pricing/cart-recovery agents) is ready-made proof content. Being early on "agentic commerce agency" in mid-2026 is the equivalent of being early on "Shopify agency" in 2015.

---

## 5. Pillar 4: Creative Studio & Brand Identity Keywords
Largely stable since v1. One new angle: post-AI-slop demand for human craft — 73% of designers now deliberately use "imperfect", human-made elements to stand apart from AI-generated design. "Frames" should be positioned as the human-craft studio backed by systems thinking.

| Keyword | Est. Monthly Volume (Global) | Difficulty | Trend | Intent | Target URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **premium brand identity design agency** | 900 – 1,300 | Med (46%) | → | Transactional | `/frames/brand-identity` |
| **packaging design studio** | 4,500 – 6,000 | High (60%) | → | Commercial | `/frames/packaging-design` |
| **commercial product photography studio** | 1,800 – 2,500 | Med (38%) | → | Transactional | `/frames/product-photography` |
| **lookbook photography services** | 600 – 900 | Low (25%) | → | Transactional | `/frames/product-photography` |
| **brand identity for e-commerce brands** | 400 – 700 | Low (22%) | ↑ NEW | Commercial | `/frames/brand-identity` |

> [!NOTE]
> Keep creative pages under `/frames/*` (the sub-brand already exists on-site) rather than v1's `/services/*` — cleaner brand architecture and lets Frames build its own topical authority.

---

## 6. Geographic / Localized SEO Strategy

### Sri Lanka & Colombo
Local competition (Saberion, Kushan Dreamworks, HypeX, Rank Edge, Aurora 365) fights over generic "web design Sri Lanka" terms. Notably, local agencies like Rank Edge now market **GEO/AI-SEO services** — the AI-forward positioning window in Sri Lanka is open but closing. No local agency owns "AI automation" or "AI agents" yet.

| Keyword | Est. Monthly Volume (Local) | Difficulty | Trend | Intent | Target URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AI automation agency Sri Lanka** | 100 – 250 | Low (8%) | ↑↑ NEW | Transactional | `/services/ai-automation-sri-lanka` |
| **AI agent development Sri Lanka** | 50 – 150 | Low (5%) | ↑↑ NEW | Transactional | `/services/ai-agents` (localized section) |
| **web development Colombo** | 800 – 1,000 | Med (35%) | → | Transactional | `/services/web-development-colombo` |
| **digital agency Colombo** | 600 – 800 | Med (32%) | → | Transactional | Homepage |
| **Shopify agency Sri Lanka** | 250 – 450 | Low (18%) | ↑ | Transactional | `/services/shopify-sri-lanka` |
| **business automation Sri Lanka** | 150 – 300 | Low (10%) | ↑ | Commercial | `/services/business-automation-sri-lanka` |
| **UI UX design Colombo** | 300 – 500 | Low (24%) | → | Transactional | `/services/ui-ux-design-colombo` |
| **brand identity design Sri Lanka** | 150 – 300 | Low (15%) | → | Transactional | `/frames/brand-design-sri-lanka` |

### UAE/Dubai (upgrade from v1 — clients already there)
theBOAT has live UAE clients and pricing-agent work in the UAE segment. Dubai's automation/AI services demand is high-budget and underserved by local players at theBOAT's price-quality point.

| Keyword | Est. Monthly Volume | Difficulty | Intent | Target URL |
| :--- | :--- | :--- | :--- | :--- |
| **AI automation agency Dubai** | 400 – 700 | Med (35%) | Transactional | `/services/ai-automation-dubai` |
| **Shopify agency Dubai / UAE** | 500 – 800 | Med (40%) | Transactional | `/services/shopify-dubai` |
| **business process automation UAE** | 200 – 400 | Low (25%) | Commercial | `/services/ai-automation-dubai` |

---

## 7. AEO & Generative Engine Optimization (GEO) — Now the Primary Channel

With ~82–90% of B2B tech queries triggering AI Overviews and 68% of searches ending without a click, **citation share in AI answers is now as important as rank position**. AI-referred visitors convert ~3× better and are ~4.4× more valuable — for a studio selling AI services, being cited by AI is also the credibility test buyers apply.

### 7.1 Technical foundation (do during the revamp)
- **Ship an `llms.txt`** at the root: markdown map of services, case studies, stack, and locations. Now an established standard; removes parsing friction for real-time AI retrieval.
- **Verify AI crawlers are allowed** in robots.txt / CDN rules (GPTBot, ClaudeBot, PerplexityBot, Google-Extended as desired).
- **Server-side render everything.** The heavy interactive dashboard mockups on the current homepage are invisible to most AI retrieval if client-rendered — ensure all substantive copy is in SSR HTML.
- **Break the one-pager into crawlable URLs** (see Section 0) — AI engines cite pages, not anchor fragments.

### 7.2 Schema markup (expanded from v1)
Schema improves LLM discoverability by ~67%. Implement:
- `Organization` + `LocalBusiness` (Colombo NAP, service areas: LK, AE, US, UK, AU)
- `Service` schema per service page, explicitly naming n8n, Make, Zapier, Claude, Shopify, MCP integrations
- `FAQPage` on every service page (the site already has an FAQ section — mark it up). Target queries like "Is self-hosted n8n secure?", "What does AI agent development cost?", "What is agentic commerce?"
- `Article` + `Breadcrumb` on all blog/case-study pages

### 7.3 Content patterns that win AI citations (data-backed)
- **Statistics in passages: +40% citation rate.** theBOAT has real numbers — 1,240 manual hours killed/month across 9 SMBs, +34% revenue per visitor across 6 stores, $28,400 in revived Stripe charges, 38% signup lift, 99.6% run success. Put these in crawlable text, not just UI mockups.
- **Definition-first sentence patterns: ~2.1× citation rate.** Open each service page with a crisp definition ("Agentic commerce is…", "AI agent development is…") before the pitch.
- **Expert quotations: up to +115%** in some categories. Attribute claims to named team members.
- **Reference rate, not CTR, is the KPI.** Track citations in ChatGPT/Perplexity/AI Overviews (e.g., via an LLM-visibility tool) alongside GSC.

### 7.4 Structure pages as "Job to be Done" (unchanged from v1, still correct)
- Incorrect: `<h2>Our automation services</h2>`
- Correct: `<h2>Automating lead triage to save your sales team 15 hours a week</h2>`

### 7.5 Case-study landing pages mapped to keyword clusters
Each existing `/work/*` page should target a query cluster:
- **FinPilot** → "AI agents for finance operations", "automate agency finance ops"
- **Stripe → HubSpot deal sync flow** → "Stripe failed payment HubSpot automation", "HubSpot Stripe integration services"
- **Hima** → "Shopify store for manufacturers Sri Lanka", "D2C store replacing phone orders"
- **Troi** → "real-time ROAS dashboard for SMEs", "marketing analytics automation"
- **Bounce** → "court booking app development", "booking platform MVP"
- **OLYCE** → "luxury travel website design", "tour booking website Sri Lanka"

### 7.6 High-intent blog niche (refreshed titles for 2026)
- *n8n vs Make vs Zapier in 2026: a technical studio's honest comparison* (n8n's cost win + Series B + self-hosting angle)
- *What agentic commerce means for your Shopify store (and how to get agent-ready)*
- *AI agent development costs in 2026: PoC vs production vs multi-agent* (buyers actively search price ranges: ~$15–40k PoC, $50–150k production, $150k+ multi-agent)
- *Why we build SaaS MVPs with Next.js App Router + tRPC*
- *Self-hosted n8n for enterprises: security, cost, and lock-in answered*

---

## 8. Prioritized Action Plan for the Revamp

1. **Architecture first:** split the one-pager into `/services/*` (7–9 pages), keep `/work/*`, `/frames/*`, `/stores`, add `/blog/*`. Every keyword cluster above gets exactly one canonical URL.
2. **Quick wins (Low KD, high intent, 0–60 days):** n8n cluster pages, agentic-commerce page, AI-automation-Sri-Lanka page, llms.txt + schema rollout.
3. **Medium term (60–180 days):** AI agent development pillar page + cost guide, Next.js/MVP pages, UAE pages, 5 refreshed blog posts, case-study keyword mapping.
4. **Ongoing:** track AI citation/reference rate monthly alongside GSC; validate all volume estimates in Ahrefs/Semrush and re-prioritize quarterly — this market is moving fast enough that keyword data over ~6 months old is stale.

---

*Volume and difficulty figures are directional planning estimates synthesized from mid-2026 market research; validate with a live SEO tool before final content-budget allocation.*
