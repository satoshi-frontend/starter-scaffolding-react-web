---
name: portfolio-ux-responsive-qa
description: "Use when: improving or QA testing the Satoshi portfolio UI, responsive layouts, copy alignment, mobile/tablet/desktop behavior, onboarding, privacy flow, carousel, or visual consistency with satoshi-rc-ui."
---

# Portfolio UX and Responsive QA

Improve the Satoshi portfolio as a coherent, bilingual product, using the
shared `satoshi-rc-ui` components for reusable UI and themes.

## Workflow

1. Read `.github/specs/ui-kit/spec.md`, `plan.md`, and `tasks.md`; update the
   acceptance criteria or tasks before changing the visual contract.
2. Read the relevant section of `src/app/presentation/App.tsx`, both locale
   files, and the shared component API before changing UI.
3. Keep content in `src/assets/i18n/locales/es.json` and `en.json`. Avoid raw
   translation keys and verify both languages after adding visible text.
4. Use library components and DaisyUI theme tokens. Keep deliberate app-level
   typography configurable through `--app-font-family`; do not add local
   overrides that make shared components visually inconsistent.
5. Make layout and action hierarchy intentional at narrow widths first; check
   text wrapping, control reachability, section spacing, overlays, and horizontal
   overflow before polishing desktop.
6. Verify the full interaction path, not only component rendering. For privacy
   onboarding, configuring must keep consent open; saving any choice enables
   the tour; the guide highlights one section and blocks interaction elsewhere.
7. Treat translation QA as mandatory: run `npm run validate:translations` or
   `npm test` (which runs the validator first). This compares Spanish and
   English leaf-key sets, verifies app references, and rejects unused
   portfolio catalog entries. Remove invalid key references and confirmed
   orphans rather than shipping missing or stale labels; preserve library-owned
   entries.
8. Test all three configured themes (light, dark, and corporate) for actual
   activation and readable, consistent surfaces, text, controls, and overlays.
9. Run targeted tests, `npm run lint:check`, and `npm run build`. Run every
   shell command in Bash (Git Bash on Windows, Bash on Linux); never use
   Windows CMD, PowerShell, `.bat`/`.cmd` scripts, or their exclusive syntax.
   Visual QA is
   mandatory on mobile and desktop: check 320 and 390 CSS pixels for mobile,
   1024 and 1440 for desktop, and 768 for tablet, with no horizontal overflow.
   Exercise at least one complete user flow on mobile and desktop.
10. For performance changes, record a baseline first, inspect build output and
    loading behavior, and optimize the measured bottleneck. Prefer lazy loading
    and responsive image delivery, font preconnect/preload only when appropriate,
    and `font-display: swap`; avoid speculative memoization or new dependencies.
11. Mark spec tasks complete only after matching test or browser evidence.
    Record newly verified, reusable findings in this skill. Keep ideas that
    still need product decisions or broader validation under improvement
    opportunities instead of treating them as established defects.

## Verified Project Learnings

- The privacy panel and guided tour both use modal overlays; the app gates the
  first automatic tour on a saved, valid privacy preference to prevent overlap.
- The tour curtain uses theme content color so it darkens light themes and
  lightens dark themes. The highlighted section is stacked above the curtain;
  other page content remains blocked by it.
- Components and theme selection come from `satoshi-rc-ui`; keep app-specific
  work to composition, copy, and behavior unless the shared component is missing
  a general capability.
- The carousel should honor reduced-motion preferences and be tested for manual
  navigation, autoplay, and pause behavior.
- Major page sections compose the library `Container` and `SectionHeading`;
  visual heading size is independent of semantic heading level.
- The app translation QA can compare the Spanish and English leaf-key sets and
  statically validate keys referenced in `App.tsx`; dynamically composed keys
  are explicitly expanded by the validator. It also rejects unused app-owned
  portfolio catalog keys; library-owned keys remain outside that cleanup.
- The app offers exactly three themes: light, dark, and corporate. Verify each
  is applied in the browser rather than relying only on selector labels.
- `--app-font-family` in `src/style.css` is the single app-level font-family
  setting. Audiowide is loaded with `display=swap` and preconnected font origins.
- Audiowide's wider glyph metrics exposed 320px overflow in the carousel,
  contact section, and FAQ. Wrap carousel controls, allow long divider text to
  wrap, and use `min-w-0` on grid children where intrinsic text width can expand
  the layout.
- Carousel autoplay must also pause when the document is hidden
  (`visibilitychange`), not only on hover/focus/reduced-motion; otherwise the
  interval keeps burning CPU in background tabs. Test it by mocking
  `document.hidden` and dispatching the event.
- Unsplash images need `decoding="async"` (and `fetchPriority="high"` only on
  the hero LCP image); lazy-loaded grid images already have `loading="lazy"`
  plus an `aspect-[4/3]` figure that reserves space and prevents CLS.
- The library's `LanguageSelector` resolves its labels through the translation
  context with `language.*` default keys (`select`, `listLabel`,
  `searchPlaceholder`, `empty`, `selected`); the app locales must define them
  or the trigger renders the raw key. The translation validator catches
  missing keys only if some source references them, so add the keys together
  with any component upgrade that introduces them.
- After replacing the library tarball, force-reinstall
  (`npm install ./resource/<tgz> --force`) and clear `node_modules/.vite`:
  npm can keep the old extracted package and Vite's dep optimizer can serve a
  stale pre-bundle, making verified library fixes invisible in the browser.

## Improvement Opportunities

- Recheck overlay placement against very short landscape viewports and device
  safe areas when making changes to modal dimensions or button labels.
- Consider adding a focus trap and restoring keyboard focus when modal overlays
  close; verify compatibility with the library's existing accessibility
  patterns before implementing.
- Keep screenshots or browser notes tied to the exact viewport and theme so
  visual regressions can be reproduced.
