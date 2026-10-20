'use client'

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore
} from 'react'
import type { ChildrenProps } from '@/app/types'

const STORAGE_KEY = 'portfolio-visual-effects-v1'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches
const getServerReducedMotion = () => true

interface MotionPreferences {
  effectsEnabled: boolean
  reducedMotion: boolean
  motionEnabled: boolean
  canAnimate: boolean
  toggleEffects: () => void
}

const MotionPreferencesContext = createContext<MotionPreferences | null>(null)

export function MotionPreferencesProvider({ children }: ChildrenProps) {
  const [effectsEnabled, setEffectsEnabled] = useState(true)
  const [hydrated, setHydrated] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  )
  const motionEnabled = hydrated && effectsEnabled && !reducedMotion
  const canAnimate = motionEnabled && pageVisible

  useEffect(() => {
    try {
      setEffectsEnabled(localStorage.getItem(STORAGE_KEY) !== 'off')
    } catch {
      // The in-memory preference still works when browser storage is unavailable.
    }
    setHydrated(true)

    const updateVisibility = () => setPageVisible(!document.hidden)
    const updatePreference = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        setEffectsEnabled(event.newValue !== 'off')
      }
    }

    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    window.addEventListener('storage', updatePreference)
    return () => {
      document.removeEventListener('visibilitychange', updateVisibility)
      window.removeEventListener('storage', updatePreference)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.visualEffects = canAnimate
      ? 'enabled'
      : 'paused'
    return () => {
      delete document.documentElement.dataset.visualEffects
    }
  }, [canAnimate])

  const toggleEffects = useCallback(() => {
    const next = !effectsEnabled
    setEffectsEnabled(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
    } catch {
      // Storage is optional; do not block the control in private browsing.
    }
  }, [effectsEnabled])

  const value = useMemo(
    () => ({
      effectsEnabled,
      reducedMotion,
      motionEnabled,
      canAnimate,
      toggleEffects
    }),
    [effectsEnabled, reducedMotion, motionEnabled, canAnimate, toggleEffects]
  )

  return (
    <MotionPreferencesContext value={value}>
      {children}
    </MotionPreferencesContext>
  )
}

export function useMotionPreferences() {
  const value = use(MotionPreferencesContext)
  if (value === null) {
    throw new Error(
      'useMotionPreferences must be used within MotionPreferencesProvider'
    )
  }
  return value
}
