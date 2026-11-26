import { CookieConsent, GuidedTour } from "@satoshi/rc-ui";
import { useMemo, useState } from "react";

import {
  COOKIE_CONSENT_STORAGE_KEY,
  useProjectCarousel,
  hasSavedCookiePreference,
  AboutSection,
  ClientsSection,
  ContactSection,
  FaqSection,
  HeroSection,
  PrivacySection,
  ProcessSection,
  ProjectsSection,
  ServicesSection,
  ValueSection,
  SiteFooter,
  SiteHeader,
  type PortafolioScreenProps,
} from "@portafolio";

import type { JSX } from "react";

/**
 * @description Presenta el portafolio digital de Satoshi Software Solutions.
 * @param props Contiene la funcion de traduccion inyectada por el host.
 * @returns La pantalla completa del portafolio.
 * @author Steveen Cues
 * @version 2.0.0
 */
export function PortafolioScreen(props: PortafolioScreenProps): JSX.Element {
  const { t } = props;
  const [hasPrivacyChoice, setHasPrivacyChoice] = useState(
    hasSavedCookiePreference,
  );
  const carousel = useProjectCarousel();
  const tourSteps = useMemo(
    () => [
      {
        targetId: "hero",
        title: t("portfolio.tour.steps.intro.title"),
        description: t("portfolio.tour.steps.intro.description"),
      },
      {
        targetId: "work",
        title: t("portfolio.tour.steps.work.title"),
        description: t("portfolio.tour.steps.work.description"),
      },
      {
        targetId: "services",
        title: t("portfolio.tour.steps.services.title"),
        description: t("portfolio.tour.steps.services.description"),
      },
      {
        targetId: "process",
        title: t("portfolio.tour.steps.process.title"),
        description: t("portfolio.tour.steps.process.description"),
      },
      {
        targetId: "contact",
        title: t("portfolio.tour.steps.contact.title"),
        description: t("portfolio.tour.steps.contact.description"),
      },
    ],
    [t],
  );

  return (
    <div
      className="min-h-screen scroll-pt-28 bg-base-100 text-base-content md:scroll-pt-36"
      id="top"
    >
      <SiteHeader t={t} />
      <main>
        <HeroSection
          onChange={carousel.changeProject}
          onInteract={carousel.setIsInteracting}
          project={carousel.project}
          t={t}
        />
        <ClientsSection t={t} />
        <ProjectsSection onSelect={carousel.setActiveProject} t={t} />
        <ValueSection t={t} />
        <ServicesSection t={t} />
        <ProcessSection t={t} />
        <FaqSection t={t} />
        <AboutSection t={t} />
        <ContactSection t={t} />
      </main>
      <PrivacySection t={t} />
      <SiteFooter t={t} />
      <GuidedTour
        enabled={hasPrivacyChoice}
        steps={tourSteps}
        translations={{
          openGuide: t("portfolio.tour.openGuide"),
          stepOf: t("portfolio.tour.stepOf"),
          back: t("portfolio.tour.back"),
          next: t("portfolio.tour.next"),
          skip: t("portfolio.tour.skip"),
          finish: t("portfolio.tour.finish"),
        }}
      />
      <CookieConsent
        onPreferenceSaved={() => setHasPrivacyChoice(true)}
        storageKey={COOKIE_CONSENT_STORAGE_KEY}
        translations={{
          title: t("portfolio.privacy.consent.title"),
          description: t("portfolio.privacy.consent.description"),
          details: t("portfolio.privacy.consent.details"),
          settings: t("portfolio.privacy.consent.settings"),
          necessary: t("portfolio.privacy.consent.necessary"),
          optional: t("portfolio.privacy.consent.optional"),
          acceptAll: t("portfolio.privacy.consent.acceptAll"),
          necessaryOnly: t("portfolio.privacy.consent.necessaryOnly"),
          manage: t("portfolio.privacy.consent.manage"),
          save: t("portfolio.privacy.consent.save"),
        }}
      />
    </div>
  );
}
