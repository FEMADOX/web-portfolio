'use client'

import { useEffect } from 'react'
import { LANGUAGE_CONFIG } from '@/app/constants'
import useIntroductionCompletion from '@/hooks/useIntroductionCompletion'
import useIntroductionDialog from '@/hooks/useIntroductionDialog'
import useIntroductionPreferences from '@/hooks/useIntroductionPreferences'
import { introCopy } from './copy'
import IntroductionContent from './IntroductionContent'
import type { IntroductionExperienceProps } from './types'

export default function IntroductionExperience({
  lang,
  active,
  replay,
  onComplete,
  onHydrated
}: IntroductionExperienceProps) {
  useEffect(() => {
    onHydrated()
  }, [onHydrated])

  const preferences = useIntroductionPreferences(lang, active)
  const dialog = useIntroductionDialog({
    active,
    replay,
    initializePreferences: preferences.initialize,
    setEffectsPreview: preferences.setEffectsPreview
  })
  const finish = useIntroductionCompletion({
    lang,
    replay,
    onComplete,
    completed: dialog.completed,
    resolvePreferences: preferences.resolve,
    commitPreferences: preferences.commit,
    closeDialog: dialog.close
  })
  const { selected, live } = preferences
  const copy = introCopy[selected.lang]
  const titleId =
    dialog.scene === 'settings'
      ? 'portfolio-intro-settings-title'
      : 'portfolio-intro-title'

  return (
    <dialog
      ref={dialog.dialogRef}
      open
      data-portfolio-introduction
      data-scene={dialog.scene}
      lang={LANGUAGE_CONFIG[selected.lang].documentLang}
      aria-label={live ? undefined : copy.dialogLabel}
      aria-labelledby={live ? titleId : undefined}
      aria-describedby="portfolio-intro-announcement"
      tabIndex={-1}
      onCancel={event => {
        event.preventDefault()
        finish(false)
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-x-hidden overflow-y-auto overscroll-contain border-0 bg-transparent p-0 text-foreground outline-none data-[scene=identity]:[touch-action:pan-x_pinch-zoom] backdrop:bg-transparent"
    >
      <p id="portfolio-intro-announcement" role="status" className="sr-only">
        {dialog.stage === 'settings' ? copy.settingsTitle : ''}
      </p>
      <IntroductionContent
        live={live}
        entrances={dialog.entrances}
        scene={dialog.scene}
        lang={selected.lang}
        theme={selected.theme}
        sidebarMode={selected.mode}
        effectsEnabled={selected.effectsEnabled}
        reducedMotion={preferences.reducedMotion}
        animate={live && preferences.motionEnabled}
        onConfigure={dialog.configure}
        onSkip={() => finish(false)}
        onEnter={() => finish(true)}
        onLanguageChange={preferences.onLanguageChange}
        onThemeChange={preferences.onThemeChange}
        onEffectsChange={preferences.onEffectsChange}
        onSidebarChange={preferences.onSidebarChange}
        onBack={dialog.back}
      />
    </dialog>
  )
}
