"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const meta = [
  { k: "Client", v: "Troi · Colombo" },
  { k: "Engagement", v: "SaaS dashboard" },
  { k: "Timeline", v: "12 weeks · Q1–Q2 2025" },
  { k: "Status", v: "Beta", live: true },
];

const before = [
  "SMEs spending across Google, Meta, and TikTok with no way to tie ad spend back to actual store revenue.",
  "Each ad platform reported its own inflated numbers — impossible to reconcile against real Shopify sales.",
  "Marketing budget decisions made on gut feel. Spend kept climbing, real ROI stayed unknown.",
];

const principles = [
  {
    n: "01",
    title: "Channel-wise, not blended.",
    body: "Every marketing channel gets its own ROAS and ROI breakdown. Blended numbers hide the truth — we surface what each channel actually earns.",
  },
  {
    n: "02",
    title: "Sales data, not ad platform data.",
    body: "We pull from Shopify and WooCommerce — not the ad platforms — so attribution reflects real transactions, not claimed clicks.",
  },
  {
    n: "03",
    title: "Actionable, not decorative.",
    body: "The dashboard answers one question per channel: is this worth running? Budget signals surface automatically so the decision is obvious.",
  },
];

const archSurfaces = [
  { lbl: "Surface 01 · Overview", title: "ROAS dashboard" },
  { lbl: "Surface 02 · Channels", title: "Per-channel breakdown" },
  { lbl: "Surface 03 · Sales", title: "Store data sync" },
  { lbl: "Surface 04 · Reports", title: "Campaign view" },
];

const archCore = [
  { lbl: "Ad data", title: "Google Ads API · Meta Ads API" },
  { lbl: "Sales data", title: "Shopify API · WooCommerce" },
  { lbl: "Compute", title: "Attribution engine · n8n" },
  { lbl: "Data", title: "Supabase · Postgres" },
];

const outcomes = [
  { num: "4+", unit: "channels", label: "Google Ads, Meta Ads, TikTok, and email — all in one attribution view." },
  { num: "Live", unit: "updates", label: "Spend and sales data sync continuously — no waiting for end-of-month reports." },
  { num: "1", unit: "dashboard", label: "Replace four ad platform tabs and a Shopify reports page with a single source of truth." },
];

const timeline = [
  {
    d: "Wk 1–3 · Discovery",
    t: "Interviewed 8 SME marketing teams.",
    p: "Mapped every manual step in their reporting workflow. Defined the attribution model before writing a line of code.",
  },
  {
    d: "Wk 4–5 · Architecture",
    t: "Data pipeline design.",
    p: "Designed the attribution engine. Resolved overlap between ad platform claimed conversions and Shopify actual orders.",
  },
  {
    d: "Wk 6–11 · Build",
    t: "Dashboard + integrations.",
    p: "Google Ads API, Meta Ads API, and Shopify API integrations. Real-time ROAS engine. Channel comparison views.",
  },
  {
    d: "Wk 12 · Beta launch",
    t: "5 SME beta clients onboarded.",
    p: "Real campaigns, real budgets. Attribution running against live store data.",
    now: true,
  },
];

const stack = [
  { k: "Front-end", v: "Next.js, Tailwind" },
  { k: "API", v: "tRPC, Zod" },
  { k: "Ad integrations", v: "Google Ads API, Meta Ads API" },
  { k: "Sales", v: "Shopify API, WooCommerce" },
  { k: "Automation", v: "n8n, data pipeline" },
  { k: "Data", v: "Supabase, Postgres" },
];

const stackTags = ["Real attribution", "No ad platform bias", "Shopify-connected", "Owned by client"];

const marqueeItems = [
  "Real attribution",
  "Channel-wise ROAS",
  "Built for SMEs",
  "Shopify-connected",
  "No guesswork",
];

