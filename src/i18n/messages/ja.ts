import type { MessageTree } from './es';

/** 日本語メッセージカタログ。 */
export const ja: MessageTree = {
  a11y: {
    skipToContent: '本文へスキップ',
    sections: 'セクション',
    actions: '操作',
    language: '言語',
    homeLogo: 'orbitas、ホームへ',
  },
  nav: {
    home: 'ホーム',
    ruta: 'ルート',
    desafios: 'チャレンジ',
    sensores: 'センサー',
    laboratorio: 'ラボ',
    bitacora: 'ログ',
    ia: 'NASA AI',
    equipo: 'チーム',
    entrega: '提出',
    reglas: 'ルール',
    charla: 'トーク',
    glosario: '用語集',
    ayuda: 'ヘルプ',
  },
  header: {
    myKit: 'マイキット',
    openKit: 'マイキットを開く',
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    light: 'ライト',
    dark: 'ダーク',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
  },
  footer: {
    brand: 'Órbitas · Space Apps ログ',
    disclaimer:
      'NASA および NASA Space Apps Challenge とは公式の関係がない、独立したコミュニティガイドです。',
    credits:
      'クレジット: NASA GIBS · NASA EONET · CelesTrak · Esri World Gray Canvas · OpenStreetMap · NASA Visible Earth / Earth Observatory（3D テクスチャ）',
    clearData: 'データを消去',
    clearConfirm:
      'ローカルデータ（テーマ、言語、キット、進捗、メモ）を消去しますか？元に戻せません。',
  },
  home: {
    eyebrow: '/ Space Apps 2026 · The Next Frontier /',
    titleBefore: '衛星からあなたのプロジェクトへ、',
    titleHighlight: 'オープンなログ',
    lead:
      'NASA Space Apps Challenge 2026（11 月 14–15 日）を、チャレンジ選びから提出まで進めるコミュニティガイド。ルートを選び、データを探索し、キットを組み立てよう。アイデアはチームのものです。',
    ctaRuta: 'ルートを始める',
    ctaAyuda: 'ハッカソンヘルプ',
    ctaDesafios: 'チャレンジを見る',
    ctaSensores: 'センサーを探索',
    toolsLabel: 'ツール',
    challengesLabel: 'チャレンジ',
    seedNote:
      '検証済み seed コンテンツ（バージョン {version}）。下: 実スケールの地球。CelesTrak が応答するとき SGP4 で衛星を伝播。',
    earthEyebrow: '/ リアルタイムの地球 /',
    earthTitle: 'WGS84 スケール、ターミネーターと軌道',
    earthLabLink: '2D ラボへ',
  },
  contentNotice: {
    title: '長文コンテンツはまだスペイン語',
    body:
      'インターフェースは選択した言語です。ツールカタログ、チャレンジガイド、いくつかの長文はスペイン語のまま（検証済み seed ソース）。上でいつでも言語を変更できます。',
  },
  pages: {
    ruta: {
      title: 'データルート',
      lead: '問いから提出まで 8 ステップ。進捗を記録。この端末に保存されます。',
    },
    desafios: {
      title: '2026 チャレンジ',
      lead: '各チャレンジを考えるためのガイド。解答や完成品のアイデアはありません。成果物はチーム次第です。',
    },
    sensores: {
      title: 'センサー',
      lead: '観測したいものを選び、幾何、雲、昼夜、解像度をスケールで探索。',
    },
    laboratorio: {
      title: 'ラボ',
      lead: 'GIBS マップ + EONET イベント + CelesTrak 軌道、一般概念用の Kepler シミュレータ付き。',
    },
    bitacora: {
      title: 'ツールログ',
      lead: '検索、フィルター、キット作成。各カードに出典、アクセス、参考用の法的信号。',
    },
    equipo: {
      title: 'チーム',
      lead: '役割、48 時間スケジュール、ローカルボード。外部カレンダーとは同期しません。',
    },
    entrega: {
      title: '提出',
      lead: 'チェックリスト、参考文献、ピッチガイド。消去するまでブラウザに残ります。',
    },
    reglas: {
      title: 'ルールと合法的利用',
      lead: '公開条件に基づく案内。法律相談や公式イベント条件の代わりにはなりません。',
    },
    charla: {
      title: 'トーク',
      lead: 'Recorded webinar, bilingual pitch, and presentation mode.',
      comingSoon: '近日公開',
      dateNote:
        'トーク資料はすべて 2026年10月16日 に公開されます。その日に戻って完全版をご覧ください。',
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
      pitchLead: 'Webinar pitch as PDF (Spanish). View it here or open in a new tab.',
      pitchLangLabel: 'Text language',
      pitchLangEs: 'Español',
      pitchLangEn: 'English',
      pitchOpen: 'Open PDF',
      pitchDownload: 'Download PDF',
      pdfEmbedLabel: 'PDF',
      pdfEmbedTitle: 'Explore Earth from space presentation (PDF)',
      pdfLoading: 'Loading the PDF…',
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
      title: '用語集',
      lead: 'GEOINT と宇宙用語を平易に、技術表記を横に。',
    },
    ayuda: {
      title: 'ハッカソンヘルプ',
      lead: 'クイックスタート、48 時間クロック、スペイン語 NASA 学習、世界↔チャレンジ探索、テンプレート。',
    },
    notFound: {
      title: 'ページが見つかりません',
      lead: 'ログにそのルートはありません。ホームへ戻るかメニューを開いてください。',
      cta: 'ホームへ',
    },
  },
  labels: {
    categoria: {
      explorar: 'コードなしで探索',
      datos: 'データを利用',
      tematicos: 'テーマ別データ',
      procesar: '処理と分析',
      mapas: '地図と可視化',
      ia: 'AI、モデル、エージェント',
      orbitas: '軌道と宇宙',
      aprender: '学ぶ',
    },
    origen: {
      nasa: 'NASA',
      socia: 'パートナー機関',
      abierto: 'オープンとコミュニティ',
    },
    tipo: {
      web: 'Web',
      api: 'API',
      python: 'Python',
      js: 'JavaScript',
      escritorio: 'デスクトップ',
      modelo: 'AI モデル',
      agente: 'エージェント / MCP',
      servidor: 'サーバー',
    },
    acceso: {
      libre: '登録不要',
      registro: '無料アカウント',
      key: '無料 API キー',
    },
    nivel: {
      ini: '初級',
      int: '中級',
      ava: '上級',
    },
    legal: {
      verde: '緑',
      amarillo: '黄',
    },
    sort: {
      relevancia: '関連度',
      nombre: '名前',
      nivel: 'レベル',
    },
    view: {
      tarjetas: 'カード',
      tabla: '表',
    },
  },
  common: {
    loading: '読み込み中…',
    error: '問題が発生しました。しばらくして再試行してください。',
    empty: 'そのフィルターでは結果がありません。',
    retry: '再試行',
    close: '閉じる',
    search: '検索',
    filters: 'フィルター',
    export: 'エクスポート',
    copy: 'コピー',
    clearFilters: 'フィルターをクリア',
    resultCount: '{count} / {total} ツール',
    sortLabel: '並び替え',
    viewLabel: '表示',
    copied: 'コピー済み',
    addToKit: 'キットに追加',
    removeFromKit: 'キットから削除',
    openOfficial: '公式リンクを開く',
  },
};
