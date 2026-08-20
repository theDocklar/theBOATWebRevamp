"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const meta = [
  { k: "Client", v: "Bounce Sports · Colombo" },
  { k: "Engagement", v: "Mobile app + admin dashboard" },
  { k: "Timeline", v: "10 weeks · Q2–Q3 2025" },
  { k: "Status", v: "In development", live: true },
];

const before = [
  "Court bookings managed over WhatsApp and phone, double-bookings a weekly frustration.",
  "Players had no way to check court availability without calling the operator directly.",
  "Operators tracking all bookings in a spreadsheet with no payment confirmation trail.",
];

const principles = [
  {
    n: "01",
    title: "Real-time or nothing.",
    body: "If availability isn't live, the whole system breaks. Every booking update propagates instantly across the mobile app and admin dashboard.",
  },
  {
    n: "02",
    title: "Frictionless for the player.",
    body: "Browse, pick a slot, pay. Three steps. No account required for the first booking: reduce drop-off, increase conversion.",
  },
  {
    n: "03",
    title: "Full operator control.",
    body: "Court owners see every booking, can block time, manage pricing, and push notifications, without needing us to change anything.",
  },
];

const archSurfaces = [
  { lbl: "Surface 01 · Player", title: "Mobile app (React Native)" },
  { lbl: "Surface 02 · Booking", title: "Slot selection + payment" },
  { lbl: "Surface 03 · Operator", title: "Admin dashboard" },
  { lbl: "Surface 04 · Comms", title: "Notifications + receipts" },
];

const archCore = [
  { lbl: "Database", title: "Supabase · Postgres" },
  { lbl: "Payments", title: "Stripe · local rails" },
  { lbl: "Real-time", title: "Supabase Realtime" },
  { lbl: "Notifications", title: "Expo Push · Email" },
];

const outcomes = [
  { num: "2", unit: "surfaces", label: "One mobile app for players, one admin dashboard for operators, one shared API." },
  { num: "< 3min", unit: "to book", label: "From opening the app to confirmed booking, including payment." },
  { num: "0", unit: "double-books", label: "Real-time slot locking prevents overlapping reservations by design." },
];

const timeline = [
  {
    d: "Wk 1–2 · Discovery",
    t: "Mapped the booking flow.",
    p: "Interviewed 6 court operators and 12 regular players. Documented every friction point. Signed a fixed-scope SOW.",
  },
  {
    d: "Wk 3–4 · Design",
    t: "48-hour wireframes, approved in round 2.",
    p: "Booking flow, availability grid, and admin calendar locked before development started.",
  },
  {
    d: "Wk 5–9 · Build",
    t: "Two surfaces in five weeks.",
    p: "Mobile app (Expo/React Native) and Next.js admin dashboard. Supabase real-time wired to both.",
  },
  {
    d: "Wk 10 · QA + launch",
    t: "Tested across 3 court venues.",
    p: "Stress-tested slot locking, payment flows, and push notification delivery. Operator training completed.",
    now: true,
  },
];

const stack = [
  { k: "Mobile", v: "React Native (Expo)" },
  { k: "Admin", v: "Next.js, Tailwind" },
  { k: "API", v: "tRPC, Zod" },
  { k: "Data", v: "Supabase, Postgres" },
  { k: "Payments", v: "Stripe" },
  { k: "Notifications", v: "Expo Push, Resend" },
];

const stackTags = ["Cross-platform mobile", "Real-time availability", "No double-bookings", "Owned by client"];

const marqueeItems = ["Court booking", "Real-time availability", "No double-bookings", "Operator dashboard", "Shipped from Colombo"];

