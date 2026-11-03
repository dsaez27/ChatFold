// Única fuente de verdad de la versión: el manifest (fuera de la extensión, p. ej. en pruebas, se usa un valor neutro).
export const APP_VERSION = (typeof chrome !== 'undefined' && chrome.runtime?.getManifest?.().version) || '0.0.0';

export function detectPlatform() {
  const host = location.hostname;
  if (host.endsWith('chatgpt.com') || host.endsWith('chat.openai.com')) {
    return 'chatgpt';
  }
  if (host.endsWith('gemini.google.com')) {
    return 'gemini';
  }
  return null;
}

/** 'gemini' | 'chatgpt' | null (null si la página no es una de las plataformas soportadas). */
export const PLATFORM_KEY = detectPlatform();

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

/** Configuración de la plataforma actual (con Gemini como valor por defecto para que el módulo cargue siempre). */
export const P = PLATFORMS[PLATFORM_KEY] || PLATFORMS.gemini;

export const SELECTORS = P.selectors;

export const PRESET_COLORS = ['#4285f4', '#34a853', '#fbbc04', '#ea4335', '#a142f4', '#24c1e0', '#ff6d00'];
