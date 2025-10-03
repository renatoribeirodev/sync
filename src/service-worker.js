// Cole este código em service-worker.js
const CACHE_NAME = 'syncup-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Note que não precisamos mais do manifest aqui, pois ele é gerado dinamicamente
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});