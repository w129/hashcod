(function (global) {
  'use strict';

  const STORAGE_KEY = 'hashcod_warp_workspace_v1';
  const DEFAULT_FILES = [
    {
      name: 'main.js',
      language: 'javascript',
      content: [
        "console.log('Hashcod Warp Workspace ready');",
        "const modules = ['vault', 'codes', 'reports'];",
        "console.log({ modules, count: modules.length });",
      ].join('\n'),
    },
    {
      name: 'README.md',
      language: 'markdown',
      content: '# Hashcod Warp Workspace\n\nEdit `main.js`, then run it inside the local sandbox.',
    },
  ];

  function cleanName(value) {
    const name = String(value || '').trim().replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
    return name.slice(0, 80) || 'untitled.js';
  }

  function defaultWorkspace() {
    return {
      version: 1,
      active: 'main.js',
      files: DEFAULT_FILES.map(file => ({ ...file })),
      updatedAt: new Date().toISOString(),
    };
  }

  function normalizeWorkspace(value) {
    const raw = value && typeof value === 'object' ? value : defaultWorkspace();
    const files = Array.isArray(raw.files)
      ? raw.files.slice(0, 80).map(file => ({
          name: cleanName(file && file.name),
          language: String((file && file.language) || 'text').slice(0, 24),
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
    return { version: 1, active, files: safeFiles, updatedAt: new Date().toISOString() };
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
    downloadBlob,
  };
})(window);
