import { showConfirmModal, updateStatusToast } from './dialogs.js';
import { refreshUI } from './main.js';
import { CONV_LINK_SELECTOR, PLATFORM_KEY, SELECTORS } from './platform.js';
import { extractConvTitle, findRowById, getSidebarElement, isSingleRowContainer } from './sidebar.js';
import { selectedMap, state, t } from './state.js';
import { saveFolderData } from './storage.js';
import { updateToolbarState } from './toolbar.js';
import { isActiveOverlay, pollUntil, realClick, sleep } from './utils.js';

function isPinOrArchiveButton(btn, allowArchive = false) {
  if (!btn) return true;
  const label = (
    (btn.getAttribute?.('aria-label') || '') +
    ' ' +
    (btn.getAttribute?.('title') || '') +
    ' ' +
    (btn.getAttribute?.('data-testid') || '')
  ).toLowerCase();
  if (allowArchive && label.includes('archiv')) {
    return false;
  }
  return (
    label.includes('fijar') ||
    label.includes('desfijar') ||
    label.includes('pin') ||
    label.includes('unpin') ||
    label.includes('archiv')
  );
}

/** Determina si una fila/ID corresponde a una Tarea Remota de ChatGPT / Codex (`/codex/tasks/` o `task_...`). */
function isRemoteTask(targetId, link, row) {
  if (typeof targetId === 'string' && targetId.startsWith('task_')) return true;
  if (row?.getAttribute?.('data-gcm-task') === '1' || link?.getAttribute?.('data-gcm-task') === '1') return true;
  const href = link?.getAttribute?.('href') || '';
  return href.includes('/codex/tasks/') || href.includes('/codex') || href.includes('/tasks/');
}

function findOptionsTrigger(row, link, isTask = false) {
  const targets = [row, link, row.parentElement].filter(Boolean);
  for (const tEl of targets) {
    try {
      tEl.dispatchEvent(new CustomEvent('gcm:react-hover', { bubbles: true }));
    } catch (_) {}
    tEl.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    tEl.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
    tEl.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    tEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
  }

  // Seguridad: nunca buscar el botón de opciones en un contenedor que tenga OTRAS conversaciones,
  // o se abriría el menú (y se borraría) la conversación equivocada.
  const countConvLinks = (el) => el.querySelectorAll(CONV_LINK_SELECTOR).length;
  const scopes = [];
  scopes.push(row);
  if (row.parentElement && row.parentElement !== document.body && countConvLinks(row.parentElement) <= 1) {
    scopes.push(row.parentElement);
  }
  if (row.nextElementSibling && countConvLinks(row.nextElementSibling) === 0) {
    scopes.push(row.nextElementSibling);
  }
  const allowArchiveBtn = isTask || PLATFORM_KEY === 'chatgpt';
  const prioritySelectors =
    PLATFORM_KEY === 'chatgpt'
      ? [
          'button[data-testid^="history-item-"][data-testid$="-options"]',
          'button[data-testid*="options"]',
          'button[aria-haspopup="menu"]',
          'button[data-trailing-button]',
          'button[aria-label*="Options"], button[aria-label*="Opciones"], button[aria-label*="More"], button[aria-label*="Más"]',
          'button[aria-label*="rchiv"], button[title*="rchiv"], button[data-testid*="archive"]',
          'button:not(.gcm-checkbox)'
        ]
      : [SELECTORS.optionsTrigger];

  for (const sel of prioritySelectors) {
    for (const scope of scopes) {
      const candidates = Array.from(scope.querySelectorAll(sel));
      const valid = candidates.find((b) => !b.classList?.contains('gcm-checkbox') && !isPinOrArchiveButton(b, allowArchiveBtn));
      if (valid) return valid;
    }
  }

  return null;
}

