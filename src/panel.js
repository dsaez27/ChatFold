import { toggleAutoScrollHistory } from './autoscroll.js';
import { exportBackupConfig, importBackupConfig } from './backup.js';
import { openCreateFolderModal } from './dialogs.js';
import { applyFolderBadgesAndFilter, deleteFolderById } from './folders.js';
import { refreshUI } from './main.js';
import { APP_VERSION, P } from './platform.js';
import { openPromptsModal } from './prompts.js';
import { getConversationRows } from './sidebar.js';
import { BUILTIN_FILTERS, autoClassifiedVisited, saveView, state, t } from './state.js';
import { initCloudSync, normalizeStoredState, saveFolderData } from './storage.js';

function toggleLanguage() {
  state.folderState.lang = state.folderState.lang === 'es' ? 'en' : 'es';
  saveFolderData(state.folderState);

  document.getElementById('gcm-toolbar')?.remove();
  document.getElementById('gcm-folders-box')?.remove();
  document.getElementById('gcm-folder-popover')?.remove();
  refreshUI();
}

export function injectSidebarFoldersPanel(items) {
  let box = document.getElementById('gcm-folders-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'gcm-folders-box';
    document.body.appendChild(box);
    buildFoldersPanelDOM(box);
    // Posicionar sin animar la transición CSS (evita que el panel "viaje" desde la esquina al cargar).
    box.classList.add('gcm-dragging');
    clampBoxPosition(box);
    void box.offsetWidth;
    requestAnimationFrame(() => box.classList.remove('gcm-dragging'));
  }

  const isMin = box.classList.contains('gcm-minimized');
  if (state.folderState.minimized && !isMin) {
    box.classList.add('gcm-minimized');
    clampBoxPosition(box);
  } else if (!state.folderState.minimized && isMin) {
    box.classList.remove('gcm-minimized');
    // El tamaño cambia al instante (sin transición de layout): reajustar de inmediato para no salir de pantalla.
    clampBoxPosition(box);
  }

  const counts = {
    ALL: items.length,
    UNASSIGNED: 0,
    PROTECTED: 0
  };
  for (let i = 0; i < state.folderState.folders.length; i++) {
    counts[state.folderState.folders[i].id] = 0;
  }

  for (let i = 0; i < items.length; i++) {
    const id = items[i].id;
    const fId = state.folderState.assignments[id];
    if (fId && counts[fId] !== undefined) {
      counts[fId]++;
    } else {
      counts.UNASSIGNED++;
    }
    if (state.folderState.protectedIds[id]) {
      counts.PROTECTED++;
    }
  }

  const pillsContainer = document.getElementById('gcm-pills-container');
  if (!pillsContainer) return;

  const signature = JSON.stringify({
    lang: state.folderState.lang,
    folders: state.folderState.folders,
    active: state.activeFolderFilter,
    counts,
    sortMode: state.sortMode,
    autoScrollActive: state.autoScrollActive
  });

  if (pillsContainer.dataset.sig === signature) return;
  pillsContainer.dataset.sig = signature;

  const frag = document.createDocumentFragment();

  frag.appendChild(
    createFolderPill({ id: 'ALL', name: t().pillAll, color: null, count: counts.ALL, deletable: false })
  );

  for (let i = 0; i < state.folderState.folders.length; i++) {
    const f = state.folderState.folders[i];
    frag.appendChild(
      createFolderPill({
        id: f.id,
        name: f.name,
        color: f.color,
        count: counts[f.id] || 0,
        deletable: true,
        keywords: f.keywords
      })
    );
  }

  if (counts.PROTECTED > 0 || state.activeFolderFilter === 'PROTECTED') {
    frag.appendChild(
      createFolderPill({ id: 'PROTECTED', name: t().pillProtected, color: '#fbbc04', count: counts.PROTECTED, deletable: false })
    );
  }

  frag.appendChild(
    createFolderPill({ id: 'UNASSIGNED', name: t().pillUnassigned, color: '#8e918f', count: counts.UNASSIGNED, deletable: false })
  );

  pillsContainer.textContent = '';
  pillsContainer.appendChild(frag);

  const sortBtn = document.getElementById('gcm-sort-btn');
  if (sortBtn) {
    sortBtn.textContent = state.sortMode === 'DEFAULT' ? t().sortRecent : state.sortMode === 'AZ' ? t().sortAZ : t().sortZA;
  }

  const scrollBtn = document.getElementById('gcm-autoscroll-btn');
  if (scrollBtn) {
    if (state.autoScrollActive) {
      scrollBtn.classList.add('active');
      scrollBtn.textContent = t().stopLoadBtn;
    } else {
      scrollBtn.classList.remove('active');
      scrollBtn.textContent = t().loadAllBtn;
    }
  }
}

