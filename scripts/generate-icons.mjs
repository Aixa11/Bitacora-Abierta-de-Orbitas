import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'icons');

const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#05050A"/>
  <path d="M256 88C184 144 144 208 144 256s40 112 112 168" stroke="#3B82F6" stroke-width="40" fill="none" stroke-linecap="round"/>
  <path d="M256 88c72 56 112 120 112 168s-40 112-112 168" stroke="#7C3AED" stroke-width="40" fill="none" stroke-linecap="round"/>
  <circle cx="256" cy="256" r="56" fill="#7C3AED"/>
</svg>`);

await mkdir(outDir, { recursive: true });
await sharp(svg).resize(192, 192).png().toFile(path.join(outDir, 'icon-192.png'));
await sharp(svg).resize(512, 512).png().toFile(path.join(outDir, 'icon-512.png'));
await writeFile(path.join(outDir, 'README.md'), 'Iconos PWA generados con scripts/generate-icons.mjs\n');
console.log('Iconos PWA en public/icons/');
