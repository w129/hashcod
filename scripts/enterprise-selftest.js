const fs = require('fs');
const vm = require('vm');
const path = require('path');
const { webcrypto } = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const enc = new TextEncoder();

const toHex = (buf) => Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, '0')).join('');
const fromHex = (hex) => {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
};

async function sha256Hex(text) {
  return toHex(await webcrypto.subtle.digest('SHA-256', enc.encode(text)));
}

async function hmacSha256Hex(keyText, messageText) {
  const key = await webcrypto.subtle.importKey('raw', enc.encode(keyText), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toHex(await webcrypto.subtle.sign('HMAC', key, enc.encode(messageText)));
}

async function pbkdf2Sha256Hex(passText, saltText, iterations, bytes) {
  const base = await webcrypto.subtle.importKey('raw', enc.encode(passText), 'PBKDF2', false, ['deriveBits']);
  const bits = await webcrypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(saltText), iterations, hash: 'SHA-256' }, base, bytes * 8);
  return toHex(bits);
}

async function aesGcmKnownVectorHex() {
  const key = await webcrypto.subtle.importKey('raw', fromHex('00000000000000000000000000000000'), 'AES-GCM', false, ['encrypt']);
  const out = await webcrypto.subtle.encrypt(
    { name: 'AES-GCM', iv: fromHex('000000000000000000000000'), tagLength: 128 },
    key,
    fromHex('00000000000000000000000000000000')
  );
  return toHex(out);
}

function loadBrowserFiles() {
  const ctx = {
    window: {},
    crypto: webcrypto,
    TextEncoder,
    TextDecoder,
    Blob,
    btoa: s => Buffer.from(s, 'binary').toString('base64'),
    atob: s => Buffer.from(s, 'base64').toString('binary'),
  };
  vm.createContext(ctx);
  for (const file of ['data/icons.js', 'data/catalog.js', 'data/generators.js']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
  }
  return ctx;
}

function assert(ok, id, detail = '') {
  if (!ok) {
    const err = new Error(`${id} failed ${detail}`);
    err.id = id;
    throw err;
  }
  console.log(`PASS ${id}${detail ? ` ${detail}` : ''}`);
}

(async () => {
  assert(await sha256Hex('abc') === 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'sha256-known-vector');
  assert(await hmacSha256Hex('key', 'The quick brown fox jumps over the lazy dog') === 'f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8', 'hmac-sha256-known-vector');
  assert(await pbkdf2Sha256Hex('password', 'salt', 1, 32) === '120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b', 'pbkdf2-sha256-known-vector');
  assert(await aesGcmKnownVectorHex() === '0388dace60b6a392f328c2b971b2fe78ab6e47d42cec13bdf53a67b21257bddf', 'aes-gcm-known-vector');

  const ctx = loadBrowserFiles();
  const catalog = ctx.window.OCG_CATALOG || [];
  const ids = catalog.flatMap(cat => (cat.types || []).map(type => type.id));
  const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
  assert(duplicates.length === 0, 'catalog-unique-ids', `${ids.length} ids`);

  const neo = catalog.find(cat => cat.id === 'neo_crypto_200');
  assert(neo && neo.types && neo.types.length === 200, 'neo-200-complete', `${neo ? neo.types.length : 0}/200`);

  const apex = catalog.find(cat => cat.id === 'apex_crypto_300');
  assert(apex && apex.types && apex.types.length === 300, 'apex-300-complete', `${apex ? apex.types.length : 0}/300`);

  const out = await ctx.window.OCG_GEN.generate('neo_code_200', 32, {});
  assert(/^OCG-NEO\./.test(out) && /^CHECK=/m.test(out), 'neo-generator-health', out.split('\n')[0]);

  const apexOut = await ctx.window.OCG_GEN.generate('apex_code_300', 32, {});
  assert(/^OCG-APEX\./.test(apexOut) && /^CHECK=/m.test(apexOut), 'apex-generator-health', apexOut.split('\n')[0]);

  const jwt = await ctx.window.OCG_GEN.generate('jwt_hs256_real', 32, {});
  assert(jwt.split('.').length === 3, 'jwt-real-shape');

  console.log('ENTERPRISE SELFTEST OK');
})().catch(err => {
  console.error(`ENTERPRISE SELFTEST FAIL: ${err.message}`);
  process.exit(1);
});
