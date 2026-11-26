import type { SectionProps } from "@portafolio";
import type { JSX } from "react";

/**
 * @description Presenta el pie de pagina con marca y enlace de retorno.
 * @param props Contiene la funcion de traduccion.
 * @returns El pie de pagina del sitio del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function SiteFooter(props: SectionProps): JSX.Element {
  const { t } = props;

  return (
    <footer className="footer footer-center bg-base-200 p-8 text-base-content">
      <a aria-label={t("portfolio.brand")} href="#top">
        <img
          alt=""
          className="w-40"
          height="89"
          src="/LightBackgroundLogo.png"
          width="160"
        />
      </a>
      <p>
        © {new Date().getFullYear()} {t("portfolio.brand")}.{" "}
        {t("portfolio.footer.rights")}
      </p>
      <a className="link link-hover" href="#top">
        {t("portfolio.footer.backToTop")} ↑
      </a>
    </footer>
  );
}
