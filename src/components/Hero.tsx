"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-[80vh] flex items-center pt-20"
    >
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          <div className="shrink-0">
            <div className="relative">
              <Image
                src="/self-photo.png"
                alt="Koen Sakamoto"
                width={180}
                height={180}
                priority
                className="rounded-lg border-2 border-border shadow-[6px_6px_0px_0px] shadow-shadow"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Koen Sakamoto
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-lg">
              CS student exploring the boundary between software and hardware.
              Currently studying computer science, planning to pursue electrical
              engineering. I like building things that work.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/projects"
                className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded border-2 border-border shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
              >
                Explore
              </a>
              <a
                href="/resume.pdf"
                download
                className="px-6 py-3 bg-background text-foreground font-semibold rounded border-2 border-border shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
