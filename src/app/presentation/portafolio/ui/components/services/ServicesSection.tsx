import { Card, Container, SectionHeading } from "@satoshi/rc-ui";

import { SERVICES, type SectionProps } from "@portafolio";

import type { JSX } from "react";

/**
 * @description Presenta los servicios ofrecidos por Satoshi.
 * @param props Contiene la funcion de traduccion.
 * @returns La seccion de servicios del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function ServicesSection(props: SectionProps): JSX.Element {
  const { t } = props;

  return (
    <section
      aria-labelledby="services-title"
      className="bg-base-200"
      id="services"
    >
      <Container
        className="space-y-8"
        direction="column"
        maxWidth="xl"
        padding="md"
        sectionSpacing="standard"
      >
        <SectionHeading
          eyebrow={t("portfolio.services.kicker")}
          id="services-title"
          level={2}
          size="lg"
          subtitle={t("portfolio.services.intro")}
          title={t("portfolio.services.title")}
        />
        <div className="grid min-w-0 gap-4 md:grid-cols-3">
          {SERVICES.map((service) => (
            <Card
              className="card min-w-0 bg-base-100 shadow-sm"
              key={service.number}
              variant="base"
            >
              <div className="card-body min-w-0">
                <div className="flex items-center justify-between">
                  <span className="badge badge-outline">{service.number}</span>
                  <span aria-hidden="true" className="text-2xl text-primary">
                    {service.icon}
                  </span>
                </div>
                <h3 className="card-title mt-5 break-words">
                  {t(service.title)}
                </h3>
                <p className="break-words text-base-content/70">
                  {t(service.title.replace(".title", ".description"))}
                </p>
                <a
                  className="link link-primary mt-3 self-start"
                  href="#contact"
                >
                  {t("portfolio.services.discover")} â†—
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
