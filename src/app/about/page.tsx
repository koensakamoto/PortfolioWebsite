import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About | Koen Sakamoto",
  description: "Get to know Koen Sakamoto - CS student and developer.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header with photo */}
          <div className="flex flex-col sm:flex-row gap-8 mb-12">
            <div className="shrink-0">
              <Image
                src="/self-photo.png"
                alt="Koen Sakamoto"
                width={180}
                height={180}
                priority
                className="rounded-lg border-2 border-border shadow-[6px_6px_0px_0px] shadow-shadow"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4 inline-block border-b-4 border-accent pb-2">
                About Me
              </h1>
              <p className="text-lg text-muted-foreground">
                CS student at the University of Utah. I like building things that work.
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6 text-foreground mb-12">
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
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">What I&apos;m Into</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="font-bold text-foreground mb-2">Building</h3>
                <p className="text-sm text-muted-foreground">
                  Full-stack apps, real-time systems, tools that make life easier
                </p>
              </div>
              <div className="p-4 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="font-bold text-foreground mb-2">Learning</h3>
                <p className="text-sm text-muted-foreground">
                  AI/ML security, system design, new frameworks and languages
                </p>
              </div>
              <div className="p-4 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="font-bold text-foreground mb-2">Exploring</h3>
                <p className="text-sm text-muted-foreground">
                  How things work under the hood — databases, protocols, architectures
                </p>
              </div>
              <div className="p-4 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="font-bold text-foreground mb-2">Reading</h3>
                <p className="text-sm text-muted-foreground">
                  Tech blogs, documentation, and the occasional engineering book
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="p-6 border-2 border-border rounded-lg bg-muted shadow-[4px_4px_0px_0px] shadow-shadow text-center">
            <p className="text-foreground mb-4">
              Want to see my professional experience and skills?
            </p>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-medium rounded border-2 border-border shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
            >
              View Resume
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
