import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Projects | Koen Sakamoto",
  description: "Software projects by Koen Sakamoto.",
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  highlights: string[];
};

const projects: Project[] = [
  {
    title: "CrimsonBites",
    subtitle: "Campus Nutrition Tracking Platform",
    description:
      "A nutrition tracking platform helping 150+ students make informed dietary choices by aggregating real-time menu data from campus dining halls.",
    tags: ["FastAPI", "React", "MongoDB", "Selenium", "AWS"],
    github: "https://github.com/koensakamoto",
    highlights: [
      "Engineered Selenium scraping pipeline extracting 500+ daily menu items with 98% accuracy",
      "Created interactive dashboards with Recharts for macronutrient tracking",
      "Deployed on AWS EC2 with S3 for static assets",
      "Implemented JWT + Google OAuth 2.0 authentication",
    ],
  },
  {
    title: "Rival Picks",
    subtitle: "Social Betting App",
    description:
      "An app for friends to make friendly bets on anything from sports to personal challenges.",
    tags: ["Spring Boot", "MySQL", "React Native", "WebSocket", "Redis"],
    github: "https://github.com/koensakamoto",
    highlights: [
      "Real-time messaging with WebSocket + STOMP and Firebase Cloud Messaging",
      "Comprehensive security with BCrypt, rate limiting, and account lockout",
      "Database evolution with Flyway migrations and optimized indexing",
    ],
  },
  {
    title: "Snake Game",
    subtitle: "Real-time Multiplayer Game Server",
    description:
      "A real-time multiplayer game server supporting 80+ concurrent players with smooth gameplay.",
    tags: ["C#", ".NET", "MySQL", "TCP/IP"],
    github: "https://github.com/koensakamoto",
    highlights: [
      "TCP/IP sockets with custom protocol for collision detection and state sync",
      "Scalable MySQL backend with connection pooling",
      "60 FPS gameplay with multi-threading for parallel input handling",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-foreground mb-4 inline-block border-b-4 border-accent pb-2">
            Projects
          </h1>
          <p className="text-muted-foreground mb-12">
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

          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="p-6 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {project.title}
                    </h2>
                    <p className="text-sm text-accent">{project.subtitle}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-border rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                        aria-label="View code"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-2 border-border rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                        aria-label="View live"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                <ul className="space-y-2 mb-4">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-accent shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
