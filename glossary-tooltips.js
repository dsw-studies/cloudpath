(() => {
  const definitions = {
    API: 'Интерфейс, через который программы обмениваются данными и командами.',
    CLI: 'Текстовый интерфейс для управления программой через команды в терминале.',
    DNS: 'Система, которая сопоставляет доменные имена с IP-адресами.',
    Git: 'Система контроля версий для отслеживания изменений в коде.',
    IDE: 'Приложение для написания, запуска и отладки кода.',
    JSON: 'Текстовый формат хранения и передачи структурированных данных.',
    RKM: 'Рекомендуемый курс обучения или набор дисциплин в учебном плане.',
    SSH: 'Защищённый протокол удалённого подключения к компьютеру или серверу.',
    YAML: 'Читаемый текстовый формат конфигурационных файлов.'
  };
  const root = document.querySelector('.main');
  if (!root || document.body.dataset.tooltipsReady) return;
  document.body.dataset.tooltipsReady = 'true';

  const tooltip = document.createElement('div');
  tooltip.className = 'glossary-tooltip';
  tooltip.hidden = true;
  tooltip.setAttribute('role', 'tooltip');
  document.body.append(tooltip);

  const escaped = Object.keys(definitions).map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'g');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || /^(A|CODE|PRE|SCRIPT|STYLE|TEXTAREA)$/.test(parent.tagName) || parent.closest('.glossary-term')) return NodeFilter.FILTER_REJECT;
      pattern.lastIndex = 0;
      return pattern.test(node.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    pattern.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let last = 0;
    node.data.replace(pattern, (match, term, offset) => {
      frag.append(node.data.slice(last, offset));
      const span = document.createElement('span');
      span.className = 'glossary-term';
      span.tabIndex = 0;
      span.dataset.definition = definitions[term];
      span.textContent = match;
      frag.append(span);
      last = offset + match.length;
      return match;
    });
    frag.append(node.data.slice(last));
    node.replaceWith(frag);
  });

  const show = target => {
    tooltip.textContent = target.dataset.definition;
    tooltip.hidden = false;
    const rect = target.getBoundingClientRect();
    const left = Math.min(window.innerWidth - tooltip.offsetWidth - 12, Math.max(12, rect.left));
    let top = rect.bottom + 8;
    if (top + tooltip.offsetHeight > window.innerHeight - 12) top = rect.top - tooltip.offsetHeight - 8;
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${Math.max(12, top)}px`;
  };
  const hide = () => { tooltip.hidden = true; };
  root.addEventListener('pointerover', e => e.target.matches('.glossary-term') && show(e.target));
  root.addEventListener('pointerout', e => e.target.matches('.glossary-term') && hide());
  root.addEventListener('focusin', e => e.target.matches('.glossary-term') && show(e.target));
  root.addEventListener('focusout', e => e.target.matches('.glossary-term') && hide());
})();
