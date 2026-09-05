#!/usr/bin/env node
/**
 * SEO Genie — Technical SEO Audit Engine
 *
 * Runs a comprehensive technical SEO audit on any URL and generates
 * a client-ready report. Covers:
 *   1. Core Web Vitals & Performance (Google PageSpeed Insights API)
 *   2. Crawlability (robots.txt, sitemap.xml, meta robots, canonical)
 *   3. SSL / HTTPS Certificate Validation
 *   4. Structured Data (JSON-LD) Detection & Validation
 *   5. Mobile Friendliness (viewport, tap targets, font sizes)
 *   6. Domain Authority (OpenPageRank API)
 *
 * Usage:
 *   node scripts/seo_audit.mjs --url https://theboatgrp.com
 *   node scripts/seo_audit.mjs --url https://example.com --json
 *
 * Environment (optional — works without, just with reduced API quota):
 *   PAGESPEED_API_KEY=...       (free from Google Cloud Console)
 *   OPENPAGERANK_API_KEY=...    (free from openpagerank.com)
 */

import fs from "node:fs";
import path from "node:path";
import tls from "node:tls";
import https from "node:https";
import http from "node:http";

// ─── Environment Loader ──────────────────────────────────────────────────────

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
        const value = trimmed
          .slice(idx + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

// ─── Constants & Helpers ─────────────────────────────────────────────────────

const REPORTS_DIR = path.resolve(process.cwd(), "reports");

const CWV_THRESHOLDS = {
  lcp: { good: 2500, poor: 4000, unit: "ms", label: "LCP (Largest Paint)" },
  cls: { good: 0.1, poor: 0.25, unit: "", label: "CLS (Layout Shift)" },
  tbt: { good: 200, poor: 600, unit: "ms", label: "TBT (Blocking Time)" },
  ttfb: { good: 800, poor: 1800, unit: "ms", label: "TTFB (Server Resp.)" },
  fcp: { good: 1800, poor: 3000, unit: "ms", label: "FCP (First Paint)" },
};

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

function c(color, text) {
  return `${COLORS[color]}${text}${COLORS.reset}`;
}

function ratingIcon(rating) {
  if (rating === "good") return c("green", "✅ GOOD");
  if (rating === "warning") return c("yellow", "⚠️  NEEDS WORK");
  return c("red", "❌ POOR");
}

function rateScore(score) {
  if (score >= 90) return "good";
  if (score >= 50) return "warning";
  return "poor";
}

function rateMetric(value, thresholds) {
  if (value === null || value === undefined) return "unknown";
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.poor) return "warning";
  return "poor";
}

function formatMs(ms) {
  if (ms === null || ms === undefined) return "N/A";
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
}

