// ═══════════════════════════════════════════
//  FruitBlast — Service Worker
//  Cambia CACHE_VERSION ogni deploy per forzare aggiornamento
// ═══════════════════════════════════════════

const CACHE_VERSION = 'fruitblast-v13';
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

// Install: metti in cache tutti i file
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // attiva subito senza aspettare il reload
  );
});

// Activate: elimina tutte le vecchie cache
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_VERSION)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim()) // prendi controllo di tutte le tab aperte
  );
});

// Fetch: network first, poi cache come fallback
// Così vedi sempre i file aggiornati se sei online
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Aggiorna la cache con la risposta fresca
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(e.request)) // offline: usa cache
  );
});
