"use client";

import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiPython, SiTypescript, SiFirebase, SiGit } from "@icons-pack/react-simple-icons";

const ICONS = [SiReact, SiNextdotjs, SiPython, SiTypescript, SiFirebase, SiGit];

export default function OrbitingIcons() {
  return (
    <div className="relative w-full aspect-square max-w-[280px] mx-auto" aria-hidden>
      <div className="absolute inset-0 rounded-full border border-border" />
      <div className="absolute inset-[15%] rounded-full border border-border" />
      <div className="absolute inset-[42%] rounded-full border border-border-strong flex items-center justify-center">
        <span className="font-display font-extrabold text-xs">CA</span>
      </div>

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {ICONS.map((Icon, i) => {
          const angle = (i / ICONS.length) * 2 * Math.PI;
          const radius = 50;
          const x = (50 + radius * Math.cos(angle)).toFixed(3);
          const y = (50 + radius * Math.sin(angle)).toFixed(3);
          return (
            <div
              key={i}
              className="absolute w-9 h-9 -ml-[18px] -mt-[18px] flex items-center justify-center bg-bg border border-border"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}>
                <Icon size={16} />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
