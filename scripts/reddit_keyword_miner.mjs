#!/usr/bin/env node
/**
 * theBOAT — Multi-Niche Reddit Intelligence & Topic Deduplication Engine
 *
 * Mines 5 distinct growth pillars across 12+ subreddits.
 * Cross-references existing Sanity posts to filter out already published topics.
 *
 * Usage:
 *   npm run reddit:mine
 *   node scripts/reddit_keyword_miner.mjs --topic automation
 *   node scripts/reddit_keyword_miner.mjs --topic ai_agents
 *   node scripts/reddit_keyword_miner.mjs --topic custom_web
 *   node scripts/reddit_keyword_miner.mjs --topic ecommerce_cro
 *   node scripts/reddit_keyword_miner.mjs --topic sri_lanka_tech
 */

import { createClient } from "next-sanity";
import fs from "node:fs";
import path from "node:path";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

const OUTPUT_DIR = path.resolve(process.cwd(), "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "reddit_intelligence.json");
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 theBOAT-SEO/2.0";

const MULTI_NICHE_PRESETS = {
  n8n_automation: {
    name: "Workflow Automation & n8n",
    subreddits: ["n8n", "automation", "zapier", "selfhosted"],
    queries: [
      "n8n vs zapier",
      "n8n self host cost",
      "automate client onboarding",
      "stripe failed payment automation",
      "business workflow automation agency",
    ],
  },
  ai_agents: {
    name: "AI Agents & Autonomous Operations",
    subreddits: ["ArtificialInteligence", "startups", "webdev", "localllama"],
    queries: [
      "ai agent for business",
      "narrow ai agents vs chatbot",
      "agentic commerce shopify",
      "ai lead qualification triage",
      "autonomous support agent roi",
    ],
  },
  custom_web: {
    name: "Custom Web Apps & Next.js SaaS",
    subreddits: ["webdev", "NextContext", "SaaS", "reactjs"],
    queries: [
      "nextjs vs wordpress b2b",
      "customer portal nextjs trpc",
      "web development agency pricing",
      "why redesign business website",
      "mvp development sprint",
    ],
  },
  ecommerce_cro: {
    name: "Shopify CRO & Ecommerce Operations",
    subreddits: ["shopify", "ecommerce", "Klaviyo"],
    queries: [
      "shopify checkout conversion rate",
      "klaviyo email revenue falling",
      "stocky alternative inventory tracking",
      "shopify digital products scale",
      "reduce cart abandonment shopify",
    ],
  },
  sri_lanka_tech: {
    name: "Sri Lanka Tech & Agency Landscape",
    subreddits: ["srilanka", "smallbusiness"],
    queries: [
      "website development cost colombo",
      "payhere vs webxpay",
      "shopify sri lanka payment gateway",
      "best web design agency colombo",
      "ecommerce delivery courier domex",
    ],
  },
};

async function getPublishedPostsFromSanity() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wr7f7n4t";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "theboat";

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false,
    });

    const docs = await client.fetch(
      `*[_type == "blog" && defined(slug.current)] {
        title,
        "slug": slug.current,
        keyword,
        publishedAt
      }`
    );

    return docs.map((d) => ({
      title: d.title || "",
      slug: d.slug || "",
      keyword: d.keyword || "",
      publishedAt: d.publishedAt || "",
    }));
  } catch (err) {
    console.warn("⚠️ Could not connect to Sanity live, using local cache");
    return [];
  }
}

