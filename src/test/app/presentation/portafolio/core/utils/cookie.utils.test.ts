import { describe, expect, it } from "@jest/globals";

import {
  hasSavedCookiePreference,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@portafolio";

describe("hasSavedCookiePreference", () => {
  it("returns false when no preference is stored", () => {
    window.localStorage.clear();

    expect(hasSavedCookiePreference()).toBe(false);
  });

  it("returns true for a valid preference with necessary consent", () => {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({ necessary: true, optional: false }),
    );

    expect(hasSavedCookiePreference()).toBe(true);
  });

  it("returns false when necessary consent is missing", () => {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({ optional: true }),
    );

    expect(hasSavedCookiePreference()).toBe(false);
  });

  it("returns false when necessary consent is not true", () => {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({ necessary: false, optional: true }),
    );

    expect(hasSavedCookiePreference()).toBe(false);
  });

  it("returns false when optional is not a boolean", () => {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({ necessary: true, optional: "yes" }),
    );

    expect(hasSavedCookiePreference()).toBe(false);
  });

  it("returns false for malformed stored values", () => {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "not-json");

    expect(hasSavedCookiePreference()).toBe(false);
  });

  it("returns false for stored primitive values", () => {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "42");

    expect(hasSavedCookiePreference()).toBe(false);
  });
});
