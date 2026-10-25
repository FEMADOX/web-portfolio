'use client'

import { useAnimationControls, type Variants } from 'motion/react'
import * as motion from 'motion/react-m'
import { type ReactNode, useEffect, useRef } from 'react'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'

const revealVariants: Variants = {
  settled: { opacity: 1, y: 0, transition: { duration: 0 } },
  reveal: (delay: number) => ({
    opacity: [0.78, 1],
    y: [12, 0],
    transition: { duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }
  })
}

const groupVariants: Variants = {
  settled: { transition: { staggerChildren: 0 } },
  reveal: (delay: number) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay }
  })
}

const elements = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  h1: motion.h1,
  p: motion.p
}

type ProjectRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'single' | 'group' | 'item'
  as?: keyof typeof elements
}

export function ProjectReveal({
  children,
  className,
  delay = 0,
  variant = 'single',
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
      // Server content is already visible. Initial hydration has nothing to
      // settle; only interrupt a reveal that actually started.
      if (!revealed.current) return
      controls.stop()
      controls.set('settled')
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
          // Above-fold HTML is already painted. Keep it visible instead of
          // replaying an entrance during hydration (and delaying LCP).
          if (!initialEntry) void controls.start('reveal')
        }
        initialEntry = false
      },
      { threshold: 0.12 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [controls, motionEnabled, variant])

  return (
    <Element
      ref={(element: HTMLElement | null) => {
        ref.current = variant === 'item' ? null : element
      }}
      className={className}
      initial={false}
      animate={variant === 'item' ? undefined : controls}
      variants={variant === 'group' ? groupVariants : revealVariants}
      custom={Math.min(Math.max(delay, 0), 0.18)}
    >
      {children}
    </Element>
  )
}
