// Hashcod local server — no external npm packages required.
// Run: npm start
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 2340);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = __dirname;
const DATA_DIR = process.env.HASHCOD_DATA_DIR || path.join(ROOT, 'runtime-data');
const HELP_REQUESTS_FILE = path.join(DATA_DIR, 'assist-requests.json');
const CLI_CONSOLE_FILE = path.join(DATA_DIR, 'cli-console.json');
const AUDIT_FILE = path.join(DATA_DIR, 'security-audit.jsonl');
const AUTH_DB_FILE = path.join(DATA_DIR, 'auth-db.enc');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const RATE_WINDOW_MS = 60 * 1000;
const RATE_LIMITS = { GET: 240, POST: 45, PUT: 45, DELETE: 30 };
const rateBuckets = new Map();
const userBuckets = new Map();
const sessions = new Map();
const adminPanelSessions = new Map();
const ADMIN_PANEL_KEY_HASH = process.env.HASHCOD_ADMIN_PANEL_KEY_HASH || '1ec68bc0422b5353ae0f975cd2a8fe82deda1559f565d98d44f6e732e63c1cca';

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
    "frame-ancestors 'none'",
    ...(process.env.NODE_ENV === 'production' ? ["upgrade-insecure-requests"] : [])
  ].join('; ')
};

function send(res, status, headers, body) {
  res.writeHead(status, Object.assign({}, SECURITY_HEADERS, headers || {}));
  res.end(body);
}

function clientIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || req.socket.remoteAddress || 'unknown';
}

function rateLimit(req, res) {
  const key = `${clientIp(req)}:${req.method}`;
  const limit = RATE_LIMITS[req.method] || 120;
  const now = Date.now();
  const bucket = rateBuckets.get(key) || { start: now, count: 0 };
  if (now - bucket.start > RATE_WINDOW_MS) {
    bucket.start = now;
    bucket.count = 0;
  }
  bucket.count += 1;
  rateBuckets.set(key, bucket);
  if (bucket.count > limit) {
    send(res, 429, { 'Content-Type': MIME['.json'], 'Retry-After': '60' }, JSON.stringify({ ok: false, error: 'rate_limited' }));
    return false;
  }
  return true;
}

