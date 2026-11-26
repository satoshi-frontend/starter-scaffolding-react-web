import { Container, SectionHeading } from "@satoshi/rc-ui";

import { FAQ_ITEMS, type SectionProps } from "@portafolio";

import type { JSX } from "react";

/**
 * @description Presenta las preguntas frecuentes del portafolio.
 * @param props Contiene la funcion de traduccion.
 * @returns La seccion de preguntas frecuentes del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function FaqSection(props: SectionProps): JSX.Element {
  const { t } = props;

  return (
    <Container
      as="section"
      className="space-y-8"
      direction="column"
      id="faq"
      maxWidth="xl"
      padding="md"
      sectionSpacing="standard"
    >
      <SectionHeading
        eyebrow={t("portfolio.faq.kicker")}
        level={2}
        size="lg"
        subtitle={t("portfolio.faq.description")}
        title={t("portfolio.faq.title")}
      />
      <div className="flex w-full min-w-0 flex-col gap-3">
        {FAQ_ITEMS.map((item) => (
          <details
            className="collapse-arrow collapse w-full min-w-0 rounded-box border border-base-300 bg-base-100"
            key={item}
          >
            <summary className="collapse-title font-semibold">
              {t(`${item}.question`)}
            </summary>
            <p className="collapse-content text-base-content/70">
              {t(`${item}.answer`)}
            </p>
          </details>
        ))}
      </div>
      <a className="btn btn-primary self-start" href="#contact">
        {t("portfolio.faq.cta")} <span aria-hidden="true">â†—</span>
      </a>
    </Container>
  );
}
