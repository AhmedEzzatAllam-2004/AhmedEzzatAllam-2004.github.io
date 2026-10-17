import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL = "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode";
// ملحوظة: جرّبنا build/spline-viewer.webgl.js (نسخة WebGL بس، أصغر 34%) بس تبيّن إن
// تقسيم WebGL/WebGPU لنسختين منفصلتين ميزة مش موجودة في النسخة 1.11.9 المثبّتة هنا —
// ظهرت في نسخ أحدث من المكتبة. الطلب كان بيفشل (404) بصمت ويسيب الخلفية الاحتياطية
// (gradient) ظاهرة للأبد بدل المشهد. رجعنا للملف العادي المضمون وجوده في النسخة دي.
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

/**
 * خلفية الـ About التلاتية الأبعاد.
 *
 * ليه كانت تقيلة، خصوصاً على الموبايل:
 * 1) سكريبت spline-viewer (كذا ميجا) كان بيتحمّل في <head> على كل الأجهزة من غير شرط.
 * 2) المشهد نفسه كان بيتحمّل فور ما الصفحة تفتح، حتى لو المستخدم لسه في الـ Hero ومابعدش وصل لـ About.
 * 3) كان بيظهر حتى على الموبايل، واللي أصلاً مش هيستفاد بيه لأن اللمس مابيعملوش hover.
 *
 * الحل هنا:
 * - على الشاشات الصغيرة (أصغر من lg) بيتعرض gradient بسيط بدل الـ 3D خالص.
 * - على الشاشات الكبيرة، السكريبت والمشهد بيتحمّلوا بس أول ما القسم يقرّب من الشاشة
 *   (IntersectionObserver بـ rootMargin كبير شوية، فيبدأ التحميل قبل ما يوصله المستخدم فعلياً
 *   من غير ما يأخرّ تحميل باقي الصفحة).
 * - attribute اسمه `unloadable` على الـ <spline-viewer> نفسه (مش حاجة من عندنا، من مكتبة
 *   Spline): بيوقف المشهد ويسيب موارد الـ GPU أول ما يخرج برا الشاشة وقت السكرول لتحت،
 *   وبيرجع يحمّله تاني لو المستخدم رجع فوق. ده بيمنع المشهد إنه يفضل شغال في الخلفية
 *   وأنت شايف Skills أو Experience أو أي قسم تاني.
 */
export default function SplineAboutBackground({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // غيّر 1024 لـ 768 لو عاوز المشهد يظهر على التابلت كمان.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLargeScreen(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) return;
    const section = containerRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [isLargeScreen, containerRef]);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    loadSplineScript()
      .then(() => {
        if (!cancelled) setLoaded(true);
      })
      .catch(() => {
        // فشل تحميل السكريبت (مثلاً مفيش نت): بيفضل الـ gradient الاحتياطي ظاهر، مفيش كراش.
      });
    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  // The 3D scene never captures pointer input (so scrolling always works);
  // we forward mouse movement to its canvas manually instead.
  useEffect(() => {
    if (!loaded) return;
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

    const forward = (e: PointerEvent) => {
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

    section.addEventListener("pointermove", forward);
    return () => section.removeEventListener("pointermove", forward);
  }, [loaded, containerRef]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" ref={wrapRef}>
      {loaded ? (
        // @ts-expect-error spline-viewer web component
        // unloadable: الـ attribute ده من مكتبة Spline نفسها — بيخلّي المشهد يسيب موارد
        // الـ GPU بمجرد ما يخرج برا الشاشة (لما تنزل لـ Skills/Experience/...)، وبيرجع
        // يحمّله تاني تلقائياً لو المستخدم رجع لفوق. ده اللي كان بيخلي الموقع يفضل تقيل
        // حتى بعد ما تعدّي قسم About.
        <spline-viewer
          url={SPLINE_SCENE_URL}
          unloadable="true"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.18), transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(255,255,255,0.06), transparent 55%)",
          }}
        />
      )}
    </div>
  );
}