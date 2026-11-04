import { applyFolderBadgesAndFilter, runAutoClassification } from './folders.js';
import { injectSidebarFoldersPanel, registerGlobalListeners } from './panel.js';
import { injectCheckboxes, setupDelegatedSidebarListener } from './selection.js';
import { getConversationRows, getSidebarElement } from './sidebar.js';
import { state } from './state.js';
import { createToolbar, updateToolbarState } from './toolbar.js';

function scheduleRefresh(delay = 120) {
  if (state.refreshDebounceTimer) return;
  state.refreshDebounceTimer = setTimeout(() => {
    state.refreshDebounceTimer = null;
    if (!document.hidden) {
      requestAnimationFrame(refreshUI);
    }
  }, delay);
}

export function refreshUI() {
  if (state.isRefreshing || document.hidden) return;
  state.isRefreshing = true;
  try {
    createToolbar();
    const items = getConversationRows();
    runAutoClassification(items);
    injectCheckboxes(items);
    applyFolderBadgesAndFilter(items);
    injectSidebarFoldersPanel(items);
    updateToolbarState();
  } finally {
    state.isRefreshing = false;
  }
}

export function init() {
  if (!document.body) {
    setTimeout(init, 300);
    return;
  }
  registerGlobalListeners();
  setupDelegatedSidebarListener();
  setTimeout(refreshUI, 800);

  // MutationObserver: reacciona solo cuando el sidebar cambia (más eficiente que setInterval)
  const observer = new MutationObserver((mutations) => {
    if (document.hidden) return;
    // Solo procesar si hay nodos relevantes añadidos (conversaciones nuevas)
    // Ignorar los cambios que provoca la propia extensión (badges, candados, checkboxes): evita bucles de refresco.
    const isOwnNode = (n) => {
      const el = n.nodeType === 1 ? n : n.parentElement;
      return !!el && !!el.closest('[id^="gcm-"], [class*="gcm-"]');
    };
    const hasRelevantChange = mutations.some((m) => {
      if (m.addedNodes.length === 0 && m.removedNodes.length === 0) return false;
      return !Array.from(m.addedNodes).every(isOwnNode) || !Array.from(m.removedNodes).every(isOwnNode);
    });
    if (hasRelevantChange) {
      scheduleRefresh(150);
    }
  });

  let observedTarget = null;
  const startObserving = () => {
    const sidebar = getSidebarElement();
    const target = sidebar || document.body;
    observer.disconnect();
    observer.observe(target, { childList: true, subtree: true });
    observedTarget = target;
  };

  // Intentar observar inmediatamente o esperar a que cargue el sidebar
  if (getSidebarElement()) {
    startObserving();
  } else {
    // Fallback: esperar hasta 5s a que aparezca el sidebar
    let attempts = 0;
    const waitForSidebar = setInterval(() => {
      attempts++;
      if (getSidebarElement() || attempts >= 25) {
        clearInterval(waitForSidebar);
        startObserving();
      }
    }, 200);
  }

  // Intervalo de seguridad reducido a 4s (solo para casos donde el observer no captura cambios)
  setInterval(() => {
    if (!document.hidden) {
      // Si la SPA re-renderizó la barra lateral (o solo se observaba <body>), reenganchar el observer.
      if (observedTarget) {
        const sidebar = getSidebarElement();
        if (!observedTarget.isConnected || (sidebar && sidebar !== observedTarget)) {
          startObserving();
        }
      }
      scheduleRefresh(0);
    }
  }, 4000);
}
