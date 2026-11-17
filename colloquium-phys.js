/* Пробный коллоквиум по физике (листы 1–2): собирается из генераторов practice-sheets.js. */
(() => {
  const L1 = ['sheet-ph-prefix', 'sheet-ph-vector-ab', 'sheet-ph-two-cars', 'sheet-ph-train', 'sheet-ph-horizontal', 'sheet-ph-range-planets', 'sheet-ph-trajectory', 'sheet-ph-kinematics'];
  const L2 = ['sheet-ph-friction', 'sheet-ph-incline', 'sheet-ph-table-hanging', 'sheet-ph-tied-bodies'];
  const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
  const esc = t => String(t == null ? '' : t);
  const app = document.getElementById('app');
  const DUR = 2700;
  let timer = null, left = DUR;
  const tick = () => { const el = document.getElementById('clock'); if (!el) return; el.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`; el.classList.toggle('low', left <= 300); };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  function build() {
    stop(); left = DUR;
    const gens = window.CloudPathSheetGens || {};
    const d = parseInt(document.getElementById('lvl').value, 10) || 2;
    const ids = [...shuffle(L1.filter(i => gens[i])).slice(0, 2), ...shuffle(L2.filter(i => gens[i])).slice(0, 2)];
    const tasks = ids.map(i => gens[i](d));
    const id = Math.random().toString(36).slice(2, 6).toUpperCase();
    app.innerHTML = `<div class="cbar"><div><b>Вариант ${id}</b> · 45 минут · 20 баллов</div><div class="clock" id="clock">45:00</div>
<div><button class="button primary" id="bStart" type="button">Старт таймера</button> <button class="button" id="bStop" type="button">Пауза</button> <button class="button" id="bNew" type="button">Новый вариант</button></div></div>
${tasks.map((t, i) => `<section class="lesson-card"><span class="lesson-number">ZADANIE ${i + 1} · 5 pkt · лист ${i < 2 ? 1 : 2}</span><p>${esc(t.q)}</p><textarea rows="4" placeholder="Решай на бумаге, потом сверяйся…"></textarea><div><button class="button primary sh" data-i="${i}" type="button">Показать решение</button></div><div class="sol" id="sol${i}" hidden><p><b>Ответ:</b> ${esc(t.a)}</p><p>${esc(t.w)}</p></div></section>`).join('')}`;
    tick();
    app.querySelector('#bStart').onclick = () => { if (left <= 0) left = DUR; stop(); timer = setInterval(() => { left--; tick(); if (left <= 0) stop(); }, 1000); };
    app.querySelector('#bStop').onclick = stop;
    app.querySelector('#bNew').onclick = build;
    app.querySelectorAll('.sh').forEach(b => b.onclick = () => { app.querySelector('#sol' + b.dataset.i).hidden = false; });
  }
  window.__physColl = { build };
  document.getElementById('bGen').addEventListener('click', () => { build(); window.scrollTo({ top: app.offsetTop - 80, behavior: 'smooth' }); });
})();
