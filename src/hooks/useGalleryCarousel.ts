import {
  type KeyboardEvent,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import { useGalleryWheel } from './useGalleryWheel'

type Options = {
  count: number
  initialIndex?: number
  selectedIndex?: number
  wheelRootRef?: RefObject<HTMLElement | null>
  onIndexChange?: (index: number) => void
}

const clampIndex = (index: number, count: number) =>
  Math.max(0, Math.min(Math.trunc(index) || 0, count - 1))

export function useGalleryCarousel({
  count,
  initialIndex = 0,
  selectedIndex,
  wheelRootRef,
  onIndexChange
}: Options) {
  const [activeIndex, setActiveIndex] = useState(() =>
    clampIndex(initialIndex, count)
  )
  const activeIndexRef = useRef(activeIndex)
  const viewportRef = useRef<HTMLDivElement>(null)
  const previousButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const indicatorsRef = useRef<HTMLDivElement>(null)
  const indicatorRefs = useRef<Array<HTMLButtonElement | null>>([])
  const slideRefs = useRef<Array<HTMLDivElement | null>>([])
  const { motionEnabled, canAnimate } = useMotionPreferences()
  const animateContent = motionEnabled && canAnimate
  const hintId = useId()

  const updateActiveIndex = useCallback(
    (index: number, notify = true) => {
      const nextIndex = clampIndex(index, count)
      if (nextIndex === activeIndexRef.current) return

      const previousSlide = slideRefs.current[activeIndexRef.current]
      const focusedElement = document.activeElement
      const focusedControlWillDisable =
        (nextIndex === 0 && focusedElement === previousButtonRef.current) ||
        (nextIndex === count - 1 && focusedElement === nextButtonRef.current)
      if (
        previousSlide?.contains(focusedElement) ||
        focusedControlWillDisable
      ) {
        viewportRef.current?.focus({ preventScroll: true })
      }

      activeIndexRef.current = nextIndex
      slideRefs.current[nextIndex]?.scrollTo({ top: 0, behavior: 'instant' })
      setActiveIndex(nextIndex)
      if (notify) onIndexChange?.(nextIndex)
    },
    [count, onIndexChange]
  )

  const alignSlide = useCallback((index: number, smooth = false) => {
    const viewport = viewportRef.current
    const firstSlide = slideRefs.current[0]
    const targetSlide = slideRefs.current[index]
    if (!viewport || !firstSlide || !targetSlide) return

    viewport.scrollTo({
      left: targetSlide.offsetLeft - firstSlide.offsetLeft,
      behavior: smooth ? 'smooth' : 'instant'
    })
  }, [])

  const navigateTo = useCallback(
    (index: number) => {
      const nextIndex = clampIndex(index, count)
      updateActiveIndex(nextIndex)
      alignSlide(nextIndex, animateContent)
    },
    [alignSlide, animateContent, count, updateActiveIndex]
  )

  useGalleryWheel({
    enabled: true,
    rootRef: wheelRootRef,
    activeIndexRef,
    slideRefs,
    navigateTo
  })

  useEffect(() => {
    const strip = indicatorsRef.current
    const indicator = indicatorRefs.current[activeIndex]
    if (!strip || !indicator) return
    strip.scrollTo({
      left:
        indicator.offsetLeft - (strip.clientWidth - indicator.clientWidth) / 2,
      behavior: animateContent ? 'smooth' : 'instant'
    })
  }, [activeIndex, animateContent])

  useLayoutEffect(() => {
    if (selectedIndex === undefined) return
    const nextIndex = clampIndex(selectedIndex, count)
    if (nextIndex === activeIndexRef.current) return
    // Restore URL/history state without emitting an old cached selection back.
    updateActiveIndex(nextIndex, false)
    alignSlide(nextIndex)
  }, [alignSlide, count, selectedIndex, updateActiveIndex])

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    updateActiveIndex(activeIndexRef.current)
    const alignCurrentSlide = () => alignSlide(activeIndexRef.current)
    alignCurrentSlide()

    const observer = new ResizeObserver(alignCurrentSlide)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [alignSlide, updateActiveIndex])

  useEffect(() => {
    if (!animateContent) alignSlide(activeIndexRef.current)
  }, [alignSlide, animateContent])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    let settleTimer: ReturnType<typeof setTimeout> | undefined

    const settleScroll = () => {
      clearTimeout(settleTimer)
      const firstSlide = slideRefs.current[0]
      if (!firstSlide) return

      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY
      for (let index = 0; index < count; index++) {
        const slide = slideRefs.current[index]
        if (!slide) continue
        const distance = Math.abs(
          slide.offsetLeft - firstSlide.offsetLeft - viewport.scrollLeft
        )
        if (distance < nearestDistance) {
          nearestIndex = index
          nearestDistance = distance
        }
      }
      updateActiveIndex(nearestIndex)
    }

    const scheduleSettle = () => {
      clearTimeout(settleTimer)
      settleTimer = setTimeout(settleScroll, 160)
    }

    viewport.addEventListener('scroll', scheduleSettle, { passive: true })
    viewport.addEventListener('scrollend', settleScroll)
    return () => {
      clearTimeout(settleTimer)
      viewport.removeEventListener('scroll', scheduleSettle)
      viewport.removeEventListener('scrollend', settleScroll)
    }
  }, [count, updateActiveIndex])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      (event.target instanceof Element &&
        event.target.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="slider"], [role="spinbutton"]'
        ))
    ) {
      return
    }

    let nextIndex: number
    switch (event.key) {
      case 'ArrowLeft':
        nextIndex = activeIndexRef.current - 1
        break
      case 'ArrowRight':
        nextIndex = activeIndexRef.current + 1
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = count - 1
        break
      default:
        return
    }
    event.preventDefault()
    navigateTo(nextIndex)
  }

  return {
    activeIndex,
    animateContent,
    hintId,
    viewportRef,
    previousButtonRef,
    nextButtonRef,
    indicatorsRef,
    indicatorRefs,
    slideRefs,
    navigateTo,
    navigatePrevious: () => navigateTo(activeIndexRef.current - 1),
    navigateNext: () => navigateTo(activeIndexRef.current + 1),
    handleKeyDown
  }
}
