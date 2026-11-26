import { Button, Container } from "@satoshi/rc-ui";

import {
  COUNTER_PADDING_WIDTH,
  HERO_ACCENT_BASE_DELAY_MS,
  SOCIAL_LINKS,
  PROJECTS,
  heroStyle,
  renderHeroWords,
  scrollToSection,
  type HeroSectionProps,
} from "@portafolio";

import type { JSX } from "react";

/**
 * @description Presenta la seccion hero con el carrusel de proyectos destacados.
 * @param props Contiene la traduccion, el proyecto activo y los manejadores.
 * @returns La seccion hero del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function HeroSection(props: HeroSectionProps): JSX.Element {
  const { t, project, onChange, onInteract } = props;
  const title = t("portfolio.hero.title");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-6rem)] items-end overflow-hidden bg-neutral text-secondary-content"
      id="hero"
    >
      <img
        alt={t(project.imageAlt)}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        decoding="async"
        fetchPriority="high"
        key={project.image}
        src={project.image}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
      <Container
        className="w-full pb-24 pt-40 md:pb-28"
        direction="column"
        maxWidth="xl"
        padding="md"
      >
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="space-y-6">
            <h1
              aria-label={title}
              className="hero-fade-up max-w-3xl text-5xl font-bold tracking-tight md:text-7xl"
            >
              {renderHeroWords(title, 0, false)}
              {renderHeroWords(
                t("portfolio.hero.titleAccent"),
                title.split(" ").length * HERO_ACCENT_BASE_DELAY_MS,
                true,
              )}
            </h1>
            <p
              className="hero-fade-up max-w-xl text-lg text-secondary-content/80"
              style={heroStyle("500ms")}
            >
              {t("portfolio.hero.description")}
            </p>
            <div
              className="hero-fade-up flex flex-wrap items-center gap-4"
              style={heroStyle("650ms")}
            >
              <Button onClick={() => scrollToSection("work")} variant="primary">
                {t("portfolio.hero.primaryCta")}{" "}
                <span aria-hidden="true">â†—</span>
              </Button>
              <a className="link link-hover" href="#about">
                {t("portfolio.hero.secondaryCta")}
              </a>
            </div>
            <p
              className="hero-fade-up text-sm text-secondary-content/70"
              style={heroStyle("800ms")}
            >
              {t("portfolio.hero.note")}
            </p>
          </div>
          <div
            aria-label={t("portfolio.carousel.label")}
            aria-roledescription={t("portfolio.carousel.roleDescription")}
            className="hero-fade-up hidden items-end gap-3 md:flex"
            onBlurCapture={(event) => {
              if (
                !(event.relatedTarget instanceof Node) ||
                !event.currentTarget.contains(event.relatedTarget)
              ) {
                onInteract(false);
              }
            }}
            onFocusCapture={() => onInteract(true)}
            onMouseEnter={() => onInteract(true)}
            onMouseLeave={() => onInteract(false)}
            role="region"
            style={heroStyle("700ms")}
          >
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  aria-label={t(`portfolio.social.${link.name}`)}
                  className="btn btn-circle btn-ghost border border-white/20 text-secondary-content hover:border-primary hover:text-primary"
                  href={link.href}
                  key={link.name}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span aria-hidden="true" className="text-lg">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
            <div className="flex flex-col items-center gap-2 pb-1">
              <button
                aria-label={t("portfolio.carousel.previous")}
                className="btn btn-circle btn-sm border border-white/20 text-secondary-content hover:border-primary hover:text-primary"
                onClick={() => onChange("previous")}
                type="button"
              >
                <span aria-hidden="true">â†‘</span>
              </button>
              <span className="text-xs tabular-nums text-secondary-content/70">
                {project.number} /{" "}
                {String(PROJECTS.length).padStart(COUNTER_PADDING_WIDTH, "0")}
              </span>
              <button
                aria-label={t("portfolio.carousel.next")}
                className="btn btn-circle btn-sm border border-white/20 text-secondary-content hover:border-primary hover:text-primary"
                onClick={() => onChange("next")}
                type="button"
              >
                <span aria-hidden="true">â†“</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
