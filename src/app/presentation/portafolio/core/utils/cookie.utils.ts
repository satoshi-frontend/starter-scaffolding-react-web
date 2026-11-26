import { COOKIE_CONSENT_STORAGE_KEY } from "@portafolio";

/**
 * @description Comprueba si ya se guardo una preferencia valida de privacidad.
 * @returns Devuelve si existe una eleccion de privacidad almacenada.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function hasSavedCookiePreference(): boolean {
  try {
    const saved = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

    if (saved === null) {
      return false;
    }

    const preference: unknown = JSON.parse(saved);

    return (
      typeof preference === "object" &&
      preference !== null &&
      "necessary" in preference &&
      preference.necessary === true &&
      "optional" in preference &&
      typeof preference.optional === "boolean"
    );
  } catch (error) {
    console.error("Unable to read cookie consent preference.", error);
    return false;
  }
}
