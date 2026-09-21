import { PropsWithChildren, CSSProperties } from "react";
import { useReveal } from "@/hooks/use-reveal";

interface Props {
  delay?: number;
  className?: string;
  as?: "div" | "section" | "h2" | "h3" | "p" | "li";
  y?: number;
}

const Reveal = ({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  y = 40,
}: PropsWithChildren<Props>) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: visible ? "translateY(0)" : `translateY(${y}px)`,
    opacity: visible ? 1 : 0,
    transition:
      "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
    willChange: "opacity, transform",
  };
  return (
    <Tag ref={ref as never} style={style} className={className}>
      {children}
    </Tag>
  );
};

export default Reveal;
