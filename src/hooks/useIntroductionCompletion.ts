'use client'

import { useRouter } from 'next/navigation'
import type { RefObject } from 'react'
import type {
  IntroductionExperienceProps,
  IntroductionPreferences
} from '@/components/intro/types'
import { completeIntroduction } from '@/lib/introduction'
import { getLanguagePath } from '@/lib/language'
import { getLocalizedPathname } from '@/lib/projectPaths'

interface Options
  extends Pick<IntroductionExperienceProps, 'lang' | 'replay' | 'onComplete'> {
  completed: RefObject<boolean>
  resolvePreferences: (save: boolean) => IntroductionPreferences
  commitPreferences: (choice: IntroductionPreferences, save: boolean) => void
  closeDialog: () => void
}

export default function useIntroductionCompletion({
  lang,
  replay,
  onComplete,
  completed,
  resolvePreferences,
  commitPreferences,
  closeDialog
}: Options) {
  const router = useRouter()

  return (save: boolean) => {
    if (completed.current) return
    completed.current = true
    const choice = resolvePreferences(save)
    commitPreferences(choice, save)
    completeIntroduction()
    closeDialog()
    onComplete()
    if (replay) {
      requestAnimationFrame(() => {
        window.scrollTo({
          left: replay.scrollX,
          top: replay.scrollY,
          behavior: 'instant'
        })
        if (save && choice.lang !== lang) {
          router.replace(
            `${getLocalizedPathname(replay.pathname, choice.lang)}${window.location.search}${window.location.hash}`,
            { scroll: false }
          )
        } else {
          // Allow the restored content-visibility subtree to become focusable.
          requestAnimationFrame(() => {
            if (replay.trigger.isConnected)
              replay.trigger.focus({ preventScroll: true })
          })
        }
      })
      return
    }
    if (window.location.pathname !== getLanguagePath(choice.lang)) {
      router.replace(
        `${getLanguagePath(choice.lang)}${window.location.search}`,
        { scroll: false }
      )
    } else {
      requestAnimationFrame(() => {
        const main = document.querySelector<HTMLElement>('main')
        if (main) {
          if (!main.hasAttribute('tabindex')) main.tabIndex = -1
          main.focus({ preventScroll: true })
        }
      })
    }
  }
}
