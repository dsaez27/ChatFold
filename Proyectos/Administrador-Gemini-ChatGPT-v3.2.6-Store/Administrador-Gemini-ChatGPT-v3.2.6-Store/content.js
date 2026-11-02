(function () {
  'use strict';

  const APP_VERSION = '3.2.6';

  function detectPlatform() {
    const host = location.hostname;
    if (host.endsWith('chatgpt.com') || host.endsWith('chat.openai.com')) {
      return 'chatgpt';
    }
    if (host.endsWith('gemini.google.com')) {
      return 'gemini';
    }
    return null;
  }

  const PLATFORM_KEY = detectPlatform();
  if (!PLATFORM_KEY) return;

  // Configuración específica por plataforma (Gemini y ChatGPT)
  const PLATFORMS = {
    gemini: {
      name: 'Gemini',
      storageKey: 'gcm_folders_data_v2',
      legacyStorageKey: 'gcm_folders_data_v1',
      convHrefRegex: /^\/(?:u\/[^/]+\/)?app\/([0-9a-zA-Z_-]{5,})/,
      buildUrl: (id) => `https://gemini.google.com/app/${id}`,
      selectors: {
        sidebar: 'conversations-list, .chat-history, div.conversations-container, mat-sidenav, side-navigation-v2, nav',
        conversationLinks: '[data-test-id="conversation"] a[href*="/app/"], a[href*="/app/"], div[data-test-id="conversation"]',
        rowClosest: ['[data-test-id="conversation"]', 'gem-nav-list-item', 'li'],
        optionsTrigger: 'button:has(mat-icon[fonticon="more_vert"]), button[data-test-id="actions-menu-button"], button[aria-haspopup="menu"], button[aria-label*="options"], button[aria-label*="opciones"], button[aria-label*="Opciones"]',
        menuPanel: '[role="menu"], .mat-mdc-menu-panel',
        deleteMenuItem: 'button[data-test-id="delete-button"], [role="menuitem"]:has(mat-icon[fonticon="delete"]), [role="menuitem"]:has(mat-icon[data-mat-icon-name="delete"]), [role="menuitem"]',
        confirmDialog: '[role="dialog"], mat-dialog-container, .mat-mdc-dialog-surface',
        confirmButton: 'gem-button[cdkfocusinitial] button, [cdkfocusinitial] button, button[cdkfocusinitial], button[data-test-id="confirm-button"]',
        activeMessages: 'user-query, model-response, .query-text, .model-response-text, message-content'
      }
    },
    chatgpt: {
      name: 'ChatGPT',
      storageKey: 'gcm_chatgpt_folders_data_v1',
      legacyStorageKey: null,
      convHrefRegex: /\/c\/([0-9a-zA-Z_-]{5,})/,
      buildUrl: (id) => `https://chatgpt.com/c/${id}`,
      selectors: {
        sidebar: '[data-testid="stage-thread-flyout"], nav[aria-label], nav, aside, .bg-token-sidebar-surface-primary',
        conversationLinks:
          '[data-sidebar-chatgpt-conversation-key] a[href*="/c/"], [data-testid^="history-item"] a[href*="/c/"], nav a[href*="/c/"], aside a[href*="/c/"], a[href*="/c/"]',
        rowClosest: [
          '[data-sidebar-chatgpt-conversation-key]',
          'li[data-testid^="history-item"]',
          'div[data-testid^="history-item"]',
          'li',
          'a.__menu-item'
        ],
        optionsTrigger:
          'button[data-testid^="history-item-"][data-testid$="-options"], button[data-testid*="options"], button[aria-haspopup="menu"], button[aria-label*="Options"], button[aria-label*="Opciones"], button[aria-label*="More"], button[aria-label*="Más"]',
        menuPanel: '[role="menu"], [data-radix-menu-content]',
        deleteMenuItem:
          '[role="menuitem"][data-testid="delete-chat-menu-item"], [role="menuitem"][data-testid*="delete"], [role="menuitem"].text-danger, [role="menuitem"][class*="text-token-text-error"], [role="menuitem"][class*="text-red"], [role="menuitem"]',
        confirmDialog: '[role="dialog"], [data-testid="modal-delete-conversation-confirmation"]',
        confirmButton:
          'button[data-testid="delete-conversation-confirm-button"], button.btn-danger, button[class*="btn-danger"], button[class*="bg-red"], button[class*="bg-token-bg-danger"], button[type="submit"]',
        activeMessages: '[data-message-author-role="user"], [data-message-author-role="assistant"]'
      }
    }
  };

  const P = PLATFORMS[PLATFORM_KEY];
  const SELECTORS = P.selectors;
  const PRESET_COLORS = ['#4285f4', '#34a853', '#fbbc04', '#ea4335', '#a142f4', '#24c1e0', '#ff6d00'];

  // Diccionario Bilingüe Español / Inglés adaptado dinámicamente a la plataforma activa
  const I18N = {
    es: {
      panelTitle: `Gestor de Gemini & ChatGPT`,
      toggleMinTitle: 'Clic para minimizar/expandir',
      toolbarCollapseTitle: 'Contraer barra superior',
      toolbarExpandTitle: 'Expandir barra superior',
      langBtnTitle: 'Switch language (Español / English)',
      newFolderBtn: '📂',
      newFolderTitle: 'Crear nueva carpeta con palabras clave automáticas',
      searchPlaceholder: '🔍 Buscar conversación...',
      sortTitle: 'Cambiar orden: Cronológico / A→Z / Z→A',
      sortRecent: '⇅ Recientes',
      sortAZ: '⇅ A → Z',
      sortZA: '⇅ Z → A',
      pillAll: 'Todas',
      pillProtected: '🔒 Protegidas',
      pillUnassigned: 'Sin carpeta',
      autoRulesPrefix: 'Auto-reglas',
      delFolderTitle: (name) => `Eliminar carpeta "${name}" (no borra las conversaciones)`,
      loadAllBtn: '⏬ Cargar',
      stopLoadBtn: '⏹ Detener carga',
      loadAllTitle: 'Bajar automáticamente por la barra lateral para cargar todo tu historial',
      backupBtn: '💾 Respaldar',
      backupTitle: 'Guardar tus carpetas y configuración en un archivo JSON',
      importBtn: '📂 Importar',
      importTitle: 'Restaurar carpetas desde un archivo JSON',
      selectAll: 'Todo',
      selectAllTitle: 'Seleccionar o deseleccionar todas las conversaciones visibles',
      folderBtn: (n) => `📁 Carpeta (${n})`,
      folderBtnTitle: 'Asignar conversaciones seleccionadas a una carpeta',
      protectBtn: '🔒 Proteger',
      protectBtnTitle: 'Proteger o desproteger conversaciones seleccionadas contra borrado accidental',
      exportBtn: '📥 Exportar .md',
      exportBtnTitle: 'Exportar conversaciones seleccionadas y el chat activo a Markdown (.md)',
      deleteBtn: (n) => `🗑️ Borrar (${n})`,
      stopBtn: '⏹ Detener',
      checkboxTitle: 'Seleccionar conversación (Shift + Clic para rango)',
      lockIconTitle: 'Protegida contra borrado (Clic para quitar protección)',
      removeFromFolder: '🚫 Quitar de carpeta',
      createNewFolderMenu: '➕ Nueva carpeta...',
      modalNewFolderTitle: 'Nueva Carpeta Inteligente',
      modalNewFolderDesc: 'Elige un nombre, un color y palabras clave opcionales para auto-clasificar tus chats:',
      modalFolderNamePlaceholder: 'Nombre de carpeta (Ej. Trabajo, Finanzas, Inglés...)',
      modalKeywordsPlaceholder: 'Palabras clave separadas por coma (Ej. excel, factura, banco)',
      cancel: 'Cancelar',
      createFolderConfirm: 'Crear Carpeta',
      confirmDeleteTitle: (n) => `¿Eliminar ${n} conversación${n > 1 ? 'es' : ''}?`,
      confirmDeleteDesc: (n, skipped) =>
        `Se borrarán permanentemente ${n} conversación${n > 1 ? 'es' : ''} de tu historial de ${P.name}.` +
        (skipped > 0 ? `\n(🔒 Se omitirán ${skipped} conversación(es) protegida(s) con candado).` : ''),
      confirmDeleteBtn: (n) => `Sí, eliminar (${n})`,
      toastLoadingHistory: '⏬ Cargando historial antiguo... (Clic en "Detener carga" para parar)',
      toastLoadedCount: (n) => `⏬ Conversaciones cargadas: ${n}...`,
      toastLoadComplete: (n) => `✅ Historial completo cargado (${n} conversaciones).`,
      toastBackupSaved: '💾 Respaldo descargado correctamente.',
      toastBackupRestored: '📂 Carpetas y configuración restauradas.',
      toastBackupInvalid: '❌ Archivo JSON inválido.',
      toastMdExported: '📥 Archivo Markdown (.md) descargado.',
      toastUnprotected: (n) => `🔓 Se quitó la protección de ${n} conversación(es).`,
      toastProtected: (n) => `🔒 ${n} conversación(es) protegida(s) contra borrado accidental.`,
      toastMovedToFolder: (n) => `📁 ${n} conversación(es) movida(s) a la carpeta.`,
      toastRemovedFromFolder: (n) => `Se quitó la carpeta de ${n} conversación(es).`,
      toastAllProtected: '🔒 Todas las conversaciones seleccionadas están protegidas con candado.',
      toastDeletingProgress: (curr, total) => `Eliminando conversación ${curr} de ${total}...`,
      toastDeleteFinishedErr: (del, err) => `Finalizado: ${del} eliminadas, ${err} con error.`,
      toastDeleteSuccess: (del) => `¡Listo! Se eliminaron ${del} conversación${del === 1 ? '' : 'es'}.`,
      toastStopping: 'Deteniendo después de la conversación actual...',
      mdHeader: `Exportación de Conversaciones de ${P.name}`,
      mdDate: 'Fecha',
      mdSelectedIndex: (n) => `Índice de Conversaciones Seleccionadas (${n})`,
      mdFolderLabel: 'Carpeta',
      mdActiveChatHeader: 'Contenido de la Conversación Activa en Pantalla',
      mdUser: '🧑 Usuario',
      defaultFolders: [
        { id: 'f_work', name: 'Programación', color: '#4285f4', keywords: ['python', 'javascript', 'código', 'code', 'script', 'sql', 'api', 'bug', 'error', 'html', 'css', 'react'] },
        { id: 'f_study', name: 'Estudio', color: '#34a853', keywords: ['resumen', 'summary', 'explica', 'explain', 'examen', 'curso', 'historia', 'matemática', 'aprender'] },
        { id: 'f_ideas', name: 'Ideas', color: '#fbbc04', keywords: ['idea', 'proyecto', 'project', 'diseño', 'design', 'plan', 'crea'] }
      ]
    },
    en: {
      panelTitle: `${P.name} Manager`,
      toggleMinTitle: 'Click to minimize/expand',
      toolbarCollapseTitle: 'Collapse top bar',
      toolbarExpandTitle: 'Expand top bar',
      langBtnTitle: 'Cambiar idioma (English / Español)',
      newFolderBtn: '📂',
      newFolderTitle: 'Create a new smart folder with auto-keywords',
      searchPlaceholder: '🔍 Search conversation...',
      sortTitle: 'Toggle sort order: Recent / A→Z / Z→A',
      sortRecent: '⇅ Recent',
      sortAZ: '⇅ A → Z',
      sortZA: '⇅ Z → A',
      pillAll: 'All',
      pillProtected: '🔒 Protected',
      pillUnassigned: 'Unassigned',
      autoRulesPrefix: 'Auto-rules',
      delFolderTitle: (name) => `Delete folder "${name}" (does not delete chats)`,
      loadAllBtn: '⏬ Load',
      stopLoadBtn: '⏹ Stop Loading',
      loadAllTitle: 'Auto-scroll the sidebar to load all your older chat history',
      backupBtn: '💾 Backup',
      backupTitle: 'Export your folders and settings to a JSON file',
      importBtn: '📂 Import',
      importTitle: 'Restore folders and settings from a JSON file',
      selectAll: 'All',
      selectAllTitle: 'Select or deselect all visible conversations',
      folderBtn: (n) => `📁 Folder (${n})`,
      folderBtnTitle: 'Assign selected conversations to a folder',
      protectBtn: '🔒 Protect',
      protectBtnTitle: 'Protect or unprotect selected conversations against accidental deletion',
      exportBtn: '📥 Export .md',
      exportBtnTitle: 'Export selected conversations and active chat to Markdown (.md)',
      deleteBtn: (n) => `🗑️ Delete (${n})`,
      stopBtn: '⏹ Stop',
      checkboxTitle: 'Select conversation (Shift + Click for range)',
      lockIconTitle: 'Protected from deletion (Click to unprotect)',
      removeFromFolder: '🚫 Remove from folder',
      createNewFolderMenu: '➕ New folder...',
      modalNewFolderTitle: 'New Smart Folder',
      modalNewFolderDesc: 'Choose a name, color, and optional keywords to auto-classify your chats:',
      modalFolderNamePlaceholder: 'Folder name (e.g., Work, Finance, Coding...)',
      modalKeywordsPlaceholder: 'Comma-separated keywords (e.g., python, invoice, bug)',
      cancel: 'Cancel',
      createFolderConfirm: 'Create Folder',
      confirmDeleteTitle: (n) => `Delete ${n} conversation${n > 1 ? 's' : ''}?`,
      confirmDeleteDesc: (n, skipped) =>
        `You are about to permanently delete ${n} conversation${n > 1 ? 's' : ''} from your ${P.name} history.` +
        (skipped > 0 ? `\n(🔒 ${skipped} locked conversation(s) will be safely skipped).` : ''),
      confirmDeleteBtn: (n) => `Yes, delete (${n})`,
      toastLoadingHistory: '⏬ Loading older chat history... (Click "Stop Loading" to stop)',
      toastLoadedCount: (n) => `⏬ Conversations loaded: ${n}...`,
      toastLoadComplete: (n) => `✅ Full history loaded (${n} conversations).`,
      toastBackupSaved: '💾 Backup JSON downloaded successfully.',
      toastBackupRestored: '📂 Folders and settings restored.',
      toastBackupInvalid: '❌ Invalid JSON file.',
      toastMdExported: '📥 Markdown (.md) file downloaded.',
      toastUnprotected: (n) => `🔓 Removed protection from ${n} conversation(s).`,
      toastProtected: (n) => `🔒 ${n} conversation(s) protected from accidental deletion.`,
      toastMovedToFolder: (n) => `📁 ${n} conversation(s) moved to folder.`,
      toastRemovedFromFolder: (n) => `Removed folder from ${n} conversation(s).`,
      toastAllProtected: '🔒 All selected conversations are protected with a lock.',
      toastDeletingProgress: (curr, total) => `Deleting conversation ${curr} of ${total}...`,
      toastDeleteFinishedErr: (del, err) => `Finished: ${del} deleted, ${err} failed.`,
      toastDeleteSuccess: (del) => `Done! Deleted ${del} conversation${del === 1 ? '' : 's'}.`,
      toastStopping: 'Stopping after current conversation...',
      mdHeader: `${P.name} Conversations Export`,
      mdDate: 'Date',
      mdSelectedIndex: (n) => `Selected Conversations Index (${n})`,
      mdFolderLabel: 'Folder',
      mdActiveChatHeader: 'Active Conversation Content on Screen',
      mdUser: '🧑 User',
      defaultFolders: [
        { id: 'f_work', name: 'Coding', color: '#4285f4', keywords: ['python', 'javascript', 'code', 'código', 'script', 'sql', 'api', 'bug', 'error', 'html', 'css', 'react'] },
        { id: 'f_study', name: 'Study', color: '#34a853', keywords: ['summary', 'resumen', 'explain', 'explica', 'exam', 'course', 'history', 'math', 'learn'] },
        { id: 'f_ideas', name: 'Ideas', color: '#fbbc04', keywords: ['idea', 'project', 'proyecto', 'design', 'diseño', 'plan', 'create'] }
      ]
    }
  };

  function detectInitialLang() {
    const navLang = (navigator.language || document.documentElement.lang || 'es').toLowerCase();
    return navLang.startsWith('es') ? 'es' : 'en';
  }

  // Cachés en memoria O(1)
  const rowIdCache = new WeakMap();
  const rowTitleCache = new WeakMap();
  const autoClassifiedVisited = new Set();
  let cachedSidebarEl = null;

  // Convierte lo guardado (JSON ya parseado) en un estado válido; descarta datos corruptos.
  function normalizeStoredState(parsed, defaultLang) {
    const isPlainObj = (o) => o && typeof o === 'object' && !Array.isArray(o);
    return {
      lang: parsed.lang === 'en' || parsed.lang === 'es' ? parsed.lang : defaultLang,
      folders: Array.isArray(parsed.folders)
        ? parsed.folders
            .filter((f) => f && typeof f.id === 'string' && typeof f.name === 'string')
            .map((f) => ({
              id: f.id,
              name: f.name,
              color: f.color || '#4285f4',
              keywords: Array.isArray(f.keywords)
                ? f.keywords.filter((k) => typeof k === 'string').map((k) => k.toLowerCase())
                : []
            }))
        : [],
      assignments: isPlainObj(parsed.assignments) ? parsed.assignments : {},
      protectedIds: isPlainObj(parsed.protectedIds) ? parsed.protectedIds : {},
      minimized: !!parsed.minimized,
      pos:
        parsed.pos && Number.isFinite(parsed.pos.left) && Number.isFinite(parsed.pos.bottom)
          ? { left: parsed.pos.left, bottom: parsed.pos.bottom }
          : null,
      // Última vista usada (filtro y orden) para retomarla tras recargar la página.
      view: {
        filter: typeof parsed.view?.filter === 'string' ? parsed.view.filter : 'ALL',
        sort: ['DEFAULT', 'AZ', 'ZA'].includes(parsed.view?.sort) ? parsed.view.sort : 'DEFAULT',
        toolbarCollapsed: !!parsed.view?.toolbarCollapsed
      }
    };
  }

  function loadFolderData() {
    const defaultLang = detectInitialLang();
    try {
      const raw =
        localStorage.getItem(P.storageKey) ||
        (P.legacyStorageKey ? localStorage.getItem(P.legacyStorageKey) : null);
      if (raw) {
        return normalizeStoredState(JSON.parse(raw), defaultLang);
      }
    } catch (_) {}

    const initial = {
      lang: defaultLang,
      folders: I18N[defaultLang].defaultFolders.map((f) => ({ ...f, keywords: [...f.keywords] })),
      assignments: {},
      protectedIds: {},
      minimized: false,
      pos: null,
      view: { filter: 'ALL', sort: 'DEFAULT', toolbarCollapsed: false }
    };
    saveFolderData(initial);
    return initial;
  }

  function saveFolderData(data) {
    try {
      localStorage.setItem(P.storageKey, JSON.stringify(data));
    } catch (_) {}
  }

  let folderState = loadFolderData();
  const t = () => I18N[folderState.lang] || I18N.es;

  // Retomar la última vista (filtro y orden) donde se dejó; si la carpeta ya no existe, volver a "Todas".
  const BUILTIN_FILTERS = ['ALL', 'UNASSIGNED', 'PROTECTED'];
  let activeFolderFilter =
    BUILTIN_FILTERS.includes(folderState.view.filter) || folderState.folders.some((f) => f.id === folderState.view.filter)
      ? folderState.view.filter
      : 'ALL';
  let searchQuery = '';
  let sortMode = folderState.view.sort;
  let toolbarCollapsed = folderState.view.toolbarCollapsed;

  function saveView() {
    folderState.view = { filter: activeFolderFilter, sort: sortMode, toolbarCollapsed };
    saveFolderData(folderState);
  }
  let autoScrollActive = false;
  let autoScrollRunId = 0;

  let deletionInProgress = false;
  let deletionStopRequested = false;
  const selectedMap = new Map();
  let lastCheckedCheckbox = null;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function toggleLanguage() {
    folderState.lang = folderState.lang === 'es' ? 'en' : 'es';
    saveFolderData(folderState);

    document.getElementById('gcm-toolbar')?.remove();
    document.getElementById('gcm-folders-box')?.remove();
    document.getElementById('gcm-folder-popover')?.remove();
    refreshUI();
  }

  function parseConvId(el) {
    if (!el) return null;
    const href =
      el.getAttribute?.('href') ||
      el.querySelector?.('a[href*="/app/"], a[href*="/c/"]')?.getAttribute('href') ||
      '';
    const cached = rowIdCache.get(el);
    if (cached && cached.href === href) return cached.id;

    if (href) {
      let pathPart = href;
      if (href.startsWith('http')) {
        try {
          pathPart = new URL(href, location.origin).pathname;
        } catch (_) {}
      }
      const match = P.convHrefRegex.exec(pathPart);
      if (match) {
        rowIdCache.set(el, { href, id: match[1] });
        return match[1];
      }
    }
    const jslog = el.getAttribute?.('jslog') || '';
    if (jslog) {
      try {
        const id = 'conv_' + btoa(encodeURIComponent(jslog)).slice(0, 16);
        rowIdCache.set(el, { href: jslog, id });
        return id;
      } catch (_) {}
    }
    return null;
  }

  function extractConvTitle(row, convId) {
    // La fila puede ser reutilizada por el framework para otra conversación: el caché se valida por id.
    const cached = rowTitleCache.get(row);
    if (cached && cached.id === convId) return cached.title;

    const linkEl =
      row.querySelector?.('.conversation-title') ||
      row.querySelector?.('[dir="auto"]') ||
      row.querySelector?.('a[href*="/app/"], a[href*="/c/"]') ||
      row;

    let rawText = '';
    if (linkEl.querySelector?.('.gcm-chat-badge, .gcm-lock-icon, button')) {
      const clone = linkEl.cloneNode(true);
      clone.querySelectorAll('.gcm-chat-badge, .gcm-lock-icon, .gcm-checkbox, button').forEach((n) => n.remove());
      rawText = clone.textContent || '';
    } else {
      rawText = linkEl.textContent || '';
    }

    const title = rawText.replace(/^🔒\s*/, '').trim();
    if (title) rowTitleCache.set(row, { id: convId, title });
    return title;
  }

  // Simulación completa de eventos Pointer/Mouse (compatible con Angular Material en Gemini y Radix UI en ChatGPT)
  function realClick(el) {
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

  function isActiveOverlay(el) {
    if (!el || !el.isConnected || el.getAttribute('data-state') === 'closed') return false;
    const style = getComputedStyle(el);
    return !el.hidden && style.display !== 'none' && style.visibility !== 'hidden' && el.getClientRects().length > 0;
  }

  async function pollUntil(predicate, timeout = 3000, interval = 100) {
    const start = Date.now();
    let result = predicate();
    while (!result && Date.now() - start < timeout) {
      await sleep(interval);
      result = predicate();
    }
    return result;
  }

  function getSidebarElement() {
    if (
      cachedSidebarEl &&
      cachedSidebarEl.isConnected &&
      cachedSidebarEl.querySelector(SELECTORS.conversationLinks)
    ) {
      return cachedSidebarEl;
    }
    const candidates = document.querySelectorAll(SELECTORS.sidebar);
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].querySelector(SELECTORS.conversationLinks)) {
        cachedSidebarEl = candidates[i];
        return cachedSidebarEl;
      }
    }
    cachedSidebarEl = candidates[0] || null;
    return cachedSidebarEl;
  }

  function isSingleRowContainer(container) {
    if (!container || container === document.body) return false;
    const links = container.querySelectorAll('a[href*="/app/"], a[href*="/c/"]');
    return links.length <= 1;
  }

  function findRowContainer(el) {
    if (PLATFORM_KEY === 'chatgpt') {
      if (el.classList?.contains('__menu-item') || el.getAttribute?.('data-sidebar-item') === 'true') {
        return el;
      }
      if (el.parentElement && isSingleRowContainer(el.parentElement)) {
        const pTag = el.parentElement.tagName;
        if (el.parentElement.classList?.contains('group') || pTag === 'LI' || pTag === 'DIV') {
          return el.parentElement;
        }
      }
    }
    for (let i = 0; i < SELECTORS.rowClosest.length; i++) {
      const match = el.closest(SELECTORS.rowClosest[i]);
      if (match && isSingleRowContainer(match)) return match;
    }
    return el;
  }

  function getConversationRows() {
    const sidebar = getSidebarElement();
    const root = sidebar || (PLATFORM_KEY === 'chatgpt' ? document : null);
    if (!root) return [];

    const candidates = root.querySelectorAll(SELECTORS.conversationLinks);
    const rows = [];
    const seenRows = new Set();

    for (let i = 0; i < candidates.length; i++) {
      const el = candidates[i];
      // En ChatGPT descartar cualquier enlace que esté dentro del área de mensajes principal (<main>)
      if (PLATFORM_KEY === 'chatgpt' && el.closest('main')) continue;

      const id = parseConvId(el);
      if (!id) continue;

      const row = findRowContainer(el);

      if (!seenRows.has(row)) {
        seenRows.add(row);
        rows.push({
          id,
          row,
          link: el,
          title: extractConvTitle(row, id)
        });
      }
    }
    return rows;
  }

  function runAutoClassification(items) {
    let changed = false;
    for (let i = 0; i < items.length; i++) {
      const { id, title } = items[i];
      if (autoClassifiedVisited.has(id) || folderState.assignments[id]) {
        autoClassifiedVisited.add(id);
        continue;
      }

      // Si el título aún no cargó, no marcar como visitada: se reintentará en el siguiente refresco.
      const lowerTitle = (title || '').toLowerCase();
      if (!lowerTitle) continue;
      autoClassifiedVisited.add(id);

      for (let j = 0; j < folderState.folders.length; j++) {
        const folder = folderState.folders[j];
        const kws = folder.keywords;
        if (!kws || kws.length === 0) continue;

        if (kws.some((kw) => kw && lowerTitle.includes(kw))) {
          folderState.assignments[id] = folder.id;
          changed = true;
          break;
        }
      }
    }
    if (changed) {
      saveFolderData(folderState);
    }
  }

  function applyFolderBadgesAndFilter(items) {
    const folderLookup = new Map(folderState.folders.map((f) => [f.id, f]));
    const cleanQuery = searchQuery.trim().toLowerCase();

    for (let i = 0; i < items.length; i++) {
      const { id, row, title } = items[i];
      const assignedFolderId = folderState.assignments[id];
      const folder = assignedFolderId ? folderLookup.get(assignedFolderId) : null;
      const isProtected = !!folderState.protectedIds[id];

      row.classList.toggle('gcm-has-lock', isProtected);
      row.classList.toggle('gcm-has-badge', !!folder);

      let lockEl = row.querySelector('.gcm-lock-icon');
      if (isProtected) {
        if (!lockEl) {
          lockEl = document.createElement('span');
          lockEl.className = 'gcm-lock-icon';
          lockEl.textContent = '🔒';
          lockEl.title = t().lockIconTitle;
          lockEl.dataset.convId = id;
          row.appendChild(lockEl);
        }
      } else if (lockEl) {
        lockEl.remove();
      }

      let badge = row.querySelector('.gcm-chat-badge');
      if (folder) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'gcm-chat-badge';
          row.appendChild(badge);
        }
        const badgeSig = `${folder.id}:${folder.name}:${folder.color}`;
        if (badge.dataset.sig !== badgeSig) {
          badge.dataset.sig = badgeSig;
          badge.textContent = '';

          const dot = document.createElement('span');
          dot.className = 'gcm-badge-dot';
          dot.style.backgroundColor = folder.color;
          dot.style.boxShadow = `0 0 6px ${folder.color}`;

          const txt = document.createElement('span');
          txt.className = 'gcm-badge-text';
          txt.textContent = folder.name;

          badge.appendChild(dot);
          badge.appendChild(txt);

          badge.style.background = `linear-gradient(135deg, ${folder.color}55 0%, #12141a 88%), #12141a`;
          badge.style.color = '#ffffff';
          badge.style.borderColor = folder.color;
        }
      } else if (badge) {
        badge.remove();
      }

      let visible = true;
      if (activeFolderFilter === 'UNASSIGNED') {
        visible = !folder;
      } else if (activeFolderFilter === 'PROTECTED') {
        visible = isProtected;
      } else if (activeFolderFilter !== 'ALL') {
        visible = folder && folder.id === activeFolderFilter;
      }

      if (visible && cleanQuery) {
        const matchTitle = (title || '').toLowerCase().includes(cleanQuery);
        const matchFolder = folder && folder.name.toLowerCase().includes(cleanQuery);
        visible = matchTitle || !!matchFolder;
      }

      const isHidden = row.classList.contains('gcm-hidden-by-filter');
      if (visible && isHidden) {
        row.classList.remove('gcm-hidden-by-filter');
        const parentLi = row.closest('li');
        if (parentLi && isSingleRowContainer(parentLi)) {
          parentLi.classList.remove('gcm-hidden-by-filter');
        }
      } else if (!visible && !isHidden) {
        row.classList.add('gcm-hidden-by-filter');
        const parentLi = row.closest('li');
        if (parentLi && isSingleRowContainer(parentLi)) {
          parentLi.classList.add('gcm-hidden-by-filter');
        }
      }
    }

    if (sortMode === 'DEFAULT') {
      for (let i = 0; i < items.length; i++) {
        const r = items[i].row;
        if (r.style.order) r.style.order = '';
        if (r.parentElement?.classList.contains('gcm-sort-container')) {
          r.parentElement.classList.remove('gcm-sort-container');
        }
      }
    } else {
      const sorted = [...items].sort((a, b) => {
        const cmp = (a.title || '').localeCompare(b.title || '', folderState.lang, { sensitivity: 'base' });
        return sortMode === 'AZ' ? cmp : -cmp;
      });
      for (let i = 0; i < sorted.length; i++) {
        const r = sorted[i].row;
        if (r.parentElement && !r.parentElement.classList.contains('gcm-sort-container')) {
          r.parentElement.classList.add('gcm-sort-container');
        }
        const targetOrder = String(i + 1);
        if (r.style.order !== targetOrder) {
          r.style.order = targetOrder;
        }
      }
    }
  }

  function injectSidebarFoldersPanel(items) {
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
    if (folderState.minimized && !isMin) {
      box.classList.add('gcm-minimized');
      clampBoxPosition(box);
    } else if (!folderState.minimized && isMin) {
      box.classList.remove('gcm-minimized');
      // El tamaño cambia al instante (sin transición de layout): reajustar de inmediato para no salir de pantalla.
      clampBoxPosition(box);
    }

    const counts = {
      ALL: items.length,
      UNASSIGNED: 0,
      PROTECTED: 0
    };
    for (let i = 0; i < folderState.folders.length; i++) {
      counts[folderState.folders[i].id] = 0;
    }

    for (let i = 0; i < items.length; i++) {
      const id = items[i].id;
      const fId = folderState.assignments[id];
      if (fId && counts[fId] !== undefined) {
        counts[fId]++;
      } else {
        counts.UNASSIGNED++;
      }
      if (folderState.protectedIds[id]) {
        counts.PROTECTED++;
      }
    }

    const pillsContainer = document.getElementById('gcm-pills-container');
    if (!pillsContainer) return;

    const signature = JSON.stringify({
      lang: folderState.lang,
      folders: folderState.folders,
      active: activeFolderFilter,
      counts,
      sortMode,
      autoScrollActive
    });

    if (pillsContainer.dataset.sig === signature) return;
    pillsContainer.dataset.sig = signature;

    const frag = document.createDocumentFragment();

    frag.appendChild(
      createFolderPill({ id: 'ALL', name: t().pillAll, color: null, count: counts.ALL, deletable: false })
    );

    for (let i = 0; i < folderState.folders.length; i++) {
      const f = folderState.folders[i];
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

    if (counts.PROTECTED > 0 || activeFolderFilter === 'PROTECTED') {
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
      sortBtn.textContent = sortMode === 'DEFAULT' ? t().sortRecent : sortMode === 'AZ' ? t().sortAZ : t().sortZA;
    }

    const scrollBtn = document.getElementById('gcm-autoscroll-btn');
    if (scrollBtn) {
      if (autoScrollActive) {
        scrollBtn.classList.add('active');
        scrollBtn.textContent = t().stopLoadBtn;
      } else {
        scrollBtn.classList.remove('active');
        scrollBtn.textContent = t().loadAllBtn;
      }
    }
  }

  // ---- Panel arrastrable ----
  let panelJustDragged = false;

  // Aplica la posición guardada (si existe) manteniendo el panel dentro de la ventana.
  function clampBoxPosition(box) {
    const pos = folderState.pos;
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
      folderState.pos = { left, bottom };
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
        saveFolderData(folderState);
        // Evita que el "click" que sigue al arrastre minimice/expanda el panel.
        panelJustDragged = true;
        setTimeout(() => {
          panelJustDragged = false;
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

  // Otra pestaña (del mismo sitio) guardó cambios: adoptarlos para no pisarlos con datos viejos
  // al próximo guardado. Se conserva la vista (filtro/orden) de ESTA pestaña.
  window.addEventListener('storage', (e) => {
    if (e.key !== P.storageKey || !e.newValue) return;
    try {
      const incoming = normalizeStoredState(JSON.parse(e.newValue), folderState.lang);
      const keepView = { filter: activeFolderFilter, sort: sortMode, toolbarCollapsed };
      const langChanged = incoming.lang !== folderState.lang;
      folderState = { ...incoming, view: keepView };
      if (!BUILTIN_FILTERS.includes(activeFolderFilter) && !folderState.folders.some((f) => f.id === activeFolderFilter)) {
        activeFolderFilter = 'ALL';
      }
      autoClassifiedVisited.clear();
      if (langChanged) {
        document.getElementById('gcm-toolbar')?.remove();
        document.getElementById('gcm-folders-box')?.remove();
      } else {
        const box = document.getElementById('gcm-folders-box');
        if (box) {
          box.classList.toggle('gcm-minimized', folderState.minimized);
          clampBoxPosition(box);
        }
        const pills = document.getElementById('gcm-pills-container');
        if (pills) delete pills.dataset.sig;
      }
      refreshUI();
    } catch (_) {}
  });

  window.addEventListener('resize', () => clampBoxPosition(document.getElementById('gcm-folders-box')));

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
      if (panelJustDragged) return; // el arrastre no debe minimizar/expandir el panel
      folderState.minimized = !folderState.minimized;
      saveFolderData(folderState);
      refreshUI();
    });

    const headerActions = document.createElement('div');
    headerActions.className = 'gcm-header-actions';

    const langBtn = document.createElement('button');
    langBtn.className = 'gcm-mini-btn';
    langBtn.textContent = folderState.lang.toUpperCase();
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
      folderState.minimized = !folderState.minimized;
      saveFolderData(folderState);
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

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'gcm-search-input';
    searchInput.placeholder = t().searchPlaceholder;
    searchInput.value = searchQuery;

    let searchDebounce = null;
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        applyFolderBadgesAndFilter(getConversationRows());
      }, 90);
    });

    const sortBtn = document.createElement('button');
    sortBtn.id = 'gcm-sort-btn';
    sortBtn.className = 'gcm-sort-btn';
    sortBtn.title = t().sortTitle;
    sortBtn.textContent = t().sortRecent;
    sortBtn.addEventListener('click', () => {
      sortMode = sortMode === 'DEFAULT' ? 'AZ' : sortMode === 'AZ' ? 'ZA' : 'DEFAULT';
      saveView();
      refreshUI();
    });

    searchRow.appendChild(searchInput);
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

    footer.appendChild(scrollBtn);
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
    pill.className = 'gcm-folder-pill' + (activeFolderFilter === id ? ' active' : '');
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
      activeFolderFilter = id;
      saveView();
      refreshUI();
    });

    return pill;
  }

  function deleteFolderById(folderId) {
    folderState.folders = folderState.folders.filter((f) => f.id !== folderId);
    for (const convId of Object.keys(folderState.assignments)) {
      if (folderState.assignments[convId] === folderId) {
        delete folderState.assignments[convId];
      }
    }
    if (activeFolderFilter === folderId) {
      activeFolderFilter = 'ALL';
    }
    saveView();
    refreshUI();
  }

  async function toggleAutoScrollHistory() {
    if (autoScrollActive) {
      autoScrollActive = false;
      refreshUI();
      return;
    }

    autoScrollActive = true;
    const runId = ++autoScrollRunId;
    refreshUI();
    updateStatusToast(t().toastLoadingHistory);

    let unchangedCycles = 0;
    let lastCount = getConversationRows().length;
    let finishedNaturally = false;

    // runId evita que un bucle antiguo siga activo si el usuario detiene y reinicia rápidamente.
    while (autoScrollActive && runId === autoScrollRunId) {
      const items = getConversationRows();
      if (items.length > 0) {
        let targetRow = items[items.length - 1].row;
        for (let k = items.length - 1; k >= 0; k--) {
          if (!items[k].row.classList.contains('gcm-hidden-by-filter')) {
            targetRow = items[k].row;
            break;
          }
        }
        targetRow.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
      if (!autoScrollActive || runId !== autoScrollRunId) break;
      refreshUI();

      const currentCount = getConversationRows().length;
      updateStatusToast(t().toastLoadedCount(currentCount));

      if (currentCount === lastCount) {
        unchangedCycles++;
        if (unchangedCycles >= 4) {
          finishedNaturally = true;
          autoScrollActive = false;
          updateStatusToast(t().toastLoadComplete(currentCount), null, null, 3500);
          break;
        }
      } else {
        unchangedCycles = 0;
        lastCount = currentCount;
      }
    }

    if (runId !== autoScrollRunId) return; // otro bucle más reciente tomó el control

    autoScrollActive = false;
    if (!finishedNaturally) {
      // Detenido por el usuario: no dejar el toast de progreso fijo en pantalla.
      updateStatusToast(t().toastLoadedCount(getConversationRows().length), null, null, 2500);
    }
    refreshUI();
  }

  function exportBackupConfig() {
    // La posición del panel y la vista actual son locales: no van en el respaldo.
    const { pos: _pos, view: _view, ...backupData } = folderState;
    const dataStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${PLATFORM_KEY}-folders-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    updateStatusToast(t().toastBackupSaved, null, null, 2500);
  }

  // Copia segura de un mapa {idConversación: valor}: descarta arrays, claves peligrosas y valores inválidos.
  function sanitizeMap(src, mapValue) {
    const out = {};
    if (!src || typeof src !== 'object' || Array.isArray(src)) return out;
    for (const key of Object.keys(src)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
      const v = mapValue(src[key]);
      if (v !== undefined) out[key] = v;
    }
    return out;
  }

  function importBackupConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          if (Array.isArray(parsed.folders)) {
            folderState = {
              lang: parsed.lang === 'en' || parsed.lang === 'es' ? parsed.lang : folderState.lang,
              folders: parsed.folders.map((f, idx) => ({
                id: typeof f?.id === 'string' && f.id ? f.id : `f_imp_${idx}`,
                name: typeof f?.name === 'string' && f.name.trim() ? f.name.trim().slice(0, 40) : `Folder ${idx + 1}`,
                color: /^#[0-9a-fA-F]{6}$/.test(f?.color) ? f.color : PRESET_COLORS[idx % PRESET_COLORS.length],
                keywords: Array.isArray(f?.keywords)
                  ? f.keywords.filter((k) => typeof k === 'string').map((k) => k.trim().toLowerCase()).filter(Boolean)
                  : []
              })),
              assignments: sanitizeMap(parsed.assignments, (v) => (typeof v === 'string' ? v : undefined)),
              protectedIds: sanitizeMap(parsed.protectedIds, (v) => (v ? true : undefined)),
              minimized: !!parsed.minimized,
              pos: folderState.pos || null, // la posición del panel es local a esta pantalla
              view: { filter: 'ALL', sort: sortMode, toolbarCollapsed }
            };
            activeFolderFilter = 'ALL';
            autoClassifiedVisited.clear();
            selectedMap.clear();
            saveFolderData(folderState);
            document.getElementById('gcm-toolbar')?.remove();
            document.getElementById('gcm-folders-box')?.remove();
            refreshUI();
            updateStatusToast(t().toastBackupRestored, null, null, 3000);
          }
        } catch (_) {
          updateStatusToast(t().toastBackupInvalid, null, null, 3000);
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  function exportSelectedConversationsToMarkdown() {
    const items = getConversationRows();
    const selectedIds = Array.from(selectedMap.keys());
    const folderLookup = new Map(folderState.folders.map((f) => [f.id, f.name]));

    let markdown = `# ${t().mdHeader}\n`;
    markdown += `${t().mdDate}: ${new Date().toLocaleString()}\n\n`;

    // Quedarse solo con el elemento más externo de cada mensaje (evita duplicados por anidamiento
    // sin descartar mensajes distintos que casualmente tengan el mismo texto).
    const allMessages = Array.from(document.querySelectorAll(SELECTORS.activeMessages));
    const messages = allMessages.filter((m) => !allMessages.some((o) => o !== m && o.contains(m)));

    if (selectedIds.length > 0) {
      markdown += `## ${t().mdSelectedIndex(selectedIds.length)}\n\n`;
      selectedIds.forEach((id, idx) => {
        const rowObj = items.find((it) => it.id === id);
        const title = (rowObj?.title || id).replace(/[\[\]\r\n]/g, ' ').trim();
        const folderName = folderLookup.get(folderState.assignments[id]) || t().pillUnassigned;
        const isLocked = folderState.protectedIds[id] ? ' 🔒' : '';
        markdown += `${idx + 1}. **[${title}](${P.buildUrl(id)})** — *${t().mdFolderLabel}: ${folderName}*${isLocked}\n`;
      });
      markdown += `\n---\n\n`;
    }

    if (messages.length > 0) {
      markdown += `## ${t().mdActiveChatHeader}\n\n`;
      messages.forEach((msg) => {
        const text = (msg.innerText || msg.textContent || '').trim();
        if (!text) return;

        const isUser =
          msg.getAttribute?.('data-message-author-role') === 'user' ||
          msg.tagName.toLowerCase().includes('user') ||
          msg.classList.contains('query-text') ||
          !!msg.querySelector?.('[data-message-author-role="user"]');
        markdown += `### ${isUser ? t().mdUser : `✨ ${P.name}`}\n\n${text}\n\n---\n\n`;
      });
    }

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${PLATFORM_KEY}-export-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);

    updateStatusToast(t().toastMdExported, null, null, 3000);
  }

  function toggleProtectSelected() {
    const ids = Array.from(selectedMap.keys());
    if (ids.length === 0) return;

    const allAlreadyProtected = ids.every((id) => !!folderState.protectedIds[id]);
    ids.forEach((id) => {
      if (allAlreadyProtected) {
        delete folderState.protectedIds[id];
      } else {
        folderState.protectedIds[id] = true;
      }
    });

    saveFolderData(folderState);
    clearAllSelections();
    refreshUI();
    updateStatusToast(
      allAlreadyProtected ? t().toastUnprotected(ids.length) : t().toastProtected(ids.length),
      null,
      null,
      3000
    );
  }

  function clearAllSelections() {
    selectedMap.clear();
    const sidebar = getSidebarElement() || document;
    sidebar.querySelectorAll('.gcm-checkbox').forEach((cb) => {
      cb.checked = false;
      cb.classList.remove('gcm-checked');
    });
    sidebar.querySelectorAll('.gcm-chat-row.gcm-selected').forEach((r) => r.classList.remove('gcm-selected'));
    const selectAllCb = document.getElementById('gcm-select-all');
    if (selectAllCb) {
      selectAllCb.checked = false;
      selectAllCb.classList.remove('gcm-checked');
    }
  }

  function openCreateFolderModal(onCreatedCallback = null) {
    const existing = document.getElementById('gcm-modal-overlay');
    if (existing) existing.remove();

    let chosenColor = PRESET_COLORS[folderState.folders.length % PRESET_COLORS.length];

    const overlay = document.createElement('div');
    overlay.id = 'gcm-modal-overlay';

    const card = document.createElement('div');
    card.className = 'gcm-modal-card';

    const title = document.createElement('div');
    title.className = 'gcm-modal-title';
    title.textContent = t().modalNewFolderTitle;

    const desc = document.createElement('div');
    desc.className = 'gcm-modal-desc';
    desc.textContent = t().modalNewFolderDesc;

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.className = 'gcm-modal-input';
    inputName.placeholder = t().modalFolderNamePlaceholder;

    const inputKeywords = document.createElement('input');
    inputKeywords.type = 'text';
    inputKeywords.className = 'gcm-modal-input';
    inputKeywords.placeholder = t().modalKeywordsPlaceholder;

    const colorRow = document.createElement('div');
    colorRow.className = 'gcm-color-picker-row';

    PRESET_COLORS.forEach((col) => {
      const swatch = document.createElement('div');
      swatch.className = 'gcm-color-swatch' + (col === chosenColor ? ' selected' : '');
      swatch.style.backgroundColor = col;
      swatch.addEventListener('click', () => {
        chosenColor = col;
        colorRow.querySelectorAll('.gcm-color-swatch').forEach((s) => s.classList.remove('selected'));
        swatch.classList.add('selected');
      });
      colorRow.appendChild(swatch);
    });

    const actions = document.createElement('div');
    actions.className = 'gcm-modal-actions';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'gcm-btn gcm-btn-cancel';
    cancelBtn.textContent = t().cancel;
    cancelBtn.addEventListener('click', () => overlay.remove());

    const saveBtn = document.createElement('button');
    saveBtn.className = 'gcm-btn gcm-btn-stop';
    saveBtn.textContent = t().createFolderConfirm;

    const handleSave = () => {
      const name = inputName.value.trim();
      if (!name) {
        inputName.focus();
        return;
      }
      const keywords = inputKeywords.value
        .split(',')
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean);

      const newFolder = {
        id: 'f_' + Date.now().toString(36),
        name,
        color: chosenColor,
        keywords
      };
      folderState.folders.push(newFolder);
      autoClassifiedVisited.clear();
      saveFolderData(folderState);
      overlay.remove();
      refreshUI();
      if (typeof onCreatedCallback === 'function') {
        onCreatedCallback(newFolder);
      }
    };

    saveBtn.addEventListener('click', handleSave);
    inputName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSave();
      if (e.key === 'Escape') overlay.remove();
    });
    inputKeywords.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSave();
      if (e.key === 'Escape') overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    actions.appendChild(cancelBtn);
    actions.appendChild(saveBtn);

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(inputName);
    card.appendChild(inputKeywords);
    card.appendChild(colorRow);
    card.appendChild(actions);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    setTimeout(() => inputName.focus(), 50);
  }

  function toggleMoveToFolderPopover(anchorBtn) {
    const existing = document.getElementById('gcm-folder-popover');
    if (existing) {
      existing.remove();
      return;
    }

    const rect = anchorBtn.getBoundingClientRect();
    const popover = document.createElement('div');
    popover.id = 'gcm-folder-popover';
    popover.style.top = `${rect.bottom + 8}px`;
    popover.style.left = `${Math.max(12, rect.left - 30)}px`;

    folderState.folders.forEach((f) => {
      const item = document.createElement('button');
      item.className = 'gcm-popover-item';

      const dot = document.createElement('span');
      dot.className = 'gcm-folder-dot';
      dot.style.backgroundColor = f.color;
      dot.style.color = f.color;

      const txt = document.createElement('span');
      txt.textContent = f.name;

      item.appendChild(dot);
      item.appendChild(txt);

      item.addEventListener('click', () => {
        assignSelectedToFolder(f.id);
        popover.remove();
      });
      popover.appendChild(item);
    });

    const divider = document.createElement('div');
    divider.className = 'gcm-popover-divider';
    popover.appendChild(divider);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'gcm-popover-item';
    removeBtn.textContent = t().removeFromFolder;
    removeBtn.addEventListener('click', () => {
      assignSelectedToFolder(null);
      popover.remove();
    });
    popover.appendChild(removeBtn);

    const createNewBtn = document.createElement('button');
    createNewBtn.className = 'gcm-popover-item';
    createNewBtn.style.color = '#a8c7fa';
    createNewBtn.textContent = t().createNewFolderMenu;
    createNewBtn.addEventListener('click', () => {
      popover.remove();
      openCreateFolderModal((newFolder) => {
        assignSelectedToFolder(newFolder.id);
      });
    });
    popover.appendChild(createNewBtn);

    document.body.appendChild(popover);

    const closeOnOutside = (e) => {
      if (!popover.contains(e.target) && e.target !== anchorBtn) {
        popover.remove();
        document.removeEventListener('mousedown', closeOnOutside);
      }
    };
    setTimeout(() => document.addEventListener('mousedown', closeOnOutside), 20);
  }

  function assignSelectedToFolder(folderId) {
    const ids = Array.from(selectedMap.keys());
    if (ids.length === 0) return;

    ids.forEach((convId) => {
      if (folderId) {
        folderState.assignments[convId] = folderId;
      } else {
        delete folderState.assignments[convId];
      }
    });

    saveFolderData(folderState);
    clearAllSelections();
    refreshUI();

    updateStatusToast(
      folderId ? t().toastMovedToFolder(ids.length) : t().toastRemovedFromFolder(ids.length),
      null,
      null,
      2500
    );
  }

  function setupDelegatedSidebarListener() {
    const stopPressOnControls = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.classList.contains('gcm-checkbox') || target.classList.contains('gcm-lock-icon')) {
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        if (e.type === 'mousedown' && target.id !== 'gcm-select-all') {
          e.preventDefault();
        }
      }
    };
    document.addEventListener('pointerdown', stopPressOnControls, true);
    document.addEventListener('mousedown', stopPressOnControls, true);
    document.addEventListener('pointerup', stopPressOnControls, true);
    document.addEventListener('mouseup', stopPressOnControls, true);

    document.addEventListener(
      'click',
      (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;

        if (target.classList.contains('gcm-lock-icon')) {
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
          e.preventDefault();
          const id = target.dataset.convId;
          if (id) {
            delete folderState.protectedIds[id];
            saveFolderData(folderState);
            refreshUI();
          }
          return;
        }

        if (target.classList.contains('gcm-checkbox') && target.id !== 'gcm-select-all') {
          e.preventDefault();
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();

          const checkbox = target;
          const id = checkbox.dataset.convId;
          const row = checkbox.closest('.gcm-chat-row') || checkbox.parentElement;
          if (!id || !row) return;

          const willBeChecked = !selectedMap.has(id);
          const applyCbState = (cb, r, cbId, state) => {
            cb.checked = state;
            cb.classList.toggle('gcm-checked', state);
            if (state) {
              selectedMap.set(cbId, { id: cbId });
              r.classList.add('gcm-selected');
            } else {
              selectedMap.delete(cbId);
              r.classList.remove('gcm-selected');
            }
          };

          const sidebar = getSidebarElement() || document;
          const visibleCheckboxes = Array.from(
            sidebar.querySelectorAll('.gcm-checkbox:not(#gcm-select-all)')
          ).filter((cb) => {
            const r = cb.closest('.gcm-chat-row') || cb.parentElement;
            return r && !r.classList.contains('gcm-hidden-by-filter');
          });

          if (e.shiftKey && lastCheckedCheckbox && lastCheckedCheckbox !== checkbox) {
            const start = visibleCheckboxes.indexOf(lastCheckedCheckbox);
            const end = visibleCheckboxes.indexOf(checkbox);

            if (start !== -1 && end !== -1) {
              const [low, high] = [Math.min(start, end), Math.max(start, end)];
              for (let i = low; i <= high; i++) {
                const cb = visibleCheckboxes[i];
                const cbId = cb.dataset.convId;
                const cbRow = cb.closest('.gcm-chat-row') || cb.parentElement;
                if (cbId && cbRow) {
                  applyCbState(cb, cbRow, cbId, willBeChecked);
                }
              }
            } else {
              applyCbState(checkbox, row, id, willBeChecked);
            }
          } else {
            applyCbState(checkbox, row, id, willBeChecked);
          }

          const syncNativeChecked = () => {
            visibleCheckboxes.forEach((cb) => {
              const cbId = cb.dataset.convId;
              if (cbId) {
                const st = selectedMap.has(cbId);
                cb.checked = st;
                cb.classList.toggle('gcm-checked', st);
              }
            });
          };
          if (typeof queueMicrotask === 'function') queueMicrotask(syncNativeChecked);
          setTimeout(syncNativeChecked, 0);

          lastCheckedCheckbox = checkbox;
          updateToolbarState();
        }
      },
      true
    );
  }

  function injectCheckboxes(items) {
    for (let i = 0; i < items.length; i++) {
      const { id, row } = items[i];
      if (!row.classList.contains('gcm-chat-row')) {
        row.classList.add('gcm-chat-row');
      }
      const isSelected = selectedMap.has(id);

      let existingCb = row.querySelector('.gcm-checkbox');
      if (existingCb) {
        if (existingCb.dataset.convId !== id) existingCb.dataset.convId = id;
        if (existingCb.checked !== isSelected) existingCb.checked = isSelected;
        existingCb.classList.toggle('gcm-checked', isSelected);
        row.classList.toggle('gcm-selected', isSelected);
        continue;
      }

      // Si la fila no tiene checkbox (fila nueva, o el framework la re-renderizó y lo borró), crearlo.
      // No usar un registro de "filas ya inyectadas": si el checkbox desaparece, nunca volvería a aparecer.
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'gcm-checkbox' + (isSelected ? ' gcm-checked' : '');
      checkbox.title = t().checkboxTitle;
      checkbox.dataset.convId = id;
      checkbox.checked = isSelected;

      row.classList.toggle('gcm-selected', isSelected);
      row.prepend(checkbox);
    }
  }

  function toggleSelectAll(checked) {
    const selectAllCb = document.getElementById('gcm-select-all');
    if (selectAllCb) {
      selectAllCb.checked = checked;
      selectAllCb.classList.toggle('gcm-checked', checked);
    }
    const sidebar = getSidebarElement() || document;
    const checkboxes = Array.from(sidebar.querySelectorAll('.gcm-checkbox:not(#gcm-select-all)')).filter((cb) => {
      const r = cb.closest('.gcm-chat-row') || cb.parentElement;
      return r && !r.classList.contains('gcm-hidden-by-filter');
    });
    checkboxes.forEach((cb) => {
      cb.checked = checked;
      cb.classList.toggle('gcm-checked', checked);
      const id = cb.dataset.convId;
      const row = cb.closest('.gcm-chat-row') || cb.parentElement;
      if (id && row) {
        if (checked) {
          selectedMap.set(id, { id });
          row.classList.add('gcm-selected');
        } else {
          selectedMap.delete(id);
          row.classList.remove('gcm-selected');
        }
      }
    });
    updateToolbarState();
  }

  function findRowById(targetId) {
    const rows = getConversationRows();
    return rows.find((item) => item.id === targetId) || null;
  }

  function isPinOrArchiveButton(btn) {
    if (!btn) return true;
    const label = (
      (btn.getAttribute?.('aria-label') || '') +
      ' ' +
      (btn.getAttribute?.('title') || '') +
      ' ' +
      (btn.getAttribute?.('data-testid') || '')
    ).toLowerCase();
    return (
      label.includes('fijar') ||
      label.includes('desfijar') ||
      label.includes('pin') ||
      label.includes('unpin') ||
      label.includes('archiv')
    );
  }

  function findOptionsTrigger(row, link) {
    const targets = [row, link, row.parentElement].filter(Boolean);
    for (const tEl of targets) {
      tEl.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      tEl.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
      tEl.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      tEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    }

    // Seguridad: nunca buscar el botón de opciones en un contenedor que tenga OTRAS conversaciones,
    // o se abriría el menú (y se borraría) la conversación equivocada.
    const countConvLinks = (el) => el.querySelectorAll('a[href*="/app/"], a[href*="/c/"]').length;
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
        const valid = candidates.find((b) => !isPinOrArchiveButton(b));
        if (valid) return valid;
      }
    }

    return null;
  }

  let cachedChatGptToken = null;

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
      if (parentList.querySelectorAll('a[href*="/app/"], a[href*="/c/"]').length === 0) {
        const sectionWrapper = parentList.closest('.relative, div[class*="mt-"]');
        if (sectionWrapper && sectionWrapper.querySelectorAll('a[href*="/app/"], a[href*="/c/"]').length === 0) {
          sectionWrapper.remove();
        }
      }
    }
  }

  function cleanupEmptySidebarItems() {
    const sidebar = getSidebarElement() || document;
    const lis = sidebar.querySelectorAll('li');
    lis.forEach((li) => {
      if (!li.querySelector('a[href*="/app/"], a[href*="/c/"]') && !li.textContent?.trim()) {
        li.remove();
      }
    });
    const lists = sidebar.querySelectorAll('ol, ul');
    lists.forEach((list) => {
      if (list.querySelectorAll('a[href*="/app/"], a[href*="/c/"]').length === 0) {
        const sectionWrapper = list.closest('.relative, div[class*="mt-"]');
        if (sectionWrapper && sectionWrapper.querySelectorAll('a[href*="/app/"], a[href*="/c/"]').length === 0) {
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

  async function deleteChatGptViaApi(targetId, row) {
    if (PLATFORM_KEY !== 'chatgpt' || typeof fetch !== 'function') return false;
    try {
      if (!cachedChatGptToken) {
        const sessRes = await fetch('/api/auth/session', { credentials: 'include' });
        if (sessRes.ok) {
          const sessData = await sessRes.json();
          cachedChatGptToken = sessData?.accessToken || null;
        }
      }
      if (!cachedChatGptToken) return false;

      const res = await fetch(`/backend-api/conversation/${targetId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cachedChatGptToken}`
        },
        body: JSON.stringify({ is_visible: false })
      });

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
    row.scrollIntoView({ block: 'center' });
    await sleep(180);

    try {
      const trigger = await pollUntil(() => findOptionsTrigger(row, link), 1200, 80);
      if (!trigger) {
        throw new Error('Options menu button not found.');
      }

      realClick(trigger);

      const menu = await pollUntil(
        () => Array.from(document.querySelectorAll(SELECTORS.menuPanel)).find(isActiveOverlay),
        2200
      );
      if (!menu) {
        throw new Error('Menu did not open.');
      }

      await sleep(180);

      const menuItems = Array.from(menu.querySelectorAll(SELECTORS.deleteMenuItem));
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

      if (!deleteBtn) {
        throw new Error('Delete option not found.');
      }

      realClick(deleteBtn);

      const dialog = await pollUntil(
        () => Array.from(document.querySelectorAll(SELECTORS.confirmDialog)).find(isActiveOverlay),
        2200
      );
      if (!dialog) {
        throw new Error('Confirm dialog did not appear.');
      }

      await sleep(200);

      let confirmBtn = dialog.querySelector(SELECTORS.confirmButton);
      if (!confirmBtn) {
        const dialogBtns = Array.from(dialog.querySelectorAll('button'));
        confirmBtn =
          dialogBtns.find((b) => {
            const txt = (b.textContent || '').trim().toLowerCase();
            return txt === 'eliminar' || txt === 'delete' || txt === 'borrar';
          }) || dialogBtns[dialogBtns.length - 1];
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
        const apiOk = await deleteChatGptViaApi(targetId, row);
        if (apiOk) {
          removeDeletedRowFromDOM(row, targetId);
          cleanupEmptySidebarItems();
          return true;
        }
      }
      throw domErr;
    }
  }

  function showConfirmModal(count, skippedProtectedCount = 0) {
    return new Promise((resolve) => {
      const existing = document.getElementById('gcm-modal-overlay');
      if (existing) existing.remove();

      const overlay = document.createElement('div');
      overlay.id = 'gcm-modal-overlay';

      const card = document.createElement('div');
      card.className = 'gcm-modal-card';

      const title = document.createElement('div');
      title.className = 'gcm-modal-title';
      title.textContent = t().confirmDeleteTitle(count);

      const desc = document.createElement('div');
      desc.className = 'gcm-modal-desc';
      desc.textContent = t().confirmDeleteDesc(count, skippedProtectedCount);

      const actions = document.createElement('div');
      actions.className = 'gcm-modal-actions';

      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'gcm-btn gcm-btn-cancel';
      cancelBtn.textContent = t().cancel;

      const confirmBtn = document.createElement('button');
      confirmBtn.className = 'gcm-btn gcm-btn-danger';
      confirmBtn.textContent = t().confirmDeleteBtn(count);

      const close = (result) => {
        overlay.remove();
        resolve(result);
      };

      cancelBtn.addEventListener('click', () => close(false));
      confirmBtn.addEventListener('click', () => close(true));
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close(false);
      });

      actions.appendChild(cancelBtn);
      actions.appendChild(confirmBtn);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(actions);
      overlay.appendChild(card);
      document.body.appendChild(overlay);
    });
  }

  let toastTimer = null;

  function updateStatusToast(text, current = null, total = null, autoHideMs = 0) {
    let toast = document.getElementById('gcm-status-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'gcm-status-toast';

      const label = document.createElement('div');
      label.id = 'gcm-status-label';

      const track = document.createElement('div');
      track.className = 'gcm-progress-track';
      track.id = 'gcm-status-track';

      const fill = document.createElement('div');
      fill.className = 'gcm-progress-fill';
      fill.id = 'gcm-status-fill';

      track.appendChild(fill);
      toast.appendChild(label);
      toast.appendChild(track);
      document.body.appendChild(toast);
    }

    const labelEl = document.getElementById('gcm-status-label');
    const trackEl = document.getElementById('gcm-status-track');
    const fillEl = document.getElementById('gcm-status-fill');

    if (labelEl) labelEl.textContent = text;

    if (current !== null && total !== null && total > 0) {
      if (trackEl) trackEl.style.display = 'block';
      const pct = Math.min(100, Math.round((current / total) * 100));
      if (fillEl) fillEl.style.width = `${pct}%`;
    } else if (trackEl) {
      trackEl.style.display = 'none';
    }

    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = null;
    }

    if (autoHideMs > 0) {
      toastTimer = setTimeout(() => {
        toast?.remove();
        toastTimer = null;
      }, autoHideMs);
    }
  }

  async function deleteSelectedChats() {
    const allSelectedIds = Array.from(selectedMap.keys());
    if (allSelectedIds.length === 0 || deletionInProgress) return;

    const queueIds = allSelectedIds.filter((id) => !folderState.protectedIds[id]);
    const skippedProtected = allSelectedIds.length - queueIds.length;

    if (queueIds.length === 0) {
      updateStatusToast(t().toastAllProtected, null, null, 3500);
      return;
    }

    const confirmed = await showConfirmModal(queueIds.length, skippedProtected);
    if (!confirmed) return;

    deletionInProgress = true;
    deletionStopRequested = false;
    document.body.classList.add('gcm-stealth-delete');
    updateToolbarState();

    const total = queueIds.length;
    let deletedCount = 0;
    let errorCount = 0;

    try {
      for (let i = 0; i < queueIds.length; i++) {
        if (deletionStopRequested) break;

        const id = queueIds[i];
        updateStatusToast(t().toastDeletingProgress(i + 1, total), i, total);

        try {
          const ok = await deleteSingleConversation(id);
          if (ok) {
            deletedCount++;
            selectedMap.delete(id);
            if (folderState.assignments[id]) {
              delete folderState.assignments[id];
              saveFolderData(folderState);
            }
          } else {
            // La conversación no está cargada en la barra lateral: contarla como error, no ignorarla.
            errorCount++;
          }
        } catch (err) {
          console.warn(`[${P.name} Manager] Error deleting conversation:`, err);
          errorCount++;
          document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
          await sleep(400);
        }
      }
    } finally {
      document.body.classList.remove('gcm-stealth-delete');
      deletionInProgress = false;
      deletionStopRequested = false;
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

  function stopDeletion() {
    // Solo se solicita la parada: deletionInProgress sigue true hasta terminar la conversación actual,
    // así no se puede lanzar un segundo borrado en paralelo.
    deletionStopRequested = true;
    updateStatusToast(t().toastStopping, null, null, 2500);
  }

  function createToolbar() {
    if (document.getElementById('gcm-toolbar')) return;

    const toolbar = document.createElement('div');
    toolbar.id = 'gcm-toolbar';

    const selectAllWrap = document.createElement('label');
    selectAllWrap.className = 'gcm-select-all-wrap';
    selectAllWrap.title = t().selectAllTitle;

    const selectAllCb = document.createElement('input');
    selectAllCb.type = 'checkbox';
    selectAllCb.id = 'gcm-select-all';
    selectAllCb.className = 'gcm-checkbox';
    selectAllCb.style.margin = '0';
    selectAllCb.addEventListener('change', (e) => toggleSelectAll(e.target.checked));

    const selectAllText = document.createElement('span');
    selectAllText.textContent = t().selectAll;

    selectAllWrap.appendChild(selectAllCb);
    selectAllWrap.appendChild(selectAllText);

    const folderBtn = document.createElement('button');
    folderBtn.id = 'gcm-folder-btn';
    folderBtn.className = 'gcm-btn gcm-btn-folder';
    folderBtn.disabled = true;
    folderBtn.textContent = t().folderBtn(0);
    folderBtn.title = t().folderBtnTitle;
    folderBtn.addEventListener('click', () => toggleMoveToFolderPopover(folderBtn));

    const protectBtn = document.createElement('button');
    protectBtn.id = 'gcm-protect-btn';
    protectBtn.className = 'gcm-btn gcm-btn-neutral';
    protectBtn.disabled = true;
    protectBtn.textContent = t().protectBtn;
    protectBtn.title = t().protectBtnTitle;
    protectBtn.addEventListener('click', toggleProtectSelected);

    const exportBtn = document.createElement('button');
    exportBtn.id = 'gcm-export-btn';
    exportBtn.className = 'gcm-btn gcm-btn-neutral';
    exportBtn.textContent = t().exportBtn;
    exportBtn.title = t().exportBtnTitle;
    exportBtn.addEventListener('click', exportSelectedConversationsToMarkdown);

    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'gcm-delete-btn';
    deleteBtn.className = 'gcm-btn gcm-btn-danger';
    deleteBtn.disabled = true;
    deleteBtn.textContent = t().deleteBtn(0);
    deleteBtn.addEventListener('click', deleteSelectedChats);

    const stopBtn = document.createElement('button');
    stopBtn.id = 'gcm-stop-btn';
    stopBtn.className = 'gcm-btn gcm-btn-stop';
    stopBtn.style.display = 'none';
    stopBtn.textContent = t().stopBtn;
    stopBtn.addEventListener('click', stopDeletion);

    const collapseBtn = document.createElement('button');
    collapseBtn.id = 'gcm-toolbar-toggle';
    collapseBtn.className = 'gcm-toolbar-toggle';
    collapseBtn.addEventListener('click', () => {
      toolbarCollapsed = !toolbarCollapsed;
      saveView();
      applyToolbarCollapsed();
    });

    toolbar.appendChild(collapseBtn);
    toolbar.appendChild(selectAllWrap);
    toolbar.appendChild(folderBtn);
    toolbar.appendChild(protectBtn);
    toolbar.appendChild(exportBtn);
    toolbar.appendChild(deleteBtn);
    toolbar.appendChild(stopBtn);

    document.body.appendChild(toolbar);
    applyToolbarCollapsed();
  }

  // Contrae la barra superior a un solo botón (la selección y los datos se conservan).
  function applyToolbarCollapsed() {
    const toolbar = document.getElementById('gcm-toolbar');
    const btn = document.getElementById('gcm-toolbar-toggle');
    if (!toolbar || !btn) return;
    toolbar.classList.toggle('gcm-collapsed', toolbarCollapsed);
    btn.textContent = toolbarCollapsed ? '☰' : '›';
    btn.title = toolbarCollapsed ? t().toolbarExpandTitle : t().toolbarCollapseTitle;
  }

  function updateToolbarState() {
    const folderBtn = document.getElementById('gcm-folder-btn');
    const protectBtn = document.getElementById('gcm-protect-btn');
    const exportBtn = document.getElementById('gcm-export-btn');
    const deleteBtn = document.getElementById('gcm-delete-btn');
    const stopBtn = document.getElementById('gcm-stop-btn');
    const selectAllCb = document.getElementById('gcm-select-all');

    if (!deleteBtn || !stopBtn || !folderBtn) return;

    if (deletionInProgress) {
      folderBtn.style.display = 'none';
      if (protectBtn) protectBtn.style.display = 'none';
      if (exportBtn) exportBtn.style.display = 'none';
      deleteBtn.style.display = 'none';
      stopBtn.style.display = 'inline-flex';
      if (selectAllCb) selectAllCb.disabled = true;
    } else {
      folderBtn.style.display = 'inline-flex';
      if (protectBtn) protectBtn.style.display = 'inline-flex';
      if (exportBtn) exportBtn.style.display = 'inline-flex';
      deleteBtn.style.display = 'inline-flex';
      stopBtn.style.display = 'none';
      if (selectAllCb) selectAllCb.disabled = false;

      // El checkbox "Todo" debe reflejar la realidad: si llegó un lote nuevo de chats (carga progresiva)
      // o cambió el filtro, ya no están todos seleccionados.
      if (selectAllCb) {
        const rowCbs = document.querySelectorAll('.gcm-chat-row .gcm-checkbox:not(#gcm-select-all)');
        let visibleTotal = 0;
        let visibleChecked = 0;
        rowCbs.forEach((cb) => {
          const r = cb.closest('.gcm-chat-row') || cb.parentElement;
          if (!r || r.classList.contains('gcm-hidden-by-filter')) return;
          visibleTotal++;
          if (selectedMap.has(cb.dataset.convId)) visibleChecked++;
        });
        const allChecked = visibleTotal > 0 && visibleChecked === visibleTotal;
        if (selectAllCb.checked !== allChecked) selectAllCb.checked = allChecked;
        selectAllCb.classList.toggle('gcm-checked', allChecked);
        selectAllCb.indeterminate = visibleChecked > 0 && !allChecked;
      }

      const count = selectedMap.size;
      folderBtn.disabled = count === 0;
      const fText = t().folderBtn(count);
      if (folderBtn.textContent !== fText) folderBtn.textContent = fText;

      if (protectBtn) {
        protectBtn.disabled = count === 0;
      }

      deleteBtn.disabled = count === 0;
      const dText = t().deleteBtn(count);
      if (deleteBtn.textContent !== dText) deleteBtn.textContent = dText;
    }
  }

  let isRefreshing = false;
  // Debounce para el MutationObserver (evita rafagas de refreshUI en ChatGPT)
  let refreshDebounceTimer = null;

  function scheduleRefresh(delay = 120) {
    if (refreshDebounceTimer) return;
    refreshDebounceTimer = setTimeout(() => {
      refreshDebounceTimer = null;
      if (!document.hidden) {
        requestAnimationFrame(refreshUI);
      }
    }, delay);
  }

  function refreshUI() {
    if (isRefreshing || document.hidden) return;
    isRefreshing = true;
    try {
      createToolbar();
      const items = getConversationRows();
      runAutoClassification(items);
      injectCheckboxes(items);
      applyFolderBadgesAndFilter(items);
      injectSidebarFoldersPanel(items);
      updateToolbarState();
    } finally {
      isRefreshing = false;
    }
  }

  function init() {
    if (!document.body) {
      setTimeout(init, 300);
      return;
    }
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

  init();
})();
