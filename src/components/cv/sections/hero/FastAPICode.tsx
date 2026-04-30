'use client'

import { useEffect, useRef, useState } from 'react'
import { CODE_TOKENS, TOTAL_CHARS } from './rawtokens'

export const FastAPICode = () => {
  const [charsVisible, setCharsVisible] = useState(0)
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (charsVisible >= TOTAL_CHARS) return
    const timeout = setTimeout(() => setCharsVisible((c) => c + 1), 80)
    return () => clearTimeout(timeout)
  }, [charsVisible])

  useEffect(() => {
    console.log(`Chars visible: ${charsVisible}/${TOTAL_CHARS}`)
    if (codeRef.current) {
      if (charsVisible >= TOTAL_CHARS) {
        setTimeout(() => codeRef.current?.setAttribute('data-cursor', '|'), 700)
      } else codeRef.current.setAttribute('data-cursor', '_')
    }
  }, [charsVisible])

  let remaining = charsVisible
  const visibleTokens = CODE_TOKENS.map((token) => {
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
    <div className="mt-5 relative">
      <div className="bg-[#101114] overflow-hidden border-4 border-border shadow-normal min-h-80">
        <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-border/70">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-200">main.py</span>
        </div>
        <div className="p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-muted-foreground">
            <code id="typing-effect" ref={codeRef} data-cursor="|">
              {visibleTokens}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}
