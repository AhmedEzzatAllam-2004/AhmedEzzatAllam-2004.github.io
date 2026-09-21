import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

interface Props {
  text: string;
  speed?: number;
  className?: string;
  startOnVisible?: boolean;
}

const Typewriter = ({ text, speed = 25, className = "", startOnVisible = true }: Props) => {
  const [out, setOut] = useState("");
  const { ref, visible } = useReveal<HTMLSpanElement>({ threshold: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (startOnVisible && !visible) return;
    if (started.current) return;
    started.current = true;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [visible, text, speed, startOnVisible]);

  return (
    <span ref={ref} className={className}>
      {out}
      <span className="inline-block w-[2px] h-[1em] bg-foreground align-middle ml-1 animate-pulse" />
    </span>
  );
};

export default Typewriter;
