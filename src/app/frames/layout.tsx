import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Frames — Creative Studio · Product Photography & Brand Identity",
  description:
    "Frames by theBOAT is a creative studio specialising in product photography, brand identities, lookbooks, packaging, and campaign content. The same systems-first precision applied to creative work.",
  alternates: {
    canonical: `${SITE_URL}/frames`,
  },
  openGraph: {
    ...OG_DEFAULTS,
    type: "website",
    url: `${SITE_URL}/frames`,
    title: "Frames — Creative Studio · theBOAT",
    description:
      "Product photography, brand identities, lookbooks, packaging — systems-first precision applied to creative work.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Frames Creative Studio" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "Frames — Creative Studio · theBOAT",
    description:
      "Product photography, brand identities, lookbooks, packaging. By theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Frames", url: `${SITE_URL}/frames` },
        ]}
      />
      {children}
    </>
  );
}
