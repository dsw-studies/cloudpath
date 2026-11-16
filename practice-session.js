/* Generated workspace: separate versioned storage preserves earlier progress. */
(() => {
window.CloudPathPracticeSession=({current,bank,topics,topicNav,progress,esc})=>{
 const data=bank[current.id]||[],key=`cloudpath-generated-v1-${current.id}`;
 let saved=[],storageOK=true;
 try{const raw=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(raw))saved=raw.filter(x=>x&&typeof x.id==='string'&&Number.isInteger(x.ti)&&data[x.ti]&&x.item&&['q','a','w'].every(k=>typeof x.item[k]==='string'));}catch{storageOK=false;}
 const topicId=(t,i)=>t.id||`type-${i+1}`;
 function persist(){try{localStorage.setItem(key,JSON.stringify(saved));storageOK=true;}catch{storageOK=false;}stats();return storageOK;}
 function stats(){progress.textContent=`${data.length} типов · создано ${saved.length} · решено ${saved.filter(x=>x.done).length}`+(storageOK?' · сохранено в этом браузере':' · не удалось сохранить: данные доступны до закрытия страницы');}
 topicNav.innerHTML=data.map((t,i)=>`<a class="pill" href="#${topicId(t,i)}">${i+1}. ${esc(t.title)}</a>`).join('');
 topics.innerHTML=data.map((t,i)=>`<details class="topic" id="${topicId(t,i)}"><summary><span class="topic-number">${String(i+1).padStart(2,'0')}</span><span>${esc(t.title)}</span></summary><div class="topic-body">${t.lesson?`<a class="back" href="${esc(t.lesson)}.html">Открыть конспект ↗</a>`:''}<section class="generator" data-topic-index="${i}"><div><span class="eyebrow">Личная практика</span><h3>Новая попытка — новая задача</h3><p class="muted">Создавай задачи в своём темпе. Ответ и разбор можно раскрыть после решения.</p></div><label class="difficulty-control">Сложность<select class="gen-level" aria-label="Сложность задачи"><option value="basic">Лёгкая</option><option value="medium">Средняя</option><option value="hard">Сложная</option></select></label><button class="generate" type="button">＋ Создать задачу</button><p class="gen-feedback" role="status"></p><div class="generated" aria-live="polite"></div></section></div></details>`).join('');
 function render(ti){const out=topics.querySelector(`[data-topic-index="${ti}"] .generated`);out.innerHTML=saved.filter(x=>x.ti===ti).map(x=>`<article class="exercise ${x.done?'is-done':''}" data-entry="${x.id}"><div class="exercise-head"><span class="task-state">${x.done?'✓ Решена':'● В работе'}</span>${x.level?`<span class="level-badge">${{basic:'Лёгкая',medium:'Средняя',hard:'Сложная'}[x.level]||''}</span>`:''}<div class="task-actions"><label><input class="session-done" type="checkbox" ${x.done?'checked':''}> Решил(а)</label><button class="delete-task" type="button" aria-label="Удалить эту задачу">Удалить</button></div></div><h3>${x.item.html?x.item.q:esc(x.item.q)}</h3>${window.CloudPathBoard.markup()}<details class="answer"><summary>Ответ и разбор</summary><p><b>Ответ:</b> ${x.item.html?x.item.a:esc(x.item.a)}</p><div>${x.item.html?x.item.w:esc(x.item.w)}</div></details></article>`).join('')||'<p class="empty-session">Здесь появятся твои задачи. Нажми «Создать задачу».</p>';}
 topics.addEventListener('toggle',e=>{if(!e.target.matches('.solution-board')||!e.target.open)return;const entry=saved.find(x=>x.id===e.target.closest('[data-entry]').dataset.entry);if(entry)window.CloudPathBoard.mount(e.target,entry,persist);},true);

 topics.addEventListener('click',e=>{
  const del=e.target.closest('.delete-task');if(del){const ti=Number(del.closest('.generator').dataset.topicIndex);saved=saved.filter(x=>x.id!==del.closest('[data-entry]').dataset.entry);persist();render(ti);topics.querySelector(`[data-topic-index="${ti}"] .generate`).focus();return;}
  const btn=e.target.closest('.generate');if(!btn)return;
  const panel=btn.closest('.generator'),ti=Number(panel.dataset.topicIndex),t=data[ti];
  const level=panel.querySelector('.gen-level').value;
  let item;
  // Retry collisions internally; never make the learner manage random collisions.
  const used=new Set(saved.filter(x=>x.ti===ti).map(x=>x.item.q));
  try {for(let attempt=0;attempt<80;attempt++){
    item=window.CloudPathRandom.make(current.id,t,level);
    if(!used.has(item.q))break;
  }} catch(err){panel.querySelector('.gen-feedback').textContent='Не удалось создать задачу этого типа. Попробуй ещё раз.';console.error(err);return;}
  panel.querySelector('.gen-feedback').textContent='Задача добавлена.';
  saved.unshift({id:(globalThis.crypto?.randomUUID?.()||`task-${Date.now()}-${Math.random().toString(36).slice(2)}`),ti,item,level,done:false});persist();render(ti);
 });
 topics.addEventListener('change',e=>{if(!e.target.matches('.session-done'))return;const card=e.target.closest('[data-entry]'),entry=saved.find(x=>x.id===card.dataset.entry);if(!entry)return;entry.done=e.target.checked;card.classList.toggle('is-done',entry.done);card.querySelector('.task-state').textContent=entry.done?'✓ Решена':'● В работе';persist();});
 function linked(){const raw=location.hash.slice(1),match=raw.match(/^type-(\d+)$/),target=document.getElementById(raw)||(match&&data[+match[1]-1]?document.getElementById(topicId(data[+match[1]-1],+match[1]-1)):null);if(target?.classList.contains('topic')){target.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}}
 data.forEach((_,i)=>render(i));stats();linked();window.addEventListener('hashchange',linked);
};
})();
