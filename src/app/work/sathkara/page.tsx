"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const meta = [
  { k: "Client", v: "Sathkara Foundation · Colombo" },
  { k: "Engagement", v: "Frontend web app" },
  { k: "Timeline", v: "14 weeks · Q1–Q2 2025" },
  { k: "Status", v: "Shipping live", live: true },
];

const before = [
  "Bank transfer screenshots arriving on a WhatsApp group at 2am.",
  "Donors waiting 2–3 weeks for a tax receipt — no idea where the money went.",
  "A shared sheet with 14 tabs. Reconciliation took ~36 staff-hours per week.",
  "NGO partners chasing the foundation for payout status by phone, daily.",
];

const principles = [
  {
    n: "01",
    title: "One source of truth.",
    body: "Every donation, every payout, every receipt lives in one Postgres-backed ledger. Spreadsheets retired on day one.",
  },
  {
    n: "02",
    title: "Trust by transparency.",
    body: "Donors get a live link showing exactly which NGO their money reached, when, and what it funded. Trust scales when receipts do.",
  },
  {
    n: "03",
    title: "Self-serve onboarding.",
    body: "NGOs onboard themselves in 30 minutes via a guided flow. The foundation only intervenes for compliance review.",
  },
];

const archSurfaces = [
  { lbl: "Surface 01 · Public", title: "sathkara.org — donor site" },
  { lbl: "Surface 02 · Donor", title: "Donor portal & receipts" },
  { lbl: "Surface 03 · NGO", title: "NGO partner dashboard" },
  { lbl: "Surface 04 · Foundation", title: "Admin & compliance" },
];

const archCore = [
  { lbl: "Ledger", title: "Postgres + Drizzle" },
  { lbl: "Payments", title: "PayHere · LankaQR · Stripe" },
  { lbl: "Automation", title: "n8n workflows · 23 flows" },
  { lbl: "Comms", title: "Resend · WhatsApp BSP" },
];

const timeline = [
  {
    d: "Wk 1–2 · Discovery",
    t: "Mapped the messy reality.",
    p: "12 stakeholder interviews. Audited 6 months of bank statements. Drew the unit-of-work diagram on a whiteboard. Signed a fixed-price SOW.",
  },
  {
    d: "Wk 3 · Live mockup",
    t: "48-hour clickable prototype.",
    p: "Approved in round 2. Locked the donor flow and the NGO compliance flow before a line of production code.",
  },
  {
    d: "Wk 4–10 · Build",
    t: "Four surfaces in six weeks.",
    p: "Public site, donor portal, NGO dash, foundation admin. 23 n8n workflows wired to bank rails. Soft launch with three pilot NGOs.",
  },
  {
    d: "Wk 11–14 · Handoff",
    t: "Documented. Released. Owned.",
    p: "Notion runbook, screen recordings, GitHub access transferred. Two-week embedded support window. Then we walked away. They run it.",
    now: true,
  },
];

const stack = [
  { k: "Front-end", v: "Next.js, Tailwind" },
  { k: "API", v: "tRPC, Zod, Edge runtime" },
  { k: "Data", v: "Postgres, Drizzle ORM" },
  { k: "Payments", v: "PayHere, LankaQR, Stripe" },
  { k: "Automation", v: "n8n, 23 workflows" },
  { k: "Comms", v: "Resend, WhatsApp BSP" },
];

const stackTags = [
  "Open-source",
  "No vendor lock-in",
  "Self-hosted on Vercel + Neon",
  "SOC 2 ready",
  "Owned by client",
];

const marqueeItems = [
  "Built for operators",
  "Systems first, pixels second",
  "No lock-in",
  "48h live mockup",
  "Shipped from Colombo",
];

