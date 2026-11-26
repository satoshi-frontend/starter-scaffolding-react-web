import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const localePaths = {
  es: resolve(root, "src/assets/i18n/locales/es.json"),
  en: resolve(root, "src/assets/i18n/locales/en.json"),
};
const locales = Object.fromEntries(
  Object.entries(localePaths).map(([language, path]) => [
    language,
    JSON.parse(readFileSync(path, "utf8")),
  ]),
);

function getLeafKeys(value, prefix = "") {
  return Object.entries(value)
    .flatMap(([key, nestedValue]) => {
      const currentKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof nestedValue === "object" &&
        nestedValue !== null &&
        !Array.isArray(nestedValue)
      ) {
        return getLeafKeys(nestedValue, currentKey);
      }

      return [currentKey];
    })
    .sort();
}

function hasTranslation(locale, key) {
  return key.split(".").every((part) => {
    if (
      typeof locale !== "object" ||
      locale === null ||
      !Object.hasOwn(locale, part)
    ) {
      return false;
    }

    locale = locale[part];
    return true;
  });
}

const spanishKeys = getLeafKeys(locales.es);
const englishKeys = getLeafKeys(locales.en);
const spanishOnly = spanishKeys.filter((key) => !englishKeys.includes(key));
const englishOnly = englishKeys.filter((key) => !spanishKeys.includes(key));
const presentationDir = resolve(root, "src/app/presentation");

function collectSourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = resolve(dir, entry.name);

    if (entry.isDirectory()) return collectSourceFiles(entryPath);

    return entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")
      ? [entryPath]
      : [];
  });
}

const appKeys = new Set(
  collectSourceFiles(presentationDir)
    .flatMap((filePath) =>
      readFileSync(filePath, "utf8").match(
        /(?:portfolio|preferences)\.[A-Za-z0-9_.]+/g,
      ) ?? [],
    )
    .filter((key) => !key.endsWith(".")),
);
const dynamicPortfolioKeys = new Set();
const dynamicKeyRules = [
  ["PROCESS_STEPS", ["title", "description"]],
  ["VALUE_POINTS", ["title", "description"]],
  ["FAQ_ITEMS", ["question", "answer"]],
];

const presentationSources = collectSourceFiles(presentationDir).map(
  (filePath) => readFileSync(filePath, "utf8"),
);

for (const [constantName, suffixes] of dynamicKeyRules) {
  const constantPattern = new RegExp(
    `const ${constantName} = \\[([\\s\\S]*?)\\] as const;`,
  );

  for (const source of presentationSources) {
    const constantBlock = source.match(constantPattern)?.[1] ?? "";
    const baseKeys = constantBlock.matchAll(/"(portfolio\.[A-Za-z0-9_.]+)"/g);

    for (const [, baseKey] of baseKeys) {
      for (const suffix of suffixes) {
        dynamicPortfolioKeys.add(
          suffix === "" ? baseKey : `${baseKey}.${suffix}`,
        );
      }
    }
  }
}

for (const source of presentationSources) {
  const socialBlock =
    source.match(/const SOCIAL_LINKS = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
  const socialNames = socialBlock.matchAll(/name:\s*"(\w+)"/g);

  for (const [, socialName] of socialNames) {
    dynamicPortfolioKeys.add(`portfolio.social.${socialName}`);
  }
}

for (const source of presentationSources) {
  const servicesBlock =
    source.match(/const SERVICES[^=]*=\s*\[([\s\S]*?)\] as const;/)?.[1] ?? "";
  const serviceTitles = servicesBlock.matchAll(
    /title:\s*"(portfolio\.services\.[A-Za-z0-9_.]+\.title)"/g,
  );

  for (const [, titleKey] of serviceTitles) {
    dynamicPortfolioKeys.add(titleKey.replace(/\.title$/, ".description"));
  }
}

const missingKeys = [...appKeys].filter(
  (key) => !hasTranslation(locales.es, key) || !hasTranslation(locales.en, key),
);
const portfolioKeys = getLeafKeys(locales.es.portfolio, "portfolio");
const unusedPortfolioKeys = portfolioKeys.filter(
  (key) => !appKeys.has(key) && !dynamicPortfolioKeys.has(key),
);

if (
  spanishOnly.length > 0 ||
  englishOnly.length > 0 ||
  missingKeys.length > 0 ||
  unusedPortfolioKeys.length > 0
) {
  console.error("Translation validation failed.");

  if (spanishOnly.length > 0) {
    console.error("Keys missing from English:", spanishOnly.join(", "));
  }

  if (englishOnly.length > 0) {
    console.error("Keys missing from Spanish:", englishOnly.join(", "));
  }

  if (missingKeys.length > 0) {
    console.error("App keys missing from a locale:", missingKeys.join(", "));
  }

  if (unusedPortfolioKeys.length > 0) {
    console.error(
      "Unused portfolio catalog keys:",
      unusedPortfolioKeys.join(", "),
    );
  }

  process.exitCode = 1;
} else {
  console.log(
    `Translation validation passed: ${spanishKeys.length} matching catalog keys, ${appKeys.size} app references, and no unused portfolio keys.`,
  );
}
