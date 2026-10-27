const CACHE = 'cloudpath-v32';
const CORE = [
  '/',
  '/index.html',
  '/lessons-2026-10-23.html',
  '/laplace-2026-10-23.html',
  '/study-materials.html',
  '/physics-list-1.html',
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
  '/lectures.html',
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
