const CACHE = 'cloudpath-v76';
const CORE = [
  'content-i18n.js',
  '/practice-random.js',
  '/practice-sheets.js',
  '/practice-board.js',
  '/practice-studio.css',
  '/practice-session.js',
  '/',
  '/index.html',
  '/lessons-2026-10-23.html',
  '/laplace-2026-10-23.html',
  '/study-materials.html',
  '/physics-list-1.html',
  '/physics-lectures.html',
  '/physics-list-2.html',
  '/physics-list-3.html',
  '/physics-lectures-5.html',
  '/physics-2026-10-30.html',
  '/mathematics-2026-10-30.html',
  '/python-basics.html',
  '/informatics-review.html',
  '/python-trainer.html',
  '/informatics-2026-11-09.html',
  '/python-2026-11-06.html',
  '/licenses-2026-11-16.html',
  '/algebra-2026-11-13.html',
  '/analysis-2026-11-13.html',
  '/python-2026-10-30.html',
  '/asd-zero.html',
  '/physics-zero.html',
  '/algorithms-2026-11-13.html',
  '/colloquium-phys.html',
  '/colloquium-phys.js',
  '/practice-sheets.js',
  '/informatics-list-1.html',
  '/informatics-notes.html',
  '/informatics-theory.html',
  '/colloquium.html',
  '/colloquium-an1.js',
  '/colloquium-alg1.html',
  '/colloquium-alg1.js',
  '/texify.js','/colloquium-board.js',
  '/informatics-architecture.html',
  '/algebra-list-1.html',
  '/analysis-list-1.html',
  '/analysis-list-2.html',
  '/dashboard.css',
  '/dashboard.js',
  '/dashboard-i18n.js',
  '/study-table.css',
  '/study-sections.css',
  '/study-fix.css',
  '/study-table.js',
  '/schedule.html',
  '/stypendium.html',
  '/deadlines.html',
  '/subject-cards.html',
  '/student-guide.html',
  '/lectures.html',
  '/lecture-math.css',
  '/october-math-practice.js',
  '/polynomials-vieta-2026-10-27.html',
  '/rational-functions-2026-10-28.html',
  '/logarithms-2026-10-28.html',
  '/sequences-2026-10-28.html',
  '/limits-series-2026-10-28.html',
  '/assets/math-20261028/geometric.svg',
  '/assets/math-20261028/hyperbola.svg',
  '/assets/math-20261028/limit.svg',
  '/assets/math-20261028/logs.svg',
  '/assets/math-20261028/polynomial.svg',
  '/assets/math-20261028/rational-sign.svg',
  '/assets/math-20261028/sequence-quadratic.svg',
  '/assets/math-20261028/series.svg',

  '/quadratic-functions-2026-10-27.html',
  '/tasks.html',
  '/practice.html',
  '/practice.js',
  '/practice-extra-data.js',
  '/practice-extra-generators.js',
  '/practice-generators.js',
  '/sets-practice-data.js',
  '/material.html',
  '/material.js',
  '/bundle.html',
  '/bundle.js',
  '/authored-study.css',
  '/physics-authored.js',
  '/study-hub.html',
  '/schedule.js',
  '/enhanced.css',
  '/site-enhancements.js',
  '/plan-48.js',
  '/search-data.js',
  '/search-widget.js',
  '/glossary-tooltips.js',
  '/cloudpath-icon.svg',
  '/404.html'
];

self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE)
    .then(cache => cache.addAll(CORE))
    .then(() => self.skipWaiting())
));

self.addEventListener('activate', event => event.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(key => key.startsWith('cloudpath-') && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim())
));

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== location.origin) return;
  // Large PDFs and partial (Range) responses are not worth caching: they bloat
  // storage and cache.put() rejects 206 responses anyway.
  const cacheable = !url.pathname.endsWith('.pdf') && !event.request.headers.has('range');
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (cacheable && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true }).then(hit => hit || (event.request.mode === 'navigate' ? caches.match('/') : Response.error())))
  );
});
