const fs = require('fs');
const path = require('path');
const net = require('net');
const http = require('http');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT, '.env.local');
const DATA_DIR = path.join(ROOT, 'runtime-data');
const PID_FILE = path.join(DATA_DIR, 'hashcod.pid.json');

function readEnv() {
  const env = { ...process.env };
  if (!fs.existsSync(ENV_FILE)) return env;
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split(/\r?\n/)) {
    const clean = line.trim();
    if (!clean || clean.startsWith('#')) continue;
    const separator = clean.indexOf('=');
    if (separator < 1) continue;
    const key = clean.slice(0, separator).trim();
    if (!(key in process.env)) env[key] = clean.slice(separator + 1).trim();
  }
  return env;
}

function portAvailable(host, port) {
  return new Promise(resolve => {
    const probe = net.createServer();
    probe.once('error', () => resolve(false));
    probe.once('listening', () => probe.close(() => resolve(true)));
    probe.listen(port, host);
  });
}

async function selectPort(host, preferred) {
  for (let port = preferred; port < preferred + 50; port += 1) {
    if (await portAvailable(host, port)) return port;
  }
  throw new Error(`No hay puertos disponibles entre ${preferred} y ${preferred + 49}.`);
}

function waitForHealth(host, port) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      attempts += 1;
      const req = http.get({ host, port, path: '/health', timeout: 1000 }, res => {
        res.resume();
        if (res.statusCode === 200) resolve();
        else if (attempts < 40) setTimeout(check, 150);
        else reject(new Error('El diagnóstico HTTP no respondió correctamente.'));
      });
      req.on('error', () => {
        if (attempts < 40) setTimeout(check, 150);
        else reject(new Error('El servidor no respondió a tiempo.'));
      });
      req.on('timeout', () => req.destroy());
    };
    check();
  });
}

function openBrowser(url) {
  const command = process.platform === 'win32'
    ? ['cmd', ['/c', 'start', '', url]]
    : process.platform === 'darwin'
      ? ['open', [url]]
      : ['xdg-open', [url]];
  const opener = spawn(command[0], command[1], { detached: true, stdio: 'ignore', windowsHide: true });
  opener.unref();
}

(async () => {
  const env = readEnv();
  const host = env.HOST || '127.0.0.1';
  const preferredPort = Number(env.PORT || 2340);
  const port = await selectPort(host, preferredPort);
  env.HOST = host;
  env.PORT = String(port);
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const child = spawn(process.execPath, ['server.js'], { cwd: ROOT, env, stdio: 'inherit', windowsHide: false });
  fs.writeFileSync(PID_FILE, JSON.stringify({ pid: child.pid, host, port, startedAt: new Date().toISOString() }, null, 2));
  const cleanup = () => {
    try { if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE); } catch {}
  };
  child.once('exit', code => {
    cleanup();
    process.exitCode = code || 0;
  });
  process.once('SIGINT', () => child.kill('SIGINT'));
  process.once('SIGTERM', () => child.kill('SIGTERM'));
  await waitForHealth(host, port);
  const url = `http://${host}:${port}`;
  console.log(`\n Hashcod listo: ${url}`);
  if (port !== preferredPort) console.log(` Puerto ${preferredPort} ocupado; se utilizó ${port}.`);
  openBrowser(url);
})().catch(error => {
  console.error(`[Hashcod] ${error.message}`);
  process.exit(1);
});
