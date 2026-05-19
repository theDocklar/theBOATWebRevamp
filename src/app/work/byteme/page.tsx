"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const meta = [
  { k: "Client", v: "ByteMe · Colombo" },
  { k: "Engagement", v: "Web app + restaurant portal" },
  { k: "Timeline", v: "8 weeks · Q3 2025" },
  { k: "Status", v: "In build", live: true },
];

const before = [
  "Waitstaff overwhelmed during lunch rush. Orders misheard, re-taken, or dropped at busy tables.",
  "Paper menus with no way to show daily specials, sold-out items, or real-time pricing updates.",
  "Owners had no visibility into order throughput, popular items, or table turn times.",
];

const principles = [
  {
    n: "01",
    title: "Zero friction for the diner.",
    body: "Scan the QR, browse the menu, add to cart, confirm. No app download. No account. Works on any phone with a browser.",
  },
  {
    n: "02",
    title: "Real-time sync to the kitchen.",
    body: "Orders appear on the kitchen display the moment a table submits. No paper slips, no shouting across the pass.",
  },
  {
    n: "03",
    title: "Owner in control.",
    body: "Update the menu, mark items sold-out, set table QR codes, and see live order status — all from the restaurant portal.",
  },
];

const archSurfaces = [
  { lbl: "Surface 01 · Diner", title: "QR menu (PWA)" },
  { lbl: "Surface 02 · Ordering", title: "Cart + checkout" },
  { lbl: "Surface 03 · Kitchen", title: "Live kitchen display" },
  { lbl: "Surface 04 · Restaurant", title: "Admin portal" },
];

const archCore = [
  { lbl: "Menu", title: "Supabase · Postgres" },
  { lbl: "Real-time", title: "Supabase Realtime" },
  { lbl: "QR", title: "Dynamic QR per table" },
  { lbl: "Payments", title: "Stripe (optional)" },
];

const outcomes = [
  { num: "4", unit: "surfaces", label: "Customer PWA, order cart, live kitchen display, and restaurant admin — one system." },
  { num: "< 60s", unit: "order time", label: "From scanning the QR to order confirmed in the kitchen." },
  { num: "0", unit: "app installs", label: "The customer menu runs as a PWA — no download required, any device." },
];

const timeline = [
  {
    d: "Wk 1–2 · Discovery",
    t: "Shadowed the kitchen.",
    p: "Spent time in two restaurants during peak service. Mapped the full order journey from table to plate.",
  },
  {
    d: "Wk 3 · Design",
    t: "Wireframes in 48 hours.",
    p: "Customer menu flow and kitchen display locked. Restaurant admin scoped for V1.",
  },
  {
    d: "Wk 4–7 · Build",
    t: "Three surfaces in four weeks.",
    p: "Customer PWA, kitchen display (real-time), and restaurant portal. QR generation wired to table management.",
  },
  {
    d: "Wk 8 · Testing + handoff",
    t: "Tested with 2 restaurant pilots.",
    p: "Real service simulation with staff. Menu updates, sold-out flows, and peak load tested.",
    now: true,
  },
];

const stack = [
  { k: "Customer menu", v: "Next.js PWA" },
  { k: "Kitchen display", v: "Next.js, Supabase Realtime" },
  { k: "Admin portal", v: "Next.js, Tailwind" },
  { k: "Data", v: "Supabase, Postgres" },
  { k: "QR", v: "Dynamic per-table QR codes" },
  { k: "Payments", v: "Stripe (optional)" },
];

const stackTags = ["No app download", "Real-time kitchen sync", "Menu control", "Owned by client"];

const marqueeItems = ["Scan to order", "Real-time kitchen", "No app download", "Zero order errors", "Shipped from Colombo"];

