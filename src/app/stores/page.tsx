"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const SHOPIFY_GREEN = "#95BF47";

const stores = [
  {
    num: "01",
    url: "Opotique",
    name: "Opotique",
    sub: "Fashion boutique · Colombo",
    tags: "ECOMMERCE · FASHION · SRI LANKA",
    chips: ["Ecommerce build", "Product catalogue", "Mobile-first"],
    desc: "A full ecommerce build for one of Sri Lanka's leading fashion boutiques. We built the storefront and product catalogue end-to-end — scoped for mobile-first browsing and wired to their inventory.",
    stage: "fashion",
    wide: true,
  },
  {
    num: "02",
    url: "ceyflora.ae",
    name: "Ceyflora.ae",
    sub: "Florals & gifting · UAE",
    tags: "ECOMMERCE · FLORALS · UAE",
    chips: ["Ecommerce build", "Gifting flows", "UAE market"],
    desc: "An ecommerce store for a floral and gifting brand operating in the UAE. Built for same-day gifting flows and a clean, browse-first experience.",
    stage: "floral",
    wide: false,
  },
  {
    num: "03",
    url: "tomproducts.lk",
    name: "Tom Products.lk",
    sub: "General ecommerce · Sri Lanka",
    tags: "ECOMMERCE · PRODUCTS · SRI LANKA",
    chips: ["Ecommerce build", "Product catalogue", "Local delivery"],
    desc: "An ecommerce store for Tom Products — a broad catalogue built for local delivery and straightforward product discovery.",
    stage: "products",
    wide: false,
  },
];

const stageStyles: Record<string, string> = {
  fashion: "linear-gradient(160deg, #2a1a0e 0%, #5c3a20 55%, #c4926a 100%)",
  floral:  "linear-gradient(160deg, #0d2115 0%, #1a4a2a 55%, #5a9e72 100%)",
  products: "linear-gradient(160deg, #0d1829 0%, #1b3a6b 55%, #4a7dc4 100%)",
};

const accentColors: Record<string, string> = {
  fashion:  "#c4926a",
  floral:   "#5a9e72",
  products: "#4a7dc4",
};

const filterPills = ["All stores", "Sri Lanka", "UAE", "Fashion", "Ecommerce"];

const stats = [
  { v: "3", u: "", k: "Ecommerce stores built" },
  { v: "2", u: "", k: "Markets · LK · AE" },
  { v: "3", u: "", k: "Live & trading" },
  { v: "1", u: "", k: "Platform · Shopify across all stores" },
];

const capabilities = [
  {
    n: "01",
    title: "Storefront build",
    body: "Custom themed storefronts built for conversion. PDP, collection, cart and checkout — all scoped to your catalogue before we start.",
  },
  {
    n: "02",
    title: "Product catalogue setup",
    body: "Structured product data, variant logic, and collection taxonomy — set up to scale without breaking when you add SKUs.",
  },
  {
    n: "03",
    title: "Automation spine",
    body: "Inventory alerts, order comms, fulfillment triggers. Named flows that run the ops so you don't have to.",
  },
  {
    n: "04",
    title: "Post-launch support",
    body: "30-day support window after every launch. Keys handed over day one — no retainer pushed.",
  },
];

function StageVisual({ stage }: { stage: string }) {
  if (stage === "fashion") {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] z-0 flex gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg"
            style={{
              width: 52,
              height: 88 + i * 10,
              background: `linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)`,
              border: "1px solid rgba(255,255,255,0.12)",
              transform: `rotate(${(i - 1) * 5}deg) translateY(${i === 1 ? -8 : 0}px)`,
            }}
          />
        ))}
      </div>
    );
  }
  if (stage === "floral") {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] z-0">
        <div
          className="rounded-full"
          style={{
            width: 110,
            height: 110,
            background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.18) 0%, rgba(90,158,114,0.3) 60%, transparent 100%)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    );
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] z-0 flex flex-col gap-2">
      {[80, 110, 90].map((w, i) => (
        <div
          key={i}
          className="rounded"
          style={{
            width: w,
            height: 22,
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        />
      ))}
    </div>
  );
}

