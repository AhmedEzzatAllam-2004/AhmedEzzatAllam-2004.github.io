import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL = "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode";
const SPLINE_SCRIPT_URL = "https://unpkg.com/@splinetool/viewer@1.11.9/build/spline-viewer.js";

let splineScriptPromise: Promise<void> | null = null;

const loadSplineScript = () => {
  if (splineScriptPromise) return splineScriptPromise;
  splineScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SPLINE_SCRIPT_URL}"]`);
    if (existing) { resolve(); return; }
    const script = document.createElement("script");
    script.type = "module";
    script.src = SPLINE_SCRIPT_URL;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load spline-viewer"));
    document.head.appendChild(script);
  });
  return splineScriptPromise;
};

interface NetworkInformation {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  saveData?: boolean;
  addEventListener: typeof EventTarget.prototype.addEventListener;
  removeEventListener: typeof EventTarget.prototype.removeEventListener;
}
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}
const getConnection = (): NetworkInformation | null => {
  if (typeof navigator === "undefined") return null;
  const nav = navigator as NavigatorWithConnection;
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection ?? null;
};

/**
 * خلفية الـ About: هجين.
 * - Desktop (≥1024px): Spline 3D مع lazy load + unloadable
 * - Mobile (<1024px): Matrix rain — أرقام ثنائية (0/1) بتنزل بألوان حمرا
 *   بنفس روح "OBSESSED WITH BUILDING" و "DATA SCIENCE & AI".
 *   خفيفة: 1 canvas، FPS محدودة بـ 15.
 *   بترحّم prefers-reduced-motion (بتوقف لو المستخدم مفعّلها).
 */
export default function SplineAboutBackground({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [networkBlocked, setNetworkBlocked] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const canRenderSpline = isDesktop && !prefersReducedMotion && !networkBlocked;
  const showMatrix = !canRenderSpline && !prefersReducedMotion;

  useEffect(() => {
    const sizeMq = window.matchMedia("(min-width: 1024px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const recheck = () => {
      setIsDesktop(sizeMq.matches);
      setPrefersReducedMotion(motionMq.matches);
      const conn = getConnection();
      if (!conn) { setNetworkBlocked(false); return; }
      setNetworkBlocked(
        conn.saveData === true ||
        conn.effectiveType === "slow-2g" ||
        conn.effectiveType === "2g"
      );
    };
    recheck();
    sizeMq.addEventListener("change", recheck);
    motionMq.addEventListener("change", recheck);
    const conn = getConnection();
    if (conn) conn.addEventListener("change", recheck);
    return () => {
      sizeMq.removeEventListener("change", recheck);
      motionMq.removeEventListener("change", recheck);
      if (conn) conn.removeEventListener("change", recheck);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setPointerFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!canRenderSpline) return;
    const section = containerRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShouldLoad(true); obs.disconnect(); } },
      { rootMargin: "400px 0px" }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [canRenderSpline, containerRef]);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    loadSplineScript().then(() => { if (!cancelled) setScriptReady(true); })
      .catch((err) => console.warn("SplineAboutBackground:", err));
    return () => { cancelled = true; };
  }, [shouldLoad]);

  useEffect(() => {
    if (!scriptReady) return;
    const viewer = wrapRef.current?.querySelector("spline-viewer");
    if (!viewer) return;
    const onLoad = () => setSceneReady(true);
    viewer.addEventListener("load-complete", onLoad);
    return () => viewer.removeEventListener("load-complete", onLoad);
  }, [scriptReady]);

  useEffect(() => {
    if (!sceneReady || !pointerFine) return;
    const section = containerRef.current;
    if (!section) return;
    const getCanvas = (): HTMLCanvasElement | null => {
      const viewer = wrapRef.current?.querySelector("spline-viewer") as
        | (HTMLElement & { shadowRoot: ShadowRoot | null }) | null;
      return (viewer?.shadowRoot?.querySelector("canvas") ??
        wrapRef.current?.querySelector("canvas") ?? null) as HTMLCanvasElement | null;
    };
    let lastEvent: PointerEvent | null = null;
    let rafId: number | null = null;
    const flush = () => {
      rafId = null;
      const e = lastEvent;
      if (!e) return;
      lastEvent = null;
      const canvas = getCanvas();
      if (!canvas) return;
      for (const type of ["pointermove", "mousemove"]) {
        canvas.dispatchEvent(new MouseEvent(type, {
          clientX: e.clientX, clientY: e.clientY,
          bubbles: true, cancelable: true, view: window,
        }));
      }
    };
    const forward = (e: PointerEvent) => {
      lastEvent = e;
      if (rafId === null) rafId = requestAnimationFrame(flush);
    };
    section.addEventListener("pointermove", forward);
    return () => {
      section.removeEventListener("pointermove", forward);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [sceneReady, pointerFine, containerRef]);

  // ─── Matrix rain على الموبايل ───
  useEffect(() => {
    if (!showMatrix) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let visible = true;
    let lastFrame = 0;
    const FPS = 15;
    const frameInterval = 1000 / FPS;

    let columns = 0;
    let drops: number[] = [];
    const fontSize = 14;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(w / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    };

    const chars = ["0", "1", "0", "1", "0", "1"];
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden || !columns) return;
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;

      // fade trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const head = Math.random() > 0.975;
        ctx.fillStyle = head
          ? "rgba(255, 220, 220, 0.95)"
          : `rgba(220, 38, 38, ${0.5 + Math.random() * 0.3})`;
        ctx.fillText(char, x, y);

        if (y > canvas.height / dpr && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    resize();
    // ResizeObserver: بيتفّع أول ما الـ canvas ياخد مقاسه (مش بس على window resize)
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    raf = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const obs = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    obs.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      obs.disconnect();
    };
  }, [showMatrix]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" ref={wrapRef}>
      {/* الخلفية الأساسية الثابتة */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.18), transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(255,255,255,0.06), transparent 55%)",
          opacity: sceneReady ? 0 : 1,
          transition: "opacity 500ms ease",
        }}
      />

      {/* Matrix rain canvas (mobile + reduced-motion off) */}
      {showMatrix && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.8 }}
        />
      )}

      {/* Spline 3D (desktop only) */}
      {scriptReady && (
        // @ts-expect-error spline-viewer web component
        <spline-viewer
          url={SPLINE_SCENE_URL}
          unloadable="true"
          style={{
            width: "100%", height: "100%", display: "block",
            opacity: sceneReady ? 1 : 0,
            transition: "opacity 500ms ease",
          }}
        />
      )}
    </div>
  );
}
