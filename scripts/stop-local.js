const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PID_FILE = path.join(ROOT, 'runtime-data', 'hashcod.pid.json');
const ENV_FILE = path.join(ROOT, '.env.local');

if (!fs.existsSync(PID_FILE)) {
  console.log('Hashcod no tiene un proceso local registrado.');
  process.exit(0);
}

function shutdownToken() {
  if (!fs.existsSync(ENV_FILE)) return '';
  const match = fs.readFileSync(ENV_FILE, 'utf8').match(/^HASHCOD_LOCAL_SHUTDOWN_TOKEN=(.+)$/m);
  return match ? match[1].trim() : '';
}

function requestShutdown(state, token) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: state.host || '127.0.0.1',
      port: Number(state.port),
      path: '/api/local/shutdown',
      method: 'POST',
      timeout: 2500,
      headers: { 'X-Hashcod-Shutdown-Token': token }
    }, res => {
      res.resume();
      res.on('end', () => res.statusCode === 200 ? resolve() : reject(new Error(`HTTP ${res.statusCode}`)));
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.end();
  });
}

(async () => {
try {
  const state = JSON.parse(fs.readFileSync(PID_FILE, 'utf8'));
  const pid = Number(state.pid);
  if (!Number.isInteger(pid) || pid <= 0) throw new Error('PID inválido');
  try {
    await requestShutdown(state, shutdownToken());
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch {
    if (process.platform === 'win32') {
      spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true });
    } else {
      process.kill(pid, 'SIGTERM');
    }
  }
  if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
  console.log(`Hashcod detenido (PID ${pid}).`);
} catch (error) {
  try { fs.unlinkSync(PID_FILE); } catch {}
  console.error(`No se pudo detener Hashcod: ${error.message}`);
  process.exit(1);
}
})();
