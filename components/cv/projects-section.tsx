"use client"

const projects = [
  {
    title: "BACKEND DEV - FASTAPI ECOSYSTEM LAB",
    period: "MAR 2026 - PRESENT",
    description:
      "Advanced implementation of high-performance microservices architecture using FastAPI and asynchronous processing.",
    technologies: ["FASTAPI", "REDIS"],
    featured: true,
  },
  {
    title: "FULL STACK - DJANGO E-COMMERS PROJECT",
    period: "JAN 2025 - JAN 2026",
    description:
      "Robust e-commerce platform featuring complex inventory management, payment gateway integration, and customer dashboards.",
    technologies: ["DJANGO", "STRIPE"],
    featured: false,
  },
  {
    title: "FULL STACK - DJANGO SOCIAL WEBSITE",
    period: "OCT 2024 - AUG 2025",
    description:
      "Social networking application with real-time updates, user profiles, and media sharing capabilities.",
    technologies: ["POSTGRESQL", "REACT"],
    featured: false,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-12">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="inline-block bg-accent text-accent-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider">
          Projects
        </h2>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative bg-card rounded-lg p-5 border-l-2 border-l-transparent hover:border-l-accent transition-all"
          >
            {/* Period Badge */}
            <div className="mb-3">
              <span
                className={`inline-block px-3 py-1 text-[10px] font-semibold tracking-wider rounded ${
                  project.featured
                    ? "bg-accent text-accent-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {project.period}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-foreground mb-2 leading-tight">{project.title}</h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-[10px] font-semibold bg-muted text-foreground rounded tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
