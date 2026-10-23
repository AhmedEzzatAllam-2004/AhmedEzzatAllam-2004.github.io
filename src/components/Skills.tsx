"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  Variants,
} from "framer-motion";

const capabilities = [
  {
    path: "~/foundations",
    title: "CS FOUNDATIONS",
    items: [
      { name: "Data Structures & Algorithms", level: 5 },
      { name: "Object-Oriented Programming (OOP)", level: 5 },
      { name: "Database Systems (SQL)", level: 4 },
      { name: "Information Retrieval (TF-IDF, BM25)", level: 3 },
      { name: "Rule-Based Systems & Fuzzy Logic", level: 3 },
    ],
  },
  {
    path: "~/data-science-ai",
    title: "DATA SCIENCE & AI",
    items: [
      { name: "Machine Learning", level: 4 },
      { name: "Deep Learning (CNN, RNN)", level: 4 },
      { name: "Natural Language Processing", level: 4 },
      { name: "Web Scraping (Selenium, Pandas)", level: 5 },
      { name: "Data Mining & Big Data", level: 3 },
    ],
  },
  {
    path: "~/frontend-mobile",
    title: "FRONTEND & MOBILE",
    items: [
      { name: "React & TypeScript", level: 5 },
      { name: "Tailwind CSS & Framer Motion", level: 5 },
      { name: "Vite", level: 4 },
      { name: "Capacitor (Mobile Integration)", level: 3 },
    ],
  },
  {
    path: "~/backend-cloud",
    title: "BACKEND & CLOUD",
    items: [
      { name: "Python (Flask)", level: 4 },
      { name: "C# (ASP.NET Core MVC)", level: 3 },
      { name: "Firebase & Supabase", level: 4 },
      { name: "RESTful API Integration", level: 4 },
      { name: "MLOps", level: 3 },
    ],
  },
];

const totalEntries = capabilities.reduce((acc, col) => acc + col.items.length, 0);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/** Counts up once the element scrolls into view */
function EntryCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString().padStart(2, "0"));
  const [display, setDisplay] = useState("00");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
    const unsub = rounded.on("change", setDisplay);
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, count, rounded]);

  return <span ref={ref}>{display}</span>;
}

/** Skill level dots (5 max) — بتتملي بس لما تدخل الشاشة */
function SkillDots({ level, inView }: { level: number; inView: boolean }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full transition-all duration-500"
          style={{
            backgroundColor: inView && i <= level ? "#ff4d4d" : "rgba(255,255,255,0.15)",
            transform: inView && i <= level ? "scale(1.2)" : "scale(1)",
            transitionDelay: `${i * 60}ms`,
            boxShadow: inView && i <= level ? "0 0 6px rgba(255,77,77,0.6)" : "none",
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function WhatIKnow() {
  return (
    <section className="relative w-full bg-[#030303] text-white py-24 md:py-32 px-5 md:px-12 overflow-hidden flex flex-col md:flex-row">
      {/* خلفية: glow أحمر خفيف من تحت */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-red-600/[0.04] blur-[150px]" />

      {/* Sidebar Label */}
      <div className="hidden md:flex flex-col items-center mr-12 opacity-70 shrink-0">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.3em] rotate-180"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="text-[#ff4d4d] mb-4">02</span> / CAPABILITIES
        </span>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-pixel text-4xl sm:text-5xl md:text-7xl uppercase tracking-wider flex items-baseline gap-2"
          >
            WHAT I KNOW
            {/* Blinking Terminal Cursor */}
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="text-[#ff4d4d] text-3xl md:text-5xl"
            >
              ▮
            </motion.span>
          </motion.h2>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-mono text-[10px] text-white/70 uppercase tracking-[0.25em] mt-6 md:mt-0"
          >
            <EntryCounter value={totalEntries} /> ENTRIES
          </motion.span>
        </div>

        {/* Capabilities Grid — Staggered Fade Up */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="group flex flex-col lg:flex-row w-full border-t border-white/15"
        >
          {capabilities.map((col) => (
            <motion.div
              key={col.path}
              variants={itemVariants}
              className="relative flex-1 pt-8 pb-12 lg:px-8 border-b lg:border-b-0 lg:border-r border-white/15 last:border-0 transition-all duration-500 lg:hover:!opacity-100 lg:group-hover:opacity-40"
            >
              {/* Glow overlay لما الـ column يتـ hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 lg:hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,77,77,0.06), transparent 70%)",
                }}
                aria-hidden="true"
              />

              {/* Top scan line — بتتحرك لما الـ column يدخل الشاشة */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent origin-left"
                style={{ height: "1px" }}
                aria-hidden="true"
              />

              {/* Column Header */}
              <div className="mb-8 relative">
                <div className="flex items-baseline gap-2 text-[#ff4d4d] font-mono text-[10px] tracking-[0.15em]">
                  <span>{col.path}</span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-white/40">{col.items.length}</span>
                </div>
                <h3 className="mt-2 font-mono text-[12px] uppercase tracking-[0.2em] font-semibold text-white/95">
                  {col.title}
                </h3>
              </div>

              {/* Skills List */}
              <ul className="space-y-4 relative">
                {col.items.map((item, idx) => (
                  <InViewItem key={item.name} item={item} delay={idx * 80} />
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** عنصر skill بيتفرّد لـ inView tracking ورفّع الـ dots level */
function InViewItem({
  item,
  delay,
}: {
  item: { name: string; level: number };
  delay: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <li
      ref={ref}
      className="group/item flex flex-col gap-1.5 cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 600ms ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 600ms ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline">
          {/* Hover Terminal Arrow (>) */}
          <span className="w-4 shrink-0 font-mono text-[13px] text-[#ff4d4d] opacity-0 -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0">
            &gt;
          </span>
          <span className="font-sans text-[14px] md:text-[15px] text-white/80 border-b border-transparent pb-0.5 transition-all duration-300 group-hover/item:text-white group-hover/item:border-white/30">
            {item.name}
          </span>
        </div>
        <SkillDots level={item.level} inView={inView} />
      </div>
    </li>
  );
}
