'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function ProjectReveal({
  children,
  className,
  delay = 0
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { opacity: [0.8, 1], y: [18, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay: Math.min(Math.max(delay, 0), 0.18),
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
