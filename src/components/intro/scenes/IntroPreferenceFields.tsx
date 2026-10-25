import { introCopy, introLanguages } from '../copy'
import IntroChoices from '../IntroChoices'
import type { IntroScenesProps } from '../types'

type Props = Pick<
  IntroScenesProps,
  | 'lang'
  | 'theme'
  | 'sidebarMode'
  | 'effectsEnabled'
  | 'animate'
  | 'onLanguageChange'
  | 'onThemeChange'
  | 'onEffectsChange'
  | 'onSidebarChange'
>

export default function IntroPreferenceFields({
  lang,
  theme,
  sidebarMode,
  effectsEnabled,
  animate: reveal,
  onLanguageChange,
  onThemeChange,
  onEffectsChange,
  onSidebarChange
}: Props) {
  const copy = introCopy[lang]
  return (
    <div className="min-w-0 space-y-4">
      <IntroChoices
        animate={reveal}
        delay={0.14}
        name="intro-language"
        number="01"
        label={copy.language}
        value={lang}
        options={introLanguages}
        onChange={onLanguageChange}
      />
      <IntroChoices
        animate={reveal}
        delay={0.2}
        name="intro-theme"
        number="02"
        label={copy.theme}
        value={theme}
        options={[
          { value: 'system', label: copy.system },
          { value: 'light', label: copy.light },
          { value: 'dark', label: copy.dark }
        ]}
        onChange={onThemeChange}
      />
      <IntroChoices
        animate={reveal}
        delay={0.26}
        name="intro-effects"
        number="03"
        label={copy.animations}
        value={effectsEnabled ? 'enabled' : 'disabled'}
        options={[
          { value: 'enabled', label: copy.enabled },
          { value: 'disabled', label: copy.disabled }
        ]}
        onChange={value => onEffectsChange(value === 'enabled')}
      />
      <IntroChoices
        animate={reveal}
        delay={0.32}
        className="hidden lg:block"
        name="intro-layout"
        number="04"
        label={copy.layout}
        detail={copy.desktop}
        value={sidebarMode}
        options={[
          { value: 'expanded', label: copy.expanded },
          { value: 'collapsed', label: copy.collapsed }
        ]}
        onChange={onSidebarChange}
      />
    </div>
  )
}