function padRight(str, len) {
  const stripped = str.replace(/\x1b\[[0-9;]*m/g, "");
  return str + " ".repeat(Math.max(0, len - stripped.length));
}

function printHeader(title) {
  const line = "═".repeat(60);
  console.log(`\n${c("cyan", line)}`);
  console.log(c("bold", `  ${title}`));
  console.log(`${c("cyan", line)}`);
}

function printRow(label, value, rating) {
  const paddedLabel = padRight(`  ${label}`, 32);
  const paddedValue = padRight(String(value), 14);
  const ratingStr = rating ? ratingIcon(rating) : "";
  console.log(`${paddedLabel}${paddedValue}${ratingStr}`);
}

function printCheck(pass, label, detail = "") {
  const icon = pass ? c("green", "✅") : c("red", "❌");
  const detailStr = detail ? c("dim", ` (${detail})`) : "";
  console.log(`  ${icon} ${label}${detailStr}`);
}

function printWarning(label, detail = "") {
  const detailStr = detail ? c("dim", ` (${detail})`) : "";
  console.log(`  ${c("yellow", "⚠️ ")} ${label}${detailStr}`);
}

// ─── Module 1: Core Web Vitals & Performance ─────────────────────────────────

async function auditCoreWebVitals(url) {
  const apiKey = process.env.PAGESPEED_API_KEY;

  const endpoint = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
  );
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.append("category", "performance");
  endpoint.searchParams.append("category", "seo");
  if (apiKey) endpoint.searchParams.set("key", apiKey);

  try {
    const res = await fetch(endpoint.toString());
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`PSI API ${res.status}: ${errText.slice(0, 200)}`);
    }
    const data = await res.json();

    const audits = data.lighthouseResult?.audits || {};
    const fieldMetrics = data.loadingExperience?.metrics || {};
    const categories = data.lighthouseResult?.categories || {};

    const performanceScore = Math.round(
      (categories.performance?.score ?? 0) * 100
    );
    const seoScore = Math.round((categories.seo?.score ?? 0) * 100);

    const extractNumeric = (audit) => {
      if (!audit) return null;
      return audit.numericValue ?? null;
    };

    const lab = {
      lcp: extractNumeric(audits["largest-contentful-paint"]),
      cls: extractNumeric(audits["cumulative-layout-shift"]),
      tbt: extractNumeric(audits["total-blocking-time"]),
      ttfb: extractNumeric(audits["server-response-time"]),
      fcp: extractNumeric(audits["first-contentful-paint"]),
    };

    const field = {
      lcp: fieldMetrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
      inp: fieldMetrics.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
      cls: fieldMetrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile
        ? fieldMetrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
        : null,
      ttfb: fieldMetrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile ?? null,
    };

    const mobile = {
      viewport: audits["viewport"]?.score ?? null,
      tapTargets: audits["tap-targets"]?.score ?? null,
      fontSize: audits["font-size"]?.score ?? null,
    };

    return {
      success: true,
      performanceScore,
      seoScore,
      lab,
      field,
      mobile,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ─── Module 2: Crawlability ──────────────────────────────────────────────────

async function auditCrawlability(targetUrl) {
  const urlObj = new URL(targetUrl);
  const origin = urlObj.origin;

  const robotsParser = (await import("robots-parser")).default;
  const cheerio = await import("cheerio");

  const result = {
    robotsTxt: { exists: false, allowsGooglebot: null, sitemaps: [] },
    sitemaps: [],
    indexability: {
      isNoIndex: false,
      metaRobots: null,
      xRobotsTag: null,
    },
    canonical: { href: null, isSelfReferencing: false },
  };

  // 1. Robots.txt
  try {
    const robotsUrl = `${origin}/robots.txt`;
    const robotsRes = await fetch(robotsUrl, { redirect: "follow" });
    if (robotsRes.ok) {
      const robotsText = await robotsRes.text();
      if (
        !robotsText.trim().startsWith("<!") &&
        !robotsText.trim().startsWith("<html")
      ) {
        result.robotsTxt.exists = true;
        const robots = robotsParser(robotsUrl, robotsText);
        result.robotsTxt.allowsGooglebot =
          robots.isAllowed(targetUrl, "Googlebot") ?? true;
        result.robotsTxt.sitemaps = robots.getSitemaps() || [];
      }
    }
  } catch {
    // robots.txt fetch failed
  }

  // 2. Sitemap discovery
  const sitemapUrls =
    result.robotsTxt.sitemaps.length > 0
      ? result.robotsTxt.sitemaps
      : [`${origin}/sitemap.xml`, `${origin}/sitemap_index.xml`];

  for (const sitemapUrl of sitemapUrls.slice(0, 5)) {
    try {
      const sRes = await fetch(sitemapUrl, {
        method: "HEAD",
        redirect: "follow",
      });
      const contentType = sRes.headers.get("content-type") || "";
      const isXml =
        contentType.includes("xml") || contentType.includes("text/plain");
      result.sitemaps.push({
        url: sitemapUrl,
        exists: sRes.ok && isXml,
        status: sRes.status,
      });
    } catch {
      result.sitemaps.push({ url: sitemapUrl, exists: false, status: 0 });
    }
  }

  // 3. Page fetch for meta robots and canonical
  try {
    const pageRes = await fetch(targetUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    const html = await pageRes.text();
    const $ = cheerio.load(html);

    result.indexability.xRobotsTag =
      pageRes.headers.get("x-robots-tag") || null;

    result.indexability.metaRobots =
      $('meta[name="robots" i]').attr("content") || null;
    const metaGooglebot =
      $('meta[name="googlebot" i]').attr("content") || null;

    result.indexability.isNoIndex =
      /noindex/i.test(result.indexability.metaRobots || "") ||
      /noindex/i.test(metaGooglebot || "") ||
      /noindex/i.test(result.indexability.xRobotsTag || "");

    const htmlCanonical = $('link[rel="canonical" i]').attr("href") || null;
    result.canonical.href = htmlCanonical;
    if (htmlCanonical) {
      try {
        const canonicalNorm = new URL(htmlCanonical, targetUrl).href.replace(
          /\/$/,
          ""
        );
        const targetNorm = targetUrl.replace(/\/$/, "");
        result.canonical.isSelfReferencing = canonicalNorm === targetNorm;
      } catch {
        result.canonical.isSelfReferencing = false;
      }
    }
  } catch {
    // Page fetch failed
  }

  return result;
}

// ─── Module 3: SSL / HTTPS ───────────────────────────────────────────────────

function auditSSL(hostname) {
  return new Promise((resolve) => {
    const socket = tls.connect(
      {
        host: hostname,
        port: 443,
        servername: hostname,
        timeout: 10000,
      },
      () => {
        const cert = socket.getPeerCertificate();
        const authorized = socket.authorized;
        const authError = socket.authorizationError;

        if (!cert || Object.keys(cert).length === 0) {
          socket.destroy();
          return resolve({ valid: false, error: "No certificate found" });
        }

        const validTo = new Date(cert.valid_to);
        const validFrom = new Date(cert.valid_from);
        const now = new Date();
        const daysRemaining = Math.floor(
          (validTo - now) / (1000 * 60 * 60 * 24)
        );

        const result = {
          valid: authorized,
          authorizationError: authError || null,
          issuer: cert.issuer?.O || cert.issuer?.CN || "Unknown",
          subject: cert.subject?.CN || hostname,
          validFrom: validFrom.toISOString(),
          validTo: validTo.toISOString(),
          daysRemaining,
          isExpired: daysRemaining <= 0,
          protocol: socket.getProtocol(),
        };

        socket.end();
        resolve(result);
      }
    );

    socket.on("error", (err) =>
      resolve({ valid: false, error: err.message })
    );
    socket.on("timeout", () => {
      socket.destroy();
      resolve({ valid: false, error: "Connection timed out" });
    });
  });
}

async function checkHttpsRedirect(hostname) {
  return new Promise((resolve) => {
    const req = http.get(`http://${hostname}`, { timeout: 8000 }, (res) => {
      const location = res.headers.location || "";
      resolve({
        redirects: [301, 302, 307, 308].includes(res.statusCode),
        redirectsToHttps: location.startsWith("https://"),
        statusCode: res.statusCode,
        location,
      });
      req.destroy();
    });
    req.on("error", () =>
      resolve({ redirects: false, redirectsToHttps: false, error: true })
    );
    req.on("timeout", () => {
      req.destroy();
      resolve({ redirects: false, redirectsToHttps: false, error: true });
    });
  });
}

// ─── Module 4: Structured Data (JSON-LD) ─────────────────────────────────────

async function auditStructuredData(url) {
  const cheerio = await import("cheerio");

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const jsonLdScripts = $('script[type="application/ld+json"]');
    const schemas = [];
    const errors = [];

    jsonLdScripts.each((idx, element) => {
      const rawContent = $(element).text().trim();
      try {
        const parsed = JSON.parse(rawContent);
        const items = Array.isArray(parsed)
          ? parsed
          : parsed["@graph"]
            ? parsed["@graph"]
            : [parsed];

        for (const item of items) {
          const itemContext = item["@context"] || parsed["@context"];
          const isSchemaOrg = /schema\.org/i.test(itemContext || "");

          schemas.push({
            type: item["@type"] || "Unknown",
            context: itemContext,
            validContext: isSchemaOrg,
          });

          if (!isSchemaOrg) {
            errors.push(
              `Block #${idx + 1}: Invalid @context (${itemContext})`
            );
          }
          if (!item["@type"]) {
            errors.push(`Block #${idx + 1}: Missing @type`);
          }
        }
      } catch (parseError) {
        errors.push(
          `Block #${idx + 1}: JSON parse error — ${parseError.message}`
        );
      }
    });

    return {
      totalSchemas: schemas.length,
      types: schemas.map((s) => s.type),
      valid: errors.length === 0 && schemas.length > 0,
      errors,
    };
  } catch (err) {
    return { totalSchemas: 0, types: [], valid: false, errors: [err.message] };
  }
}

// ─── Module 6: Domain Authority (OpenPageRank) ───────────────────────────────

async function auditDomainAuthority(domain) {
  const apiKey = process.env.OPENPAGERANK_API_KEY;
  if (!apiKey) {
    return {
      available: false,
      reason: "OPENPAGERANK_API_KEY not set (free at openpagerank.com)",
    };
  }

  try {
    const url = `https://openpagerank.com/api/v1.0/getPageRank?domains[]=${encodeURIComponent(domain)}`;
    const res = await fetch(url, {
      headers: { "API-OPR": apiKey },
    });

    if (!res.ok) throw new Error(`OpenPageRank API ${res.status}`);

    const data = await res.json();
    const result = data?.response?.[0];

    return {
      available: true,
      pageRank: result?.page_rank_decimal ?? null,
      rank: result?.rank ?? null,
    };
  } catch (err) {
    return { available: false, reason: err.message };
  }
}

// ─── Score Calculator ────────────────────────────────────────────────────────

function calculateOverallScore(results) {
  const weights = {
    performance: 30,
    crawlability: 20,
    ssl: 15,
    structuredData: 10,
    mobile: 15,
    seoScore: 10,
  };

  let totalWeight = 0;
  let weightedSum = 0;

  // Performance score (0-100)
  if (results.cwv?.success) {
    weightedSum += results.cwv.performanceScore * weights.performance;
    totalWeight += weights.performance;
  }

  // SEO score from PSI (0-100)
  if (results.cwv?.success) {
    weightedSum += results.cwv.seoScore * weights.seoScore;
    totalWeight += weights.seoScore;
  }

  // Crawlability (binary checks → score)
  if (results.crawlability) {
    let crawlScore = 0;
    let crawlChecks = 0;

    if (results.crawlability.robotsTxt.exists) crawlScore += 25;
    crawlChecks += 25;

    if (results.crawlability.robotsTxt.allowsGooglebot !== false)
      crawlScore += 25;
    crawlChecks += 25;

    if (results.crawlability.sitemaps.some((s) => s.exists)) crawlScore += 25;
    crawlChecks += 25;

    if (!results.crawlability.indexability.isNoIndex) crawlScore += 15;
    crawlChecks += 15;

    if (results.crawlability.canonical.href) crawlScore += 10;
    crawlChecks += 10;

    const crawlPct = crawlChecks > 0 ? (crawlScore / crawlChecks) * 100 : 0;
    weightedSum += crawlPct * weights.crawlability;
    totalWeight += weights.crawlability;
  }

  // SSL (binary → score)
  if (results.ssl) {
    let sslScore = 0;
    if (results.ssl.cert?.valid) sslScore += 50;
    if (results.ssl.cert?.daysRemaining > 30) sslScore += 25;
    if (results.ssl.redirect?.redirectsToHttps) sslScore += 25;
    weightedSum += sslScore * weights.ssl;
    totalWeight += weights.ssl;
  }

  // Structured data
  if (results.structuredData) {
    const sdScore = results.structuredData.valid
      ? 100
      : results.structuredData.totalSchemas > 0
        ? 60
        : 0;
    weightedSum += sdScore * weights.structuredData;
    totalWeight += weights.structuredData;
  }

  // Mobile friendliness
  if (results.cwv?.success && results.cwv.mobile) {
    let mobileScore = 0;
    let mobileChecks = 0;
    if (results.cwv.mobile.viewport === 1) mobileScore++;
    mobileChecks++;
    if (
      results.cwv.mobile.tapTargets === 1 ||
      results.cwv.mobile.tapTargets === null
    )
      mobileScore++;
    mobileChecks++;
    if (
      results.cwv.mobile.fontSize === 1 ||
      results.cwv.mobile.fontSize === null
    )
      mobileScore++;
    mobileChecks++;

    const mobilePct =
      mobileChecks > 0 ? (mobileScore / mobileChecks) * 100 : 0;
    weightedSum += mobilePct * weights.mobile;
    totalWeight += weights.mobile;
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
}

// ─── Terminal Report Renderer ────────────────────────────────────────────────

function renderReport(url, results) {
  const domain = new URL(url).hostname;

  console.log("\n");
  console.log(
    c("cyan", "╔══════════════════════════════════════════════════════════════╗")
  );
  console.log(
    `${c("cyan", "║")}  ${c("bold", "🔍 SEO GENIE — Technical SEO Audit Report")}                  ${c("cyan", "║")}`
  );
  console.log(
    `${c("cyan", "║")}  ${c("dim", domain)}${" ".repeat(Math.max(1, 58 - domain.length))}${c("cyan", "║")}`
  );
  console.log(
    c("cyan", "╚══════════════════════════════════════════════════════════════╝")
  );

  // Overall Score
  const overallScore = calculateOverallScore(results);
  const overallRating = rateScore(overallScore);
  console.log(
    `\n  ${c("bold", "OVERALL SCORE:")} ${overallScore}/100 ${ratingIcon(overallRating)}\n`
  );

  // ── 1. Core Web Vitals ──
  printHeader("1. CORE WEB VITALS & PERFORMANCE");
  if (results.cwv?.success) {
    printRow(
      "Performance Score",
      `${results.cwv.performanceScore}/100`,
      rateScore(results.cwv.performanceScore)
    );
    printRow(
      "SEO Score",
      `${results.cwv.seoScore}/100`,
      rateScore(results.cwv.seoScore)
    );

    console.log(c("dim", "\n  Lab Data (Simulated Mobile):"));
    const lab = results.cwv.lab;
    for (const [key, thresholds] of Object.entries(CWV_THRESHOLDS)) {
      const value = lab[key];
      if (key === "cls") {
        printRow(
          thresholds.label,
          value !== null ? value.toFixed(3) : "N/A",
          value !== null ? rateMetric(value, thresholds) : null
        );
      } else {
        printRow(
          thresholds.label,
          formatMs(value),
          value !== null ? rateMetric(value, thresholds) : null
        );
      }
    }

    const field = results.cwv.field;
    if (field.lcp !== null || field.inp !== null) {
      console.log(c("dim", "\n  Field Data (Real Users — 28 Day):"));
      if (field.lcp !== null)
        printRow(
          "LCP (Field)",
          formatMs(field.lcp),
          rateMetric(field.lcp, CWV_THRESHOLDS.lcp)
        );
      if (field.inp !== null)
        printRow(
          "INP (Responsiveness)",
          formatMs(field.inp),
          rateMetric(field.inp, { good: 200, poor: 500 })
        );
      if (field.cls !== null)
        printRow(
          "CLS (Field)",
          field.cls.toFixed(3),
          rateMetric(field.cls, CWV_THRESHOLDS.cls)
        );
      if (field.ttfb !== null)
        printRow(
          "TTFB (Field)",
          formatMs(field.ttfb),
          rateMetric(field.ttfb, CWV_THRESHOLDS.ttfb)
        );
    } else {
      console.log(
        c("dim", "\n  Field Data: Not available (insufficient traffic in CrUX)")
      );
    }
  } else {
    console.log(c("red", `  Error: ${results.cwv?.error || "Unknown error"}`));
  }

  // ── 2. Crawlability ──
  printHeader("2. CRAWLABILITY");
  if (results.crawlability) {
    const cr = results.crawlability;
    printCheck(cr.robotsTxt.exists, "robots.txt found");
    printCheck(
      cr.robotsTxt.allowsGooglebot !== false,
      "Googlebot allowed",
      cr.robotsTxt.allowsGooglebot === false ? "BLOCKED" : ""
    );

    const validSitemaps = cr.sitemaps.filter((s) => s.exists);
    printCheck(
      validSitemaps.length > 0,
      "Sitemap found",
      validSitemaps.length > 0
        ? validSitemaps.map((s) => s.url).join(", ")
        : "Not found at standard locations"
    );

    printCheck(
      !cr.indexability.isNoIndex,
      "Page is indexable",
      cr.indexability.isNoIndex
        ? "noindex detected!"
        : cr.indexability.metaRobots || "No blocking directives"
    );

    printCheck(
      Boolean(cr.canonical.href),
      "Canonical tag present",
      cr.canonical.href || "Missing"
    );

    if (cr.canonical.href) {
      printCheck(
        cr.canonical.isSelfReferencing,
        "Canonical is self-referencing",
        cr.canonical.isSelfReferencing ? "" : `Points to: ${cr.canonical.href}`
      );
    }
  }

  // ── 3. SSL / HTTPS ──
  printHeader("3. SSL / HTTPS SECURITY");
  if (results.ssl) {
    const cert = results.ssl.cert;
    if (cert.valid !== undefined) {
      printCheck(cert.valid, "SSL certificate valid", cert.error || "");
      if (cert.valid) {
        printRow("  Issuer", cert.issuer);
        printRow("  Expires", cert.validTo?.split("T")[0] || "Unknown");
        printRow("  Days Remaining", String(cert.daysRemaining));

        if (cert.daysRemaining <= 30 && cert.daysRemaining > 0) {
          printWarning(
            "Certificate expires soon!",
            `${cert.daysRemaining} days remaining`
          );
        }
        if (cert.isExpired) {
          printWarning("Certificate is EXPIRED!");
        }
      }
    }

    const redirect = results.ssl.redirect;
    printCheck(
      redirect?.redirectsToHttps,
      "HTTP → HTTPS redirect",
      redirect?.redirectsToHttps
        ? `${redirect.statusCode} → ${redirect.location}`
        : "Not redirecting"
    );
  }

  // ── 4. Structured Data ──
  printHeader("4. STRUCTURED DATA (JSON-LD)");
  if (results.structuredData) {
    const sd = results.structuredData;
    printCheck(sd.totalSchemas > 0, `Schema blocks found: ${sd.totalSchemas}`);
    if (sd.types.length > 0) {
      printRow("  Types Detected", sd.types.join(", "));
    }
    printCheck(sd.valid, "All schemas valid");
    if (sd.errors.length > 0) {
      for (const err of sd.errors) {
        printWarning(err);
      }
    }
  }

  // ── 5. Mobile Friendliness ──
  printHeader("5. MOBILE FRIENDLINESS");
  if (results.cwv?.success && results.cwv.mobile) {
    const mb = results.cwv.mobile;
    printCheck(mb.viewport === 1, "Viewport meta tag configured");
    printCheck(
      mb.tapTargets === 1 || mb.tapTargets === null,
      "Tap targets properly sized",
      mb.tapTargets === null ? "Audit not applicable" : ""
    );
    printCheck(
      mb.fontSize === 1 || mb.fontSize === null,
      "Font sizes legible",
      mb.fontSize === null ? "Audit not applicable" : ""
    );
  } else {
    console.log(
      c("dim", "  Skipped (requires PageSpeed Insights data)")
    );
  }

  // ── 6. Domain Authority ──
  printHeader("6. DOMAIN AUTHORITY");
  if (results.domainAuthority?.available) {
    const da = results.domainAuthority;
    printRow(
      "PageRank Score",
      da.pageRank !== null ? `${da.pageRank}/10` : "N/A"
    );
    printRow(
      "Global Rank",
      da.rank !== null ? `#${da.rank.toLocaleString()}` : "N/A"
    );
  } else {
    console.log(
      c(
        "dim",
        `  Skipped: ${results.domainAuthority?.reason || "API unavailable"}`
      )
    );
  }

  // Footer
  console.log(`\n${c("cyan", "═".repeat(60))}`);
  console.log(
    c("dim", `  Generated by SEO Genie · ${new Date().toISOString()}`)
  );
  console.log(
    c("dim", "  Powered by theBOAT Group · https://theboatgrp.com")
  );
  console.log(`${c("cyan", "═".repeat(60))}\n`);

  return overallScore;
}

// ─── JSON Export ─────────────────────────────────────────────────────────────

function exportJSON(url, results, overallScore) {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const domain = new URL(url).hostname.replace(/\./g, "-");
  const date = new Date().toISOString().split("T")[0];
  const fileName = `seo-audit-${domain}-${date}.json`;
  const filePath = path.join(REPORTS_DIR, fileName);

  const report = {
    meta: {
      tool: "SEO Genie — Technical SEO Audit",
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      poweredBy: "theBOAT Group (https://theboatgrp.com)",
    },
    target: {
      url,
      domain: new URL(url).hostname,
    },
    overallScore,
    overallRating:
      overallScore >= 90 ? "GOOD" : overallScore >= 50 ? "NEEDS_WORK" : "POOR",
    audits: {
      coreWebVitals: results.cwv?.success
        ? {
            performanceScore: results.cwv.performanceScore,
            seoScore: results.cwv.seoScore,
            lab: results.cwv.lab,
            field: results.cwv.field,
          }
        : { error: results.cwv?.error },
      crawlability: results.crawlability || null,
      ssl: results.ssl || null,
      structuredData: results.structuredData || null,
      mobileFriendliness: results.cwv?.mobile || null,
      domainAuthority: results.domainAuthority || null,
    },
  };

  fs.writeFileSync(filePath, JSON.stringify(report, null, 2), "utf-8");
  console.log(`\n📄 JSON report saved: ${filePath}`);
  return filePath;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const urlIdx = args.indexOf("--url");
  const exportJson = args.includes("--json");

  if (urlIdx === -1 || !args[urlIdx + 1]) {
    console.error(
      "Usage: node scripts/seo_audit.mjs --url https://example.com [--json]"
    );
    process.exit(1);
  }

  const targetUrl = args[urlIdx + 1];

  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    console.error(`Invalid URL: ${targetUrl}`);
    process.exit(1);
  }

  const hostname = parsedUrl.hostname;

  console.log(c("bold", "\n🔍 SEO GENIE — Starting Technical SEO Audit...\n"));
  console.log(c("dim", `  Target: ${targetUrl}`));
  console.log(c("dim", `  Time:   ${new Date().toLocaleString()}\n`));

  const results = {};

  // Run audits with progress indicators
  process.stdout.write(c("dim", "  [1/6] Core Web Vitals & Performance... "));
  results.cwv = await auditCoreWebVitals(targetUrl);
  console.log(results.cwv.success ? c("green", "done") : c("red", "failed"));

  process.stdout.write(c("dim", "  [2/6] Crawlability... "));
  results.crawlability = await auditCrawlability(targetUrl);
  console.log(c("green", "done"));

  process.stdout.write(c("dim", "  [3/6] SSL / HTTPS... "));
  results.ssl = {
    cert: await auditSSL(hostname),
    redirect: await checkHttpsRedirect(hostname),
  };
  console.log(c("green", "done"));

  process.stdout.write(c("dim", "  [4/6] Structured Data... "));
  results.structuredData = await auditStructuredData(targetUrl);
  console.log(c("green", "done"));

  process.stdout.write(c("dim", "  [5/6] Mobile Friendliness... "));
  console.log(
    results.cwv?.success
      ? c("green", "done (from PSI data)")
      : c("yellow", "skipped")
  );

  process.stdout.write(c("dim", "  [6/6] Domain Authority... "));
  results.domainAuthority = await auditDomainAuthority(hostname);
  console.log(
    results.domainAuthority.available
      ? c("green", "done")
      : c("yellow", "skipped")
  );

  // Render report
  const overallScore = renderReport(targetUrl, results);

  // JSON export
  if (exportJson) {
    exportJSON(targetUrl, results, overallScore);
  }
}

main().catch((err) => {
  console.error(c("red", `\nFatal error: ${err.message}`));
  process.exit(1);
});
