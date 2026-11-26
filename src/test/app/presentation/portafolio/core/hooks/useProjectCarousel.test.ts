import { describe, expect, it, jest } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { useProjectCarousel } from "@portafolio";

describe("useProjectCarousel", () => {
  it("starts on the first project", () => {
    const { result } = renderHook(() => useProjectCarousel());

    expect(result.current.activeProject).toBe(0);
    expect(result.current.project.number).toBe("01");
  });

  it("moves forward and wraps to the first project", () => {
    const { result } = renderHook(() => useProjectCarousel());

    act(() => {
      result.current.changeProject("next");
    });
    expect(result.current.activeProject).toBe(1);

    for (let step = 0; step < 4; step += 1) {
      act(() => {
        result.current.changeProject("next");
      });
    }

    expect(result.current.activeProject).toBe(0);
  });

  it("wraps to the last project when moving backward from the first", () => {
    const { result } = renderHook(() => useProjectCarousel());

    act(() => {
      result.current.changeProject("previous");
    });

    expect(result.current.activeProject).toBe(4);
    expect(result.current.project.number).toBe("05");
  });

  it("jumps to a project selected from the work grid", () => {
    const { result } = renderHook(() => useProjectCarousel());

    act(() => {
      result.current.setActiveProject(2);
    });

    expect(result.current.activeProject).toBe(2);
    expect(result.current.project.number).toBe("03");
  });

  it("advances automatically while not interacting", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useProjectCarousel());

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(result.current.activeProject).toBe(1);
    jest.useRealTimers();
  });

  it("pauses autoplay while the user interacts", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useProjectCarousel());

    act(() => {
      result.current.setIsInteracting(true);
    });
    act(() => {
      jest.advanceTimersByTime(12000);
    });

    expect(result.current.activeProject).toBe(0);
    jest.useRealTimers();
  });

  it("pauses autoplay while the document is hidden", () => {
    jest.useFakeTimers();
    const visibilitySpy = jest
      .spyOn(document, "hidden", "get")
      .mockReturnValue(true);
    const { result } = renderHook(() => useProjectCarousel());

    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    act(() => {
      jest.advanceTimersByTime(12000);
    });

    expect(result.current.activeProject).toBe(0);

    visibilitySpy.mockRestore();
    jest.useRealTimers();
  });
});
