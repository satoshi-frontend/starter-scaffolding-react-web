import type { Project } from "@portafolio";

/**
 * @description Catalogo de proyectos destacados del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const PROJECTS: readonly Project[] = [
  {
    title: "portfolio.projects.items.luma.title",
    category: "portfolio.projects.items.luma.category",
    description: "portfolio.projects.items.luma.description",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "portfolio.projects.items.luma.imageAlt",
    number: "01",
  },
  {
    title: "portfolio.projects.items.casa.title",
    category: "portfolio.projects.items.casa.category",
    description: "portfolio.projects.items.casa.description",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "portfolio.projects.items.casa.imageAlt",
    number: "02",
  },
  {
    title: "portfolio.projects.items.verde.title",
    category: "portfolio.projects.items.verde.category",
    description: "portfolio.projects.items.verde.description",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "portfolio.projects.items.verde.imageAlt",
    number: "03",
  },
  {
    title: "portfolio.projects.items.pulse.title",
    category: "portfolio.projects.items.pulse.category",
    description: "portfolio.projects.items.pulse.description",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "portfolio.projects.items.pulse.imageAlt",
    number: "04",
  },
  {
    title: "portfolio.projects.items.nova.title",
    category: "portfolio.projects.items.nova.category",
    description: "portfolio.projects.items.nova.description",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "portfolio.projects.items.nova.imageAlt",
    number: "05",
  },
] as const;
