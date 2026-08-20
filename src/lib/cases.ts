import { SITE_URL } from "./seo";

export type CaseStudy = {
  slug: string;
  caseNumber: string;
  client: string;
  title: string;
  shortTitle: string;
  description: string;
  engagement: string;
  weeks: number;
  quarter: string;
  datePublished: string;
  status: string;
};

// datePublished is inferred from the stated launch quarter (end-of-quarter date),
// not a recorded publish date — replace with the real date if one exists.
export const CASES: CaseStudy[] = [
  {
    slug: "finpilot",
    caseNumber: "01",
    client: "NorthBridge Studios",
    title: "FinPilot · Autonomous Finance Ops for a 65-Person Creative Agency",
    shortTitle: "FinPilot",
    description:
      "Five agentic workflows now run invoice processing, AP/AR reconciliation, and reporting for a 65-person creative agency, replacing two weeks of manual finance work every month.",
    engagement: "Agentic AI system",
    weeks: 8,
    quarter: "Q1 2025",
    datePublished: "2025-03-31",
    status: "Live, fully autonomous",
  },
  {
    slug: "bounce",
    caseNumber: "02",
    client: "Bounce Sports",
    title: "Bounce · Court Booking App for Players & Operators",
    shortTitle: "Bounce",
    description:
      "How theBOAT built a mobile court booking app and admin dashboard for Bounce. Real-time availability, instant confirmation, and a full operator management system, built for sports facility operators.",
    engagement: "Mobile app + admin dashboard",
    weeks: 10,
    quarter: "Q2–Q3 2025",
    datePublished: "2025-09-30",
    status: "In development",
  },
  {
    slug: "hima",
    caseNumber: "03",
    client: "Hima Products",
    title: "Hima Products · 30 Animal Feeders, One Online Store",
    shortTitle: "Hima Products",
    description:
      "A Sri Lankan animal feeder company went from phone and WhatsApp orders to a 30+ product Shopify catalogue with direct-to-customer checkout, no dealer required.",
    engagement: "Product website + online store",
    weeks: 8,
    quarter: "Q1 2025",
    datePublished: "2025-03-31",
    status: "Live",
  },
  {
    slug: "troi",
    caseNumber: "04",
    client: "Troi",
    title: "Troi · Real-Time ROAS & ROI Analytics for SME Marketing Teams",
    shortTitle: "Troi",
    description:
      "A real-time attribution dashboard reconciling Google, Meta, and TikTok ad claims against actual Shopify and WooCommerce orders, not platform-reported numbers.",
    engagement: "SaaS dashboard",
    weeks: 12,
    quarter: "Q1–Q2 2025",
    datePublished: "2025-06-30",
    status: "Beta",
  },
  {
    slug: "olyce",
    caseNumber: "05",
    client: "OLYCE",
    title: "OLYCE · Luxury Sri Lanka Tour Booking Website",
    shortTitle: "OLYCE",
    description:
      "A luxury Sri Lanka travel brand went from word-of-mouth and email inquiries to a fully bookable site: editorial photography, live pricing, and full itineraries on every package page.",
    engagement: "Luxury tour booking website",
    weeks: 10,
    quarter: "Q2–Q3 2025",
    datePublished: "2025-09-30",
    status: "Live",
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);

export const caseUrl = (slug: string) => `${SITE_URL}/work/${slug}`;