function parseAtomFeed(xmlText, fallbackSubreddit = "general") {
  const entries = [];
  const entryBlocks = xmlText.split("<entry>");

  for (let i = 1; i < entryBlocks.length; i++) {
    const block = entryBlocks[i].split("</entry>")[0];

    const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const linkMatch = block.match(/<link\s+href=["']([^"']+)["']/i);
    const contentMatch = block.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
    const authorMatch = block.match(/<author>[\s\S]*?<name>([^<]+)<\/name>/i);
    const updatedMatch = block.match(/<updated>([^<]+)<\/updated>/i);
    const categoryMatch = block.match(/<category\s+term=["']([^"']+)["']/i);

    let title = titleMatch ? titleMatch[1].trim() : "";
    title = title
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"');

    let link = linkMatch ? linkMatch[1] : "";
    let content = contentMatch ? contentMatch[1].replace(/<[^>]+>/g, " ").trim() : "";
    content = content.replace(/\s+/g, " ").slice(0, 300);

    const subreddit = categoryMatch ? categoryMatch[1] : fallbackSubreddit;

    if (title && title.length > 5) {
      entries.push({
        id: link || `entry-${i}`,
        title,
        selftext: content,
        subreddit,
        author: authorMatch ? authorMatch[1] : "[unknown]",
        url: link,
        permalink: link,
        createdAt: updatedMatch ? updatedMatch[1] : new Date().toISOString(),
      });
    }
  }

  return entries;
}

async function fetchSubredditRss(subreddit, sort = "hot") {
  const url = `https://www.reddit.com/r/${subreddit}/${sort}.rss`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
    });

    if (!res.ok) {
      return [];
    }

    const xml = await res.text();
    return parseAtomFeed(xml, subreddit);
  } catch {
    return [];
  }
}

async function searchRedditRss(subreddit, query) {
  const url = `https://www.reddit.com/r/${subreddit}/search.rss?q=${encodeURIComponent(
    query
  )}&restrict_sr=1&sort=relevance`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
    });

    if (!res.ok) return [];

    const xml = await res.text();
    return parseAtomFeed(xml, subreddit);
  } catch {
    return [];
  }
}

function extractQuestions(posts, pillarKey) {
  const questions = [];

  for (const post of posts) {
    const isQuestion =
      post.title.includes("?") ||
      /^(how|why|what|which|is it|anyone|recommendation|best way|help|looking for|need advice)/i.test(
        post.title
      ) ||
      /vs|alternative|problem|issue|cost|pricing|hire|worth it|experience with/i.test(
        post.title
      );

    if (isQuestion) {
      questions.push({
        question: post.title.trim(),
        snippet: post.selftext ? post.selftext.slice(0, 180) + "..." : "",
        sourceSubreddit: post.subreddit,
        sourceUrl: post.permalink,
        pillar: pillarKey,
      });
    }
  }

  return questions;
}

