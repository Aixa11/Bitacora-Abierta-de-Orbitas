/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { celestrakProxyPlugin } from './scripts/vite-celestrak-proxy.mjs';

/** Proxies de desarrollo: hosts externos sin CORS usable desde el navegador.
 *  CelesTrak va por plugin propio (cortocircuito sin spam ETIMEDOUT). */
const apiProxies = {
  '/proxy/eoimages': {
    target: 'https://eoimages.gsfc.nasa.gov',
    changeOrigin: true,
    rewrite: (p: string) => p.replace(/^\/proxy\/eoimages/, ''),
  },
  '/proxy/ariss': {
    target: 'https://live.ariss.org',
    changeOrigin: true,
    rewrite: (p: string) => p.replace(/^\/proxy\/ariss/, ''),
    timeout: 6_000,
    proxyTimeout: 6_000,
  },
} as const;

export default defineConfig({
  plugins: [
    react(),
    celestrakProxyPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Bitácora Space Apps · Órbitas',
        short_name: 'Bitácora',
        description:
          'Guía abierta de GEOINT y datos abiertos para el NASA Space Apps Challenge 2026. Parte de Órbitas.',
        theme_color: '#05050A',
        background_color: '#05050A',
        display: 'standalone',
        lang: 'es',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        /** Shell + assets; solo texturas 2K para mala conexión en el hackatón. */
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2,json,png}', '**/textures/*-2k.webp'],
        globIgnores: ['**/textures/*-4k.webp'],
        navigateFallback: 'index.html',
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: { maxEntries: 8, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 16, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    proxy: { ...apiProxies },
  },
  preview: {
    proxy: { ...apiProxies },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
  },
});
