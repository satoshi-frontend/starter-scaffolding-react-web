import type { ReactNode } from "react";

/**
 * @description Traduccion de prueba que devuelve la clave tal cual.
 * @param key Clave de traduccion solicitada.
 * @returns La misma clave recibida.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const mockT = (key: string): string => key;

/**
 * @description Mock del modulo @satoshi/rc-ui para pruebas de pantalla.
 * @author Steveen Cues
 * @version 1.0.0
 */
export const satoshiRcUiMock: Record<string, unknown> = {
  Button: ({
    children,
    onClick,
  }: {
    children: ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
  Card: ({ children }: { children: ReactNode }) => (
    <article>{children}</article>
  ),
  Container: ({
    as: Tag = "div",
    children,
    id,
  }: {
    as?: "div" | "section";
    children: ReactNode;
    id?: string;
  }) => <Tag id={id}>{children}</Tag>,
  CookieConsent: ({
    onPreferenceSaved,
  }: {
    onPreferenceSaved?: () => void;
  }) => (
    <button onClick={onPreferenceSaved} type="button">
      Save privacy choice
    </button>
  ),
  FormField: ({
    label,
    onChange,
    required,
    type,
    value,
  }: {
    label: string;
    onChange?: (value: string) => void;
    required?: boolean;
    type?: string;
    value?: string;
  }) => (
    <label>
      {label}
      <input
        onChange={(event) => onChange?.(event.target.value)}
        required={required}
        type={type}
        value={value ?? ""}
      />
    </label>
  ),
  GuidedTour: ({ enabled }: { enabled?: boolean }) => (
    <div data-testid="guided-tour" data-enabled={enabled} />
  ),
  Header: () => <header />,
  HeaderSpacer: ({ className = "" }: { className?: string }) => (
    <div data-testid="header-spacer" className={className} />
  ),
  Stat: () => <div />,
  SectionHeading: ({
    id,
    eyebrow,
    subtitle,
    title,
  }: {
    id?: string;
    eyebrow?: string;
    subtitle?: string;
    title: string;
  }) => (
    <header>
      {eyebrow !== undefined && eyebrow !== "" && <p>{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {subtitle !== undefined && subtitle !== "" && <p>{subtitle}</p>}
    </header>
  ),
  Textarea: ({
    ariaLabel,
    onChange,
    required,
    value,
  }: {
    ariaLabel: string;
    onChange?: (value: string) => void;
    required?: boolean;
    value?: string;
  }) => (
    <textarea
      aria-label={ariaLabel}
      onChange={(event) => onChange?.(event.target.value)}
      required={required}
      value={value ?? ""}
    />
  ),
  useLanguage: () => ({ t: mockT }),
};
