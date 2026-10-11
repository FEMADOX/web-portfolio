# Web-Portfolio import brief

Import the existing Giancarlos Gonzalez developer portfolio as reference material for future design exploration. Preserve all source facts, URLs, dates, technologies and localized content.

Routes: /en (English), /es (Spanish), /pt (Brazilian Portuguese). / is the English entry route. Each locale has four reference states: desktop 1440x1000 and mobile 390x844, in light and dark themes. The imported HTML is static and represents visual states; it does not migrate the Next.js runtime, server APIs or email service.

Sections: summary with developer profile and main.py code editor; skills grouped Backend/Frontend/Extras; three projects (FastAPI Ecosystem Lab, Django E-commerce Platform, Social Bookmarking Platform); education and languages; contact links and name/email/message form; social/source footer. Preserve the existing data and CV-download destinations. Do not add unverified personal claims or supporting imagery.

The desktop shell uses a fixed sidebar and floating control dock; mobile uses a header and five-item bottom navigation. Both have theme and language controls. Exact styles and inline logo assets are carried by the HTML; DESIGN.md describes the shared visual system.

All five sections were loaded by scrolling before capture. Capture scripts remove development overlays and scripts and inline styles/assets. Fonts may resolve to system fallbacks. The code-window typing animation is frozen in each reference. Localized text is preserved as rendered, including any existing source issues.

Historical capture exception (2026-10-08): Footer.tsx imported server-only cacheLife through a client component at capture time. A temporary copy substituted the displayed year with 2026 so screenshots could render; the original application files were preserved. The application now calculates the year in a cached server helper and distributes it through a client context. Captures remain historical visual references. Snapshot preparation did not copy environment credentials.

For future proposals, use the imported screens to explore hierarchy, spacing, project storytelling and responsive composition. Treat the proposal as a separate design. Do not change personal facts, credentials, metrics, testimonials, or contact destinations.
