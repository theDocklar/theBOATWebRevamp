"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ACCENT = "#4a7c59";

const meta = [
  { k: "Client", v: "Hima Products · Sri Lanka" },
  { k: "Engagement", v: "Product website + online store" },
  { k: "Timeline", v: "8 weeks · Q1 2025" },
  { k: "Status", v: "Live", live: true },
];

const before = [
  "30+ feeder products with no online catalog — dealers and pet owners placed orders by phone or WhatsApp with no way to compare specs or features.",
  "Product images and specifications scattered across WhatsApp chats and printed brochures — no consistent way to communicate value to end customers.",
  "Every sale ran through a dealer middleman. Customers finding Hima on Instagram had nowhere to go — no direct purchase path, no product detail, no conversion.",
];

const principles = [
  {
    n: "01",
    title: "Specs sell feeders.",
    body: "Automated feeders live or die on spec clarity — portion sizes, meal schedules, power options, tank capacity. Every product page leads with what buyers actually compare before purchasing.",
  },
  {
    n: "02",
    title: "Cut the middleman where it matters.",
    body: "The old model required a dealer for every sale. The new site lets pet owners and farm operators buy direct — with full product detail, confidence, and no friction.",
  },
  {
    n: "03",
    title: "Mobile converts, or nothing does.",
    body: "Most customers discovered Hima through Instagram. The site had to load fast, display products clearly, and complete a purchase on a phone before anything else mattered.",
  },
];

const archSurfaces = [
  { lbl: "Surface 01 · Store", title: "Product catalog" },
  { lbl: "Surface 02 · Detail", title: "Spec-first product pages" },
  { lbl: "Surface 03 · Network", title: "Dealer locator" },
  { lbl: "Surface 04 · Admin", title: "CMS + order management" },
];

const archCore = [
  { lbl: "Frontend", title: "Next.js · App Router" },
  { lbl: "Store", title: "Shopify" },
  { lbl: "Images", title: "Cloudinary CDN" },
  { lbl: "Deploy", title: "Vercel" },
];

const outcomes = [
  { num: "30+", unit: "products", label: "Full catalog live — pet feeders, livestock feeders, and accessories, all browsable and filterable." },
  { num: "3", unit: "categories", label: "Pet feeders, farm & livestock feeders, and accessories — each with dedicated landing pages." },
  { num: "1", unit: "channel", label: "Direct-to-customer orders enabled for the first time — no dealer required." },
];

const timeline = [
  {
    d: "Wk 1–2 · Discovery",
    t: "Mapped 30+ products & dealer network.",
    p: "Audited existing product range, photographed assets, and mapped how dealers and direct customers actually find and order Hima products. Fixed-scope SOW signed.",
  },
  {
    d: "Wk 3–4 · Design + Schema",
    t: "Catalog architecture first, UI second.",
    p: "Structured the product taxonomy — categories, specs, variants — before any UI was built. Animal feeders have distinct spec sets; getting schema right prevented rework.",
  },
  {
    d: "Wk 5–7 · Build",
    t: "Catalog, product pages, dealer map.",
    p: "Product catalog with filtering, spec-forward product detail pages, dealer locator, and direct checkout. All mobile-first.",
  },
  {
    d: "Wk 8 · Launch",
    t: "Products live. Team trained.",
    p: "All 30+ products published with photography and specs. Hima team trained to add and update products independently. Deployed and indexed.",
    now: true,
  },
];

const stack = [
  { k: "Frontend", v: "Next.js, Tailwind" },
  { k: "Store", v: "Shopify" },
  { k: "Images", v: "Cloudinary" },
  { k: "Deploy", v: "Vercel" },
  { k: "Catalog", v: "Custom CMS" },
  { k: "Mobile", v: "Responsive-first" },
];

const stackTags = ["Product catalog", "Direct-to-customer", "Shopify", "Mobile-first", "Owned by client"];

const marqueeItems = ["Animal feeders", "Pet feeders", "Sri Lanka", "30+ products", "Direct to customer"];

const featuredProducts = [
  { name: "Automatic Pet Feeder Pro", category: "Pet Feeders", spec: "6-meal timer · 4L tank · programmable", tag: "Bestseller" },
  { name: "Livestock Water Trough Feeder", category: "Farm & Livestock", spec: "50L capacity · float valve · galvanised steel", tag: "Farm grade" },
  { name: "Bird Feeder Station", category: "Pet Feeders", spec: "Multi-compartment · weather-resistant · wall mount", tag: "Outdoor" },
  { name: "Aquarium Auto Feeder", category: "Accessories", spec: "Precision portion control · 2× AA · adjustable drum", tag: "Compact" },
];

