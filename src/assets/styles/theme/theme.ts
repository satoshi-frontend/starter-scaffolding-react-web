import { darkTheme } from "./dark.theme";
import { lightTheme } from "./light.theme";

import type {
  AppTheme,
  CustomThemeDefinition,
  ThemeName,
} from "@satoshi/rc-ui";

/**
 * @description Define el unico tema nativo de DaisyUI habilitado.
 * @author Steveen Cues
 * @version 1.1.0
 */
export const DAISY_UI_THEMES = [
  "corporate",
] as const satisfies readonly ThemeName[];

/**
 * @description Define los temas personalizados de la aplicacion.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const CUSTOM_THEMES: readonly CustomThemeDefinition[] = [
  lightTheme,
  darkTheme,
];

/**
 * @description Convierte un nombre nativo de DaisyUI en un tema seleccionable.
 * @param name - Nombre nativo del tema de DaisyUI.
 * @returns El tema aplicable con su manifiesto y esquema de colores.
 * @author Steveen Cues
 * @version 1.0.0
 */
const createDaisyUITheme = (name: ThemeName): AppTheme => ({
  name,
  manifest: {
    ...lightTheme.manifest,
    id: name,
    name: `themes.native.${name}.name`,
    description: `themes.native.${name}.description`,
    tags: ["daisyui", "native"],
    isDefault: false,
    isExperimental: false,
  },
});

/**
 * @description Define los temas nativos disponibles de DaisyUI.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const NATIVE_THEMES: readonly AppTheme[] =
  DAISY_UI_THEMES.map(createDaisyUITheme);

/**
 * @description Define los temas claro, oscuro y corporativo disponibles.
 * @author Steveen Cues
 * @version 1.1.0
 */
export const appThemes: readonly AppTheme[] = [
  ...CUSTOM_THEMES,
  ...NATIVE_THEMES,
];
