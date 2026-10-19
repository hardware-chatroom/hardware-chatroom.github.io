import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';

const root = join(process.cwd(), 'out');
const pages = ['', 'projects/', 'notes/', 'about/', 'join/', 'en/', 'en/projects/', 'en/notes/', 'en/about/', 'en/join/'];
await writeFile(join(root, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + pages.map(path => `<url><loc>https://hardware-chatroom.github.io/${path}</loc></url>`).join('') + '</urlset>');
async function walk(dir) { const entries = await readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : join(dir, entry.name)))).flat(); }
const files = (await walk(root)).filter(file => !file.endsWith('.map') && !file.endsWith('sw.js')).sort();
const hash = createHash('sha256');
const urls = [];
for (const file of files) {
  const path = '/' + relative(root, file).split(sep).join('/');
  hash.update(path); hash.update(await readFile(file));
  urls.push(path.endsWith('/index.html') ? path.slice(0, -10) : path);
}
const version = hash.digest('hex').slice(0, 14);
const worker = `// Generated from the complete static export. Do not edit by hand.
const CACHE = 'hardware-chatroom-${version}';
const PRECACHE = ${JSON.stringify(urls)};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('hardware-chatroom-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => { if (event.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname === '/sw.js') return;
  if (request.headers.has('RSC')) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (request.mode === 'navigate') {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      try {
        const response = await fetch(request, { signal: controller.signal });
        // Keep HTML and its versioned JS from the same build together until the user accepts an update.
        if (response.ok) return response;
        if (response.status === 404) return (await cache.match('/404.html')) || response;
        throw new Error('Network response unavailable');
      } catch {
        const path = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
        return (await cache.match(path)) || (await cache.match(url.pathname)) || (await cache.match('/offline.html')) || Response.error();
      } finally { clearTimeout(timeout); }
    }
    const cached = await cache.match(url.pathname);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && (url.pathname.startsWith('/_next/') || /\\.(?:png|webp|svg|css|js|webmanifest)$/.test(url.pathname))) await cache.put(url.pathname, response.clone());
      return response;
    } catch { return Response.error(); }
  })());
});
`;
await writeFile(join(root, 'sw.js'), worker);
await writeFile(join(root, '.nojekyll'), '');
console.log(`PWA ${version}: ${urls.length} files precached, both languages available offline.`);
