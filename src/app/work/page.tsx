import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CASES } from "@/lib/cases";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";

const TITLE = "Selected Work — Case Studies";
const DESCRIPTION =
  "Five shipped projects: agentic finance automation, a court booking platform, an ecommerce catalogue, a marketing attribution dashboard, and a luxury travel site. Timelines, stacks, and outcomes.";
const PAGE_URL = `${SITE_URL}/work`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    ...OG_DEFAULTS,
    type: "website",
    url: PAGE_URL,
    title: `${TITLE} · theBOAT`,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "theBOAT Selected Work" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: `${TITLE} · theBOAT`,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function WorkIndexPage() {
  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "var(--font-body)" }}>
      <Navbar />

      <section className="pt-40 pb-16 px-5 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
          <span className="text-xs text-black/40 font-mono uppercase tracking-widest">
            Selected work
          </span>
        </div>
        <h1
          className="text-[clamp(40px,7vw,90px)] uppercase leading-[0.95] tracking-tight text-black max-w-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Shipped, not conceptual.
        </h1>
        <p className="mt-6 text-[17px] text-black/50 leading-relaxed max-w-2xl">
          Five projects across finance automation, mobile booking, ecommerce, marketing
          analytics, and travel. Every case study below is live work, with real timelines
          and outcomes attached.
        </p>
      </section>

      <section className="px-5 md:px-8 max-w-7xl mx-auto pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-black/[0.08] pt-4">
          {CASES.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group border border-black/[0.08] rounded-2xl p-7 hover:border-black/20 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/30">
                    Case {c.caseNumber} · {c.quarter}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-black/30 group-hover:text-[#f04b25] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                  />
                </div>
                <h2 className="text-2xl font-bold text-black mb-2 leading-tight">
                  {c.shortTitle}
                </h2>
                <p className="text-sm text-black/50 leading-relaxed mb-6">
                  {c.engagement}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-black/40 uppercase tracking-wider">
                <span>{c.weeks} weeks</span>
                <span>·</span>
                <span>{c.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