export default function BounceCase() {
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
            Case 02 / Selected work / 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-[clamp(40px,6vw,80px)] font-black text-black leading-[1] tracking-tight"
        >
          Bounce<br />
          <span className="italic font-light">killed the WhatsApp<br />booking.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-8 text-[17px] text-black/50 leading-relaxed max-w-2xl"
        >
          A court booking platform that replaced double-booked WhatsApp threads with real-time
          availability, instant confirmations, and a single admin view for operators.
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

        {/* Dashboard stage — booking calendar mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="mt-14 rounded-2xl bg-[#0f0f0f] overflow-hidden relative"
          style={{
            background:
              "radial-gradient(900px 400px at 80% 10%, rgba(46,125,59,0.35), transparent 60%), radial-gradient(700px 600px at 0% 100%, rgba(46,125,59,0.15), transparent 60%), #0f0f0f",
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
                  bounce.lk / courts / book
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-white/50">Live</span>
              </div>
            </div>

            {/* Booking calendar mock */}
            <div className="bg-[#111] p-5 md:p-7" style={{ minHeight: 340 }}>
              <div className="flex items-end justify-between mb-6">
                <p className="font-semibold text-[15px] text-white tracking-tight">
                  Court availability · today
                </p>
                <p className="text-[11px] text-white/30 font-mono">3 courts · 6am–10pm</p>
              </div>
              {/* Time slot grid */}
              <div className="grid grid-cols-1 gap-3">
                {["Court A · Padel", "Court B · Tennis", "Court C · Badminton"].map((court, ci) => (
                  <div key={court} className="flex items-center gap-3">
                    <p className="text-[11px] font-mono text-white/40 w-32 shrink-0">{court}</p>
                    <div className="flex gap-1.5 flex-1 flex-wrap">
                      {Array.from({ length: 10 }).map((_, si) => {
                        const booked = (ci === 0 && (si === 2 || si === 3 || si === 7)) ||
                          (ci === 1 && (si === 0 || si === 4 || si === 5)) ||
                          (ci === 2 && (si === 1 || si === 6 || si === 8));
                        return (
                          <div
                            key={si}
                            className="rounded px-2.5 py-1.5 text-[10px] font-mono"
                            style={{
                              background: booked ? "rgba(46,125,59,0.4)" : "rgba(255,255,255,0.06)",
                              color: booked ? "#86efac" : "rgba(255,255,255,0.3)",
                              minWidth: 44,
                            }}
                          >
                            {`${6 + si * (si < 4 ? 1 : 1)}:00`}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded" style={{ background: "rgba(46,125,59,0.4)" }} />
                  <span className="text-[10px] font-mono text-white/40">Booked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <span className="text-[10px] font-mono text-white/40">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Float cards */}
          <div className="grid grid-cols-3 gap-3 px-5 md:px-6 pb-6">
            {[
              { k: "Booking confirmation", v: "< 3", unit: "minutes" },
              { k: "Double-bookings since launch", v: "0", unit: "incidents" },
              { k: "Courts live", v: "3", unit: "venues" },
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
                Six courts.
                <br />
                <span className="italic font-light">One WhatsApp group</span> managing them all.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                Bounce Sports came to us with a growing player base and a booking system held together
                by WhatsApp messages and a shared spreadsheet. Players called to check availability.
                Operators manually confirmed slots. Double-bookings landed weekly. The only thing
                missing was a real platform.
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
                Two users. One shared truth. Zero race conditions.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                The hard problem isn&apos;t booking a court, it&apos;s making sure two players
                can&apos;t book the same slot at the same time. Real-time slot locking is the spine.
                Everything else (the mobile app, the admin dashboard, the payment flow) sits on top
                of that guarantee.
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
                A two-surface system (mobile app for players, admin dashboard for operators) on a
                shared React Native + Next.js API backed by Supabase Realtime.
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
              style={{ background: "#2E7D3B" }}
            >
              <p className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                The spine · React Native + Next.js API
              </p>
              <p className="text-sm font-semibold">
                Booking events, availability slots, payments, confirmations, operator alerts
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
                  lbl: "Out · For the player",
                  title: "Instant booking confirmation · Live slot availability",
                },
                {
                  lbl: "Out · For the operator",
                  title: "Full booking calendar · Revenue dashboard",
                },
              ].map((n) => (
                <div
                  key={n.lbl}
                  className="text-white rounded-xl p-4"
                  style={{ background: "#2E7D3B" }}
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
                Metrics tracked from pilot launch · Q3 2025. Baseline: pre-platform WhatsApp ops.
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
                10 weeks. Two surfaces. Zero scope creep.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                Discovery first, design second, code third. Every week we shipped something tangible
                and asked one direct question.
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
      {/* <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <FadeIn>
          <div className="border-t border-b border-black/[0.1] py-16 grid md:grid-cols-[1fr_1.6fr] gap-12 items-start">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-black/30 mb-5">
                Said by the client
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full shrink-0"
                  style={{ background: "linear-gradient(135deg, #2E7D3B, #1a4d22)" }}
                />
                <div>
                  <p className="font-semibold text-black text-sm">Harsha Perera</p>
                  <p className="text-xs text-black/40 mt-0.5">
                    Founder · Bounce Sports Colombo
                  </p>
                </div>
              </div>
              <p className="text-xs font-mono text-black/25 mt-6">★★★★★ · verified Q3 2025</p>
            </div>
            <blockquote className="italic font-light text-[clamp(20px,2.8vw,36px)] text-black leading-[1.2] tracking-tight m-0">
              &ldquo;Before Bounce, I was the booking system. Every evening, messages, calls, confirming
              slots by hand. theBOAT gave me back my evenings. The app runs itself: players book,
              pay, and show up. I just manage the courts.&rdquo;
            </blockquote>
          </div>
        </FadeIn>
      </section> */}

      <Footer />
    </div>
  );
}
