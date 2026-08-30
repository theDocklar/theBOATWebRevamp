/**
 * Reddit API & Intelligence Utility
 *
 * Supports:
 *  1. Zero-setup public Reddit endpoints (r/{subreddit}/hot.json, search.json)
 *  2. Authenticated Reddit OAuth API for higher throughput
 */

export interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  subreddit: string;
  author: string;
  score: number;
  numComments: number;
  url: string;
  permalink: string;
  createdAt: Date;
  flair?: string;
}

export interface ExtractedQuestion {
  question: string;
  sourceSubreddit: string;
  sourceUrl: string;
  score: number;
  category: "shopify" | "automation" | "ai_agents" | "custom_web" | "sri_lanka_business";
}

export interface RedditSearchOptions {
  subreddits?: string[];
  query?: string;
  limit?: number;
  timeframe?: "day" | "week" | "month" | "year" | "all";
  sort?: "relevance" | "hot" | "top" | "new";
}

const DEFAULT_SUBREDDITS = [
  "srilanka",
  "shopify",
  "ecommerce",
  "n8n",
  "automation",
  "startups",
  "smallbusiness",
  "webdev",
];

const USER_AGENT = "theBOAT-SEO-Intelligence-Bot/1.0 (B2B Web & Automation Research)";

/**
 * Fetches recent/top posts from a specific subreddit
 */
export async function fetchSubredditPosts(
  subreddit: string,
  sort: "hot" | "new" | "top" = "hot",
  limit = 25
): Promise<RedditPost[]> {
  const url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });

    if (!res.ok) {
      throw new Error(`Reddit API returned status ${res.status} for r/${subreddit}`);
    }

    const data = await res.json();
    const posts: RedditPost[] = [];

    for (const child of data.data?.children || []) {
      const post = child.data;
      if (post.stickied) continue; // Skip pinned announcement posts

      posts.push({
        id: post.id,
        title: post.title,
        selftext: post.selftext || "",
        subreddit: post.subreddit,
        author: post.author,
        score: post.score || 0,
        numComments: post.num_comments || 0,
        url: post.url,
        permalink: `https://reddit.com${post.permalink}`,
        createdAt: new Date(post.created_utc * 1000),
        flair: post.link_flair_text || undefined,
      });
    }

    return posts;
  } catch (err: any) {
    console.warn(`⚠️ Warning: Failed to fetch r/${subreddit}: ${err.message}`);
    return [];
  }
}

/**
 * Searches across subreddits for specific pain point queries
 */
export async function searchRedditKeywords(
  options: RedditSearchOptions
): Promise<RedditPost[]> {
  const subreddits = options.subreddits || DEFAULT_SUBREDDITS;
  const query = options.query || "how to OR alternative OR agency OR problem";
  const limit = options.limit || 20;
  const sort = options.sort || "relevance";
  const timeframe = options.timeframe || "month";

  const allPosts: RedditPost[] = [];

  for (const sub of subreddits) {
    const searchUrl = `https://www.reddit.com/r/${sub}/search.json?q=${encodeURIComponent(
      query
    )}&restrict_sr=1&sort=${sort}&t=${timeframe}&limit=${limit}`;

    try {
      const res = await fetch(searchUrl, {
        headers: {
          "User-Agent": USER_AGENT,
        },
      });

      if (!res.ok) continue;

      const data = await res.json();
      for (const child of data.data?.children || []) {
        const post = child.data;
        allPosts.push({
          id: post.id,
          title: post.title,
          selftext: post.selftext || "",
          subreddit: post.subreddit,
          author: post.author,
          score: post.score || 0,
          numComments: post.num_comments || 0,
          url: post.url,
          permalink: `https://reddit.com${post.permalink}`,
          createdAt: new Date(post.created_utc * 1000),
          flair: post.link_flair_text || undefined,
        });
      }

      // Respect standard polite rate limits
      await new Promise((r) => setTimeout(r, 600));
    } catch {
      // Continue next subreddit
    }
  }

  return allPosts;
}

/**
 * Classifies raw Reddit posts into buyer intent topics & extracts real search questions
 */
export function extractBuyerQuestions(posts: RedditPost[]): ExtractedQuestion[] {
  const questions: ExtractedQuestion[] = [];

  for (const post of posts) {
    const text = `${post.title} ${post.selftext}`;
    let category: ExtractedQuestion["category"] = "custom_web";

    if (
      /shopify|payment gateway|payhere|webxpay|store|ecommerce|checkout|dropshipping/i.test(
        text
      )
    ) {
      category = "shopify";
    } else if (/n8n|zapier|make\.com|automation|workflow|airtable|webhook/i.test(text)) {
      category = "automation";
    } else if (/ai agent|agentic|langchain|crewai|claude|chatgpt agent|autonomous/i.test(text)) {
      category = "ai_agents";
    } else if (/sri lanka|colombo|lkr|local business|lk/i.test(text)) {
      category = "sri_lanka_business";
    }

    // Extract title if it's a genuine question or pain point
    if (
      post.title.includes("?") ||
      /^(how|why|what|which|is it|anyone|recommendation|best way|help)/i.test(post.title) ||
      /vs|alternative|problem|issue|cost|pricing|hire/i.test(post.title)
    ) {
      questions.push({
        question: post.title.trim(),
        sourceSubreddit: post.subreddit,
        sourceUrl: post.permalink,
        score: post.score,
        category,
      });
    }
  }

  return questions;
}
