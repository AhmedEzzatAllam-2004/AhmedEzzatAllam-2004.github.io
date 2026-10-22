import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";

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

const Experience = () => {
  return (
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
  );
};

export default Experience;