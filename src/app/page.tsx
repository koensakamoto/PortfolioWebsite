import { Hero } from "@/components/Hero";
import { RecentPosts } from "@/components/RecentPosts";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      {/* Quick links */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid sm:grid-cols-3 gap-8">
            <Link
              href="/projects"
              className="p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all text-center"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">Projects</h3>
              <p className="text-base text-muted-foreground">See what I&apos;ve built</p>
            </Link>
            <Link
              href="/resume"
              className="p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all text-center"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">Resume</h3>
              <p className="text-base text-muted-foreground">Experience & skills</p>
            </Link>
            <Link
              href="/contact"
              className="p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all text-center"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">Contact</h3>
              <p className="text-base text-muted-foreground">Get in touch</p>
            </Link>
          </div>
        </div>
      </section>

      <RecentPosts />
    </main>
  );
}
