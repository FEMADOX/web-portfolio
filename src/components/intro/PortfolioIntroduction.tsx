'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import type { Lang } from '@/app/types'
import { useIntroductionStage } from '@/contexts/IntroductionContext'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import {
  hasCompletedIntroduction,
  isIntroductionRoute
} from '@/lib/introduction'

let activateIntroduction = () => {}
const introductionActivation = new Promise<void>(resolve => {
  activateIntroduction = resolve
})

const IntroductionExperience = dynamic(async () => {
  // Keep the real server-rendered introduction, but only hydrate it for a
  // browser visit that actually needs it. The promise is stable across retries.
  if (typeof window !== 'undefined') await introductionActivation
  return import('./IntroductionExperience')
})

export default function PortfolioIntroduction({ lang }: { lang: Lang }) {
  const pathname = usePathname()
  const { ready } = useMotionPreferences()
  const { replayRequest, clearReplay } = useIntroductionStage()
  const replaying = replayRequest?.pathname === pathname
  const readyRef = useRef(ready)
  const hydrated = useRef(false)
  // Undefined is the server-rendered introduction awaiting the browser choice.
  const [entryPath, setEntryPath] = useState<string | null | undefined>(
    undefined
  )
  const dismiss = useCallback(() => {
    hydrated.current = false
    delete document.documentElement.dataset.introduction
    delete document.documentElement.dataset.introductionScene
    setEntryPath(null)
    clearReplay()
  }, [clearReplay])

  const onHydrated = useCallback(() => {
    hydrated.current = true
    if (
      window.location.pathname !== pathname ||
      (!replaying &&
        (!isIntroductionRoute(pathname, window.location.hash) ||
          hasCompletedIntroduction()))
    ) {
      dismiss()
      return
    }
    if (readyRef.current) setEntryPath(pathname)
  }, [pathname, replaying, dismiss])

  useEffect(() => {
    readyRef.current = ready
    const updateEligibility = () => {
      if (
        window.location.pathname !== pathname ||
        (!replaying &&
          (!isIntroductionRoute(pathname, window.location.hash) ||
            hasCompletedIntroduction()))
      ) {
        dismiss()
        return
      }
      if (!ready) return
      // A removed bookmark can make a previously dismissed visit eligible.
      // Keep active=false until the lazy child has committed its matching HTML.
      setEntryPath(previous => (previous === pathname ? previous : undefined))
      activateIntroduction()
      if (hydrated.current) onHydrated()
    }
    updateEligibility()
    window.addEventListener('hashchange', updateEligibility)
    return () => window.removeEventListener('hashchange', updateEligibility)
  }, [pathname, ready, replaying, dismiss, onHydrated])

  // Readiness updates must not update the still-dehydrated boundary's props.
  const experience = useMemo(
    () => (
      <Suspense fallback={null}>
        <IntroductionExperience
          lang={lang}
          active={entryPath === pathname}
          replay={replaying ? replayRequest : null}
          onComplete={dismiss}
          onHydrated={onHydrated}
        />
      </Suspense>
    ),
    [lang, entryPath, pathname, replaying, replayRequest, dismiss, onHydrated]
  )

  if (
    (!replaying && !isIntroductionRoute(pathname, '')) ||
    entryPath === null ||
    (entryPath !== undefined && entryPath !== pathname)
  )
    return null
  return experience
}
