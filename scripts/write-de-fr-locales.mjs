/**
 * Reescribe de.ts y fr.ts con escapes \\uXXXX (fuente ASCII-safe).
 * Ejecutar: node scripts/write-de-fr-locales.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const messagesDir = path.join(root, 'src', 'i18n', 'messages');

/** Escapa no-ASCII a \\uXXXX para que el .ts sea puro ASCII. */
function esc(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/[^\x20-\x7e]/g, (ch) => {
    const code = ch.codePointAt(0);
    if (code > 0xffff) {
      const h = Math.floor((code - 0x10000) / 0x400) + 0xd800;
      const l = ((code - 0x10000) % 0x400) + 0xdc00;
      return `\\u${h.toString(16).padStart(4, '0')}\\u${l.toString(16).padStart(4, '0')}`;
    }
    return `\\u${code.toString(16).padStart(4, '0')}`;
  });
}

function emitValue(value, indent) {
  if (typeof value === 'string') return `'${esc(value)}'`;
  const pad = '  '.repeat(indent);
  const padIn = '  '.repeat(indent + 1);
  const lines = Object.entries(value).map(([k, v]) => `${padIn}${k}: ${emitValue(v, indent + 1)},`);
  return `{\n${lines.join('\n')}\n${pad}}`;
}

function writeLocale(filename, exportName, body) {
  const ts = `import type { MessageTree } from './es';\n\nexport const ${exportName}: MessageTree = ${emitValue(body, 0)};\n`;
  const out = path.join(messagesDir, filename);
  fs.writeFileSync(out, ts, { encoding: 'utf8' });
  // Verifica que el archivo sea ASCII excepto saltos de linea
  const buf = fs.readFileSync(out);
  for (const b of buf) {
    if (b > 127) throw new Error(`${filename} contains non-ASCII byte ${b}`);
  }
  console.log('wrote ASCII-safe', filename, 'bytes', buf.length);
}

