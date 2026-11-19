import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";

import { heroStyle, renderHeroWords, WORD_STAGGER_MS } from "@portafolio";

describe("heroStyle", () => {
  it("creates the custom property with the given delay", () => {
    expect(heroStyle("500ms")).toEqual({ "--word-delay": "500ms" });
  });
});

describe("renderHeroWords", () => {
  it("splits the text into animated word spans", () => {
    const { container } = render(
      <div>{renderHeroWords("Tecnologia para avanzar", 0, false)}</div>,
    );
    const words = container.querySelectorAll(".hero-word");

    expect(words).toHaveLength(3);
    expect(words[0]?.textContent).toContain("Tecnologia");
  });

  it("applies the accent class only when requested", () => {
    const { container } = render(
      <div>{renderHeroWords("avanzar", 0, true)}</div>,
    );

    expect(container.querySelector(".hero-word")?.className).toContain(
      "text-primary",
    );
  });

  it("staggers the animation delay between words", () => {
    const { container } = render(
      <div>{renderHeroWords("uno dos", 0, false)}</div>,
    );
    const words = container.querySelectorAll<HTMLElement>(".hero-word");

    expect(words[0]?.style.getPropertyValue("--word-delay")).toBe("0ms");
    expect(words[1]?.style.getPropertyValue("--word-delay")).toBe(
      `${WORD_STAGGER_MS}ms`,
    );
  });

  it("offsets the sequence by the base delay", () => {
    const { container } = render(
      <div>{renderHeroWords("uno", 300, false)}</div>,
    );

    expect(
      container
        .querySelector<HTMLElement>(".hero-word")
        ?.style.getPropertyValue("--word-delay"),
    ).toBe("300ms");
  });
});
