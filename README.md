<p align="center">
  <img src="brand/orbitas-wordmark.png" alt="Órbitas" width="280" />
</p>

# Bitácora Abierta de Órbitas · Space Apps 2026

Guía comunitaria e independiente para el NASA Space Apps Challenge 2026 (14–15 de noviembre, tema *The Next Frontier*). Parte del proyecto educativo **Órbitas** (Aixa Benitez). Sin afiliación oficial con la NASA ni con el NASA Space Apps Challenge.

Repositorio: [Aixa11/Bitacora-Abierta-de-Orbitas](https://github.com/Aixa11/Bitacora-Abierta-de-Orbitas)

Stack: Vite + React 18 + TypeScript strict + Tailwind + React Router + Zustand + Leaflet + Three/R3F + satellite.js + PWA.

Idiomas de la interfaz (detección del navegador + selector en la barra): español, English, 中文, português, français, Deutsch, 日本語, हिन्दी, العربية, русский. El catálogo seed y las guías largas pueden seguir en español; la UI avisa cuando el idioma no es español.

## Requisitos

- Node.js 20+ y npm

## Instalación

```bash
npm install
npm run textures   # descarga texturas NASA (eoimages) y genera WebP 2K/4K
npm run dev        # http://127.0.0.1:5173
```

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run textures` | Descarga Blue Marble / Black Marble / nubes y genera WebP |
| `npm run build` | `prebuild` (texturas) + TypeScript + Vite |
| `npm run preview` | Vista previa de producción |
| `npm test` | Tests unitarios (Vitest) |
| `npm run test:e2e` | Playwright (usa `preview` en el puerto 4173) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio + hero 3D Tierra |
| `/ruta` | Ruta del dato (8 pasos) |
| `/desafios` · `/desafios/:id` | Desafíos 2026 (guías para *pensar*, no resolver) |
| `/sensores` | Temas + simulador 3D de sensores |
| `/laboratorio` | GIBS + EONET + CelesTrak + Kepler |
| `/bitacora` | Catálogo de herramientas + Mi kit |
| `/equipo` | Roles, cronograma 48 h, tablero |
| `/entrega` | Checklist, referencias, pitch |
| `/reglas` | Uso legal orientativo |
| `/charla` | Próximamente (contenido el 16 oct 2026) |
| `/glosario` | Términos GEOINT |
| `/ayuda` | Arranque 30 min, reloj 48 h, estudio NASA en español, explorador mundo↔desafíos, plantillas |

## Texturas NASA (sin descarga manual)

`npm run textures` usa URLs directas verificadas en `scripts/nasa-texture-sources.json` (Visible Earth / Earth Observatory vía `eoimages.gsfc.nasa.gov`). En desarrollo, Vite proxifica `/proxy/eoimages/...` porque el host no envía CORS. En producción, los WebP locales van en el deploy (`prebuild`).

Colecciones: [Blue Marble](https://visibleearth.nasa.gov/collection/1484/blue-marble) · [CGI Moon Kit](https://svs.gsfc.nasa.gov/4720) · [Deep Star Maps](https://svs.gsfc.nasa.gov/4851).

## Actualizar desafíos (28 de octubre de 2026)

Cuando se publiquen los enunciados completos, edita `src/content/challenges.json` (y opcionalmente `seed/challenges.json`) y completa `recursos_oficiales` de cada desafío. No inventes enlaces: usa solo URLs oficiales.

## Agregar una herramienta

1. Añade el objeto en `seed/tools.json` y copia a `src/content/tools.json` (o edita ambos).
2. Respeta el esquema Zod en `src/content/schema.ts` (id único, semáforo, URL, etc.).
3. Corre `npm test` (validación del catálogo).

También puedes usar el formulario «Sugerir una herramienta» en `/bitacora` (issue de GitHub prellenado; ajusta `GITHUB_NEW_ISSUE_URL` en `src/content/site.ts`).

## Fecha del webinar

Edita `fechaLabel` (y si hace falta el resto) en `src/content/talk.ts`.

## PWA

La app se registra como PWA (`vite-plugin-pwa`): precache del shell, JSON de contenido y texturas WebP. Útil con mala conexión durante el hackatón. Tras el primer `build` + visita, el service worker queda activo.

## Despliegue

### Vercel

1. Importa el repo.
2. Framework: Vite. Build: `npm run build`. Output: `dist`.
3. Asegura red en el build (para `prebuild` / texturas). Si el build no tiene red, sube los WebP generados localmente o desactiva el fallo de texturas (el script avisa y sigue con procedural).

### Netlify

1. Build: `npm run build`
2. Publish: `dist`
3. Redirect SPA: crea `public/_redirects` con `/*    /index.html   200` (ya incluido si está en el repo) o usa el plugin Vite SPA.

### Comprobar en local

```bash
npm run build
npm run preview
```

## Privacidad y legal

- Sin cookies de terceros ni analítica invasiva.
- Datos del usuario en `localStorage` (kit, progreso, notas); botón **Borrar mis datos** en el pie.
- Créditos de APIs y texturas en el pie. Sin logos de la NASA ni del Space Apps.

## Tests e2e

```bash
npm run build
npx playwright install chromium   # solo la primera vez
npm run test:e2e
```

Incluye recorrido en escritorio y móvil (Chromium + Pixel 5).
