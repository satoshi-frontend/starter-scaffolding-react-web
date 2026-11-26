# Portfolio UI Kit Adoption Tasks

Parent: [Portfolio UI Kit Adoption Specification](./spec.md)

- [x] Review page sections and existing library composition primitives.
- [x] Adopt the shared section heading API in comparable portfolio sections.
- [x] Normalize section spacing and text widths without changing page content.
- [x] Verify Spanish and English copy and theme behavior.
- [x] Run app tests, lint, and production build.
- [x] Browser-check mobile, tablet, desktop, carousel, and onboarding flows.
- [x] Set Audiowide as the configurable default SPA font.
- [x] Add automated locale parity, app-key existence, and orphan-key checks.
- [x] Browser-check all three themes and font loading on mobile and desktop.
- [x] Capture a repeatable production build and font-loading baseline.

Validation evidence: the translation validator passed with 249 matching locale
keys, 134 static app references, and no unused portfolio keys. Browser QA
confirmed Audiowide loaded and configurable, no overflow from 320 to 1440 CSS
pixels, and matching theme tokens in light, dark, and corporate modes at mobile
and desktop widths. Audiowide's intrinsic width also exposed and led to fixes
for narrow carousel, contact, and FAQ layouts.

Production baseline: `npm run build` completed in 10.75 seconds. The app bundle
was 329.66 kB (99.22 kB gzip), CSS was 197.63 kB (29.74 kB gzip), and the
loaded Audiowide WOFF2 decoded to 14,132 bytes in browser QA.
