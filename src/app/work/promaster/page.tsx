"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ACCENT = "#b87333";

const meta = [
  { k: "Client", v: "Pro Master Construction Products LLC · UAE" },
  { k: "Engagement", v: "Product website + CMS" },
  { k: "Timeline", v: "10 weeks · Q3–Q4 2025" },
  { k: "Status", v: "Live", live: true },
];

const before = [
  "200+ products with no searchable online catalog — distributors and contractors requested datasheets by WhatsApp.",
  "Technical documents (TDS, SDS, application guides) stored in local folders, impossible to share consistently across GCC markets.",
  "No way to showcase 500+ completed projects to specifiers and developers without sending a PDF deck manually.",
];

const principles = [
  {
    n: "01",
    title: "Content owned by the team.",
    body: "Every product, project, and datasheet is managed through Sanity CMS. The Pro Master team can add a product or update specs without touching a line of code.",
  },
  {
    n: "02",
    title: "Technical credibility first.",
    body: "Contractors and specifiers need TDS, SDS, and compliance standards fast. The document library is filterable, downloadable, and always current.",
  },
  {
    n: "03",
    title: "Built for the GCC market.",
    body: "Gulf heat, humidity, and saline conditions are real constraints. The site communicates ISO certification, ASTM/EN/BS compliance, and WRAS approval upfront.",
  },
];

const archSurfaces = [
  { lbl: "Surface 01 · Public", title: "Product catalog" },
  { lbl: "Surface 02 · Library", title: "TDS / SDS / App guides" },
  { lbl: "Surface 03 · Showcase", title: "Projects portfolio" },
  { lbl: "Surface 04 · Admin", title: "Sanity CMS studio" },
];

const archCore = [
  { lbl: "Frontend", title: "Next.js · App Router" },
  { lbl: "CMS", title: "Sanity Studio" },
  { lbl: "Images", title: "Sanity CDN" },
  { lbl: "Deploy", title: "Netlify" },
];

const outcomes = [
  { num: "200+", unit: "products", label: "Full catalog live and searchable by category, application, and standard." },
  { num: "500+", unit: "projects", label: "Completed GCC projects documented and filterable for specifiers." },
  { num: "6", unit: "markets", label: "Distributed across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman." },
];

const timeline = [
  {
    d: "Wk 1–2 · Discovery",
    t: "Mapped 200+ products & doc library.",
    p: "Audited existing product data, document formats, and how distributors and contractors actually search for products. Signed fixed-scope SOW.",
  },
  {
    d: "Wk 3–4 · Design + CMS",
    t: "Schema-first, then UI.",
    p: "Designed the Sanity content schema for products, projects, and documents before a single page was built. Approved in one round.",
  },
  {
    d: "Wk 5–9 · Build",
    t: "Four surfaces, one CMS.",
    p: "Product catalog, document library, projects showcase, and distributor pages. All content pulled from Sanity at build time.",
  },
  {
    d: "Wk 10 · Launch",
    t: "Team trained, content migrated.",
    p: "All 200+ products and technical documents migrated into Sanity. Pro Master team trained to manage content independently. Deployed to Netlify.",
    now: true,
  },
];

const stack = [
  { k: "Frontend", v: "Next.js, Tailwind" },
  { k: "CMS", v: "Sanity Studio" },
  { k: "Images", v: "Sanity CDN" },
  { k: "Deploy", v: "Netlify" },
  { k: "Docs", v: "PDF library" },
  { k: "Standards", v: "ISO · ASTM · EN" },
];

const stackTags = ["Product catalog", "Sanity CMS", "Technical doc library", "Owned by client"];

const marqueeItems = ["Construction chemicals", "GCC market", "200+ products", "Sanity CMS", "Dubai · UAE"];

const siteScreenshots = [
  {
    label: "Homepage — hero & product range",
    src: "/promaster/Screenshot 2026-06-06 at 14.08.31.png",
  },
  {
    label: "Product catalog — search, filter & browse",
    src: "/promaster/Screenshot 2026-06-06 at 14.11.02.png",
  },
];

const featuredProjects = [
  { name: "Dubai Hills Residential Community", location: "Dubai", tag: "Waterproofing · Podium Decks", year: "2024" },
  { name: "Dubai Marina Mixed-Use Tower", location: "Dubai Marina", tag: "Waterproofing · Below-grade", year: "2024" },
  { name: "Fujairah Desalination Plant", location: "Fujairah", tag: "Waterproofing · Chemical Resistance", year: "2023" },
  { name: "Jebel Ali Port Warehouse", location: "Dubai", tag: "Industrial Flooring · Heavy Duty", year: "2022" },
];

