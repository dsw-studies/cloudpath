/* Генератор пробных коллоквиумов по Matematyka 1 (алгебра): прямая, матрицы, определители. 3 задания по 5 баллов, 30 минут. */
(() => {
  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[r(0, a.length - 1)];
  const nz = (a, b) => { let x = 0; while (!x) x = r(a, b); return x; };
  const W = n => n < 0 ? '(' + S(n) + ')' : String(n);
  const S = n => (n < 0 ? '−' : '') + Math.abs(n);
  const mat = (R, C, lo, hi) => Array.from({ length: R }, () => Array.from({ length: C }, () => r(lo, hi)));
  const tr = M => M[0].map((_, j) => M.map(row => row[j]));
  const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
  const dims = M => `${M.length}×${M[0].length}`;
  const mx = M => `<table class="mx">${M.map(row => `<tr>${row.map(v => `<td>${S(v)}</td>`).join('')}</tr>`).join('')}</table>`;
  const det = M => M.length === 1 ? M[0][0] : M.length === 2 ? M[0][0] * M[1][1] - M[0][1] * M[1][0] : M[0].reduce((s, v, j) => s + (j % 2 ? -1 : 1) * v * det(M.slice(1).map(row => row.filter((_, c) => c !== j))), 0);
  const eq = (a, b, c) => { const t = []; if (a) t.push((a === 1 ? '' : a === -1 ? '−' : S(a)) + 'x'); if (b) t.push((b > 0 && t.length ? '+ ' : b < 0 ? '− ' : '') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y'); if (c) t.push((c > 0 ? '+ ' : '− ') + Math.abs(c)); return t.join(' ').replace(/^\+ /, '') + ' = 0'; };

  function task1() {
    const a = nz(-4, 4), b = nz(-5, 5), c = r(-8, 8), x0 = r(-3, 4), y0 = r(-3, 4);
    const pc = a * y0 - b * x0, qc = -(a * x0 + b * y0);
    const sol = `<p>Прямая <b>${eq(a, b, c)}</b>, точка E(${S(x0)}, ${S(y0)}). Нормальный вектор прямой n=[${S(a)}, ${S(b)}]; направляющий вектор v=[${S(b)}, ${S(-a)}] (его компоненты — коэффициенты, меняем местами и один знак). Наклон прямой k = ${S(-a)}/${S(b)}.</p>
<p><b>a) перпендикулярная через E:</b> её нормальный вектор — направляющий вектор исходной: [${S(b)}, ${S(-a)}]. Уравнение ${S(b)}(x − ${W(x0)}) + ${W(-a)}(y − ${W(y0)}) = 0 ⇒ <b>${eq(b, -a, pc)}</b>. Проверка: подставляем E: ${W(b)}·${W(x0)} + ${W(-a)}·${W(y0)} + (${S(pc)}) = ${b * x0 - a * y0 + pc}.</p>
<p><b>b) параллельная через E:</b> тот же нормальный вектор [${S(a)}, ${S(b)}]. ${S(a)}(x − ${W(x0)}) + ${W(b)}(y − ${W(y0)}) = 0 ⇒ <b>${eq(a, b, qc)}</b>. Проверка: ${W(a)}·${W(x0)} + ${W(b)}·${W(y0)} + (${S(qc)}) = ${a * x0 + b * y0 + qc}.</p>
<p class="muted">Условия: параллельность — одинаковые наклоны (k₁=k₂); перпендикулярность — k₁·k₂ = −1.</p>`;
    return { stmt: `Dana jest prosta o równaniu ogólnym <b>${eq(a, b, c)}</b> oraz punkt <b>E(${S(x0)}, ${S(y0)})</b>. Proszę napisać równanie prostej do niej: a) prostopadłej i przechodzącej przez punkt E; b) równoległej i przechodzącej przez punkt E.`, sol };
  }

  function task2() {
    const A = mat(2, 3, -2, 4), B = mat(3, 3, -2, 8), C = mat(3, 2, -2, 7), k = r(2, 4);
    const M = { A, B, C };
    const pool = [
      { t: `A − ${k}Cᵀ`, f: () => { const Ct = tr(C), res = A.map((row, i) => row.map((v, j) => v - k * Ct[i][j])); return { res, why: `Cᵀ имеет размер ${dims(Ct)}, как и A, поэтому разность определена. Cᵀ=${mx(Ct)} ${k}Cᵀ=${mx(Ct.map(x => x.map(v => k * v)))}` }; } },
      { t: 'AB', f: () => ({ res: mul(A, B), why: `A: ${dims(A)}, B: ${dims(B)}; число столбцов A (3) = числу строк B (3), результат ${dims(mul(A, B))}. Элемент (i,j) = строка i матрицы A на столбец j матрицы B.` }) },
      { t: 'CB', f: () => ({ res: null, why: `C: ${dims(C)}, B: ${dims(B)}. Число столбцов C (2) ≠ числу строк B (3), поэтому произведение <b>невыполнимо</b>.` }) },
      { t: 'BA', f: () => ({ res: null, why: `B: ${dims(B)}, A: ${dims(A)}. Число столбцов B (3) ≠ числу строк A (2), поэтому произведение <b>невыполнимо</b>.` }) },
      { t: 'BC', f: () => ({ res: mul(B, C), why: `B: ${dims(B)}, C: ${dims(C)}; столбцы B (3) = строки C (3), результат ${dims(mul(B, C))}.` }) },
      { t: 'CA', f: () => ({ res: mul(C, A), why: `C: ${dims(C)}, A: ${dims(A)}; столбцы C (2) = строки A (2), результат ${dims(mul(C, A))}.` }) },
      { t: 'AC', f: () => ({ res: mul(A, C), why: `A: ${dims(A)}, C: ${dims(C)}; столбцы A (3) = строки C (3), результат ${dims(mul(A, C))}.` }) },
      { t: 'A + C', f: () => ({ res: null, why: `A: ${dims(A)}, C: ${dims(C)}. Размеры разные, поэтому сложение невыполнимо (складывать можно только матрицы одного размера).` }) }
    ];
    const first = pool[0], undef = pool.filter(p => ['CB', 'BA', 'A + C'].includes(p.t)), ok = pool.filter(p => ['AB', 'BC', 'CA', 'AC'].includes(p.t));
    const ops = [first, pick(ok), pick(undef)].sort(() => Math.random() - .5);
    const letters = ['a', 'b', 'c'];
    const sol = ops.map((p, i) => { const q = p.f(); return `<p><b>${letters[i]}) ${p.t}</b>: ${q.why}</p>${q.res ? `<p>Результат: ${mx(q.res)}</p>` : '<p><b>Ответ: действие невыполнимо.</b></p>'}`; }).join('');
    return { stmt: `Dane są macierze: A = ${mx(A)} B = ${mx(B)} C = ${mx(C)} Proszę wykonać działania: ${ops.map((p, i) => `${letters[i]}) ${p.t}`).join(' ; ')}. Jeśli któreś z działań jest niewykonalne, proszę uzasadnić dlaczego.`, sol };
  }

  function task3() {
    const i = r(0, 3), j = r(0, 3);
    let X = mat(4, 4, -5, 5); X[i] = X[i].map(() => 0); const v = nz(-4, 4); X[i][j] = v;
    const minor = X.filter((_, a) => a !== i).map(row => row.filter((_, b) => b !== j));
    const m = det(minor), sg = (i + j) % 2 ? -1 : 1, total = det(X);
    const d = pick([-1, -1, 2, -2, 3]), n = pick([2025, 2026, 2027, 2028]), k = pick([2, 3, 4]);
    const dn = Math.abs(d) === 1 ? String(d ** (n % 2 ? 1 : 2) === 1 ? 1 : -1).replace('-', '−') : `${d < 0 ? '(−' + (-d) + ')' : d}^${n}`;
    const sol = `<p><b>a)</b> В строке ${i + 1} только один ненулевой элемент (${S(v)} в столбце ${j + 1}) — раскладываем по ней: det X = a·(−1)^(${i + 1}+${j + 1})·M, где M — минор (убрали строку ${i + 1} и столбец ${j + 1}).</p>
<p>M = ${mx(minor)} M = det = ${m} (правило Саррюса: сумма «прямых» произведений минус сумма «обратных»).</p>
<p>det X = ${S(v)}·(${sg > 0 ? '+1' : '−1'})·${S(m)} = <b>${total}</b>.</p>
<p><b>b)</b> det(Dⁿ) = (det D)ⁿ, так как det(AB)=det A·det B. det(D^${n}) = (${S(d)})^${n} = <b>${dn}</b>.</p>
<p>det(kD) = kⁿ·det D для матрицы n-го порядка, здесь порядок 4: det(${k}D) = ${k}⁴·(${S(d)}) = ${k ** 4}·(${S(d)}) = <b>${S(k ** 4 * d)}</b>.</p>`;
    return { stmt: `a) Proszę obliczyć wyznacznik macierzy X = ${mx(X)} b) Wiedząc, że macierz D jest macierzą czwartego stopnia oraz det(D) = ${S(d)}, proszę obliczyć wartości: det(D^${n}) oraz det(${k}D).`, sol };
  }

  let V = null, timer = null, left = 1800;
  const app = document.getElementById('app');
  const tick = () => { const el = document.getElementById('clock'); if (!el) return; el.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`; el.classList.toggle('low', left <= 300); };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  function build() {
    stop(); left = 1800;
    V = { t: [task1(), task2(), task3()], id: Math.random().toString(36).slice(2, 6).toUpperCase() };
    app.innerHTML = `<div class="cbar"><div><b>Вариант ${V.id}</b> · 30 минут · 15 баллов</div><div class="clock" id="clock">30:00</div>
<div><button class="button primary" id="bStart" type="button">Старт таймера</button> <button class="button" id="bStop" type="button">Пауза</button> <button class="button" id="bNew" type="button">Новый вариант</button></div></div>
${V.t.map((t, i) => `<section class="lesson-card"><span class="lesson-number">ZADANIE ${i + 1} · 5 pkt</span><p>${t.stmt}</p><textarea rows="4" placeholder="Решай на бумаге, потом сверяйся…"></textarea><div><button class="button primary sh" data-i="${i}" type="button">Показать решение</button></div><div class="sol" id="sol${i}" hidden>${t.sol}</div></section>`).join('')}`;
    tick();
    if (window.texify) texify(app);
    app.querySelector('#bStart').onclick = () => { if (left <= 0) left = 1800; stop(); timer = setInterval(() => { left--; tick(); if (left <= 0) stop(); }, 1000); };
    app.querySelector('#bStop').onclick = stop;
    app.querySelector('#bNew').onclick = build;
    app.querySelectorAll('.sh').forEach(b => b.onclick = () => { app.querySelector('#sol' + b.dataset.i).hidden = false; });
  }
  window.__alg1 = { task1, task2, task3, build };
  document.getElementById('bGen').addEventListener('click', () => { document.getElementById('intro').hidden = true; build(); window.scrollTo({ top: app.offsetTop - 80, behavior: 'smooth' }); });
})();
