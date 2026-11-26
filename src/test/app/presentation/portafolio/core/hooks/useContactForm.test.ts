import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import type { FormEvent } from "react";
import { useContactForm } from "@portafolio";

const mockT = (key: string): string => key;

afterEach(() => {
  jest.restoreAllMocks();
});

describe("useContactForm", () => {
  it("starts with empty values and no draft opened", () => {
    const { result } = renderHook(() => useContactForm(mockT));

    expect(result.current.values).toEqual({
      name: "",
      email: "",
      message: "",
    });
    expect(result.current.draftOpened).toBe(false);
  });

  it("updates a single field and closes the draft notice", () => {
    const { result } = renderHook(() => useContactForm(mockT));

    act(() => {
      result.current.updateField("name", "Ada Lovelace");
    });

    expect(result.current.values.name).toBe("Ada Lovelace");
    expect(result.current.values.email).toBe("");
    expect(result.current.draftOpened).toBe(false);
  });

  it("opens a translated mail draft on submit", () => {
    const openWindow = jest
      .spyOn(window, "open")
      .mockImplementation(() => null);
    const { result } = renderHook(() => useContactForm(mockT));

    act(() => {
      result.current.updateField("name", "Ada Lovelace");
      result.current.updateField("email", "ada@example.com");
      result.current.updateField("message", "Necesito una plataforma web.");
    });

    const form = document.createElement("form");
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      act(() => {
        result.current.submit(event as unknown as FormEvent<HTMLFormElement>);
      });
    });
    form.dispatchEvent(submitEvent);

    expect(openWindow).toHaveBeenCalledTimes(1);
    const mailto = String(openWindow.mock.calls[0]?.[0] ?? "");
    expect(mailto.startsWith("mailto:?subject=")).toBe(true);
    expect(decodeURIComponent(mailto)).toContain("ada@example.com");
    expect(result.current.draftOpened).toBe(true);

    openWindow.mockRestore();
    form.remove();
  });

  it("does not open a draft when submit is not triggered", () => {
    const openWindow = jest
      .spyOn(window, "open")
      .mockImplementation(() => null);
    const { result } = renderHook(() => useContactForm(mockT));

    expect(result.current.draftOpened).toBe(false);
    expect(openWindow).not.toHaveBeenCalled();

    openWindow.mockRestore();
  });
});
