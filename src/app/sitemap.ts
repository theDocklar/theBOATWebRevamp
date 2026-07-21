import type { MetadataRoute } from "next";
import { getAllContentSlugs } from "@/lib/mdx";

const BASE = "https://theboatgrp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Get all service and blog slugs dynamically
  const serviceSlugs = getAllContentSlugs('services');
  const blogSlugs = getAllContentSlugs('blog');

  // Build service pages
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Build blog pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/frames`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/stores`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/work/finpilot`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/work/bounce`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/work/hima`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
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
      priority: 0.8,
    },
    // Dynamically include all service pages
    ...servicePages,
    // Dynamically include all blog pages
    ...blogPages,
  ];
}
