import type { SkillsComponentProps } from './types'

export const SkillsComponent = ({ skills }: SkillsComponentProps) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
    {skills.map(({ name, icon: Icon }) => (
      <div
        key={name}
        className={`flex items-center gap-2 px-3 py-2.5 border-2 border-border bg-card elevation-animation shadow-sm`}
      >
        <Icon className="shrink-0" />
        <span className="text-xs font-black text-foreground uppercase">
          {name}
        </span>
      </div>
    ))}
  </div>
)
