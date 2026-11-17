/* Перевод авторского содержимого страниц (PL/EN). Данные: i18n/<страница>.json.
   Режим 1 (ключи): {pl:{ключ:html}, en:{...}} — ключи: id карточки, а также h1, lead, notice, links.
   Режим 2 (блоки):  {blocks:{pl:{ключ-текста:html}, en:{...}}} — блоки находятся автоматически (абзацы, пункты, ячейки, заголовки). */
(function () {
  const page = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
  const originals = {};
  const blockOrig = new Map();
  let data = null, loading = null;

  const INLINE = new Set(['A', 'B', 'I', 'EM', 'STRONG', 'SPAN', 'CODE', 'SUB', 'SUP', 'BR', 'SMALL', 'MARK', 'KBD', 'U', 'ABBR', 'S', 'WBR', 'Q', 'CITE', 'DFN', 'VAR', 'SAMP', 'TIME', 'DEL', 'INS', 'BDI']);
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'PRE', 'SVG', 'CANVAS', 'IFRAME', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'OPTION', 'NAV', 'FOOTER', 'MJX-CONTAINER']);
  function inlineOnly(el) {
    for (const c of el.children) {
      const t = c.tagName;
      if (t.startsWith('MJX-')) continue;
      if (!INLINE.has(t) || c.hasAttribute('data-i18n-ru') || !inlineOnly(c)) return false;
    }
    return true;
  }
  function blockKey(el) {
    const c = el.cloneNode(true);
    c.querySelectorAll('mjx-container,script,style').forEach(n => n.remove());
    return (c.textContent || '').replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function rootOf(doc) {
    return doc.querySelector('main.main, div.main, main') || doc.body;
  }
  function findBlocks(root) {
    const out = [];
    (function walk(el) {
      if (SKIP.has(el.tagName) || el.hasAttribute('data-i18n-ru') || el.hasAttribute('data-no-translate')) return;
      if (el.querySelector('[data-i18n-ru]') === null && inlineOnly(el)) {
        const k = blockKey(el);
        if (/\p{L}/u.test(k)) out.push({ el, key: k });
        return;
      }
      for (const c of el.children) walk(c);
    })(root);
    return out;
  }
  window.CloudpathBlocks = { findBlocks, rootOf };

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
    // режим блоков
    if (data && data.blocks) {
      const bm = data.blocks[lang] || null;
      if (blockOrig.size === 0) {
        findBlocks(rootOf(document)).forEach(b => blockOrig.set(b.el, { html: b.el.innerHTML, key: b.key }));
      }
      blockOrig.forEach((o, el) => {
        if (!el.isConnected) return;
        const html = bm && bm[o.key] ? bm[o.key] : o.html;
        if (el.innerHTML !== html) { el.innerHTML = html; changed.push(el); }
      });
    }
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
    if (lang === 'ru' && !data && !loading) return;
    load().then(() => apply(lang));
  }
  window.addEventListener('cloudpath:language', e => run(e.detail.lang));
  run(current());
})();
