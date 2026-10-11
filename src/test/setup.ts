import '@testing-library/jest-dom/vitest';

/** Forzar español en tests para aserciones estables del seed. */
localStorage.setItem(
  'orbitas-bitacora',
  JSON.stringify({ state: { theme: 'dark', locale: 'es' }, version: 0 }),
);

/** jsdom no implementa WebGL; evita ruido y carga de Canvas en tests. */
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  value: () => null,
});
