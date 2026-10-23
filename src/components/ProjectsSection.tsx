import Reveal from "@/components/Reveal";
import ProjectRail, { railProjects } from "@/components/ProjectRail";

// اسمه ProjectsSection مش Projects، علشان ميتلخبطش مع ملف Projects.tsx القديم غير
// المستخدم (نسخة تجريبية سابقة) لو لسه موجود عندك قبل ما تمسحه.
const ProjectsSection = () => {
  return (
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
            <div className="border-b border-white/20 pb-5">
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
                {/* Contrast fix: text-white/85 بدل text-white/70 */}
                <span className="font-pixel text-[10px] tracking-[0.3em] text-white/85 hidden sm:block">
                  {railProjects?.length || 4} PROJECTS
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            {/* Contrast fix: text-white/75 بدل text-white/50 */}
            <p className="text-sm md:text-base text-white/75 leading-relaxed mt-5 max-w-2xl">
              A collection of experiments and shipped systems — from neuroscience-inspired AI to
              real-world automation and simulation tools.
            </p>
          </Reveal>

          <ProjectRail />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
