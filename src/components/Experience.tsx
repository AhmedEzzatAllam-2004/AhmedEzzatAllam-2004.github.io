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
    current: true,
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
    current: false,
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
    current: false,
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative border-t border-white/10 md:min-h-screen flex flex-col justify-center py-16 md:py-32 overflow-hidden"
    >
      {/* خلفية: glow أحمر خفيف على اليمين */}
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-red-600/[0.07] blur-[140px]" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[80px_1fr]">
        {/* Sidebar */}
        <div className="hidden lg:flex items-start justify-center pt-2 border-r border-white/10">
          <span className="font-pixel text-[10px] tracking-[0.4em] uppercase text-red-500 [writing-mode:vertical-lr] rotate-180">
            03 / Timeline
          </span>
        </div>

        <div className="px-5 sm:px-6 md:px-10 lg:px-14 min-w-0">
          {/* Header */}
          <Reveal>
            <div className="flex items-end justify-between border-b border-white/20 pb-5 mb-2">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight"
                style={{ lineHeight: 0.85 }}
              >
                A JOURNEY OF{" "}
                <span className="font-pixel text-[1.15em] leading-none">GROWTH</span>
              </h2>
              <span className="font-pixel text-[10px] tracking-[0.3em] text-white/85 hidden sm:block">
                {experiences.length} ROLES
              </span>
            </div>
          </Reveal>

          {/* Timeline items — مع خط رأسي بيوصل بينهم */}
          <div className="relative">
            {/* الخط الرأسي الأحمر الخفيف — بيمتد من أول أخر عنصر */}
            <span
              className="absolute left-[7px] md:left-[7px] top-8 bottom-8 w-px bg-gradient-to-b from-red-500/60 via-red-500/20 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {experiences.map((e, i) => (
              <Reveal key={e.role} delay={140 + i * 130}>
                <div className="group relative pl-8 md:pl-10 grid lg:grid-cols-[190px_1fr] gap-3 lg:gap-12 border-b border-white/15 py-7 md:py-9 transition-all duration-500 hover:bg-white/[0.015]">
                  {/* Hover effect: خط أحمر بيمتد تحت العنصر */}
                  <span className="pointer-events-none absolute left-8 md:left-10 bottom-0 h-px w-0 bg-red-500 transition-all duration-700 group-hover:w-[calc(100%-2rem)]" />

                  {/* Dot بيوصل بالخط الرأسي — بيلمع لما hover */}
                  <span
                    className="absolute left-0 top-[2.2rem] h-3.5 w-3.5 rounded-full border-2 border-red-500 bg-black transition-all duration-500 group-hover:bg-red-500 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
                    aria-hidden="true"
                  >
                    {/* النقطة اللي بـ يومّض لو ده الـ current role */}
                    {e.current && (
                      <span className="absolute inset-0.5 rounded-full bg-red-500 animate-ping" />
                    )}
                  </span>

                  {/* Year + number */}
                  <div className="flex items-center gap-4">
                    <span className="font-pixel text-3xl text-white/15 transition-colors duration-500 group-hover:text-red-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-pixel text-[11px] tracking-[0.2em] text-white/70">
                      {e.year}
                    </p>
                  </div>

                  {/* Role + points */}
                  <div className="min-w-0 transition-transform duration-500 lg:group-hover:translate-x-2">
                    <div className="flex items-center gap-3">
                      {e.current && (
                        <span className="font-pixel text-[10px] tracking-[0.2em] text-red-500 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full">
                          NOW
                        </span>
                      )}
                      <h3 className="text-xl md:text-3xl uppercase tracking-tight transition-colors duration-500 group-hover:text-red-500 break-words">
                        <ScrambleText text={e.role} className="inline-block" />
                      </h3>
                    </div>
                    <p className="font-pixel text-[10px] tracking-[0.2em] text-white/70 mt-2 uppercase">
                      {e.org}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-white/75 max-w-2xl">
                      {e.points.map((p, pi) => (
                        <li
                          key={p}
                          className="flex gap-3 transition-transform duration-300 group-hover:translate-x-1"
                          style={{ transitionDelay: `${pi * 50}ms` }}
                        >
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
