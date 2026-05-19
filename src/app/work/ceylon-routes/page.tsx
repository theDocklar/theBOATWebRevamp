"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn, { FadeInStagger, StaggerItem } from "@/components/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const meta = [
  { k: "Client", v: "Ceylon Routes · Colombo" },
  { k: "Engagement", v: "Mobile app + admin dashboard" },
  { k: "Timeline", v: "10 weeks · Q2 2025" },
  { k: "Status", v: "In build", live: true },
];

const before = [
  "Tour bookings handled entirely over WhatsApp. Travelers unsure if their booking was actually confirmed.",
  "Operators manually tracking guest counts, availability, and payments across chat threads and spreadsheets.",
  "No visibility into upcoming tours — operators discovered overbooking when guests arrived at the same time.",
];

const principles = [
  {
    n: "01",
    title: "Confirmation in seconds, not hours.",
    body: "When a traveler books, they see confirmation immediately. No waiting on a read receipt from a tour guide.",
  },
  {
    n: "02",
    title: "Operator dashboard, not an inbox.",
    body: "All bookings, upcoming tours, and guest details in one place. No digging through WhatsApp messages to prepare for tomorrow&apos;s tour.",
  },
  {
    n: "03",
    title: "Transparent availability.",
    body: "Travelers see real capacity in real time. Operators control it. Overbooking is structurally impossible.",
  },
];

const archSurfaces = [
  { lbl: "Surface 01 · Traveler", title: "Mobile app (React Native)" },
  { lbl: "Surface 02 · Catalogue", title: "Tour browsing + details" },
  { lbl: "Surface 03 · Booking", title: "Booking + payment flow" },
  { lbl: "Surface 04 · Operator", title: "Admin dashboard" },
];

const archCore = [
  { lbl: "Database", title: "Supabase · Postgres" },
  { lbl: "Payments", title: "Stripe · local rails" },
  { lbl: "Notifications", title: "Expo Push · Email · WhatsApp" },
  { lbl: "Real-time", title: "Supabase Realtime" },
];

const outcomes = [
  { num: "2", unit: "surfaces", label: "One traveler app and one operator dashboard — both on the same real-time backend." },
  { num: "Instant", unit: "confirmation", label: "Booking confirmed and notification sent to the operator the moment payment clears." },
  { num: "0", unit: "overbookings", label: "Capacity is enforced at the data layer — impossible to overbook by design." },
];

const timeline = [
  {
    d: "Wk 1–2 · Discovery",
    t: "Mapped the operator workflow.",
    p: "Interviewed 4 tour operators and 8 past travelers. Documented every friction point in the current WhatsApp process.",
  },
  {
    d: "Wk 3–4 · Design",
    t: "App flows wireframed in 48 hours.",
    p: "Booking flow, tour catalogue, and operator dashboard locked before development.",
  },
  {
    d: "Wk 5–9 · Build",
    t: "Two surfaces in five weeks.",
    p: "React Native traveler app and Next.js admin. Supabase Realtime wired for instant booking updates.",
  },
  {
    d: "Wk 10 · Testing + handoff",
    t: "Tested with 3 tour operators.",
    p: "Real availability, real bookings, notification delivery confirmed end-to-end.",
    now: true,
  },
];

const stack = [
  { k: "Mobile app", v: "React Native (Expo)" },
  { k: "Admin", v: "Next.js, Tailwind" },
  { k: "API", v: "tRPC, Zod" },
  { k: "Data", v: "Supabase, Postgres" },
  { k: "Payments", v: "Stripe" },
  { k: "Notifications", v: "Expo Push, Resend, WhatsApp BSP" },
];

const stackTags = ["Cross-platform mobile", "Real-time availability", "Instant confirmations", "Owned by client"];

const marqueeItems = [
  "Book your tour",
  "Real-time availability",
  "Instant confirmation",
  "Operators in control",
  "Built for Sri Lanka",
];

