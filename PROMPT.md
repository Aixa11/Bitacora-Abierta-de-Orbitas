# Prompt maestro para Cursor: Bitácora Space Apps · Órbitas

> **Cómo usarlo:** abre esta carpeta en Cursor. Las reglas de `.cursor/rules/bitacora.mdc` se cargan solas. Copia la sección **"Prompt principal"** en el chat de Cursor (modo Agent) y luego ejecuta las **fases** de abajo, una por una. No pegues todo junto: Cursor rinde mejor por etapas y verificando cada fase.

---

## Prompt principal

```
Actúa como un equipo senior (tech lead frontend, ingeniero/a 3D WebGL, especialista GEOINT y diseñador/a de producto) y construye desde cero la "Bitácora Space Apps", una guía abierta que forma parte de Órbitas, el proyecto educativo y comunitario de Aixa Benitez (Directora GEOINT, mentora NASA Space Apps). Es el material de apoyo del webinar "Del satélite a tu proyecto: GEOINT, datos abiertos y una sorpresa en órbita" para NASA Space Apps Chiclayo, abierto a participantes de todo el mundo.

OBJETIVO
Una web app en español (neutro, con "tú"), totalmente funcional, estática, sin backend obligatorio y sin claves de API para lo esencial, lista para desplegar en Vercel o Netlify. Debe ayudar a cualquier equipo, principiante o avanzado, a recorrer el NASA Space Apps Challenge 2026 (14–15 de noviembre de 2026, tema "The Next Frontier") desde la elección del desafío hasta la entrega.

LEE PRIMERO (contenido verificado, NO inventes datos):
- seed/tools.json → 123 herramientas y APIs con origen, categoría, tipo, acceso, nivel y semáforo legal.
- seed/challenges.json → los 14 desafíos 2026 con guías para PENSARLOS (nunca resolverlos).
- reference/ → prototipo funcional anterior (index.html, app.js, styles.css, data.js). Reutiliza su contenido: ruta de 8 pasos, selector de sensores, laboratorio GIBS + EONET + CelesTrak, reglas legales y "Mi kit". Mejora el diseño y la arquitectura, pero conserva los textos y la lógica que ya funcionan.

REGLA EDITORIAL CRÍTICA
Los tutoriales de desafíos enseñan a pensar: método, preguntas guía, conceptos, dónde explorar, perfiles, trampas y autoevaluación. PROHIBIDO proponer soluciones, ideas de producto cerradas, arquitecturas finales o código que resuelva un desafío. Las simulaciones 3D explican conceptos generales (órbitas, sensores, iluminación, escala). Ninguna implementa el entregable de un desafío. Por ejemplo, NO construyas un comparador de sitios lunares, un armonizador MODIS/VIIRS, un visor de SPHEREx ni un sonificador del EIC.

STACK
- Vite + React 18 + TypeScript (strict) + React Router.
- Tailwind CSS v3 con tokens CSS propios (ver diseño). Sin librerías de UI pesadas; componentes propios accesibles (Radix UI permitido para diálogos, tabs y popovers).
- 3D: three + @react-three/fiber + @react-three/drei + @react-three/postprocessing.
- Mapas 2D: Leaflet (o MapLibre GL) con mosaicos NASA GIBS.
- Órbitas: satellite.js (SGP4) con TLE de CelesTrak.
- Búsqueda: Fuse.js sobre tools.json.
- Estado: Zustand con persistencia en localStorage (kit, progreso, favoritos, preferencias).
- Contenido: JSON en /src/content importado de seed/. Las guías largas en MDX (opcional).
- Calidad: ESLint + Prettier, Vitest + Testing Library, Playwright e2e, Lighthouse CI.
- PWA con vite-plugin-pwa: precache del shell, contenido y texturas en baja resolución para usar la guía con mala conexión durante el hackatón.

DISEÑO (identidad Órbitas, igual a https://orbitas-space-path.base44.app/)
- Modo oscuro por defecto con alternativa clara. Fondo casi negro (#05050A) con grilla sutil y halos violeta/azul.
- Acento: degradado violeta → azul (#7C3AED → #3B82F6). Secundarios: aqua (#5FE0FF) para datos, coral (#FF8F6B) para alertas y satélites, lima (#BAF57D) para estados OK.
- Tipografía: Space Grotesk (títulos), Inter (texto), JetBrains Mono (etiquetas, datos y código). Etiquetas en mayúsculas con tracking amplio, estilo "/ RENDER 3D PBR /".
- Tarjetas con borde fino violeta translúcido, radios de 24–32 px y glass sutil. Mucho aire y jerarquía clara.
- Logo Órbitas: reutiliza el SVG del prototipo (reference/index.html), con una variante "Bitácora Space Apps".
- Movimiento: transiciones de 200–400 ms. Respeta prefers-reduced-motion: sin autoplay 3D, con una imagen estática de respaldo.

ESTRUCTURA DE RUTAS
/                → Inicio: hero 3D (Tierra a escala real con satélites reales), fechas clave, accesos.
/ruta            → Ruta del dato en 8 pasos (del reference), con progreso guardado y checklist por paso.
/desafios        → Los 14 desafíos 2026: filtros por dificultad, temas y tipo; tarjetas con enlace oficial.
/desafios/:id    → Guía para pensar el desafío (ver plantilla abajo).
/sensores        → Selector "¿Qué quieres observar?" + simulador 3D de sensores.
/laboratorio     → Laboratorio en vivo: mapa 2D GIBS + EONET + CelesTrak, globo 3D y simulador orbital Kepler.
/bitacora        → Catálogo de 123+ herramientas con búsqueda y filtros combinables, más "Mi kit".
/equipo          → Planificador del equipo: roles, cronograma de 48 h, tablero de tareas local.
/entrega         → Checklist de entrega, generador de referencias y guía de pitch/demo.
/reglas          → Uso legal basado en los Términos 2026.
/charla          → Webinar, bio de Aixa, enlaces a LinkedIn e Instagram.
/glosario        → Glosario GEOINT y espacial (SAR, NDVI, STAC, COG, TLE, SSO, swath, etc.).
404 con estilo propio.

MÓDULOS DETALLADOS

1) Hero 3D "Tierra en tiempo real" (a escala real)
- Unidades: 1 unidad = 1 km. Elipsoide WGS84 (a = 6378.137 km, b = 6356.752 km).
- Texturas NASA de dominio público: Blue Marble (día), Black Marble (noche), nubes y mapa especular. 4K (4096×2048) por defecto y 8K opcional en equipos potentes (detectar GPU/memoria). Comprimir a KTX2/Basis o WebP.
- Terminador día/noche real: calcula el punto subsolar para la fecha y hora UTC actuales, y mezcla día y noche en un shader con transición suave. Las luces de ciudades aparecen solo en el lado nocturno.
- Atmósfera: shader de dispersión con efecto Fresnel (borde azul) y bloom sutil. Fondo de estrellas con Deep Star Maps 2020 de NASA SVS.
- Satélites reales desde CelesTrak (ISS, Landsat 8 y 9, Sentinel-1A/C, Sentinel-2A/B, Terra, Aqua, Suomi NPP, NOAA-20, SAOCOM 1A/1B, NISAR si está en el catálogo). Busca los NORAD ID en CelesTrak; no los inventes.
  - Posición propagada con SGP4 cada segundo, órbita trazada a una vuelta y línea al nadir.
  - Huella del barrido del sensor (swath) proyectada sobre la superficie.
  - Etiquetas con altitud, velocidad e inclinación.
- Controles: OrbitControls con amortiguación, zoom desde 500 km hasta la distancia de la Luna (384.400 km). Barra de tiempo: pausar, x1, x60, x600, con reloj UTC visible.
- Interacción: clic en un satélite → panel con misión, agencia, tipo de sensor, órbita, enlace a su ficha en la Bitácora y botón "ver qué observa hoy" (abre el Laboratorio con la capa GIBS correspondiente).
- Comparador de escala: "si la Tierra fuera una pelota de 30 cm, la ISS estaría a 1 cm y la órbita GEO a 85 cm", animado y calculado con las distancias reales.

2) Simulador 3D de sensores (/sensores)
- Escena donde eliges un sensor (óptico, radar SAR, térmico, atmosférico) y ves:
  - geometría de observación (nadir frente a vista lateral del SAR);
  - ancho de barrido a escala;
  - efecto de las nubes (el óptico se bloquea, el SAR atraviesa);
  - día y noche (el SAR y el térmico funcionan de noche);
  - resolución espacial con un "píxel" escalable sobre un terreno de ejemplo.
- Tabla de referencia en src/content/sensors.ts, con campo "fuente" por valor. Ancho de barrido aproximado: Landsat 8/9 OLI 185 km · Sentinel-2 MSI 290 km · Sentinel-1 IW 250 km · MODIS 2.330 km · VIIRS ~3.000 km · NISAR ~240 km. Verifica cada valor en la ficha oficial de la misión antes de publicar y cita la URL.
- Integración con el selector "¿Qué quieres observar?" del reference: cada tema configura el sensor sugerido y ofrece "Ver en el laboratorio".

3) Laboratorio en vivo (/laboratorio)
- Mapa 2D con mosaicos NASA GIBS (verificados y funcionando, plantilla WMTS EPSG:3857):
  https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{LAYER}/default/{YYYY-MM-DD}/GoogleMapsCompatible_Level{N}/{z}/{y}/{x}.{ext}
  Capas: MODIS_Terra_CorrectedReflectance_TrueColor (L9, jpg) · VIIRS_SNPP_CorrectedReflectance_TrueColor (L9, jpg) · MODIS_Terra_CorrectedReflectance_Bands721 (L9, jpg) · MODIS_Terra_NDVI_8Day (L9, png) · MODIS_Terra_Land_Surface_Temp_Day (L7, png) · GHRSST_L4_MUR_Sea_Surface_Temperature (L7, png) · IMERG_Precipitation_Rate (L6, png) · MODIS_Terra_Aerosol (L6, png) · VIIRS_SNPP_DayNightBand_At_Sensor_Radiance (L8, png) · VIIRS_Black_Marble (L8, png, fecha fija 2016-01-01).
  - Selector de fecha con default de hoy menos 2 días.
  - Modo "antes / después" con cortina deslizante entre dos fechas.
  - Opacidad, leyenda por capa y explicación GEOINT de qué muestra cada una.
- Eventos naturales activos de NASA EONET (CORS abierto): https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=200
  Marcadores por categoría, filtros, popup con fuente y "centrar y ver la capa recomendada".
- Satélites de CelesTrak (CORS abierto): https://celestrak.org/NORAD/elements/gp.php?CATNR={NORAD}&FORMAT=tle
  Traza en el suelo, próximas pasadas sobre una ubicación elegida (geolocalización opcional, con permiso), y tabla de elevación y hora.
- Simulador orbital Kepler (como el Laboratorio de Órbitas):
  - sliders de altitud (200–35.786 km), inclinación y excentricidad;
  - cálculo en vivo de período T = 2π√(a³/μ), velocidad v = √(μ/a) y vueltas por día, con μ = 398.600,4418 km³/s²;
  - preajustes LEO, SSO, MEO, GEO, Molniya e ISS.
- Panel "¿Cómo se hizo?" con las URLs reales de cada llamada y fragmentos copiables (fetch, Python con requests).
- Manejo de errores: timeouts de 8 s, reintento manual, caché en memoria de 10 min y mensajes claros si una API no responde. El resto del laboratorio sigue funcionando.

4) Desafíos 2026 (/desafios y /desafios/:id)
- Lista desde seed/challenges.json con filtros por dificultad, temas y tipo, y buscador.
- Cada guía tiene esta plantilla fija:
  a) Resumen en español + enlace al enunciado oficial (en inglés).
  b) Tipo de desafío y dificultad.
  c) "Cómo pensarlo": el método general de 7 pasos aplicado como preguntas para que el equipo complete (con campos de texto que se guardan en localStorage y se exportan a Markdown).
  d) Preguntas guía.
  e) Conceptos que conviene aprender, con enlaces al glosario.
  f) Dónde explorar: tarjetas de la Bitácora vinculadas por id. Aclara que son puntos de partida, no la receta.
  g) Perfiles útiles en el equipo.
  h) Trampas comunes.
  i) Autoevaluación antes de entregar.
  j) Recursos oficiales: bloque vacío "Se publican el 28 de octubre de 2026" que se completa editando el JSON.
- Botón "Agregar recursos de esta guía a Mi kit".
- Aviso visible: "Esta guía no resuelve el desafío. El trabajo y las ideas son de tu equipo."

5) Bitácora (/bitacora)
- 123+ tarjetas desde seed/tools.json. Filtros combinables:
  - para qué: explorar, consumir datos, datos temáticos, procesar, mapas, IA y agentes, órbitas, aprender;
  - origen, tipo, acceso, nivel y semáforo legal;
  - cada filtro con su contador.
- Búsqueda difusa sin acentos. Orden por relevancia, nombre o nivel.
- Vista de tarjetas y de tabla. Paginación incremental. Los filtros se reflejan en la URL para compartirlos.
- Tarjeta: origen, semáforo, nombre, organización, descripción, snippet copiable, etiquetas, "Abrir sitio" y "+ Mi kit".
- "Mi kit": panel lateral persistente. Exporta a:
  - Markdown con una tabla de referencias lista para pegar en la entrega;
  - JSON;
  - un BibTeX simple.
  Incluye la fecha de acceso y un recordatorio de completar misión, producto y versión.
- Formulario "Sugerir una herramienta" que genera un issue prellenado en GitHub (URL de issue nuevo con título y cuerpo), sin backend.

6) Equipo (/equipo)
- Roles sugeridos (datos, desarrollo, diseño, narrativa/pitch, coordinación) con descripción y checklist.
- Cronograma de 48 h del 14 y 15 de noviembre, editable, con hitos: idea cerrada, datos listos, prototipo, video/demo, entrega antes de las 23:59 hora local del domingo.
- Tablero simple de tareas (por hacer / en curso / hecho) con persistencia local y exportación.

7) Entrega (/entrega)
- Checklist:
  - al menos un recurso de la NASA;
  - todas las fuentes citadas;
  - licencia OSI elegida (si no hay ninguna, se aplica Apache 2.0);
  - sin datos propietarios ni controlados (ITAR/EAR);
  - uso de IA declarado;
  - demo probado;
  - página del proyecto completa;
  - menores de 18 sin fotos, voces ni imágenes propias o de otros menores, según las FAQ.
- Generador de la sección "Recursos utilizados" combinando Mi kit y las notas del equipo.
- Guía de pitch: estructura problema → usuario → datos → demo → impacto, con un temporizador para ensayar.

8) Reglas (/reglas)
- Usa el contenido del reference, con citas textuales cortas y enlaces a:
  https://www.spaceappschallenge.org/legal/
  https://www.spaceappschallenge.org/resources/participant-faqs/
  https://github.com/nasa/spaceapps/discussions/1550
- Explica el semáforo verde/amarillo.
- Aviso: "Guía orientativa, no asesoramiento legal. Prevalece el texto oficial."

9) Charla (/charla)
- Título "Del satélite a tu proyecto: GEOINT, datos abiertos y una sorpresa en órbita", 60 min con 15 min de preguntas, virtual y en español, fecha a confirmar (editable en src/content/talk.ts).
- Agenda: GEOINT 10 min · casos globales 7 min · datos abiertos 23 min · sorpresa 5 min · preguntas 15 min.
- Bio de Aixa Benitez, LinkedIn https://www.linkedin.com/in/aixabenitez98/ e Instagram https://www.instagram.com/benitezaixa/.
- Botón "Modo presentación": oculta la navegación, agranda la tipografía y recorre las secciones con las flechas del teclado, para mostrar la Bitácora en vivo durante el webinar.

10) Glosario (/glosario)
- 40+ términos con definición simple y técnica, ejemplo y enlace a la herramienta relacionada.

RENDIMIENTO Y CALIDAD 3D
- Carga diferida de todas las escenas 3D (React.lazy + Suspense) con un placeholder estático del mismo encuadre.
- Calidad adaptativa: devicePixelRatio máximo de 2, PerformanceMonitor de drei para bajar texturas o efectos si los FPS caen de 45. Objetivo: 60 FPS en una laptop media y 30 FPS en un celular medio.
- Si no hay WebGL2, mostrar una alternativa 2D con imagen y explicación.
- Texturas en /public/textures, con un script scripts/prepare-textures.mjs (sharp) que convierte las texturas descargadas en /assets-raw a WebP 4K y 2K. README con los enlaces de descarga:
  https://visibleearth.nasa.gov/collection/1484/blue-marble
  https://svs.gsfc.nasa.gov/4720 (CGI Moon Kit, 4K)
  https://svs.gsfc.nasa.gov/4851 (Deep Star Maps 2020)
  Créditos visibles en el pie de cada escena.
- Lighthouse: Performance ≥ 85 en móvil (sin la escena 3D activa), Accesibilidad ≥ 95, Buenas prácticas ≥ 95, SEO ≥ 95.

ACCESIBILIDAD
- WCAG 2.2 AA: contraste, foco visible, navegación completa por teclado (tabs con flechas, Esc cierra paneles) y aria-live en resultados.
- Cada escena 3D tiene una descripción textual y controles equivalentes en HTML.
- Textos en lenguaje claro. Términos técnicos con tooltip al glosario.

LEGAL Y PRIVACIDAD
- Sin analítica invasiva ni cookies de terceros. Los datos del usuario (kit, notas, tareas) quedan en su navegador. Botón "Borrar mis datos".
- Créditos de cada API y textura. Pie: "Guía comunitaria e independiente, sin afiliación oficial con la NASA ni con el NASA Space Apps Challenge."
- No uses el logo de la NASA ni el del Space Apps.

ENTREGABLES
- Código completo, tipado, sin TODOs pendientes en lo esencial.
- README en español: instalación, scripts, descarga de texturas, cómo actualizar los desafíos el 28 de octubre, cómo agregar herramientas y cómo desplegar en Vercel o Netlify.
- Tests:
  - unitarios: filtros, búsqueda, exportación del kit, cálculos de Kepler y del punto subsolar;
  - e2e: recorrer la ruta, filtrar la bitácora, exportar el kit, abrir un desafío y cargar el laboratorio.
- Dejar el sitio funcionando con `npm run build && npm run preview`.

Trabaja por fases (ver PROMPT.md). Al final de cada fase: compila, corre los tests, enumera lo hecho y espera mi confirmación antes de seguir.
```

