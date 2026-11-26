import { Container, SectionHeading, Stat } from "@satoshi/rc-ui";

import type { SectionProps } from "@portafolio";
import type { JSX } from "react";

/**
 * @description Presenta la seccion sobre el equipo con estadisticas clave.
 * @param props Contiene la funcion de traduccion.
 * @returns La seccion sobre nosotros del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function AboutSection(props: SectionProps): JSX.Element {
  const { t } = props;

  return (
    <Container
      as="section"
      className="space-y-8"
      direction="column"
      id="about"
      maxWidth="xl"
      padding="md"
      sectionSpacing="standard"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <figure className="overflow-hidden rounded-box bg-base-200">
          <img
            alt={t("portfolio.about.imageAlt")}
            className="aspect-[4/3] w-full object-cover"
            decoding="async"
            loading="lazy"
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
          />
        </figure>
        <div className="space-y-5">
          <SectionHeading
            eyebrow={t("portfolio.about.kicker")}
            level={2}
            size="lg"
            subtitle={t("portfolio.about.description")}
            title={t("portfolio.about.title")}
          />
          <a className="link link-primary" href="#contact">
            {t("portfolio.about.cta")} â†—
          </a>
          <div className="stats stats-vertical mt-5 w-full shadow md:stats-horizontal">
            <Stat
              title={t("portfolio.about.stats.years")}
              value="01"
              variant="primary"
            />
            <Stat
              title={t("portfolio.about.stats.projects")}
              value="02"
              variant="primary"
            />
            <Stat
              title={t("portfolio.about.stats.awards")}
              value="03"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
