import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '../icons'
import { projectAccents, projects } from './utils/projects'

export const ProjectsList = () => (
  <div className="space-y-5">
    {projects.map((project, index) => {
      const accent = projectAccents[index % projectAccents.length]
      const isLeftLine = index % 2 === 0

      return (
        <div
          key={project.title}
          className={`grid grid-flow-row ${isLeftLine ? 'sm:grid-cols-[auto_1fr]' : 'sm:grid-cols-[1fr_auto]'} sm:items-start sm:gap-4`}
        >
          <div
            key={`${accent.key}`}
            className={`pointer-events-none w-0.75 h-full ${accent.line} ${isLeftLine ? 'order-first' : 'order-last'}`}
            aria-hidden="true"
          />
          <div
            key={project.title}
            // If the line is on the left, we want to translate the card to the right, and vice versa, to create a staggered effect
            className={`
              group relative w-full bg-card border-2 border-border p-5 shadow-sm transition-transform will-change-transform 
              hover:-translate-y-0.5 sm:hover:translate-y-0 ${isLeftLine ? 'sm:hover:translate-x-0.5' : 'sm:hover:-translate-x-0.5'}
            `}
          >
            {/* Period Badge */}
            <div className="flex items-start justify-between mb-4">
              <span
                className={`inline-block px-2 py-0.5 text-[12px] font-black uppercase border border-border ${accent.badge}`}
              >
                {project.period}
              </span>
              <div className="flex gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground ${accent.hoverText} transition-colors`}
                  >
                    <GithubIcon size={20} />
                  </a>
                )}
                {project.links.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground ${accent.hoverText} transition-colors`}
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black uppercase leading-none text-foreground mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-1 text-[10px] font-bold uppercase bg-muted text-foreground border border-border hover:${accent.line} hover:text-white transition-colors`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    })}
  </div>
)
