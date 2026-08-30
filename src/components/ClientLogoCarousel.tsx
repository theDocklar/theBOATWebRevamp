"use client";

import React from "react";
import FadeIn from "./FadeIn";

interface ClientBrand {
  name: string;
  category: string;
  tagline: string;
  svgLogo: React.ReactNode;
}

const CLIENT_BRANDS: ClientBrand[] = [
  {
    name: "KOHEDHA",
    category: "Consumer Mobile & Web",
    tagline: "Event & Dining Discovery",
    svgLogo: (
      <svg viewBox="0 0 160 36" fill="currentColor" className="h-6 w-auto">
        <text
          x="0"
          y="26"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="24"
          fontWeight="900"
          letterSpacing="2.5"
        >
          KOHEDHA
        </text>
        <circle cx="150" cy="12" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "FINPILOT",
    category: "AI & Finance Ops",
    tagline: "Autonomous Finance OS",
    svgLogo: (
      <svg viewBox="0 0 150 36" fill="currentColor" className="h-6 w-auto">
        <path d="M4 8h16v4H8v6h10v4H8v10H4V8z" />
        <text
          x="26"
          y="26"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="21"
          fontWeight="800"
          letterSpacing="3"
        >
          FINPILOT
        </text>
      </svg>
    ),
  },
  {
    name: "O'POTIQUE",
    category: "Fashion Boutique",
    tagline: "Womenswear · Colombo",
    svgLogo: (
      <svg viewBox="0 0 180 36" fill="currentColor" className="h-6 w-auto">
        <text
          x="0"
          y="26"
          fontFamily="'Instrument Serif', 'Didot', 'Bodoni MT', 'Cinzel', 'Playfair Display', Georgia, serif"
          fontSize="25"
          fontWeight="400"
          letterSpacing="4.5"
        >
          O'POTIQUE
        </text>
      </svg>
    ),
  },
  {
    name: "OLYCE",
    category: "Luxury Travel",
    tagline: "Bespoke Tours Sri Lanka",
    svgLogo: (
      <svg viewBox="0 0 130 36" fill="currentColor" className="h-6 w-auto">
        <text
          x="0"
          y="26"
          fontFamily="Georgia, serif"
          fontSize="24"
          fontWeight="400"
          letterSpacing="5"
        >
          OLYCE
        </text>
      </svg>
    ),
  },
  {
    name: "HOUSE OF WAAS",
    category: "Couture & Fashion",
    tagline: "Haute Couture Atelier",
    svgLogo: (
      <svg viewBox="0 0 200 36" fill="currentColor" className="h-6 w-auto">
        <text
          x="0"
          y="18"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="14"
          fontWeight="700"
          letterSpacing="3.5"
        >
          HOUSE OF WAAS
        </text>
        <text
          x="0"
          y="30"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="8"
          fontWeight="500"
          letterSpacing="5"
          opacity="0.65"
        >
          COUTURE · ATELIER
        </text>
      </svg>
    ),
  },
  {
    name: "CEYFLORA",
    category: "Global Floral Commerce",
    tagline: "Florals & Gifting · UAE",
    svgLogo: (
      <svg viewBox="0 0 150 36" fill="currentColor" className="h-6 w-auto">
        <text
          x="0"
          y="25"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="21"
          fontWeight="700"
          letterSpacing="3.5"
        >
          CEYFLORA
        </text>
      </svg>
    ),
  },
  {
    name: "HIMA PRODUCTS",
    category: "Agri-Tech Commerce",
    tagline: "Direct-to-Customer Store",
    svgLogo: (
      <svg viewBox="0 0 180 36" fill="currentColor" className="h-6 w-auto">
        <text
          x="0"
          y="20"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="18"
          fontWeight="900"
          letterSpacing="2.5"
        >
          HIMA
        </text>
        <text
          x="0"
          y="32"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="9"
          fontWeight="600"
          letterSpacing="4"
          opacity="0.75"
        >
          PRODUCTS
        </text>
      </svg>
    ),
  },
  {
    name: "TROI",
    category: "Marketing Analytics",
    tagline: "Channel ROAS Engine",
    svgLogo: (
      <svg viewBox="0 0 110 36" fill="currentColor" className="h-6 w-auto">
        <path d="M6 24V8h6v16H6zm8-6V8h6v10h-6zm8 6V4h6v20h-6z" fill="currentColor" opacity="0.8" />
        <text
          x="32"
          y="25"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="22"
          fontWeight="800"
          letterSpacing="3"
        >
          TROI
        </text>
      </svg>
    ),
  },
  {
    name: "NORTHBRIDGE",
    category: "Creative Agency",
    tagline: "Agency Operations & Finance",
    svgLogo: (
      <svg viewBox="0 0 190 36" fill="currentColor" className="h-6 w-auto">
        <text
          x="0"
          y="25"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="19"
          fontWeight="800"
          letterSpacing="3"
        >
          NORTHBRIDGE
        </text>
      </svg>
    ),
  },
  {
    name: "LA CASA",
    category: "Interior Architecture",
    tagline: "Homeware & Design Studio",
    svgLogo: (
      <svg viewBox="0 0 140 36" fill="currentColor" className="h-6 w-auto">
        <text
          x="0"
          y="25"
          fontFamily="Georgia, serif"
          fontSize="21"
          fontWeight="400"
          letterSpacing="4"
        >
          LA CASA
        </text>
      </svg>
    ),
  },
];

export default function ClientLogoCarousel() {
  const marqueeItems = [...CLIENT_BRANDS, ...CLIENT_BRANDS, ...CLIENT_BRANDS];

  return (
    <section className="relative bg-[#0f0f0f] border-y border-white/[0.08] py-10 md:py-14 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-5 md:px-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <FadeIn>
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/45 font-semibold">
              Selected Systems, Products &amp; Partner Brands
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <span className="text-[11px] font-mono text-white/30 tracking-wider">
            Sri Lanka · UAE · United States
          </span>
        </FadeIn>
      </div>

      {/* Infinite Seamless Scrolling Ribbon */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max items-center gap-12 md:gap-16 py-4 animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-300 cursor-default shrink-0"
            >
              <div className="transition-transform duration-300 group-hover:scale-105">
                {brand.svgLogo}
              </div>
              <div className="hidden md:flex flex-col border-l border-white/10 pl-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-mono text-white/90 font-medium whitespace-nowrap">
                  {brand.tagline}
                </span>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider whitespace-nowrap">
                  {brand.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
