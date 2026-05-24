"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: EASE },
});

export default function HeroSection() {
  return (
    <section className="relative bg-[#0f0f0f] min-h-screen flex flex-col overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#f04b25]/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Top meta bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 pt-24 md:pt-28 flex items-start justify-between">
        <motion.div
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#f04b25] animate-pulse" />
          <span className="text-xs text-white/70 font-medium tracking-wide">
            Taking on new projects
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="hidden md:flex flex-col items-end">
          <span className="text-xs text-white/40 tracking-widest uppercase">
            Product &amp; Automation Studio
          </span>
          <span className="text-xs text-white/30 mt-0.5">
            Colombo · Remote worldwide
          </span>
        </motion.div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-5 md:px-8 pb-16 pt-12 md:pt-16">
        <div className="max-w-4xl">
          {/* Main headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-[clamp(64px,11vw,130px)] uppercase leading-[0.9] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ideas deserve
            <br />
            <span className="flex items-center gap-3 flex-wrap">
              to{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
                className="inline-flex items-center justify-center bg-[#f04b25] text-white rounded-[0.5em] px-[0.3em] py-[0.05em] leading-none"
              >
                sail
              </motion.span>
              .
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.35)}
            className="mt-8 text-base md:text-lg text-white/50 max-w-md leading-relaxed"
          >
            We build the product when you have the idea but not the team.
            We fix the ops when your team is too busy doing work that should
            run itself.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.45)} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-[#f04b25] hover:bg-[#d94020] text-white font-medium px-6 py-3 rounded-full transition-all duration-200 text-sm"
            >
              Get started
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
              />
            </a>
            <a
              href="https://calendly.com/buildarealgreatsite/one-on-one-call?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/20 hover:border-white/40 px-6 py-3 rounded-full transition-all duration-200 text-sm"
            >
              Book a call
            </a>
          </motion.div>
        </div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl"
        >
          <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6 hover:bg-white/[0.06] transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-4xl font-black text-white">
                  20+
                </p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">
                  products &amp; systems shipped
                </p>
              </div>
              <div className="flex gap-1.5 mt-1">
                <div className="w-5 h-5 rounded-full bg-amber-400" />
                <div className="w-5 h-5 rounded-full bg-blue-400" />
                <div className="w-5 h-5 rounded-full bg-green-400" />
              </div>
            </div>
            <p className="mt-4 text-sm text-white/40 leading-relaxed">
              Web apps, mobile products, automation pipelines. Nothing proprietary — everything documented and handed over.
            </p>
          </div>

          <a
            href="#work"
            className="group bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6 hover:bg-white/[0.06] transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-4xl font-black text-white">
                  10+
                </p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">
                  clients across 3+ countries
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-150">
                <ArrowUpRight size={14} className="text-white/60" />
              </div>
            </div>
            <p className="mt-4 text-sm text-white/40 leading-relaxed">
              Sri Lanka · UAE · United States — founders and operators who know what they want to build.
            </p>
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#eeeae4] to-transparent pointer-events-none" />
    </section>
  );
}
