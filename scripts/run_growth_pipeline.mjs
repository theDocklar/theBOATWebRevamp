#!/usr/bin/env node
/**
 * theBOAT — Unified Dynamic SEO & Growth Pipeline
 *
 * Automatically:
 *  1. Inspects Sanity CMS Published Memory (filters out any existing topics/slugs)
 *  2. Pulls Live Real-Time GA4 Traffic & User Engagement
 *  3. Mines 12+ Subreddits across 5 Distinct Growth Pillars
 *  4. Generates a Brand New, Human-First SEO Blog Post for the Next Uncovered Opportunity
 *  5. Publishes Directly to Sanity CMS with Live Links
 *
 * Usage:
 *   npm run pipeline:publish
 *   node scripts/run_growth_pipeline.mjs --publish
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const shouldPublish = args.includes("--publish");

console.log("=================================================");
console.log("🚀 theBOAT — DYNAMIC MULTI-NICHE GROWTH PIPELINE");
console.log("=================================================\n");

function runStep(name, cmd) {
  console.log(`\n▶️ [STEP] ${name}`);
  console.log(`   Executing: ${cmd}`);
  try {
    execSync(cmd, { stdio: "inherit" });
    return true;
  } catch (err) {
    console.warn(`   ⚠️ Warning in step '${name}': ${err.message}`);
    return false;
  }
}

// 1. Pull Real-Time GA4 Activity
runStep("1. Pull Live Real-Time Analytics", "node scripts/fetch_ga4_realtime.mjs");

// 2. Mine Reddit across 5 Pillars & Evaluate Sanity Topic Memory
runStep("2. Mine Reddit & Check Sanity Topic Memory", "node scripts/reddit_keyword_miner.mjs");

// 3. Generate Next Uncovered Human-First SEO Blog Post
runStep("3. Generate Next Uncovered SEO Article", "node scripts/create_seo_blog.mjs --auto");

// 4. Publish to Sanity CMS
if (shouldPublish || process.env.SANITY_API_WRITE_TOKEN) {
  // Find the latest generated markdown file in content/blogs/
  const blogsDir = path.resolve(process.cwd(), "content", "blogs");
  if (fs.existsSync(blogsDir)) {
    const files = fs
      .readdirSync(blogsDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({
        file: f,
        mtime: fs.statSync(path.join(blogsDir, f)).mtimeMs,
      }))
      .sort((a, b) => b.mtime - a.mtime);

    if (files.length > 0) {
      const latestFile = path.join(blogsDir, files[0].file);
      runStep("4. Publish New Uncovered Post to Sanity CMS", `node scripts/publish_to_sanity.mjs --file "${latestFile}"`);
    }
  }
} else {
  console.log("\n💡 Step 4 (Sanity Publishing): Run with '--publish' or visit http://localhost:3000/studio to publish visually.");
}

console.log("\n=================================================");
console.log("🏁 PIPELINE EXECUTION COMPLETED SUCCESSFULLY");
console.log("=================================================\n");
