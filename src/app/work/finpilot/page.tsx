"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT = "#0f5c45";

const meta = [
  { k: "Client", v: "NorthBridge Studios · Remote" },
  { k: "Engagement", v: "Agentic AI system" },
  { k: "Timeline", v: "8 weeks · Q1 2025" },
  { k: "Status", v: "Live — fully autonomous", live: true },
];

const before = [
  "Monthly close took 9 days — finance team buried until mid-month, every month.",
  "300+ invoices processed manually at $14 each. No matching, no memory.",
  "Late payments chased by hand. Average collection time: 47 days.",
  "22 hours a week reconciling Stripe, bank feeds, and payment platforms by copy-paste.",
];

const workflows = [
  {
    n: "01",
    title: "Invoice intake.",
    body: "Reads incoming invoices from email and uploads, extracts line items, and matches against project budgets automatically.",
  },
  {
    n: "02",
    title: "Transaction reconciliation.",
    body: "Pulls from Stripe, bank APIs, and payment platforms. Matches transactions to invoices. Flags exceptions for human review.",
  },
  {
    n: "03",
    title: "Payment follow-ups.",
    body: "Drafts and sends overdue payment reminders on a configurable schedule. Escalates to a human only if the client pushes back.",
  },
  {
    n: "04",
    title: "Cash flow forecasting.",
    body: "Generates a rolling 13-week cash flow forecast using confirmed receivables, historical payment behavior, and scheduled payables.",
  },
  {
    n: "05",
    title: "Budget monitoring.",
    body: "Tracks actuals against project budgets in real time. Alerts project leads before overruns happen, not after.",
  },
];

const results = [
  { metric: "Monthly close time", before: "9 days", after: "2 days" },
  { metric: "Invoice processing cost", before: "$14 each", after: "$2 each" },
  { metric: "Days to collect payment", before: "47 days", after: "28 days" },
  { metric: "Weekly reconciliation hours", before: "22 hrs", after: "4 hrs" },
];

const timeline = [
  {
    d: "Wk 1–2 · Discovery",
    t: "Mapped every finance touchpoint.",
    p: "Shadowed the finance team for a week. Documented every tool, spreadsheet, and manual handoff. Scoped the five highest-ROI workflows.",
  },
  {
    d: "Wk 3–4 · Skeleton",
    t: "Invoice intake + reconciliation live.",
    p: "First two workflows shipped and processing real data. Edge cases surfaced immediately — invoice format mismatches, FX rounding, duplicate detection.",
  },
  {
    d: "Wk 5–6 · Core workflows",
    t: "Follow-ups, forecasting, budget alerts.",
    p: "Remaining three workflows deployed. Human approval gates wired to Slack for anything above materiality threshold.",
  },
  {
    d: "Wk 7–8 · Hardening",
    t: "5 months of history replayed.",
    p: "Ran historical invoices through the system. Tuned confidence thresholds. Handed over runbook and training. Finance team running solo.",
    now: true,
  },
];

const stack = [
  { k: "Orchestration", v: "n8n + custom agents" },
  { k: "LLM", v: "Claude via API" },
  { k: "Integrations", v: "Stripe, Xero, bank APIs" },
  { k: "Approvals", v: "Slack workflows" },
  { k: "Data", v: "Postgres, Drizzle ORM" },
  { k: "Hosting", v: "Self-hosted, client-owned" },
];

const stackTags = [
  "No vendor lock-in",
  "Client-owned infrastructure",
  "Human-in-the-loop gates",
  "Auditable decision log",
  "SOC 2 compatible",
];

const marqueeItems = [
  "Agentic finance ops",
  "Human approval gates",
  "5 months ROI",
  "$180K saved annually",
  "Built for operators",
];

