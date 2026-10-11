(() => {
  'use strict';
  const TOOLS = window.TOOLS || [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const byName = (n) => TOOLS.find((t) => t.n === n);

  /* ───────── Theme ───────── */
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const setTheme = (t) => {
    theme = t; root.setAttribute('data-theme', t);
    const b = $('[data-theme-toggle]');
    b.setAttribute('aria-label', t === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    b.innerHTML = t === 'dark'
      ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    if (window.__setBase) window.__setBase();
  };
  setTheme(theme);
  $('[data-theme-toggle]').addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));

  /* ───────── Toast ───────── */
  let toastT;
  const toast = (msg) => {
    const el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2200);
  };

  /* ───────── Route ───────── */
  const STEPS = [
    {
      t: 'Elige el desafío y lee sus recursos',
      s: 'Antes de abrir un mapa',
      body: 'Lee el enunciado completo (se publica el 28 de octubre) y abre la pestaña <strong>Resources</strong>: ahí están los datos de la NASA y de las agencias socias que el equipo pensó para ese problema. Anota qué se pide entregar y quién sería el usuario de tu solución.',
      tools: ['NASA Earthdata', 'NASA Open Data Portal', 'NASA Earth Observatory'],
      error: 'Elegir primero un dataset “lindo” y después buscarle un problema.',
      code: null
    },
    {
      t: 'Convierte el desafío en una pregunta',
      s: 'El ciclo de inteligencia empieza acá',
      body: 'Un buen proyecto GEOINT responde una pregunta concreta. Completa cuatro campos: <strong>qué</strong> quieres medir, <strong>dónde</strong> (un área de interés, o AOI), <strong>cuándo</strong> (un rango de fechas) y <strong>para quién</strong> (qué decisión ayuda a tomar).',
      tools: ['geoBoundaries', 'Natural Earth', 'OpenStreetMap · Overpass Turbo'],
      error: 'Áreas enormes o rangos de 20 años en un hackatón de 48 horas. Empieza chico.',
      code: `# Plantilla de pregunta GEOINT
QUÉ:        superficie inundada
DÓNDE:      bbox = (-79.95, -6.90, -79.70, -6.60)   # Chiclayo, Perú
CUÁNDO:     2026-01-01 / 2026-03-31
PARA QUIÉN: defensa civil local → priorizar barrios`
    },
    {
      t: 'Elige el sensor adecuado',
      s: 'La pregunta elige el sensor',
      body: 'Los sensores <strong>ópticos</strong> ven como una cámara, pero no atraviesan nubes. El <strong>radar (SAR)</strong> ve de día, de noche y con nubes. Los <strong>térmicos</strong> detectan calor, y los <strong>atmosféricos</strong> miden gases y aerosoles. Mira también la resolución espacial (cuánto detalle) y la temporal (cada cuánto pasa el satélite).',
      tools: ['NASA Eyes on the Earth', 'ASF Data Search (Vertex)', 'Harmonized Landsat Sentinel-2 (HLS)'],
      error: 'Usar óptico para una inundación en temporada de lluvias: vas a ver solo nubes.',
      code: null,
      link: { href: '#sensor', label: 'Abrir el selector de sensores' }
    },
    {
      t: 'Explora sin código',
      s: 'Mira antes de descargar',
      body: 'Busca tu evento en un visor web y confirma que se ve. Compara un antes y un después, prueba combinaciones de bandas en falso color y anota la fecha y el satélite exactos. Este paso ahorra horas de descargas inútiles.',
      tools: ['NASA Worldview', 'Copernicus Browser', 'LandsatLook', 'ISRO Bhuvan'],
      error: 'Confundir color verdadero con falso color al explicar la imagen.',
      code: null,
      link: { href: '#laboratorio', label: 'Probar en el laboratorio' }
    },
    {
      t: 'Busca y descarga los datos',
      s: 'De la escena al archivo',
      body: 'Crea tu cuenta gratuita de <strong>Earthdata Login</strong>. Busca por área y fecha en Earthdata Search o desde Python. Si el catálogo habla <strong>STAC</strong>, el mismo código sirve para la NASA, Copernicus, Planetary Computer o Earth Search.',
      tools: ['Earthdata Login', 'NASA Earthdata Search', 'earthaccess', 'pystac-client', 'Earth Search (STAC)', 'Copernicus Data Space · APIs'],
      error: 'Descargar escenas completas de 1 GB cuando solo necesitas tu barrio: recorta o usa COG.',
      code: `import earthaccess
earthaccess.login()  # usa tu cuenta Earthdata

res = earthaccess.search_data(
    short_name="HLSL30",                       # Landsat armonizado
    bounding_box=(-79.95, -6.90, -79.70, -6.60),
    temporal=("2026-01-01", "2026-03-31"),
    cloud_cover=(0, 30),
)
files = earthaccess.download(res[:2], "./datos")

# Alternativa STAC (sin cuenta): Sentinel-2 en AWS
from pystac_client import Client
cat = Client.open("https://earth-search.aws.element84.com/v1")
items = cat.search(collections=["sentinel-2-l2a"],
                   bbox=[-79.95, -6.90, -79.70, -6.60],
                   datetime="2026-01-01/2026-03-31").item_collection()`
    },
    {
      t: 'Procesa y analiza',
      s: 'Del píxel al indicador',
      body: 'Calcula un índice (NDVI para vegetación, NDWI para agua, NBR para incendios), compara fechas o cuenta píxeles por zona. Si recién empiezas, usa QGIS o AppEEARS. Si programas, usa rasterio, xarray o openEO. Para el radar, SNAP o HyP3.',
      tools: ['QGIS', 'AppEEARS', 'rasterio', 'xarray + rioxarray', 'openEO', 'ESA SNAP', 'HyP3'],
      error: 'Mezclar proyecciones o fechas sin darte cuenta. Revisa siempre el CRS.',
      code: `import rasterio, numpy as np
with rasterio.open("B04.tif") as r, rasterio.open("B08.tif") as n:
    red, nir = r.read(1).astype(float), n.read(1).astype(float)
ndvi = (nir - red) / (nir + red + 1e-6)
print("NDVI medio:", np.nanmean(ndvi).round(3))`
    },
    {
      t: 'Visualiza y construye la demo',
      s: 'Que se entienda en 30 segundos',
      body: 'Muestra el resultado en un mapa web o en una app simple. Las capas GIBS se cargan sin descargar nada; Leaflet u OpenLayers alcanzan para un prototipo; Streamlit convierte tu notebook en una app. ¿Quieres sumar IA? Prueba Prithvi o SAM para segmentar, o un agente MCP para buscar datos.',
      tools: ['NASA GIBS (WMTS / WMS)', 'Leaflet', 'OpenLayers', 'Streamlit', 'Prithvi (modelos fundacionales IBM-NASA)', 'earthdata-mcp'],
      error: 'Una demo con 15 capas y ninguna conclusión. Una pregunta, una respuesta, un mapa.',
      code: `// Capa diaria de la NASA en Leaflet
L.tileLayer(
  "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/" +
  "MODIS_Terra_CorrectedReflectance_TrueColor/default/2026-10-01/" +
  "GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg",
  { maxNativeZoom: 9, attribution: "NASA GIBS" }
).addTo(map);`
    },
    {
      t: 'Cita, documenta y entrega',
      s: 'Lo que más se olvida',
      body: 'Lista <strong>todas</strong> las fuentes, aunque sean abiertas, con su licencia. Elige una licencia OSI para tu código (si no, la NASA aplica Apache 2.0), declara las herramientas de IA que usaste y verifica que todo sea público. La entrega cierra el domingo 15 de noviembre a las 23:59, hora local.',
      tools: ['Jupyter'],
      error: 'No citar los datasets: los términos permiten quitar premios por eso.',
      code: null,
      link: { href: '#reglas', label: 'Ver las reglas de uso' }
    }
  ];

  let step = 0;
  const routeList = $('#routeList');
  const routeDetail = $('#routeDetail');
  routeList.innerHTML = STEPS.map((s, i) => `
    <li><button role="tab" id="tab-${i}" aria-controls="routeDetail" aria-selected="${i === 0}" data-step="${i}">
      <span class="n">${String(i + 1).padStart(2, '0')}</span>
      <span class="tt">${esc(s.t)}</span>
    </button></li>`).join('');

  const toolChip = (n) => {
    const t = byName(n);
    return t ? `<button class="tool-chip" data-goto="${esc(n)}">${esc(n)}</button>` : '';
  };

  const renderStep = () => {
    const s = STEPS[step];
    $$('button[data-step]', routeList).forEach((b) => b.setAttribute('aria-selected', String(+b.dataset.step === step)));
    routeDetail.setAttribute('aria-labelledby', `tab-${step}`);
    routeDetail.innerHTML = `
      <div class="rd-head">
        <span class="rd-n">Paso ${step + 1} de ${STEPS.length}</span>
        <span class="rd-s">${esc(s.s)}</span>
      </div>
      <h3>${esc(s.t)}</h3>
      <p>${s.body}</p>
      ${s.code ? `<div class="code"><button class="copy" data-copy>Copiar</button><pre><code>${esc(s.code)}</code></pre></div>` : ''}
      <div class="rd-tools"><span class="filter-label">Herramientas</span><div class="chips">${s.tools.map(toolChip).join('')}</div></div>
      <p class="rd-error"><strong>Error común:</strong> ${esc(s.error)}</p>
      <div class="rd-nav">
        <button class="btn btn-ghost sm" data-prev ${step === 0 ? 'disabled' : ''}>Anterior</button>
        ${s.link ? `<a class="link-btn" href="${s.link.href}">${esc(s.link.label)} →</a>` : '<span></span>'}
        <button class="btn btn-primary sm" data-next ${step === STEPS.length - 1 ? 'disabled' : ''}>Siguiente</button>
      </div>`;
  };
  routeList.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-step]'); if (!b) return;
    step = +b.dataset.step; renderStep();
  });
  routeList.addEventListener('keydown', (e) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    e.preventDefault();
    step = (step + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + STEPS.length) % STEPS.length;
    renderStep(); $(`#tab-${step}`).focus();
  });
  routeDetail.addEventListener('click', (e) => {
    if (e.target.closest('[data-prev]') && step > 0) { step--; renderStep(); }
    if (e.target.closest('[data-next]') && step < STEPS.length - 1) { step++; renderStep(); }
  });
  renderStep();

  /* copy buttons (delegated) */
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]'); if (!b) return;
    const code = b.parentElement.querySelector('code').innerText;
    try { await navigator.clipboard.writeText(code); b.textContent = 'Copiado'; }
    catch { b.textContent = 'Selecciona y copia'; }
    setTimeout(() => (b.textContent = 'Copiar'), 1600);
  });

  /* ───────── Sensor selector ───────── */
  const TOPICS = [
    { k: 'Incendios', sensor: 'Térmico + óptico (SWIR)', why: 'Los sensores térmicos de MODIS y VIIRS detectan focos de calor varias veces al día. Las bandas SWIR de Landsat y Sentinel-2 muestran la cicatriz quemada después.', tools: ['NASA FIRMS (incendios activos)', 'NASA Worldview', 'Harmonized Landsat Sentinel-2 (HLS)'], layer: 'MODIS_Terra_CorrectedReflectance_Bands721' },
    { k: 'Inundaciones', sensor: 'Radar SAR', why: 'El agua calma refleja el radar como un espejo y se ve oscura en la imagen. El SAR atraviesa las nubes de la tormenta, algo que el óptico no puede.', tools: ['ASF Data Search (Vertex)', 'OPERA (agua, cambios y deformación)', 'NISAR (radar banda L y S)', 'Copernicus Browser'], layer: 'IMERG_Precipitation_Rate' },
    { k: 'Vegetación y agro', sensor: 'Óptico multiespectral', why: 'Las plantas sanas reflejan mucho infrarrojo cercano. Índices como el NDVI resumen su vigor y su evolución en el tiempo.', tools: ['Harmonized Landsat Sentinel-2 (HLS)', 'AppEEARS', 'ESA WorldCover', 'SAOCOM Catalog'], layer: 'MODIS_Terra_NDVI_8Day' },
    { k: 'Océanos y pesca', sensor: 'Térmico, color del océano y SAR', why: 'La temperatura del mar y la clorofila muestran dónde hay vida. El SAR detecta buques, incluso los que apagan su AIS ("barcos oscuros").', tools: ['Copernicus Marine', 'Global Fishing Watch API', 'ASF Data Search (Vertex)'], layer: 'GHRSST_L4_MUR_Sea_Surface_Temperature' },
    { k: 'Calidad del aire', sensor: 'Atmosférico', why: 'Sensores como MODIS (aerosoles) y Sentinel-5P (gases) miden lo que respiramos. Las estaciones en tierra sirven para validar.', tools: ['Giovanni', 'Copernicus Browser', 'OpenAQ'], layer: 'MODIS_Terra_Aerosol' },
    { k: 'Ciudades y luces', sensor: 'Óptico nocturno (VIIRS DNB)', why: 'Las luces nocturnas revelan urbanización, cortes de energía y actividad económica. Combinadas con población, muestran quién está expuesto.', tools: ['NASA Worldview', 'WorldPop', 'OpenStreetMap · Overpass Turbo'], layer: 'VIIRS_Black_Marble' },
    { k: 'Terremotos y deformación', sensor: 'Radar InSAR', why: 'Comparando la fase de dos pasadas de radar se miden movimientos del terreno de pocos centímetros, o incluso milímetros.', tools: ['HyP3', 'MintPy', 'OPERA (agua, cambios y deformación)', 'NISAR (radar banda L y S)'], layer: 'MODIS_Terra_CorrectedReflectance_TrueColor' },
    { k: 'Clima y energía', sensor: 'Modelos + satélites', why: 'Radiación solar, viento y temperatura históricos para dimensionar paneles, cultivos o riesgos climáticos.', tools: ['NASA POWER', 'Copernicus Climate Data Store (ERA5)', 'Open-Meteo'], layer: 'MODIS_Terra_Land_Surface_Temp_Day' },
    { k: 'Órbitas y espacio', sensor: 'Elementos orbitales y efemérides', why: 'Para saber dónde está un satélite, cuándo pasa sobre tu ciudad o cómo se mueve un asteroide.', tools: ['CelesTrak', 'Skyfield', 'JPL Horizons API', 'api.nasa.gov (APOD, EPIC, DONKI, NeoWs)'], layer: null, sat: '25544' }
  ];
  let topic = 0;
  const sensorChips = $('#sensorChips');
  sensorChips.innerHTML = TOPICS.map((t, i) => `<button class="chip" aria-pressed="${i === 0}" data-topic="${i}">${esc(t.k)}</button>`).join('');
  const renderTopic = () => {
    const t = TOPICS[topic];
    $$('[data-topic]', sensorChips).forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.topic === topic)));
    $('#sensorCard').innerHTML = `
      <span class="kicker">${esc(t.k)}</span>
      <h3>${esc(t.sensor)}</h3>
      <p>${esc(t.why)}</p>
      <div class="rd-tools"><span class="filter-label">Empieza con</span><div class="chips">${t.tools.map(toolChip).join('')}</div></div>
      <button class="btn btn-ghost sm" data-view-lab>Verlo en el laboratorio →</button>`;
  };
  sensorChips.addEventListener('click', (e) => {
    const b = e.target.closest('[data-topic]'); if (!b) return; topic = +b.dataset.topic; renderTopic();
  });
  $('#sensorCard').addEventListener('click', (e) => {
    if (!e.target.closest('[data-view-lab]')) return;
    const t = TOPICS[topic];
    if (t.layer && window.__setLayer) window.__setLayer(t.layer);
    if (t.sat && window.__setSat) window.__setSat(t.sat);
    $('#laboratorio').scrollIntoView({ behavior: 'smooth' });
  });
  renderTopic();

  /* ───────── Catalog ───────── */
  const LABELS = {
    c: { explorar: 'Explorar sin código', datos: 'Consumir datos', tematicos: 'Datos temáticos', procesar: 'Procesar y analizar', mapas: 'Mapas y visualización', ia: 'IA, modelos y agentes', orbitas: 'Órbitas y espacio', aprender: 'Aprender' },
    o: { nasa: 'NASA', socia: 'Agencias socias', abierto: 'Abierto y comunidad' },
    t: { web: 'Web', api: 'API', python: 'Python', js: 'JavaScript', escritorio: 'Escritorio', modelo: 'Modelo IA', agente: 'Agente / MCP', servidor: 'Servidor' },
    a: { libre: 'Sin registro', registro: 'Cuenta gratuita', key: 'Clave API gratuita' },
    l: { ini: 'Inicial', int: 'Intermedio', ava: 'Avanzado' },
    lg: { v: 'Verde', a: 'Amarillo' }
  };
  const state = { q: '', c: new Set(), o: new Set(), t: new Set(), a: new Set(), l: new Set(), lg: new Set() };
  const kit = new Map();

  $('#statTools').textContent = TOOLS.length;

  $$('.filters [data-filter]').forEach((wrap) => {
    const key = wrap.dataset.filter;
    wrap.innerHTML = Object.entries(LABELS[key]).map(([v, label]) => {
      const n = TOOLS.filter((t) => t[key] === v).length;
      const dot = key === 'lg' ? `<span class="lg-dot ${v}"></span>` : '';
      return `<button class="chip" aria-pressed="false" data-k="${key}" data-v="${v}">${dot}${esc(label)} <span class="cnt">${n}</span></button>`;
    }).join('');
  });

  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const matches = (t) => {
    for (const k of ['c', 'o', 't', 'a', 'l', 'lg']) if (state[k].size && !state[k].has(t[k])) return false;
    if (state.q) {
      const hay = norm([t.n, t.org, t.d, LABELS.c[t.c], LABELS.t[t.t], t.tip || ''].join(' '));
      return norm(state.q).split(/\s+/).every((w) => hay.includes(w));
    }
    return true;
  };

  const cardHTML = (t) => {
    const inKit = kit.has(t.n);
    return `
    <article class="card" data-name="${esc(t.n)}">
      <div class="card-top">
        <span class="tag o-${t.o}">${esc(LABELS.o[t.o])}</span>
        <span class="lg-dot ${t.lg}" title="Semáforo legal: ${esc(LABELS.lg[t.lg])}" aria-label="Semáforo legal ${esc(LABELS.lg[t.lg])}"></span>
      </div>
      <h3>${esc(t.n)}</h3>
      <p class="org">${esc(t.org)}</p>
      <p class="desc">${esc(t.d)}</p>
      ${t.tip ? `<div class="code mini"><button class="copy" data-copy>Copiar</button><pre><code>${esc(t.tip)}</code></pre></div>` : ''}
      <div class="meta">
        <span>${esc(LABELS.c[t.c])}</span><span>${esc(LABELS.t[t.t])}</span><span>${esc(LABELS.a[t.a])}</span><span>${esc(LABELS.l[t.l])}</span>
      </div>
      <div class="card-actions">
        <a class="link-btn" href="${esc(t.u)}" target="_blank" rel="noopener">Abrir sitio ↗</a>
        <button class="kit-toggle" aria-pressed="${inKit}" data-kit="${esc(t.n)}">${inKit ? '✓ En mi kit' : '+ Mi kit'}</button>
      </div>
    </article>`;
  };

  const PAGE = 18; let shown = PAGE;
  const renderCards = (keep) => {
    if (!keep) shown = PAGE;
    const list = TOOLS.filter(matches);
    $('#cards').innerHTML = list.slice(0, shown).map(cardHTML).join('');
    $('#empty').hidden = list.length > 0;
    $('#resultCount').textContent = `${list.length} de ${TOOLS.length} herramientas`;
    const more = $('#moreBtn');
    more.hidden = list.length <= shown;
    more.textContent = `Ver más (${list.length - shown} restantes)`;
  };
  $('#moreBtn').addEventListener('click', () => { shown += PAGE; renderCards(true); });

  $('.filters').addEventListener('click', (e) => {
    const b = e.target.closest('.chip[data-k]'); if (!b) return;
    const { k, v } = b.dataset;
    state[k].has(v) ? state[k].delete(v) : state[k].add(v);
    b.setAttribute('aria-pressed', String(state[k].has(v)));
    renderCards();
  });
  let qT;
  $('#q').addEventListener('input', (e) => { clearTimeout(qT); qT = setTimeout(() => { state.q = e.target.value.trim(); renderCards(); }, 120); });
  $('#clearFilters').addEventListener('click', () => {
    for (const k of ['c', 'o', 't', 'a', 'l', 'lg']) state[k].clear();
    state.q = ''; $('#q').value = '';
    $$('.filters .chip').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    renderCards();
  });

  /* go to a tool from route/sensor chips */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-goto]'); if (!b) return;
    const n = b.dataset.goto;
    for (const k of ['c', 'o', 't', 'a', 'l', 'lg']) state[k].clear();
    $$('.filters .chip').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    state.q = n; $('#q').value = n; renderCards();
    $('#bitacora').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const card = $$('#cards .card').find((c) => c.dataset.name === n);
      if (card) { card.classList.add('flash'); setTimeout(() => card.classList.remove('flash'), 1600); }
    }, 450);
  });

  /* ───────── Kit ───────── */
  const drawer = $('#kitDrawer'), backdrop = $('#kitBackdrop');
  const openKit = () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); backdrop.hidden = false; $('#kitClose').focus(); };
  const closeKit = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); backdrop.hidden = true; $('#kitOpen').focus(); };
  $('#kitOpen').addEventListener('click', openKit);
  $('#kitClose').addEventListener('click', closeKit);
  backdrop.addEventListener('click', closeKit);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeKit(); });

  const renderKit = () => {
    $('#kitCount').textContent = kit.size;
    $('#kitDownload').disabled = kit.size === 0;
    $('#kitList').innerHTML = kit.size
      ? [...kit.values()].map((t) => `<li><span class="lg-dot ${t.lg}"></span><div><strong>${esc(t.n)}</strong><span>${esc(t.org)}</span></div><button class="icon-btn" data-kit="${esc(t.n)}" aria-label="Quitar ${esc(t.n)}">×</button></li>`).join('')
      : '<li class="kit-empty">Todavía no agregaste herramientas. Usa “+ Mi kit” en la bitácora.</li>';
  };
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-kit]'); if (!b) return;
    const t = byName(b.dataset.kit); if (!t) return;
    if (kit.has(t.n)) { kit.delete(t.n); toast(`Quitaste ${t.n}`); } else { kit.set(t.n, t); toast(`Agregaste ${t.n} a tu kit`); }
    renderKit();
    $$(`.kit-toggle[data-kit]`).forEach((x) => {
      if (x.dataset.kit === t.n) { const on = kit.has(t.n); x.setAttribute('aria-pressed', String(on)); x.textContent = on ? '✓ En mi kit' : '+ Mi kit'; }
    });
  });
  $('#kitClear').addEventListener('click', () => { kit.clear(); renderKit(); renderCards(true); });
  $('#kitDownload').addEventListener('click', () => {
    const today = new Date().toISOString().slice(0, 10);
    const lines = [
      '# Recursos utilizados — NASA Space Apps 2026', '',
      `Generado con Órbitas · Bitácora Space Apps (${today}).`,
      'Revisa y completa la licencia exacta de cada recurso antes de entregar.', '',
      '| Recurso | Organización | Origen | Semáforo legal | Enlace |', '|---|---|---|---|---|',
      ...[...kit.values()].map((t) => `| ${t.n} | ${t.org} | ${LABELS.o[t.o]} | ${LABELS.lg[t.lg]} | ${t.u} |`),
      '', '## Notas', '- Datos de NASA y agencias socias: citar misión, producto y fecha de acceso.',
      '- Datos de terceros: deben ser públicos y libres, o tener una licencia abierta (OSI).',
      '- Declara las herramientas de IA que usaste y su rol en el proyecto.', ''
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'recursos-space-apps.md';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Descargaste tus referencias');
  });
  renderKit();
  renderCards();

  /* ───────── Lab (Leaflet + GIBS + EONET + CelesTrak) ───────── */
  const LAYERS = [
    { id: 'MODIS_Terra_CorrectedReflectance_TrueColor', name: 'Color verdadero · MODIS Terra', ext: 'jpg', lvl: 9, base: true },
    { id: 'VIIRS_SNPP_CorrectedReflectance_TrueColor', name: 'Color verdadero · VIIRS Suomi NPP', ext: 'jpg', lvl: 9, base: true },
    { id: 'MODIS_Terra_CorrectedReflectance_Bands721', name: 'Falso color 7-2-1 · fuego y agua', ext: 'jpg', lvl: 9, base: true },
    { id: 'MODIS_Terra_NDVI_8Day', name: 'Vegetación NDVI · 8 días', ext: 'png', lvl: 9 },
    { id: 'MODIS_Terra_Land_Surface_Temp_Day', name: 'Temperatura de superficie · día', ext: 'png', lvl: 7 },
    { id: 'GHRSST_L4_MUR_Sea_Surface_Temperature', name: 'Temperatura del mar · GHRSST', ext: 'png', lvl: 7 },
    { id: 'IMERG_Precipitation_Rate', name: 'Lluvia · GPM IMERG', ext: 'png', lvl: 6 },
    { id: 'MODIS_Terra_Aerosol', name: 'Aerosoles · MODIS', ext: 'png', lvl: 6 },
    { id: 'VIIRS_Black_Marble', name: 'Luces nocturnas · Black Marble', ext: 'png', lvl: 8, fixed: '2016-01-01' }
  ];
  const status = $('#labStatus');
  if (!window.L) { status.textContent = 'No se pudo cargar la librería del mapa. Revisa tu conexión.'; return; }

  const d = new Date(Date.now() - 2 * 864e5);
  const iso = (x) => x.toISOString().slice(0, 10);
  const dateSel = $('#dateSel'); dateSel.value = iso(d); dateSel.max = iso(new Date(Date.now() - 864e5)); dateSel.min = '2002-01-01';
  const layerSel = $('#layerSel');
  layerSel.innerHTML = LAYERS.map((l) => `<option value="${l.id}">${esc(l.name)}</option>`).join('');
  layerSel.value = 'VIIRS_SNPP_CorrectedReflectance_TrueColor';

  const map = L.map('map', { worldCopyJump: true, zoomControl: true, minZoom: 2 }).setView([-8, -70], 3);
  let baseLayer;
  window.__setBase = () => {
    if (baseLayer) map.removeLayer(baseLayer);
    const style = theme === 'dark' ? 'dark_all' : 'light_all';
    baseLayer = L.tileLayer(`https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png`, { subdomains: 'abcd', maxZoom: 19, attribution: '© OpenStreetMap · © CARTO' }).addTo(map);
    baseLayer.bringToBack();
  };
  window.__setBase();

  let gibs;
  const gibsUrl = (l, date) => `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${l.id}/default/${l.fixed || date}/GoogleMapsCompatible_Level${l.lvl}/{z}/{y}/{x}.${l.ext}`;
  const setGibs = () => {
    const l = LAYERS.find((x) => x.id === layerSel.value);
    if (gibs) map.removeLayer(gibs);
    const url = gibsUrl(l, dateSel.value);
    gibs = L.tileLayer(url, { maxNativeZoom: l.lvl, maxZoom: 12, opacity: l.base ? 1 : 0.85, attribution: 'NASA GIBS / EOSDIS', bounds: [[-85.0511, -180], [85.0511, 180]] }).addTo(map);
    $('#gibsUrl').textContent = url;
    dateSel.disabled = !!l.fixed;
  };
  window.__setLayer = (id) => { layerSel.value = id; setGibs(); };
  layerSel.addEventListener('change', setGibs);
  dateSel.addEventListener('change', setGibs);
  setGibs();

  /* EONET */
  const CAT_COLORS = { wildfires: '#ff5b3a', severeStorms: '#8f54ff', volcanoes: '#e2366b', seaLakeIce: '#3fc6ff', floods: '#2f6bff', earthquakes: '#b07a2a', drought: '#d8a200', dustHaze: '#a88a6a', landslides: '#7a5c3c', snow: '#9ad8ff', tempExtremes: '#ff8f6b', waterColor: '#2bb39a', manmade: '#666' };
  const CAT_ES = { wildfires: 'Incendios', severeStorms: 'Tormentas', volcanoes: 'Volcanes', seaLakeIce: 'Hielo marino y lagos', floods: 'Inundaciones', earthquakes: 'Sismos', drought: 'Sequía', dustHaze: 'Polvo y bruma', landslides: 'Deslizamientos', snow: 'Nieve', tempExtremes: 'Temperaturas extremas', waterColor: 'Color del agua', manmade: 'Origen humano' };
  const eonetGroup = L.layerGroup().addTo(map);
  fetch('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=150')
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((data) => {
      const counts = {};
      data.events.forEach((ev) => {
        const g = ev.geometry[ev.geometry.length - 1]; if (!g) return;
        let lat, lon;
        if (g.type === 'Point') [lon, lat] = g.coordinates;
        else if (g.type === 'Polygon') { const ring = g.coordinates[0]; lon = ring.reduce((s, p) => s + p[0], 0) / ring.length; lat = ring.reduce((s, p) => s + p[1], 0) / ring.length; }
        else return;
        const cat = ev.categories[0]?.id || 'manmade';
        counts[cat] = (counts[cat] || 0) + 1;
        const src = ev.sources?.[0];
        L.circleMarker([lat, lon], { radius: 6, color: '#fff', weight: 1.5, fillColor: CAT_COLORS[cat] || '#444', fillOpacity: 0.9 })
          .bindPopup(`<strong>${esc(ev.title)}</strong><br/>${esc(CAT_ES[cat] || ev.categories[0]?.title || '')} · ${esc((g.date || '').slice(0, 10))}${src ? `<br/><a href="${esc(src.url)}" target="_blank" rel="noopener">Fuente: ${esc(src.id)}</a>` : ''}`)
          .addTo(eonetGroup);
      });
      $('#eonetLegend').innerHTML = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k, n]) => `<span><i style="background:${CAT_COLORS[k] || '#444'}"></i>${esc(CAT_ES[k] || k)} · ${n}</span>`).join('');
      status.textContent = `${data.events.length} eventos activos según EONET. Toca un punto para ver la fuente.`;
    })
    .catch(() => { status.textContent = 'EONET no respondió en este momento. El mapa satelital sigue disponible.'; });
  $('#eonetToggle').addEventListener('change', (e) => { e.target.checked ? eonetGroup.addTo(map) : map.removeLayer(eonetGroup); $('#eonetLegend').style.opacity = e.target.checked ? 1 : .35; });

  /* CelesTrak + satellite.js */
  const satSel = $('#satSel'); const readout = $('#satReadout');
  const satGroup = L.layerGroup().addTo(map);
  let satTimer, satrec, satName;
  const satIcon = L.divIcon({ className: 'sat-icon', html: '<span></span>', iconSize: [18, 18] });
  const posAt = (date) => {
    const pv = satellite.propagate(satrec, date); if (!pv.position) return null;
    const gd = satellite.eciToGeodetic(pv.position, satellite.gstime(date));
    const v = pv.velocity; const speed = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return { lat: satellite.degreesLat(gd.latitude), lon: satellite.degreesLong(gd.longitude), alt: gd.height, speed };
  };
  const splitTrack = (pts) => { const segs = [[]]; pts.forEach((p, i) => { if (i && Math.abs(p[1] - pts[i - 1][1]) > 180) segs.push([]); segs[segs.length - 1].push(p); }); return segs; };
  let marker;
  const drawSat = () => {
    if (!satrec) return;
    const now = new Date(); const p = posAt(now); if (!p) return;
    if (!marker) {
      const periodMin = (2 * Math.PI) / satrec.no; const pts = [];
      for (let m = -periodMin * 0.5; m <= periodMin * 1.5; m += 1) { const q = posAt(new Date(now.getTime() + m * 6e4)); if (q) pts.push([q.lat, q.lon]); }
      splitTrack(pts).forEach((seg) => L.polyline(seg, { color: '#ff8f6b', weight: 2, opacity: 0.85, dashArray: '4 6' }).addTo(satGroup));
      marker = L.marker([p.lat, p.lon], { icon: satIcon }).addTo(satGroup);
    } else marker.setLatLng([p.lat, p.lon]);
    readout.hidden = false;
    readout.innerHTML = `<strong>${esc(satName)}</strong><span>Lat ${p.lat.toFixed(2)}° · Lon ${p.lon.toFixed(2)}°</span><span>Altitud ${Math.round(p.alt)} km · ${(p.speed * 3600).toLocaleString('es', { maximumFractionDigits: 0 })} km/h</span>`;
  };
  const setSat = (id) => {
    clearInterval(satTimer); satGroup.clearLayers(); marker = null; satrec = null; readout.hidden = true;
    if (!id) return;
    if (!window.satellite) { readout.hidden = false; readout.textContent = 'No se pudo cargar satellite.js.'; return; }
    readout.hidden = false; readout.textContent = 'Descargando elementos orbitales…';
    fetch(`https://celestrak.org/NORAD/elements/gp.php?CATNR=${id}&FORMAT=tle`)
      .then((r) => r.text())
      .then((txt) => {
        const lines = txt.trim().split(/\r?\n/).map((s) => s.trim());
        if (lines.length < 3) throw new Error('TLE');
        satName = lines[0]; satrec = satellite.twoline2satrec(lines[1], lines[2]);
        drawSat(); satTimer = setInterval(drawSat, 1000);
        const p = posAt(new Date()); if (p) map.flyTo([p.lat, p.lon], 3, { duration: 1 });
      })
      .catch(() => { readout.textContent = 'CelesTrak no respondió. Intenta de nuevo en unos segundos.'; });
  };
  window.__setSat = (id) => { satSel.value = id; setSat(id); };
  satSel.addEventListener('change', () => setSat(satSel.value));

  /* Invalidate map size when visible */
  new IntersectionObserver((ents) => ents.forEach((e) => e.isIntersecting && map.invalidateSize())).observe($('#map'));
})();
