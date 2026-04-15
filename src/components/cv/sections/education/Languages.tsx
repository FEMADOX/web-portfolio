import { Language } from './Language'
import type { LanguageProps } from './types'
import { languages } from './utils'

export const Languages = () => (
  <div className="mt-6">
    <h3 className="text-xs font-black text-foreground uppercase tracking-wider mb-3">
      Languages
    </h3>
    <div className="flex flex-wrap flex-col gap-3 w-max">
      {languages.map(({ name, level }: LanguageProps) => (
        <Language key={name} name={name} level={level} />
      ))}
    </div>
  </div>
)
