import type { MessageTree } from './es';

/** Catálogo de mensagens em português (Brasil). */
export const pt: MessageTree = {
  a11y: {
    skipToContent: 'Ir para o conteúdo',
    sections: 'Seções',
    actions: 'Ações',
    language: 'Idioma',
    homeLogo: 'orbitas, ir para o início',
  },
  nav: {
    home: 'Início',
    ruta: 'Rota',
    desafios: 'Desafios',
    sensores: 'Sensores',
    laboratorio: 'Laboratório',
    bitacora: 'Bitácora',
    ia: 'IA NASA',
    equipo: 'Equipe',
    entrega: 'Entrega',
    reglas: 'Regras',
    charla: 'Palestra',
    glosario: 'Glossário',
    ayuda: 'Ajuda',
  },
  header: {
    myKit: 'Meu kit',
    openKit: 'Abrir meu kit',
    themeToLight: 'Mudar para modo claro',
    themeToDark: 'Mudar para modo escuro',
    light: 'Claro',
    dark: 'Escuro',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },
  footer: {
    brand: 'Órbitas · Bitácora Space Apps',
    disclaimer:
      'Guia comunitária e independente, sem afiliação oficial com a NASA nem com o NASA Space Apps Challenge.',
    credits:
      'Créditos: NASA GIBS · NASA EONET · CelesTrak · Esri World Gray Canvas · OpenStreetMap · NASA Visible Earth / Earth Observatory (texturas 3D)',
    clearData: 'Apagar meus dados',
    clearConfirm:
      'Quer apagar seus dados locais (tema, idioma, kit, progresso e notas)? Essa ação não pode ser desfeita.',
  },
  home: {
    eyebrow: '/ Space Apps 2026 · The Next Frontier /',
    titleBefore: 'Do satélite ao seu projeto, com uma',
    titleHighlight: 'bitácora aberta',
    lead:
      'Guia comunitária para percorrer o NASA Space Apps Challenge 2026 (14 e 15 de novembro), da escolha do desafio até a entrega. Escolha um caminho, explore dados e monte seu kit. As ideias são do seu time.',
    ctaRuta: 'Começar a rota',
    ctaAyuda: 'Ajuda do hackathon',
    ctaDesafios: 'Ver desafios',
    ctaSensores: 'Explorar sensores',
    toolsLabel: 'Ferramentas',
    challengesLabel: 'Desafios',
    seedNote:
      'Conteúdo verificado no seed (versão {version}). Abaixo: Terra em escala real com satélites propagados por SGP4 quando o CelesTrak responde.',
    earthEyebrow: '/ Terra em tempo real /',
    earthTitle: 'Escala WGS84, terminador e órbitas',
    earthLabLink: 'Ir ao laboratório 2D',
  },
  contentNotice: {
    title: 'Conteúdo longo ainda em espanhol',
    body:
      'A interface está no seu idioma. O catálogo de ferramentas, os guias de desafios e vários textos longos continuam em espanhol (fonte seed verificada). Você pode mudar o idioma acima a qualquer momento.',
  },
  pages: {
    ruta: {
      title: 'Rota dos dados',
      lead: 'Oito passos da pergunta à entrega. Marque seu progresso; fica salvo neste dispositivo.',
    },
    desafios: {
      title: 'Desafios 2026',
      lead: 'Guias para pensar cada desafio. Sem soluções nem ideias de produto prontas: a entrega é do seu time.',
    },
    sensores: {
      title: 'Sensores',
      lead: 'Escolha o que quer observar e explore geometria, nuvens, dia/noite e resolução em escala.',
    },
    laboratorio: {
      title: 'Laboratório',
      lead: 'Mapa GIBS + eventos EONET + órbitas CelesTrak, com simulador Kepler para conceitos gerais.',
    },
    bitacora: {
      title: 'Bitácora de ferramentas',
      lead: 'Busque, filtre e monte seu kit. Cada ficha cita origem, acesso e semáforo legal orientativo.',
    },
    equipo: {
      title: 'Equipe',
      lead: 'Papéis, cronograma de 48 h e quadro local. Não sincroniza com calendários externos.',
    },
    entrega: {
      title: 'Entrega',
      lead: 'Checklist, referências e guia de pitch. Tudo fica no navegador até você apagar.',
    },
    reglas: {
      title: 'Regras e uso legal',
      lead: 'Orientação com base em termos públicos. Não substitui assessoria jurídica nem os termos oficiais do evento.',
    },
    charla: {
      title: 'Palestra',
      lead: 'Recorded webinar, bilingual pitch, and presentation mode.',
      comingSoon: 'Em breve',
      dateNote:
        'Todo o material da palestra sobe em 16 de outubro de 2026. Volte nesse dia para ver o conteúdo completo.',
      metaDate: 'Date',
      metaFormat: 'Format',
      metaDuration: 'Duration',
      metaQuestions: 'Q&A',
      metaEvent: 'Event',
      presentationMode: 'Presentation mode',
      exitPresentation: 'Exit presentation mode',
      presentationHint: 'Arrow keys or Space to change slides · Esc to exit',
      prevSlide: 'Previous',
      nextSlide: 'Next',
      jumpVideo: 'Watch webinar',
      jumpPitch: 'View pitch',
      speakerLabel: 'Speaker',
      agendaLabel: 'Agenda',
      agendaTitle: 'Hour outline',
      videoLabel: 'Webinar',
      videoTitle: 'Talk recording',
      videoLead:
        'Spoken in Spanish. Choose Spanish or English captions (translation). Captions cover the pedagogical hour; the final block may be live Q&A.',
      subtitlesLabel: 'Captions',
      subtitlesEs: 'Español',
      subtitlesEn: 'English',
      subtitlesOff: 'Off',
      videoMissing:
        'The video file is not in this deploy (it is large and not in git). Place it at public/media/charla/webinar-2026-10-16.mp4 or set TALK.videoEmbedUrl when you upload to YouTube/Vimeo. Locally, reload if you already copied it.',
      videoExternal: 'Open external video',
      pitchLabel: 'Pitch',
      pitchTitle: 'Presentation slides',
      pitchLead:
        'Bilingual key slides (ES/EN) plus the original PDF. Use the language toggle as on-screen subtitles.',
      pitchLangLabel: 'Text language',
      pitchLangEs: 'Español',
      pitchLangEn: 'English',
      pitchOpen: 'Open PDF',
      pitchDownload: 'Download PDF',
      pdfEmbedLabel: 'PDF',
      pdfEmbedTitle: 'Explore Earth from space presentation (PDF)',
      pdfMissing:
        'Could not load the PDF in this deploy. Use "Open PDF" or try again in a few minutes.',
      pdfFallback: 'Your browser cannot display the PDF here.',

    },
    ia: {
      title: 'NASA AI and agents',
      lead:
        'Verified foundation models and MCP agents (Prithvi, Surya, Lunar Foundation Model, INDUS, earthdata-mcp). What each one does and how to start, without inventing challenge solutions.',
    },

    glosario: {
      title: 'Glossário',
      lead: 'Termos GEOINT e espaciais em linguagem simples, com a forma técnica ao lado.',
    },
    ayuda: {
      title: 'Ajuda do hackathon',
      lead: 'Início rápido, relógio de 48 h, estudo NASA em espanhol, explorador mundo↔desafios e modelos.',
    },
    notFound: {
      title: 'Página não encontrada',
      lead: 'Essa rota não existe na Bitácora. Volte ao início ou abra o menu.',
      cta: 'Ir ao início',
    },
  },
  labels: {
    categoria: {
      explorar: 'Explorar sem código',
      datos: 'Consumir dados',
      tematicos: 'Dados temáticos',
      procesar: 'Processar e analisar',
      mapas: 'Mapas e visualização',
      ia: 'IA, modelos e agentes',
      orbitas: 'Órbitas e espaço',
      aprender: 'Aprender',
    },
    origen: {
      nasa: 'NASA',
      socia: 'Agências parceiras',
      abierto: 'Aberto e comunidade',
    },
    tipo: {
      web: 'Web',
      api: 'API',
      python: 'Python',
      js: 'JavaScript',
      escritorio: 'Desktop',
      modelo: 'Modelo IA',
      agente: 'Agente / MCP',
      servidor: 'Servidor',
    },
    acceso: {
      libre: 'Sem cadastro',
      registro: 'Conta gratuita',
      key: 'Chave API gratuita',
    },
    nivel: {
      ini: 'Inicial',
      int: 'Intermediário',
      ava: 'Avançado',
    },
    legal: {
      verde: 'Verde',
      amarillo: 'Amarelo',
    },
    sort: {
      relevancia: 'Relevância',
      nombre: 'Nome',
      nivel: 'Nível',
    },
    view: {
      tarjetas: 'Cartões',
      tabla: 'Tabela',
    },
  },
  common: {
    loading: 'Carregando…',
    error: 'Algo deu errado. Tente de novo em instantes.',
    empty: 'Nenhum resultado com esses filtros.',
    retry: 'Tentar de novo',
    close: 'Fechar',
    search: 'Buscar',
    filters: 'Filtros',
    export: 'Exportar',
    copy: 'Copiar',
    clearFilters: 'Limpar filtros',
    resultCount: '{count} de {total} ferramentas',
    sortLabel: 'Ordem',
    viewLabel: 'Vista',
    copied: 'Copiado',
    addToKit: 'Adicionar ao kit',
    removeFromKit: 'Remover do kit',
    openOfficial: 'Abrir link oficial',
  },
};
