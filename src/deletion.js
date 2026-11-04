import { showConfirmModal, updateStatusToast } from './dialogs.js';
import { refreshUI } from './main.js';
import { CONV_LINK_SELECTOR, PLATFORM_KEY, SELECTORS } from './platform.js';
import { findRowById, getSidebarElement, isSingleRowContainer } from './sidebar.js';
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
function isRemoteTask(targetId, link) {
  if (typeof targetId === 'string' && targetId.startsWith('task_')) return true;
  const href = link?.getAttribute?.('href') || '';
  return href.includes('/codex/tasks/') || href.includes('/tasks/');
}

function findOptionsTrigger(row, link, isTask = false) {
  const targets = [row, link, row.parentElement].filter(Boolean);
  for (const tEl of targets) {
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
  const prioritySelectors =
    PLATFORM_KEY === 'chatgpt'
      ? [
          'button[data-testid^="history-item-"][data-testid$="-options"]',
          'button[data-testid*="options"]',
          'button[aria-haspopup="menu"]',
          'button[aria-label*="Options"], button[aria-label*="Opciones"], button[aria-label*="More"], button[aria-label*="Más"]'
        ]
      : [SELECTORS.optionsTrigger];

  for (const sel of prioritySelectors) {
    for (const scope of scopes) {
      const candidates = Array.from(scope.querySelectorAll(sel));
      const valid = candidates.find((b) => !isPinOrArchiveButton(b, isTask));
      if (valid) return valid;
    }
  }

  return null;
}

function removeDeletedRowFromDOM(row, targetId) {
  if (!row && targetId) {
    const found = findRowById(targetId);
    row = found?.row;
  }
  if (!row) return;

  let containerToRemove = row;
  const parentLi = row.closest('li');
  if (parentLi && isSingleRowContainer(parentLi)) {
    containerToRemove = parentLi;
  } else {
    let p = row.parentElement;
    while (p && p !== document.body && p.tagName !== 'NAV' && p.tagName !== 'OL' && p.tagName !== 'UL') {
      if (isSingleRowContainer(p) && !p.classList.contains('conversations-container')) {
        containerToRemove = p;
        p = p.parentElement;
      } else {
        break;
      }
    }
  }

  const parentList = containerToRemove.parentElement;
  containerToRemove.remove();

  if (parentList && (parentList.tagName === 'OL' || parentList.tagName === 'UL')) {
    if (parentList.querySelectorAll(CONV_LINK_SELECTOR).length === 0) {
      const sectionWrapper = parentList.closest('.relative, div[class*="mt-"]');
      if (sectionWrapper && sectionWrapper.querySelectorAll(CONV_LINK_SELECTOR).length === 0) {
        sectionWrapper.remove();
      }
    }
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
  const lists = sidebar.querySelectorAll('ol, ul');
  lists.forEach((list) => {
    if (list.querySelectorAll(CONV_LINK_SELECTOR).length === 0) {
      const sectionWrapper = list.closest('.relative, div[class*="mt-"]');
      if (sectionWrapper && sectionWrapper.querySelectorAll(CONV_LINK_SELECTOR).length === 0) {
        sectionWrapper.remove();
      }
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

function hideChatGptConversation(targetId, token) {
  return fetch(`/backend-api/conversation/${targetId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ is_visible: false })
  });
}

async function deleteOrArchiveRemoteTaskApi(targetId, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  // 1) Intentar DELETE directo de la tarea remota (/backend-api/wham/tasks/{id})
  try {
    const delRes = await fetch(`/backend-api/wham/tasks/${targetId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers
    });
    if (delRes.ok) return delRes;
    if (delRes.status === 401 || delRes.status === 403) return delRes;
  } catch (_) {}

  // 2) Fallback: archivar la tarea remota (/backend-api/wham/tasks/{id}/archive) y luego intentar DELETE
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
    if (archRes.status === 401 || archRes.status === 403) return archRes;
  } catch (_) {}

  // 3) Segundo fallback para tareas programadas estándar (/backend-api/tasks/{id})
  return fetch(`/backend-api/tasks/${targetId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers
  });
}

async function deleteChatGptViaApi(targetId, row, isTask = false) {
  if (PLATFORM_KEY !== 'chatgpt' || typeof fetch !== 'function') return false;
  try {
    let token = await getChatGptToken();
    if (!token) return false;

    const runCall = (tk) =>
      isTask ? deleteOrArchiveRemoteTaskApi(targetId, tk) : hideChatGptConversation(targetId, tk);

    let res = await runCall(token);
    // Token vencido: pedir uno nuevo y reintentar una sola vez.
    if (res.status === 401 || res.status === 403) {
      token = await getChatGptToken(true);
      if (!token) return false;
      res = await runCall(token);
    }

    if (res.ok) {
      removeDeletedRowFromDOM(row, targetId);
      cleanupEmptySidebarItems();
      await sleep(220);
      return true;
    }
  } catch (_) {}
  return false;
}

async function deleteSingleConversation(targetId) {
  const found = findRowById(targetId);
  if (!found) return false;

  const { row, link } = found;
  const isTask = isRemoteTask(targetId, link);

  // Para tareas remotas de ChatGPT/Codex (task_...), la API directa (/backend-api/wham/tasks)
  // permite borrar o archivar en un solo paso sin que falle por ausencia del botón "Eliminar" en el menú.
  if (PLATFORM_KEY === 'chatgpt' && isTask) {
    const apiTaskOk = await deleteChatGptViaApi(targetId, row, true);
    if (apiTaskOk) return true;
  }

  row.scrollIntoView({ block: 'center' });
  await sleep(180);

  try {
    const trigger = await pollUntil(() => findOptionsTrigger(row, link, isTask), 1200, 80);
    if (!trigger) {
      throw new Error('Options menu button not found.');
    }

    realClick(trigger);

    const menu = await pollUntil(
      () => Array.from(document.querySelectorAll(SELECTORS.menuPanel)).find(isActiveOverlay),
      2200
    );
    if (!menu) {
      // Si el botón era un botón directo de Archivar (sin submenú) en una tarea remota:
      if (isTask) {
        await sleep(450);
        removeDeletedRowFromDOM(row, targetId);
        cleanupEmptySidebarItems();
        return true;
      }
      throw new Error('Menu did not open.');
    }

    await sleep(180);

    const menuItems = Array.from(menu.querySelectorAll(SELECTORS.deleteMenuItem));
    const deleteBtn = menuItems.find((el) => {
      const txt = (el.textContent || '').toLowerCase();
      const testId = (el.getAttribute('data-testid') || '').toLowerCase();
      const cls = typeof el.className === 'string' ? el.className.toLowerCase() : '';
      return (
        testId.includes('delete') ||
        (isTask && testId.includes('archive')) ||
        cls.includes('text-danger') ||
        cls.includes('text-token-text-error') ||
        cls.includes('text-red') ||
        txt.includes('eliminar') ||
        txt.includes('delete') ||
        txt.includes('borrar') ||
        (isTask && (txt.includes('archivar') || txt.includes('archive'))) ||
        el.querySelector('mat-icon[fonticon="delete"], mat-icon[data-mat-icon-name="delete"]')
      );
    });

    if (!deleteBtn) {
      throw new Error('Delete option not found.');
    }

    const isArchiveAction = isTask && ((deleteBtn.textContent || '').toLowerCase().includes('archiv') || (deleteBtn.getAttribute('data-testid') || '').toLowerCase().includes('archive'));
    realClick(deleteBtn);

    const dialog = await pollUntil(
      () => Array.from(document.querySelectorAll(SELECTORS.confirmDialog)).find(isActiveOverlay),
      isArchiveAction ? 1000 : 2200
    );
    if (!dialog) {
      // Archivar una tarea remota que ya terminó no suele pedir diálogo de confirmación
      if (isArchiveAction) {
        await sleep(450);
        removeDeletedRowFromDOM(row, targetId);
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
    await sleep(PLATFORM_KEY === 'chatgpt' ? 650 : 550);
    removeDeletedRowFromDOM(row, targetId);
    cleanupEmptySidebarItems();
    return true;
  } catch (domErr) {
    if (PLATFORM_KEY === 'chatgpt') {
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      const apiOk = await deleteChatGptViaApi(targetId, row, isTask);
      if (apiOk) {
        removeDeletedRowFromDOM(row, targetId);
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
