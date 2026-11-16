/* Преобразует математику, записанную Unicode-символами, в LaTeX и рендерит MathJax. window.texify(root) */
(() => {
  const MAP = {
    '∀': '\\forall ', '∃': '\\exists ', '∈': '\\in ', '∉': '\\notin ', 'ℝ': '\\mathbb{R}', 'ℕ': '\\mathbb{N}', 'ℤ': '\\mathbb{Z}', 'ℚ': '\\mathbb{Q}',
    '⋃': '\\bigcup ', '⋂': '\\bigcap ', '∪': '\\cup ', '∩': '\\cap ', '∖': '\\setminus ', '∧': '\\land ', '∨': '\\lor ', '⇒': '\\Rightarrow ', '⇔': '\\Leftrightarrow ',
    '∼': '\\sim ', '≤': '\\le ', '≥': '\\ge ', '≠': '\\ne ', '≈': '\\approx ', '∞': '\\infty ', '∅': '\\emptyset ', '×': '\\times ', '·': '\\cdot ', '⟂': '\\perp ', '∥': '\\parallel ',
    '−': '-', '′': "'", '°': '^{\\circ}', 'φ': '\\varphi ', 'θ': '\\theta ', 'π': '\\pi ', 'α': '\\alpha ', 'β': '\\beta ', 'λ': '\\lambda ', 'ε': '\\varepsilon ', 'δ': '\\delta ', '⊂': '\\subset ', '⊆': '\\subseteq ', '⇐': '\\Leftarrow ', '→': '\\to ', '⊕': '\\oplus '
  };
  const SUP = { '²': '2', '³': '3', '⁴': '4', '⁵': '5', 'ⁿ': 'n', '¹': '1', '⁰': '0', 'ᵀ': 'T', '⁻': '-', '⁺': '+' };
  const SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', 'ₙ': 'n', '₊': '+', 'ₖ': 'k', 'ᵢ': 'i', 'ⱼ': 'j' };
  const STRONG = /[∀∃∈∉ℝℕℤℚ⋃⋂∪∩∖∧∨⇒⇔∼≤≥≠≈∞∅×·⟂∥−′√=<>+^²³⁴⁵ⁿᵀ₀₁₂₃ₙ₊⊂⊆]|\d\/|\/\d|°/;
  const CYR = /[А-Яа-яЁёĄąĆćĘęŁłŃńÓóŚśŹźŻż]/;
  const isN = t0 => { const t = t0.replace(/^[„“"«]+/, ''); return isN0(t); };
  const isN0 = t => !CYR.test(t) && (/^(det|sin|cos|ln|log|tg)\([^)]*\)[.,;:]*$/.test(t) || /^[(\[{]*[A-Za-zφθ][(A-Za-z0-9φθ,]{0,4}[)\]}]*[.,;:]*$/.test(t) && !/^[A-Za-z]{2,}/.test(t) && !/^[aiowzu][.,;:]*$/.test(t) || /^\d+[A-Za-z]?[)\]}]*[.,;:]*$/.test(t) || /^[(\[{]+[A-Za-z0-9,−\-]*[)\]}]*[.,;:]*$/.test(t) && !/^[(\[{]*[A-Za-z]{2,}/.test(t));
  const conv = s => {
    s = s.replace(/[{}]/g, m => '\\' + m);
    s = s.replace(/(\d),(\d)/g, '$1{,}$2');
    s = s.replace(/√\s*(\d+|[A-Za-z])/g, '\\sqrt{$1}').replace(/√/g, '\\surd ');
    s = s.replace(/\^\(([^()]*)\)/g, '^{$1}').replace(/\^(\d+)/g, '^{$1}');
    s = s.replace(/[²³⁴⁵ⁿ¹⁰ᵀ⁻⁺]+/g, m => '^{' + [...m].map(c => SUP[c]).join('') + '}');
    s = s.replace(/[₀₁₂₃ₙ₊ₖᵢⱼ]+/g, m => '_{' + [...m].map(c => SUB[c]).join('') + '}');
    s = s.replace(/./gu, c => MAP[c] !== undefined ? MAP[c] : c);
    s = s.replace(/\bdet\b/g, '\\det ');
    return s;
  };
  const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'MJX-CONTAINER', 'SVG', 'CODE', 'PRE']);
  const process = text => {
    if (text.includes('\\(') || !STRONG.test(text)) return null;
    const parts = text.split(/(\s+)/), cls = parts.map(p => /^\s*$/.test(p) ? 'S' : /^[·•|]$/.test(p) ? 'P' : (STRONG.test(p) && !CYR.test(p)) ? 'M' : isN(p) ? 'N' : 'P');
    const out = []; let i = 0, changed = false;
    while (i < parts.length) {
      if (cls[i] === 'S' || cls[i] === 'P') { out.push(parts[i]); i++; continue; }
      let j = i, last = i, hasM = false;
      while (j < parts.length) { if (cls[j] === 'M') { hasM = true; last = j; j++; } else if (cls[j] === 'N') { last = j; j++; } else if (cls[j] === 'S') j++; else break; }
      const run = parts.slice(i, last + 1);
      if (!hasM) { out.push(...run); i = last + 1; continue; }
      // обрезаем N-хвосты/начало без M-соседей: оставляем как есть, они уже смежные с M
      let body = run.join('');
      const lead = (body.match(/^[„“"«]+/) || [''])[0]; body = body.slice(lead.length);
      const trail = (body.match(/[.,;:”"»?!]+$/) || [''])[0]; body = body.slice(0, body.length - trail.length);
      out.push(lead, { tex: conv(body) }, trail); changed = true; i = last + 1;
    }
    return changed ? out : null;
  };
  const walk = root => {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => { for (let p = n.parentNode; p && p !== root.parentNode; p = p.parentNode) { if (p.nodeType === 1 && SKIP.has(p.nodeName.toUpperCase())) return NodeFilter.FILTER_REJECT; } return NodeFilter.FILTER_ACCEPT; } });
    const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(n => {
      const inMx = n.parentNode.closest && n.parentNode.closest('table.mx');
      const res = inMx && n.nodeValue.trim() && !n.nodeValue.includes('\\(') ? [{ tex: conv(n.nodeValue.trim()) }] : process(n.nodeValue); if (!res) return;
      const f = document.createDocumentFragment();
      res.forEach(x => f.appendChild(document.createTextNode(typeof x === 'string' ? x : '\\(' + x.tex + '\\)')));
      n.parentNode.replaceChild(f, n);
    });
  };
  let tries = 0;
  const typeset = root => {
    if (window.MathJax && MathJax.typesetPromise) { MathJax.typesetPromise([root]).catch(() => {}); }
    else if (tries++ < 100) setTimeout(() => typeset(root), 150);
  };
  window.texify = root => { root = root || document.getElementById('main-content') || document.body; walk(root); typeset(root); };
  window.texifyConv = conv;
})();
