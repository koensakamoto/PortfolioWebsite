import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Resume | Koen Sakamoto",
  description: "Professional experience and skills of Koen Sakamoto.",
};

const experience = [
  {
    title: "Research Assistant",
    company: "University of Utah",
    location: "Salt Lake City, UT",
    date: "August 2025 – November 2025",
    points: [
      "Contributed to research findings by benchmarking 15+ LLM models for vulnerability exposure",
      "Engineered a custom Model Context Protocol (MCP) server and scalable testing pipeline to simulate tool interactions, enabling systematic detection and testing of backdoor triggers across multi-step LLM workflows",
      "Developed interactive dashboards to visualize vulnerability metrics, test outcomes, and model performance trends",
    ],
  },
  {
    title: "IT Intern",
    company: "English Skills Learning Center",
    location: "West Valley City, UT",
    date: "April 2025 – July 2025",
    points: [
      "Architected automated asset management system using database design and Python scripts to inventory 300+ assets, reducing manual overhead and preventing duplicate purchases",
      "Resolved 40+ IT tickets covering OS errors, hardware issues, and network problems, minimizing classroom and staff downtime",
      "Created and maintained 10+ Standard Operating Procedures for software installs, user permissions, and troubleshooting",
    ],
  },
];

const skills = {
  languages: [
    { name: "Java", level: 90 },
    { name: "Python", level: 85 },
    { name: "TypeScript", level: 85 },
    { name: "C#", level: 80 },
    { name: "SQL", level: 85 },
    { name: "C++", level: 75 },
  ],
  frameworks: [
    { name: "React", level: 90 },
    { name: "Spring Boot", level: 85 },
    { name: "FastAPI", level: 80 },
    { name: ".NET", level: 75 },
    { name: "Tailwind", level: 90 },
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 80 },
    { name: "AWS", level: 75 },
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 80 },
  ],
};

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full border border-border overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <h1 className="text-4xl font-bold text-foreground inline-block border-b-4 border-accent pb-2">
              Resume
            </h1>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-medium rounded border-2 border-border shadow-[4px_4px_0px_0px] shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px] transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          </div>

          {/* Education */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Education</h2>
            <div className="p-5 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-lg text-foreground">University of Utah</h3>
                  <p className="text-accent">Bachelor of Science in Computer Science</p>
                </div>
                <span className="text-sm text-muted-foreground">Expected May 2027</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                <span className="font-medium">Relevant Coursework:</span> Data Structures & Algorithms,
                Database Systems, Software Practices, Computer Security, Computer Organization, Computer Systems
              </p>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Experience</h2>
            <div className="space-y-4">
              {experience.map((job) => (
                <div
                  key={job.title + job.company}
                  className="p-5 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{job.title}</h3>
                      <p className="text-accent">{job.company}</p>
                    </div>
                    <div className="text-sm text-muted-foreground sm:text-right">
                      <p>{job.date}</p>
                      <p>{job.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {job.points.map((point, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-accent shrink-0">–</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Technical Skills</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="font-bold text-foreground mb-4">Languages</h3>
                {skills.languages.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
              <div className="p-5 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="font-bold text-foreground mb-4">Frameworks</h3>
                {skills.frameworks.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
              <div className="p-5 border-2 border-border rounded-lg bg-background shadow-[4px_4px_0px_0px] shadow-shadow">
                <h3 className="font-bold text-foreground mb-4">Tools</h3>
                {skills.tools.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          </section>

          {/* Knowledge areas */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Knowledge</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Full-Stack Development",
                "REST APIs",
                "Database Design",
                "Agile/Scrum",
                "CI/CD",
                "Cloud Deployment",
                "Security",
                "LLM Systems",
                "Real-time Systems",
                "WebSockets",
              ].map((item) => (
                <span
                  key={item}
                  className="px-3 py-2 text-sm font-medium bg-background border-2 border-border rounded shadow-[2px_2px_0px_0px] shadow-shadow"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
