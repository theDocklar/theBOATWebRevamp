import type { Metadata } from "next";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";
import { getCase, caseUrl } from "@/lib/cases";

const CASE = getCase("finpilot")!;

export const metadata: Metadata = {
  title: "FinPilot: 5 Workflows Replace 2 Weeks of Finance Ops",
  description: CASE.description,
  alternates: {
    canonical: caseUrl("finpilot"),
  },
  openGraph: {
    ...OG_DEFAULTS,
    type: "article",
    url: caseUrl("finpilot"),
    title: "FinPilot · Autonomous Finance Ops · theBOAT",
    description:
      "Five agentic workflows replacing 2 weeks of monthly finance work for a 65-person creative agency. Built by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FinPilot case study" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "FinPilot · Autonomous Finance Ops · theBOAT",
    description:
      "Five agentic workflows replacing 2 weeks of monthly finance work. Built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleSchema
        title={CASE.title}
        description={CASE.description}
        url={caseUrl("finpilot")}
        publishedAt={CASE.datePublished}
        author="theBOAT"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Work", url: `${SITE_URL}/work` },
          { name: CASE.shortTitle, url: caseUrl("finpilot") },
        ]}
      />
      {children}
    </>
  );
}
