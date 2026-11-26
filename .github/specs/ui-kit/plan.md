# Portfolio UI Kit Adoption Plan

Parent specification: [spec.md](./spec.md)

## Design

Adopt the library's `Container` and `SectionHeading` composition model for
major page sections. Keep hero and contact layouts content-specific, but align
their section spacing, title scale, eyebrow, and body-copy widths with the
shared hierarchy. Preserve the existing bilingual catalogs and theme tokens.

## Sequence

1. Wait for the library's additive composition API and build output.
2. Migrate representative major section headings to `SectionHeading`.
3. Apply the same heading and spacing recipe to remaining comparable sections.
4. Run app tests, lint, and build.
5. Add configurable Audiowide typography and translation catalog checks.
6. Browser-check mobile, tablet, and desktop widths in light, dark, and
   corporate themes; verify the font, carousel, translations, and onboarding.
7. Capture a performance baseline before proposing further optimizations.

## Risks

- Keep the initial hero visually prominent rather than forcing it into a
  standard section heading.
- Preserve section-specific layouts such as the two-column contact form.
- Avoid CSS overrides or repeated class combinations that bypass the kit.

## Rollback

Revert only migrated section composition; retain the shared library changes and
its public API.
