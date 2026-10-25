'use client'

import { useAnimationControls, type Variants } from 'motion/react'
import * as motion from 'motion/react-m'
import { type ReactNode, useEffect, useRef } from 'react'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'

type RevealPreset = 'rise' | 'heading' | 'node' | 'fade' | 'line'

const ease = [0.22, 1, 0.36, 1] as const
const transition = (duration: number, delay?: number) => ({
  duration,
  ease,
  ...(delay === undefined ? {} : { delay })
})
const settled = {
  opacity: 1,
  y: 0,
  scale: 1,
  scaleX: 1,
  transition: { duration: 0 }
}

const revealVariants: Record<RevealPreset, Variants> = {
  rise: {
    settled,
    entrance: (delay?: number) => ({
      opacity: [0.94, 1],
      transition: transition(0.36, delay)
    }),
    reveal: (delay?: number) => ({
      opacity: [0.78, 1],
      y: [12, 0],
      transition: transition(0.42, delay)
    })
  },
  heading: {
    settled,
    entrance: (delay?: number) => ({
      opacity: [0.94, 1],
      transition: transition(0.42, delay)
    }),
    reveal: (delay?: number) => ({
      opacity: [0.88, 1],
      y: [8, 0],
      transition: transition(0.42, delay)
    })
  },
  node: {
    settled,
    entrance: (delay?: number) => ({
      opacity: [0.85, 1],
      y: [6, 0],
      scale: [0.98, 1],
      transition: transition(0.28, delay)
    }),
    reveal: (delay?: number) => ({
      opacity: [0.85, 1],
      y: [6, 0],
      scale: [0.98, 1],
      transition: transition(0.28, delay)
    })
  },
  fade: {
    settled,
    entrance: (delay?: number) => ({
      opacity: [0.94, 1],
      transition: transition(0.3, delay)
    }),
    reveal: (delay?: number) => ({
      opacity: [0.85, 1],
      transition: transition(0.3, delay)
    })
  },
  line: {
    settled,
    entrance: (delay?: number) => ({
      scaleX: [0, 1],
      transition: transition(0.22, delay)
    }),
    reveal: (delay?: number) => ({
      scaleX: [0, 1],
      transition: transition(0.22, delay)
    })
  }
}

const groupVariants: Variants = {
  settled: { transition: { delayChildren: 0 } },
  entrance: (delay: number) => ({
    transition: {
      delayChildren: (index: number) => Math.min(delay + index * 0.06, 0.18)
    }
  }),
  reveal: (delay: number) => ({
    transition: {
      delayChildren: (index: number) => Math.min(delay + index * 0.06, 0.18)
    }
  })
}

const elements = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  header: motion.header,
  dl: motion.dl
}

type ProjectRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'single' | 'group' | 'item'
  preset?: RevealPreset
  enter?: boolean
  as?: keyof typeof elements
}

export function ProjectReveal({
  children,
  className,
  delay = 0,
  variant = 'single',
  preset = 'rise',
  enter = false,
  as = 'div'
}: ProjectRevealProps) {
  const { motionEnabled } = useMotionPreferences()
  const ref = useRef<HTMLElement | null>(null)
  const revealed = useRef(false)
  const controls = useAnimationControls()
  const Element = elements[as]

  useEffect(() => {
    if (variant === 'item') return
    if (!motionEnabled) {
      controls.stop()
      // Starting a zero-duration variant also cancels in-flight animations in
      // inherited items. set() alone leaves those child animations running.
      void controls.start('settled', { duration: 0, delay: 0 })
      return
    }
    if (revealed.current) return
    const element = ref.current
    if (!element) return
    let initialEntry = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          revealed.current = true
          // Direct visits keep painted content visible. Only opt-in hero
          // details get a subtle entrance on that first observer delivery.
          if (!initialEntry || enter)
            void controls.start(initialEntry ? 'entrance' : 'reveal')
        }
        initialEntry = false
      },
      { threshold: 0.12 }
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      controls.stop()
    }
  }, [controls, enter, motionEnabled, variant])

  return (
    <Element
      ref={(element: HTMLElement | null) => {
        ref.current = variant === 'item' ? null : element
      }}
      className={className}
      initial={false}
      animate={variant === 'item' ? undefined : controls}
      variants={variant === 'group' ? groupVariants : revealVariants[preset]}
      style={preset === 'line' ? { transformOrigin: 'left center' } : undefined}
      // Items inherit the group's stagger; an explicit delay=0 overrides it.
      custom={
        variant === 'item' && delay === 0
          ? undefined
          : Math.min(Math.max(delay, 0), 0.18)
      }
    >
      {children}
    </Element>
  )
}
