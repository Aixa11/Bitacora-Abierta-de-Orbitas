import type { Locale } from '../locales';
import { ar } from './ar';
import { de } from './de';
import { en } from './en';
import { es, type MessageTree } from './es';
import { fr } from './fr';
import { hi } from './hi';
import { ja } from './ja';
import { pt } from './pt';
import { ru } from './ru';
import { zh } from './zh';

export type { MessageTree };

export const MESSAGES: Record<Locale, MessageTree> = {
  es,
  en,
  zh,
  pt,
  fr,
  de,
  ja,
  hi,
  ar,
  ru,
};
