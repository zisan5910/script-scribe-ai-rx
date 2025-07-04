
const CACHE_NAME = 'print-poka-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const IMAGE_CACHE = 'images-v2';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

// Dynamic assets patterns
const DYNAMIC_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /^https:\/\/api\./,
];

// Image patterns
const IMAGE_PATTERNS = [
  /^https:\/\/images\.unsplash\.com/,
  /^https:\/\/picsum\.photos/,
  /\.(?:png|jpg|jpeg|webp|svg|gif)$/i
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(CACHE_NAME).then(cache => cache.addAll([
        '/',
        '/static/js/bundle.js',
        '/static/css/main.css'
      ]))
    ]).then(() => {
      console.log('Static assets cached');
      self.skipWaiting();
    })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && cacheName !== IMAGE_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Old caches cleaned');
      self.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different types of requests
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (DYNAMIC_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(handleDynamicRequest(request));
  } else if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
  } else {
    event.respondWith(handleStaticRequest(request));
  }
});

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Image request failed:', error);
    // Return a placeholder image if available
    const cache = await caches.open(IMAGE_CACHE);
    return cache.match('/placeholder.svg') || new Response('', { status: 404 });
  }
}

// Handle dynamic requests with network-first strategy
async function handleDynamicRequest(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Handle navigation requests
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(STATIC_CACHE);
    return cache.match('/') || cache.match('/offline.html');
  }
}

// Handle static requests with cache-first strategy
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Offline', { status: 503 });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'cart-sync') {
    event.waitUntil(syncCartData());
  } else if (event.tag === 'wishlist-sync') {
    event.waitUntil(syncWishlistData());
  }
});

// Sync cart data when online
async function syncCartData() {
  try {
    // Get offline cart data from IndexedDB
    const cartData = await getOfflineData('cart');
    if (cartData && cartData.length > 0) {
      // Sync with server when online
      console.log('Syncing cart data:', cartData);
      // Clear offline data after successful sync
      await clearOfflineData('cart');
    }
  } catch (error) {
    console.error('Cart sync failed:', error);
  }
}

// Sync wishlist data when online
async function syncWishlistData() {
  try {
    const wishlistData = await getOfflineData('wishlist');
    if (wishlistData && wishlistData.length > 0) {
      console.log('Syncing wishlist data:', wishlistData);
      await clearOfflineData('wishlist');
    }
  } catch (error) {
    console.error('Wishlist sync failed:', error);
  }
}

// Helper functions for IndexedDB operations
async function getOfflineData(store) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PrintPokaOffline', 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(store, 'readonly');
      const objectStore = transaction.objectStore(store);
      const getAllRequest = objectStore.getAll();
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };
    request.onerror = () => reject(request.error);
  });
}

async function clearOfflineData(store) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PrintPokaOffline', 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(store, 'readwrite');
      const objectStore = transaction.objectStore(store);
      const clearRequest = objectStore.clear();
      
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
    };
    request.onerror = () => reject(request.error);
  });
}
