import { createClient } from "next-sanity";
import fs from "node:fs";
import path from "node:path";

export interface PublishedPost {
  title: string;
  slug: string;
  keyword?: string;
  secondaryKeywords?: string[];
  publishedAt?: string;
}

export interface RuleValidationResult {
  passed: boolean;
  rule1AntiCannibalization: { passed: boolean; details: string };
  rule2CommercialLinks: { passed: boolean; details: string };
  rule3IndexationFreshness: { passed: boolean; details: string };
}

const MEMORY_FILE = path.resolve(process.cwd(), "data", "published_memory.json");

/**
 * Fetches all currently published blog posts from Sanity (or fallback local memory)
 */
export async function getPublishedPosts(): Promise<PublishedPost[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wr7f7n4t";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "theboat";

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false,
    });

    const docs: Array<{ title: string; slug: string; keyword?: string; publishedAt?: string }> =
      await client.fetch(
        `*[_type == "blog" && defined(slug.current)] {
          title,
          "slug": slug.current,
          keyword,
          publishedAt
        }`
      );

    const posts = docs.map((d) => ({
      title: d.title || "",
      slug: d.slug || "",
      keyword: d.keyword || "",
      publishedAt: d.publishedAt || "",
    }));

    const dataDir = path.dirname(MEMORY_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(posts, null, 2), "utf-8");

    return posts;
  } catch (err: any) {
    if (fs.existsSync(MEMORY_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf-8"));
      } catch {
        return [];
      }
    }
    return [];
  }
}

/**
 * RULE 1: Strict Zero Keyword Cannibalization Validator
 */
export function validateAntiCannibalization(
  targetSlug: string,
  targetKeyword: string,
  publishedPosts: PublishedPost[]
): { isCannibalized: boolean; conflictPost?: PublishedPost; reason?: string } {
  const normSlug = targetSlug.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normKeyword = targetKeyword.toLowerCase().trim();

  for (const post of publishedPosts) {
    const postSlugNorm = (post.slug || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const postKeywordNorm = (post.keyword || "").toLowerCase().trim();
    const postTitleNorm = (post.title || "").toLowerCase();

    // 1. Exact or identical slug conflict
    if (postSlugNorm === normSlug) {
      return {
        isCannibalized: true,
        conflictPost: post,
        reason: `Duplicate slug collision: "/blog/${post.slug}" already exists`,
      };
    }

    // 2. Exact keyword cannibalization
    if (postKeywordNorm && normKeyword && postKeywordNorm === normKeyword) {
      return {
        isCannibalized: true,
        conflictPost: post,
        reason: `Keyword cannibalization: Primary keyword "${targetKeyword}" is already owned by "/blog/${post.slug}"`,
      };
    }

    // 3. High keyword overlap in title (>75% similarity)
    if (normKeyword.length > 5 && postTitleNorm.includes(normKeyword)) {
      return {
        isCannibalized: true,
        conflictPost: post,
        reason: `Title intent conflict: Existing post "${post.title}" already targets "${normKeyword}"`,
      };
    }
  }

  return { isCannibalized: false };
}

/**
 * RULE 2: Mandatory Commercial & Proof-of-Work Link Validator
 */
export function validateCommercialLinks(markdownContent: string): {
  hasStoresLink: boolean;
  hasServiceLink: boolean;
  hasCaseStudyLink: boolean;
  passed: boolean;
  missing: string[];
} {
  const hasStoresLink =
    markdownContent.includes("https://theboatgrp.com/stores") ||
    markdownContent.includes("](/stores)") ||
    markdownContent.includes("href=\"/stores\"");

  const hasServiceLink =
    markdownContent.includes("/shopify-development-sri-lanka") ||
    markdownContent.includes("/services/ai-automation") ||
    markdownContent.includes("/services/agentic-commerce-shopify") ||
    markdownContent.includes("/services/web-development-colombo") ||
    markdownContent.includes("/services");

  const hasCaseStudyLink =
    markdownContent.includes("/work/finpilot") ||
    markdownContent.includes("/work/hima") ||
    markdownContent.includes("/work/troi") ||
    markdownContent.includes("/work/olyce") ||
    markdownContent.includes("/work/bounce") ||
    markdownContent.includes("/work");

  const missing: string[] = [];
  if (!hasStoresLink) missing.push("Proof-of-work link (https://theboatgrp.com/stores)");
  if (!hasServiceLink) missing.push("Commercial service landing page (/services/*)");
  if (!hasCaseStudyLink) missing.push("Concrete case study proof (/work/*)");

  return {
    hasStoresLink,
    hasServiceLink,
    hasCaseStudyLink,
    passed: hasStoresLink && hasServiceLink && hasCaseStudyLink,
    missing,
  };
}
