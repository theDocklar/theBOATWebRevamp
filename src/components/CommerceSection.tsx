"use client";

import { ArrowUpRight } from "lucide-react";
import FadeIn from "./FadeIn";

const SHOPIFY_GREEN = "#95BF47";

const techTags = [
  "Shopify Plus", "Hydrogen", "n8n + Make", "Klaviyo", "OpenAI / Claude", "Stripe",
];

const railItems = [
  {
    n: "01",
    t: "Headless or themed — we ship both.",
    s: "Hydrogen + Next.js for ambitious catalogs. Tuned Dawn for fast-shipping operators.",
  },
  {
    n: "02",
    t: "AI agents, not chatbots.",
    s: "Inventory, pricing, creative testing, cart recovery — narrow agents that act, not chat.",
  },
  {
    n: "03",
    t: "Glued to your stack.",
    s: "Klaviyo, Notion, Airtable, Stripe, Aramex, DHL — talked to via 12+ named flows.",
  },
  {
    n: "04",
    t: "Owned, not rented.",
    s: "No bespoke vendor lock-in. Agents run on your infra. Keys handed over on day one.",
  },
];

export default function CommerceSection() {
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
                  "radial-gradient(900px 500px at 92% 6%, rgba(149,191,71,0.16) 0%, transparent 60%)",
                  "radial-gradient(700px 600px at 0% 100%, rgba(217,84,60,0.15) 0%, transparent 55%)",
                  "radial-gradient(500px 380px at 60% 70%, rgba(27,58,107,0.18) 0%, transparent 65%)",
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
                        background: SHOPIFY_GREEN,
                        boxShadow: `0 0 0 4px rgba(149,191,71,0.18)`,
                      }}
                    />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/55">
                      04 / Commerce intelligence
                    </span>
                  </div>
                  <h2
                    className="font-black leading-[0.94] tracking-tight text-white"
                    style={{ fontSize: "clamp(42px,6vw,88px)" }}
                  >
                    Stores that
                    <br />
                    <span
                      className="italic font-normal"
                      style={{ fontFamily: "Georgia, serif", color: SHOPIFY_GREEN }}
                    >
                      read
                    </span>{" "}
                    the room.
                    <br />
                    <span
                      className="italic font-normal"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      And restock it.
                    </span>
                  </h2>
                </div>

                <div className="text-white/75 leading-relaxed md:pt-10" style={{ fontSize: "clamp(15px,1.3vw,18px)" }}>
                  <p>
                    We build{" "}
                    <span className="text-white font-medium">Shopify storefronts</span>{" "}
                    wired to an automation spine — and quietly retrofit them with{" "}
                    <span className="text-white font-medium">AI agents</span> that watch
                    inventory, prices, customers and creative all day.
                  </p>
                  <p className="mt-4">
                    The store sells. The system{" "}
                    <span className="text-white font-medium">tunes the store</span>. You
                    read the dashboard with your morning coffee.
                  </p>
                </div>
              </div>

              {/* Body: mock + rail */}
              <div className="grid lg:grid-cols-[1.5fr_1fr] gap-7">

                {/* Mock store admin */}
                <div className="relative">
                  <div className="bg-[#FAF7EE] text-black rounded-xl overflow-hidden border border-white/[0.08] flex flex-col min-h-[460px]">
                    {/* Chrome bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.08] bg-white/60">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-black/[0.18]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-black/[0.18]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-black/[0.18]" />
                      </div>
                      <span className="ml-2.5 flex-1 font-mono text-[11px] text-black/40">
                        admin.shopify.com / teragon / overview
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider"
                        style={{ background: "rgba(149,191,71,0.16)", color: "#4a7a16" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "#5fa61d" }}
                        />
                        3 agents · live
                      </span>
                    </div>

                    <div className="p-6 flex flex-col gap-5 flex-1">
                      <div className="flex justify-between items-end">
                        <span className="font-semibold text-[17px] tracking-tight">Sales · last 7 days</span>
                        <span className="text-[11px] font-mono text-black/35">refreshed 38s ago</span>
                      </div>

                      {/* KPIs */}
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          { k: "Revenue", v: "$48,210", d: "▲ 22% wow", warn: false },
                          { k: "Orders", v: "312", d: "▲ 41 vs avg", warn: false },
                          { k: "Abandoned", v: "11.4%", d: "▼ −4.1 pts · agent active", warn: true },
                        ].map((kpi) => (
                          <div
                            key={kpi.k}
                            className="bg-white border border-black/[0.06] rounded-lg p-3"
                          >
                            <p className="font-mono text-[9px] uppercase tracking-wider text-black/40">{kpi.k}</p>
                            <p className="text-[20px] font-bold tracking-tight leading-none mt-1">{kpi.v}</p>
                            <p
                              className="font-mono text-[10px] mt-1"
                              style={{ color: kpi.warn ? "#B5651D" : "#2E7D3B" }}
                            >
                              {kpi.d}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Product table */}
                      <div className="bg-white border border-black/[0.06] rounded-lg overflow-hidden text-[12px]">
                        <div className="grid grid-cols-4 px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-black/35 border-b border-black/[0.06]">
                          <span>Top product</span>
                          <span>Stock</span>
                          <span>Sold · wk</span>
                          <span>AI signal</span>
                        </div>
                        {[
                          {
                            swatch: "linear-gradient(135deg,#5a3b1e,#c89760)",
                            name: "Cask 014 · 12yr",
                            stock: "92",
                            sold: "184",
                            signal: "restock in 6d",
                            signalColor: "#B5651D",
                          },
                          {
                            swatch: "linear-gradient(135deg,#1f3f2a,#6ba07a)",
                            name: "Botanica Reserve",
                            stock: "218",
                            sold: "71",
                            signal: "price test +12%",
                            signalColor: "#2E7D3B",
                          },
                          {
                            swatch: "linear-gradient(135deg,#6a1f1f,#d97757)",
                            name: "Saffron 8yr",
                            stock: "14",
                            sold: "22",
                            signal: "cap PPC spend",
                            signalColor: "#B23A2C",
                          },
                        ].map((row) => (
                          <div
                            key={row.name}
                            className="grid grid-cols-4 px-4 py-2.5 border-t border-black/[0.06] items-center"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-5 h-5 rounded flex-shrink-0"
                                style={{ background: row.swatch }}
                              />
                              <span className="truncate">{row.name}</span>
                            </div>
                            <span>{row.stock}</span>
                            <span>{row.sold}</span>
                            <span style={{ color: row.signalColor }}>{row.signal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI overlay tags — hidden on small screens, shown lg+ */}
                  <div
                    className="hidden lg:block absolute top-[22%] -right-3 z-10"
                    style={{
                      background: "rgba(20,20,23,0.94)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      maxWidth: 220,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span style={{ color: SHOPIFY_GREEN, marginRight: 6 }}>●</span>Inventory agent
                    </p>
                    <p className="text-[12px] text-white leading-snug">
                      Cask 014 will{" "}
                      <b style={{ color: SHOPIFY_GREEN }}>stock out in 6 days</b> at current
                      velocity. Drafted PO to distillery — review in Notion →
                    </p>
                  </div>

                  <div
                    className="hidden lg:block absolute top-[54%] -left-3 z-10"
                    style={{
                      background: "rgba(20,20,23,0.94)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      maxWidth: 220,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span style={{ color: SHOPIFY_GREEN, marginRight: 6 }}>●</span>Pricing agent
                    </p>
                    <p className="text-[12px] text-white leading-snug">
                      Botanica Reserve has{" "}
                      <b style={{ color: SHOPIFY_GREEN }}>0.8 price elasticity</b> in the UAE
                      segment. Testing +12% on 50% of traffic.
                    </p>
                  </div>

                  <div
                    className="hidden lg:block absolute bottom-[10%] right-[14%] z-10"
                    style={{
                      background: "rgba(20,20,23,0.94)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      maxWidth: 200,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span style={{ color: SHOPIFY_GREEN, marginRight: 6 }}>●</span>Cart-recovery
                    </p>
                    <p className="text-[12px] text-white leading-snug">
                      Recovered{" "}
                      <b style={{ color: SHOPIFY_GREEN }}>$3,180</b> this week via timed
                      WhatsApp + email nudges.
                    </p>
                  </div>
                </div>

                {/* Side rail */}
                <div className="flex flex-col gap-4">
                  {/* Stat */}
                  <div
                    className="rounded-xl p-6"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wider text-white/55">
                      Avg lift after retrofit
                    </p>
                    <p
                      className="font-bold tracking-tight leading-none mt-2"
                      style={{ fontSize: "clamp(40px,4vw,58px)", color: SHOPIFY_GREEN }}
                    >
                      +34
                      <span className="text-[0.36em] text-white/50 font-medium ml-1">%</span>
                    </p>
                    <p className="text-[13px] text-white/70 mt-3 leading-[1.45]">
                      Revenue per visitor across the last 6 Shopify stores we shipped + tuned.
                    </p>
                  </div>

                  {/* Feature list */}
                  <div
                    className="rounded-xl flex-1"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
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
                      style={{
                        border: "1px solid rgba(255,255,255,0.18)",
                        background: "rgba(255,255,255,0.04)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2.5 shrink-0">
                  <a
                    href="/stores"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium text-white transition-colors duration-150"
                    style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.background =
                        "rgba(255,255,255,0.06)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.background = "")
                    }
                  >
                    See commerce work
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold transition-colors duration-150"
                    style={{ background: SHOPIFY_GREEN, color: "#14140f" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.background = "#a9d35a")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.background = SHOPIFY_GREEN)
                    }
                  >
                    Audit my store <ArrowUpRight size={14} />
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
