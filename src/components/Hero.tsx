"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
      className="pt-32 pb-12"
    >
      <div className="max-w-5xl mx-auto px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          <div className="shrink-0">
            <div className="relative">
              <Image
                src="/self-photo.png"
                alt="Koen Sakamoto"
                width={240}
                height={240}
                priority
                className="rounded-xl border-2 border-border shadow-[6px_6px_0px_0px] shadow-shadow"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
              Koen Sakamoto
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Computer Engineering student at the University of Utah. I make code do cool things.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 mt-4 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
