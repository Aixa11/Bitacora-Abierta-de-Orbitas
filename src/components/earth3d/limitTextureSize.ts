import * as THREE from 'three';
import type { TextureQuality } from './texturePaths';

/** Ancho máximo de textura según calidad UI (2k = 2048, 4k = 4096). */
export function maxTextureWidth(quality: TextureQuality): number {
  return quality === '4k' ? 4096 : 2048;
}

/**
 * Limita el tamaño de una textura ya cargada dibujándola en canvas.
 * Sirve cuando la fuente remota es la misma JPG NASA y el usuario pide 2k vs 4k.
 * No muta la imagen cacheada de drei: clona y sustituye el contenido del clone.
 */
export function applyTextureQuality(
  texture: THREE.Texture,
  quality: TextureQuality,
): THREE.Texture {
  const maxW = maxTextureWidth(quality);
  const src = texture.image as CanvasImageSource & { width?: number; height?: number };
  if (!src || typeof src.width !== 'number' || typeof src.height !== 'number') {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  const out = texture.clone();
  out.colorSpace = THREE.SRGBColorSpace;
  out.anisotropy = quality === '4k' ? 8 : 2;
  out.minFilter = THREE.LinearMipmapLinearFilter;
  out.magFilter = THREE.LinearFilter;
  out.generateMipmaps = true;

  if (src.width <= maxW) {
    out.image = src;
    out.needsUpdate = true;
    return out;
  }

  const height = Math.max(1, Math.round((src.height / src.width) * maxW));
  const canvas = document.createElement('canvas');
  canvas.width = maxW;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    out.image = src;
    out.needsUpdate = true;
    return out;
  }
  ctx.drawImage(src, 0, 0, maxW, height);
  out.image = canvas;
  out.needsUpdate = true;
  return out;
}
