export function StarField() {
  // Generate deterministic star positions so hydration is stable
  const stars = Array.from({ length: 80 }).map((_, i) => {
    const top = ((i * 37) % 100);
    const left = ((i * 53) % 100);
    const size = 1 + ((i % 3) * 0.35);
    const delay = (i * 0.07) % 3;
    const duration = 2 + ((i % 4) * 0.6);
    return { top, left, size, delay, duration };
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white will-change-[opacity,transform]"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0.45 + ((i % 5) * 0.1),
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes star-twinkle {
          0% { opacity: 0.25; transform: scale(0.85); }
          100% { opacity: 0.9; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
