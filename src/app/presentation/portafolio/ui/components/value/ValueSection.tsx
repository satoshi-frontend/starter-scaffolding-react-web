import { Card, Container, SectionHeading } from "@satoshi/rc-ui";

import {
  COUNTER_PADDING_WIDTH,
  VALUE_POINTS,
  type SectionProps,
} from "@portafolio";

import type { JSX } from "react";

/**
 * @description Presenta los puntos de valor de la propuesta de Satoshi.
 * @param props Contiene la funcion de traduccion.
 * @returns La seccion de valor del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function ValueSection(props: SectionProps): JSX.Element {
  const { t } = props;

  return (
    <Container
      as="section"
      className="space-y-8 bg-base-200"
      direction="column"
      id="value"
      maxWidth="full"
      padding="md"
      sectionSpacing="standard"
    >
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <SectionHeading
          eyebrow={t("portfolio.value.kicker")}
          level={2}
          size="lg"
          subtitle={t("portfolio.value.description")}
          title={t("portfolio.value.title")}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {VALUE_POINTS.map((point, index) => (
            <Card
              className="card border border-base-300 bg-base-100 shadow-sm"
              key={point}
              variant="base"
            >
              <div className="card-body">
                <span className="badge badge-primary badge-outline">
                  {String(index + 1).padStart(COUNTER_PADDING_WIDTH, "0")}
                </span>
                <h3 className="card-title mt-3">{t(`${point}.title`)}</h3>
                <p className="text-base-content/70">
                  {t(`${point}.description`)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
