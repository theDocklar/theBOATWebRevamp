"use client";

import { ArrowRight, ShoppingCart, Bot, Code2, Camera } from "lucide-react";
import FadeIn, { FadeInStagger, StaggerItem } from "./FadeIn";

const services = [
  {
    icon: Code2,
    num: "01",
    title: "Product development",
    desc: "Got an idea and need a team to build it? We work alongside you — from first wireframe to shipped product, usually in 8 weeks. No handoffs, daily contact.",
  },
  {
    icon: Bot,
    num: "02",
    title: "AI workflow automation",
    desc: "Your team is probably spending 20–30 hours a month on work that could run itself. We find it, automate it, and hand over the keys.",
  },
  {
    icon: ShoppingCart,
    num: "03",
    title: "Shopify + commerce",
    desc: "Shopify stores that don't need babysitting. Inventory, pricing, cart recovery — wired up to handle themselves so you can focus on growing the thing.",
  },
  {
    icon: Camera,
    num: "04",
    title: "Creative studio",
    desc: "Photography, brand identities, lookbooks, packaging — done by people who also understand why it needs to convert, not just look good.",
  },
];

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
                <div className="group bg-white border border-black/[0.08] rounded-2xl p-7 hover:border-black/[0.18] hover:shadow-[0_8px_32px_rgba(14,14,12,0.08)] transition-all duration-200 cursor-pointer h-full">
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
                    {service.desc}
                  </p>

                  <button className="flex items-center gap-1.5 text-sm text-[#f04b25] group-hover:gap-2.5 transition-all duration-150">
                    Learn more
                    <ArrowRight size={14} />
                  </button>
                </div>
              </StaggerItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
