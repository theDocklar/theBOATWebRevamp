import type { MetadataRoute } from "next";
import { client } from "../../sanity/lib/client";

const BASE = "https://theboatgrp.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const blogSlugs = await client.fetch(`*[_type == "blog"].slug.current`)
  const serviceSlugs = await client.fetch(`*[_type == "service"].slug.current`)
  const resourceSlugs = await client.fetch(`*[_type == "resource"].slug.current`)

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug: string) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug: string) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  const resourcePages: MetadataRoute.Sitemap = resourceSlugs.map((slug: string) => ({
    url: `${BASE}/resources/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

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
    ...servicePages,
    ...blogPages,
    ...resourcePages,
  ];
}
