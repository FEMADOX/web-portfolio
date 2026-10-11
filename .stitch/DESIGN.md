---
name: Giancarlos Gonzalez Portfolio
colors:
  surface: '#F5EDE9'
  surface-container: '#EBE7E0'
  surface-muted: '#E4E1DA'
  on-surface: '#181818'
  on-surface-variant: '#484848'
  outline: '#222222'
  primary: '#181818'
  on-primary: '#FFFFFF'
  accent: '#FCCA21'
  on-accent: '#181818'
  secondary: '#F53E36'
  skill-red: '#B91C1C'
  project-blue: '#1D4ED8'
  error: '#DB0002'
  dark-surface: '#030303'
  dark-surface-container: '#070707'
  dark-on-surface: '#EEEEEE'
  dark-accent: '#FAC547'
---

# Design System: Giancarlos Gonzalez Portfolio

## 1. Visual Theme & Atmosphere

A single-page developer portfolio and CV with a high-contrast, technical, neo-brutalist character. Warm paper surfaces and dark ink define light mode; near-black surfaces and amber define dark mode. Heavy rectangular outlines, hard offset shadows, uppercase headings and a developer-console hero frame information clearly.

Preserve the source content and section order: summary, skills, projects, education, contact. The imported screens represent the current working tree, including uncommitted work.

## 2. Color Palette & Roles

Hex values above approximate active OKLCH tokens in `src/app/globals.css`; the imported HTML retains the exact source tokens. Warm Paper (#F5EDE9) is the light background; Sand (#EBE7E0) is the card surface; Ink (#181818) is foreground and primary control color. Yellow (#FCCA21) marks active navigation and actions. Skill headers use red (#B91C1C), project headers blue (#1D4ED8).

Dark mode uses Near Black (#030303), Charcoal (#070707), Paper White (#EEEEEE), and Golden Amber (#FAC547). Outline (#222222) frames surfaces; soft charcoal (#484848) supports secondary light text. Destructive red (#DB0002) is a functional error token; code editor dots use red, yellow and green.

## 3. Typography Rules

Declared stacks: Geist / Geist Fallback / system-ui for sans text; Geist Mono / monospace for code. Source does not explicitly load Geist, so imported screenshots may use the system fallback.

Hero: 36px base, 48px at 480px, 60px at 640px, weight 900, uppercase, tight tracking. Section headers: 18px, weight 900, uppercase, wide tracking. Project titles: 24px weight 900. Descriptions: 14px with relaxed line height. Code: 14px monospace. Labels and chips: 9–12px, heavy uppercase lettering. Hero text uses a nonstandard `text-md` token at base and 18px at `xs`; do not assume a verified base size.

## 4. Component Stylings

Buttons are square, yellow, outlined by 2px dark strokes, with heavy tracked labels; download action is 48px tall. Hero frames use 4px strokes and a 4px hard shadow. Project and education cards use 2px outlines and little or no rounding; project cards carry narrow colored rails, dates, technologies, descriptions and source links.

Desktop navigation is a fixed profile sidebar with five section controls, CV action, and floating upper-right theme/language controls. Mobile has a header and fixed five-item bottom navigation with scroll progress. Form labels are compact uppercase text; inputs and textarea are square and outlined, beside contact links on larger screens.

The dark main.py editor with typing animation is a signature component. Skills appear as icon/label tiles grouped into Backend, Frontend, and Extras. Project rails cycle yellow/red/blue. Captures freeze animation at one moment.

## 5. Layout Principles

Desktop sidebar is 296px (`w-74`); main offset is 288px (`lg:ml-72`) with a centered 1024px maximum content width. Spacing follows a 4px base rhythm; major sections use 80px vertical margins and cards often 20px internal padding. Main horizontal padding is 8px base, 24px at 640px, 40px at 1024px.

Custom xs breakpoint: 480px. Default sm/md/lg: 640/768/1024px. At lg the desktop sidebar and dock appear; narrow widths use the mobile shell. Headings and copy are left-aligned; section titles pair with small right-side code labels. Preserve these proportions in reference recreation.

## 6. Design System Notes for Stitch Generation

Use language such as warm paper, dark ink, amber accents, squared cards, heavy outlines, hard shadows, tracked labels, and developer-console details. Start from imported screens when creating alternatives. Preserve factual biography, skills, education, project details, dates, URLs and locale-specific text. Do not invent experience, metrics, testimonials, portraits or credentials.

Example directions: recreate the responsive sidebar and mobile navigation; improve hierarchy in the framed hero and code editor; explore project-card spacing while retaining its dates, badges, descriptions and links. Create future redesign proposals separately from imported references.

Source evidence: src/app/globals.css; src/components/PortfolioDocument.tsx; src/components/cv/CVPage.tsx; src/components/cv/sections/hero; src/components/cv/sections/project; src/components/cv/sections/contact.
