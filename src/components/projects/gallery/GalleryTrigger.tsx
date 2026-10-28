import { ArrowUpRight } from 'lucide-react'
import type { RefObject } from 'react'
import type ProjectGalleryCopy from './types'

type Props = {
  visibleCount: number
  totalCount: number
  pending: boolean
  copy: ProjectGalleryCopy
  triggerRef: RefObject<HTMLButtonElement | null>
  onPreload: () => void
  onOpen: () => void
}

const GalleryTrigger = ({
  visibleCount,
  totalCount,
  pending,
  copy,
  triggerRef,
  onPreload,
  onOpen
}: Props) => (
  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t-2 border-border pt-5">
    <p className="font-mono text-xs font-bold text-muted-foreground">
      {copy.initialCount
        .replace('{visible}', String(visibleCount))
        .replace('{total}', String(totalCount))}
    </p>
    <button
      ref={triggerRef}
      type="button"
      data-project-show-more
      aria-haspopup="dialog"
      aria-busy={pending}
      aria-disabled={pending}
      onPointerEnter={onPreload}
      onFocus={onPreload}
      onClick={onOpen}
      className="inline-flex min-h-12 items-center justify-center gap-3 border-2 border-border bg-accent px-5 py-3 text-xs font-black uppercase tracking-wide text-accent-foreground shadow-(--shadow-sm) transition-colors hover:bg-foreground hover:text-background focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none in-data-[visual-effects=paused]:transition-none"
    >
      {copy.showMore.replace('{count}', String(totalCount - visibleCount))}
      <ArrowUpRight size={18} aria-hidden="true" />
    </button>
  </div>
)

export default GalleryTrigger
