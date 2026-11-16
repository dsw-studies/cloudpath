/* Генераторы задач «как в листах»: те же типы, что в готовых решениях (физика 2, анализ 1–2, алгебра 1, информатика гр.1). */
(() => {
  const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[r(0, a.length - 1)];
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const T = (q, a, w) => ({ q, a: String(a), w });
  const num = x => String(Math.round(x * 1000) / 1000).replace('.', ',');
  const frac = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : `${n}/${d}`; };
  const M = A => '(' + A.map(row => row.join(' ')).join(' ; ') + ')';
  const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
  const lvl = l => ({ basic: 1, medium: 2, hard: 3 }[l] || 1);
  const g = 10;

  /* ───────── Физика (лист 2: динамика, трение, блоки) ───────── */
  const physics = {
    'sheet-ph-friction': d => {
      const m = r(2, 10), mu = r(1, 5) / 10, fr = mu * m * g, F = Math.ceil(fr) + r(2, 15);
      if (d === 1) {
        const a = (F - fr) / m;
        return T(`Брусок ${m} кг тянут по горизонтальной поверхности силой F=${F} Н вдоль поверхности. Коэффициент трения μ=${mu}, g=10 м/с². Найди силу трения и ускорение.`,
          `Fтр=${num(fr)} Н; a=${num(a)} м/с²`,
          `N=mg=${m * g} Н. Fтр=μN=${mu}·${m * g}=${num(fr)} Н. Второй закон Ньютона вдоль движения: ma=F−Fтр, откуда a=(${F}−${num(fr)})/${m}=${num(a)} м/с².`);
      }
      const th = pick([30, 37, 45, 60]), R = th * Math.PI / 180;
      const N = m * g - F * Math.sin(R), a = (F * Math.cos(R) - mu * N) / m;
      const ok = N > 0 && a > 0;
      if (!ok) return physics['sheet-ph-friction'](d);
      return T(`Брусок ${m} кг тянут силой F=${F} Н под углом ${th}° вверх к горизонту. μ=${mu}, g=10 м/с². Найди нормальную реакцию и ускорение.`,
        `N=${num(N)} Н; a=${num(a)} м/с²`,
        `Вертикаль: N+F·sinα=mg, N=${m * g}−${F}·sin${th}°=${num(N)} Н. Горизонталь: ma=F·cosα−μN, a=(${num(F * Math.cos(R))}−${mu}·${num(N)})/${m}=${num(a)} м/с². Сила, направленная вверх, уменьшает N и потому трение.`);
    },
    'sheet-ph-incline': d => {
      const m = r(1, 10), al = pick([30, 37, 45, 53, 60]), R = al * Math.PI / 180, mu = Math.round(r(1, 9) / 10 * Math.tan(R) * 100) / 100 || 0.1;
      const N = m * g * Math.cos(R), fr = mu * N, a = g * (Math.sin(R) - mu * Math.cos(R));
      let t = `Брусок ${m} кг скользит вниз по наклонной плоскости с углом ${al}°. μ=${mu}, g=10 м/с². Найди нормальную реакцию, силу трения и ускорение.`;
      let ans = `N=${num(N)} Н; Fтр=${num(fr)} Н; a=${num(a)} м/с²`;
      let w = `Ось вдоль плоскости: mg·sinα−μN=ma; перпендикулярно: N=mg·cosα=${num(N)} Н. Fтр=μN=${num(fr)} Н. a=g(sinα−μcosα)=${num(a)} м/с². Скольжение возможно, так как tgα=${num(Math.tan(R))}>μ=${mu}.`;
      if (d === 3) {
        const L = r(2, 10), v = Math.sqrt(2 * a * L), tm = Math.sqrt(2 * L / a);
        t += ` Брусок начинает с нуля и проходит ${L} м вдоль плоскости: найди скорость в конце и время.`;
        ans += `; v=${num(v)} м/с; t=${num(tm)} с`;
        w += ` Равноускоренное движение из покоя: v²=2aL ⇒ v=${num(v)} м/с; L=at²/2 ⇒ t=${num(tm)} с.`;
      }
      return T(t, ans, w);
    },
    'sheet-ph-table-hanging': d => {
      const m1 = r(2, 8), m2 = r(2, 8), mu = d === 1 ? 0 : r(1, 3) / 10;
      if (m2 <= mu * m1) return physics['sheet-ph-table-hanging'](d);
      const a = (m2 * g - mu * m1 * g) / (m1 + m2), Tn = m2 * (g - a);
      return T(`Брусок m₁=${m1} кг лежит на столе (${mu ? `μ=${mu}` : 'трения нет'}) и связан нитью через блок с грузом m₂=${m2} кг, висящим вниз. Блок и нить идеальные, g=10 м/с². Найди ускорение и натяжение нити.`,
        `a=${num(a)} м/с²; T=${num(Tn)} Н`,
        `Груз: m₂g−T=m₂a. Брусок: T−μm₁g=m₁a. Складываем: a=(m₂g−μm₁g)/(m₁+m₂)=${num(a)} м/с². Из уравнения груза T=m₂(g−a)=${num(Tn)} Н.`);
    },
    'sheet-ph-tied-bodies': d => {
      const m1 = r(2, 8), m2 = r(2, 8), mu = d === 1 ? 0 : r(1, 3) / 10, tot = m1 + m2;
      const F = Math.ceil(mu * tot * g) + r(5, 40);
      const a = (F - mu * tot * g) / tot, Tn = m2 * (a + mu * g);
      return T(`Два бруска m₁=${m1} кг и m₂=${m2} кг связаны лёгкой нитью и лежат на горизонтали (${mu ? `μ=${mu} для обоих` : 'без трения'}). К m₁ приложена горизонтальная сила F=${F} Н. g=10 м/с². Найди ускорение и натяжение нити.`,
        `a=${num(a)} м/с²; T=${num(Tn)} Н`,
        `Для системы: (m₁+m₂)a=F−μ(m₁+m₂)g, a=${num(a)} м/с². Для второго бруска: T−μm₂g=m₂a, T=m₂(a+μg)=${num(Tn)} Н.`);
    },
    'sheet-ph-kinematics': d => {
      const v0 = r(0, 10), a = r(1, 5), t = r(2, 10);
      if (d < 3) {
        const v = v0 + a * t, s = v0 * t + a * t * t / 2;
        return T(`Тело движется с постоянным ускорением a=${a} м/с², начальная скорость ${v0} м/с. Найди скорость и путь через ${t} с.`,
          `v=${v} м/с; s=${num(s)} м`, `v=v₀+at=${v0}+${a}·${t}=${v} м/с; s=v₀t+at²/2=${v0 * t}+${num(a * t * t / 2)}=${num(s)} м.`);
      }
      const s = r(10, 80), v = Math.sqrt(v0 * v0 + 2 * a * s);
      return T(`Тело проходит ${s} м с постоянным ускорением ${a} м/с², начальная скорость ${v0} м/с. Найди конечную скорость и время.`,
        `v=${num(v)} м/с; t=${num((v - v0) / a)} с`, `v²=v₀²+2as=${v0 * v0}+${2 * a * s}, v=${num(v)} м/с; t=(v−v₀)/a=${num((v - v0) / a)} с.`);
    },
    'sheet-ph-energy': d => {
      const m = r(1, 10), h = r(2, 20);
      if (d === 1) {
        const v = Math.sqrt(2 * g * h);
        return T(`Тело ${m} кг падает с высоты ${h} м без начальной скорости, сопротивлением воздуха пренебречь, g=10 м/с². Найди скорость у земли и кинетическую энергию.`,
          `v=${num(v)} м/с; Eк=${m * g * h} Дж`, `mgh=mv²/2 ⇒ v=√(2gh)=${num(v)} м/с; Eк=mgh=${m}·10·${h}=${m * g * h} Дж.`);
      }
      const Fr = r(1, Math.max(1, Math.floor(m * g / 2))), s = h + r(0, 3), v2 = 2 * (m * g * h - Fr * s) / m;
      if (v2 <= 0) return physics['sheet-ph-energy'](d);
      return T(`Тело ${m} кг соскальзывает с высоты ${h} м по поверхности длиной ${s} м; постоянная сила трения ${Fr} Н. Начальная скорость 0, g=10 м/с². Найди скорость внизу.`,
        `v=${num(Math.sqrt(v2))} м/с`, `Работа: mgh−Fтр·s=mv²/2 ⇒ ${m * g * h}−${Fr * s}=${num(m * v2 / 2)} Дж, v=√(2·${num(m * v2 / 2)}/${m})=${num(Math.sqrt(v2))} м/с.`);
    }
  };

  /* ───────── Анализ (листы 1–2: кванторы, множества) ───────── */
  const quant = [
    c => ({ s: `∀x∈ℝ ∃y∈ℝ: y>x+${c}`, n: `∃x∈ℝ ∀y∈ℝ: y≤x+${c}`, v: 'истинно', w: `Для любого x возьмём y=x+${c + 1}.` }),
    c => ({ s: `∃x∈ℝ ∀y∈ℝ: y>x+${c}`, n: `∀x∈ℝ ∃y∈ℝ: y≤x+${c}`, v: 'ложно', w: `Для любого x подходит y=x+${c}: тогда y>x+${c} не выполнено.` }),
    c => ({ s: `∀x∈ℝ ∃y∈ℝ: y²=x−${c}`, n: `∃x∈ℝ ∀y∈ℝ: y²≠x−${c}`, v: 'ложно', w: `При x=${c - 1} имеем x−${c}=−1<0, а y²≥0 ни при каком y.` }),
    c => ({ s: `∃y∈ℝ ∀x∈ℝ: x·y=0`, n: `∀y∈ℝ ∃x∈ℝ: x·y≠0`, v: 'истинно', w: `Возьмём y=0: x·0=0 для всех x.` }),
    c => ({ s: `∀x∈ℕ ∃y∈ℕ: y>x²+${c}`, n: `∃x∈ℕ ∀y∈ℕ: y≤x²+${c}`, v: 'истинно', w: `Берём y=x²+${c + 1}∈ℕ.` }),
    c => ({ s: `∃x∈ℝ ∀y∈ℝ: x+y=${c}`, n: `∀x∈ℝ ∃y∈ℝ: x+y≠${c}`, v: 'ложно', w: `Для любого x возьмём y=${c + 1}−x: тогда x+y=${c + 1}≠${c}.` }),
    c => ({ s: `∀x∈ℝ ∃y∈ℝ: x+y=${c}`, n: `∃x∈ℝ ∀y∈ℝ: x+y≠${c}`, v: 'истинно', w: `Берём y=${c}−x.` })
  ];
  const analysis = {
    'sheet-an-quantifiers': d => {
      const c = r(1, 9), t = pick(d === 1 ? quant.slice(0, 3) : quant)(c);
      return T(`Для высказывания «${t.s}» определи, истинно ли оно, и построй отрицание без знака ¬ перед кванторами.`,
        `${t.v}; отрицание: ${t.n}`, `При отрицании ∀ меняется на ∃, ∃ — на ∀, а предикат заменяется на противоположный. ${t.w}`);
    },
    'sheet-an-intervals': d => {
      const a = r(-8, 2), b = a + r(3, 8), c = r(a - 2, b - 1), e = c + r(3, 9);
      const ac = !!r(0, 1), bc = !!r(0, 1), cc = !!r(0, 1), ec = !!r(0, 1);
      const inA = x => (x > a || (x === a && ac)) && (x < b || (x === b && bc));
      const inB = x => (x > c || (x === c && cc)) && (x < e || (x === e && ec));
      const ops = [['A∩B', x => inA(x) && inB(x)], ['A∪B', x => inA(x) || inB(x)], ['A∖B', x => inA(x) && !inB(x)], ['B∖A', x => inB(x) && !inA(x)]];
      if (d === 3) ops.push(['ℝ∖(A∪B)', x => !(inA(x) || inB(x))]);
      const [name, pred] = d === 1 ? ops[r(0, 1)] : pick(ops);
      const pts = [...new Set([a, b, c, e])].sort((x, y) => x - y);
      const at = (x) => pred(x);
      const seg = [];
      seg.push({ gap: true, v: at(pts[0] - 1), lo: -Infinity, hi: pts[0] });
      pts.forEach((p, i) => {
        seg.push({ pt: p, v: at(p) });
        const nxt = pts[i + 1] === undefined ? Infinity : pts[i + 1];
        seg.push({ gap: true, v: at(nxt === Infinity ? p + 1 : (p + nxt) / 2), lo: p, hi: nxt });
      });
      let cur = null; const out = [];
      for (const s of seg) {
        if (s.v) { if (!cur) cur = { lo: s.gap ? s.lo : s.pt, loC: !s.gap, hi: s.gap ? s.hi : s.pt, hiC: !s.gap }; else { cur.hi = s.gap ? s.hi : s.pt; cur.hiC = !s.gap; } }
        else if (cur) { out.push(cur); cur = null; }
      }
      if (cur) out.push(cur);
      const fi = x => x === Infinity ? '+∞' : x === -Infinity ? '−∞' : String(x);
      const fm = i => i.lo === i.hi ? `{${i.lo}}` : `${i.loC && i.lo !== -Infinity ? '[' : '('}${fi(i.lo)}, ${fi(i.hi)}${i.hiC && i.hi !== Infinity ? ']' : ')'}`;
      const ans = out.length ? out.map(fm).join(' ∪ ') : '∅';
      const sA = `${ac ? '[' : '('}${a}, ${b}${bc ? ']' : ')'}`, sB = `${cc ? '[' : '('}${c}, ${e}${ec ? ']' : ')'}`;
      return T(`Даны A=${sA}, B=${sB}. Найди ${name}.`, ans,
        `Нарисуй оба промежутка на числовой прямой. Для каждого граничного числа (${pts.join(', ')}) отдельно проверь, входит ли оно в множество: квадратная скобка — входит, круглая — нет. Результат: ${ans}.`);
    },
    'sheet-an-product': d => {
      const nA = r(2, 3 + d), nB = r(2, 3 + d);
      const As = [...new Set(Array.from({ length: nA }, () => r(1, 9)))].sort((x, y) => x - y), Bs = [...new Set(Array.from({ length: nB }, () => r(1, 9)))].sort((x, y) => x - y);
      const kinds = [['a<b', (x, y) => x < y], ['a+b чётно', (x, y) => (x + y) % 2 === 0], ['a делит b', (x, y) => y % x === 0]];
      const [kn, kf] = pick(d === 1 ? [kinds[0]] : kinds);
      const pairs = []; As.forEach(x => Bs.forEach(y => { if (kf(x, y)) pairs.push(`(${x},${y})`); }));
      return T(`A={${As.join(', ')}}, B={${Bs.join(', ')}}. Найди |A×B|, число подмножеств A и перечисли пары (a,b)∈A×B, для которых «${kn}».`,
        `|A×B|=${As.length * Bs.length}; 2^|A|=${2 ** As.length}; пары: ${pairs.length ? pairs.join(' ') : 'нет'} (${pairs.length})`,
        `|A×B|=|A|·|B|=${As.length}·${Bs.length}. Подмножеств у ${As.length}-элементного множества 2^${As.length}. Перебираем все ${As.length * Bs.length} пар и оставляем удовлетворяющие условию.`);
    }
  };

  /* ───────── Алгебра (лист 1: матрицы) ───────── */
  const detOK = () => { for (;;) { const A = [[r(-4, 5), r(-4, 5)], [r(-4, 5), r(-4, 5)]]; const dt = A[0][0] * A[1][1] - A[0][1] * A[1][0]; if (dt !== 0 && Math.abs(dt) <= 12) return [A, dt]; } };
  const algebra = {
    'sheet-al-inverse': d => {
      const [A, dt] = detOK(), inv = [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
      const fm = inv.map(row => row.map(x => frac(x, dt)));
      return T(`Найди обратную матрицу к A=${M(A)} (строки через «;») и проверь, что A·A⁻¹=E.`,
        `det A=${dt}; A⁻¹=${M(fm)}`,
        `det A=${A[0][0]}·${A[1][1]}−${A[0][1]}·${A[1][0]}=${dt}≠0. Для 2×2: A⁻¹=(1/det)·(d −b ; −c a)=(1/${dt})·${M(inv)}. Проверка: перемножь A и A⁻¹ — получится единичная матрица.`);
    },
    'sheet-al-equation': d => {
      const [A, dt] = detOK(), X = [[r(-3, 4), r(-3, 4)], [r(-3, 4), r(-3, 4)]], B = mul(A, X);
      return T(`Реши матричное уравнение A·X=B, где A=${M(A)}, B=${M(B)}.`, `X=${M(X)}`,
        `det A=${dt}≠0, поэтому X=A⁻¹B. A⁻¹=(1/${dt})·${M([[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]])}. Умножаем на B слева и получаем X=${M(X)}. Проверка: A·X=B.`);
    },
    'sheet-al-cholesky': d => {
      if (d < 3) {
        const l11 = r(1, 4), l21 = r(-3, 4), l22 = r(1, 4), A = [[l11 * l11, l11 * l21], [l11 * l21, l21 * l21 + l22 * l22]];
        return T(`Найди разложение Холецкого A=L·Lᵀ (L нижнетреугольная с положительной диагональю) для A=${M(A)}.`,
          `L=${M([[l11, 0], [l21, l22]])}`,
          `l₁₁=√${A[0][0]}=${l11}; l₂₁=a₂₁/l₁₁=${A[1][0]}/${l11}=${l21}; l₂₂=√(a₂₂−l₂₁²)=√(${A[1][1]}−${l21 * l21})=${l22}.`);
      }
      const L = [[r(1, 3), 0, 0], [r(-2, 3), r(1, 3), 0], [r(-2, 3), r(-2, 3), r(1, 3)]], A = mul(L, L[0].map((_, i) => L.map(row => row[i])));
      return T(`Найди разложение Холецкого A=L·Lᵀ для A=${M(A)}.`, `L=${M(L)}`,
        `l₁₁=√a₁₁=${L[0][0]}; l₂₁=a₂₁/l₁₁=${L[1][0]}; l₃₁=a₃₁/l₁₁=${L[2][0]}; l₂₂=√(a₂₂−l₂₁²)=${L[1][1]}; l₃₂=(a₃₂−l₃₁l₂₁)/l₂₂=${L[2][1]}; l₃₃=√(a₃₃−l₃₁²−l₃₂²)=${L[2][2]}.`);
    },
    'sheet-al-transpose': d => {
      const n = r(2, 3), k = r(2, 3), p = r(2, 3), R = () => r(-3, 4), A = Array.from({ length: n }, () => Array.from({ length: k }, R)), B = Array.from({ length: k }, () => Array.from({ length: p }, R));
      const AB = mul(A, B), t = X => X[0].map((_, i) => X.map(row => row[i]));
      return T(`A=${M(A)} (${n}×${k}), B=${M(B)} (${k}×${p}). Найди AB и (AB)ᵀ, затем убедись, что (AB)ᵀ=BᵀAᵀ.`,
        `AB=${M(AB)}; (AB)ᵀ=${M(t(AB))}`,
        `Размеры: (${n}×${k})·(${k}×${p})=${n}×${p}. Элемент (i,j) — скалярное произведение i-й строки A на j-й столбец B. Транспонируем результат. Проверка: BᵀAᵀ=${M(mul(t(B), t(A)))} совпадает с (AB)ᵀ.`);
    }
  };

  /* ───────── Информатика (группа 1) ───────── */
  const foundations = {
    'sheet-in-units': d => {
      if (d === 1) {
        const x = pick([1, 2, 4, 8, 16, 64]), u = pick([['КиБ', 1024, 'байт'], ['МиБ', 1024 * 1024, 'байт']]);
        return T(`Сколько байт и бит в ${x} ${u[0]} (двоичные приставки, 1 КиБ=1024 байта)?`, `${x * u[1]} байт; ${x * u[1] * 8} бит`, `${x} ${u[0]}=${x}·${u[1]} байт=${x * u[1]}. Бит в 8 раз больше: ×8=${x * u[1] * 8}.`);
      }
      const size = r(2, 900), speed = pick([8, 16, 24, 50, 100]), t = size * 8 / speed;
      return T(`Файл ${size} МБ (1 МБ=10⁶ байт) качается по каналу ${speed} Мбит/с. Сколько секунд займёт загрузка (без потерь)?`, `${num(t)} с`, `Объём в мегабитах: ${size}·8=${size * 8} Мбит. Время=объём/скорость=${size * 8}/${speed}=${num(t)} с.`);
    },
    'sheet-in-rail': d => {
      const words = ['KOMPUTER', 'INFORMATYKA', 'ALGORYTM', 'PROCESOR', 'PAMIEC', 'SIECKOMPUTEROWA', 'WROCLAWDSW', 'MATRYCA'];
      const w = pick(words), rails = r(2, d === 3 ? 4 : 3), rows = Array.from({ length: rails }, () => []);
      let row = 0, dir = 1; for (const ch of w) { rows[row].push(ch); if (row === 0) dir = 1; if (row === rails - 1) dir = -1; row += dir; }
      const c = rows.map(x => x.join('')).join('');
      return T(`Шифр «забор» (rail fence) с ${rails} рядами. Расшифруй: ${c}.`, w,
        `Длина ${c.length}. Размести символы зигзагом по ${rails} рядам: ряды получают ${rows.map(x => x.length).join(', ')} символов. Заполни ряды шифртекстом по порядку и прочитай зигзагом: ${w}.`);
    },
    'sheet-in-u2add': d => {
      const bits = d === 1 ? 6 : 8, lo = -(2 ** (bits - 1)), hi = 2 ** (bits - 1) - 1, x = r(lo, hi), y = r(lo, hi), s = x + y;
      const enc = v => (v < 0 ? 2 ** bits + v : v).toString(2).padStart(bits, '0');
      const wrapped = ((s % 2 ** bits) + 2 ** bits) % 2 ** bits, res = wrapped >= 2 ** (bits - 1) ? wrapped - 2 ** bits : wrapped, ov = s < lo || s > hi;
      return T(`${bits}-битный дополнительный код (U2): сложи ${x} и ${y}. Запиши слагаемые и сумму в двоичном виде и скажи, есть ли переполнение.`,
        `${enc(x)} + ${enc(y)} = ${wrapped.toString(2).padStart(bits, '0')} (${res}); переполнение: ${ov ? 'да' : 'нет'}`,
        `Диапазон ${lo}…${hi}. Истинная сумма ${s} ${ov ? 'выходит за диапазон, поэтому результат неверен (получилось ' + res + ')' : 'в диапазон входит'}. Сложение выполняется как обычное двоичное, перенос из старшего разряда отбрасывается.`);
    },
    'sheet-in-fraction': d => {
      const m = d === 1 ? 3 : d === 2 ? 4 : 5, k = r(1, 2 ** m - 1), x = k / 2 ** m, whole = d === 3 ? r(1, 20) : 0;
      const bin = k.toString(2).padStart(m, '0');
      const wb = whole.toString(2);
      return T(`Переведи десятичное число ${String(whole + x).replace('.', ',')} в двоичную систему.`, `${whole ? wb : '0'},${bin.replace(/0+$/, '') || '0'}`,
        `Целая часть ${whole}=(${whole ? wb : '0'})₂. Дробную часть ${String(x).replace('.', ',')} последовательно умножаем на 2 и записываем целые части: получаем ${bin.replace(/0+$/, '') || '0'}. Проверка: ${k}/${2 ** m}=${String(x).replace('.', ',')}.`);
    }
  };

  const gens = Object.assign({}, physics, analysis, algebra, foundations);
  const defs = {
    physics: [
      ['sheet-ph-friction', 'Трение: брусок под действием силы', 'physics-list-2'],
      ['sheet-ph-incline', 'Наклонная плоскость с трением', 'physics-list-2'],
      ['sheet-ph-table-hanging', 'Брусок на столе и груз на нити', 'physics-list-2'],
      ['sheet-ph-tied-bodies', 'Два бруска на нити под силой', 'physics-list-2'],
      ['sheet-ph-kinematics', 'Равноускоренное движение (как в лекциях)', 'physics-lectures'],
      ['sheet-ph-energy', 'Работа, энергия и трение', 'physics-lectures']
    ],
    analysis: [
      ['sheet-an-quantifiers', 'Кванторы: истинность и отрицание (лист 1)', 'analysis-list-1'],
      ['sheet-an-intervals', 'Интервалы: ∩, ∪, ∖ (лист 2)', 'analysis-list-2'],
      ['sheet-an-product', 'Декартово произведение и подмножества (лист 2)', 'analysis-list-2']
    ],
    algebra: [
      ['sheet-al-inverse', 'Обратная матрица 2×2', 'algebra-list-1'],
      ['sheet-al-equation', 'Матричное уравнение AX=B', 'algebra-list-1'],
      ['sheet-al-cholesky', 'Разложение Холецкого', 'algebra-list-1'],
      ['sheet-al-transpose', 'Произведение и транспонирование', 'algebra-list-1']
    ],
    foundations: [
      ['sheet-in-units', 'Единицы памяти и скорость передачи', 'informatics-notes'],
      ['sheet-in-rail', 'Шифр «забор»: расшифровка', 'informatics-list-1'],
      ['sheet-in-u2add', 'Сложение в U2 и переполнение', 'informatics-list-1'],
      ['sheet-in-fraction', 'Десятичное число в двоичное (с дробной частью)', 'informatics-list-1']
    ]
  };

  window.CLOUDPATH_EXTRA_PRACTICE ||= {};
  Object.entries(defs).forEach(([sub, list]) => {
    window.CLOUDPATH_EXTRA_PRACTICE[sub] ||= [];
    list.forEach(([id, title, lesson]) => {
      window.CLOUDPATH_EXTRA_PRACTICE[sub].push({ id, title, lesson, blurb: 'Тип как в готовых листах и конспектах; числа каждый раз новые.', items: [] });
    });
  });

  const hook = () => {
    const R = window.CloudPathRandom;
    if (!R || R.__sheets) return !!R;
    const orig = R.make;
    R.make = (subject, topic, level) => {
      const gen = topic && gens[topic.id];
      if (!gen) return orig(subject, topic, level);
      return gen(lvl(level));
    };
    R.__sheets = true;
    return true;
  };
  window.CloudPathSheetGens = gens;
  if (!hook()) document.addEventListener('DOMContentLoaded', hook);
})();
