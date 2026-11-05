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
    assert.ok($(w, '#gcm-folders-box svg.gcm-svg-logo'), 'logo SVG en el encabezado del panel');
    assert.ok($$(w, '#gcm-toolbar svg.gcm-svg-icon').length >= 4, 'iconos SVG en la barra superior');
    assert.ok($$(w, '#gcm-folders-box .gcm-panel-footer svg.gcm-svg-icon').length === 2, 'iconos SVG en los 2 botones del pie del panel');
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

  test(`${platform}: la barra superior se contrae, cambia entre horizontal/vertical y recuerda su estado`, async () => {
    const w = loadExtension(bundle, platform);
    await sleep(1100);
    click(w, $(w, '#gcm-toolbar-orient'));
    assert.ok($(w, '#gcm-toolbar').classList.contains('gcm-vertical'), 'modo vertical activado');
    let data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS[platform]));
    assert.equal(data.view.toolbarVertical, true);

    click(w, $(w, '#gcm-toolbar-toggle'));
    assert.ok($(w, '#gcm-toolbar').classList.contains('gcm-collapsed'));
    data = JSON.parse(w.localStorage.getItem(STORAGE_KEYS[platform]));
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

test('chatgpt: detecta y borra tareas remotas (/codex/tasks/task_...) via API', async () => {
  const w = loadExtension(bundle, 'chatgpt');
  const calledUrls = [];
  w.fetch = async (url) => {
    calledUrls.push(url);
    if (url === '/api/auth/session') {
      return { ok: true, status: 200, json: async () => ({ accessToken: 'tok_test_123' }) };
    }
    if (url.startsWith('/backend-api/wham/tasks/')) {
      return { ok: true, status: 200 };
    }
    return { ok: false, status: 404 };
  };
  await sleep(1100);
  const taskCb = $(w, '.gcm-checkbox[data-conv-id="task_e_ccccc33333"]');
  assert.ok(taskCb, 'checkbox inyectado en la tarea remota');
  click(w, taskCb);
  await sleep(100);
  click(w, $(w, '#gcm-delete-btn'));
  await sleep(150);
  const confirmBtn = $(w, '#gcm-modal-overlay .gcm-btn-danger');
  assert.ok(confirmBtn, 'modal de confirmación abierto');
  click(w, confirmBtn);
  await sleep(600);
  assert.ok(calledUrls.includes('/backend-api/wham/tasks/task_e_ccccc33333'), 'llamó al endpoint de borrado de tareas remotas');
  assert.equal($(w, 'a[href*="/codex/tasks/task_e_ccccc33333"]'), null, 'fila eliminada del DOM');
  w.close();
});

test('chatgpt: si DELETE de tarea remota devuelve 403, usa fallback POST /archive y elimina la fila', async () => {
  const w = loadExtension(bundle, 'chatgpt');
  const calledUrls = [];
  w.fetch = async (url, init) => {
    calledUrls.push(`${init?.method || 'GET'} ${url}`);
    if (url === '/api/auth/session') {
      return { ok: true, status: 200, json: async () => ({ accessToken: 'tok_test_123' }) };
    }
    if (url === '/backend-api/wham/tasks/task_e_ccccc33333' && init?.method === 'DELETE') {
      return { ok: false, status: 403 };
    }
    if (url === '/backend-api/wham/tasks/task_e_ccccc33333/archive' && init?.method === 'POST') {
      return { ok: true, status: 200 };
    }
    return { ok: false, status: 404 };
  };
  await sleep(1100);
  const taskCb = $(w, '.gcm-checkbox[data-conv-id="task_e_ccccc33333"]');
  click(w, taskCb);
  await sleep(100);
  click(w, $(w, '#gcm-delete-btn'));
  await sleep(150);
  click(w, $(w, '#gcm-modal-overlay .gcm-btn-danger'));
  await sleep(600);
  assert.ok(calledUrls.includes('POST /backend-api/wham/tasks/task_e_ccccc33333/archive'), 'usó fallback /archive tras 403 en DELETE');
  assert.equal($(w, 'a[href*="/codex/tasks/task_e_ccccc33333"]'), null, 'fila eliminada del DOM');
  w.close();
});

