import type { TechnologiesProps } from '@/types/root'

export const Technologies = ({ technologies, accent }: TechnologiesProps) => (
  <div className="flex flex-wrap gap-2">
    {technologies.map((tech) => (
      <span
        key={tech}
        className={`
          px-2 py-1 text-[10px] font-bold uppercase bg-muted text-foreground border border-border
          ${accent.hoverLine} hover:text-white transition-colors
        `}
      >
        {tech}
      </span>
    ))}
  </div>
)
