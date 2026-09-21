import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*#@%$&?!";

interface Props {
  text: string;
  className?: string;
  /** ms per reveal step */
  speed?: number;
  /** scramble cycles before a letter locks in */
  cycles?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

/**
 * Hover-triggered character scramble effect.
 * Each letter shuffles through random glyphs, then locks into place left-to-right.
 */
const ScrambleText = ({
  text,
  className = "",
  speed = 28,
  cycles = 3,
  as: Tag = "span",
}: Props) => {
  const [out, setOut] = useState(text);
  const frame = useRef(0);
  const raf = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => setOut(text), [text]);

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
  }, []);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stop();
    frame.current = 0;
    last.current = 0;

    const tick = (now: number) => {
      if (now - last.current >= speed) {
        last.current = now;
        const revealed = frame.current / cycles;
        setOut(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return ch;
              if (i < revealed) return ch;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        frame.current += 1;
      }

      if (frame.current / cycles <= text.length) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setOut(text);
        raf.current = null;
      }
    };

    raf.current = requestAnimationFrame(tick);
  }, [text, speed, cycles, stop]);

  useEffect(() => stop, [stop]);

  return (
    <Tag
      className={className}
      onMouseEnter={run}
      onFocus={run}
      aria-label={text}
    >
      {out}
    </Tag>
  );
};

export default ScrambleText;
