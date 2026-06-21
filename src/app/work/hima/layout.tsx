import type { Metadata } from "next";

const SITE_URL = "https://theboatgrp.com";

export const metadata: Metadata = {
  title: "Hima Products — 30 Animal Feeders, One Online Store",
  description:
    "How theBOAT built a product website and Shopify store for Hima Products, a Sri Lankan animal feeder company. Spec-first product pages, direct-to-customer checkout, and a dealer locator — replacing phone and WhatsApp orders.",
  keywords: [
    "Shopify store Sri Lanka",
    "animal feeder ecommerce",
    "product website case study",
    "Hima Products",
    "ecommerce development Colombo",
    "theBOAT case study",
    "Shopify development Sri Lanka",
  ],
  alternates: {
    canonical: `${SITE_URL}/work/hima`,
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/work/hima`,
    title: "Hima Products — Animal Feeder Store · theBOAT",
    description:
      "Product website and Shopify store for a Sri Lankan animal feeder company. 30+ products, spec-first pages, direct checkout. Built by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hima Products case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hima Products — Animal Feeder Store · theBOAT",
    description:
      "30+ animal feeders. Spec-first product pages. Direct-to-customer Shopify store. Built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