export default function FinPilotCase() {
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
          FinPilot<br />
          <span className="italic font-light">runs the books</span><br />
          so they don&apos;t have to.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-8 text-[17px] text-black/50 leading-relaxed max-w-2xl"
        >
          An agentic AI system that runs five core finance workflows autonomously for NorthBridge Studios —
          a 65-person creative agency processing 300+ invoices monthly. Finance ops went from
          consuming 2 weeks a month to running in the background.
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
              "radial-gradient(900px 400px at 80% 10%, rgba(15,92,69,0.5), transparent 60%), radial-gradient(700px 600px at 0% 100%, rgba(240,75,37,0.15), transparent 60%), #0f0f0f",
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
                  finpilot / northbridge · finance dashboard
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-white/50">Autonomous</span>
              </div>
            </div>

            {/* Dashboard mock */}
            <div className="bg-[#f5f5f0] flex" style={{ minHeight: 340 }}>
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-48 border-r border-black/[0.08] p-5 shrink-0">
                <p className="font-extrabold text-[15px] tracking-tight text-black mb-5">
                  fin<span style={{ color: ACCENT }}>pilot</span>
                </p>
                {["Overview", "Invoices · 312", "Reconciliation", "Follow-ups", "Forecast", "Budgets"].map(
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
                    Finance pulse — this month
                  </p>
                  <p className="text-[11px] text-black/30 font-mono">Agent last ran · 4m ago</p>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {[
                    { k: "Invoices processed", v: "312", d: "▲ auto-matched 94%", up: true },
                    { k: "Avg collection", v: "28d", d: "▼ from 47 days", up: true },
                    { k: "Close time", v: "2 days", d: "▼ from 9 days", up: true },
                    { k: "Recon hours / wk", v: "4h", d: "▼ from 22 hrs", up: true },
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
                    <span>Cash flow forecast · 13-week rolling</span>
                    <span>Generated by agent · weekly</span>
                  </div>
                  <svg viewBox="0 0 600 100" className="w-full" style={{ height: 80 }} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0f5c45" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#0f5c45" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,70 C30,65 60,60 90,52 C140,40 180,44 220,34 C260,26 300,38 340,22 C380,12 420,20 460,14 C500,8 540,16 600,4 L600,100 L0,100 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0,70 C30,65 60,60 90,52 C140,40 180,44 220,34 C260,26 300,38 340,22 C380,12 420,20 460,14 C500,8 540,16 600,4"
                      stroke="#0f5c45"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    {[{ cx: 220, cy: 34 }, { cx: 340, cy: 22 }, { cx: 460, cy: 14 }, { cx: 600, cy: 4 }].map(
                      (p, i) => (
                        <circle key={i} cx={p.cx} cy={p.cy} r={i === 3 ? 3 : 2.2} fill="#0f5c45" />
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
              { k: "Annual labor saved", v: "$180K", unit: "/ year" },
              { k: "Faster collections", v: "$90K", unit: "/ year" },
              { k: "System payback", v: "<5", unit: "months" },
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
                Three people.
                <br />
                <span className="italic font-light">Two weeks gone</span> before the month
                was half over.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                NorthBridge Studios had a 3-person finance team processing 300+ invoices monthly
                across multiple currencies. The problem wasn&apos;t talent — it was volume. Chasing
                late payments, reconciling bank statements, categorizing expenses, matching invoices
                to project budgets, producing cash flow reports. Two full weeks of every month,
                gone. No time left for actual financial strategy.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Before bullets */}
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
                  Before · The problem
                </p>
                <p className="text-[16px] text-black/80 leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── THE SOLUTION ────────────────────────── */}
      <section className="py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-end mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  02 / The solution
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(28px,4vw,52px)] font-black text-black leading-[1.05] tracking-tight">
                Five workflows. One agent. Human gates for anything that matters.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                FinPilot doesn&apos;t just automate tasks — it reasons through edge cases. When an invoice
                doesn&apos;t match a purchase order, it reads the related email thread, proposes a
                resolution, and asks the right person to confirm. The finance team approves; the
                agent executes.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflows.slice(0, 3).map((w) => (
            <StaggerItem key={w.n}>
              <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
                Workflow {w.n}
              </p>
              <h3 className="text-lg font-bold text-black mb-3">{w.title}</h3>
              <p className="text-sm text-black/50 leading-relaxed">{w.body}</p>
            </StaggerItem>
          ))}
        </FadeInStagger>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {workflows.slice(3).map((w) => (
            <StaggerItem key={w.n}>
              <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
                Workflow {w.n}
              </p>
              <h3 className="text-lg font-bold text-black mb-3">{w.title}</h3>
              <p className="text-sm text-black/50 leading-relaxed">{w.body}</p>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </section>

      {/* ── PULL QUOTE ──────────────────────────── */}
      <section className="py-20 px-5 md:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="border-t border-b border-black/[0.1] py-20">
            <blockquote className="italic font-light text-[clamp(28px,4vw,58px)] text-black leading-[1.05] tracking-tight max-w-4xl">
              &ldquo;I thought we needed to hire a fourth person. Turns out we needed an agent.
              FinPilot runs the close while the team actually does finance strategy for the first
              time.&rdquo;
              <cite className="block not-italic text-sm text-black/40 font-normal mt-6 tracking-normal leading-normal">
                — Finance Director · NorthBridge Studios
              </cite>
            </blockquote>
          </div>
        </FadeIn>
      </section>

      {/* ── RESULTS ──────────────────────────────── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="bg-[#0f0f0f] text-white rounded-2xl p-8 md:p-14">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                03 / The results
              </span>
            </div>

            {/* Results table */}
            <div className="border-t border-white/[0.12] mb-10">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 border-b border-white/[0.08] py-5 items-center"
                >
                  <p className="text-sm text-white/50">{r.metric}</p>
                  <p className="text-sm text-white/30 line-through">{r.before}</p>
                  <p className="text-sm font-semibold" style={{ color: "#4ade80" }}>{r.after}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/[0.12]">
              {[
                { num: "$180K", unit: "saved", label: "Annual labor cost reduction from automated invoice processing, reconciliation, and follow-ups." },
                { num: "$90K", unit: "recovered", label: "Faster collections from 47-day to 28-day average. Cash that was always owed, now arriving sooner." },
                { num: "<5", unit: "months", label: "Time to full payback. The system covered its own cost before the first quarter was out." },
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
                  04 / How we built it
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(28px,4vw,52px)] font-black text-black leading-[1.05] tracking-tight">
                8 weeks. Real invoices from week three.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                No sandbox. FinPilot processed live data from the first sprint. Edge cases found
                in production are better than ones found in a demo.
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
              05 / The stack
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
