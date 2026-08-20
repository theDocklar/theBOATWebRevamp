"use client";

import { ArrowUpRight } from "lucide-react";
import FadeIn from "./FadeIn";

const ACC = "#D9543C";

const techTags = [
  "Next.js + tRPC", "Linear", "Notion", "n8n + Make", "HubSpot", "Stripe", "Claude / OpenAI",
];

const railItems = [
  {
    n: "01",
    t: "Co-build, not ship-and-forget.",
    s: "We embed for 6–10 weeks, ship a real v1, and hand over the keys, not a deck.",
  },
  {
    n: "02",
    t: "Narrow agents, not chat boxes.",
    s: "Inbound triage, billing recovery, lead routing, weekly digests: agents that act, not chat.",
  },
  {
    n: "03",
    t: "Native to your tools.",
    s: "Linear, Notion, HubSpot, Stripe, Slack, Gmail, Airtable: wired via 20+ named flows.",
  },
  {
    n: "04",
    t: "You own the running system.",
    s: "Built on your infra. No vendor lock-in. Source, agent prompts and credentials, handed over.",
  },
];

const discoverCards = [
  { title: "Pricing page v2 · tier names test", meta: "Validation agent · 38% signup lift", av: "c" },
  { title: "B2B onboarding · Slack-first?", meta: "12 customer calls · spec drafting", av: "a" },
];

const buildCards = [
  { title: "Stripe → HubSpot deal sync", pct: 78, meta: "Imran · staging", av: "a" },
  { title: "Inbound triage agent (Gmail)", pct: 52, meta: "Hira · dev", av: "b" },
  { title: "Founder weekly digest", pct: 30, meta: "Saif · spec", av: "c" },
];

const shippedCards = [
  { title: "Lead router v1", meta: "Mon · 184 leads / 4 reps", av: "a" },
  { title: "Quote → invoice in 1 click", meta: "Wed · 14 deals / day", av: "b" },
];

const avatarGrad: Record<string, string> = {
  a: "linear-gradient(135deg,#1B3A6B,#5b8fd9)",
  b: "linear-gradient(135deg,#6a1f1f,#d97757)",
  c: "linear-gradient(135deg,#1f3f2a,#6ba07a)",
};

const autoFlows = [
  { ico: "L", icoColor: "#1B3A6B", label: "Linear ticket → spec brief", sub: "Claude · Notion", status: "312 ✓", statusColor: "#2E7D3B", statusBg: "rgba(46,125,59,0.14)" },
  { ico: "S", icoColor: ACC, label: "Stripe failed → revive ping", sub: "Stripe · HubSpot", status: "running", statusColor: "#1B3A6B", statusBg: "rgba(27,58,107,0.14)" },
  { ico: "G", icoColor: "#2E7D3B", label: "Gmail triage → reply draft", sub: "Gmail · Claude", status: "84 ✓", statusColor: "#2E7D3B", statusBg: "rgba(46,125,59,0.14)" },
  { ico: "A", icoColor: "#B5651D", label: "Airtable lead → SDR route", sub: "Airtable · Slack", status: "queued · 6", statusColor: "#92856a", statusBg: "rgba(92,88,77,0.14)" },
];

