import { describe, expect, it } from "@jest/globals";

import { translations } from "@i18n/locales/translations";
import { appThemes, DAISY_UI_THEMES } from "@assets/styles/theme/theme";

describe("application language and theme settings", () => {
  const spanishKeys = flattenKeys(translations.es);
  const englishKeys = flattenKeys(translations.en);

  it("only exposes Spanish and English translations", () => {
    expect(Object.keys(translations).sort()).toEqual(["en", "es"]);
  });

  it("keeps Spanish and English catalog keys in sync", () => {
    expect(spanishKeys).toEqual(englishKeys);
  });

  it("offers light, dark, and one DaisyUI theme", () => {
    expect(appThemes.map((theme) => theme.name)).toEqual([
      "light",
      "dark",
      "corporate",
    ]);
    expect(DAISY_UI_THEMES).toEqual(["corporate"]);
  });

  it("includes localized labels for every available theme", () => {
    for (const language of Object.values(translations)) {
      expect(language).toHaveProperty("themes.light.name");
      expect(language).toHaveProperty("themes.dark.name");
      expect(language).toHaveProperty("themes.native.corporate.name");
      expect(language).toHaveProperty("themes.native.corporate.description");
    }
  });
});

function flattenKeys(value: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(value)
    .flatMap(([key, nestedValue]) => {
      const currentKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof nestedValue === "object" &&
        nestedValue !== null &&
        !Array.isArray(nestedValue)
      ) {
        return flattenKeys(nestedValue as Record<string, unknown>, currentKey);
      }

      return [currentKey];
    })
    .sort();
}
