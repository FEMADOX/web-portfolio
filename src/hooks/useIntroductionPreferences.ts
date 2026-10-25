'use client'

import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LANGUAGE_CHOICE_KEY } from '@/app/constants'
import type { Lang } from '@/app/types'
import {
  applyIntroductionTheme,
  readInitialPreferences,
  validTheme
} from '@/components/intro/preferences'
import type { IntroductionPreferences } from '@/components/intro/types'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import { useSidebarPreferences } from '@/contexts/SidebarPreferencesContext'

export default function useIntroductionPreferences(
  lang: Lang,
  active: boolean
) {
  const { theme, setTheme } = useTheme()
  const {
    effectsEnabled,
    reducedMotion,
    motionEnabled,
    setEffectsEnabled,
    setEffectsPreview
  } = useMotionPreferences()
  const { mode, setSidebarMode } = useSidebarPreferences()
  const currentPreferences = useRef({
    theme: validTheme(theme),
    effectsEnabled,
    mode
  })
  const initial = useRef<IntroductionPreferences | null>(null)
  const touched = useRef({
    lang: false,
    theme: false,
    effectsEnabled: false,
    mode: false
  })
  const [ready, setReady] = useState(false)
  // These defaults must match the server HTML, before browser preferences load.
  const [selected, setSelected] = useState<IntroductionPreferences>({
    lang,
    theme: 'system',
    effectsEnabled: true,
    mode: 'expanded'
  })

  useEffect(() => {
    currentPreferences.current = {
      theme: validTheme(theme),
      effectsEnabled,
      mode
    }
  }, [theme, effectsEnabled, mode])

  const getInitialPreferences = useCallback(() => {
    initial.current ??= readInitialPreferences(lang, currentPreferences.current)
    return initial.current
  }, [lang])

  const initialize = useCallback(() => {
    const original = getInitialPreferences()
    // An effect replay must not erase choices the visitor has already made.
    setSelected(previous => ({
      lang: touched.current.lang ? previous.lang : original.lang,
      theme: touched.current.theme ? previous.theme : original.theme,
      effectsEnabled: touched.current.effectsEnabled
        ? previous.effectsEnabled
        : original.effectsEnabled,
      mode: touched.current.mode ? previous.mode : original.mode
    }))
    setReady(true)
    return original
  }, [getInitialPreferences])

  const live = active && ready
  useEffect(() => {
    if (!live) return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const previewTheme = () =>
      applyIntroductionTheme(selected.theme, query.matches)
    previewTheme()
    query.addEventListener('change', previewTheme)
    return () => query.removeEventListener('change', previewTheme)
  }, [live, selected.theme])

  const change = <K extends keyof IntroductionPreferences>(
    key: K,
    value: IntroductionPreferences[K]
  ) => {
    touched.current[key] = true
    setSelected(previous => ({ ...previous, [key]: value }))
  }

  const resolve = (save: boolean): IntroductionPreferences => {
    const original = getInitialPreferences()
    if (!save) return original
    return {
      lang: touched.current.lang ? selected.lang : original.lang,
      theme: touched.current.theme ? selected.theme : original.theme,
      effectsEnabled: touched.current.effectsEnabled
        ? selected.effectsEnabled
        : original.effectsEnabled,
      mode: touched.current.mode ? selected.mode : original.mode
    }
  }

  const commit = (choice: IntroductionPreferences, save: boolean) => {
    if (save) {
      setEffectsEnabled(choice.effectsEnabled)
      if (window.matchMedia('(min-width: 1024px)').matches)
        setSidebarMode(choice.mode)
      try {
        localStorage.setItem(LANGUAGE_CHOICE_KEY, choice.lang)
      } catch {
        /* Storage is optional. */
      }
    }
    setTheme(choice.theme)
    applyIntroductionTheme(
      choice.theme,
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  }

  return {
    selected,
    live,
    reducedMotion,
    motionEnabled,
    initialize,
    resolve,
    commit,
    setEffectsPreview,
    onLanguageChange: (value: Lang) => change('lang', value),
    onThemeChange: (value: IntroductionPreferences['theme']) =>
      change('theme', value),
    onEffectsChange: (enabled: boolean) => {
      change('effectsEnabled', enabled)
      setEffectsPreview(enabled)
    },
    onSidebarChange: (value: IntroductionPreferences['mode']) =>
      change('mode', value)
  }
}