---

## Fases para ejecutar en Cursor

Pega cada fase cuando la anterior esté terminada y verificada.

**Fase 1: Base del proyecto**
```
Fase 1: crea el proyecto Vite + React + TS con Tailwind, React Router, Zustand, ESLint/Prettier, Vitest y Playwright. Implementa el layout (barra superior, pie y tema oscuro/claro), los tokens de diseño Órbitas, el logo SVG y las rutas vacías. Copia seed/*.json a src/content con tipos TypeScript estrictos y una validación con zod que falle si hay ids repetidos o referencias rotas entre challenges.json y tools.json.
```

**Fase 2: Bitácora y Mi kit**
```
Fase 2: implementa /bitacora completa (filtros con contadores, búsqueda difusa sin acentos, filtros en la URL, vista de tarjetas y tabla, paginación) y Mi kit persistente con exportación a Markdown, JSON y BibTeX. Agrega los tests unitarios y e2e de esta parte.
```

**Fase 3: Ruta, reglas, glosario y entrega**
```
Fase 3: implementa /ruta (8 pasos del reference con progreso y checklist), /reglas, /glosario (40+ términos), /entrega (checklist, generador de referencias y guía de pitch con temporizador) y /equipo (roles, cronograma de 48 h y tablero de tareas).
```

