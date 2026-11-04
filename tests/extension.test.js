import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { $, $$, click, loadExtension, sleep } from './helpers/load-extension.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const bundle = join(root, 'extension', 'content.js');

const STORAGE_KEYS = {
  gemini: 'gcm_folders_data_v2',
  chatgpt: 'gcm_chatgpt_folders_data_v1',
  claude: 'gcm_claude_folders_data_v1',
  deepseek: 'gcm_deepseek_folders_data_v1',
  opencode: 'gcm_opencode_folders_data_v1'
};

for (const platform of ['gemini', 'chatgpt', 'claude', 'deepseek', 'opencode']) {
  test(`${platform}: inyecta panel, barra y checkboxes`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1100);
    assert.ok($(w, '#gcm-folders-box'), 'panel de carpetas');
    assert.ok($(w, '#gcm-toolbar'), 'barra superior');
    assert.equal($$(w, '.gcm-checkbox:not(#gcm-select-all)').length, platform === 'gemini' ? 4 : 3);
    w.close();
  });

  test(`${platform}: auto-clasifica por palabras clave y filtra por carpeta`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1100);
    const data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS[platform]));
    assert.equal(data.assignments.aaaaa11111, 'f_work');
    click(w, $$(w, '.gcm-folder-pill')[1]); // primera carpeta (Programación / Coding)
    await sleep(250);
    const hidden = $$(w, '.gcm-hidden-by-filter');
    assert.ok(hidden.length >= 1, 'oculta lo que no es de la carpeta');
    w.close();
  });

  test(`${platform}: la barra superior se contrae y recuerda su estado`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1100);
    click(w, $(w, '#gcm-toolbar-toggle'));
    assert.ok($(w, '#gcm-toolbar').classList.contains('gcm-collapsed'));
    const data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS[platform]));
    assert.equal(data.view.toolbarCollapsed, true);
    w.close();
  });
}

test('proteger conversaciones seleccionadas las marca con candado', async () => {
  const w = loadExtension(bundle, 'gemini');
  await sleep(1100);
  const first = $$(w, '.gcm-checkbox:not(#gcm-select-all)')[0];
  click(w, first);
  await sleep(100);
  click(w, $(w, '#gcm-protect-btn'));
  await sleep(250);
  assert.equal($$(w, '.gcm-lock-icon').length, 1);
  w.close();
});

test('bóveda de prompts abre el modal e inserta prompt en el chat activo', async () => {
  const w = loadExtension(bundle, 'gemini');
  await sleep(1100);
  const promptsBtn = $(w, '#gcm-prompts-btn');
  assert.ok(promptsBtn, 'botón de prompts existe');
  click(w, promptsBtn);
  await sleep(100);
  const items = $$(w, '.gcm-prompt-item');
  assert.equal(items.length, 3);
  click(w, items[0]);
  await sleep(100);
  const textarea = $(w, '#chat-input');
  assert.ok(textarea.value.includes('Ingeniero de Software Senior'));
  w.close();
});

test('atajo de teclado Alt+Shift+F minimiza y expande el panel', async () => {
  const w = loadExtension(bundle, 'gemini');
  await sleep(1100);
  const box = $(w, '#gcm-folders-box');
  assert.equal(box.classList.contains('gcm-minimized'), false);
  w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'F', altKey: true, shiftKey: true, bubbles: true }));
  await sleep(100);
  assert.equal(box.classList.contains('gcm-minimized'), true);
  w.close();
});

test('datos guardados corruptos no rompen la carga', async () => {
  const w = loadExtension(bundle, 'gemini', { storage: { gcm_folders_data_v2: '{"folders":"no-es-array","assignments":[1,2]}' } });
  await sleep(1100);
  assert.ok($(w, '#gcm-folders-box'));
  w.close();
});
