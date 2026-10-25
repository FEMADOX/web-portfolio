'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type {
  IntroductionPreferences,
  IntroductionScene
} from '@/components/intro/types'
import {
  type IntroductionReplayRequest,
  useIntroductionStage
} from '@/contexts/IntroductionContext'
import useIntroductionScroll from './useIntroductionScroll'

interface Options {
  active: boolean
  replay: IntroductionReplayRequest | null
  initializePreferences: () => IntroductionPreferences
  setEffectsPreview: (enabled: boolean | null) => void
}

export default function useIntroductionDialog({
  active,
  replay,
  initializePreferences,
  setEffectsPreview
}: Options) {
  const { stage, setStage, setCursorTarget } = useIntroductionStage()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const completed = useRef(false)
  const requestedScene = useRef<IntroductionScene | null>(null)
  const [entrances, setEntrances] = useState({ identity: 0, settings: 0 })

  const changeScene = useCallback(
    (next: IntroductionScene) => {
      if (next === stage) return
      requestedScene.current = next
      setEntrances(previous => ({ ...previous, [next]: previous[next] + 1 }))
      document.documentElement.dataset.introductionScene = next
      const dialog = dialogRef.current
      if (dialog) {
        dialog.scrollTop = 0
        // Either scene change can remove the currently focused control.
        if (dialog.contains(document.activeElement))
          dialog.focus({ preventScroll: true })
      }
      setStage(next)
    },
    [setStage, stage]
  )
  const advance = useCallback(() => changeScene('settings'), [changeScene])
  const retreat = useCallback(() => changeScene('identity'), [changeScene])
  useIntroductionScroll(dialogRef, active ? stage : 'closed', advance, retreat)

  useEffect(() => {
    if (!active) return
    const dialog = dialogRef.current
    if (!dialog) return
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const originalDark = root.classList.contains('dark')
    const originalColorScheme = root.style.colorScheme
    // Upgrade the server-rendered nonmodal dialog without replacing its HTML.
    root.dataset.introduction = 'open'
    dialog.close()
    dialog.showModal()
    setCursorTarget(dialog)
    dialog.focus({ preventScroll: true })
    root.style.overflow = 'hidden'
    const original = initializePreferences()
    const firstScene =
      requestedScene.current ??
      (replay ||
      (original.effectsEnabled &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        ? 'identity'
        : 'settings')
    root.dataset.introductionScene = firstScene
    setStage(firstScene)

    return () => {
      setCursorTarget(null)
      dialog.close()
      root.style.overflow = previousOverflow
      delete root.dataset.introduction
      delete root.dataset.introductionScene
      if (!completed.current) {
        root.classList.toggle('dark', originalDark)
        root.style.colorScheme = originalColorScheme
      }
      setEffectsPreview(null)
      setStage('closed')
      if (
        replay &&
        !completed.current &&
        window.location.pathname === replay.pathname
      ) {
        window.scrollTo({
          left: replay.scrollX,
          top: replay.scrollY,
          behavior: 'instant'
        })
        if (replay.trigger.isConnected)
          replay.trigger.focus({ preventScroll: true })
      }
    }
  }, [
    active,
    replay,
    initializePreferences,
    setStage,
    setEffectsPreview,
    setCursorTarget
  ])

  const selectScene = (scene: IntroductionScene) => {
    changeScene(scene)
    requestAnimationFrame(() => {
      const title =
        scene === 'settings'
          ? '#portfolio-intro-settings-title'
          : '#portfolio-intro-title'
      dialogRef.current
        ?.querySelector<HTMLElement>(title)
        ?.focus({ preventScroll: true })
    })
  }

  const close = () => {
    setEffectsPreview(null)
    setStage('closed')
    setCursorTarget(null)
    dialogRef.current?.close()
  }

  return {
    dialogRef,
    completed,
    stage,
    scene: stage === 'settings' ? 'settings' : 'identity',
    entrances,
    close,
    configure: () => selectScene('settings'),
    back: () => selectScene('identity')
  } as const
}
