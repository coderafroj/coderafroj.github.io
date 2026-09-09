"use client";

import { motion } from "framer-motion";
import {
  Globe,
  LayoutDashboard,
  Sparkles,
  ShoppingCart,
  Plug,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiFirebase,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiMysql,
  SiCplusplus,
} from "@icons-pack/react-simple-icons";
import SectionHead from "./SectionHead";

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Fast, responsive, full-stack apps built with React and Next.js — from landing pages to complex dashboards.",
    span: "md:col-span-2",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Systems",
    description: "Custom control panels to manage content, users, and data without touching code.",
  },
  {
    icon: Sparkles,
    title: "AI-Integrated Tools",
    description: "Practical AI features — automation, smart search, and intelligent data flow.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Storefronts, carts, and checkout flows built to convert and scale.",
  },
  {
    icon: Plug,
    title: "APIs & Backends",
    description: "Clean REST APIs and database architecture powering real applications.",
    span: "md:col-span-2",
  },
  {
    icon: Workflow,
    title: "Automation Scripts",
    description: "Python scripts that remove repetitive work from real workflows.",
  },
];

const STACK = [
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: SiPython, name: "Python" },
  { Icon: SiCplusplus, name: "C / C++" },
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiFirebase, name: "Firebase" },
  { Icon: SiTailwindcss, name: "Tailwind" },
  { Icon: SiMysql, name: "SQL" },
  { Icon: SiGit, name: "Git" },
  { Icon: SiGithub, name: "GitHub" },
];

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHead
          index="02"
          eyebrow="What I Build"
          title="Capabilities,"
          titleAccent="not just a skill list."
          subtitle="Real things I can build for you — end to end, from idea to deployed product."
        />

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`card-frame group p-6 md:p-7 flex flex-col justify-between min-h-[180px] invert-hover ${cap.span || ""}`}
            >
              <cap.icon size={26} strokeWidth={1.5} className="mb-6" />
              <div>
                <h3 className="font-display font-bold text-xl text-fg mb-2 group-hover:text-bg">
                  {cap.title}
                </h3>
                <p className="text-fg-dim text-sm leading-relaxed group-hover:text-bg/70">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
            The stack behind it
          </p>
          <div className="flex flex-wrap gap-3">
            {STACK.map(({ Icon, name }) => (
              <div
                key={name}
                className="flex items-center gap-2 border border-border px-3.5 py-2.5 text-fg-dim hover:border-fg hover:text-fg transition-colors"
              >
                <Icon size={16} />
                <span className="text-xs font-mono">{name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
