'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { type MouseEvent, useEffect, useRef, useState } from 'react'

import { Button } from '../ui'

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = mounted && resolvedTheme === 'dark'
  const iconAnimationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  )
  const themeTransitionTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    return () => {
      if (iconAnimationTimeoutRef.current) {
        clearTimeout(iconAnimationTimeoutRef.current)
      }

      if (themeTransitionTimeoutRef.current) {
        clearTimeout(themeTransitionTimeoutRef.current)
      }

      document.documentElement.classList.remove('theme-transition')
    }
  }, [])

  const handleThemeToggle = (event: MouseEvent<HTMLButtonElement>) => {
    if (!mounted) return
    const nextTheme = isDark ? 'light' : 'dark'
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => {
        finished: Promise<void>
      }
    }
    const root = document.documentElement

    if (themeTransitionTimeoutRef.current) {
      clearTimeout(themeTransitionTimeoutRef.current)
    }

    setIsAnimating(true)
    if (iconAnimationTimeoutRef.current) {
      clearTimeout(iconAnimationTimeoutRef.current)
    }
    iconAnimationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 560)

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !doc.startViewTransition
    ) {
      root.classList.add('theme-transition')
      themeTransitionTimeoutRef.current = setTimeout(() => {
        root.classList.remove('theme-transition')
      }, 340)
      setTheme(nextTheme)
      return
    }

    const buttonRect = event.currentTarget.getBoundingClientRect()
    root.style.setProperty(
      '--theme-toggle-x',
      `${buttonRect.left + buttonRect.width / 2}px`
    )
    root.style.setProperty(
      '--theme-toggle-y',
      `${buttonRect.top + buttonRect.height / 2}px`
    )

    doc.startViewTransition(() => {
      setTheme(nextTheme)
    })
  }

  const label = !mounted
    ? 'Change theme'
    : isDark
      ? 'Switch to light mode'
      : 'Switch to dark mode'

  const buttonClassName = `w-10 border-2 bg-background px-2 hover:cursor-pointer ${
    isDark
      ? 'text-primary border-primary dark:hover:bg-primary dark:hover:text-primary-foreground'
      : 'text-foreground border-border hover:bg-primary hover:text-primary-foreground'
  }`

  const iconClassName = `size-5 transition-transform duration-300 ease-out ${
    isAnimating ? 'theme-toggle-icon-animate' : ''
  }`

  return (
    <Button
      aria-label={label}
      aria-pressed={mounted ? isDark : false}
      className={buttonClassName}
      disabled={!mounted}
      onClick={handleThemeToggle}
      type="button"
      variant="ghost"
    >
      {!mounted ? (
        <Moon aria-hidden="true" className={iconClassName} strokeWidth={2.8} />
      ) : isDark ? (
        <Sun aria-hidden="true" className={iconClassName} strokeWidth={2.8} />
      ) : (
        <Moon aria-hidden="true" className={iconClassName} strokeWidth={2.8} />
      )}
    </Button>
  )
}
