import type { Metadata } from "next";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";
import { getCase, caseUrl } from "@/lib/cases";

const CASE = getCase("troi")!;

export const metadata: Metadata = {
  title: "Troi — Real-Time ROAS & ROI Analytics for SME Marketing Teams",
  description: CASE.description,
  alternates: {
    canonical: caseUrl("troi"),
  },
  openGraph: {
    ...OG_DEFAULTS,
    type: "article",
    url: caseUrl("troi"),
    title: "Troi — ROAS & ROI Analytics Dashboard · theBOAT",
    description:
      "Channel-wise ROAS and ROI against actual store sales — built for SME marketing teams by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Troi case study" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "Troi — ROAS & ROI Analytics Dashboard · theBOAT",
    description:
      "Real-time ROAS and ROI across every channel, against actual sales. Built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleSchema
        title={CASE.title}
        description={CASE.description}
        url={caseUrl("troi")}
        publishedAt={CASE.datePublished}
        author="theBOAT"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Work", url: `${SITE_URL}/work` },
          { name: CASE.shortTitle, url: caseUrl("troi") },
        ]}
      />
      {children}
    </>
  );
}
