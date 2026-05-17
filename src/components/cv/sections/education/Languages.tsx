import type { Lang } from '@/app/types'
import { Language } from './Language'
import type { LanguageProps } from './types'
import { getLanguages } from './utils'

interface LanguagesProps {
  lang: Lang
}

export const Languages = ({ lang }: LanguagesProps) => (
  <div className="mt-6">
    <h3 className="text-xs font-black text-foreground uppercase tracking-wider mb-3">
      {lang === 'es' ? 'Idiomas' : 'Languages'}
    </h3>
    <div className="flex flex-wrap flex-col gap-3 w-max">
      {getLanguages(lang).map(({ name, level }: LanguageProps) => (
        <Language key={name} name={name} level={level} />
      ))}
    </div>
  </div>
)
