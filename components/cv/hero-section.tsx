"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function HeroSection() {
  return (
    <section id="summary" className="pt-6 pb-12 lg:pt-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          <span className="text-foreground">WEB</span>
          <br />
          <span className="text-foreground">DEVELOPER</span>
        </h1>
      </div>

      {/* Summary */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl">
        Back-end python developer using Django and FastAPI with strong bases in Frontend Dev with
        TypeScript, React and NextJS...
      </p>

      {/* Download CV Button */}
      <Button 
        variant="outline" 
        className="border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-full px-6 py-2 text-sm font-medium"
      >
        <Download className="w-4 h-4 mr-2" />
        DOWNLOAD CV
      </Button>

      {/* Code Snippet Visual */}
      <div className="mt-10 relative">
        <div className="bg-[#1a1a2e] rounded-lg overflow-hidden border border-border/50">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[10px] text-muted-foreground">main.py</span>
          </div>
          <div className="p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-muted-foreground leading-relaxed">
              <code>{`// Backend infrastructure
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Developer(BaseModel):
  name: str
  skills: list[str]

@app.get("/")
def about_me():
  return {"dev": "Giancarlos"}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
