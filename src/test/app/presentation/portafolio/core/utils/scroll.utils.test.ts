import { describe, expect, it } from "@jest/globals";
import { scrollToSection } from "@portafolio";

describe("scrollToSection", () => {
  it("does nothing when the section does not exist", () => {
    const scrollSpy = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);

    scrollToSection("missing-section");

    expect(scrollSpy).not.toHaveBeenCalled();
    scrollSpy.mockRestore();
  });

  it("scrolls to an existing section accounting for the header", () => {
    const scrollSpy = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);
    const section = document.createElement("section");
    section.id = "work";
    document.body.append(section);

    const header = document.createElement("header");
    document.body.append(header);
    jest.spyOn(header, "getBoundingClientRect").mockReturnValue({
      height: 80,
      bottom: 0,
      heightRatio: 1,
      left: 0,
      right: 0,
      top: 0,
      width: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
    jest.spyOn(section, "getBoundingClientRect").mockReturnValue({
      bottom: 0,
      height: 100,
      left: 0,
      right: 0,
      top: 500,
      width: 100,
      x: 0,
      y: 500,
      toJSON: () => ({}),
    } as DOMRect);

    scrollToSection("work");

    expect(scrollSpy).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: "smooth", top: 404 }),
    );

    section.remove();
    header.remove();
    scrollSpy.mockRestore();
  });
});
