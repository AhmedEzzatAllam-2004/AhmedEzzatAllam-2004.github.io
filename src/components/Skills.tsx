"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  Variants
} from "framer-motion";

const capabilities = [
  {
    path: "~/foundations",
    title: "CS FOUNDATIONS",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Systems (SQL)",
      "Information Retrieval (TF-IDF, BM25)",
      "Rule-Based Systems & Fuzzy Logic",
    ],
  },
  {
    path: "~/data-science-ai",
    title: "DATA SCIENCE & AI",
    items: [
      "Machine Learning",
      "Deep Learning (CNN, RNN)",
      "Natural Language Processing",
      "Web Scraping (Selenium, Pandas)",
      "Data Mining & Big Data",
    ],
  },
  {
    path: "~/frontend-mobile",
    title: "FRONTEND & MOBILE",
    items: [
      "React & TypeScript",
      "Tailwind CSS & Framer Motion",
      "Vite",
      "Capacitor (Mobile Integration)",
    ],
  },
  {
    path: "~/backend-cloud",
    title: "BACKEND & CLOUD",
    items: [
      "Python (Flask)",
      "C# (ASP.NET Core MVC)",
      "Firebase & Supabase",
      "RESTful API Integration",
      "MLOps",
    ],
  },
];

const totalEntries = capabilities.reduce((acc, col) => acc + col.items.length, 0);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export function WhatIKnow() {
  return (
    <section className="relative w-full bg-[#030303] text-white py-24 md:py-32 px-5 md:px-12 overflow-hidden flex flex-col md:flex-row">

      {/* Sidebar Label */}
      <div className="hidden md:flex flex-col items-center mr-12 opacity-50 shrink-0">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.3em] rotate-180"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="text-[#ff4d4d] mb-4">02</span> / CAPABILITIES
        </span>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto">

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
            className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em] mt-6 md:mt-0"
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
              className="flex-1 pt-8 pb-12 lg:px-8 border-b lg:border-b-0 lg:border-r border-white/15 last:border-0 transition-opacity duration-500 lg:hover:!opacity-100 lg:group-hover:opacity-40"
            >
              {/* Column Header */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 text-[#ff4d4d] font-mono text-[10px] tracking-[0.15em]">
                  <span>{col.path}</span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-white/25">{col.items.length}</span>
                </div>
                <h3 className="mt-2 font-mono text-[12px] uppercase tracking-[0.2em] font-semibold text-white/90">
                  {col.title}
                </h3>
              </div>

              {/* Skills List */}
              <ul className="space-y-4">
                {col.items.map((item) => (
                  <li key={item} className="group/item flex items-baseline cursor-default">
                    {/* Hover Terminal Arrow (>) */}
                    <span className="w-4 shrink-0 font-mono text-[13px] text-[#ff4d4d] opacity-0 -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0">
                      &gt;
                    </span>
                    <span className="font-sans text-[14px] md:text-[15px] text-white/60 border-b border-transparent pb-0.5 transition-all duration-300 group-hover/item:text-white group-hover/item:border-white/20">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}