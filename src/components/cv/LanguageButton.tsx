import type { Lang } from '@/app/types'

export interface LanguageButtonProps {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const LanguageButton = ({ lang, setLang }: LanguageButtonProps) => {
  return (
    <select
      aria-label={
        {
          en: 'Portfolio language',
          es: 'Idioma del portafolio',
          pt: 'Idioma do portfólio'
        }[lang]
      }
      className="h-10 w-16 cursor-pointer border-2 border-border bg-background px-1 text-sm font-bold text-primary dark:border-primary"
      value={lang}
      onChange={event => setLang(event.target.value as Lang)}
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
      <option value="pt">PT</option>
    </select>
  )
}
