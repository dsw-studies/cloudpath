(() => {
  if (window.__cloudpathEnhancementsLoaded) return;
  window.__cloudpathEnhancementsLoaded = true;

  const LANGS = ['ru', 'pl', 'en'];
  const langMeta = {
    ru: { label: 'Русский', switcher: 'Язык страницы', top: 'Наверх' },
    pl: { label: 'Polski', switcher: 'Język strony', top: 'Do góry' },
    en: { label: 'English', switcher: 'Page language', top: 'Back to top' }
  };

  const navLabels = {
    'index.html': ['⌂ Учебный кабинет', '⌂ Panel nauki', '⌂ Study dashboard'],
    'schedule.html': ['🗓 Расписание', '🗓 Plan zajęć', '🗓 Schedule'],
    'glossary.html': ['Глоссарий (чайник)', 'Słowniczek (dla początkujących)', 'Glossary (beginner)'],
    'semesters.html': ['Семестры 1–7', 'Semestry 1–7', 'Semesters 1–7'],
    'specdeep.html': ['Спец. курсы подробно', 'Kursy specjalizacyjne szczegółowo', 'Specialization courses in detail'],
    'languages.html': ['Языки', 'Języki', 'Languages'],
    'syntax.html': ['Синтаксис языков', 'Składnia języków', 'Language syntax'],
    'courses.html': ['Бесплатные курсы', 'Darmowe kursy', 'Free courses'],
    'english.html': ['Английский', 'Angielski', 'English'],
    'ai.html': ['Работа с ИИ', 'Praca z AI', 'Working with AI'],
    'tools.html': ['Приложения', 'Aplikacje', 'Apps'],
    'setup.html': ['Установка с нуля', 'Instalacja od zera', 'Setup from scratch'],
    'certs.html': ['Сертификаты', 'Certyfikaty', 'Certificates'],
    'finance.html': ['Финансы / RKM', 'Finanse / RKM', 'Finance / RKM'],
    'housing.html': ['Жильё', 'Mieszkanie', 'Housing'],
    'parttime.html': ['Подработка', 'Praca dodatkowa', 'Part-time work'],
    'legal.html': ['Легализация пребывания', 'Legalizacja pobytu', 'Stay legalization'],
    'faq.html': ['FAQ — если что-то пошло не так', 'FAQ — gdy coś pójdzie nie tak', 'FAQ — if something goes wrong'],
    'resources.html': ['Ресурсы', 'Zasoby', 'Resources'],
    'university.html': ['ABC студента DSW Ideis', 'ABC studenta DSW Ideis', 'DSW Ideis student ABC']
  };

  const globalText = {
    'Перейти к содержанию': ['Перейти к содержанию', 'Przejdź do treści', 'Skip to content'],
    'Открыть →': ['Открыть →', 'Otwórz →', 'Open →'],
    'Новый конспект': ['Новый конспект', 'Nowa notatka', 'New note'],
    'Редактировать конспект': ['Редактировать конспект', 'Edytuj notatkę', 'Edit note'],
    'Название': ['Название', 'Tytuł', 'Title'],
    'Дата': ['Дата', 'Data', 'Date'],
    'Предмет': ['Предмет', 'Przedmiot', 'Subject'],
    'Теги': ['Теги', 'Tagi', 'Tags'],
    'Конспект': ['Конспект', 'Notatka', 'Note'],
    'Отмена': ['Отмена', 'Anuluj', 'Cancel'],
    'Сохранить': ['Сохранить', 'Zapisz', 'Save'],
    'Удалить': ['Удалить', 'Usuń', 'Delete'],
    'Конспект сохранён': ['Конспект сохранён', 'Notatka zapisana', 'Note saved'],
    'Конспект удалён': ['Конспект удалён', 'Notatka usunięta', 'Note deleted'],
    'Удалено': ['Удалено', 'Usunięto', 'Deleted'],
    'Добавь название': ['Добавь название', 'Dodaj tytuł', 'Add a title'],
    'Пока нет конспектов. Нажми «Новый конспект» и создай первую запись.': [
      'Пока нет конспектов. Нажми «Новый конспект» и создай первую запись.',
      'Nie ma jeszcze notatek. Kliknij „Nowa notatka”, aby utworzyć pierwszą.',
      'No notes yet. Click “New note” to create the first one.'
    ],
    'Ничего не найдено. Создай первый конспект или измени поиск.': [
      'Ничего не найдено. Создай первый конспект или измени поиск.',
      'Nic nie znaleziono. Utwórz notatkę albo zmień wyszukiwanie.',
      'Nothing found. Create a note or change the search.'
    ],
    'Python — полный конспект с нуля': ['Python — полный конспект с нуля', 'Python — pełne notatki od zera', 'Python — complete notes from scratch'],
    'Структуры данных — полный базовый конспект': ['Структуры данных — полный базовый конспект', 'Struktury danych — pełne podstawy', 'Data structures — complete basics'],
    'Векторы — с нуля: формулы и примеры': ['Векторы — с нуля: формулы и примеры', 'Wektory od zera — wzory i przykłady', 'Vectors from scratch — formulas and examples'],
    'От переменных и if до функций, коллекций, файлов, JSON и классов.': [
      'От переменных и if до функций, коллекций, файлов, JSON и классов.',
      'Od zmiennych i if po funkcje, kolekcje, pliki, JSON i klasy.',
      'From variables and if statements to functions, collections, files, JSON and classes.'
    ],
    'Как хранить данные и какую структуру выбирать под разные операции.': [
      'Как хранить данные и какую структуру выбирать под разные операции.',
      'Jak przechowywać dane i dobierać strukturę do różnych operacji.',
      'How to store data and choose a structure for different operations.'
    ],
    'Стрелка, координаты, длина, сложение, скалярное произведение и угол.': [
      'Стрелка, координаты, длина, сложение, скалярное произведение и угол.',
      'Strzałka, współrzędne, długość, dodawanie, iloczyn skalarny i kąt.',
      'Arrow, coordinates, length, addition, dot product and angle.'
    ],
    'Переменные': ['Переменные', 'Zmienne', 'Variables'],
    'Функции': ['Функции', 'Funkcje', 'Functions'],
    'Файлы': ['Файлы', 'Pliki', 'Files'],
    'Ошибки': ['Ошибки', 'Błędy', 'Errors'],
    'Координаты': ['Координаты', 'Współrzędne', 'Coordinates'],
    'Длина': ['Длина', 'Długość', 'Length'],
    'Сложение': ['Сложение', 'Dodawanie', 'Addition'],
    'Умножение': ['Умножение', 'Mnożenie', 'Multiplication'],
    'Скалярное произведение': ['Скалярное произведение', 'Iloczyn skalarny', 'Dot product'],
    'Угол': ['Угол', 'Kąt', 'Angle'],
    'Базис': ['Базис', 'Baza', 'Basis'],
    'Организация учёбы': ['Организация учёбы', 'Organizacja nauki', 'Study organization'],
    'CloudPath теперь работает как мой учебный блокнот. Здесь будут конспекты с лекций, формулы, код и материалы к экзаменам.': [
      'CloudPath теперь работает как мой учебный блокнот. Здесь будут конспекты с лекций, формулы, код и материалы к экзаменам.',
      'CloudPath działa teraz jako mój notatnik do nauki. Będą tu notatki z wykładów, wzory, kod i materiały do egzaminów.',
      'CloudPath now works as my study notebook. It will contain lecture notes, formulas, code and exam materials.'
    ],
    '03 окт. 2026 г.': ['03 окт. 2026 г.', '03 paź 2026', 'Oct 3, 2026'],
    '30 сент. 2026 г.': ['30 сент. 2026 г.', '30 wrz 2026', 'Sep 30, 2026']
  };

  const globalPlaceholders = {
    'Поиск по конспектам, предметам и тегам…': [
      'Поиск по конспектам, предметам и тегам…',
      'Szukaj w notatkach, przedmiotach i tagach…',
      'Search notes, subjects and tags…'
    ],
    'Например: Матрицы и определители': [
      'Например: Матрицы и определители',
      'Np. Macierze i wyznaczniki',
      'For example: Matrices and determinants'
    ],
    'экзамен, важное, повторить': [
      'экзамен, важное, повторить',
      'egzamin, ważne, powtórzyć',
      'exam, important, review'
    ],
    'Пиши сюда конспект: определения, формулы, код, ссылки, вопросы…': [
      'Пиши сюда конспект: определения, формулы, код, ссылки, вопросы…',
      'Wpisz notatkę: definicje, wzory, kod, linki, pytania…',
      'Write your note here: definitions, formulas, code, links, questions…'
    ]
  };

  const pageTitles = {
    '/': ['CloudPath — учебный кабинет', 'CloudPath — panel nauki', 'CloudPath — study dashboard'],
    '/index.html': ['CloudPath — учебный кабинет', 'CloudPath — panel nauki', 'CloudPath — study dashboard'],
    '/schedule.html': ['Расписание — CloudPath', 'Plan zajęć — CloudPath', 'Schedule — CloudPath']
  };

  const idx = lang => LANGS.indexOf(lang);
  const pick = (tr, lang) => tr[Math.max(0, idx(lang))] || tr[0];

  const nav = document.querySelector('.toc');
  if (nav) {
    nav.setAttribute('aria-label', 'Основная навигация');
    const current = nav.querySelector('a.active');
    if (current) current.setAttribute('aria-current', 'page');
  }

  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.rel = 'noopener noreferrer';
  });

  const style = document.createElement('style');
  style.textContent = `
    #langSwitcher{position:fixed!important;top:14px!important;right:18px!important;bottom:auto!important;z-index:9999!important;display:flex!important;gap:5px!important;padding:5px!important;border:1px solid rgba(126,146,168,.34)!important;background:rgba(11,20,32,.96)!important;backdrop-filter:blur(10px);border-radius:10px!important;box-shadow:0 8px 28px rgba(0,0,0,.35)!important}
    #langSwitcher .lang-btn{border:1px solid #2d4258!important;background:#111d2c!important;color:#9fb0c2!important;padding:7px 10px!important;border-radius:7px!important;cursor:pointer!important;font:700 11px ui-monospace,SFMono-Regular,Consolas,monospace!important;box-shadow:none!important}
    #langSwitcher .lang-btn:hover{color:#e7ecf2!important;border-color:#4fd8c4!important}
    #langSwitcher .lang-btn[aria-pressed="true"]{background:#4fd8c4!important;color:#071a18!important;border-color:#4fd8c4!important}
    @media(max-width:900px){#langSwitcher{top:auto!important;right:10px!important;bottom:10px!important}}
  `;
  document.head.append(style);

  let languageSwitcher = document.querySelector('#langSwitcher');
  if (!languageSwitcher) {
    languageSwitcher = document.createElement('div');
    languageSwitcher.id = 'langSwitcher';
    languageSwitcher.innerHTML = '<button class="lang-btn" data-lang="ru" type="button">RU</button><button class="lang-btn" data-lang="pl" type="button">PL</button><button class="lang-btn" data-lang="en" type="button">EN</button>';
    document.body.append(languageSwitcher);
  }

  const previousSetLang = typeof window.setLang === 'function' ? window.setLang.bind(window) : null;
  const originalText = new WeakMap();
  const originalPlaceholder = new WeakMap();
  let currentLang = 'ru';

  function translateDataAttributes(lang) {
    document.querySelectorAll('[data-i18n-ru]').forEach(element => {
      const key = `i18n${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
      const text = element.dataset[key] || element.dataset.i18nRu;
      const counter = element.querySelector('.cnt');
      if (counter) {
        const value = counter.textContent;
        element.textContent = text + ' ';
        const span = document.createElement('span');
        span.className = 'cnt';
        span.textContent = value;
        element.append(span);
      } else {
        element.textContent = text;
      }
    });
  }

  function translateNav(lang) {
    document.querySelectorAll('.toc a[href]').forEach(link => {
      let path;
      try { path = new URL(link.getAttribute('href'), location.href).pathname.split('/').pop() || 'index.html'; }
      catch (_) { return; }

      // Prefer the translation stored directly on the navigation link.
      // This keeps the sidebar reliable on dashboard/schedule pages even
      // when another script has already changed the link text.
      const dataKey = `i18n${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
      const direct = link.dataset[dataKey];
      const labels = navLabels[path];
      const translated = direct || (labels ? pick(labels, lang) : null);
      if (translated) link.textContent = translated;
    });
  }

  function shouldSkipTextNode(node) {
    const p = node.parentElement;
    if (!p) return true;
    if (['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(p.tagName)) return true;
    return !!p.closest('#langSwitcher');
  }

  function translateTextNode(node, lang) {
    if (shouldSkipTextNode(node) || !node.nodeValue.trim()) return;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node);
    const key = original.trim();
    const tr = globalText[key];
    if (!tr) return;
    node.nodeValue = original.replace(key, pick(tr, lang));
  }

  function translateGlobalText(root, lang) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root, lang);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root !== document.body) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node, lang);

    const elements = root.matches?.('[placeholder]') ? [root] : [...root.querySelectorAll?.('[placeholder]') || []];
    elements.forEach(el => {
      if (!originalPlaceholder.has(el)) originalPlaceholder.set(el, el.getAttribute('placeholder') || '');
      const original = originalPlaceholder.get(el);
      const tr = globalPlaceholders[original];
      if (tr) el.setAttribute('placeholder', pick(tr, lang));
    });
  }

  function translateTitle(lang) {
    if (!document.documentElement.dataset.originalTitle) {
      document.documentElement.dataset.originalTitle = document.title;
    }
    const path = location.pathname || '/';
    if (pageTitles[path]) {
      document.title = pick(pageTitles[path], lang);
      return;
    }
    const original = document.documentElement.dataset.originalTitle;
    const dictionaries = {
      pl: typeof I18N_PL !== 'undefined' ? I18N_PL : {},
      en: typeof I18N_EN !== 'undefined' ? I18N_EN : {}
    };
    document.title = lang === 'ru' ? original : (dictionaries[lang]?.[original] || original);
  }

  function syncSwitcher(lang) {
    languageSwitcher.setAttribute('role', 'group');
    languageSwitcher.setAttribute('aria-label', langMeta[lang].switcher);
    languageSwitcher.querySelectorAll('.lang-btn').forEach(button => {
      button.setAttribute('aria-label', `${langMeta[lang].switcher}: ${langMeta[button.dataset.lang]?.label || button.textContent.trim()}`);
      button.setAttribute('aria-pressed', button.dataset.lang === lang ? 'true' : 'false');
    });
  }

  window.setLang = lang => {
    if (!LANGS.includes(lang)) lang = 'ru';
    currentLang = lang;
    if (previousSetLang) previousSetLang(lang);
    document.documentElement.lang = lang;
    translateDataAttributes(lang);
    translateNav(lang);
    translateGlobalText(document.body, lang);
    translateTitle(lang);
    syncSwitcher(lang);
    try { localStorage.setItem('cloudpath-language', lang); } catch (_) {}
    window.dispatchEvent(new CustomEvent('cloudpath:language', { detail: { lang } }));
  };

  languageSwitcher.querySelectorAll('.lang-btn').forEach(button => {
    button.removeAttribute('onclick');
    button.addEventListener('click', () => window.setLang(button.dataset.lang));
  });

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(node => translateGlobalText(node, currentLang));
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  let savedLanguage = 'ru';
  try { savedLanguage = localStorage.getItem('cloudpath-language') || 'ru'; } catch (_) {}
  window.setLang(savedLanguage);

  const main = document.querySelector('.main');
  if (main) {
    main.id ||= 'main-content';
    main.tabIndex = -1;
  }

  if (!document.querySelector('.back-to-top')) {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.type = 'button';
    button.textContent = '↑';
    document.body.append(button);
    const syncButton = () => button.classList.toggle('visible', window.scrollY > 600);
    const syncTopLabel = () => button.setAttribute('aria-label', langMeta[currentLang].top);
    window.addEventListener('scroll', syncButton, { passive: true });
    window.addEventListener('cloudpath:language', syncTopLabel);
    syncButton();
    syncTopLabel();
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(() => {}));
  }
})();
