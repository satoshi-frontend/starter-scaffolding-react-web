import { useEffect, useState } from "react";

import {
  AUTOPLAY_INTERVAL_MS,
  PROJECTS,
  type CarouselDirection,
  type ProjectCarouselResult,
} from "@portafolio";

/**
 * @description Minimo de proyectos necesario para activar el autoplay.
 * @author Steveen Cues
 * @version 1.0.0
 */
const MIN_PROJECTS_FOR_AUTOPLAY = 2;

/**
 * @description Controla el carrusel con autoplay, navegacion manual y pausa al interactuar o con la pestana oculta.
 * @returns El estado y las acciones del carrusel de proyectos.
 * @author Steveen Cues
 * @version 1.1.0
 */
export function useProjectCarousel(): ProjectCarouselResult {
  const [activeProject, setActiveProject] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(
    (): boolean => typeof document === "undefined" || !document.hidden,
  );

  useEffect((): (() => void) => {
    const handleVisibilityChange = (): void => {
      setIsDocumentVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return (): void => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      isInteracting ||
      !isDocumentVisible ||
      reducedMotion ||
      PROJECTS.length < MIN_PROJECTS_FOR_AUTOPLAY
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % PROJECTS.length);
    }, AUTOPLAY_INTERVAL_MS);

    return (): void => {
      window.clearInterval(intervalId);
    };
  }, [isDocumentVisible, isInteracting]);

  const changeProject = (direction: CarouselDirection): void => {
    setActiveProject((current) =>
      direction === "next"
        ? (current + 1) % PROJECTS.length
        : current === 0
          ? PROJECTS.length - 1
          : current - 1,
    );
  };

  return {
    activeProject,
    project: PROJECTS[activeProject],
    changeProject,
    setActiveProject,
    isInteracting,
    setIsInteracting,
  };
}
