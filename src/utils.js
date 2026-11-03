export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulación completa de eventos Pointer/Mouse (compatible con Angular Material en Gemini y Radix UI en ChatGPT)
export function realClick(el) {
  if (!el || !el.isConnected) return false;
  if (typeof el.focus === 'function') {
    el.focus({ preventScroll: true });
  }

  let clickedDuringPointer = false;
  const onNativeClick = () => {
    clickedDuringPointer = true;
  };
  el.addEventListener('click', onNativeClick, { once: true, capture: true });

  const EventClass = typeof PointerEvent === 'function' ? PointerEvent : MouseEvent;
  for (const type of ['pointermove', 'mouseover', 'pointerdown', 'mousedown', 'pointerup', 'mouseup']) {
    el.dispatchEvent(
      new (type.startsWith('pointer') ? EventClass : MouseEvent)(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        button: 0,
        buttons: type.endsWith('down') ? 1 : 0,
        pointerId: 1,
        pointerType: 'mouse',
        isPrimary: true,
        view: window
      })
    );
  }

  el.removeEventListener('click', onNativeClick, true);

  // En Radix UI (ChatGPT), pointerdown ya abre el menú y cambia data-state="open" / aria-expanded="true".
  // Si llamamos a el.click() (detail === 0) después, Radix vuelve a ejecutar onOpenToggle() y cierra el menú.
  if (
    clickedDuringPointer ||
    el.getAttribute?.('data-state') === 'open' ||
    el.getAttribute?.('aria-expanded') === 'true'
  ) {
    return true;
  }

  if (typeof el.click === 'function') {
    el.click();
  } else {
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1, view: window }));
  }
  return true;
}

export function isActiveOverlay(el) {
  if (!el || !el.isConnected || el.getAttribute('data-state') === 'closed') return false;
  const style = getComputedStyle(el);
  return !el.hidden && style.display !== 'none' && style.visibility !== 'hidden' && el.getClientRects().length > 0;
}

export async function pollUntil(predicate, timeout = 3000, interval = 100) {
  const start = Date.now();
  let result = predicate();
  while (!result && Date.now() - start < timeout) {
    await sleep(interval);
    result = predicate();
  }
  return result;
}
