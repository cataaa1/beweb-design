import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends HTMLElement>(threshold = 0.2, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
}

export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: inView ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
    opacity: inView ? 1 : 0,
  };
  const Comp = as as "div";
  return (
    <Comp
      ref={ref}
      style={style}
      className={cn(
        "transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        className
      )}
    >
      {children}
    </Comp>
  );
}

interface SplitLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

export function SplitLines({ lines, className, lineClassName, delay = 0 }: SplitLinesProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.2);
  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden pb-[0.06em]">
          <span
            className={cn(
              "block transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              lineClassName
            )}
            style={{
              transform: inView ? "translate3d(0,0,0)" : "translate3d(0,110%,0)",
              transitionDelay: `${delay + i * 90}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
