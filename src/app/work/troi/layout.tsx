import type { Metadata } from "next";

const SITE_URL = "https://theboatgrp.com";

export const metadata: Metadata = {
  title: "Troi — Real-Time ROAS & ROI Analytics for SME Marketing Teams",
  description:
    "How theBOAT built Troi, a marketing analytics dashboard giving SME teams real-time ROAS and ROI visibility across every ad channel — against actual store sales, not just platform-reported numbers.",
  keywords: [
    "marketing analytics dashboard",
    "ROAS tracking tool",
    "ROI analytics SME",
    "ad performance dashboard",
    "Troi analytics",
    "theBOAT case study",
    "marketing automation Sri Lanka",
  ],
  alternates: {
    canonical: `${SITE_URL}/work/troi`,
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/work/troi`,
    title: "Troi — ROAS & ROI Analytics Dashboard · theBOAT",
    description:
      "Channel-wise ROAS and ROI against actual store sales — built for SME marketing teams by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Troi case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Troi — ROAS & ROI Analytics Dashboard · theBOAT",
    description:
      "Real-time ROAS and ROI across every channel, against actual sales. Built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
