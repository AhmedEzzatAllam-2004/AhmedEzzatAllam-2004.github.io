"use client";

import { useEffect, useState, useRef } from "react";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  hint: string;
};

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: "first_visit", title: "Welcome!", description: "You visited the portfolio", icon: "👋", hint: "Just visit the site" },
  { id: "visited_about", title: "Curious Mind", description: "Visited the About section", icon: "📖", hint: "Scroll to the About section" },
  { id: "visited_skills", title: "Skill Explorer", description: "Visited Skills section", icon: "🧠", hint: "Scroll to Skills" },
  { id: "visited_experience", title: "Journey Walker", description: "Visited Experience section", icon: "🚶", hint: "Scroll to Experience" },
  { id: "visited_projects", title: "Project Hunter", description: "Visited Projects section", icon: "🎯", hint: "Scroll to Projects" },
  { id: "visited_contact", title: "Let's Connect", description: "Visited Contact section", icon: "💬", hint: "Scroll to Contact" },
  { id: "used_terminal", title: "Hacker Mode", description: "Used the terminal", icon: "⌨️", hint: "Press / on your keyboard" },
  { id: "downloaded_cv", title: "Resume Collector", description: "Downloaded the CV", icon: "📄", hint: "Click any DOWNLOAD CV button" },
  { id: "opened_project", title: "Opener", description: "Opened a project link", icon: "🔗", hint: "Click the ↗ icon on a project card" },
  { id: "completed_tour", title: "Tour Complete", description: "Visited all 5 sections", icon: "🏆", hint: "Visit About + Skills + Experience + Projects + Contact" },
];

const STORAGE_KEY = "portfolio_achievements_v2";
const REQUIRED_SECTIONS = ["visited_about", "visited_skills", "visited_experience", "visited_projects", "visited_contact"];

// Dynamic hint based on the section the user is currently viewing
const HINT_BY_SECTION: Record<string, string> = {
  hero: "Scroll down to read About me ↓",
  about: "Nice — keep scrolling to Skills ↓",
  skills: "Cool skills! Next: Experience ↓",
  experience: "Great journey! Next: Projects ↓",
  projects: "Browse my work. Next: Contact ↓",
  contact: "🎉 You've reached the end! Try the terminal: press /",
  footer: "🎉 You've reached the end! Try the terminal: press /",
};