export default function ProMasterCase() {
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
          Pro Master<br />
          <span className="italic font-light">200 products,<br />one catalog.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-8 text-[17px] text-black/50 leading-relaxed max-w-2xl"
        >
          A product website and Sanity CMS for a UAE construction chemicals company — replacing
          WhatsApp datasheet requests with a searchable catalog, technical document library, and
          projects showcase built for the GCC market.
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
              src="/promaster/Screenshot 2026-06-06 at 14.08.31.png"
              alt="Pro Master — homepage showing product range"
              width={1920}
              height={960}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Float stats */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[
              { k: "Products in catalog", v: "200+", unit: "live" },
              { k: "Projects documented", v: "500+", unit: "completed" },
              { k: "GCC markets served", v: "6", unit: "countries" },
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
                15 years in the GCC.
                <br />
                <span className="italic font-light">No website</span> to show for it.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                Pro Master Construction Products had built an ISO-certified business supplying
                construction chemicals across six GCC markets for over 15 years. But their online
                presence didn't match their credibility. Distributors were requesting datasheets
                over WhatsApp. Specifiers couldn't find compliance standards. And there was no way
                to showcase 500+ completed projects without sending a deck.
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
          {siteScreenshots.map((s) => (
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
                CMS-first. The team runs it. We don&apos;t.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                200+ products across 7 categories means content that changes constantly — new
                formulations, updated compliance certificates, seasonal launches. The site had
                to be owned by Pro Master&apos;s team from day one. Sanity Studio gives them a
                clean editorial interface without a developer in the loop.
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
                Four public-facing surfaces — product catalog, document library, projects
                showcase, and distributor pages — all managed through one Sanity CMS studio
                and deployed to Netlify.
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
                The spine · Sanity CMS + Next.js
              </p>
              <p className="text-sm font-semibold">
                Products, documents, projects, categories — all content managed without code
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
                { lbl: "Out · For specifiers", title: "TDS / SDS downloadable · Compliance standards visible" },
                { lbl: "Out · For distributors", title: "Full product catalog · GCC distributor network page" },
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

      {/* ── BRAND + IDENTITY ────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
            <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
              Brand identity
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 items-stretch">
            <div className="rounded-2xl overflow-hidden border border-black/[0.08] bg-white flex items-center justify-center p-8">
              <Image
                src="/promaster/Screenshot 2026-06-06 at 14.08.48.png"
                alt="Pro Master brand identity and logo"
                width={900}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-[#0f0f0f] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">
                  Construction chemicals · UAE
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                  15 years in the GCC.<br />Now with a presence to match.
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Pro Master had the credentials — ISO 9001:2015, WRAS approval, ASTM/EN/BS
                  compliance — but no platform to show them. The site communicates their
                  industrial credibility from the first scroll.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.1] pt-6">
                {[
                  { k: "Certification", v: "ISO 9001:2015" },
                  { k: "Standards", v: "ASTM · EN · BS" },
                  { k: "Approval", v: "WRAS · MOEI" },
                ].map((s) => (
                  <div key={s.k}>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-1">{s.k}</p>
                    <p className="text-[13px] font-medium text-white">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>


      {/* ── PROJECTS SHOWCASE ───────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-end mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  Projects on site
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(24px,3.5vw,44px)] font-black text-black leading-[1.05] tracking-tight">
                500+ completed projects. Now findable.
              </h2>
            </div>
          </div>
        </FadeIn>
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {featuredProjects.map((p) => (
            <StaggerItem key={p.name}>
              <div className="border border-black/[0.08] rounded-xl p-6 bg-[#f8f6f2]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/30">
                    {p.location}
                  </span>
                  <span className="text-[10px] font-mono text-black/25">{p.year}</span>
                </div>
                <h4 className="font-bold text-black text-[15px] mb-2">{p.name}</h4>
                <p className="text-xs text-black/40 font-mono">{p.tag}</p>
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
                From launch · Q4 2025. Baseline: pre-website WhatsApp + PDF deck operations.
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
                10 weeks. Schema-first. Handed over.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                We designed the CMS schema before the UI. That meant no content migration surprises
                and a team that could manage the site independently from launch day.
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
