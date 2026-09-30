(() => {
  const KEY='cloudpath-notes-v2';
  const subjects=[
    ['analysis','∑','Analiza matematyczna I'],['algebra','A','Algebra liniowa z geometrią analityczną'],['python','</>','Programowanie w języku Python 1'],['algorithms','{}','Algorytmy i struktury danych'],['physics','φ','Fizyka 1'],['intro','01','Podstawy informatyki'],['ethics','§','Etyka inżyniera i prawo autorskie'],['future','↗','Kompetencje przyszłości I'],['other','·','Inne']
  ];
  const schedule=[
    {date:'2026-10-01',label:'Четверг · 1 октября',items:[
      ['12:30–14:00','Algorytmy i struktury danych','Wykład','S55 111','dr Ewa Gurbiel','Egzamin'],
      ['14:15–15:45','Algorytmy i struktury danych','Wykład','S55 111','dr Ewa Gurbiel','Egzamin'],
      ['16:00–17:30','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S55 108','dr Ewa Gurbiel','Zaliczenie ocena']
    ]},
    {date:'2026-10-02',label:'Пятница · 2 октября',items:[
      ['10:45–12:15','Programowanie w języku Python 1','Wykład','S55 111','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Programowanie w języku Python 1','Wykład','S55 111','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Fizyka 1','Wykład','S55 111','mgr Artur Rokosa','Egzamin']
    ]},
    {date:'2026-10-07',label:'Среда · 7 октября',items:[
      ['10:45–12:15','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['12:30–14:00','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 216','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 216','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 212','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-10-16',label:'Пятница · 16 октября · онлайн',remote:true,items:[
      ['12:30–14:00','Algorytmy i struktury danych','Wykład','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['14:15–15:45','Fizyka 1','Wykład','Distance learning','mgr Artur Rokosa','Egzamin'],
      ['16:00–17:30','Analiza matematyczna 1','Wykład','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['17:45–19:15','Algebra liniowa z geometrią analityczną','Wykład','Distance learning','mgr Janusz Grabski','Egzamin']
    ]}
  ];
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  let notes=load(); let editingId=null;
  function load(){for(const k of [KEY,'cloudpath-notes-v1']){try{const x=JSON.parse(localStorage.getItem(k));if(Array.isArray(x)&&x.length)return x}catch{}}return []}
  function save(){localStorage.setItem(KEY,JSON.stringify(notes))}
  function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
  function today(){return new Date().toISOString().slice(0,10)}
  function formatDate(s){if(!s)return'';return new Date(s+'T12:00:00').toLocaleDateString('ru-RU',{day:'2-digit',month:'short',year:'numeric'})}
  function subjectName(id){return subjects.find(s=>s[0]===id)?.[2]||'Inne'} function subjectIcon(id){return subjects.find(s=>s[0]===id)?.[1]||'·'}
  function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1500)}

  function renderSchedule(){
    $('#scheduleList').innerHTML=schedule.map(day=>`<article class="day-card"><header class="day-head"><h3>${esc(day.label)}</h3><span>${day.remote?'Microsoft Teams / Moodle':'DSW Wrocław'}</span></header>${day.items.map(i=>`<div class="lesson ${day.remote?'remote':''}"><div class="time">${esc(i[0])}</div><div class="subject">${esc(i[1])}<small>${esc(i[5])} — это форма итоговой аттестации, не экзамен в этот день</small></div><div class="type">${esc(i[2])}</div><div class="room">${esc(i[3])}</div><div class="teacher">${esc(i[4])}</div></div>`).join('')}</article>`).join('');
  }
  function renderNotes(){
    const q=$('#search').value.trim().toLowerCase(), f=$('#subjectFilter').value;
    const filtered=notes.filter(n=>(f==='all'||n.subject===f)&&(!q||[n.title,n.content,(n.tags||[]).join(' '),subjectName(n.subject)].join(' ').toLowerCase().includes(q))).sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.updated||0)-(a.updated||0));
    $('#noteCount').textContent=notes.length; $('#subjectCount').textContent=new Set(notes.map(n=>n.subject)).size; $('#recentCount').textContent=notes.filter(n=>Date.now()-(n.updated||0)<7*864e5).length;
    $('#notesList').innerHTML=filtered.length?filtered.map(n=>`<article class="note-card" data-id="${n.id}"><div class="note-date">${formatDate(n.date)}</div><div><h3>${esc(n.title)}</h3><p>${esc((n.content||'').replace(/\n+/g,' ').slice(0,180))}</p></div><div class="tags"><span class="tag">${esc(subjectIcon(n.subject))} ${esc(subjectName(n.subject))}</span>${(n.tags||[]).slice(0,2).map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}</div></article>`).join(''):'<div class="empty">Пока нет конспектов. Нажми «Новый конспект» и создай первую запись.</div>';
    $$('.note-card').forEach(el=>el.onclick=()=>openEditor(el.dataset.id));
  }
  function openEditor(id=null){editingId=id;const n=id?notes.find(x=>x.id===id):null;$('#editorTitle').textContent=n?'Редактировать конспект':'Новый конспект';$('#noteTitle').value=n?.title||'';$('#noteDate').value=n?.date||today();$('#noteSubject').value=n?.subject||'algorithms';$('#noteTags').value=(n?.tags||[]).join(', ');$('#noteContent').value=n?.content||'';$('#deleteBtn').hidden=!n;$('#modal').classList.add('open');$('#modal').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>$('#noteTitle').focus(),30)}
  function closeEditor(){$('#modal').classList.remove('open');$('#modal').setAttribute('aria-hidden','true');document.body.style.overflow='';editingId=null}
  function persist(){const title=$('#noteTitle').value.trim();if(!title){toast('Добавь название');return}const obj={id:editingId||uid(),title,date:$('#noteDate').value||today(),subject:$('#noteSubject').value,tags:$('#noteTags').value.split(',').map(x=>x.trim().replace(/^#/,'')).filter(Boolean),content:$('#noteContent').value,updated:Date.now()};notes=editingId?notes.map(n=>n.id===editingId?obj:n):[obj,...notes];save();closeEditor();renderNotes();toast('Конспект сохранён')}
  function exportNotes(){const blob=new Blob([JSON.stringify({version:2,exported:new Date().toISOString(),notes},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`cloudpath-notes-${today()}.json`;a.click();URL.revokeObjectURL(a.href)}
  function importNotes(file){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);const x=Array.isArray(d)?d:d.notes;if(!Array.isArray(x))throw 0;notes=x;save();renderNotes();toast('Конспекты импортированы')}catch{toast('Не удалось прочитать JSON')}};r.readAsText(file)}
  document.addEventListener('DOMContentLoaded',()=>{
    renderSchedule();
    const opts=subjects.map(([id,icon,name])=>`<option value="${id}">${icon} ${name}</option>`).join('');$('#noteSubject').innerHTML=opts;$('#subjectFilter').innerHTML='<option value="all">Все предметы</option>'+opts;
    $('#newNote').onclick=()=>openEditor();$('#closeEditor').onclick=closeEditor;$('#cancelBtn').onclick=closeEditor;$('#saveBtn').onclick=persist;$('#search').oninput=renderNotes;$('#subjectFilter').onchange=renderNotes;$('#exportBtn').onclick=exportNotes;$('#importBtn').onclick=()=>$('#importFile').click();$('#importFile').onchange=e=>e.target.files[0]&&importNotes(e.target.files[0]);$('#deleteBtn').onclick=()=>{if(editingId&&confirm('Удалить этот конспект?')){notes=notes.filter(n=>n.id!==editingId);save();closeEditor();renderNotes();toast('Конспект удалён')}};$('#modal').onclick=e=>{if(e.target.id==='modal')closeEditor()};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#modal').classList.contains('open'))closeEditor();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'&&$('#modal').classList.contains('open')){e.preventDefault();persist()}});renderNotes();
  });
})();
