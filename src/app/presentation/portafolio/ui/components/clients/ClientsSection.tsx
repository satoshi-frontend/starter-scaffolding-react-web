import { Container } from "@satoshi/rc-ui";

import { CLIENT_BRANDS, type SectionProps } from "@portafolio";

import type { JSX } from "react";

/**
 * @description Presenta la franja de clientes y tecnologias del portafolio.
 * @param props Contiene la funcion de traduccion.
 * @returns La seccion de clientes del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function ClientsSection(props: SectionProps): JSX.Element {
  const { t } = props;

  return (
    <section
      aria-label={t("portfolio.clients.label")}
      className="border-y border-base-300"
    >
      <Container className="py-8" direction="column" maxWidth="xl" padding="md">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-semibold text-base-content/70">
            {t("portfolio.clients.title")}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-5 text-lg font-bold md:gap-10">
            {CLIENT_BRANDS.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
