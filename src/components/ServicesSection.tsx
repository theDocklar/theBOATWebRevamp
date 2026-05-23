"use client";

import { ArrowRight, ShoppingCart, Bot, Code2, Camera } from "lucide-react";
import FadeIn, { FadeInStagger, StaggerItem } from "./FadeIn";

const services = [
  {
    icon: Code2,
    num: "01",
    title: "Product development",
    desc: "Co-build your early-stage product from validated idea to shipped MVP. Structured 8-week PMF sprints with clear milestones and daily collaboration.",
  },
  {
    icon: Bot,
    num: "02",
    title: "AI workflow automation",
    desc: "Replace manual ops with n8n + AI agent pipelines. We audit, design, and deploy — measured in team hours saved, not story points.",
  },
  {
    icon: ShoppingCart,
    num: "03",
    title: "Shopify + commerce",
    desc: "Storefronts wired to an automation spine. AI agents watching inventory, pricing, and cart recovery so the store tunes itself.",
  },
  {
    icon: Camera,
    num: "04",
    title: "Creative studio",
    desc: "Product photography, brand systems, lookbooks and packaging. The same systems-first precision applied to the visuals that drive conversion.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#eeeae4] py-24 md:py-32 border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
          <FadeIn>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-medium text-black/40 uppercase tracking-widest">
                What we build
              </span>
            </div>
            <h2
              className="text-[clamp(38px,5vw,68px)] font-black text-black leading-[0.95] tracking-tight"
            >
              Products
              <br />
              built.
              <br />
              Operations
              <br />
              automated.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="md:max-w-xs md:pt-16">
            <p className="text-[15px] text-black/50 leading-relaxed">
              Two segments, one obsession: execution. Early-stage founders
              need a build partner. Growing teams need their ops unblocked.
              Both get the same systems-first approach.
            </p>
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
