'use client'

import type { MotionValue } from 'motion'
import { useEffect, useRef } from 'react'
import { createGridGeometry, createGridPath } from '@/lib/deformableGrid'

export interface DeformableGridOptions {
  x: MotionValue<number>
  y: MotionValue<number>
  active: boolean
}

const FRAME_INTERVAL = 1000 / 30
const MIN_MOVEMENT = 0.25

export default function useDeformableGrid({
  x,
  y,
  active
}: DeformableGridOptions) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const path = pathRef.current
    if (!svg || !path) return

    let geometry = createGridGeometry(0, 0)
    let frame: number | null = null
    let lastDraw = -Infinity
    let previousX = Infinity
    let previousY = Infinity

    const draw = (time: number) => {
      frame = null
      if (!geometry.width || !geometry.height) return
      if (time - lastDraw < FRAME_INTERVAL) {
        frame = requestAnimationFrame(draw)
        return
      }

      const centerX = geometry.width / 2 + x.get()
      const centerY = geometry.height / 2 + y.get()
      // The light keeps its display refresh rate; the mesh only rebuilds when
      // its resolved position changes visibly, at most 30 times per second.
      if (
        Math.abs(centerX - previousX) < MIN_MOVEMENT &&
        Math.abs(centerY - previousY) < MIN_MOVEMENT
      )
        return
      lastDraw = time
      previousX = centerX
      previousY = centerY
      path.setAttribute('d', createGridPath(geometry, centerX, centerY, active))

      if (fallbackRef.current && !fallbackRef.current.hidden)
        fallbackRef.current.hidden = true
    }

    const schedule = () => (frame ??= requestAnimationFrame(draw))

    const resize = () => {
      geometry = createGridGeometry(svg.clientWidth, svg.clientHeight)
      previousX = Infinity
      previousY = Infinity
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

  return { svgRef, pathRef, fallbackRef }
}
