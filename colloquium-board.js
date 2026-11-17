/* Adds a drawing board (practice-board.js) to every task card of the colloquium generators. */
(() => {
  const css = `.solution-board{margin:14px 0;border:1px solid #304a60;border-radius:12px;overflow:hidden;background:#0b1825}
.solution-board>summary{cursor:pointer;padding:12px 16px;color:#4fd8c4;font-weight:650}
.board-body{padding:0 14px 14px}
.board-tools{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:6px 0}
.board-tools button{background:#14283a;border:1px solid #34536b;color:#dceaf2;margin:0;padding:9px 11px;min-height:40px;border-radius:8px;cursor:pointer;font:600 12px ui-monospace,Consolas,monospace}
.board-tools button[aria-pressed="true"]{background:#4fd8c4;color:#071a18;border-color:#4fd8c4}
.board-tools button:disabled{opacity:.4;cursor:default}
.board-tools label{display:flex;align-items:center;gap:7px;font-size:12px;color:#a8bccd;min-height:40px}
.board-color{width:34px;height:32px;border:1px solid #34536b;padding:2px;background:#14283a;border-radius:5px;cursor:pointer}
.board-width{width:80px;accent-color:#4fd8c4}
.board-hint,.board-status{font-size:12px;color:#91a4b8;line-height:1.5;margin:9px 0}
.board-status{color:#6edac7}
.board-paper{background-color:#fbfcfd;background-image:linear-gradient(#dce7ef 1px,transparent 1px),linear-gradient(90deg,#dce7ef 1px,transparent 1px);background-size:24px 24px;border-radius:8px;border:1px solid #acc1d2;overflow:hidden}
.board-paper canvas{display:block;width:100%;height:auto;aspect-ratio:5/3;touch-action:none;cursor:crosshair;user-select:none;-webkit-user-select:none}
.board-paper canvas.erasing{cursor:cell}
@media(max-width:600px){.board-body{padding:0 8px 8px}.board-tools{gap:6px}.board-tools button{padding:8px;font-size:11px}.board-width{width:60px}.board-paper canvas{min-height:280px}}`;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function attach(app) {
    if (!window.CloudPathBoard) return;
    app.querySelectorAll('.lesson-card').forEach(card => {
      if (card.querySelector('.solution-board')) return;
      const num = card.querySelector('.lesson-number');
      if (!num || !/^(ZADANIE|ЗАДАНИЕ)/i.test(num.textContent.trim())) return;
      const btn = card.querySelector('button');
      const anchor = btn ? btn.parentElement : null;
      const wrap = document.createElement('div');
      wrap.innerHTML = window.CloudPathBoard.markup();
      const board = wrap.firstElementChild;
      if (anchor && anchor.parentElement === card) card.insertBefore(board, anchor);
      else card.appendChild(board);
    });
  }

  function init() {
    const app = document.getElementById('app');
    if (!app) return;
    app.addEventListener('toggle', e => {
      const d = e.target;
      if (!d.matches || !d.matches('.solution-board') || !d.open) return;
      window.CloudPathBoard.mount(d, { board: [] }, () => true);
    }, true);
    new MutationObserver(() => attach(app)).observe(app, { childList: true });
    attach(app);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
