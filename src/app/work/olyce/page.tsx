"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ACCENT = "#1a1a1a";

const meta = [
  { k: "Client", v: "OLYCE · Colombo" },
  { k: "Engagement", v: "Luxury tour booking website" },
  { k: "Timeline", v: "10 weeks · Q2–Q3 2025" },
  { k: "Status", v: "Live", live: true },
];

const before = [
  "Premium tours with no premium presence, travelers discovered Olyce by word of mouth and requested details by email, often waiting days for a response.",
  "Four distinct packages with Standard and Premium tiers couldn't be communicated without a call or a PDF deck sent manually.",
  "Olyce had invested in exceptional photography. It was sitting in a Google Drive folder.",
];

const principles = [
  {
    n: "01",
    title: "Feel like the destination.",
    body: "The site opens with full-bleed editorial photography and almost no UI chrome. The first impression is Sri Lanka, not a booking form.",
  },
  {
    n: "02",
    title: "Itinerary-first transparency.",
    body: "Travelers see Day 1 through Day 7 before they ever hit Inquire. Hotels, inclusions, and the map all live on the same page, no calls needed to know what they're buying.",
  },
  {
    n: "03",
    title: "Two tiers, zero confusion.",
    body: "Standard and Premium are side-by-side on every package page. The difference is clear. The booking panel surfaces pricing, inclusions, and a single CTA.",
  },
];

const archSurfaces = [
  { lbl: "Surface 01 · Discovery", title: "Destinations + Journeys" },
  { lbl: "Surface 02 · Package", title: "Itinerary, Inclusions, Hotels, Map" },
  { lbl: "Surface 03 · Booking", title: "Standard vs Premium + inquiry" },
  { lbl: "Surface 04 · Editorial", title: "The Edit · curated travel stories" },
];

const archCore = [
  { lbl: "Frontend", title: "Next.js · App Router" },
  { lbl: "Styling", title: "Tailwind CSS" },
  { lbl: "Content", title: "Headless CMS" },
  { lbl: "Deploy", title: "Netlify" },
];

const outcomes = [
  { num: "4", unit: "packages", label: "Cultural Heritage, Hill Country, South Coast Beaches, and Wildlife & Safari, all live with full itineraries." },
  { num: "2", unit: "tiers", label: "Standard and Premium pricing surfaced clearly on every package page, no call needed to understand the difference." },
  { num: "1", unit: "inquiry CTA", label: "All routes (browsing, reading, exploring) converge on a single clean Inquire action." },
];

const timeline = [
  {
    d: "Wk 1–2 · Discovery",
    t: "Mapped four packages, two tiers.",
    p: "Audited all tour content, photography assets, and the existing inquiry flow. Defined the information architecture for Destinations, Journeys, The Edit, and Our Story.",
  },
  {
    d: "Wk 3–4 · Design",
    t: "Editorial-first, UI second.",
    p: "Full-bleed photography layout locked in round one. Package detail page (itinerary tabs, inclusions, booking panel) approved without revisions.",
  },
  {
    d: "Wk 5–9 · Build",
    t: "Every page photo-led.",
    p: "Next.js site with headless CMS for tour packages. Itinerary, inclusions, hotel listings, and map tab all driven from structured content.",
  },
  {
    d: "Wk 10 · Launch",
    t: "Content migrated. Site live.",
    p: "All four tour packages, photography, and editorial content migrated. Olyce team trained to manage packages independently.",
    now: true,
  },
];

const stack = [
  { k: "Frontend", v: "Next.js, Tailwind" },
  { k: "Content", v: "Headless CMS" },
  { k: "Deploy", v: "Netlify" },
  { k: "Photography", v: "Editorial-led" },
  { k: "Booking", v: "Inquiry flow" },
  { k: "Tiers", v: "Standard · Premium" },
];

const stackTags = ["Luxury travel", "Editorial design", "Tour catalog", "Owned by client"];

const marqueeItems = [
  "Premium Sri Lanka tours",
  "Cultural Heritage",
  "Curated journeys",
  "From $480 / person",
  "Built in Colombo",
];

const packages = [
  { name: "Cultural Triangle & Heritage", days: "6 days", from: "$480", tag: "Cultural" },
  { name: "Hill Country & Tea Trails", days: "7 days", from: "$499", tag: "Nature" },
  { name: "South Coast Beaches", days: "7 days", from: "$499", tag: "Beaches" },
  { name: "Wildlife & Safari", days: "7 days", from: "$499", tag: "Wildlife" },
];

