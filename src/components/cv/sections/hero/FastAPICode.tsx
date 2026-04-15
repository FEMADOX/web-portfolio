export const FastAPICode = () => (
  <div className="mt-5 relative">
    <div className="bg-[#101114] overflow-hidden border-4 border-border shadow-normal">
      <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-border/70">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-200">main.py</span>
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
            <span className="text-white">
              () -{'>'} <span className="text-yellow-400">dict</span>[
              <span className="text-yellow-400">str</span>,{' '}
              <span className="text-yellow-400">str</span>]
            </span>
            <span className="text-white">:</span>
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
)