function StoreCard({ s, featured }: { s: typeof stores[0]; featured?: boolean }) {
  const accent = accentColors[s.stage];
  return (
    <div
      className={`bg-white border border-black/[0.08] rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(14,14,12,0.10)] ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-black/[0.025] border-b border-black/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-black/[0.15]" />
          <div className="w-2.5 h-2.5 rounded-full bg-black/[0.15]" />
          <div className="w-2.5 h-2.5 rounded-full bg-black/[0.15]" />
        </div>
        <span className="ml-2.5 flex-1 font-mono text-[11px] text-black/35 truncate">
          {s.url}
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider shrink-0"
          style={{ background: `rgba(149,191,71,0.14)`, color: "#4a7a16" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5fa61d" }} />
          live
        </span>
      </div>

      {/* Stage */}
      <div
        className="relative overflow-hidden flex items-end justify-between p-6"
        style={{
          aspectRatio: featured ? "21/9" : "16/9",
          background: stageStyles[s.stage],
        }}
      >
        <StageVisual stage={s.stage} />

        {/* Store name overlay */}
        <div className="relative z-10 text-white">
          <p
            className="font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(22px,2.8vw,32px)" }}
          >
            {s.name}
          </p>
          <p className="text-[11px] font-mono uppercase tracking-wider mt-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
            {s.sub}
          </p>
        </div>

        {/* Chips overlay */}
        <div className="relative z-10 flex flex-wrap gap-1.5 justify-end max-w-[50%]">
          {s.chips.slice(0, 2).map((c) => (
            <span
              key={c}
              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(4px)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="font-bold text-[18px] tracking-tight text-black leading-tight">
              {s.name}
            </p>
            <p className="text-[11px] font-mono uppercase tracking-widest text-black/35 mt-1.5">
              {s.tags}
            </p>
          </div>
          <ArrowUpRight
            size={20}
            className="text-black/25 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-0.5"
          />
        </div>

        <p className="text-[14px] text-black/50 leading-relaxed">{s.desc}</p>

        <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-black/[0.06]">
          {s.chips.map((c) => (
            <span
              key={c}
              className="text-[11px] px-3 py-1.5 rounded-full border border-black/[0.10] text-black/45"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StoresPage() {
  return (
    <div className="bg-white" style={{ fontFamily: "var(--font-body)" }}>
      <style>{`
        @keyframes stores-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .stores-ticker { animation: stores-marquee 28s linear infinite; display: flex; width: max-content; }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-[220px] pb-10">
        <FadeIn>
          <div className="flex items-center gap-2 mb-8">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: SHOPIFY_GREEN, boxShadow: `0 0 0 4px rgba(149,191,71,0.18)` }}
            />
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">Stores</span>
            <span className="text-black/20 text-xs">/</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">Ecommerce · 3 live</span>
            <span className="text-black/20 text-xs">/</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">2024 – 2026</span>
          </div>
        </FadeIn>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
          className="text-[clamp(52px,9vw,120px)] font-black leading-[0.9] tracking-tight text-black"
        >
          Stores that
          <br />
          <em className="not-italic font-light italic">sell while</em>{" "}you sleep.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
          className="mt-8 grid md:grid-cols-[1fr_1fr] gap-8 md:gap-16 max-w-4xl"
        >
          <p className="text-base md:text-lg text-black/45 leading-relaxed">
            Three ecommerce stores live and trading across Sri Lanka and the UAE. Each
            one built end-to-end — storefront, catalogue, and the ops wiring behind it.
          </p>
          <div className="grid grid-cols-3 gap-px border border-black/[0.07] rounded-xl overflow-hidden">
            {[
              { v: "3", k: "Stores live" },
              { v: "2", k: "Markets" },
              { v: "100%", k: "Shopify" },
            ].map((s) => (
              <div key={s.k} className="bg-white px-4 py-5 flex flex-col gap-1">
                <p className="text-[28px] font-black tracking-tight leading-none text-black">{s.v}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-black/35">{s.k}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="mt-14 pt-6 border-t border-black/[0.07] flex flex-wrap items-center gap-2"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-black/30 mr-2">Filter ·</span>
          {filterPills.map((f, i) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full text-[13px] border transition-all duration-150 ${
                i === 0
                  ? "bg-black text-white border-black"
                  : "border-black/[0.12] text-black/45 hover:border-black/40 hover:text-black"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[12px] font-mono text-black/30 hidden md:block">
            3 stores · all live →
          </span>
        </motion.div>
      </section>

      {/* ── STORE GRID ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <FadeIn delay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stores.map((s) => (
              <StoreCard key={s.num} s={s} featured={s.wide} />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-5 my-6" style={{ background: SHOPIFY_GREEN }}>
        <div className="stores-ticker">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="inline-flex items-center gap-0">
              {["Stores that sell", "Built end-to-end", "Live in Sri Lanka", "Live in UAE", "Shopify native"].map((t) => (
                <span key={t} className="inline-flex items-center text-[#14140f] text-sm font-semibold uppercase tracking-widest px-6">
                  {t}
                  <span className="ml-6 opacity-30">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── CAPABILITIES ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <FadeIn>
          <div className="flex items-center gap-2 mb-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">What every store ships with</span>
            <span className="text-black/20 text-xs">/</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">by default</span>
          </div>
        </FadeIn>
        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/[0.07] border-y border-black/[0.07]">
          {capabilities.map((c) => (
            <StaggerItem key={c.title}>
              <div className="p-7 md:p-8">
                <p className="text-[11px] font-mono uppercase tracking-widest text-black/30 mb-3">{c.n}</p>
                <h3 className="text-[19px] font-semibold text-black tracking-tight mb-3 leading-tight">{c.title}</h3>
                <p className="text-[13px] text-black/40 leading-relaxed">{c.body}</p>
              </div>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 border-y border-black/[0.07]">
          {stats.map((s, i) => (
            <StaggerItem key={s.k}>
              <div className={`p-7 md:p-9 border-b md:border-b-0 md:border-r border-black/[0.07] ${i === stats.length - 1 ? "md:border-r-0" : ""}`}>
                <p className="text-[clamp(40px,5vw,68px)] font-black tracking-tight leading-none text-black">
                  {s.v}
                  {s.u && <span className="text-[0.3em] text-black/25 font-medium ml-1">{s.u}</span>}
                </p>
                <p className="text-[11px] font-mono uppercase tracking-widest text-black/30 mt-4">{s.k}</p>
              </div>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24">
        <FadeIn>
          <div className="bg-[#0f0f0f] rounded-3xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: [
                  "radial-gradient(900px 500px at 92% 6%, rgba(149,191,71,0.14) 0%, transparent 60%)",
                  "radial-gradient(700px 600px at 0% 100%, rgba(240,75,37,0.10) 0%, transparent 55%)",
                ].join(", "),
              }}
            />
            <div className="relative">
              <p className="text-[11px] font-mono uppercase tracking-widest text-white/30 mb-7">
                Now building / ecommerce stores
              </p>
              <h2 className="text-[clamp(40px,6vw,96px)] font-black text-white leading-[0.92] tracking-tight">
                Your store,{" "}
                <em className="not-italic font-light italic">built</em>
                {" "}right.
              </h2>
              <div className="flex flex-wrap gap-3 mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-colors duration-150"
                  style={{ background: SHOPIFY_GREEN, color: "#14140f" }}
                >
                  Audit my store <ArrowUpRight size={14} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-full text-sm hover:border-white/40 transition-colors duration-150"
                >
                  Send your URL
                </a>
              </div>
            </div>
            <div className="relative">
              <span className="block text-[11px] font-mono uppercase tracking-widest text-white/30 mb-3">
                60-minute store audit · loom recorded
              </span>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                Send us your URL. We&apos;ll walk through your storefront, point to the
                three biggest leaks, and tell you what we&apos;d fix first — whether or not
                you hire us.
              </p>
              <p className="text-[11px] text-white/25">
                Shopify native · built in Colombo · serving founders in LK, AE & beyond
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
