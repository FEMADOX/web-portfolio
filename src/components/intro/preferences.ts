import { LANGUAGE_CHOICE_KEY } from '@/app/constants'
import type { Lang } from '@/app/types'
import { getPreferredLang } from '@/lib/language'
import type { IntroductionPreferences, IntroTheme } from './types'

export const validTheme = (theme: string | undefined): IntroTheme =>
  theme === 'light' || theme === 'dark' ? theme : 'system'

// Browser-only reads: call when the dialog opens, never during rendering.
export function readInitialPreferences(
  lang: Lang,
  fallback: Omit<IntroductionPreferences, 'lang'>
): IntroductionPreferences {
  let savedChoice: string | null = null
  let legacyLang: string | null = null
  let theme = fallback.theme
  let effectsEnabled = fallback.effectsEnabled
  try {
    savedChoice = localStorage.getItem(LANGUAGE_CHOICE_KEY)
    legacyLang = localStorage.getItem('lang')
    theme = validTheme(localStorage.getItem('theme') ?? fallback.theme)
    const effects = localStorage.getItem('portfolio-visual-effects-v1')
    if (effects === 'on' || effects === 'off') effectsEnabled = effects === 'on'
  } catch {
    /* Use live in-memory preferences when storage is unavailable. */
  }
  return {
    lang:
      window.location.pathname === '/'
        ? getPreferredLang(
            savedChoice,
            navigator.languages?.length
              ? navigator.languages
              : [navigator.language],
            legacyLang
          )
        : lang,
    theme,
    effectsEnabled,
    mode:
      document.documentElement.dataset.sidebarState === 'collapsed'
        ? 'collapsed'
        : document.documentElement.dataset.sidebarState === 'expanded'
          ? 'expanded'
          : fallback.mode
  }
}

export function applyIntroductionTheme(theme: IntroTheme, systemDark: boolean) {
  const dark = theme === 'dark' || (theme === 'system' && systemDark)
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}
