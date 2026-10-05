'use client'

import { useEffect, useRef } from 'react'

const useScrollProgress = () => {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame: number | null = null

    const update = () => {
      frame = null
      const root = document.scrollingElement ?? document.documentElement
      const distance = root.scrollHeight - root.clientHeight
      const progress = distance > 0 ? root.scrollTop / distance : 0
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`
      }
    }

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(schedule)
    observer?.observe(document.body)
    schedule()

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer?.disconnect()
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return { fillRef }
}

export const ScrollProgress = () => {
  const { fillRef } = useScrollProgress()

  return (
    <div
      aria-hidden="true"
      data-scroll-progress=""
      className="pointer-events-none absolute inset-x-0 -top-1 h-1 overflow-hidden bg-border"
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
