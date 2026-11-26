import type { CustomThemeDefinition } from "@satoshi/rc-ui";

/**
 * @description Define un tema oscuro personalizado con DaisyUI.
 * @author Steveen Cues
 * @version 1.1.0
 */
export const darkTheme: CustomThemeDefinition = {
  name: "dark",
  manifest: {
    id: "dark",
    name: "themes.dark.name",
    description: "themes.dark.description",
    version: "1.0.0",
    author: "Steveen Cues",
    tags: ["dark", "modern", "violet"],
    supportedFeatures: ["gradients", "animations", "responsive"],
    isDefault: false,
    isExperimental: false,
  },
  daisyUI: {
    colorScheme: "dark",
    primary: "#797DFB",
    primaryContent: "#000000",
    secondary: "#FFFFFF",
    secondaryContent: "#000000",
    accent: "#797DFB",
    accentContent: "#000000",
    neutral: "#000000",
    neutralContent: "#FFFFFF",
    base100: "#000000",
    base200: "#000000",
    base300: "#000000",
    baseContent: "#FFFFFF",
    info: "#38BDF8",
    infoContent: "#082F49",
    success: "#4ADE80",
    successContent: "#052E16",
    warning: "#FACC15",
    warningContent: "#422006",
    error: "#FB7185",
    errorContent: "#4C0519",
  },
};
