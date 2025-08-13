// A unique name for our cache
const CACHE_NAME = 'tradeflow-v1';

// The list of files we want to cache. 
// IMPORTANT: The first item './' is the main HTML file itself.
const urlsToCache = [
  './',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/idb@7/build/umd.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
];

// Install event: fires when the service worker is first installed.
self.addEventListener('install', event => {
  // We wait until the installation is complete
  event.waitUntil(
    // Open the cache
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all the specified files to the cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: fires every time the app requests a resource (e.g., a file or data).
self.addEventListener('fetch', event => {
  event.respondWith(
    // Check if the requested resource is in our cache
    caches.match(event.request)
      .then(response => {
        // If we found it in the cache, return it
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the network
        return fetch(event.request);
      }
    )
  );
});
