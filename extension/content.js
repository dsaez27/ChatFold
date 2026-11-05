/* Generado con esbuild desde src/. No editar a mano: ejecutar "npm run build". */
(() => {
  // src/icons.js
  var SVG_NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs = {}, children = []) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) {
      node.setAttribute(k, String(v));
    }
    for (const child of children) {
      node.appendChild(child);
    }
    return node;
  }
  function strokeSvg(size, strokeWidth, children, strokeColor = "currentColor") {
    return el(
      "svg",
      {
        class: "gcm-svg-icon",
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        fill: "none",
        stroke: strokeColor,
        "stroke-width": strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      children
    );
  }
  var ICONS = {
    chatfoldLogo: () => el(
      "svg",
      {
        class: "gcm-svg-logo",
        viewBox: "0 0 1024 1024",
        width: 18,
        height: 18,
        fill: "none"
      },
      [
        el("defs", {}, [
          el("linearGradient", { id: "gcmLogoGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%" }, [
            el("stop", { offset: "0%", "stop-color": "#5B6EF7" }),
            el("stop", { offset: "50%", "stop-color": "#3B82F6" }),
            el("stop", { offset: "100%", "stop-color": "#1DA1F2" })
          ])
        ]),
        el("path", {
          d: "M280 120 L590 120 L844 374 L844 630 A170 170 0 0 1 674 800 L455 800 L295 940 L295 800 L280 800 A170 170 0 0 1 110 630 L110 290 A170 170 0 0 1 280 120 Z",
          fill: "url(#gcmLogoGrad)"
        }),
        el("path", {
          d: "M590 120 L844 374 L690 374 A100 100 0 0 1 590 274 Z",
          fill: "#132238"
        }),
        el("rect", { x: 275, y: 405, width: 315, height: 62, rx: 31, fill: "#FFFFFF" }),
        el("rect", { x: 275, y: 535, width: 415, height: 62, rx: 31, fill: "#CBE7FB" })
      ]
    ),
    folderPlus: () => strokeSvg(14, 2, [
      el("path", { d: "M12 10v6" }),
      el("path", { d: "M9 13h6" }),
      el("path", {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      })
    ]),
    folder: () => strokeSvg(14, 2, [
      el("path", {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      })
    ]),
    folderMinus: () => strokeSvg(14, 2, [
      el("path", { d: "M9 13h6" }),
      el("path", {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      })
    ]),
    search: () => strokeSvg(13.5, 2.2, [
      el("circle", { cx: 11, cy: 11, r: 8 }),
      el("path", { d: "m21 21-4.3-4.3" })
    ]),
    sort: () => strokeSvg(13.5, 2, [
      el("path", { d: "m3 16 4 4 4-4" }),
      el("path", { d: "M7 20V4" }),
      el("path", { d: "m21 8-4-4-4 4" }),
      el("path", { d: "M17 4v16" })
    ]),
    lock: () => strokeSvg(13.5, 2.1, [
      el("rect", { width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
      el("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ]),
    lockSmall: () => strokeSvg(
      11,
      2.4,
      [
        el("rect", { width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
        el("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
      ],
      "#fbbc04"
    ),
    download: () => strokeSvg(13.5, 2, [
      el("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
      el("polyline", { points: "7 10 12 15 17 10" }),
      el("line", { x1: 12, x2: 12, y1: 15, y2: 3 })
    ]),
    upload: () => strokeSvg(13.5, 2, [
      el("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
      el("polyline", { points: "17 8 12 3 7 8" }),
      el("line", { x1: 12, x2: 12, y1: 3, y2: 15 })
    ]),
    fileText: () => strokeSvg(13.5, 2, [
      el("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
      el("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }),
      el("path", { d: "M10 9H8" }),
      el("path", { d: "M16 13H8" }),
      el("path", { d: "M16 17H8" })
    ]),
    trash: () => strokeSvg(13.5, 2, [
      el("path", { d: "M3 6h18" }),
      el("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
      el("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
      el("line", { x1: 10, x2: 10, y1: 11, y2: 17 }),
      el("line", { x1: 14, x2: 14, y1: 11, y2: 17 })
    ]),
    stop: () => strokeSvg(13.5, 2.2, [
      el("rect", { width: 14, height: 14, x: 5, y: 5, rx: 2 })
    ]),
    zap: () => strokeSvg(13.5, 2, [
      el("path", {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
      })
    ]),
    chevronsDown: () => strokeSvg(13.5, 2, [
      el("path", { d: "m7 6 5 5 5-5" }),
      el("path", { d: "m7 13 5 5 5-5" })
    ]),
    chevronRight: () => strokeSvg(15, 2.3, [
      el("path", { d: "m9 18 6-6-6-6" })
    ]),
    menu: () => strokeSvg(15, 2.2, [
      el("line", { x1: 4, x2: 20, y1: 12, y2: 12 }),
      el("line", { x1: 4, x2: 20, y1: 6, y2: 6 }),
      el("line", { x1: 4, x2: 20, y1: 18, y2: 18 })
    ]),
    minus: () => strokeSvg(13, 2.4, [
      el("path", { d: "M5 12h14" })
    ]),
    close: () => strokeSvg(12, 2.4, [
      el("path", { d: "M18 6 6 18" }),
      el("path", { d: "m6 6 12 12" })
    ]),
    plus: () => strokeSvg(13.5, 2.3, [
      el("path", { d: "M5 12h14" }),
      el("path", { d: "M12 5v14" })
    ]),
    layoutVertical: () => strokeSvg(13.5, 2.1, [
      el("rect", { width: 10, height: 18, x: 7, y: 3, rx: 2 }),
      el("path", { d: "M10 7h4" }),
      el("path", { d: "M10 12h4" }),
      el("path", { d: "M10 17h4" })
    ]),
    layoutHorizontal: () => strokeSvg(13.5, 2.1, [
      el("rect", { width: 18, height: 10, x: 3, y: 7, rx: 2 }),
      el("path", { d: "M7 10v4" }),
      el("path", { d: "M12 10v4" }),
      el("path", { d: "M17 10v4" })
    ])
  };
  function createIconElement(iconBuilder) {
    if (typeof iconBuilder === "function") {
      return iconBuilder();
    }
    return el("svg", { class: "gcm-svg-icon", width: 12, height: 12 });
  }
  function setButtonIconText(container, iconBuilder, text) {
    if (!container) return;
    container.textContent = "";
    if (iconBuilder) {
      container.appendChild(createIconElement(iconBuilder));
    }
    if (text) {
      const span = document.createElement("span");
      span.textContent = text;
      container.appendChild(span);
    }
  }

  // src/platform.js
  var APP_VERSION = typeof chrome !== "undefined" && chrome.runtime?.getManifest?.().version || "0.0.0";
  function detectPlatform() {
    const host = location.hostname;
    if (host.endsWith("chatgpt.com") || host.endsWith("chat.openai.com")) {
      return "chatgpt";
    }
    if (host.endsWith("gemini.google.com")) {
      return "gemini";
    }
    if (host.endsWith("claude.ai")) {
      return "claude";
    }
    if (host.endsWith("deepseek.com")) {
      return "deepseek";
    }
    if (host.endsWith("opencode.ai")) {
      return "opencode";
    }
    return null;
  }
  var PLATFORM_KEY = detectPlatform();
  var CONV_LINK_SELECTOR = 'a[href*="/app/"], a[href*="/c/"], a[href*="/codex/tasks/"], a[href*="/codex/"], a[href*="/tasks/"], a[href*="/chat/"], a[href*="/session/"], [data-gcm-task="1"]';
  var PLATFORMS = {
    gemini: {
      name: "Gemini",
      storageKey: "gcm_folders_data_v2",
      legacyStorageKey: "gcm_folders_data_v1",
      convHrefRegex: /^\/(?:u\/[^/]+\/)?app\/([0-9a-zA-Z_-]{5,})/,
      buildUrl: (id) => `https://gemini.google.com/app/${id}`,
      selectors: {
        sidebar: "conversations-list, .chat-history, div.conversations-container, mat-sidenav, side-navigation-v2, nav",
        conversationLinks: '[data-test-id="conversation"] a[href*="/app/"], a[href*="/app/"], div[data-test-id="conversation"]',
        rowClosest: ['[data-test-id="conversation"]', "gem-nav-list-item", "li"],
        optionsTrigger: 'button:has(mat-icon[fonticon="more_vert"]), button[data-test-id="actions-menu-button"], button[aria-haspopup="menu"], button[aria-label*="options"], button[aria-label*="opciones"], button[aria-label*="Opciones"]',
        menuPanel: '[role="menu"], .mat-mdc-menu-panel',
        deleteMenuItem: 'button[data-test-id="delete-button"], [role="menuitem"]:has(mat-icon[fonticon="delete"]), [role="menuitem"]:has(mat-icon[data-mat-icon-name="delete"]), [role="menuitem"]',
        confirmDialog: '[role="dialog"], mat-dialog-container, .mat-mdc-dialog-surface',
        confirmButton: 'gem-button[cdkfocusinitial] button, [cdkfocusinitial] button, button[cdkfocusinitial], button[data-test-id="confirm-button"]',
        activeMessages: "user-query, model-response, .query-text, .model-response-text, message-content",
        promptInput: 'rich-textarea div[contenteditable="true"], div.ql-editor[contenteditable="true"], div[contenteditable="true"], textarea'
      }
    },
    chatgpt: {
      name: "ChatGPT",
      storageKey: "gcm_chatgpt_folders_data_v1",
      legacyStorageKey: null,
      convHrefRegex: /\/(?:c|codex\/tasks|codex\/cloud|codex|tasks)\/([0-9a-zA-Z_-]{5,})/,
      buildUrl: (id) => id.startsWith("task_") ? `https://chatgpt.com/codex/tasks/${id}` : `https://chatgpt.com/c/${id}`,
      selectors: {
        sidebar: '[data-testid="stage-thread-flyout"], nav[aria-label], nav, aside, .bg-token-sidebar-surface-primary',
        conversationLinks: '[data-sidebar-chatgpt-conversation-key] a[href*="/c/"], [data-testid^="history-item"] a[href*="/c/"], nav a[href*="/c/"], aside a[href*="/c/"], a[href*="/c/"], a[href*="/codex/tasks/"], a[href*="/codex/"], a[href*="/tasks/"], [data-gcm-task="1"]',
        rowClosest: [
          "[data-sidebar-chatgpt-conversation-key]",
          'li[data-testid^="history-item"]',
          'div[data-testid^="history-item"]',
          "li",
          "div.group",
          "a.__menu-item",
          'a[href*="/codex/tasks/"]',
          'a[href*="/codex/"]',
          'a[href*="/tasks/"]'
        ],
        optionsTrigger: 'button[data-testid^="history-item-"][data-testid$="-options"], button[data-testid*="options"], button[aria-haspopup="menu"], button[aria-label*="Options"], button[aria-label*="Opciones"], button[aria-label*="More"], button[aria-label*="Más"]',
        menuPanel: '[role="menu"], [data-radix-menu-content]',
        deleteMenuItem: '[role="menuitem"][data-testid="delete-chat-menu-item"], [role="menuitem"][data-testid*="delete"], [role="menuitem"].text-danger, [role="menuitem"][class*="text-token-text-error"], [role="menuitem"][class*="text-red"], [role="menuitem"]',
        confirmDialog: '[role="dialog"], [data-testid="modal-delete-conversation-confirmation"]',
        confirmButton: 'button[data-testid="delete-conversation-confirm-button"], button.btn-danger, button[class*="btn-danger"], button[class*="bg-red"], button[class*="bg-token-bg-danger"], button[type="submit"]',
        activeMessages: '[data-message-author-role="user"], [data-message-author-role="assistant"]',
        promptInput: '#prompt-textarea, div[contenteditable="true"]#prompt-textarea, textarea[data-id], textarea, div[contenteditable="true"]'
      }
    },
    claude: {
      name: "Claude",
      storageKey: "gcm_claude_folders_data_v1",
      legacyStorageKey: null,
      convHrefRegex: /\/chat\/([0-9a-zA-Z_-]{4,})/,
      buildUrl: (id) => `https://claude.ai/chat/${id}`,
      selectors: {
        sidebar: 'nav[aria-label], nav, aside, [data-testid*="sidebar"]',
        conversationLinks: 'nav a[href*="/chat/"], aside a[href*="/chat/"], a[href*="/chat/"]',
        rowClosest: ["li", '[data-testid*="chat-item"]', "div.group", 'a[href*="/chat/"]'],
        optionsTrigger: 'button[aria-haspopup="menu"], button[data-testid*="menu"], button[data-testid*="options"], button[aria-label*="More"], button[aria-label*="Más"], button[aria-label*="Options"]',
        menuPanel: '[role="menu"], [data-radix-menu-content]',
        deleteMenuItem: '[role="menuitem"][class*="danger"], [role="menuitem"][class*="red"], [role="menuitem"][class*="error"], [role="menuitem"]',
        confirmDialog: '[role="dialog"], [role="alertdialog"]',
        confirmButton: 'button[data-testid*="delete"], button[class*="danger"], button[class*="red"], button[type="submit"]',
        activeMessages: '[data-testid*="user-message"], .font-claude-message, [data-is-streaming], [data-message-author-role]',
        promptInput: 'div.ProseMirror[contenteditable="true"], fieldset div[contenteditable="true"], div[contenteditable="true"], textarea'
      }
    },
    deepseek: {
      name: "DeepSeek",
      storageKey: "gcm_deepseek_folders_data_v1",
      legacyStorageKey: null,
      convHrefRegex: /\/(?:a\/chat\/s|chat)\/([0-9a-zA-Z_-]{4,})/,
      buildUrl: (id) => `https://chat.deepseek.com/a/chat/s/${id}`,
      selectors: {
        sidebar: 'nav, aside, [class*="sidebar"], .ds-scroll-area',
        conversationLinks: 'a[href*="/chat/"], [data-chat-id] a',
        rowClosest: ["li", "[data-chat-id]", 'div[class*="chat-item"]', 'a[href*="/chat/"]'],
        optionsTrigger: 'button[aria-haspopup="menu"], [role="button"][aria-haspopup="menu"], button[aria-label*="More"], button[aria-label*="options"], button[aria-label*="Opciones"]',
        menuPanel: '[role="menu"], .ds-dropdown-menu',
        deleteMenuItem: '[role="menuitem"], .ds-dropdown-menu-item',
        confirmDialog: '[role="dialog"], .ds-modal-content',
        confirmButton: 'button.ds-button--error, button[class*="danger"], button[class*="error"], button[type="submit"]',
        activeMessages: '.ds-markdown, [class*="message-content"], [data-message-author-role]',
        promptInput: 'textarea#chat-input, textarea, div[contenteditable="true"]'
      }
    },
    opencode: {
      name: "OpenCode",
      storageKey: "gcm_opencode_folders_data_v1",
      legacyStorageKey: null,
      convHrefRegex: /\/(?:chat|session|c)\/([0-9a-zA-Z_-]{4,})/,
      buildUrl: (id) => `https://opencode.ai/chat/${id}`,
      selectors: {
        sidebar: 'nav, aside, [data-sidebar], [class*="sidebar"]',
        conversationLinks: 'a[href*="/chat/"], a[href*="/session/"], a[href*="/c/"]',
        rowClosest: ["li", "[data-session-id]", "div.group", 'a[href*="/chat/"]', 'a[href*="/session/"]'],
        optionsTrigger: 'button[aria-haspopup="menu"], button[aria-label*="options"], button[aria-label*="More"]',
        menuPanel: '[role="menu"], [data-radix-menu-content]',
        deleteMenuItem: '[role="menuitem"]',
        confirmDialog: '[role="dialog"], [role="alertdialog"]',
        confirmButton: 'button[class*="danger"], button[class*="red"], button[type="submit"]',
        activeMessages: '[data-message-author-role], .message-content, [class*="message"]',
        promptInput: 'textarea, div[contenteditable="true"]'
      }
    }
  };
  var P = PLATFORMS[PLATFORM_KEY] || PLATFORMS.gemini;
  var SELECTORS = P.selectors;
  var PRESET_COLORS = ["#4285f4", "#34a853", "#fbbc04", "#ea4335", "#a142f4", "#24c1e0", "#ff6d00"];

  // src/i18n.js
  var I18N = {
    es: {
      panelTitle: "ChatFold",
      toggleMinTitle: "Clic para minimizar/expandir",
      toolbarCollapseTitle: "Contraer barra superior (Arrastra para mover)",
      toolbarExpandTitle: "Expandir barra superior (Arrastra para mover)",
      toolbarVerticalTitle: "Cambiar a barra vertical (Arrastra para mover)",
      toolbarHorizontalTitle: "Cambiar a barra horizontal (Arrastra para mover)",
      langBtnTitle: "Switch language (Español / English)",
      newFolderBtn: "Nueva",
      newFolderTitle: "Crear nueva carpeta con palabras clave automáticas",
      searchPlaceholder: "Buscar conversación...",
      sortTitle: "Cambiar orden: Cronológico / A→Z / Z→A",
      sortRecent: "Recientes",
      sortAZ: "A → Z",
      sortZA: "Z → A",
      pillAll: "Todas",
      pillProtected: "Protegidas",
      pillUnassigned: "Sin carpeta",
      autoRulesPrefix: "Auto-reglas",
      delFolderTitle: (name) => `Eliminar carpeta "${name}" (no borra las conversaciones)`,
      loadAllBtn: "Cargar",
      stopLoadBtn: "Detener",
      loadAllTitle: "Bajar automáticamente por la barra lateral para cargar todo tu historial",
      backupBtn: "Respaldar",
      backupTitle: "Guardar tus carpetas y configuración en un archivo JSON",
      importBtn: "Importar",
      importTitle: "Restaurar carpetas desde un archivo JSON",
      selectAll: "Todo",
      selectAllTitle: "Seleccionar o deseleccionar todas las conversaciones visibles",
      folderBtn: (n) => `Carpeta (${n})`,
      folderBtnTitle: "Asignar conversaciones seleccionadas a una carpeta",
      protectBtn: "Proteger",
      protectBtnTitle: "Proteger o desproteger conversaciones seleccionadas contra borrado accidental",
      exportBtn: "Exportar .md",
      exportBtnTitle: "Exportar conversaciones seleccionadas y el chat activo a Markdown (.md)",
      deleteBtn: (n) => `Borrar (${n})`,
      stopBtn: "Detener",
      checkboxTitle: "Seleccionar conversación (Shift + Clic para rango)",
      lockIconTitle: "Protegida contra borrado (Clic para quitar protección)",
      removeFromFolder: "Quitar de carpeta",
      createNewFolderMenu: "Nueva carpeta...",
      modalNewFolderTitle: "Nueva Carpeta Inteligente",
      modalNewFolderDesc: "Elige un nombre, un color y palabras clave opcionales para auto-clasificar tus chats:",
      modalFolderNamePlaceholder: "Nombre de carpeta (Ej. Trabajo, Finanzas, Inglés...)",
      modalKeywordsPlaceholder: "Palabras clave separadas por coma (Ej. excel, factura, banco)",
      cancel: "Cancelar",
      createFolderConfirm: "Crear Carpeta",
      confirmDeleteTitle: (n) => `¿Eliminar ${n} conversación${n > 1 ? "es" : ""}?`,
      confirmDeleteDesc: (n, skipped) => `Se borrarán permanentemente ${n} conversación${n > 1 ? "es" : ""} de tu historial de ${P.name}.` + (skipped > 0 ? `
(🔒 Se omitirán ${skipped} conversación(es) protegida(s) con candado).` : ""),
      confirmDeleteBtn: (n) => `Sí, eliminar (${n})`,
      toastLoadingHistory: '⏬ Cargando historial antiguo... (Clic en "Detener carga" para parar)',
      toastLoadedCount: (n) => `⏬ Conversaciones cargadas: ${n}...`,
      toastLoadComplete: (n) => `✅ Historial completo cargado (${n} conversaciones).`,
      toastBackupSaved: "💾 Respaldo descargado correctamente.",
      toastBackupRestored: "📂 Carpetas y configuración restauradas.",
      toastBackupInvalid: "❌ Archivo JSON inválido.",
      toastMdExported: "📥 Archivo Markdown (.md) descargado.",
      toastUnprotected: (n) => `🔓 Se quitó la protección de ${n} conversación(es).`,
      toastProtected: (n) => `🔒 ${n} conversación(es) protegida(s) contra borrado accidental.`,
      toastMovedToFolder: (n) => `📁 ${n} conversación(es) movida(s) a la carpeta.`,
      toastRemovedFromFolder: (n) => `Se quitó la carpeta de ${n} conversación(es).`,
      toastAllProtected: "🔒 Todas las conversaciones seleccionadas están protegidas con candado.",
      toastDeletingProgress: (curr, total) => `Eliminando conversación ${curr} de ${total}...`,
      toastDeleteFinishedErr: (del, err) => `Finalizado: ${del} eliminadas, ${err} con error.`,
      toastDeleteSuccess: (del) => `¡Listo! Se eliminaron ${del} conversación${del === 1 ? "" : "es"}.`,
      toastStopping: "Deteniendo después de la conversación actual...",
      mdHeader: `Exportación de Conversaciones de ${P.name}`,
      mdDate: "Fecha",
      mdSelectedIndex: (n) => `Índice de Conversaciones Seleccionadas (${n})`,
      mdFolderLabel: "Carpeta",
      mdActiveChatHeader: "Contenido de la Conversación Activa en Pantalla",
      mdUser: "🧑 Usuario",
      promptsBtn: "Prompts",
      promptsBtnTitle: "Abrir tu bóveda de Prompts rápidos reutilizables",
      modalPromptsTitle: "Bóveda de Prompts Rápidos",
      modalPromptsDesc: "Haz clic en un prompt para insertarlo directamente en el chat activo, o crea uno nuevo:",
      promptTitlePlaceholder: "Título corto (Ej. Revisor Senior de Código)",
      promptBodyPlaceholder: "Escribe las instrucciones completas del prompt...",
      addPromptBtn: "Guardar Prompt",
      insertPromptBtn: "Insertar",
      deletePromptTitle: "Eliminar prompt",
      promptsEmpty: "Aún no tienes prompts guardados. Crea uno abajo para reutilizarlo en 1 clic.",
      searchClearTitle: "Limpiar búsqueda",
      toastPromptInserted: "⚡ Prompt insertado en el chat.",
      toastPromptCopied: "📋 Prompt copiado al portapapeles.",
      defaultPrompts: [
        {
          id: "p_code",
          title: "💻 Revisor de Código Senior",
          content: "Actúa como un Ingeniero de Software Senior. Revisa el siguiente código buscando errores potenciales, problemas de rendimiento y vulnerabilidades, y propón una versión optimizada y limpia:\n\n"
        },
        {
          id: "p_summary",
          title: "📝 Resumen Ejecutivo",
          content: "Resume el siguiente texto en 5 puntos clave accionables, destacando las conclusiones más importantes con claridad y concisión:\n\n"
        },
        {
          id: "p_translate",
          title: "🌐 Traductor Técnico Natural",
          content: "Traduce el siguiente texto al inglés/español manteniendo un tono profesional, natural y conservando intacta la terminología técnica:\n\n"
        }
      ],
      defaultFolders: [
        { id: "f_work", name: "Programación", color: "#4285f4", keywords: ["python", "javascript", "código", "code", "script", "sql", "api", "bug", "error", "html", "css", "react"] },
        { id: "f_study", name: "Estudio", color: "#34a853", keywords: ["resumen", "summary", "explica", "explain", "examen", "curso", "historia", "matemática", "aprender"] },
        { id: "f_ideas", name: "Ideas", color: "#fbbc04", keywords: ["idea", "proyecto", "project", "diseño", "design", "plan", "crea"] }
      ]
    },
    en: {
      panelTitle: "ChatFold",
      toggleMinTitle: "Click to minimize/expand",
      toolbarCollapseTitle: "Collapse top bar (Drag to move)",
      toolbarExpandTitle: "Expand top bar (Drag to move)",
      toolbarVerticalTitle: "Switch to vertical bar (Drag to move)",
      toolbarHorizontalTitle: "Switch to horizontal bar (Drag to move)",
      langBtnTitle: "Cambiar idioma (English / Español)",
      newFolderBtn: "New",
      newFolderTitle: "Create a new smart folder with auto-keywords",
      searchPlaceholder: "Search conversation...",
      sortTitle: "Toggle sort order: Recent / A→Z / Z→A",
      sortRecent: "Recent",
      sortAZ: "A → Z",
      sortZA: "Z → A",
      pillAll: "All",
      pillProtected: "Protected",
      pillUnassigned: "Unassigned",
      autoRulesPrefix: "Auto-rules",
      delFolderTitle: (name) => `Delete folder "${name}" (does not delete chats)`,
      loadAllBtn: "Load",
      stopLoadBtn: "Stop",
      loadAllTitle: "Auto-scroll the sidebar to load all your older chat history",
      backupBtn: "Backup",
      backupTitle: "Export your folders and settings to a JSON file",
      importBtn: "Import",
      importTitle: "Restore folders and settings from a JSON file",
      selectAll: "All",
      selectAllTitle: "Select or deselect all visible conversations",
      folderBtn: (n) => `Folder (${n})`,
      folderBtnTitle: "Assign selected conversations to a folder",
      protectBtn: "Protect",
      protectBtnTitle: "Protect or unprotect selected conversations against accidental deletion",
      exportBtn: "Export .md",
      exportBtnTitle: "Export selected conversations and active chat to Markdown (.md)",
      deleteBtn: (n) => `Delete (${n})`,
      stopBtn: "Stop",
      checkboxTitle: "Select conversation (Shift + Click for range)",
      lockIconTitle: "Protected from deletion (Click to unprotect)",
      removeFromFolder: "Remove from folder",
      createNewFolderMenu: "New folder...",
      modalNewFolderTitle: "New Smart Folder",
      modalNewFolderDesc: "Choose a name, color, and optional keywords to auto-classify your chats:",
      modalFolderNamePlaceholder: "Folder name (e.g., Work, Finance, Coding...)",
      modalKeywordsPlaceholder: "Comma-separated keywords (e.g., python, invoice, bug)",
      cancel: "Cancel",
      createFolderConfirm: "Create Folder",
      confirmDeleteTitle: (n) => `Delete ${n} conversation${n > 1 ? "s" : ""}?`,
      confirmDeleteDesc: (n, skipped) => `You are about to permanently delete ${n} conversation${n > 1 ? "s" : ""} from your ${P.name} history.` + (skipped > 0 ? `
(🔒 ${skipped} locked conversation(s) will be safely skipped).` : ""),
      confirmDeleteBtn: (n) => `Yes, delete (${n})`,
      toastLoadingHistory: '⏬ Loading older chat history... (Click "Stop Loading" to stop)',
      toastLoadedCount: (n) => `⏬ Conversations loaded: ${n}...`,
      toastLoadComplete: (n) => `✅ Full history loaded (${n} conversations).`,
      toastBackupSaved: "💾 Backup JSON downloaded successfully.",
      toastBackupRestored: "📂 Folders and settings restored.",
      toastBackupInvalid: "❌ Invalid JSON file.",
      toastMdExported: "📥 Markdown (.md) file downloaded.",
      toastUnprotected: (n) => `🔓 Removed protection from ${n} conversation(s).`,
      toastProtected: (n) => `🔒 ${n} conversation(s) protected from accidental deletion.`,
      toastMovedToFolder: (n) => `📁 ${n} conversation(s) moved to folder.`,
      toastRemovedFromFolder: (n) => `Removed folder from ${n} conversation(s).`,
      toastAllProtected: "🔒 All selected conversations are protected with a lock.",
      toastDeletingProgress: (curr, total) => `Deleting conversation ${curr} of ${total}...`,
      toastDeleteFinishedErr: (del, err) => `Finished: ${del} deleted, ${err} failed.`,
      toastDeleteSuccess: (del) => `Done! Deleted ${del} conversation${del === 1 ? "" : "s"}.`,
      toastStopping: "Stopping after current conversation...",
      mdHeader: `${P.name} Conversations Export`,
      mdDate: "Date",
      mdSelectedIndex: (n) => `Selected Conversations Index (${n})`,
      mdFolderLabel: "Folder",
      mdActiveChatHeader: "Active Conversation Content on Screen",
      mdUser: "🧑 User",
      promptsBtn: "Prompts",
      promptsBtnTitle: "Open your reusable Quick Prompt Vault",
      modalPromptsTitle: "Quick Prompt Vault",
      modalPromptsDesc: "Click any prompt to insert it directly into the active chat, or save a new template:",
      promptTitlePlaceholder: "Short title (e.g., Senior Code Reviewer)",
      promptBodyPlaceholder: "Write the full prompt instructions...",
      addPromptBtn: "Save Prompt",
      insertPromptBtn: "Insert",
      deletePromptTitle: "Delete prompt",
      promptsEmpty: "No saved prompts yet. Create one below to insert it with 1 click.",
      searchClearTitle: "Clear search",
      toastPromptInserted: "⚡ Prompt inserted into chat.",
      toastPromptCopied: "📋 Prompt copied to clipboard.",
      defaultPrompts: [
        {
          id: "p_code",
          title: "💻 Senior Code Reviewer",
          content: "Act as a Senior Software Engineer. Review the following code for potential bugs, performance issues, and security vulnerabilities, and propose a clean, optimized version:\n\n"
        },
        {
          id: "p_summary",
          title: "📝 Executive Summary",
          content: "Summarize the following text into 5 actionable key bullet points, highlighting the most important takeaways clearly and concisely:\n\n"
        },
        {
          id: "p_translate",
          title: "🌐 Technical Translator",
          content: "Translate the following text into natural, professional English/Spanish while keeping technical terminology intact:\n\n"
        }
      ],
      defaultFolders: [
        { id: "f_work", name: "Coding", color: "#4285f4", keywords: ["python", "javascript", "code", "código", "script", "sql", "api", "bug", "error", "html", "css", "react"] },
        { id: "f_study", name: "Study", color: "#34a853", keywords: ["summary", "resumen", "explain", "explica", "exam", "course", "history", "math", "learn"] },
        { id: "f_ideas", name: "Ideas", color: "#fbbc04", keywords: ["idea", "project", "proyecto", "design", "diseño", "plan", "create"] }
      ]
    }
  };
  function detectInitialLang() {
    const navLang = (navigator.language || document.documentElement.lang || "es").toLowerCase();
    return navLang.startsWith("es") ? "es" : "en";
  }

  // src/storage.js
  function normalizeStoredState(parsed, defaultLang) {
    const isPlainObj = (o) => o && typeof o === "object" && !Array.isArray(o);
    const lang = parsed.lang === "en" || parsed.lang === "es" ? parsed.lang : defaultLang;
    const fallbackPrompts = (I18N[lang]?.defaultPrompts || I18N.es.defaultPrompts).map((p) => ({ ...p }));
    return {
      lang,
      folders: Array.isArray(parsed.folders) ? parsed.folders.filter((f) => f && typeof f.id === "string" && typeof f.name === "string").map((f) => ({
        id: f.id,
        name: f.name,
        color: f.color || "#4285f4",
        keywords: Array.isArray(f.keywords) ? f.keywords.filter((k) => typeof k === "string").map((k) => k.toLowerCase()) : []
      })) : [],
      prompts: Array.isArray(parsed.prompts) ? parsed.prompts.filter((p) => p && typeof p.id === "string" && typeof p.title === "string" && typeof p.content === "string").map((p) => ({
        id: p.id,
        title: p.title,
        content: p.content
      })) : fallbackPrompts,
      assignments: isPlainObj(parsed.assignments) ? parsed.assignments : {},
      protectedIds: isPlainObj(parsed.protectedIds) ? parsed.protectedIds : {},
      minimized: !!parsed.minimized,
      pos: parsed.pos && Number.isFinite(parsed.pos.left) && Number.isFinite(parsed.pos.bottom) ? { left: parsed.pos.left, bottom: parsed.pos.bottom } : null,
      toolbarPos: parsed.toolbarPos && Number.isFinite(parsed.toolbarPos.left) && Number.isFinite(parsed.toolbarPos.top) ? { left: parsed.toolbarPos.left, top: parsed.toolbarPos.top } : null,
      // Última vista usada (filtro, orden y disposición de la barra) para retomarla tras recargar la página.
      view: {
        filter: typeof parsed.view?.filter === "string" ? parsed.view.filter : "ALL",
        sort: ["DEFAULT", "AZ", "ZA"].includes(parsed.view?.sort) ? parsed.view.sort : "DEFAULT",
        toolbarCollapsed: !!parsed.view?.toolbarCollapsed,
        toolbarVertical: !!parsed.view?.toolbarVertical
      }
    };
  }
  function loadFolderData() {
    const defaultLang = detectInitialLang();
    try {
      const raw = localStorage.getItem(P.storageKey) || (P.legacyStorageKey ? localStorage.getItem(P.legacyStorageKey) : null);
      if (raw) {
        return normalizeStoredState(JSON.parse(raw), defaultLang);
      }
    } catch (_) {
    }
    const initial = {
      lang: defaultLang,
      folders: I18N[defaultLang].defaultFolders.map((f) => ({ ...f, keywords: [...f.keywords] })),
      prompts: I18N[defaultLang].defaultPrompts.map((p) => ({ ...p })),
      assignments: {},
      protectedIds: {},
      minimized: false,
      pos: null,
      toolbarPos: null,
      view: { filter: "ALL", sort: "DEFAULT", toolbarCollapsed: false, toolbarVertical: false }
    };
    saveFolderData(initial);
    return initial;
  }
  function saveFolderData(data) {
    try {
      localStorage.setItem(P.storageKey, JSON.stringify(data));
    } catch (_) {
    }
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.sync?.set) {
        const { pos: _pos, toolbarPos: _toolbarPos, view: _view, ...syncPayload } = data;
        chrome.storage.sync.set({ [P.storageKey]: syncPayload });
      }
    } catch (_) {
    }
  }
  function initCloudSync(getState, applyIncoming) {
    try {
      if (typeof chrome === "undefined" || !chrome.storage?.sync?.get) return;
      chrome.storage.sync.get([P.storageKey], (res) => {
        try {
          const cloudData = res?.[P.storageKey];
          const current = getState();
          if (cloudData && typeof cloudData === "object") {
            const merged = normalizeStoredState(
              { ...cloudData, pos: current.pos, toolbarPos: current.toolbarPos, view: current.view },
              current.lang
            );
            localStorage.setItem(P.storageKey, JSON.stringify(merged));
            applyIncoming(merged);
          } else {
            const { pos: _pos, toolbarPos: _toolbarPos, view: _view, ...syncPayload } = current;
            chrome.storage.sync.set({ [P.storageKey]: syncPayload });
          }
        } catch (_) {
        }
      });
      if (chrome.storage.onChanged?.addListener) {
        chrome.storage.onChanged.addListener((changes, area) => {
          if (area !== "sync" || !changes[P.storageKey]?.newValue) return;
          try {
            const current = getState();
            const merged = normalizeStoredState(
              { ...changes[P.storageKey].newValue, pos: current.pos, toolbarPos: current.toolbarPos, view: current.view },
              current.lang
            );
            localStorage.setItem(P.storageKey, JSON.stringify(merged));
            applyIncoming(merged);
          } catch (_) {
          }
        });
      }
    } catch (_) {
    }
  }

  // src/state.js
  var BUILTIN_FILTERS = ["ALL", "UNASSIGNED", "PROTECTED"];
  var folderState = loadFolderData();
  var state = {
    /** Datos persistidos (idioma, carpetas, asignaciones, protegidos, posición, vista). */
    folderState,
    // Al abrir o recargar la página, mostrar siempre "Todas" ('ALL') y orden original ('DEFAULT')
    // para que ningún filtro u orden previo oculte o altere la lista de conversaciones al iniciar.
    activeFolderFilter: "ALL",
    searchQuery: "",
    sortMode: "DEFAULT",
    toolbarCollapsed: folderState.view.toolbarCollapsed,
    toolbarVertical: !!folderState.view.toolbarVertical,
    autoScrollActive: false,
    autoScrollRunId: 0,
    deletionInProgress: false,
    deletionStopRequested: false,
    lastCheckedCheckbox: null,
    cachedSidebarEl: null,
    cachedChatGptToken: null,
    panelJustDragged: false,
    toolbarJustDragged: false,
    toastTimer: null,
    isRefreshing: false,
    refreshDebounceTimer: null
  };
  var selectedMap = /* @__PURE__ */ new Map();
  var autoClassifiedVisited = /* @__PURE__ */ new Set();
  var t = () => I18N[state.folderState.lang] || I18N.es;
  function saveView() {
    state.folderState.view = {
      filter: state.activeFolderFilter,
      sort: state.sortMode,
      toolbarCollapsed: state.toolbarCollapsed,
      toolbarVertical: state.toolbarVertical
    };
    saveFolderData(state.folderState);
  }

  // src/sidebar.js
  var rowIdCache = /* @__PURE__ */ new WeakMap();
  var rowTitleCache = /* @__PURE__ */ new WeakMap();
  var TASK_ID_RE = /\b(task_[0-9a-zA-Z_-]{5,})\b/;
  var UUID_RE = /\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b/i;
  var CHATGPT_STATIC_LABELS = /* @__PURE__ */ new Set([
    "chat nuevo",
    "new chat",
    "buscar chats",
    "search chats",
    "imágenes",
    "imagenes",
    "images",
    "aplicaciones",
    "apps",
    "codex",
    "gpt",
    "gpts",
    "explorar gpt",
    "explore gpts",
    "proyectos",
    "projects",
    "nuevo proyecto",
    "new project",
    "tus chats",
    "your chats",
    "biblioteca",
    "library",
    "sora",
    "hoy",
    "today",
    "ayer",
    "yesterday",
    "últimos 7 días",
    "previous 7 days",
    "últimos 30 días",
    "previous 30 days"
  ]);
  function slugifyTitleForTaskId(title) {
    const base = (title || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 36);
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = hash * 31 + title.charCodeAt(i) >>> 0;
    }
    return `task_cloud_${base || "item"}_${hash.toString(36)}`;
  }
  function parseConvId(el2) {
    if (!el2) return null;
    const href = el2.getAttribute?.("href") || el2.querySelector?.(CONV_LINK_SELECTOR)?.getAttribute?.("href") || el2.querySelector?.("a[href]")?.getAttribute?.("href") || "";
    const cached = rowIdCache.get(el2);
    if (cached && cached.href === href && href) return cached.id;
    if (href) {
      let pathPart = href;
      if (href.startsWith("http")) {
        try {
          pathPart = new URL(href, location.origin).pathname;
        } catch (_) {
        }
      }
      const match = P.convHrefRegex.exec(pathPart);
      if (match) {
        rowIdCache.set(el2, { href, id: match[1] });
        return match[1];
      }
      const taskMatch = TASK_ID_RE.exec(href);
      if (taskMatch) {
        rowIdCache.set(el2, { href, id: taskMatch[1] });
        return taskMatch[1];
      }
      const uuidMatch = UUID_RE.exec(href);
      if (uuidMatch) {
        rowIdCache.set(el2, { href, id: uuidMatch[1] });
        return uuidMatch[1];
      }
    }
    const jslog = el2.getAttribute?.("jslog") || "";
    if (jslog) {
      try {
        const id = "conv_" + btoa(encodeURIComponent(jslog)).slice(0, 16);
        rowIdCache.set(el2, { href: jslog, id });
        return id;
      } catch (_) {
      }
    }
    const keyHolder = (el2.hasAttribute?.("data-sidebar-chatgpt-conversation-key") ? el2 : null) || el2.closest?.("[data-sidebar-chatgpt-conversation-key]") || el2.querySelector?.("[data-sidebar-chatgpt-conversation-key]");
    if (keyHolder) {
      const key = keyHolder.getAttribute("data-sidebar-chatgpt-conversation-key");
      if (key) return key;
    }
    const testIdAttr = el2.getAttribute?.("data-testid") || el2.closest?.("[data-testid]")?.getAttribute("data-testid") || "";
    if (testIdAttr) {
      const tm = TASK_ID_RE.exec(testIdAttr) || UUID_RE.exec(testIdAttr);
      if (tm) return tm[1];
    }
    const bridgedId = el2.getAttribute?.("data-gcm-conv-id") || el2.closest?.("[data-gcm-conv-id]")?.getAttribute("data-gcm-conv-id") || el2.querySelector?.("[data-gcm-conv-id]")?.getAttribute("data-gcm-conv-id") || "";
    if (bridgedId) return bridgedId;
    return null;
  }
  function extractConvTitle(row, convId) {
    const cached = rowTitleCache.get(row);
    if (cached && cached.id === convId) return cached.title;
    const linkEl = row.querySelector?.(".conversation-title") || row.querySelector?.('[dir="auto"]') || row.querySelector?.(CONV_LINK_SELECTOR) || row;
    let rawText = "";
    if (linkEl.querySelector?.(".gcm-chat-badge, .gcm-lock-icon, button")) {
      const clone = linkEl.cloneNode(true);
      clone.querySelectorAll(".gcm-chat-badge, .gcm-lock-icon, .gcm-checkbox, button").forEach((n) => n.remove());
      rawText = clone.textContent || "";
    } else {
      rawText = linkEl.textContent || "";
    }
    const title = rawText.replace(/^🔒\s*/, "").trim();
    if (title && convId) rowTitleCache.set(row, { id: convId, title });
    return title;
  }
  function getSidebarElement() {
    if (state.cachedSidebarEl && state.cachedSidebarEl.isConnected && state.cachedSidebarEl.querySelector(SELECTORS.conversationLinks)) {
      return state.cachedSidebarEl;
    }
    const candidates = document.querySelectorAll(SELECTORS.sidebar);
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].querySelector(SELECTORS.conversationLinks)) {
        state.cachedSidebarEl = candidates[i];
        return state.cachedSidebarEl;
      }
    }
    state.cachedSidebarEl = candidates[0] || null;
    return state.cachedSidebarEl;
  }
  function isSingleRowContainer(container) {
    if (!container || container === document.body) return false;
    const tag = container.tagName;
    if (tag === "NAV" || tag === "ASIDE" || tag === "MAIN" || tag === "OL" || tag === "UL" || tag === "SECTION") {
      return false;
    }
    if (container.id === "history" || container.getAttribute?.("data-testid") === "stage-thread-flyout") {
      return false;
    }
    const links = container.querySelectorAll(CONV_LINK_SELECTOR);
    return links.length <= 1;
  }
  function findRowContainer(el2) {
    for (let i = 0; i < SELECTORS.rowClosest.length; i++) {
      const match = el2.closest(SELECTORS.rowClosest[i]);
      if (match && isSingleRowContainer(match)) return match;
    }
    return el2;
  }
  function hasTrailingIconAfterText(el2) {
    const firstSvg = el2.querySelector?.("svg");
    if (!firstSvg) return false;
    const walker = document.createTreeWalker(el2, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (node.nodeValue && node.nodeValue.trim().length >= 2) {
        return Boolean(node.compareDocumentPosition(firstSvg) & 4);
      }
      node = walker.nextNode();
    }
    return false;
  }
  function isLikelyChatGptCloudRow(el2, historyContainers) {
    if (!el2 || el2.nodeType !== 1) return false;
    if (el2.closest("main") || el2.closest('[id^="gcm-"]')) return false;
    if (!isSingleRowContainer(el2)) return false;
    if (el2.querySelector(CONV_LINK_SELECTOR)) return false;
    if (el2.querySelector('.__menu-item, [data-sidebar-item="true"], [data-testid^="history-item"], ol, ul, nav, aside')) {
      return false;
    }
    const href = (el2.getAttribute?.("href") || el2.querySelector?.("a[href]")?.getAttribute?.("href") || "").trim();
    if (href === "/" || href === "/gpts" || href === "/images" || href === "/codex" || href === "/library" || href === "/projects") {
      return false;
    }
    const title = extractConvTitle(el2, "");
    if (!title || title.length < 2 || title.length > 160 || title.includes("\n")) return false;
    if (CHATGPT_STATIC_LABELS.has(title.toLowerCase())) return false;
    const isMenuItem = el2.classList?.contains("__menu-item") || el2.getAttribute?.("data-sidebar-item") === "true" || (el2.getAttribute?.("data-testid") || "").startsWith("history-item");
    const inHistoryList = historyContainers.has(el2.parentElement);
    if ((isMenuItem || inHistoryList) && hasTrailingIconAfterText(el2)) {
      return true;
    }
    return false;
  }
  function getConversationRows() {
    const sidebar = getSidebarElement();
    const root = PLATFORM_KEY === "chatgpt" ? document : sidebar || (PLATFORM_KEY !== "gemini" ? document : null);
    if (!root) return [];
    const candidates = root.querySelectorAll(SELECTORS.conversationLinks);
    const rows = [];
    const seenRows = /* @__PURE__ */ new Set();
    const seenIds = /* @__PURE__ */ new Set();
    const historyContainers = /* @__PURE__ */ new Set();
    for (let i = 0; i < candidates.length; i++) {
      const el2 = candidates[i];
      if (PLATFORM_KEY !== "gemini" && el2.closest("main")) continue;
      if (el2.closest('[id^="gcm-"]')) continue;
      const id = parseConvId(el2);
      if (!id || seenIds.has(id)) continue;
      const row = findRowContainer(el2);
      if (!isSingleRowContainer(row)) continue;
      if (!seenRows.has(row)) {
        seenRows.add(row);
        seenIds.add(id);
        if (row.parentElement) historyContainers.add(row.parentElement);
        rows.push({
          id,
          row,
          link: el2,
          title: extractConvTitle(row, id)
        });
      }
    }
    if (PLATFORM_KEY === "chatgpt") {
      const cloudSelector = 'nav .__menu-item, aside .__menu-item, nav [data-sidebar-item="true"], aside [data-sidebar-item="true"], nav [data-testid^="history-item"], aside [data-testid^="history-item"]';
      const extraCandidates = Array.from(root.querySelectorAll(cloudSelector));
      for (const container of historyContainers) {
        if (container && container.children) {
          for (const child of container.children) {
            extraCandidates.push(child);
          }
        }
      }
      for (let i = 0; i < extraCandidates.length; i++) {
        const el2 = extraCandidates[i];
        const row = findRowContainer(el2);
        if (seenRows.has(row)) continue;
        if (!isLikelyChatGptCloudRow(row, historyContainers)) continue;
        const title = extractConvTitle(row, "");
        let id = parseConvId(row) || slugifyTitleForTaskId(title);
        if (seenIds.has(id)) {
          let suffix = 2;
          while (seenIds.has(`${id}_${suffix}`)) suffix++;
          id = `${id}_${suffix}`;
        }
        row.setAttribute("data-gcm-conv-id", id);
        row.setAttribute("data-gcm-task", "1");
        seenRows.add(row);
        seenIds.add(id);
        rows.push({
          id,
          row,
          link: row,
          title
        });
      }
    }
    return rows;
  }
  function findRowById(targetId) {
    const rows = getConversationRows();
    return rows.find((item) => item.id === targetId) || null;
  }

  // src/folders.js
  function runAutoClassification(items) {
    let changed = false;
    for (let i = 0; i < items.length; i++) {
      const { id, title } = items[i];
      if (autoClassifiedVisited.has(id) || state.folderState.assignments[id]) {
        autoClassifiedVisited.add(id);
        continue;
      }
      const lowerTitle = (title || "").toLowerCase();
      if (!lowerTitle) continue;
      autoClassifiedVisited.add(id);
      for (let j = 0; j < state.folderState.folders.length; j++) {
        const folder = state.folderState.folders[j];
        const kws = folder.keywords;
        if (!kws || kws.length === 0) continue;
        if (kws.some((kw) => kw && lowerTitle.includes(kw))) {
          state.folderState.assignments[id] = folder.id;
          changed = true;
          break;
        }
      }
    }
    if (changed) {
      saveFolderData(state.folderState);
    }
  }
  function applyFolderBadgesAndFilter(items) {
    const folderLookup = new Map(state.folderState.folders.map((f) => [f.id, f]));
    const cleanQuery = state.searchQuery.trim().toLowerCase();
    document.querySelectorAll(".gcm-hidden-by-filter").forEach((el2) => {
      if (state.activeFolderFilter === "ALL" && !cleanQuery || !isSingleRowContainer(el2)) {
        el2.classList.remove("gcm-hidden-by-filter");
      }
    });
    for (let i = 0; i < items.length; i++) {
      const { id, row, title } = items[i];
      const assignedFolderId = state.folderState.assignments[id];
      const folder = assignedFolderId ? folderLookup.get(assignedFolderId) : null;
      const isProtected = !!state.folderState.protectedIds[id];
      row.classList.toggle("gcm-has-lock", isProtected);
      row.classList.toggle("gcm-has-badge", !!folder);
      let lockEl = row.querySelector(".gcm-lock-icon");
      if (isProtected) {
        if (!lockEl) {
          lockEl = document.createElement("span");
          lockEl.className = "gcm-lock-icon";
          lockEl.appendChild(createIconElement(ICONS.lockSmall));
          lockEl.title = t().lockIconTitle;
          lockEl.dataset.convId = id;
          row.appendChild(lockEl);
        }
      } else if (lockEl) {
        lockEl.remove();
      }
      let badge = row.querySelector(".gcm-chat-badge");
      if (folder) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "gcm-chat-badge";
          row.appendChild(badge);
        }
        const badgeSig = `${folder.id}:${folder.name}:${folder.color}`;
        if (badge.dataset.sig !== badgeSig) {
          badge.dataset.sig = badgeSig;
          badge.textContent = "";
          const dot = document.createElement("span");
          dot.className = "gcm-badge-dot";
          dot.style.backgroundColor = folder.color;
          dot.style.boxShadow = `0 0 6px ${folder.color}`;
          const txt = document.createElement("span");
          txt.className = "gcm-badge-text";
          txt.textContent = folder.name;
          badge.appendChild(dot);
          badge.appendChild(txt);
          badge.style.background = `linear-gradient(135deg, ${folder.color}44 0%, var(--gcm-badge-bg) 90%)`;
          badge.style.color = "var(--gcm-text-primary)";
          badge.style.borderColor = `${folder.color}aa`;
        }
      } else if (badge) {
        badge.remove();
      }
      let visible = true;
      if (state.activeFolderFilter === "UNASSIGNED") {
        visible = !folder;
      } else if (state.activeFolderFilter === "PROTECTED") {
        visible = isProtected;
      } else if (state.activeFolderFilter !== "ALL") {
        visible = folder && folder.id === state.activeFolderFilter;
      }
      if (visible && cleanQuery) {
        const matchTitle = (title || "").toLowerCase().includes(cleanQuery);
        const matchFolder = folder && folder.name.toLowerCase().includes(cleanQuery);
        visible = matchTitle || !!matchFolder;
      }
      const isHidden = row.classList.contains("gcm-hidden-by-filter");
      if (visible && isHidden) {
        row.classList.remove("gcm-hidden-by-filter");
        const parentLi = row.closest("li");
        if (parentLi && isSingleRowContainer(parentLi)) {
          parentLi.classList.remove("gcm-hidden-by-filter");
        }
      } else if (!visible && !isHidden) {
        row.classList.add("gcm-hidden-by-filter");
        const parentLi = row.closest("li");
        if (parentLi && isSingleRowContainer(parentLi)) {
          parentLi.classList.add("gcm-hidden-by-filter");
        }
      }
    }
    if (state.sortMode === "DEFAULT") {
      for (let i = 0; i < items.length; i++) {
        const r = items[i].row;
        if (r.style.order) r.style.order = "";
        if (r.parentElement?.classList.contains("gcm-sort-container")) {
          r.parentElement.classList.remove("gcm-sort-container");
        }
      }
    } else {
      const sorted = [...items].sort((a, b) => {
        const cmp = (a.title || "").localeCompare(b.title || "", state.folderState.lang, { sensitivity: "base" });
        return state.sortMode === "AZ" ? cmp : -cmp;
      });
      for (let i = 0; i < sorted.length; i++) {
        const r = sorted[i].row;
        if (r.parentElement && !r.parentElement.classList.contains("gcm-sort-container")) {
          r.parentElement.classList.add("gcm-sort-container");
        }
        const targetOrder = String(i + 1);
        if (r.style.order !== targetOrder) {
          r.style.order = targetOrder;
        }
      }
    }
  }
  function deleteFolderById(folderId) {
    state.folderState.folders = state.folderState.folders.filter((f) => f.id !== folderId);
    for (const convId of Object.keys(state.folderState.assignments)) {
      if (state.folderState.assignments[convId] === folderId) {
        delete state.folderState.assignments[convId];
      }
    }
    if (state.activeFolderFilter === folderId) {
      state.activeFolderFilter = "ALL";
    }
    saveView();
    refreshUI();
  }

  // src/dialogs.js
  function openCreateFolderModal(onCreatedCallback = null) {
    const existing = document.getElementById("gcm-modal-overlay");
    if (existing) existing.remove();
    let chosenColor = PRESET_COLORS[state.folderState.folders.length % PRESET_COLORS.length];
    const overlay = document.createElement("div");
    overlay.id = "gcm-modal-overlay";
    const card = document.createElement("div");
    card.className = "gcm-modal-card";
    const title = document.createElement("div");
    title.className = "gcm-modal-title";
    title.textContent = t().modalNewFolderTitle;
    const desc = document.createElement("div");
    desc.className = "gcm-modal-desc";
    desc.textContent = t().modalNewFolderDesc;
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.className = "gcm-modal-input";
    inputName.placeholder = t().modalFolderNamePlaceholder;
    const inputKeywords = document.createElement("input");
    inputKeywords.type = "text";
    inputKeywords.className = "gcm-modal-input";
    inputKeywords.placeholder = t().modalKeywordsPlaceholder;
    const colorRow = document.createElement("div");
    colorRow.className = "gcm-color-picker-row";
    PRESET_COLORS.forEach((col) => {
      const swatch = document.createElement("div");
      swatch.className = "gcm-color-swatch" + (col === chosenColor ? " selected" : "");
      swatch.style.backgroundColor = col;
      swatch.addEventListener("click", () => {
        chosenColor = col;
        colorRow.querySelectorAll(".gcm-color-swatch").forEach((s) => s.classList.remove("selected"));
        swatch.classList.add("selected");
      });
      colorRow.appendChild(swatch);
    });
    const actions = document.createElement("div");
    actions.className = "gcm-modal-actions";
    const cancelBtn = document.createElement("button");
    cancelBtn.className = "gcm-btn gcm-btn-cancel";
    cancelBtn.textContent = t().cancel;
    cancelBtn.addEventListener("click", () => overlay.remove());
    const saveBtn = document.createElement("button");
    saveBtn.className = "gcm-btn gcm-btn-stop";
    saveBtn.textContent = t().createFolderConfirm;
    const handleSave = () => {
      const name = inputName.value.trim();
      if (!name) {
        inputName.focus();
        return;
      }
      const keywords = inputKeywords.value.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
      const newFolder = {
        id: "f_" + Date.now().toString(36),
        name,
        color: chosenColor,
        keywords
      };
      state.folderState.folders.push(newFolder);
      autoClassifiedVisited.clear();
      saveFolderData(state.folderState);
      overlay.remove();
      refreshUI();
      if (typeof onCreatedCallback === "function") {
        onCreatedCallback(newFolder);
      }
    };
    saveBtn.addEventListener("click", handleSave);
    inputName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSave();
      if (e.key === "Escape") overlay.remove();
    });
    inputKeywords.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSave();
      if (e.key === "Escape") overlay.remove();
    });
    overlay.addEventListener("click", (e) => {
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
  function showConfirmModal(count, skippedProtectedCount = 0) {
    return new Promise((resolve) => {
      const existing = document.getElementById("gcm-modal-overlay");
      if (existing) existing.remove();
      const overlay = document.createElement("div");
      overlay.id = "gcm-modal-overlay";
      const card = document.createElement("div");
      card.className = "gcm-modal-card";
      const title = document.createElement("div");
      title.className = "gcm-modal-title";
      title.textContent = t().confirmDeleteTitle(count);
      const desc = document.createElement("div");
      desc.className = "gcm-modal-desc";
      desc.textContent = t().confirmDeleteDesc(count, skippedProtectedCount);
      const actions = document.createElement("div");
      actions.className = "gcm-modal-actions";
      const cancelBtn = document.createElement("button");
      cancelBtn.className = "gcm-btn gcm-btn-cancel";
      cancelBtn.textContent = t().cancel;
      const confirmBtn = document.createElement("button");
      confirmBtn.className = "gcm-btn gcm-btn-danger";
      confirmBtn.textContent = t().confirmDeleteBtn(count);
      const close = (result) => {
        overlay.remove();
        resolve(result);
      };
      cancelBtn.addEventListener("click", () => close(false));
      confirmBtn.addEventListener("click", () => close(true));
      overlay.addEventListener("click", (e) => {
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
  function updateStatusToast(text, current = null, total = null, autoHideMs = 0) {
    let toast = document.getElementById("gcm-status-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "gcm-status-toast";
      const label = document.createElement("div");
      label.id = "gcm-status-label";
      const track = document.createElement("div");
      track.className = "gcm-progress-track";
      track.id = "gcm-status-track";
      const fill = document.createElement("div");
      fill.className = "gcm-progress-fill";
      fill.id = "gcm-status-fill";
      track.appendChild(fill);
      toast.appendChild(label);
      toast.appendChild(track);
      document.body.appendChild(toast);
    }
    const labelEl = document.getElementById("gcm-status-label");
    const trackEl = document.getElementById("gcm-status-track");
    const fillEl = document.getElementById("gcm-status-fill");
    if (labelEl) labelEl.textContent = text;
    if (current !== null && total !== null && total > 0) {
      if (trackEl) trackEl.style.display = "block";
      const pct = Math.min(100, Math.round(current / total * 100));
      if (fillEl) fillEl.style.width = `${pct}%`;
    } else if (trackEl) {
      trackEl.style.display = "none";
    }
    if (state.toastTimer) {
      clearTimeout(state.toastTimer);
      state.toastTimer = null;
    }
    if (autoHideMs > 0) {
      state.toastTimer = setTimeout(() => {
        toast?.remove();
        state.toastTimer = null;
      }, autoHideMs);
    }
  }

  // src/utils.js
  var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  function realClick(el2) {
    if (!el2 || !el2.isConnected) return false;
    if (typeof el2.focus === "function") {
      el2.focus({ preventScroll: true });
    }
    let clickedDuringPointer = false;
    const onNativeClick = () => {
      clickedDuringPointer = true;
    };
    el2.addEventListener("click", onNativeClick, { once: true, capture: true });
    const EventClass = typeof PointerEvent === "function" ? PointerEvent : MouseEvent;
    for (const type of ["pointermove", "mouseover", "pointerdown", "mousedown", "pointerup", "mouseup"]) {
      el2.dispatchEvent(
        new (type.startsWith("pointer") ? EventClass : MouseEvent)(type, {
          bubbles: true,
          cancelable: true,
          composed: true,
          button: 0,
          buttons: type.endsWith("down") ? 1 : 0,
          pointerId: 1,
          pointerType: "mouse",
          isPrimary: true,
          view: window
        })
      );
    }
    el2.removeEventListener("click", onNativeClick, true);
    if (clickedDuringPointer || el2.getAttribute?.("data-state") === "open" || el2.getAttribute?.("aria-expanded") === "true") {
      return true;
    }
    if (typeof el2.click === "function") {
      el2.click();
    } else {
      el2.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, detail: 1, view: window }));
    }
    return true;
  }
  function isActiveOverlay(el2) {
    if (!el2 || !el2.isConnected || el2.getAttribute("data-state") === "closed") return false;
    const style = getComputedStyle(el2);
    return !el2.hidden && style.display !== "none" && style.visibility !== "hidden" && el2.getClientRects().length > 0;
  }
  async function pollUntil(predicate, timeout = 3e3, interval = 100) {
    const start = Date.now();
    let result = predicate();
    while (!result && Date.now() - start < timeout) {
      await sleep(interval);
      result = predicate();
    }
    return result;
  }

  // src/autoscroll.js
  async function toggleAutoScrollHistory() {
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
    while (state.autoScrollActive && runId === state.autoScrollRunId) {
      const items = getConversationRows();
      if (items.length > 0) {
        let targetRow = items[items.length - 1].row;
        for (let k = items.length - 1; k >= 0; k--) {
          if (!items[k].row.classList.contains("gcm-hidden-by-filter")) {
            targetRow = items[k].row;
            break;
          }
        }
        targetRow.scrollIntoView({ behavior: "smooth", block: "end" });
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
    if (runId !== state.autoScrollRunId) return;
    state.autoScrollActive = false;
    if (!finishedNaturally) {
      updateStatusToast(t().toastLoadedCount(getConversationRows().length), null, null, 2500);
    }
    refreshUI();
  }

  // src/backup.js
  function exportBackupConfig() {
    const { pos: _pos, toolbarPos: _toolbarPos, view: _view, ...backupData } = state.folderState;
    const dataStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${PLATFORM_KEY}-folders-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    updateStatusToast(t().toastBackupSaved, null, null, 2500);
  }
  function sanitizeMap(src, mapValue) {
    const out = {};
    if (!src || typeof src !== "object" || Array.isArray(src)) return out;
    for (const key of Object.keys(src)) {
      if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
      const v = mapValue(src[key]);
      if (v !== void 0) out[key] = v;
    }
    return out;
  }
  function importBackupConfig() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          if (Array.isArray(parsed.folders)) {
            state.folderState = {
              lang: parsed.lang === "en" || parsed.lang === "es" ? parsed.lang : state.folderState.lang,
              folders: parsed.folders.map((f, idx) => ({
                id: typeof f?.id === "string" && f.id ? f.id : `f_imp_${idx}`,
                name: typeof f?.name === "string" && f.name.trim() ? f.name.trim().slice(0, 40) : `Folder ${idx + 1}`,
                color: /^#[0-9a-fA-F]{6}$/.test(f?.color) ? f.color : PRESET_COLORS[idx % PRESET_COLORS.length],
                keywords: Array.isArray(f?.keywords) ? f.keywords.filter((k) => typeof k === "string").map((k) => k.trim().toLowerCase()).filter(Boolean) : []
              })),
              prompts: Array.isArray(parsed.prompts) ? parsed.prompts.filter((p) => p && typeof p.id === "string" && typeof p.title === "string" && typeof p.content === "string").map((p) => ({ id: p.id, title: p.title, content: p.content })) : state.folderState.prompts || [],
              assignments: sanitizeMap(parsed.assignments, (v) => typeof v === "string" ? v : void 0),
              protectedIds: sanitizeMap(parsed.protectedIds, (v) => v ? true : void 0),
              minimized: !!parsed.minimized,
              pos: state.folderState.pos || null,
              // la posición del panel es local a esta pantalla
              toolbarPos: state.folderState.toolbarPos || null,
              view: {
                filter: "ALL",
                sort: state.sortMode,
                toolbarCollapsed: state.toolbarCollapsed,
                toolbarVertical: state.toolbarVertical
              }
            };
            state.activeFolderFilter = "ALL";
            autoClassifiedVisited.clear();
            selectedMap.clear();
            saveFolderData(state.folderState);
            document.getElementById("gcm-toolbar")?.remove();
            document.getElementById("gcm-folders-box")?.remove();
            refreshUI();
            updateStatusToast(t().toastBackupRestored, null, null, 3e3);
          }
        } catch (_) {
          updateStatusToast(t().toastBackupInvalid, null, null, 3e3);
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  // src/prompts.js
  function insertPromptIntoChat(text) {
    const input = document.querySelector(SELECTORS.promptInput);
    if (!input) {
      try {
        navigator.clipboard?.writeText(text);
      } catch (_) {
      }
      updateStatusToast(t().toastPromptCopied, null, null, 2800);
      return false;
    }
    input.focus();
    if (input.tagName === "TEXTAREA" || input.tagName === "INPUT") {
      const existing = input.value ? `${input.value}
` : "";
      const nextValue = existing + text;
      const proto = input.tagName === "TEXTAREA" ? window.HTMLTextAreaElement?.prototype : window.HTMLInputElement?.prototype;
      const nativeSetter = proto ? Object.getOwnPropertyDescriptor(proto, "value")?.set : null;
      if (nativeSetter) {
        nativeSetter.call(input, nextValue);
      } else {
        input.value = nextValue;
      }
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      const currentText = (input.textContent || "").trim();
      const nextText = currentText ? `${currentText}
${text}` : text;
      input.textContent = nextText;
      input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
    }
    updateStatusToast(t().toastPromptInserted, null, null, 2500);
    return true;
  }
  function openPromptsModal() {
    const existing = document.getElementById("gcm-modal-overlay");
    if (existing) existing.remove();
    if (!Array.isArray(state.folderState.prompts)) {
      state.folderState.prompts = t().defaultPrompts.map((p) => ({ ...p }));
    }
    const overlay = document.createElement("div");
    overlay.id = "gcm-modal-overlay";
    const card = document.createElement("div");
    card.className = "gcm-modal-card gcm-prompts-modal-card";
    const title = document.createElement("div");
    title.className = "gcm-modal-title gcm-modal-title-icon";
    setButtonIconText(title, ICONS.zap, t().modalPromptsTitle);
    const desc = document.createElement("div");
    desc.className = "gcm-modal-desc";
    desc.textContent = t().modalPromptsDesc;
    const listContainer = document.createElement("div");
    listContainer.className = "gcm-prompts-list";
    const renderPromptsList = () => {
      listContainer.textContent = "";
      if (state.folderState.prompts.length === 0) {
        const empty = document.createElement("div");
        empty.className = "gcm-prompts-empty";
        empty.textContent = t().promptsEmpty;
        listContainer.appendChild(empty);
        return;
      }
      state.folderState.prompts.forEach((p) => {
        const item = document.createElement("div");
        item.className = "gcm-prompt-item";
        const info = document.createElement("div");
        info.className = "gcm-prompt-info";
        const itemTitle = document.createElement("div");
        itemTitle.className = "gcm-prompt-item-title";
        itemTitle.textContent = p.title;
        const itemPreview = document.createElement("div");
        itemPreview.className = "gcm-prompt-item-preview";
        itemPreview.textContent = p.content.trim().slice(0, 110) + (p.content.length > 110 ? "…" : "");
        info.appendChild(itemTitle);
        info.appendChild(itemPreview);
        const itemActions = document.createElement("div");
        itemActions.className = "gcm-prompt-item-actions";
        const useBtn = document.createElement("button");
        useBtn.className = "gcm-btn gcm-btn-stop gcm-prompt-use-btn";
        useBtn.textContent = t().insertPromptBtn;
        useBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          overlay.remove();
          insertPromptIntoChat(p.content);
        });
        const delBtn = document.createElement("button");
        delBtn.className = "gcm-prompt-del-btn";
        delBtn.appendChild(createIconElement(ICONS.close));
        delBtn.title = t().deletePromptTitle;
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          state.folderState.prompts = state.folderState.prompts.filter((itemPrompt) => itemPrompt.id !== p.id);
          saveFolderData(state.folderState);
          renderPromptsList();
        });
        itemActions.appendChild(useBtn);
        itemActions.appendChild(delBtn);
        item.addEventListener("click", () => {
          overlay.remove();
          insertPromptIntoChat(p.content);
        });
        item.appendChild(info);
        item.appendChild(itemActions);
        listContainer.appendChild(item);
      });
    };
    renderPromptsList();
    const formBox = document.createElement("div");
    formBox.className = "gcm-prompt-form";
    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.className = "gcm-modal-input";
    inputTitle.placeholder = t().promptTitlePlaceholder;
    const inputBody = document.createElement("textarea");
    inputBody.className = "gcm-modal-input gcm-modal-textarea";
    inputBody.placeholder = t().promptBodyPlaceholder;
    inputBody.rows = 3;
    const addPromptBtn = document.createElement("button");
    addPromptBtn.className = "gcm-btn gcm-btn-folder gcm-add-prompt-submit";
    setButtonIconText(addPromptBtn, ICONS.plus, t().addPromptBtn);
    addPromptBtn.addEventListener("click", () => {
      const newTitle = inputTitle.value.trim();
      const newBody = inputBody.value.trim();
      if (!newTitle || !newBody) {
        (!newTitle ? inputTitle : inputBody).focus();
        return;
      }
      state.folderState.prompts.push({
        id: "p_" + Date.now().toString(36),
        title: newTitle,
        content: newBody + "\n\n"
      });
      saveFolderData(state.folderState);
      inputTitle.value = "";
      inputBody.value = "";
      renderPromptsList();
    });
    formBox.appendChild(inputTitle);
    formBox.appendChild(inputBody);
    formBox.appendChild(addPromptBtn);
    const actions = document.createElement("div");
    actions.className = "gcm-modal-actions";
    const closeBtn = document.createElement("button");
    closeBtn.className = "gcm-btn gcm-btn-cancel";
    closeBtn.textContent = t().cancel;
    closeBtn.addEventListener("click", () => overlay.remove());
    actions.appendChild(closeBtn);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });
    const onEsc = (e) => {
      if (e.key === "Escape") {
        overlay.remove();
        document.removeEventListener("keydown", onEsc);
      }
    };
    document.addEventListener("keydown", onEsc);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(listContainer);
    card.appendChild(formBox);
    card.appendChild(actions);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  }

  // src/deletion.js
  function isPinOrArchiveButton(btn, allowArchive = false) {
    if (!btn) return true;
    const label = ((btn.getAttribute?.("aria-label") || "") + " " + (btn.getAttribute?.("title") || "") + " " + (btn.getAttribute?.("data-testid") || "")).toLowerCase();
    if (allowArchive && label.includes("archiv")) {
      return false;
    }
    return label.includes("fijar") || label.includes("desfijar") || label.includes("pin") || label.includes("unpin") || label.includes("archiv");
  }
  function isRemoteTask(targetId, link, row) {
    if (typeof targetId === "string" && targetId.startsWith("task_")) return true;
    if (row?.getAttribute?.("data-gcm-task") === "1" || link?.getAttribute?.("data-gcm-task") === "1") return true;
    const href = link?.getAttribute?.("href") || "";
    return href.includes("/codex/tasks/") || href.includes("/codex") || href.includes("/tasks/");
  }
  function findOptionsTrigger(row, link, isTask = false) {
    const targets = [row, link, row.parentElement].filter(Boolean);
    for (const tEl of targets) {
      try {
        tEl.dispatchEvent(new CustomEvent("gcm:react-hover", { bubbles: true }));
      } catch (_) {
      }
      tEl.dispatchEvent(new PointerEvent("pointerover", { bubbles: true }));
      tEl.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }));
      tEl.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      tEl.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    }
    const countConvLinks = (el2) => el2.querySelectorAll(CONV_LINK_SELECTOR).length;
    const scopes = [];
    scopes.push(row);
    if (row.parentElement && row.parentElement !== document.body && countConvLinks(row.parentElement) <= 1) {
      scopes.push(row.parentElement);
    }
    if (row.nextElementSibling && countConvLinks(row.nextElementSibling) === 0) {
      scopes.push(row.nextElementSibling);
    }
    const allowArchiveBtn = isTask || PLATFORM_KEY === "chatgpt";
    const prioritySelectors = PLATFORM_KEY === "chatgpt" ? [
      'button[data-testid^="history-item-"][data-testid$="-options"]',
      'button[data-testid*="options"]',
      'button[aria-haspopup="menu"]',
      "button[data-trailing-button]",
      'button[aria-label*="Options"], button[aria-label*="Opciones"], button[aria-label*="More"], button[aria-label*="Más"]',
      'button[aria-label*="rchiv"], button[title*="rchiv"], button[data-testid*="archive"]',
      "button:not(.gcm-checkbox)"
    ] : [SELECTORS.optionsTrigger];
    for (const sel of prioritySelectors) {
      for (const scope of scopes) {
        const candidates = Array.from(scope.querySelectorAll(sel));
        const valid = candidates.find((b) => !b.classList?.contains("gcm-checkbox") && !isPinOrArchiveButton(b, allowArchiveBtn));
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
    const parentLi = row.closest("li");
    if (parentLi && isSingleRowContainer(parentLi)) {
      containerToRemove = parentLi;
    } else if (row.parentElement && row.parentElement !== document.body && row.parentElement.tagName === "DIV" && isSingleRowContainer(row.parentElement) && (row.parentElement.hasAttribute("data-sidebar-chatgpt-conversation-key") || (row.parentElement.getAttribute("data-testid") || "").startsWith("history-item"))) {
      containerToRemove = row.parentElement;
    }
    if (isSingleRowContainer(containerToRemove)) {
      containerToRemove.remove();
    }
  }
  function cleanupEmptySidebarItems() {
    const sidebar = getSidebarElement() || document;
    const lis = sidebar.querySelectorAll("li");
    lis.forEach((li) => {
      if (!li.querySelector(CONV_LINK_SELECTOR) && !li.textContent?.trim()) {
        li.remove();
      }
    });
  }
  function checkRedirectIfActiveChatDeleted(deletedIds) {
    if (PLATFORM_KEY !== "chatgpt" || !Array.isArray(deletedIds) || deletedIds.length === 0) return;
    const currentPath = location.pathname;
    const isCurrentDeleted = deletedIds.some((id) => currentPath.includes(id));
    if (isCurrentDeleted) {
      const newChatBtn = document.querySelector('[data-testid="create-new-chat-button"], [data-testid="new-chat-button"], a[href="/"]');
      if (newChatBtn) {
        realClick(newChatBtn);
      } else {
        location.href = "/";
      }
    }
  }
  async function getChatGptToken(forceRefresh = false) {
    if (forceRefresh) state.cachedChatGptToken = null;
    if (!state.cachedChatGptToken) {
      const sessRes = await fetch("/api/auth/session", { credentials: "include" });
      if (sessRes.ok) {
        const sessData = await sessRes.json();
        state.cachedChatGptToken = sessData?.accessToken || null;
      }
    }
    return state.cachedChatGptToken;
  }
  function getCookieValue(name) {
    try {
      const m = (document.cookie || "").match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (_) {
      return null;
    }
  }
  function buildChatGptHeaders(token, includeAccount = true) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    if (includeAccount) {
      const accountId = getCookieValue("_account");
      if (accountId && accountId !== "personal") {
        headers["ChatGPT-Account-Id"] = accountId;
      }
    }
    const deviceId = getCookieValue("oai-did") || typeof localStorage !== "undefined" && localStorage.getItem?.("oai-did");
    if (deviceId) {
      headers["OAI-Device-Id"] = deviceId;
    }
    if (typeof navigator !== "undefined" && navigator.language) {
      headers["OAI-Language"] = navigator.language;
    }
    return headers;
  }
  async function hideChatGptConversation(targetId, token) {
    const headers = buildChatGptHeaders(token, true);
    let lastRes = await fetch(`/backend-api/conversation/${targetId}`, {
      method: "PATCH",
      credentials: "include",
      headers,
      body: JSON.stringify({ is_visible: false })
    });
    if (lastRes.ok || lastRes.status === 401) return lastRes;
    if (headers["ChatGPT-Account-Id"]) {
      const personalRes = await fetch(`/backend-api/conversation/${targetId}`, {
        method: "PATCH",
        credentials: "include",
        headers: buildChatGptHeaders(token, false),
        body: JSON.stringify({ is_visible: false })
      });
      if (personalRes.ok || personalRes.status === 401) return personalRes;
      lastRes = personalRes;
    }
    try {
      const delRes = await fetch(`/backend-api/conversation/${targetId}`, {
        method: "DELETE",
        credentials: "include",
        headers
      });
      if (delRes.ok) return delRes;
    } catch (_) {
    }
    try {
      const archRes = await fetch(`/backend-api/conversation/${targetId}`, {
        method: "PATCH",
        credentials: "include",
        headers,
        body: JSON.stringify({ is_archived: true })
      });
      if (archRes.ok) return archRes;
    } catch (_) {
    }
    return lastRes;
  }
  async function deleteOrArchiveRemoteTaskApi(targetId, token) {
    const headers = buildChatGptHeaders(token, true);
    try {
      const delRes = await fetch(`/backend-api/wham/tasks/${targetId}`, {
        method: "DELETE",
        credentials: "include",
        headers
      });
      if (delRes.ok || delRes.status === 401) return delRes;
    } catch (_) {
    }
    try {
      const archRes = await fetch(`/backend-api/wham/tasks/${targetId}/archive`, {
        method: "POST",
        credentials: "include",
        headers
      });
      if (archRes.ok) {
        try {
          await fetch(`/backend-api/wham/tasks/${targetId}`, {
            method: "DELETE",
            credentials: "include",
            headers
          });
        } catch (_) {
        }
        return archRes;
      }
      if (archRes.status === 401) return archRes;
    } catch (_) {
    }
    try {
      const patchRes = await fetch(`/backend-api/wham/tasks/${targetId}`, {
        method: "PATCH",
        credentials: "include",
        headers,
        body: JSON.stringify({ archived: true, is_archived: true, is_visible: false })
      });
      if (patchRes.ok || patchRes.status === 401) return patchRes;
    } catch (_) {
    }
    return fetch(`/backend-api/tasks/${targetId}`, {
      method: "DELETE",
      credentials: "include",
      headers
    });
  }
  function getAlternateChatGptId(id) {
    if (typeof id !== "string") return null;
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
  var cachedRemoteCatalog = { ts: 0, entries: [] };
  async function resolveChatGptIdByTitle(row, targetId, token) {
    if (!row) return null;
    const rawTitle = extractConvTitle(row, targetId) || "";
    const normTitle = rawTitle.replace(/\.\.\.$/, "").trim().toLowerCase();
    if (!normTitle) return null;
    const now = Date.now();
    if (now - cachedRemoteCatalog.ts > 15e3 || cachedRemoteCatalog.entries.length === 0) {
      const headers = buildChatGptHeaders(token, true);
      const endpoints = [
        { url: "/backend-api/wham/tasks", isTask: true },
        { url: "/backend-api/tasks", isTask: true },
        { url: "/backend-api/conversations?offset=0&limit=100&order=updated", isTask: false }
      ];
      const entries = [];
      for (const ep of endpoints) {
        try {
          const r = await fetch(ep.url, { credentials: "include", headers });
          if (r.ok) {
            const data = await r.json();
            const list = data?.items || data?.tasks || data?.data || data?.results || (Array.isArray(data) ? data : []);
            if (Array.isArray(list)) {
              for (const item of list) {
                const id = item?.id || item?.task_id || item?.conversation_id;
                const title = (item?.title || item?.name || item?.prompt || "").trim();
                if (id && title) {
                  entries.push({ id: String(id), title: title.toLowerCase(), isTask: ep.isTask || String(id).startsWith("task_") });
                }
              }
            }
          }
        } catch (_) {
        }
      }
      cachedRemoteCatalog = { ts: now, entries };
    }
    const match = cachedRemoteCatalog.entries.find((e) => e.title === normTitle) || cachedRemoteCatalog.entries.find((e) => e.title.startsWith(normTitle) || normTitle.startsWith(e.title));
    if (match) {
      cachedRemoteCatalog.entries = cachedRemoteCatalog.entries.filter((e) => e.id !== match.id);
      return match;
    }
    return null;
  }
  async function deleteChatGptViaApi(targetId, row, isTask = false) {
    if (PLATFORM_KEY !== "chatgpt" || typeof fetch !== "function") return false;
    try {
      let token = await getChatGptToken();
      if (!token) return false;
      let effectiveId = targetId;
      let effectiveIsTask = isTask;
      if (typeof effectiveId === "string" && effectiveId.startsWith("task_cloud_")) {
        const resolved = await resolveChatGptIdByTitle(row, targetId, token);
        if (!resolved?.id) return false;
        effectiveId = resolved.id;
        effectiveIsTask = resolved.isTask;
      }
      const tryWithId = async (idToTry, tk) => {
        const runPrimary = () => effectiveIsTask ? deleteOrArchiveRemoteTaskApi(idToTry, tk) : hideChatGptConversation(idToTry, tk);
        const runSecondary = () => effectiveIsTask ? hideChatGptConversation(idToTry, tk) : deleteOrArchiveRemoteTaskApi(idToTry, tk);
        let r = await runPrimary();
        if (!r?.ok && r?.status !== 401) {
          const sec = await runSecondary();
          if (sec?.ok) r = sec;
        }
        return r;
      };
      let res = await tryWithId(effectiveId, token);
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
        removeDeletedRowFromDOM(row, targetId);
        cleanupEmptySidebarItems();
        await sleep(160);
        return true;
      }
    } catch (_) {
    }
    return false;
  }
  async function deleteSingleConversation(targetId) {
    const found = findRowById(targetId);
    const row = found?.row || null;
    const link = found?.link || null;
    const isTask = isRemoteTask(targetId, link, row);
    if (PLATFORM_KEY === "chatgpt") {
      const apiOk = await deleteChatGptViaApi(targetId, row, isTask);
      if (apiOk) return true;
    }
    if (!found) return false;
    row.scrollIntoView({ block: "center" });
    await sleep(180);
    try {
      const trigger = await pollUntil(() => findOptionsTrigger(row, link, isTask), 1200, 80);
      if (!trigger) {
        throw new Error("Options menu button not found.");
      }
      const triggerLabel = ((trigger.getAttribute?.("aria-label") || "") + " " + (trigger.getAttribute?.("title") || "") + " " + (trigger.getAttribute?.("data-testid") || "")).toLowerCase();
      const isDirectArchiveBtn = triggerLabel.includes("archiv") && !trigger.getAttribute?.("aria-haspopup");
      realClick(trigger);
      if (isDirectArchiveBtn) {
        await sleep(450);
        removeDeletedRowFromDOM(row, targetId);
        cleanupEmptySidebarItems();
        return true;
      }
      const menu = await pollUntil(
        () => Array.from(document.querySelectorAll(SELECTORS.menuPanel)).find(isActiveOverlay),
        2200
      );
      if (!menu) {
        if (isTask || PLATFORM_KEY === "chatgpt") {
          await sleep(450);
          if (!row.isConnected) {
            cleanupEmptySidebarItems();
            return true;
          }
          if (isTask) {
            removeDeletedRowFromDOM(row, targetId);
            cleanupEmptySidebarItems();
            return true;
          }
        }
        throw new Error("Menu did not open.");
      }
      await sleep(180);
      const menuItems = Array.from(menu.querySelectorAll(SELECTORS.deleteMenuItem));
      const allowArchiveMenu = isTask || PLATFORM_KEY === "chatgpt";
      let deleteBtn = menuItems.find((el2) => {
        const txt = (el2.textContent || "").toLowerCase();
        const testId = (el2.getAttribute("data-testid") || "").toLowerCase();
        const cls = typeof el2.className === "string" ? el2.className.toLowerCase() : "";
        return testId.includes("delete") || cls.includes("text-danger") || cls.includes("text-token-text-error") || cls.includes("text-red") || txt.includes("eliminar") || txt.includes("delete") || txt.includes("borrar") || el2.querySelector('mat-icon[fonticon="delete"], mat-icon[data-mat-icon-name="delete"]');
      });
      if (!deleteBtn && allowArchiveMenu) {
        deleteBtn = menuItems.find((el2) => {
          const txt = (el2.textContent || "").toLowerCase();
          const testId = (el2.getAttribute("data-testid") || "").toLowerCase();
          return testId.includes("archive") || txt.includes("archivar") || txt.includes("archive");
        });
      }
      if (!deleteBtn) {
        throw new Error("Delete option not found.");
      }
      const isArchiveAction = allowArchiveMenu && ((deleteBtn.textContent || "").toLowerCase().includes("archiv") || (deleteBtn.getAttribute("data-testid") || "").toLowerCase().includes("archive"));
      realClick(deleteBtn);
      const dialog = await pollUntil(
        () => Array.from(document.querySelectorAll(SELECTORS.confirmDialog)).find(isActiveOverlay),
        isArchiveAction ? 1e3 : 2200
      );
      if (!dialog) {
        if (isArchiveAction) {
          await sleep(450);
          removeDeletedRowFromDOM(row, targetId);
          cleanupEmptySidebarItems();
          return true;
        }
        throw new Error("Confirm dialog did not appear.");
      }
      await sleep(200);
      let confirmBtn = dialog.querySelector(SELECTORS.confirmButton);
      if (!confirmBtn) {
        const dialogBtns = Array.from(dialog.querySelectorAll("button"));
        confirmBtn = dialogBtns.find((b) => {
          const txt = (b.textContent || "").trim().toLowerCase();
          return txt === "eliminar" || txt === "delete" || txt === "borrar" || isTask && (txt.includes("archivar") || txt.includes("archive") || txt.includes("detener") || txt.includes("stop"));
        });
        if (!confirmBtn && dialogBtns.length === 2) confirmBtn = dialogBtns[1];
      }
      if (!confirmBtn) {
        throw new Error("Confirm button not found.");
      }
      realClick(confirmBtn);
      await pollUntil(() => !isActiveOverlay(dialog), 4e3);
      await sleep(PLATFORM_KEY === "chatgpt" ? 650 : 550);
      removeDeletedRowFromDOM(row, targetId);
      cleanupEmptySidebarItems();
      return true;
    } catch (domErr) {
      if (PLATFORM_KEY === "chatgpt") {
        document.body.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
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
  async function deleteSelectedChats() {
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
    document.body.classList.add("gcm-stealth-delete");
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
            errorCount++;
          }
        } catch (err) {
          console.warn("[ChatFold] Error deleting conversation:", err);
          errorCount++;
          document.body.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
          await sleep(400);
        }
      }
    } finally {
      document.body.classList.remove("gcm-stealth-delete");
      state.deletionInProgress = false;
      state.deletionStopRequested = false;
    }
    const selectAllCb = document.getElementById("gcm-select-all");
    if (selectAllCb) selectAllCb.checked = false;
    cleanupEmptySidebarItems();
    refreshUI();
    checkRedirectIfActiveChatDeleted(queueIds.slice(0, deletedCount));
    const summary = errorCount > 0 ? t().toastDeleteFinishedErr(deletedCount, errorCount) : t().toastDeleteSuccess(deletedCount);
    updateStatusToast(summary, total, total, 4500);
  }
  function stopDeletion() {
    state.deletionStopRequested = true;
    updateStatusToast(t().toastStopping, null, null, 2500);
  }

  // src/markdown-export.js
  function exportSelectedConversationsToMarkdown() {
    const items = getConversationRows();
    const selectedIds = Array.from(selectedMap.keys());
    const folderLookup = new Map(state.folderState.folders.map((f) => [f.id, f.name]));
    let markdown = `# ${t().mdHeader}
`;
    markdown += `${t().mdDate}: ${(/* @__PURE__ */ new Date()).toLocaleString()}

`;
    const allMessages = Array.from(document.querySelectorAll(SELECTORS.activeMessages));
    const messages = allMessages.filter((m) => !allMessages.some((o) => o !== m && o.contains(m)));
    if (selectedIds.length > 0) {
      markdown += `## ${t().mdSelectedIndex(selectedIds.length)}

`;
      selectedIds.forEach((id, idx) => {
        const rowObj = items.find((it) => it.id === id);
        const title = (rowObj?.title || id).replace(/[[\]\r\n]/g, " ").trim();
        const folderName = folderLookup.get(state.folderState.assignments[id]) || t().pillUnassigned;
        const isLocked = state.folderState.protectedIds[id] ? " 🔒" : "";
        markdown += `${idx + 1}. **[${title}](${P.buildUrl(id)})** — *${t().mdFolderLabel}: ${folderName}*${isLocked}
`;
      });
      markdown += `
---

`;
    }
    if (messages.length > 0) {
      markdown += `## ${t().mdActiveChatHeader}

`;
      messages.forEach((msg) => {
        const text = (msg.innerText || msg.textContent || "").trim();
        if (!text) return;
        const isUser = msg.getAttribute?.("data-message-author-role") === "user" || msg.tagName.toLowerCase().includes("user") || msg.classList.contains("query-text") || !!msg.querySelector?.('[data-message-author-role="user"]');
        markdown += `### ${isUser ? t().mdUser : `✨ ${P.name}`}

${text}

---

`;
      });
    }
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${PLATFORM_KEY}-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    updateStatusToast(t().toastMdExported, null, null, 3e3);
  }

  // src/selection.js
  function toggleProtectSelected() {
    const ids = Array.from(selectedMap.keys());
    if (ids.length === 0) return;
    const allAlreadyProtected = ids.every((id) => !!state.folderState.protectedIds[id]);
    ids.forEach((id) => {
      if (allAlreadyProtected) {
        delete state.folderState.protectedIds[id];
      } else {
        state.folderState.protectedIds[id] = true;
      }
    });
    saveFolderData(state.folderState);
    clearAllSelections();
    refreshUI();
    updateStatusToast(
      allAlreadyProtected ? t().toastUnprotected(ids.length) : t().toastProtected(ids.length),
      null,
      null,
      3e3
    );
  }
  function clearAllSelections() {
    selectedMap.clear();
    const sidebar = getSidebarElement() || document;
    sidebar.querySelectorAll(".gcm-checkbox").forEach((cb) => {
      cb.checked = false;
      cb.classList.remove("gcm-checked");
    });
    sidebar.querySelectorAll(".gcm-chat-row.gcm-selected").forEach((r) => r.classList.remove("gcm-selected"));
    const selectAllCb = document.getElementById("gcm-select-all");
    if (selectAllCb) {
      selectAllCb.checked = false;
      selectAllCb.classList.remove("gcm-checked");
    }
  }
  function toggleMoveToFolderPopover(anchorBtn) {
    const existing = document.getElementById("gcm-folder-popover");
    if (existing) {
      existing.remove();
      return;
    }
    const rect = anchorBtn.getBoundingClientRect();
    const popover = document.createElement("div");
    popover.id = "gcm-folder-popover";
    popover.style.top = `${rect.bottom + 8}px`;
    popover.style.left = `${Math.max(12, rect.left - 30)}px`;
    state.folderState.folders.forEach((f) => {
      const item = document.createElement("button");
      item.className = "gcm-popover-item";
      const dot = document.createElement("span");
      dot.className = "gcm-folder-dot";
      dot.style.backgroundColor = f.color;
      dot.style.color = f.color;
      const txt = document.createElement("span");
      txt.textContent = f.name;
      item.appendChild(dot);
      item.appendChild(txt);
      item.addEventListener("click", () => {
        assignSelectedToFolder(f.id);
        popover.remove();
      });
      popover.appendChild(item);
    });
    const divider = document.createElement("div");
    divider.className = "gcm-popover-divider";
    popover.appendChild(divider);
    const removeBtn = document.createElement("button");
    removeBtn.className = "gcm-popover-item";
    setButtonIconText(removeBtn, ICONS.folderMinus, t().removeFromFolder);
    removeBtn.addEventListener("click", () => {
      assignSelectedToFolder(null);
      popover.remove();
    });
    popover.appendChild(removeBtn);
    const createNewBtn = document.createElement("button");
    createNewBtn.className = "gcm-popover-item";
    createNewBtn.style.color = "#a8c7fa";
    setButtonIconText(createNewBtn, ICONS.folderPlus, t().createNewFolderMenu);
    createNewBtn.addEventListener("click", () => {
      popover.remove();
      openCreateFolderModal((newFolder) => {
        assignSelectedToFolder(newFolder.id);
      });
    });
    popover.appendChild(createNewBtn);
    document.body.appendChild(popover);
    const popRect = popover.getBoundingClientRect();
    const clampedLeft = Math.min(Math.max(12, rect.left - 30), Math.max(12, window.innerWidth - popRect.width - 12));
    const preferTop = rect.bottom + 8 + popRect.height > window.innerHeight - 12 && rect.top - popRect.height - 8 >= 12 ? rect.top - popRect.height - 8 : Math.min(rect.bottom + 8, Math.max(12, window.innerHeight - popRect.height - 12));
    popover.style.left = `${clampedLeft}px`;
    popover.style.top = `${preferTop}px`;
    const closeOnOutside = (e) => {
      if (!popover.contains(e.target) && e.target !== anchorBtn) {
        popover.remove();
        document.removeEventListener("mousedown", closeOnOutside);
      }
    };
    setTimeout(() => document.addEventListener("mousedown", closeOnOutside), 20);
  }
  function assignSelectedToFolder(folderId) {
    const ids = Array.from(selectedMap.keys());
    if (ids.length === 0) return;
    ids.forEach((convId) => {
      if (folderId) {
        state.folderState.assignments[convId] = folderId;
      } else {
        delete state.folderState.assignments[convId];
      }
    });
    saveFolderData(state.folderState);
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
      if (target.classList.contains("gcm-checkbox") || target.closest(".gcm-lock-icon")) {
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
        if (e.type === "mousedown" && target.id !== "gcm-select-all") {
          e.preventDefault();
        }
      }
    };
    document.addEventListener("pointerdown", stopPressOnControls, true);
    document.addEventListener("mousedown", stopPressOnControls, true);
    document.addEventListener("pointerup", stopPressOnControls, true);
    document.addEventListener("mouseup", stopPressOnControls, true);
    document.addEventListener(
      "click",
      (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        const lockTarget = target.closest(".gcm-lock-icon");
        if (lockTarget) {
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
          e.preventDefault();
          const id = lockTarget.dataset.convId;
          if (id) {
            delete state.folderState.protectedIds[id];
            saveFolderData(state.folderState);
            refreshUI();
          }
          return;
        }
        if (target.classList.contains("gcm-checkbox") && target.id !== "gcm-select-all") {
          e.preventDefault();
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
          const checkbox = target;
          const id = checkbox.dataset.convId;
          const row = checkbox.closest(".gcm-chat-row") || checkbox.parentElement;
          if (!id || !row) return;
          const willBeChecked = !selectedMap.has(id);
          const applyCbState = (cb, r, cbId, state2) => {
            cb.checked = state2;
            cb.classList.toggle("gcm-checked", state2);
            if (state2) {
              selectedMap.set(cbId, { id: cbId });
              r.classList.add("gcm-selected");
            } else {
              selectedMap.delete(cbId);
              r.classList.remove("gcm-selected");
            }
          };
          const sidebar = getSidebarElement() || document;
          const visibleCheckboxes = Array.from(
            sidebar.querySelectorAll(".gcm-checkbox:not(#gcm-select-all)")
          ).filter((cb) => {
            const r = cb.closest(".gcm-chat-row") || cb.parentElement;
            return r && !r.classList.contains("gcm-hidden-by-filter");
          });
          if (e.shiftKey && state.lastCheckedCheckbox && state.lastCheckedCheckbox !== checkbox) {
            const start = visibleCheckboxes.indexOf(state.lastCheckedCheckbox);
            const end = visibleCheckboxes.indexOf(checkbox);
            if (start !== -1 && end !== -1) {
              const [low, high] = [Math.min(start, end), Math.max(start, end)];
              for (let i = low; i <= high; i++) {
                const cb = visibleCheckboxes[i];
                const cbId = cb.dataset.convId;
                const cbRow = cb.closest(".gcm-chat-row") || cb.parentElement;
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
                cb.classList.toggle("gcm-checked", st);
              }
            });
          };
          if (typeof queueMicrotask === "function") queueMicrotask(syncNativeChecked);
          setTimeout(syncNativeChecked, 0);
          state.lastCheckedCheckbox = checkbox;
          updateToolbarState();
        }
      },
      true
    );
  }
  function injectCheckboxes(items) {
    for (let i = 0; i < items.length; i++) {
      const { id, row } = items[i];
      if (!row.classList.contains("gcm-chat-row")) {
        row.classList.add("gcm-chat-row");
      }
      const isSelected = selectedMap.has(id);
      const existingCb = row.querySelector(".gcm-checkbox");
      if (existingCb) {
        if (existingCb.dataset.convId !== id) existingCb.dataset.convId = id;
        if (existingCb.checked !== isSelected) existingCb.checked = isSelected;
        existingCb.classList.toggle("gcm-checked", isSelected);
        row.classList.toggle("gcm-selected", isSelected);
        continue;
      }
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "gcm-checkbox" + (isSelected ? " gcm-checked" : "");
      checkbox.title = t().checkboxTitle;
      checkbox.dataset.convId = id;
      checkbox.checked = isSelected;
      row.classList.toggle("gcm-selected", isSelected);
      row.prepend(checkbox);
    }
  }
  function toggleSelectAll(checked) {
    const selectAllCb = document.getElementById("gcm-select-all");
    if (selectAllCb) {
      selectAllCb.checked = checked;
      selectAllCb.classList.toggle("gcm-checked", checked);
    }
    const sidebar = getSidebarElement() || document;
    const checkboxes = Array.from(sidebar.querySelectorAll(".gcm-checkbox:not(#gcm-select-all)")).filter((cb) => {
      const r = cb.closest(".gcm-chat-row") || cb.parentElement;
      return r && !r.classList.contains("gcm-hidden-by-filter");
    });
    checkboxes.forEach((cb) => {
      cb.checked = checked;
      cb.classList.toggle("gcm-checked", checked);
      const id = cb.dataset.convId;
      const row = cb.closest(".gcm-chat-row") || cb.parentElement;
      if (id && row) {
        if (checked) {
          selectedMap.set(id, { id });
          row.classList.add("gcm-selected");
        } else {
          selectedMap.delete(id);
          row.classList.remove("gcm-selected");
        }
      }
    });
    updateToolbarState();
  }

  // src/toolbar.js
  function createToolbar() {
    if (document.getElementById("gcm-toolbar")) return;
    const toolbar = document.createElement("div");
    toolbar.id = "gcm-toolbar";
    const headWrap = document.createElement("div");
    headWrap.className = "gcm-toolbar-head";
    const collapseBtn = document.createElement("button");
    collapseBtn.id = "gcm-toolbar-toggle";
    collapseBtn.className = "gcm-toolbar-toggle";
    collapseBtn.addEventListener("click", () => {
      if (state.toolbarJustDragged) return;
      state.toolbarCollapsed = !state.toolbarCollapsed;
      saveView();
      applyToolbarLayout();
    });
    const orientBtn = document.createElement("button");
    orientBtn.id = "gcm-toolbar-orient";
    orientBtn.className = "gcm-toolbar-toggle gcm-toolbar-orient";
    orientBtn.addEventListener("click", () => {
      if (state.toolbarJustDragged) return;
      state.toolbarVertical = !state.toolbarVertical;
      saveView();
      applyToolbarLayout();
    });
    headWrap.appendChild(collapseBtn);
    headWrap.appendChild(orientBtn);
    const selectAllWrap = document.createElement("label");
    selectAllWrap.className = "gcm-select-all-wrap";
    selectAllWrap.title = t().selectAllTitle;
    const selectAllCb = document.createElement("input");
    selectAllCb.type = "checkbox";
    selectAllCb.id = "gcm-select-all";
    selectAllCb.className = "gcm-checkbox";
    selectAllCb.style.margin = "0";
    selectAllCb.addEventListener("change", (e) => toggleSelectAll(e.target.checked));
    const selectAllText = document.createElement("span");
    selectAllText.textContent = t().selectAll;
    selectAllWrap.appendChild(selectAllCb);
    selectAllWrap.appendChild(selectAllText);
    const folderBtn = document.createElement("button");
    folderBtn.id = "gcm-folder-btn";
    folderBtn.className = "gcm-btn gcm-btn-folder";
    folderBtn.disabled = true;
    setButtonIconText(folderBtn, ICONS.folder, t().folderBtn(0));
    folderBtn.title = t().folderBtnTitle;
    folderBtn.addEventListener("click", () => toggleMoveToFolderPopover(folderBtn));
    const protectBtn = document.createElement("button");
    protectBtn.id = "gcm-protect-btn";
    protectBtn.className = "gcm-btn gcm-btn-neutral";
    protectBtn.disabled = true;
    setButtonIconText(protectBtn, ICONS.lock, t().protectBtn);
    protectBtn.title = t().protectBtnTitle;
    protectBtn.addEventListener("click", toggleProtectSelected);
    const exportBtn = document.createElement("button");
    exportBtn.id = "gcm-export-btn";
    exportBtn.className = "gcm-btn gcm-btn-neutral";
    setButtonIconText(exportBtn, ICONS.fileText, t().exportBtn);
    exportBtn.title = t().exportBtnTitle;
    exportBtn.addEventListener("click", exportSelectedConversationsToMarkdown);
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "gcm-delete-btn";
    deleteBtn.className = "gcm-btn gcm-btn-danger";
    deleteBtn.disabled = true;
    setButtonIconText(deleteBtn, ICONS.trash, t().deleteBtn(0));
    deleteBtn.addEventListener("click", deleteSelectedChats);
    const stopBtn = document.createElement("button");
    stopBtn.id = "gcm-stop-btn";
    stopBtn.className = "gcm-btn gcm-btn-stop";
    stopBtn.style.display = "none";
    setButtonIconText(stopBtn, ICONS.stop, t().stopBtn);
    stopBtn.addEventListener("click", stopDeletion);
    toolbar.appendChild(headWrap);
    toolbar.appendChild(selectAllWrap);
    toolbar.appendChild(folderBtn);
    toolbar.appendChild(protectBtn);
    toolbar.appendChild(exportBtn);
    toolbar.appendChild(deleteBtn);
    toolbar.appendChild(stopBtn);
    enableToolbarDrag(toolbar);
    document.body.appendChild(toolbar);
    toolbar.classList.add("gcm-dragging");
    applyToolbarLayout();
    void toolbar.offsetWidth;
    requestAnimationFrame(() => toolbar.classList.remove("gcm-dragging"));
  }
  function applyToolbarLayout() {
    const toolbar = document.getElementById("gcm-toolbar");
    const collapseBtn = document.getElementById("gcm-toolbar-toggle");
    const orientBtn = document.getElementById("gcm-toolbar-orient");
    if (!toolbar || !collapseBtn) return;
    toolbar.classList.toggle("gcm-collapsed", state.toolbarCollapsed);
    toolbar.classList.toggle("gcm-vertical", !!state.toolbarVertical && !state.toolbarCollapsed);
    collapseBtn.textContent = "";
    collapseBtn.appendChild(createIconElement(state.toolbarCollapsed ? ICONS.menu : ICONS.chevronRight));
    collapseBtn.title = state.toolbarCollapsed ? t().toolbarExpandTitle : t().toolbarCollapseTitle;
    if (orientBtn) {
      orientBtn.textContent = "";
      orientBtn.appendChild(createIconElement(state.toolbarVertical ? ICONS.layoutHorizontal : ICONS.layoutVertical));
      orientBtn.title = state.toolbarVertical ? t().toolbarHorizontalTitle : t().toolbarVerticalTitle;
    }
    clampToolbarPosition(toolbar);
  }
  function clampToolbarPosition(toolbar) {
    const pos = state.folderState.toolbarPos;
    if (!toolbar || !toolbar.isConnected || !pos) return;
    const rect = toolbar.getBoundingClientRect();
    const left = Math.min(Math.max(6, pos.left), Math.max(6, window.innerWidth - rect.width - 6));
    const top = Math.min(Math.max(6, pos.top), Math.max(6, window.innerHeight - rect.height - 6));
    toolbar.style.setProperty("left", `${left}px`, "important");
    toolbar.style.setProperty("top", `${top}px`, "important");
    toolbar.style.setProperty("right", "auto", "important");
    toolbar.style.setProperty("bottom", "auto", "important");
  }
  function enableToolbarDrag(toolbar) {
    const DRAG_THRESHOLD = 4;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;
    let dragging = false;
    let rafId = 0;
    let lastDx = 0;
    let lastDy = 0;
    let barW = 0;
    let barH = 0;
    toolbar.addEventListener(
      "click",
      (e) => {
        if (state.toolbarJustDragged) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      true
    );
    const applyDrag = () => {
      rafId = 0;
      const left = Math.min(Math.max(6, originLeft + lastDx), Math.max(6, window.innerWidth - barW - 6));
      const top = Math.min(Math.max(6, originTop + lastDy), Math.max(6, window.innerHeight - barH - 6));
      toolbar.style.setProperty("left", `${left}px`, "important");
      toolbar.style.setProperty("top", `${top}px`, "important");
      toolbar.style.setProperty("right", "auto", "important");
      toolbar.style.setProperty("bottom", "auto", "important");
      state.folderState.toolbarPos = { left, top };
    };
    const onMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        dragging = true;
        toolbar.classList.add("gcm-dragging");
        const rect = toolbar.getBoundingClientRect();
        barW = rect.width;
        barH = rect.height;
      }
      lastDx = dx;
      lastDy = dy;
      if (!rafId) rafId = requestAnimationFrame(applyDrag);
      e.preventDefault();
    };
    const onEnd = () => {
      document.removeEventListener("pointermove", onMove, true);
      document.removeEventListener("pointerup", onEnd, true);
      document.removeEventListener("pointercancel", onEnd, true);
      if (dragging) {
        dragging = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          applyDrag();
        }
        toolbar.classList.remove("gcm-dragging");
        saveFolderData(state.folderState);
        state.toolbarJustDragged = true;
        setTimeout(() => {
          state.toolbarJustDragged = false;
        }, 40);
      }
    };
    toolbar.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      const rect = toolbar.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      originLeft = rect.left;
      originTop = rect.top;
      dragging = false;
      document.addEventListener("pointermove", onMove, true);
      document.addEventListener("pointerup", onEnd, true);
      document.addEventListener("pointercancel", onEnd, true);
    });
  }
  function updateToolbarState() {
    const folderBtn = document.getElementById("gcm-folder-btn");
    const protectBtn = document.getElementById("gcm-protect-btn");
    const exportBtn = document.getElementById("gcm-export-btn");
    const deleteBtn = document.getElementById("gcm-delete-btn");
    const stopBtn = document.getElementById("gcm-stop-btn");
    const selectAllCb = document.getElementById("gcm-select-all");
    if (!deleteBtn || !stopBtn || !folderBtn) return;
    if (state.deletionInProgress) {
      folderBtn.style.display = "none";
      if (protectBtn) protectBtn.style.display = "none";
      if (exportBtn) exportBtn.style.display = "none";
      deleteBtn.style.display = "none";
      stopBtn.style.display = "inline-flex";
      if (selectAllCb) selectAllCb.disabled = true;
    } else {
      folderBtn.style.display = "inline-flex";
      if (protectBtn) protectBtn.style.display = "inline-flex";
      if (exportBtn) exportBtn.style.display = "inline-flex";
      deleteBtn.style.display = "inline-flex";
      stopBtn.style.display = "none";
      if (selectAllCb) selectAllCb.disabled = false;
      if (selectAllCb) {
        const rowCbs = document.querySelectorAll(".gcm-chat-row .gcm-checkbox:not(#gcm-select-all)");
        let visibleTotal = 0;
        let visibleChecked = 0;
        rowCbs.forEach((cb) => {
          const r = cb.closest(".gcm-chat-row") || cb.parentElement;
          if (!r || r.classList.contains("gcm-hidden-by-filter")) return;
          visibleTotal++;
          if (selectedMap.has(cb.dataset.convId)) visibleChecked++;
        });
        const allChecked = visibleTotal > 0 && visibleChecked === visibleTotal;
        if (selectAllCb.checked !== allChecked) selectAllCb.checked = allChecked;
        selectAllCb.classList.toggle("gcm-checked", allChecked);
        selectAllCb.indeterminate = visibleChecked > 0 && !allChecked;
      }
      const count = selectedMap.size;
      folderBtn.disabled = count === 0;
      const fText = t().folderBtn(count);
      if (folderBtn.dataset.label !== fText) {
        folderBtn.dataset.label = fText;
        setButtonIconText(folderBtn, ICONS.folder, fText);
      }
      if (protectBtn) {
        protectBtn.disabled = count === 0;
      }
      deleteBtn.disabled = count === 0;
      const dText = t().deleteBtn(count);
      if (deleteBtn.dataset.label !== dText) {
        deleteBtn.dataset.label = dText;
        setButtonIconText(deleteBtn, ICONS.trash, dText);
      }
    }
  }

  // src/panel.js
  function toggleLanguage() {
    state.folderState.lang = state.folderState.lang === "es" ? "en" : "es";
    saveFolderData(state.folderState);
    document.getElementById("gcm-toolbar")?.remove();
    document.getElementById("gcm-folders-box")?.remove();
    document.getElementById("gcm-folder-popover")?.remove();
    refreshUI();
  }
  function injectSidebarFoldersPanel(items) {
    let box = document.getElementById("gcm-folders-box");
    if (!box) {
      box = document.createElement("div");
      box.id = "gcm-folders-box";
      document.body.appendChild(box);
      buildFoldersPanelDOM(box);
      box.classList.add("gcm-dragging");
      clampBoxPosition(box);
      void box.offsetWidth;
      requestAnimationFrame(() => box.classList.remove("gcm-dragging"));
    }
    const isMin = box.classList.contains("gcm-minimized");
    if (state.folderState.minimized && !isMin) {
      box.classList.add("gcm-minimized");
      clampBoxPosition(box);
    } else if (!state.folderState.minimized && isMin) {
      box.classList.remove("gcm-minimized");
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
      if (fId && counts[fId] !== void 0) {
        counts[fId]++;
      } else {
        counts.UNASSIGNED++;
      }
      if (state.folderState.protectedIds[id]) {
        counts.PROTECTED++;
      }
    }
    const pillsContainer = document.getElementById("gcm-pills-container");
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
      createFolderPill({ id: "ALL", name: t().pillAll, color: null, count: counts.ALL, deletable: false })
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
    if (counts.PROTECTED > 0 || state.activeFolderFilter === "PROTECTED") {
      frag.appendChild(
        createFolderPill({ id: "PROTECTED", name: t().pillProtected, color: "#fbbc04", count: counts.PROTECTED, deletable: false })
      );
    }
    frag.appendChild(
      createFolderPill({ id: "UNASSIGNED", name: t().pillUnassigned, color: "#8e918f", count: counts.UNASSIGNED, deletable: false })
    );
    pillsContainer.textContent = "";
    pillsContainer.appendChild(frag);
    const sortBtn = document.getElementById("gcm-sort-btn");
    if (sortBtn) {
      const sortLabel = state.sortMode === "DEFAULT" ? t().sortRecent : state.sortMode === "AZ" ? t().sortAZ : t().sortZA;
      setButtonIconText(sortBtn, ICONS.sort, sortLabel);
    }
    const scrollBtn = document.getElementById("gcm-autoscroll-btn");
    if (scrollBtn) {
      if (state.autoScrollActive) {
        scrollBtn.classList.add("active");
        setButtonIconText(scrollBtn, ICONS.stop, t().stopLoadBtn);
      } else {
        scrollBtn.classList.remove("active");
        setButtonIconText(scrollBtn, ICONS.chevronsDown, t().loadAllBtn);
      }
    }
  }
  function clampBoxPosition(box) {
    const pos = state.folderState.pos;
    if (!box || !box.isConnected || !pos) return;
    const rect = box.getBoundingClientRect();
    const left = Math.min(Math.max(0, pos.left), Math.max(0, window.innerWidth - rect.width));
    const bottom = Math.min(Math.max(0, pos.bottom), Math.max(0, window.innerHeight - rect.height));
    box.style.setProperty("left", `${left}px`, "important");
    box.style.setProperty("bottom", `${bottom}px`, "important");
    box.style.setProperty("top", "auto", "important");
  }
  function enablePanelDrag(box, handle) {
    const DRAG_THRESHOLD = 4;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;
    let dragging = false;
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
      box.style.setProperty("left", `${left}px`, "important");
      box.style.setProperty("bottom", `${bottom}px`, "important");
      box.style.setProperty("top", "auto", "important");
      state.folderState.pos = { left, bottom };
    };
    const onMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        dragging = true;
        box.classList.add("gcm-dragging");
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
      document.removeEventListener("pointermove", onMove, true);
      document.removeEventListener("pointerup", onEnd, true);
      document.removeEventListener("pointercancel", onEnd, true);
      if (dragging) {
        dragging = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          applyDrag();
        }
        box.classList.remove("gcm-dragging");
        saveFolderData(state.folderState);
        state.panelJustDragged = true;
        setTimeout(() => {
          state.panelJustDragged = false;
        }, 0);
      }
    };
    handle.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      if (e.target instanceof Element && e.target.closest("button")) return;
      const rect = box.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      originLeft = rect.left;
      originTop = rect.top;
      dragging = false;
      document.addEventListener("pointermove", onMove, true);
      document.addEventListener("pointerup", onEnd, true);
      document.addEventListener("pointercancel", onEnd, true);
    });
  }
  function registerGlobalListeners() {
    const applyExternalState = (incoming) => {
      const keepView = {
        filter: state.activeFolderFilter,
        sort: state.sortMode,
        toolbarCollapsed: state.toolbarCollapsed,
        toolbarVertical: state.toolbarVertical
      };
      const langChanged = incoming.lang !== state.folderState.lang;
      state.folderState = { ...incoming, view: keepView };
      if (!BUILTIN_FILTERS.includes(state.activeFolderFilter) && !state.folderState.folders.some((f) => f.id === state.activeFolderFilter)) {
        state.activeFolderFilter = "ALL";
      }
      autoClassifiedVisited.clear();
      if (langChanged) {
        document.getElementById("gcm-toolbar")?.remove();
        document.getElementById("gcm-folders-box")?.remove();
      } else {
        const box = document.getElementById("gcm-folders-box");
        if (box) {
          box.classList.toggle("gcm-minimized", state.folderState.minimized);
          clampBoxPosition(box);
        }
        applyToolbarLayout();
        const pills = document.getElementById("gcm-pills-container");
        if (pills) delete pills.dataset.sig;
      }
      refreshUI();
    };
    window.addEventListener("storage", (e) => {
      if (e.key !== P.storageKey || !e.newValue) return;
      try {
        const incoming = normalizeStoredState(JSON.parse(e.newValue), state.folderState.lang);
        applyExternalState(incoming);
      } catch (_) {
      }
    });
    initCloudSync(
      () => state.folderState,
      (merged) => applyExternalState(merged)
    );
    document.addEventListener("keydown", (e) => {
      if (!e.altKey || !e.shiftKey || e.ctrlKey || e.metaKey) return;
      const key = (e.key || "").toUpperCase();
      if (key === "F") {
        e.preventDefault();
        state.folderState.minimized = !state.folderState.minimized;
        saveFolderData(state.folderState);
        refreshUI();
      } else if (key === "S") {
        e.preventDefault();
        if (state.folderState.minimized) {
          state.folderState.minimized = false;
          saveFolderData(state.folderState);
          refreshUI();
        }
        const input = document.querySelector("#gcm-folders-box .gcm-search-input");
        input?.focus();
        input?.select();
      }
    });
    try {
      if (typeof chrome !== "undefined" && chrome.runtime?.onMessage?.addListener) {
        chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
          if (!msg || typeof msg.action !== "string") return;
          if (msg.action === "TOGGLE_PANEL") {
            state.folderState.minimized = !state.folderState.minimized;
            saveFolderData(state.folderState);
            refreshUI();
            sendResponse?.({ ok: true, minimized: state.folderState.minimized });
          } else if (msg.action === "OPEN_PROMPTS") {
            openPromptsModal();
            sendResponse?.({ ok: true });
          } else if (msg.action === "EXPORT_BACKUP") {
            exportBackupConfig();
            sendResponse?.({ ok: true });
          }
        });
      }
    } catch (_) {
    }
    window.addEventListener("resize", () => {
      clampBoxPosition(document.getElementById("gcm-folders-box"));
      clampToolbarPosition(document.getElementById("gcm-toolbar"));
    });
  }
  function buildFoldersPanelDOM(box) {
    box.textContent = "";
    const header = document.createElement("div");
    header.className = "gcm-folders-header";
    const title = document.createElement("span");
    title.style.display = "inline-flex";
    title.style.alignItems = "center";
    title.style.gap = "7px";
    title.appendChild(createIconElement(ICONS.chatfoldLogo));
    const titleText = document.createElement("span");
    titleText.textContent = t().panelTitle;
    title.appendChild(titleText);
    title.title = t().toggleMinTitle;
    title.addEventListener("click", () => {
      if (state.panelJustDragged) return;
      state.folderState.minimized = !state.folderState.minimized;
      saveFolderData(state.folderState);
      refreshUI();
    });
    const headerActions = document.createElement("div");
    headerActions.className = "gcm-header-actions";
    const langBtn = document.createElement("button");
    langBtn.className = "gcm-mini-btn";
    langBtn.textContent = state.folderState.lang.toUpperCase();
    langBtn.title = t().langBtnTitle;
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLanguage();
    });
    const addBtn = document.createElement("button");
    addBtn.className = "gcm-add-folder-btn";
    setButtonIconText(addBtn, ICONS.folderPlus, t().newFolderBtn);
    addBtn.title = t().newFolderTitle;
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openCreateFolderModal();
    });
    const minBtn = document.createElement("button");
    minBtn.className = "gcm-mini-btn gcm-mini-icon-btn";
    minBtn.appendChild(createIconElement(ICONS.minus));
    minBtn.title = t().toggleMinTitle;
    minBtn.addEventListener("click", (e) => {
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
    const body = document.createElement("div");
    body.className = "gcm-folders-body";
    const searchRow = document.createElement("div");
    searchRow.className = "gcm-search-sort-row";
    const searchWrap = document.createElement("div");
    searchWrap.className = "gcm-search-wrap";
    const searchIcon = createIconElement(ICONS.search);
    searchIcon.classList.add("gcm-search-lead-icon");
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "gcm-search-input";
    searchInput.placeholder = t().searchPlaceholder;
    searchInput.value = state.searchQuery;
    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "gcm-search-clear";
    clearBtn.appendChild(createIconElement(ICONS.close));
    clearBtn.title = t().searchClearTitle;
    clearBtn.style.display = state.searchQuery ? "inline-flex" : "none";
    let searchDebounce = null;
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      clearBtn.style.display = state.searchQuery ? "inline-flex" : "none";
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        applyFolderBadgesAndFilter(getConversationRows());
      }, 90);
    });
    clearBtn.addEventListener("click", () => {
      state.searchQuery = "";
      searchInput.value = "";
      clearBtn.style.display = "none";
      applyFolderBadgesAndFilter(getConversationRows());
      searchInput.focus();
    });
    searchWrap.appendChild(searchIcon);
    searchWrap.appendChild(searchInput);
    searchWrap.appendChild(clearBtn);
    const sortBtn = document.createElement("button");
    sortBtn.id = "gcm-sort-btn";
    sortBtn.className = "gcm-sort-btn";
    sortBtn.title = t().sortTitle;
    setButtonIconText(sortBtn, ICONS.sort, t().sortRecent);
    sortBtn.addEventListener("click", () => {
      state.sortMode = state.sortMode === "DEFAULT" ? "AZ" : state.sortMode === "AZ" ? "ZA" : "DEFAULT";
      saveView();
      refreshUI();
    });
    searchRow.appendChild(searchWrap);
    searchRow.appendChild(sortBtn);
    const pillsContainer = document.createElement("div");
    pillsContainer.id = "gcm-pills-container";
    pillsContainer.className = "gcm-folders-pills";
    const footer = document.createElement("div");
    footer.className = "gcm-panel-footer";
    const scrollBtn = document.createElement("button");
    scrollBtn.id = "gcm-autoscroll-btn";
    scrollBtn.className = "gcm-footer-btn";
    setButtonIconText(scrollBtn, ICONS.chevronsDown, t().loadAllBtn);
    scrollBtn.title = t().loadAllTitle;
    scrollBtn.addEventListener("click", toggleAutoScrollHistory);
    const backupBtn = document.createElement("button");
    backupBtn.className = "gcm-footer-btn";
    setButtonIconText(backupBtn, ICONS.download, t().backupBtn);
    backupBtn.title = t().backupTitle;
    backupBtn.addEventListener("click", exportBackupConfig);
    const restoreBtn = document.createElement("button");
    restoreBtn.className = "gcm-footer-btn";
    setButtonIconText(restoreBtn, ICONS.upload, t().importBtn);
    restoreBtn.title = t().importTitle;
    restoreBtn.addEventListener("click", importBackupConfig);
    const promptsBtn = document.createElement("button");
    promptsBtn.id = "gcm-prompts-btn";
    promptsBtn.className = "gcm-footer-btn";
    setButtonIconText(promptsBtn, ICONS.zap, t().promptsBtn);
    promptsBtn.title = t().promptsBtnTitle;
    promptsBtn.addEventListener("click", openPromptsModal);
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
    const pill = document.createElement("div");
    pill.className = "gcm-folder-pill" + (state.activeFolderFilter === id ? " active" : "");
    if (Array.isArray(keywords) && keywords.length > 0) {
      pill.title = `${t().autoRulesPrefix}: ${keywords.join(", ")}`;
    }
    if (id === "PROTECTED") {
      pill.appendChild(createIconElement(ICONS.lockSmall));
    } else if (color) {
      const dot = document.createElement("span");
      dot.className = "gcm-folder-dot";
      dot.style.backgroundColor = color;
      dot.style.color = color;
      pill.appendChild(dot);
    }
    const label = document.createElement("span");
    label.textContent = name;
    pill.appendChild(label);
    const badgeCount = document.createElement("span");
    badgeCount.className = "gcm-folder-count";
    badgeCount.textContent = String(count);
    pill.appendChild(badgeCount);
    if (deletable) {
      const del = document.createElement("span");
      del.className = "gcm-folder-del";
      del.textContent = "×";
      del.title = t().delFolderTitle(name);
      del.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteFolderById(id);
      });
      pill.appendChild(del);
    }
    pill.addEventListener("click", () => {
      state.userClickedFilterInSession = id !== "ALL";
      state.activeFolderFilter = id;
      saveView();
      refreshUI();
    });
    return pill;
  }

  // src/main.js
  function scheduleRefresh(delay = 120) {
    if (state.refreshDebounceTimer) return;
    state.refreshDebounceTimer = setTimeout(() => {
      state.refreshDebounceTimer = null;
      if (!document.hidden) {
        requestAnimationFrame(refreshUI);
      }
    }, delay);
  }
  function refreshUI() {
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
  function init() {
    if (!document.body) {
      setTimeout(init, 300);
      return;
    }
    registerGlobalListeners();
    setupDelegatedSidebarListener();
    setTimeout(refreshUI, 800);
    const observer = new MutationObserver((mutations) => {
      if (document.hidden) return;
      const isOwnNode = (n) => {
        const el2 = n.nodeType === 1 ? n : n.parentElement;
        return !!el2 && !!el2.closest('[id^="gcm-"], [class*="gcm-"]');
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
    if (getSidebarElement()) {
      startObserving();
    } else {
      let attempts = 0;
      const waitForSidebar = setInterval(() => {
        attempts++;
        if (getSidebarElement() || attempts >= 25) {
          clearInterval(waitForSidebar);
          startObserving();
        }
      }, 200);
    }
    setInterval(() => {
      if (!document.hidden) {
        if (observedTarget) {
          const sidebar = getSidebarElement();
          if (!observedTarget.isConnected || sidebar && sidebar !== observedTarget) {
            startObserving();
          }
        }
        scheduleRefresh(0);
      }
    }, 4e3);
  }

  // src/content.js
  if (PLATFORM_KEY) {
    init();
  }
})();
