import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

const app = readFileSync(new URL('../infoswb/app.js', import.meta.url), 'utf8');
const core = readFileSync(new URL('../infoswb/core.js', import.meta.url), 'utf8');
const taxonomy = readFileSync(new URL('../infoswb/taxonomy.json', import.meta.url), 'utf8');
const drugs = readFileSync(new URL('../Biblioteca_Medicamentosa_Pediatrica_MASTER_498.md', import.meta.url), 'utf8');
const root = 'https://raw.githubusercontent.com/iagochaves3-cell/consulta-pediatrica-rapida/';
const primary = root + 'principal/pedwb/PedWB_Consolidado.md';
const pages = 'https://iagochaves3-cell.github.io/consulta-pediatrica-rapida/pedwb/PedWB_Consolidado.md';
const pinned = root + 'bac1acb6676dc3c98d033ad7c1cae933b6c29ed4/pedwb/PedWB_Consolidado.md';
const clinical = '## 189. Síndrome Nefrótica na Infância\n\nTexto documental.\n\n## 199. Epilepsia em Pediatria\n\nRevisão adjuvante.\n\n## 200. Esquizofrenia Infantil\n\nRevisão documental.';

async function load(mode) {
  const calls = [];
  const nodes = new Map();
  const node = key => {
    if (!nodes.has(key)) nodes.set(key, { style: { setProperty() {} }, dataset: {}, classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } }, setAttribute() {}, addEventListener() {} });
    return nodes.get(key);
  };
  const context = {
    document: { querySelector: node, querySelectorAll: () => [], documentElement: node('html'), addEventListener() {} },
    location: { hash: '', href: 'https://iagochaves3-cell.github.io/compeniowb/infoswb/' },
    localStorage: { getItem: () => null }, crypto: webcrypto, TextEncoder, URL, AbortController, setTimeout, clearTimeout,
    fetch: async url => {
      calls.push(url);
      if (url === './taxonomy.json') return { ok: true, text: async () => taxonomy };
      if (url.includes('Biblioteca_Medicamentosa')) return { ok: true, text: async () => drugs };
      if (mode === 'all-fail' || (mode === 'fallback' && url !== pinned)) throw new Error('Simulated outage');
      if (mode === 'invalid' && url !== pinned) return { ok: true, text: async () => '<html>not a corpus</html>' };
      return { ok: true, text: async () => clinical };
    },
  };
  context.window = context;
  context.scrollTo = context.addEventListener = () => {};
  vm.runInNewContext(core, context);
  vm.runInNewContext(app, context);
  // Wait for startup load, without invoking a second concurrent load.
  for (let n = 0; context.infosWB.state.busy && n < 100; n++) await new Promise(resolve => setTimeout(resolve, 5));
  assert.equal(context.infosWB.state.busy, false);
  return { state: context.infosWB.state, calls: calls.filter(u => u.startsWith(root) || u === pages) };
}

test('principal remains first and prevents fallback requests', async () => {
  const { state, calls } = await load('primary');
  assert.deepEqual(calls, [primary]);
  assert.equal(state.source.clinica.usedFallback, false);
  assert.equal(state.source.clinica.url, primary);
});

for (const mode of ['fallback', 'invalid']) test(`${mode}: two unavailable/invalid routes select the immutable snapshot`, async () => {
  const { state, calls } = await load(mode);
  assert.deepEqual(calls, [primary, pages, pinned]);
  assert.equal(state.source.clinica.url, pinned);
  assert.equal(state.source.clinica.usedFallback, true);
  assert.equal(state.source.clinica.count, 3);
  assert.equal(state.source.medicamento.count, 498);
  assert.equal(state.failures.length, 0);
  assert.match(state.source.clinica.sha256, /^[a-f0-9]{64}$/);
  assert.equal(state.items.find(t => t.number === 189 && t.kind === 'clinica').title, 'Síndrome Nefrótica na Infância');
});

test('complete clinical outage is reported while the drug catalogue remains available', async () => {
  const { state, calls } = await load('all-fail');
  assert.deepEqual(calls, [primary, pages, pinned]);
  assert.equal(state.source.clinica, undefined);
  assert.equal(state.source.medicamento.count, 498);
  assert.equal(state.failures.length, 1);
});
