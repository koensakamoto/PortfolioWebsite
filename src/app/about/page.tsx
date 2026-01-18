import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About | Koen Sakamoto",
  description: "Get to know Koen Sakamoto - CS student and developer.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-8">
          {/* Header with photo */}
          <div className="flex flex-col sm:flex-row gap-10 mb-16">
            <div className="shrink-0">
              <Image
                src="/self-photo.png"
                alt="Koen Sakamoto"
                width={240}
                height={240}
                priority
                className="rounded-xl border-2 border-border shadow-[6px_6px_0px_0px] shadow-shadow"
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-6 inline-block border-b-4 border-accent pb-3">
                About Me
              </h1>
              <p className="text-xl text-muted-foreground">
                CS student at the University of Utah. I like building things that work.
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6 text-lg text-foreground leading-relaxed mb-16">
            <p>
              Hey! I&apos;m Koen, a Computer Science student based in Salt Lake City.
              I got into programming because I wanted to build things — not just use them.
              That curiosity has taken me from writing my first Python scripts to building
              full-stack applications and diving into AI security research.
            </p>
            <p>
              Right now, I&apos;m particularly interested in the intersection of software
              and systems — how things work under the hood, from databases to real-time
              communication to LLMs. I enjoy projects where I can learn something new
              while solving a real problem.
            </p>
            <p>
              When I&apos;m not coding, you might find me exploring new tools and
              technologies, reading about system design, or working on side projects
              that may or may not ever get finished (we&apos;ve all been there).
            </p>
          </div>

          {/* What I'm into */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">What I&apos;m Into</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-lg font-bold text-foreground mb-2">Building</h3>
                <p className="text-base text-muted-foreground">
                  Full-stack apps, real-time systems, tools that make life easier
                </p>
              </div>
              <div className="p-6 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-lg font-bold text-foreground mb-2">Learning</h3>
                <p className="text-base text-muted-foreground">
                  AI/ML security, system design, new frameworks and languages
                </p>
              </div>
              <div className="p-6 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-lg font-bold text-foreground mb-2">Exploring</h3>
                <p className="text-base text-muted-foreground">
                  How things work under the hood — databases, protocols, architectures
                </p>
              </div>
              <div className="p-6 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-lg font-bold text-foreground mb-2">Reading</h3>
                <p className="text-base text-muted-foreground">
                  Tech blogs, documentation, and the occasional engineering book
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 border-2 border-border rounded-lg bg-muted shadow-[4px_4px_0px_0px] shadow-shadow text-center">
            <p className="text-lg text-foreground mb-5">
              Want to see my professional experience and skills?
            </p>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 text-lg bg-accent text-accent-foreground font-semibold rounded-lg border-2 border-border shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
            >
              View Resume
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
    </main>
  );
}
