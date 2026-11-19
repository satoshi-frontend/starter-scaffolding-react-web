import { SCROLL_HEADER_OFFSET_PX } from "@portafolio";

/**
 * @description Desplaza la vista hasta la seccion indicada respetando el header fijo.
 * @param sectionId Identificador de la seccion de destino.
 * @returns No devuelve ningun valor.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  const headerHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const targetTop = section.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    behavior: "smooth",
    top: Math.max(targetTop - headerHeight - SCROLL_HEADER_OFFSET_PX, 0),
  });
}
