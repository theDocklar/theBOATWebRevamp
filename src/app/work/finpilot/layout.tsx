import type { Metadata } from "next";

const SITE_URL = "https://theboatgrp.com";

export const metadata: Metadata = {
  title: "FinPilot — Autonomous Finance Ops for a 65-Person Creative Agency",
  description:
    "How theBOAT replaced two weeks of monthly finance work with five agentic workflows for a 65-person creative agency. Invoice processing, AP/AR reconciliation, and reporting — fully automated with human approval gates.",
  keywords: [
    "finance automation case study",
    "agentic workflow",
    "accounts payable automation",
    "creative agency automation",
    "FinPilot",
    "theBOAT case study",
  ],
  alternates: {
    canonical: `${SITE_URL}/work/finpilot`,
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/work/finpilot`,
    title: "FinPilot — Autonomous Finance Ops · theBOAT",
    description:
      "Five agentic workflows replacing 2 weeks of monthly finance work for a 65-person creative agency. Built by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FinPilot case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinPilot — Autonomous Finance Ops · theBOAT",
    description:
      "Five agentic workflows replacing 2 weeks of monthly finance work. Built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
