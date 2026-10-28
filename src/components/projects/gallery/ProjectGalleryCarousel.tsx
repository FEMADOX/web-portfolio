'use client'

import type { ReactNode, RefObject } from 'react'
import { useGalleryCarousel } from '../../../hooks/useGalleryCarousel'
import { GalleryIndicators, GalleryNavigation, GalleryViewport } from '.'
import type ProjectGalleryCopy from './types'

type Props = {
  slides: readonly ReactNode[]
  titles: readonly string[]
  initialIndex?: number
  selectedIndex?: number
  copy: ProjectGalleryCopy
  labelledBy: string
  className?: string
  wheelRootRef?: RefObject<HTMLElement | null>
  onIndexChange?: (index: number) => void
}

export default function ProjectGalleryCarousel({
  slides,
  titles,
  initialIndex = 0,
  selectedIndex,
  copy,
  labelledBy,
  className = '',
  wheelRootRef,
  onIndexChange
}: Props) {
  const count = slides.length
  const {
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
    navigatePrevious,
    navigateNext,
    handleKeyDown
  } = useGalleryCarousel({
    count,
    initialIndex,
    selectedIndex,
    wheelRootRef,
    onIndexChange
  })

  if (count === 0) return null

  const announcement = copy.projectAnnouncement
    .replace('{index}', String(activeIndex + 1))
    .replace('{total}', String(count))
    .replace('{title}', titles[activeIndex] ?? '')

  return (
    <section
      aria-labelledby={labelledBy}
      aria-roledescription="carousel"
      className={`flex h-full min-h-0 min-w-0 flex-col ${className}`}
      data-project-carousel=""
      data-carousel-index={activeIndex}
      onKeyDown={handleKeyDown}
    >
      <GalleryNavigation
        titles={titles}
        count={count}
        activeIndex={activeIndex}
        copy={copy}
        previousButtonRef={previousButtonRef}
        nextButtonRef={nextButtonRef}
        onPrevious={navigatePrevious}
        onNext={navigateNext}
        indicators={
          <GalleryIndicators
            titles={titles}
            count={count}
            activeIndex={activeIndex}
            animateContent={animateContent}
            copy={copy}
            indicatorsRef={indicatorsRef}
            indicatorRefs={indicatorRefs}
            navigateTo={navigateTo}
          />
        }
      />
      <GalleryViewport
        slides={slides}
        titles={titles}
        activeIndex={activeIndex}
        animateContent={animateContent}
        labelledBy={labelledBy}
        hintId={hintId}
        viewportRef={viewportRef}
        slideRefs={slideRefs}
      />
      <p
        id={hintId}
        className="order-3 shrink-0 font-mono text-[10px] text-muted-foreground gallery-short:sr-only"
      >
        {copy.galleryHint}
      </p>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>
    </section>
  )
}
