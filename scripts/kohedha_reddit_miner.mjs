#!/usr/bin/env node
/**
 * Kohedha.lk — Reddit Lifestyle & Event Intelligence Miner
 *
 * Scans r/srilanka, r/colombo, r/travel for real traveler and local queries about:
 *  - Events & Nightlife in Colombo
 *  - Cafes, Restaurants & Food Festivals
 *  - Down South & Weekend Getaways
 *
 * Usage:
 *   node scripts/kohedha_reddit_miner.mjs
 */

import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.resolve(process.cwd(), "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "kohedha_intelligence.json");
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Kohedha-Discovery/1.0";

const KOHEDHA_PILLARS = {
  colombo_events: {
    name: "Colombo Events & Nightlife",
    subreddits: ["srilanka", "colombo"],
    queries: [
      "events in colombo",
      "things to do in colombo this weekend",
      "live music colombo",
      "nightlife colombo club",
      "edm events sri lanka",
    ],
  },
  restaurants_cafes: {
    name: "Restaurants, Cafes & Food Discovery",
    subreddits: ["srilanka", "colombo"],
    queries: [
      "best cafes in colombo to work",
      "romantic dinner colombo",
      "best street food colombo",
      "seafood restaurant colombo",
      "food festival colombo",
    ],
  },
  weekend_travel: {
    name: "Down South & Travel Events",
    subreddits: ["srilanka", "travel"],
    queries: [
      "galle fort events",
      "hiriketiya nightlife party",
      "mirissa beach party",
      "kandy festival esala perahera",
      "sri lanka travel itinerary things to do",
    ],
  },
};

function parseAtomFeed(xmlText, fallbackSubreddit = "general") {
  const entries = [];
  const entryBlocks = xmlText.split("<entry>");

  for (let i = 1; i < entryBlocks.length; i++) {
    const block = entryBlocks[i].split("</entry>")[0];

    const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const linkMatch = block.match(/<link\s+href=["']([^"']+)["']/i);
    const contentMatch = block.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
    const updatedMatch = block.match(/<updated>([^<]+)<\/updated>/i);

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

    if (title && title.length > 5) {
      entries.push({
        id: link || `entry-${i}`,
        title,
        selftext: content,
        subreddit: fallbackSubreddit,
        url: link,
        permalink: link,
        createdAt: updatedMatch ? updatedMatch[1] : new Date().toISOString(),
      });
    }
  }

  return entries;
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

async function runMining() {
  console.log("=================================================");
  console.log("🍹 KOHEDHA.LK — REDDIT EVENT & FOOD INTELLIGENCE");
  console.log("=================================================\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    domain: "kohedha.lk",
    pillars: {},
    highIntentOpportunities: [
      {
        title: "15 Best Things to Do in Colombo This Weekend (Events, Cafes & Nightlife)",
        slug: "things-to-do-in-colombo-this-weekend-guide-2026",
        primaryKeyword: "things to do in colombo this weekend",
        secondaryKeywords: ["events in colombo", "colombo nightlife", "colombo events today"],
        targetAppAction: "Download Kohedha App to explore real-time Colombo weekend events",
      },
      {
        title: "10 Best Work-Friendly Cafes in Colombo with High-Speed WiFi & Great Coffee",
        slug: "best-cafes-in-colombo-to-work-remotely",
        primaryKeyword: "best cafes in colombo to work",
        secondaryKeywords: ["coffee shops in colombo", "work friendly cafes colombo", "digital nomad colombo"],
        targetAppAction: "Browse cafe menus and ratings on Kohedha",
      },
      {
        title: "The Ultimate Guide to Colombo Nightlife & EDM Events in Sri Lanka (2026)",
        slug: "colombo-nightlife-edm-events-sri-lanka-guide",
        primaryKeyword: "edm events sri lanka",
        secondaryKeywords: ["colombo nightlife", "events in colombo today", "clubs in colombo"],
        targetAppAction: "Discover upcoming DJ lineups & ticket booking links on Kohedha",
      },
      {
        title: "Top 12 Romantic Dinner Spots & Rooftop Restaurants in Colombo",
        slug: "romantic-dinner-spots-rooftop-restaurants-colombo",
        primaryKeyword: "romantic dinner colombo",
        secondaryKeywords: ["rooftop restaurants colombo", "best restaurants in colombo", "fine dining colombo"],
        targetAppAction: "View table reservation details and menus on Kohedha",
      },
    ],
  };

  for (const [key, preset] of Object.entries(KOHEDHA_PILLARS)) {
    console.log(`📡 Mining Pillar: [${preset.name.toUpperCase()}]...`);
    const allPosts = [];

    for (const query of preset.queries) {
      for (const sub of preset.subreddits) {
        const posts = await searchRedditRss(sub, query);
        allPosts.push(...posts);
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    const uniqueMap = new Map();
    for (const p of allPosts) {
      if (!uniqueMap.has(p.id)) uniqueMap.set(p.id, p);
    }
    const unique = Array.from(uniqueMap.values());

    report.pillars[key] = {
      name: preset.name,
      totalScanned: unique.length,
      sampleQuestions: unique.slice(0, 5).map((u) => u.title),
    };
    console.log(`   ✅ Extracted ${unique.length} live discussions for "${preset.name}".`);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2), "utf-8");
  console.log(`\n💾 Saved Kohedha intelligence report to: ${OUTPUT_FILE}`);
  console.log("=================================================\n");
}

runMining().catch(console.error);
