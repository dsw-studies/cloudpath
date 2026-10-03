(() => {
  const KEY='cloudpath-notes-v2';
  const subjects=[
    ['analysis','∑','Analiza matematyczna I'],['algebra','A','Algebra liniowa z geometrią analityczną'],['python','</>','Programowanie w języku Python 1'],['algorithms','{}','Algorytmy i struktury danych'],['physics','φ','Fizyka 1'],['intro','01','Podstawy informatyki'],['ethics','§','Etyka inżyniera i prawo autorskie'],['future','↗','Kompetencje przyszłości I'],['other','·','Inne']
  ];
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  let notes=load(), editingId=null;

  function load(){for(const k of [KEY,'cloudpath-notes-v1']){try{const x=JSON.parse(localStorage.getItem(k));if(Array.isArray(x)&&x.length)return x}catch{}}return []}
  function save(){localStorage.setItem(KEY,JSON.stringify(notes))}
  function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
  function today(){return new Date().toISOString().slice(0,10)}
  function formatDate(s){if(!s)return'';return new Date(s+'T12:00:00').toLocaleDateString('ru-RU',{day:'2-digit',month:'short',year:'numeric'})}
  function subjectName(id){return subjects.find(s=>s[0]===id)?.[2]||'Inne'}
  function subjectIcon(id){return subjects.find(s=>s[0]===id)?.[1]||'·'}
  function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1500)}

  const builtins=[
    {
      id:'builtin-python-full-v2',builtin:true,icon:'🐍',title:'Python — полный конспект с нуля',subject:'python',date:'2026-10-03',tags:['python','база','шпаргалка'],updated:Date.now(),
      summary:'От переменных и if до функций, коллекций, файлов, JSON и классов.',
      topics:['Переменные','if / elif / else','for / while','Функции','list / dict / set','Файлы','Ошибки','ООП'],
      content:'Python: переменные, типы, ввод/вывод, операторы, условия, строки, списки, tuple, set, dict, циклы, функции, comprehensions, исключения, файлы, модули, JSON, классы, сортировка, распаковка, генераторы.',
      visual:[
        {icon:'①',title:'Переменные и типы',text:'Переменная — имя для значения. Главные типы первого семестра:',chips:['int · 10','float · 3.14','str · "text"','bool · True','None'],code:'x = 10\nname = "Herman"\nok = True\nprint(type(x))'},
        {icon:'②',title:'Условия',text:'Код выбирает ветку по условию. После if / elif / else ставится двоеточие, тело идёт с отступом.',code:'if age >= 18:\n    print("18+")\nelif age >= 16:\n    print("16+")\nelse:\n    print("младше")'},
        {icon:'③',title:'Циклы',text:'for — когда перебираем элементы или диапазон. while — пока условие истинно.',code:'for i in range(5):\n    print(i)\n\nx = 0\nwhile x < 5:\n    x += 1'},
        {icon:'④',title:'Функции',text:'Функция упаковывает повторяемую логику. return возвращает результат.',code:'def add(a, b):\n    return a + b\n\nresult = add(2, 3)'},
        {icon:'⑤',title:'Коллекции',text:'Выбирай структуру под задачу.',grid:[['list','[1, 2, 3]','порядок + индексы'],['tuple','(1, 2)','фиксированные данные'],['set','{1, 2}','уникальность'],['dict','{"name":"Herman"}','ключ → значение']]},
        {icon:'⑥',title:'Файлы и ошибки',text:'with сам закрывает файл; try/except позволяет обработать ошибку без падения программы.',code:'try:\n    with open("data.txt", encoding="utf-8") as f:\n        text = f.read()\nexcept FileNotFoundError:\n    print("Файл не найден")'},
        {icon:'⑦',title:'Классы',text:'Класс — шаблон объектов. __init__ задаёт начальное состояние, self — текущий объект.',code:'class Student:\n    def __init__(self, name):\n        self.name = name\n\nstudent = Student("Herman")'},
        {icon:'✓',title:'Что выучить первым',text:'Переменные → условия → циклы → функции → строки → list/dict/set → файлы → исключения.',accent:true}
      ]
    },
    {
      id:'builtin-data-structures-v2',builtin:true,icon:'🧱',title:'Структуры данных — полный базовый конспект',subject:'algorithms',date:'2026-10-03',tags:['структуры данных','алгоритмы','Big O'],updated:Date.now(),
      summary:'Как хранить данные и какую структуру выбирать под разные операции.',
      topics:['Big O','Array / list','Stack','Queue','Hash table','Tree','Heap','Graph'],
      content:'Структуры данных: Big O, массивы, связные списки, стек, очередь, deque, set, dict, дерево, BST, heap, граф, DFS, BFS, trie, DSU.',
      visual:[
        {icon:'⏱',title:'Big O — скорость роста',text:'Это не секунды, а то, как растёт число операций при увеличении n.',scale:[['O(1)','очень быстро'],['O(log n)','быстро'],['O(n)','линейно'],['O(n log n)','нормально для сортировки'],['O(n²)','становится тяжело']]},
        {icon:'▦',title:'Массив / Python list',text:'Быстрый доступ по индексу, но вставка в середину требует сдвига.',grid:[['arr[i]','O(1)','доступ'],['append','≈ O(1)','в конец'],['x in arr','O(n)','поиск'],['insert','O(n)','середина']]},
        {icon:'⇩',title:'Stack — стек',text:'LIFO: последний вошёл — первый вышел.',diagram:['A','B','C','↓ pop C'],code:'stack = []\nstack.append("A")\nstack.append("B")\nstack.pop()'},
        {icon:'→',title:'Queue — очередь',text:'FIFO: первый вошёл — первый вышел.',diagram:['A','B','C','→ выходит A'],code:'from collections import deque\nq = deque()\nq.append("A")\nq.popleft()'},
        {icon:'#',title:'Hash table / dict / set',text:'Хеш даёт быстрый доступ по ключу. В среднем поиск, добавление и удаление — O(1).',code:'user = {"name": "Herman", "age": 19}\nprint(user["name"])\n\nseen = {1, 2, 3}\nprint(2 in seen)'},
        {icon:'🌳',title:'Дерево',text:'Иерархия: root → children → leaves.',tree:['root','├─ left','│  ├─ leaf','│  └─ leaf','└─ right']},
        {icon:'△',title:'Heap',text:'Структура для быстрого минимума/максимума. push/pop — O(log n).',code:'import heapq\nh = []\nheapq.heappush(h, 5)\nheapq.heappush(h, 2)\nprint(heapq.heappop(h))  # 2'},
        {icon:'◉',title:'Граф',text:'Вершины + рёбра. BFS идёт слоями, DFS — в глубину.',diagram:['A → B','A → C','B → D','C → D'],chips:['BFS = очередь','DFS = стек / рекурсия']},
        {icon:'✓',title:'Как выбирать',grid:[['Нужен индекс','list',''],['Уникальность','set',''],['Ключ → значение','dict',''],['LIFO','stack',''],['FIFO','deque',''],['Минимум','heap',''],['Иерархия','tree',''],['Связи','graph','']],accent:true}
      ]
    },
    {
      id:'builtin-vectors-v2',builtin:true,icon:'↗',title:'Векторы — с нуля: формулы и примеры',subject:'algebra',date:'2026-10-03',tags:['векторы','алгебра','формулы'],updated:Date.now(),
      summary:'Стрелка, координаты, длина, сложение, скалярное произведение и угол.',
      topics:['Координаты','Длина','Сложение','Умножение','Скалярное произведение','Угол','Базис'],
      content:'Векторы: координаты, длина, нулевой вектор, сложение, вычитание, умножение на число, AB, единичный вектор, скалярное произведение, угол, перпендикулярность, параллельность, базис, проекция.',
      visual:[
        {icon:'↗',title:'Вектор = стрелка',text:'У вектора есть длина, kierunek (направление) и zwrot (куда именно по этому направлению).',vector:{x:3,y:4,label:'a = (3, 4)'}},
        {icon:'📐',title:'Длина вектора',text:'Это обычный Пифагор.',formula:'|a| = √(x² + y²)',example:'a = (3,4) → |a| = √(9+16) = 5'},
        {icon:'＋',title:'Сложение',formula:'(x₁,y₁) + (x₂,y₂) = (x₁+x₂, y₁+y₂)',example:'(2,1) + (3,4) = (5,5)',vectorPair:true},
        {icon:'×',title:'Умножение на число',formula:'k(x,y) = (kx, ky)',example:'2(3,4) = (6,8)   ·   −(3,4) = (−3,−4)'},
        {icon:'AB',title:'Вектор между точками',formula:'AB = (x₂−x₁, y₂−y₁)',example:'A=(1,2), B=(5,5) → AB=(4,3)'},
        {icon:'•',title:'Скалярное произведение',formula:'a·b = x₁x₂ + y₁y₂',example:'(1,2)·(2,−1) = 2−2 = 0'},
        {icon:'90°',title:'Перпендикулярность',text:'Если ненулевые векторы дают a·b = 0, они перпендикулярны.',formula:'a·b = 0  ⇒  a ⟂ b'},
        {icon:'θ',title:'Угол между векторами',formula:'cos θ = (a·b) / (|a||b|)',text:'Сначала считаем скалярное произведение и длины, потом берём arccos.'},
        {icon:'e',title:'Базис',text:'Стандартный базис плоскости состоит из двух единичных направлений.',chips:['e₁ = (1,0)','e₂ = (0,1)','(x,y)=x·e₁+y·e₂']},
        {icon:'✓',title:'Минимум на сейчас',text:'Уметь: читать координаты → находить длину → складывать/вычитать → умножать на число → считать a·b → проверять перпендикулярность.',accent:true}
      ]
    }
  ];

  function ensureBuiltins(){
    const byId=new Map(notes.map(n=>[n.id,n]));
    builtins.forEach(b=>{const old=byId.get(b.id);if(old)Object.assign(old,b);else notes.unshift({...b})});
    save();
  }

  function previewTopics(n){return (n.topics||[]).slice(0,5).map(t=>`<span class="topic-chip">${esc(t)}</span>`).join('')}
  function renderNotes(){
    const q=$('#search').value.trim().toLowerCase(), f=$('#subjectFilter').value;
    const filtered=notes.filter(n=>(f==='all'||n.subject===f)&&(!q||[n.title,n.content,(n.tags||[]).join(' '),subjectName(n.subject),(n.topics||[]).join(' ')].join(' ').toLowerCase().includes(q))).sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.updated||0)-(a.updated||0));
    $('#noteCount').textContent=notes.length; $('#subjectCount').textContent=new Set(notes.map(n=>n.subject)).size; $('#recentCount').textContent=notes.filter(n=>Date.now()-(n.updated||0)<7*864e5).length;
    $('#notesList').innerHTML=filtered.length?filtered.map(n=>n.builtin?`<article class="note-card visual-card" data-id="${esc(n.id)}"><div class="visual-icon">${esc(n.icon||'📘')}</div><div class="visual-main"><div class="note-date">${formatDate(n.date)}</div><h3>${esc(n.title)}</h3><p>${esc(n.summary||n.content||'')}</p><div class="topic-row">${previewTopics(n)}</div></div><div class="open-pill">Открыть →</div></article>`:`<article class="note-card" data-id="${esc(n.id)}"><div class="note-date">${formatDate(n.date)}</div><div><h3>${esc(n.title)}</h3><p>${esc((n.content||'').replace(/\n+/g,' ').slice(0,180))}</p></div><div class="tags"><span class="tag">${esc(subjectIcon(n.subject))} ${esc(subjectName(n.subject))}</span>${(n.tags||[]).slice(0,2).map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}</div></article>`).join(''):'<div class="empty">Пока нет конспектов. Нажми «Новый конспект» и создай первую запись.</div>';
    $$('.note-card').forEach(el=>el.onclick=()=>{const n=notes.find(x=>x.id===el.dataset.id);n?.builtin?openReader(n):openEditor(el.dataset.id)});
  }

  function visualSection(s){
    const chips=s.chips?`<div class="visual-chips">${s.chips.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:'';
    const formula=s.formula?`<div class="formula-box">${esc(s.formula)}</div>`:'';
    const example=s.example?`<div class="example-box"><b>Пример</b>${esc(s.example)}</div>`:'';
    const code=s.code?`<pre class="code-box"><code>${esc(s.code)}</code></pre>`:'';
    const grid=s.grid?`<div class="mini-grid">${s.grid.map(r=>`<div>${r.map((c,i)=>`<span class="g${i}">${esc(c)}</span>`).join('')}</div>`).join('')}</div>`:'';
    const scale=s.scale?`<div class="complexity-scale">${s.scale.map((r,i)=>`<div><b>${esc(r[0])}</b><span>${esc(r[1])}</span><i style="--w:${20+i*17}%"></i></div>`).join('')}</div>`:'';
    const diagram=s.diagram?`<div class="diagram-row">${s.diagram.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:'';
    const tree=s.tree?`<pre class="tree-box">${esc(s.tree.join('\n'))}</pre>`:'';
    const vector=s.vector?`<div class="vector-demo"><svg viewBox="0 0 260 150" aria-label="Вектор ${esc(s.vector.label)}"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z"/></marker></defs><line x1="28" y1="122" x2="230" y2="122" class="axis"/><line x1="28" y1="122" x2="28" y2="20" class="axis"/><line x1="28" y1="122" x2="180" y2="42" class="vline" marker-end="url(#arrow)"/><text x="184" y="36">${esc(s.vector.label)}</text></svg></div>`:'';
    const pair=s.vectorPair?`<div class="vector-pair"><span>(2,1)</span><b>+</b><span>(3,4)</span><b>=</b><span>(5,5)</span></div>`:'';
    return `<section class="lesson-block ${s.accent?'accent-block':''}"><div class="lesson-num">${esc(s.icon||'•')}</div><div class="lesson-content"><h3>${esc(s.title)}</h3>${s.text?`<p>${esc(s.text)}</p>`:''}${chips}${formula}${example}${code}${grid}${scale}${diagram}${tree}${vector}${pair}</div></section>`;
  }

  function ensureReader(){
    if($('#readerModal'))return;
    document.body.insertAdjacentHTML('beforeend',`<div class="modal" id="readerModal" aria-hidden="true"><article class="reader"><header class="reader-head"><div><span id="readerSubject"></span><h2 id="readerTitle"></h2></div><button class="button small" id="closeReader" type="button">✕</button></header><div class="reader-body" id="readerBody"></div></article></div>`);
    $('#closeReader').onclick=closeReader; $('#readerModal').onclick=e=>{if(e.target.id==='readerModal')closeReader()};
  }
  function openReader(n){ensureReader();$('#readerSubject').textContent=subjectName(n.subject);$('#readerTitle').textContent=n.title;$('#readerBody').innerHTML=`<div class="reader-intro"><div class="reader-bigicon">${esc(n.icon||'📘')}</div><div><p>${esc(n.summary||'')}</p><div class="topic-row">${previewTopics(n)}</div></div></div>${(n.visual||[]).map(visualSection).join('')}`;$('#readerModal').classList.add('open');$('#readerModal').setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
  function closeReader(){const m=$('#readerModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}

  function openEditor(id=null){editingId=id;const n=id?notes.find(x=>x.id===id):null;$('#editorTitle').textContent=n?'Редактировать конспект':'Новый конспект';$('#noteTitle').value=n?.title||'';$('#noteDate').value=n?.date||today();$('#noteSubject').value=n?.subject||'algorithms';$('#noteTags').value=(n?.tags||[]).join(', ');$('#noteContent').value=n?.content||'';$('#deleteBtn').hidden=!n;$('#modal').classList.add('open');$('#modal').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>$('#noteTitle').focus(),30)}
  function closeEditor(){$('#modal').classList.remove('open');$('#modal').setAttribute('aria-hidden','true');document.body.style.overflow='';editingId=null}
  function persist(){const title=$('#noteTitle').value.trim();if(!title){toast('Добавь название');return}const obj={id:editingId||uid(),title,date:$('#noteDate').value||today(),subject:$('#noteSubject').value,tags:$('#noteTags').value.split(',').map(x=>x.trim().replace(/^#/,'')).filter(Boolean),content:$('#noteContent').value,updated:Date.now()};notes=editingId?notes.map(n=>n.id===editingId?obj:n):[obj,...notes];save();closeEditor();renderNotes();toast('Конспект сохранён')}
  function exportNotes(){const blob=new Blob([JSON.stringify({version:2,exported:new Date().toISOString(),notes},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`cloudpath-notes-${today()}.json`;a.click();URL.revokeObjectURL(a.href)}
  function importNotes(file){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);const x=Array.isArray(d)?d:d.notes;if(!Array.isArray(x))throw 0;notes=x;ensureBuiltins();save();renderNotes();toast('Конспекты импортированы')}catch{toast('Не удалось прочитать файл')}};r.readAsText(file)}

  document.addEventListener('DOMContentLoaded',()=>{
    ensureBuiltins();
    $('#subjectFilter').innerHTML='<option value="all">Все предметы</option>'+subjects.map(([id,,name])=>`<option value="${id}">${esc(name)}</option>`).join('');
    $('#noteSubject').innerHTML=subjects.map(([id,icon,name])=>`<option value="${id}">${esc(icon)} ${esc(name)}</option>`).join('');
    $('#newNote').onclick=()=>openEditor();$('#closeEditor').onclick=closeEditor;$('#cancelBtn').onclick=closeEditor;$('#saveBtn').onclick=persist;
    $('#deleteBtn').onclick=()=>{if(editingId&&confirm('Удалить этот конспект?')){notes=notes.filter(n=>n.id!==editingId);save();closeEditor();renderNotes();toast('Удалено')}};
    $('#search').addEventListener('input',renderNotes);$('#subjectFilter').addEventListener('change',renderNotes);
    $('#exportBtn').onclick=exportNotes;$('#importBtn').onclick=()=>$('#importFile').click();$('#importFile').onchange=e=>e.target.files[0]&&importNotes(e.target.files[0]);
    $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeEditor()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeEditor();closeReader()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'&&$('#modal').classList.contains('open')){e.preventDefault();persist()}});
    renderNotes();
  });
})();