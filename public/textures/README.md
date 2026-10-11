# Texturas 3D (NASA, dominio público)

No hace falta descargar nada a mano.

```bash
npm run textures
```

Eso descarga Blue Marble / Black Marble / nubes desde `eoimages.gsfc.nasa.gov`
(URLs en `scripts/nasa-texture-sources.json`) y genera WebP 4K y 2K aquí.

## Por qué no se usan las URLs NASA “en vivo” en producción

`eoimages.gsfc.nasa.gov` no envía cabeceras CORS. El navegador no puede
usarlas como textura WebGL desde otro origen. Por eso:

1. **Desarrollo / preview (Vite):** el proxy `/proxy/eoimages/...` sirve de puente.
2. **Producción (Vercel/Netlify):** corre `npm run textures` (o el `prebuild`) y
   se despliegan los WebP locales.

## Colecciones oficiales

1. Blue Marble: https://visibleearth.nasa.gov/collection/1484/blue-marble
2. CGI Moon Kit: https://svs.gsfc.nasa.gov/4720
3. Deep Star Maps 2020: https://svs.gsfc.nasa.gov/4851

Crédito al usar las imágenes: NASA Earth Observatory / Visible Earth.
