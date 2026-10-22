"use client";

import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import SplineAboutBackground from "@/components/SplineAboutBackground";

const About = () => {
  const aboutRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative overflow-hidden border-t border-white/10 px-5 sm:px-6 md:px-10 lg:px-14 md:min-h-screen flex flex-col justify-center py-16 md:py-32"
    >
      {/* Spline 3D background — السكريبت والمشهد بيتحمّلوا بس على الشاشات الكبيرة، وبس لما القسم يقرّب من الشاشة */}
      <SplineAboutBackground containerRef={aboutRef} />
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
  );
};

export default About;