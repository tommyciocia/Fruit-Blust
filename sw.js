// ═══════════════════════════════════════════
//  FruitBlast — Service Worker
//  Aggiorna il timestamp qui sotto ad ogni commit
//  oppure usa il GitHub Action per farlo in automatico.
//  Basta che questo numero sia diverso dall'ultima volta.
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
];

// Install: scarica tutti i file freschi dal server
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // non aspettare, attivati subito
  );
});

// Activate: cancella TUTTE le vecchie cache, poi prendi controllo
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => {
        // Dice a tutte le pagine aperte: ricaricati ora
        clients.forEach(client => client.postMessage({ type: 'SW_UPDATED' }));
      })
  );
});

// Fetch: prova sempre la rete prima, cache solo se offline
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
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