test('chatgpt: detecta tareas en la nube con ícono SVG a la derecha sin href y las borra resolviendo ID por título', async () => {
  const w = loadExtension(bundle, 'chatgpt');
  const calledUrls = [];
  w.fetch = async (url, init) => {
    calledUrls.push(`${init?.method || 'GET'} ${url}`);
    if (url === '/api/auth/session') {
      return { ok: true, status: 200, json: async () => ({ accessToken: 'tok_test_123' }) };
    }
    if (url === '/backend-api/wham/tasks' && (!init?.method || init.method === 'GET')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          items: [{ id: 'task_e_68731280c5748321949876161175f394', title: 'Crear nuevo tema con colores diferentes' }]
        })
      };
    }
    if (url === '/backend-api/wham/tasks/task_e_68731280c5748321949876161175f394' && init?.method === 'DELETE') {
      return { ok: true, status: 200 };
    }
    return { ok: false, status: 404 };
  };
  await sleep(1100);

  // Insertar una fila de tarea en la nube de Codex sin atributo href (solo texto + ícono de nube SVG a la derecha)
  const nav = $(w, 'nav');
  const cloudRow = w.document.createElement('div');
  cloudRow.className = 'group __menu-item';
  cloudRow.innerHTML =
    '<div class="truncate"><span dir="auto">Crear nuevo tema con colores diferentes</span></div><svg viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>';
  nav.appendChild(cloudRow);

  await sleep(750);
  const cloudCb = cloudRow.querySelector('.gcm-checkbox');
  assert.ok(cloudCb, 'checkbox inyectado en fila de tarea en la nube sin href');

  click(w, cloudCb);
  await sleep(100);
  click(w, $(w, '#gcm-delete-btn'));
  await sleep(150);
  click(w, $(w, '#gcm-modal-overlay .gcm-btn-danger'));
  await sleep(650);

  assert.ok(
    calledUrls.includes('DELETE /backend-api/wham/tasks/task_e_68731280c5748321949876161175f394'),
    'resolvió el ID real por título y llamó a DELETE /backend-api/wham/tasks/{id}'
  );
  assert.equal(cloudRow.isConnected, false, 'fila de nube eliminada del DOM');
  w.close();
});

test('al marcar Todo (#gcm-select-all), carga automáticamente el historial hacia abajo y marca los chats nuevos que van apareciendo', async () => {
  const w = loadExtension(bundle, 'chatgpt');
  await sleep(1100);

  const selectAll = $(w, '#gcm-select-all');
  selectAll.checked = true;
  selectAll.dispatchEvent(new w.Event('change', { bubbles: true }));
  await sleep(150);

  assert.equal($$(w, '.gcm-checkbox.gcm-checked:not(#gcm-select-all)').length, 3, 'marca los 3 chats iniciales');
  assert.ok($(w, '#gcm-autoscroll-btn').classList.contains('active'), 'activa la carga automática del historial hacia abajo');

  // Simular que al hacer scroll hacia abajo aparecen 2 conversaciones nuevas en la barra lateral
  const nav = $(w, 'nav');
  const newChat1 = w.document.createElement('a');
  newChat1.href = '/c/ddddd44444';
  newChat1.textContent = 'Chat antiguo cargado 1';
  const newChat2 = w.document.createElement('a');
  newChat2.href = '/c/eeeee55555';
  newChat2.textContent = 'Chat antiguo cargado 2';
  nav.appendChild(newChat1);
  nav.appendChild(newChat2);

  await sleep(1500);
  assert.equal($$(w, '.gcm-checkbox.gcm-checked:not(#gcm-select-all)').length, 5, 'los chats nuevos se marcan automáticamente a medida que cargan');
  assert.equal(selectAll.checked, true, 'el checkbox Todo permanece marcado');

  // Al desmarcar Todo, detiene el auto-scroll y desmarca todos
  selectAll.checked = false;
  selectAll.dispatchEvent(new w.Event('change', { bubbles: true }));
  await sleep(150);
  assert.equal($$(w, '.gcm-checkbox.gcm-checked:not(#gcm-select-all)').length, 0);
  w.close();
});
