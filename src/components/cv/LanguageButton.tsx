import type { Lang } from '@/app/types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const languages = {
  en: { label: 'Portfolio language', value: 'en', text: 'EN' },
  es: { label: 'Idioma del portafolio', value: 'es', text: 'ES' },
  pt: { label: 'Idioma do portfolio', value: 'pt', text: 'PT' }
}

export interface LanguageButtonProps {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const LanguageButton = ({ lang, setLang }: LanguageButtonProps) => {
  const { en, es, pt } = languages

  return (
    <Select value={languages[lang].value} onValueChange={setLang}>
      <SelectTrigger className="h-[stretch] w-16 cursor-pointer border-2 border-primary px-2 text-sm text-primary font-bold rounded-md transition-colors hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground">
        <SelectValue aria-label={languages[lang].label} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        side="bottom"
        align="end"
        sideOffset={20}
        className="z-70 shadow-normal rounded-none bg-card border-2 font-bold"
      >
        <SelectGroup>
          <SelectLabel>{languages[lang].label}</SelectLabel>
          <SelectItem className="cursor-pointer" value={en.value}>
            {en.text}
          </SelectItem>
          <SelectItem className="cursor-pointer" value={es.value}>
            {es.text}
          </SelectItem>
          <SelectItem className="cursor-pointer" value={pt.value}>
            {pt.text}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
