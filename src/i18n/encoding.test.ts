import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LOCALES } from './locales';
import { MESSAGES } from './messages';

/** Patrones típicos de mojibake (UTF-8 leído como Latin-1 y re-encodeado). */
const MOJIBAKE = /Ã.|Â.|Æ.|ƒ|â€|Ä‚|Ĺ|š|˜|�/;

describe('i18n encoding', () => {
  it('los catálogos en disco no tienen mojibake', () => {
    const dir = join(process.cwd(), 'src', 'i18n', 'messages');
    const files = readdirSync(dir).filter((name) => name.endsWith('.ts') && name !== 'index.ts');
    for (const file of files) {
      const text = readFileSync(join(dir, file), 'utf8');
      expect(text, file).not.toMatch(MOJIBAKE);
    }
  });

  it('cada locale carga cadenas legibles en runtime', () => {
    for (const locale of LOCALES) {
      const openMenu = MESSAGES[locale].header.openMenu;
      expect(openMenu.length).toBeGreaterThan(2);
      expect(openMenu).not.toMatch(MOJIBAKE);
      expect(MESSAGES[locale].home.lead).not.toMatch(MOJIBAKE);
    }
    expect(MESSAGES.de.header.openMenu).toBe('Menü öffnen');
    expect(MESSAGES.fr.nav.desafios).toBe('Défis');
  });
});
