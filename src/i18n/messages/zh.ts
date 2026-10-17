import type { MessageTree } from './es';

/** 简体中文消息目录。 */
export const zh: MessageTree = {
  a11y: {
    skipToContent: '跳到主要内容',
    sections: '章节',
    actions: '操作',
    language: '语言',
    homeLogo: 'orbitas，返回首页',
  },
  nav: {
    home: '首页',
    ruta: '路线',
    desafios: '挑战',
    sensores: '传感器',
    laboratorio: '实验室',
    bitacora: '日志',
    ia: 'NASA AI',
    equipo: '团队',
    entrega: '提交',
    reglas: '规则',
    charla: '讲座',
    glosario: '术语表',
    ayuda: '帮助',
  },
  header: {
    myKit: '我的工具包',
    openKit: '打开我的工具包',
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    light: '浅色',
    dark: '深色',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
  },
  footer: {
    brand: 'Órbitas · Space Apps 日志',
    disclaimer:
      '独立社区指南，与 NASA 及 NASA Space Apps Challenge 无官方隶属关系。',
    credits:
      '致谢：NASA GIBS · NASA EONET · CelesTrak · Esri World Gray Canvas · OpenStreetMap · NASA Visible Earth / Earth Observatory（3D 纹理）',
    clearData: '清除我的数据',
    clearConfirm:
      '要清除本机数据（主题、语言、工具包、进度和笔记）吗？此操作无法撤销。',
  },
  home: {
    eyebrow: '/ Space Apps 2026 · The Next Frontier /',
    titleBefore: '从卫星到你的项目，用一本',
    titleHighlight: '开放日志',
    lead:
      '社区指南，带你走过 NASA Space Apps Challenge 2026（11 月 14–15 日），从选择挑战到提交。选一条路、探索数据、搭建工具包。创意属于你的团队。',
    ctaRuta: '开始路线',
    ctaAyuda: '黑客松帮助',
    ctaDesafios: '查看挑战',
    ctaSensores: '探索传感器',
    toolsLabel: '工具',
    challengesLabel: '挑战',
    seedNote:
      '已验证 seed 内容（版本 {version}）。下方：真实比例地球，CelesTrak 可用时由 SGP4 传播卫星轨道。',
    earthEyebrow: '/ 实时地球 /',
    earthTitle: 'WGS84 比例、晨昏线与轨道',
    earthLabLink: '前往 2D 实验室',
  },
  contentNotice: {
    title: '长文内容仍为西班牙语',
    body:
      '界面已为你选择的语言显示。工具目录、挑战指南和若干长文仍为西班牙语（已验证 seed 来源）。你可随时在上方切换语言。',
  },
  pages: {
    ruta: {
      title: '数据路线',
      lead: '从问题到提交共八步。标记进度；数据保存在本设备。',
    },
    desafios: {
      title: '2026 挑战',
      lead: '帮助思考每个挑战的指南。不提供解决方案或成品创意：交付物由你的团队决定。',
    },
    sensores: {
      title: '传感器',
      lead: '选择要观测的内容，在比例尺上探索几何、云、昼夜与分辨率。',
    },
    laboratorio: {
      title: '实验室',
      lead: 'GIBS 地图 + EONET 事件 + CelesTrak 轨道，以及用于一般概念的 Kepler 模拟器。',
    },
    bitacora: {
      title: '工具日志',
      lead: '搜索、筛选并搭建工具包。每张卡片注明来源、访问方式及参考性法律信号灯。',
    },
    equipo: {
      title: '团队',
      lead: '角色、48 小时日程与本地看板。不同步外部日历。',
    },
    entrega: {
      title: '提交',
      lead: '清单、参考文献与 pitch 指南。一切留在浏览器中，直至你清除数据。',
    },
    reglas: {
      title: '规则与合法使用',
      lead: '基于公开条款的指引。不能替代法律咨询或活动官方条款。',
    },
    charla: {
      title: '讲座',
      lead: 'Recorded webinar, bilingual pitch, and presentation mode.',
      comingSoon: '即将推出',
      dateNote: '全部讲座材料将于 2026 年 10 月 16 日上线。请届时回来查看完整内容。',
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
      pitchDownload: 'Download PDF',
      pdfEmbedLabel: 'PDF',
      pdfEmbedTitle: 'Explore Earth from space presentation (PDF)',

    },
    ia: {
      title: 'NASA AI and agents',
      lead:
        'Verified foundation models and MCP agents (Prithvi, Surya, Lunar Foundation Model, INDUS, earthdata-mcp). What each one does and how to start, without inventing challenge solutions.',
    },

    glosario: {
      title: '术语表',
      lead: 'GEOINT 与航天术语的通俗说明，旁附技术表述。',
    },
    ayuda: {
      title: '黑客松帮助',
      lead: '快速入门、48 小时时钟、西班牙语 NASA 学习资料、世界↔挑战探索器与模板。',
    },
    notFound: {
      title: '页面未找到',
      lead: '日志中不存在该路径。返回首页或打开菜单。',
      cta: '返回首页',
    },
  },
  labels: {
    categoria: {
      explorar: '无代码探索',
      datos: '消费数据',
      tematicos: '主题数据',
      procesar: '处理与分析',
      mapas: '地图与可视化',
      ia: 'AI、模型与智能体',
      orbitas: '轨道与太空',
      aprender: '学习',
    },
    origen: {
      nasa: 'NASA',
      socia: '合作机构',
      abierto: '开放与社区',
    },
    tipo: {
      web: 'Web',
      api: 'API',
      python: 'Python',
      js: 'JavaScript',
      escritorio: '桌面',
      modelo: 'AI 模型',
      agente: '智能体 / MCP',
      servidor: '服务器',
    },
    acceso: {
      libre: '无需注册',
      registro: '免费账户',
      key: '免费 API 密钥',
    },
    nivel: {
      ini: '入门',
      int: '中级',
      ava: '高级',
    },
    legal: {
      verde: '绿',
      amarillo: '黄',
    },
    sort: {
      relevancia: '相关度',
      nombre: '名称',
      nivel: '级别',
    },
    view: {
      tarjetas: '卡片',
      tabla: '表格',
    },
  },
  common: {
    loading: '加载中…',
    error: '出了点问题。请稍后再试。',
    empty: '没有符合这些筛选条件的结果。',
    retry: '重试',
    close: '关闭',
    search: '搜索',
    filters: '筛选',
    export: '导出',
    copy: '复制',
    clearFilters: '清除筛选',
    resultCount: '{count} / {total} 个工具',
    sortLabel: '排序',
    viewLabel: '视图',
    copied: '已复制',
    addToKit: '加入工具包',
    removeFromKit: '移出工具包',
    openOfficial: '打开官方链接',
  },
};
