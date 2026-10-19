'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { type ComponentProps, useState } from 'react'

const MotionLink = motion.create(Link)

type ProjectPressLinkProps = Omit<
  ComponentProps<typeof Link>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
>

export default function ProjectPressLink(props: ProjectPressLinkProps) {
  const [pressed, setPressed] = useState(false)

  return (
    <MotionLink
      {...props}
      data-pressed={pressed ? 'true' : undefined}
      onTapStart={() => setPressed(true)}
      onTap={() => setPressed(false)}
      onTapCancel={() => setPressed(false)}
    />
  )
}
