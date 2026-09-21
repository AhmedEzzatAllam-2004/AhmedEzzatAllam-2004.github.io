import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection("#")}
            className="font-display text-2xl text-foreground"
          >
            Ahmed Ezzat<span className="text-accent">®</span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-xs text-foreground/80 hover:text-foreground transition-colors font-medium uppercase tracking-[0.2em]"
              >
                <ScrambleText text={item.name} className="inline-block" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#contact")}
              className="group flex items-center gap-3 h-11 pl-4 pr-5 rounded-full bg-foreground text-background text-xs uppercase tracking-[0.15em] font-medium hover:bg-primary-hover transition-all"
            >
              <span className="text-accent inline-block animate-spin-slow">✻</span>
              <ScrambleText text="Start a project" className="inline-block" />
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50">
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-foreground/80 hover:text-foreground py-2 uppercase text-xs tracking-[0.2em]"
                >
                  <ScrambleText text={item.name} className="inline-block" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
