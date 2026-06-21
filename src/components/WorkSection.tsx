"use client";

import { ArrowUpRight, Camera, Aperture } from "lucide-react";
import FadeIn, { FadeInStagger, StaggerItem } from "./FadeIn";

const projects = [
  {
    tag: "Finance automation",
    year: "2025",
    title: "FinPilot Autonomous finance ops for a 65 person creative agency.",
    desc: "Five agentic workflows replacing 2 weeks of monthly finance work. Human approval gates for anything material.",
    accent: "#ffffffff",
    href: "/work/finpilot",
    featured: true,
    url: "finpilot / northbridge · finance dashboard",
    mockAccent: "#0f5c45",
  },
  {
    tag: "Court booking app",
    year: "2025",
    title: "Bounce: Court bookings, reinvented.",
    desc: "Mobile app for players + admin dashboard for court operators. Real-time availability, instant confirmation.",
    accent: "#afafafff",
    href: "/work/bounce",
    featured: false,
  },
  {
    tag: "Product website + online store",
    year: "2025",
    title: "Hima Products: 30 feeders. One store.",
    desc: "Product website and online store for a Sri Lankan animal feeder company. Spec-forward catalog, direct-to-customer checkout, and dealer locator — replacing phone orders with a real purchase path.",
    accent: "#afafafff",
    href: "/work/hima",
    featured: false,
  },
  {
    tag: "Marketing analytics",
    year: "2025",
    title: "Troi: Real-time ROAS & ROI for every channel.",
    desc: "Channel-wise breakdown of ROAS and ROI against actual store sales. Built for SME marketing teams.",
    accent: "#afafafff",
    href: "/work/troi",
    featured: false,
  },
  {
    tag: "Luxury tour website",
    year: "2025",
    title: "OLYCE: Sri Lanka, without compromise.",
    desc: "Luxury tour booking website for a premium Sri Lanka travel brand. Editorial photography up front, full itineraries before the inquiry, Standard and Premium pricing in one view.",
    accent: "#afafafff",
    href: "/work/olyce",
    featured: false,
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="bg-[#eeeae4] py-24 md:py-32 border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
          <FadeIn>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-medium text-black/40 uppercase tracking-widest">
                Selected work
              </span>
            </div>
            <h2 className="text-[clamp(38px,5vw,68px)] font-black text-black leading-[0.95] tracking-tight">
              Real
              <br />
              systems
              <br />
              we&apos;ve
              <br />
              built.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="md:max-w-xs md:pt-16">
            <p className="text-[15px] text-black/50 leading-relaxed">
              What we've shipped. Some are products built with founders,
              some are systems built for operators — all of them start with
              a real problem.
            </p>
          </FadeIn>
        </div>

        {/* Featured project — FinPilot */}
        <FadeIn className="mb-4">
          <a
            href={projects[0].href}
            className="group block bg-white border border-black/[0.06] rounded-2xl p-7 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs text-black/30 font-mono">
                Featured · {projects[0].year}
              </span>
              <span className="text-xs font-medium text-white bg-[#f04b25] px-3 py-1.5 rounded-full">
                {projects[0].tag}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 max-w-lg leading-tight">
              {projects[0].title}
            </h3>
            <p className="text-sm text-black/40 mb-6">{projects[0].desc}</p>

            {/* Browser mockup */}
            <div className="bg-[#111] rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                <div className="flex-1 text-center text-xs text-white/30 font-mono">
                  {projects[0].url}
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2 h-28">
                <div className="grid grid-cols-4 gap-2 flex-1">
                  <div className="bg-[#0f5c45]/70 rounded-lg" />
                  <div className="bg-[#0f5c45]/40 rounded-lg" />
                  <div className="bg-white/[0.06] rounded-lg" />
                  <div className="bg-white/[0.06] rounded-lg" />
                </div>
                <div className="grid grid-cols-5 gap-2 flex-1">
                  <div className="bg-white/[0.06] rounded-lg" />
                  <div className="bg-[#0f5c45]/80 rounded-lg col-span-3" />
                  <div className="bg-white/[0.06] rounded-lg" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-5 text-sm font-medium group-hover:gap-2.5 transition-all duration-150" style={{ color: "#0f5c45" }}>
              Read case study
              <ArrowUpRight size={14} />
            </div>
          </a>
        </FadeIn>

        {/* Project grid — 2 columns × 2 rows */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {projects.slice(1).map((p) => (
            <StaggerItem key={p.href}>
              <a
                href={p.href}
                className="group flex flex-col bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-7 h-full hover:border-white/[0.12] transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                    {p.tag}
                  </span>
                  <span className="text-xs text-white/20 font-mono">{p.year}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-3 flex-1">
                  {p.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{p.desc}</p>

                <div
                  className="flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all duration-150"
                  style={{ color: p.accent }}
                >
                  Read case
                  <ArrowUpRight size={14} />
                </div>
              </a>
            </StaggerItem>
          ))}
        </FadeInStagger>

        {/* Stats card */}
        <FadeIn delay={0.15} className="mt-4">
          <div className="bg-[#f04b25] rounded-2xl p-7">
            <p className="text-xs text-white/60 uppercase tracking-widest mb-3">
              Avg outcome
            </p>
            <p className="text-xl font-semibold text-white mb-3">
              Manual hours saved per client, per month.
            </p>
            <div className="flex items-end gap-6">
              <div>
                <span className="text-5xl font-black text-white">38h</span>
                <span className="text-white/60 text-xs ml-2">/ month</span>
              </div>
              <div>
                <span className="text-5xl font-black text-white">7</span>
                <span className="text-white/60 text-xs ml-2">/ automations</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Creative studio divider */}
        <FadeIn delay={0.2} className="mt-12 mb-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-black/[0.1]" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/[0.1] bg-white/60">
              <Aperture size={12} className="text-black/30" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-black/35">
                Not just techy
              </span>
            </div>
            <div className="h-px flex-1 bg-black/[0.1]" />
          </div>
        </FadeIn>

        {/* Frames redirect card */}
        <FadeIn delay={0.22}>
          <a
            href="/frames"
            className="group relative block overflow-hidden rounded-2xl bg-[#0f0f0f] hover:bg-[#161616] transition-colors duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#f04b25]/[0.07] rounded-full blur-[80px]" />
              <div className="absolute -bottom-16 right-0 w-96 h-64 bg-[#f04b25]/[0.04] rounded-full blur-[80px]" />
            </div>

            <div className="relative p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Camera size={13} className="text-[#f04b25]" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/30">
                    Frames · Creative Studio
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                  We also{" "}
                  <span className="text-[#f04b25]">shoot, brand,</span>
                  <br className="hidden md:block" />
                  {" "}and{" "}
                  <span className="text-[#f04b25]">make things beautiful.</span>
                </h3>
                <p className="text-sm text-white/35 max-w-sm leading-relaxed mt-3">
                  Product photography, brand identities, lookbooks, packaging — the same
                  systems-first precision applied to creative work.
                </p>
              </div>

              <div className="flex items-center gap-5 shrink-0">
                <div className="hidden md:flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#F1ECDF]" />
                    <div className="w-10 h-10 rounded-lg bg-[#C9B89A]" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#7A6342]" />
                    <div className="w-10 h-10 rounded-lg bg-[#2C2418]" />
                  </div>
                </div>

                <div className="hidden md:block text-right pr-2">
                  <p className="text-3xl font-black text-white leading-none">18<span className="text-lg text-white/25 font-normal">+</span></p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mt-1">brands built</p>
                </div>

                <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/35 transition-all duration-200 shrink-0">
                  <ArrowUpRight size={18} className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
                </div>
              </div>
            </div>

            <div className="relative border-t border-white/[0.05] px-7 md:px-9 py-3 flex items-center gap-6 overflow-hidden">
              {["Product photography", "Brand identities", "Lookbooks", "Packaging & print", "Campaign content"].map((t, i) => (
                <span key={t} className={`text-[11px] font-mono uppercase tracking-widest whitespace-nowrap transition-colors duration-150 ${i === 0 ? "text-white/40 group-hover:text-white/60" : "text-white/20 group-hover:text-white/35"}`}>
                  {t} {i < 4 && <span className="ml-6 mr-0 text-white/10">·</span>}
                </span>
              ))}
            </div>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
