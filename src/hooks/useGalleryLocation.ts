import { useSearchParams } from 'next/navigation'
import type { ProjectSlug } from '@/data/projects/types'

const QUERY_KEY = 'gallery'

export const getGalleryUrl = (slug: ProjectSlug | null) => {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set(QUERY_KEY, slug)
  else url.searchParams.delete(QUERY_KEY)
  return `${url.pathname}${url.search}${url.hash}`
}

export const replaceGalleryProject = (slug: ProjectSlug | null) => {
  const url = getGalleryUrl(slug)
  if (url === `${location.pathname}${location.search}${location.hash}`) return

  // Update UI state without a route request or another history entry per slide.
  // Next copies its router state and synchronizes the canonical URL itself.
  window.history.replaceState(null, '', url)
}

export function useGalleryLocation() {
  return useSearchParams().get(QUERY_KEY)
}