export default function TroiCase() {
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
            Case 04 / Selected work / 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-[clamp(40px,6vw,80px)] font-black text-black leading-[1] tracking-tight"
        >
          Troi<br />
          <span className="italic font-light">shows you which ad<br />actually worked.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-8 text-[17px] text-black/50 leading-relaxed max-w-2xl"
        >
          A real-time ROAS and ROI calculator for SMEs. Connect your ad channels and your store —
          Troi does the attribution math so you stop guessing which campaigns are worth running.
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

        {/* Dashboard stage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="mt-14 rounded-2xl bg-[#0f0f0f] overflow-hidden relative"
          style={{
            background:
              "radial-gradient(900px 400px at 80% 10%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(700px 600px at 0% 100%, rgba(99,60,220,0.2), transparent 60%), #0f0f0f",
          }}
        >
          {/* Browser chrome */}
          <div className="m-5 md:m-6 rounded-xl overflow-hidden border border-white/[0.08] bg-[#16161a]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/15" />
                ))}
              </div>
              <div className="flex-1 mx-3 bg-white/[0.05] rounded px-3 py-1.5 text-center">
                <span className="text-[11px] font-mono text-white/40">
                  troi.app / dashboard / channels
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-white/50">Live</span>
              </div>
            </div>

            {/* Dashboard mock */}
            <div className="bg-[#0d0d12] flex" style={{ minHeight: 340 }}>
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-48 border-r border-white/[0.06] p-5 shrink-0">
                <p className="font-extrabold text-[15px] tracking-tight text-white mb-5">
                  troi<span className="text-[#7C3AED]">.</span>
                </p>
                {["Overview", "Google Ads", "Meta Ads", "TikTok", "Email", "Reports"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-[12px] mb-0.5 ${
                        i === 0
                          ? "bg-[#7C3AED] text-white"
                          : "text-white/30"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 border rounded-sm ${
                          i === 0 ? "border-white/50" : "border-white/15"
                        }`}
                      />
                      {item}
                    </div>
                  )
                )}
              </div>

              {/* Main dash */}
              <div className="flex-1 p-5 flex flex-col gap-4">
                <div className="flex items-end justify-between">
                  <p className="font-semibold text-[15px] text-white tracking-tight">
                    Channel ROAS — last 30 days
                  </p>
                  <p className="text-[11px] text-white/30 font-mono">refreshed 00m ago · live</p>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {[
                    { k: "Blended ROAS", v: "3.8×", d: "▲ 0.6× vs. last mo." },
                    { k: "Total ad spend", v: "$12,400", d: "across 4 channels" },
                    { k: "Revenue attributed", v: "$47,120", d: "from store orders" },
                    { k: "Best channel", v: "Google", d: "ROAS 5.1×" },
                  ].map((kpi) => (
                    <div
                      key={kpi.k}
                      className="bg-white/[0.05] border border-white/[0.08] rounded-lg p-3.5"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">
                        {kpi.k}
                      </p>
                      <p className="text-lg font-bold text-white tracking-tight">{kpi.v}</p>
                      <p className="text-[10px] text-purple-400 mt-0.5">{kpi.d}</p>
                    </div>
                  ))}
                </div>

                {/* Bar chart placeholder */}
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-4 flex-1">
                  <div className="flex justify-between text-[11px] text-white/30 mb-4">
                    <span>ROAS by channel</span>
                    <span>Apr 2025</span>
                  </div>
                  <div className="flex items-end gap-4 h-20">
                    {[
                      { label: "Google", height: "80%", color: "#7C3AED" },
                      { label: "Meta", height: "55%", color: "#6366F1" },
                      { label: "TikTok", height: "35%", color: "rgba(255,255,255,0.15)" },
                      { label: "Email", height: "65%", color: "rgba(255,255,255,0.2)" },
                    ].map((bar) => (
                      <div key={bar.label} className="flex flex-col items-center gap-1.5 flex-1">
                        <div
                          className="w-full rounded-t-md"
                          style={{ height: bar.height, background: bar.color }}
                        />
                        <span className="text-[9px] font-mono text-white/30 uppercase">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Float cards */}
          <div className="grid grid-cols-3 gap-3 px-5 md:px-6 pb-6">
            {[
              { k: "Attribution model", v: "Last-click", unit: "first-party" },
              { k: "Channels connected", v: "4", unit: "ad sources" },
              { k: "Platform tab savings", v: "~5", unit: "tabs closed" },
            ].map((f) => (
              <div
                key={f.k}
                className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-4 text-white"
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1.5">
                  {f.k}
                </p>
                <p className="text-2xl font-semibold tracking-tight">
                  {f.v}
                  <span className="text-xs text-white/40 ml-1 font-normal">{f.unit}</span>
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
          style={{
            animation: "marquee 22s linear infinite",
            width: "max-content",
          }}
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
                Four ad platforms.
                <br />
                <span className="italic font-light">Four different stories</span> about what
                actually worked.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                Troi came to us with a problem every SME marketing team knows: Google says it drove
                200 conversions, Meta claims 180, TikTok counts 90 — but Shopify only recorded 310
                orders total. Every platform takes credit. Nobody owns the truth. Budget decisions
                were being made on fiction.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Before ledger */}
        <FadeIn delay={0.1}>
          <div className="border-t border-black/[0.08] grid grid-cols-1 md:grid-cols-3">
            {before.map((item, i) => (
              <div
                key={i}
                className={`p-7 border-b border-black/[0.08] ${
                  i < before.length - 1 ? "md:border-r" : ""
                } bg-black/[0.025]`}
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
                Attribution starts at the store, not the ad platform.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                The only source of truth is what actually got purchased. We built Troi to pull from
                Shopify and WooCommerce first — then reconcile ad platform data against real orders.
                The platform&apos;s job is to make the math undeniable and the decision obvious.
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
                A four-surface SaaS dashboard on a Next.js + Supabase backbone, wired to ad APIs
                and store data through a real-time attribution engine.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border border-black/[0.1] rounded-2xl p-6 md:p-9 bg-white">
            {/* Surfaces row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {archSurfaces.map((n) => (
                <div
                  key={n.lbl}
                  className="border border-black/[0.1] rounded-xl p-4"
                >
                  <p className="text-[10px] font-mono uppercase tracking-wider text-black/30 mb-1">
                    {n.lbl}
                  </p>
                  <p className="text-[13px] font-semibold text-black">{n.title}</p>
                </div>
              ))}
            </div>

            <div className="text-center text-black/20 font-mono text-sm py-3">↓ ↓ ↓ ↓</div>

            {/* Spine */}
            <div
              className="text-white rounded-xl p-4 text-center mb-4"
              style={{ background: "#7C3AED" }}
            >
              <p className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                The spine · Next.js + data pipeline
              </p>
              <p className="text-sm font-semibold">
                Ad spend ingestion, sales attribution, ROAS/ROI calculation, channel reporting
              </p>
            </div>

            <div className="text-center text-black/20 font-mono text-sm py-3">↓</div>

            {/* Core row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {archCore.map((n) => (
                <div
                  key={n.lbl}
                  className="bg-[#0f0f0f] text-white rounded-xl p-4"
                >
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                    {n.lbl}
                  </p>
                  <p className="text-[13px] font-semibold">{n.title}</p>
                </div>
              ))}
            </div>

            <div className="text-center text-black/20 font-mono text-sm py-3">↓</div>

            {/* Output row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  lbl: "Out · For the marketer",
                  title: "Real-time ROAS per channel · Budget signals",
                },
                {
                  lbl: "Out · For the founder",
                  title: "Actual ROI per campaign · Spend vs. revenue truth",
                },
              ].map((n) => (
                <div key={n.lbl} className="bg-[#f04b25] text-white rounded-xl p-4">
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

      {/* ── PULL QUOTE ──────────────────────────── */}
      <section className="py-20 px-5 md:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="border-t border-b border-black/[0.1] py-20">
            <blockquote className="italic font-light text-[clamp(28px,4vw,58px)] text-black leading-[1.05] tracking-tight max-w-4xl">
              &ldquo;We were spending $12k a month across four platforms and genuinely couldn&apos;t
              tell you which one was working. Troi made the answer obvious in the first week.&rdquo;
              <cite className="block not-italic text-sm text-black/40 font-normal mt-6 tracking-normal leading-normal">
                — Beta client · SME founder, Colombo
              </cite>
            </blockquote>
          </div>
        </FadeIn>
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
                  What it changes.
                </h2>
              </div>
              <p className="text-xs font-mono text-white/30 max-w-xs">
                Numbers from beta cohort. 5 SMEs. Real campaigns, real budgets, live Shopify data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/[0.12]">
              {outcomes.map((r, i) => (
                <div
                  key={i}
                  className="py-9 pr-6 border-r border-white/[0.12] last:border-r-0"
                >
                  <p className="text-[clamp(32px,4vw,52px)] font-black text-white leading-none tracking-tight">
                    {r.num}
                    <span className="text-xl font-normal text-white/40 ml-1">{r.unit}</span>
                  </p>
                  <p className="mt-3 text-sm text-white/40 leading-relaxed">{r.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/[0.12]">
              <p className="italic font-light text-[clamp(22px,2.8vw,40px)] text-white leading-[1.15] tracking-tight">
                &ldquo;Stop asking which ad worked. Troi just tells you.&rdquo;
              </p>
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
                12 weeks. Discovery first. Attribution second. Dashboard last.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                The attribution model was locked before a single component was written. That order
                is non-negotiable.
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
              <div
                key={s.k}
                className={`p-5 ${i < stack.length - 1 ? "border-r border-black/[0.08]" : ""}`}
              >
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
              <span
                key={tag}
                className="text-xs border border-black/[0.1] rounded-full px-3.5 py-1.5 text-black/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── TESTIMONIAL ─────────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="border-t border-b border-black/[0.1] py-16 grid md:grid-cols-[1fr_1.6fr] gap-12 items-start">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-black/30 mb-5">
                Said by the client
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full shrink-0"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}
                />
                <div>
                  <p className="font-semibold text-black text-sm">Beta client</p>
                  <p className="text-xs text-black/40 mt-0.5">
                    Founder · SME, Colombo
                  </p>
                </div>
              </div>
              <p className="text-xs font-mono text-black/25 mt-6">★★★★★ — verified Q2 2025</p>
            </div>
            <blockquote className="italic font-light text-[clamp(20px,2.8vw,36px)] text-black leading-[1.2] tracking-tight m-0">
              &ldquo;I used to open four tabs every Monday morning and try to reconcile four
              different reports that all disagreed with each other. Troi replaced that with one
              number per channel and a clear budget recommendation. I made a channel cut in week
              two and saved $1,800 in the first month.&rdquo;
            </blockquote>
          </div>
        </FadeIn>
      </section>

      {/* ── NEXT PROJECT ────────────────────────── */}
      <section className="py-24 px-5 md:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
            <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
              Up next / Case 05
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <a
            href="/work/ceylon-routes"
            className="group grid md:grid-cols-[1fr_1.6fr] gap-8 items-end p-8 rounded-2xl border border-black/[0.08] bg-[#f5f2ed] hover:bg-[#0f0f0f] hover:border-[#0f0f0f] transition-all duration-300"
          >
            <div
              className="aspect-[4/3] rounded-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0c2a1a, #0369A1)" }}
            />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-black/30 group-hover:text-white/40 mb-3 transition-colors">
                Tour booking app · 2025
              </p>
              <h2 className="text-[clamp(24px,3.5vw,52px)] font-black text-black group-hover:text-white leading-[1.05] tracking-tight transition-colors">
                Ceylon Routes —<br />
                <span className="italic font-light">browse a tour.</span><br />
                book it. go.
              </h2>
              <div className="inline-flex items-center gap-1.5 mt-6 text-sm text-black/50 group-hover:text-white/60 border-b border-black/[0.15] group-hover:border-white/20 pb-0.5 transition-colors">
                Read the case
                <ArrowUpRight size={14} />
              </div>
            </div>
          </a>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
