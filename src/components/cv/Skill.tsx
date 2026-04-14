import type { Skill } from '@/types/root'

export const SkillComponent = ({ name, icon: Icon }: Skill) => (
  <div
    key={name}
    className={`flex items-center gap-2 px-3 py-2.5 border-2 border-border bg-card elevation-animation shadow-sm`}
  >
    <Icon className="shrink-0" />
    <span className="text-xs font-black text-foreground uppercase">{name}</span>
  </div>
)
