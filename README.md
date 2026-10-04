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
- English, Spanish, and Brazilian Portuguese at `/en`, `/es`, and `/pt`. The home route uses the first supported browser language, while a manually selected language is saved and takes priority on later visits.
- Localized page titles, descriptions, social metadata, manifests, and a multilingual sitemap.
- CV downloads for English, Portuguese, and Spanish, served from the public `public/cv/` directory.
- Dynamic logo delivery by color through API endpoints.
- Contact form submission via server action and Resend.
- Vercel Analytics and Speed Insights in production.

## API Endpoints

- `GET /api/cv/en`, `/api/cv/pt`, and `/api/cv/es`: Redirect to the corresponding downloadable PDF in `public/cv/`.
- `HEAD /api/cv/:lang`: Lightweight compatibility check for CV downloads.
- `GET /api/manifest/en`, `/api/manifest/es`, and `/api/manifest/pt`: Localized web app manifests.
- `GET /api/logo/black` and `GET /api/logo/white`: Download logo assets by theme color.

## Environment Variables

Use the `.env.example` file with:

```bash
# Contact form (Resend)
RESEND_API_KEY=

```

## Project Structure

```text
src/
 app/            # App Router pages, layouts, globals
 components/     # UI and portfolio sections
 hooks/          # Custom React hooks
 lib/            # Shared utilities
 public/cv/      # Public downloadable CV PDFs
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
