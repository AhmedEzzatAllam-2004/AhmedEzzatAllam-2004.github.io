"use client";

import { Play, Download } from "lucide-react";
import heroVideo from "@/assets/hero-bg.mp4";
import Navigation from "@/components/Navigation";
import { downloadCV } from "@/lib/download-cv";

const Hero = () => {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover lg:scale-[1.2]"
        src={heroVideo}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 sm:px-6 md:px-10 lg:px-14">
        <Navigation />

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

          {/* FOCUS section: مخفي على الموبايل لإنه بياخد مساحة كبيرة ويقع على
              الوجه في الفيديو. بيرجع يظهر من md وفوق. */}
          <div className="hidden md:block text-right lg:text-left lg:col-span-1">
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
        {/*
          CLS fix: الـ H1 عنده 4 سطور + spans بـ font-pixel (basis33) اللي بيتحمّل
          async. لما الـ font يوصل، الـ spans بتعمل reflow، وgrid-cols-2 items-end
          بيحرّك العمود اليمين (الأزرار والإحصائيات) تحت → layout shift 0.106.

          الحل: نحجز مساحة الـ H1 مسبقاً بـ min-h-[3.5em]. em بيتكيّف مع حجم
          الخط لكل breakpoint، فالقيمة 3.5em بتساوي تقريباً ارتفاع 4 سطور مع
          leading-[0.82] لـ[0.72] (المتوسط ≈ 0.78 × 4 = 3.12em + هامش أمان).
        */}
        <div className="pb-6 md:pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] tracking-wide uppercase font-normal leading-[0.82] sm:leading-[0.78] md:leading-[0.75] lg:leading-[0.72] min-h-[3.5em] sm:min-h-[3.4em] md:min-h-[3.4em] lg:min-h-[3.5em]"
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
  );
};

export default Hero;
