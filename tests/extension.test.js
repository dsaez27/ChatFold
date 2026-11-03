import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { $, $$, click, loadExtension, sleep } from './helpers/load-extension.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const bundle = join(root, 'extension', 'content.js');

for (const platform of ['gemini', 'chatgpt']) {
  test(`${platform}: inyecta panel, barra y checkboxes`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1400);
    assert.ok($(w, '#gcm-folders-box'), 'panel de carpetas');
    assert.ok($(w, '#gcm-toolbar'), 'barra superior');
    assert.equal($$(w, '.gcm-checkbox:not(#gcm-select-all)').length, platform === 'gemini' ? 4 : 3);
    w.close();
  });

  test(`${platform}: auto-clasifica por palabras clave y filtra por carpeta`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1400);
    const data = JSON.parse(w.localStorage.getItem(platform === 'gemini' ? 'gcm_folders_data_v2' : 'gcm_chatgpt_folders_data_v1'));
    assert.equal(data.assignments.aaaaa11111, 'f_work');
    click(w, $$(w, '.gcm-folder-pill')[1]); // primera carpeta (Programación / Coding)
    await sleep(300);
    const hidden = $$(w, '.gcm-hidden-by-filter');
    assert.ok(hidden.length >= 1, 'oculta lo que no es de la carpeta');
    w.close();
  });

  test(`${platform}: la barra superior se contrae y recuerda su estado`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1400);
    click(w, $(w, '#gcm-toolbar-toggle'));
    assert.ok($(w, '#gcm-toolbar').classList.contains('gcm-collapsed'));
    const data = JSON.parse(w.localStorage.getItem(platform === 'gemini' ? 'gcm_folders_data_v2' : 'gcm_chatgpt_folders_data_v1'));
    assert.equal(data.view.toolbarCollapsed, true);
    w.close();
  });
}

test('proteger conversaciones seleccionadas las marca con candado', async () => {
  const w = loadExtension(bundle, 'gemini');
  await sleep(1400);
  const first = $$(w, '.gcm-checkbox:not(#gcm-select-all)')[0];
  click(w, first);
  await sleep(100);
  click(w, $(w, '#gcm-protect-btn'));
  await sleep(300);
  assert.equal($$(w, '.gcm-lock-icon').length, 1);
  w.close();
});

test('datos guardados corruptos no rompen la carga', async () => {
  const w = loadExtension(bundle, 'gemini', { storage: { gcm_folders_data_v2: '{"folders":"no-es-array","assignments":[1,2]}' } });
  await sleep(1400);
  assert.ok($(w, '#gcm-folders-box'));
  w.close();
});
