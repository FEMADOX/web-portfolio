import type { LanguageProps } from './types'

export const Language = ({ name, level }: LanguageProps) => (
  <div
    key={name}
    className="flex items-center gap-2 px-3 py-2 bg-muted border border-border shadow-sm elevation-animation"
  >
    <span className="text-xs font-bold uppercase text-foreground">{name}</span>
    <span className="text-xs text-muted-foreground">({level})</span>
  </div>
)
