#!/usr/bin/env node
/**
 * CLI tool to fetch real-time Google Analytics 4 (GA4) data for theboatgrp.com
 *
 * Usage:
 *   npm run analytics:realtime
 *   node scripts/fetch_ga4_realtime.mjs
 */

import { OAuth2Client } from "google-auth-library";
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

async function getAccessToken() {
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (refreshToken && clientId && clientSecret) {
    const oauth2Client = new OAuth2Client(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const { token } = await oauth2Client.getAccessToken();
    return token;
  }

  const tokenFilePath = path.resolve(process.cwd(), "gsc-oauth", "google_account_token.json");
  const clientSecretPath = path.resolve(process.cwd(), "gsc-oauth", "client_secret.json");

  if (fs.existsSync(tokenFilePath) && fs.existsSync(clientSecretPath)) {
    const secretsRaw = JSON.parse(fs.readFileSync(clientSecretPath, "utf-8"));
    const secretConfig = secretsRaw.installed || secretsRaw.web;
    const tokenRaw = JSON.parse(fs.readFileSync(tokenFilePath, "utf-8"));

    const oauth2Client = new OAuth2Client(secretConfig.client_id, secretConfig.client_secret);
    oauth2Client.setCredentials(tokenRaw);
    const { token } = await oauth2Client.getAccessToken();
    return token;
  }

  throw new Error("No authentication found. Run 'npm run auth:google'");
}

async function callGA4(propertyId, endpoint, body) {
  const token = await getAccessToken();
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:${endpoint}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || `API error (${res.status})`);
  }
  return json;
}

async function main() {
  console.log("=================================================");
  console.log("📊 theBOAT — Google Analytics 4 Realtime Monitor");
  console.log("=================================================\n");

  const propertyId = process.env.GA4_PROPERTY_ID || process.env.NEXT_PUBLIC_GA4_PROPERTY_ID;

  if (!propertyId) {
    console.error("❌ Missing GA4_PROPERTY_ID in .env.local");
    process.exit(1);
  }

  try {
    console.log(`📡 Fetching Real-time Report for Property: ${propertyId}...`);

    // Overview
    const overview = await callGA4(propertyId, "runRealtimeReport", {
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "eventCount" },
      ],
    });

    const activeUsers = overview.rows?.[0]?.metricValues?.[0]?.value || "0";
    const pageViews = overview.rows?.[0]?.metricValues?.[1]?.value || "0";
    const eventCount = overview.rows?.[0]?.metricValues?.[2]?.value || "0";

    console.log("\n🟢 REAL-TIME ACTIVITY (Last 30 Minutes):");
    console.log(`  👥 Active Users Right Now:  ${activeUsers}`);
    console.log(`  📄 Real-time Page Views:    ${pageViews}`);
    console.log(`  ⚡ Total Real-time Events:   ${eventCount}`);

    // Pages
    const pages = await callGA4(propertyId, "runRealtimeReport", {
      dimensions: [{ name: "unifiedScreenName" }],
      metrics: [{ name: "activeUsers" }],
      limit: 10,
    });

    console.log("\n📄 TOP ACTIVE PAGES:");
    if (pages.rows && pages.rows.length > 0) {
      for (const row of pages.rows) {
        const page = row.dimensionValues?.[0]?.value;
        const users = row.metricValues?.[0]?.value;
        console.log(`  - ${page.padEnd(45)} : ${users} active user(s)`);
      }
    } else {
      console.log("  (No active pageviews in the last 30 minutes)");
    }

    // Locations
    const geo = await callGA4(propertyId, "runRealtimeReport", {
      dimensions: [{ name: "country" }, { name: "city" }],
      metrics: [{ name: "activeUsers" }],
      limit: 10,
    });

    console.log("\n🌍 TOP USER LOCATIONS:");
    if (geo.rows && geo.rows.length > 0) {
      for (const row of geo.rows) {
        const country = row.dimensionValues?.[0]?.value;
        const city = row.dimensionValues?.[1]?.value;
        const users = row.metricValues?.[0]?.value;
        console.log(`  - ${city}, ${country}`.padEnd(47) + `: ${users} user(s)`);
      }
    } else {
      console.log("  (No geo data in the last 30 minutes)");
    }

    // Devices
    const devices = await callGA4(propertyId, "runRealtimeReport", {
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
    });

    console.log("\n📱 DEVICES:");
    if (devices.rows && devices.rows.length > 0) {
      for (const row of devices.rows) {
        const device = row.dimensionValues?.[0]?.value;
        const users = row.metricValues?.[0]?.value;
        console.log(`  - ${device.padEnd(20)} : ${users} user(s)`);
      }
    } else {
      console.log("  (No device data in the last 30 minutes)");
    }

    console.log("\n=================================================");
    console.log("✅ REAL-TIME QUERY COMPLETED SUCCESSFULLY");
    console.log("=================================================\n");
  } catch (err) {
    if (err.message.includes("Google Analytics Data API has not been used")) {
      console.error("\n⚠️ Google Analytics Data API is not yet enabled in your Google Cloud project.");
      console.error("👉 Enable it with 1 click (100% free) here:");
      console.error("   https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview?project=208599987769\n");
    } else {
      console.error("\n❌ Error querying GA4:", err.message);
    }
    process.exit(1);
  }
}

main();
