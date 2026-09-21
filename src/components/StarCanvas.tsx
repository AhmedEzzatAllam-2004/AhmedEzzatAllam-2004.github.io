import { useEffect, useRef } from "react";

const StarCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId: number;

    type Star = { x: number; y: number; z: number; pz: number; size: number };
    const STAR_COUNT = 400;
    const stars: Star[] = [];

    const makeStar = (): Star => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      pz: 0,
      size: Math.random() * 1.2 + 0.3,
    });

    for (let i = 0; i < STAR_COUNT; i++) stars.push(makeStar());

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      targetScrollRef.current = max > 0 ? window.scrollY / max : 0;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const draw = () => {
      // ease scroll
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.05;
      const warp = 0.5 + scrollRef.current * 6; // speed multiplier from scroll

      ctx.fillStyle = "rgba(8, 8, 10, 0.35)";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= warp;
        if (s.z < 1) {
          const ns = makeStar();
          s.x = ns.x;
          s.y = ns.y;
          s.z = width;
          s.pz = s.z;
          s.size = ns.size;
        }

        const k = 128 / s.z;
        const px = s.x * k;
        const py = s.y * k;

        const pk = 128 / s.pz;
        const ppx = s.x * pk;
        const ppy = s.y * pk;

        const alpha = Math.min(1, (1 - s.z / width) * 1.2);
        const size = s.size * (1 - s.z / width) * 1.8 + 0.2;

        if (warp > 1.5) {
          // motion streaks when scrolling fast
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default StarCanvas;