function authenticatedRateLimit(auth, req, res) {
  if (!auth?.user?.id || ['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return true;
  const key = `${auth.user.id}:${req.method}`;
  const now = Date.now();
  const bucket = userBuckets.get(key) || { start: now, count: 0 };
  if (now - bucket.start > RATE_WINDOW_MS) {
    bucket.start = now;
    bucket.count = 0;
  }
  bucket.count += 1;
  userBuckets.set(key, bucket);
  if (bucket.count > 90) {
    audit('rate.user_limited', { ip: clientIp(req), actor: auth.user.id, method: req.method });
    send(res, 429, { 'Content-Type': MIME['.json'], 'Retry-After': '60' }, JSON.stringify({ ok: false, error: 'user_rate_limited' }));
    return false;
  }
  return true;
}

function audit(event, data = {}) {
  try {
    ensureDataDir();
    const row = JSON.stringify({ at: new Date().toISOString(), event, ...data });
    fs.appendFileSync(AUDIT_FILE, `${row}\n`);
  } catch {
    // Audit failures must not break the app.
  }
}

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function dailyStamp() {
  return new Date().toISOString().slice(0, 10);
}

function backupFileIfExists(filePath, prefix, stamp) {
  if (!fs.existsSync(filePath)) return null;
  const target = path.join(BACKUP_DIR, `${stamp}-${prefix}-${path.basename(filePath)}`);
  if (!fs.existsSync(target)) fs.copyFileSync(filePath, target);
  return target;
}

function ensureAutomaticBackup(reason = 'write') {
  try {
    ensureDataDir();
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const stamp = dailyStamp();
    const manifest = path.join(BACKUP_DIR, `${stamp}-manifest.json`);
    if (fs.existsSync(manifest)) return;
    const files = [
      backupFileIfExists(AUTH_DB_FILE, 'auth', stamp),
      backupFileIfExists(HELP_REQUESTS_FILE, 'assist', stamp),
      backupFileIfExists(CLI_CONSOLE_FILE, 'cli', stamp),
      backupFileIfExists(AUDIT_FILE, 'audit', stamp),
    ].filter(Boolean).map(file => path.basename(file));
    fs.writeFileSync(manifest, JSON.stringify({ app: 'Hashcod', createdAt: new Date().toISOString(), reason, files }, null, 2));
    audit('backup.automatic', { reason, files: files.length });
  } catch {
    // Backups are best-effort and must not block critical writes.
  }
}

function readAuditRows(limit = 120) {
  try {
    if (!fs.existsSync(AUDIT_FILE)) return [];
    return fs.readFileSync(AUDIT_FILE, 'utf8')
      .split(/\r?\n/)
      .filter(Boolean)
      .slice(-Math.min(Math.max(Number(limit) || 120, 1), 500))
      .map(line => {
        try { return JSON.parse(line); } catch { return { raw: line }; }
      })
      .reverse();
  } catch {
    return [];
  }
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

function validEmail(email) {
  const value = safeText(email, 180).toLowerCase();
  return /^[^\s@]{1,80}@[^\s@.][^\s@]{1,120}\.[^\s@]{2,24}$/.test(value) && !/[<>"'`]/.test(value);
}

function validWhatsapp(value) {
  const phone = safeText(value, 60);
  return /^\+?[0-9][0-9\s().-]{6,24}$/.test(phone);
}

function moderationReason(value = '') {
  const text = String(value || '');
  const lower = text.toLowerCase();
  if (/(https?:\/\/|www\.)/i.test(text) && !/hashcod|localhost|127\.0\.0\.1/i.test(text)) return 'external_link_blocked';
  if (/(<script|javascript:|onerror\s*=|onload\s*=|data:text\/html)/i.test(text)) return 'script_payload_blocked';
  if (/(drop\s+table|union\s+select|insert\s+into|delete\s+from|curl\s+.+\|\s*sh|powershell\s+-enc)/i.test(lower)) return 'dangerous_payload_blocked';
  if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(text)) return 'private_key_blocked';
  if (/\b(?:sk|ghp|github_pat|xox[baprs])_[A-Za-z0-9_=-]{16,}\b/.test(text)) return 'secret_token_blocked';
  return null;
}

function redactSecrets(value = '') {
  let text = String(value || '');
  text = text.replace(/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, '[REDACTED_PRIVATE_KEY]');
  text = text.replace(/\b(?:api[_-]?key|secret|token|password|passwd|bearer|authorization)\s*[:=]\s*["']?[A-Za-z0-9._~+/=-]{12,}["']?/gi, (m) => {
    const label = (m.split(/[:=]/)[0] || 'secret').trim();
    return `${label}=[REDACTED]`;
  });
  text = text.replace(/\b(?:sk|pk|ghp|github_pat|xox[baprs])_[A-Za-z0-9_=-]{16,}\b/g, '[REDACTED_TOKEN]');
  text = text.replace(/\b[A-Za-z0-9+/]{40,}={0,2}\b/g, '[REDACTED_LONG_SECRET]');
  return text;
}

function safePublicText(value, max = 500) {
  return safeText(redactSecrets(value), max);
}

function validatePublicPayload(fields) {
  for (const [name, value] of Object.entries(fields || {})) {
    const reason = moderationReason(value);
    if (reason) return { ok: false, field: name, reason };
  }
  return { ok: true };
}

function b64url(buf) {
  return Buffer.from(buf).toString('base64url');
}

function authSecretKey() {
  const secret = process.env.HASHCOD_SECRET || 'hashcod-dev-secret-change-me-before-production';
  return crypto.createHash('sha256').update(secret).digest();
}

function encryptJson(data) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', authSecretKey(), iv);
  const plain = Buffer.from(JSON.stringify(data), 'utf8');
  const enc = Buffer.concat([cipher.update(plain), cipher.final()]);
  const tag = cipher.getAuthTag();
  return JSON.stringify({ v: 1, alg: 'AES-256-GCM', iv: b64url(iv), tag: b64url(tag), data: b64url(enc) }, null, 2);
}

function decryptJson(raw, fallback) {
  try {
    const box = JSON.parse(raw);
    if (!box || box.alg !== 'AES-256-GCM') return fallback;
    const decipher = crypto.createDecipheriv('aes-256-gcm', authSecretKey(), Buffer.from(box.iv, 'base64url'));
    decipher.setAuthTag(Buffer.from(box.tag, 'base64url'));
    const out = Buffer.concat([decipher.update(Buffer.from(box.data, 'base64url')), decipher.final()]);
    return JSON.parse(out.toString('utf8'));
  } catch {
    return fallback;
  }
}

function readAuthDb() {
  ensureDataDir();
  if (!fs.existsSync(AUTH_DB_FILE)) return { users: [], accessRequests: [] };
  const db = decryptJson(fs.readFileSync(AUTH_DB_FILE, 'utf8'), { users: [], accessRequests: [] });
  return { users: Array.isArray(db.users) ? db.users : [], accessRequests: Array.isArray(db.accessRequests) ? db.accessRequests : [] };
}

function writeAuthDb(db) {
  ensureDataDir();
  fs.writeFileSync(AUTH_DB_FILE, encryptJson({ users: Array.isArray(db.users) ? db.users : [], accessRequests: Array.isArray(db.accessRequests) ? db.accessRequests : [] }));
  ensureAutomaticBackup('auth-db-write');
}

function hashPassword(password) {
  const salt = crypto.randomBytes(18);
  const hash = crypto.pbkdf2Sync(String(password), salt, 210000, 32, 'sha256');
  return `pbkdf2-sha256$210000$${b64url(salt)}$${b64url(hash)}`;
}

function makeRecoveryCode() {
  return `HC-REC-${b64url(crypto.randomBytes(18)).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20)}`;
}

function makeBlowfishId() {
  return `BF-${b64url(crypto.randomBytes(12)).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16)}`;
}

function makeAccessSerial() {
  return `HCQ-${Date.now().toString(36).toUpperCase()}-${b64url(crypto.randomBytes(6)).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}`;
}

function verifyPassword(password, stored) {
  const parts = String(stored || '').split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2-sha256') return false;
  const iter = Number(parts[1]);
  const salt = Buffer.from(parts[2], 'base64url');
  const expected = Buffer.from(parts[3], 'base64url');
  const actual = crypto.pbkdf2Sync(String(password), salt, iter, expected.length, 'sha256');
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function strongPassword(password) {
  const p = String(password || '');
  return p.length >= 12 && /[a-z]/.test(p) && /[A-Z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);
}

function publicUser(user) {
  if (!user) return null;
  return { id: user.id, email: user.email, name: user.name, role: user.role, plan: user.plan || 'free', status: user.status || 'ACTIVE', createdAt: user.createdAt };
}

function parseCookies(req) {
  return Object.fromEntries(String(req.headers.cookie || '').split(';').map(v => v.trim()).filter(Boolean).map(v => {
    const idx = v.indexOf('=');
    return idx === -1 ? [v, ''] : [decodeURIComponent(v.slice(0, idx)), decodeURIComponent(v.slice(idx + 1))];
  }));
}

function cookieOptions(req, maxAge = 60 * 60 * 12) {
  const secure = process.env.NODE_ENV === 'production' || String(req.headers['x-forwarded-proto'] || '').includes('https');
  return `Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

function makeSession(req, user) {
  const sid = b64url(crypto.randomBytes(32));
  const csrf = b64url(crypto.randomBytes(24));
  sessions.set(sid, { userId: user.id, csrf, expiresAt: Date.now() + 1000 * 60 * 60 * 12 });
  return { sid, csrf };
}

function makeAdminPanelSession() {
  const sid = b64url(crypto.randomBytes(32));
  const csrf = b64url(crypto.randomBytes(24));
  adminPanelSessions.set(sid, { csrf, expiresAt: Date.now() + 1000 * 60 * 60 * 4 });
  return { sid, csrf };
}

function getSession(req) {
  const sid = parseCookies(req).hashcod_session;
  const session = sid && sessions.get(sid);
  if (!session || session.expiresAt < Date.now()) {
    if (sid) sessions.delete(sid);
    return null;
  }
  const db = readAuthDb();
  const user = db.users.find(u => u.id === session.userId && u.status !== 'DISABLED');
  return user ? { sid, session, user } : null;
}

function hasAdminPanel(req) {
  const auth = getSession(req);
  return (!!auth?.session?.adminPanel && auth.user.role === 'admin') || !!getAdminPanelSession(req);
}

function getAdminPanelSession(req) {
  const sid = parseCookies(req).hashcod_admin_panel;
  const session = sid && adminPanelSessions.get(sid);
  if (!session || session.expiresAt < Date.now()) {
    if (sid) adminPanelSessions.delete(sid);
    return null;
  }
  return { sid, session };
}

function requireAdminPanel(req, res) {
  const auth = getSession(req);
  if (auth && auth.user.role === 'admin' && auth.session.adminPanel) return { ...auth, actorId: auth.user.id };
  const panel = getAdminPanelSession(req);
  if (panel) {
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      const csrf = String(req.headers['x-csrf-token'] || '');
      if (!csrf || csrf !== panel.session.csrf) {
        send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'csrf_required' }));
        return null;
      }
    }
    return { user: { id: 'admin_panel', role: 'admin', email: 'admin-panel@hashcod.local' }, session: panel.session, actorId: 'admin_panel', panelOnly: true };
  }
  send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'admin_panel_locked' }));
  return null;
}

function roleRank(role) {
  return { viewer: 1, editor: 2, admin: 3 }[role] || 0;
}

function requireAuth(req, res, minRole = 'viewer') {
  const auth = getSession(req);
  if (!auth) {
    send(res, 401, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'auth_required' }));
    return null;
  }
  if (roleRank(auth.user.role) < roleRank(minRole)) {
    send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'insufficient_role' }));
    return null;
  }
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    const csrf = String(req.headers['x-csrf-token'] || '');
    if (!csrf || csrf !== auth.session.csrf) {
      send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'csrf_required' }));
      return null;
    }
    if (!authenticatedRateLimit(auth, req, res)) return null;
  }
  return auth;
}

async function handleAuth(req, res) {
  const route = (req.url || '').split('?')[0];
  const db = readAuthDb();
  if (route === '/api/auth/me' && req.method === 'GET') {
    const auth = getSession(req);
    const panel = getAdminPanelSession(req);
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, setupRequired: db.users.length === 0, user: publicUser(auth?.user), csrf: auth?.session?.csrf || panel?.session?.csrf || null, adminPanel: hasAdminPanel(req) }));
    return;
  }
  if (route === '/api/admin/audit' && req.method === 'GET') {
    const auth = requireAdminPanel(req, res);
    if (!auth) return;
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const rows = readAuditRows(url.searchParams.get('limit') || 160);
    if (url.searchParams.get('download') === '1') {
      send(res, 200, { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Content-Disposition': `attachment; filename="hashcod-audit-${dailyStamp()}.jsonl"` }, rows.slice().reverse().map(row => JSON.stringify(row)).join('\n'));
      return;
    }
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, audit: rows }));
    return;
  }
  if (route === '/api/access/request' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = safeText(body.email, 180).toLowerCase();
      if (!validEmail(email) || !String(body.password || '').trim()) {
        send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_request' }));
        return;
      }
      if (db.users.some(u => u.email === email && u.status !== 'DISABLED')) {
        send(res, 409, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'already_has_access' }));
        return;
      }
      const existing = db.accessRequests.find(r => r.email === email && r.status === 'PENDING');
      if (existing) {
        send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, request: { email, blowfishId: existing.blowfishId, serial: existing.serial, status: existing.status } }));
        return;
      }
      const reqRow = {
        id: `req_${Date.now().toString(36)}_${b64url(crypto.randomBytes(8))}`,
        email,
        blowfishId: makeBlowfishId(),
        serial: makeAccessSerial(),
        desiredPasswordHash: hashPassword(body.password),
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
      db.accessRequests.unshift(reqRow);
      writeAuthDb(db);
      audit('access.request', { ip: clientIp(req), requestId: reqRow.id, email });
      send(res, 201, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, request: { email, blowfishId: reqRow.blowfishId, serial: reqRow.serial, status: reqRow.status } }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (route === '/api/access/check' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = safeText(body.email, 180).toLowerCase();
      const serial = safeText(body.serial, 80).toUpperCase();
      const reqRow = db.accessRequests.find(r => r.email === email && r.serial === serial);
      if (!reqRow || !verifyPassword(body.password, reqRow.desiredPasswordHash)) {
        send(res, 404, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'request_not_found' }));
        return;
      }
      if (reqRow.status !== 'APPROVED') {
        send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, status: reqRow.status, blowfishId: reqRow.blowfishId, serial: reqRow.serial }));
        return;
      }
      const user = db.users.find(u => u.email === email && u.status !== 'DISABLED');
      if (!user) {
        send(res, 409, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'approved_user_missing' }));
        return;
      }
      const session = makeSession(req, user);
      audit('access.check_login', { ip: clientIp(req), userId: user.id, requestId: reqRow.id });
      send(res, 200, { 'Content-Type': MIME['.json'], 'Set-Cookie': `hashcod_session=${encodeURIComponent(session.sid)}; ${cookieOptions(req)}` }, JSON.stringify({ ok: true, status: reqRow.status, user: publicUser(user), csrf: session.csrf }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (route === '/api/access/requests' && req.method === 'GET') {
    const auth = requireAdminPanel(req, res);
    if (!auth) return;
    const requests = db.accessRequests.map(({ desiredPasswordHash, ...row }) => row);
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, requests }));
    return;
  }
  if (route === '/api/access/requests' && req.method === 'PUT') {
    const auth = requireAdminPanel(req, res);
    if (!auth) return;
    try {
      const body = await readJsonBody(req);
      const reqRow = db.accessRequests.find(r => r.id === safeText(body.id, 120));
      if (!reqRow) {
        send(res, 404, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'request_not_found' }));
        return;
      }
      const action = body.action === 'reject' ? 'reject' : 'approve';
      if (action === 'reject') {
        reqRow.status = 'REJECTED';
        reqRow.reviewedAt = new Date().toISOString();
        reqRow.reviewedBy = auth.actorId;
        writeAuthDb(db);
        audit('access.reject', { ip: clientIp(req), actor: auth.actorId, requestId: reqRow.id });
        send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, request: { ...reqRow, desiredPasswordHash: undefined } }));
        return;
      }
      const role = ['viewer', 'editor', 'admin'].includes(body.role) ? body.role : 'viewer';
      const plan = ['free', 'starter', 'professional', 'enterprise'].includes(body.plan) ? body.plan : 'free';
      const recoveryCode = makeRecoveryCode();
      let user = db.users.find(u => u.email === reqRow.email);
      if (user) {
        user.role = role;
        user.plan = plan;
        user.status = 'ACTIVE';
        user.passwordHash = reqRow.desiredPasswordHash;
        user.recoveryHash = hashPassword(recoveryCode);
        user.updatedAt = new Date().toISOString();
      } else {
        user = { id: `usr_${Date.now().toString(36)}`, email: reqRow.email, name: `${reqRow.blowfishId}-${reqRow.serial}`, role, plan, passwordHash: reqRow.desiredPasswordHash, recoveryHash: hashPassword(recoveryCode), createdAt: new Date().toISOString(), status: 'ACTIVE' };
        db.users.push(user);
      }
      reqRow.status = 'APPROVED';
      reqRow.role = role;
      reqRow.plan = plan;
      reqRow.reviewedAt = new Date().toISOString();
      reqRow.reviewedBy = auth.actorId;
      writeAuthDb(db);
      audit('access.approve', { ip: clientIp(req), actor: auth.actorId, requestId: reqRow.id, userId: user.id, role, plan });
      send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, user: publicUser(user), recoveryCode }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (route === '/api/auth/register' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      if (db.users.length > 0) {
        send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'setup_completed' }));
        return;
      }
      const email = safeText(body.email, 180).toLowerCase();
      const name = safeText(body.name, 80) || 'Admin';
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !strongPassword(body.password)) {
        send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'weak_registration' }));
        return;
      }
      const recoveryCode = makeRecoveryCode();
      const user = { id: `usr_${Date.now().toString(36)}`, email, name, role: 'admin', plan: 'enterprise', passwordHash: hashPassword(body.password), recoveryHash: hashPassword(recoveryCode), createdAt: new Date().toISOString(), status: 'ACTIVE' };
      writeAuthDb({ users: [user] });
      const session = makeSession(req, user);
      audit('auth.register_admin', { ip: clientIp(req), userId: user.id });
      send(res, 201, { 'Content-Type': MIME['.json'], 'Set-Cookie': `hashcod_session=${encodeURIComponent(session.sid)}; ${cookieOptions(req)}` }, JSON.stringify({ ok: true, user: publicUser(user), csrf: session.csrf, recoveryCode }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (route === '/api/auth/login' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = safeText(body.email, 180).toLowerCase();
      const user = db.users.find(u => u.email === email && u.status !== 'DISABLED');
      if (!user || !verifyPassword(body.password, user.passwordHash)) {
        audit('auth.login_failed', { ip: clientIp(req), email });
        send(res, 401, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_credentials' }));
        return;
      }
      const session = makeSession(req, user);
      audit('auth.login', { ip: clientIp(req), userId: user.id });
      send(res, 200, { 'Content-Type': MIME['.json'], 'Set-Cookie': `hashcod_session=${encodeURIComponent(session.sid)}; ${cookieOptions(req)}` }, JSON.stringify({ ok: true, user: publicUser(user), csrf: session.csrf }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (route === '/api/auth/logout' && req.method === 'POST') {
    const auth = getSession(req);
    if (auth) sessions.delete(auth.sid);
    const panel = getAdminPanelSession(req);
    if (panel) adminPanelSessions.delete(panel.sid);
    send(res, 200, { 'Content-Type': MIME['.json'], 'Set-Cookie': [`hashcod_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`, `hashcod_admin_panel=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`] }, JSON.stringify({ ok: true }));
    return;
  }
  if (route === '/api/admin/unlock' && req.method === 'POST') {
    const auth = getSession(req);
    try {
      const body = await readJsonBody(req);
      const keyHash = crypto.createHash('sha256').update(String(body.panelKey || '')).digest('hex');
      const expectedPanelHash = String(ADMIN_PANEL_KEY_HASH || '').trim();
      if (expectedPanelHash.length !== 64 || !crypto.timingSafeEqual(Buffer.from(keyHash), Buffer.from(expectedPanelHash))) {
        audit('admin.unlock_failed', { ip: clientIp(req), actor: auth?.user?.id || 'public' });
        send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_panel_key' }));
        return;
      }
      if (auth?.user?.role === 'admin') auth.session.adminPanel = true;
      const panel = makeAdminPanelSession();
      audit('admin.unlock', { ip: clientIp(req), actor: auth?.user?.id || 'admin_panel' });
      send(res, 200, { 'Content-Type': MIME['.json'], 'Set-Cookie': `hashcod_admin_panel=${encodeURIComponent(panel.sid)}; ${cookieOptions(req, 60 * 60 * 4)}` }, JSON.stringify({ ok: true, csrf: panel.csrf }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (route === '/api/auth/recover' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const email = safeText(body.email, 180).toLowerCase();
      const user = db.users.find(u => u.email === email && u.status !== 'DISABLED');
      if (!user || !user.recoveryHash || !verifyPassword(body.recoveryCode, user.recoveryHash) || !strongPassword(body.password)) {
        audit('auth.recover_failed', { ip: clientIp(req), email });
        send(res, 401, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_recovery' }));
        return;
      }
      const newRecoveryCode = makeRecoveryCode();
      user.passwordHash = hashPassword(body.password);
      user.recoveryHash = hashPassword(newRecoveryCode);
      user.updatedAt = new Date().toISOString();
      writeAuthDb(db);
      audit('auth.recover', { ip: clientIp(req), userId: user.id });
      send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, recoveryCode: newRecoveryCode }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (route === '/api/auth/users' && req.method === 'POST') {
    const auth = requireAdminPanel(req, res);
    if (!auth) return;
    try {
      const body = await readJsonBody(req);
      const email = safeText(body.email, 180).toLowerCase();
      const role = ['viewer', 'editor', 'admin'].includes(body.role) ? body.role : 'viewer';
      const plan = ['free', 'starter', 'professional', 'enterprise'].includes(body.plan) ? body.plan : 'free';
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !strongPassword(body.password) || db.users.some(u => u.email === email)) {
        send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_user' }));
        return;
      }
      const recoveryCode = makeRecoveryCode();
      const user = { id: `usr_${Date.now().toString(36)}`, email, name: safeText(body.name, 80) || email, role, plan, passwordHash: hashPassword(body.password), recoveryHash: hashPassword(recoveryCode), createdAt: new Date().toISOString(), status: 'ACTIVE' };
      db.users.push(user);
      writeAuthDb(db);
      audit('auth.user_create', { ip: clientIp(req), actor: auth.actorId, userId: user.id, role });
      send(res, 201, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, user: publicUser(user), recoveryCode }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (route === '/api/auth/users' && req.method === 'GET') {
    const auth = requireAdminPanel(req, res);
    if (!auth) return;
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, users: db.users.map(publicUser) }));
    return;
  }
  if (route === '/api/auth/users' && req.method === 'PUT') {
    const auth = requireAdminPanel(req, res);
    if (!auth) return;
    try {
      const body = await readJsonBody(req);
      const user = db.users.find(u => u.id === safeText(body.id, 120));
      if (!user) {
        send(res, 404, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'user_not_found' }));
        return;
      }
      if (['viewer', 'editor', 'admin'].includes(body.role)) user.role = body.role;
      if (['free', 'starter', 'professional', 'enterprise'].includes(body.plan)) user.plan = body.plan;
      if (['ACTIVE', 'DISABLED'].includes(body.status)) user.status = body.status;
      user.updatedAt = new Date().toISOString();
      writeAuthDb(db);
      audit('auth.user_update', { ip: clientIp(req), actor: auth.actorId, userId: user.id, role: user.role, plan: user.plan, status: user.status });
      send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, user: publicUser(user) }));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  send(res, 404, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'auth_route_not_found' }));
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
  ensureAutomaticBackup('assist-write');
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
  ensureAutomaticBackup('cli-write');
}

async function handleAssistRequests(req, res) {
  const auth = requireAuth(req, res, req.method === 'GET' ? 'viewer' : req.method === 'POST' ? 'editor' : 'admin');
  if (!auth) return;
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET') {
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, requests: readAssistRequests() }, null, 2));
    return;
  }
  if (req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const moderation = validatePublicPayload({ note: body.note, codePreview: body.codePreview, email: body.email, whatsapp: body.whatsapp });
      if (!moderation.ok) {
        audit('moderation.block', { ip: clientIp(req), actor: auth.user.id, route: 'assist', field: moderation.field, reason: moderation.reason });
        send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: moderation.reason, field: moderation.field }));
        return;
      }
      const row = {
        id: `assist_${Date.now().toString(36)}_${b64url(crypto.randomBytes(6))}`,
        email: safeText(body.email, 180),
        whatsapp: safeText(body.whatsapp, 60),
        note: safePublicText(body.note, 600),
        codeType: safeText(body.codeType, 120),
        primitive: safeText(body.primitive, 180),
        codeIndex: safeText(body.codeIndex, 20),
        codePreview: safePublicText(body.codePreview, 220),
        codeHash: safeText(body.codeHash, 80),
        createdAt: new Date().toISOString(),
        status: 'OPEN'
      };
      if (!validEmail(row.email) || !validWhatsapp(row.whatsapp)) {
        send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'email_and_whatsapp_required' }));
        return;
      }
      const rows = [row, ...readAssistRequests()].slice(0, 500);
      writeAssistRequests(rows);
      audit('assist.create', { ip: clientIp(req), actor: auth.user.id, id: row.id });
      send(res, 201, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, request: row }, null, 2));
    } catch {
      send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'invalid_json' }));
    }
    return;
  }
  if (req.method === 'DELETE') {
    const authPanel = requireAdminPanel(req, res);
    if (!authPanel) return;
    const id = safeText(url.searchParams.get('id'), 120);
    const before = readAssistRequests();
    const rows = before.filter(row => row.id !== id);
    writeAssistRequests(rows);
    audit('assist.delete', { ip: clientIp(req), actor: authPanel.actorId, id, deleted: before.length - rows.length });
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, deleted: before.length - rows.length }));
    return;
  }
  send(res, 405, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'method_not_allowed' }));
}

async function handleCliConsole(req, res) {
  const auth = requireAuth(req, res, req.method === 'GET' ? 'viewer' : 'editor');
  if (!auth) return;
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const canEditCli = (row, ownerKey) => auth.user.role === 'admin' || row.ownerUserId === auth.user.id || (!!ownerKey && row.ownerKey === ownerKey) || row.permissions?.edit === 'all';
  const canHideCli = (row, ownerKey) => auth.user.role === 'admin' || row.ownerUserId === auth.user.id || (!!ownerKey && row.ownerKey === ownerKey) || row.permissions?.hide === 'all';
  const canViewCli = (row, ownerKey) => row.status === 'ACTIVE' || auth.user.role === 'admin' || row.ownerUserId === auth.user.id || (!!ownerKey && row.ownerKey === ownerKey);
  if (req.method === 'GET') {
    const ownerKey = safeText(url.searchParams.get('ownerKey'), 120);
    const rows = readCliConsole().filter(row => row.status !== 'PURGED' && canViewCli(row, ownerKey)).map(row => {
      const { ownerKey: storedOwnerKey, ...publicRow } = row;
      const isOwner = row.ownerUserId === auth.user.id || (!!ownerKey && storedOwnerKey === ownerKey);
      return { ...publicRow, isOwner, canEdit: canEditCli(row, ownerKey), canHide: canHideCli(row, ownerKey), canPurge: isOwner || auth.user.role === 'admin' };
    });
    send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, entries: rows }, null, 2));
    return;
  }
  if (req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const moderation = validatePublicPayload({ title: body.title, text: body.text, author: body.author });
      if (!moderation.ok) {
        audit('moderation.block', { ip: clientIp(req), actor: auth.user.id, route: 'cli', field: moderation.field, reason: moderation.reason });
        send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: moderation.reason, field: moderation.field }));
        return;
      }
      const text = safePublicText(body.text, 6000);
      const ownerKey = safeText(body.ownerKey, 120);
      if (!text || !ownerKey) {
        send(res, 400, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'text_and_owner_required' }));
        return;
      }
      const row = {
        id: `cli_${Date.now().toString(36)}_${b64url(crypto.randomBytes(6))}`,
        title: safePublicText(body.title, 120) || 'CLI note',
        text,
        ownerKey,
        ownerUserId: auth.user.id,
        author: safeText(body.author, 80) || 'anonymous',
        permissions: {
          view: 'all',
          edit: body.editPermission === 'owner' ? 'owner' : 'all',
          hide: body.hidePermission === 'all' ? 'all' : 'owner',
        },
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const rows = [row, ...readCliConsole()].slice(0, 1000);
      writeCliConsole(rows);
      audit('cli.create', { ip: clientIp(req), actor: auth.user.id, id: row.id });
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
      const ownerKey = safeText(body.ownerKey, 120);
      const rows = readCliConsole();
      const now = new Date().toISOString();
      let updated = null;
      let denied = false;
      const next = rows.map(row => {
        if (row.id !== id) return row;
        if (!canEditCli(row, ownerKey)) {
          denied = true;
          return row;
        }
        const moderation = validatePublicPayload({ title: body.title, text: body.text, editor: body.editor });
        if (!moderation.ok) {
          denied = moderation.reason;
          return row;
        }
        updated = {
          ...row,
          title: safePublicText(body.title, 120) || row.title,
          text: safePublicText(body.text, 6000),
          editor: safeText(body.editor, 80) || 'anonymous',
          permissions: row.permissions || { view: 'all', edit: 'all', hide: 'owner' },
          status: row.status === 'HIDDEN' ? 'HIDDEN' : 'ACTIVE',
          updatedAt: now,
        };
        return updated;
      });
      if (denied) {
        const error = denied === true ? 'record_edit_forbidden' : denied;
        audit('cli.update_blocked', { ip: clientIp(req), actor: auth.user.id, id, error });
        send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error }));
        return;
      }
      writeCliConsole(next);
      if (updated) audit('cli.update', { ip: clientIp(req), actor: auth.user.id, id });
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
      if (auth.user.role !== 'admin' && target.ownerUserId !== auth.user.id && (!ownerKey || target.ownerKey !== ownerKey)) {
        send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'creator_only' }));
        return;
      }
      writeCliConsole(rows.filter(row => row.id !== id));
      audit('cli.purge', { ip: clientIp(req), actor: auth.user.id, id });
      send(res, 200, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: true, purged: 1 }));
      return;
    }
    const next = rows.map(row => row.id === id ? { ...row, status: 'HIDDEN', updatedAt: new Date().toISOString() } : row);
    if (!canHideCli(target, ownerKey)) {
      send(res, 403, { 'Content-Type': MIME['.json'] }, JSON.stringify({ ok: false, error: 'record_hide_forbidden' }));
      return;
    }
    writeCliConsole(next);
    audit('cli.hide', { ip: clientIp(req), actor: auth.user.id, id });
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
      'NEO 200 completeness gate',
      'per-record CLI permissions',
      'visible admin audit log',
      'server-side input moderation',
      'daily disk backups',
      'authenticated user rate limits',
      'production HTTPS redirect',
      'production CSP upgrade-insecure-requests'
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

function enforceHttps(req, res) {
  if (process.env.NODE_ENV !== 'production') return false;
  const proto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim();
  if (!proto || proto === 'https') return false;
  const host = req.headers.host || '';
  send(res, 308, { Location: `https://${host}${req.url || '/'}` }, '');
  return true;
}

const server = http.createServer((req, res) => {
  if (enforceHttps(req, res)) return;
  if (!rateLimit(req, res)) return;

  if ((req.url || '').split('?')[0].startsWith('/api/auth/') || (req.url || '').split('?')[0].startsWith('/api/admin/') || (req.url || '').split('?')[0].startsWith('/api/access/')) {
    handleAuth(req, res);
    return;
  }

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
