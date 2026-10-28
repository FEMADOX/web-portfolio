import { getCvLocale } from '@/app/i18n'
import { EffectsToggle } from '@/components/ambient/EffectsToggle'
import { LanguageButton } from '@/components/cv/LanguageButton'
import { ThemeToggle } from '@/components/cv/ThemeToggle'
import { useIntroductionStage } from '@/contexts/IntroductionContext'
import { useLanguageContext } from '@/contexts/LanguageContext'

const GalleryControls = () => {
  const lang = useLanguageContext()
  const { cursorTarget } = useIntroductionStage()

  return (
    <div className="flex shrink-0 items-stretch gap-2 [&>button]:min-h-11 [&>button]:min-w-11 [&>button:not([role=combobox])]:w-11">
      <EffectsToggle />
      <ThemeToggle labels={getCvLocale(lang).theme} />
      <LanguageButton
        container={cursorTarget}
        scroll={false}
        transitionTypes={['gallery-language']}
      />
    </div>
  )
}

export default GalleryControls
