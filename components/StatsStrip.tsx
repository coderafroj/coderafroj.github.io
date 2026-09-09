"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";

const STATS = [
  { value: 4, suffix: "+", label: "Languages Mastered" },
  { value: 3, suffix: "", label: "Shipped Projects" },
  { value: 100, suffix: "%", label: "Self-Taught" },
  { value: 0, suffix: "", label: "Coaching Classes Attended" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center md:text-left"
          >
            <div className="font-display font-bold text-3xl md:text-4xl text-fg mb-1">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
