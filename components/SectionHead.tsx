"use client";

import { motion } from "framer-motion";

export default function SectionHead({
  index,
  eyebrow,
  title,
  titleAccent,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-16 items-start mb-14 md:mb-20"
    >
      <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6">
        <span className="font-display font-extrabold text-6xl md:text-8xl text-outline leading-none select-none">
          {index}
        </span>
        <span className="font-mono text-[10px] tracking-[0.35em] text-muted uppercase whitespace-nowrap md:-rotate-90 md:origin-left md:translate-y-16">
          {eyebrow}
        </span>
      </div>

      <div>
        <h2 className="font-display font-extrabold text-4xl md:text-6xl text-fg leading-[1.05] max-w-2xl">
          {title}
          {titleAccent && <span className="italic font-light text-fg-dim"> {titleAccent}</span>}
        </h2>
        {subtitle && (
          <p className="text-fg-dim mt-6 max-w-md border-l-2 border-fg pl-4 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
