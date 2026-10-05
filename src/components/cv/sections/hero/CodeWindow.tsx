import type { ReactNode } from 'react'

export const CodeWindow = ({ children }: { children: ReactNode }) => (
  <div className="mt-5 relative">
    <div className="bg-[#101114] overflow-hidden border-4 border-border shadow-normal min-h-80">
      <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-border/70">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-200">main.py</span>
      </div>
      <div className="p-4 font-mono text-sm overflow-x-auto">{children}</div>
    </div>
  </div>
)
