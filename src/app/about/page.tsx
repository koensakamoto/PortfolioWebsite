import Image from "next/image";

export const metadata = {
  title: "About | Koen Sakamoto",
  description: "Get to know Koen Sakamoto - Electrical Engineering student and developer.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-8">
          {/* Header with photo */}
          <div className="flex flex-col sm:flex-row gap-10">
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
            <div className="space-y-5">
              <h1 className="text-5xl font-bold text-foreground inline-block border-b-4 border-accent pb-3">
                About Me
              </h1>
              <p className="text-lg text-foreground leading-relaxed">
                I&apos;m a junior Electrical Engineering student at the University of Utah focused on
                building clean, reliable software that solves real problems.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                I enjoy working across the full stack, from designing intuitive interfaces
                to architecting well-structured APIs and backend systems. I care deeply
                about code quality, performance, and understanding the why behind
                solutions, not just making tests pass.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Currently seeking a software engineering internship where I can contribute
                to meaningful projects and continue growing as a developer.
              </p>
            </div>
          </div>

          {/* Currently */}
          <section className="mt-16">
            <h2 className="text-4xl font-bold text-foreground mb-10">Currently</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              <div className="p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-base font-medium text-muted-foreground mb-3">Interning at</h3>
                <p className="text-xl text-foreground font-medium">Peraton</p>
              </div>
              <div className="p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-base font-medium text-muted-foreground mb-3">Currently debugging</h3>
                <p className="text-xl text-foreground font-medium">Probably Something</p>
              </div>
              <div className="p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-base font-medium text-muted-foreground mb-3">Reading</h3>
                <p className="text-xl text-foreground font-medium">The Name of the Wind</p>
              </div>
              <div className="p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-base font-medium text-muted-foreground mb-3">Listening to</h3>
                <p className="text-xl text-foreground font-medium">The 1975, Mac Miller, Arctic Monkeys</p>
              </div>
              <div className="p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-base font-medium text-muted-foreground mb-3">Watching</h3>
                <p className="text-xl text-foreground font-medium">Pluribus</p>
              </div>
              <div className="p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="text-base font-medium text-muted-foreground mb-3">Excited about</h3>
                <p className="text-xl text-foreground font-medium">Snowboard Season</p>
              </div>
            </div>
          </section>
        </div>
    </main>
  );
}
