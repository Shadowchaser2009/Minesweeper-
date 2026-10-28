const CACHE_NAME = 'my-app-cache-v1';

// List all the relative paths of files you want to work offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',   // Change or remove depending on your app's actual filenames
  './script.js'    // Change or remove depending on your app's actual filenames
];

// 1. Install Event: Saves resources into the browser cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Cleans up old caches when you update version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event: Intercepts network requests and serves cached files if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached file if found, otherwise fetch from network
      return cachedResponse || fetch(event.request);
    })
  );

});
