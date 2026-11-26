# Project Guidelines — starter-scaffolding-react-web

Scaffold de React + TypeScript + Vite 7 como vitrina de la librería `satoshi-rc-ui` (instalada localmente desde `resource/satoshi-rc-ui-1.1.1.tgz`).

## ⛔ Reglas estrictas de Git (NO NEGOCIABLES)

El agente **NUNCA** debe ejecutar comandos que modifiquen el historial o el remoto. Prohibido:

- `git commit`, `git push`, `git merge`, `git rebase`, `git cherry-pick`
- `git tag`, `git branch -D`, `git push --force` (ni `--force-with-lease`)
- `git reset --hard`, `git checkout -- .`, `git restore .`, `git clean -fd` (destruyen trabajo)
- `gh pr create`, `gh pr merge`, `gh release create`
- Cualquier comando que modifique `origin` o el estado de otros branches

**Sí está permitido:** `git status`, `git diff`, `git log`, `git show`, `git branch` (lectura), `git add` y `git stash` solo si el usuario lo pide explícitamente.

**Al terminar cambios:** deja el working tree listo, muéstrale al usuario el `git status`/`git diff` y SUGIERE el comando de commit/push para que él lo ejecute. Nunca lo ejecutes por tu cuenta, ni siquiera si parece obvio que "toca commitear".

## Code Style

