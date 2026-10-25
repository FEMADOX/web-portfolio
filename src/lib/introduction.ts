import { SUPPORTED_LANGUAGES } from '@/app/constants'
import { isLang } from './language'

export const INTRODUCTION_STORAGE_KEY = 'portfolio-introduction-v1'

// Keep direct project links and chapter/section bookmarks immediately usable.
export function isIntroductionRoute(pathname: string, hash: string) {
  const segments = pathname.split('/').filter(Boolean)
  return !hash && (segments.length === 0 || (segments.length === 1 && isLang(segments[0])))
}

// A presentation choice is known before the first body paint, without cookies
// or request-time rendering. The real introduction is already in the HTML.
export const introductionPreferenceScript = `(()=>{const parts=location.pathname.split('/').filter(Boolean);if(location.hash||!(parts.length===0||(parts.length===1&&${JSON.stringify(SUPPORTED_LANGUAGES)}.includes(parts[0]))))return;let seen=false,paused=false;try{seen=localStorage.getItem('${INTRODUCTION_STORAGE_KEY}')==='seen';paused=localStorage.getItem('portfolio-visual-effects-v1')==='off'}catch{}try{seen=seen||sessionStorage.getItem('${INTRODUCTION_STORAGE_KEY}')==='seen'}catch{}if(!seen){const root=document.documentElement;root.dataset.introduction='pending';root.dataset.introductionScene=paused||window.matchMedia('(prefers-reduced-motion: reduce)').matches?'settings':'identity'}})()`

// Used only in browser effects/events, never as shared server-rendering state.
let completedInMemory = false

export function hasCompletedIntroduction() {
  if (completedInMemory) return true
  try {
    if (localStorage.getItem(INTRODUCTION_STORAGE_KEY) === 'seen') return true
  } catch {
    // Session storage can still work when persistent storage is blocked.
  }
  try {
    return sessionStorage.getItem(INTRODUCTION_STORAGE_KEY) === 'seen'
  } catch {
    return false
  }
}

export function completeIntroduction() {
  completedInMemory = true
  try {
    localStorage.setItem(INTRODUCTION_STORAGE_KEY, 'seen')
  } catch {
    // Keep the current visit usable even without persistent storage.
  }
  try {
    sessionStorage.setItem(INTRODUCTION_STORAGE_KEY, 'seen')
  } catch {
    // The in-memory flag still survives client navigation.
  }
}
