import { ProjectImages } from "@/components/ProjectImages";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Projects | Koen Sakamoto",
  description: "Software projects by Koen Sakamoto.",
};

type Project = {
  title: string;
  category: string;
  description: string;
  features: string[];
  tags: string[];
  github?: string;
  live?: string;
  image?: string;
  aspectRatio?: string; // Custom aspect ratio for image container
  images?: string[]; // For multiple screenshots (e.g., mobile apps)
};

const projects: Project[] = [
  {
    title: "CrimsonBites",
    category: "Web Development",
    description:
      "A nutrition tracking platform helping students make informed dietary choices at campus dining halls with real-time menu data, personalized goal tracking, and historical nutrition analysis.",
    features: [
      "Selenium scraping pipeline extracting 500+ daily menu items",
      "Advanced dietary filtering by allergies, preferences, and macronutrient goals",
      "Interactive Recharts dashboards for visualizing nutrition trends over time",
    ],
    tags: ["FastAPI", "React", "Vite", "Tailwind CSS", "MongoDB", "Selenium"],
    github: "https://github.com/koensakamoto/CrimsonBites",
    live: "https://crimsonbites.com/",
    image: "/crimsonbites.png",
    aspectRatio: "16/10",
  },
  {
    title: "Rival Picks",
    category: "Mobile Development",
    description:
      "A social betting app for friends to make friendly bets on anything from sports to personal challenges, with real-time messaging and stake tracking.",
    features: [
      "Real-time WebSocket communication for instant chat and live updates",
      "Secure authentication with JWT, OAuth 2.0 (Google/Apple), and rate limiting",
      "External services: Firebase notifications, Cloudflare R2 storage, email delivery (Resend)",
      "Flexible outcome determination: Bet creator decides winner, trusted judge resolves, or group votes democratically",
    ],
    tags: ["Spring Boot", "MySQL", "Redis", "WebSocket", "React Native", "Expo", "TypeScript"],
    github: "https://github.com/koensakamoto/RivalPicks",
    images: ["/rivalpicks.png", "/rivalpicks-profile.png", "/rivalpicks-create.png", "/rivalpicks-feed.png"],
  },
  {
    title: "Snake Game",
    category: "Game Development",
    description:
      "A browser-based multiplayer snake game supporting 80+ concurrent players with smooth 60 FPS gameplay, featuring powerup collection and persistent leaderboards.",
    features: [
      "Multi-threaded TCP server with custom JSON protocol for real-time state synchronization",
      "HTML Canvas rendering with animation system for death effects and powerup collection",
      "MySQL backend tracking enter/leave times, max scores, and per-session leaderboards",
    ],
    tags: ["C#", ".NET", "Blazor", "ASP.NET Core", "MySQL", "TCP/IP"],
    github: "https://github.com/koensakamoto/snake_game",
    image: "/snakegame.png",
  },
  {
    title: "Circuit Builder",
    category: "Desktop Application",
    description:
      "An interactive digital logic simulator featuring drag-and-drop circuit construction and real-time Boolean logic evaluation.",
    features: [
      "Docker containerization supporting production deployment and CI test automation",
      "Circuit evaluation algorithm using recursive graph traversal with cycle detection and truth table validation",
      "Google Test suite achieving 90% code coverage with automated CI enforcement",
    ],
    tags: ["C++", "Qt", "Box2D", "Docker", "GitHub Actions", "Google Test"],
    github: "https://github.com/koensakamoto/CircuitBuilder",
    image: "/circuit-builder.png",
  },
  {
    title: "Sprite Editor",
    category: "Desktop Application",
    description:
      "A pixel art editor supporting 60 FPS multi-frame animations and 100x100 pixel canvases using Model-View architecture with custom drawing tools.",
    features: [
      "Paint bucket tool using BFS flood-fill to detect and fill connected regions of matching colors",
      "Undo/redo functionality allowing users to reverse and restore edits, with separate history for each frame",
      "Custom JSON format with lossless RGBA preservation",
      "Real-time preview system for animations",
    ],
    tags: ["C++", "Qt"],
    github: "https://github.com/koensakamoto/Sprite-Editor",
    image: "/sprite-editor.png",
  },
];

export default function ProjectsPage() {
  return (
    <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-5xl font-bold text-foreground mb-6 inline-block border-b-4 border-accent pb-3">
            Projects
          </h1>
          <p className="text-muted-foreground text-xl mb-16">
            A collection of things I&apos;ve built. More on{" "}
            <Link
              href="https://github.com/koensakamoto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </Link>
            .
          </p>

          <div className="space-y-12">
            {projects.map((project) => (
              <article
                key={project.title}
                className="border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow overflow-hidden"
              >
                {/* Image(s) - Full width at top */}
                {project.images ? (
                  <ProjectImages images={project.images} title={project.title} />
                ) : project.image ? (
                  <div className="p-6 md:p-8 bg-muted border-b-2 border-border">
                    <div
                      className="relative w-full overflow-hidden rounded-lg border-2 border-border shadow-[4px_4px_0px_0px] shadow-shadow"
                      style={{ aspectRatio: project.aspectRatio || "16/9" }}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 896px, 1024px"
                        className="object-cover"
                        priority={project.title === "CrimsonBites"}
                      />
                    </div>
                  </div>
                ) : null}

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Category */}
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-foreground mt-2 mb-3">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="text-accent shrink-0">—</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm font-medium bg-muted text-foreground rounded border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-semibold rounded border-2 border-border shadow-[3px_3px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px] transition-all"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Source
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-accent text-accent-foreground font-semibold rounded border-2 border-border shadow-[3px_3px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px] transition-all"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
    </main>
  );
}
