type RawToken = { text: string; className: string }
type Token = RawToken & { id: string }

const blue = 'text-blue-400'
const green = 'text-green-400'
const yellow = 'text-yellow-400'
const purple = 'text-purple-400'
const orange = 'text-orange-400'
const white = 'text-white'

const RAW_TOKENS: RawToken[] = [
  { text: 'from', className: blue },
  { text: ' ', className: '' },
  { text: 'fastapi', className: green },
  { text: ' ', className: '' },
  { text: 'import', className: blue },
  { text: ' ', className: '' },
  { text: 'FastAPI\n', className: yellow },
  { text: 'from', className: blue },
  { text: ' ', className: '' },
  { text: 'pydantic', className: green },
  { text: ' ', className: '' },
  { text: 'import', className: blue },
  { text: ' ', className: '' },
  { text: 'BaseModel\n\n', className: yellow },
  { text: 'app = ', className: white },
  { text: 'FastAPI', className: yellow },
  { text: '()\n\n', className: white },
  { text: 'class', className: blue },
  { text: ' ', className: '' },
  { text: 'Developer', className: green },
  { text: '(', className: white },
  { text: 'BaseModel', className: yellow },
  { text: '):\n\tname:', className: white },
  { text: 'str\n', className: yellow },
  { text: '\tskills: ', className: white },
  { text: 'list', className: yellow },
  { text: '[', className: white },
  { text: 'str', className: yellow },
  { text: ']\n\n', className: white },
  { text: '@app.get', className: purple },
  { text: '(', className: white },
  { text: '"/"', className: orange },
  { text: ')\n', className: white },
  { text: 'def', className: blue },
  { text: ' ', className: '' },
  { text: 'about_me', className: green },
  { text: '()  -> ', className: white },
  { text: 'dict', className: yellow },
  { text: '[', className: white },
  { text: 'str', className: yellow },
  { text: ', ', className: white },
  { text: 'str', className: yellow },
  { text: ']:\n', className: white },
  { text: '\treturn', className: blue },
  { text: ' {', className: white },
  { text: '"developer"', className: orange },
  { text: ': ', className: white },
  { text: '"Giancarlos"', className: orange },
  { text: '}', className: white }
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
