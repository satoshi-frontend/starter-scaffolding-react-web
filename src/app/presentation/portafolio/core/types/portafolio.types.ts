import type { Project } from "@portafolio";
import type { FormEvent } from "react";

/**
 * @description Traduccion de la libreria satoshi-rc-ui usada en todo el modulo.
 * @author Steveen Cues
 * @version 1.0.0
 */
export type Translate = (key: string) => string;

/**
 * @description Propiedades comunes de las secciones del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface SectionProps {
  readonly t: Translate;
}

/**
 * @description Propiedades de una palabra animada del hero.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface HeroWordProps {
  readonly word: string;
  readonly delayMs: number;
  readonly accent: boolean;
}

/**
 * @description Propiedades de la seccion hero con el carrusel de proyectos.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface HeroSectionProps extends SectionProps {
  readonly project: Project;
  readonly onChange: (direction: CarouselDirection) => void;
  readonly onInteract: (value: boolean) => void;
}

/**
 * @description Propiedades de la seccion de proyectos destacados.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface ProjectsSectionProps extends SectionProps {
  readonly onSelect: (index: number) => void;
}

/**
 * @description Propiedades de la pantalla principal del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface PortafolioScreenProps {
  readonly t: Translate;
}

/**
 * @description Elemento de la lista de redes sociales del hero.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface SocialLink {
  readonly name: string;
  readonly href: string;
  readonly icon: string;
}

/**
 * @description Direccion de navegacion del carrusel de proyectos.
 * @author Steveen Cues
 * @version 1.0.0
 */
export type CarouselDirection = "next" | "previous";

/**
 * @description Estado interno del formulario de contacto.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

/**
 * @description Resultado del hook del formulario de contacto.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface ContactFormResult {
  readonly values: ContactFormValues;
  readonly draftOpened: boolean;
  readonly updateField: (field: keyof ContactFormValues, value: string) => void;
  readonly submit: (event: FormEvent<HTMLFormElement>) => void;
}

/**
 * @description Resultado del hook del carrusel de proyectos.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface ProjectCarouselResult {
  readonly activeProject: number;
  readonly project: Project;
  readonly changeProject: (direction: CarouselDirection) => void;
  readonly setActiveProject: (index: number) => void;
  readonly isInteracting: boolean;
  readonly setIsInteracting: (value: boolean) => void;
}
