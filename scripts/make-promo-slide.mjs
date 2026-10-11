/**
 * Slide promocional 1920×1080 (16:9) para Bitácora Space Apps · Órbitas.
 * Sin logos oficiales de la NASA ni del Space Apps.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'promo');
await mkdir(outDir, { recursive: true });

const W = 1920;
const H = 1080;

const logoPath = path.join(root, 'public', 'brand', 'orbitas-wordmark.png');
const logoBuf = await sharp(logoPath).resize({ height: 88, fit: 'inside' }).png().toBuffer();
const logoMeta = await sharp(logoBuf).metadata();

const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="haloA" cx="18%" cy="12%" r="55%">
      <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#05050A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="haloB" cx="88%" cy="18%" r="48%">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#05050A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="haloC" cx="55%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#5FE0FF" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#05050A" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#FFFFFF" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="#05050A"/>
  <rect width="${W}" height="${H}" fill="url(#haloA)"/>
  <rect width="${W}" height="${H}" fill="url(#haloB)"/>
  <rect width="${W}" height="${H}" fill="url(#haloC)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- etiqueta -->
  <text x="120" y="280" fill="#A4A0BD" font-family="JetBrains Mono, Consolas, monospace" font-size="22" letter-spacing="4">/ SPACE APPS 2026 · THE NEXT FRONTIER /</text>

  <!-- título -->
  <text x="120" y="420" fill="#FFFFFF" font-family="Space Grotesk, Inter, Arial, sans-serif" font-size="86" font-weight="700">Bitácora Space Apps</text>
  <text x="120" y="510" fill="#ECEAF6" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="400">Del satélite a tu proyecto</text>

  <!-- línea acento -->
  <rect x="120" y="560" width="220" height="4" rx="2" fill="#7C3AED"/>
  <rect x="340" y="560" width="120" height="4" rx="2" fill="#3B82F6"/>

  <!-- cuerpo -->
  <text x="120" y="650" fill="#C8C4D8" font-family="Inter, Arial, sans-serif" font-size="28">
    Guía abierta de GEOINT y datos abiertos para equipos del hackatón
  </text>
  <text x="120" y="700" fill="#C8C4D8" font-family="Inter, Arial, sans-serif" font-size="28">
    14 y 15 de noviembre de 2026 · material de apoyo de Órbitas
  </text>

  <!-- pie -->
  <text x="120" y="1000" fill="#8B87A3" font-family="Inter, Arial, sans-serif" font-size="20">
    Guía comunitaria e independiente, sin afiliación oficial con la NASA ni con el NASA Space Apps Challenge
  </text>
</svg>`);

const out = path.join(outDir, 'bitacora-orbitas-space-apps-2026-slide.png');
await sharp(bg)
  .composite([{ input: logoBuf, left: 120, top: 100 }])
  .png()
  .toFile(out);

console.log(`Listo: ${out}`);
console.log(`Tamaño: ${W}×${H} (slide 16:9)`);
console.log(`Logo: ${logoMeta.width}×${logoMeta.height}`);
