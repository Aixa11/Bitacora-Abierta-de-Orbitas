import type { MessageTree } from './es';

/** हिन्दी संदेश सूची। */
export const hi: MessageTree = {
  a11y: {
    skipToContent: 'सामग्री पर जाएँ',
    sections: 'अनुभाग',
    actions: 'क्रियाएँ',
    language: 'भाषा',
    homeLogo: 'orbitas, होम पर जाएँ',
  },
  nav: {
    home: 'होम',
    ruta: 'मार्ग',
    desafios: 'चुनौतियाँ',
    sensores: 'सेंसर',
    laboratorio: 'प्रयोगशाला',
    bitacora: 'लॉगबुक',
    ia: 'NASA AI',
    equipo: 'टीम',
    entrega: 'जमा',
    reglas: 'नियम',
    charla: 'वार्ता',
    glosario: 'शब्दकोश',
    ayuda: 'सहायता',
  },
  header: {
    myKit: 'मेरा किट',
    openKit: 'मेरा किट खोलें',
    themeToLight: 'लाइट मोड पर जाएँ',
    themeToDark: 'डार्क मोड पर जाएँ',
    light: 'लाइट',
    dark: 'डार्क',
    openMenu: 'मेनू खोलें',
    closeMenu: 'मेनू बंद करें',
  },
  footer: {
    brand: 'Órbitas · Space Apps लॉगबुक',
    disclaimer:
      'स्वतंत्र सामुदायिक मार्गदर्शिका; NASA या NASA Space Apps Challenge से कोई आधिकारिक संबद्धता नहीं।',
    credits:
      'श्रेय: NASA GIBS · NASA EONET · CelesTrak · Esri World Gray Canvas · OpenStreetMap · NASA Visible Earth / Earth Observatory (3D टेक्सचर)',
    clearData: 'मेरा डेटा मिटाएँ',
    clearConfirm:
      'क्या आप अपना स्थानीय डेटा (थीम, भाषा, किट, प्रगति और नोट) मिटाना चाहते हैं? यह वापस नहीं हो सकता।',
  },
  home: {
    eyebrow: '/ Space Apps 2026 · The Next Frontier /',
    titleBefore: 'उपग्रह से आपके प्रोजेक्ट तक, एक',
    titleHighlight: 'खुली लॉगबुक',
    lead:
      'NASA Space Apps Challenge 2026 (14–15 नवंबर) के लिए सामुदायिक मार्गदर्शिका — चुनौती चुनने से जमा तक। एक रास्ता चुनें, डेटा देखें और अपना किट बनाएँ। विचार आपकी टीम के हैं।',
    ctaRuta: 'मार्ग शुरू करें',
    ctaAyuda: 'हैकाथॉन सहायता',
    ctaDesafios: 'चुनौतियाँ देखें',
    ctaSensores: 'सेंसर देखें',
    toolsLabel: 'उपकरण',
    challengesLabel: 'चुनौतियाँ',
    seedNote:
      'सत्यापित seed सामग्री (संस्करण {version})। नीचे: वास्तविक पैमाने पर पृथ्वी; CelesTrak जवाब देने पर SGP4 से उपग्रह।',
    earthEyebrow: '/ वास्तविक समय में पृथ्वी /',
    earthTitle: 'WGS84 पैमाना, टर्मिनेटर और कक्षाएँ',
    earthLabLink: '2D प्रयोगशाला पर जाएँ',
  },
  contentNotice: {
    title: 'लंबी सामग्री अभी भी स्पेनिश में',
    body:
      'इंटरफ़ेस आपकी भाषा में है। उपकरण सूची, चुनौती मार्गदर्शिकाएँ और कई लंबे पाठ स्पेनिश में हैं (सत्यापित seed स्रोत)। आप ऊपर कभी भी भाषा बदल सकते हैं।',
  },
  pages: {
    ruta: {
      title: 'डेटा मार्ग',
      lead: 'प्रश्न से जमा तक आठ कदम। अपनी प्रगति चिह्नित करें; यह इस उपकरण पर रहती है।',
    },
    desafios: {
      title: '2026 चुनौतियाँ',
      lead: 'हर चुनौती पर सोचने के लिए मार्गदर्शिकाएँ। कोई समाधान या तैयार उत्पाद विचार नहीं: जमा आपकी टीम का है।',
    },
    sensores: {
      title: 'सेंसर',
      lead: 'जो देखना चाहते हैं चुनें और पैमाने पर ज्यामिति, बादल, दिन/रात और रिज़ॉल्यूशन देखें।',
    },
    laboratorio: {
      title: 'प्रयोगशाला',
      lead: 'GIBS मानचित्र + EONET घटनाएँ + CelesTrak कक्षाएँ, सामान्य अवधारणाओं के लिए Kepler सिम्युलेटर।',
    },
    bitacora: {
      title: 'उपकरण लॉगबुक',
      lead: 'खोजें, फ़िल्टर करें और किट बनाएँ। हर कार्ड में स्रोत, पहुँच और संकेतक कानूनी संकेत।',
    },
    equipo: {
      title: 'टीम',
      lead: 'भूमिकाएँ, 48 घंटे का कार्यक्रम और स्थानीय बोर्ड। बाहरी कैलेंडर से सिंक नहीं।',
    },
    entrega: {
      title: 'जमा',
      lead: 'चेकलिस्ट, संदर्भ और pitch मार्गदर्शिका। मिटाने तक सब ब्राउज़र में रहता है।',
    },
    reglas: {
      title: 'नियम और कानूनी उपयोग',
      lead: 'सार्वजनिक शर्तों पर आधारित मार्गदर्शन। कानूनी सलाह या आधिकारिक कार्यक्रम शर्तों का विकल्प नहीं।',
    },
    charla: {
      title: 'वार्ता',
      lead: 'वेबिनार, एजेंडा और प्रस्तुति मोड। अभी प्रकाशित नहीं।',
      comingSoon: 'जल्द आ रहा है',
      dateNote:
        'वार्ता की सारी सामग्री 16 अक्टूबर 2026 को अपलोड होगी। पूरा कंटेंट देखने के लिए उस दिन वापस आएँ।',
    },
    ia: {
      title: 'NASA AI and agents',
      lead:
        'Verified foundation models and MCP agents (Prithvi, Surya, Lunar Foundation Model, INDUS, earthdata-mcp). What each one does and how to start, without inventing challenge solutions.',
    },

    glosario: {
      title: 'शब्दकोश',
      lead: 'GEOINT और अंतरिक्ष शब्द सरल भाषा में, तकनीकी रूप बगल में।',
    },
    ayuda: {
      title: 'हैकाथॉन सहायता',
      lead: 'त्वरित शुरुआत, 48 घंटे की घड़ी, स्पेनिश में NASA अध्ययन, दुनिया↔चुनौती एक्सप्लोरर और टेम्पलेट।',
    },
    notFound: {
      title: 'पृष्ठ नहीं मिला',
      lead: 'लॉगबुक में वह मार्ग नहीं है। होम पर जाएँ या मेनू खोलें।',
      cta: 'होम पर जाएँ',
    },
  },
  labels: {
    categoria: {
      explorar: 'बिना कोड के देखें',
      datos: 'डेटा उपयोग',
      tematicos: 'विषयगत डेटा',
      procesar: 'प्रसंस्करण और विश्लेषण',
      mapas: 'मानचित्र और दृश्य',
      ia: 'AI, मॉडल और एजेंट',
      orbitas: 'कक्षाएँ और अंतरिक्ष',
      aprender: 'सीखें',
    },
    origen: {
      nasa: 'NASA',
      socia: 'साझीदार एजेंसियाँ',
      abierto: 'खुला और समुदाय',
    },
    tipo: {
      web: 'Web',
      api: 'API',
      python: 'Python',
      js: 'JavaScript',
      escritorio: 'डेस्कटॉप',
      modelo: 'AI मॉडल',
      agente: 'एजेंट / MCP',
      servidor: 'सर्वर',
    },
    acceso: {
      libre: 'बिना साइनअप',
      registro: 'मुफ़्त खाता',
      key: 'मुफ़्त API कुंजी',
    },
    nivel: {
      ini: 'शुरुआती',
      int: 'मध्यम',
      ava: 'उन्नत',
    },
    legal: {
      verde: 'हरा',
      amarillo: 'पीला',
    },
    sort: {
      relevancia: 'प्रासंगिकता',
      nombre: 'नाम',
      nivel: 'स्तर',
    },
    view: {
      tarjetas: 'कार्ड',
      tabla: 'तालिका',
    },
  },
  common: {
    loading: 'लोड हो रहा है…',
    error: 'कुछ गड़बड़ हुई। थोड़ी देर बाद फिर कोशिश करें।',
    empty: 'उन फ़िल्टर से कोई परिणाम नहीं।',
    retry: 'फिर कोशिश करें',
    close: 'बंद करें',
    search: 'खोज',
    filters: 'फ़िल्टर',
    export: 'निर्यात',
    copy: 'कॉपी',
    clearFilters: 'फ़िल्टर साफ़ करें',
    resultCount: '{count} में से {total} उपकरण',
    sortLabel: 'क्रम',
    viewLabel: 'दृश्य',
    copied: 'कॉपी हो गया',
    addToKit: 'किट में जोड़ें',
    removeFromKit: 'किट से हटाएँ',
    openOfficial: 'आधिकारिक लिंक खोलें',
  },
};
