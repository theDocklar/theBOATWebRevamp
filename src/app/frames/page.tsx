"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function Slot({
  label,
  className,
  style,
}: {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-[#eeeae4] rounded-2xl flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={style}
    >
      {label && (
        <span className="text-[10px] font-mono uppercase tracking-widest text-black/20 text-center px-4 leading-relaxed">
          {label}
        </span>
      )}
    </div>
  );
}

const projects = [
  {
    num: "01",
    year: "2025",
    name: "Opotique.lk",
    sub: "content, captured.",
    tags: "CONTENT · FASHION · BOUTIQUE",
    chips: ["Content shoot", "Editorial", "Social-ready"],
    desc: "A content shoot for one of Sri Lanka's leading fashion boutiques. We built a library of editorial and product frames shot for use across their e-commerce, paid social, and in-store touchpoints — every frame mapped to a channel before we arrived on set.",
  },
  {
    num: "02",
    year: "2025",
    name: "Lacasa",
    sub: "spaces, shot.",
    tags: "CONTENT · SHOOT · INTERIOR",
    chips: ["On-location shoot", "Lifestyle", "Content library"],
    desc: "An on-location shoot for Lacasa. We framed the space to sell a feeling — wide anchors for the hero, detail shots for social, and lifestyle frames that put the brand in context.",
  },
  {
    num: "03",
    year: "2025",
    name: "Hoodie",
    sub: "e-commerce, designed.",
    tags: "UI DESIGN · E-COMMERCE · FASHION",
    chips: ["UI design", "E-commerce", "Figma delivery"],
    desc: "UI design for a fashion-forward hoodie brand — a clean e-commerce interface built around the product. Every screen designed for conversion, not decoration.",
  },
];

