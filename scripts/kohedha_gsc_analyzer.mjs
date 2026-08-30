#!/usr/bin/env node
/**
 * Kohedha.lk — Google Search Console Performance Analyzer
 *
 * Extracts live query impressions, clicks, average positions, and striking distance
 * opportunities for https://kohedha.lk/
 *
 * Usage:
 *   node scripts/kohedha_gsc_analyzer.mjs
 */

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

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

async function getAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function analyzeKohedhaGSC() {
  console.log("=================================================");
  console.log("📍 KOHEDHA.LK — SEARCH CONSOLE INTELLIGENCE");
  console.log("=================================================\n");

  const token = await getAccessToken();
  const siteUrl = "https://kohedha.lk/";
  const today = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - 28 * 86400000).toISOString().split("T")[0];

  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate: today,
        dimensions: ["query"],
        rowLimit: 50,
      }),
    }
  );

  const data = await res.json();
  const rows = data.rows || [];

  console.log(`📊 Found ${rows.length} ranking search queries for ${siteUrl} in the last 28 days:\n`);

  const strikingDistance = [];
  const emerging = [];

  for (const row of rows) {
    const q = row.keys[0];
    const imp = row.impressions;
    const pos = row.position.toFixed(1);
    const clicks = row.clicks;

    if (row.position <= 20) {
      strikingDistance.push({ query: q, impressions: imp, position: pos, clicks });
    } else {
      emerging.push({ query: q, impressions: imp, position: pos, clicks });
    }
  }

  console.log("🎯 TOP STRIKING-DISTANCE QUERIES (Page 1 & 2 Opportunities):");
  for (const item of strikingDistance) {
    console.log(`   • "${item.query}" 👉 Position: ${item.position} | Impressions: ${item.impressions} | Clicks: ${item.clicks}`);
  }

  console.log("\n📈 EMERGING DISCOVERY QUERIES (High Content Opportunity):");
  for (const item of emerging.slice(0, 10)) {
    console.log(`   • "${item.query}" 👉 Position: ${item.position} | Impressions: ${item.impressions}`);
  }

  console.log("\n=================================================");
}

analyzeKohedhaGSC().catch(console.error);
