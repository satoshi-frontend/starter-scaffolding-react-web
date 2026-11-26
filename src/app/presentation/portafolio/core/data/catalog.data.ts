import type { Service } from "@portafolio";

/**
 * @description Catalogo de servicios ofrecidos por Satoshi.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const SERVICES: readonly Service[] = [
  { number: "01", title: "portfolio.services.brand.title", icon: "✳" },
  { number: "02", title: "portfolio.services.digital.title", icon: "↗" },
  { number: "03", title: "portfolio.services.space.title", icon: "⌘" },
] as const;

/**
 * @description Pasos del proceso de trabajo mostrados en la seccion de proceso.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const PROCESS_STEPS = [
  "portfolio.process.steps.discover",
  "portfolio.process.steps.design",
  "portfolio.process.steps.build",
  "portfolio.process.steps.evolve",
] as const;

/**
 * @description Puntos de valor mostrados en la seccion de propuesta de valor.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const VALUE_POINTS = [
  "portfolio.value.points.partnership",
  "portfolio.value.points.practical",
  "portfolio.value.points.scale",
] as const;

/**
 * @description Preguntas frecuentes mostradas en la seccion de FAQ.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const FAQ_ITEMS = [
  "portfolio.faq.items.scope",
  "portfolio.faq.items.timeline",
  "portfolio.faq.items.collaboration",
] as const;

/**
 * @description Redes sociales enlazadas desde el hero del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const SOCIAL_LINKS = [
  {
    name: "linkedin",
    href: "https://www.linkedin.com/company/satoshi-software-solutions",
    icon: "in",
  },
  {
    name: "github",
    href: "https://github.com/satoshi-software-solutions",
    icon: "⌥",
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/satoshi.software.solutions",
    icon: "◉",
  },
  { name: "whatsapp", href: "https://wa.me/", icon: "✆" },
] as const;

/**
 * @description Marcas mostradas en la franja de clientes y tecnologias.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const CLIENT_BRANDS = ["WEB", "CLOUD", "DATA", "MOBILE", "AI"] as const;
