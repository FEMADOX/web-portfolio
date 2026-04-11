'use client'

import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'Backend Dev - FastAPI Ecosystem Lab',
    period: 'Mar 2026 - Present',
    description:
      'Advanced implementation of high-performance microservices architecture using FastAPI and asynchronous processing. Implementing clean architecture, Pydantic for advance validation and full type annotation on the entire project, SQLAlchemy as ORM with Alembic as migrations manager, Pytest as testing framework, using Postgres DB, Docker for the API deploying and a integration with the NextJS framework.',
    technologies: ['FastAPI', 'Python', 'Docker', 'PostgreSQL', 'Redis'],
    links: {
      github: 'https://github.com'
    },
    featured: true
  },
  {
    title: 'Full Stack - Django E-commers Project',
    period: 'Jan 2025 - Jan 2026',
    description:
      'Robust e-commerce platform featuring complex inventory management, payment gateway integration with Stripe, and customer dashboards. E-commerce created with Django. Cart, orders management and payments in Stripe included. With Django as a python web framework, user authentication, shopping cart logic, order validator, Stripe for payments and test using the Pytest framework.',
    technologies: ['Django', 'Stripe', 'Python', 'PostgreSQL'],
    links: {
      website: 'https://example.com'
    },
    featured: false
  },
  {
    title: 'Full Stack - Django Social Website',
    period: 'Oct 2024 - Aug 2025',
    description:
      'Social networking application with real-time updates, user profiles, and media sharing capabilities. Social website clone with Django. Like, follow and user authentications implementation. Django used as the main technology to craft this social website clone where users can upload from internet images to the website using bookmarks, user basic authentication and OAuth2 with Google and X.',
    technologies: ['Django', 'React', 'PostgreSQL', 'WebSocket'],
    links: {
      website: 'https://example.com'
    },
    featured: false
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="inline-block bg-accent text-accent-foreground px-4 py-2 text-lg font-bold uppercase tracking-wider">
          Projects
        </h2>
        <span className="text-xs text-accent font-mono hidden sm:block">
          DEPLOYMENTS.02
        </span>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-card border border-border rounded-lg p-6 transition-all hover:border-accent/50"
          >
            {/* Period Badge */}
            <div className="flex items-start justify-between mb-4">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded ${
                  project.featured
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {project.period}
              </span>
              <div className="flex gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.links.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded border border-border"
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