export default function ByteMeCase() {
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
            Case 03 / Selected work / 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-[clamp(40px,6vw,80px)] font-black text-black leading-[1] tracking-tight"
        >
          ByteMe<br />
          <span className="italic font-light">scan. order.<br />no waiter needed.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-8 text-[17px] text-black/50 leading-relaxed max-w-2xl"
        >
          A QR-based dine-in ordering system that removes the order-taking bottleneck from busy
          restaurants — customers order at their own pace, kitchen gets it instantly.
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

        {/* Dashboard stage — QR ordering mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="mt-14 rounded-2xl overflow-hidden relative"
          style={{
            background:
              "radial-gradient(900px 400px at 80% 10%, rgba(232,93,4,0.3), transparent 60%), radial-gradient(700px 600px at 0% 100%, rgba(122,49,0,0.25), transparent 60%), #0f0f0f",
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
                  byteme.lk / table / 12
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-white/50">Live</span>
              </div>
            </div>

            {/* QR + menu mock */}
            <div className="bg-[#111] flex flex-col md:flex-row" style={{ minHeight: 340 }}>
              {/* Left: QR visual */}
              <div className="flex flex-col items-center justify-center p-8 md:w-52 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.06]">
                {/* QR simulation */}
                <div
                  className="w-24 h-24 rounded-lg p-2 mb-4"
                  style={{ background: "#fff" }}
                >
                  <div className="w-full h-full grid grid-cols-5 gap-0.5">
                    {Array.from({ length: 25 }).map((_, i) => {
                      const pattern = [1,1,1,1,0,1,0,0,1,0,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1];
                      return (
                        <div
                          key={i}
                          className="rounded-sm"
                          style={{ background: pattern[i] ? "#111" : "#fff" }}
                        />
                      );
                    })}
                  </div>
                </div>
                <p className="text-[10px] font-mono text-white/40 text-center">Table 12</p>
                <p className="text-[10px] font-mono text-white/25 text-center mt-0.5">Scan to order</p>
              </div>

              {/* Right: menu items */}
              <div className="flex-1 p-5 flex flex-col gap-3">
                <div className="flex items-end justify-between mb-1">
                  <p className="font-semibold text-[15px] text-white tracking-tight">
                    Today&apos;s menu
                  </p>
                  <p className="text-[11px] text-white/30 font-mono">Table 12 · 2 guests</p>
                </div>
                {[
                  { name: "Devilled Chicken", price: "LKR 950", tag: "Popular", available: true },
                  { name: "Kottu Roti", price: "LKR 750", tag: "Sold out", available: false },
                  { name: "Prawn Curry", price: "LKR 1,200", tag: "Chef's pick", available: true },
                  { name: "Short Eats Platter", price: "LKR 650", tag: "", available: true },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-md shrink-0"
                        style={{
                          background: item.available
                            ? "rgba(232,93,4,0.35)"
                            : "rgba(255,255,255,0.06)",
                        }}
                      />
                      <div>
                        <p
                          className="text-[13px] font-medium"
                          style={{ color: item.available ? "#fff" : "rgba(255,255,255,0.3)" }}
                        >
                          {item.name}
                        </p>
                        {item.tag && (
                          <p
                            className="text-[10px] font-mono mt-0.5"
                            style={{
                              color: item.available
                                ? "rgba(232,93,4,0.8)"
                                : "rgba(255,255,255,0.25)",
                            }}
                          >
                            {item.tag}
                          </p>
                        )}
                      </div>
                    </div>
                    <p
                      className="text-[13px] font-mono"
                      style={{ color: item.available ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)" }}
                    >
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Float cards */}
          <div className="grid grid-cols-3 gap-3 px-5 md:px-6 pb-6">
            {[
              { k: "Time to order confirmation", v: "< 60", unit: "seconds" },
              { k: "App installs required", v: "0", unit: "downloads" },
              { k: "Kitchen sync latency", v: "~1", unit: "second" },
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
                Busy lunch service.
                <br />
                <span className="italic font-light">One overworked waiter</span> and a paper menu.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                ByteMe came to us with a common restaurant problem: at peak service, orders get
                lost, misheard, or never taken. Staff were running between tables and the kitchen,
                paper menus couldn&apos;t reflect what was actually available, and owners had no idea
                which items were actually selling. The fix wasn&apos;t more staff — it was a better
                system.
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
                The waiter isn&apos;t the problem. The system is.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                The unit of work is an order event: a diner confirms a selection, it hits a
                real-time queue, the kitchen sees it instantly, and the table gets a confirmation.
                Everything we built — the QR menu, the kitchen display, the admin portal — is just
                the interface around that event. We mapped the kitchen workflow before we wireframed
                a single screen.
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
                Four surfaces on a shared Next.js + Supabase Realtime backbone — no app download
                required, orders in the kitchen in under a second.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border border-black/[0.1] rounded-2xl p-6 md:p-9 bg-white">
            {/* Surfaces row */}
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

            {/* Spine */}
            <div
              className="text-white rounded-xl p-4 text-center mb-4"
              style={{ background: "#E85D04" }}
            >
              <p className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                The spine · Next.js + Supabase Realtime
              </p>
              <p className="text-sm font-semibold">
                Order events, menu state, table sessions, kitchen queue, payment status
              </p>
            </div>

            <div className="text-center text-black/20 font-mono text-sm py-3">↓</div>

            {/* Core row */}
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

            {/* Output row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  lbl: "Out · For the diner",
                  title: "Scan → order → confirmation in under 60 seconds",
                },
                {
                  lbl: "Out · For the restaurant",
                  title: "Live order queue · Zero order errors · Menu control",
                },
              ].map((n) => (
                <div
                  key={n.lbl}
                  className="text-white rounded-xl p-4"
                  style={{ background: "#E85D04" }}
                >
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
              &ldquo;Our lunch rush was chaos. Now the kitchen knows every order before the waiter
              even walks back. We&apos;ve cut order errors to zero and table turn time is down by a
              third.&rdquo;
              <cite className="block not-italic text-sm text-black/40 font-normal mt-6 tracking-normal leading-normal">
                — Nuwan K. · Owner, ByteMe Colombo
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
                  What it replaced.
                </h2>
              </div>
              <p className="text-xs font-mono text-white/30 max-w-xs">
                Metrics from pilot service · Q3 2025. Baseline: pre-system peak service ops.
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
                8 weeks. Four surfaces. One shared queue.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                Kitchen first. Every design decision ran through the same question: does this make
                service faster or slower?
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
                  style={{ background: "linear-gradient(135deg, #7a3100, #E85D04)" }}
                />
                <div>
                  <p className="font-semibold text-black text-sm">Nuwan Kumara</p>
                  <p className="text-xs text-black/40 mt-0.5">
                    Owner · ByteMe Colombo
                  </p>
                </div>
              </div>
              <p className="text-xs font-mono text-black/25 mt-6">★★★★★ — verified Q3 2025</p>
            </div>
            <blockquote className="italic font-light text-[clamp(20px,2.8vw,36px)] text-black leading-[1.2] tracking-tight m-0">
              &ldquo;I thought I needed more staff. theBOAT told me I needed a better system. They
              were right. Customers scan, order, and the kitchen fires without anyone shouting across
              the room. We&apos;re running the same service with two fewer staff during peak.&rdquo;
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
              Up next / Case 04
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <a
            href="/work/troi"
            className="group grid md:grid-cols-[1fr_1.6fr] gap-8 items-end p-8 rounded-2xl border border-black/[0.08] bg-[#f5f2ed] hover:bg-[#0f0f0f] hover:border-[#0f0f0f] transition-all duration-300"
          >
            <div
              className="aspect-[4/3] rounded-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #3b1f6a, #7C3AED)" }}
            />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-black/30 group-hover:text-white/40 mb-3 transition-colors">
                Marketing analytics · 2025
              </p>
              <h2 className="text-[clamp(24px,3.5vw,52px)] font-black text-black group-hover:text-white leading-[1.05] tracking-tight transition-colors">
                Troi —<br />
                <span className="italic font-light">real-time ROAS</span><br />per channel.
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
