"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Process", hash: "process" },
    { label: "Services", hash: "services" },
    { label: "Work", hash: "work" },
    { label: "Why us", hash: "why" },
  ];

  const href = (hash: string) => isHome ? `#${hash}` : `/#${hash}`;

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="theBOAT"
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={href(link.hash)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-150 rounded-full hover:bg-white/[0.06]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-150"
            >
              Book a call
            </a>
            <a
              href={href("contact")}
              className="px-4 py-2 text-sm font-medium text-white bg-[#f04b25] hover:bg-[#d94020] rounded-full flex items-center gap-1.5 transition-colors duration-150"
            >
              Get started
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[120px] left-0 right-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/[0.08] px-5 py-4 flex flex-col gap-1"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={href(link.hash)}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-white/70 hover:text-white border-b border-white/[0.06] last:border-0 text-sm"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 text-sm text-center text-white/80 border border-white/20 rounded-full"
              >
                Book a call
              </a>
              <a
                href={href("contact")}
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 text-sm font-medium text-center text-white bg-[#f04b25] rounded-full flex items-center justify-center gap-1.5"
              >
                Get started <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