export function AchievementSystem() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [pulseCounter, setPulseCounter] = useState(0);
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const lastUnlockedRef = useRef<string>("");

  // Load + first_visit unlock
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUnlocked(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
    setTimeout(() => unlock("first_visit"), 1500);
  }, []);

  // When all 5 sections visited → unlock completed_tour
  useEffect(() => {
    if (
      REQUIRED_SECTIONS.every(s => unlocked.has(s)) &&
      !unlocked.has("completed_tour") &&
      lastUnlockedRef.current !== "completed_tour"
    ) {
      const t = setTimeout(() => unlock("completed_tour"), 1800);
      return () => clearTimeout(t);
    }
  }, [unlocked]);

  // Unlock: بـ يستبدل الـ toast الحالي مباشرة (مفيش queue — كل جديد بياخد مكانه)
  const unlock = (id: string) => {
    lastUnlockedRef.current = id;
    setUnlocked(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      const ach = ALL_ACHIEVEMENTS.find(a => a.id === id);
      if (ach) {
        setActiveToast(ach);
        setPulseCounter(p => p + 1);
      }
      return next;
    });
  };

  // Dismiss toast — بـ يطّفيه، ومفيش auto-dismiss (المستخدم بـ يقرّر)
  const dismissToast = () => setActiveToast(null);

  // Listen for achievement events from other components (terminal, etc.)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.id) unlock(detail.id);
    };
    window.addEventListener("achievement", handler);
    return () => window.removeEventListener("achievement", handler);
  }, []);

  // Track section visits via IntersectionObserver + update currentSection state
  // الـ dynamic hint بـ يتـ حدّث بـ current scroll position
  useEffect(() => {
    const sections = ["about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        // نلقى أكتر section visible دلوقتي
        let mostVisible = "";
        let mostVisibleRatio = 0;
        entries.forEach(entry => {
          if (entry.intersectionRatio > mostVisibleRatio) {
            mostVisibleRatio = entry.intersectionRatio;
            mostVisible = entry.target.id;
          }
        });
        if (mostVisible && mostVisibleRatio >= 0.3) {
          setCurrentSection(mostVisible);
          if (sections.includes(mostVisible)) {
            unlock(`visited_${mostVisible}`);
          }
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    // كمان بنراقب الـ footer + hero
    const footer = document.querySelector("footer");
    if (footer) obs.observe(footer);
    const hero = document.querySelector("section") || document.querySelector("[id='hero']");
    if (hero) obs.observe(hero);

    // Initial state: لو فوق الصفحة، hint بـ يقول scroll down
    const onScroll = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      // لو قرب من الأخر
      if (scrollY + winH > docH - 200) {
        setCurrentSection("footer");
      } else if (scrollY < 100) {
        setCurrentSection("hero");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Track CV download + project link clicks
  // استخدمنا capture phase عشان الـ project link عنده onClick={e.stopPropagation()}
  // بـ يوقف الـ click من الوصول لـ document في bubbling phase. capture phase
  // بـ يـ fire قبل stopPropagation، فبـ نقدر نـ catch الـ click.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest("button, a");
      if (btn && /DOWNLOAD CV/i.test(btn.textContent || "")) unlock("downloaded_cv");
      const link = target.closest("a");
      if (link) {
        const ariaLabel = link.getAttribute("aria-label") || "";
        if (ariaLabel.startsWith("Open ") || (link.target === "_blank" && /github\.com|external/i.test(link.href))) {
          unlock("opened_project");
        }
      }
    };
    document.addEventListener("click", handler, true); // capture phase
    return () => document.removeEventListener("click", handler, true);
  }, []);

  const progress = unlocked.size / ALL_ACHIEVEMENTS.length;
  const circumference = 2 * Math.PI * 18;

  // Dynamic next step based on current scroll position
  const dynamicHint = HINT_BY_SECTION[currentSection] || "Keep exploring ↓";

  return (
    <>
      {/* ─── Counter badge (bottom-right) — super minimal ─── */}
      <button
        onClick={() => setShowPanel(true)}
        className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 group"
        aria-label={`Achievements: ${unlocked.size} of ${ALL_ACHIEVEMENTS.length} unlocked. Click to view all.`}
        data-cursor="link"
      >
        <div
          className="relative bg-black/60 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:border-red-500/50 hover:bg-black/80"
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.1)",
            animation: pulseCounter > 0 ? `ach-pulse 600ms cubic-bezier(0.16,1,0.3,1)` : undefined,
          }}
          key={pulseCounter}
        >
          <svg width="36" height="36" viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
            <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <circle
              cx="20" cy="20" r="17"
              fill="none" stroke="rgb(220,38,38)" strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 17}
              strokeDashoffset={2 * Math.PI * 17 * (1 - progress)}
              style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)" }}
            />
          </svg>
          <span className="font-pixel text-[10px] sm:text-[11px] text-white/90 tracking-tight">
            {unlocked.size}
          </span>
        </div>
      </button>

      {/* ─── Toast notification — minimal + creative design ─── */}
      {activeToast && (
        <div
          key={`${activeToast.id}-${pulseCounter}`}
          className="fixed top-3 right-3 left-3 sm:left-auto sm:w-[320px] z-50"
          style={{ animation: "toast-slide 500ms cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div
            className="relative bg-gradient-to-br from-[#0B0B0B] to-[#0a0505] border border-red-500/30 backdrop-blur-md overflow-hidden"
            style={{ borderRadius: 12 }}
          >
            {/* Glow accent خط رفيع أحمر فوق */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

            {/* Close button */}
            <button
              onClick={dismissToast}
              aria-label="Dismiss"
              className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors z-10"
              style={{ borderRadius: 6 }}
            >
              ✕
            </button>

            {/* Confetti particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="absolute h-1 w-1 rounded-full"
                  style={{
                    top: "20%",
                    left: "10%",
                    backgroundColor: ["#ff4d4d", "#ffffff", "#ff4d4d"][i % 3],
                    animation: `confetti-${i} 1200ms ease-out forwards`,
                  }}
                />
              ))}
            </div>

            <div className="relative p-3 sm:p-3.5 flex items-center gap-3">
              {/* Icon — داخل دائرة حمرا خفيفة */}
              <div
                className="text-xl sm:text-2xl shrink-0 flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-red-500/10 border border-red-500/20"
                style={{ animation: "icon-pop 600ms cubic-bezier(0.16,1,0.3,1)" }}
              >
                {activeToast.icon}
              </div>

              <div className="min-w-0 flex-1 pr-6">
                {/* Title + counter inline */}
                <div className="flex items-baseline gap-2">
                  <p className="text-white font-bold text-xs sm:text-sm truncate">
                    {activeToast.title}
                  </p>
                  <span className="font-pixel text-[9px] sm:text-[10px] text-red-500/80 shrink-0">
                    {unlocked.size}/{ALL_ACHIEVEMENTS.length}
                  </span>
                </div>

                {/* Description — بـ تظهر بس على الديسكتوب */}
                <p className="text-white/50 text-[10px] sm:text-[11px] mt-0.5 hidden sm:block truncate">
                  {activeToast.description}
                </p>

                {/* Dynamic hint — بـ يتـ حدّث بـ scroll position */}
                <p
                  className="text-white/80 text-[10px] sm:text-[11px] mt-1 flex items-center gap-1"
                  key={currentSection}
                  style={{ animation: "fade-in 400ms ease-out" }}
                >
                  <span className="text-red-500">→</span>
                  <span className="truncate">{dynamicHint}</span>
                </p>

                {/* Mini progress bar — رفيع جداً تحت */}
                <div className="mt-2 h-0.5 w-full bg-white/10 overflow-hidden" style={{ borderRadius: 999 }}>
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-red-400"
                    style={{ width: `${progress * 100}%`, transition: "width 700ms cubic-bezier(0.16,1,0.3,1)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Full achievements panel (modal) ─── */}
      {showPanel && (
        <div
          className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPanel(false)}
          style={{ animation: "fade-in 200ms ease-out" }}
        >
          <div
            className="bg-[#0B0B0B] border border-white/15 w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
            style={{ borderRadius: 12, animation: "panel-pop 300ms cubic-bezier(0.16,1,0.3,1)" }}
          >
            <div className="sticky top-0 bg-[#0B0B0B] border-b border-white/10 px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-pixel text-base sm:text-lg uppercase tracking-widest text-white">Achievements</h3>
                <p className="text-xs text-white/60 mt-1">
                  {unlocked.size} of {ALL_ACHIEVEMENTS.length} unlocked • {Math.round(progress * 100)}%
                </p>
              </div>
              <button
                onClick={() => setShowPanel(false)}
                aria-label="Close"
                className="h-9 w-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                style={{ borderRadius: 8 }}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-5">
              {ALL_ACHIEVEMENTS.map(ach => {
                const isUnlocked = unlocked.has(ach.id);
                return (
                  <div
                    key={ach.id}
                    className="border p-4 flex items-center gap-3 transition-all"
                    style={{
                      borderRadius: 8,
                      borderColor: isUnlocked ? "rgba(220, 38, 38, 0.4)" : "rgba(255, 255, 255, 0.08)",
                      background: isUnlocked ? "rgba(220, 38, 38, 0.05)" : "transparent",
                    }}
                  >
                    <div
                      className="text-3xl shrink-0"
                      style={{
                        filter: isUnlocked ? "none" : "grayscale(1) opacity(0.3)",
                        animation: isUnlocked ? "icon-pop 600ms cubic-bezier(0.16,1,0.3,1)" : undefined,
                      }}
                    >
                      {isUnlocked ? ach.icon : "🔒"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-bold text-sm break-words">
                        {isUnlocked ? ach.title : "???"}
                      </p>
                      <p className="text-white/60 text-xs mt-0.5">
                        {isUnlocked ? ach.description : (
                          <span className="text-white/50">
                            <span className="text-red-500/70">Hint:</span> {ach.hint}
                          </span>
                        )}
                      </p>
                    </div>
                    {isUnlocked && <span className="text-red-500 text-xs shrink-0" aria-hidden="true">✓</span>}
                  </div>
                );
              })}
            </div>

            <div className="px-5 py-4 border-t border-white/10 text-center">
              <p className="text-xs text-white/50">
                Tip: press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/80 font-mono">/</kbd> to open the terminal
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes toast-slide {
          0% { opacity: 0; transform: translateY(-12px) translateX(20px) scale(0.96) }
          100% { opacity: 1; transform: translateY(0) translateX(0) scale(1) }
        }
        @keyframes panel-pop {
          from { opacity: 0; transform: scale(0.96) translateY(20px) }
          to   { opacity: 1; transform: scale(1) translateY(0) }
        }
        @keyframes icon-pop {
          0% { transform: scale(0.3) rotate(-20deg); opacity: 0 }
          60% { transform: scale(1.2) rotate(8deg) }
          100% { transform: scale(1) rotate(0); opacity: 1 }
        }
        @keyframes ach-pulse {
          0% { transform: scale(1) }
          30% { transform: scale(1.12); box-shadow: 0 0 30px rgba(220,38,38,0.5) }
          100% { transform: scale(1) }
        }
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes confetti-0 { 0% { transform: translate(0, 0) scale(1); opacity: 1 } 100% { transform: translate(-40px, 60px) scale(0); opacity: 0 } }
        @keyframes confetti-1 { 0% { transform: translate(0, 0) scale(1); opacity: 1 } 100% { transform: translate(40px, 80px) scale(0); opacity: 0 } }
        @keyframes confetti-2 { 0% { transform: translate(0, 0) scale(1); opacity: 1 } 100% { transform: translate(-60px, 50px) scale(0); opacity: 0 } }
        @keyframes confetti-3 { 0% { transform: translate(0, 0) scale(1); opacity: 1 } 100% { transform: translate(60px, 70px) scale(0); opacity: 0 } }
        @keyframes confetti-4 { 0% { transform: translate(0, 0) scale(1); opacity: 1 } 100% { transform: translate(-20px, 100px) scale(0); opacity: 0 } }
        @keyframes confetti-5 { 0% { transform: translate(0, 0) scale(1); opacity: 1 } 100% { transform: translate(30px, 90px) scale(0); opacity: 0 } }
        @keyframes confetti-6 { 0% { transform: translate(0, 0) scale(1); opacity: 1 } 100% { transform: translate(-50px, 70px) scale(0); opacity: 0 } }
        @keyframes confetti-7 { 0% { transform: translate(0, 0) scale(1); opacity: 1 } 100% { transform: translate(50px, 60px) scale(0); opacity: 0 } }
      `}</style>
    </>
  );
}

export default AchievementSystem;
