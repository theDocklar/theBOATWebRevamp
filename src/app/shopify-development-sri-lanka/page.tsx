import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import FAQBlock from "@/components/FAQBlock";
import Image from "next/image";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/shopify-development-sri-lanka`;

export const metadata: Metadata = {
  title: "Expert Shopify Development & Architecture in Sri Lanka · theBOAT",
  description:
    "Leading Shopify agency in Colombo, Sri Lanka. Custom storefront design, payment gateway integration, and proven e-commerce solutions for local brands scaling globally.",
  openGraph: {
    ...OG_DEFAULTS,
    url: PAGE_URL,
    title: "Expert Shopify Development & Architecture in Sri Lanka",
    description:
      "Leading Shopify agency in Colombo. Custom storefront design, payment integration, proven solutions for local brands.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "theBOAT Shopify Development" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "Expert Shopify Development & Architecture in Sri Lanka",
    description:
      "Leading Shopify agency in Colombo. Custom storefront design, payment integration, proven solutions for local brands.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const localProjects = [
  {
    name: "Opotique",
    location: "Colombo",
    industry: "Fashion Boutique",
    description:
      "Full e-commerce build for one of Sri Lanka's leading fashion boutiques. Mobile-first storefront with complete product catalogue integration.",
    services: ["Custom storefront design", "Product catalogue setup", "Mobile UX optimization", "Inventory integration"],
    img: "/ecom/opotique.png",
  },
  {
    name: "Ceyflora",
    location: "Colombo → UAE",
    industry: "Florals & Gifting",
    description:
      "E-commerce platform for a floral and gifting brand expanding from Sri Lanka to the UAE market. Built for same-day delivery workflows and international payment processing.",
    services: ["UAE market expansion", "Payment gateway integration", "Same-day delivery flows", "Photography optimization"],
    img: "/ecom/ceyflora.png",
  },
  {
    name: "Tom Products",
    location: "Colombo",
    industry: "General E-Commerce",
    description:
      "Comprehensive product catalogue with local delivery integration. Clean, straightforward shopping experience optimized for Sri Lankan market.",
    services: ["Catalogue architecture", "Local delivery integration", "Payment processing", "Platform maintenance"],
    img: "/ecom/tom-products.png",
  },
];

const capabilities = [
  {
    title: "Custom Storefront Design & UX",
    description:
      "Mobile-first storefront builds that convert. We design for how Sri Lankan customers actually shop—quick mobile browsing, clear product imagery, streamlined checkout.",
    icon: "🎨",
  },
  {
    title: "Payment Gateway Integration",
    description:
      "Essential for the Sri Lankan market. We integrate local and international payment processors with proper currency handling and fraud protection.",
    icon: "💳",
  },
  {
    title: "Inventory & Fulfillment Architecture",
    description:
      "Backend systems that connect your Shopify store to local warehouses, delivery services, and inventory management. Real-time stock updates and order tracking.",
    icon: "📦",
  },
  {
    title: "International Expansion Support",
    description:
      "Scale from local to global. Multi-currency support, international shipping configuration, regional tax compliance, and market-specific checkout flows.",
    icon: "🌍",
  },
];

const faqs = [
  {
    q: "Do you integrate local payment gateways like PayHere and WEBXPAY?",
    a: "Yes — payment gateway integration is one of our core capabilities for Sri Lankan Shopify builds. We set up local processors like PayHere and WEBXPAY alongside international options (Stripe, PayPal) so you can take orders from customers in Sri Lanka and abroad without friction.",
  },
  {
    q: "How long does a Shopify store build take?",
    a: "A standard storefront build runs 6–8 weeks from kickoff to launch. Advanced builds with custom integrations or multi-currency support typically take 8–10 weeks. We'll give you a specific timeline after an audit of your requirements.",
  },
  {
    q: "Can you help a Sri Lankan business expand to international markets?",
    a: "Yes — we've built this exact path before, including a Colombo brand expanding into the UAE market with same-day delivery workflows and international payment processing. Multi-currency support and regional tax/shipping configuration are part of our International Expansion Support capability.",
  },
  {
    q: "What does a Shopify store cost in Sri Lanka?",
    a: "A store build starts from $3k, advanced setups with custom integrations start from $6k, and ongoing maintenance retainers start from $500/month. Exact pricing depends on catalogue size, integrations, and complexity — book a free audit for an accurate quote.",
  },
];

const whyChooseUs = [
  {
    title: "Dual Expertise",
    description:
      "We understand both frontend aesthetic design and heavy backend digital product deployment. Beautiful storefronts backed by solid technical infrastructure.",
  },
  {
    title: "Local Market Knowledge",
    description:
      "We know the Sri Lankan e-commerce landscape—from payment processor limitations to delivery logistics challenges. We build for the reality, not the ideal.",
  },
  {
    title: "Proven Track Record",
    description:
      "Three live stores, multiple local brands, real revenue flowing through systems we built. Not theory—working commerce platforms you can visit right now.",
  },
  {
    title: "Transparent Processes",
    description:
      "Clear pricing, realistic timelines, honest assessments. We'll tell you what's possible in your budget and what requires additional investment.",
  },
];

export default function ShopifySriLankaPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3.5 py-1.5 bg-[#f04b25]/8 text-[#f04b25] text-xs font-semibold rounded-full uppercase tracking-wide">
              🇱🇰 Sri Lanka
            </span>
            <span className="text-sm text-black/40 font-medium">
              Based in Colombo · Serving local & international
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-8">
            Expert Shopify
            <br />
            Development &
            <br />
            <span className="text-[#f04b25]">Architecture</span>
            <br />
            in Sri Lanka
          </h1>
          <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-3xl">
            Your premier technical partner for building Shopify stores that scale globally
            or dominate the local market. Based in Colombo, trusted by regional brands.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 border-t border-black/10 pt-12">
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-3xl font-bold text-[#0f0f0f]">3+</p>
            <p className="text-sm text-black/50 mt-1">Live stores</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-3xl font-bold text-[#0f0f0f]">LK + UAE</p>
            <p className="text-sm text-black/50 mt-1">Markets served</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-3xl font-bold text-[#0f0f0f]">100%</p>
            <p className="text-sm text-black/50 mt-1">Shopify native</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-3xl font-bold text-[#0f0f0f]">6-10</p>
            <p className="text-sm text-black/50 mt-1">Week delivery</p>
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      <section className="bg-white py-24 md:py-32 border-y border-black/6">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                01 / Local success stories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
              Trusted by Sri Lankan Brands
            </h2>
            <p className="text-lg text-black/60 leading-relaxed max-w-2xl">
              Real Colombo-based businesses with real revenue flowing through the platforms
              we built. Storefront optimization, custom development, and ongoing platform
              maintenance for regional brands scaling both locally and internationally.
            </p>
          </div>

          <div className="grid gap-8">
            {localProjects.map((project, idx) => (
              <div
                key={project.name}
                className="grid md:grid-cols-[280px_1fr] gap-8 p-8 bg-[#f9f9f9] rounded-2xl border border-black/8"
              >
                <div className="relative h-64 md:h-auto rounded-xl overflow-hidden border border-black/5">
                  <Image
                    src={project.img}
                    alt={`${project.name} Shopify store`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#0f0f0f] mb-2">
                        {project.name}
                      </h3>
                      <p className="text-sm text-black/50">
                        {project.industry} · {project.location}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/10 text-green-700 text-xs font-semibold rounded-full">
                      ● Live
                    </span>
                  </div>
                  <p className="text-black/70 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1.5 bg-white text-xs font-medium rounded-full border border-black/10 text-black/60"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-[#f04b25]/5 rounded-2xl border border-[#f04b25]/20">
            <p className="text-sm text-black/70 leading-relaxed">
              <strong>What this means for you:</strong> We've solved the payment gateway
              challenges, delivery logistics integration, and local market optimization
              problems you're about to face. We know what works in Sri Lanka because we've
              already built it.
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                02 / Core capabilities
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
              What We Build
            </h2>
            <p className="text-lg text-black/60 leading-relaxed max-w-2xl">
              End-to-end Shopify development services designed for Sri Lankan businesses with
              global ambitions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="p-8 bg-white rounded-2xl border border-black/8 hover:border-black/20 transition-all"
              >
                <span className="text-4xl mb-4 block">{capability.icon}</span>
                <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                  {capability.title}
                </h3>
                <p className="text-black/60 leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-black/60 leading-relaxed">
            Once your store is live and scaling, the next step is often{" "}
            <a href="/services/agentic-commerce-shopify" className="text-[#f04b25] font-medium hover:underline">
              agentic commerce on Shopify
            </a>{" "}
            — autonomous pricing, inventory, and campaign management layered on top of what
            we build here.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#0f0f0f] text-white py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                03 / Why choose us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Your Technical Partner, Not Just a Developer
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
              We combine technical excellence with local market expertise. Beautiful design
              backed by solid infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyChooseUs.map((reason) => (
              <div key={reason.title} className="p-8 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-white/60 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                04 / Investment
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
              Transparent Pricing
            </h2>
            <p className="text-lg text-black/60 leading-relaxed max-w-2xl">
              Clear pricing for Sri Lankan businesses. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-2xl border border-black/8">
              <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
                Store Build
              </p>
              <p className="text-4xl font-bold text-[#0f0f0f] mb-3">From $3k</p>
              <p className="text-sm text-black/50 leading-relaxed mb-4">
                Custom storefront, product catalogue setup, payment integration, mobile
                optimization.
              </p>
              <p className="text-xs text-black/30">One-time · 6-8 weeks</p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-black/8">
              <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
                Advanced Setup
              </p>
              <p className="text-4xl font-bold text-[#0f0f0f] mb-3">From $6k</p>
              <p className="text-sm text-black/50 leading-relaxed mb-4">
                Custom features, inventory integrations, automated workflows, multi-currency
                support.
              </p>
              <p className="text-xs text-black/30">One-time · 8-10 weeks</p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-black/8">
              <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
                Maintenance
              </p>
              <p className="text-4xl font-bold text-[#0f0f0f] mb-3">From $500/mo</p>
              <p className="text-sm text-black/50 leading-relaxed mb-4">
                Ongoing support, updates, optimization, feature additions, technical
                monitoring.
              </p>
              <p className="text-xs text-black/30">Monthly retainer · optional</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#f04b25]/5 rounded-2xl border border-[#f04b25]/20">
            <p className="text-sm text-black/70">
              <strong>Note:</strong> Pricing varies based on store complexity, product
              catalogue size, and integration requirements. Book a free audit to get an exact
              quote.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                05 / Common questions
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight">
              FAQ
            </h2>
          </div>
          <FAQBlock qa={faqs} title="" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24 md:py-32 border-y border-black/6">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-display uppercase leading-tight text-[#0f0f0f] mb-6">
            Ready to build
            <br />
            your Shopify store?
          </h2>
          <p className="text-lg text-black/60 mb-10 max-w-xl mx-auto">
            Book a free localized Shopify audit. We'll review your requirements, discuss
            the Sri Lankan market specifics, and give you a clear roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-[#f04b25] text-white font-bold rounded-full hover:bg-[#d63f1e] transition-colors text-lg"
            >
              Book free Shopify audit →
            </a>
            <a
              href="/stores"
              className="inline-block px-8 py-4 bg-white text-[#0f0f0f] font-bold rounded-full border-2 border-black/10 hover:border-black/30 transition-colors text-lg"
            >
              View our stores
            </a>
          </div>
          <p className="text-sm text-black/40 mt-8">
            Based in Colombo · Available for projects across Sri Lanka
          </p>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
