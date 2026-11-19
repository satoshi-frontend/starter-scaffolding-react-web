import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { mockSatoshiRcUi, resetBrowserEnvironment } from "@/test/helpers";
import { mockT } from "@/test/mocks";

mockSatoshiRcUi();

import { PortafolioScreen } from "@portafolio";

beforeEach(() => {
  resetBrowserEnvironment();
});

describe("PortafolioScreen privacy and guided tour", () => {
  it("waits for a saved privacy choice before starting the guided tour", () => {
    render(<PortafolioScreen t={mockT} />);

    expect(screen.getByTestId("guided-tour").getAttribute("data-enabled")).toBe(
      "false",
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Save privacy choice" }),
    );

    expect(screen.getByTestId("guided-tour").getAttribute("data-enabled")).toBe(
      "true",
    );
  });
});

describe("PortafolioScreen featured project carousel", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("moves forward through the featured projects", () => {
    render(<PortafolioScreen t={mockT} />);

    expect(
      screen
        .getAllByRole("img", {
          name: "portfolio.projects.items.luma.imageAlt",
        })
        .some((image) => image.className.includes("-z-10")),
    ).toBe(true);

    fireEvent.click(
      screen.getByRole("button", { name: "portfolio.carousel.next" }),
    );

    expect(
      screen
        .getAllByRole("img", {
          name: "portfolio.projects.items.casa.imageAlt",
        })
        .some((image) => image.className.includes("-z-10")),
    ).toBe(true);
  });

  it("wraps to the last project when moving backward from the first", () => {
    render(<PortafolioScreen t={mockT} />);

    fireEvent.click(
      screen.getByRole("button", { name: "portfolio.carousel.previous" }),
    );

    expect(
      screen
        .getAllByRole("img", {
          name: "portfolio.projects.items.nova.imageAlt",
        })
        .some((image) => image.className.includes("-z-10")),
    ).toBe(true);
  });

  it("selects a project from the work grid and updates the hero", () => {
    render(<PortafolioScreen t={mockT} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "portfolio.work.openProject portfolio.projects.items.verde.title",
      }),
    );

    expect(
      screen
        .getAllByRole("img", {
          name: "portfolio.projects.items.verde.imageAlt",
        })
        .some((image) => image.className.includes("-z-10")),
    ).toBe(true);
  });

  it("automatically advances through all five featured projects", () => {
    jest.useFakeTimers();
    render(<PortafolioScreen t={mockT} />);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(
      screen
        .getAllByRole("img", {
          name: "portfolio.projects.items.casa.imageAlt",
        })
        .some((image) => image.className.includes("-z-10")),
    ).toBe(true);

    fireEvent.click(
      screen.getByRole("button", { name: "portfolio.carousel.next" }),
    );

    expect(
      screen
        .getAllByRole("img", {
          name: "portfolio.projects.items.verde.imageAlt",
        })
        .some((image) => image.className.includes("-z-10")),
    ).toBe(true);
  });

  it("pauses autoplay while the carousel is hovered", () => {
    jest.useFakeTimers();
    render(<PortafolioScreen t={mockT} />);

    fireEvent.mouseEnter(
      screen.getByRole("region", { name: "portfolio.carousel.label" }),
    );
    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(
      screen
        .getAllByRole("img", {
          name: "portfolio.projects.items.luma.imageAlt",
        })
        .some((image) => image.className.includes("-z-10")),
    ).toBe(true);
  });
});

describe("PortafolioScreen contact form", () => {
  it("prepares a translated mail draft with the entered contact details", () => {
    const openWindow = jest
      .spyOn(window, "open")
      .mockImplementation(() => null);
    render(<PortafolioScreen t={mockT} />);

    fireEvent.change(
      screen.getByRole("textbox", { name: "portfolio.contact.form.name" }),
      { target: { value: "Ada Lovelace" } },
    );
    fireEvent.change(
      screen.getByRole("textbox", { name: "portfolio.contact.form.email" }),
      { target: { value: "ada@example.com" } },
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: "portfolio.contact.form.message",
      }),
      { target: { value: "Necesito una plataforma web." } },
    );
    fireEvent.submit(document.querySelector("form")!);

    expect(openWindow).toHaveBeenCalledWith(
      expect.stringContaining("mailto:?subject="),
      "_blank",
    );
    expect(
      decodeURIComponent(String(openWindow.mock.calls[0]?.[0] ?? "")),
    ).toContain("ada@example.com");
    expect(screen.getByText("portfolio.contact.form.draftOpened")).toBeTruthy();

    openWindow.mockRestore();
  });
});

describe("PortafolioScreen customer information", () => {
  it("provides additional value and FAQ sections for prospective customers", () => {
    render(<PortafolioScreen t={mockT} />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "portfolio.value.title",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "portfolio.faq.title",
      }),
    ).toBeTruthy();
    expect(
      screen.getByText("portfolio.faq.items.timeline.question"),
    ).toBeTruthy();
  });
});
