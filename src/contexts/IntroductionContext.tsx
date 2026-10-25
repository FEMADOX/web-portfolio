'use client'

import { createContext, use, useCallback, useMemo, useState } from 'react'
import type { ChildrenProps } from '@/app/types'

export type IntroductionStage = 'closed' | 'identity' | 'settings'

export interface IntroductionReplayRequest {
  pathname: string
  trigger: HTMLElement
  scrollX: number
  scrollY: number
}

const IntroductionContext = createContext<{
  stage: IntroductionStage
  setStage: (stage: IntroductionStage) => void
  cursorTarget: HTMLDialogElement | null
  setCursorTarget: (target: HTMLDialogElement | null) => void
  replayRequest: IntroductionReplayRequest | null
  replayIntroduction: (trigger: HTMLElement) => void
  clearReplay: () => void
} | null>(null)

export function IntroductionProvider({ children }: ChildrenProps) {
  const [stage, setStage] = useState<IntroductionStage>('closed')
  const [cursorTarget, setCursorTarget] = useState<HTMLDialogElement | null>(
    null
  )
  const [replayRequest, setReplayRequest] =
    useState<IntroductionReplayRequest | null>(null)
  const replayIntroduction = useCallback((trigger: HTMLElement) => {
    setReplayRequest({
      pathname: window.location.pathname,
      trigger,
      scrollX: window.scrollX,
      scrollY: window.scrollY
    })
  }, [])
  const clearReplay = useCallback(() => setReplayRequest(null), [])
  const value = useMemo(
    () => ({
      stage,
      setStage,
      cursorTarget,
      setCursorTarget,
      replayRequest,
      replayIntroduction,
      clearReplay
    }),
    [stage, cursorTarget, replayRequest, replayIntroduction, clearReplay]
  )
  return <IntroductionContext value={value}>{children}</IntroductionContext>
}

export function useIntroductionStage() {
  const value = use(IntroductionContext)
  if (!value) throw new Error('IntroductionProvider is required')
  return value
}
