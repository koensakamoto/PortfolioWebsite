import { getRecentPosts } from "@/lib/blog";
import Link from "next/link";

export function RecentPosts() {
  const posts = getRecentPosts(3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground inline-block border-b-4 border-accent pb-2">
            Recent Posts
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm font-medium bg-accent text-accent-foreground rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-base line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <time className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
