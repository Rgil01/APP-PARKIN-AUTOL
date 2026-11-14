/* Service worker: permite que la app funcione sin conexión una vez cargada */
const CACHE = 'parkin-autol-v2';
const ARCHIVOS = [
  './', './index.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png',
  './Parkingautol.png',
  './lib/jspdf.umd.min.js',
  './lib/exceljs.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.allSettled(ARCHIVOS.map(a => c.add(a)))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(resp => {
      const red = fetch(e.request).then(r => {
        if (r && (r.status === 200 || r.type === 'opaque')) caches.open(CACHE).then(c => c.put(e.request, r.clone()));
        return r;
      }).catch(() => resp);
      return resp || red;
    })
  );
});
