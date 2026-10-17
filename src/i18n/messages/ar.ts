import type { MessageTree } from './es';

/** فهرس الرسائل بالعربية. */
export const ar: MessageTree = {
  a11y: {
    skipToContent: 'انتقل إلى المحتوى',
    sections: 'الأقسام',
    actions: 'إجراءات',
    language: 'اللغة',
    homeLogo: 'orbitas، الذهاب إلى الرئيسية',
  },
  nav: {
    home: 'الرئيسية',
    ruta: 'المسار',
    desafios: 'التحديات',
    sensores: 'المستشعرات',
    laboratorio: 'المختبر',
    bitacora: 'السجل',
    ia: 'NASA AI',
    equipo: 'الفريق',
    entrega: 'التسليم',
    reglas: 'القواعد',
    charla: 'محاضرة',
    glosario: 'المعجم',
    ayuda: 'المساعدة',
  },
  header: {
    myKit: 'عدتي',
    openKit: 'فتح عدتي',
    themeToLight: 'التبديل إلى الوضع الفاتح',
    themeToDark: 'التبديل إلى الوضع الداكن',
    light: 'فاتح',
    dark: 'داكن',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
  },
  footer: {
    brand: 'Órbitas · سجل Space Apps',
    disclaimer:
      'دليل مجتمعي مستقل، دون انتماء رسمي إلى NASA أو NASA Space Apps Challenge.',
    credits:
      'الاعتمادات: NASA GIBS · NASA EONET · CelesTrak · Esri World Gray Canvas · OpenStreetMap · NASA Visible Earth / Earth Observatory (قوام ثلاثية الأبعاد)',
    clearData: 'مسح بياناتي',
    clearConfirm:
      'هل تريد مسح بياناتك المحلية (السمة، اللغة، العدة، التقدم والملاحظات)؟ لا يمكن التراجع عن ذلك.',
  },
  home: {
    eyebrow: '/ Space Apps 2026 · The Next Frontier /',
    titleBefore: 'من القمر الصناعي إلى مشروعك، مع',
    titleHighlight: 'سجل مفتوح',
    lead:
      'دليل مجتمعي لمسار NASA Space Apps Challenge 2026 (14 و15 نوفمبر) من اختيار التحدي إلى التسليم. اختر مسارًا، واستكشف البيانات، وكوّن عدتك. الأفكار لفريقك.',
    ctaRuta: 'ابدأ المسار',
    ctaAyuda: 'مساعدة الهاكاثون',
    ctaDesafios: 'عرض التحديات',
    ctaSensores: 'استكشاف المستشعرات',
    toolsLabel: 'أدوات',
    challengesLabel: 'تحديات',
    seedNote:
      'محتوى seed موثّق (الإصدار {version}). أدناه: الأرض بالمقياس الحقيقي مع أقمار تُحسب عبر SGP4 عندما يستجيب CelesTrak.',
    earthEyebrow: '/ الأرض في الوقت الفعلي /',
    earthTitle: 'مقياس WGS84، خط الفصل والمدارات',
    earthLabLink: 'الذهاب إلى المختبر ثنائي الأبعاد',
  },
  contentNotice: {
    title: 'المحتوى الطويل ما زال بالإسبانية',
    body:
      'الواجهة بلغتك. فهرس الأدوات وأدلة التحديات وعدة نصوص طويلة ما زالت بالإسبانية (مصدر seed موثّق). يمكنك تغيير اللغة أعلاه في أي وقت.',
  },
  pages: {
    ruta: {
      title: 'مسار البيانات',
      lead: 'ثمان خطوات من السؤال إلى التسليم. سجّل تقدمك؛ يبقى على هذا الجهاز.',
    },
    desafios: {
      title: 'تحديات 2026',
      lead: 'أدلة للتفكير في كل تحدٍ. لا حلول ولا أفكار منتج جاهزة: التسليم لكم.',
    },
    sensores: {
      title: 'المستشعرات',
      lead: 'اختر ما تريد مراقبته واستكشف الهندسة والسحب والنهار/الليل والدقة على المقياس.',
    },
    laboratorio: {
      title: 'المختبر',
      lead: 'خريطة GIBS + أحداث EONET + مدارات CelesTrak، مع محاكي Kepler للمفاهيم العامة.',
    },
    bitacora: {
      title: 'سجل الأدوات',
      lead: 'ابحث، رشّح وكوّن عدتك. كل بطاقة تذكر المصدر والوصول وإشارة قانونية إرشادية.',
    },
    equipo: {
      title: 'الفريق',
      lead: 'أدوار، جدول 48 ساعة ولوحة محلية. لا مزامنة مع تقاويم خارجية.',
    },
    entrega: {
      title: 'التسليم',
      lead: 'قائمة تحقق ومراجع ودليل pitch. كل شيء يبقى في المتصفح حتى تمسحه.',
    },
    reglas: {
      title: 'القواعد والاستخدام القانوني',
      lead: 'إرشاد مبني على شروط عامة. لا يغني عن استشارة قانونية ولا شروط الحدث الرسمية.',
    },
    charla: {
      title: 'محاضرة',
      lead: 'Recorded webinar, bilingual pitch, and presentation mode.',
      comingSoon: 'قريبًا',
      dateNote:
        'تُرفع كل مواد المحاضرة في 16 أكتوبر 2026. عد في ذلك اليوم للاطلاع على المحتوى كاملًا.',
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
      title: 'المعجم',
      lead: 'مصطلحات GEOINT والفضاء بلغة بسيطة، مع الصيغة التقنية بجانبها.',
    },
    ayuda: {
      title: 'مساعدة الهاكاثون',
      lead: 'بدء سريع، ساعة 48 ساعة، دراسة NASA بالإسبانية، مستكشف العالم↔التحديات وقوالب.',
    },
    notFound: {
      title: 'الصفحة غير موجودة',
      lead: 'هذا المسار غير موجود في السجل. ارجع للرئيسية أو افتح القائمة.',
      cta: 'الذهاب للرئيسية',
    },
  },
  labels: {
    categoria: {
      explorar: 'استكشاف بلا كود',
      datos: 'استهلاك البيانات',
      tematicos: 'بيانات موضوعية',
      procesar: 'معالجة وتحليل',
      mapas: 'خرائط وتصور',
      ia: 'AI ونماذج ووكلاء',
      orbitas: 'مدارات والفضاء',
      aprender: 'تعلّم',
    },
    origen: {
      nasa: 'NASA',
      socia: 'وكالات شريكة',
      abierto: 'مفتوح ومجتمع',
    },
    tipo: {
      web: 'Web',
      api: 'API',
      python: 'Python',
      js: 'JavaScript',
      escritorio: 'سطح المكتب',
      modelo: 'نموذج AI',
      agente: 'وكيل / MCP',
      servidor: 'خادم',
    },
    acceso: {
      libre: 'بلا تسجيل',
      registro: 'حساب مجاني',
      key: 'مفتاح API مجاني',
    },
    nivel: {
      ini: 'مبتدئ',
      int: 'متوسط',
      ava: 'متقدّم',
    },
    legal: {
      verde: 'أخضر',
      amarillo: 'أصفر',
    },
    sort: {
      relevancia: 'الصلة',
      nombre: 'الاسم',
      nivel: 'المستوى',
    },
    view: {
      tarjetas: 'بطاقات',
      tabla: 'جدول',
    },
  },
  common: {
    loading: 'جارٍ التحميل…',
    error: 'حدث خطأ. حاول مرة أخرى بعد قليل.',
    empty: 'لا نتائج بهذه المرشحات.',
    retry: 'إعادة المحاولة',
    close: 'إغلاق',
    search: 'بحث',
    filters: 'مرشحات',
    export: 'تصدير',
    copy: 'نسخ',
    clearFilters: 'مسح المرشحات',
    resultCount: '{count} من {total} أداة',
    sortLabel: 'الترتيب',
    viewLabel: 'العرض',
    copied: 'تم النسخ',
    addToKit: 'أضف إلى العدة',
    removeFromKit: 'أزل من العدة',
    openOfficial: 'فتح الرابط الرسمي',
  },
};
