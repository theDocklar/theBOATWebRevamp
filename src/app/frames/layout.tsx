import type { Metadata } from "next";

const SITE_URL = "https://theboatgrp.com";

export const metadata: Metadata = {
  title: "Frames — Creative Studio · Product Photography & Brand Identity",
  description:
    "Frames by theBOAT is a creative studio specialising in product photography, brand identities, lookbooks, packaging, and campaign content. The same systems-first precision applied to creative work.",
  keywords: [
    "product photography Sri Lanka",
    "brand identity design Colombo",
    "creative studio Sri Lanka",
    "lookbook photography",
    "packaging design Sri Lanka",
    "campaign content Colombo",
    "Frames theBOAT",
  ],
  alternates: {
    canonical: `${SITE_URL}/frames`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/frames`,
    title: "Frames — Creative Studio · theBOAT",
    description:
      "Product photography, brand identities, lookbooks, packaging — systems-first precision applied to creative work.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Frames Creative Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frames — Creative Studio · theBOAT",
    description:
      "Product photography, brand identities, lookbooks, packaging. By theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
