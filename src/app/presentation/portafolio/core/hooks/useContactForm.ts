import { useState } from "react";

import type {
  ContactFormResult,
  ContactFormValues,
  Translate,
} from "@portafolio";
import type { FormEvent } from "react";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

/**
 * @description Gestiona el formulario de contacto y abre el borrador de correo.
 * @param t Funcion de traduccion del contexto de idioma.
 * @returns Los valores, el estado del borrador y las acciones del formulario.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function useContactForm(t: Translate): ContactFormResult {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [draftOpened, setDraftOpened] = useState(false);

  const updateField = (field: keyof ContactFormValues, value: string): void => {
    setValues((current) => ({ ...current, [field]: value }));
    setDraftOpened(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `${t("portfolio.contact.form.subject")}: ${values.name}`,
    );
    const body = encodeURIComponent(
      [
        `${t("portfolio.contact.form.name")}: ${values.name}`,
        `${t("portfolio.contact.form.email")}: ${values.email}`,
        "",
        `${t("portfolio.contact.form.message")}:`,
        values.message,
      ].join("\n"),
    );

    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    setDraftOpened(true);
  };

  return { values, draftOpened, updateField, submit };
}
