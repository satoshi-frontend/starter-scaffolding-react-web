import { useLanguage } from "@satoshi/rc-ui";

import { PortafolioScreen } from "./portafolio";

import type { JSX } from "react";

/**
 * @description Punto de entrada de la aplicacion que monta el modulo portafolio.
 * @returns La aplicacion con el modulo portafolio activo.
 * @author Steveen Cues
 * @version 2.0.0
 */
export default function App(): JSX.Element {
  const { t } = useLanguage();

  return <PortafolioScreen t={t} />;
}
