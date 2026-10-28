import { type RefObject, useEffect, useEffectEvent } from 'react'

type Options = {
  enabled: boolean
  rootRef?: RefObject<HTMLElement | null>
  activeIndexRef: RefObject<number>
  slideRefs: RefObject<Array<HTMLDivElement | null>>
  navigateTo: (index: number) => void
}

const BURST_IDLE_MS = 240
const NAVIGATION_COOLDOWN_MS = 650
const NAVIGATION_THRESHOLD = 52

/** One deliberate wheel gesture selects one project; touch keeps native snap. */
export function useGalleryWheel({
  enabled,
  rootRef,
  activeIndexRef,
  slideRefs,
  navigateTo
}: Options) {
  const navigate = useEffectEvent(navigateTo)

  useEffect(() => {
    const root = rootRef?.current
    if (!enabled || !root) return

    const precisePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    )
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    let accumulatedDelta = 0
    let burstConsumed = false
    let cooldownUntil = 0
    let readingContent = false
    let attached = false

    const resetBurst = () => {
      accumulatedDelta = 0
      burstConsumed = false
      readingContent = false
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.defaultPrevented) return
      const scale =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? root.clientHeight
            : 1
      const deltaX = event.deltaX * scale
      const deltaY = event.deltaY * scale
      const horizontal = Math.abs(deltaX) > Math.abs(deltaY)
      const delta = horizontal ? deltaX : deltaY
      if (!delta) return

      clearTimeout(idleTimer)
      idleTimer = setTimeout(resetBurst, BURST_IDLE_MS)

      // Consume momentum before looking at the newly selected card's content.
      if (burstConsumed || performance.now() < cooldownUntil) {
        event.preventDefault()
        return
      }

      const slide = slideRefs.current[activeIndexRef.current]
      const overContent =
        event.target instanceof Node && slide?.contains(event.target)
      if (!horizontal && slide && overContent) {
        const remaining =
          slide.scrollHeight - slide.clientHeight - slide.scrollTop
        const canRead = delta > 0 ? remaining > 1 : slide.scrollTop > 1
        if (canRead) {
          // Keep native vertical scrolling, including trackpad inertia. Once this
          // gesture reaches the edge, a fresh burst is needed to change projects.
          readingContent = true
          accumulatedDelta = 0
          return
        }
      }

      // Prevent native horizontal wheel scrolling from also moving the snap strip,
      // and contain wheel gestures at the gallery's first and last project.
      event.preventDefault()
      if (readingContent) return
      if (Math.sign(delta) !== Math.sign(accumulatedDelta)) accumulatedDelta = 0
      accumulatedDelta += delta
      if (Math.abs(accumulatedDelta) < NAVIGATION_THRESHOLD) return

      burstConsumed = true
      cooldownUntil = performance.now() + NAVIGATION_COOLDOWN_MS
      navigate(activeIndexRef.current + Math.sign(accumulatedDelta))
    }

    const syncListener = () => {
      if (precisePointer.matches && !attached) {
        root.addEventListener('wheel', handleWheel, { passive: false })
        attached = true
      } else if (!precisePointer.matches && attached) {
        root.removeEventListener('wheel', handleWheel)
        attached = false
        clearTimeout(idleTimer)
        resetBurst()
      }
    }

    syncListener()
    precisePointer.addEventListener('change', syncListener)
    return () => {
      root.removeEventListener('wheel', handleWheel)
      precisePointer.removeEventListener('change', syncListener)
      clearTimeout(idleTimer)
    }
  }, [activeIndexRef, enabled, rootRef, slideRefs])
}