async function removeDeletedRowFromDOM(row, targetId) {
  if (!row && targetId) {
    const found = findRowById(targetId);
    row = found?.row;
  }
  if (!row) return;

  let containerToRemove = row;
  const parentLi = row.closest('li');
  if (parentLi && isSingleRowContainer(parentLi)) {
    containerToRemove = parentLi;
  } else if (
    row.parentElement &&
    row.parentElement !== document.body &&
    row.parentElement.tagName === 'DIV' &&
    isSingleRowContainer(row.parentElement) &&
    (row.parentElement.hasAttribute('data-sidebar-chatgpt-conversation-key') ||
      (row.parentElement.getAttribute('data-testid') || '').startsWith('history-item'))
  ) {
    containerToRemove = row.parentElement;
  }

  // Solo eliminar la fila individual; jamás eliminar contenedores <ol>, <ul> ni wrappers .relative de React
  if (isSingleRowContainer(containerToRemove)) {
    if (containerToRemove.isConnected) {
      row.classList?.add('gcm-row-deleting');
      containerToRemove.classList?.add('gcm-row-deleting');
      await sleep(220);
    }
    containerToRemove.remove();
  }
}

function cleanupEmptySidebarItems() {
  const sidebar = getSidebarElement() || document;
  const lis = sidebar.querySelectorAll('li');
  lis.forEach((li) => {
    if (!li.querySelector(CONV_LINK_SELECTOR) && !li.textContent?.trim()) {
      li.remove();
    }
  });
}

function checkRedirectIfActiveChatDeleted(deletedIds) {
  if (PLATFORM_KEY !== 'chatgpt' || !Array.isArray(deletedIds) || deletedIds.length === 0) return;
  const currentPath = location.pathname;
  const isCurrentDeleted = deletedIds.some((id) => currentPath.includes(id));
  if (isCurrentDeleted) {
    // No usar selectores genéricos (p. ej. "button:has(svg)"): podrían hacer clic en un botón cualquiera.
    const newChatBtn = document.querySelector('[data-testid="create-new-chat-button"], [data-testid="new-chat-button"], a[href="/"]');
    if (newChatBtn) {
      realClick(newChatBtn);
    } else {
      location.href = '/';
    }
  }
}

/** Token de sesión de ChatGPT (se reutiliza; `forceRefresh` lo vuelve a pedir cuando expiró). */
async function getChatGptToken(forceRefresh = false) {
  if (forceRefresh) state.cachedChatGptToken = null;
  if (!state.cachedChatGptToken) {
    const sessRes = await fetch('/api/auth/session', { credentials: 'include' });
    if (sessRes.ok) {
      const sessData = await sessRes.json();
      state.cachedChatGptToken = sessData?.accessToken || null;
    }
  }
  return state.cachedChatGptToken;
}

function getCookieValue(name) {
  try {
    const m = (document.cookie || '').match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[1]) : null;
  } catch (_) {
    return null;
  }
}

function buildChatGptHeaders(token, includeAccount = true) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  if (includeAccount) {
    const accountId = getCookieValue('_account');
    if (accountId && accountId !== 'personal') {
      headers['ChatGPT-Account-Id'] = accountId;
    }
  }
  const deviceId = getCookieValue('oai-did') || (typeof localStorage !== 'undefined' && localStorage.getItem?.('oai-did'));
  if (deviceId) {
    headers['OAI-Device-Id'] = deviceId;
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    headers['OAI-Language'] = navigator.language;
  }
  return headers;
}

