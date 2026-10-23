import WaveCanvas from "@/components/WaveCanvas";

const Footer = () => {
  return (
    <footer className="hero-section relative pt-8 bg-black text-white border-t border-white/10">
      {/* WaveCanvas مخفي على الموبايل (بيطلّع لاج) — بيظهر بس على md+ */}
      <div className="hidden md:block relative h-24 sm:h-32 w-full overflow-hidden">
        <WaveCanvas />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          <div>
            <div
              className="flex items-center gap-2 mb-6 cursor-pointer w-fit"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="text-sm font-medium tracking-wider" style={{ color: "hsl(0,0%,95%)" }}>
                AHMED EZZAT ALLAM
              </span>
            </div>
            <h3 className="text-display text-2xl md:text-3xl leading-snug" style={{ color: "hsl(0,0%,90%)" }}>
              Turning data and code into intelligent, high-performance web and AI experiences
            </h3>
            <p className="text-body text-sm mt-4" style={{ color: "hsl(0,0%,75%)" }}>
              Computer Science & AI Undergraduate at Zewail City — building cutting-edge software and scalable systems.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105 inline-flex items-center justify-center bg-white text-black"
              >
                Start Building
              </a>
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-full text-sm border transition-colors duration-300 hover:border-white/50 inline-flex items-center justify-center text-white/85 border-white/25"
              >
                View Projects
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h4 className="text-xs tracking-wider mb-4 text-body" style={{ color: "hsl(0,0%,70%)" }}>NAVIGATION</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-sm text-white/85 hover:underline">About</a></li>
                <li><a href="#skills" className="text-sm text-white/85 hover:underline">Skills</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs tracking-wider mb-4 text-body" style={{ color: "hsl(0,0%,70%)" }}>EXPERIENCE</h4>
              <ul className="space-y-3">
                <li><a href="#experience" className="text-sm text-white/85 hover:underline">Timeline</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs tracking-wider mb-4 text-body" style={{ color: "hsl(0,0%,70%)" }}>WORK</h4>
              <ul className="space-y-3">
                <li><a href="#projects" className="text-sm text-white/85 hover:underline">Selected Work</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs tracking-wider mb-4 text-body" style={{ color: "hsl(0,0%,70%)" }}>CONNECT</h4>
              <ul className="space-y-3">
                <li><a href="#contact" className="text-sm text-white/85 hover:underline">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 flex flex-col items-center gap-6" style={{ borderTop: "1px solid hsl(0,0%,25%)" }}>
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 text-center">
            6th of October City, Giza, Egypt — Zewail City of Science and Technology
          </div>

          <div className="flex items-center gap-6">
            {[
              {
                name: "LinkedIn",
                href: "https://linkedin.com",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              },
              {
                name: "GitHub",
                href: "https://github.com",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              },
              {
                name: "Email",
                href: "mailto:s-ahmed.allam@zewailcity.edu.eg",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-2 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                style={{ color: "hsl(0,0%,75%)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(0,0%,95%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(0,0%,75%)")}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <span className="text-xs text-body text-center" style={{ color: "hsl(0,0%,70%)" }}>
              © {new Date().getFullYear()} AHMED EZZAT ALLAM. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>

        {/* Watermark Name — aria-hidden لإنه decorative (مش ضروري للـ screen readers) */}
        <div className="mt-8 flex justify-center overflow-hidden" aria-hidden="true">
          <p className="text-[35px] md:text-[75px] leading-none tracking-tight select-none uppercase font-bold text-white/30">
            Ahmed Ezzat
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
