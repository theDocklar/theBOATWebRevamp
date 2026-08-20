import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import FAQBlock from "@/components/FAQBlock";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/services/agentic-commerce-shopify`;

const faqs = [
  {
    q: "What is agentic commerce, and how is it different from typical Shopify automation apps?",
    a: "Regular automation apps run fixed rules — \"if X, do Y.\" Agentic commerce systems make decisions: adjusting pricing, managing inventory, and running campaigns based on real-time performance data, then learning from the outcomes. It's the difference between a script and a system that manages itself.",
  },
  {
    q: "Do I need agentic commerce if I'm a small or early-stage store?",
    a: "Probably not yet. Agentic commerce setups are built for stores already processing meaningful order volume — generally 1,000+ orders a month, multi-channel operations, or subscription businesses — where manual inventory, pricing, and attribution management has become the bottleneck. If you're still building your storefront, start with our Shopify development services in Sri Lanka first.",
  },
  {
    q: "How does automated AI checkout actually work on Shopify?",
    a: "It's built on server-side tracking and event-driven infrastructure — webhooks fire on cart, inventory, and order events, and automation layers respond in real time: adjusting pricing, triggering cart-recovery flows, and routing attribution data, without a human in the loop for routine decisions.",
  },
  {
    q: "How long does it take to set up an agentic commerce system?",
    a: "Initial setup — infrastructure, integrations, and automation workflows — typically takes 6–8 weeks, followed by an ongoing platform management retainer to monitor and tune the system as your store scales.",
  },
];

export const metadata: Metadata = {
  title: "Agentic Commerce on Shopify — Automated E-Commerce Architecture",
  description:
    "Advanced AI-driven automated e-commerce solutions for Shopify. Intelligent platform management, revenue attribution, and autonomous shopping experiences that scale.",
  openGraph: {
    ...OG_DEFAULTS,
    url: PAGE_URL,
    title: "Agentic Commerce on Shopify — Automated E-Commerce Architecture",
    description:
      "Advanced AI-driven automated e-commerce solutions for Shopify. Intelligent platform management and autonomous shopping experiences.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "theBOAT Agentic Commerce" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "Agentic Commerce on Shopify — Automated E-Commerce Architecture",
    description:
      "Advanced AI-driven automated e-commerce solutions for Shopify. Intelligent platform management and autonomous shopping experiences.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function AgenticCommerceShopifyPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <div className="mb-8">
          <span className="inline-block px-3.5 py-1.5 bg-[#f04b25]/8 text-[#f04b25] text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
            High-Intent Commercial
          </span>
          <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-8">
            The Future of
            <br />
            Agentic Commerce
            <br />
            <span className="text-[#f04b25]">on Shopify</span>
          </h1>
          <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-3xl">
            Standard Shopify storefronts are no longer enough. Modern e-commerce requires
            intelligent, autonomous systems that drive revenue while you sleep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 border-t border-black/10 pt-12">
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
              Automation Level
            </p>
            <p className="text-3xl font-bold text-[#0f0f0f]">95%+</p>
            <p className="text-xs text-black/40 mt-1">Autonomous operations</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
              Revenue Attribution
            </p>
            <p className="text-3xl font-bold text-[#0f0f0f]">Real-time</p>
            <p className="text-xs text-black/40 mt-1">Advanced tracking</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
              Platform Management
            </p>
            <p className="text-3xl font-bold text-[#0f0f0f]">Intelligent</p>
            <p className="text-xs text-black/40 mt-1">AI-powered decisions</p>
          </div>
        </div>
      </section>

      {/* What is Agentic Commerce */}
      <section className="bg-white py-24 md:py-32 border-y border-black/6">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  01 / Definition
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
                What is Agentic Commerce?
              </h2>
              <div className="space-y-6 text-lg text-black/70 leading-relaxed">
                <p>
                  Agentic commerce represents the evolution beyond traditional e-commerce
                  platforms. It&apos;s the integration of AI-driven automation, intelligent
                  decision-making, and autonomous system management into your Shopify
                  infrastructure.
                </p>
                <p>
                  While standard storefronts require constant manual intervention—monitoring
                  inventory, adjusting pricing, managing campaigns, tracking attribution—agentic
                  systems handle these operations independently, learning and optimizing as they
                  go.
                </p>
                <p className="font-semibold text-black/90">
                  This is not just automation. This is intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Breakdown */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  02 / The Mechanics
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
                How We Build Agentic Commerce Systems
              </h2>
              <p className="text-lg text-black/60 leading-relaxed">
                Our approach combines advanced tracking infrastructure, intelligent automation
                layers, and custom container deployments to create truly autonomous shopping
                experiences.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {[
              {
                num: "01",
                title: "Automated Revenue Attribution",
                desc: "Multi-touch attribution models that track every customer interaction across channels. Know exactly which touchpoints drive conversions, with real-time revenue mapping and predictive analytics.",
              },
              {
                num: "02",
                title: "Advanced Tracking Pixel Integration",
                desc: "Server-side tracking infrastructure that captures complete customer journeys. No data loss from ad blockers. Full visibility into pre-purchase behavior and post-purchase patterns.",
              },
              {
                num: "03",
                title: "Intelligent Platform Management",
                desc: "Autonomous inventory optimization, dynamic pricing algorithms, automated campaign management, and predictive restock systems. The platform manages itself based on performance data.",
              },
              {
                num: "04",
                title: "Custom API Orchestration",
                desc: "Purpose-built middleware connecting Shopify with fulfillment, CRM, marketing automation, and analytics platforms. One unified system, zero manual data entry.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="p-8 bg-white rounded-2xl border border-black/8 hover:border-black/20 transition-all"
              >
                <span className="inline-block px-3 py-1 bg-black/5 text-xs font-mono font-bold rounded-full mb-4">
                  {item.num}
                </span>
                <h3 className="text-2xl font-bold text-[#0f0f0f] mb-3">{item.title}</h3>
                <p className="text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure & Deployment */}
      <section className="bg-[#0f0f0f] text-white py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                  03 / Infrastructure
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                The Backend That Powers It
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Advanced architectural setups demand infrastructure that can handle heavy, automated
                workloads without breaking.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">Custom Container Deployments</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Dockerized microservices for queue processing, webhook handling, and
                background job execution. Scales horizontally based on traffic.
              </p>
            </div>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">Cloud Infrastructure</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Managed Kubernetes clusters, Redis caching layers, PostgreSQL for analytics,
                S3 for asset storage. Enterprise-grade reliability.
              </p>
            </div>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">Real-Time Event Processing</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Event-driven architecture handling thousands of webhooks per minute.
                Immediate response to inventory changes, order updates, and customer actions.
              </p>
            </div>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">Monitoring & Observability</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Full-stack monitoring with custom dashboards. Track system health,
                revenue metrics, and automation performance in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  04 / Investment
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
                Transparent Pricing & Management
              </h2>
              <p className="text-lg text-black/60 leading-relaxed">
                High-intent searchers want clarity. Here&apos;s what it costs to maintain an
                advanced agentic commerce setup.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-2xl border border-black/8">
              <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
                Setup & Architecture
              </p>
              <p className="text-4xl font-bold text-[#0f0f0f] mb-3">From $12k</p>
              <p className="text-sm text-black/50 leading-relaxed">
                Initial build: infrastructure setup, integration, tracking implementation,
                automation workflows.
              </p>
              <p className="text-xs text-black/30 mt-4">One-time · 6-8 weeks</p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-black/8">
              <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
                Platform Management
              </p>
              <p className="text-4xl font-bold text-[#0f0f0f] mb-3">$2k–5k/mo</p>
              <p className="text-sm text-black/50 leading-relaxed">
                Ongoing system monitoring, optimization, maintenance, feature additions,
                and support.
              </p>
              <p className="text-xs text-black/30 mt-4">Monthly retainer</p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-black/8">
              <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
                Infrastructure Costs
              </p>
              <p className="text-4xl font-bold text-[#0f0f0f] mb-3">$500–2k/mo</p>
              <p className="text-sm text-black/50 leading-relaxed">
                Cloud hosting, container orchestration, database, caching, monitoring
                tools (billed separately).
              </p>
              <p className="text-xs text-black/30 mt-4">Pass-through costs</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#f04b25]/5 rounded-2xl border border-[#f04b25]/20">
            <p className="text-sm text-black/70">
              <strong>Note:</strong> Pricing scales with store complexity, order volume, and
              integration requirements. Enterprise setups with custom fulfillment or international
              operations may require additional architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="bg-white py-24 md:py-32 border-y border-black/6">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-12">
            Who Needs Agentic Commerce?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                High-volume D2C brands
              </h3>
              <p className="text-black/60">
                Processing 1,000+ orders per month and struggling with manual inventory,
                attribution, or campaign management.
              </p>
            </div>
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Multi-channel operations
              </h3>
              <p className="text-black/60">
                Selling across Shopify, Amazon, retail, and needing unified inventory and
                revenue tracking.
              </p>
            </div>
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Subscription businesses
              </h3>
              <p className="text-black/60">
                Managing recurring revenue models with complex churn prediction and retention
                automation needs.
              </p>
            </div>
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Brands scaling internationally
              </h3>
              <p className="text-black/60">
                Expanding to new markets and requiring automated currency handling, regional
                inventory, and compliance.
              </p>
            </div>
          </div>

          <p className="mt-8 text-black/60 leading-relaxed">
            Not there yet? If you're still building your storefront, start with{" "}
            <a href="/shopify-development-sri-lanka" className="text-[#f04b25] font-medium hover:underline">
              our Shopify development services in Sri Lanka
            </a>{" "}
            — agentic commerce is the layer you add once you're live and scaling.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 md:py-32 border-y border-black/6">
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
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-display uppercase leading-tight text-[#0f0f0f] mb-6">
            Ready to automate
            <br />
            your Shopify growth?
          </h2>
          <p className="text-lg text-black/60 mb-10 max-w-xl mx-auto">
            Let&apos;s discuss your e-commerce architecture. We&apos;ll audit your current
            setup and map out an agentic commerce roadmap.
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 bg-[#f04b25] text-white font-bold rounded-full hover:bg-[#d63f1e] transition-colors text-lg"
          >
            Start the conversation →
          </a>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
