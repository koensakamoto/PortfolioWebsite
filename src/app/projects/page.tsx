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
      "A nutrition tracking platform helping 150+ students make informed dietary choices by aggregating real-time menu data from campus dining halls.",
    features: [
      "Selenium scraping pipeline extracting 500+ daily menu items",
      "Interactive dashboards with Recharts for macronutrient tracking",
      "JWT + Google OAuth 2.0 authentication",
    ],
    tags: ["FastAPI", "React", "MongoDB", "Selenium", "AWS"],
    github: "https://github.com/koensakamoto/CrimsonBites",
    image: "/crimsonbites.png",
    aspectRatio: "16/10",
  },
  {
    title: "Rival Picks",
    category: "Mobile Development",
    description:
      "A social betting app for friends to make friendly bets on anything from sports to personal challenges, with real-time messaging and stake tracking.",
    features: [
      "Real-time messaging with WebSocket + STOMP",
      "Firebase Cloud Messaging for push notifications",
      "Secure auth with BCrypt and rate limiting",
    ],
    tags: ["Spring Boot", "MySQL", "React Native", "WebSocket", "Redis"],
    github: "https://github.com/koensakamoto/RivalPicks",
    images: ["/rivalpicks-profile.png", "/rivalpicks-create.png", "/rivalpicks-feed.png"],
  },
  {
    title: "Snake Game",
    category: "Game Development",
    description:
      "A real-time multiplayer game server supporting 80+ concurrent players with smooth 60 FPS gameplay and persistent leaderboards.",
    features: [
      "TCP/IP sockets with custom protocol for state sync",
      "Multi-threading for parallel input handling",
      "Scalable MySQL backend with connection pooling",
    ],
    tags: ["C#", ".NET", "MySQL", "TCP/IP"],
    github: "https://github.com/koensakamoto/snake_game",
    image: "/snakegame.png",
  },
  {
    title: "Circuit Builder",
    category: "Desktop Application",
    description:
      "An interactive digital logic simulator used by 50+ engineering students, featuring drag-and-drop circuit construction and real-time Boolean logic evaluation.",
    features: [
      "Containerized with Docker, deployed on AWS EC2 for cross-platform access",
      "CI/CD pipeline with automated unit and integration tests",
      "90% code coverage ensuring reliable circuit logic",
    ],
    tags: ["C++", "Qt", "Box2D", "Docker", "AWS"],
    github: "https://github.com/koensakamoto/CircuitBuilder",
  },
  {
    title: "Sprite Editor",
    category: "Desktop Application",
    description:
      "A pixel art editor supporting 60 FPS multi-frame animations and 100x100 pixel canvases using Model-View architecture with custom drawing tools.",
    features: [
      "Flood-fill algorithm processing contiguous pixels in <50ms",
      "Custom JSON format preserving RGBA data with 100% fidelity",
      "Real-time preview system for animations",
    ],
    tags: ["C++", "Qt"],
    github: "https://github.com/koensakamoto/Sprite-Editor",
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
                        className="px-5 py-2.5 bg-foreground text-background font-semibold rounded border-2 border-border shadow-[3px_3px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px] transition-all"
                      >
                        View Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-accent text-accent-foreground font-semibold rounded border-2 border-border shadow-[3px_3px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px] transition-all"
                      >
                        Live Demo
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
