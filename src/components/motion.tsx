import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "0px 0px -40px 0px", amount: 0.15 }}
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });
  return (
    <div
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2,
          cy = r.top + r.height / 2;
        const inside =
          Math.abs(e.clientX - cx) < r.width / 2 + padding &&
          Math.abs(e.clientY - cy) < r.height / 2 + padding;
        setPos(
          inside
            ? { x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength, active: true }
            : { x: 0, y: 0, active: false },
        );
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0, active: false })}
    >
      <div
        ref={ref}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: pos.active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Char({
  c,
  progress,
  range,
}: {
  c: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      <span className="invisible">{c}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {c}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const shouldReduceMotion = useReducedMotion();
  const chars = text.split("");

  if (shouldReduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {chars.map((c, i) => (
        <Char
          key={i}
          c={c}
          progress={scrollYProgress}
          range={[i / chars.length, (i + 1) / chars.length]}
        />
      ))}
    </p>
  );
}
