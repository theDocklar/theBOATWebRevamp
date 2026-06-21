import type { Metadata } from "next";

const SITE_URL = "https://theboatgrp.com";

export const metadata: Metadata = {
  title: "OLYCE — Luxury Tour Website for a Premium Sri Lanka Travel Brand",
  description:
    "How theBOAT built a luxury tour booking website for OLYCE, a premium Sri Lanka travel brand. Editorial photography upfront, full itineraries before the inquiry, and Standard and Premium pricing in one view.",
  keywords: [
    "luxury travel website Sri Lanka",
    "tour booking website",
    "Sri Lanka tourism website",
    "OLYCE luxury tours",
    "travel website design",
    "theBOAT case study",
    "premium travel brand Sri Lanka",
  ],
  alternates: {
    canonical: `${SITE_URL}/work/olyce`,
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/work/olyce`,
    title: "OLYCE — Luxury Sri Lanka Tour Website · theBOAT",
    description:
      "Editorial photography upfront, full itineraries before the inquiry, dual pricing — luxury tour booking built for OLYCE by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OLYCE case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OLYCE — Luxury Sri Lanka Tour Website · theBOAT",
    description:
      "Editorial photography, full itineraries, dual pricing. Luxury tour website built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
