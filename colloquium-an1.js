/* Генератор пробных коллоквиумов по Analiza matematyczna I (формат: 3 задания, 15 баллов, 30 минут). */
(() => {
  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[r(0, a.length - 1)];
  const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = r(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ── Задание 1: пять утверждений P/F ── */
  const s1 = () => pick([
    ['Wyrażenie „Wrocław był stolicą Polski” jest zdaniem w sensie logiki matematycznej.', true, 'Высказывание в логике — утверждение, у которого есть значение истинности. Это утверждение ложно, но оно всё равно является высказыванием.'],
    ['Wyrażenie „x + 2 = 5” jest zdaniem w sensie logiki matematycznej.', false, 'Это функция высказывания: пока x не задан, истинность не определена.'],
    ['Wyrażenie „Czy dziś pada deszcz?” jest zdaniem w sensie logiki matematycznej.', false, 'Вопрос не имеет значения истинности.'],
    ['Wyrażenie „2 + 2 = 5” jest zdaniem w sensie logiki matematycznej.', true, 'Ложное, но однозначно имеет значение истинности, значит это высказывание.'],
    ['Wyrażenie „Zamknij drzwi!” jest zdaniem w sensie logiki matematycznej.', false, 'Приказ не имеет значения истинности.'],
    ['Wyrażenie „Dla każdego x ∈ ℝ: x² ≥ 0” jest zdaniem w sensie logiki matematycznej.', true, 'Переменная связана квантором, поэтому утверждение имеет значение истинности (истинно).'],
    ['Wyrażenie „Liczba x jest parzysta” jest zdaniem w sensie logiki matematycznej.', false, 'Зависит от свободной переменной x: это функция высказывания.']
  ]);
  const s2 = () => { const a = r(1, 5), b = r(1, 5); return pick([
    ['Wykresem funkcji zdaniowej φ(x, y): x > 0 ∧ y < 0 jest cały układ współrzędnych OXY.', false, 'Условие задаёт только IV четверть (x>0, y<0), без осей.'],
    [`Wykresem funkcji zdaniowej φ(x, y): x > ${a} ∨ y < ${b} jest cały układ współrzędnych OXY.`, false, `Точка (${a}, ${b}) не подходит (x>${a} и y<${b} оба ложны), значит не вся плоскость.`],
    ['Wykresem funkcji zdaniowej φ(x, y): x² + y² ≥ 0 jest cały układ współrzędnych OXY.', true, 'Неравенство верно при любых x и y.'],
    [`Wykresem funkcji zdaniowej φ(x, y): x > ${a} ∨ x ≤ ${a} jest cały układ współrzędnych OXY.`, true, 'Для любого x выполнено одно из двух условий.'],
    [`Wykresem funkcji zdaniowej φ(x, y): x > ${a} jest półpłaszczyzna.`, true, `Это все точки справа от прямой x=${a} (без самой прямой).`],
    [`Wykresem funkcji zdaniowej φ(x, y): x > ${a} ∧ y > ${b} jest ćwiartka płaszczyzny o wierzchołku (${a}, ${b}).`, true, 'Пересечение двух полуплоскостей — прямой угол.'],
    [`Wykresem funkcji zdaniowej φ(x, y): x > ${a} ∧ x < ${a} jest półpłaszczyzna.`, false, 'Условие противоречиво, множество пустое.']
  ]); };
  const s3 = () => {
    const ops = [['>', '≤', '<'], ['≥', '<', '≤'], ['<', '≥', '>'], ['≤', '>', '≥']], [op, neg, wrong] = pick(ops), k = pick([2, 3]), c = r(1, 4);
    return pick([
      [`Zaprzeczeniem zdania ∀x ∈ ℝ: x${k === 3 ? '³' : '²'} ${op} ${c} jest zdanie ∃x ∈ ℝ: x${k === 3 ? '³' : '²'} ${neg} ${c}.`, true, `∀ меняется на ∃, а предикат — на противоположный: отрицание «${op}» это «${neg}».`],
      [`Zaprzeczeniem zdania ∀x ∈ ℝ: x${k === 3 ? '³' : '²'} ${op} ${c} jest zdanie ∃x ∈ ℝ: x${k === 3 ? '³' : '²'} ${wrong} ${c}.`, false, `Отрицание «${op}» — это «${neg}», а не «${wrong}»: случай равенства потерян.`],
      [`Zaprzeczeniem zdania ∃x ∈ ℝ: x² < ${c} jest zdanie ∀x ∈ ℝ: x² ≥ ${c}.`, true, '∃ меняется на ∀, «<» на «≥».'],
      [`Zaprzeczeniem zdania ∃x ∈ ℝ: x² < ${c} jest zdanie ∃x ∈ ℝ: x² ≥ ${c}.`, false, 'Квантор ∃ нужно заменить на ∀.'],
      [`Zaprzeczeniem zdania ∀x ∈ ℝ ∃y ∈ ℝ: x + y = ${c} jest zdanie ∃x ∈ ℝ ∀y ∈ ℝ: x + y ≠ ${c}.`, true, 'Оба квантора меняются, равенство на неравенство.'],
      [`Zaprzeczeniem zdania ∀x ∈ ℝ ∃y ∈ ℝ: x + y = ${c} jest zdanie ∀x ∈ ℝ ∃y ∈ ℝ: x + y ≠ ${c}.`, false, 'Кванторы при отрицании тоже меняются, одного предиката недостаточно.']
    ]);
  };
  const s4 = () => { const m = r(2, 5), n = r(3, 6) + (r(0, 1) ? 0 : 0); const sum = m + n === m * n ? m + n + 1 : m + n; return pick([
    ['Iloczyn kartezjański dwóch zbiorów może być zbiorem jednoelementowym.', true, 'Например, {a}×{b}={(a,b)}.'],
    ['Iloczyn kartezjański A × B jest zawsze równy B × A.', false, 'Пары упорядочены: (a,b)≠(b,a), равенство лишь если A=B или одно множество пусто.'],
    [`Jeśli zbiór A ma ${m} elementy, a zbiór B ma ${n} elementów, to A × B ma ${m * n} elementów.`, true, `|A×B|=|A|·|B|=${m}·${n}=${m * n}.`],
    [`Jeśli zbiór A ma ${m} elementy, a zbiór B ma ${n} elementów, to A × B ma ${sum} elementów.`, false, `Число пар равно произведению ${m}·${n}=${m * n}, а не сумме.`],
    ['Dla dowolnego zbioru A prawdziwa jest równość A × ∅ = ∅.', true, 'Нет пар, у которых второй элемент из пустого множества.'],
    ['Para uporządkowana (a, b) jest równa parze (b, a) dla dowolnych a, b.', false, 'Равенство только при a=b.'],
    ['Zbiór ℝ × ℝ można utożsamiać z płaszczyzną.', true, 'Каждая точка плоскости — пара координат (x,y).']
  ]); };
  const s5 = () => {
    const c = r(1, 4);
    return pick([
      [`Dla rodziny zbiorów Fₙ = (−n, ${c} + 1/n), gdzie n ∈ ℕ₊, prawdziwa jest równość ⋃ₙ Fₙ = (−∞, ${c + 1}).`, true, `Левые концы −n уходят в −∞; правый конец ${c}+1/n наибольший при n=1 и равен ${c + 1} (не входит, т.к. скобка круглая).`],
      [`Dla rodziny zbiorów Fₙ = (−n, ${c} + 1/n), gdzie n ∈ ℕ₊, prawdziwa jest równość ⋃ₙ Fₙ = (−∞, ${c + 1}].`, false, `Число ${c + 1} не принадлежит F₁=(−1, ${c + 1}), а в остальных множествах правый конец меньше: оно не входит в объединение.`],
      [`Dla rodziny zbiorów Fₙ = (−n, ${c} + 1/n), gdzie n ∈ ℕ₊, prawdziwa jest równość ⋂ₙ Fₙ = (−1, ${c}].`, true, `x в пересечении, если x>−n для всех n (то есть x>−1) и x<${c}+1/n для всех n (то есть x≤${c}).`],
      [`Dla rodziny zbiorów Fₙ = (−n, ${c} + 1/n), gdzie n ∈ ℕ₊, prawdziwa jest równość ⋂ₙ Fₙ = (−1, ${c}).`, false, `Число ${c} лежит во всех Fₙ, так как ${c}<${c}+1/n, значит пересечение содержит ${c}.`],
      ['Dla rodziny zbiorów Fₙ = [1/n, 1], gdzie n ∈ ℕ₊, prawdziwa jest równość ⋃ₙ Fₙ = (0, 1].', true, '1/n>0 сколь угодно близко к 0, но 0 не достигается; 1 входит.'],
      ['Dla rodziny zbiorów Fₙ = [1/n, 1], gdzie n ∈ ℕ₊, prawdziwa jest równość ⋃ₙ Fₙ = [0, 1].', false, 'Число 0 не принадлежит ни одному Fₙ, так как 1/n>0.'],
      ['Dla rodziny zbiorów Fₙ = [1/n, 1], gdzie n ∈ ℕ₊, prawdziwa jest równość ⋂ₙ Fₙ = {1}.', true, 'x≥1/n для всех n даёт x≥1 (при n=1), а x≤1 — отсюда x=1.']
    ]);
  };

  /* ── Задание 2: тавтология ── */
  const F = [
    ['(p ⇒ q) ⇔ [(∼p) ∨ q]', (p, q) => (!p || q), (p, q) => (!p || q), '⇔'],
    ['(p ⇒ q) ⇔ (q ⇒ p)', (p, q) => (!p || q), (p, q) => (!q || p), '⇔'],
    ['∼(p ∧ q) ⇔ [(∼p) ∨ (∼q)]', (p, q) => !(p && q), (p, q) => (!p || !q), '⇔'],
    ['∼(p ∨ q) ⇔ [(∼p) ∧ (∼q)]', (p, q) => !(p || q), (p, q) => (!p && !q), '⇔'],
    ['[p ∧ (p ⇒ q)] ⇒ q', (p, q) => (p && (!p || q)), (p, q) => q, '⇒'],
    ['(p ∨ q) ⇒ (p ∧ q)', (p, q) => (p || q), (p, q) => (p && q), '⇒'],
    ['(p ∧ q) ⇒ (p ∨ q)', (p, q) => (p && q), (p, q) => (p || q), '⇒'],
    ['∼(p ⇒ q) ⇔ (p ∧ ∼q)', (p, q) => !(!p || q), (p, q) => (p && !q), '⇔'],
    ['(p ⇒ q) ⇒ (∼q ⇒ ∼p)', (p, q) => (!p || q), (p, q) => (q || !p), '⇒'],
    ['(p ⇒ q) ⇒ (q ⇒ p)', (p, q) => (!p || q), (p, q) => (!q || p), '⇒'],
    ['(p ⇔ q) ⇔ [(p ⇒ q) ∧ (q ⇒ p)]', (p, q) => p === q, (p, q) => ((!p || q) && (!q || p)), '⇔'],
    ['[(p ∨ q) ∧ ∼p] ⇒ q', (p, q) => ((p || q) && !p), (p, q) => q, '⇒'],
    ['[(p ⇒ q) ∧ q] ⇒ p', (p, q) => ((!p || q) && q), (p, q) => p, '⇒'],
    ['[(p ⇒ q) ∧ (q ⇒ r)] ⇒ (p ⇒ r)', (p, q, r3) => ((!p || q) && (!q || r3)), (p, q, r3) => (!p || r3), '⇒', 3]
  ];
  const tf = b => (b ? '1' : '0');
  const task2 = () => {
    const [txt, L, R, op, nv] = pick(F), n = nv || 2, rows = [];
    for (let m = 0; m < 2 ** n; m++) {
      const v = Array.from({ length: n }, (_, i) => !!(m & (1 << (n - 1 - i))));
      const l = L(...v), rr = R(...v), val = op === '⇔' ? l === rr : (!l || rr);
      rows.push({ v, l, rr, val });
    }
    const taut = rows.every(x => x.val), names = n === 3 ? ['p', 'q', 'r'] : ['p', 'q'];
    const bad = rows.filter(x => !x.val);
    let dep = 0, cut = -1; for (let i = 0; i < txt.length; i++) { const c = txt[i]; if ('([{'.includes(c)) dep++; else if (')]}'.includes(c)) dep--; else if (c === op && dep === 0) { cut = i; break; } } const L0 = txt.slice(0, cut).trim(), R0 = txt.slice(cut + 1).trim();
    return {
      txt, taut,
      sol: `<p>Строим таблицу истинности (1 — истина, 0 — ложь). Левая часть: <b>${esc(L0)}</b>, правая: <b>${esc(R0)}</b>, главная связка «${op}».</p>
<table class="ct"><tr>${names.map(x => `<th>${x}</th>`).join('')}<th>лев.</th><th>прав.</th><th>итог</th></tr>${rows.map(x => `<tr>${x.v.map(b => `<td>${tf(b)}</td>`).join('')}<td>${tf(x.l)}</td><td>${tf(x.rr)}</td><td${x.val ? '' : ' class="bad"'}>${tf(x.val)}</td></tr>`).join('')}</table>
<p><b>Вывод:</b> ${taut ? 'в последнем столбце все значения равны 1, поэтому выражение <b>является тавтологией</b>.' : `в последнем столбце есть 0 (при ${names.map((nm, i) => nm + '=' + tf(bad[0].v[i])).join(', ')}), поэтому выражение <b>не является тавтологией</b>.`}</p>`
    };
  };

  /* ── Задание 3: промежутки ── */
  const INF = Infinity;
  const task3 = () => {
    const k = pick([2, 3, 5, 6, 7]), sq = Math.sqrt(k), a = r(1, 4), b = r(3, 7), c = r(1, 4), d = r(4, 8);
    const lab = new Map([[sq, '√' + k], [-a, '−' + a], [b, String(b)], [-c, '−' + c], [d, String(d)]]);
    const kind = r(0, 1);
    const A = kind ? { l: sq, lc: true, r: INF, rc: false, s: `[√${k}, +∞)` } : { l: -INF, lc: false, r: sq, rc: true, s: `(−∞, √${k}]` };
    const B = { l: -a, lc: false, r: b, rc: false, s: `(−${a}, ${b})` };
    const C = { l: -c, lc: true, r: d, rc: true, s: `[−${c}, ${d}]` };
    const inn = (I, x) => (x > I.l || (x === I.l && I.lc)) && (x < I.r || (x === I.r && I.rc));
    const all = { A, B, C };
    const defs = [
      ['A ∪ B', x => inn(A, x) || inn(B, x)], ['A ∩ C', x => inn(A, x) && inn(C, x)], ['C ∖ B', x => inn(C, x) && !inn(B, x)], ['A′', x => !inn(A, x)],
      ['B ∪ C', x => inn(B, x) || inn(C, x)], ['A ∩ B', x => inn(A, x) && inn(B, x)], ['B ∖ C', x => inn(B, x) && !inn(C, x)], ['C′', x => !inn(C, x)], ['A ∖ B', x => inn(A, x) && !inn(B, x)], ['B′', x => !inn(B, x)]
    ];
    const chosen = r(0, 2) ? defs.slice(0, 4) : shuffle(defs).slice(0, 4);
    const pts = [...new Set([sq, -a, b, -c, d])].sort((x, y) => x - y);
    const fl = x => x === INF ? '+∞' : x === -INF ? '−∞' : (lab.get(x) || String(x)).replace('-', '−');
    const calc = pred => {
      const seg = [{ gap: true, v: pred(pts[0] - 1), lo: -INF, hi: pts[0] }];
      pts.forEach((p, i) => { seg.push({ pt: p, v: pred(p) }); const nx = pts[i + 1] === undefined ? INF : pts[i + 1]; seg.push({ gap: true, v: pred(nx === INF ? p + 1 : (p + nx) / 2), lo: p, hi: nx }); });
      let cur = null; const out = [];
      for (const s of seg) {
        if (s.v) { if (!cur) cur = { lo: s.gap ? s.lo : s.pt, loC: !s.gap, hi: s.gap ? s.hi : s.pt, hiC: !s.gap }; else { cur.hi = s.gap ? s.hi : s.pt; cur.hiC = !s.gap; } }
        else if (cur) { out.push(cur); cur = null; }
      }
      if (cur) out.push(cur);
      return out.length ? out.map(i => i.lo === i.hi ? `{${fl(i.lo)}}` : `${i.loC && i.lo !== -INF ? '[' : '('}${fl(i.lo)}, ${fl(i.hi)}${i.hiC && i.hi !== INF ? ']' : ')'}`).join(' ∪ ') : '∅';
    };
    const results = chosen.map(([nm, f]) => [nm, calc(f)]);
    const sol = `<p>Отмечаем на оси: A=${A.s}, B=${B.s}, C=${C.s}. Порядок точек: ${pts.map(fl).join(' < ')} (√${k}≈${(Math.round(sq * 100) / 100).toString().replace('.', ',')}). Для каждой граничной точки отдельно проверяем, входит ли она в результат (квадратная скобка — входит, круглая — нет); «∖» — разность, «′» — дополнение до ℝ.</p><ul>${results.map(([nm, v]) => `<li>${esc(nm)} = <b>${esc(v)}</b></li>`).join('')}</ul>`;
    return { A: A.s, B: B.s, C: C.s, names: chosen.map(x => x[0]), results, sol };
  };

  /* ── Построение варианта и интерфейс ── */
  let V = null, timer = null, left = 1800;
  const app = document.getElementById('app');
  const tick = () => { const el = document.getElementById('clock'); if (!el) return; const m = String(Math.floor(left / 60)).padStart(2, '0'), s = String(left % 60).padStart(2, '0'); el.textContent = `${m}:${s}`; el.classList.toggle('low', left <= 300); };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  const start = () => { stop(); timer = setInterval(() => { left--; tick(); if (left <= 0) { stop(); } }, 1000); };

  function build() {
    stop(); left = 1800;
    V = { s: [s1(), s2(), s3(), s4(), s5()], t2: task2(), t3: task3(), id: Math.random().toString(36).slice(2, 6).toUpperCase() };
    render();
  }
  function render() {
    app.innerHTML = `
<div class="cbar"><div><b>Вариант ${V.id}</b> · 30 минут · 15 баллов</div><div class="clock" id="clock">30:00</div>
<div><button class="button primary" id="bStart" type="button">Старт таймера</button> <button class="button" id="bStop" type="button">Пауза</button> <button class="button" id="bNew" type="button">Новый вариант</button></div></div>
<section class="lesson-card"><span class="lesson-number">ЗАДАНИЕ 1 · 5 баллов</span><h2>Правда или ложь (P/F)</h2>
<p class="muted">За верный ответ +1, за неверный −1, без ответа 0.</p>
${V.s.map((s, i) => `<div class="stmt" data-i="${i}"><p>${i + 1}. ${esc(s[0])}</p><div class="pf"><label><input type="radio" name="s${i}" value="P"> P</label><label><input type="radio" name="s${i}" value="F"> F</label><label><input type="radio" name="s${i}" value="" checked> —</label></div><div class="why" hidden></div></div>`).join('')}
<button class="button primary" id="bCheck1" type="button">Проверить задание 1</button> <span id="score1" class="score"></span></section>
<section class="lesson-card"><span class="lesson-number">ЗАДАНИЕ 2 · 5 баллов</span><h2>Тавтология?</h2>
<p>Proszę sprawdzić czy poniższe wyrażenie jest tautologią rachunku zdań:</p><p class="formula">${esc(V.t2.txt)}</p>
<textarea rows="4" placeholder="Твоя таблица истинности и вывод…"></textarea>
<div><button class="button primary" id="bShow2" type="button">Показать решение</button></div><div id="sol2" hidden>${V.t2.sol}</div></section>
<section class="lesson-card"><span class="lesson-number">ЗАДАНИЕ 3 · 5 баллов</span><h2>Промежутки на оси</h2>
<p>Proszę zaznaczyć przedziały na osi liczbowej: A = ${esc(V.t3.A)}, B = ${esc(V.t3.B)}, C = ${esc(V.t3.C)}, a następnie wyznaczyć zbiory:</p>
<div class="ivs">${V.t3.names.map((n, i) => `<label>${esc(n)} = <input type="text" data-iv="${i}" autocomplete="off"></label>`).join('')}</div>
<div><button class="button primary" id="bShow3" type="button">Показать решение</button></div><div id="sol3" hidden>${V.t3.sol}</div></section>
<section class="lesson-card"><h2>Итог</h2><p>Задание 1: <span id="t1">—</span> · Задание 2 (самооценка 0–5): <input id="m2" type="number" min="0" max="5" value="0" style="width:60px"> · Задание 3 (самооценка 0–5): <input id="m3" type="number" min="0" max="5" value="0" style="width:60px"></p><p><b id="total">Сумма: —</b></p></section>`;
    tick();
    if (window.texify) texify(app);
    const sum = () => { const t1 = V.score1; const m2 = +document.getElementById('m2').value || 0, m3 = +document.getElementById('m3').value || 0; document.getElementById('total').textContent = `Сумма: ${(t1 == null ? 0 : t1) + m2 + m3} / 15` + (t1 == null ? ' (задание 1 ещё не проверено)' : ''); };
    app.querySelector('#bStart').onclick = () => { if (left <= 0) left = 1800; start(); };
    app.querySelector('#bStop').onclick = stop;
    app.querySelector('#bNew').onclick = build;
    app.querySelector('#bShow2').onclick = () => { app.querySelector('#sol2').hidden = false; };
    app.querySelector('#bShow3').onclick = () => {
      const sol = app.querySelector('#sol3'); sol.hidden = false;
      const norm = x => x.replace(/\s+/g, '').replace(/\\sqrt|sqrt/g, '√').replace(/inf(inity)?/gi, '∞').replace(/-/g, '−').replace(/\+∞/g, '∞').replace(/\+/g, '');
      const marks = V.t3.results.map(([n, v], i) => { const u = app.querySelector(`[data-iv="${i}"]`).value; return u.trim() ? (norm(u) === norm(v) || norm(u) === norm(v).replace(/∞/g, '+∞') ? '✓' : '✗') : '·'; });
      sol.insertAdjacentHTML('afterbegin', `<p class="muted">Автосравнение с твоими ответами (по записи): ${V.t3.results.map(([n], i) => `${esc(n)} ${marks[i]}`).join(' · ')}. Значок ✗ может означать лишь другую форму записи — сверь вручную.</p>`);
      if (window.texify) texify(sol);
    };
    app.querySelector('#bCheck1').onclick = () => {
      let pts = 0;
      V.s.forEach((s, i) => {
        const val = (app.querySelector(`input[name="s${i}"]:checked`) || {}).value || '';
        const box = app.querySelector(`.stmt[data-i="${i}"]`), why = box.querySelector('.why');
        const ok = val === (s[1] ? 'P' : 'F');
        if (val) pts += ok ? 1 : -1;
        box.classList.remove('okk', 'nok'); box.classList.add(!val ? 'nok' : ok ? 'okk' : 'nok');
        why.hidden = false; why.innerHTML = `<b>Правильно: ${s[1] ? 'P' : 'F'}</b>${val ? (ok ? ' (+1)' : ' (−1)') : ' (0)'} — ${esc(s[2])}`;
      });
      if (window.texify) texify(app.querySelector('.lesson-card'));
      V.score1 = pts; document.getElementById('score1').textContent = `${pts} / 5`; document.getElementById('t1').textContent = `${pts} / 5`; sum();
    };
    app.querySelectorAll('#m2,#m3').forEach(x => x.addEventListener('input', sum));
  }
  document.getElementById('bGen').addEventListener('click', () => { document.getElementById('intro').hidden = true; build(); window.scrollTo({ top: document.getElementById('app').offsetTop - 80, behavior: 'smooth' }); });
})();
