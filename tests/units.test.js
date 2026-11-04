import assert from 'node:assert/strict';
import { test } from 'node:test';

// Los módulos leen `location`/`localStorage` al cargarse: se simula un entorno mínimo antes de importarlos.
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html lang="es"><body></body></html>', { url: 'https://gemini.google.com/app/test' });
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  location: dom.window.location,
  localStorage: dom.window.localStorage,
  MutationObserver: dom.window.MutationObserver || class {
    observe() {}
    disconnect() {}
    takeRecords() { return []; }
  },
  PointerEvent: dom.window.PointerEvent || dom.window.MouseEvent
});
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });

const { normalizeStoredState } = await import('../src/storage.js');
const { sanitizeMap } = await import('../src/backup.js');
const { detectPlatform } = await import('../src/platform.js');

test('normalizeStoredState descarta datos corruptos y aplica valores por defecto', () => {
  const s = normalizeStoredState({ lang: 'fr', folders: [{ id: 1 }, { id: 'a', name: 'X', keywords: ['A', 3] }], assignments: [], pos: { left: 'x' } }, 'es');
  assert.equal(s.lang, 'es');
  assert.deepEqual(s.folders, [{ id: 'a', name: 'X', color: '#4285f4', keywords: ['a'] }]);
  assert.equal(Array.isArray(s.prompts), true);
  assert.equal(s.prompts.length, 3);
  assert.deepEqual(s.assignments, {});
  assert.equal(s.pos, null);
  assert.deepEqual(s.view, { filter: 'ALL', sort: 'DEFAULT', toolbarCollapsed: false });
});

test('normalizeStoredState conserva una vista válida', () => {
  const s = normalizeStoredState({ view: { filter: 'PROTECTED', sort: 'AZ', toolbarCollapsed: true } }, 'en');
  assert.deepEqual(s.view, { filter: 'PROTECTED', sort: 'AZ', toolbarCollapsed: true });
});

test('sanitizeMap bloquea claves peligrosas, arrays y valores inválidos', () => {
  const src = JSON.parse('{"__proto__": "x", "constructor": "y", "ok": "f1", "bad": 5}');
  const out = sanitizeMap(src, (v) => (typeof v === 'string' ? v : undefined));
  assert.deepEqual(Object.keys(out), ['ok']);
  assert.deepEqual(sanitizeMap([1, 2], (v) => v), {});
  assert.deepEqual(sanitizeMap(null, (v) => v), {});
});

test('detectPlatform reconoce Gemini', () => {
  assert.equal(detectPlatform(), 'gemini');
});
