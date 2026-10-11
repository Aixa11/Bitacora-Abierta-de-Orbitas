import '@testing-library/jest-dom/vitest';

/** jsdom no implementa WebGL; evita ruido y carga de Canvas en tests. */
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  value: () => null,
});
