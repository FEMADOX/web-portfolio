'use client'

import {
  createContext,
  use,
  useEffect,
  useMemo,
  useSyncExternalStore
} from 'react'
import type { ChildrenProps } from '@/app/types'
import { SIDEBAR_STORAGE_KEY, type SidebarMode } from '@/lib/sidebarPreference'

const CHANGE_EVENT = 'portfolio-sidebar-change'

const readStoredMode = (): SidebarMode => {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'collapsed'
      ? 'collapsed'
      : 'expanded'
  } catch {
    return 'expanded'
  }
}

const getMode = (): SidebarMode =>
  document.documentElement.dataset.sidebarState === 'collapsed'
    ? 'collapsed'
    : 'expanded'

const getServerMode = (): SidebarMode => 'expanded'

const updateMode = (mode: SidebarMode) => {
  document.documentElement.dataset.sidebarState = mode
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

const subscribe = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === SIDEBAR_STORAGE_KEY || event.key === null) {
      updateMode(readStoredMode())
    }
  }
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onStorage)
  }
}

const setSidebarMode = (mode: SidebarMode) => {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, mode)
  } catch {
    // The layout control still works when storage is unavailable.
  }
  updateMode(mode)
}

const toggleSidebar = () =>
  setSidebarMode(getMode() === 'expanded' ? 'collapsed' : 'expanded')

const SidebarPreferencesContext = createContext<{
  mode: SidebarMode
  toggleSidebar: () => void
  setSidebarMode: (mode: SidebarMode) => void
} | null>(null)

export function SidebarPreferencesProvider({ children }: ChildrenProps) {
  const mode = useSyncExternalStore(subscribe, getMode, getServerMode)

  useEffect(() => {
    if (!document.documentElement.dataset.sidebarState) {
      updateMode(readStoredMode())
    }
  }, [])

  const value = useMemo(() => ({ mode, toggleSidebar, setSidebarMode }), [mode])

  return (
    <SidebarPreferencesContext value={value}>
      {children}
    </SidebarPreferencesContext>
  )
}

export function useSidebarPreferences() {
  const value = use(SidebarPreferencesContext)
  if (value === null) {
    throw new Error('useSidebarPreferences requires SidebarPreferencesProvider')
  }
  return value
}
