import { Asterisk } from 'lucide-react'
import type { RefObject } from 'react'
import type ProjectGalleryCopy from './types'

type Props = {
  titles: readonly string[]
  count: number
  activeIndex: number
  animateContent: boolean
  copy: ProjectGalleryCopy
  indicatorsRef: RefObject<HTMLDivElement | null>
  indicatorRefs: RefObject<Array<HTMLButtonElement | null>>
  navigateTo: (index: number) => void
}

const GalleryIndicators = ({
  titles,
  count,
  activeIndex,
  animateContent,
  copy,
  indicatorsRef,
  indicatorRefs,
  navigateTo
}: Props) => (
  <div
    ref={indicatorsRef}
    className="relative col-span-2 row-start-2 overflow-x-auto scrollbar-none gallery-short:col-span-1 gallery-short:col-start-2 gallery-short:row-start-1 gallery-short:min-w-0 [&::-webkit-scrollbar]:hidden"
    data-gallery-indicators=""
  >
    <div className="relative mx-auto flex w-max min-w-full items-center justify-between">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5.5 top-1/2 h-px bg-border"
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-5.5 top-1/2 h-px origin-left bg-accent ${animateContent ? 'transition-transform duration-300' : ''}`}
        style={{
          scale: `${count > 1 ? activeIndex / (count - 1) : 0} 1`
        }}
      />
      {titles.map((title, index) => (
        <button
          key={title}
          ref={element => {
            indicatorRefs.current[index] = element
          }}
          type="button"
          aria-label={copy.goToProject
            .replace('{index}', String(index + 1))
            .replace('{title}', title)}
          aria-current={index === activeIndex ? 'true' : undefined}
          onClick={() => navigateTo(index)}
          className={`relative z-1 flex size-11 shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring ${index === activeIndex ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
          data-gallery-indicator={index}
        >
          {index === activeIndex ? (
            <Asterisk size={25} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <span className="size-1.75 rounded-full border border-current bg-background" />
          )}
        </button>
      ))}
    </div>
  </div>
)

export default GalleryIndicators
