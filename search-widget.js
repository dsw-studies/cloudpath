/* CloudPath — общий поиск по сайту (Ctrl+K / Cmd+K)
   Работает на всех 16 страницах: читает window.SITE_SEARCH_INDEX (search-data.js),
   ищет по заголовкам/терминам/сниппетам, переходит на нужную страницу и якорь,
   подсвечивает найденный элемент и раскрывает аккордеон, если он был свёрнут. */
(function(){

  var CURRENT_PAGE = (location.pathname.split('/').pop() || 'index.html');

  var KIND_LABEL = {
    page: 'Страница', section: 'Раздел', sub: 'Подраздел',
    term: 'Термин глоссария', item: 'Пункт', row: 'Предмет'
  };
  var KIND_ICON = {
    page: '📄', section: '📚', sub: '▸', term: '📖', item: '☑️', row: '🎓'
  };

  /* ---------- styles ---------- */
  var style = document.createElement('style');
  style.textContent = [
    '#siteSearchOverlay{position:fixed;inset:0;background:rgba(5,9,15,.72);',
    'backdrop-filter:blur(2px);z-index:9999;display:none;align-items:flex-start;',
    'justify-content:center;padding:10vh 16px 16px;font-family:var(--sans, -apple-system,sans-serif);}',
    '#siteSearchOverlay.open{display:flex;}',
    '#siteSearchBox{width:100%;max-width:620px;background:var(--panel,#111D2C);',
    'border:1px solid var(--line,#223349);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.5);',
    'overflow:hidden;max-height:74vh;display:flex;flex-direction:column;}',
    '#siteSearchInputRow{display:flex;align-items:center;gap:10px;padding:14px 16px;',
    'border-bottom:1px solid var(--line,#223349);flex:none;}',
    '#siteSearchInputRow svg{flex:none;opacity:.6;}',
    '#siteSearchInput{flex:1;background:transparent;border:none;outline:none;',
    'color:var(--text,#E7ECF2);font-size:15.5px;font-family:inherit;}',
    '#siteSearchInput::placeholder{color:var(--muted,#7E92A8);}',
    '#siteSearchEsc{font-family:var(--mono,monospace);font-size:11px;color:var(--muted,#7E92A8);',
    'border:1px solid var(--line,#223349);border-radius:5px;padding:2px 6px;flex:none;}',
    '#siteSearchResults{overflow-y:auto;padding:6px;}',
    '.ss-empty{padding:28px 16px;text-align:center;color:var(--muted,#7E92A8);font-size:13.5px;}',
    '.ss-group{font-family:var(--mono,monospace);font-size:10.5px;text-transform:uppercase;',
    'letter-spacing:.06em;color:var(--muted,#7E92A8);padding:10px 10px 4px;}',
    '.ss-item{display:flex;align-items:flex-start;gap:10px;padding:9px 10px;border-radius:9px;',
    'cursor:pointer;}',
    '.ss-item .ic{flex:none;font-size:14px;margin-top:1px;opacity:.85;}',
    '.ss-item .body{min-width:0;flex:1;}',
    '.ss-item .ttl{font-size:13.5px;color:var(--text,#E7ECF2);font-weight:600;',
    'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
    '.ss-item .ttl mark{background:var(--accent,#4FD8C4);color:#062622;border-radius:3px;padding:0 1px;}',
    '.ss-item .snip{font-size:12px;color:var(--muted,#7E92A8);',
    'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:1px;}',
    '.ss-item .pg{flex:none;font-family:var(--mono,monospace);font-size:10.5px;color:var(--muted,#7E92A8);',
    'border:1px solid var(--line,#223349);border-radius:20px;padding:2px 8px;margin-top:1px;}',
    '.ss-item:hover, .ss-item.active{background:var(--panel-2,#16243570);}',
    '.ss-item.active{outline:1px solid var(--accent-dim,#2A5A54);}',
    '#siteSearchFoot{display:flex;gap:14px;padding:8px 14px;border-top:1px solid var(--line,#223349);',
    'font-family:var(--mono,monospace);font-size:10.5px;color:var(--muted,#7E92A8);flex:none;}',
    '#siteSearchFoot span{display:flex;align-items:center;gap:5px;}',
    '#siteSearchFoot kbd{border:1px solid var(--line,#223349);border-radius:4px;padding:1px 5px;}',
    '.ss-trigger{display:flex;align-items:center;justify-content:space-between;gap:8px;',
    'width:100%;background:var(--panel-2,#16243570);border:1px solid var(--line,#223349);',
    'color:var(--muted,#7E92A8);font-size:12.5px;border-radius:8px;padding:7px 10px;',
    'margin-bottom:16px;cursor:pointer;font-family:var(--sans,sans-serif);}',
    '.ss-trigger:hover{border-color:var(--accent-dim,#2A5A54);color:var(--text,#E7ECF2);}',
    '.ss-trigger kbd{font-family:var(--mono,monospace);border:1px solid var(--line,#223349);',
    'border-radius:4px;padding:1px 5px;font-size:10.5px;}',
    '@keyframes ssHighlight{0%{background:rgba(79,216,196,.35);}100%{background:transparent;}}',
    '.ss-highlight{animation:ssHighlight 2.2s ease-out;border-radius:8px;}'
  ].join('');
  document.head.appendChild(style);

  /* ---------- trigger button in sidebar ---------- */
  function addTriggerButton(){
    var toc = document.querySelector('nav.toc');
    if(!toc) return;
    var btn = document.createElement('div');
    btn.className = 'ss-trigger';
    btn.innerHTML = '<span>🔎 Поиск по сайту</span><kbd>Ctrl K</kbd>';
    btn.addEventListener('click', openSearch);
    var brand = toc.querySelector('.brand');
    if(brand && brand.nextSibling){
      toc.insertBefore(btn, brand.nextSibling);
    } else {
      toc.appendChild(btn);
    }
  }

  /* ---------- modal DOM ---------- */
  var overlay, input, resultsEl;
  function buildModal(){
    overlay = document.createElement('div');
    overlay.id = 'siteSearchOverlay';
    overlay.innerHTML =
      '<div id="siteSearchBox">' +
        '<div id="siteSearchInputRow">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
          '<input id="siteSearchInput" type="text" placeholder="Искать по всем 16 страницам… (глоссарий, синтаксис, семестры)" autocomplete="off" spellcheck="false">' +
          '<span id="siteSearchEsc">ESC</span>' +
        '</div>' +
        '<div id="siteSearchResults"></div>' +
        '<div id="siteSearchFoot"><span><kbd>↑↓</kbd> навигация</span><span><kbd>Enter</kbd> перейти</span><span><kbd>Esc</kbd> закрыть</span></div>' +
      '</div>';
    document.body.appendChild(overlay);
    input = overlay.querySelector('#siteSearchInput');
    resultsEl = overlay.querySelector('#siteSearchResults');

    overlay.addEventListener('mousedown', function(e){ if(e.target === overlay) closeSearch(); });
    input.addEventListener('input', function(){ render(input.value); });
    input.addEventListener('keydown', onInputKey);
  }

  var activeIndex = -1;
  var currentResults = [];

  function esc(s){
    return (s || '').replace(/[&<>"]/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
    });
  }
  function markMatch(text, q){
    var t = esc(text);
    if(!q) return t;
    var idx = t.toLowerCase().indexOf(q.toLowerCase());
    if(idx === -1) return t;
    return t.slice(0, idx) + '<mark>' + t.slice(idx, idx + q.length) + '</mark>' + t.slice(idx + q.length);
  }

  function score(entry, q){
    var t = entry.t.toLowerCase(), s = (entry.s || '').toLowerCase();
    if(t === q) return 100;
    if(t.indexOf(q) === 0) return 80;
    if(t.indexOf(q) !== -1) return 60;
    if(s.indexOf(q) !== -1) return 30;
    return 0;
  }

  function search(query){
    var q = query.trim().toLowerCase();
    if(!q) return [];
    var data = window.SITE_SEARCH_INDEX || [];
    var out = [];
    for(var i = 0; i < data.length; i++){
      var e = data[i];
      var sc = score(e, q);
      if(sc > 0) out.push({e: e, sc: sc});
    }
    out.sort(function(a, b){ return b.sc - a.sc; });
    return out.slice(0, 40).map(function(o){ return o.e; });
  }

  function pageTitle(p){
    var pages = window.SITE_PAGES || [];
    for(var i = 0; i < pages.length; i++) if(pages[i].p === p) return pages[i].t;
    return p;
  }

  function render(query){
    currentResults = search(query);
    activeIndex = currentResults.length ? 0 : -1;
    if(!query.trim()){
      resultsEl.innerHTML = '<div class="ss-empty">Начни печатать: например «kubernetes», «docker», «python», «ects», «стипенд»…</div>';
      return;
    }
    if(!currentResults.length){
      resultsEl.innerHTML = '<div class="ss-empty">Ничего не найдено по запросу «' + esc(query) + '»</div>';
      return;
    }
    var q = query.trim();
    var html = '';
    var lastPage = null;
    currentResults.forEach(function(e, i){
      if(e.p !== lastPage){
        html += '<div class="ss-group">' + esc(pageTitle(e.p)) + '</div>';
        lastPage = e.p;
      }
      html += '<div class="ss-item' + (i === activeIndex ? ' active' : '') + '" data-i="' + i + '">' +
        '<span class="ic">' + (KIND_ICON[e.k] || '•') + '</span>' +
        '<span class="body">' +
          '<div class="ttl">' + markMatch(e.t, q) + '</div>' +
          (e.s ? '<div class="snip">' + esc(e.s) + '</div>' : '') +
        '</span>' +
        '<span class="pg">' + esc(KIND_LABEL[e.k] || '') + '</span>' +
      '</div>';
    });
    resultsEl.innerHTML = html;
    resultsEl.querySelectorAll('.ss-item').forEach(function(el){
      el.addEventListener('click', function(){
        goTo(currentResults[parseInt(el.getAttribute('data-i'), 10)]);
      });
    });
  }

  function setActive(i){
    var items = resultsEl.querySelectorAll('.ss-item');
    if(!items.length) return;
    activeIndex = (i + items.length) % items.length;
    items.forEach(function(el){ el.classList.remove('active'); });
    var el = items[activeIndex];
    el.classList.add('active');
    el.scrollIntoView({block: 'nearest'});
  }

  function onInputKey(e){
    if(e.key === 'ArrowDown'){ e.preventDefault(); setActive(activeIndex + 1); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); setActive(activeIndex - 1); }
    else if(e.key === 'Enter'){
      e.preventDefault();
      if(currentResults[activeIndex]) goTo(currentResults[activeIndex]);
    } else if(e.key === 'Escape'){ closeSearch(); }
  }

  function goTo(entry){
    var target = entry.p + (entry.a ? '#' + entry.a : '');
    closeSearch();
    if(entry.p === CURRENT_PAGE){
      revealAndHighlight(entry.a);
      if(entry.a) history.replaceState(null, '', '#' + entry.a);
    } else {
      location.href = target;
    }
  }

  function revealAndHighlight(anchorId){
    if(!anchorId) { window.scrollTo({top:0, behavior:'smooth'}); return; }
    var el = document.getElementById(anchorId);
    if(!el) return;
    var stage = el.closest && el.closest('.stage');
    if(stage) stage.classList.add('open');
    el.scrollIntoView({behavior: 'smooth', block: 'center'});
    el.classList.add('ss-highlight');
    setTimeout(function(){ el.classList.remove('ss-highlight'); }, 2200);
  }

  function openSearch(){
    if(!overlay) buildModal();
    overlay.classList.add('open');
    input.value = '';
    render('');
    setTimeout(function(){ input.focus(); }, 10);
  }
  function closeSearch(){
    if(overlay) overlay.classList.remove('open');
  }

  document.addEventListener('keydown', function(e){
    var k = e.key.toLowerCase();
    if((e.metaKey || e.ctrlKey) && k === 'k'){
      e.preventDefault();
      if(overlay && overlay.classList.contains('open')) closeSearch();
      else openSearch();
    } else if(k === 'escape' && overlay && overlay.classList.contains('open')){
      closeSearch();
    }
  });

  window.openSiteSearch = openSearch;

  document.addEventListener('DOMContentLoaded', function(){
    addTriggerButton();
    if(location.hash){
      var raw = location.hash.slice(1);
      var id = raw;
      try { id = decodeURIComponent(raw); } catch(e){ id = raw; }
      setTimeout(function(){ revealAndHighlight(id); }, 150);
    }
  });
})();
