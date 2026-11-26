import {
  Button,
  Card,
  Container,
  FormField,
  SectionHeading,
  Textarea,
} from "@satoshi/rc-ui";

import { useContactForm, type SectionProps } from "@portafolio";

import type { JSX } from "react";

/**
 * @description Presenta el formulario de contacto con borrador de correo.
 * @param props Contiene la funcion de traduccion.
 * @returns La seccion de contacto del portafolio.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function ContactSection(props: SectionProps): JSX.Element {
  const { t } = props;
  const { values, draftOpened, updateField, submit } = useContactForm(t);

  return (
    <section
      aria-labelledby="contact-title"
      className="bg-base-200"
      id="contact"
    >
      <Container
        className="space-y-8"
        direction="column"
        maxWidth="xl"
        padding="md"
        sectionSpacing="standard"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="min-w-0 space-y-5 lg:sticky lg:top-24">
            <SectionHeading
              eyebrow={t("portfolio.contact.badge")}
              level={2}
              size="lg"
              id="contact-title"
              subtitle={t("portfolio.contact.description")}
              title={t("portfolio.contact.title")}
            />
            <div className="divider divider-start min-w-0 whitespace-normal break-words">
              {t("portfolio.contact.responseTime")}
            </div>
            <p className="text-sm text-base-content/70">
              {t("portfolio.contact.emailNote")}
            </p>
          </div>
          <Card className="card min-w-0 bg-base-100 shadow-xl" variant="base">
            <form className="card-body gap-5" onSubmit={submit}>
              <FormField
                label={t("portfolio.contact.form.name")}
                onChange={(value: string) => updateField("name", value)}
                required
                type="text"
                value={values.name}
              />
              <FormField
                label={t("portfolio.contact.form.email")}
                onChange={(value: string) => updateField("email", value)}
                required
                type="email"
                value={values.email}
              />
              <label className="form-control gap-2">
                <span className="label-text font-medium">
                  {t("portfolio.contact.form.message")}
                </span>
                <Textarea
                  ariaLabel={t("portfolio.contact.form.message")}
                  className="min-h-36"
                  onChange={(value: string) => updateField("message", value)}
                  required
                  rows={5}
                  value={values.message}
                />
              </label>
              <p className="text-sm text-base-content/60">
                {t("portfolio.contact.form.sendNote")}
              </p>
              <Button type="submit" variant="primary">
                {t("portfolio.contact.form.submit")}
                <span aria-hidden="true">â†—</span>
              </Button>
              {draftOpened && (
                <p aria-live="polite" className="alert alert-success">
                  {t("portfolio.contact.form.draftOpened")}
                </p>
              )}
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}
