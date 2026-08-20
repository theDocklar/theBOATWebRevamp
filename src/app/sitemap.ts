import type { MetadataRoute } from "next";
import { client } from "../../sanity/lib/client";

const BASE = "https://theboatgrp.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // ── Single query for all dynamic content with real timestamps ──
  const dynamicContent: {
    _type: string;
    slug: string;
    _updatedAt: string;
  }[] = await client.fetch(
    `*[_type in ["blog", "service", "resource"] && defined(slug.current)] {
      _type,
      "slug": slug.current,
      _updatedAt
    }`
  );

  // ── Route config per content type ──
  const routeConfig: Record<
    string,
    { prefix: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }
  > = {
    blog: { prefix: "/blog", changeFrequency: "weekly", priority: 0.7 },
    service: { prefix: "/services", changeFrequency: "monthly", priority: 0.9 },
    resource: { prefix: "/resources", changeFrequency: "monthly", priority: 0.7 },
  };

  const dynamicPages: MetadataRoute.Sitemap = dynamicContent.map((item) => {
    const config = routeConfig[item._type] ?? routeConfig.resource;
    return {
      url: `${BASE}${config.prefix}/${item.slug}`,
      lastModified: item._updatedAt,
      changeFrequency: config.changeFrequency,
      priority: config.priority,
    };
  });

  // ── Static pages ──
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage — highest priority
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    // Section listing / index pages — important for crawl discovery
    {
      url: `${BASE}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Case study hub — links every case, valid breadcrumb target
    {
      url: `${BASE}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Showcase / portfolio pages
    {
      url: `${BASE}/frames`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/stores`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // SEO-focused landing pages — high-intent keywords
    {
      url: `${BASE}/services/agentic-commerce-shopify`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE}/services/ai-automation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE}/services/web-development-colombo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE}/shopify-development-sri-lanka`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },

    // Case study pages
    {
      url: `${BASE}/work/finpilot`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/work/bounce`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/work/hima`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/work/olyce`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/work/troi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Static pages first (listing pages act as hubs for crawler discovery),
  // then dynamic pages (individual content)
  return [...staticPages, ...dynamicPages];
}
