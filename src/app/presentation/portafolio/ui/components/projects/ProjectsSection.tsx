import { Card, Container, SectionHeading } from "@satoshi/rc-ui";

import {
  PROJECTS,
  scrollToSection,
  type ProjectsSectionProps,
} from "@portafolio";

import type { JSX } from "react";

/**
 * @description Presenta la cuadricula de proyectos destacados del portafolio.
 * @param props Contiene la traduccion y el manejador de seleccion de proyecto.
 * @returns La seccion de trabajos del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function ProjectsSection(props: ProjectsSectionProps): JSX.Element {
  const { t, onSelect } = props;

  return (
    <Container
      as="section"
      className="space-y-8"
      direction="column"
      id="work"
      maxWidth="xl"
      padding="md"
      sectionSpacing="standard"
    >
      <SectionHeading
        eyebrow={t("portfolio.work.kicker")}
        level={2}
        size="lg"
        subtitle={t("portfolio.work.intro")}
        title={t("portfolio.work.title")}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((item, index) => (
          <button
            aria-label={`${t("portfolio.work.openProject")} ${t(item.title)}`}
            className="text-left"
            key={item.number}
            onClick={() => {
              onSelect(index);
              scrollToSection("top");
            }}
            type="button"
          >
            <Card
              className="card bg-base-100 shadow-md transition-shadow hover:shadow-xl"
              variant="base"
            >
              <figure className="aspect-[4/3]">
                <img
                  alt={t(item.imageAlt)}
                  className="h-full w-full object-cover"
                  decoding="async"
                  loading="lazy"
                  src={item.image}
                />
              </figure>
              <div className="card-body">
                <p className="text-sm text-primary">{t(item.category)}</p>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="card-title">{t(item.title)}</h3>
                  <span className="badge badge-outline">{item.number}</span>
                </div>
                <p className="text-sm text-base-content/70">
                  {t(item.description)}
                </p>
              </div>
            </Card>
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-base-300 pt-5 sm:flex-row">
        <p className="text-sm text-base-content/70">
          {t("portfolio.work.footer")}
        </p>
        <a className="link link-primary" href="#contact">
          {t("portfolio.work.cta")} â†—
        </a>
      </div>
    </Container>
  );
}
