// ═══════════════════════════════════════════
//  FruitBlast — Service Worker
//  Il CACHE_VERSION viene aggiornato automaticamente
//  dal GitHub Action ad ogni push su main/master.
// ═══════════════════════════════════════════
const CACHE_VERSION = 'fruitblast-20250314-1';

const ASSETS = [
  './',
  './index.html',
  './game.html',
  './objectives.html',
  './settings.html',
  './shop.html',
  './style.css',
  './data.js',
  './foto_sfondo.png',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// Install: scarica tutti i file freschi, NON cachare sw.js
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: cancella tutte le vecchie cache
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => {
        clients.forEach(client => client.postMessage({ type: 'SW_UPDATED' }));
      })
  );
});

// Fetch: sw.js viene sempre preso dalla rete (mai da cache!)
// Tutti gli altri asset: network-first, fallback cache
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Non cachare mai il service worker stesso
  if (e.request.url.endsWith('sw.js')) {
    e.respondWith(fetch(e.request));
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
