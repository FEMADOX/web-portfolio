import { LANGUAGE_CONFIG, SUPPORTED_LANGUAGES } from '@/app/constants'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useLanguageContext } from '@/contexts/LanguageContext'
import useLanguageNavigation from '@/hooks/useLanguageNavigation'

export const LanguageButton = () => {
  const [lang, setLang] = [useLanguageContext(), useLanguageNavigation()]

  return (
    <Select value={lang} onValueChange={setLang}>
      <SelectTrigger className="h-[stretch] w-16 cursor-pointer border-2 border-primary px-2 text-sm text-primary font-bold rounded-md transition-colors hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground">
        <SelectValue aria-label={LANGUAGE_CONFIG[lang].selectLabel} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        side="bottom"
        align="end"
        sideOffset={20}
        className="z-70 shadow-normal rounded-none bg-card border-2 font-bold"
      >
        <SelectGroup>
          <SelectLabel>{LANGUAGE_CONFIG[lang].selectLabel}</SelectLabel>
          {SUPPORTED_LANGUAGES.map(value => (
            <SelectItem
              key={value}
              className="cursor-pointer"
              value={value}
              disabled={value === lang}
            >
              {LANGUAGE_CONFIG[value].shortLabel}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
