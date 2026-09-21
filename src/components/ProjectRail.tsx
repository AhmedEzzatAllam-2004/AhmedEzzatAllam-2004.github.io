import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

type Frame = { icon: string; text: string };

export type RailProject = {
  n: string;
  title: string;
  category: string;
  stat: string;
  statLabel: string;
  accent: string;
  image: string;
  video?: string;
  frames: Frame[];
  link?: string;
};

export const railProjects: RailProject[] = [
  {
    n: "01",
    title: "NEURO-GEN",
    category: "Research / Deep Learning",
    stat: "94%",
    statLabel: "Model accuracy",
    accent: "168,55%,45%",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&h=900&fit=crop",
    frames: [
      { icon: "🧠", text: "Neuroscience-informed generative core" },
      { icon: "📉", text: "Interpretability & saliency analysis" },
      { icon: "🧪", text: "Ablation experiments pipeline" },
      { icon: "📄", text: "Reproducible research notebooks" },
    ],
    link: "https://github.com",
  },
  {
    n: "02",
    title: "DYNAMIC WEB SCRAPER",
    category: "Python / Automation",
    stat: "120K+",
    statLabel: "Records collected",
    accent: "30,80%,50%",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop",
    frames: [
      { icon: "🕸️", text: "Selenium engine for dynamic pages" },
      { icon: "🔁", text: "Retry, rate-limit & pagination logic" },
      { icon: "🧹", text: "Automated cleaning pipeline" },
      { icon: "🗄️", text: "Structured dataset export" },
    ],
    link: "https://github.com",
  },
  {
    n: "03",
    title: "TRAFFIC SIMULATION",
    category: "C++ / System Design",
    stat: "99.9%",
    statLabel: "Sim stability",
    accent: "210,60%,50%",
    image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=1400&h=900&fit=crop",
    frames: [
      { icon: "🚦", text: "Adaptive intersection controller" },
      { icon: "🧬", text: "Polymorphic vehicle hierarchy" },
      { icon: "📊", text: "Queue & throughput metrics" },
      { icon: "⚡", text: "Emergency priority routing" },
    ],
    link: "https://github.com",
  },
  {
    n: "04",
    title: "ML PLAYGROUND",
    category: "Machine Learning / Data Viz",
    stat: "18",
    statLabel: "Models shipped",
    accent: "260,50%,55%",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&h=900&fit=crop",
    frames: [
      { icon: "🤖", text: "Classification & NLP experiments" },
      { icon: "👁️", text: "Computer vision baselines" },
      { icon: "📈", text: "Evaluation dashboards" },
      { icon: "📚", text: "Documented notebooks" },
    ],
    link: "https://github.com",
  },
  {
    n: "05",
    title: "NLP SENTIMENT ENGINE",
    category: "NLP / Transformers",
    stat: "1.2M",
    statLabel: "Tokens processed",
    accent: "300,45%,52%",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1400&h=900&fit=crop",
    frames: [
      { icon: "💬", text: "Arabic + English sentiment model" },
      { icon: "🔤", text: "Custom tokenizer & embeddings" },
      { icon: "🎯", text: "Fine-tuned transformer head" },
      { icon: "🚀", text: "Served through a lightweight API" },
    ],
    link: "https://github.com",
  },
  {
    n: "06",
    title: "SMART DATA DASHBOARD",
    category: "Full-Stack / Realtime",
    stat: "24/7",
    statLabel: "Live monitoring",
    accent: "190,65%,45%",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop",
    frames: [
      { icon: "📡", text: "Streaming metrics over sockets" },
      { icon: "📊", text: "Auto-refreshing live charts" },
      { icon: "🧩", text: "Composable KPI widgets" },
      { icon: "📋", text: "Custom report builder" },
    ],
    link: "https://github.com",
  },
];

/* ── هل الجهاز بيدعم hover حقيقي (ماوس)؟ على الموبايل/التابلت false ── */
const useCanHover = () => {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canHover;
};

