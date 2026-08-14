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

  // Remember the chosen language across pages and translate the browser title.
  if (typeof window.setLang === 'function') {
    const originalSetLang = window.setLang;
    window.setLang = lang => {
      originalSetLang(lang);
      try { localStorage.setItem('cloudpath-language', lang); } catch (_) {}
      const dictionaries = { pl: typeof I18N_PL !== 'undefined' ? I18N_PL : {}, en: typeof I18N_EN !== 'undefined' ? I18N_EN : {} };
      if (!document.documentElement.dataset.originalTitle) document.documentElement.dataset.originalTitle = document.title;
      document.title = lang === 'ru' ? document.documentElement.dataset.originalTitle : (dictionaries[lang][document.documentElement.dataset.originalTitle] || document.documentElement.dataset.originalTitle);
      document.querySelectorAll('.lang-btn').forEach(button => button.setAttribute('aria-pressed', button.dataset.lang === lang ? 'true' : 'false'));
      document.querySelectorAll('[data-i18n-ru]').forEach(element => {
        const text = element.dataset[`i18n${lang.charAt(0).toUpperCase()}${lang.slice(1)}`] || element.dataset.i18nRu;
        const counter = element.querySelector('.cnt');
        if (counter) {
          const value = counter.textContent;
          element.textContent = text + ' ';
          const span = document.createElement('span'); span.className = 'cnt'; span.textContent = value;
          element.append(span);
        } else element.textContent = text;
      });
    };
    let savedLanguage = 'ru';
    try { savedLanguage = localStorage.getItem('cloudpath-language') || 'ru'; } catch (_) {}
    if (['ru', 'pl', 'en'].includes(savedLanguage)) window.setLang(savedLanguage);
  }

  const languageSwitcher = document.querySelector('#langSwitcher');
  if (languageSwitcher) {
    languageSwitcher.setAttribute('role', 'group');
    languageSwitcher.setAttribute('aria-label', 'Язык страницы');
    languageSwitcher.querySelectorAll('.lang-btn').forEach(button => button.setAttribute('aria-label', `Переключить язык: ${button.textContent.trim()}`));
  }

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
