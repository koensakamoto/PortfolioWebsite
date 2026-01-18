"use client";

import { useEffect, useRef } from "react";

export function About() {
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

  const skills = [
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "C/C++",
    "Git",
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 opacity-0 translate-y-8 transition-all duration-500 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 inline-block border-b-4 border-accent pb-2">
          About Me
        </h2>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-4 text-foreground">
            <p>
              I&apos;m currently a computer science student with a growing interest
              in electrical engineering. The plan is to minor in CS while focusing
              on EE — I want to understand the full stack, from transistors to
              user interfaces.
            </p>
            <p>
              Right now I mostly build software: web apps, scripts, the occasional
              side project that never quite gets finished. As I get deeper into EE,
              I&apos;m hoping to work on projects that combine both worlds — embedded
              systems, hardware prototypes, that kind of thing.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="p-4 border-2 border-border rounded-lg bg-muted shadow-[4px_4px_0px_0px] shadow-shadow">
              <h3 className="font-bold text-foreground mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm font-medium bg-background border-2 border-border rounded shadow-[2px_2px_0px_0px] shadow-shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
