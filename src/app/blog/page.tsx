import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog | Koen Sakamoto",
  description: "Thoughts on software, hardware, and everything in between.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-5xl font-bold text-foreground mb-6 inline-block border-b-4 border-accent pb-3">
            Blog
          </h1>
          <p className="text-muted-foreground text-xl mb-16">
            Thoughts on software, hardware, and everything in between.
          </p>

          {posts.length === 0 ? (
            <p className="text-muted-foreground text-lg">No posts yet. Check back soon!</p>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-8 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm font-medium bg-accent text-accent-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-base mb-4">
                    {post.excerpt}
                  </p>
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </Link>
              ))}
            </div>
          )}
        </div>
    </main>
  );
}
