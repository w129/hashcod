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
  assert(ids.length === 10000, 'catalog-total-10000', `${ids.length}/10000 ids`);

  const neo = catalog.find(cat => cat.id === 'neo_crypto_200');
  assert(neo && neo.types && neo.types.length === 200, 'neo-200-complete', `${neo ? neo.types.length : 0}/200`);

  const apex = catalog.find(cat => cat.id === 'apex_crypto_300');
  assert(apex && apex.types && apex.types.length === 300, 'apex-300-complete', `${apex ? apex.types.length : 0}/300`);

  const hc10000 = catalog.find(cat => cat.id === 'hashcod_advanced_8282');
  assert(hc10000 && hc10000.types && hc10000.types.length === 8282, 'hashcod-8282-complete', `${hc10000 ? hc10000.types.length : 0}/8282`);

  const variants = catalog.flatMap(cat => cat.types || []);
  const apiVariant = variants.find(type => type.hashcodVariant === 'HCV-00185');
  assert(apiVariant && apiVariant.id === 'apikey', 'hashcod-variant-00185-api-key', apiVariant ? apiVariant.id : 'missing');

  const apiPrefix = 'svc.prod_';
  const apiOut = await ctx.window.OCG_GEN.generate('apikey', 64, { prefix: apiPrefix, upper: true, lower: true, num: true, sym: true });
  const apiPayload = apiOut.slice(apiPrefix.length);
  assert(apiOut.startsWith(apiPrefix) && apiPayload.length === 64, 'api-key-prefix-length', `${apiPayload.length} chars`);
  assert(/[A-Z]/.test(apiPayload) && /[a-z]/.test(apiPayload) && /[0-9]/.test(apiPayload) && /[^A-Za-z0-9]/.test(apiPayload), 'api-key-charset-coverage');

  const out = await ctx.window.OCG_GEN.generate('neo_code_200', 32, {});
  assert(/^OCG-NEO\./.test(out) && /^CHECK=/m.test(out), 'neo-generator-health', out.split('\n')[0]);

  const apexOut = await ctx.window.OCG_GEN.generate('apex_code_300', 32, {});
  assert(/^OCG-APEX\./.test(apexOut) && /^CHECK=/m.test(apexOut), 'apex-generator-health', apexOut.split('\n')[0]);

  const hc10000Out = await ctx.window.OCG_GEN.generate('hc10000_code_08282', 32, {});
  assert(/^HASHCOD\./.test(hc10000Out) && /^CHECK=/m.test(hc10000Out), 'hashcod-10000-generator-health', hc10000Out.split('\n')[0]);

  const jwt = await ctx.window.OCG_GEN.generate('jwt_hs256_real', 32, {});
  assert(jwt.split('.').length === 3, 'jwt-real-shape');

  const appSource = fs.readFileSync(path.join(ROOT, 'app/app.jsx'), 'utf8');
  assert(appSource.includes('const CODE_TRANSFORM_CLI_TOTAL = 1100;'), 'transform-cmd-total-1100');
  assert(appSource.includes("['segment-permute', 'TRANSFORM'") && appSource.includes("['integrity-envelope', 'FORMAT'"), 'transform-cmd-extension-operations');
  assert(appSource.includes("'1100 commands: hcx0001 - hcx1100'"), 'transform-cmd-menu-range');
  assert(appSource.includes('const copyResult = async () =>') && appSource.includes('const exportPng = () =>'), 'transform-cmd-copy-png-actions');
  assert(appSource.includes("export json|txt|png") && appSource.includes("<button onClick={exportPng}>PNG</button>"), 'transform-cmd-png-command-ui');
  assert(appSource.includes('const FileZipPackagerDialog =') && appSource.includes('makeZipBlob(entries)'), 'file-zip-packager-dialog');
  assert(appSource.includes('TOP_MENU_ICONS.filePackager') && appSource.includes('FILE ZIP PACKAGER'), 'file-zip-packager-menu');

  console.log('ENTERPRISE SELFTEST OK');
})().catch(err => {
  console.error(`ENTERPRISE SELFTEST FAIL: ${err.message}`);
  process.exit(1);
});
