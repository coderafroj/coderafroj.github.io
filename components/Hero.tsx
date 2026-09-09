"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroVisual from "./HeroVisual";
import OrbitingIcons from "./OrbitingIcons";

const LINES = [
  { prompt: "~$", text: "whoami" },
  { prompt: ">", text: "afroj_ahmad — codarafroj" },
  { prompt: "~$", text: "cat mission.txt" },
  { prompt: ">", text: "no coaching. no bootcamp. docs + trial + error." },
  { prompt: "~$", text: "ls ./capable_of" },
  { prompt: ">", text: "web apps · admin systems · AI tools · APIs", highlight: true },
];

const BUILDS = ["Web Apps", "Admin Systems", "AI Tools", "E-commerce", "APIs", "Automation"];

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const t = setTimeout(() => setDone(true), 300);
      return () => clearTimeout(t);
    }
    const current = LINES[lineIndex].text;
    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 20);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 240);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex]);

  return (
    <header
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      {/* Animated node network — a living, moving graphic instead of a flat background */}
      <HeroVisual />

      {/* Oversized outlined word — pure typographic background element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display font-extrabold text-outline text-[22vw] leading-none whitespace-nowrap">
          CODE
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border border-border px-3 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-fg animate-pulse" />
          Open for freelance work
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-start">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[0.98] tracking-tight text-fg mb-8"
            >
              I build software
              <br />
              that <span className="italic font-light">actually</span>
              <br />
              ships.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-fg-dim text-base md:text-lg max-w-lg mb-6 leading-relaxed"
            >
              I&apos;m <strong className="text-fg">Afroj Ahmad</strong> — known online as{" "}
              <strong className="text-fg">Codarafroj</strong>. A 100% self-taught developer
              currently pursuing my <strong className="text-fg">BCA</strong>, building full-stack
              web apps, admin systems, and AI-integrated tools from the ground up — no coaching,
              just documentation, repetition, and shipped code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {BUILDS.map((b) => (
                <span
                  key={b}
                  className="font-mono text-[11px] uppercase tracking-wide border border-border px-3 py-1.5 text-fg-dim"
                >
                  {b}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-fg text-bg font-semibold text-sm uppercase tracking-wide hover:bg-fg-dim transition-colors"
              >
                View My Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-fg font-semibold text-sm uppercase tracking-wide hover:border-fg transition-colors"
              >
                <Sparkles size={15} />
                Start a Project
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-full lg:mt-3"
          >
            <OrbitingIcons />

            <div className="card-frame p-5 md:p-6 font-mono text-sm mt-6">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full border border-border-strong" />
                <span className="w-2.5 h-2.5 rounded-full border border-border-strong" />
                <span className="w-2.5 h-2.5 rounded-full border border-border-strong" />
                <span className="ml-3 text-muted text-xs">terminal — codarafroj</span>
              </div>

              <div className="space-y-2 min-h-[150px]">
                {LINES.slice(0, done ? LINES.length : lineIndex + 1).map((line, i) => {
                  const isCurrent = i === lineIndex && !done;
                  const text = isCurrent ? line.text.slice(0, charIndex) : line.text;
                  return (
                    <div key={i} className={line.highlight ? "text-fg font-semibold" : "text-fg-dim"}>
                      <span className="text-muted mr-2">{line.prompt}</span>
                      {text}
                      {isCurrent && <span className="caret" />}
                    </div>
                  );
                })}
                {done && <span className="caret" />}
              </div>

              <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-display font-bold text-lg text-fg">4+</div>
                  <div className="text-[10px] text-muted uppercase tracking-wide">Languages</div>
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-fg">100%</div>
                  <div className="text-[10px] text-muted uppercase tracking-wide">Self-Taught</div>
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-fg">0</div>
                  <div className="text-[10px] text-muted uppercase tracking-wide">Excuses</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
