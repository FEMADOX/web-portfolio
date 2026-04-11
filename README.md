# Web Portfolio

A modern personal portfolio to showcase projects, skills, and contact details.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Biome (linting, formatting, import organization)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
pnpm dev           # Start dev server
pnpm build         # Production build
pnpm start         # Start production server
pnpm lint          # Biome lint
pnpm lint:fix      # Biome lint with fixes
pnpm format        # Biome format (write)
pnpm format:check  # Biome format check
pnpm check         # Biome check
pnpm check:fix     # Biome check with fixes
```

## Project Structure

```text
src/
 app/            # App Router pages, layouts, globals
 components/     # UI and portfolio sections
 hooks/          # Custom React hooks
 lib/            # Shared utilities
 styles/         # Global style assets
```

## Notes

- Main route entry: `src/app/page.tsx`
- Path alias `@/*` points to `src/*`
