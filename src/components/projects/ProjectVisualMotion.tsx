'use client'

import { useAnimationControls, type Variants } from 'motion/react'
import * as motion from 'motion/react-m'
import { useEffect, useRef } from 'react'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import { cn } from '@/lib/utils'
import type { ProjectVisualNodeProps } from './StaticVisual'

const ease = [0.22, 1, 0.36, 1] as const
const nodeVariants: Variants = {
  settled: { opacity: 1, y: 0, transition: { duration: 0 } },
  entrance: {
    opacity: [0.85, 1],
    y: [8, 0],
    transition: { duration: 0.28, ease }
  },
  reveal: {
    opacity: [0.85, 1],
    y: [8, 0],
    transition: { duration: 0.28, ease }
  }
}
const connectorVariants: Variants = {
  settled: { scaleX: 1, opacity: 0.3, transition: { duration: 0 } },
  entrance: {
    scaleX: [0, 1],
    opacity: [0.15, 0.5, 0.3],
    transition: { duration: 0.22, delay: 0.06, ease }
  },
  reveal: {
    scaleX: [0, 1],
    opacity: [0.15, 0.5, 0.3],
    transition: { duration: 0.22, delay: 0.06, ease }
  }
}

export function HeroVisualNode({
  children,
  className,
  index
}: ProjectVisualNodeProps) {
  return (
    <motion.div
      initial={false}
      variants={nodeVariants}
      data-project-visual-node
      // Motion owns transforms here; the card's CSS transition would otherwise
      // interpolate every animation frame and extend the node sequence.
      className={cn('relative', className, 'transition-none!')}
    >
      {index > 0 && (
        <motion.span
          initial={false}
          variants={connectorVariants}
          style={{ originX: 0, opacity: 0.3 }}
          data-project-visual-connector
          className={cn(
            'pointer-events-none absolute top-1/2 -left-[0.6rem] h-px w-[0.6rem] bg-(--project-color) @min-[500px]:-left-4 @min-[500px]:w-4',
            index === 2 && 'hidden @min-[500px]:block'
          )}
        />
      )}
      {children}
    </motion.div>
  )
}

export function HeroVisualAccent() {
  const { canAnimate } = useMotionPreferences()
  const ref = useRef<HTMLSpanElement>(null)
  const played = useRef(false)
  const controls = useAnimationControls()

  useEffect(() => {
    if (!canAnimate) {
      controls.stop()
      controls.set({ opacity: 0, x: '-110%' })
      return
    }
    // Observe the stable visual, because the sweep starts outside its clipped box.
    const element = ref.current?.parentElement
    if (!element || played.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        played.current = true
        observer.disconnect()
        void controls.start({
          x: ['-110%', '110%'],
          opacity: [0, 0.12, 0],
          transition: { duration: 0.45, ease }
        })
      },
      { threshold: 0.12 }
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      controls.stop()
    }
  }, [canAnimate, controls])

  return (
    <motion.span
      ref={ref}
      initial={false}
      animate={controls}
      style={{ opacity: 0, x: '-110%' }}
      data-project-visual-accent
      className="pointer-events-none absolute inset-0 -z-1 bg-[linear-gradient(110deg,transparent_20%,var(--project-color)_50%,transparent_80%)]"
    />
  )
}
