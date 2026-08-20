import type { Metadata } from "next";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";
import { getCase, caseUrl } from "@/lib/cases";

const CASE = getCase("olyce")!;

export const metadata: Metadata = {
  title: "OLYCE: 4 Tour Packages, Zero Calls to Book",
  description: CASE.description,
  alternates: {
    canonical: caseUrl("olyce"),
  },
  openGraph: {
    ...OG_DEFAULTS,
    type: "article",
    url: caseUrl("olyce"),
    title: "OLYCE · Luxury Sri Lanka Tour Booking Website · theBOAT",
    description:
      "A word-of-mouth luxury travel brand goes fully bookable: 4 packages, editorial photography, and Standard vs Premium pricing on every page. No calls needed.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OLYCE case study" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "OLYCE · Luxury Sri Lanka Tour Booking Website · theBOAT",
    description:
      "A word-of-mouth luxury travel brand goes fully bookable: 4 packages, editorial photography, and transparent pricing on every page.",
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
