"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor مخصص + trail أحمر بـ يتبعه.
 * - على الـ desktop (pointer: fine) بس — الموبايل بيتخطّى.
 * - بيرحّم prefers-reduced-motion (بيطّفي الحركة).
 * - الـ cursor بـ يـ changes شكله على hover:
 *   - default: دائرة صغيرة
 *   - link/button: حلقة أكبر + لون أحمر
 *   - image/canvas: يد (كروسير)
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState<"default" | "link" | "image">("default");
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    let rafId: number;
    let mouseX = -100, mouseY = -100;
    let trailX = -100, trailY = -100;
    let lastMove = Date.now();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMove = Date.now();

      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, [data-cursor='link']")) {
        setHovering("link");
      } else if (target.closest("img, video, canvas, [data-cursor='image']")) {
        setHovering("image");
      } else {
        setHovering("default");
      }
    };

    const onLeave = () => {
      mouseX = -100;
      mouseY = -100;
    };

    const render = () => {
      rafId = requestAnimationFrame(render);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Trail: بـ يـ lerp ببطء ورا الـ cursor
      trailX += (mouseX - trailX) * 0.18;
      trailY += (mouseY - trailY) * 0.18;
      if (trailRef.current) {
        const idle = Date.now() - lastMove > 80;
        const opacity = idle ? 0 : 1;
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
        trailRef.current.style.opacity = String(opacity);
      }
    };

    rafId = requestAnimationFrame(render);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Trail — دائرة كبيرة بـ glow أحمر بتتبع الـ cursor بـ lerp */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ willChange: "transform, opacity", transition: "opacity 300ms" }}
      >
        <div
          className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30 blur-xl"
        />
      </div>

      {/* Cursor — دائرة صغيرة بـ تتـ حرك فوراً مع الـ mouse */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full border-2 border-white transition-all duration-200"
          style={{
            height: hovering === "link" ? "32px" : "12px",
            width: hovering === "link" ? "32px" : "12px",
            transform: "translate(-50%, -50%)",
            backgroundColor:
              hovering === "link"
                ? "rgba(220, 38, 38, 0.2)"
                : hovering === "image"
                ? "rgba(255, 255, 255, 0.3)"
                : "transparent",
            borderColor:
              hovering === "link" ? "rgb(220, 38, 38)" : "rgba(255, 255, 255, 0.8)",
          }}
        />
      </div>
    </>
  );
}
