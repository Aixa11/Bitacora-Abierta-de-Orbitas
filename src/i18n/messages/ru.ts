import type { MessageTree } from './es';

/** Каталог сообщений на русском. */
export const ru: MessageTree = {
  a11y: {
    skipToContent: 'Перейти к содержимому',
    sections: 'Разделы',
    actions: 'Действия',
    language: 'Язык',
    homeLogo: 'orbitas, на главную',
  },
  nav: {
    home: 'Главная',
    ruta: 'Маршрут',
    desafios: 'Челленджи',
    sensores: 'Датчики',
    laboratorio: 'Лаборатория',
    bitacora: 'Журнал',
    ia: 'NASA AI',
    equipo: 'Команда',
    entrega: 'Сдача',
    reglas: 'Правила',
    charla: 'Доклад',
    glosario: 'Глоссарий',
    ayuda: 'Помощь',
  },
  header: {
    myKit: 'Мой набор',
    openKit: 'Открыть мой набор',
    themeToLight: 'Переключить на светлую тему',
    themeToDark: 'Переключить на тёмную тему',
    light: 'Светлая',
    dark: 'Тёмная',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
  },
  footer: {
    brand: 'Órbitas · Журнал Space Apps',
    disclaimer:
      'Независимое сообщество-руководство без официальной связи с NASA или NASA Space Apps Challenge.',
    credits:
      'Благодарности: NASA GIBS · NASA EONET · CelesTrak · Esri World Gray Canvas · OpenStreetMap · NASA Visible Earth / Earth Observatory (3D-текстуры)',
    clearData: 'Удалить мои данные',
    clearConfirm:
      'Удалить локальные данные (тема, язык, набор, прогресс и заметки)? Это нельзя отменить.',
  },
  home: {
    eyebrow: '/ Space Apps 2026 · The Next Frontier /',
    titleBefore: 'От спутника к вашему проекту — с',
    titleHighlight: 'открытым журналом',
    lead:
      'Сообщество-руководство по NASA Space Apps Challenge 2026 (14–15 ноября): от выбора челленджа до сдачи. Выберите маршрут, изучите данные и соберите набор. Идеи — вашей команды.',
    ctaRuta: 'Начать маршрут',
    ctaAyuda: 'Помощь хакатона',
    ctaDesafios: 'Смотреть челленджи',
    ctaSensores: 'Изучить датчики',
    toolsLabel: 'Инструменты',
    challengesLabel: 'Челленджи',
    seedNote:
      'Проверенный seed-контент (версия {version}). Ниже: Земля в реальном масштабе; спутники по SGP4, когда отвечает CelesTrak.',
    earthEyebrow: '/ Земля в реальном времени /',
    earthTitle: 'Масштаб WGS84, терминатор и орбиты',
    earthLabLink: 'В 2D-лабораторию',
  },
  contentNotice: {
    title: 'Длинные тексты пока на испанском',
    body:
      'Интерфейс на вашем языке. Каталог инструментов, гиды по челленджам и несколько длинных текстов остаются на испанском (проверенный seed). Язык можно сменить вверху в любой момент.',
  },
  pages: {
    ruta: {
      title: 'Маршрут данных',
      lead: 'Восемь шагов от вопроса до сдачи. Отмечайте прогресс — он хранится на этом устройстве.',
    },
    desafios: {
      title: 'Челленджи 2026',
      lead: 'Гиды, чтобы думать над каждым челленджем. Без готовых решений и идей продукта: результат — ваш.',
    },
    sensores: {
      title: 'Датчики',
      lead: 'Выберите, что наблюдать, и изучите геометрию, облака, день/ночь и разрешение в масштабе.',
    },
    laboratorio: {
      title: 'Лаборатория',
      lead: 'Карта GIBS + события EONET + орбиты CelesTrak и симулятор Kepler для общих понятий.',
    },
    bitacora: {
      title: 'Журнал инструментов',
      lead: 'Ищите, фильтруйте и собирайте набор. На каждой карточке — источник, доступ и ориентировочный «светофор» по праву.',
    },
    equipo: {
      title: 'Команда',
      lead: 'Роли, расписание на 48 ч и локальная доска. Без синхронизации с внешними календарями.',
    },
    entrega: {
      title: 'Сдача',
      lead: 'Чек-лист, ссылки и гид по pitch. Всё в браузере, пока не удалите.',
    },
    reglas: {
      title: 'Правила и правовое использование',
      lead: 'Ориентиры по публичным условиям. Не заменяет юриста и официальные условия события.',
    },
    charla: {
      title: 'Доклад',
      lead: 'Вебинар, повестка и режим презентации. Пока не опубликованы.',
      comingSoon: 'Скоро',
      dateNote:
        'Все материалы доклада публикуются 16 октября 2026 года. Вернитесь в этот день за полным контентом.',
    },
    ia: {
      title: 'NASA AI and agents',
      lead:
        'Verified foundation models and MCP agents (Prithvi, Surya, Lunar Foundation Model, INDUS, earthdata-mcp). What each one does and how to start, without inventing challenge solutions.',
    },

    glosario: {
      title: 'Глоссарий',
      lead: 'Термины GEOINT и космоса простым языком, рядом — техническая форма.',
    },
    ayuda: {
      title: 'Помощь хакатона',
      lead: 'Быстрый старт, часы на 48 ч, материалы NASA на испанском, обозреватель мир↔челленджи и шаблоны.',
    },
    notFound: {
      title: 'Страница не найдена',
      lead: 'Такого маршрута нет в журнале. На главную или откройте меню.',
      cta: 'На главную',
    },
  },
  labels: {
    categoria: {
      explorar: 'Исследовать без кода',
      datos: 'Потребление данных',
      tematicos: 'Тематические данные',
      procesar: 'Обработка и анализ',
      mapas: 'Карты и визуализация',
      ia: 'ИИ, модели и агенты',
      orbitas: 'Орбиты и космос',
      aprender: 'Учиться',
    },
    origen: {
      nasa: 'NASA',
      socia: 'Партнёрские агентства',
      abierto: 'Открытое и сообщество',
    },
    tipo: {
      web: 'Web',
      api: 'API',
      python: 'Python',
      js: 'JavaScript',
      escritorio: 'Настольное',
      modelo: 'Модель ИИ',
      agente: 'Агент / MCP',
      servidor: 'Сервер',
    },
    acceso: {
      libre: 'Без регистрации',
      registro: 'Бесплатный аккаунт',
      key: 'Бесплатный ключ API',
    },
    nivel: {
      ini: 'Начальный',
      int: 'Средний',
      ava: 'Продвинутый',
    },
    legal: {
      verde: 'Зелёный',
      amarillo: 'Жёлтый',
    },
    sort: {
      relevancia: 'Релевантность',
      nombre: 'Имя',
      nivel: 'Уровень',
    },
    view: {
      tarjetas: 'Карточки',
      tabla: 'Таблица',
    },
  },
  common: {
    loading: 'Загрузка…',
    error: 'Что-то пошло не так. Попробуйте снова через миг.',
    empty: 'Нет результатов с такими фильтрами.',
    retry: 'Повторить',
    close: 'Закрыть',
    search: 'Поиск',
    filters: 'Фильтры',
    export: 'Экспорт',
    copy: 'Копировать',
    clearFilters: 'Сбросить фильтры',
    resultCount: '{count} из {total} инструментов',
    sortLabel: 'Сортировка',
    viewLabel: 'Вид',
    copied: 'Скопировано',
    addToKit: 'В набор',
    removeFromKit: 'Убрать из набора',
    openOfficial: 'Открыть официальную ссылку',
  },
};
