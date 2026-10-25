'use client'

import { useEffect, useRef, useState } from 'react'
import { useIntroductionStage } from '@/contexts/IntroductionContext'
import { useMotionPreferences } from '@/contexts/MotionPreferencesContext'
import { CodeWindow } from './CodeWindow'
import { CODE_TOKENS, TOTAL_CHARS } from './rawtokens'

const COMPLETE_CODE = CODE_TOKENS.map(token => token.text).join('')

export const FastAPICode = () => {
  const { stage } = useIntroductionStage()
  const { ready, motionEnabled, canAnimate } = useMotionPreferences()
  const [inView, setInView] = useState(false)
  const charsVisible = useRef(0)
  const codeRef = useRef<HTMLElement>(null)
  const tokenRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const code = codeRef.current
    if (!code) return
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    })
    observer.observe(code)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const code = codeRef.current
    if (!ready || !code) return

    const showCharacters = (count: number) => {
      let remaining = count
      CODE_TOKENS.forEach((token, index) => {
        const node = tokenRefs.current[index]
        const text = token.text.slice(0, Math.max(0, remaining))
        if (node && node.textContent !== text) node.textContent = text
        remaining -= token.text.length
      })
      charsVisible.current = count
    }

    if (!motionEnabled) {
      showCharacters(TOTAL_CHARS)
      code.dataset.cursor = '|'
      return
    }

    if (!canAnimate || !inView || stage !== 'closed') return

    // Keep character updates out of React commits and preserve progress while
    // the code window is temporarily hidden or outside the viewport.
    let timeout: ReturnType<typeof setTimeout>
    const tick = () => {
      if (charsVisible.current < TOTAL_CHARS) {
        code.dataset.cursor = '_'
        showCharacters(charsVisible.current + 1)
        timeout = setTimeout(tick, 80)
      } else {
        timeout = setTimeout(() => {
          code.dataset.cursor = '|'
        }, 700)
      }
    }
    timeout = setTimeout(tick, 80)
    return () => clearTimeout(timeout)
  }, [ready, motionEnabled, canAnimate, inView, stage])

  return (
    <CodeWindow>
      <pre className="text-muted-foreground">
        <code className="sr-only">{COMPLETE_CODE}</code>
        <code
          id="typing-effect"
          ref={codeRef}
          data-cursor="|"
          aria-hidden="true"
        >
          {CODE_TOKENS.map((token, index) => (
            <span
              key={token.id}
              className={token.className}
              ref={node => {
                tokenRefs.current[index] = node
              }}
            />
          ))}
        </code>
      </pre>
    </CodeWindow>
  )
}
