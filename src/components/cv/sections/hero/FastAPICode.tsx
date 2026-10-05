'use client'

import { useEffect, useRef, useState } from 'react'
import { CodeWindow } from './CodeWindow'
import { CODE_TOKENS, TOTAL_CHARS } from './rawtokens'

export const FastAPICode = () => {
  const [charsVisible, setCharsVisible] = useState(0)
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (charsVisible >= TOTAL_CHARS) return
    const timeout = setTimeout(() => setCharsVisible(c => c + 1), 80)
    return () => clearTimeout(timeout)
  }, [charsVisible])

  useEffect(() => {
    if (codeRef.current) {
      if (charsVisible >= TOTAL_CHARS) {
        setTimeout(() => codeRef.current?.setAttribute('data-cursor', '|'), 700)
      } else codeRef.current.setAttribute('data-cursor', '_')
    }
  }, [charsVisible])

  let remaining = charsVisible
  const visibleTokens = CODE_TOKENS.map(token => {
    if (remaining <= 0) return null
    const slice = token.text.slice(0, remaining)
    remaining -= token.text.length
    return (
      <span key={token.id} className={token.className}>
        {slice}
      </span>
    )
  })

  return (
    <CodeWindow>
      <pre className="text-muted-foreground">
        <code id="typing-effect" ref={codeRef} data-cursor="|">
          {visibleTokens}
        </code>
      </pre>
    </CodeWindow>
  )
}
