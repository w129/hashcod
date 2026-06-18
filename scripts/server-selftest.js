const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const HOST = '127.0.0.1';
const PORT = 24316;
const TEMP_DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'hashcod-test-'));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');

function request(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.get({ host: HOST, port: PORT, path: pathname }, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
  });
}

async function ready() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await request('/health');
      if (response.status === 200) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error('server_not_ready');
}

function assert(value, label) {
  if (!value) throw new Error(label);
  console.log(`PASS ${label}`);
}

(async () => {
  const child = spawn(process.execPath, ['server.js'], {
    cwd: ROOT,
    env: {
      ...process.env,
      HOST,
      PORT: String(PORT),
      HASHCOD_DATA_DIR: TEMP_DATA,
      HASHCOD_SECRET: 'test-secret-only',
      HASHCOD_ADMIN_PANEL_KEY_HASH: digest('admin'),
      HASHCOD_SECURITY_KING_KEY_HASH: digest('king'),
      HASHCOD_SECURITY_KING_NONCE_HASH: digest('nonce')
    },
    stdio: ['ignore', 'ignore', 'pipe']
  });
  child.stderr.on('data', data => process.stderr.write(data));
  try {
    await ready();
    const health = await request('/health');
    const payload = JSON.parse(health.body);
    assert(health.status === 200 && payload.ok, 'health endpoint');
    assert(payload.version === '12.1.0', 'version 12.1.0');
    assert(payload.localOnly === true, 'local-only binding');
    assert(payload.secretsConfigured === 4, 'secure local secrets');
    const root = await request('/');
    assert(root.status === 200, 'platform root');
    assert(/Hashcod/.test(root.body), 'Hashcod identity');
    console.log('SERVER SELFTEST OK');
  } finally {
    child.kill('SIGTERM');
    fs.rmSync(TEMP_DATA, { recursive: true, force: true });
  }
})().catch(error => {
  console.error(`SERVER SELFTEST FAIL: ${error.message}`);
  process.exitCode = 1;
});