export default function ProductSection() {
  return (
    <section className="bg-[#eeeae4] py-0 pb-0">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-24 md:pb-32">
        <FadeIn>
          <div
            className="relative rounded-2xl overflow-hidden isolate"
            style={{ background: "#0f0f0f" }}
          >
            {/* Radial gradient glows */}
            <div
              className="absolute inset-0 pointer-events-none -z-10"
              style={{
                background: [
                  "radial-gradient(900px 500px at 92% 6%, rgba(217,84,60,0.18) 0%, transparent 60%)",
                  "radial-gradient(700px 600px at 0% 100%, rgba(232,184,74,0.12) 0%, transparent 55%)",
                  "radial-gradient(500px 380px at 40% 60%, rgba(27,58,107,0.24) 0%, transparent 65%)",
                ].join(", "),
              }}
            />

            <div className="p-8 md:p-14">
              {/* Header */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: ACC,
                        boxShadow: `0 0 0 4px rgba(217,84,60,0.18)`,
                      }}
                    />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/55">
                      03 / Product &amp; automation
                    </span>
                  </div>
                  <h2
                    className="font-black leading-[0.94] tracking-tight text-white"
                    style={{ fontSize: "clamp(38px,5.5vw,80px)" }}
                  >
                    Build what&apos;s
                    <br />
                    <span
                      className="italic font-normal"
                      style={{ fontFamily: "Georgia, serif", color: ACC }}
                    >
                      unclear
                    </span>
                    . Automate
                    <br />
                    what&apos;s{" "}
                    <span
                      className="italic font-normal"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      already obvious
                    </span>
                    .
                  </h2>
                </div>

                <div className="text-white/75 leading-relaxed md:pt-10" style={{ fontSize: "clamp(15px,1.3vw,18px)" }}>
                  <p>
                    We{" "}
                    <span className="text-white font-medium">co-build products</span> when
                    validation is uncertain, and{" "}
                    <span className="text-white font-medium">architect automations</span> when
                    execution is the only blocker.
                  </p>
                  <p className="mt-4">
                    Early-stage teams and ambitious SMBs come to us with manual chaos. They leave
                    with{" "}
                    <a
                      href="/services/ai-automation"
                      className="text-white font-medium underline decoration-white/30 hover:decoration-white/70 transition-colors"
                    >
                      lean, AI-powered workflows
                    </a>{" "}
                    that ship features and run operations while their founders sleep.
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="grid lg:grid-cols-[1.5fr_1fr] gap-7">

                {/* Console mock */}
                <div className="relative">
                  <div className="bg-[#FAF7EE] text-black rounded-xl overflow-hidden border border-white/[0.08] flex flex-col">
                    {/* Chrome bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.08] bg-white/60">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-black/[0.18]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-black/[0.18]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-black/[0.18]" />
                      </div>
                      <span className="ml-2.5 flex-1 font-mono text-[11px] text-black/40">
                        console.theboat.io / pier · sprint 03 of 06
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider"
                        style={{ background: "rgba(217,84,60,0.14)", color: "#a8341e" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACC }} />
                        4 agents · live
                      </span>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-white border-b border-black/[0.08] px-4 overflow-x-auto">
                      {[
                        { label: "Build pipeline", count: "7", active: true },
                        { label: "Automations", count: "23", active: false },
                        { label: "Runs", count: "1.2k / 24h", active: false },
                      ].map((tab) => (
                        <div
                          key={tab.label}
                          className="flex-shrink-0 px-3 py-3 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap"
                          style={{
                            color: tab.active ? "#0f0f0f" : "rgba(0,0,0,0.35)",
                            borderBottom: tab.active ? "2px solid #0f0f0f" : "2px solid transparent",
                            marginBottom: -1,
                          }}
                        >
                          {tab.label}{" "}
                          <span style={{ color: "rgba(0,0,0,0.35)", marginLeft: 4 }}>· {tab.count}</span>
                        </div>
                      ))}
                      <div className="ml-auto flex-shrink-0 px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-black/30 whitespace-nowrap">
                        + new flow
                      </div>
                    </div>

                    {/* Build pipeline — 3 columns */}
                    <div className="grid grid-cols-3 gap-3 p-4 bg-[#FAF7EE]">
                      {/* Discover */}
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-black/35">Discover</span>
                          <span className="font-mono text-[10px] text-black/30">2</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {discoverCards.map((c) => (
                            <div
                              key={c.title}
                              className="rounded-lg p-2.5"
                              style={{
                                background: "#F5EFDF",
                                border: "1px dashed rgba(14,14,12,0.22)",
                              }}
                            >
                              <p className="text-[11.5px] font-semibold leading-snug text-black/60">{c.title}</p>
                              <div className="flex items-center gap-1.5 mt-2">
                                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: avatarGrad[c.av] }} />
                                <span className="font-mono text-[9px] uppercase tracking-wider text-black/35 truncate">{c.meta}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* In Build */}
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-black/35">In build</span>
                          <span className="font-mono text-[10px] text-black/30">wk 3/6</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {buildCards.map((c) => (
                            <div
                              key={c.title}
                              className="bg-white rounded-lg p-2.5"
                              style={{ border: "1px solid rgba(0,0,0,0.08)", borderLeft: "3px solid #1B3A6B" }}
                            >
                              <p className="text-[11.5px] font-semibold leading-snug">
                                <span
                                  className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
                                  style={{ background: "#1B3A6B" }}
                                />
                                {c.title}
                              </p>
                              <div className="mt-2 h-1 bg-black/[0.06] rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: "#1B3A6B" }} />
                              </div>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: avatarGrad[c.av] }} />
                                <span className="font-mono text-[9px] uppercase tracking-wider text-black/35 truncate">{c.meta}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipped */}
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-black/35">Shipped · wk</span>
                          <span className="font-mono text-[10px] text-black/30">2</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {shippedCards.map((c) => (
                            <div
                              key={c.title}
                              className="rounded-lg p-2.5"
                              style={{
                                background: "#F0F4ED",
                                border: "1px solid rgba(46,93,58,0.28)",
                              }}
                            >
                              <p className="text-[11.5px] font-semibold leading-snug">
                                {c.title}{" "}
                                <span style={{ color: "#2E7D3B", fontWeight: 700 }}>✓</span>
                              </p>
                              <div className="flex items-center gap-1.5 mt-2">
                                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: avatarGrad[c.av] }} />
                                <span className="font-mono text-[9px] uppercase tracking-wider text-black/35 truncate">{c.meta}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Automation runs */}
                    <div className="bg-white border-t border-black/[0.08] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-[12px] font-semibold tracking-tight">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#2E7D3B", boxShadow: "0 0 0 3px rgba(46,125,59,0.18)" }} />
                          Live automations
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-black/35">last 24h · 1,247 runs · 99.6% ok</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {autoFlows.map((f) => (
                          <div
                            key={f.label}
                            className="grid items-center gap-2.5 p-2.5 rounded-lg border border-black/[0.06] bg-[#FAF7EE]"
                            style={{ gridTemplateColumns: "1fr auto" }}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center font-mono text-[9px] font-bold text-white"
                                style={{ background: f.icoColor }}
                              >
                                {f.ico}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[11px] font-medium truncate leading-tight">{f.label}</span>
                                <span className="block font-mono text-[9px] uppercase tracking-wider text-black/35 mt-0.5">{f.sub}</span>
                              </span>
                            </div>
                            <span
                              className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                              style={{ background: f.statusBg, color: f.statusColor }}
                            >
                              {f.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI overlay tags */}
                  <div
                    className="hidden lg:block absolute top-[20%] -right-3 z-10"
                    style={{ background: "rgba(20,20,23,0.94)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", maxWidth: 220, backdropFilter: "blur(6px)" }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span style={{ color: ACC, marginRight: 6 }}>●</span>Validation agent
                    </p>
                    <p className="text-[12px] text-white leading-snug">
                      Tier-name test hit{" "}
                      <b style={{ color: ACC }}>38% signup lift</b> at p&lt;0.05.
                      Promoting "Pricing v2" to In Build →
                    </p>
                  </div>

                  <div
                    className="hidden lg:block absolute top-[50%] -left-3 z-10"
                    style={{ background: "rgba(20,20,23,0.94)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", maxWidth: 220, backdropFilter: "blur(6px)" }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span style={{ color: ACC, marginRight: 6 }}>●</span>Spec agent
                    </p>
                    <p className="text-[12px] text-white leading-snug">
                      Drafted PRD for{" "}
                      <b style={{ color: ACC }}>Inbound triage</b> from 14 sales transcripts. 3 edge cases flagged.
                    </p>
                  </div>

                  <div
                    className="hidden lg:block absolute bottom-[8%] right-[8%] z-10"
                    style={{ background: "rgba(20,20,23,0.94)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", maxWidth: 200, backdropFilter: "blur(6px)" }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span style={{ color: ACC, marginRight: 6 }}>●</span>Ops agent
                    </p>
                    <p className="text-[12px] text-white leading-snug">
                      Revived{" "}
                      <b style={{ color: ACC }}>$28,400</b> in failed Stripe charges this week via timed retry + WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Side rail */}
                <div className="flex flex-col gap-4">
                  {/* Stat */}
                  <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-white/55">
                      Avg manual hours killed · per month
                    </p>
                    <p className="font-bold tracking-tight leading-none mt-2" style={{ fontSize: "clamp(40px,4vw,58px)" }}>
                      <span style={{ color: ACC }}>1,240</span>
                      <span className="text-[0.36em] text-white/50 font-medium ml-1">hrs</span>
                    </p>
                    <p className="text-[13px] text-white/70 mt-3 leading-[1.45]">
                      Across the last 9 SMBs we rewired, work that used to need a hire or two, now runs unattended.
                    </p>
                    <div
                      className="mt-4 grid items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/50"
                      style={{ gridTemplateColumns: "1fr auto 1fr" }}
                    >
                      <span>Manual chaos</span>
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>→</span>
                      <span className="text-right" style={{ color: ACC }}>Lean &amp; automated</span>
                    </div>
                  </div>

                  {/* Mode toggle */}
                  <div
                    className="grid grid-cols-2 rounded-xl p-1.5 gap-1"
                    style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {[
                      { num: "Mode 01", label: "Co-build", active: true },
                      { num: "Mode 02", label: "Automate", active: false },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg px-3.5 py-3 cursor-default"
                        style={
                          m.active
                            ? { background: "rgba(217,84,60,0.18)", boxShadow: `inset 0 0 0 1px rgba(217,84,60,0.35)` }
                            : {}
                        }
                      >
                        <p
                          className="font-mono text-[10px] uppercase tracking-wider"
                          style={{ color: m.active ? ACC : "rgba(255,255,255,0.4)" }}
                        >
                          {m.num}
                        </p>
                        <p className="text-[13px] font-medium text-white mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Feature list */}
                  <div className="rounded-xl flex-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {railItems.map((item) => (
                      <div
                        key={item.n}
                        className="grid gap-3.5 px-6 py-5 border-t border-white/[0.08] first:border-t-0"
                        style={{ gridTemplateColumns: "28px 1fr" }}
                      >
                        <span className="font-mono text-[10px] text-white/50 pt-0.5">{item.n}</span>
                        <div>
                          <p className="text-[14px] font-medium text-white leading-snug">{item.t}</p>
                          <p className="text-[12px] text-white/55 mt-1 leading-[1.45]">{item.s}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                className="mt-9 pt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}
              >
                <div className="flex flex-wrap gap-2">
                  {techTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full"
                      style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2.5 shrink-0">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium text-white transition-colors duration-150"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "")}
                  >
                    See product work
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold transition-colors duration-150"
                    style={{ background: ACC, color: "#14140f" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#e86a52")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = ACC)}
                  >
                    Audit my ops <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
