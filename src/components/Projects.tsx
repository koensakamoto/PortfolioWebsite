"use client";

import { useEffect, useRef } from "react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "Project One",
    description:
      "Short description of what this project does and why you built it.",
    tags: ["React", "TypeScript"],
    github: "https://github.com/koensakamoto",
    live: "https://example.com",
  },
  {
    title: "Project Two",
    description:
      "Another project. Keep descriptions brief — the code speaks for itself.",
    tags: ["Python", "FastAPI"],
    github: "https://github.com/koensakamoto",
  },
  {
    title: "Project Three",
    description:
      "What problem does this solve? What did you learn building it?",
    tags: ["Next.js", "Tailwind"],
    github: "https://github.com/koensakamoto",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="p-5 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow opacity-0 translate-y-4 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px]"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-bold text-lg text-foreground">
          {project.title}
        </h3>
        <div className="flex gap-2 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-border rounded hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="View code"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-border rounded hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="View live"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 opacity-0 translate-y-8 transition-all duration-500 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 inline-block border-b-4 border-accent pb-2">
          Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
