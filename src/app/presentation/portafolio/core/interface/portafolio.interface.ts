/**
 * @description Proyecto destacado mostrado en el hero y la seccion de trabajos.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface Project {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly number: string;
}

/**
 * @description Servicio ofrecido por Satoshi Software Solutions.
 * @author Steveen Cues
 * @version 1.0.0
 */
export interface Service {
  readonly number: string;
  readonly title: string;
  readonly icon: string;
}
