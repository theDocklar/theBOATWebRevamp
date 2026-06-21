import type { Metadata } from "next";

const SITE_URL = "https://theboatgrp.com";

export const metadata: Metadata = {
  title: "Stores — Shopify Ecommerce Solutions · theBOAT",
  description:
    "theBOAT builds high-converting Shopify stores for brands and operators. From custom storefronts to full ecommerce systems — we handle the build, the integrations, and the handover.",
  keywords: [
    "Shopify development Sri Lanka",
    "ecommerce development Colombo",
    "Shopify store build",
    "custom Shopify storefront",
    "ecommerce agency Sri Lanka",
    "Shopify agency Colombo",
    "theBOAT Shopify",
  ],
  alternates: {
    canonical: `${SITE_URL}/stores`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/stores`,
    title: "Stores — Shopify Ecommerce · theBOAT",
    description:
      "High-converting Shopify stores built by theBOAT. Custom storefronts, integrations, and full handover.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "theBOAT Shopify Stores" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stores — Shopify Ecommerce · theBOAT",
    description:
      "High-converting Shopify stores. Custom storefronts, integrations, full handover. By theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