// Cadenas definidas con \\u en este script (ASCII-only source file).
const de = {
  a11y: {
    skipToContent: 'Zum Inhalt springen',
    sections: 'Abschnitte',
    actions: 'Aktionen',
    language: 'Sprache',
    homeLogo: 'orbitas, zur Startseite',
  },
  nav: {
    home: 'Start',
    ruta: 'Pfad',
    desafios: 'Challenges',
    sensores: 'Sensoren',
    laboratorio: 'Labor',
    bitacora: 'Logbuch',
    equipo: 'Team',
    entrega: 'Abgabe',
    reglas: 'Regeln',
    charla: 'Vortrag',
    glosario: 'Glossar',
    ayuda: 'Hilfe',
  },
  header: {
    myKit: 'Mein Kit',
    openKit: 'Mein Kit \u00f6ffnen',
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    light: 'Hell',
    dark: 'Dunkel',
    openMenu: 'Men\u00fc \u00f6ffnen',
    closeMenu: 'Men\u00fc schlie\u00dfen',
  },
  footer: {
    brand: '\u00d3rbitas \u00b7 Space Apps Logbuch',
    disclaimer:
      'Unabh\u00e4ngiger Community-Leitfaden ohne offizielle Verbindung zur NASA oder zum NASA Space Apps Challenge.',
    credits:
      'Credits: NASA GIBS \u00b7 NASA EONET \u00b7 CelesTrak \u00b7 Esri World Gray Canvas \u00b7 OpenStreetMap \u00b7 NASA Visible Earth / Earth Observatory (3D-Texturen)',
    clearData: 'Meine Daten l\u00f6schen',
    clearConfirm:
      'M\u00f6chtest du deine lokalen Daten (Theme, Sprache, Kit, Fortschritt und Notizen) l\u00f6schen? Das kann nicht r\u00fcckg\u00e4ngig gemacht werden.',
  },
  home: {
    eyebrow: '/ Space Apps 2026 \u00b7 The Next Frontier /',
    titleBefore: 'Vom Satellit zu deinem Projekt, mit einem',
    titleHighlight: 'offenen Logbuch',
    lead:
      'Community-Leitfaden f\u00fcr den NASA Space Apps Challenge 2026 (14. und 15. November) \u2013 von der Challenge-Wahl bis zur Abgabe. W\u00e4hle einen Pfad, erkunde Daten und baue dein Kit. Die Ideen geh\u00f6ren deinem Team.',
    ctaRuta: 'Pfad starten',
    ctaAyuda: 'Hackathon-Hilfe',
    ctaDesafios: 'Challenges ansehen',
    ctaSensores: 'Sensoren erkunden',
    toolsLabel: 'Tools',
    challengesLabel: 'Challenges',
    seedNote:
      'Verifizierter Seed-Inhalt (Version {version}). Unten: Erde im realen Ma\u00dfstab mit Satelliten, per SGP4 propagiert, wenn CelesTrak antwortet.',
    earthEyebrow: '/ Erde in Echtzeit /',
    earthTitle: 'WGS84-Ma\u00dfstab, Terminator und Umlaufbahnen',
    earthLabLink: 'Zum 2D-Labor',
  },
  contentNotice: {
    title: 'Ausf\u00fchrliche Inhalte noch auf Spanisch',
    body:
      'Die Oberfl\u00e4che ist in deiner Sprache. Der Tool-Katalog, Challenge-Leitf\u00e4den und mehrere lange Texte bleiben auf Spanisch (verifizierte Seed-Quelle). Du kannst die Sprache oben jederzeit wechseln.',
  },
  pages: {
    ruta: {
      title: 'Datenpfad',
      lead:
        'Acht Schritte von der Frage bis zur Abgabe. Markiere deinen Fortschritt; er bleibt auf diesem Ger\u00e4t.',
    },
    desafios: {
      title: 'Challenges 2026',
      lead:
        'Leitf\u00e4den zum Nachdenken \u00fcber jede Challenge. Keine L\u00f6sungen oder fertigen Produktideen: Die Abgabe ist eure.',
    },
    sensores: {
      title: 'Sensoren',
      lead:
        'W\u00e4hle, was du beobachten willst, und erkunde Geometrie, Wolken, Tag/Nacht und Aufl\u00f6sung im Ma\u00dfstab.',
    },
    laboratorio: {
      title: 'Labor',
      lead:
        'GIBS-Karte + EONET-Ereignisse + CelesTrak-Umlaufbahnen, plus Kepler-Simulator f\u00fcr allgemeine Konzepte.',
    },
    bitacora: {
      title: 'Daten- und Tool-Logbuch',
      lead:
        'Suche, filtere und baue dein Kit. Jede Karte nennt Herkunft, Zugang und ein indikatives rechtliches Ampelsignal.',
    },
    equipo: {
      title: 'Team',
      lead: 'Rollen, 48-Stunden-Zeitplan und lokales Board. Keine Sync mit externen Kalendern.',
    },
    entrega: {
      title: 'Abgabe',
      lead:
        'Checkliste, Referenzen und Pitch-Leitfaden. Alles bleibt im Browser, bis du es l\u00f6schst.',
    },
    reglas: {
      title: 'Regeln und rechtliche Nutzung',
      lead:
        'Orientierung auf Basis \u00f6ffentlicher Bedingungen. Ersetzt keine Rechtsberatung noch die offiziellen Event-Bedingungen.',
    },
    charla: {
      title: 'Vortrag',
      lead: 'Webinar, Agenda und Pr\u00e4sentationsmodus. Noch nicht ver\u00f6ffentlicht.',
      comingSoon: 'Demn\u00e4chst',
      dateNote:
        'Das gesamte Vortragsmaterial wird am 16. Oktober 2026 ver\u00f6ffentlicht. Komm an diesem Tag zur\u00fcck f\u00fcr den vollst\u00e4ndigen Inhalt.',
    },
    glosario: {
      title: 'Glossar',
      lead:
        'GEOINT- und Raumfahrtbegriffe in einfacher Sprache, mit der technischen Form daneben.',
    },
    ayuda: {
      title: 'Hackathon-Hilfe',
      lead:
        'Schnellstart, 48-Stunden-Uhr, NASA-Studium auf Spanisch, Welt\u2194Challenge-Explorer und Vorlagen.',
    },
    notFound: {
      title: 'Seite nicht gefunden',
      lead: 'Diese Route existiert im Logbuch nicht. Geh zur Startseite oder \u00f6ffne das Men\u00fc.',
      cta: 'Zur Startseite',
    },
  },
  labels: {
    categoria: {
      explorar: 'Ohne Code erkunden',
      datos: 'Daten nutzen',
      tematicos: 'Thematische Daten',
      procesar: 'Verarbeiten und analysieren',
      mapas: 'Karten und Visualisierung',
      ia: 'KI, Modelle und Agenten',
      orbitas: 'Umlaufbahnen und Raumfahrt',
      lernen: 'Lernen',
      aprender: 'Lernen',
    },
    origen: {
      nasa: 'NASA',
      socia: 'Partneragenturen',
      abierto: 'Open und Community',
    },
    tipo: {
      web: 'Web',
      api: 'API',
      python: 'Python',
      js: 'JavaScript',
      escritorio: 'Desktop',
      modelo: 'KI-Modell',
      agente: 'Agent / MCP',
      servidor: 'Server',
    },
    acceso: {
      libre: 'Ohne Anmeldung',
      registro: 'Kostenloses Konto',
      key: 'Kostenloser API-Schl\u00fcssel',
    },
    nivel: {
      ini: 'Einsteiger',
      int: 'Mittel',
      ava: 'Fortgeschritten',
    },
    legal: {
      verde: 'Gr\u00fcn',
      amarillo: 'Gelb',
    },
    sort: {
      relevancia: 'Relevanz',
      nombre: 'Name',
      nivel: 'Niveau',
    },
    view: {
      tarjetas: 'Karten',
      tabla: 'Tabelle',
    },
  },
  common: {
    loading: 'Wird geladen\u2026',
    error: 'Etwas ist schiefgelaufen. Versuch es gleich noch einmal.',
    empty: 'Keine Ergebnisse mit diesen Filtern.',
    retry: 'Erneut versuchen',
    close: 'Schlie\u00dfen',
    search: 'Suchen',
    filters: 'Filter',
    export: 'Exportieren',
    copy: 'Kopieren',
    clearFilters: 'Filter l\u00f6schen',
    resultCount: '{count} von {total} Tools',
    sortLabel: 'Sortierung',
    viewLabel: 'Ansicht',
    copied: 'Kopiert',
    addToKit: 'Zum Kit hinzuf\u00fcgen',
    removeFromKit: 'Aus Kit entfernen',
    openOfficial: 'Offiziellen Link \u00f6ffnen',
  },
};

