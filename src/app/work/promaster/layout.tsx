import type { Metadata } from "next";

const SITE_URL = "https://theboatgrp.com";

export const metadata: Metadata = {
  title: "Pro Master — 200 Products, One Catalog for a UAE Construction Chemicals Company",
  description:
    "How theBOAT built a product website and Sanity CMS for Pro Master Construction Products LLC, a UAE-based construction chemicals company — replacing WhatsApp datasheet requests with a searchable catalog across six GCC markets.",
  keywords: [
    "construction chemicals website UAE",
    "Sanity CMS case study",
    "product catalog website",
    "GCC market website",
    "Pro Master Construction",
    "theBOAT case study",
    "Next.js Sanity CMS",
  ],
  alternates: {
    canonical: `${SITE_URL}/work/promaster`,
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/work/promaster`,
    title: "Pro Master — 200-Product Catalog · theBOAT",
    description:
      "Product website and Sanity CMS for a UAE construction chemicals company. 200+ products, technical doc library, 6 GCC markets. Built by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pro Master case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Master — 200-Product Catalog · theBOAT",
    description:
      "200+ products, technical doc library, 6 GCC markets. Sanity CMS + Next.js. Built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
