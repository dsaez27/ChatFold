import { updateStatusToast } from './dialogs.js';
import { refreshUI } from './main.js';
import { getConversationRows } from './sidebar.js';
import { state, t } from './state.js';
import { sleep } from './utils.js';

function findScrollContainer(targetRow) {
  let scroller = targetRow?.parentElement || null;
  while (scroller && scroller !== document.body && scroller !== document.documentElement) {
    if (scroller.scrollHeight > scroller.clientHeight + 10) {
      return scroller;
    }
    scroller = scroller.parentElement;
  }
  return null;
}

/**
 * Pulso invisible de scroll en segundo plano: salta al fondo y restaura en el mismo frame
 * (o micro-frame) la posición original `scrollTop` del usuario para disparar los IntersectionObservers
 * y listeners `scroll` de carga perezosa sin que la barra lateral se mueva visualmente.
 */
async function pulseScrollInBackground(targetRow) {
  const scroller = findScrollContainer(targetRow);
  if (!scroller) return;

  const savedScrollTop = scroller.scrollTop;
  scroller.scrollTop = scroller.scrollHeight;
  try {
    scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
  } catch (_) {}

  await new Promise((resolve) => {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(resolve);
    } else {
      setTimeout(resolve, 16);
    }
  });

  if (scroller.isConnected) {
    scroller.scrollTop = savedScrollTop;
  }
}

export async function toggleAutoScrollHistory(options = {}) {
  const silent = !!options.silent;
  if (state.autoScrollActive) {
    state.autoScrollActive = false;
    refreshUI();
    return;
  }

  state.autoScrollActive = true;
  const runId = ++state.autoScrollRunId;
  refreshUI();
  if (!silent) {
    updateStatusToast(t().toastLoadingHistory);
  }

  let unchangedCycles = 0;
  let lastCount = getConversationRows().length;
  let finishedNaturally = false;

  // runId evita que un bucle antiguo siga activo si el usuario detiene y reinicia rápidamente.
  while (state.autoScrollActive && runId === state.autoScrollRunId) {
    const items = getConversationRows();
    if (items.length > 0) {
      let targetRow = items[items.length - 1].row;
      for (let k = items.length - 1; k >= 0; k--) {
        if (!items[k].row.classList.contains('gcm-hidden-by-filter')) {
          targetRow = items[k].row;
          break;
        }
      }
      await pulseScrollInBackground(targetRow);
    }

    await sleep(1100);
    if (!state.autoScrollActive || runId !== state.autoScrollRunId) break;
    refreshUI();

    const currentCount = getConversationRows().length;
    if (!silent) {
      updateStatusToast(t().toastLoadedCount(currentCount));
    }

    if (currentCount === lastCount) {
      unchangedCycles++;
      if (unchangedCycles >= 4) {
        finishedNaturally = true;
        state.autoScrollActive = false;
        if (!silent) {
          updateStatusToast(t().toastLoadComplete(currentCount), null, null, 3500);
        }
        break;
      }
    } else {
      unchangedCycles = 0;
      lastCount = currentCount;
    }
  }

  if (runId !== state.autoScrollRunId) return; // otro bucle más reciente tomó el control

  state.autoScrollActive = false;
  if (!finishedNaturally && !silent) {
    // Detenido por el usuario: no dejar el toast de progreso fijo en pantalla.
    updateStatusToast(t().toastLoadedCount(getConversationRows().length), null, null, 2500);
  }
  refreshUI();
}
