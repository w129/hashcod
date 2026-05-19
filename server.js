// opencriptG local server — no external npm packages required.
// Run: npm start
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 2340);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/babel; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=()',
  // Babel standalone needs unsafe-eval and inline scripts in this local build.
  // Keep external script/style origins explicit until the app is bundled.
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join('; ')
};

function send(res, status, headers, body) {
  res.writeHead(status, Object.assign({}, SECURITY_HEADERS, headers || {}));
  res.end(body);
}

function enterpriseManifest() {
  const catalogPath = path.join(ROOT, 'data', 'catalog.js');
  const generatorPath = path.join(ROOT, 'data', 'generators.js');
  return JSON.stringify({
    app: 'opencriptG',
    profile: 'enterprise-production-baseline',
    servedAt: new Date().toISOString(),
    host: HOST,
    port: PORT,
    localOnly: HOST === '127.0.0.1' || HOST === 'localhost',
    controls: [
      'security headers',
      'no-store caching',
      'path traversal guard',
      'browser crypto self-tests',
      'catalog duplicate-id gate',
      'NEO 200 completeness gate'
    ],
    files: {
      catalogBytes: fs.existsSync(catalogPath) ? fs.statSync(catalogPath).size : 0,
      generatorsBytes: fs.existsSync(generatorPath) ? fs.statSync(generatorPath).size : 0
    }
  }, null, 2);
}

function safePath(urlPath) {
  let clean = '/';
  try {
    clean = decodeURIComponent(String(urlPath || '/').split('?')[0]).replace(/\\/g, '/');
  } catch {
    return null;
  }
  const target = clean === '/' ? 'index.html' : clean.replace(/^\/+/, '');
  const full = path.resolve(ROOT, target);
  const rel = path.relative(ROOT, full);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  if ((req.url || '').split('?')[0] === '/enterprise/manifest.json') {
    send(res, 200, { 'Content-Type': MIME['.json'] }, enterpriseManifest());
    return;
  }

  const filePath = safePath(req.url || '/');
  if (!filePath) {
    send(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(ROOT, 'index.html'), (fallbackErr, fallback) => {
        if (fallbackErr) {
          send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not found');
          return;
        }
        send(res, 200, { 'Content-Type': MIME['.html'] }, fallback);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, { 'Content-Type': MIME[ext] || 'application/octet-stream' }, data);
  });
});

server.listen(PORT, HOST, () => {
  console.log('────────────────────────────────────────');
  console.log(' opencriptG servidor local iniciado');
  console.log(` URL: http://${HOST}:${PORT}`);
  console.log(' Para cerrar: Ctrl + C');
  console.log('────────────────────────────────────────');
});