function ProjectHead({ p }: { p: typeof projects[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[60px_1.4fr_1.6fr] gap-6 md:gap-8 items-end mb-9">
      <p className="text-[12px] font-mono text-black/30">
        {p.num} / {p.year}
      </p>
      <div>
        <h2 className="text-[clamp(30px,4.4vw,58px)] font-black leading-[0.95] tracking-tight text-black">
          {p.name} <span className="font-light italic">—</span>
          <br />
          <span className="font-light italic">{p.sub.split(" ").slice(0, -1).join(" ")} </span>
          <strong>{p.sub.split(" ").pop()}</strong>
        </h2>
        <p className="text-[11px] font-mono uppercase tracking-widest text-black/30 mt-3">
          {p.tags}
        </p>
      </div>
      <div>
        <p className="text-[15px] text-black/45 leading-relaxed mb-4">{p.desc}</p>
        <div className="flex flex-wrap gap-2">
          {p.chips.map((c) => (
            <span
              key={c}
              className="text-[11px] px-3 py-1.5 rounded-full border border-black/[0.12] text-black/45"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    n: "01 · Capture",
    title: "Product photography",
    body: "Hero stills, packshots, packaging detail, and lifestyle. Shot for PDP, paid social, and wholesale buyer decks — usage-mapped before the camera comes out.",
  },
  {
    n: "02 · Capture",
    title: "Lookbooks & editorial",
    body: "Seasonal lookbooks, campaign features, founder portraits. We crew up locally — stylist, MUA, location — and ship a buyer-ready PDF inside two weeks.",
  },
  {
    n: "03 · Build",
    title: "Brand identity systems",
    body: "Naming, wordmark, palette, type, voice. Delivered as a Figma library and a one-page rules PDF — not a 90-page brand book no one will open twice.",
  },
  {
    n: "04 · Build",
    title: "Packaging & print",
    body: "Carton systems, label runs, swing tags, founder cards. Mechanicals supplied print-ready. Vendor handoff included.",
  },
];

const stats = [
  { v: "3", u: "", k: "Projects completed" },
  { v: "2", u: "", k: "Content shoots delivered" },
  { v: "1", u: "", k: "UI design system shipped" },
  { v: "3", u: "", k: "Disciplines · content · editorial · UI" },
];

const filterPills = ["All work", "Content shoot", "UI design", "Editorial"];

export default function FramesPage() {
  return (
    <div className="bg-white" style={{ fontFamily: "var(--font-body)" }}>
      <style>{`
        @keyframes frames-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .frames-ticker { animation: frames-marquee 24s linear infinite; display: flex; width: max-content; }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-[220px] pb-10">
        <FadeIn>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">Frames</span>
            <span className="text-black/20 text-xs">/</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">Content & Branding Studio</span>
            <span className="text-black/20 text-xs">/</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">2023 – 2026</span>
          </div>
        </FadeIn>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
          className="text-[clamp(52px,9vw,120px)] font-black leading-[0.9] tracking-tight text-black"
        >
          Pictures that sell.
          <br />
          <em className="not-italic font-light italic">Brands that</em>{" "}travel.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
          className="mt-8 text-base md:text-lg text-black/45 max-w-2xl leading-relaxed"
        >
          We don&apos;t shoot for awards. We shoot for the line item three steps later — the
          conversion, the press feature, the wholesale buyer who finally says yes. Content and
          identity work built on the same systems-first thinking as the rest of our studio.
        </motion.p>

        {/* Hero image grid — left wider, right stacked */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38, ease: EASE }}
          className="mt-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4"
        >
          <div className="relative w-full overflow-hidden rounded-2xl bg-[#eeeae4]" style={{ aspectRatio: "4/3" }}>
            <Image src="/featured/Home.png" alt="Featured shoot" fill className="object-cover" sizes="(max-width: 768px) 100vw, 58vw" />
          </div>
          <div className="grid grid-rows-2 gap-4" style={{ minHeight: 0 }}>
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#eeeae4]">
              <Image src="/featured/House Of Waas .png" alt="House of Waas shoot" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#eeeae4]">
              <Image src="/featured/koHEDHA.png" alt="koHEDHA shoot" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
          </div>
        </motion.div>

        {/* Filter row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
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
            Covering all of your Design inquiries →
          </span>
        </motion.div>
      </section>

      {/* ── PROJECT 01 — Opotique.LK ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 border-t border-black/[0.07]">
        <FadeIn><ProjectHead p={projects[0]} /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["/opotique/T_S-4287.webp", "/opotique/T_S-85.webp", "/opotique/T_S-118.webp"].map((src, i) => (
              <div key={i} className="relative w-full overflow-hidden rounded-2xl bg-[#eeeae4]" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={src}
                  alt={`Opotique shoot ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── PROJECT 02 — LACASA ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 border-t border-black/[0.07]">
        <FadeIn><ProjectHead p={projects[1]} /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "/lacasa/LaCasa-3117.jpg",
              "/lacasa/LaCasa-3182 (1).jpg",
              "/lacasa/LaCasa-3214 (1).jpg",
            ].map((src, i) => (
              <div key={i} className="relative w-full overflow-hidden rounded-2xl bg-[#eeeae4]" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={src}
                  alt={`Lacasa shoot ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── PROJECT 03 — HOODIE (UI design) ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 border-t border-black/[0.07]">
        <FadeIn><ProjectHead p={projects[2]} /></FadeIn>
        <FadeIn delay={0.1}>
          <div className="bg-[#1a1a17] rounded-3xl p-7 md:p-10">
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#2a2a24]" style={{ aspectRatio: "16/9" }}>
              <Image
                src="/hoodie/Desktop - 6 (1).png"
                alt="Hoodie UI design"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">Project</p>
                <p className="text-[32px] font-black text-white tracking-tight leading-none">
                  Hoodie<span className="text-[#f04b25]">.</span>
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">Deliverable</p>
                <p className="text-sm text-white/60 leading-snug">Full UI design for an e-commerce fashion brand. Desktop-first, conversion-mapped, Figma-delivered.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">Discipline</p>
                <p className="text-sm text-white/60 leading-snug">UI design · e-commerce · Figma handoff</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[#f04b25] py-5 overflow-hidden my-6">
        <div className="frames-ticker">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="inline-flex items-center gap-0">
              {["Pictures that sell", "Brands that travel", "Briefs over moodboards", "Shoot to convert"].map((t) => (
                <span key={t} className="inline-flex items-center text-white text-sm font-semibold uppercase tracking-widest px-6">
                  {t}
                  <span className="ml-6 text-white/30">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <FadeIn>
          <div className="flex items-center gap-2 mb-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">What we shoot & build</span>
            <span className="text-black/20 text-xs">/</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">service lines</span>
          </div>
        </FadeIn>
        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/[0.07] border-y border-black/[0.07]">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <div className="p-7 md:p-8">
                <p className="text-[11px] font-mono uppercase tracking-widest text-black/30 mb-3">{s.n}</p>
                <h3 className="text-[20px] font-semibold text-black tracking-tight mb-3 leading-tight">{s.title}</h3>
                <p className="text-[13px] text-black/40 leading-relaxed">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <FadeIn>
          <div className="flex items-center gap-2 mb-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">Across the studio</span>
            <span className="text-black/20 text-xs">/</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-black/30">2025 – 2026</span>
          </div>
        </FadeIn>
        <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 divide-y-0 border-y border-black/[0.07]">
          {stats.map((s, i) => (
            <StaggerItem key={s.k}>
              <div className={`p-7 md:p-9 border-b md:border-b-0 md:border-r border-black/[0.07] ${i === stats.length - 1 ? "md:border-r-0" : ""}`}>
                <p className="text-[clamp(40px,5vw,72px)] font-black tracking-tight leading-none text-black">
                  {s.v}
                  <span className="text-[0.3em] text-black/25 font-medium ml-1">{s.u}</span>
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
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#f04b25]/[0.05] rounded-full blur-[100px] pointer-events-none" />
            <div className="relative">
              <p className="text-[11px] font-mono uppercase tracking-widest text-white/30 mb-7">
                Now booking / Q3 shoots
              </p>
              <h2 className="text-[clamp(40px,6vw,96px)] font-black text-white leading-[0.92] tracking-tight">
                Your product{" "}
                <em className="not-italic font-light italic">deserves</em>
                {" "}a better frame.
              </h2>
              <div className="flex flex-wrap gap-3 mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#eeeae4] transition-colors duration-150"
                >
                  Plan a shoot <ArrowUpRight size={14} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-full text-sm hover:border-white/40 transition-colors duration-150"
                >
                  Request the full reel
                </a>
              </div>
            </div>
            <div className="relative">
              <span className="block text-[11px] font-mono uppercase tracking-widest text-white/30 mb-3">
                Half-day to three-day shoots
              </span>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                Brief us in five minutes — usage, channels, deadline. We&apos;ll come back with a
                frame-by-frame shotlist and a fixed price before you commit to a calendar slot.
              </p>
              <p className="text-[11px] text-white/25">
                In-house team · gear owned · Colombo studio + on-location · serving founders worldwide
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
