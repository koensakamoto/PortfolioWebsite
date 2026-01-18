import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog | Koen Sakamoto",
  description: "Thoughts on software, hardware, and everything in between.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
        <p className="text-muted-foreground mb-12">
          Thoughts on software, hardware, and everything in between.
        </p>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-3">
                  {post.excerpt}
                </p>
                <time className="text-xs text-muted-foreground">
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
