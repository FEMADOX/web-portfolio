'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function ProjectReveal({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [18, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
