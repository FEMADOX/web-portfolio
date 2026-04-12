'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const HeroSection = () => (
  <section id="summary" className="pt-2 pb-5 lg:pt-4">
    {/* Title */}
    <div className="mb-5 border-4 border-border bg-card p-6 shadow-normal">
      <h1 className="text-5xl sm:text-6xl font-black uppercase leading-none tracking-tight">
        <span className="text-foreground font-bold font-['Space_Grotesk'] tracking-tighter leading-none">
          Web
        </span>
        <br />
        <span className="text-foreground font-bold font-['Space_Grotesk'] tracking-tighter leading-none">
          Developer
        </span>
      </h1>
      <div className="h-0.5 bg-border mt-3" />

      {/* Summary */}
      <p className="text-lg text-muted-foreground leading-relaxed mt-4 mb-4 max-w-2xl">
        Back-end python developer using Django and FastAPI with strong bases in
        Frontend Dev with TypeScript, React and NextJS focusing on delivering
        impactful results.
      </p>

      {/* Download CV Button - Mobile */}
      <Button className="lg:hidden h-12 rounded-none border-2 border-border bg-accent text-accent-foreground font-black uppercase tracking-widest hover:bg-accent/95 shadow-(--shadow)">
        <Download className="w-4 h-4 mr-2" />
        Download CV
      </Button>
    </div>

    {/* Code Snippet Visual */}
    <div className="mt-5 relative">
      <div className="bg-[#101114] overflow-hidden border-4 border-border shadow-[4px_4px_0_0_#000]">
        <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-border/70">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-muted-foreground">main.py</span>
        </div>
        <div className="p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-muted-foreground">
            <code>
              <span className="text-blue-400">from</span>{' '}
              <span className="text-green-400">fastapi</span>{' '}
              <span className="text-blue-400">import</span>{' '}
              <span className="text-yellow-400">FastAPI</span>
              {'\n'}
              <span className="text-blue-400">from</span>{' '}
              <span className="text-green-400">pydantic</span>{' '}
              <span className="text-blue-400">import</span>{' '}
              <span className="text-yellow-400">BaseModel</span>
              {'\n'}
              {'\n'}
              <span className="text-white">app</span>{' '}
              <span className="text-white">=</span>{' '}
              <span className="text-yellow-400">FastAPI</span>
              <span className="text-white">()</span>
              {'\n'}
              {'\n'}
              <span className="text-blue-400">class</span>{' '}
              <span className="text-green-400">Developer</span>
              <span className="text-white">(</span>
              <span className="text-yellow-400">BaseModel</span>
              <span className="text-white">):</span>
              {'\n'}
              {'    '}
              <span className="text-white">name</span>
              <span className="text-white">:</span>{' '}
              <span className="text-yellow-400">str</span>
              {'\n'}
              {'    '}
              <span className="text-white">skills</span>
              <span className="text-white">:</span>{' '}
              <span className="text-yellow-400">list</span>
              <span className="text-white">[</span>
              <span className="text-yellow-400">str</span>
              <span className="text-white">]</span>
              {'\n'}
              {'\n'}
              <span className="text-purple-400">@app.get</span>
              <span className="text-white">(</span>
              <span className="text-orange-400">{'"/"'}</span>
              <span className="text-white">)</span>
              {'\n'}
              <span className="text-blue-400">def</span>{' '}
              <span className="text-green-400">about_me</span>
              <span className="text-white">():</span>
              {'\n'}
              {'    '}
              <span className="text-blue-400">return</span>{' '}
              <span className="text-white">{'{'}</span>
              <span className="text-orange-400">{'"developer"'}</span>
              <span className="text-white">:</span>{' '}
              <span className="text-orange-400">{'"Giancarlos"'}</span>
              <span className="text-white">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  </section>
)