function generateDynamicOpportunities(questions, publishedPosts) {
  const allOpportunities = [
    {
      pillar: "n8n_automation",
      title: "n8n vs Zapier vs Make in 2026: Cost and Scaling Benchmark for Teams",
      slug: "n8n-vs-zapier-cost-scaling-benchmark-2026",
      targetKeywords: ["n8n vs zapier", "n8n cost comparison", "self hosted n8n consultant"],
      targetAudience: "Operations Directors, SaaS Founders, and Agency Leads",
      painPoints: [
        "Zapier bill shock after 10,000+ task runs",
        "Self-hosting n8n on Hetzner/AWS for under $20/month",
        "Automating invoice reconciliation and client onboarding",
      ],
      targetUrl: "/blog/n8n-vs-zapier-cost-scaling-benchmark-2026",
      internalLinks: ["/services/ai-automation", "/work/finpilot"],
    },
    {
      pillar: "ai_agents",
      title: "Narrow AI Agents vs. Chatbots: What Actually Drives Revenue in Production",
      slug: "ai-agents-vs-chatbots-business-automation-guide",
      targetKeywords: ["ai agents vs chatbots", "narrow ai agents for business", "agentic commerce shopify"],
      targetAudience: "Shopify Plus brand managers and tech-forward founders",
      painPoints: [
        "Why canned chatbots frustrate buyers without resolving tickets",
        "How autonomous agents fetch inventory, update CRMs, and process returns",
        "ROI calculation: Replacing 30+ hours/week of manual support ops",
      ],
      targetUrl: "/blog/ai-agents-vs-chatbots-business-automation-guide",
      internalLinks: ["/services/agentic-commerce-shopify", "/services/ai-automation"],
    },
    {
      pillar: "custom_web",
      title: "Next.js vs. WordPress in 2026: Total Cost of Ownership for B2B Websites",
      slug: "nextjs-vs-wordpress-b2b-web-development-2026",
      targetKeywords: ["nextjs vs wordpress b2b", "custom web app vs wordpress", "modern b2b website stack"],
      targetAudience: "B2B Marketing Directors and Scaling Founders",
      painPoints: [
        "WordPress plugin bloat, database vulnerabilities, and slow mobile LCP",
        "Static generation + headless CMS architecture benefits",
        "When to choose a custom web app over a template builder",
      ],
      targetUrl: "/blog/nextjs-vs-wordpress-b2b-web-development-2026",
      internalLinks: ["/services/web-development-colombo", "/work"],
    },
    {
      pillar: "ecommerce_cro",
      title: "Shopify Checkout CRO: 7 Fixes to Move from 0.8% to 2.5% Conversion Rate",
      slug: "shopify-cro-checkout-conversion-optimization-guide",
      targetKeywords: ["shopify conversion rate optimization", "increase shopify cro", "reduce cart abandonment"],
      targetAudience: "DTC Brand Founders and Ecommerce Managers",
      painPoints: [
        "High cart abandonment between product view and completed purchase",
        "Why bloated third-party apps slow down mobile checkout",
        "Structuring 1-page checkout and trust signals cleanly",
      ],
      targetUrl: "/blog/shopify-cro-checkout-conversion-optimization-guide",
      internalLinks: ["/stores", "/shopify-development-sri-lanka"],
    },
    {
      pillar: "sri_lanka_tech",
      title: "How to Set Up Shopify in Sri Lanka: Payment Gateways and Real Costs (2026)",
      slug: "how-to-set-up-shopify-in-sri-lanka-payment-gateways-guide-2026",
      targetKeywords: ["shopify sri lanka", "payhere vs webxpay", "shopify payment gateway sri lanka"],
      targetAudience: "Sri Lankan DTC brand founders & retail operators",
      painPoints: [
        "How to receive LKR payments without account lockouts",
        "Cost breakdown of PayHere vs WebXPay vs Koko",
        "Why Instagram DM ordering loses 40% of checkout sales",
      ],
      targetUrl: "/blog/how-to-set-up-shopify-in-sri-lanka-payment-gateways-guide-2026",
      internalLinks: ["/shopify-development-sri-lanka", "/stores"],
    },
  ];

  // Compare against published posts in Sanity
  const publishedSlugs = new Set(publishedPosts.map((p) => p.slug.toLowerCase()));
  const publishedKeywords = new Set(publishedPosts.map((p) => (p.keyword || "").toLowerCase().trim()));

  const evaluated = allOpportunities.map((opp) => {
    const isCovered =
      publishedSlugs.has(opp.slug.toLowerCase()) ||
      opp.targetKeywords.some((k) => publishedKeywords.has(k.toLowerCase()));

    return {
      ...opp,
      status: isCovered ? "ALREADY_PUBLISHED" : "UNCOVERED_OPPORTUNITY",
    };
  });

  return evaluated;
}

