"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = {
  Studio: ["Process", "Services", "Work", "Why us"],
  Contact: ["info@theboatgrp.com", "+94 77 711 1770", "Colombo, Sri Lanka"],
  Legal: ["Privacy policy", "Terms of service", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand col */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <img
                src="/logo.png"
                alt="theBOAT"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              Product development and automation architecture for ambitious
              teams. We co-build products and move ops from manual chaos to
              lean, AI-powered workflows.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-[#f04b25] hover:bg-[#d94020] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
            >
              Get started <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Link cols */}
          {Object.entries(navLinks).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">
                {group}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href={group === "Studio" ? `#${item.toLowerCase().replace(" ", "")}` : "#"}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-150"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big SAIL text */}
        <div className="mt-16 md:mt-20 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-[clamp(80px,16vw,200px)] font-black text-[#f04b25] leading-none tracking-tight"
          >
            SAIL.
          </motion.p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25 font-mono">
            © 2026 theBOAT Solutions Studio
          </p>
          <p className="text-xs text-white/25 font-mono">
            Built in-house · Shipped from Colombo
          </p>
        </div>
      </div>
    </footer>
  );
}
