import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import FAQBlock from "@/components/FAQBlock";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";
import { ServiceSchema, BreadcrumbSchema } from "@/components/schema";

const PAGE_URL = `${SITE_URL}/services/web-development-colombo`;

export const metadata: Metadata = {
  title: "Web Development Company in Colombo, Sri Lanka",
  description:
    "A Colombo web development company that ships custom web apps, dashboards, and product builds in fixed 8-week sprints. Real client work, no handoffs, code you own.",
  openGraph: {
    ...OG_DEFAULTS,
    url: PAGE_URL,
    title: "Web Development Company in Colombo, Sri Lanka",
    description:
      "A Colombo web development company that ships custom web apps, dashboards, and product builds in fixed 8-week sprints. Real client work, no handoffs, code you own.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "theBOAT Web Development Colombo" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "Web Development Company in Colombo, Sri Lanka",
    description:
      "A Colombo web development company that ships custom web apps, dashboards, and product builds in fixed 8-week sprints. Real client work, no handoffs, code you own.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    q: "What kind of web development do you actually do?",
    a: "Custom web apps and dashboards, marketing and product sites, and the backend systems behind them. Not templated brochure sites, not WordPress builds: React and Next.js products built for a specific business problem, like a booking platform or an analytics dashboard.",
  },
  {
    q: "How long does a project take?",
    a: "Most builds run in 8-week sprints from first wireframe to shipped product. Twelve focused discovery questions up front, a clickable prototype inside 48 hours, then we build against a fixed scope, not an open-ended hourly clock.",
  },
  {
    q: "How is pricing structured?",
    a: "Fixed-scope, quoted after a discovery call, not billed hourly. The scope is set before we start so you know the number before any work begins, the same way we publish fixed pricing for our Shopify and automation work.",
  },
  {
    q: "What's the tech stack?",
    a: "Next.js and React on the frontend, Node/TypeScript on the backend, Supabase or Postgres for data, and Sanity when a client needs to manage their own content. We pick the stack for the problem, not the other way around.",
  },
  {
    q: "Do we own the code afterward?",
    a: "Yes. Source code, infrastructure access, and documentation are handed over at the end of every engagement. No vendor lock-in, no dependency on us staying involved unless you want an ongoing retainer.",
  },
];

