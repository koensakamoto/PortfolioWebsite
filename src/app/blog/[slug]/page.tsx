import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Koen Sakamoto`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown to HTML conversion
  const contentHtml = post.content
    .split("\n")
    .map((line) => {
      // Headers
      if (line.startsWith("### ")) {
        return `<h3 class="text-lg font-bold text-foreground mt-6 mb-3">${line.slice(4)}</h3>`;
      }
      if (line.startsWith("## ")) {
        return `<h2 class="text-xl font-bold text-foreground mt-8 mb-4">${line.slice(3)}</h2>`;
      }
      if (line.startsWith("# ")) {
        return `<h1 class="text-2xl font-bold text-foreground mt-8 mb-4">${line.slice(2)}</h1>`;
      }
      // List items
      if (line.startsWith("- ")) {
        return `<li class="ml-4 text-foreground">${line.slice(2)}</li>`;
      }
      if (line.match(/^\d+\. /)) {
        return `<li class="ml-4 text-foreground list-decimal">${line.replace(/^\d+\. /, "")}</li>`;
      }
      // Bold
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
      // Empty lines become paragraph breaks
      if (line.trim() === "") {
        return "<br />";
      }
      // Regular paragraphs
      return `<p class="text-foreground mb-4">${line}</p>`;
    })
    .join("\n");

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to blog
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <time className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </div>
    </main>
  );
}
