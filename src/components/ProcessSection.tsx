"use client";

import { ArrowUpRight } from "lucide-react";
import FadeIn, { FadeInStagger, StaggerItem } from "./FadeIn";

const steps = [
  {
    num: "01",
    tag: "Discovery · 12 questions",
    title: "Map the system first",
    desc: "Twelve focused questions. Nothing more. You leave with a system map that shows where the actual problem is, before we write a single line of code.",
    items: ["Scope & milestones", "Current workflow", "Existing stack"],
  },
  {
    num: "02",
    tag: "Blueprint · 48h turnaround",
    title: "See it before we build it",
    desc: "Wireframes, workflow maps, or a clickable prototype, in 48 hours. You review the plan, we adjust if needed, then we build.",
    badge: "48h turnaround",
  },
  {
    num: "03",
    tag: "Build · milestone-driven",
    title: "Ship to milestones",
    desc: "Products in 8-week sprints. Automations in phases. You know what's shipping next and when: no black boxes, no surprises.",
    badge: "milestones included",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-[#eeeae4] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
          <FadeIn>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-medium text-black/40 uppercase tracking-widest">
                How we work
              </span>
            </div>
            <h2
              className="text-[clamp(38px,5vw,68px)] font-black text-black leading-[0.95] tracking-tight max-w-xs"
            >
              Three stages.
              <br />
              Zero
              <br />
              guesswork.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="md:max-w-xs md:pt-16">
            <p className="text-[15px] text-black/50 leading-relaxed">
              Most projects fail because someone started writing code before
              they understood the problem. We don&apos;t skip the mapping step.
            </p>
          </FadeIn>
        </div>

        {/* Orange featured card */}
        <FadeIn className="mb-4">
          <div className="bg-[#f04b25] rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-4xl font-black text-white">
                48h
              </p>
              <p className="text-white/80 font-semibold text-lg mt-0.5">
                live mockup
              </p>
              <p className="text-white/60 text-sm mt-2 max-w-xs">
                Two business days from discovery to a blueprint or clickable
                prototype. Free diagnosis included.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </div>
        </FadeIn>

        {/* Step cards */}
        <FadeInStagger className="grid md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <StaggerItem key={step.num}>
              <div className="bg-white border border-black/[0.06] rounded-2xl p-6 h-full hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-black/30 font-mono tracking-wider">
                    {step.tag}
                  </span>
                  {step.badge && (
                    <span className="text-xs font-medium text-white bg-[#f04b25] px-3 py-1 rounded-full">
                      {step.badge}
                    </span>
                  )}
                </div>

                <h3
                  className="text-xl font-bold text-black mb-2"
                >
                  {step.title}
                </h3>
                <p className="text-sm text-black/50 leading-relaxed mb-5">
                  {step.desc}
                </p>

                {/* Checklist items */}
                {step.items && (
                  <div className="bg-[#0f0f0f] rounded-xl overflow-hidden">
                    {step.items.map((item, i) => (
                      <div
                        key={item}
                        className={`flex items-center justify-between px-4 py-3 ${
                          i < step.items!.length - 1
                            ? "border-b border-white/[0.06]"
                            : ""
                        }`}
                      >
                        <span className="text-sm text-white/70">{item}</span>
                        <div className="w-5 h-5 rounded flex items-center justify-center bg-[#f04b25]">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mockup preview for step 02 */}
                {step.num === "02" && (
                  <div className="bg-[#0f0f0f] rounded-xl p-4 mt-2">
                    <div className="flex gap-1.5 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-12 bg-white/[0.06] rounded-lg" />
                      <div className="h-12 bg-[#f04b25]/80 rounded-lg" />
                      <div className="h-8 bg-[#f04b25]/40 rounded col-span-2" />
                    </div>
                  </div>
                )}

                {/* Chat preview for step 03 */}
                {step.num === "03" && (
                  <div className="bg-[#0f0f0f] rounded-xl p-4 mt-2 space-y-2">
                    <div className="bg-white/[0.06] rounded-xl rounded-tl-sm px-3 py-2 text-xs text-white/60 max-w-[85%]">
                      "M2 approved, when does M3 ship?"
                    </div>
                    <div className="bg-[#f04b25] rounded-xl rounded-tr-sm px-3 py-2 text-xs text-white ml-auto max-w-[85%]">
                      End of week, on track ↗
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-white/30">M2 done · M3 in build</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-[10px] text-green-400">ON TRACK</span>
                    </div>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
