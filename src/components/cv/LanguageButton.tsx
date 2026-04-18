import type { Lang } from '@/app/types'
import { Button } from '../ui'

export interface LanguageButtonProps {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const LanguageButton = ({ lang, setLang }: LanguageButtonProps) => {
  const handleLanguageToggle = () => {
    setLang(lang === 'en' ? 'es' : 'en')
  }

  return (
    <Button
      className={`
        bg-background text-primary border-2 font-bold w-10 px-2 dark:border-primary
        hover:text-muted hover:cursor-pointer
      `}
      onClick={handleLanguageToggle}
    >
      {lang === 'en' ? 'EN' : 'ES'}
    </Button>
  )
}
