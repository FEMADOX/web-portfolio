import { useEffect, useRef, useState } from 'react'

const useNearViewport = (rootMargin = '400px 0px', forceLoad = false) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (forceLoad) {
      setShouldLoad(true)
      return
    }
    const element = ref.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers that don't support IntersectionObserver
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold: 0
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [forceLoad, rootMargin])

  return { ref, shouldLoad: shouldLoad || forceLoad }
}

export default useNearViewport
