"use client";

import { Zap, GitBranch, Eye } from "lucide-react";
import FadeIn, { FadeInStagger, StaggerItem } from "./FadeIn";

export default function WhySection() {
  return (
    <section id="why" className="bg-[#0f0f0f] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
          <FadeIn>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-medium text-white/30 uppercase tracking-widest">
                — Why theBOAT
              </span>
            </div>
            <h2
              className="text-[clamp(38px,5vw,68px)] font-black text-white leading-[0.95] tracking-tight"
            >
              Built for
              <br />
              builders,
              <br />
              not just
              <br />
              buyers.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="md:max-w-xs md:pt-16">
            <p className="text-[15px] text-white/40 leading-relaxed">
              Most agencies disappear after the kickoff call. We stay in your Slack,
              know your stack, and we care about whether the thing we built actually worked.
            </p>
          </FadeIn>
        </div>

        {/* Bento grid */}
        <FadeInStagger className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* Transparent process */}
          <StaggerItem>
            <div className="bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors duration-200 h-full">
              <div className="w-8 h-8 rounded-full bg-[#f04b25]/10 flex items-center justify-center mb-4">
                <Eye size={15} className="text-[#f04b25]" />
              </div>
              <h3
                className="font-bold text-white mb-2 text-[15px]"
              >
                Transparent process
              </h3>
              <p className="text-xs text-white/40 leading-relaxed">
                Price, milestones, and deliverables agreed before we start.
                No surprises, no scope creep, no renegotiations halfway through.
              </p>
            </div>
          </StaggerItem>

          {/* 48h stat */}
          <StaggerItem>
            <div className="bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors duration-200 h-full flex flex-col justify-between">
              <div>
                <p
                  className="text-5xl font-black text-white leading-none"
                >
                  48
                  <span className="text-2xl text-white/60">h</span>
                </p>
              </div>
              <p className="text-xs text-white/40 mt-4">
                From first call to a working blueprint. Every engagement, no exceptions.
              </p>
            </div>
          </StaggerItem>

          {/* Systems thinking - featured orange */}
          <StaggerItem className="col-span-2 md:col-span-1">
            <div className="bg-[#f04b25] rounded-2xl p-6 h-full hover:bg-[#d94020] transition-colors duration-200">
              <h3
                className="font-bold text-white text-xl mb-3 leading-tight"
              >
                Systems thinking,
                <br />
                end to end.
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                We map the architecture first, build second.
              </p>
            </div>
          </StaggerItem>

          {/* Fast & collaborative */}
          <StaggerItem>
            <div className="bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors duration-200 h-full">
              <div className="w-8 h-8 rounded-full bg-[#f04b25]/10 flex items-center justify-center mb-4">
                <Zap size={15} className="text-[#f04b25]" />
              </div>
              <h3
                className="font-bold text-white mb-2 text-[15px]"
              >
                Embedded, not outsourced
              </h3>
              <p className="text-xs text-white/40 leading-relaxed">
                Daily comms, shared context. We work in your problem, not around it — closer to a co-founder than a contractor.
              </p>
            </div>
          </StaggerItem>

          {/* Connected stack */}
          <StaggerItem>
            <div className="bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors duration-200 h-full">
              <div className="w-8 h-8 rounded-full bg-[#f04b25]/10 flex items-center justify-center mb-4">
                <GitBranch size={15} className="text-[#f04b25]" />
              </div>
              <h3
                className="font-bold text-white mb-2 text-[15px]"
              >
                Connected stack
              </h3>
              <p className="text-xs text-white/40 leading-relaxed">
                n8n, Make, Claude, Shopify, Stripe, HubSpot, Notion — 12+ named integrations.
              </p>
            </div>
          </StaggerItem>

          {/* 3 revision rounds */}
          <StaggerItem>
            <div className="bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors duration-200 h-full">
              <h3
                className="font-bold text-white mb-2 text-[15px]"
              >
                3 revision rounds included
              </h3>
              <p className="text-xs text-white/40 leading-relaxed mb-4">
                Comment, react, approve. Until it&apos;s exactly right.
              </p>
              <div className="flex gap-2">
                {["R1", "R2", "R3"].map((r, i) => (
                  <div
                    key={r}
                    className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center ${
                      i < 2 ? "bg-[#f04b25]" : "bg-white/[0.06] border border-white/10"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-white">{r}</span>
                    {i < 2 && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="mt-0.5">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        </FadeInStagger>

        {/* No lock-in banner */}
        <FadeIn delay={0.2} className="mt-4">
          <div className="bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 flex items-center gap-6">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">No lock-in. Ever.</p>
              <p className="text-lg font-bold text-white">
                You own everything on day one.
              </p>
              <p className="text-sm text-white/40 mt-1">
                Code, accounts, configs, docs — it all belongs to you from day one. If you want to take it somewhere else, you can.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
