---
description: "Use when: writing portfolio specs, plans, tasks, performance work, translation validation, theme QA, or responsive UI changes."
name: "Spec-Driven Portfolio and Performance"
applyTo: ".github/specs/**/*.md"
---

# Spec-Driven Portfolio and Performance

- Read the related spec, plan, tasks, app instructions, affected source, locale
  catalogs, shared component API, and tests before editing.
- Define observable acceptance criteria and an ordered plan before changing
  visible behavior. Track dependencies and evidence in the task list.
- Keep all visible portfolio copy in the Spanish and English JSON catalogs.
  Avoid raw translation keys and preserve the shared UI kit as the source of
  reusable component styling.
- Use Bash for all terminal commands (Git Bash on Windows, Bash on Linux).
  Never use Windows CMD, PowerShell, `.bat`/`.cmd` scripts, or their
  exclusive syntax; if a command fails, diagnose and fix it in Bash.
- Translation QA is strict: compare all Spanish and English leaf keys, check
  every static app translation-key reference against both catalogs, and remove
  invalid key references rather than shipping missing labels. Remove orphaned
  app-owned JSON entries after checking dynamic keys; preserve keys consumed by
  the shared library.
- Test actual light, dark, and corporate theme application, including readable
  text, surfaces, controls, and overlays. Selector labels alone are not proof.
- Mobile and desktop QA are mandatory: use 320/390 CSS pixels for mobile,
  1024/1440 for desktop, and 768 for tablet. Check horizontal overflow, text
  wrapping, controls, and one complete user flow on mobile and desktop.
- The app font is configurable through `--app-font-family`; preserve this token
  and non-blocking font loading when changing typography.
- Measure a performance baseline before optimizing. Prioritize observed costs
  such as image/font loading or unnecessary work; avoid speculative
  memoization and dependencies.
- Run `npm run lint:check`, `npm test -- --runInBand`, and `npm run build`.
  Run `npm run validate:kit` after editing `.github` skills, instructions, or
  specs. Mark tasks complete only with evidence from these commands or browser
  checks.
