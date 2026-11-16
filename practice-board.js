/* Local vector sketchpad; coordinates use a stable logical page size. */
(() => {
 const W=1200,H=720,states=new WeakMap();
 const validStroke=s=>s&&['pen','eraser'].includes(s.tool)&&/^#[0-9a-f]{6}$/i.test(s.color)&&Number.isFinite(s.width)&&s.width>0&&s.width<=80&&Array.isArray(s.points)&&s.points.length&&s.points.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite));
 window.CloudPathBoard={
 markup:()=>`<details class="solution-board"><summary>✎ Доска для решения</summary><div class="board-body"><div class="board-tools" role="group" aria-label="Инструменты доски"><button type="button" data-board="pen" aria-pressed="true">Ручка</button><button type="button" data-board="eraser" aria-pressed="false">Ластик</button><label>Цвет <input class="board-color" type="color" value="#243449" aria-label="Цвет ручки"></label><label>Толщина <input class="board-width" type="range" min="1" max="16" value="3" aria-label="Толщина линии"></label><button type="button" data-board="undo" disabled aria-label="Отменить действие">↶ Отменить</button><button type="button" data-board="redo" disabled aria-label="Повторить действие">↷ Повторить</button><button type="button" data-board="clear">Очистить</button></div><p class="board-hint">Пиши мышью, пальцем или пером. Ластик стирает линии; очистку можно отменить.</p><div class="board-paper"><canvas width="1200" height="720" aria-label="Доска для рукописного решения" role="img">Для рисования нужен браузер с поддержкой canvas.</canvas></div><p class="board-status" role="status">Рисунок сохраняется вместе с задачей в этом браузере.</p></div></details>`,
 mount(root,entry,onSave){
  if(states.has(root))return;
  const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d');
  if(!ctx){root.querySelector('.board-status').textContent='Этот браузер не поддерживает рисование.';return;}
  let strokes=Array.isArray(entry.board)?entry.board.filter(validStroke):[],redo=[],undo=[],active=null,pointer=null;
  const status=root.querySelector('.board-status'),toolButtons=[...root.querySelectorAll('[data-board="pen"],[data-board="eraser"]')];
  const state={tool:'pen'};states.set(root,state);
  function draw(s){ctx.save();ctx.globalCompositeOperation=s.tool==='eraser'?'destination-out':'source-over';ctx.strokeStyle=s.color;ctx.fillStyle=s.color;ctx.lineWidth=s.width;ctx.lineCap='round';ctx.lineJoin='round';const [p,...rest]=s.points;if(!rest.length){ctx.beginPath();ctx.arc(p[0],p[1],s.width/2,0,Math.PI*2);ctx.fill();}else{ctx.beginPath();ctx.moveTo(...p);for(const q of rest)ctx.lineTo(...q);ctx.stroke();}ctx.restore();}
  function paint(){ctx.clearRect(0,0,W,H);strokes.forEach(draw);if(active)draw(active);}
  function controls(){root.querySelector('[data-board="undo"]').disabled=!undo.length;root.querySelector('[data-board="redo"]').disabled=!redo.length;root.querySelector('[data-board="clear"]').disabled=!strokes.length;}
  function save(){entry.board=strokes;const ok=onSave();status.textContent=ok?'Рисунок сохранён в этом браузере.':'Не удалось сохранить рисунок: память браузера заполнена или недоступна. Не закрывай страницу.';controls();}
  function snapshot(){undo.push(strokes.slice());if(undo.length>60)undo.shift();redo=[];}
  function point(e){const r=canvas.getBoundingClientRect();return [Math.max(0,Math.min(W,(e.clientX-r.left)*W/r.width)),Math.max(0,Math.min(H,(e.clientY-r.top)*H/r.height))];}
  canvas.addEventListener('pointerdown',e=>{if(pointer!==null||e.button!==0)return;e.preventDefault();pointer=e.pointerId;canvas.setPointerCapture(pointer);active={tool:state.tool,color:root.querySelector('.board-color').value,width:Number(root.querySelector('.board-width').value)*(state.tool==='eraser'?5:1),points:[point(e)]};paint();});
  canvas.addEventListener('pointermove',e=>{if(e.pointerId!==pointer||!active)return;e.preventDefault();const samples=e.getCoalescedEvents?.()||[e];for(const p of samples.length?samples:[e])active.points.push(point(p));paint();});
  function finish(e){if(e.pointerId!==pointer||!active)return;snapshot();strokes=[...strokes,active];active=null;const id=pointer;pointer=null;if(canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);paint();save();}
  canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);canvas.addEventListener('lostpointercapture',finish);
  root.addEventListener('click',e=>{const btn=e.target.closest('[data-board]');if(!btn||active)return;const action=btn.dataset.board;
   if(action==='pen'||action==='eraser'){state.tool=action;toolButtons.forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));canvas.classList.toggle('erasing',action==='eraser');return;}
   if(action==='undo'&&undo.length){redo.push(strokes.slice());strokes=undo.pop();}
   else if(action==='redo'&&redo.length){undo.push(strokes.slice());strokes=redo.pop();}
   else if(action==='clear'&&strokes.length){snapshot();strokes=[];}
   else return;paint();save();
  });
  root.querySelector('.board-color').addEventListener('input',()=>{state.tool='pen';toolButtons.forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.board==='pen')));canvas.classList.remove('erasing');});
  // Persisted strokes can also be undone after reopening a task.
  if(strokes.length)undo.push(strokes.slice(0,-1));paint();controls();
 }
 };
})();
