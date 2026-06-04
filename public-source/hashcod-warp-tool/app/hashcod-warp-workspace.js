(function (global) {
  'use strict';

  const STORAGE_KEY = 'hashcod_warp_workspace_v1';
  const LANGUAGE_PROFILES = {
    javascript: { ext: ['.js', '.mjs'], run: 'sandbox', command: 'node main.js' },
    typescript: { ext: ['.ts'], run: 'analysis', command: 'tsc && node dist/main.js' },
    python: { ext: ['.py'], run: 'analysis', command: 'python main.py' },
    rust: { ext: ['.rs'], run: 'analysis', command: 'cargo run' },
    go: { ext: ['.go'], run: 'analysis', command: 'go run main.go' },
    c: { ext: ['.c'], run: 'analysis', command: 'cc main.c -o main && ./main' },
    cpp: { ext: ['.cpp', '.cc'], run: 'analysis', command: 'c++ main.cpp -o main && ./main' },
    java: { ext: ['.java'], run: 'analysis', command: 'javac Main.java && java Main' },
    solidity: { ext: ['.sol'], run: 'analysis', command: 'solc --bin contract.sol' },
    html: { ext: ['.html', '.htm'], run: 'preview', command: 'preview html' },
    css: { ext: ['.css'], run: 'preview', command: 'preview css' },
    json: { ext: ['.json'], run: 'validate', command: 'validate json' },
    markdown: { ext: ['.md'], run: 'preview', command: 'preview markdown' },
    shell: { ext: ['.sh', '.ps1'], run: 'analysis', command: 'shellcheck script.sh' },
    text: { ext: ['.txt'], run: 'analysis', command: 'inspect text' },
  };
  const CRYPTO_SNIPPETS = {
    javascript: [
      "const enc = new TextEncoder();",
      "const bytes = enc.encode('hashcod message');",
      "const digest = await crypto.subtle.digest('SHA-256', bytes);",
      "console.log([...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,'0')).join(''));",
    ].join('\n'),
    python: [
      "import hashlib, hmac, secrets",
      "payload = b'hashcod message'",
      "key = secrets.token_bytes(32)",
      "print(hashlib.sha256(payload).hexdigest())",
      "print(hmac.new(key, payload, hashlib.sha256).hexdigest())",
    ].join('\n'),
    rust: [
      "use sha2::{Digest, Sha256};",
      "fn main() {",
      "    let mut h = Sha256::new();",
      "    h.update(b\"hashcod message\");",
      "    println!(\"{:x}\", h.finalize());",
      "}",
    ].join('\n'),
    go: [
      "package main",
      "import (\"crypto/sha256\"; \"fmt\")",
      "func main(){ fmt.Printf(\"%x\\n\", sha256.Sum256([]byte(\"hashcod message\"))) }",
    ].join('\n'),
    solidity: [
      "// SPDX-License-Identifier: MIT",
      "pragma solidity ^0.8.20;",
      "contract HashcodProof {",
      "  function digest(bytes memory payload) public pure returns (bytes32) {",
      "    return keccak256(payload);",
      "  }",
      "}",
    ].join('\n'),
  };
  const DEFAULT_FILES = [
    {
      name: 'main.js',
      language: 'javascript',
      content: CRYPTO_SNIPPETS.javascript,
    },
    { name: 'crypto_lab.py', language: 'python', content: CRYPTO_SNIPPETS.python },
    { name: 'contract.sol', language: 'solidity', content: CRYPTO_SNIPPETS.solidity },
    {
      name: 'README.md',
      language: 'markdown',
      content: '# Hashcod Warp Workspace\n\nEdit code, run JavaScript in the browser sandbox, validate JSON, preview HTML/Markdown, and prepare cryptographic projects in many languages.',
    },
  ];

  function cleanName(value) {
    const name = String(value || '').trim().replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
    return name.slice(0, 80) || 'untitled.js';
  }

  function defaultWorkspace() {
    return {
      version: 2,
      active: 'main.js',
      files: DEFAULT_FILES.map(file => ({ ...file })),
      updatedAt: new Date().toISOString(),
    };
  }

  function languageFromName(name) {
    const lower = String(name || '').toLowerCase();
    for (const [language, profile] of Object.entries(LANGUAGE_PROFILES)) {
      if ((profile.ext || []).some(ext => lower.endsWith(ext))) return language;
    }
    return 'text';
  }

  function normalizeWorkspace(value) {
    const raw = value && typeof value === 'object' ? value : defaultWorkspace();
    const files = Array.isArray(raw.files)
      ? raw.files.slice(0, 80).map(file => ({
          name: cleanName(file && file.name),
          language: String((file && file.language) || languageFromName(file && file.name)).slice(0, 24),
          content: String((file && file.content) || '').slice(0, 500000),
        }))
      : [];
    const unique = [];
    const seen = new Set();
    for (const file of files) {
      if (!seen.has(file.name)) {
        seen.add(file.name);
        unique.push(file);
      }
    }
    const safeFiles = unique.length ? unique : defaultWorkspace().files;
    const active = safeFiles.some(file => file.name === raw.active) ? raw.active : safeFiles[0].name;
    return { version: 2, active, files: safeFiles, updatedAt: new Date().toISOString() };
  }

  function loadWorkspace(storage) {
    try {
      const raw = storage && storage.getItem(STORAGE_KEY);
      return raw ? normalizeWorkspace(JSON.parse(raw)) : defaultWorkspace();
    } catch (_) {
      return defaultWorkspace();
    }
  }

  function saveWorkspace(storage, workspace) {
    const normalized = normalizeWorkspace(workspace);
    if (storage && storage.setItem) storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function formatSource(source) {
    return String(source || '')
      .split(/\r?\n/)
      .map(line => line.replace(/\s+$/g, ''))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trimEnd() + '\n';
  }

  function sandboxDocument(source) {
    const payload = JSON.stringify(String(source || ''));
    return `<!doctype html><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; connect-src 'none'; img-src 'none'; style-src 'unsafe-inline'">
<script>
const send=(level,args)=>parent.postMessage({type:'hashcod-warp-log',level,text:args.map(v=>typeof v==='string'?v:JSON.stringify(v)).join(' ')},'*');
console.log=(...args)=>send('log',args);console.info=(...args)=>send('info',args);console.warn=(...args)=>send('warn',args);console.error=(...args)=>send('error',args);
(async()=>{try{const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;await new AsyncFunction(${payload})();send('ok',['Process exited with code 0']);}catch(error){send('error',[error&&error.stack?error.stack:String(error)]);}})();
<\/script>`;
  }

  async function sha256Hex(text) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(text || '')));
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function detectImports(source) {
    return Array.from(String(source || '').matchAll(/\b(?:import|from|require|use|include|pragma)\b[^\n;]*/g)).map(m => m[0]).slice(0, 24);
  }

  function sourceMetrics(source) {
    const text = String(source || '');
    const chars = text.length;
    const lines = text ? text.split(/\r?\n/).length : 0;
    const tokens = (text.match(/[A-Za-z_][A-Za-z0-9_]*/g) || []).length;
    const cryptoHits = (text.match(/\b(?:sha|hash|hmac|aes|rsa|ed25519|nonce|salt|token|jwt|kyber|dilithium|keccak|argon|pbkdf|scrypt|bcrypt|secret|key)\w*/gi) || []).length;
    return { chars, lines, tokens, cryptoHits, imports: detectImports(text) };
  }

  async function compilePlan(file, files) {
    const language = file.language || languageFromName(file.name);
    const profile = LANGUAGE_PROFILES[language] || LANGUAGE_PROFILES.text;
    const digest = await sha256Hex(file.content);
    const metrics = sourceMetrics(file.content);
    return {
      mode: profile.run,
      language,
      command: profile.command,
      digest,
      metrics,
      workspaceFiles: (files || []).map(item => item.name),
      verdict: metrics.cryptoHits ? 'CRYPTO_CONTEXT_DETECTED' : 'GENERAL_CODE_CONTEXT',
    };
  }

  function downloadBlob(filename, content, mime) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = cleanName(filename);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  global.HashcodWarpWorkspace = {
    STORAGE_KEY,
    cleanName,
    defaultWorkspace,
    normalizeWorkspace,
    loadWorkspace,
    saveWorkspace,
    formatSource,
    sandboxDocument,
    LANGUAGE_PROFILES,
    CRYPTO_SNIPPETS,
    languageFromName,
    sha256Hex,
    sourceMetrics,
    compilePlan,
    downloadBlob,
  };
})(window);
