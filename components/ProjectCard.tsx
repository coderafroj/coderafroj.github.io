"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ImageOff, Tag } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "@/lib/types";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgError, setImgError] = useState(false);
  const primaryHref = project.forSale
    ? `mailto:hello@coderafroj.me?subject=${encodeURIComponent(
        `Inquiry: ${project.title}`
      )}`
    : project.liveUrl || project.sourceUrl || "#";

  return (
    <motion.a
      href={primaryHref}
      target={project.forSale ? undefined : primaryHref !== "#" ? "_blank" : undefined}
      rel={primaryHref !== "#" ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.3), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group relative block overflow-hidden card-frame ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      {project.forSale && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-fg text-bg text-xs font-mono font-semibold px-3 py-1.5">
          <Tag size={11} />
          {project.price || "Available"}
        </div>
      )}

      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500 pointer-events-none z-20" />

      <div className="grid md:grid-cols-2">
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-xs text-muted">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {project.featured && (
                <span className="border border-border-strong px-2 py-0.5 text-fg-dim">Featured</span>
              )}
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-fg mb-3">
              {project.title}
            </h3>
            <p className="text-fg-dim text-sm leading-relaxed mb-5">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] uppercase tracking-wide text-fg-dim border border-border px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg">
            {project.forSale ? (
              <>Get This Build</>
            ) : (
              <>
                {project.sourceUrl ? <GithubIcon size={14} /> : null}
                View Source
              </>
            )}
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="relative min-h-[220px] overflow-hidden bg-surface">
          {imgError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <ImageOff size={22} className="text-muted" />
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                Image pending
              </span>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageUrl}
              alt={project.title}
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ease-out"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent md:bg-gradient-to-l" />
        </div>
      </div>
    </motion.a>
  );
}
