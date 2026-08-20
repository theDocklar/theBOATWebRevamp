import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import FAQBlock from "@/components/FAQBlock";
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/services/ai-automation`;

export const metadata: Metadata = {
  title: "AI Workflow Automation Agency · Custom AI Agents",
  description:
    "AI workflow automation agency using n8n, Make, and custom AI agents to kill manual ops work. We build it, wire it to your stack, and hand you the keys.",
  openGraph: {
    ...OG_DEFAULTS,
    url: PAGE_URL,
    title: "AI Workflow Automation Agency · Custom AI Agents",
    description:
      "AI workflow automation agency using n8n, Make, and custom AI agents to kill manual ops work. We build it, wire it to your stack, and hand you the keys.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "theBOAT AI Workflow Automation" }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: "summary_large_image",
    title: "AI Workflow Automation Agency · Custom AI Agents",
    description:
      "AI workflow automation agency using n8n, Make, and custom AI agents to kill manual ops work. We build it, wire it to your stack, and hand you the keys.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const faqs = [
  {
    q: "What's the difference between AI workflow automation and a chatbot?",
    a: "A chatbot answers questions. Our automations are narrow agents that act: triaging inbound email, routing leads to the right rep, recovering failed payments, drafting weekly digests. No one has to open a chat window; the work just gets done.",
  },
  {
    q: "What tools do you integrate with?",
    a: "n8n and Make are our core automation layers, wired into whatever stack you already run: Linear, Notion, HubSpot, Stripe, Slack, Gmail, Airtable, and Claude/OpenAI for anything that needs judgment rather than a fixed rule. Typically 20+ named flows per engagement.",
  },
  {
    q: "How long does an automation project take?",
    a: "We embed for 6–10 weeks, ship a working v1 against your real data, and iterate from there: not a slide deck, a running system.",
  },
  {
    q: "Do we own the automation afterward, or are we locked into your platform?",
    a: "You own it. Everything runs on your infrastructure: source code, agent prompts, and credentials are handed over at the end. No vendor lock-in, no recurring fee to keep it running unless you want us managing it.",
  },
];

export default function AIAutomationPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <div className="mb-8">
          <span className="inline-block px-3.5 py-1.5 bg-[#f04b25]/8 text-[#f04b25] text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
            Product &amp; Automation Studio
          </span>
          <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-8">
            AI Workflow
            <br />
            <span className="text-[#f04b25]">Automation</span>
            <br />
            That Runs Itself
          </h1>
          <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-3xl">
            We find the 20–30 hours a month your team loses to manual, repetitive work, and
            replace it with narrow AI agents that act on their own, wired straight into the
            tools you already use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 border-t border-black/10 pt-12">
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
              Avg hours killed
            </p>
            <p className="text-3xl font-bold text-[#0f0f0f]">1,240/mo</p>
            <p className="text-xs text-black/40 mt-1">Across the last 9 SMBs we rewired</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
              Delivery
            </p>
            <p className="text-3xl font-bold text-[#0f0f0f]">6–10 wks</p>
            <p className="text-xs text-black/40 mt-1">Embedded, shipping a real v1</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-black/5">
            <p className="text-sm text-black/40 uppercase tracking-wide mb-2 font-medium">
              Named flows
            </p>
            <p className="text-3xl font-bold text-[#0f0f0f]">20+</p>
            <p className="text-xs text-black/40 mt-1">Per engagement, on average</p>
          </div>
        </div>
      </section>

      {/* What is AI workflow automation */}
      <section className="bg-white py-24 md:py-32 border-y border-black/6">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  01 / Definition
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
                Narrow Agents, Not Chatbots
              </h2>
              <div className="space-y-6 text-lg text-black/70 leading-relaxed">
                <p>
                  Most "AI automation" pitches are a chat widget bolted onto your website.
                  Ours act: inbound triage, billing recovery, lead routing, weekly digests,
                  agents that do the task instead of discussing it.
                </p>
                <p>
                  We co-build the product when what to build is still unclear, and we automate
                  the operations once the process itself is already obvious: the two problems
                  need different tools, and we don&apos;t force one onto the other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack breakdown */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  02 / Tech stack
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-6">
                n8n and Make, Wired to What You Already Run
              </h2>
              <p className="text-lg text-black/60 leading-relaxed">
                No new platform to learn. We build the automation layer on top of your
                existing stack and connect it with named, auditable flows.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {["n8n", "Make", "Claude / OpenAI", "HubSpot", "Linear", "Notion", "Stripe", "Slack", "Gmail", "Airtable"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 bg-white text-sm font-medium rounded-full border border-black/10 text-black/70"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="grid gap-6">
            {[
              {
                num: "01",
                title: "Inbound Triage",
                desc: "Gmail → Claude reads and drafts replies for incoming email, routing anything that needs a human decision instead of forcing someone to read every message.",
              },
              {
                num: "02",
                title: "Billing & Revenue Recovery",
                desc: "Stripe → automated retry and recovery outreach on failed charges, timed to when customers actually respond, instead of a single generic retry.",
              },
              {
                num: "03",
                title: "Lead Routing",
                desc: "Airtable or HubSpot → leads scored and routed to the right rep automatically, with no manual handoff step to fall through the cracks.",
              },
              {
                num: "04",
                title: "Reporting & Digests",
                desc: "Linear, Notion, and your CRM rolled into a founder-facing weekly digest: the numbers that matter, without anyone compiling a report by hand.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="p-8 bg-white rounded-2xl border border-black/8 hover:border-black/20 transition-all"
              >
                <span className="inline-block px-3 py-1 bg-black/5 text-xs font-mono font-bold rounded-full mb-4">
                  {item.num}
                </span>
                <h3 className="text-2xl font-bold text-[#0f0f0f] mb-3">{item.title}</h3>
                <p className="text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ownership */}
      <section className="bg-[#0f0f0f] text-white py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                  03 / Ownership
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                You Own the Running System
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-6">
                Built on your infrastructure, not a platform we control. Source code, agent
                prompts, and credentials are handed over, no vendor lock-in, no dependency on
                us staying involved.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                If you'd rather we keep managing it, that's available too, but it's never a
                requirement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight mb-12">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Early-stage founders
              </h3>
              <p className="text-black/60">
                Doing manual ops work yourself because there's no one else, and no budget for
                a full hire yet.
              </p>
            </div>
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Growing SMB teams
              </h3>
              <p className="text-black/60">
                Losing 20–30 hours a month across the team to work that follows a pattern and
                shouldn't need a person doing it.
              </p>
            </div>
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Ops-heavy Shopify stores
              </h3>
              <p className="text-black/60">
                Already running our{" "}
                <a href="/services/agentic-commerce-shopify" className="text-[#f04b25] hover:underline">
                  agentic commerce
                </a>{" "}
                setup, or building your{" "}
                <a href="/shopify-development-sri-lanka" className="text-[#f04b25] hover:underline">
                  Shopify store
                </a>{" "}
                and want automation from day one.
              </p>
            </div>
            <div className="p-6 border-l-4 border-[#f04b25]">
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3">
                Teams tired of chat-widget "AI"
              </h3>
              <p className="text-black/60">
                Looking for agents that do the work, not another support-bot layered on top of
                the same manual process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 md:py-32 border-y border-black/6">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
              <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                04 / Common questions
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f0f0f] leading-tight">
              FAQ
            </h2>
          </div>
          <FAQBlock qa={faqs} title="" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-display uppercase leading-tight text-[#0f0f0f] mb-6">
            Ready to automate
            <br />
            the busywork?
          </h2>
          <p className="text-lg text-black/60 mb-10 max-w-xl mx-auto">
            Book a free ops audit. We'll map where the manual hours are going and what's
            actually worth automating first.
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 bg-[#f04b25] text-white font-bold rounded-full hover:bg-[#d63f1e] transition-colors text-lg"
          >
            Start the conversation →
          </a>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
