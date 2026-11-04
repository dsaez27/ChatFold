// Puente ligero en el mundo MAIN (ejecutado por Chrome MV3 sin violar CSP) para inspeccionar
// propiedades internas de React (__reactFiber$ / __reactProps$) en la barra lateral de ChatGPT
// y descubrir IDs de tareas en la nube (Codex Cloud Tasks: task_e_...) que no exponen href en el DOM.
(() => {
  if (window.__gcmPageBridgeActive) return;
  window.__gcmPageBridgeActive = true;

  const TASK_ID_RE = /\b(task_(?!cloud_)[0-9a-zA-Z_-]{5,})\b/;
  const HREF_ID_RE = /\/(?:c|codex\/tasks|codex\/cloud|codex|tasks)\/([0-9a-zA-Z_-]{5,})/;
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const ID_KEYS = new Set([
    'id',
    'taskId',
    'task_id',
    'conversationId',
    'conversation_id',
    'threadId',
    'thread_id',
    'itemId',
    'key'
  ]);

  function getFiber(el) {
    if (!el || typeof el !== 'object') return null;
    for (const k of Object.keys(el)) {
      if (k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$')) {
        return el[k];
      }
    }
    return null;
  }

  function getReactProps(el) {
    if (!el || typeof el !== 'object') return null;
    for (const k of Object.keys(el)) {
      if (k.startsWith('__reactProps$')) {
        return el[k];
      }
    }
    return null;
  }

  function searchValueForId(val, keyName, visited, depth) {
    if (!val || depth > 4) return null;
    if (typeof val === 'string') {
      const tm = TASK_ID_RE.exec(val);
      if (tm) return { id: tm[1], isTask: true };
      const hm = HREF_ID_RE.exec(val);
      if (hm) {
        return {
          id: hm[1],
          isTask: val.includes('codex') || val.includes('task')
        };
      }
      if (ID_KEYS.has(keyName) && UUID_RE.test(val)) {
        return { id: val, isTask: keyName.toLowerCase().includes('task') };
      }
      return null;
    }
    if (typeof val !== 'object') return null;
    if (val instanceof Node || val instanceof Window) return null;
    if (visited.has(val)) return null;
    visited.add(val);

    if (Array.isArray(val)) {
      // No escanear listas grandes (evita tomar el ID de otro elemento hermano en el array del padre)
      if (val.length > 3) return null;
      for (let i = 0; i < val.length; i++) {
        const res = searchValueForId(val[i], keyName, visited, depth + 1);
        if (res) return res;
      }
      return null;
    }

    for (const [k, v] of Object.entries(val)) {
      if (k === '_owner' || k === 'children' || k === 'stateNode' || k === 'return' || k === 'sibling' || k === 'child') {
        continue;
      }
      const res = searchValueForId(v, k, visited, depth + 1);
      if (res) {
        if (k.toLowerCase().includes('task') || k.toLowerCase().includes('codex') || k.toLowerCase().includes('cloud')) {
          res.isTask = true;
        }
        return res;
      }
    }
    return null;
  }

  function extractIdFromElementFiber(el) {
    let fiber = getFiber(el);
    const visited = new WeakSet();
    let steps = 0;
    while (fiber && steps < 9) {
      // Si llegamos a un contenedor DOM que agrupa múltiples filas, nos detenemos
      if (
        fiber.stateNode instanceof Element &&
        fiber.stateNode !== el &&
        (fiber.stateNode.tagName === 'NAV' ||
          fiber.stateNode.tagName === 'ASIDE' ||
          fiber.stateNode.tagName === 'OL' ||
          fiber.stateNode.tagName === 'UL')
      ) {
        break;
      }
      if (typeof fiber.key === 'string' && fiber.key) {
        const fromKey = searchValueForId(fiber.key, 'key', visited, 0);
        if (fromKey) return fromKey;
      }
      if (fiber.memoizedProps) {
        const fromProps = searchValueForId(fiber.memoizedProps, '', visited, 0);
        if (fromProps) return fromProps;
      }
      fiber = fiber.return;
      steps++;
    }
    return null;
  }

  function scanSidebarFibers() {
    const roots = document.querySelectorAll('nav, aside, [data-testid="stage-thread-flyout"]');
    for (let r = 0; r < roots.length; r++) {
      const root = roots[r];
      const candidates = root.querySelectorAll(
        'a, li, .__menu-item, [data-sidebar-item="true"], [data-testid^="history-item"], [role="button"], div.group'
      );
      for (let i = 0; i < candidates.length; i++) {
        const el = candidates[i];
        if (el.closest('main, [id^="gcm-"]')) continue;
        const existingId = el.getAttribute('data-gcm-conv-id') || '';
        if (existingId && !existingId.startsWith('task_cloud_')) continue;

        let found = extractIdFromElementFiber(el);
        if (!found) {
          const inner = el.querySelector('[dir="auto"], .truncate, svg');
          if (inner) found = extractIdFromElementFiber(inner);
        }
        if (found && found.id) {
          const targetRow =
            el.closest('a, [data-sidebar-item="true"], .__menu-item, li[data-testid^="history-item"]') || el;
          const targetExisting = targetRow.getAttribute('data-gcm-conv-id') || '';
          if (!targetExisting || targetExisting.startsWith('task_cloud_')) {
            targetRow.setAttribute('data-gcm-conv-id', found.id);
          }
          if (found.isTask) {
            targetRow.setAttribute('data-gcm-task', '1');
          }
        }
      }
    }
  }

  document.addEventListener('gcm:scan-sidebar', () => {
    try {
      scanSidebarFibers();
    } catch (_) {}
  });

  document.addEventListener(
    'gcm:react-hover',
    (e) => {
      try {
        let curr = e.target instanceof Element ? e.target : null;
        let depth = 0;
        while (curr && depth < 4) {
          const props = getReactProps(curr);
          if (props) {
            const fakeEvt = {
              currentTarget: curr,
              target: curr,
              bubbles: true,
              defaultPrevented: false,
              preventDefault() {},
              stopPropagation() {},
               isPropagationStopped: () => false,
              isDefaultPrevented: () => false,
              nativeEvent: new MouseEvent('mouseover')
            };
            if (typeof props.onPointerEnter === 'function') props.onPointerEnter(fakeEvt);
            if (typeof props.onMouseEnter === 'function') props.onMouseEnter(fakeEvt);
            if (typeof props.onPointerOver === 'function') props.onPointerOver(fakeEvt);
            if (typeof props.onMouseOver === 'function') props.onMouseOver(fakeEvt);
          }
          curr = curr.parentElement;
          depth++;
        }
      } catch (_) {}
    },
    true
  );

  setTimeout(scanSidebarFibers, 600);
  setInterval(scanSidebarFibers, 2500);
})();
