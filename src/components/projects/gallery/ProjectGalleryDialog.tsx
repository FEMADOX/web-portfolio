'use client'

import { type ReactNode, type RefObject, ViewTransition } from 'react'
import getProjectThemeClasses from '@/components/projects/theme'
import type { ProjectSlug } from '@/data/projects/types'
import { useGalleryDialog } from '@/hooks/useGalleryDialog'
import { cn } from '@/lib/utils'
import { GalleryHeader, ProjectGalleryCarousel } from '.'
import type ProjectGalleryCopy from './types'

type Props = {
  slides: readonly ReactNode[]
  titles: readonly string[]
  slugs?: readonly ProjectSlug[]
  activeIndex: number
  onIndexChange: (index: number) => void
  copy: ProjectGalleryCopy
  triggerRef: RefObject<HTMLButtonElement | null>
  onDismiss: () => void
}

export default function ProjectGalleryDialog({
  slides,
  titles,
  slugs,
  activeIndex,
  onIndexChange,
  copy,
  triggerRef,
  onDismiss
}: Props) {
  const { dialogRef, titleRef, titleId, descriptionId, handleCancel } =
    useGalleryDialog({ triggerRef, onDismiss })
  const activeSlug = slugs?.[activeIndex]

  return (
    <ViewTransition
      name="project-gallery"
      default="none"
      enter="gallery-enter"
      exit="gallery-exit"
      share="gallery-language"
      update="none"
    >
      <dialog
        ref={dialogRef}
        data-project-gallery
        data-gallery-project={activeSlug}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onCancel={handleCancel}
        className={cn(
          'fixed inset-0 isolate m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden overscroll-contain border-0 bg-background p-0 text-foreground open:grid open:grid-cols-[minmax(0,1fr)] open:grid-rows-[auto_minmax(0,1fr)] backdrop:bg-background/90 backdrop:backdrop-blur-sm',
          activeSlug ? getProjectThemeClasses(activeSlug) : ''
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-1 overflow-hidden"
        >
          <span className="absolute top-28 left-3 size-5 border-t-2 border-l-2 border-(--project-color) opacity-60 sm:left-8" />
          <span className="absolute right-3 bottom-6 size-5 border-r-2 border-b-2 border-(--project-color) opacity-60 sm:right-8" />
        </div>
        <GalleryHeader
          titleRef={titleRef}
          titleId={titleId}
          copy={copy}
          onDismiss={onDismiss}
        />
        <div className="mx-auto flex min-h-0 min-w-0 w-full max-w-380 flex-col px-3 pt-3 pb-2 sm:px-8 sm:pt-5 sm:pb-4 lg:px-12 gallery-short:px-4 gallery-short:pt-1.5 gallery-short:pb-1.5">
          <p
            id={descriptionId}
            className="m-3 shrink-0 text-xs leading-relaxed text-muted-foreground max-sm:sr-only sm:mb-4 sm:text-sm gallery-short:sr-only"
          >
            {copy.galleryDescription}
          </p>
          <ProjectGalleryCarousel
            slides={slides}
            titles={titles}
            initialIndex={activeIndex}
            selectedIndex={activeIndex}
            copy={copy}
            labelledBy={titleId}
            wheelRootRef={dialogRef}
            onIndexChange={onIndexChange}
            className="min-h-0 flex-1"
          />
        </div>
      </dialog>
    </ViewTransition>
  )
}
