import '@testing-library/jest-dom';

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (media: string): MediaQueryList => ({
      addEventListener: () => undefined,
      addListener: () => undefined,
      dispatchEvent: () => true,
      matches: false,
      media,
      onchange: null,
      removeEventListener: () => undefined,
      removeListener: () => undefined,
    }),
  });
});
