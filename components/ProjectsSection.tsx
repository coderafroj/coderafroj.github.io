"use client";

import { useEffect, useState } from "react";
import SectionHead from "./SectionHead";
import ProjectCard from "./ProjectCard";
import { subscribeToProjects } from "@/lib/projects";
import { seedProjects } from "@/lib/seedData";
import type { Project } from "@/lib/types";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToProjects(
      (live) => {
        setProjects(live.length > 0 ? live : seedProjects);
        setLoaded(true);
      },
      () => setLoaded(true)
    );
    return unsubscribe;
  }, []);

  return (
    <section id="work" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHead
          index="01"
          eyebrow="Selected Work"
          title="Projects &"
          titleAccent="available builds."
          subtitle="Shipped work and ready-to-buy builds — architecture, UI, and everything in between."
        />
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        {!loaded && (
          <p className="mt-6 font-mono text-xs text-muted">Loading live projects…</p>
        )}
      </div>
    </section>
  );
}
