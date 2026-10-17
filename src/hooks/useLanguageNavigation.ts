import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { LANGUAGE_CHOICE_KEY } from '@/app/constants'
import type { Lang } from '@/app/types'
import { getLanguagePath, getPreferredLang } from '@/lib/language'
import { getLocalizedPathname } from '@/lib/projectPaths'

const useLanguageNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      let savedChoice: string | null = null
      let legacyLang: string | null = null
      try {
        savedChoice = localStorage.getItem(LANGUAGE_CHOICE_KEY)
        legacyLang = localStorage.getItem('lang')
      } catch {
        // Browser storage can be unavailable in private or restricted contexts.
      }

      const browserLanguages = navigator.languages?.length
        ? navigator.languages
        : [navigator.language]

      const preferredLang = getPreferredLang(
        savedChoice,
        browserLanguages,
        legacyLang
      )

      router.replace(
        `${getLanguagePath(preferredLang)}${window.location.search}${window.location.hash}`
      )
    }
  }, [pathname, router])

  const setLang = useCallback(
    (nextLang: Lang) => {
      try {
        localStorage.setItem(LANGUAGE_CHOICE_KEY, nextLang)
      } catch {
        // Navigation still works when browser storage is unavailable.
      }

      router.push(
        `${getLocalizedPathname(pathname, nextLang)}${window.location.search}${window.location.hash}`
      )
    },
    [pathname, router]
  )

  return setLang
}

export default useLanguageNavigation
