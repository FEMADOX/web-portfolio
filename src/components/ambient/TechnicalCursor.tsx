'use client'

import { useTransform } from 'motion/react'
import * as motion from 'motion/react-m'
import { createPortal } from 'react-dom'
import { useIntroductionStage } from '@/contexts/IntroductionContext'
import useTechnicalCursor from '@/hooks/useTechnicalCursor'

const reticleMarks = [
  {
    direction: 'top',
    className:
      '-top-1 left-1/2 h-[calc(50%+5px)] w-0.5 -translate-x-1/2 -translate-y-10 group-data-[interactive=true]/cursor:-translate-y-2'
  },
  {
    direction: 'right',
    className:
      'top-1/2 -right-1 h-0.5 w-[calc(50%+5px)] translate-x-10 -translate-y-1/2 group-data-[interactive=true]/cursor:translate-x-2'
  },
  {
    direction: 'bottom',
    className:
      '-bottom-1 left-1/2 h-[calc(50%+5px)] w-0.5 -translate-x-1/2 translate-y-10 group-data-[interactive=true]/cursor:translate-y-2'
  },
  {
    direction: 'left',
    className:
      'top-1/2 -left-1 h-0.5 w-[calc(50%+5px)] -translate-x-10 -translate-y-1/2 group-data-[interactive=true]/cursor:-translate-x-2'
  }
] as const

function CursorVisual() {
  const {
    cursorRef,
    x,
    y,
    frameX,
    frameY,
    size,
    reticleOffset,
    frameRotation
  } = useTechnicalCursor()
  const negativeOffset = useTransform(reticleOffset, value => -value)
  const axisOffsets = {
    top: { y: negativeOffset },
    right: { x: reticleOffset },
    bottom: { y: reticleOffset },
    left: { x: negativeOffset }
  }

  return (
    <div
      ref={cursorRef}
      data-technical-cursor
      aria-hidden="true"
      className="group/cursor pointer-events-none invisible fixed inset-0 z-1000 text-foreground data-[visible=true]:visible"
    >
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: frameX, y: frameY }}
      >
        <motion.span
          data-cursor-frame
          className="absolute top-0 left-0 -translate-1/2 border border-current shadow-[0_0_0_1px_var(--background)] transition-[backdrop-filter] duration-150 ease-out group-data-[interactive=true]/cursor:border-2 group-data-[interactive=true]/cursor:backdrop-invert motion-reduce:transition-none"
          style={{ width: size, height: size, rotate: frameRotation }}
        />
        <motion.span
          className="absolute top-0 left-0 -translate-1/2 drop-shadow-[0_0_1px_var(--background)]"
          style={{ width: size, height: size }}
        >
          <motion.span
            data-cursor-inner-frame
            className="absolute inset-[21%] scale-150 border-2 border-current opacity-0 transition-[scale,opacity] duration-300 ease-out group-data-[interactive=true]/cursor:scale-100 group-data-[interactive=true]/cursor:opacity-100 motion-reduce:transition-none"
            style={{ rotate: frameRotation }}
          />
          {reticleMarks.map(({ direction, className }) => (
            <motion.span
              key={direction}
              data-cursor-mark={direction}
              className={`absolute bg-current opacity-0 transition-[translate,opacity] duration-300 ease-out group-data-[interactive=true]/cursor:opacity-100 motion-reduce:transition-none ${className}`}
              style={axisOffsets[direction]}
            />
          ))}
        </motion.span>
      </motion.div>
      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <span className="absolute top-0 left-0 size-1 -translate-1/2 bg-current opacity-100 shadow-[0_0_0_1px_var(--background)] transition-opacity duration-150 group-data-[interactive=true]/cursor:opacity-0 motion-reduce:transition-none" />
        <span
          data-cursor-cross
          className="absolute top-0 left-0 size-2 -translate-1/2 scale-50 opacity-0 drop-shadow-[0_0_1px_var(--background)] transition-[scale,opacity] duration-300 ease-out group-data-[interactive=true]/cursor:scale-100 group-data-[interactive=true]/cursor:opacity-100 motion-reduce:transition-none"
        >
          <span className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-current" />
          <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-current" />
        </span>
      </motion.div>
    </div>
  )
}

export default function TechnicalCursor() {
  const { cursorTarget } = useIntroductionStage()
  // A modal's top layer is above every document z-index. Render the single
  // cursor there while the introduction is open, using the same preferences.
  return cursorTarget ? (
    createPortal(<CursorVisual />, cursorTarget)
  ) : (
    <CursorVisual />
  )
}