async function hideChatGptConversation(targetId, token) {
  const headers = buildChatGptHeaders(token, true);
  // 1) PATCH estándar { is_visible: false }
  let lastRes = await fetch(`/backend-api/conversation/${targetId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers,
    body: JSON.stringify({ is_visible: false })
  });
  if (lastRes.ok || lastRes.status === 401) return lastRes;

  // Si había cookie de workspace (_account) pero el chat es personal, reintentar sin ChatGPT-Account-Id
  if (headers['ChatGPT-Account-Id']) {
    const personalRes = await fetch(`/backend-api/conversation/${targetId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: buildChatGptHeaders(token, false),
      body: JSON.stringify({ is_visible: false })
    });
    if (personalRes.ok || personalRes.status === 401) return personalRes;
    lastRes = personalRes;
  }

  // 2) Fallback: DELETE directo o archivar por si es un hilo especial (Gizmo / Proyecto)
  try {
    const delRes = await fetch(`/backend-api/conversation/${targetId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers
    });
    if (delRes.ok) return delRes;
  } catch (_) {}

  try {
    const archRes = await fetch(`/backend-api/conversation/${targetId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers,
      body: JSON.stringify({ is_archived: true })
    });
    if (archRes.ok) return archRes;
  } catch (_) {}

  return lastRes;
}

async function deleteOrArchiveRemoteTaskApi(targetId, token) {
  const headers = buildChatGptHeaders(token, true);
  // 1) Intentar DELETE directo de la tarea remota (/backend-api/wham/tasks/{id})
  try {
    const delRes = await fetch(`/backend-api/wham/tasks/${targetId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers
    });
    if (delRes.ok || delRes.status === 401) return delRes;
  } catch (_) {}

  // 2) Fallback: archivar la tarea remota (/backend-api/wham/tasks/{id}/archive) y luego intentar DELETE
  // Nota: en Codex muchas tareas devuelven 403/405 al hacer DELETE directo pero permiten POST /archive.
  try {
    const archRes = await fetch(`/backend-api/wham/tasks/${targetId}/archive`, {
      method: 'POST',
      credentials: 'include',
      headers
    });
    if (archRes.ok) {
      try {
        await fetch(`/backend-api/wham/tasks/${targetId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers
        });
      } catch (_) {}
      return archRes;
    }
    if (archRes.status === 401) return archRes;
  } catch (_) {}

  // 3) Segundo fallback: PATCH de tarea remota (/backend-api/wham/tasks/{id})
  try {
    const patchRes = await fetch(`/backend-api/wham/tasks/${targetId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers,
      body: JSON.stringify({ archived: true, is_archived: true, is_visible: false })
    });
    if (patchRes.ok || patchRes.status === 401) return patchRes;
  } catch (_) {}

  // 4) Tercer fallback para tareas programadas estándar (/backend-api/tasks/{id})
  return fetch(`/backend-api/tasks/${targetId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers
  });
}