- TypeScript estricto (`strict`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`: usa `import type` para tipos).
- Componentes con retorno tipado explícito: `(): JSX.Element`.
- Comentarios JSDoc en español con `@description`, `@author Steveen Cues`, `@version` siguiendo el patrón de los archivos existentes. **La documentación se genera con JSDoc**: todo export público (funciones, clases, componentes, interfaces, tipos, constantes exportadas) debe llevar su bloque JSDoc con `@description`, y `@param`/`@returns` cuando aplique (sin tipos inline: TypeScript ya los infiere). La regla es enforceada por ESLint (`eslint-plugin-jsdoc`).
- **La documentación JSDoc no debe contener caracteres especiales**: solo letras (incluidos acentos españoles), números, espacios y puntuación básica (`. , ; : ( ) -`). Prohibidos emojis, flechas, símbolos decorativos y caracteres unicode de adorno en las descripciones (regla `jsdoc/match-description`, error de ESLint).
- Formato con Prettier y ESLint flat config (`eslint.config.js`); runner: `npm run lint` (fix) / `npm run lint:check`.
- **Todo lo que se cree debe ser responsive con Tailwind**: usa las variantes de breakpoint de Tailwind 4 (`sm:`, `md:`, `lg:`, `xl:`) y clases utilitarias (flex, grid, max-w, etc.) en cada componente o vista nueva. La UI debe verse correcta en móvil, tablet y desktop.
- **Imports con alias de barril, uno solo por archivo**: cada módulo tiene un alias único `@<modulo>` (ej. `@portafolio` → el `index.ts` del módulo), registrado en `tsconfig.json`, `vite.config.ts` y `jest.config.cjs` al crear el módulo. Los consumidores importan exports nombrados del alias desnudo; prohibido sub-rutas (`@portafolio/core/...`) y prohibido duplicar el import: valores y tipos se fusionan en UN import con `type` en línea (`import { A, type B } from "@portafolio"`). Los barriles del módulo deben re-exportar todo lo público. Código compartido: `@assets/...`, `@i18n/...`, `@/test/...`. Solo los barriles usan rutas hermanas (`./X`).

## Architecture

Estructura en `src/` con alias definidos en `tsconfig.json` y `vite.config.ts`. **Todo cambio debe respetar esta estructura**: la UI en presentation, la lógica de negocio en sus capas, los textos en i18n y los estilos con Tailwind (responsive obligatorio: `sm:`, `md:`, `lg:`, `xl:`).

- `@presentation` → `src/app/presentation/`: componentes React (`App.tsx`).
- `@domain`, `@application`, `@infrastructure` → capas reservadas en `src/app/` (crear allí la lógica de negocio, no en presentation).
- `@assets` → `src/assets/`: i18n y estilos.
- `@i18n` → `src/assets/i18n/`: catálogos en `locales/{es,en,fr}.json` + `translations.ts` (`TranslationCatalog` de la librería). Toda cadena visible pasa por `t()` de `useLanguage()`; si agregas texto nuevo, añádelo a los 3 idiomas.
- `@assets/styles/theme/`: temas como `CustomThemeDefinition` (`{ name, manifest, daisyUI }`) de `satoshi-rc-ui`. NO uses `colors` — la versión 1.0.0 no lo soporta. Registra todo tema nuevo en `CUSTOM_THEMES` (theme.ts) y exporta desde `index.ts`. `ThemeName` admite `"light" | "dark" | "magenta" | "semi-dark" | (string & {})`.

Los componentes UI (Button, Header, Container, ThemeSelector, providers) vienen de `satoshi-rc-ui`; no recrearlos, consumirlos en `App.tsx`. Los módulos de features siguen la skill `module-structure` (árbol core/page/ui en `src/app/presentation/<modulo>/`).

## Tests y QA obligatorio

- **Tests centralizados en `src/test/`** (ninguno junto al código): la estructura espeja `src/` (`src/test/app/presentation/<modulo>/core|page/...`, `src/test/assets/...`), con helpers en `src/test/helpers/` y mocks compartidos en `src/test/mocks/`. Importa el código bajo prueba con alias y registra los mocks ANTES de importar el módulo probado.
- **QA en navegador (SIEMPRE tras cambios de UI o módulos)**, además de `lint:check`, `type-check` y `npm test`, con `npm run dev` + browser:
  1. **Flujos completos**: ejercita el camino del usuario (privacidad, guía, carrusel, selección de proyecto, FAQ, formulario, idioma y tema), no solo el render.
  2. **Responsive**: verifica 320, 390, 768, 1024 y 1440 px sin overflow horizontal (`scrollWidth <= clientWidth`); localiza el culpable y corrígelo en el código, no a mano en el DOM.
  3. **Consola limpia**: cero errores de consola y cero imágenes rotas (`naturalWidth === 0`).
  4. **Accesibilidad básica**: navega por teclado los controles nuevos y revisa etiquetas aria.
  5. Arregla los bugs encontrados antes de cerrar la tarea; un cambio de UI sin QA en navegador no está terminado.

## Build and Test

```bash
npm run dev          # Vite en :5173 (strictPort)
npm run build        # tsc --noEmit && vite build
npm test             # Jest + ts-jest (jsdom), pruebas en src/test/
npm run test:coverage
npm run lint:check
npm run type-check
npm run ui:install:local   # reinstalar la librería desde el tgz de resource/
```

## Conventions

- **Terminal obligatoria: Bash** (Git Bash en Windows, Bash en Linux). Nunca CMD, PowerShell, scripts `.bat`/`.cmd` ni sintaxis exclusiva de esas shells; si un comando falla, resuélvelo en Bash. Prioriza `npm` sobre `npm.cmd`.
- Commits: Conventional Commits (validado por commitlint + husky `commit-msg`; PR titles también validados). **El agente no ejecuta commit ni push** — ver la regla ⛔ arriba. Pre-commit: Prettier + lint-staged.
- CI en `.github/workflows/`: workflow por concern (lint, test, build, commitlint, security, deploy, pr-lint, auto-pr, version-bump) en push/PR a `main`/`develop`. Deploy a GitHub Pages desde `main` y `develop`.
- `coverage/` es artefacto generado; no editarlo a mano.
- La librería `satoshi-rc-ui` vive en `Satoshi-librerias/satoshi-rc-ui` (rama `develop`). En CI se compila desde el checkout de la rama destino (`${{ github.base_ref || github.ref_name }}`) y la versión del scaffold se alinea con la versión real de la librería. El `resource/*.tgz` es solo para desarrollo local.

## Skills y gobierno (directorio `.github`)

- **Antes de responder o editar nada**, revisa si existe una skill aplicable en `.github/skills/<nombre>/SKILL.md`. Si aplica, invocala con el tool `skill` ANTES de tu primera accion. No la resumas ni la ignores.
- `ops-lifecycle`: SIEMPRE que toques `.ops/`, `PROGRESS.md`, handoff, REQ, BL, IMPL, QT, DEC, RSK, BUG, VULN, RUN, MIG, REL, releases, planes o specs.
- `new-feature` y `new-theme`: plantillas en `.github/skills/ops-lifecycle/reference/template/`; instalarlas copiándolas a `.github/skills/new-feature/` y `.github/skills/new-theme/` al adoptarlas. Usar la plantilla que corresponda antes de inventar estructura.
- `module-structure`: SIEMPRE al crear o refactorizar un módulo de features en `src/app/presentation/` o escribir/mover pruebas.
- **Tools del proyecto**: `npm run validate:kit` tras editar skills/plantillas/docs de `.github` (enlaces, frontmatter y tokens); `npm run lint:check`, `npm run type-check` y `npm test` para validar cambios de código.
- **Workflows de PR**: al modificar flujos de PR, alineate con lo que ya existe (auto-pr actualiza titulo/descripcion/checklist; pr-labels aplica etiquetas; pr-lint valida titulo). No dupliques validaciones de otros workflows.
- Guía completa del directorio: `.github/README.md`.