export default function OlyceCase() {
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
            Case 05 / Selected work / 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-[clamp(40px,6vw,80px)] font-black text-black leading-[1] tracking-tight"
        >
          OLYCE<br />
          <span className="italic font-light">Sri Lanka,<br />without compromise.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-8 text-[17px] text-black/50 leading-relaxed max-w-2xl"
        >
          A luxury tour booking website for a premium Sri Lanka travel brand: editorial photography
          up front, full itineraries before the inquiry, Standard and Premium pricing in one view.
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

        {/* Hero screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="mt-14"
        >
          <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm">
            <Image
              src="/olyce/Screenshot 2026-06-06 at 14.12.21.png"
              alt="OLYCE homepage showing South Coast Beaches tour"
              width={1920}
              height={960}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Float stats */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[
              { k: "Tour packages", v: "4", unit: "live" },
              { k: "Pricing tiers", v: "2", unit: "Standard · Premium" },
              { k: "Starting from", v: "$480", unit: "/ person" },
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
          </div>
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
                Premium tours.
                <br />
                <span className="italic font-light">A PDF in someone&apos;s inbox</span> selling them.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                OLYCE had built a genuinely premium Sri Lanka travel product: curated itineraries,
                handpicked hotels, Standard and Premium tiers, exceptional photography. But travelers
                found out about them by word of mouth, and the entire experience from discovery to
                booking happened over email. The digital presence didn&apos;t match the product.
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
                  Before · The gap
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
                The photography is the product. Lead with it.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                Luxury travel is sold by atmosphere before it&apos;s sold by features. The site
                opens in full-bleed dark editorial mode, no nav clutter, no hero text competing
                with the image. Only after the feeling is established does the information start.
                Itineraries, hotels, inclusions, and pricing are all on one page. The traveler
                is informed by the time they hit Inquire.
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

      {/* ── SITE SCREENSHOTS ────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
            <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
              The site
            </span>
          </div>
        </FadeIn>
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              src: "/olyce/Screenshot 2026-06-06 at 14.12.34.png",
              label: "Package page · Cultural Triangle & Heritage",
            },
            {
              src: "/olyce/Screenshot 2026-06-06 at 14.12.49.png",
              label: "Itinerary view + Reserve Your Journey booking panel",
            },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="rounded-xl overflow-hidden border border-black/[0.08] shadow-sm">
                <Image
                  src={s.src}
                  alt={s.label}
                  width={1200}
                  height={750}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-2.5 text-[11px] font-mono text-black/35 uppercase tracking-widest">
                {s.label}
              </p>
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
                Four sections (Destinations, Journeys, The Edit, and Our Story) with
                per-package itinerary, inclusions, hotel, and map detail pages, all managed
                through a headless CMS.
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

            <div className="text-white rounded-xl p-4 text-center mb-4" style={{ background: ACCENT }}>
              <p className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                The spine · Next.js + Headless CMS
              </p>
              <p className="text-sm font-semibold">
                Tour packages, itineraries, inclusions, photography, pricing tiers, all content-managed
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
                { lbl: "Out · For the traveler", title: "Full itinerary before inquiry · Standard vs Premium side-by-side" },
                { lbl: "Out · For the team", title: "CMS-managed packages · No dev needed to update content" },
              ].map((n) => (
                <div key={n.lbl} className="text-white rounded-xl p-4" style={{ background: ACCENT }}>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                    {n.lbl}
                  </p>
                  <p className="text-[13px] font-semibold">{n.title}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── PACKAGES ────────────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
            <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
              Tour packages
            </span>
          </div>
        </FadeIn>
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {packages.map((p) => (
            <StaggerItem key={p.name}>
              <div className="border border-black/[0.08] rounded-xl p-6 bg-[#f8f6f2]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/30">
                    {p.tag}
                  </span>
                  <span className="text-[10px] font-mono text-black/25">{p.days}</span>
                </div>
                <h4 className="font-bold text-black text-[15px] mb-2">{p.name}</h4>
                <p className="text-xs text-black/40 font-mono">From {p.from} / person · Standard & Premium</p>
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
                From launch · Q3 2025. Baseline: email-only inquiry flow with no digital catalog.
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
                10 weeks. Editorial-first. Handed over.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                Design came before development, and photography came before design. We didn&apos;t
                wire a single component until the visual language was locked.
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

      {/* ── TESTIMONIAL ─────────────────────────── */}
      {/* <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="border-t border-b border-black/[0.1] py-16 grid md:grid-cols-[1fr_1.6fr] gap-12 items-start">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-black/30 mb-5">
                Said by the traveler
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full shrink-0"
                  style={{ background: "linear-gradient(135deg, #1a1a1a, #3a3a3a)" }}
                />
                <div>
                  <p className="font-semibold text-black text-sm">Eleanor Vance</p>
                  <p className="text-xs text-black/40 mt-0.5">London, UK</p>
                </div>
              </div>
              <p className="text-xs font-mono text-black/25 mt-6">★★★★★ · verified Q3 2025</p>
            </div>
            <blockquote className="italic font-light text-[clamp(20px,2.8vw,36px)] text-black leading-[1.2] tracking-tight m-0">
              &ldquo;A truly transformative experience. Every detail was curated, we could see
              exactly what we were booking before we ever sent an inquiry. The site gave us
              confidence before we even spoke to anyone.&rdquo;
            </blockquote>
          </div>
        </FadeIn>
      </section> */}

      <Footer />
    </div>
  );
}
