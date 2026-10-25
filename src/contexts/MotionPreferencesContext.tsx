'use client'

import { domAnimation, LazyMotion } from 'motion/react'
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
  ready: boolean
  effectsEnabled: boolean
  reducedMotion: boolean
  motionEnabled: boolean
  canAnimate: boolean
  toggleEffects: () => void
  setEffectsEnabled: (enabled: boolean) => void
  setEffectsPreview: (enabled: boolean | null) => void
}

const MotionPreferencesContext = createContext<MotionPreferences | null>(null)

export function MotionPreferencesProvider({ children }: ChildrenProps) {
  const [effectsEnabled, updateEffectsEnabled] = useState(true)
  const [effectsPreview, setEffectsPreview] = useState<boolean | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  )
  const motionEnabled =
    hydrated && (effectsPreview ?? effectsEnabled) && !reducedMotion
  const canAnimate = motionEnabled && pageVisible

  useEffect(() => {
    try {
      updateEffectsEnabled(localStorage.getItem(STORAGE_KEY) !== 'off')
    } catch {
      // The in-memory preference still works when browser storage is unavailable.
    }
    setHydrated(true)

    const updateVisibility = () => setPageVisible(!document.hidden)
    const updatePreference = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        updateEffectsEnabled(event.newValue !== 'off')
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

  const setEffectsEnabled = useCallback((enabled: boolean) => {
    updateEffectsEnabled(enabled)
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')
    } catch {
      // Storage is optional; do not block the control in private browsing.
    }
  }, [])

  const toggleEffects = useCallback(
    () => setEffectsEnabled(!effectsEnabled),
    [effectsEnabled, setEffectsEnabled]
  )

  const value = useMemo(
    () => ({
      ready: hydrated,
      effectsEnabled,
      reducedMotion,
      motionEnabled,
      canAnimate,
      toggleEffects,
      setEffectsEnabled,
      setEffectsPreview
    }),
    [
      hydrated,
      effectsEnabled,
      reducedMotion,
      motionEnabled,
      canAnimate,
      toggleEffects,
      setEffectsEnabled
    ]
  )

  return (
    <MotionPreferencesContext value={value}>
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
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
