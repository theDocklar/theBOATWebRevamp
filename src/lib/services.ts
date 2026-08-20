import { SITE_URL } from "./seo";

export type ServiceBlock = {
  title: string;
  description: string;
  /** Absolute URL for Service schema's `url` field — NOT the on-page button target. */
  schemaUrl: string;
};

// Title + description are the single source used by both the visible cards
// (ServicesSection.tsx) and ServiceSchema, so the two can't drift apart.
// schemaUrl is separate from each card's on-page "Learn more" href: three of
// the four services (AI workflow automation, Shopify + commerce, Creative
// studio) link visitors to a dedicated page or portfolio directly, while
// Product development sends visitors to #contact — but for schema.org's
// Service.url, all four resolve to the page that actually describes the
// service, which for the one without a dedicated page is the homepage
// services section.
export const SERVICES: ServiceBlock[] = [
  {
    title: "Product development",
    description:
      "Got an idea and need a team to build it? We work alongside you, from first wireframe to shipped product, usually in 8 weeks. No handoffs, daily contact.",
    schemaUrl: `${SITE_URL}/#services`,
  },
  {
    title: "AI workflow automation",
    description:
      "Your team is probably spending 20–30 hours a month on work that could run itself. We find it, automate it, and hand over the keys.",
    schemaUrl: `${SITE_URL}/services/ai-automation`,
  },
  {
    title: "Shopify + commerce",
    description:
      "Shopify stores that don't need babysitting. Inventory, pricing, cart recovery: wired up to handle themselves so you can focus on growing the thing.",
    schemaUrl: `${SITE_URL}/stores`,
  },
  {
    title: "Creative studio",
    description:
      "Photography, brand identities, lookbooks, packaging, done by people who also understand why it needs to convert, not just look good.",
    schemaUrl: `${SITE_URL}/frames`,
  },
];