/* ── animated stat counter ── */
const AnimatedStat = ({ value, active }: { value: string; active: boolean }) => {
  const [display, setDisplay] = useState("0");
  const suffix = value.replace(/^[\d.]+/, "");

  useEffect(() => {
    // تم نقل المتغير match بداخل الـ useEffect لحل مشكلة الاعتماديات
    const match = value.match(/^([\d.]+)/);

    if (!active || !match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = target * eased;
      setDisplay(target % 1 !== 0 ? cur.toFixed(1) : Math.floor(cur).toString());
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
};

const RailCard = ({ p, canHover }: { p: RailProject; canHover: boolean }) => {
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const [frame, setFrame] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!hover) return;
    setFrame(0);
    const id = setInterval(() => setFrame((f) => (f + 1) % p.frames.length), 900);
    return () => clearInterval(id);
  }, [hover, p.frames.length]);

  const handleMove = (e: React.MouseEvent) => {
    if (!canHover) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setPos({ x, y });
    setTilt({ rx: (y / r.height - 0.5) * -7, ry: (x / r.width - 0.5) * 7 });
  };

  return (
    <article
      ref={ref}
      // على الأجهزة اللي فيها ماوس: hover عادي. على اللمس: الضغطة على الكارت بتفتح/تقفل الـ overlay.
      onMouseEnter={() => canHover && setHover(true)}
      onMouseLeave={() => {
        if (!canHover) return;
        setHover(false);
        setTilt({ rx: 0, ry: 0 });
      }}
      onMouseMove={handleMove}
      onClick={() => {
        if (!canHover) setHover((v) => !v);
      }}
      className="group relative shrink-0 snap-center w-[82vw] sm:w-[520px] lg:w-[560px] overflow-hidden border border-white/10 bg-white/[0.02]"
      style={{
        borderRadius: 18,
        opacity: inView ? 1 : 0,
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${
          inView ? 0 : 40
        }px)`,
        transition: `transform 700ms ${EASE}, opacity 800ms ${EASE}, border-color 500ms ${EASE}`,
        boxShadow: hover ? `0 0 40px -12px hsla(${p.accent},0.45)` : "none",
      }}
    >
      {/* media */}
      <div className="relative h-[240px] sm:h-[300px] overflow-hidden pointer-events-none">
        {p.video ? (
          <video
            src={p.video}
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{
              transform: hover ? "scale(1.08)" : "scale(1)",
              filter: hover ? "brightness(0.6)" : "brightness(0.85)",
              transition: `transform 1200ms ${EASE}, filter 700ms ${EASE}`,
            }}
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, hsla(${p.accent},0.35), transparent 65%)`,
            opacity: hover ? 1 : 0.5,
            transition: `opacity 600ms ${EASE}`,
          }}
        />
        <div
          className="pointer-events-none absolute -inset-px"
          style={{
            background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, hsla(${p.accent},0.28), transparent 62%)`,
            opacity: hover ? 1 : 0,
            transition: `opacity 500ms ${EASE}`,
          }}
        />

        <span className="absolute top-4 left-4 font-pixel text-[10px] tracking-[0.3em] text-white/70">
          {p.n}
        </span>

        {/* stat (idle) */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{
            opacity: hover ? 0 : 1,
            transform: hover ? "scale(0.94)" : "scale(1)",
            transition: `opacity 400ms ${EASE}, transform 600ms ${EASE}`,
          }}
        >
          <p className="text-4xl md:text-5xl font-display text-white">
            <AnimatedStat value={p.stat} active={inView} />
          </p>
          <p className="mt-2 font-pixel text-[10px] tracking-[0.3em] uppercase text-white/70">
            {p.statLabel}
          </p>
        </div>

        {/* rotating frames (hover / tap) */}
        <div
          className="absolute inset-3 flex items-center justify-center rounded-2xl border border-white/15"
          style={{
            background: "hsla(0,0%,0%,0.4)",
            backdropFilter: "blur(8px)",
            opacity: hover ? 1 : 0,
            transform: hover ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 450ms ${EASE}, transform 600ms ${EASE}`,
          }}
        >
          <div key={frame} className="px-6 text-center animate-fade-up">
            <p className="text-3xl">{p.frames[frame].icon}</p>
            <p className="mt-3 text-sm text-white">{p.frames[frame].text}</p>
            <div className="mt-4 flex justify-center gap-1.5">
              {p.frames.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full"
                  style={{
                    width: i === frame ? 16 : 6,
                    background: i === frame ? "white" : "hsla(0,0%,100%,0.3)",
                    transition: `all 300ms ${EASE}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* info */}
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg uppercase tracking-tight text-white break-words">{p.title}</h3>
            <p className="mt-1 font-pixel text-[10px] tracking-[0.25em] uppercase text-white/45">
              {p.category}
            </p>
          </div>

          {/* على اللمس اللينك ظاهر دايماً (مفيش hover يظهره)، وحجمه 40px علشان الصباع يدوس عليه بسهولة */}
          <a
            href={p.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            download={p.link?.endsWith(".apk")}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${p.title}`}
            className="flex h-10 w-10 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full cursor-pointer z-10 transition-transform duration-300 hover:brightness-125 pointer-events-auto"
            style={{
              background: `hsla(${p.accent},0.15)`,
              color: `hsl(${p.accent})`,
              opacity: hover || !canHover ? 1 : 0,
              transform: hover || !canHover ? "scale(1)" : "scale(0.7)",
              transition: `opacity 400ms ${EASE}, transform 500ms ${EASE}`,
            }}
          >
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div
          className="mt-4 h-px origin-left"
          style={{
            background: `hsla(${p.accent},0.4)`,
            transform: hover ? "scaleX(1)" : "scaleX(0.15)",
            transition: `transform 800ms ${EASE}`,
          }}
        />
      </div>
    </article>
  );
};

const ProjectRail = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const canHover = useCanHover();

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="mt-10 min-w-0 max-w-full">
      <div className="flex items-center justify-between gap-4">
        <p className="font-pixel text-[10px] tracking-[0.3em] uppercase text-white/40">
          <span className="md:hidden">Swipe to see more →</span>
          <span className="hidden md:inline">Scroll right to see more →</span>
        </p>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous projects"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white z-10"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next projects"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white z-10"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* overscroll-x-contain: السحب الأفقي جوه الـ rail مش بيعمل back/forward للمتصفح */}
      <div
        ref={railRef}
        onScroll={onScroll}
        className="mt-5 flex gap-4 sm:gap-5 overflow-x-auto overscroll-x-contain pb-6 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {railProjects.map((p) => (
          <RailCard key={p.n} p={p} canHover={canHover} />
        ))}
        <div className="shrink-0 w-2" aria-hidden="true" />
      </div>

      <div className="h-px w-full bg-white/10">
        <div
          className="h-px bg-white/70 origin-left"
          style={{
            width: `${Math.max(12, progress * 100)}%`,
            transition: "width 200ms linear",
          }}
        />
      </div>
    </div>
  );
};

export default ProjectRail;