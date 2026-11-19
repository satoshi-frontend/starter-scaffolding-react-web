/**
 * @description Configura window.matchMedia para el entorno jsdom.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function setupMatchMediaMock(): void {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (media: string): MediaQueryList => ({
      addEventListener: (): void => {
        return;
      },
      addListener: (): void => {
        return;
      },
      dispatchEvent: () => true,
      matches: false,
      media,
      onchange: null,
      removeEventListener: (): void => {
        return;
      },
      removeListener: (): void => {
        return;
      },
    }),
  });
}

/**
 * @description Limpia el almacenamiento local y restaura los mocks de entorno.
 * @author Steveen Cues
 * @version 1.0.0
 */
export function resetBrowserEnvironment(): void {
  window.localStorage.clear();
  setupMatchMediaMock();
}
