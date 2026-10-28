import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ReactNode, RefObject } from 'react'
import type ProjectGalleryCopy from './types'

type Props = {
  titles: readonly string[]
  count: number
  activeIndex: number
  copy: ProjectGalleryCopy
  indicators: ReactNode
  previousButtonRef: RefObject<HTMLButtonElement | null>
  nextButtonRef: RefObject<HTMLButtonElement | null>
  onPrevious: () => void
  onNext: () => void
}

const controlClassName =
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border-2 border-border bg-card px-3 py-2 text-xs font-bold uppercase tracking-[0.06em] hover:border-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border disabled:hover:bg-card disabled:hover:text-foreground gallery-short:px-2'

const GalleryNavigation = ({
  titles,
  count,
  activeIndex,
  copy,
  indicators,
  previousButtonRef,
  nextButtonRef,
  onPrevious,
  onNext
}: Props) => (
  <div className="order-2 mt-3 grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 border-t-2 border-border pt-2 gallery-short:mt-2 gallery-short:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gallery-short:gap-y-0">
    {indicators}
    <div className="flex min-w-0 items-center gap-3 gallery-short:col-start-1 gallery-short:row-start-1 gallery-short:gap-2">
      <p
        className="shrink-0 font-mono text-sm font-bold tabular-nums tracking-[0.12em]"
        aria-hidden="true"
        data-carousel-counter=""
      >
        {String(activeIndex + 1).padStart(2, '0')}
        <span className="mx-2 text-muted-foreground">/</span>
        {String(count).padStart(2, '0')}
      </p>
      <p className="truncate text-xs font-bold sm:text-sm" aria-hidden="true">
        {titles[activeIndex]}
      </p>
    </div>
    <div className="flex gap-2 gallery-short:col-start-3 gallery-short:row-start-1">
      <button
        ref={previousButtonRef}
        type="button"
        className={controlClassName}
        disabled={activeIndex === 0}
        onClick={onPrevious}
        aria-label={copy.previous}
        data-carousel-previous=""
      >
        <ArrowLeft size={18} aria-hidden="true" />
        <span className="hidden sm:inline gallery-short:hidden">
          {copy.previous}
        </span>
      </button>
      <button
        ref={nextButtonRef}
        type="button"
        className={controlClassName}
        disabled={activeIndex === count - 1}
        onClick={onNext}
        aria-label={copy.next}
        data-carousel-next=""
      >
        <span className="hidden sm:inline gallery-short:hidden">
          {copy.next}
        </span>
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  </div>
)

export default GalleryNavigation
