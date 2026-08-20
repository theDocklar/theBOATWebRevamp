import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Stores · Shopify Ecommerce Solutions",
  description:
    "theBOAT builds high-converting Shopify stores for brands and operators. From custom storefronts to full ecommerce systems: we handle the build, the integrations, and the handover.",
  alternates: {
    canonical: `${SITE_URL}/stores`,
  },
  openGraph: {
    ...OG_DEFAULTS,
    type: "website",
    url: `${SITE_URL}/stores`,
    title: "Stores · Shopify Ecommerce · theBOAT",
    description:
      "High-converting Shopify stores built by theBOAT. Custom storefronts, integrations, and full handover.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "theBOAT Shopify Stores" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "Stores · Shopify Ecommerce · theBOAT",
    description:
      "High-converting Shopify stores. Custom storefronts, integrations, full handover. By theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Stores", url: `${SITE_URL}/stores` },
        ]}
      />
      {children}
    </>
  );
}
