'use client'

import type { MotionValue } from 'motion'
import { useEffect, useRef } from 'react'

type Props = {
  x: MotionValue<number>
  y: MotionValue<number>
  active: boolean
}

const GAP = 48
const SAMPLE = 16
const RADIUS = 180
const DEPTH = 24

const DeformableGrid = ({ x, y, active }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const path = pathRef.current
    if (!svg || !path) return

    let width = 0
    let height = 0
    let frame: number | null = null

    const draw = () => {
      frame = null
      if (!width || !height) return

      const centerX = width / 2 + x.get()
      const centerY = height / 2 + y.get()
      const commands: string[] = []

      const point = (px: number, py: number) => {
        const dx = px - centerX
        const dy = py - centerY

        const influence = active
          ? Math.exp(-(dx * dx + dy * dy) / (2 * RADIUS * RADIUS))
          : 0

        const nextX = px + dx * influence * 0.12
        const nextY = py + dy * influence * 0.12 - DEPTH * influence

        return `${nextX.toFixed(2)} ${nextY.toFixed(2)}`
      }

      const addLine = (vertical: boolean, fixed: number, length: number) => {
        for (
          let position = -GAP;
          position <= length + GAP;
          position += SAMPLE
        ) {
          const command = position === -GAP ? 'M' : 'L'

          const coordinates = vertical
            ? point(fixed, position)
            : point(position, fixed)

          commands.push(`${command}${coordinates}`)
        }
      }

      for (let column = -GAP; column <= width + GAP; column += GAP)
        addLine(true, column, height)

      for (let row = -GAP; row <= height + GAP; row += GAP)
        addLine(false, row, width)

      path.setAttribute('d', commands.join(' '))

      if (fallbackRef.current && !fallbackRef.current.hidden)
        fallbackRef.current.hidden = true
    }

    const schedule = () => (frame ??= requestAnimationFrame(draw))

    const resize = () => {
      width = svg.clientWidth
      height = svg.clientHeight
      schedule()
    }

    const observer = new ResizeObserver(resize)
    observer.observe(svg)

    const stopX = active ? x.on('change', schedule) : undefined
    const stopY = active ? y.on('change', schedule) : undefined

    resize()

    return () => {
      observer.disconnect()
      stopX?.()
      stopY?.()
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [x, y, active])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        ref={fallbackRef}
        className="absolute inset-0 bg-[linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] bg-size-[48px_48px] opacity-[0.045]"
      />
      <svg
        ref={svgRef}
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 size-full text-foreground opacity-[0.06] dark:opacity-[0.08]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path ref={pathRef} />
      </svg>
    </div>
  )
}

export default DeformableGrid
