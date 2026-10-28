import { useRouter } from 'next/navigation'
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useTransition
} from 'react'
import type { ProjectSlug } from '@/data/projects/types'
import { loadGalleryDialog } from '../components/projects/gallery/galleryDialogLoader'
import {
  getGalleryUrl,
  replaceGalleryProject,
  useGalleryLocation
} from './useGalleryLocation'

export function useGalleryCollection(slugs: readonly ProjectSlug[]) {
  const router = useRouter()
  const [navigating, startNavigation] = useTransition()
  const requestedSlug = useGalleryLocation()
  const availableSlugs: readonly string[] = slugs
  const activeIndex = availableSlugs.indexOf(requestedSlug ?? '')
  const requested = activeIndex >= 0
  const [pending, setPending] = useState(false)
  const [listHeight, setListHeight] = useState(0)
  const request = useRef(0)
  const listRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const visibleCount = Math.min(3, slugs.length)
  const additionalCount = slugs.length - visibleCount
  const galleryOpen = requested
  const closeGallery = useCallback(() => {
    startNavigation(() =>
      router.replace(getGalleryUrl(null), { scroll: false })
    )
  }, [router])

  const openGallery = async () => {
    if (pending || navigating || galleryOpen) return
    const slug = slugs[visibleCount] ?? slugs[0]
    if (!slug) return
    const token = ++request.current
    const pathname = window.location.pathname
    setPending(true)
    try {
      await loadGalleryDialog()
      const list = listRef.current
      if (
        token !== request.current ||
        pathname !== window.location.pathname ||
        !list
      )
        return
      const height = list.getBoundingClientRect().height
      setListHeight(height)
      document.documentElement.style.setProperty(
        '--project-gallery-list-height',
        `${height}px`
      )
      startNavigation(() =>
        router.replace(getGalleryUrl(slug), { scroll: false })
      )
    } catch {
      // Keep the list visible and allow a failed lazy import to be retried.
    } finally {
      setPending(false)
    }
  }

  const selectProject = useCallback(
    (index: number) => {
      const slug = slugs[index]
      if (slug) replaceGalleryProject(slug)
    },
    [slugs]
  )

  useLayoutEffect(() => {
    setPending(false)
    return () => {
      request.current += 1
    }
  }, [])

  return {
    galleryOpen,
    pending: pending || navigating,
    listHeight: listHeight || 'var(--project-gallery-list-height, 0px)',
    listRef,
    triggerRef,
    visibleCount,
    additionalCount,
    activeIndex,
    selectProject,
    openGallery,
    closeGallery
  }
}
