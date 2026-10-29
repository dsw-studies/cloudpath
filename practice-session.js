/* Generated workspace: separate versioned storage preserves earlier progress. */
(() => {
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const T=(q,a,w)=>({q,a,w});
function mathTask(id){
 const k=rnd(1,24), b=rnd(2,7), n=rnd(3,9), c=rnd(1,12);
 const rows={
 'vieta-sums':()=>T(`Для x²−${k+b}x+${k*b}=0 найди сумму, произведение и знаки корней.`,`S=${k+b}; P=${k*b}; корни ${k} и ${b}, оба положительны.`,`По Виету S=−B/A, P=C/A. Разложение: (x−${k})(x−${b})=0.`),
 'vieta-expressions':()=>T(`Не находя корней x²−${k+b}x+${k*b}=0, найди x₁²+x₂² и (x₁−x₂)².`,`${k*k+b*b}; ${(k-b)**2}`,`S=${k+b}, P=${k*b}. Используй S²−2P и S²−4P.`),
 'quadratic-parameter':()=>T(`При каких c уравнение x²−${2*k}x+c=0 имеет два различных действительных корня?`,`c<${k*k}`,`Δ=${4*k*k}−4c>0. Равенство даёт один двойной корень.`),
 'biquadratic':()=>T(`Реши x⁴+${k+1}x²−${k*(2*k+1)}=0.`,`x=±√${k}`,`t=x²≥0: (t−${k})(t+${2*k+1})=0. Отрицательное t отбрасываем.`),
 'poly-grouping':()=>T(`Реши x³−${k}x²+${b}x−${b*k}≤0.`,`x≤${k}`,`Группировка даёт (x−${k})(x²+${b})≤0. Второй множитель положителен.`),
 'horner-practice':()=>T(`Разложи W(x)=x³−${k}x²+${b}x−${b*k} методом Горнера; найди действительные корни.`,`W=(x−${k})(x²+${b}); x=${k}`,`Делим на x−${k}. Нижняя строка: 1, 0, ${b}, остаток 0. x²+${b}>0.`),
 'rational-domain':()=>T(`Найди область определения и нули f(x)=(x²−${k*k})/(x−${k}).`,`D=ℝ∖{${k}}; нуль x=−${k}`,`f(x)=x+${k} при x≠${k}. Сокращение не возвращает исключённую точку.`),
 'hyperbola-practice':()=>T(`Для f(x)=${k}+${b}/(x+1) найди асимптоты, область и нуль.`,`x=−1; y=${k}; D=ℝ∖{−1}; нуль x=−1−${b}/${k}`,`Знаменатель задаёт вертикальную асимптоту. Для нуля: ${k}(x+1)+${b}=0.`),
 'fraction-division':()=>T(`Упрости (x²−${k*k})/(x+${k}) ÷ (x−${k})/(x+${k+1}), укажи область.`,`x+${k+1}; x∉{−${k+1},−${k},${k}}`,`Исключаем нули знаменателей и числителя делителя. Разность квадратов сокращается после умножения на обратную дробь.`),
 'rational-signs':()=>T(`Реши ((x+${k})(x−${k+2}))/(x−1)≤0.`,`(−∞,−${k}]∪(1,${k+2}]`,`Точки: −${k}, 1, ${k+2}. Знаки слева направо: −,+,−,+; знаменатель не равен нулю.`),
 'absolute-fractions':()=>T(`Реши ${k+1}/|x−${k}|>1.`,`(−1,${k})∪(${k},${2*k+1})`,`0<|x−${k}|<${k+1}. Центр и обе границы исключаем.`),
 'logs-basic':()=>T(`Вычисли log₂(1/${2**k}).`,`${-k}`,`1/${2**k}=2^(−${k}). Логарифм — показатель степени.`),
 'logs-rules':()=>T(`Вычисли log₂(${c})+log₂(${2**(b+1)})−log₂(${2*c}).`,`${b}`,`Объединяем в log₂((${c}·${2**(b+1)})/${2*c})=log₂(${2**b})=${b}.`),
 'logs-base':()=>T(`Представь log с основанием ${2**b} от ${3**b} через основание 2.`,`log₂3`,`log₂(3^${b})/log₂(2^${b})=${b}log₂3/${b}=log₂3.`),
 'logs-equations':()=>T(`Реши log с основанием (x+${k}) от ${(k+b)**2}, равный 2.`,`x=${b}`,`Основание положительно и не равно 1. (x+${k})²=${(k+b)**2}; допустима только положительная ветвь x+${k}=${k+b}.`),
 'exp-equations':()=>T(`Реши 4^(x+1)=2^(x+${k+2}).`,`x=${k}`,`4=2², значит 2x+2=x+${k+2}.`),
 'exp-substitution':()=>T(`Реши 9^x+3^x=${k*k+k}.`,`x=log₃${k}`,`t=3^x>0: (t−${k})(t+${k+1})=0, допустим t=${k}.`),
 'sequence-monotonic':()=>T(`Докажи монотонность aₙ=n²+${k}n+${b}, n≥1.`,`Строго возрастает.`,`aₙ₊₁−aₙ=2n+${k+1}>0 для всех n≥1.`),
 'arithmetic-term':()=>T(`a₁=${k}, разность d=${b}, n=${n}. Найди aₙ и Sₙ.`,`aₙ=${k+(n-1)*b}; Sₙ=${n*(2*k+(n-1)*b)/2}`,`aₙ=a₁+(n−1)d; Sₙ=n(a₁+aₙ)/2.`),
 'arithmetic-recover':()=>T(`Арифметическая прогрессия: a₂=${k+b}, a₅=${k+4*b}. Найди d, a₁, aₙ.`,`d=${b}; a₁=${k}; aₙ=${k}+${b}(n−1)`,`d=(a₅−a₂)/3=${b}, a₁=a₂−d.`),
 'geometric-finite':()=>T(`Геометрическая прогрессия: a₁=${k}, q=2. Найди a₅ и S₅.`,`a₅=${16*k}; S₅=${31*k}`,`a₅=a₁·2⁴; S₅=a₁(2⁵−1)/(2−1). Для конечной суммы |q|<1 не требуется.`),
 'limits-rational':()=>T(`Найди предел (${k}n²+3n+1)/(${b}n²+n+4) при n→∞.`,`${k}/${b}`,`Делим на n². Члены 1/n и 1/n² стремятся к нулю.`),
 'limits-degrees':()=>T(`Найди пределы (${k}n²+1)/(n³+2) и (${k}n³+1)/(2−n²) при n→∞.`,`0; −∞`,`Старшие члены дают ${k}/n→0 и −${k}n→−∞.`),
 'series-convergence':()=>T(`Для каких x сходится ряд 1+${k}x+(${k}x)²+…? Найди сумму.`,`|x|<1/${k}; S=1/(1−${k}x)`,`q=${k}x; геометрический ряд сходится только при |q|<1.`),
 'series-equations':()=>T(`Реши 1+x/${k+1}+(x/${k+1})²+…=${b}.`,`x=${(k+1)*(b-1)}/${b}`,`При |x/${k+1}|<1 сумма 1/(1−x/${k+1})=${b}. q=${b-1}/${b} удовлетворяет сходимости.`)
 };return rows[id]?.();
}
window.CloudPathPracticeSession=({current,bank,topics,topicNav,progress,esc})=>{
 const data=bank[current.id]||[],key=`cloudpath-generated-v1-${current.id}`;
 let saved=[],storageOK=true;
 try{const raw=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(raw))saved=raw.filter(x=>x&&typeof x.id==='string'&&Number.isInteger(x.ti)&&data[x.ti]&&x.item&&['q','a','w'].every(k=>typeof x.item[k]==='string'));}catch{storageOK=false;}
 const topicId=(t,i)=>t.id||`type-${i+1}`;
 function persist(){try{localStorage.setItem(key,JSON.stringify(saved));storageOK=true;}catch{storageOK=false;}stats();}
 function stats(){progress.textContent=`${data.length} типов · создано ${saved.length} · решено ${saved.filter(x=>x.done).length}`+(storageOK?' · сохранено в этом браузере':' · не удалось сохранить: данные доступны до закрытия страницы');}
 topicNav.innerHTML=data.map((t,i)=>`<a class="pill" href="#${topicId(t,i)}">${i+1}. ${esc(t.title)}</a>`).join('');
 topics.innerHTML=data.map((t,i)=>`<details class="topic" id="${topicId(t,i)}"><summary><span class="topic-number">${String(i+1).padStart(2,'0')}</span><span>${esc(t.title)}</span></summary><div class="topic-body">${t.lesson?`<a class="back" href="${esc(t.lesson)}.html">Открыть конспект ↗</a>`:''}<section class="generator" data-topic-index="${i}"><div><span class="eyebrow">Личная практика</span><h3>Новая попытка — новая задача</h3><p class="muted">Создавай задачи в своём темпе. Ответ и разбор можно раскрыть после решения.</p></div><button class="generate" type="button">＋ Создать задачу</button><p class="gen-feedback" role="status"></p><div class="generated" aria-live="polite"></div></section></div></details>`).join('');
 function render(ti){const out=topics.querySelector(`[data-topic-index="${ti}"] .generated`);out.innerHTML=saved.filter(x=>x.ti===ti).map(x=>`<article class="exercise ${x.done?'is-done':''}" data-entry="${x.id}"><div class="exercise-head"><span class="task-state">${x.done?'✓ Решена':'● В работе'}</span><div class="task-actions"><label><input class="session-done" type="checkbox" ${x.done?'checked':''}> Решил(а)</label><button class="delete-task" type="button" aria-label="Удалить эту задачу">Удалить</button></div></div><h3>${x.item.html?x.item.q:esc(x.item.q)}</h3><details class="answer"><summary>Ответ и разбор</summary><p><b>Ответ:</b> ${x.item.html?x.item.a:esc(x.item.a)}</p><div>${x.item.html?x.item.w:esc(x.item.w)}</div></details></article>`).join('')||'<p class="empty-session">Здесь появятся твои задачи. Нажми «Создать задачу».</p>';}
 const seen=new Map();
 topics.addEventListener('click',e=>{
  const del=e.target.closest('.delete-task');if(del){const ti=Number(del.closest('.generator').dataset.topicIndex);saved=saved.filter(x=>x.id!==del.closest('[data-entry]').dataset.entry);persist();render(ti);topics.querySelector(`[data-topic-index="${ti}"] .generate`).focus();return;}
  const btn=e.target.closest('.generate');if(!btn)return;
  const panel=btn.closest('.generator'),ti=Number(panel.dataset.topicIndex),t=data[ti];
  let item=mathTask(t.id);
  if(!item){item=window.CLOUDPATH_EXTRA_GENERATOR?.make(current.id,t.title,'medium')||window.CLOUDPATH_GENERATORS?.make(current.id,t.title,'medium');
   if(!item||/Сгенерированная задача по теме|Ответ зависит|Зависит от формулировки|Сравни число строк|по русскому алфавиту/.test(item.q+' '+item.a)){
    const used=seen.get(ti)||new Set(),pool=t.items.map((x,i)=>({x,i})).filter(({i})=>!used.has(i));if(!pool.length){used.clear();pool.push(...t.items.map((x,i)=>({x,i})));}const pick=pool[rnd(0,pool.length-1)];used.add(pick.i);seen.set(ti,used);item={...pick.x,html:true};
   }
  }
  if(saved.some(x=>x.ti===ti&&x.item.q===item.q)){panel.querySelector('.gen-feedback').textContent='Такой вариант уже есть в твоих задачах. Нажми ещё раз для другого варианта.';return;}
  panel.querySelector('.gen-feedback').textContent='Задача добавлена.';
  saved.unshift({id:(globalThis.crypto?.randomUUID?.()||`task-${Date.now()}-${Math.random().toString(36).slice(2)}`),ti,item,done:false});persist();render(ti);
 });
 topics.addEventListener('change',e=>{if(!e.target.matches('.session-done'))return;const card=e.target.closest('[data-entry]'),entry=saved.find(x=>x.id===card.dataset.entry);if(!entry)return;entry.done=e.target.checked;card.classList.toggle('is-done',entry.done);card.querySelector('.task-state').textContent=entry.done?'✓ Решена':'● В работе';persist();});
 function linked(){const raw=location.hash.slice(1),match=raw.match(/^type-(\d+)$/),target=document.getElementById(raw)||(match&&data[+match[1]-1]?document.getElementById(topicId(data[+match[1]-1],+match[1]-1)):null);if(target?.classList.contains('topic')){target.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}}
 data.forEach((_,i)=>render(i));stats();linked();window.addEventListener('hashchange',linked);
};
})();
