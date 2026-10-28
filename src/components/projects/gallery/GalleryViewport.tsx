import * as m from 'motion/react-m'
import type { ReactNode, RefObject } from 'react'

type Props = {
  slides: readonly ReactNode[]
  titles: readonly string[]
  activeIndex: number
  animateContent: boolean
  labelledBy: string
  hintId: string
  viewportRef: RefObject<HTMLDivElement | null>
  slideRefs: RefObject<Array<HTMLDivElement | null>>
}

export default function GalleryViewport({
  slides,
  titles,
  activeIndex,
  animateContent,
  labelledBy,
  hintId,
  viewportRef,
  slideRefs
}: Props) {
  const count = slides.length

  // A focusable scroll viewport supports keyboard scrolling and focus recovery.
  return (
    // biome-ignore lint/a11y/useSemanticElements: Carousel groups are not form fieldsets.
    <div
      ref={viewportRef}
      role="group"
      aria-labelledby={labelledBy}
      aria-describedby={hintId}
      tabIndex={-1}
      className="relative flex min-h-0 flex-1 snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain scrollbar-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-scrollbar]:hidden"
      style={{ touchAction: 'auto', scrollBehavior: 'auto' }}
      data-carousel-viewport=""
    >
      {slides.map((slide, index) => (
        // biome-ignore lint/a11y/useSemanticElements: Carousel slide groups are not form fieldsets.
        <div
          key={titles[index] ?? index}
          ref={element => {
            slideRefs.current[index] = element
          }}
          role="group"
          aria-label={`${index + 1} / ${count}: ${titles[index] ?? ''}`}
          aria-hidden={index !== activeIndex}
          inert={index !== activeIndex}
          className="h-full min-w-0 basis-full shrink-0 snap-start snap-always overflow-x-hidden overflow-y-auto overscroll-y-contain p-1 scrollbar-thin"
          data-gallery-slide-scroll=""
          data-carousel-slide={index}
          data-carousel-active={index === activeIndex}
        >
          <m.div
            initial={false}
            animate={
              animateContent && index === activeIndex
                ? { opacity: [0.75, 1], y: [12, 0] }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: animateContent && index === activeIndex ? 0.36 : 0,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="flex min-h-full flex-col justify-center"
          >
            {slide}
          </m.div>
        </div>
      ))}
    </div>
  )
}
