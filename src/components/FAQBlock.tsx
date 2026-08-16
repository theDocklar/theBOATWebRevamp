"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { FAQSchema } from "./schema";

export interface QAPair {
  q: string;
  a: string;
}

interface FAQBlockProps {
  qa: QAPair[];
  title?: string;
}

/**
 * Drop-in FAQ section: visible accordion (same interaction pattern as the
 * homepage's FAQSection) plus the matching FAQPage JSON-LD, from one prop.
 * Use for any page with genuine Q&A content — pass only real copy, since
 * the schema below is generated from the same `qa` array shown on screen.
 */
export default function FAQBlock({ qa, title = "FAQ" }: FAQBlockProps) {
  const [open, setOpen] = useState<number | null>(null);

  if (qa.length === 0) return null;

  return (
    <div className="my-10">
      <FAQSchema faqs={qa.map((pair) => ({ question: pair.q, answer: pair.a }))} />
      <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-4">
        {title}
      </p>
      <div className="space-y-2">
        {qa.map((pair, i) => (
          <div
            key={i}
            className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:shadow-sm transition-shadow duration-200"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-[15px] font-semibold text-black pr-4">{pair.q}</span>
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
                  <p className="px-6 pb-5 text-sm text-black/50 leading-relaxed">{pair.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