export default function HimaCase() {
  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "var(--font-body)" }}>
      <Navbar />

      {/* ── HERO ────────────────────────────────── */}
      <section className="pt-32 pb-0 px-5 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
          <span className="text-xs text-black/40 font-mono uppercase tracking-widest">
            Case / Selected work / 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-[clamp(40px,6vw,80px)] font-black text-black leading-[1] tracking-tight"
        >
          Hima Products<br />
          <span className="italic font-light">30 feeders,<br />one store.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-8 text-[17px] text-black/50 leading-relaxed max-w-2xl"
        >
          A product website and online store for a Sri Lankan animal feeder company —
          replacing phone orders and WhatsApp chats with a searchable catalog, spec-forward
          product pages, and a direct-to-customer purchase path.
        </motion.p>

        {/* Meta grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-black/[0.08] py-7"
        >
          {meta.map((m) => (
            <div key={m.k} className="pr-6">
              <p className="text-[10px] font-mono uppercase tracking-widest text-black/30 mb-1.5">
                {m.k}
              </p>
              {m.live ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-black">{m.v}</span>
                </div>
              ) : (
                <p className="text-sm font-medium text-black">{m.v}</p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Float stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="mt-10 grid grid-cols-3 gap-3"
        >
          {[
            { k: "Products in catalog", v: "30+", unit: "live" },
            { k: "Product categories", v: "3", unit: "types" },
            { k: "Purchase path", v: "Direct", unit: "to customer" },
          ].map((f) => (
            <div key={f.k} className="border border-black/[0.08] rounded-xl p-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-black/40 mb-1.5">
                {f.k}
              </p>
              <p className="text-2xl font-semibold tracking-tight text-black">
                {f.v}
                <span className="text-xs text-black/30 ml-1 font-normal">{f.unit}</span>
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── MARQUEE ─────────────────────────────── */}
      <div className="border-t border-b border-black/[0.06] mt-20 overflow-hidden py-4 bg-white">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 22s linear infinite", width: "max-content" }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-sm font-medium text-black/30 uppercase tracking-widest">
              {item}
              <span className="ml-12 text-[#f04b25]">·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>

      {/* ── THE BRIEF ───────────────────────────── */}
      <section className="py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-end mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  01 / The brief
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(28px,4vw,52px)] font-black text-black leading-[1.05] tracking-tight">
                Great products.
                <br />
                <span className="italic font-light">No store</span> to sell them.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                Hima Products had built a solid range of animal feeders — automated pet feeders,
                livestock troughs, bird stations, aquarium dispensers — and a loyal dealer network
                across Sri Lanka. But every sale still ran through a phone call or WhatsApp message.
                Customers finding them on Instagram had nowhere to land. Specs lived in brochures.
                There was no way to browse, compare, or buy without calling someone first.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border-t border-black/[0.08] grid grid-cols-1 md:grid-cols-3">
            {before.map((item, i) => (
              <div
                key={i}
                className={`p-7 border-b border-black/[0.08] ${i < before.length - 1 ? "md:border-r" : ""} bg-black/[0.025]`}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-black/30 mb-3">
                  Before · The mess
                </p>
                <p className="text-[16px] text-black/80 leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── APPROACH ────────────────────────────── */}
      <section className="py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-end mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  02 / Our take
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(28px,4vw,52px)] font-black text-black leading-[1.05] tracking-tight">
                Spec-first. Mobile-first. Client owns it.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                Animal feeders are a considered purchase — buyers compare meal counts, tank sizes,
                power sources, and build materials before deciding. The site had to surface those
                specs immediately. And because most discovery happened on Instagram, it had to work
                perfectly on a phone before anything else. The Hima team manages their own catalog
                from day one — no developer required to add a product.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p) => (
            <StaggerItem key={p.n}>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#f04b25] mb-3">
                Principle {p.n}
              </p>
              <h3 className="text-lg font-bold text-black mb-3">{p.title}</h3>
              <p className="text-sm text-black/50 leading-relaxed">{p.body}</p>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* ── ARCHITECTURE ────────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-end mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  03 / The system
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(28px,4vw,52px)] font-black text-black leading-[1.05] tracking-tight">
                What we actually shipped.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                Four surfaces — product catalog, spec-first product pages, dealer locator, and
                admin CMS — all connected through Shopify and deployed on Vercel.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border border-black/[0.1] rounded-2xl p-6 md:p-9 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {archSurfaces.map((n) => (
                <div key={n.lbl} className="border border-black/[0.1] rounded-xl p-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-black/30 mb-1">
                    {n.lbl}
                  </p>
                  <p className="text-[13px] font-semibold text-black">{n.title}</p>
                </div>
              ))}
            </div>

            <div className="text-center text-black/20 font-mono text-sm py-3">↓ ↓ ↓ ↓</div>

            <div
              className="text-white rounded-xl p-4 text-center mb-4"
              style={{ background: ACCENT }}
            >
              <p className="text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                The spine · Shopify + Next.js
              </p>
              <p className="text-sm font-semibold">
                Products, variants, inventory, orders — all managed without code
              </p>
            </div>

            <div className="text-center text-black/20 font-mono text-sm py-3">↓</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {archCore.map((n) => (
                <div key={n.lbl} className="bg-[#0f0f0f] text-white rounded-xl p-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                    {n.lbl}
                  </p>
                  <p className="text-[13px] font-semibold">{n.title}</p>
                </div>
              ))}
            </div>

            <div className="text-center text-black/20 font-mono text-sm py-3">↓</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { lbl: "Out · For pet owners", title: "Browse by pet type · specs upfront · direct checkout" },
                { lbl: "Out · For farm operators", title: "Livestock & farm feeders · bulk options · dealer locator" },
              ].map((n) => (
                <div key={n.lbl} className="text-white rounded-xl p-4" style={{ background: ACCENT }}>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                    {n.lbl}
                  </p>
                  <p className="text-[13px] font-semibold">{n.title}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── PRODUCT SHOWCASE ────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-end mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  Products on site
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(24px,3.5vw,44px)] font-black text-black leading-[1.05] tracking-tight">
                30+ feeders. Every spec. Now findable.
              </h2>
            </div>
          </div>
        </FadeIn>
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {featuredProducts.map((p) => (
            <StaggerItem key={p.name}>
              <div className="border border-black/[0.08] rounded-xl p-6 bg-[#f8f6f2]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/30">
                    {p.category}
                  </span>
                  <span className="text-[10px] font-mono text-black/25 border border-black/[0.1] rounded-full px-2 py-0.5">
                    {p.tag}
                  </span>
                </div>
                <h4 className="font-bold text-black text-[15px] mb-2">{p.name}</h4>
                <p className="text-xs text-black/40 font-mono">{p.spec}</p>
              </div>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* ── OUTCOMES ────────────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="bg-[#0f0f0f] text-white rounded-2xl p-8 md:p-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                  <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                    04 / The outcomes
                  </span>
                </div>
                <h2 className="text-[clamp(28px,4vw,52px)] font-black text-white leading-[1.05] tracking-tight">
                  What it replaced.
                </h2>
              </div>
              <p className="text-xs font-mono text-white/30 max-w-xs">
                From launch · Q1 2025. Baseline: pre-website phone + WhatsApp ordering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/[0.12]">
              {outcomes.map((r, i) => (
                <div key={i} className="py-9 pr-6 border-r border-white/[0.12] last:border-r-0">
                  <p className="text-[clamp(32px,4vw,52px)] font-black text-white leading-none tracking-tight">
                    {r.num}
                    <span className="text-xl font-normal text-white/40 ml-1">{r.unit}</span>
                  </p>
                  <p className="mt-3 text-sm text-white/40 leading-relaxed">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── TIMELINE ────────────────────────────── */}
      <section className="py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-end mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  05 / How we shipped it
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(28px,4vw,52px)] font-black text-black leading-[1.05] tracking-tight">
                8 weeks. Catalog-first. Handed over.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                We structured the product taxonomy before any UI was designed. Getting the schema
                right for animal feeders — where specs vary significantly across categories —
                prevented rework and let the Hima team manage their catalog independently from day one.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-black/[0.08]">
          {timeline.map((t) => (
            <StaggerItem key={t.d}>
              <div className="relative py-7 pr-6 border-r border-black/[0.08] last:border-r-0">
                <div
                  className={`absolute -top-[7px] left-0 w-[13px] h-[13px] rounded-full ${
                    t.now ? "bg-[#f04b25]" : "bg-black"
                  }`}
                />
                <p className="text-[10px] font-mono uppercase tracking-wider text-black/30 mb-2">
                  {t.d}
                </p>
                <h4 className="font-bold text-black text-[15px] mb-2">{t.t}</h4>
                <p className="text-xs text-black/40 leading-relaxed">{t.p}</p>
              </div>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* ── STACK ───────────────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
            <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
              06 / The stack
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-6 border-t border-b border-black/[0.08]">
            {stack.map((s, i) => (
              <div key={s.k} className={`p-5 ${i < stack.length - 1 ? "border-r border-black/[0.08]" : ""}`}>
                <p className="text-[10px] font-mono uppercase tracking-widest text-black/25 mb-1.5">
                  {s.k}
                </p>
                <p className="text-sm font-medium text-black">{s.v}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-2 mt-5">
            {stackTags.map((tag) => (
              <span key={tag} className="text-xs border border-black/[0.1] rounded-full px-3.5 py-1.5 text-black/50">
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
