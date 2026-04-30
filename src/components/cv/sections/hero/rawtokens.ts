type RawToken = { text: string; className: string }
type Token = RawToken & { id: string }

const blue = 'text-blue-400'
const green = 'text-green-400'
const yellow = 'text-yellow-400'
const purple = 'text-purple-400'
const orange = 'text-orange-400'

const RAW_TOKENS: RawToken[] = [
  { text: 'from', className: blue },
  { text: ' ', className: '' },
  { text: 'fastapi', className: green },
  { text: ' ', className: '' },
  { text: 'import', className: blue },
  { text: ' ', className: '' },
  { text: 'FastAPI', className: yellow },
  { text: '\n', className: '' },
  { text: 'from', className: blue },
  { text: ' ', className: '' },
  { text: 'pydantic', className: green },
  { text: ' ', className: '' },
  { text: 'import', className: blue },
  { text: ' ', className: '' },
  { text: 'BaseModel', className: yellow },
  { text: '\n\n', className: '' },
  { text: 'app', className: 'text-white' },
  { text: ' = ', className: 'text-white' },
  { text: 'FastAPI', className: yellow },
  { text: '()', className: 'text-white' },
  { text: '\n\n', className: '' },
  { text: 'class', className: blue },
  { text: ' ', className: '' },
  { text: 'Developer', className: green },
  { text: '(', className: 'text-white' },
  { text: 'BaseModel', className: yellow },
  { text: '):', className: 'text-white' },
  { text: '\n    ', className: '' },
  { text: 'name', className: 'text-white' },
  { text: ': ', className: 'text-white' },
  { text: 'str', className: yellow },
  { text: '\n    ', className: '' },
  { text: 'skills', className: 'text-white' },
  { text: ': ', className: 'text-white' },
  { text: 'list', className: yellow },
  { text: '[', className: 'text-white' },
  { text: 'str', className: yellow },
  { text: ']', className: 'text-white' },
  { text: '\n\n', className: '' },
  { text: '@app.get', className: purple },
  { text: '(', className: 'text-white' },
  { text: '"/"', className: orange },
  { text: ')', className: 'text-white' },
  { text: '\n', className: '' },
  { text: 'def', className: blue },
  { text: ' ', className: '' },
  { text: 'about_me', className: green },
  { text: '() -> ', className: 'text-white' },
  { text: 'dict', className: yellow },
  { text: '[', className: 'text-white' },
  { text: 'str', className: yellow },
  { text: ', ', className: 'text-white' },
  { text: 'str', className: yellow },
  { text: ']:', className: 'text-white' },
  { text: '\n    ', className: '' },
  { text: 'return', className: blue },
  { text: ' {', className: 'text-white' },
  { text: '"developer"', className: orange },
  { text: ': ', className: 'text-white' },
  { text: '"Giancarlos"', className: orange },
  { text: '}', className: 'text-white' }
]

// Stable keys derived at module load time — not at render time
export const CODE_TOKENS: Token[] = RAW_TOKENS.map((t, i) => ({
  ...t,
  id: `token-${i}`
}))
export const TOTAL_CHARS = CODE_TOKENS.reduce(
  (sum, t) => sum + t.text.length,
  0
)
