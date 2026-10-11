import { describe, expect, it } from 'vitest';
import { maxTextureWidth } from './limitTextureSize';

describe('maxTextureWidth', () => {
  it('mapea 2k → 2048 y 4k → 4096', () => {
    expect(maxTextureWidth('2k')).toBe(2048);
    expect(maxTextureWidth('4k')).toBe(4096);
  });
});