async function runMining(selectedCategory) {
  console.log("=================================================");
  console.log("🕵️ MULTI-NICHE REDDIT INTELLIGENCE & TOPIC MEMORY");
  console.log("=================================================\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 1. Fetch current Sanity published memory
  console.log("🧠 1. Connecting to Sanity CMS to inspect published memory...");
  const publishedPosts = await getPublishedPostsFromSanity();
  console.log(`   ✅ Loaded ${publishedPosts.length} existing published blog posts from Sanity.`);

  const presetsToRun = selectedCategory
    ? { [selectedCategory]: MULTI_NICHE_PRESETS[selectedCategory] }
    : MULTI_NICHE_PRESETS;

  const aggregatedResults = {
    generatedAt: new Date().toISOString(),
    publishedMemoryCount: publishedPosts.length,
    pillars: {},
    allMinedQuestions: [],
    evaluatedOpportunities: [],
    nextRecommendedTopic: null,
  };

  for (const [key, preset] of Object.entries(presetsToRun)) {
    if (!preset) continue;
    console.log(`\n📡 Mining Pillar: [${preset.name.toUpperCase()}]...`);

    const allClusterPosts = [];

    for (const sub of preset.subreddits) {
      console.log(`   - Scanning r/${sub}...`);
      const posts = await fetchSubredditRss(sub, "hot");
      allClusterPosts.push(...posts);
      await new Promise((r) => setTimeout(r, 300));
    }

    for (const query of preset.queries) {
      console.log(`   - Query: "${query}"...`);
      for (const sub of preset.subreddits.slice(0, 2)) {
        const searchResults = await searchRedditRss(sub, query);
        allClusterPosts.push(...searchResults);
        await new Promise((r) => setTimeout(r, 250));
      }
    }

    // Deduplicate
    const uniqueMap = new Map();
    for (const p of allClusterPosts) {
      if (!uniqueMap.has(p.id)) uniqueMap.set(p.id, p);
    }
    const uniquePosts = Array.from(uniqueMap.values());
    const questions = extractQuestions(uniquePosts, key);

    aggregatedResults.pillars[key] = {
      pillarName: preset.name,
      totalPostsScanned: uniquePosts.length,
      questionsCount: questions.length,
      topQuestions: questions.slice(0, 8),
    };

    aggregatedResults.allMinedQuestions.push(...questions.slice(0, 8));
    console.log(`   ✅ Extracted ${questions.length} real questions across ${uniquePosts.length} posts.`);
  }

  // Evaluate Opportunities & Select Next Uncovered Niche
  const opportunities = generateDynamicOpportunities(aggregatedResults.allMinedQuestions, publishedPosts);
  aggregatedResults.evaluatedOpportunities = opportunities;

  const uncovered = opportunities.filter((o) => o.status === "UNCOVERED_OPPORTUNITY");
  aggregatedResults.nextRecommendedTopic = uncovered.length > 0 ? uncovered[0] : opportunities[0];

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(aggregatedResults, null, 2), "utf-8");
  console.log(`\n💾 Saved multi-niche intelligence dataset to: ${OUTPUT_FILE}\n`);

  printSummary(aggregatedResults);
}

function printSummary(report) {
  console.log("=================================================");
  console.log("📊 TOPIC MEMORY & NICHE OPPORTUNITY MATRIX");
  console.log("=================================================");

  for (const opp of report.evaluatedOpportunities) {
    const icon = opp.status === "ALREADY_PUBLISHED" ? "✅ [PUBLISHED]" : "🚀 [NEXT TO PUBLISH]";
    console.log(`\n${icon} ${opp.title}`);
    console.log(`   🎯 Pillar: ${opp.pillar}`);
    console.log(`   🔑 Keywords: ${opp.targetKeywords.join(", ")}`);
    console.log(`   🔗 Slug: /blog/${opp.slug}`);
  }

  if (report.nextRecommendedTopic) {
    console.log("\n=================================================");
    console.log(`🎯 SELECTED NEXT TOPIC: ${report.nextRecommendedTopic.title}`);
    console.log(`   Pillar: ${report.nextRecommendedTopic.pillar}`);
    console.log(`   Target Slug: /blog/${report.nextRecommendedTopic.slug}`);
    console.log("=================================================\n");
  }
}

const args = process.argv.slice(2);
let topicArg = undefined;
const topicIdx = args.indexOf("--topic");
if (topicIdx !== -1 && args[topicIdx + 1]) {
  topicArg = args[topicIdx + 1];
}

runMining(topicArg);
