'use client'

import * as motion from 'motion/react-m'
import { createPortal } from 'react-dom'
import getProjectThemeClasses from '@/components/projects/theme'
import { useIntroductionStage } from '@/contexts/IntroductionContext'
import type { ProjectSlug } from '@/data/projects/types'
import useAmbientMotion from '@/hooks/useAmbientMotion'
import DeformableGrid from './DeformableGrid'

export default function AmbientScene({ slug }: { slug?: ProjectSlug }) {
  const { x, y, canAnimate } = useAmbientMotion()
  const { cursorTarget } = useIntroductionStage()
  const galleryTarget = cursorTarget?.hasAttribute('data-project-gallery')
    ? cursorTarget
    : null

  const scene = (
    <div
      aria-hidden="true"
      data-ambient-background
      data-ambient-project={galleryTarget ? 'gallery' : (slug ?? 'portfolio')}
      data-ambient-animated={canAnimate}
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background [--ambient-color:var(--project-color,var(--accent))] ${slug ? getProjectThemeClasses(slug) : ''}`}
    >
      <DeformableGrid x={x} y={y} active={canAnimate} />
      <motion.div
        data-ambient-light
        className="absolute top-1/2 left-1/2 -mt-80 -ml-80 size-160 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--ambient-color)_50%,transparent),transparent_68%)] opacity-80 dark:bg-[radial-gradient(circle,color-mix(in_srgb,var(--ambient-color)_30%,transparent),transparent_68%)]"
        style={{ x, y }}
      />
    </div>
  )

  // Native modal dialogs sit above every document z-index. Move this single
  // scene into the gallery, where it also inherits the selected project's color.
  return galleryTarget ? createPortal(scene, galleryTarget) : scene
}
