import { describe, expect, it } from 'vitest';
import { basemapTileUrl } from './basemap';

describe('basemapTileUrl', () => {
  it('usa Esri y no CARTO (que exige API key)', () => {
    const dark = basemapTileUrl('dark');
    const light = basemapTileUrl('light');
    expect(dark).toContain('arcgisonline.com');
    expect(light).toContain('arcgisonline.com');
    expect(dark).not.toContain('cartocdn.com');
    expect(light).not.toContain('cartocdn.com');
  });
});
