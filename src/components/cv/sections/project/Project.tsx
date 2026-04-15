import type { ProjectsComponentProps } from '@/types/root'
import { ProjectLinks } from './ProjectLinks'
import { Technologies } from './Technologies'

export const Project = ({
  project: { title, period, description, technologies, links },
  accent,
  isLeftLine
}: ProjectsComponentProps) => (
  <div
    key={title}
    className={`grid grid-flow-row ${isLeftLine ? 'sm:grid-cols-[auto_1fr]' : 'sm:grid-cols-[1fr_auto]'} sm:items-start sm:gap-4`}
  >
    <div
      key={`${accent.key}`}
      className={`pointer-events-none w-0.75 h-full ${accent.line} ${isLeftLine ? 'order-first' : 'order-last w-0.75'}`}
      aria-hidden="true"
    />
    <div
      key={title}
      className={`
        group relative w-full bg-card border-2 border-border p-5 shadow-sm
        transition-transform will-change-transform hover:-translate-y-0.5 sm:hover:translate-y-0
        ${isLeftLine ? 'sm:hover:translate-x-0.5' : 'sm:hover:-translate-x-0.5'}
      `}
    >
      {/* Period Badge */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`
            inline-block px-2 py-0.5 text-[12px] font-black uppercase border border-border ${accent.badge}
          `}
        >
          {period}
        </span>
        <ProjectLinks links={links} accent={{ hoverText: accent.hoverText }} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-black uppercase leading-none text-foreground mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">
        {description}
      </p>

      {/* Technologies */}
      <Technologies technologies={technologies} accent={accent} />
    </div>
  </div>
)
