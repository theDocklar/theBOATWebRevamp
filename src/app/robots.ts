import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/"],
      },
    ],
    sitemap: "https://theboatgrp.com/sitemap.xml",
    host: "https://theboatgrp.com",
  };
}
