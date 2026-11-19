import { WORD_STAGGER_MS, type HeroWordProps } from "@portafolio";

import type { CSSProperties, JSX } from "react";

/**
 * @description Propiedades CSS que aceptan variables personalizadas de CSS.
 * @author Steveen Cues
 * @version 1.0.0
 */
export type CSSPropertiesWithCustomProperties = CSSProperties &
  Record<`--${string}`, string | number>;

/**
 * @description Crea el estilo con el retraso de animacion del hero.
 * @param delayMs Retraso en milisegundos.
 * @returns El objeto de estilo con la variable CSS de retraso.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function heroStyle(delayMs: string): CSSPropertiesWithCustomProperties {
  return { "--word-delay": delayMs };
}

/**
 * @description Muestra una palabra del titulo del hero con animacion escalonada.
 * @param props Contiene la palabra, el retraso y si lleva acento de color.
 * @returns La palabra animada del titulo.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function HeroWord(props: HeroWordProps): JSX.Element {
  const { word, delayMs, accent } = props;

  return (
    <span
      aria-hidden="true"
      className={`hero-word${accent === true ? " text-primary" : ""}`}
      style={heroStyle(`${delayMs}ms`)}
    >
      {word}
      {"\u00A0"}
    </span>
  );
}

/**
 * @description Divide un texto en palabras animadas del hero.
 * @param text Texto traducido a dividir.
 * @param baseDelayMs Retraso inicial de la secuencia.
 * @param accent Indica si las palabras llevan el color de acento.
 * @returns La lista de palabras animadas.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function renderHeroWords(
  text: string,
  baseDelayMs: number,
  accent: boolean,
): JSX.Element[] {
  return text
    .split(" ")
    .map((word, index) => (
      <HeroWord
        accent={accent}
        delayMs={baseDelayMs + index * WORD_STAGGER_MS}
        key={`${word}-${baseDelayMs + index * WORD_STAGGER_MS}`}
        word={word}
      />
    ));
}