export default function SathkaraCase() {
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
            Case 01 / Selected work / 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-[clamp(40px,6vw,80px)] font-black text-black leading-[1] tracking-tight"
        >
          Sathkara<br />
          <span className="italic font-light">turned 40 NGOs</span><br />
          into one feed.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-8 text-[17px] text-black/50 leading-relaxed max-w-2xl"
        >
          A real-time donation platform connecting 40+ Sri Lankan nonprofits to donors,
          corporates and the diaspora. We built the frontend — four surfaces on a single design system.
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
              "radial-gradient(900px 400px at 80% 10%, rgba(27,58,107,0.55), transparent 60%), radial-gradient(700px 600px at 0% 100%, rgba(240,75,37,0.2), transparent 60%), #0f0f0f",
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
                  sathkara.org / dashboard / live
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-white/50">Live</span>
              </div>
            </div>

            {/* Dashboard mock */}
            <div className="bg-[#faf7ee] flex" style={{ minHeight: 340 }}>
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-48 border-r border-black/[0.08] p-5 shrink-0">
                <p className="font-extrabold text-[15px] tracking-tight text-black mb-5">
                  sathkara<span className="text-[#1b3a6b]">.</span>
                </p>
                {["Overview", "Campaigns", "NGOs · 42", "Donors", "Payouts", "Reports"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-[12px] mb-0.5 ${
                        i === 0
                          ? "bg-[#0f0f0f] text-white"
                          : "text-black/40"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 border rounded-sm ${
                          i === 0 ? "border-white/50" : "border-black/20"
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
                  <p className="font-semibold text-[15px] text-black tracking-tight">
                    Donation pulse — last 30 days
                  </p>
                  <p className="text-[11px] text-black/30 font-mono">UTC+5:30 · refreshed 02m ago</p>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {[
                    { k: "Donations", v: "LKR 38.4M", d: "▲ 218% MoM", up: true },
                    { k: "Donors", v: "12,408", d: "▲ 1,210 new", up: true },
                    { k: "NGOs live", v: "42", d: "▲ 7 onboarded", up: true },
                    { k: "Payout latency", v: "2.4h", d: "▼ from 14 days", up: true },
                  ].map((kpi) => (
                    <div
                      key={kpi.k}
                      className="bg-white border border-black/[0.07] rounded-lg p-3.5"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-black/30 mb-1">
                        {kpi.k}
                      </p>
                      <p className="text-lg font-bold text-black tracking-tight">{kpi.v}</p>
                      <p className="text-[10px] text-green-700 mt-0.5">{kpi.d}</p>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="bg-white border border-black/[0.07] rounded-lg p-4 flex-1">
                  <div className="flex justify-between text-[11px] text-black/30 mb-3">
                    <span>Daily inflow · LKR</span>
                    <span>Mar 04 — Apr 03</span>
                  </div>
                  <svg viewBox="0 0 600 100" className="w-full" style={{ height: 80 }} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#1B3A6B" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#1B3A6B" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,90 C40,82 60,75 90,62 C140,44 180,50 220,38 C260,28 300,40 340,25 C380,13 420,22 460,16 C500,10 540,19 600,6 L600,100 L0,100 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0,90 C40,82 60,75 90,62 C140,44 180,50 220,38 C260,28 300,40 340,25 C380,13 420,22 460,16 C500,10 540,19 600,6"
                      stroke="#1B3A6B"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    {[{ cx: 220, cy: 38 }, { cx: 340, cy: 25 }, { cx: 460, cy: 16 }, { cx: 600, cy: 6 }].map(
                      (p, i) => (
                        <circle key={i} cx={p.cx} cy={p.cy} r={i === 3 ? 3 : 2.2} fill="#1B3A6B" />
                      )
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Float cards */}
          <div className="grid grid-cols-3 gap-3 px-5 md:px-6 pb-6">
            {[
              { k: "Time to first donation", v: "11", unit: "seconds" },
              { k: "NGOs onboarded in week 1", v: "17", unit: "orgs" },
              { k: "Manual reconciliation", v: "~0", unit: "hrs / week" },
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
                Forty nonprofits.
                <br />
                <span className="italic font-light">One messy spreadsheet</span> running the
                country&apos;s giving.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                Sathkara came to us with a noble mission and a punishing operations bill: collecting
                donations across 40+ partner NGOs through bank transfers, WhatsApp screenshots, and a
                shared Google Sheet that took two staff three days to reconcile every week. Donor
                receipts were sent by hand. Allocation reports went out monthly. Trust was leaking.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Before / After ledger */}
        <FadeIn delay={0.1}>
          <div className="border-t border-black/[0.08] grid grid-cols-1 md:grid-cols-2">
            {before.map((item, i) => (
              <div
                key={i}
                className={`p-7 border-b border-black/[0.08] ${
                  i % 2 === 0 ? "md:border-r" : ""
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
                We mapped the workflow before we drew a single pixel.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                Sathkara is a marketplace, not a brochure. The unit of work isn&apos;t a page — it&apos;s a
                donation event that has to clear bank rails, settle to an NGO, generate a receipt,
                and produce a public allocation record. Everything we shipped sits on that spine.
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
                A four-surface system on a single Postgres + Next.js backbone, glued to local bank
                rails through n8n and a stripe-style payments gateway.
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
            <div className="bg-[#1b3a6b] text-white rounded-xl p-4 text-center mb-4">
              <p className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                The spine · Next.js + tRPC API
              </p>
              <p className="text-sm font-semibold">
                Donation events, payouts, receipts, allocations, compliance
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
                  lbl: "Out · For the donor",
                  title: "Tax receipt in < 60 seconds · live allocation report",
                },
                {
                  lbl: "Out · For the NGO",
                  title: "Same-day settlement · single-click compliance pack",
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
              &ldquo;We came in asking for a website. theBOAT shipped us the central nervous system
              of our entire foundation.&rdquo;
              <cite className="block not-italic text-sm text-black/40 font-normal mt-6 tracking-normal leading-normal">
                — Dilshan W. · Executive Director, Sathkara Foundation
              </cite>
            </blockquote>
          </div>
        </FadeIn>
      </section>

      {/* ── OUTCOMES ─────────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="bg-[#0f0f0f] text-white rounded-2xl p-8 md:p-14">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                04 / What shipped
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-white/[0.12]">
              {[
                { num: "4", unit: "surfaces", label: "Public site, donor portal, NGO dashboard, and foundation admin — one design system." },
                { num: "48h", unit: "turnaround", label: "From discovery to a clickable prototype. Approved before a line of production code." },
                { num: "42", unit: "NGOs", label: "Partner organisations onboarded and listed on the live platform at launch." },
              ].map((r, i) => (
                <div key={i} className="py-9 pr-6 border-r border-white/[0.12] last:border-r-0">
                  <p className="text-[clamp(32px,4vw,52px)] font-black text-white leading-none tracking-tight">
                    {r.num}<span className="text-xl font-normal text-white/40 ml-1">{r.unit}</span>
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
                14 weeks. Three sprints. Zero scope creep.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                No black box. Every week we shipped one new surface, sent a Loom, and asked one
                direct question.
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
                  style={{ background: "linear-gradient(135deg, #1B3A6B, #D9543C)" }}
                />
                <div>
                  <p className="font-semibold text-black text-sm">Dilshan Wickramasinghe</p>
                  <p className="text-xs text-black/40 mt-0.5">
                    Executive Director · Sathkara Foundation
                  </p>
                </div>
              </div>
              <p className="text-xs font-mono text-black/25 mt-6">★★★★★ — verified May 2025</p>
            </div>
            <blockquote className="italic font-light text-[clamp(20px,2.8vw,36px)] text-black leading-[1.2] tracking-tight m-0">
              &ldquo;I expected a website. I got a discipline. theBOAT made us define the unit of
              work first, then built the only system in Sri Lankan philanthropy I&apos;d describe as
              boring in the best sense — it just runs. Two of our partner NGOs have asked us how to
              copy it. We refer them straight back.&rdquo;
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
              Up next / Case 02
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <a
            href="/work/bounce"
            className="group grid md:grid-cols-[1fr_1.6fr] gap-8 items-end p-8 rounded-2xl border border-black/[0.08] bg-[#f5f2ed] hover:bg-[#0f0f0f] hover:border-[#0f0f0f] transition-all duration-300"
          >
            <div
              className="aspect-[4/3] rounded-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1f3f2a, #6ba07a)" }}
            />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-black/30 group-hover:text-white/40 mb-3 transition-colors">
                Court booking app · 2025
              </p>
              <h2 className="text-[clamp(24px,3.5vw,52px)] font-black text-black group-hover:text-white leading-[1.05] tracking-tight transition-colors">
                Bounce —<br />
                <span className="italic font-light">court bookings</span><br />
                reinvented.
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
