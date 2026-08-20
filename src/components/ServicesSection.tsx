"use client";

import { ArrowRight, ShoppingCart, Bot, Code2, Camera } from "lucide-react";
import FadeIn, { FadeInStagger, StaggerItem } from "./FadeIn";
import { SERVICES } from "@/lib/services";

// Icon + on-page nav target per service — SERVICES (lib/services.ts) is the
// shared source for title/description, consumed here and by ServiceSchema.
const CARD_META = [
  { icon: Code2, num: "01", href: "#contact" },
  { icon: Bot, num: "02", href: "#contact" },
  { icon: ShoppingCart, num: "03", href: "/stores" },
  { icon: Camera, num: "04", href: "/frames" },
];

const services = SERVICES.map((service, i) => ({
  ...service,
  ...CARD_META[i],
}));

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#eeeae4] py-24 md:py-32 border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <div className="mb-16">
          <FadeIn>
            <p className="text-xs font-medium text-black/40 uppercase tracking-widest mb-8">
              Services
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="text-[clamp(38px,5vw,68px)] font-black text-black leading-[0.95] tracking-tight">
                Four things
                <br />
                we&apos;re actually
                <br />
                good at.
              </h2>
              <p className="text-[15px] text-black/50 leading-relaxed md:max-w-sm md:pb-3">
                Early-stage founders get a build partner. Growing teams get their ops fixed.
                Everything else we leave to people who are better at it.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Service cards */}
        <FadeInStagger className="grid md:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.num}>
                <a
                  href={service.href}
                  className="group block bg-white border border-black/[0.08] rounded-2xl p-7 hover:border-black/[0.18] hover:shadow-[0_8px_32px_rgba(14,14,12,0.08)] transition-all duration-200 h-full"
                >
                  <div className="flex items-start justify-between mb-7">
                    <div className="w-11 h-11 rounded-xl bg-black/[0.05] flex items-center justify-center group-hover:bg-[#f04b25]/10 transition-colors duration-200">
                      <Icon size={18} className="text-black/50 group-hover:text-[#f04b25] transition-colors duration-200" />
                    </div>
                    <span className="text-xs text-black/20 font-mono">{service.num}</span>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-black/45 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <span className="flex items-center gap-1.5 text-sm text-[#f04b25] group-hover:gap-2.5 transition-all duration-150">
                    Learn more
                    <ArrowRight size={14} />
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
