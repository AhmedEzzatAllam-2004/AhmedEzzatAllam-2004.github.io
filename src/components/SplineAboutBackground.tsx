import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL = "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode";
const SPLINE_SCRIPT_URL = "https://unpkg.com/@splinetool/viewer@1.11.9/build/spline-viewer.js";

let splineScriptPromise: Promise<void> | null = null;

// بيحمّل سكريبت spline-viewer مرة واحدة بس مهما عدد المرات اللي الكومبوننت اتعمله فيها mount،
// وبيرجع نفس الـ promise لو الطلب اتكرر وهو لسه بيتحمّل.
const loadSplineScript = () => {
  if (splineScriptPromise) return splineScriptPromise;
  splineScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SPLINE_SCRIPT_URL}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src = SPLINE_SCRIPT_URL;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load spline-viewer"));
    document.head.appendChild(script);
  });
  return splineScriptPromise;
};

// نوع الـ Network Information API — مش في lib.dom.d.ts في أغلب نسخ TS، فبنعرفه يدوياً.
// https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
interface NetworkInformation {
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  saveData?: boolean;
  downlink?: number;
  rtt?: number;
  type?:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "wifi"
    | "wimax"
    | "none"
    | "other"
    | "unknown";
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
 * خلفية الـ About — هجين: CSS متحركة على الموبايل، Spline 3D على الديسكتوب.
 *
 * السبب في التقسيم ده:
 * - سكريبت spline-viewer (632 KiB) + ملف المشهد بياخدوا 2+ ثانية على شبكة 4G
 *   بطيئة. لو حمّلناه على الموبايل، الـ LCP بيبقى 26 ثانية (اتقاس بـ Lighthouse).
 * - على الديسكتوب، النت عادة أسرع والجهاز أقوى، فالمشهد بيتحمّل في وقت معقول
 *   والفائدة البصرية بتستاهل.
 * - على الموبايل، الـ CSS orbs المتحركة بتدي إحساس مماثل بدون أي سكريبت.
 *
 * شروط إضافية لتخطّي Spline حتى على الديسكتوب:
 * - prefers-reduced-motion: reduce
 * - navigator.connection.saveData === true
 * - effectiveType هو 'slow-2g' أو '2g'
 *
 * تحسينات Spline على الديسكتوب (لو اتحمّل):
 * - IntersectionObserver بـ rootMargin 400px (بدل 600px) — تأخير بسيط لتحميل المشهد.
 * - `unloadable` بيقفل الـ GPU أول ما القسم يخرج برا الشاشة وقت السكرول.
 * - Pointer forwarding بس على الأجهزة اللي المؤشر فيها دقيق (ماوس)، ومخفّف
 *   بـ requestAnimationFrame (dispatch واحد بس لكل frame).
 */
export default function SplineAboutBackground({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [networkBlocked, setNetworkBlocked] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  // الـ Spline بيتحمّل بس لو: ديسكتوب + motion مسموح + شبكة سريعة.
  const canRenderSpline = isDesktop && !prefersReducedMotion && !networkBlocked;
  // الـ CSS orbs بتشتغل بس لو motion مسموح (مش reduced-motion). على الموبايل ده
  // الخلفية الأساسية، على الديسكتوب ده الاحتياطي لحد ما Spline يحمّل.
  const canAnimateCSS = !prefersReducedMotion;

  // نتتبع الـ viewport size + reduced-motion + نوع النت. لو أي واحد فيهم اتغيّر،
  // نعيد التقييم (مثلاً المستخدم كبّر المتصفح من موبايل لـ ديسكتوب).
  useEffect(() => {
    const sizeMq = window.matchMedia("(min-width: 1024px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const recheck = () => {
      setIsDesktop(sizeMq.matches);
      setPrefersReducedMotion(motionMq.matches);
      const conn = getConnection();
      if (!conn) {
        setNetworkBlocked(false);
        return;
      }
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

  // نكشف نوع الـ pointer الأساسي. (pointer: fine) = ماوس — forwarding بيتفعّل بس.
  // (pointer: coarse) = لمس — مفيش forwarding (مفيش hover أصلاً على اللمس).
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setPointerFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Lazy-load Spline: بس أول ما القسم يدخل الشاشة (ودي عمليات الـ IntersectionObserver
  // تحدث بس بعد ما الصفحة تخلّص تحميل أساسي، فمش بتعطّل LCP).
  useEffect(() => {
    if (!canRenderSpline) return;
    const section = containerRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      // 400px بدل 600px — تأخير بسيط عشان ميبدأش التحميل بدري ويأخّر LCP.
      { rootMargin: "400px 0px" }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [canRenderSpline, containerRef]);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    loadSplineScript()
      .then(() => {
        if (!cancelled) setScriptReady(true);
      })
      .catch((err) => {
        console.warn("SplineAboutBackground: failed to load spline-viewer script", err);
      });
    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!scriptReady) return;
    const viewer = wrapRef.current?.querySelector("spline-viewer");
    if (!viewer) return;
    const onLoadComplete = () => setSceneReady(true);
    viewer.addEventListener("load-complete", onLoadComplete);
    return () => viewer.removeEventListener("load-complete", onLoadComplete);
  }, [scriptReady]);

  // Pointer forwarding — بس على ماوس، ومخفّف بـ rAF. على اللمس بيتكفّى تماماً.
  useEffect(() => {
    if (!sceneReady || !pointerFine) return;
    const section = containerRef.current;
    if (!section) return;

    const getCanvas = (): HTMLCanvasElement | null => {
      const viewer = wrapRef.current?.querySelector("spline-viewer") as
        | (HTMLElement & { shadowRoot: ShadowRoot | null })
        | null;
      return (viewer?.shadowRoot?.querySelector("canvas") ??
        wrapRef.current?.querySelector("canvas") ??
        null) as HTMLCanvasElement | null;
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
        canvas.dispatchEvent(
          new MouseEvent(type, {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
      }
    };

    const forward = (e: PointerEvent) => {
      lastEvent = e;
      if (rafId === null) {
        rafId = requestAnimationFrame(flush);
      }
    };

    section.addEventListener("pointermove", forward);
    return () => {
      section.removeEventListener("pointermove", forward);
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      lastEvent = null;
    };
  }, [sceneReady, pointerFine, containerRef]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" ref={wrapRef}>
      {/* الخلفية الاحتياطية CSS — موجودة دايماً:
          - على الموبايل: دي الخلفية الوحيدة (مفيش Spline أصلاً)
          - على الديسكتوب: بتظهر لحد ما Spline يخلّص تحميل، وبعدها بتختفي بـ opacity
          - لو prefers-reduced-motion: التدرّج ثابت من غير orbs
          - content-visibility:auto عشان المتصفح يطّاش رندرها برا الشاشة */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "100% 100%",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.18), transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(255,255,255,0.06), transparent 55%)",
          opacity: sceneReady ? 0 : 1,
          transition: "opacity 500ms ease",
        }}
      >
        {/* CSS orbs متحركة — بس لو motion مسموح */}
        {canAnimateCSS && (
          <>
            <div
              className="absolute rounded-full"
              style={{
                top: "10%",
                left: "5%",
                width: "min(40vw, 380px)",
                height: "min(40vw, 380px)",
                background:
                  "radial-gradient(circle, rgba(220,38,38,0.32), transparent 70%)",
                filter: "blur(40px)",
                willChange: "transform",
                animation: "spline-about-float-a 18s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                top: "40%",
                right: "8%",
                width: "min(35vw, 320px)",
                height: "min(35vw, 320px)",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)",
                filter: "blur(50px)",
                willChange: "transform",
                animation: "spline-about-float-b 22s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                bottom: "5%",
                left: "30%",
                width: "min(30vw, 280px)",
                height: "min(30vw, 280px)",
                background:
                  "radial-gradient(circle, rgba(220,38,38,0.22), transparent 70%)",
                filter: "blur(45px)",
                willChange: "transform",
                animation: "spline-about-float-c 26s ease-in-out infinite",
              }}
            />
          </>
        )}
      </div>

      {/* Spline 3D — بس على الديسكتوب لما scriptReady يبقى true */}
      {scriptReady && (
        // @ts-expect-error spline-viewer web component
        // unloadable: بيخلّي المشهد يسيب موارد الـ GPU بمجرد ما يخرج برا الشاشة，
        // وبيرجع يحمّله تاني تلقائياً لو المستخدم رجع لفوق.
        <spline-viewer
          url={SPLINE_SCENE_URL}
          unloadable="true"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            opacity: sceneReady ? 1 : 0,
            transition: "opacity 500ms ease",
          }}
        />
      )}

      <style>{`
        @keyframes spline-about-float-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(40px, -30px, 0) scale(1.08); }
        }
        @keyframes spline-about-float-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(-50px, 40px, 0) scale(1.12); }
        }
        @keyframes spline-about-float-c {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(30px, -40px, 0) scale(1.06); }
        }
      `}</style>
    </div>
  );
}
