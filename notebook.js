(() => {
  const KEY = 'cloudpath-notes-v1';
  const subjects = [
    ['analysis','∑','Analiza matematyczna I'],['algebra','A','Algebra liniowa'],['python','</>','Programowanie w języku Python'],
    ['algorithms','{}','Algorytmy i struktury danych'],['physics','φ','Fizyka'],['intro','01','Podstawy informatyki'],
    ['ethics','§','Etyka inżyniera i prawo autorskie'],['other','·','Inne']
  ];
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  let notes = load(); let editingId = null; let filterSubject = 'all';

  function load(){try{return JSON.parse(localStorage.getItem(KEY)) || []}catch{return []}}
  function save(){localStorage.setItem(KEY, JSON.stringify(notes))}
  function esc(v=''){return v.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  function formatDate(s){if(!s)return ''; const d=new Date(s+'T12:00:00'); return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'short',year:'numeric'})}
  function subjectName(id){return subjects.find(s=>s[0]===id)?.[2] || 'Inne'}
  function subjectIcon(id){return subjects.find(s=>s[0]===id)?.[1] || '·'}
  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
  function today(){return new Date().toISOString().slice(0,10)}
  function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)}

  function seedIfEmpty(){
    if(notes.length) return;
    notes=[{id:uid(),title:'Организация учёбы',subject:'other',date:today(),tags:['важное'],content:'CloudPath теперь работает как мой учебный блокнот.\n\nЗдесь будут конспекты с лекций, формулы, код и материалы к экзаменам.',updated:Date.now()}];
    save();
  }

  function render(){
    const q=$('#search').value.trim().toLowerCase();
    const filtered=notes.filter(n => (filterSubject==='all'||n.subject===filterSubject) && (!q || [n.title,n.content,n.tags?.join(' '),subjectName(n.subject)].join(' ').toLowerCase().includes(q))).sort((a,b)=>(b.date||'').localeCompare(a.date||'') || (b.updated||0)-(a.updated||0));
    $('#noteCount').textContent=notes.length;
    $('#subjectCount').textContent=new Set(notes.map(n=>n.subject)).size;
    $('#recentCount').textContent=notes.filter(n=>Date.now()-(n.updated||0)<7*864e5).length;
    $('#notesLabel').textContent=filterSubject==='all'?'Последние конспекты':subjectName(filterSubject);

    $('#subjects').innerHTML=subjects.map(([id,icon,name])=>{
      const count=notes.filter(n=>n.subject===id).length;
      return `<article class="subject" data-subject="${id}"><div class="icon">${esc(icon)}</div><h3>${esc(name)}</h3><p>Лекции, упражнения и материалы</p><div class="count">${count} ${plural(count,'конспект','конспекта','конспектов')}</div></article>`
    }).join('');
    $$('#subjects .subject').forEach(el=>el.onclick=()=>{filterSubject=el.dataset.subject;render();$('#notesSection').scrollIntoView({behavior:'smooth'})});

    const box=$('#notes');
    if(!filtered.length){box.innerHTML='<div class="empty">Ничего не найдено. Создай первый конспект или измени поиск.</div>';return}
    box.innerHTML=filtered.map(n=>`<article class="note" data-id="${n.id}"><div class="note-date">${formatDate(n.date)}</div><div><h3>${esc(n.title)}</h3><p>${esc((n.content||'').replace(/\n+/g,' ').slice(0,150))}</p></div><div class="tags"><span class="tag">${esc(subjectIcon(n.subject))} ${esc(subjectName(n.subject))}</span>${(n.tags||[]).slice(0,2).map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}</div></article>`).join('');
    $$('#notes .note').forEach(el=>el.onclick=()=>openEditor(el.dataset.id));
  }
  function plural(n,a,b,c){const m=n%100;if(m>=11&&m<=14)return c;switch(n%10){case 1:return a;case 2:case 3:case 4:return b;default:return c}}

  function openEditor(id=null){
    editingId=id; const n=id?notes.find(x=>x.id===id):null;
    $('#editorTitle').textContent=n?'Редактировать конспект':'Новый конспект';
    $('#noteTitle').value=n?.title||''; $('#noteSubject').value=n?.subject||'python'; $('#noteDate').value=n?.date||today();
    $('#noteTags').value=(n?.tags||[]).join(', '); $('#noteContent').value=n?.content||''; $('#deleteBtn').classList.toggle('hidden',!n);
    $('#modal').classList.add('open'); document.body.style.overflow='hidden'; setTimeout(()=>$('#noteTitle').focus(),50);
  }
  function closeEditor(){ $('#modal').classList.remove('open'); document.body.style.overflow=''; editingId=null }
  function persistEditor(){
    const title=$('#noteTitle').value.trim(); if(!title){toast('Добавь название');$('#noteTitle').focus();return}
    const obj={id:editingId||uid(),title,subject:$('#noteSubject').value,date:$('#noteDate').value||today(),tags:$('#noteTags').value.split(',').map(x=>x.trim().replace(/^#/,'')).filter(Boolean),content:$('#noteContent').value,updated:Date.now()};
    if(editingId) notes=notes.map(n=>n.id===editingId?obj:n); else notes.unshift(obj); save(); closeEditor(); render(); toast('Конспект сохранён');
  }
  function exportNotes(){const blob=new Blob([JSON.stringify({version:1,exported:new Date().toISOString(),notes},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`cloudpath-notes-${today()}.json`;a.click();URL.revokeObjectURL(a.href)}
  function importNotes(file){const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);const incoming=Array.isArray(data)?data:data.notes;if(!Array.isArray(incoming))throw 0;notes=incoming;save();render();toast('Конспекты импортированы')}catch{toast('Не удалось прочитать файл')}};r.readAsText(file)}

  document.addEventListener('DOMContentLoaded',()=>{
    seedIfEmpty(); $('#today').textContent=new Date().toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'});
    $('#noteSubject').innerHTML=subjects.map(([id,icon,name])=>`<option value="${id}">${icon} ${name}</option>`).join('');
    $('#newNote').onclick=()=>openEditor(); $('#newNoteSide').onclick=()=>openEditor(); $('#closeEditor').onclick=closeEditor; $('#cancelBtn').onclick=closeEditor; $('#saveBtn').onclick=persistEditor;
    $('#deleteBtn').onclick=()=>{if(editingId&&confirm('Удалить этот конспект?')){notes=notes.filter(n=>n.id!==editingId);save();closeEditor();render();toast('Конспект удалён')}};
    $('#search').addEventListener('input',render); $('#allNotes').onclick=()=>{filterSubject='all';render();$('#notesSection').scrollIntoView({behavior:'smooth'})};
    $('#exportBtn').onclick=exportNotes; $('#importBtn').onclick=()=>$('#importFile').click(); $('#importFile').onchange=e=>e.target.files[0]&&importNotes(e.target.files[0]);
    $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeEditor()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#modal').classList.contains('open'))closeEditor();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'&&$('#modal').classList.contains('open')){e.preventDefault();persistEditor()}});
    render();
  });
})();
