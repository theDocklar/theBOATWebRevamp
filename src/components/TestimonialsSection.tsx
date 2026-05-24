"use client";

import FadeIn, { FadeInStagger, StaggerItem } from "./FadeIn";

const testimonials = [
  {
    stars: 5,
    quote:
      "I came in wanting a website. I left with a proper ops system I didn't know I needed. They're very direct, which I appreciated — they told me when my ideas were bad.",
    highlight: "they told me when my ideas were bad.",
    name: "Anjali R.",
    role: "Founder · Vision Haven",
    color: "#f0b554",
    dark: false,
  },
  {
    stars: 5,
    quote:
      "Honestly they pushed back more than I expected — challenged the brief, redesigned a few decisions we'd already made. The thing that shipped was better for it.",
    highlight: "The thing that shipped was better for it.",
    name: "Marco D.",
    role: "COO · Perfomad",
    color: "#6b9cf4",
    dark: true,
  },
  {
    stars: 5,
    quote:
      "Our ops were a mess — three tools that didn't talk to each other and a lot of manual copy-pasting. They cleaned it up. We're saving probably 40 hours a month now.",
    highlight: "saving probably 40 hours a month now.",
    name: "Saanvi K.",
    role: "CEO · Teragon",
    color: "#6bcf7f",
    dark: false,
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f04b25">
          <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.44.59 3.425L7 8.79l-3.09 1.71.59-3.425L2 4.635l3.455-.545L7 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-[#eeeae4] py-24 md:py-32 border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <div className="mb-16">
          <FadeIn>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-medium text-black/40 uppercase tracking-widest">
                Client feedback
              </span>
            </div>
            <h2
              className="text-[clamp(38px,5vw,68px)] font-black text-black leading-[0.95] tracking-tight max-w-lg"
            >
              People tend to
              <br />
              say nice things.
            </h2>
          </FadeIn>
        </div>

        {/* Testimonial cards */}
        <FadeInStagger className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div
                className={`rounded-2xl p-7 h-full flex flex-col ${
                  t.dark
                    ? "bg-[#111] border border-white/[0.06]"
                    : "bg-white border border-black/[0.06] hover:shadow-sm transition-shadow duration-200"
                }`}
              >
                <Stars />

                <blockquote
                  className={`text-[15px] leading-relaxed flex-1 mb-6 ${
                    t.dark ? "text-white/70" : "text-black/70"
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${t.dark ? "text-white" : "text-black"}`}
                    >
                      {t.name}
                    </p>
                    <p className={`text-xs ${t.dark ? "text-white/40" : "text-black/40"}`}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
