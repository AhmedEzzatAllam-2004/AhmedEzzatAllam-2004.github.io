import { useEffect, useState } from "react";

const Preloader = () => {
  const [hidden, setHidden] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1400);
    const t2 = setTimeout(() => setHidden(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(0_0%_12%),hsl(0_0%_2%))]" />
      <div className="relative">
        <div className="absolute inset-0 -m-16 rounded-full blur-3xl bg-white/10 animate-pulse" />
        <div
          className="relative text-3xl md:text-5xl font-bold tracking-[0.4em] text-foreground uppercase"
          style={{ animation: "fade-in 0.8s ease-out" }}
        >
          AEA
        </div>
      </div>
    </div>
  );
};

export default Preloader;
