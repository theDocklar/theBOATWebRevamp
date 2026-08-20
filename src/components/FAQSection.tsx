"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import FadeIn from "./FadeIn";
import { FAQS } from "@/lib/faqs";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#eeeae4] py-24 md:py-32 border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left: heading */}
          <FadeIn className="md:w-80 flex-shrink-0">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-medium text-black/40 uppercase tracking-widest">
                FAQ
              </span>
            </div>
            <h2
              className="text-[clamp(32px,4vw,52px)] font-black text-black leading-[0.95] tracking-tight mb-4"
            >
              The honest answers.
            </h2>
            <p className="text-sm text-black/40 leading-relaxed">
              Don&apos;t see your question? Ask us directly —{" "}
              <a href="#contact" className="text-[#f04b25] hover:underline">
                we reply within 24 hours.
              </a>
            </p>
          </FadeIn>

          {/* Right: accordion */}
          <FadeIn delay={0.1} className="flex-1">
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:shadow-sm transition-shadow duration-200"
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span
                      className="text-[15px] font-semibold text-black pr-4"
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                        open === i
                          ? "bg-[#f04b25] text-white"
                          : "bg-black/[0.04] text-black/50 hover:bg-black/[0.08]"
                      }`}
                    >
                      {open === i ? <X size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-black/50 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