**Fase 4: Desafíos 2026**
```
Fase 4: implementa /desafios y /desafios/:id con la plantilla fija, los campos editables del método de 7 pasos (persistencia y exportación a Markdown), las tarjetas vinculadas a la Bitácora y el aviso de que la guía no resuelve el desafío. Revisa que ningún texto proponga una solución.
```

**Fase 5: Laboratorio en vivo 2D**
```
Fase 5: implementa /laboratorio con el mapa GIBS (todas las capas listadas, fecha, cortina antes/después, leyendas), EONET con filtros, CelesTrak con traza y próximas pasadas, el simulador Kepler y el panel "¿Cómo se hizo?". Maneja errores, timeouts y caché.
```

**Fase 6: Experiencias 3D**
```
Fase 6: implementa el hero 3D de la Tierra a escala real (WGS84, terminador real, atmósfera, estrellas, satélites SGP4 con huella del barrido, barra de tiempo y comparador de escala) y el simulador 3D de sensores. Agrega calidad adaptativa, alternativa sin WebGL, prefers-reduced-motion y el script de texturas. Verifica 60 FPS en escritorio.
```

**Fase 7: Charla, PWA y pulido final**
```
Fase 7: implementa /charla con el modo presentación, la PWA offline y la página 404. Pasa Lighthouse y axe, corrige todo lo que marquen y completa el README. Haz un recorrido e2e completo en escritorio y móvil, y entrégame un resumen de lo construido y de cómo desplegarlo.
```

---

## Tareas manuales (las haces tú)

1. Descargar las texturas de NASA de los enlaces del README, ponerlas en `assets-raw/` y correr `npm run textures`.
2. El **28 de octubre de 2026**, cuando se publiquen los enunciados completos, completar `recursos_oficiales` de cada desafío en `src/content/challenges.json`.
3. Confirmar la fecha del webinar en `src/content/talk.ts`.
4. Desplegar en Vercel o Netlify y compartir el enlace al cierre de la charla.
