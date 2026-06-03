/* Self-destructing ("kill-switch") service worker.
 *
 * An earlier version of this file was a cache-first worker that pinned players to a stale,
 * cached index.html — so they got stuck on an old/broken UI and never received updates.
 *
 * This replacement does the opposite: as soon as a stuck browser picks it up (on the next
 * launch / navigation, via the normal SW update check), it deletes all caches, unregisters
 * itself, and reloads any open windows so they load the fresh page from the network.
 *
 * IMPORTANT: this only clears the HTTP/asset caches and the worker registration. It does NOT
 * touch localStorage, so the player's game save (catMonopolySave_v3) is fully preserved. The
 * tab simply reloads into the up-to-date game with all progress intact — no Save Key needed.
 *
 * index.html no longer registers any service worker, so once a client is healed it stays
 * worker-free; this file is only ever fetched by browsers that still hold the old registration.
 */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        try { client.navigate(client.url); } catch (e) {}
      }
    } catch (e) { /* best-effort cleanup */ }
  })());
});

// While this worker is briefly active, always go to the network (never serve the old cache),
// falling back to cache only if offline.
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
