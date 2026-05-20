// Hashcod local server — no external npm packages required.
// Run: npm start
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 2340);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = __dirname;
const DATA_DIR = process.env.HASHCOD_DATA_DIR || path.join(ROOT, 'runtime-data');
const HELP_REQUESTS_FILE = path.join(DATA_DIR, 'assist-requests.json');
const CLI_CONSOLE_FILE = path.join(DATA_DIR, 'cli-console.json');

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

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function safeText(value, max = 500) {
  return String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

function readAssistRequests() {
  try {
    ensureDataDir();
    const raw = fs.existsSync(HELP_REQUESTS_FILE) ? fs.readFileSync(HELP_REQUESTS_FILE, 'utf8') : '[]';
    const rows = JSON.parse(raw);
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function writeAssistRequests(rows) {
  ensureDataDir();
  fs.writeFileSync(HELP_REQUESTS_FILE, JSON.stringify(rows.slice(0, 500), null, 2));
}

function readCliConsole() {
  try {
    ensureDataDir();
    const raw = fs.existsSync(CLI_CONSOLE_FILE) ? fs.readFileSync(CLI_CONSOLE_FILE, 'utf8') : '[]';
    const rows = JSON.parse(raw);
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function writeCliConsole(rows) {
  ensureDataDir();
  fs.writeFileSync(CLI_CONSOLE_FILE, JSON.stringify(rows.slice(0, 1000), null, 2));
}

async function handleAssistRequests(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET') {
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, requests: readAssistRequests() }, null, 2));
    return;
  }
  if (req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const row = {
        id: `assist_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
        email: safeText(body.email, 180),
        whatsapp: safeText(body.whatsapp, 60),
        note: safeText(body.note, 600),
        codeType: safeText(body.codeType, 120),
        primitive: safeText(body.primitive, 180),
        codeIndex: safeText(body.codeIndex, 20),
        codePreview: safeText(body.codePreview, 220),
        codeHash: safeText(body.codeHash, 80),
        createdAt: new Date().toISOString(),
        status: 'OPEN'
      };
      if (!row.email || !row.whatsapp) {
        send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'email_and_whatsapp_required' }));
        return;
      }
      const rows = [row, ...readAssistRequests()].slice(0, 500);
      writeAssistRequests(rows);
      send(res, 201, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, request: row }, null, 2));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (req.method === 'DELETE') {
    const id = safeText(url.searchParams.get('id'), 120);
    const before = readAssistRequests();
    const rows = before.filter(row => row.id !== id);
    writeAssistRequests(rows);
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, deleted: before.length - rows.length }));
    return;
  }
  send(res, 405, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'method_not_allowed' }));
}

async function handleCliConsole(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET') {
    const ownerKey = safeText(url.searchParams.get('ownerKey'), 120);
    const rows = readCliConsole().filter(row => row.status !== 'PURGED').map(row => {
      const { ownerKey: storedOwnerKey, ...publicRow } = row;
      return { ...publicRow, isOwner: !!ownerKey && storedOwnerKey === ownerKey };
    });
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, entries: rows }, null, 2));
    return;
  }
  if (req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const text = safeText(body.text, 6000);
      const ownerKey = safeText(body.ownerKey, 120);
      if (!text || !ownerKey) {
        send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'text_and_owner_required' }));
        return;
      }
      const row = {
        id: `cli_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
        title: safeText(body.title, 120) || 'CLI note',
        text,
        ownerKey,
        author: safeText(body.author, 80) || 'anonymous',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const rows = [row, ...readCliConsole()].slice(0, 1000);
      writeCliConsole(rows);
      send(res, 201, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, entry: row }, null, 2));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (req.method === 'PUT') {
    try {
      const body = await readJsonBody(req);
      const id = safeText(body.id, 120);
      const rows = readCliConsole();
      const now = new Date().toISOString();
      let updated = null;
      const next = rows.map(row => {
        if (row.id !== id) return row;
        updated = {
          ...row,
          title: safeText(body.title, 120) || row.title,
          text: safeText(body.text, 6000),
          editor: safeText(body.editor, 80) || 'anonymous',
          status: row.status === 'HIDDEN' ? 'HIDDEN' : 'ACTIVE',
          updatedAt: now,
        };
        return updated;
      });
      writeCliConsole(next);
      send(res, updated ? 200 : 404, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: !!updated, entry: updated }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (req.method === 'DELETE') {
    const id = safeText(url.searchParams.get('id'), 120);
    const ownerKey = safeText(url.searchParams.get('ownerKey'), 120);
    const permanent = url.searchParams.get('permanent') === '1';
    const rows = readCliConsole();
    const target = rows.find(row => row.id === id);
    if (!target) {
      send(res, 404, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'not_found' }));
      return;
    }
    if (permanent) {
      if (!ownerKey || target.ownerKey !== ownerKey) {
        send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'creator_only' }));
        return;
      }
      writeCliConsole(rows.filter(row => row.id !== id));
      send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, purged: 1 }));
      return;
    }
    const next = rows.map(row => row.id === id ? { ...row, status: 'HIDDEN', updatedAt: new Date().toISOString() } : row);
    writeCliConsole(next);
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, hidden: 1 }));
    return;
  }
  send(res, 405, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'method_not_allowed' }));
}

function enterpriseManifest() {
  const catalogPath = path.join(ROOT, 'data', 'catalog.js');
  const generatorPath = path.join(ROOT, 'data', 'generators.js');
  return JSON.stringify({
    app: 'Hashcod',
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
  if ((req.url || '').split('?')[0] === '/api/assist-requests') {
    handleAssistRequests(req, res);
    return;
  }

  if ((req.url || '').split('?')[0] === '/api/cli-console') {
    handleCliConsole(req, res);
    return;
  }

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
  console.log(' Hashcod servidor local iniciado');
  console.log(` URL: http://${HOST}:${PORT}`);
  console.log(' Para cerrar: Ctrl + C');
  console.log('────────────────────────────────────────');
});
