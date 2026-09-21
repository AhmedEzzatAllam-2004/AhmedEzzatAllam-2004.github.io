"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Menu, X, Download, MessageCircle } from "lucide-react";
import heroVideo from "@/assets/hero-bg.mp4";
import Reveal from "@/components/Reveal";
import ProjectRail, { railProjects } from "@/components/ProjectRail";
import { ContactsSlide } from "@/components/ContactsSlide";
import ScrambleText from "@/components/ScrambleText";
import { WhatIKnow } from "@/components/Skills";
import { motion } from "framer-motion";
import WaveCanvas from "@/components/WaveCanvas";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "TALK", href: "#contact" },
];

const Logo = () => (
  <img
    src="/photo/me.png"
    alt="AE Logo"
    className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 hover:scale-105"
    style={{ filter: "contrast(1.5) brightness(0.7)", mixBlendMode: "screen" }}
  />
);

const skillGroups = [
  {
    title: "FOUNDATIONS",
    items: [
      "Calculus",
      "Linear Algebra",
      "Probability & Statistics",
      "Discrete Mathematics",
      "Digital Logic & Computer Architecture",
    ],
  },
  {
    title: "CORE COMPUTING",
    items: [
      "Python, C++, OOP",
      "Data Structures & Algorithms",
      "Database Systems (SQL)",
      "Software Engineering",
      "Computer Networks & Security",
    ],
  },
  {
    title: "DATA SCIENCE & AI",
    items: [
      "Machine Learning",
      "Deep Learning (CNN, RNN, Transformers)",
      "Natural Language Processing",
      "Computer Vision & Speech",
      "Data Mining & Big Data",
    ],
  },
  {
    title: "TOOLING",
    items: ["Selenium & Web Scraping", "MLOps", "ETL & Data Governance", "Cloud Computing & GIS", "Explainable AI"],
  },
];

const experiences = [
  {
    year: "2024 — NOW",
    role: "DATA SCIENCE & AI UNDERGRADUATE",
    org: "University of Science and Technology, Zewail City — Giza, Egypt",
    points: [
      "Leading technical teams in major academic projects",
      "Research on the intersection of Neuroscience and AI (Project Neuro-Gen)",
      "Advanced Data Structures and Algorithms in C++",
    ],
  },
  {
    year: "2025",
    role: "PYTHON AUTOMATION DEVELOPER",
    org: "Self-Initiated Projects — Remote",
    points: [
      "Engineered a dynamic web scraper using Selenium & Python",
      "Automated data collection pipelines for large-scale datasets",
      "Optimized script performance on complex dynamic pages",
    ],
  },
  {
    year: "LATE 2025",
    role: "C++ SOFTWARE ARCHITECT",
    org: "Traffic Simulation System — Academic Project",
    points: [
      "Designed autonomous lane and intersection management logic",
      "Scalable architecture using inheritance and polymorphism",
      "Simulated real-world traffic flow and queuing systems",
    ],
  },
];

