/* Перевод авторского содержимого страниц (PL/EN). Данные: i18n/<страница>.json = {pl:{ключ:html}, en:{...}}.
   Ключи: id карточки .lesson-card, а также h1, lead (первый <p> в header), notice, links (.quick-links). */
(function () {
  const page = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
  const originals = {};
  let data = null, loading = null;
  function target(key) {
    if (key === 'h1') return document.querySelector('h1');
    if (key === 'lead') return document.querySelector('header p');
    if (key === 'notice') return document.querySelector('.wrap .notice');
    if (key === 'links') return document.querySelector('.quick-links');
    return document.getElementById(key);
  }
  function typeset(nodes) {
    try { if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise(nodes).catch(() => {}); } catch (_) {}
  }
  function apply(lang) {
    const map = (data && data[lang]) || null;
    const changed = [];
    const keys = new Set(Object.keys(originals));
    if (data) ['pl', 'en'].forEach(l => Object.keys(data[l] || {}).forEach(k => keys.add(k)));
    keys.forEach(k => {
      const el = target(k);
      if (!el) return;
      if (!(k in originals)) originals[k] = el.innerHTML;
      const html = map && map[k] ? map[k] : originals[k];
      if (el.innerHTML !== html) { el.innerHTML = html; changed.push(el); }
    });
    if (changed.length) typeset(changed);
  }
  function current() {
    try { const s = localStorage.getItem('cloudpath-language'); if (s === 'pl' || s === 'en') return s; } catch (_) {}
    return 'ru';
  }
  function load() {
    if (!loading) {
      loading = fetch('i18n/' + page + '.json').then(r => r.ok ? r.json() : null).catch(() => null).then(j => { data = j; });
    }
    return loading;
  }
  function run(lang) {
    if (lang === 'ru' && !data) return;
    load().then(() => apply(lang));
  }
  window.addEventListener('cloudpath:language', e => run(e.detail.lang));
  run(current());
})();
