"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";

const TIMELINE = [
  {
    role: "Current Pursuit",
    title: "Bachelor of Computer Applications",
    text: "Formalizing my computer science knowledge while continuing to build practical, real-world projects in my free time.",
  },
  {
    role: "The Foundation",
    title: "Self-Taught Developer",
    text: "Mastered core programming logic with C and C++, scaled up to Object-Oriented paradigms with Java and Python, and branched into full-stack web development, databases, and now AI-integrated tooling.",
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHead index="03" eyebrow="How I Got Here" title="The" titleAccent="journey." />
        <p className="text-fg-dim leading-relaxed mb-12 max-w-xl">
          I never had formal coaching. My foundation was built through countless hours of{" "}
          <strong className="text-fg">online research</strong>, reading documentation, and
          writing code until it worked. I believe in <strong className="text-fg">learning by doing</strong>.
        </p>

        <div className="relative border-l border-border pl-8 space-y-12">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[calc(2rem+4px)] top-1.5 w-2 h-2 bg-fg" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {item.role}
              </span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-fg mt-1 mb-2">
                {item.title}
              </h3>
              <p className="text-fg-dim text-sm leading-relaxed max-w-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
