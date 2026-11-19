/* Coursebook offline worker: keeps the app's own files on the device so it opens without internet.
   Your records and attachments are not here; they live in the browser's database (IndexedDB). */
const VERSION = "coursebook-v2";
const FONTS = "coursebook-fonts";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (req.mode === "navigate") {
      // Newest page when online, saved copy when offline.
      const isApp = url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
      e.respondWith(
        fetch(req)
          .then(r => { if (r.ok && isApp) { const copy = r.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); } return r; })
          .catch(async () => (isApp ? null : await caches.match(req)) || caches.match("./index.html"))
      );
      return;
    }
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(r => {
        if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return r;
      }))
    );
    return;
  }

  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const r = await fetch(req); c.put(req, r.clone()); return r; }
      catch { return new Response("", { status: 504 }); }
    }));
  }
});
