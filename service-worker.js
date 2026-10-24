const CACHE = 'cloudpath-v26';
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
  '/cloudpath-icon.svg'
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
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request).then(hit => hit || (event.request.mode === 'navigate' ? caches.match('/') : Response.error())))
  );
});
