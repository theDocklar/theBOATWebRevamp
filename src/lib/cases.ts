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
    title: "FinPilot — Autonomous Finance Ops for a 65-Person Creative Agency",
    shortTitle: "FinPilot",
    description:
      "How theBOAT replaced two weeks of monthly finance work with five agentic workflows for a 65-person creative agency. Invoice processing, AP/AR reconciliation, and reporting — fully automated with human approval gates.",
    engagement: "Agentic AI system",
    weeks: 8,
    quarter: "Q1 2025",
    datePublished: "2025-03-31",
    status: "Live — fully autonomous",
  },
  {
    slug: "bounce",
    caseNumber: "02",
    client: "Bounce Sports",
    title: "Bounce — Court Booking App for Players & Operators",
    shortTitle: "Bounce",
    description:
      "How theBOAT built a mobile court booking app and admin dashboard for Bounce. Real-time availability, instant confirmation, and a full operator management system — built for sports facility operators.",
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
    title: "Hima Products — 30 Animal Feeders, One Online Store",
    shortTitle: "Hima Products",
    description:
      "How theBOAT built a product website and Shopify store for Hima Products, a Sri Lankan animal feeder company. Spec-first product pages, direct-to-customer checkout, and a dealer locator — replacing phone and WhatsApp orders.",
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
    title: "Troi — Real-Time ROAS & ROI Analytics for SME Marketing Teams",
    shortTitle: "Troi",
    description:
      "How theBOAT built Troi, a marketing analytics dashboard giving SME teams real-time ROAS and ROI visibility across every ad channel — against actual store sales, not just platform-reported numbers.",
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
    title: "OLYCE — Luxury Sri Lanka Tour Booking Website",
    shortTitle: "OLYCE",
    description:
      "How theBOAT built a luxury tour booking site for OLYCE — editorial photography, full 7-day itineraries before the inquiry, and Standard vs Premium pricing side-by-side.",
    engagement: "Luxury tour booking website",
    weeks: 10,
    quarter: "Q2–Q3 2025",
    datePublished: "2025-09-30",
    status: "Live",
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);

export const caseUrl = (slug: string) => `${SITE_URL}/work/${slug}`;
