/**
 * Descarga texturas NASA desde URLs directas (eoimages) y genera WebP 4K/2K en public/textures/.
 * No hace falta bajar nada a mano: npm run textures
 *
 * Fuentes: scripts/nasa-texture-sources.json (Visible Earth / Earth Observatory).
 */
import { mkdir, readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rawDir = path.join(root, 'assets-raw');
const outDir = path.join(root, 'public', 'textures');
const sourcesPath = path.join(root, 'scripts', 'nasa-texture-sources.json');

async function ensureDirs() {
  await mkdir(rawDir, { recursive: true });
  await mkdir(outDir, { recursive: true });
}

async function download(url, dest) {
  console.log(`Descargando ${url}`);
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Bitacora-Space-Apps/0.1 (educativo; +https://github.com/)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} al pedir ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`  → ${path.basename(dest)} (${(buf.length / 1024 / 1024).toFixed(2)} MB)`);
}

async function convert(inputPath, base) {
  const info = await sharp(inputPath).metadata();
  console.log(`Convirtiendo ${path.basename(inputPath)} (${info.width}×${info.height}) → ${base}`);

  await sharp(inputPath)
    .resize(4096, 2048, { fit: 'fill' })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, `${base}-4k.webp`));

  await sharp(inputPath)
    .resize(2048, 1024, { fit: 'fill' })
    .webp({ quality: 80 })
    .toFile(path.join(outDir, `${base}-2k.webp`));
}

/** Heurística para archivos ya presentes en assets-raw (flujo manual opcional). */
const MANUAL_MAP = [
  { match: /blue.?marble|earth.?day|land_ocean|topo\.bathy/i, base: 'earth-day' },
  { match: /black.?marble|earth.?night|night_lights|dnb_land/i, base: 'earth-night' },
  { match: /cloud/i, base: 'earth-clouds' },
  { match: /specular|ocean.?mask|water/i, base: 'earth-specular' },
  { match: /star|starmap|deep.?star/i, base: 'stars' },
  { match: /moon/i, base: 'moon' },
];

async function listImages(dir) {
  try {
    const entries = await readdir(dir);
    return entries.filter((name) => /\.(png|jpe?g|tif|tiff|webp)$/i.test(name));
  } catch {
    return [];
  }
}

async function main() {
  await ensureDirs();
  const sources = JSON.parse(await readFile(sourcesPath, 'utf8'));

  let converted = 0;

  for (const item of sources.textures) {
    const dest = path.join(rawDir, item.filename);
    let hasFile = false;
    try {
      const s = await stat(dest);
      hasFile = s.isFile() && s.size > 1000;
    } catch {
      hasFile = false;
    }

    if (!hasFile) {
      try {
        await download(item.url, dest);
        hasFile = true;
      } catch (error) {
        console.warn(`No se pudo descargar ${item.id}: ${error.message}`);
        console.warn(`  Fuente: ${item.fuente}`);
        continue;
      }
    } else {
      console.log(`Ya existe ${item.filename}, se reutiliza.`);
    }

    await convert(dest, item.id);
    converted += 1;
    console.log(`  Crédito: ${item.fuente}`);
  }

  // Archivos manuales extra en assets-raw (p. ej. stars, moon)
  const extras = await listImages(rawDir);
  for (const file of extras) {
    if (sources.textures.some((t) => t.filename === file)) continue;
    const rule = MANUAL_MAP.find((item) => item.match.test(file));
    if (!rule) continue;
    if (sources.textures.some((t) => t.id === rule.base)) continue;
    await convert(path.join(rawDir, file), rule.base);
    converted += 1;
  }

  if (converted === 0) {
    console.log('No se generó ninguna textura. La app usará Tierra procedural o el proxy de desarrollo.');
    return;
  }

  console.log(`Listo: ${converted} textura(s) en public/textures/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