// Aplica la posición guardada (si existe) manteniendo el panel dentro de la ventana.
function clampBoxPosition(box) {
  const pos = state.folderState.pos;
  if (!box || !box.isConnected || !pos) return;
  const rect = box.getBoundingClientRect();
  // El panel se ancla por su borde INFERIOR: al expandir crece hacia arriba y al minimizar
  // vuelve a la misma línea. Solo se limita lo que se muestra; la posición guardada no se altera.
  const left = Math.min(Math.max(0, pos.left), Math.max(0, window.innerWidth - rect.width));
  const bottom = Math.min(Math.max(0, pos.bottom), Math.max(0, window.innerHeight - rect.height));
  box.style.setProperty('left', `${left}px`, 'important');
  box.style.setProperty('bottom', `${bottom}px`, 'important');
  box.style.setProperty('top', 'auto', 'important');
}

function enablePanelDrag(box, handle) {
  const DRAG_THRESHOLD = 4;
  let startX = 0;
  let startY = 0;
  let originLeft = 0;
  let originTop = 0;
  let dragging = false;

  // Los eventos de movimiento/soltar se escuchan en document (no en el encabezado) para no perder
  // el arrastre cuando el puntero sale del panel, y sin alterar el destino de un clic normal.
  // Las lecturas/escrituras de layout se agrupan en un solo requestAnimationFrame por cuadro.
  let rafId = 0;
  let lastDx = 0;
  let lastDy = 0;
  let boxW = 0;
  let boxH = 0;
  const applyDrag = () => {
    rafId = 0;
    const left = Math.min(Math.max(0, originLeft + lastDx), Math.max(0, window.innerWidth - boxW));
    const top = Math.min(Math.max(0, originTop + lastDy), Math.max(0, window.innerHeight - boxH));
    const bottom = Math.max(0, window.innerHeight - (top + boxH));
    box.style.setProperty('left', `${left}px`, 'important');
    box.style.setProperty('bottom', `${bottom}px`, 'important');
    box.style.setProperty('top', 'auto', 'important');
    state.folderState.pos = { left, bottom };
  };

  const onMove = (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      dragging = true;
      box.classList.add('gcm-dragging');
      const rect = box.getBoundingClientRect();
      boxW = rect.width;
      boxH = rect.height;
    }
    lastDx = dx;
    lastDy = dy;
    if (!rafId) rafId = requestAnimationFrame(applyDrag);
    e.preventDefault();
  };

  const onEnd = () => {
    document.removeEventListener('pointermove', onMove, true);
    document.removeEventListener('pointerup', onEnd, true);
    document.removeEventListener('pointercancel', onEnd, true);
    if (dragging) {
      dragging = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        applyDrag();
      }
      box.classList.remove('gcm-dragging');
      saveFolderData(state.folderState);
      // Evita que el "click" que sigue al arrastre minimice/expanda el panel.
      state.panelJustDragged = true;
      setTimeout(() => {
        state.panelJustDragged = false;
      }, 0);
    }
  };

  handle.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    // Los botones del encabezado (idioma, nueva carpeta, minimizar) conservan su función normal.
    if (e.target instanceof Element && e.target.closest('button')) return;
    const rect = box.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    originLeft = rect.left;
    originTop = rect.top;
    dragging = false;
    document.addEventListener('pointermove', onMove, true);
    document.addEventListener('pointerup', onEnd, true);
    document.addEventListener('pointercancel', onEnd, true);
  });
}

