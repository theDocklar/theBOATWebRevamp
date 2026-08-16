import type { Metadata } from "next";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";
import { getCase, caseUrl } from "@/lib/cases";

const CASE = getCase("olyce")!;

export const metadata: Metadata = {
  title: "OLYCE — Luxury Sri Lanka Tour Booking Website",
  description: CASE.description,
  alternates: {
    canonical: caseUrl("olyce"),
  },
  openGraph: {
    ...OG_DEFAULTS,
    type: "article",
    url: caseUrl("olyce"),
    title: "OLYCE — Luxury Sri Lanka Tour Booking Website · theBOAT",
    description:
      "Editorial photography up front, full 7-day itineraries before the inquiry, Standard vs Premium pricing side-by-side. Shipped in 10 weeks. Built by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OLYCE case study" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "OLYCE — Luxury Sri Lanka Tour Booking Website · theBOAT",
    description:
      "Editorial photography, full itineraries before inquiry, Standard vs Premium pricing side-by-side. Built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function OlyceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleSchema
        title={CASE.title}
        description={CASE.description}
        url={caseUrl("olyce")}
        publishedAt={CASE.datePublished}
        author="theBOAT"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Work", url: `${SITE_URL}/work` },
          { name: CASE.shortTitle, url: caseUrl("olyce") },
        ]}
      />
      {children}
    </>
  );
}
