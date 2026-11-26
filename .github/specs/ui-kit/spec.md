# Portfolio UI Kit Adoption Specification

Status: In progress

## Context

The portfolio uses the shared `satoshi-rc-ui` library, but several sections
still define heading hierarchy and vertical spacing independently. The
portfolio should demonstrate the library's shared composition model instead of
creating local design conventions.

## Goals

- Give major sections a consistent heading hierarchy, content width, and
  responsive spacing.
- Keep Spanish and English copy readable and balanced.
- Use the library's theme tokens and shared components as the source of visual
  behavior.
- Establish repeatable specification and QA steps for future UI improvements.

## Requirements

### PORT-UI-REQ-01: Shared composition

Major content sections use the library's `Container` and `SectionHeading`
primitives for width, responsive insets, title, eyebrow, subtitle, and action
alignment where appropriate.

### PORT-UI-REQ-02: Consistent content rhythm

Related sections use a consistent vertical rhythm and readable text width.
Decorative badges, section copy, cards, and actions have a predictable visual
order. Page-specific layout may vary when the content requires it.

### PORT-UI-REQ-03: Localization and theme

All visible copy remains in the Spanish and English catalogs. Theme-aware
surfaces and text use library/DaisyUI semantic tokens; no application-wide CSS
overrides are introduced to imitate shared components.

### PORT-UI-REQ-04: Responsive behavior

At 320, 390, 768, 1024, and 1440 CSS pixels, section headings and actions remain
readable and reachable without horizontal overflow. Both light and dark themes
remain coherent.

### PORT-UI-REQ-05: Functional regression coverage

The portfolio's links, carousel, contact flow, and privacy/tour onboarding
continue to work after visual composition changes.

### PORT-UI-REQ-06: Configurable typography

The SPA uses Audiowide Regular by default. A single app-level font-family token
allows consumers to select another font without changing shared component
styles. External font loading uses a non-blocking display strategy.

### PORT-UI-REQ-07: Translation and theme QA

Spanish and English catalog leaf keys stay in sync, and every statically
referenced app key exists in both catalogs. QA exercises light, dark, and
corporate themes on mobile and desktop.
Unused portfolio-owned catalog labels are removed after dynamic key usage is
expanded; shared-library catalog keys are not treated as app orphans.

### PORT-UI-REQ-08: Evidence-based performance

Performance work starts with a measured baseline and targets an observed
bottleneck. Avoid speculative optimization and dependencies.

## Acceptance criteria

- The major section headings follow one shared visual hierarchy.
- No untranslated keys or missing Spanish/English copy appear.
- No horizontal overflow occurs at the specified widths.
- Build, lint, and app tests pass; the linked library component tests pass.
- The default font renders as Audiowide and can be changed through one CSS
  variable.
- Translation tests reject catalog drift and missing app keys.
- The translation validator rejects unused portfolio-owned labels.
- Mobile, tablet, and desktop QA checks all three configured themes.

## Dependency

The shared component contract is specified in the library's UI kit
specification. This project consumes its built output and owns only page
composition and content.

## Related

- [Implementation plan](./plan.md)
- [Tasks](./tasks.md)
