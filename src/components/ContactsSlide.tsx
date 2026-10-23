"use client";

import moonImg from "@/assets/full-moon.webp";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const fieldMeta = [
  { name: "name", label: "YOUR NAME", placeholder: "Full name", type: "text", autoComplete: "name" },
  { name: "email", label: "EMAIL ADDRESS", placeholder: "your@email.com", type: "email", autoComplete: "email" },
  { name: "subject", label: "SUBJECT", placeholder: "What would you like to discuss?", type: "text", autoComplete: "off" },
];

export function ContactsSlide() {
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const subject = (data.get("subject") as string) || "";
    const message = (data.get("message") as string) || "";

    // WhatsApp deep link: بنفتح WhatsApp برسالة جاهزة فيها كل البيانات.
    // مفيش backend — ده بـ يـشتغل على GitHub Pages/Vercel/أي hosting من غير API.
    const text = `*New message from portfolio*\n\n*Name:* ${fullName}\n*Email:* ${email}\n*Subject:* ${subject}\n\n${message}`;
    const url = `https://wa.me/201140674371?text=${encodeURIComponent(text)}`;

    try {
      setIsSubmitting(true);
      // نـ check إن الـ window.open اشتغلت (مش بـ يـ blocker popup)
      const win = window.open(url, "_blank");
      if (!win || win.closed || typeof win.closed === "undefined") {
        // popup blocker — نـ فallback لـ location.href
        window.location.href = url;
      }
      toast({
        title: "تم فتح WhatsApp ✓",
        description: "أكمل رسالتك هناك، أحمد هيـرد عليك قريب.",
      });
      form.reset();
      setFormOpen(false);
    } catch {
      toast({
        title: "تعذّر الفتح",
        description: "جرّب تانى، أو ابعت مباشرة على WhatsApp: 0201140674371",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <section
      id="contact"
      className="relative h-[100svh] min-h-[700px] overflow-hidden bg-black text-center flex items-center justify-center"
    >
      {/* 1. Cinematic Moon Entrance */}
      {/* svh بدل vh: الموضع مش بيتحرك لما شريط المتصفح يظهر ويختفي على الموبايل */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[48svh] md:top-[45svh] inset-x-0 flex justify-center pointer-events-none z-0"
      >
        <img
          src={moonImg}
          alt="Moon horizon"
          width={1500}
          height={1500}
          loading="lazy"
          draggable={false}
          className="w-[1200px] md:w-[1600px] lg:w-[2200px] max-w-none animate-[spin_240s_linear_infinite] motion-reduce:animate-none will-change-transform rounded-full opacity-80"
          style={{ filter: "drop-shadow(0 -40px 120px rgba(158,158,255,0.15))" }}
        />
      </motion.div>

      {/* Dark overlay at the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[50%] bg-gradient-to-t from-black/90 via-black/40 to-transparent"
      />

      {/* 2. Content Layout */}
      <div className="absolute inset-0 z-10 flex flex-col items-center pt-[10svh] md:pt-[12svh]">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[#adb5c2] font-sans text-[11vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[6.5rem] leading-[0.95] tracking-tight font-medium px-5"
        >
          Let&apos;s fly to the
          <br />
          Moon together
        </motion.h2>

        {/* Floating Button - Fixed Scale & Arrow Animation */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={() => setFormOpen((v) => !v)}
          className="group mt-[15svh] md:mt-[16svh] inline-flex items-center gap-3 px-8 h-12 md:h-14 rounded-full bg-white text-black text-[15px] font-medium transition-all duration-500 ease-[cubic-bezier(0.16\,1\,0.3\,1)] hover:scale-[1.05] hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.1)] relative z-20"
        >
          {formOpen ? "Close" : "Contact us"}
          {!formOpen && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-500 ease-[cubic-bezier(0.16\,1\,0.3\,1)]    group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path
                d="M3 13L13 3M13 3H6M13 3V10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </motion.button>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-[8svh] md:mt-[10svh] text-xs font-mono text-white/70 leading-relaxed text-center px-5 uppercase mix-blend-plus-lighter relative z-10"
        >
          <p className="text-white/85">2026, AHMED EZZAT ALLAM</p>
          <p className="mt-2 text-white/70">
            COMPUTER SCIENCE / DATA SCIENCE & AI
            <br />
            ZEWAIL CITY OF SCIENCE AND TECHNOLOGY
          </p>
          <a
            href="mailto:s-ahmed.allam@zewailcity.edu.eg"
            className="text-[#9e9eff] hover:text-white transition-colors mt-2 inline-block tracking-[0.05em] sm:tracking-[0.1em] break-all"
          >
            S-AHMED.ALLAM@ZEWAILCITY.EDU.EG
          </a>
        </motion.div>
      </div>

      {/* Dynamic Form Container */}
      <div className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            scale: formOpen ? 1 : 0.95,
            opacity: formOpen ? 1 : 0,
            pointerEvents: formOpen ? "auto" : "none"
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl px-5"
        >
          {/* max-h + overflow-y-auto: الفورم مش بيطلع برا الشاشة لما الكيبورد أو الـ landscape يصغّروا المساحة */}
          <form
            onSubmit={handleSubmit}
            className="relative space-y-4 max-h-[calc(100svh-2rem)] overflow-y-auto rounded-[8px] border border-white/10 bg-black/80 p-6 md:p-8 text-left backdrop-blur-2xl shadow-2xl"
          >
            {/* Close Button (X) */}
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="absolute top-3 right-3 p-2.5 text-white/70 hover:text-white transition-colors z-50 rounded-full hover:bg-white/5"
              aria-label="Close form"
            >
              <X size={18} />
            </button>

            {/* text-base على الموبايل: أي input أصغر من 16px بيخلي iOS Safari يعمل zoom تلقائي عند الضغط عليه */}
            {fieldMeta.map((f) => (
              <div key={f.name}>
                <label className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/70">
                  {f.label}
                </label>
                <input
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  required
                  className="w-full border-b border-white/20 bg-transparent py-2 text-base md:text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-white"
                  placeholder={f.placeholder}
                />
              </div>
            ))}
            <div>
              <label className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/70">
                MESSAGE
              </label>
              <textarea
                name="message"
                required
                rows={3}
                className="w-full resize-none border-b border-white/20 bg-transparent py-2 text-base md:text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-white"
                placeholder="Tell me about your idea or opportunity..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-white py-3 mt-2 text-black font-medium transition-transform duration-500 hover:scale-[1.02] disabled:opacity-50"
            >
              <Send size={14} />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
