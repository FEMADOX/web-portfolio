'use client'

import { animate, motion, useMotionValue, useSpring } from 'motion/react'
import { useParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { getProjectThemeClasses } from '@/components/projects/theme'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import { PROJECT_SLUGS, type ProjectSlug } from '@/data/projects/types'
import DeformableGrid from './DeformableGrid'

function AmbientScene({ slug }: { slug?: ProjectSlug }) {
  const { canAnimate } = useMotionPreferences()
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const x = useSpring(targetX, { stiffness: 32, damping: 24, mass: 1.2 })
  const y = useSpring(targetY, { stiffness: 32, damping: 24, mass: 1.2 })

  useEffect(() => {
    if (!canAnimate) {
      x.jump(0)
      y.jump(0)
      targetX.set(0)
      targetY.set(0)
      return
    }

    const precisePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    )
    let stopMotion = () => {}

    const startMotion = () => {
      stopMotion()
      if (precisePointer.matches) {
        const move = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse' && event.pointerType !== 'pen')
            return
          targetX.set(event.clientX - window.innerWidth / 2)
          targetY.set(event.clientY - window.innerHeight / 2)
        }
        const recenter = () => {
          targetX.set(0)
          targetY.set(0)
        }
        window.addEventListener('pointermove', move, { passive: true })
        document.documentElement.addEventListener('pointerleave', recenter)
        window.addEventListener('blur', recenter)
        stopMotion = () => {
          window.removeEventListener('pointermove', move)
          document.documentElement.removeEventListener('pointerleave', recenter)
          window.removeEventListener('blur', recenter)
        }
      } else {
        const width = Math.min(window.innerWidth * 0.25, 150)
        const height = Math.min(window.innerHeight * 0.2, 180)
        const options = {
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut' as const
        }
        const horizontal = animate(targetX, [0, width, -width, 0], options)
        const vertical = animate(targetY, [0, -height, height, 0], options)
        stopMotion = () => {
          horizontal.stop()
          vertical.stop()
        }
      }
    }

    startMotion()
    precisePointer.addEventListener('change', startMotion)
    return () => {
      stopMotion()
      precisePointer.removeEventListener('change', startMotion)
      x.stop()
      y.stop()
    }
  }, [canAnimate, targetX, targetY, x, y])

  return (
    <div
      aria-hidden="true"
      data-ambient-background
      data-ambient-project={slug ?? 'portfolio'}
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
}

function RoutedAmbientScene() {
  const params = useParams()
  const slug = PROJECT_SLUGS.find(value => value === params?.slug)
  return <AmbientScene slug={slug} />
}

export default function AmbientBackground() {
  return (
    <Suspense fallback={<AmbientScene />}>
      <RoutedAmbientScene />
    </Suspense>
  )
}
