'use client'

import type { ReactNode } from 'react'
import type { ProjectSlug } from '@/data/projects/types'
import { useGalleryCollection } from '@/hooks/useGalleryCollection'
import { GalleryTrigger, preloadGallery } from '.'
import DeferredGalleryDialog from './DeferredGalleryDialog'
import type ProjectGalleryCopy from './types'

type Props = {
  cards: readonly ReactNode[]
  titles: readonly string[]
  slugs: readonly ProjectSlug[]
  copy: ProjectGalleryCopy
}

const ProjectGalleryCollection = ({ cards, titles, slugs, copy }: Props) => {
  const {
    galleryOpen,
    pending,
    listHeight,
    listRef,
    triggerRef,
    visibleCount,
    additionalCount,
    activeIndex,
    selectProject,
    openGallery,
    closeGallery
  } = useGalleryCollection(slugs)

  return (
    <div data-project-gallery-collection>
      {galleryOpen ? (
        <div aria-hidden="true" style={{ height: listHeight }} />
      ) : (
        <div ref={listRef} className="space-y-5">
          {cards.slice(0, visibleCount)}
        </div>
      )}
      {additionalCount > 0 ? (
        <GalleryTrigger
          visibleCount={visibleCount}
          totalCount={cards.length}
          pending={pending}
          copy={copy}
          triggerRef={triggerRef}
          onPreload={preloadGallery}
          onOpen={openGallery}
        />
      ) : null}
      {galleryOpen ? (
        <DeferredGalleryDialog
          slides={cards}
          titles={titles}
          slugs={slugs}
          activeIndex={activeIndex}
          onIndexChange={selectProject}
          copy={copy}
          triggerRef={triggerRef}
          onDismiss={closeGallery}
        />
      ) : null}
    </div>
  )
}

export default ProjectGalleryCollection
