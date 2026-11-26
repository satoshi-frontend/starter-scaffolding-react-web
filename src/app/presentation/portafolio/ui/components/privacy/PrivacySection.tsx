import { Container } from "@satoshi/rc-ui";

import type { SectionProps } from "@portafolio";
import type { JSX } from "react";

/**
 * @description Presenta la seccion de privacidad y tratamiento de datos.
 * @param props Contiene la funcion de traduccion.
 * @returns La seccion de privacidad del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function PrivacySection(props: SectionProps): JSX.Element {
  const { t } = props;

  return (
    <section
      aria-label={t("portfolio.privacy.title")}
      className="border-t border-base-300 bg-base-100"
      id="privacy"
    >
      <Container
        className="flex flex-col justify-between gap-4 py-8 md:flex-row md:items-center"
        maxWidth="xl"
        padding="md"
      >
        <div>
          <h2 className="font-semibold">{t("portfolio.privacy.title")}</h2>
          <p className="mt-1 max-w-2xl text-sm text-base-content/70">
            {t("portfolio.privacy.description")}
          </p>
        </div>
      </Container>
    </section>
  );
}
