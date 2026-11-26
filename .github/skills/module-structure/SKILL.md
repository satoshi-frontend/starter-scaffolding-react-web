---
name: module-structure
description: "Use when: creating or refactoring a feature module in the presentation layer of this scaffold, adding a new page or section, writing or moving tests, or deciding where constants, data, hooks, interfaces, types, utils, components, layout and test files belong."
---

# Module Structure

Every feature module under `src/app/presentation/` follows the same tree, and
every test lives centralized under `src/test/` mirroring `src/`. Apply both
before writing any file of a new module.

## Mandatory module tree

```text
src/app/presentation/<module>/
	index.ts            (barrel: re-exports core, page, ui)
	core/               (logic without JSX, except hero-style helpers)
		constants/      (module constants: <module>.constants.ts + index.ts)
		data/           (static catalogs: <name>.data.ts + index.ts)
		hooks/          (React hooks: use<Name>.ts + index.ts)
		interface/      (domain shapes: <module>.interface.ts + index.ts)
		types/          (module types: <module>.types.ts + index.ts)
		utils/          (pure helpers: <name>.utils.ts(x) + index.ts)
		index.ts        (barrel: constants, data, hooks, interface, types, utils)
	page/               (screen composition)
		<module>-screen.tsx  (composes ui sections, owns shared state)
		index.ts
	ui/                 (presentation only)
		components/     (one folder per section: <Name>Section.tsx + index.ts)
		layout/         (SiteHeader.tsx, SiteFooter.tsx + index.ts)
		index.ts        (barrel: components, layout)
```

## Mandatory test tree (centralized, mirrors src/)

```text
src/test/
	helpers/            (environment helpers: matchMedia, storage reset)
	mocks/              (shared mocks: satoshi-rc-ui.mock.tsx + index.ts)
	setup/              (per-suite global setup if needed)
	app/                (mirrors src/app/)
		presentation/<module>/
			core/hooks/<name>.test.ts
			core/utils/<name>.test.ts(x)
			page/<module>-screen.test.tsx
	assets/             (mirrors src/assets/)
```

## Rules

1. **Barrels everywhere**: every module folder has an `index.ts`; components
   are re-exported with an explicit name (`export { HeroSection } from ...`).
2. **Barrel-only module alias, one import per file**: each module gets one
   alias `@<module>` registered in `tsconfig.json`, `vite.config.ts` and
   `jest.config.cjs` (e.g. `@portafolio` -> the module barrel `index.ts`).
   Consumers import named exports from the bare alias; never with sub-paths
   (`@portafolio/core/...` is forbidden) and never with two statements: value
   and type specifiers merge into ONE import using inline `type`
   (`import { A, type B } from "@portafolio"`). The module barrels must
   re-export everything public. Shared code uses `@assets/...`, `@i18n/...`,
   `@/test/...`. Only barrels may use sibling-relative paths (`./X`).
3. **Import direction**: `page -> ui -> core`; `ui` never imports from `page`;
   `core` never imports from `ui` or `page`.
4. **State ownership**: shared state (carousel, forms) lives in hooks inside
   `core/hooks`; the screen in `page/` composes and passes it down via props.
5. **Types**: prop interfaces live in `core/types` (`SectionProps` base with
   `t: Translate`); data shapes live in `core/interface`.
6. **Data**: translation keys and static catalogs live in `core/data`; never
   inline them in components.
7. **Tests centralized**: no test next to the source. A test of
   `src/app/presentation/<module>/core/hooks/useX.ts` lives at
   `src/test/app/presentation/<module>/core/hooks/useX.test.ts`. Import the
   code under test with aliases and shared mocks from `@/test/mocks`.
8. **Mock registration order**: call the mock helper BEFORE importing the
   module under test (helper calls are not hoisted like literal `jest.mock`).
9. **App.tsx stays thin**: it only resolves `useLanguage()` and renders the
   module screen; all markup belongs to the module.
10. **Quality gates**: `npm run type-check`, `npm run lint:check`,
    `npm test` and `npm run build` must pass; run
    `npm run validate:translations` after touching locale keys.
11. **Bash only for shell commands** (Git Bash on Windows, Bash on Linux):
    never Windows CMD, PowerShell, `.bat`/`.cmd` scripts, or their exclusive
    syntax; if a command fails, diagnose and fix it in Bash. Prefer `npm`
    over Windows-only executables such as `npm.cmd`.
