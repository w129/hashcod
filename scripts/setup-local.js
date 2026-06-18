const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT, '.env.local');
const DATA_DIR = path.join(ROOT, 'runtime-data');
const CREDENTIALS_FILE = path.join(DATA_DIR, 'LOCAL-CREDENTIALS.txt');
const quiet = process.argv.includes('--quiet');
const randomSecret = (bytes = 24) => crypto.randomBytes(bytes).toString('base64url');
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');

if (!fs.existsSync(ENV_FILE)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const adminKey = `HC-ADMIN-${randomSecret(18)}`;
  const kingKey = `HC-KING-${randomSecret(18)}`;
  const kingNonce = randomSecret(12);
  const gateToken = `HC-TOKEN-${randomSecret(18)}`;
  const gateKey = `HC-GATE-${randomSecret(18)}`;
  const env = [
    '# Generado automáticamente por Hashcod. No compartir ni publicar.',
    'HOST=127.0.0.1',
    'PORT=2340',
    'HASHCOD_PRIVATE_MODE=0',
    'HASHCOD_BACKUP_RETENTION_DAYS=14',
    `HASHCOD_SECRET=${randomSecret(48)}`,
    `HASHCOD_ADMIN_PANEL_KEY_HASH=${sha256(adminKey)}`,
    `HASHCOD_SECURITY_KING_KEY_HASH=${sha256(kingKey)}`,
    `HASHCOD_SECURITY_KING_NONCE_HASH=${sha256(kingNonce)}`,
    `HASHCOD_PLATFORM_GATE_TOKEN_HASH=${sha256(gateToken)}`,
    `HASHCOD_PLATFORM_GATE_KEY_HASH=${sha256(gateKey)}`,
    `HASHCOD_LOCAL_SHUTDOWN_TOKEN=${randomSecret(32)}`,
    ''
  ].join('\n');
  const credentials = [
    'HASHCOD - CREDENCIALES LOCALES',
    '================================',
    'Guarda este archivo en un lugar seguro. No lo compartas.',
    '',
    `Admin Panel Key: ${adminKey}`,
    `Security King Key: ${kingKey}`,
    `Security King Nonce: ${kingNonce}`,
    `Platform Gate Token: ${gateToken}`,
    `Platform Gate Key: ${gateKey}`,
    '',
    `Generado: ${new Date().toISOString()}`,
    ''
  ].join('\n');
  fs.writeFileSync(ENV_FILE, env, { encoding: 'utf8', mode: 0o600 });
  fs.writeFileSync(CREDENTIALS_FILE, credentials, { encoding: 'utf8', mode: 0o600 });
  if (!quiet) {
    console.log('Configuración local segura creada.');
    console.log(`Credenciales: ${CREDENTIALS_FILE}`);
  }
} else if (!quiet) {
  console.log('La configuración local segura ya existe.');
}

const currentEnv = fs.readFileSync(ENV_FILE, 'utf8');
if (!/^HASHCOD_LOCAL_SHUTDOWN_TOKEN=/m.test(currentEnv)) {
  fs.appendFileSync(ENV_FILE, `HASHCOD_LOCAL_SHUTDOWN_TOKEN=${randomSecret(32)}\n`, 'utf8');
  if (!quiet) console.log('Token de apagado local añadido.');
}
