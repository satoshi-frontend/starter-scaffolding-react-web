# Test Suite

Pruebas centralizadas del proyecto. Ninguna prueba vive junto al codigo
fuente; todas se organizan aqui espejando la estructura de `src/`.

## Estructura

```text
src/test/
	helpers/            (utilidades de entorno: matchMedia, reset de storage)
	mocks/              (mocks compartidos: satoshi-rc-ui, futuros servicios)
	setup/              (configuracion global por suite si se necesita)
	app/                (espeja src/app/)
		presentation/
			portafolio/
				core/       (hooks y utils del modulo)
				page/       (pruebas de pantalla)
	assets/             (espeja src/assets/: i18n, temas)
```

## Reglas

1. Una prueba de `src/app/presentation/portafolio/core/hooks/useX.ts` vive en
   `src/test/app/presentation/portafolio/core/hooks/useX.test.ts` (misma ruta
   relativa, mismo nombre + `.test`).
2. Importa el codigo bajo prueba siempre con alias (`@presentation/...`,
   `@assets/...`), nunca con rutas relativas largas.
3. Los mocks compartidos van en `mocks/` y se importan con `@/test/mocks`.
4. Al crear un modulo nuevo, crea su carpeta espejo aqui antes de escribir la
   primera prueba.
