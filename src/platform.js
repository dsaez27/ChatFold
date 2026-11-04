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
  if (host.endsWith('claude.ai')) {
    return 'claude';
  }
  if (host.endsWith('deepseek.com')) {
    return 'deepseek';
  }
  if (host.endsWith('opencode.ai')) {
    return 'opencode';
  }
  return null;
}

/** 'gemini' | 'chatgpt' | 'claude' | 'deepseek' | 'opencode' | null */
export const PLATFORM_KEY = detectPlatform();

/** Selector universal de enlaces a conversaciones y tareas remotas en todas las plataformas soportadas. */
export const CONV_LINK_SELECTOR =
  'a[href*="/app/"], a[href*="/c/"], a[href*="/codex/tasks/"], a[href*="/codex"], a[href*="/tasks/"], a[href*="/chat/"], a[href*="/session/"], [data-gcm-conv-id]';

// Configuración específica por plataforma (Gemini, ChatGPT, Claude, DeepSeek y OpenCode)
export const PLATFORMS = {
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
      activeMessages: 'user-query, model-response, .query-text, .model-response-text, message-content',
      promptInput: 'rich-textarea div[contenteditable="true"], div.ql-editor[contenteditable="true"], div[contenteditable="true"], textarea'
    }
  },
  chatgpt: {
    name: 'ChatGPT',
    storageKey: 'gcm_chatgpt_folders_data_v1',
    legacyStorageKey: null,
    convHrefRegex: /\/(?:c|codex\/tasks|codex\/cloud|codex|tasks|t|s)\/([0-9a-zA-Z_-]{4,})/,
    buildUrl: (id) => (id.startsWith('task_') ? `https://chatgpt.com/codex/tasks/${id}` : `https://chatgpt.com/c/${id}`),
    selectors: {
      sidebar: '[data-testid="stage-thread-flyout"], nav[aria-label], nav, aside, .bg-token-sidebar-surface-primary',
      conversationLinks:
        '[data-gcm-conv-id], [data-sidebar-chatgpt-conversation-key] a[href*="/c/"], [data-testid^="history-item"] a[href*="/c/"], nav a[href*="/c/"], aside a[href*="/c/"], a[href*="/c/"], a[href*="/codex/tasks/"], a[href*="/codex"], a[href*="/tasks/"], [data-sidebar-chatgpt-conversation-key], [data-testid^="history-item"]',
      rowClosest: [
        '[data-gcm-conv-id]',
        '[data-sidebar-chatgpt-conversation-key]',
        'li[data-testid^="history-item"]',
        'div[data-testid^="history-item"]',
        'li',
        'div.group',
        'a.__menu-item',
        'div.__menu-item',
        '[data-sidebar-item="true"]',
        'a[href*="/codex/tasks/"]',
        'a[href*="/codex"]',
        'a[href*="/tasks/"]'
      ],
      optionsTrigger:
        'button[data-testid^="history-item-"][data-testid$="-options"], button[data-testid*="options"], button[aria-haspopup="menu"], button[aria-label*="Options"], button[aria-label*="Opciones"], button[aria-label*="More"], button[aria-label*="Más"]',
      menuPanel: '[role="menu"], [data-radix-menu-content]',
      deleteMenuItem:
        '[role="menuitem"][data-testid="delete-chat-menu-item"], [role="menuitem"][data-testid*="delete"], [role="menuitem"].text-danger, [role="menuitem"][class*="text-token-text-error"], [role="menuitem"][class*="text-red"], [role="menuitem"]',
      confirmDialog: '[role="dialog"], [data-testid="modal-delete-conversation-confirmation"]',
      confirmButton:
        'button[data-testid="delete-conversation-confirm-button"], button.btn-danger, button[class*="btn-danger"], button[class*="bg-red"], button[class*="bg-token-bg-danger"], button[type="submit"]',
      activeMessages: '[data-message-author-role="user"], [data-message-author-role="assistant"]',
      promptInput: '#prompt-textarea, div[contenteditable="true"]#prompt-textarea, textarea[data-id], textarea, div[contenteditable="true"]'
    }
  },
  claude: {
    name: 'Claude',
    storageKey: 'gcm_claude_folders_data_v1',
    legacyStorageKey: null,
    convHrefRegex: /\/chat\/([0-9a-zA-Z_-]{4,})/,
    buildUrl: (id) => `https://claude.ai/chat/${id}`,
    selectors: {
      sidebar: 'nav[aria-label], nav, aside, [data-testid*="sidebar"]',
      conversationLinks: 'nav a[href*="/chat/"], aside a[href*="/chat/"], a[href*="/chat/"]',
      rowClosest: ['li', '[data-testid*="chat-item"]', 'div.group', 'a[href*="/chat/"]'],
      optionsTrigger:
        'button[aria-haspopup="menu"], button[data-testid*="menu"], button[data-testid*="options"], button[aria-label*="More"], button[aria-label*="Más"], button[aria-label*="Options"]',
      menuPanel: '[role="menu"], [data-radix-menu-content]',
      deleteMenuItem:
        '[role="menuitem"][class*="danger"], [role="menuitem"][class*="red"], [role="menuitem"][class*="error"], [role="menuitem"]',
      confirmDialog: '[role="dialog"], [role="alertdialog"]',
      confirmButton:
        'button[data-testid*="delete"], button[class*="danger"], button[class*="red"], button[type="submit"]',
      activeMessages: '[data-testid*="user-message"], .font-claude-message, [data-is-streaming], [data-message-author-role]',
      promptInput: 'div.ProseMirror[contenteditable="true"], fieldset div[contenteditable="true"], div[contenteditable="true"], textarea'
    }
  },
  deepseek: {
    name: 'DeepSeek',
    storageKey: 'gcm_deepseek_folders_data_v1',
    legacyStorageKey: null,
    convHrefRegex: /\/(?:a\/chat\/s|chat)\/([0-9a-zA-Z_-]{4,})/,
    buildUrl: (id) => `https://chat.deepseek.com/a/chat/s/${id}`,
    selectors: {
      sidebar: 'nav, aside, [class*="sidebar"], .ds-scroll-area',
      conversationLinks: 'a[href*="/chat/"], [data-chat-id] a',
      rowClosest: ['li', '[data-chat-id]', 'div[class*="chat-item"]', 'a[href*="/chat/"]'],
      optionsTrigger:
        'button[aria-haspopup="menu"], [role="button"][aria-haspopup="menu"], button[aria-label*="More"], button[aria-label*="options"], button[aria-label*="Opciones"]',
      menuPanel: '[role="menu"], .ds-dropdown-menu',
      deleteMenuItem: '[role="menuitem"], .ds-dropdown-menu-item',
      confirmDialog: '[role="dialog"], .ds-modal-content',
      confirmButton: 'button.ds-button--error, button[class*="danger"], button[class*="error"], button[type="submit"]',
      activeMessages: '.ds-markdown, [class*="message-content"], [data-message-author-role]',
      promptInput: 'textarea#chat-input, textarea, div[contenteditable="true"]'
    }
  },
  opencode: {
    name: 'OpenCode',
    storageKey: 'gcm_opencode_folders_data_v1',
    legacyStorageKey: null,
    convHrefRegex: /\/(?:chat|session|c)\/([0-9a-zA-Z_-]{4,})/,
    buildUrl: (id) => `https://opencode.ai/chat/${id}`,
    selectors: {
      sidebar: 'nav, aside, [data-sidebar], [class*="sidebar"]',
      conversationLinks: 'a[href*="/chat/"], a[href*="/session/"], a[href*="/c/"]',
      rowClosest: ['li', '[data-session-id]', 'div.group', 'a[href*="/chat/"]', 'a[href*="/session/"]'],
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

/** Configuración de la plataforma actual (con Gemini como valor por defecto para que el módulo cargue siempre). */
export const P = PLATFORMS[PLATFORM_KEY] || PLATFORMS.gemini;

export const SELECTORS = P.selectors;

export const PRESET_COLORS = ['#4285f4', '#34a853', '#fbbc04', '#ea4335', '#a142f4', '#24c1e0', '#ff6d00'];
