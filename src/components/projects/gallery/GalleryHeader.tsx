import { X } from 'lucide-react'
import type { RefObject } from 'react'
import GalleryControls from './GalleryControls'
import type ProjectGalleryCopy from './types'

type Props = {
  titleRef: RefObject<HTMLHeadingElement | null>
  titleId: string
  copy: ProjectGalleryCopy
  onDismiss: () => void
}

const GalleryHeader = ({ titleRef, titleId, copy, onDismiss }: Props) => (
  <header className="relative z-10 flex min-w-0 flex-col items-stretch justify-between gap-x-4 gap-y-2 border-b-2 border-border bg-background/85 px-4 py-3 backdrop-blur-sm sm:flex-row sm:items-center sm:px-8 sm:py-4 gallery-short:px-4 gallery-short:py-1">
    <div className="min-w-0">
      <p className="mb-1 flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.18em] text-muted-foreground uppercase sm:text-[10px] gallery-short:mb-0 gallery-short:text-[9px]">
        <span className="size-1.5 bg-(--project-color)" aria-hidden="true" />
        {copy.galleryLabel}
      </p>
      <h2
        ref={titleRef}
        id={titleId}
        tabIndex={-1}
        className="text-xl leading-tight font-black tracking-tight outline-none sm:text-3xl gallery-short:text-xl"
      >
        {copy.galleryTitle}
      </h2>
    </div>
    <div className="flex shrink-0 items-stretch gap-2 self-end sm:self-auto">
      <GalleryControls />
      <button
        type="button"
        onClick={onDismiss}
        aria-label={copy.close}
        className="flex min-h-11 min-w-11 items-center justify-center gap-2 border-2 border-border bg-accent px-3 font-mono text-xs font-bold text-accent-foreground shadow-(--shadow-sm) hover:bg-foreground hover:text-background focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring sm:px-4"
      >
        <span className="hidden lg:inline gallery-short:hidden">
          {copy.close}
        </span>
        <X size={20} aria-hidden="true" />
      </button>
    </div>
  </header>
)

export default GalleryHeader
