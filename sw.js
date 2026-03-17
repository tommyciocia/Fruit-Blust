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

// Fetch: CACHE-FIRST
//  1. sw.js → sempre dalla rete (per rilevare aggiornamenti)
//  2. Tutto il resto → cache prima, poi rete come fallback
//     Se la rete risponde, aggiorna la cache in background
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // sw.js sempre fresco dalla rete
  if (e.request.url.endsWith('sw.js')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Font Google: cache-first pura (non bloccare offline per font mancanti)
  if (e.request.url.includes('fonts.googleapis.com') || e.request.url.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(resp => {
          const clone = resp.clone();
          caches.open(CACHE_VERSION).then(c => c.put(e.request, clone));
          return resp;
        }).catch(() => new Response('', { status: 408 }));
      })
    );
    return;
  }

  // App assets: cache-first, aggiorna in background
  e.respondWith(
    caches.match(e.request).then(cached => {
      // Aggiorna cache in background se online
      const fetchPromise = fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE_VERSION).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => null);

      // Restituisci subito dalla cache se disponibile, altrimenti aspetta la rete
      return cached || fetchPromise;
    })
  );
});
