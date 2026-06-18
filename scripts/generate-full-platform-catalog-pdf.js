const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'exports');
const OUT_FILE = path.join(OUT_DIR, 'Hashcod-full-services-tools-and-10000-codes-catalog.pdf');
const SHA_FILE = `${OUT_FILE}.sha256`;

const ascii = (value) => String(value ?? '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^\x20-\x7E]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const loadCatalog = () => {
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'icons.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'catalog.js'), 'utf8'), context);
  return context.window.OCG_CATALOG || [];
};

const menuToolLabels = () => {
  const source = fs.readFileSync(path.join(ROOT, 'app', 'app.jsx'), 'utf8');
  const labels = new Set();
  for (const match of source.matchAll(/<MenuButton\s+label=\{?`?\$?\{?PLATFORM_DISPLAY_NAME\}?[^>]*|<MenuButton\s+label="([^"]+)"/g)) {
    if (match[1]) labels.add(ascii(match[1]));
  }
  for (const match of source.matchAll(/<MenuButton\s+label=\{`?\$\{PLATFORM_DISPLAY_NAME\}\s*([^`}]*)`?\}/g)) {
    labels.add(ascii(`Hashcod ${match[1] || ''}`));
  }
  return Array.from(labels).filter(Boolean).sort((a, b) => a.localeCompare(b));
};

const SERVICES = [
  ['Cryptographic code generation', 'Batch generation from 1 to 100,000 outputs with configurable strength, prefix, export and database save workflows.'],
  ['Tokenization and credential workflows', 'JWT, API keys, licenses, QR payloads, serials, access codes, token vaults and verification flows.'],
  ['Evidence and certificates', 'Brand evidence, code registry, private certificates, PDF stamps, QR verification and audit hashes.'],
  ['Document signing and PDF tools', 'DocuSeal-based local PDF signer, Hashcod black stamp, PDF preview, signed copies and AGPL source disclosure.'],
  ['Developer and IDE systems', 'Warp Workspace, Crypto IDE, Transform CMD, code GUI, code library and programming utilities for cryptographic projects.'],
  ['Mathematical analysis labs', 'Parametric analyzer, graph lab, LWE lattice lab, pivot kernel, crypto exams, code incubator and geometric code analysis.'],
  ['Storage and packaging', 'Database vault, file ZIP packager, OCG pack, ISO, YAML, JSON, Markdown, PNG, QR, virtual cards and container port.'],
  ['Security suite', 'Token inspector, license shield, secret scanner, secure tab, QR verifier, fingerprint, benchmark, password entropy, API trust and risk engine.'],
  ['Phone and network systems', 'HNS, HNS Browser, HOS, HCP, Phone OS link, SMS gateway queue and notification/browser payload workflows.'],
  ['Business and governance', 'Quote system, billing timer, client vault, launch center, license factory 400, Hashcod Law and anti-fraud audit controls.'],
];

const detailedToolServices = () => {
  const sourcePath = path.join(ROOT, 'scripts', 'generate-tools-pricing-pdf.js');
  if (!fs.existsSync(sourcePath)) return [];
  const source = fs.readFileSync(sourcePath, 'utf8');
  const block = source.slice(source.indexOf('const TOOL_GROUPS'), source.indexOf('const PRICE_RULES'));
  const rows = [];
  for (const match of block.matchAll(/\['([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'/g)) {
    if (!match[1] || /Core operations|Document|Labs|Security|Platform|Editors/i.test(match[1])) continue;
    rows.push({ name: ascii(match[1]), description: ascii(match[2]), kind: ascii(match[3]) });
  }
  const seen = new Set();
  return rows.filter(row => {
    const key = row.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const familyFrom = (type) => {
  const text = `${type.id || ''} ${type.label || ''} ${type.originalLabel || ''} ${type.engine || ''} ${type.about || ''}`;
  const hc = text.match(/\bHC-([A-Z0-9-]+)-/);
  if (hc) return hc[1];
  if (/AES|ChaCha|Salsa|Serpent|Twofish|SM4|GOST|Kuznyechik|Magma|Blowfish|3DES/i.test(text)) return 'SYMMETRIC';
  if (/SHA|BLAKE|Keccak|RIPEMD|Whirlpool|Hash|XOF|CRC/i.test(text)) return 'HASH';
  if (/HMAC|MAC|Poly1305|CMAC|GMAC/i.test(text)) return 'MAC';
  if (/Argon|bcrypt|scrypt|PBKDF|KDF/i.test(text)) return 'KDF';
  if (/JWT|Token|License|QR|TOTP|UUID|ULID|Nonce|Passkey|API/i.test(text)) return 'TOKEN';
  if (/RSA|ECDSA|EdDSA|BLS|Schnorr|Blind|Ring|Group/i.test(text)) return 'SIGNATURE';
  if (/Kyber|Dilithium|Falcon|SPHINCS|ML-|LWE|PQC|post-quantum/i.test(text)) return 'PQC';
  return 'GENERAL';
};

const flattenCodes = (catalog) => {
  let index = 0;
  return catalog.flatMap(category => (category.types || []).map(type => {
    index += 1;
    return {
      index,
      category: ascii(category.label || category.id),
      id: ascii(type.id || ''),
      name: ascii(type.label || type.originalLabel || type.id || ''),
      badge: ascii(type.badge || ''),
      family: familyFrom(type),
      entropy: ascii(type.entropy || ''),
      standard: ascii(type.std || ''),
      engine: ascii(type.engine || ''),
      about: ascii(type.about || ''),
    };
  }));
};

const sha256File = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const trim = (text, max) => {
  const value = ascii(text);
  return value.length > max ? `${value.slice(0, Math.max(0, max - 3))}...` : value;
};

const wrap = (text, maxChars, maxLines = 3) => {
  const words = ascii(text).split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
    if (lines.length >= maxLines) break;
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
};

const drawLogo = (page, x, y, size, color = rgb(0, 0, 0)) => {
  const stroke = Math.max(1.4, size * 0.085);
  page.drawLine({ start: { x, y: y + size * 0.76 }, end: { x, y: y + size * 0.28 }, thickness: stroke, color });
  page.drawLine({ start: { x, y: y + size * 0.76 }, end: { x: x + size, y: y + size * 0.76 }, thickness: stroke, color });
  page.drawLine({ start: { x: x + size, y: y + size * 0.76 }, end: { x: x + size, y: y + size * 0.28 }, thickness: stroke, color });
  page.drawSvgPath(
    `M ${x + size * 0.5} ${y + size * 0.42} L ${x + size * 0.22} ${y} L ${x + size * 0.78} ${y} Z`,
    { color }
  );
};

const text = (page, value, x, y, size, font, color = rgb(0, 0, 0)) => {
  page.drawText(trim(value, 180), { x, y, size, font, color });
};

const addHeader = (doc, page, fonts, title, pageNo, totalPages) => {
  drawLogo(page, 28, 548, 28);
  text(page, 'Hashcod', 68, 559, 18, fonts.bold);
  text(page, title, 155, 563, 9, fonts.regular, rgb(0.28, 0.28, 0.28));
  text(page, `Page ${pageNo}/${totalPages}`, 764, 563, 8, fonts.mono);
  page.drawLine({ start: { x: 28, y: 542 }, end: { x: 812, y: 542 }, thickness: 1.1, color: rgb(0, 0, 0) });
};

const addWrapped = (page, value, x, y, opts) => {
  const { size, font, maxChars, maxLines, leading = size + 3, color = rgb(0, 0, 0) } = opts;
  wrap(value, maxChars, maxLines).forEach((line, i) => text(page, line, x, y - i * leading, size, font, color));
};

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const catalog = loadCatalog();
  const codes = flattenCodes(catalog);
  const tools = menuToolLabels();
  const detailedTools = detailedToolServices();
  const categories = catalog.map(category => ({
    id: category.id,
    label: ascii(category.label || category.id),
    count: (category.types || []).length,
    desc: ascii(category.desc || ''),
  }));

  const doc = await PDFDocument.create();
  doc.setTitle('Hashcod Services, Tools and 10,000 Cryptographic Codes Catalog');
  doc.setAuthor('Hashcod');
  doc.setCreator('Hashcod Platform');
  doc.setProducer('Hashcod PDF Generator');
  doc.setCreationDate(new Date());
  doc.setModificationDate(new Date());

  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    mono: await doc.embedFont(StandardFonts.Courier),
    monoBold: await doc.embedFont(StandardFonts.CourierBold),
  };

  const pages = [];
  const newPage = () => {
    const page = doc.addPage([842, 595]);
    pages.push(page);
    return page;
  };

  let page = newPage();
  drawLogo(page, 46, 478, 52);
  text(page, 'HASHCOD', 112, 513, 34, fonts.bold);
  text(page, 'FULL SERVICES, TOOLS AND CRYPTOGRAPHIC CODES CATALOG', 46, 448, 18, fonts.bold);
  addWrapped(page, 'This PDF summarizes the platform services, the visible tool menu, code categories and all 10,000 cryptographic code families currently loaded by Hashcod.', 46, 414, { size: 11, font: fonts.regular, maxChars: 110, maxLines: 4 });
  const summary = [
    ['Total cryptographic codes', codes.length.toLocaleString('en-US')],
    ['Code categories', categories.length.toLocaleString('en-US')],
    ['Detected menu tools', tools.length.toLocaleString('en-US')],
    ['Service groups', SERVICES.length.toLocaleString('en-US')],
    ['Generated', new Date().toISOString()],
  ];
  let y = 344;
  for (const [k, v] of summary) {
    page.drawRectangle({ x: 46, y: y - 6, width: 360, height: 26, borderWidth: 1, borderColor: rgb(0, 0, 0) });
    text(page, k, 58, y + 2, 9, fonts.mono, rgb(0.32, 0.32, 0.32));
    text(page, v, 260, y + 2, 10, fonts.monoBold);
    y -= 32;
  }
  addWrapped(page, 'Important: this is a technical and commercial inventory document. It does not claim legal registration, financial valuation, or cryptographic certification by an external authority.', 46, 138, { size: 9, font: fonts.regular, maxChars: 110, maxLines: 4, color: rgb(0.25, 0.25, 0.25) });

  page = newPage();
  text(page, 'Hashcod services', 34, 540, 18, fonts.bold);
  y = 508;
  SERVICES.forEach(([name, desc], i) => {
    page.drawRectangle({ x: 34, y: y - 40, width: 770, height: 44, borderWidth: 0.7, borderColor: rgb(0.72, 0.72, 0.72) });
    text(page, String(i + 1).padStart(2, '0'), 46, y - 10, 10, fonts.monoBold);
    text(page, name, 82, y - 6, 11, fonts.bold);
    addWrapped(page, desc, 82, y - 22, { size: 8, font: fonts.regular, maxChars: 132, maxLines: 2, color: rgb(0.28, 0.28, 0.28) });
    y -= 48;
  });

  page = newPage();
  text(page, 'Code categories', 34, 540, 18, fonts.bold);
  y = 514;
  for (const category of categories) {
    if (y < 64) {
      page = newPage();
      text(page, 'Code categories', 34, 540, 18, fonts.bold);
      y = 514;
    }
    page.drawRectangle({ x: 34, y: y - 26, width: 770, height: 30, borderWidth: 0.5, borderColor: rgb(0.76, 0.76, 0.76) });
    text(page, category.id, 44, y - 6, 7.5, fonts.mono, rgb(0.3, 0.3, 0.3));
    text(page, category.label, 214, y - 6, 8.4, fonts.bold);
    text(page, `${category.count} codes`, 706, y - 6, 8.4, fonts.monoBold);
    y -= 34;
  }

  page = newPage();
  text(page, 'Detailed services and tools', 34, 540, 18, fonts.bold);
  y = 512;
  detailedTools.forEach((tool, i) => {
    if (y < 70) {
      page = newPage();
      text(page, 'Detailed services and tools', 34, 540, 18, fonts.bold);
      y = 512;
    }
    page.drawRectangle({ x: 34, y: y - 37, width: 770, height: 42, borderWidth: 0.5, borderColor: rgb(0.72, 0.72, 0.72) });
    text(page, String(i + 1).padStart(3, '0'), 44, y - 7, 7.4, fonts.mono);
    text(page, tool.name, 82, y - 5, 8.5, fonts.bold);
    text(page, tool.kind.toUpperCase(), 682, y - 5, 7.4, fonts.mono);
    addWrapped(page, tool.description, 82, y - 20, { size: 7.4, font: fonts.regular, maxChars: 126, maxLines: 2, color: rgb(0.28, 0.28, 0.28) });
    y -= 46;
  });

  page = newPage();
  text(page, 'Visible top-menu tools', 34, 540, 18, fonts.bold);
  y = 514;
  tools.forEach((tool, i) => {
    if (y < 58) {
      page = newPage();
      text(page, 'Visible top-menu tools', 34, 540, 18, fonts.bold);
      y = 514;
    }
    page.drawRectangle({ x: 34, y: y - 18, width: 370, height: 23, borderWidth: 0.4, borderColor: rgb(0.72, 0.72, 0.72) });
    text(page, String(i + 1).padStart(3, '0'), 44, y - 5, 7.4, fonts.mono);
    text(page, tool, 82, y - 5, 8, fonts.regular);
    y -= 27;
  });

  const codePagesStart = pages.length;
  const rowsPerPage = 30;
  for (let offset = 0; offset < codes.length; offset += rowsPerPage) {
    page = newPage();
    text(page, 'All cryptographic codes', 34, 540, 18, fonts.bold);
    text(page, 'IDX', 34, 516, 7.2, fonts.monoBold);
    text(page, 'CODE / NAME', 74, 516, 7.2, fonts.monoBold);
    text(page, 'CATEGORY', 310, 516, 7.2, fonts.monoBold);
    text(page, 'FAMILY', 460, 516, 7.2, fonts.monoBold);
    text(page, 'ENTROPY', 542, 516, 7.2, fonts.monoBold);
    text(page, 'STANDARD / ENGINE', 630, 516, 7.2, fonts.monoBold);
    page.drawLine({ start: { x: 34, y: 508 }, end: { x: 808, y: 508 }, thickness: 0.7, color: rgb(0, 0, 0) });
    y = 492;
    codes.slice(offset, offset + rowsPerPage).forEach(row => {
      page.drawLine({ start: { x: 34, y: y - 6 }, end: { x: 808, y: y - 6 }, thickness: 0.25, color: rgb(0.83, 0.83, 0.83) });
      text(page, String(row.index).padStart(5, '0'), 34, y, 6.8, fonts.mono);
      addWrapped(page, `${row.name} ${row.badge ? `[${row.badge}]` : ''}`, 74, y, { size: 6.8, font: fonts.monoBold, maxChars: 42, maxLines: 2, leading: 8 });
      text(page, trim(row.category, 24), 310, y, 6.8, fonts.mono);
      text(page, trim(row.family, 14), 460, y, 6.8, fonts.mono);
      text(page, trim(row.entropy || '-', 14), 542, y, 6.8, fonts.mono);
      addWrapped(page, `${row.standard || '-'} | ${row.engine || '-'}`, 630, y, { size: 6.6, font: fonts.mono, maxChars: 34, maxLines: 2, leading: 8 });
      y -= 16;
    });
  }

  const totalPages = pages.length;
  pages.forEach((p, i) => addHeader(doc, p, fonts, 'Services, tools and 10,000 codes', i + 1, totalPages));
  if (codePagesStart) {
    pages[codePagesStart].drawText(`Codes section starts here: ${codes.length.toLocaleString('en-US')} rows`, { x: 34, y: 34, size: 8, font: fonts.mono, color: rgb(0.25, 0.25, 0.25) });
  }

  const bytes = await doc.save({ useObjectStreams: true });
  fs.writeFileSync(OUT_FILE, bytes);
  const digest = sha256File(OUT_FILE);
  fs.writeFileSync(SHA_FILE, `${digest}  ${path.basename(OUT_FILE)}\n`, 'ascii');
  console.log(`PDF=${OUT_FILE}`);
  console.log(`PAGES=${totalPages}`);
  console.log(`CODES=${codes.length}`);
  console.log(`TOOLS=${tools.length}`);
  console.log(`DETAILED_TOOLS=${detailedTools.length}`);
  console.log(`SHA256=${digest}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
