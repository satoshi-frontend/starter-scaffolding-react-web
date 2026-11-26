import type { CustomThemeDefinition } from "@satoshi/rc-ui";

/**
 * @description Define un tema claro personalizado con DaisyUI.
 * @author Steveen Cues
 * @version 2.1.0
 */
export const lightTheme: CustomThemeDefinition = {
  name: "light",
  manifest: {
    id: "light",
    name: "themes.light.name",
    description: "themes.light.description",
    version: "2.0.0",
    author: "Steveen Cues",
    tags: ["light", "modern", "accessible"],
    supportedFeatures: [
      "gradients",
      "animations",
      "glassmorphism",
      "responsive",
    ],
    isDefault: true,
    isExperimental: false,
  },
  daisyUI: {
    colorScheme: "light",
    primary: "#797DFB",
    primaryContent: "#000000",
    secondary: "#000000",
    secondaryContent: "#FFFFFF",
    accent: "#797DFB",
    accentContent: "#000000",
    neutral: "#F2F2F2",
    neutralContent: "#000000",
    base100: "#FFFFFF",
    base200: "#FFFFFF",
    base300: "#E8E8EF",
    baseContent: "#000000",
    info: "#0284C7",
    infoContent: "#FFFFFF",
    success: "#15803D",
    successContent: "#FFFFFF",
    warning: "#D97706",
    warningContent: "#FFFFFF",
    error: "#DC2626",
    errorContent: "#FFFFFF",
  },
};
