(() => {
  const LANGS = ['ru','pl','en'];
  const T = {
    'builtin-python-full-v2': {
      title:['Python — полный конспект с нуля','Python — pełne notatki od zera','Python — complete notes from scratch'],
      summary:['От переменных и if до функций, коллекций, файлов, JSON и классов.','Od zmiennych i if po funkcje, kolekcje, pliki, JSON i klasy.','From variables and if statements to functions, collections, files, JSON and classes.'],
      topics:[
        ['Переменные','Zmienne','Variables'],['if / elif / else','if / elif / else','if / elif / else'],['for / while','for / while','for / while'],['Функции','Funkcje','Functions'],['list / dict / set','list / dict / set','list / dict / set']
      ]
    },
    'builtin-data-structures-v2': {
      title:['Структуры данных — полный базовый конспект','Struktury danych — pełne podstawy','Data structures — complete basics'],
      summary:['Как хранить данные и какую структуру выбирать под разные операции.','Jak przechowywać dane i dobierać strukturę do różnych operacji.','How to store data and choose a structure for different operations.'],
      topics:[
        ['Big O','Big O','Big O'],['Array / list','Array / list','Array / list'],['Stack','Stack','Stack'],['Queue','Queue','Queue'],['Hash table','Hash table','Hash table']
      ]
    },
    'builtin-vectors-v2': {
      title:['Векторы — с нуля: формулы и примеры','Wektory od zera — wzory i przykłady','Vectors from scratch — formulas and examples'],
      summary:['Стрелка, координаты, длина, сложение, скалярное произведение и угол.','Strzałka, współrzędne, długość, dodawanie, iloczyn skalarny i kąt.','Arrow, coordinates, length, addition, dot product and angle.'],
      topics:[
        ['Координаты','Współrzędne','Coordinates'],['Длина','Długość','Length'],['Сложение','Dodawanie','Addition'],['Умножение','Mnożenie','Multiplication'],['Скалярное произведение','Iloczyn skalarny','Dot product']
      ]
    }
  };

  const UI = {
    open:['Открыть →','Otwórz →','Open →'],
    all:['Все предметы','Wszystkie przedmioty','All subjects'],
    orgTitle:['Организация учёбы','Organizacja nauki','Study organization'],
    orgText:[
      'CloudPath теперь работает как мой учебный блокнот. Здесь будут конспекты с лекций, формулы, код и материалы к экзаменам.',
      'CloudPath działa teraz jako mój notatnik do nauki. Będą tu notatki z wykładów, wzory, kod i materiały do egzaminów.',
      'CloudPath now works as my study notebook. It will contain lecture notes, formulas, code and exam materials.'
    ],
    dates:{
      '03 окт. 2026 г.':['03 окт. 2026 г.','03 paź 2026','Oct 3, 2026'],
      '30 сент. 2026 г.':['30 сент. 2026 г.','30 wrz 2026','Sep 30, 2026']
    }
  };

  const idx = lang => Math.max(0, LANGS.indexOf(lang));
  const pick = (arr, lang) => arr[idx(lang)] || arr[0];
  const current = () => {
    const html = document.documentElement.lang;
    if (LANGS.includes(html)) return html;
    try { const s = localStorage.getItem('cloudpath-language'); if (LANGS.includes(s)) return s; } catch (_) {}
    return 'ru';
  };

  function applyCard(card, lang){
    const id = card.dataset.id;
    const cfg = T[id];
    if (cfg) {
      const h = card.querySelector('h3'); if (h) h.textContent = pick(cfg.title, lang);
      const p = card.querySelector('.visual-main p'); if (p) p.textContent = pick(cfg.summary, lang);
      const row = card.querySelector('.topic-row');
      if (row) row.innerHTML = cfg.topics.map(t => `<span class="topic-chip">${pick(t,lang)}</span>`).join('');
      const open = card.querySelector('.open-pill'); if (open) open.textContent = pick(UI.open, lang);
    } else {
      const h = card.querySelector('h3');
      if (h && ['Организация учёбы','Organizacja nauki','Study organization'].includes(h.textContent.trim())) h.textContent = pick(UI.orgTitle,lang);
      const p = card.querySelector('p');
      if (p && (p.textContent.includes('CloudPath теперь') || p.textContent.includes('CloudPath działa') || p.textContent.includes('CloudPath now works'))) p.textContent = pick(UI.orgText,lang);
    }

    const date = card.querySelector('.note-date');
    if (date) {
      const key = Object.keys(UI.dates).find(k => UI.dates[k].includes(date.textContent.trim()));
      if (key) date.textContent = pick(UI.dates[key],lang);
    }
  }

  function apply(lang=current()){
    document.querySelectorAll('#notesList .note-card').forEach(card => applyCard(card,lang));
    const filter = document.getElementById('subjectFilter');
    if (filter && filter.options.length) filter.options[0].textContent = pick(UI.all,lang);

    const tag = [...document.querySelectorAll('.tag')].find(el => ['Inne','Другое','Other'].some(x => el.textContent.includes(x)));
    if (tag) tag.textContent = lang==='pl' ? '· Inne' : lang==='en' ? '· Other' : '· Другое';

    document.querySelectorAll('.topic-row').forEach(row => {
      row.style.display='flex'; row.style.gap='6px'; row.style.flexWrap='wrap';
      row.querySelectorAll('.topic-chip').forEach(chip => {
        chip.style.display='inline-flex'; chip.style.alignItems='center';
      });
    });
  }

  function boot(){
    apply();
    const host=document.getElementById('notesList');
    if(host){
      new MutationObserver(()=>apply()).observe(host,{childList:true,subtree:true});
    }
    const filter=document.getElementById('subjectFilter');
    if(filter) new MutationObserver(()=>apply()).observe(filter,{childList:true});
  }

  window.addEventListener('cloudpath:language', e => apply(e.detail?.lang || current()));
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
