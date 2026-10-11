/**
 * Genera wordmarks oficiales desde las fotos de marca en public/brand/.
 */
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/brand');
const files = await readdir(outDir);

const darkBg = files.find((f) => f.includes('0569be3d') && f.endsWith('.jpg'));
const lightBg = files.find((f) => f.includes('656-ca3d') && f.endsWith('.jpg'));
if (!darkBg) throw new Error('No encontré el JPG del wordmark (fondo oscuro / 0569)');

async function toTransparentWhite(src, dest) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    if (luma < 125) {
      data[i] = data[i + 1] = data[i + 2] = 0;
      data[i + 3] = 0;
    } else {
      data[i] = data[i + 1] = data[i + 2] = 255;
      data[i + 3] = Math.min(255, Math.round(((luma - 110) / 145) * 255));
    }
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 10 })
    .png()
    .toFile(dest);
}

async function toTransparentDark(src, dest) {
  // Fondo claro + logo gris/blanco → logo negro transparente
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    // Fondo blanco → transparente; gris del logo → negro
    if (luma > 210) {
      data[i] = data[i + 1] = data[i + 2] = 0;
      data[i + 3] = 0;
    } else {
      const alpha = Math.min(255, Math.round(((220 - luma) / 180) * 255));
      data[i] = data[i + 1] = data[i + 2] = 18;
      data[i + 3] = alpha;
    }
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 8 })
    .png()
    .toFile(dest);
}

const darkSrc = path.join(outDir, darkBg);
await toTransparentWhite(darkSrc, path.join(outDir, 'orbitas-wordmark.png'));
console.log('orbitas-wordmark.png (blanco, modo oscuro)');

// Versión oscura: invertir el blanco o usar foto sobre fondo claro
if (lightBg) {
  await toTransparentDark(path.join(outDir, lightBg), path.join(outDir, 'orbitas-wordmark-dark.png'));
  console.log('orbitas-wordmark-dark.png (oscuro, modo claro)');
} else {
  // Fallback: pintar el wordmark blanco de negro
  const { data, info } = await sharp(path.join(outDir, 'orbitas-wordmark.png'))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 0) {
      data[i] = data[i + 1] = data[i + 2] = 18;
    }
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'orbitas-wordmark-dark.png'));
  console.log('orbitas-wordmark-dark.png (fallback)');
}

// Recorte del isotipo (izquierda del wordmark blanco)
const meta = await sharp(path.join(outDir, 'orbitas-wordmark.png')).metadata();
const markW = Math.round((meta.width ?? 400) * 0.22);
await sharp(path.join(outDir, 'orbitas-wordmark.png'))
  .extract({ left: 0, top: 0, width: Math.max(markW, 40), height: meta.height ?? 80 })
  .trim()
  .png()
  .toFile(path.join(outDir, 'orbitas-mark.png'));
console.log('orbitas-mark.png');
