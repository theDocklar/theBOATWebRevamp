import type { Metadata } from "next";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";
import { getCase, caseUrl } from "@/lib/cases";

const CASE = getCase("hima")!;

export const metadata: Metadata = {
  title: "Hima Products: 30+ Feeders, Zero Dealer Required",
  description: CASE.description,
  alternates: {
    canonical: caseUrl("hima"),
  },
  openGraph: {
    ...OG_DEFAULTS,
    type: "article",
    url: caseUrl("hima"),
    title: "Hima Products · Animal Feeder Store · theBOAT",
    description:
      "Product website and Shopify store for a Sri Lankan animal feeder company. 30+ products, spec-first pages, direct checkout. Built by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hima Products case study" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "Hima Products · Animal Feeder Store · theBOAT",
    description:
      "30+ animal feeders. Spec-first product pages. Direct-to-customer Shopify store. Built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleSchema
        title={CASE.title}
        description={CASE.description}
        url={caseUrl("hima")}
        publishedAt={CASE.datePublished}
        author="theBOAT"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Work", url: `${SITE_URL}/work` },
          { name: CASE.shortTitle, url: caseUrl("hima") },
        ]}
      />
      {children}
    </>
  );
}