export function registerGlobalListeners() {
  const applyExternalState = (incoming) => {
    const keepView = { filter: state.activeFolderFilter, sort: state.sortMode, toolbarCollapsed: state.toolbarCollapsed };
    const langChanged = incoming.lang !== state.folderState.lang;
    state.folderState = { ...incoming, view: keepView };
    if (!BUILTIN_FILTERS.includes(state.activeFolderFilter) && !state.folderState.folders.some((f) => f.id === state.activeFolderFilter)) {
      state.activeFolderFilter = 'ALL';
    }
    autoClassifiedVisited.clear();
    if (langChanged) {
      document.getElementById('gcm-toolbar')?.remove();
      document.getElementById('gcm-folders-box')?.remove();
    } else {
      const box = document.getElementById('gcm-folders-box');
      if (box) {
        box.classList.toggle('gcm-minimized', state.folderState.minimized);
        clampBoxPosition(box);
      }
      const pills = document.getElementById('gcm-pills-container');
      if (pills) delete pills.dataset.sig;
    }
    refreshUI();
  };

  // Otra pestaña (del mismo sitio) guardó cambios: adoptarlos para no pisarlos con datos viejos
  // al próximo guardado. Se conserva la vista (filtro/orden) de ESTA pestaña.
  window.addEventListener('storage', (e) => {
    if (e.key !== P.storageKey || !e.newValue) return;
    try {
      const incoming = normalizeStoredState(JSON.parse(e.newValue), state.folderState.lang);
      applyExternalState(incoming);
    } catch (_) {}
  });

  // Sincronización en la nube con chrome.storage.sync
  initCloudSync(
    () => state.folderState,
    (merged) => applyExternalState(merged)
  );

  // Atajos de teclado globales: Alt+Shift+F (minimizar/expandir panel) y Alt+Shift+S (buscar conversación)
  document.addEventListener('keydown', (e) => {
    if (!e.altKey || !e.shiftKey || e.ctrlKey || e.metaKey) return;
    const key = (e.key || '').toUpperCase();
    if (key === 'F') {
      e.preventDefault();
      state.folderState.minimized = !state.folderState.minimized;
      saveFolderData(state.folderState);
      refreshUI();
    } else if (key === 'S') {
      e.preventDefault();
      if (state.folderState.minimized) {
        state.folderState.minimized = false;
        saveFolderData(state.folderState);
        refreshUI();
      }
      const input = document.querySelector('#gcm-folders-box .gcm-search-input');
      input?.focus();
      input?.select();
    }
  });

  // Mensajes desde el Popup de la extensión (popup.js)
  try {
    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage?.addListener) {
      chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
        if (!msg || typeof msg.action !== 'string') return;
        if (msg.action === 'TOGGLE_PANEL') {
          state.folderState.minimized = !state.folderState.minimized;
          saveFolderData(state.folderState);
          refreshUI();
          sendResponse?.({ ok: true, minimized: state.folderState.minimized });
        } else if (msg.action === 'OPEN_PROMPTS') {
          openPromptsModal();
          sendResponse?.({ ok: true });
        } else if (msg.action === 'EXPORT_BACKUP') {
          exportBackupConfig();
          sendResponse?.({ ok: true });
        }
      });
    }
  } catch (_) {}

  window.addEventListener('resize', () => clampBoxPosition(document.getElementById('gcm-folders-box')));
}