function getAlternateChatGptId(id) {
  if (typeof id !== 'string') return null;
  const taskHex = /^task_e_([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i.exec(id);
  if (taskHex) {
    return `${taskHex[1]}-${taskHex[2]}-${taskHex[3]}-${taskHex[4]}-${taskHex[5]}`.toLowerCase();
  }
  const uuidParts = /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i.exec(id);
  if (uuidParts) {
    return `task_e_${uuidParts[1]}${uuidParts[2]}${uuidParts[3]}${uuidParts[4]}${uuidParts[5]}`.toLowerCase();
  }
  return null;
}

let cachedRemoteCatalog = { ts: 0, entries: [] };

async function resolveChatGptIdByTitle(row, targetId, token) {
  if (!row) return null;
  const rawTitle = extractConvTitle(row, targetId) || '';
  const normTitle = rawTitle.replace(/\.\.\.$/, '').trim().toLowerCase();
  if (!normTitle) return null;

  const now = Date.now();
  if (now - cachedRemoteCatalog.ts > 15000 || cachedRemoteCatalog.entries.length === 0) {
    const headers = buildChatGptHeaders(token, true);
    const endpoints = [
      { url: '/backend-api/wham/tasks', isTask: true },
      { url: '/backend-api/tasks', isTask: true },
      { url: '/backend-api/conversations?offset=0&limit=100&order=updated', isTask: false }
    ];
    const entries = [];
    for (const ep of endpoints) {
      try {
        const r = await fetch(ep.url, { credentials: 'include', headers });
        if (r.ok) {
          const data = await r.json();
          const list =
            data?.items || data?.tasks || data?.data || data?.results || (Array.isArray(data) ? data : []);
          if (Array.isArray(list)) {
            for (const item of list) {
              const id = item?.id || item?.task_id || item?.conversation_id;
              const title = (item?.title || item?.name || item?.prompt || '').trim();
              if (id && title) {
                entries.push({ id: String(id), title: title.toLowerCase(), isTask: ep.isTask || String(id).startsWith('task_') });
              }
            }
          }
        }
      } catch (_) {}
    }
    cachedRemoteCatalog = { ts: now, entries };
  }

  const match =
    cachedRemoteCatalog.entries.find((e) => e.title === normTitle) ||
    cachedRemoteCatalog.entries.find((e) => e.title.startsWith(normTitle) || normTitle.startsWith(e.title));
  if (match) {
    // Eliminarlo del catálogo en caché por si hay otra tarea con título similar
    cachedRemoteCatalog.entries = cachedRemoteCatalog.entries.filter((e) => e.id !== match.id);
    return match;
  }
  return null;
}

async function deleteChatGptViaApi(targetId, row, isTask = false) {
  if (PLATFORM_KEY !== 'chatgpt' || typeof fetch !== 'function') return false;
  try {
    let token = await getChatGptToken();
    if (!token) return false;

    let effectiveId = targetId;
    let effectiveIsTask = isTask;

    if (typeof effectiveId === 'string' && effectiveId.startsWith('task_cloud_')) {
      const resolved = await resolveChatGptIdByTitle(row, targetId, token);
      if (!resolved?.id) return false;
      effectiveId = resolved.id;
      effectiveIsTask = resolved.isTask;
    }

    const tryWithId = async (idToTry, tk) => {
      const runPrimary = () =>
        effectiveIsTask ? deleteOrArchiveRemoteTaskApi(idToTry, tk) : hideChatGptConversation(idToTry, tk);
      const runSecondary = () =>
        effectiveIsTask ? hideChatGptConversation(idToTry, tk) : deleteOrArchiveRemoteTaskApi(idToTry, tk);

      let r = await runPrimary();
      if (!r?.ok && r?.status !== 401) {
        const sec = await runSecondary();
        if (sec?.ok) r = sec;
      }
      return r;
    };

    let res = await tryWithId(effectiveId, token);
    // Token vencido: pedir uno nuevo y reintentar una sola vez.
    if (res?.status === 401) {
      token = await getChatGptToken(true);
      if (!token) return false;
      res = await tryWithId(effectiveId, token);
    }

    if (!res?.ok) {
      const altId = getAlternateChatGptId(effectiveId);
      if (altId) {
        const altRes = await tryWithId(altId, token);
        if (altRes?.ok) res = altRes;
      }
    }

    if (res?.ok) {
      await removeDeletedRowFromDOM(row, targetId);
      cleanupEmptySidebarItems();
      return true;
    }
  } catch (_) {}
  return false;
}

async function deleteSingleConversation(targetId) {
  const found = findRowById(targetId);
  const row = found?.row || null;
  const link = found?.link || null;
  const isTask = isRemoteTask(targetId, link, row);

  // En ChatGPT (tanto conversaciones normales como GPTs personalizados, proyectos y tareas remotas),
  // intentar primero el borrado directo vía API: es instantáneo, no falla con los últimos chats al fondo
  // del scroll ni con filas virtualizadas fuera del DOM, y cae a clic DOM si la API no responde ok.
  if (PLATFORM_KEY === 'chatgpt') {
    const apiOk = await deleteChatGptViaApi(targetId, row, isTask);
    if (apiOk) return true;
  }

  if (!found) return false;

  row.scrollIntoView?.({ block: 'center' });
  await sleep(180);

  try {
    const trigger = await pollUntil(() => findOptionsTrigger(row, link, isTask), 1200, 80);
    if (!trigger) {
      throw new Error('Options menu button not found.');
    }

    const triggerLabel = (
      (trigger.getAttribute?.('aria-label') || '') +
      ' ' +
      (trigger.getAttribute?.('title') || '') +
      ' ' +
      (trigger.getAttribute?.('data-testid') || '')
    ).toLowerCase();
    const isDirectArchiveBtn = triggerLabel.includes('archiv') && !trigger.getAttribute?.('aria-haspopup');

    realClick(trigger);

    if (isDirectArchiveBtn) {
      await sleep(300);
      await removeDeletedRowFromDOM(row, targetId);
      cleanupEmptySidebarItems();
      return true;
    }

    const menu = await pollUntil(
      () => Array.from(document.querySelectorAll(SELECTORS.menuPanel)).find(isActiveOverlay),
      2200
    );
    if (!menu) {
      // Si el botón era un botón directo de Archivar (sin submenú) en una tarea remota:
      if (isTask || PLATFORM_KEY === 'chatgpt') {
        await sleep(300);
        if (!row.isConnected) {
          cleanupEmptySidebarItems();
          return true;
        }
        if (isTask) {
          await removeDeletedRowFromDOM(row, targetId);
          cleanupEmptySidebarItems();
          return true;
        }
      }
      throw new Error('Menu did not open.');
    }

    await sleep(180);

    const menuItems = Array.from(menu.querySelectorAll(SELECTORS.deleteMenuItem));
    const allowArchiveMenu = isTask || PLATFORM_KEY === 'chatgpt';
    let deleteBtn = menuItems.find((el) => {
      const txt = (el.textContent || '').toLowerCase();
      const testId = (el.getAttribute('data-testid') || '').toLowerCase();
      const cls = typeof el.className === 'string' ? el.className.toLowerCase() : '';
      return (
        testId.includes('delete') ||
        cls.includes('text-danger') ||
        cls.includes('text-token-text-error') ||
        cls.includes('text-red') ||
        txt.includes('eliminar') ||
        txt.includes('delete') ||
        txt.includes('borrar') ||
        el.querySelector('mat-icon[fonticon="delete"], mat-icon[data-mat-icon-name="delete"]')
      );
    });
    if (!deleteBtn && allowArchiveMenu) {
      deleteBtn = menuItems.find((el) => {
        const txt = (el.textContent || '').toLowerCase();
        const testId = (el.getAttribute('data-testid') || '').toLowerCase();
        return testId.includes('archive') || txt.includes('archivar') || txt.includes('archive');
      });
    }

    if (!deleteBtn) {
      throw new Error('Delete option not found.');
    }

    const isArchiveAction =
      allowArchiveMenu &&
      ((deleteBtn.textContent || '').toLowerCase().includes('archiv') ||
        (deleteBtn.getAttribute('data-testid') || '').toLowerCase().includes('archive'));
    realClick(deleteBtn);

    const dialog = await pollUntil(
      () => Array.from(document.querySelectorAll(SELECTORS.confirmDialog)).find(isActiveOverlay),
      isArchiveAction ? 1000 : 2200
    );
    if (!dialog) {
      // Archivar una tarea o conversación no suele pedir diálogo de confirmación
      if (isArchiveAction) {
        await sleep(300);
        await removeDeletedRowFromDOM(row, targetId);
        cleanupEmptySidebarItems();
        return true;
      }
      throw new Error('Confirm dialog did not appear.');
    }

    await sleep(200);

    let confirmBtn = dialog.querySelector(SELECTORS.confirmButton);
    if (!confirmBtn) {
      const dialogBtns = Array.from(dialog.querySelectorAll('button'));
      confirmBtn = dialogBtns.find((b) => {
        const txt = (b.textContent || '').trim().toLowerCase();
        return (
          txt === 'eliminar' ||
          txt === 'delete' ||
          txt === 'borrar' ||
          (isTask && (txt.includes('archivar') || txt.includes('archive') || txt.includes('detener') || txt.includes('stop')))
        );
      });
      // Último recurso: solo si el diálogo tiene exactamente dos botones (cancelar + confirmar).
      // Con más botones no se adivina: podría pulsarse una acción distinta a borrar.
      if (!confirmBtn && dialogBtns.length === 2) confirmBtn = dialogBtns[1];
    }

    if (!confirmBtn) {
      throw new Error('Confirm button not found.');
    }

    realClick(confirmBtn);
    await pollUntil(() => !isActiveOverlay(dialog), 4000);
    await sleep(PLATFORM_KEY === 'chatgpt' ? 450 : 350);
    await removeDeletedRowFromDOM(row, targetId);
    cleanupEmptySidebarItems();
    return true;
  } catch (domErr) {
    if (PLATFORM_KEY === 'chatgpt') {
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      const apiOk = await deleteChatGptViaApi(targetId, row, isTask);
      if (apiOk) {
        await removeDeletedRowFromDOM(row, targetId);
        cleanupEmptySidebarItems();
        return true;
      }
    }
    throw domErr;
  }
}

export async function deleteSelectedChats() {
  const allSelectedIds = Array.from(selectedMap.keys());
  if (allSelectedIds.length === 0 || state.deletionInProgress) return;

  const queueIds = allSelectedIds.filter((id) => !state.folderState.protectedIds[id]);
  const skippedProtected = allSelectedIds.length - queueIds.length;

  if (queueIds.length === 0) {
    updateStatusToast(t().toastAllProtected, null, null, 3500);
    return;
  }

  const confirmed = await showConfirmModal(queueIds.length, skippedProtected);
  if (!confirmed) return;

  state.deletionInProgress = true;
  state.deletionStopRequested = false;
  state.autoSelectAllMode = false;
  if (state.autoScrollActive) state.autoScrollActive = false;
  document.body.classList.add('gcm-stealth-delete');
  updateToolbarState();

  const total = queueIds.length;
  let deletedCount = 0;
  let errorCount = 0;

  try {
    for (let i = 0; i < queueIds.length; i++) {
      if (state.deletionStopRequested) break;

      const id = queueIds[i];
      updateStatusToast(t().toastDeletingProgress(i + 1, total), i, total);

      try {
        const ok = await deleteSingleConversation(id);
        if (ok) {
          deletedCount++;
          selectedMap.delete(id);
          if (state.folderState.assignments[id]) {
            delete state.folderState.assignments[id];
            saveFolderData(state.folderState);
          }
        } else {
          // La conversación no está cargada en la barra lateral: contarla como error, no ignorarla.
          errorCount++;
        }
      } catch (err) {
        console.warn('[ChatFold] Error deleting conversation:', err);
        errorCount++;
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await sleep(400);
      }
    }
  } finally {
    document.body.classList.remove('gcm-stealth-delete');
    state.deletionInProgress = false;
    state.deletionStopRequested = false;
  }

  const selectAllCb = document.getElementById('gcm-select-all');
  if (selectAllCb) selectAllCb.checked = false;

  cleanupEmptySidebarItems();
  refreshUI();
  checkRedirectIfActiveChatDeleted(queueIds.slice(0, deletedCount));

  const summary =
    errorCount > 0 ? t().toastDeleteFinishedErr(deletedCount, errorCount) : t().toastDeleteSuccess(deletedCount);
  updateStatusToast(summary, total, total, 4500);
}

export function stopDeletion() {
  // Solo se solicita la parada: state.deletionInProgress sigue true hasta terminar la conversación actual,
  // así no se puede lanzar un segundo borrado en paralelo.
  state.deletionStopRequested = true;
  updateStatusToast(t().toastStopping, null, null, 2500);
}