export default function WebDevelopmentColomboPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <ServiceSchema
        name="Web Development Company in Colombo, Sri Lanka"
        description="Custom web app, dashboard, and product development for founders and operators, built in fixed 8-week sprints from a Colombo-based studio."
        url={PAGE_URL}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
          { name: "Web Development Colombo", url: PAGE_URL },
        ]}
      />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <div className="mb-8">
          <span className="inline-block px-3.5 py-1.5 bg-[#f04b25]/8 text-[#f04b25] text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
            Product &amp; Automation Studio
          </span>
          <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-8">
            Web Development
            <br />
            <span className="text-[#f04b25]">Company</span>
            <br />
            in Colombo, Sri Lanka
          </h1>
          <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-3xl">
            Custom web apps, dashboards, and product builds for founders and operators who
            need something specific shipped, not a template with their logo on it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 border-t border-black/10 pt-12">
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
              Delivery
            </p>
            <p className="text-3xl font-bold text-[#0f0f0f]">8 wks</p>
            <p className="text-xs text-black/40 mt-1">First wireframe to shipped product</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
              Prototype
            </p>
            <p className="text-3xl font-bold text-[#0f0f0f]">48 hrs</p>
            <p className="text-xs text-black/40 mt-1">Clickable prototype before we build</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
              Handoffs
            </p>
            <p className="text-3xl font-bold text-[#0f0f0f]">0</p>
            <p className="text-xs text-black/40 mt-1">One embedded team, daily contact</p>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="bg-white py-24 md:py-32 border-y border-black/6">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  01 / What we build
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
                Products, Not Pages
              </h2>
              <p className="text-lg text-black/60 leading-relaxed">
                We co-build the product when what to build is still unclear, working from a
                system map before a single line of code, not a design file handed over blind.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {[
              {
                num: "01",
                title: "Custom web apps",
                desc: "Booking systems, admin dashboards, internal tools: built around a real workflow, not a page template.",
              },
              {
                num: "02",
                title: "SaaS dashboards",
                desc: "Real-time data views, reporting layers, and customer-facing analytics wired to your actual data sources.",
              },
              {
                num: "03",
                title: "Marketing & product sites",
                desc: "Fast, structured sites built to convert and to rank, with the technical SEO foundation in place from day one.",
              },
              {
                num: "04",
                title: "Backend & integrations",
                desc: "APIs, third-party integrations, and the data layer underneath, so the frontend isn't held together with duct tape.",
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

      {/* Proof */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  02 / Recent work
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
                Shipped, Not Slides
              </h2>
              <p className="text-lg text-black/60 leading-relaxed">
                Three custom builds, three different problems: a two-surface booking system, an
                editorial travel platform, and a real-time attribution dashboard.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/work/bounce"
              className="group p-7 bg-white rounded-2xl border border-black/8 hover:border-black/20 transition-all"
            >
              <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-3">
                Bounce
              </p>
              <h3 className="text-lg font-bold text-[#0f0f0f] mb-2 group-hover:text-[#f04b25] transition-colors">
                Court booking, two surfaces
              </h3>
              <p className="text-sm text-black/50 leading-relaxed">
                A mobile app for players and an admin dashboard for operators, sharing one
                real-time API with zero double-bookings.
              </p>
            </a>
            <a
              href="/work/olyce"
              className="group p-7 bg-white rounded-2xl border border-black/8 hover:border-black/20 transition-all"
            >
              <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-3">
                OLYCE
              </p>
              <h3 className="text-lg font-bold text-[#0f0f0f] mb-2 group-hover:text-[#f04b25] transition-colors">
                Luxury travel, built editorial-first
              </h3>
              <p className="text-sm text-black/50 leading-relaxed">
                Full itineraries, pricing, and booking on one page, no calls needed to
                understand what you&apos;re buying.
              </p>
            </a>
            <a
              href="/work/troi"
              className="group p-7 bg-white rounded-2xl border border-black/8 hover:border-black/20 transition-all"
            >
              <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-3">
                Troi
              </p>
              <h3 className="text-lg font-bold text-[#0f0f0f] mb-2 group-hover:text-[#f04b25] transition-colors">
                Real-time attribution dashboard
              </h3>
              <p className="text-sm text-black/50 leading-relaxed">
                Four-plus ad channels reconciled against real Shopify and WooCommerce orders,
                updated continuously.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing philosophy */}
      <section className="bg-[#0f0f0f] text-white py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                  03 / Pricing
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Fixed Scope, Not an Hourly Clock
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-6">
                Twelve focused questions and a system map come first, so scope is fixed before
                any work begins. You get a number before you commit, the same way we publish
                fixed pricing on our Shopify and agentic commerce builds.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                No hourly billing, no scope creep, no surprise invoice at the end of the sprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-12">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Founders with an idea, not a spec
              </h3>
              <p className="text-black/60">
                You know the problem but not the exact build. We co-build the product with you,
                starting from a system map instead of a finished design file.
              </p>
            </div>
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Operators who&apos;ve outgrown spreadsheets
              </h3>
              <p className="text-black/60">
                Internal tools and dashboards held together with Google Sheets and manual
                updates: we replace them with something that scales.
              </p>
            </div>
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Teams that also want automation
              </h3>
              <p className="text-black/60">
                Already planning to wire the product to{" "}
                <a href="/services/ai-automation" className="text-[#f04b25] hover:underline">
                  AI workflow automation
                </a>{" "}
                once it ships, or building alongside a{" "}
                <a href="/shopify-development-sri-lanka" className="text-[#f04b25] hover:underline">
                  Shopify storefront
                </a>
                .
              </p>
            </div>
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Businesses that want to own their code
              </h3>
              <p className="text-black/60">
                No-code tools got you to launch. Now you need something that scales and doesn&apos;t
                lock you into a platform&apos;s pricing tiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 md:py-32 border-y border-black/6">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                04 / Common questions
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
            Have a product
            <br />
            to build?
          </h2>
          <p className="text-lg text-black/60 mb-10 max-w-xl mx-auto">
            Book a free scoping call. We&apos;ll map the system before we talk about a build, and
            you&apos;ll know the fixed price before you commit.
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
