import { updateStatusToast } from './dialogs.js';
import { refreshUI } from './main.js';
import { getConversationRows } from './sidebar.js';
import { state, t } from './state.js';
import { sleep } from './utils.js';

export async function toggleAutoScrollHistory() {
  if (state.autoScrollActive) {
    state.autoScrollActive = false;
    refreshUI();
    return;
  }

  state.autoScrollActive = true;
  const runId = ++state.autoScrollRunId;
  refreshUI();
  updateStatusToast(t().toastLoadingHistory);

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
      targetRow.scrollIntoView?.({ behavior: 'smooth', block: 'end' });
      let scroller = targetRow.parentElement;
      while (scroller && scroller !== document.body) {
        if (scroller.scrollHeight > scroller.clientHeight + 10) {
          scroller.scrollTop = scroller.scrollHeight;
          break;
        }
        scroller = scroller.parentElement;
      }
    }

    await sleep(1300);
    if (!state.autoScrollActive || runId !== state.autoScrollRunId) break;
    refreshUI();

    const currentCount = getConversationRows().length;
    updateStatusToast(t().toastLoadedCount(currentCount));

    if (currentCount === lastCount) {
      unchangedCycles++;
      if (unchangedCycles >= 4) {
        finishedNaturally = true;
        state.autoScrollActive = false;
        updateStatusToast(t().toastLoadComplete(currentCount), null, null, 3500);
        break;
      }
    } else {
      unchangedCycles = 0;
      lastCount = currentCount;
    }
  }

  if (runId !== state.autoScrollRunId) return; // otro bucle más reciente tomó el control

  state.autoScrollActive = false;
  if (!finishedNaturally) {
    // Detenido por el usuario: no dejar el toast de progreso fijo en pantalla.
    updateStatusToast(t().toastLoadedCount(getConversationRows().length), null, null, 2500);
  }
  refreshUI();
}
