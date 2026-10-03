(() => {
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
    #langSwitcher{position:fixed;top:14px;right:18px;z-index:250;display:flex;gap:6px;padding:5px;border:1px solid rgba(126,146,168,.25);background:rgba(11,20,32,.9);backdrop-filter:blur(10px);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.25)}
    #langSwitcher .lang-btn{border:1px solid transparent;background:transparent;color:#9fb0c2;padding:6px 9px;border-radius:7px;cursor:pointer;font:700 11px ui-monospace,SFMono-Regular,Consolas,monospace}
    #langSwitcher .lang-btn:hover{color:#e7ecf2;border-color:#33485f}
    #langSwitcher .lang-btn[aria-pressed="true"]{background:#4fd8c4;color:#071a18;border-color:#4fd8c4}
    @media(max-width:900px){#langSwitcher{top:auto;right:10px;bottom:10px}}
  `;
  document.head.append(style);

  let languageSwitcher = document.querySelector('#langSwitcher');
  if (!languageSwitcher) {
    languageSwitcher = document.createElement('div');
    languageSwitcher.id = 'langSwitcher';
    languageSwitcher.innerHTML = '<button class="lang-btn" data-lang="ru" type="button">RU</button><button class="lang-btn" data-lang="pl" type="button">PL</button><button class="lang-btn" data-lang="en" type="button">EN</button>';
    document.body.append(languageSwitcher);
  }
  languageSwitcher.setAttribute('role', 'group');
  languageSwitcher.setAttribute('aria-label', 'Язык страницы');

  const translateDataAttributes = lang => {
    document.documentElement.lang = lang;
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
  };

  const previousSetLang = typeof window.setLang === 'function' ? window.setLang.bind(window) : null;
  window.setLang = lang => {
    if (!['ru','pl','en'].includes(lang)) lang = 'ru';
    if (previousSetLang) previousSetLang(lang);
    translateDataAttributes(lang);
    try { localStorage.setItem('cloudpath-language', lang); } catch (_) {}

    const dictionaries = {
      pl: typeof I18N_PL !== 'undefined' ? I18N_PL : {},
      en: typeof I18N_EN !== 'undefined' ? I18N_EN : {}
    };
    if (!document.documentElement.dataset.originalTitle) document.documentElement.dataset.originalTitle = document.title;
    const originalTitle = document.documentElement.dataset.originalTitle;
    document.title = lang === 'ru' ? originalTitle : (dictionaries[lang]?.[originalTitle] || originalTitle);

    document.querySelectorAll('.lang-btn').forEach(button => {
      button.setAttribute('aria-pressed', button.dataset.lang === lang ? 'true' : 'false');
    });
    window.dispatchEvent(new CustomEvent('cloudpath:language', { detail: { lang } }));
  };

  languageSwitcher.querySelectorAll('.lang-btn').forEach(button => {
    button.setAttribute('aria-label', `Переключить язык: ${button.textContent.trim()}`);
    button.addEventListener('click', () => window.setLang(button.dataset.lang));
  });

  let savedLanguage = 'ru';
  try { savedLanguage = localStorage.getItem('cloudpath-language') || 'ru'; } catch (_) {}
  window.setLang(savedLanguage);

  const main = document.querySelector('.main');
  if (main) {
    main.id ||= 'main-content';
    main.tabIndex = -1;
  }

  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.type = 'button';
  button.setAttribute('aria-label', 'Наверх');
  button.textContent = '↑';
  document.body.append(button);
  const syncButton = () => button.classList.toggle('visible', window.scrollY > 600);
  window.addEventListener('scroll', syncButton, { passive: true });
  syncButton();
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(() => {}));
  }
})();
