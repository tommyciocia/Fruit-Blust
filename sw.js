// ═══════════════════════════════════════════
//  FruitBlast — Service Worker
//  Strategia: cache-first → funziona 100% offline
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
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './fruitblast_icon.svg',
];

// Install: pre-cacha tutti gli asset subito
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: cancella vecchie cache e notifica i client
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

// Fetch: CACHE-FIRST per tutto
// Offline = sempre dalla cache. Online = cache subito + aggiorna in background.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isLocal = url.origin === self.location.origin;

  // Richieste esterne (AdSense, Analytics, ecc.) — rete con fallback silenzioso
  if (!isLocal) {
    e.respondWith(
      fetch(e.request).catch(() => new Response('', { status: 503 }))
    );
    return;
  }

  // Tutti gli asset locali (incluso sw.js): cache-first, aggiorna in background
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE_VERSION).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => null);

      // Cache disponibile → rispondi subito, aggiorna in background
      // Cache non disponibile → aspetta la rete
      return cached || fetchPromise;
    })
  );
});
