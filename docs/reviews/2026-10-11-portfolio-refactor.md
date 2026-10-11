# Portfolio refactor review

The review covered the complete working-tree refactor, the theme initialization
change, workspace configuration and local Stitch artifacts.

## Findings addressed

- The entry route had lost metadata when exports moved out of PortfolioDocument.
  Both root layouts now share document metadata and viewport configuration.
- The entry route rendered CVPage without language/year providers. It now uses
  the same server-provider composition as localized pages.
- Context defaults hid missing providers and fixed the root copyright to 2026.
  Undefined defaults now activate the existing missing-provider checks.
- A cached year used the max profile, which revalidates every 30 days. The hours
  profile limits rollover staleness and keeps year reads out of the client graph.
- CV route parameters were typed as an already validated Lang. They now accept
  strings and use isLang before indexing the localized CV files.
- Manual language switching had changed from push to replace during extraction.
  push is preserved for user navigation; automatic entry redirects use replace.
- Biome included transient design state and generated Next declarations. Those
  files are excluded, and changed application files were formatted.

## Architecture

Server providers obtain the current year and pass validated route languages to
client providers. CVPage consumes language context, Footer consumes year context,
and education components share the same language provider. Navigation and scroll
hooks preserve the existing behavior. Theme initialization uses an executable
script during server rendering and a text/plain script during client rendering.

## Validation

The combined branch stack passes TypeScript, Biome and a production build.
Playwright checks cover localized content and footer output, document language,
desktop/mobile layout, theme/language controls, manifests and CV endpoints.
Invalid language requests retain their error responses. No contact forms were
submitted. Generated browser logs stay local.

## Scope and limits

The four PR groups are workspace configuration, application refactor, theme
initialization and curated design documentation. The design PR contains six final
HTML/PNG pairs and supporting design documents, rather than local API state or
third-party screenshots. It does not implement a project-detail route.

The existing Next configuration still skips build-time type checking; a separate
TypeScript check was run. Existing CI checks Biome on source, so build and
TypeScript validation are recorded here independently. Year caching can briefly
retain the prior year near January 1; it does not update an already open browser
tab automatically.
