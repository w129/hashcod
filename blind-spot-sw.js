const BLIND_SPOT_CACHE = 'blind-spot-shell-v1';
const BLIND_SPOT_ASSETS = [
  '/blind-spot-shell.html',
  '/blindspot.html',
  '/app/hashcod-platform-icon.svg?v=blind-spot-shell',
  '/app/hashcod-platform-icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(BLIND_SPOT_CACHE)
      .then((cache) => cache.addAll(BLIND_SPOT_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('blind-spot-shell-') && key !== BLIND_SPOT_CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const allowed = url.pathname === '/blind-spot-shell.html'
    || url.pathname === '/blindspot.html'
    || url.pathname === '/app/hashcod-platform-icon.svg';
  if (!allowed || event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(BLIND_SPOT_CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
