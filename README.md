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
pnpm tsc           # Type-check (tsgo)
pnpm lint          # Biome lint
pnpm lint:fix      # Biome lint with fixes
pnpm format        # Biome format (write)
pnpm format:check  # Biome format check
pnpm check         # Biome check
pnpm check:fix     # Biome check with fixes
```

## Main Features

- App Router portfolio page with responsive desktop/mobile navigation.
- Section-aware scrolling with active state for: `summary`, `skills`, `projects`, `education`, `contact`.
- Language toggle with persisted locale in `localStorage` (`en` / `es`).
- CV download by locale through API endpoints.
- Dynamic logo delivery by color through API endpoints.
- Contact form submission via server action and Resend.
- Vercel Analytics and Speed Insights in production.

## API Endpoints

- `GET /api/cv/en` and `GET /api/cv/es`: Download CV file by language.
- `HEAD /api/cv/:lang`: Warm-up/metadata check for CV availability.
- `GET /api/logo/black` and `GET /api/logo/white`: Download logo assets by theme color.

## Environment Variables

Use the `.env.example` file with:

```bash
# Contact form (Resend)
RESEND_API_KEY=

# Vercel Blob access
BLOB_READ_WRITE_TOKEN=

# CV blobs
NEXT_PUBLIC_CV_EN=
NEXT_PUBLIC_CV_ES=
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
- CV file source constants: `src/components/constants.ts`
- API handlers:
  - `src/app/api/cv/[lang]/route.ts`

## License

The source code of this project is licensed under the MIT License. See the `LICENSE` file for details.

Personal content and branding assets, including CV files, logos, images, text content, and portfolio materials, are not included under the MIT License and remain All Rights Reserved unless explicitly stated otherwise.