function buildFoldersPanelDOM(box) {
  box.textContent = '';

  const header = document.createElement('div');
  header.className = 'gcm-folders-header';

  const title = document.createElement('span');
  title.style.display = 'inline-flex';
  title.style.alignItems = 'center';
  title.style.gap = '6px';

  if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.getURL === 'function') {
    const iconImg = document.createElement('img');
    iconImg.src = chrome.runtime.getURL('icons/icon32.png');
    iconImg.width = 16;
    iconImg.height = 16;
    iconImg.style.borderRadius = '4px';
    title.appendChild(iconImg);
  } else {
    const badgeIcon = document.createElement('span');
    badgeIcon.textContent = '✨';
    title.appendChild(badgeIcon);
  }

  const titleText = document.createElement('span');
  titleText.textContent = `${t().panelTitle} v${APP_VERSION}`;
  title.appendChild(titleText);
  title.title = t().toggleMinTitle;
  title.addEventListener('click', () => {
    if (state.panelJustDragged) return; // el arrastre no debe minimizar/expandir el panel
    state.folderState.minimized = !state.folderState.minimized;
    saveFolderData(state.folderState);
    refreshUI();
  });

  const headerActions = document.createElement('div');
  headerActions.className = 'gcm-header-actions';

  const langBtn = document.createElement('button');
  langBtn.className = 'gcm-mini-btn';
  langBtn.textContent = state.folderState.lang.toUpperCase();
  langBtn.title = t().langBtnTitle;
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLanguage();
  });

  const addBtn = document.createElement('button');
  addBtn.className = 'gcm-add-folder-btn';
  addBtn.textContent = t().newFolderBtn;
  addBtn.title = t().newFolderTitle;
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openCreateFolderModal();
  });

  const minBtn = document.createElement('button');
  minBtn.className = 'gcm-mini-btn';
  minBtn.textContent = '—';
  minBtn.title = t().toggleMinTitle;
  minBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.folderState.minimized = !state.folderState.minimized;
    saveFolderData(state.folderState);
    refreshUI();
  });

  headerActions.appendChild(langBtn);
  headerActions.appendChild(addBtn);
  headerActions.appendChild(minBtn);
  header.appendChild(title);
  header.appendChild(headerActions);
  enablePanelDrag(box, header);

  const body = document.createElement('div');
  body.className = 'gcm-folders-body';

  const searchRow = document.createElement('div');
  searchRow.className = 'gcm-search-sort-row';

  const searchWrap = document.createElement('div');
  searchWrap.className = 'gcm-search-wrap';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'gcm-search-input';
  searchInput.placeholder = t().searchPlaceholder;
  searchInput.value = state.searchQuery;

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'gcm-search-clear';
  clearBtn.textContent = '×';
  clearBtn.title = t().searchClearTitle;
  clearBtn.style.display = state.searchQuery ? 'inline-flex' : 'none';

  let searchDebounce = null;
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    clearBtn.style.display = state.searchQuery ? 'inline-flex' : 'none';
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      applyFolderBadgesAndFilter(getConversationRows());
    }, 90);
  });

  clearBtn.addEventListener('click', () => {
    state.searchQuery = '';
    searchInput.value = '';
    clearBtn.style.display = 'none';
    applyFolderBadgesAndFilter(getConversationRows());
    searchInput.focus();
  });

  searchWrap.appendChild(searchInput);
  searchWrap.appendChild(clearBtn);

  const sortBtn = document.createElement('button');
  sortBtn.id = 'gcm-sort-btn';
  sortBtn.className = 'gcm-sort-btn';
  sortBtn.title = t().sortTitle;
  sortBtn.textContent = t().sortRecent;
  sortBtn.addEventListener('click', () => {
    state.sortMode = state.sortMode === 'DEFAULT' ? 'AZ' : state.sortMode === 'AZ' ? 'ZA' : 'DEFAULT';
    saveView();
    refreshUI();
  });

  searchRow.appendChild(searchWrap);
  searchRow.appendChild(sortBtn);

  const pillsContainer = document.createElement('div');
  pillsContainer.id = 'gcm-pills-container';
  pillsContainer.className = 'gcm-folders-pills';

  const footer = document.createElement('div');
  footer.className = 'gcm-panel-footer';

  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'gcm-autoscroll-btn';
  scrollBtn.className = 'gcm-footer-btn';
  scrollBtn.textContent = t().loadAllBtn;
  scrollBtn.title = t().loadAllTitle;
  scrollBtn.addEventListener('click', toggleAutoScrollHistory);

  const backupBtn = document.createElement('button');
  backupBtn.className = 'gcm-footer-btn';
  backupBtn.textContent = t().backupBtn;
  backupBtn.title = t().backupTitle;
  backupBtn.addEventListener('click', exportBackupConfig);

  const restoreBtn = document.createElement('button');
  restoreBtn.className = 'gcm-footer-btn';
  restoreBtn.textContent = t().importBtn;
  restoreBtn.title = t().importTitle;
  restoreBtn.addEventListener('click', importBackupConfig);

  const promptsBtn = document.createElement('button');
  promptsBtn.id = 'gcm-prompts-btn';
  promptsBtn.className = 'gcm-footer-btn';
  promptsBtn.textContent = t().promptsBtn;
  promptsBtn.title = t().promptsBtnTitle;
  promptsBtn.addEventListener('click', openPromptsModal);

  footer.appendChild(scrollBtn);
  footer.appendChild(promptsBtn);
  footer.appendChild(backupBtn);
  footer.appendChild(restoreBtn);

  body.appendChild(searchRow);
  body.appendChild(pillsContainer);
  body.appendChild(footer);

  box.appendChild(header);
  box.appendChild(body);
}

function createFolderPill({ id, name, color, count, deletable, keywords }) {
  const pill = document.createElement('div');
  pill.className = 'gcm-folder-pill' + (state.activeFolderFilter === id ? ' active' : '');
  if (Array.isArray(keywords) && keywords.length > 0) {
    pill.title = `${t().autoRulesPrefix}: ${keywords.join(', ')}`;
  }

  if (color) {
    const dot = document.createElement('span');
    dot.className = 'gcm-folder-dot';
    dot.style.backgroundColor = color;
    dot.style.color = color;
    pill.appendChild(dot);
  }

  const label = document.createElement('span');
  label.textContent = name;
  pill.appendChild(label);

  const badgeCount = document.createElement('span');
  badgeCount.className = 'gcm-folder-count';
  badgeCount.textContent = String(count);
  pill.appendChild(badgeCount);

  if (deletable) {
    const del = document.createElement('span');
    del.className = 'gcm-folder-del';
    del.textContent = '×';
    del.title = t().delFolderTitle(name);
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteFolderById(id);
    });
    pill.appendChild(del);
  }

  pill.addEventListener('click', () => {
    state.activeFolderFilter = id;
    saveView();
    refreshUI();
  });

  return pill;
}
