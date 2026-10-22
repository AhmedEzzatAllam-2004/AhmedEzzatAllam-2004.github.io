"use client";

import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";
import { downloadCV } from "@/lib/download-cv";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "TALK", href: "#contact" },
];

// اللوجو: بنستخدم <img> مباشرة بـ /photo/me.png — الصورة الموجودة فعلاً.
// ده بيشتغل فوراً بدون ما تحتاج تحوّل أي صور.
//
// لو حابب تفعّل AVIF/WebP (لتقليل الحجم من 51 KiB لـ ~2 KiB):
//   1) شغّل سكريبت convert-images.py (بيعمل me-96.avif + me-96.webp)
//   2) استبدل الـ <img> بالكود ده:
//
//   <picture>
//     <source srcSet="/photo/me-96.avif" type="image/avif" />
//     <source srcSet="/photo/me-96.webp" type="image/webp" />
//     <img src="/photo/me.png" alt="AE Logo" width={48} height={48} ... />
//   </picture>
//
// الـ optimizations اللي حاطّها دلوقتي بتشتغل على كل المتصفحات:
// - loading="eager": اللوجو فوق، بنحمّله فوراً (مش lazy).
// - decoding="async": الـ decode بيتعمل برا الـ main thread.
//
// ملاحظة عن fetchPriority="high": شلناه عمداً. React 18.0–18.2 مش بيتعرف
// على الـ camelCase "fetchPriority" وبيطلّع warning في الـ console.
// React 18.3+ بيتعرف عليه، بس الأمان أحسن نشيله (اللوجو مش الـ LCP أصلاً).
// لو مستخدم React 19+، تقدر ترجّعه: fetchPriority="high".
const Logo = () => (
  <img
    src="/photo/me.png"
    alt="AE Logo"
    width={48}
    height={48}
    loading="eager"
    decoding="async"
    className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 hover:scale-105"
    style={{ filter: "contrast(1.5) brightness(0.7)", mixBlendMode: "screen" }}
  />
);

// بيحتوي على الـ <nav> نفسه وقايمة الموبايل سوا، وبيدير menuOpen جوّاه بنفسه —
// مفيش أي prop لازم يتبعت له من Hero أو Index، فهو self-contained تماماً.
const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // منع سكرول الصفحة والقايمة المنبثقة مفتوحة على الموبايل
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between py-4 md:py-6">
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="hover:opacity-70 transition-opacity">
              <ScrambleText text={l.label} className="inline-block" />
            </a>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 hover:opacity-70"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 py-4">
          <Logo />
          <button onClick={() => setMenuOpen(false)} className="p-2 hover:opacity-70" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8 py-6">
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`text-2xl tracking-widest transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms" }}
            >
              <ScrambleText text={l.label} className="inline-block" />
            </a>
          ))}
          <div className="flex flex-col items-center gap-4 mt-6 w-full px-8 max-w-xs">
            <button
              onClick={() => {
                setMenuOpen(false);
                downloadCV();
              }}
              className="flex items-center justify-center gap-3 border border-white/30 px-6 py-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors w-full"
            >
              <Download size={14} />
              <span className="text-sm tracking-wider whitespace-nowrap">DOWNLOAD CV</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
