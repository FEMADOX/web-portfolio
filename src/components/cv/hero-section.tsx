'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="summary" className="pt-4 pb-16 lg:pt-8">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-foreground">Web</span>
          <br />
          <span className="text-accent">Developer.</span>
        </h1>
        <div className="w-12 h-1 bg-accent mt-4" />
      </div>

      {/* Summary */}
      <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
        Back-end python developer using Django and FastAPI with strong bases in
        Frontend Dev with TypeScript, React and NextJS focusing on delivering
        impactful results, eager to tackle dynamic challenges and write
        efficient code to build robust websites, demonstrated proficiency in
        project management, project problem-solving, and fluid collaboration
        across partners. Skilled in learning and applying the latest
        technologies that revolutionize the technology market and methodologies
        to streamline processes and elevate clients satisfaction.
      </p>

      {/* Download CV Button - Mobile */}
      <Button className="lg:hidden bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6">
        <Download className="w-4 h-4 mr-2" />
        Download CV
      </Button>

      {/* Code Snippet Visual */}
      <div className="mt-12 relative">
        <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-border">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
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
                <span className="text-yellow-400">app</span>{' '}
                <span className="text-foreground">=</span>{' '}
                <span className="text-yellow-400">FastAPI</span>
                <span className="text-foreground">()</span>
                {'\n'}
                {'\n'}
                <span className="text-blue-400">class</span>{' '}
                <span className="text-green-400">Developer</span>
                <span className="text-foreground">(</span>
                <span className="text-yellow-400">BaseModel</span>
                <span className="text-foreground">):</span>
                {'\n'}
                {'    '}
                <span className="text-foreground">name</span>
                <span className="text-foreground">:</span>{' '}
                <span className="text-yellow-400">str</span>
                {'\n'}
                {'    '}
                <span className="text-foreground">skills</span>
                <span className="text-foreground">:</span>{' '}
                <span className="text-yellow-400">list</span>
                <span className="text-foreground">[</span>
                <span className="text-yellow-400">str</span>
                <span className="text-foreground">]</span>
                {'\n'}
                {'\n'}
                <span className="text-purple-400">@app.get</span>
                <span className="text-foreground">(</span>
                <span className="text-orange-400">{'"/"'}</span>
                <span className="text-foreground">)</span>
                {'\n'}
                <span className="text-blue-400">def</span>{' '}
                <span className="text-green-400">about_me</span>
                <span className="text-foreground">():</span>
                {'\n'}
                {'    '}
                <span className="text-blue-400">return</span>{' '}
                <span className="text-foreground">{'{'}</span>
                <span className="text-orange-400">{'"developer"'}</span>
                <span className="text-foreground">:</span>{' '}
                <span className="text-orange-400">{'"Giancarlos"'}</span>
                <span className="text-foreground">{'}'}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
