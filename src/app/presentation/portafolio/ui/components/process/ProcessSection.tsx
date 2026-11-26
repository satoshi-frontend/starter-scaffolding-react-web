import { Container, SectionHeading } from "@satoshi/rc-ui";

import {
  COUNTER_PADDING_WIDTH,
  PROCESS_STEPS,
  type SectionProps,
} from "@portafolio";

import type { JSX } from "react";

/**
 * @description Presenta los pasos del proceso de trabajo de Satoshi.
 * @param props Contiene la funcion de traduccion.
 * @returns La seccion de proceso del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function ProcessSection(props: SectionProps): JSX.Element {
  const { t } = props;

  return (
    <Container
      as="section"
      className="space-y-8"
      direction="column"
      id="process"
      maxWidth="xl"
      padding="md"
      sectionSpacing="standard"
    >
      <SectionHeading
        eyebrow={t("portfolio.process.kicker")}
        level={2}
        size="lg"
        subtitle={t("portfolio.process.description")}
        title={t("portfolio.process.title")}
      />
      <ol className="steps steps-vertical w-full lg:steps-horizontal">
        {PROCESS_STEPS.map((step, index) => (
          <li className="step step-primary" key={step}>
            <div className="card mt-4 w-full bg-base-200 text-left shadow-sm">
              <div className="card-body p-5">
                <span className="text-sm font-semibold text-primary">
                  {String(index + 1).padStart(COUNTER_PADDING_WIDTH, "0")}
                </span>
                <h3 className="card-title text-lg">{t(`${step}.title`)}</h3>
                <p className="text-sm text-base-content/70">
                  {t(`${step}.description`)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