export default function CeylonRoutesCase() {
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
          Ceylon Routes<br />
          <span className="italic font-light">tours booked,<br />not WhatsApped.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-8 text-[17px] text-black/50 leading-relaxed max-w-2xl"
        >
          A tour booking platform for Sri Lanka. Travelers browse and book directly from a mobile
          app — operators get instant notifications and manage everything from a single dashboard.
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
              "radial-gradient(900px 400px at 80% 10%, rgba(3,105,161,0.45), transparent 60%), radial-gradient(700px 600px at 0% 100%, rgba(20,83,45,0.3), transparent 60%), #0f0f0f",
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
                  ceylonroutes.lk / operator / bookings
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[10px] text-white/50">In build</span>
              </div>
            </div>

            {/* Dashboard mock */}
            <div className="bg-[#0a0f14] flex" style={{ minHeight: 340 }}>
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-48 border-r border-white/[0.06] p-5 shrink-0">
                <p className="font-extrabold text-[15px] tracking-tight text-white mb-5">
                  ceylon<span className="text-[#0369A1]">.</span>
                </p>
                {["Bookings", "Tours · 18", "Availability", "Guests", "Payments", "Reports"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-[12px] mb-0.5 ${
                        i === 0
                          ? "bg-[#0369A1] text-white"
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
                    Upcoming tours — this week
                  </p>
                  <p className="text-[11px] text-white/30 font-mono">3 tours · 47 guests confirmed</p>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {[
                    { k: "New bookings", v: "12", d: "▲ 5 today" },
                    { k: "Total guests", v: "47", d: "across 3 tours" },
                    { k: "Revenue", v: "$3,240", d: "this week" },
                    { k: "Availability", v: "8 slots", d: "remaining" },
                  ].map((kpi) => (
                    <div
                      key={kpi.k}
                      className="bg-white/[0.05] border border-white/[0.08] rounded-lg p-3.5"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">
                        {kpi.k}
                      </p>
                      <p className="text-lg font-bold text-white tracking-tight">{kpi.v}</p>
                      <p className="text-[10px] text-teal-400 mt-0.5">{kpi.d}</p>
                    </div>
                  ))}
                </div>

                {/* Tour cards placeholder */}
                <div className="flex gap-3 flex-1">
                  {[
                    { name: "Ella Rock Trek", slots: "12/15", color: "#0369A1" },
                    { name: "Sigiriya Day Tour", slots: "8/20", color: "#0c4a6e" },
                    { name: "Galle Fort Walk", slots: "15/15", color: "#134e4a" },
                  ].map((tour) => (
                    <div
                      key={tour.name}
                      className="flex-1 rounded-lg p-3.5 border border-white/[0.08] flex flex-col justify-between"
                      style={{ background: tour.color + "33" }}
                    >
                      <p className="text-[11px] font-semibold text-white/80">{tour.name}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <div className="flex-1 h-1 rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-teal-400"
                            style={{
                              width: `${(parseInt(tour.slots.split("/")[0]) / parseInt(tour.slots.split("/")[1])) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-white/40 ml-1">{tour.slots}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Float cards */}
          <div className="grid grid-cols-3 gap-3 px-5 md:px-6 pb-6">
            {[
              { k: "Booking confirmation", v: "< 5", unit: "seconds" },
              { k: "Overbookings possible", v: "0", unit: "by design" },
              { k: "WhatsApp threads replaced", v: "∞", unit: "→ 1 dashboard" },
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
                Sri Lanka&apos;s tours are world-class.
                <br />
                <span className="italic font-light">The booking experience</span> was not.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                Ceylon Routes came to us with a clear mission: give travelers a proper way to
                discover and book tours across Sri Lanka. The existing process — WhatsApp messages,
                manual spreadsheets, and best-guess availability — was costing operators guests and
                costing travelers confidence. We set out to make the booking experience match the
                quality of the destination.
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
                Availability is a data problem, not a UI problem.
              </h2>
              <p className="mt-6 text-[16px] text-black/50 leading-relaxed">
                The real unit of work isn&apos;t a booking form — it&apos;s a capacity slot that has
                to be reserved atomically, trigger a payment, notify the operator, and send the
                traveler something they trust immediately. We built both surfaces on the same
                real-time backend so the operator dashboard and the traveler app are always
                looking at the same truth.
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
                Two surfaces — traveler mobile app and operator admin — running on a shared
                Supabase backend with real-time availability and instant payment notifications.
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
              style={{ background: "#0369A1" }}
            >
              <p className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">
                The spine · React Native + Next.js API
              </p>
              <p className="text-sm font-semibold">
                Tour listings, booking events, availability slots, payments, operator notifications
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
                  lbl: "Out · For the traveler",
                  title: "Instant booking confirmation · Tour details + itinerary",
                },
                {
                  lbl: "Out · For the operator",
                  title: "Live booking dashboard · Guest management · Revenue view",
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
              &ldquo;I used to manage thirty bookings a week across six WhatsApp threads. I missed
              three guests because two chat windows got confused. The dashboard makes that
              structurally impossible.&rdquo;
              <cite className="block not-italic text-sm text-black/40 font-normal mt-6 tracking-normal leading-normal">
                — Beta operator · Tour guide, Ella
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
                Tested with 3 tour operators. Real tours, real guests, end-to-end booking
                confirmed.
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
                &ldquo;No more overbooking. No more missed guests. One dashboard, one truth.&rdquo;
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
                10 weeks. Two surfaces. Operator workflows locked in week two.
              </h2>
              <p className="mt-4 text-[16px] text-black/50 leading-relaxed">
                We mapped the operator&apos;s day before designing a single screen. The flows were
                signed off before a single component existed.
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
                  style={{ background: "linear-gradient(135deg, #0369A1, #0c4a6e)" }}
                />
                <div>
                  <p className="font-semibold text-black text-sm">Beta operator</p>
                  <p className="text-xs text-black/40 mt-0.5">
                    Tour guide · Ella, Sri Lanka
                  </p>
                </div>
              </div>
              <p className="text-xs font-mono text-black/25 mt-6">★★★★★ — verified Q2 2025</p>
            </div>
            <blockquote className="italic font-light text-[clamp(20px,2.8vw,36px)] text-black leading-[1.2] tracking-tight m-0">
              &ldquo;Before this I had a WhatsApp group for each tour, a notes app for availability,
              and a spreadsheet for payments. Three things that never agreed with each other. Now
              there&apos;s one screen. A booking comes in, I see it instantly, the guest has
              confirmation before I even open the app. That&apos;s the difference.&rdquo;
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
              Up next / Case 01
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <a
            href="/work/sathkara"
            className="group grid md:grid-cols-[1fr_1.6fr] gap-8 items-end p-8 rounded-2xl border border-black/[0.08] bg-[#f5f2ed] hover:bg-[#0f0f0f] hover:border-[#0f0f0f] transition-all duration-300"
          >
            <div
              className="aspect-[4/3] rounded-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1b3a6b, #0d2347)" }}
            />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-black/30 group-hover:text-white/40 mb-3 transition-colors">
                Donor platform · 2025
              </p>
              <h2 className="text-[clamp(24px,3.5vw,52px)] font-black text-black group-hover:text-white leading-[1.05] tracking-tight transition-colors">
                Sathkara —<br />
                <span className="italic font-light">40 NGOs,</span><br />
                one feed.
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
