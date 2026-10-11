import { useLanguageContext } from '@/contexts/LanguageContext'
import { Language } from './Language'
import type { LanguageProps } from './types'
import { getLanguages } from './utils'

export const Languages = () => {
  const lang = useLanguageContext()

  return (
    <div className="mt-6">
      <h3 className="text-xs font-black text-foreground uppercase tracking-wider mb-3">
        {lang === 'en' ? 'Languages' : 'Idiomas'}
      </h3>
      <div className="flex flex-wrap flex-col gap-3 w-max">
        {getLanguages(lang).map(({ name, level }: LanguageProps) => (
          <Language key={name} name={name} level={level} />
        ))}
      </div>
    </div>
  )
}
