"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "./FadeIn";

const timeSlots = [
  { label: "Tue 10:00", available: true },
  { label: "Tue 14:00", available: false },
  { label: "Wed 11:30", available: true },
  { label: "Wed 16:00", available: true },
  { label: "Thu 09:00", available: true },
  { label: "Thu 13:00", available: true },
  { label: "Fri 10:00", available: false },
  { label: "Fri 15:30", available: true },
];

const services = [
  "Product development (PMF sprint)",
  "AI workflow automation",
  "Shopify + commerce",
  "Creative studio (Frames)",
  "Not sure yet",
];

const budgets = ["Under $15k", "$15k – $40k", "$40k – $80k", "$80k+"];

const initialForm = {
  name: "",
  email: "",
  company: "",
  service: services[0],
  details: "",
  budget: budgets[0],
};

export default function ContactSection() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(2);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      toast.success("Message sent — we'll reply within one business day.");
      setForm(initialForm);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-[#eeeae4] py-24 md:py-32 border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Book a call card */}
          <FadeIn>
            <div className="bg-[#f04b25] rounded-2xl p-7 h-full flex flex-col">
              <p className="text-xs text-white/60 uppercase tracking-widest mb-4">
                01 — Book a strategy call
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-white leading-tight mb-3"
              >
                30 minutes.
                <br />
                No sales pitch.
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                We&apos;ll map one product challenge or ops bottleneck and walk
                you through how we&apos;d approach it — whether or not you work
                with us.
              </p>

              {/* Time slot picker */}
              <div className="bg-white/10 rounded-xl p-4 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white">
                    Available this week
                  </span>
                  <span className="text-xs text-white/60">UTC+5:30 · Colombo</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {timeSlots.map((slot, i) => (
                    <button
                      key={i}
                      disabled={!slot.available}
                      onClick={() => slot.available && setSelectedSlot(i)}
                      className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                        !slot.available
                          ? "text-white/25 line-through cursor-not-allowed"
                          : selectedSlot === i
                          ? "bg-[#0f0f0f] text-white"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-white/50">Avg response: 24h</span>
                  <a
                    href="https://calendly.com/buildarealgreatsite/one-on-one-call?month=2025-11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#0f0f0f] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-black transition-colors"
                  >
                    Confirm slot
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn delay={0.1}>
            <div className="bg-[#0f0f0f] rounded-2xl p-7">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">
                02 — Send us your details
              </p>
              <h2
                className="text-3xl font-black text-white leading-tight mb-2"
              >
                Or write us
                <br />a short brief.
              </h2>
              <p className="text-sm text-white/40 mb-7">
                A few lines about your business and what you&apos;re trying to
                fix. We&apos;ll reply within one business day.
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">
                      Full name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/[0.12] pb-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#f04b25] transition-colors disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      required
                      disabled={isSubmitting}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/[0.12] pb-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#f04b25] transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Company / project"
                    disabled={isSubmitting}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-transparent border-b border-white/[0.12] pb-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#f04b25] transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">
                    Service
                  </label>
                  <select
                    disabled={isSubmitting}
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white/70 focus:outline-none focus:border-[#f04b25] transition-colors disabled:opacity-50"
                  >
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-[#1a1a1a]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">
                    Project details
                  </label>
                  <textarea
                    placeholder="What problem are you trying to solve?"
                    disabled={isSubmitting}
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    rows={3}
                    className="w-full bg-transparent border-b border-white/[0.12] pb-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#f04b25] transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/30 uppercase tracking-wider mb-2">
                    Budget range
                  </label>
                  <select
                    disabled={isSubmitting}
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white/70 focus:outline-none focus:border-[#f04b25] transition-colors disabled:opacity-50"
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b} className="bg-[#1a1a1a]">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-white/30">
                    Reply within 24h · No spam
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-[#f04b25] hover:bg-[#d94020] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        Sending
                        <Loader2 size={14} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowUpRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
