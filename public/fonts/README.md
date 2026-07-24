# Fonts

Production should self-host **Space Grotesk** and **Inter** as `.woff2`.

Phase 1 uses `@fontsource/space-grotesk` and `@fontsource/inter` (bundled) so the foundation builds without manual font files.

Optional: drop woff2 files here and switch `src/styles/base/fonts.css` to local `/fonts/*` preloads already referenced in `index.html`.
