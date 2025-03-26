const CACHE_NAME = "app-cache-v2"; // Increment to clear old cache
const urlsToCache = [
  "/", 
  "/index.html",
  "/manifest.json",
  "/vite.svg",
  "/service-worker.js",
  "/index.css",
  "/main.jsx",
  "/firebase.js",
  "/fetchMatch.js",
  "/pages/Home.jsx",
  "/pages/AdminLogin.jsx",
  "/pages/AdminPanel.jsx",
  "/pages/LiveScores.jsx",
  "/pages/PointsTable.jsx"
];


// Install event - Cache static files
self.addEventListener("install", (event) => {
  console.log("✅ Service Worker Installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - Serve cached files & cache Firebase data
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("firebase")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone()); // Cache Firebase response
            return response;
          });
        })
        .catch(() => caches.match(event.request)) // Serve cached response if offline
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});

// Activate event - Remove old caches
self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker Activated");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🗑️ Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
