import * as motion from 'motion/react-m'
import { introCopy } from '../copy'
import IntroActionButton from '../IntroActionButton'
import IntroPreview from '../IntroPreview'
import { introEntrance } from '../introMotion'
import type { IntroScenesProps } from '../types'
import IntroPreferenceFields from './IntroPreferenceFields'

type Props = Omit<IntroScenesProps, 'scene' | 'reducedMotion' | 'onConfigure'>

export default function SettingsScene({
  titleId = 'portfolio-intro-title',
  lang,
  theme,
  sidebarMode,
  effectsEnabled,
  animate: reveal,
  onBack,
  onEnter,
  onSkip,
  onLanguageChange,
  onThemeChange,
  onEffectsChange,
  onSidebarChange
}: Props) {
  const copy = introCopy[lang]
  return (
    <main
      key="settings"
      className="mx-auto grid w-full max-w-400 flex-1 content-start gap-6 px-4 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(230px,0.72fr)_minmax(0,1.65fr)] lg:gap-7 lg:px-12"
    >
      <motion.aside
        {...introEntrance(reveal, 0, 'frame')}
        className="self-start border-2 border-foreground bg-card p-4 shadow-[4px_4px_0_var(--foreground)] sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-2 border-b-2 border-foreground pb-3 font-mono text-[10px] font-bold uppercase">
          <span>01 · {copy.identity}</span>
          <button
            type="button"
            onClick={onBack}
            className="-my-3 min-h-11 px-2 underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-ring"
          >
            ← {copy.back}
          </button>
        </div>
        <p className="max-w-80 text-[clamp(1.4rem,2.4vw,2.75rem)] font-black uppercase leading-none tracking-tighter">
          Giancarlos
          <br className="hidden lg:block" /> González
        </p>
        <div className="mt-3 h-1 w-1/2 bg-accent" />
        <p className="mt-4 inline-block bg-foreground px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-background">
          {copy.role}
        </p>
        <p className="mt-4 hidden border-l-2 border-foreground pl-2 text-sm leading-relaxed lg:block">
          {copy.statement}
        </p>
        <p className="mt-4 font-mono text-[10px] tracking-wide text-muted-foreground lg:mt-6">
          Python · React · Next.js
        </p>
      </motion.aside>

      <div className="min-w-0">
        <p className="mb-3 font-mono text-[10px] text-muted-foreground">
          <span aria-hidden="true">↑ </span>
          {copy.scrollToIdentity}
        </p>
        <motion.section
          {...introEntrance(reveal, 0.04, 'frame')}
          className="border-2 border-foreground bg-background p-4 shadow-[4px_4px_0_var(--foreground)] sm:p-6"
        >
          <div className="mb-5 border-b-2 border-foreground pb-4">
            <p className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold tracking-wide">
              <span aria-hidden="true" className="size-1.5 bg-secondary" />
              02 · {copy.settings}
            </p>
            <motion.h1
              {...introEntrance(reveal, 0.1)}
              id={titleId}
              tabIndex={-1}
              className="text-2xl font-black uppercase leading-none tracking-tighter outline-none sm:text-3xl xl:text-4xl"
            >
              {copy.settingsTitle}
            </motion.h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {copy.settingsDescription}
            </p>
          </div>
          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <IntroPreferenceFields
              lang={lang}
              theme={theme}
              sidebarMode={sidebarMode}
              effectsEnabled={effectsEnabled}
              animate={reveal}
              onLanguageChange={onLanguageChange}
              onThemeChange={onThemeChange}
              onEffectsChange={onEffectsChange}
              onSidebarChange={onSidebarChange}
            />
            <IntroPreview
              animate={reveal}
              lang={lang}
              theme={theme}
              sidebarMode={sidebarMode}
              effectsEnabled={effectsEnabled}
            />
          </div>
        </motion.section>
        <motion.div
          {...introEntrance(reveal, 0.2)}
          className="mt-6 flex flex-wrap items-center gap-4"
        >
          <IntroActionButton
            onClick={onEnter}
            className="w-full sm:w-auto sm:min-w-70"
          >
            {copy.enter}
            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </IntroActionButton>
          <button
            type="button"
            onClick={onSkip}
            className="min-h-11 px-2 font-mono text-xs font-bold uppercase underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring"
          >
            {copy.skip}
          </button>
          <p className="text-center font-mono text-[10px] text-muted-foreground">
            {copy.changeLater}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
