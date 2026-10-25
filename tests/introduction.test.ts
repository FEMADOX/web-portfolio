import { describe, expect, test } from 'bun:test'
import { runInNewContext } from 'node:vm'
import {
  INTRODUCTION_STORAGE_KEY,
  introductionPreferenceScript,
  isIntroductionRoute
} from '../src/lib/introduction'

interface PreferenceScriptOptions {
  pathname: string
  hash?: string
  local?: Record<string, string>
  session?: Record<string, string>
  denyLocalStorage?: boolean
  denySessionStorage?: boolean
  reducedMotion?: boolean
}

function runPreferenceScript(options: PreferenceScriptOptions) {
  const dataset: Record<string, string> = {}
  const storage = (values: Record<string, string>, denied = false) => ({
    getItem(key: string) {
      if (denied) throw new Error('Storage access denied')
      return values[key] ?? null
    }
  })

  runInNewContext(introductionPreferenceScript, {
    location: { pathname: options.pathname, hash: options.hash ?? '' },
    localStorage: storage(options.local ?? {}, options.denyLocalStorage),
    sessionStorage: storage(options.session ?? {}, options.denySessionStorage),
    document: { documentElement: { dataset } },
    window: {
      matchMedia(query: string) {
        expect(query).toBe('(prefers-reduced-motion: reduce)')
        return { matches: options.reducedMotion ?? false }
      }
    }
  })

  return dataset
}

describe('first-visit presentation eligibility', () => {
  test('offers the presentation on root and localized home pages', () => {
    expect(isIntroductionRoute('/', '')).toBe(true)
    for (const lang of ['en', 'es', 'pt']) {
      expect(isIntroductionRoute(`/${lang}`, '')).toBe(true)
      expect(isIntroductionRoute(`/${lang}/`, '')).toBe(true)
    }
  })

  test('keeps direct case studies, sections and chapter bookmarks accessible', () => {
    for (const path of [
      '/en/projects/dulces-flares',
      '/pt/projects/fastapi-ecosystem-lab',
      '/es/projects/missing'
    ]) {
      expect(isIntroductionRoute(path, '')).toBe(false)
      expect(isIntroductionRoute(path, '#architecture')).toBe(false)
    }
    expect(isIntroductionRoute('/en', '#projects')).toBe(false)
    expect(isIntroductionRoute('/es', '#contact')).toBe(false)
  })

  test('lets the entry route resolve the language and excludes invalid routes', () => {
    for (const path of ['/fr', '/en/missing', '/api/cv/es', '/english']) {
      expect(isIntroductionRoute(path, '')).toBe(false)
    }
  })
})

describe('first-paint presentation preference', () => {
  test('starts unseen root and localized home pages in the identity scene', () => {
    for (const pathname of ['/', '/en', '/es', '/pt']) {
      expect(runPreferenceScript({ pathname })).toEqual({
        introduction: 'pending',
        introductionScene: 'identity'
      })
    }
  })

  test('skips the presentation when either storage marks it as seen', () => {
    for (const options of [
      { local: { [INTRODUCTION_STORAGE_KEY]: 'seen' } },
      { session: { [INTRODUCTION_STORAGE_KEY]: 'seen' } }
    ]) {
      expect(runPreferenceScript({ pathname: '/en', ...options })).toEqual({})
    }
  })

  test('skips deep links, project routes, not-found routes and hash bookmarks', () => {
    for (const pathname of [
      '/en/projects/dulces-flares',
      '/pt/projects/fastapi-ecosystem-lab',
      '/es/projects/missing',
      '/en/missing',
      '/fr',
      '/api/cv/es'
    ]) {
      expect(runPreferenceScript({ pathname })).toEqual({})
    }

    expect(runPreferenceScript({ pathname: '/', hash: '#projects' })).toEqual(
      {}
    )
    expect(runPreferenceScript({ pathname: '/es', hash: '#contact' })).toEqual(
      {}
    )
  })

  test('starts in settings when visual effects are off or reduced motion is preferred', () => {
    const disabledEffects = runPreferenceScript({
      pathname: '/en',
      local: { 'portfolio-visual-effects-v1': 'off' }
    })
    const reducedMotion = runPreferenceScript({
      pathname: '/pt',
      reducedMotion: true
    })

    expect(disabledEffects.introductionScene).toBe('settings')
    expect(reducedMotion.introductionScene).toBe('settings')
  })

  test('remains safe and presents the identity scene when storage is denied', () => {
    expect(
      runPreferenceScript({
        pathname: '/',
        denyLocalStorage: true,
        denySessionStorage: true
      })
    ).toEqual({ introduction: 'pending', introductionScene: 'identity' })
  })
})