// Fix accidental typo key
delete de.labels.categoria.lernen;

const fr = {
  a11y: {
    skipToContent: 'Aller au contenu',
    sections: 'Sections',
    actions: 'Actions',
    language: 'Langue',
    homeLogo: "orbitas, retour \u00e0 l'accueil",
  },
  nav: {
    home: 'Accueil',
    ruta: 'Parcours',
    desafios: 'D\u00e9fis',
    sensores: 'Capteurs',
    laboratorio: 'Labo',
    bitacora: 'Journal',
    equipo: '\u00c9quipe',
    entrega: 'Livraison',
    reglas: 'R\u00e8gles',
    charla: 'Conf\u00e9rence',
    glosario: 'Glossaire',
    ayuda: 'Aide',
  },
  header: {
    myKit: 'Mon kit',
    openKit: 'Ouvrir mon kit',
    themeToLight: 'Passer en mode clair',
    themeToDark: 'Passer en mode sombre',
    light: 'Clair',
    dark: 'Sombre',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  footer: {
    brand: '\u00d3rbitas \u00b7 Journal Space Apps',
    disclaimer:
      'Guide communautaire ind\u00e9pendant, sans affiliation officielle avec la NASA ni le NASA Space Apps Challenge.',
    credits:
      'Cr\u00e9dits : NASA GIBS \u00b7 NASA EONET \u00b7 CelesTrak \u00b7 Esri World Gray Canvas \u00b7 OpenStreetMap \u00b7 NASA Visible Earth / Earth Observatory (textures 3D)',
    clearData: 'Effacer mes donn\u00e9es',
    clearConfirm:
      'Tu veux effacer tes donn\u00e9es locales (th\u00e8me, langue, kit, progression et notes) ? Cette action est irr\u00e9versible.',
  },
  home: {
    eyebrow: '/ Space Apps 2026 \u00b7 The Next Frontier /',
    titleBefore: 'Du satellite \u00e0 ton projet, avec un',
    titleHighlight: 'journal ouvert',
    lead:
      'Guide communautaire pour parcourir le NASA Space Apps Challenge 2026 (14 et 15 novembre), du choix du d\u00e9fi \u00e0 la livraison. Choisis un parcours, explore les donn\u00e9es et compose ton kit. Les id\u00e9es viennent de ton \u00e9quipe.',
    ctaRuta: 'Commencer le parcours',
    ctaAyuda: 'Aide hackathon',
    ctaDesafios: 'Voir les d\u00e9fis',
    ctaSensores: 'Explorer les capteurs',
    toolsLabel: 'Outils',
    challengesLabel: 'D\u00e9fis',
    seedNote:
      "Contenu seed v\u00e9rifi\u00e9 (version {version}). Ci-dessous : Terre \u00e0 l'\u00e9chelle r\u00e9elle avec satellites propag\u00e9s par SGP4 quand CelesTrak r\u00e9pond.",
    earthEyebrow: '/ Terre en temps r\u00e9el /',
    earthTitle: '\u00c9chelle WGS84, terminateur et orbites',
    earthLabLink: 'Aller au labo 2D',
  },
  contentNotice: {
    title: 'Contenu long encore en espagnol',
    body:
      "L'interface est dans ta langue. Le catalogue d'outils, les guides de d\u00e9fis et plusieurs textes longs restent en espagnol (source seed v\u00e9rifi\u00e9e). Tu peux changer de langue en haut \u00e0 tout moment.",
  },
  pages: {
    ruta: {
      title: 'Parcours des donn\u00e9es',
      lead:
        'Huit \u00e9tapes de la question \u00e0 la livraison. Suis ta progression ; elle reste sur cet appareil.',
    },
    desafios: {
      title: 'D\u00e9fis 2026',
      lead:
        "Guides pour r\u00e9fl\u00e9chir \u00e0 chaque d\u00e9fi. Pas de solutions ni d'id\u00e9es produit toutes faites : la livraison t'appartient.",
    },
    sensores: {
      title: 'Capteurs',
      lead:
        "Choisis ce que tu veux observer et explore g\u00e9om\u00e9trie, nuages, jour/nuit et r\u00e9solution \u00e0 l'\u00e9chelle.",
    },
    laboratorio: {
      title: 'Labo',
      lead:
        'Carte GIBS + \u00e9v\u00e9nements EONET + orbites CelesTrak, plus un simulateur Kepler pour les concepts g\u00e9n\u00e9raux.',
    },
    bitacora: {
      title: "Journal d'outils et de donn\u00e9es",
      lead:
        'Cherche, filtre et compose ton kit. Chaque fiche indique origine, acc\u00e8s et feu tricolore juridique indicatif.',
    },
    equipo: {
      title: '\u00c9quipe',
      lead:
        'R\u00f4les, planning 48 h et tableau local. Pas de synchro avec des calendriers externes.',
    },
    entrega: {
      title: 'Livraison',
      lead:
        "Checklist, r\u00e9f\u00e9rences et guide de pitch. Tout reste dans ton navigateur jusqu'\u00e0 ce que tu effaces.",
    },
    reglas: {
      title: 'R\u00e8gles et usage l\u00e9gal',
      lead:
        "Orientation bas\u00e9e sur des conditions publiques. Ne remplace pas un avis juridique ni les conditions officielles de l'\u00e9v\u00e9nement.",
    },
    charla: {
      title: 'Conf\u00e9rence',
      lead: 'Webinaire, agenda et mode pr\u00e9sentation. Pas encore publi\u00e9s.',
      comingSoon: 'Bient\u00f4t',
      dateNote:
        'Tout le mat\u00e9riel de la conf\u00e9rence est mis en ligne le 16 octobre 2026. Reviens ce jour-l\u00e0 pour le contenu complet.',
    },
    glosario: {
      title: 'Glossaire',
      lead:
        'Termes GEOINT et spatiaux en langage simple, avec la forme technique \u00e0 c\u00f4t\u00e9.',
    },
    ayuda: {
      title: 'Aide hackathon',
      lead:
        'D\u00e9marrage rapide, horloge 48 h, \u00e9tude NASA en espagnol, explorateur monde\u2194d\u00e9fis et mod\u00e8les.',
    },
    notFound: {
      title: 'Page introuvable',
      lead: "Cette route n'existe pas dans le journal. Retourne \u00e0 l'accueil ou ouvre le menu.",
      cta: "Retour \u00e0 l'accueil",
    },
  },
  labels: {
    categoria: {
      explorar: 'Explorer sans code',
      datos: 'Consommer des donn\u00e9es',
      tematicos: 'Donn\u00e9es th\u00e9matiques',
      procesar: 'Traiter et analyser',
      mapas: 'Cartes et visualisation',
      ia: 'IA, mod\u00e8les et agents',
      orbitas: 'Orbites et espace',
      aprender: 'Apprendre',
    },
    origen: {
      nasa: 'NASA',
      socia: 'Agences partenaires',
      abierto: 'Ouvert et communaut\u00e9',
    },
    tipo: {
      web: 'Web',
      api: 'API',
      python: 'Python',
      js: 'JavaScript',
      escritorio: 'Bureau',
      modelo: 'Mod\u00e8le IA',
      agente: 'Agent / MCP',
      servidor: 'Serveur',
    },
    acceso: {
      libre: 'Sans inscription',
      registro: 'Compte gratuit',
      key: 'Cl\u00e9 API gratuite',
    },
    nivel: {
      ini: 'D\u00e9butant',
      int: 'Interm\u00e9diaire',
      ava: 'Avanc\u00e9',
    },
    legal: {
      verde: 'Vert',
      amarillo: 'Jaune',
    },
    sort: {
      relevancia: 'Pertinence',
      nombre: 'Nom',
      nivel: 'Niveau',
    },
    view: {
      tarjetas: 'Cartes',
      tabla: 'Tableau',
    },
  },
  common: {
    loading: 'Chargement\u2026',
    error: 'Un probl\u00e8me est survenu. R\u00e9essaie dans un instant.',
    empty: 'Aucun r\u00e9sultat avec ces filtres.',
    retry: 'R\u00e9essayer',
    close: 'Fermer',
    search: 'Rechercher',
    filters: 'Filtres',
    export: 'Exporter',
    copy: 'Copier',
    clearFilters: 'Effacer les filtres',
    resultCount: '{count} sur {total} outils',
    sortLabel: 'Tri',
    viewLabel: 'Vue',
    copied: 'Copi\u00e9',
    addToKit: 'Ajouter au kit',
    removeFromKit: 'Retirer du kit',
    openOfficial: 'Ouvrir le lien officiel',
  },
};

writeLocale('de.ts', 'de', de);
writeLocale('fr.ts', 'fr', fr);

// Runtime check
const deText = fs.readFileSync(path.join(messagesDir, 'de.ts'), 'utf8');
if (!deText.includes('\\u00fc') && !deText.includes('\\u00f6')) {
  throw new Error('de.ts missing unicode escapes');
}
console.log('runtime openMenu would be:', 'Men\u00fc \u00f6ffnen');
