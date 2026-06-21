import type { Metadata } from "next";

const SITE_URL = "https://theboatgrp.com";

export const metadata: Metadata = {
  title: "Bounce — Court Booking App for Players & Operators",
  description:
    "How theBOAT built a mobile court booking app and admin dashboard for Bounce. Real-time availability, instant confirmation, and a full operator management system — built for sports facility operators.",
  keywords: [
    "court booking app case study",
    "sports booking platform",
    "mobile app development Sri Lanka",
    "Bounce court booking",
    "theBOAT case study",
    "React Native app development",
  ],
  alternates: {
    canonical: `${SITE_URL}/work/bounce`,
  },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/work/bounce`,
    title: "Bounce — Court Booking App · theBOAT",
    description:
      "Mobile app for players + admin dashboard for court operators. Real-time availability and instant confirmation. Built by theBOAT.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Bounce case study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bounce — Court Booking App · theBOAT",
    description:
      "Mobile app for players + admin dashboard for court operators. Built by theBOAT.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