const projects = [
  {
    n: "01",
    title: "NEURO-GEN",
    tags: ["Research", "Deep Learning", "Neuroscience"],
    desc: "Research project exploring how generative models can be informed by neuroscience principles for more interpretable AI.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&h=1000&fit=crop",
  },
  {
    n: "02",
    title: "DYNAMIC WEB SCRAPER",
    tags: ["Python", "Selenium", "Automation"],
    desc: "A resilient scraping engine that handles dynamic elements, pagination and rate limits to build clean datasets end to end.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=900&fit=crop",
  },
  {
    n: "03",
    title: "TRAFFIC SIMULATION",
    tags: ["C++", "OOP", "System Design"],
    desc: "City-scale traffic simulator modelling intersections, queues and autonomous lane management with a polymorphic core.",
    image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=900&h=900&fit=crop",
  },
  {
    n: "04",
    title: "ML PLAYGROUND",
    tags: ["Machine Learning", "Python", "Data Viz"],
    desc: "A collection of models and notebooks — classification, NLP and computer vision experiments with evaluation dashboards.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&h=1000&fit=crop",
  },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSpline, setShowSpline] = useState(false);
  const splineWrapRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 0px)");
    const update = () => setShowSpline(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const section = aboutRef.current;
    if (!section) return;

    const getCanvas = (): HTMLCanvasElement | null => {
      const viewer = splineWrapRef.current?.querySelector("spline-viewer") as
        | (HTMLElement & { shadowRoot: ShadowRoot | null })
        | null;
      return (viewer?.shadowRoot?.querySelector("canvas") ??
        splineWrapRef.current?.querySelector("canvas") ??
        null) as HTMLCanvasElement | null;
    };

    const forward = (e: PointerEvent) => {
      const canvas = getCanvas();
      if (!canvas) return;
      for (const type of ["pointermove", "mousemove"]) {
        canvas.dispatchEvent(
          new MouseEvent(type, {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
      }
    };

    section.addEventListener("pointermove", forward);
    return () => section.removeEventListener("pointermove", forward);
  }, []);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv/Ahmed Ezzat_cv.pdf";
    link.download = "Ahmed_Ezzat_Allam_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full overflow-x-clip bg-black text-white">
      {/* ===== HERO ===== */}
      <div className="relative min-h-[100svh] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover lg:scale-[1.2]"
          src={heroVideo}
        />

        <div className="relative z-10 flex min-h-[100svh] flex-col px-5 sm:px-6 md:px-10 lg:px-14">
          {/* NAVBAR */}
          <nav className="flex items-center justify-between py-4 md:py-6">
            <Logo />
            <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="hover:opacity-70 transition-opacity">
                  <ScrambleText text={l.label} className="inline-block" />
                </a>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 hover:opacity-70"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </nav>

          {/* META GRID */}
          <div className="mt-2 md:mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div>
              <h2 className="text-lg md:text-xl tracking-wide leading-tight">
                <span className="font-normal block">AHMED EZZAT</span>
                <span className="font-pixel block text-2xl md:text-3xl">ALLAM</span>
              </h2>
              <div className="text-[10px] text-white/50 mt-3">*</div>
              <p className="font-pixel mt-1 text-xs text-white/60 leading-relaxed">
                Computer Science student{" "}
                <br className="hidden lg:block" />
                at Zewail City — building{" "}
                <br className="hidden lg:block" />
                at the intersection of code,{" "}
                <br className="hidden lg:block" />
                data and human curiosity
              </p>
            </div>

            <div className="text-right lg:text-left">
              <h2 className="text-lg md:text-xl tracking-wide leading-tight">
                <span className="font-normal block">DATA SCIENCE &amp;</span>
                <span className="font-pixel block text-2xl md:text-3xl">AI</span>
              </h2>
            </div>

            <div>
              <p className="text-base tracking-widest text-white/50 uppercase mb-3 font-pixel">
                What I Do
              </p>
              <p className="text-sm text-white/90 leading-relaxed max-w-[220px]">
                I build intelligent systems, automation and data-driven products
              </p>
            </div>

            <div className="text-right lg:text-left">
              <p className="text-base tracking-widest text-white/50 uppercase mb-3 font-pixel">
                Focus
              </p>
              <ul className="text-sm text-white/90 leading-relaxed space-y-0.5">
                <li>Machine Learning &amp; Deep Learning</li>
                <li>Data Science &amp; Analytics</li>
                <li>Python Automation</li>
                <li>C++ / System Design</li>
                <li>NLP &amp; Computer Vision</li>
                <li>Research &amp; Team Leadership</li>
              </ul>
            </div>
          </div>

          <div className="flex-1 min-h-8" />

          {/* BOTTOM */}
          <div className="pb-6 md:pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] tracking-wide uppercase font-normal leading-[0.82] sm:leading-[0.78] md:leading-[0.75] lg:leading-[0.72]"
              >
                I TURN
                <br />
                <span className="font-pixel font-normal text-[1.25em] inline-block leading-none align-baseline">
                  DATA
                </span>{" "}
                INTO
                <br />
                INTELLIGENT
                <br />
                <span className="font-pixel font-normal text-[1.25em] inline-block leading-none align-baseline">
                  EXPERIENCES
                </span>
              </h1>

              <div className="flex flex-col gap-4 sm:gap-6 justify-end">
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="flex flex-1 sm:flex-none items-center justify-center gap-3 border border-white/30 px-5 sm:px-6 py-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Play size={14} fill="white" />
                    <span className="text-sm tracking-wider whitespace-nowrap">VIEW PROJECTS</span>
                  </a>
                  <button
                    onClick={downloadCV}
                    className="flex flex-1 sm:flex-none items-center justify-center gap-3 border border-white/30 px-5 sm:px-6 py-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Download size={14} />
                    <span className="text-sm tracking-wider whitespace-nowrap">DOWNLOAD CV</span>
                  </button>
                </div>

                <div className="self-start lg:self-end flex flex-wrap items-stretch gap-2 sm:gap-3 text-sm text-white/80">
                  <div className="bg-[#0B0B0B] px-3 sm:px-4 py-2 flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base tracking-tight">PYTHON</span>
                    <span className="text-white/50 text-xs">ML</span>
                  </div>
                  <div className="bg-[#0B0B0B] px-3 sm:px-4 py-2 flex items-center gap-2">
                    <span className="font-bold text-lg sm:text-xl">C++</span>
                    <span className="text-white/50 text-xs">OOP</span>
                  </div>
                  <div className="bg-[#0B0B0B] px-3 sm:px-4 py-2 flex items-center gap-2">
                    <span className="font-bold text-[10px] sm:text-xs tracking-tight">ZEWAIL CITY</span>
                    <span className="text-white/50 text-xs">CS/AI</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-4">
              <p className="text-xs text-white/60">
                Open to internships, freelance or research collaboration.{" "}
                <a href="#contact" className="text-red-500 hover:text-red-400 transition-colors">
                  Start a conversation
                </a>
              </p>
              <p className="text-xs text-white/60 sm:text-right">
                4 featured projects &bull; 3 experiences &bull; 20+ skills
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ABOUT ===== */}
      <section ref={aboutRef} id="about" className="relative overflow-hidden border-t border-white/10 px-5 sm:px-6 md:px-10 lg:px-14 md:min-h-screen flex flex-col justify-center py-16 md:py-32">
        <div className="absolute inset-0 z-0 pointer-events-none" ref={splineWrapRef}>
          {showSpline ? (
            <>
              {/* @ts-expect-error spline-viewer web component */}
              <spline-viewer
                url="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
                style={{ width: "100%", height: "100%", display: "block" }}
              />
            </>
          ) : (
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.18), transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(255,255,255,0.06), transparent 55%)",
              }}
            />
          )}
        </div>
        <div className="absolute inset-0 z-[1] bg-black/70 pointer-events-none" />

        <div className="relative z-10 w-full">
          <Reveal>
            <p className="font-pixel text-xs tracking-widest text-white/50 uppercase mb-8">* About</p>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-10">
            <Reveal delay={80}>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide"
                style={{ lineHeight: 0.85 }}
              >
                A STUDENT
                <br />
                <span className="font-pixel text-[1.2em] leading-none">OBSESSED</span>
                <br />
                WITH BUILDING
              </h2>
            </Reveal>
            <div className="space-y-6 text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
              <Reveal delay={160}>
                <p>
                  A dedicated and ambitious student with a strong foundation in programming, data science
                  and AI. I enjoy building projects, learning new technologies and collaborating with
                  others to create impactful solutions.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p>
                  I believe in learning by doing — most of what I know came from shipping projects that
                  forced me to apply theory to real problems, from automation scripts to full simulation
                  engines.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div>
                    <p className="font-pixel text-2xl text-white">2024</p>
                    <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Started CS/AI</p>
                  </div>
                  <div>
                    <p className="font-pixel text-2xl text-white">GIZA</p>
                    <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Egypt</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <a
                  href="https://wa.me/201140674371"
                  target="_blank"
                  rel="noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-3 border border-white/30 px-6 py-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors w-fit"
                >
                  <MessageCircle size={14} />
                  <span className="text-sm tracking-wider">LET'S CHAT</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <div id="skills">
        <WhatIKnow />
      </div>

      {/* ===== EXPERIENCE ===== */}
      <section
        id="experience"
        className="relative border-t border-white/10 md:min-h-screen flex flex-col justify-center py-16 md:py-32 overflow-hidden"
      >
        <div className="pointer-events-none absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-red-600/[0.07] blur-[140px]" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[80px_1fr]">
          <div className="hidden lg:flex items-start justify-center pt-2 border-r border-white/10">
            <span className="font-pixel text-[10px] tracking-[0.4em] uppercase text-red-500 [writing-mode:vertical-lr] rotate-180">
              03 / Timeline
            </span>
          </div>

          <div className="px-5 sm:px-6 md:px-10 lg:px-14 min-w-0">
            <Reveal>
              <div className="flex items-end justify-between border-b border-white/15 pb-5 mb-2">
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight"
                  style={{ lineHeight: 0.85 }}
                >
                  A JOURNEY OF{" "}
                  <span className="font-pixel text-[1.15em] leading-none">GROWTH</span>
                </h2>
                <span className="font-pixel text-[10px] tracking-[0.3em] text-white/70 hidden sm:block">
                  {experiences.length} ROLES
                </span>
              </div>
            </Reveal>

            <div>
              {experiences.map((e, i) => (
                <Reveal key={e.role} delay={140 + i * 130}>
                  <div className="group relative grid lg:grid-cols-[190px_1fr] gap-3 lg:gap-12 border-b border-white/10 py-7 md:py-9">
                    <span className="pointer-events-none absolute left-0 bottom-0 h-px w-0 bg-red-500 transition-all duration-700 group-hover:w-full" />
                    <div className="flex items-center gap-4">
                      <span className="font-pixel text-3xl text-white/10 transition-colors duration-500 group-hover:text-red-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-pixel text-[11px] tracking-[0.2em] text-white/50">{e.year}</p>
                    </div>
                    <div className="min-w-0 transition-transform duration-500 lg:group-hover:translate-x-2">
                      <h3 className="text-xl md:text-3xl uppercase tracking-tight transition-colors duration-500 group-hover:text-red-500 break-words">
                        <ScrambleText text={e.role} className="inline-block" />
                      </h3>
                      <p className="font-pixel text-[10px] tracking-[0.2em] text-white/40 mt-2 uppercase">
                        {e.org}
                      </p>
                      <ul className="mt-5 space-y-2 text-sm text-white/60 max-w-2xl">
                        {e.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span className="text-red-500">—</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section
        id="projects"
        className="relative border-t border-white/10 md:min-h-screen flex flex-col justify-center py-16 md:py-32 overflow-hidden bg-black"
      >
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[520px] w-[520px] rounded-full bg-white/[0.05] blur-[140px]" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[80px_1fr]">
          <div className="hidden lg:flex items-start justify-center pt-2 border-r border-white/10">
            <span className="font-pixel text-[10px] tracking-[0.4em] uppercase text-red-500 [writing-mode:vertical-lr] rotate-180">
              04 / Selected Work
            </span>
          </div>

          <div className="px-5 sm:px-6 md:px-10 lg:px-14 min-w-0">
            <Reveal>
              <div className="border-b border-white/15 pb-5">
                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" aria-hidden="true" />
                    <h2
                      className="text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight"
                      style={{ lineHeight: 0.85 }}
                    >
                      SELECTED{" "}
                      <span className="font-pixel text-[1.15em] leading-none">WORK</span>
                    </h2>
                  </div>
                  <span className="font-pixel text-[10px] tracking-[0.3em] text-white/70 hidden sm:block">
                    {railProjects?.length || 4} PROJECTS
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-sm md:text-base text-white/50 leading-relaxed mt-5 max-w-2xl">
                A collection of experiments and shipped systems — from neuroscience-inspired AI to
                real-world automation and simulation tools.
              </p>
            </Reveal>

            <ProjectRail />
          </div>
        </div>
      </section>

      {/* ===== CONTACT / MOON ===== */}
      <ContactsSlide />

      {/* ===== FOOTER ===== */}
      <footer className="hero-section relative pt-8 bg-black text-white border-t border-white/10">
        <div className="relative h-24 sm:h-32 w-full overflow-hidden">
          <WaveCanvas />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
            <div>
              <div
                className="flex items-center gap-2 mb-6 cursor-pointer w-fit"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="text-sm font-medium tracking-wider" style={{ color: "hsl(0,0%,90%)" }}>
                  AHMED EZZAT ALLAM
                </span>
              </div>
              <h3 className="text-display text-2xl md:text-3xl leading-snug" style={{ color: "hsl(0,0%,85%)" }}>
                Turning data and code into intelligent, high-performance web and AI experiences
              </h3>
              <p className="text-body text-sm mt-4" style={{ color: "hsl(0,0%,45%)" }}>
                Computer Science & AI Undergraduate at Zewail City — building cutting-edge software and scalable systems.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105 inline-flex items-center justify-center bg-white text-black"
                >
                  Start Building
                </a>
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-full text-sm border transition-colors duration-300 hover:border-white/50 inline-flex items-center justify-center text-white/70 border-white/25"
                >
                  View Projects
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <h4 className="text-xs tracking-wider mb-4 text-body" style={{ color: "hsl(0,0%,50%)" }}>NAVIGATION</h4>
                <ul className="space-y-3">
                  <li><a href="#about" className="text-sm text-white/70 hover:underline">About</a></li>
                  <li><a href="#skills" className="text-sm text-white/70 hover:underline">Skills</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs tracking-wider mb-4 text-body" style={{ color: "hsl(0,0%,50%)" }}>EXPERIENCE</h4>
                <ul className="space-y-3">
                  <li><a href="#experience" className="text-sm text-white/70 hover:underline">Timeline</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs tracking-wider mb-4 text-body" style={{ color: "hsl(0,0%,50%)" }}>WORK</h4>
                <ul className="space-y-3">
                  <li><a href="#projects" className="text-sm text-white/70 hover:underline">Selected Work</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs tracking-wider mb-4 text-body" style={{ color: "hsl(0,0%,50%)" }}>CONNECT</h4>
                <ul className="space-y-3">
                  <li><a href="#contact" className="text-sm text-white/70 hover:underline">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 pt-8 flex flex-col items-center gap-6" style={{ borderTop: "1px solid hsl(0,0%,15%)" }}>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 text-center">
              6th of October City, Giza, Egypt — Zewail City of Science and Technology
            </div>

            <div className="flex items-center gap-6">
              {[
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                },
                {
                  name: "GitHub",
                  href: "https://github.com",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                },
                {
                  name: "Email",
                  href: "mailto:s-ahmed.allam@zewailcity.edu.eg",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-2 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                  style={{ color: "hsl(0,0%,50%)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(0,0%,90%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(0,0%,50%)")}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <span className="text-xs text-body text-center" style={{ color: "hsl(0,0%,40%)" }}>
                © {new Date().getFullYear()} AHMED EZZAT ALLAM. ALL RIGHTS RESERVED.
              </span>
            </div>
          </div>

          {/* Watermark Name */}
          <div className="mt-8 flex justify-center overflow-hidden">
            <p className="text-[35px] md:text-[75px] leading-none tracking-tight select-none uppercase font-bold text-white/5">
              Ahmed Ezzat
            </p>
          </div>
        </div>
      </footer>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 py-4">
          <Logo />
          <button onClick={() => setMenuOpen(false)} className="p-2 hover:opacity-70" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8 py-6">
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`text-2xl tracking-widest transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms" }}
            >
              <ScrambleText text={l.label} className="inline-block" />
            </a>
          ))}
          <div className="flex flex-col items-center gap-4 mt-6 w-full px-8 max-w-xs">
            <button
              onClick={() => {
                setMenuOpen(false);
                downloadCV();
              }}
              className="flex items-center justify-center gap-3 border border-white/30 px-6 py-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors w-full"
            >
              <Download size={14} />
              <span className="text-sm tracking-wider whitespace-nowrap">DOWNLOAD CV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;