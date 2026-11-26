import { Header, HeaderSpacer } from "@satoshi/rc-ui";

import type { SectionProps } from "@portafolio";
import type { JSX } from "react";

/**
 * @description Presenta el header fijo con navegacion del portafolio.
 * @param props Contiene la funcion de traduccion.
 * @returns El header del sitio del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function SiteHeader(props: SectionProps): JSX.Element {
  const { t } = props;

  return (
    <>
      <Header
        logo={{
          src: "/LightBackgroundLogo.png",
          alt: t("portfolio.brand"),
          href: "#top",
          width: 150,
          height: 84,
        }}
        navigationItems={[
          { label: t("portfolio.navigation.work"), href: "#work" },
          { label: t("portfolio.navigation.services"), href: "#services" },
          { label: t("portfolio.navigation.faq"), href: "#faq" },
          { label: t("portfolio.navigation.about"), href: "#about" },
        ]}
        showThemeSelector
        showLanguageSelector
        logoPosition="left"
        position="fixed"
        surface="transparent"
        mobileSelectors="compact"
        translations={{
          menuOpen: "menu.open",
          menuClose: "menu.close",
          navigationLabel: "navigation.main",
        }}
        additionalActions={
          <a className="btn btn-primary btn-sm" href="#contact">
            {t("portfolio.navigation.contact")}{" "}
            <span aria-hidden="true">â†—</span>
          </a>
        }
      />
      <HeaderSpacer compact position="fixed" />
      <div aria-hidden="true" className="h-8 md:h-10" />
    </>
  );
}
