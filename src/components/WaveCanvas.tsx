import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const WaveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let lastMoveTime = Date.now();
    let isMorphing = false;
    let isVisible = true;
    let particles: Particle[] = [];
    let textPositions: { x: number; y: number }[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let lastFrame = 0;
    let resizeTimer: number | undefined;

    // ─── cached rect لاستخدامه في الـ touch events فقط ───
    // عشان نتجنّب getBoundingClientRect() على كل touchmove (forced reflow).
    // بنحدّث الـ cache على resize و scroll والـ visibility change بس.
    let cachedRect: DOMRect | null = null;
    const refreshRect = () => {
      cachedRect = canvas.getBoundingClientRect();
    };

    const MORPH_DELAY = 2000;

    const getQuality = () => {
      if (window.innerWidth < 640) {
        return {
          dpr: Math.min(window.devicePixelRatio || 1, 1.1),
          particleCount: 200,
          textGap: 6,
          waveLines: 3,
          waveStep: 10,
          fps: 18,
          repulsionRadius: 72,
          connectionDistance: 35,
        };
      }

      if (window.innerWidth < 1024) {
        return {
          dpr: Math.min(window.devicePixelRatio || 1, 1.35),
          particleCount: 350,
          textGap: 5,
          waveLines: 4,
          waveStep: 8,
          fps: 24,
          repulsionRadius: 84,
          connectionDistance: 45,
        };
      }

      return {
        dpr: Math.min(window.devicePixelRatio || 1, 1.6),
        particleCount: 600,
        textGap: 4,
        waveLines: 6,
        waveStep: 4,
        fps: 30,
        repulsionRadius: 100,
        connectionDistance: 55,
      };
    };

    let quality = getQuality();

    const resize = () => {
      quality = getQuality();
      dpr = quality.dpr;
      // نقرأ الـ offsetWidth/Height مع بعض (read batch)، وبعدين نكتب الـ width/height
      // (write batch). ده pattern صحيح مابيعملش forced reflow — الـ reads كلها
      // قبيل الـ writes، فالمتصفح مابيرجعش يعمل layout في النص.
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      // لو الـ canvas لسه ملوش مقاس، getImageData هترمي error
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateTextPositions();
      initParticles();
      // الـ rect اتغيّر بعد ما الـ canvas اتعمّل resize — نحدّث الـ cache.
      refreshRect();
    };

    // على الموبايل شريط المتصفح بيظهر ويختفي وقت السكرول وبيطلّع أحداث resize كتير.
    // بنعمل debounce وبنعيد التوليد بس لو مقاس الـ canvas اتغير فعلاً.
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (canvas.offsetWidth === w && canvas.offsetHeight === h) return;
        resize();
      }, 150);
    };

    const generateTextPositions = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      // على الموبايل الخط أكبر شوية علشان الكلمة تبان واضحة
      const fontSize = w < 640 ? Math.min(w * 0.1, 48) : Math.min(w * 0.09, 90);
      offCtx.font = `bold ${fontSize}px 'DM Serif Display', serif`;
      offCtx.fillStyle = "white";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      offCtx.fillText("AHMED EZZAT", w / 2, h * 0.5);

      const imageData = offCtx.getImageData(0, 0, w, h);
      const positions: { x: number; y: number }[] = [];
      const gap = quality.textGap;

      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const i = (y * w + x) * 4;
          if (imageData.data[i + 3] > 128) {
            positions.push({ x, y });
          }
        }
      }
      textPositions = positions;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < quality.particleCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        particles.push({
          x, y,
          targetX: x, targetY: y,
          originX: x, originY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // ─── الماوس: نستخدم offsetX/offsetY مباشرة ───
    // دول في MouseEvent بنفسهم (relative to event target)، مابيطلعوش layout.
    // ده بيوفّر getBoundingClientRect() على كل mousemove (اللي كانت بتسبب
    // forced reflow 94ms في Lighthouse).
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
      lastMoveTime = Date.now();
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    // ─── اللمس: TouchEvent مفيهاش offsetX ───
    // فبنستخدم cachedRect بدل ما نادي getBoundingClientRect() على كل touchmove.
    // الـ cache بيتحدّث بس على resize / scroll / visibilitychange — رخيصة جداً.
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      if (!cachedRect) refreshRect();
      mouseX = t.clientX - cachedRect.left;
      mouseY = t.clientY - cachedRect.top;
      lastMoveTime = Date.now();
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouch, { passive: true });
    canvas.addEventListener("touchmove", handleTouch, { passive: true });

    resize();
    refreshRect();
    window.addEventListener("resize", onResize);
    // نحدّث cachedRect على scroll و visibilitychange كمان، لأن أي حركة في layout
    // (الـ navbar بيتعمل fixed، شريط المتصفح بيظهر/يختفي على الموبايل) بتغيّر
    // موضع الـ canvas.
    window.addEventListener("scroll", refreshRect, { passive: true });
    document.addEventListener("visibilitychange", refreshRect);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(canvas);

    const draw = (now: number) => {
      animationId = requestAnimationFrame(draw);
      if (!isVisible || document.hidden || !w || !h) return;

      const frameInterval = 1000 / quality.fps;
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;

      ctx.clearRect(0, 0, w, h);

      const time = Date.now() * 0.001;
      for (let line = 0; line < quality.waveLines; line++) {
        ctx.beginPath();
        // تغيير اللون للأبيض/الفضي الشفاف ليتماشى مع القمر
        ctx.strokeStyle = `hsla(0, 0%, 100%, ${0.03 + line * 0.01})`;
        ctx.lineWidth = 1;
        for (let x = 0; x <= w; x += quality.waveStep) {
          const y = h * 0.6 +
            Math.sin(x * 0.008 + time + line * 0.5) * (15 + line * 3) +
            Math.sin(x * 0.004 + time * 0.7 + line) * (10 + line * 2);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const shouldMorph = Date.now() - lastMoveTime > MORPH_DELAY && mouseX > 0;

      if (shouldMorph && !isMorphing) {
        isMorphing = true;
        for (let i = 0; i < particles.length; i++) {
          if (textPositions.length > 0) {
            const tIdx = Math.floor((i / particles.length) * textPositions.length);
            const tp = textPositions[Math.min(tIdx, textPositions.length - 1)];
            particles[i].targetX = tp.x;
            particles[i].targetY = tp.y;
          }
        }
      } else if (!shouldMorph && isMorphing) {
        isMorphing = false;
        for (const p of particles) {
          p.targetX = p.originX;
          p.targetY = p.originY;
        }
      }

      for (const p of particles) {
        if (isMorphing) {
          p.x += (p.targetX - p.x) * 0.04;
          p.y += (p.targetY - p.y) * 0.04;
        } else {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < quality.repulsionRadius && dist > 0.01) {
            p.x += (dx / dist) * 2;
            p.y += (dy / dist) * 2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const morphAlpha = isMorphing ? Math.min(p.alpha + 0.3, 0.9) : p.alpha;
        // لون النقط أبيض/فضي
        ctx.fillStyle = `hsla(0, 0%, 90%, ${morphAlpha})`;
        ctx.fill();
      }

      if (quality.connectionDistance > 0) {
        const connectionDistanceSq = quality.connectionDistance * quality.connectionDistance;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = dx * dx + dy * dy;
            if (dist < connectionDistanceSq) {
              ctx.beginPath();
              // لون الروابط أبيض/فضي شفاف
              ctx.strokeStyle = `hsla(0, 0%, 100%, ${0.06 * (1 - dist / connectionDistanceSq)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
    };
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.clearTimeout(resizeTimer);
      visibilityObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", refreshRect);
      document.removeEventListener("visibilitychange", refreshRect);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouch);
      canvas.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.7 }}
    />
  );
};

export default WaveCanvas;
