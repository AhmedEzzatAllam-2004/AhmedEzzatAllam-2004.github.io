import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Project = {
  n: string;
  title: string;
  tags: string[];
  desc: string;
  image: string;
};

interface ProjectCardProps {
  project: Project;
  large?: boolean;
}

const EASE = "cubic-bezier(0.16,1,0.3,1)";

const ProjectCard = ({ project, large }: ProjectCardProps) => {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setPos({ x, y });
    setTilt({
      rx: ((y / r.height) - 0.5) * -6,
      ry: ((x / r.width) - 0.5) * 6,
    });
  };

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setTilt({ rx: 0, ry: 0 });
      }}
      onMouseMove={handleMove}
      className="group relative h-full w-full overflow-hidden cursor-none rounded-[2px] border border-white/10 bg-white/[0.02]"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        transition: `transform 700ms ${EASE}, border-color 500ms ${EASE}`,
      }}
    >
      {/* image with slow parallax zoom */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{
          transform: hover ? "scale(1.08)" : "scale(1)",
          filter: hover ? "saturate(1.05) brightness(0.92)" : "saturate(0.9) brightness(0.82)",
          transition: `transform 1200ms ${EASE}, filter 900ms ${EASE}`,
        }}
      />

      {/* soft dark veil */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        style={{ opacity: hover ? 0.9 : 0.65, transition: `opacity 700ms ${EASE}` }}
      />

      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute -inset-px"
        style={{
          background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, hsl(var(--primary) / 0.18), transparent 65%)`,
          opacity: hover ? 1 : 0,
          transition: `opacity 600ms ${EASE}`,
        }}
      />

      {/* index */}
      <span className="absolute top-4 left-4 font-pixel text-[10px] tracking-[0.25em] text-white/70 mix-blend-difference">
        {project.n}
      </span>

      {/* title block slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <h3
          className={`uppercase tracking-tight ${large ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"}`}
          style={{
            lineHeight: 0.95,
            transform: hover ? "translateY(0)" : "translateY(10px)",
            opacity: hover ? 1 : 0.85,
            transition: `transform 700ms ${EASE}, opacity 700ms ${EASE}`,
          }}
        >
          {project.title}
        </h3>
        <div
          className="mt-3 flex flex-wrap gap-2 overflow-hidden"
          style={{
            maxHeight: hover ? 60 : 0,
            opacity: hover ? 1 : 0,
            transition: `max-height 700ms ${EASE}, opacity 500ms ${EASE}`,
          }}
        >
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-pixel text-[9px] tracking-[0.2em] uppercase text-white/70 border border-white/20 px-2 py-1 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
        {/* animated underline */}
        <div
          className="mt-4 h-px bg-white/60 origin-left"
          style={{
            transform: hover ? "scaleX(1)" : "scaleX(0)",
            transition: `transform 800ms ${EASE}`,
          }}
        />
      </div>

      {/* magnetic cursor pill */}
      <div
        className="pointer-events-none absolute z-20 hidden md:flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md text-[10px] font-pixel tracking-[0.25em] uppercase text-white"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${hover ? 1 : 0.6})`,
          opacity: hover ? 1 : 0,
          transition: `opacity 350ms ${EASE}, transform 450ms ${EASE}`,
        }}
      >
        View Project
        <ArrowUpRight size={12} />
      </div>
    </article>
  );
};

export default ProjectCard;
