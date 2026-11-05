import { CONV_LINK_SELECTOR, P, PLATFORM_KEY, SELECTORS } from './platform.js';
import { state } from './state.js';

// Cachés en memoria O(1)
const rowIdCache = new WeakMap();

const rowTitleCache = new WeakMap();

const TASK_ID_RE = /\b(task_[0-9a-zA-Z_-]{5,})\b/;
const UUID_RE = /\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b/i;

const CHATGPT_STATIC_LABELS = new Set([
  'chat nuevo',
  'new chat',
  'buscar chats',
  'search chats',
  'imágenes',
  'imagenes',
  'images',
  'aplicaciones',
  'apps',
  'codex',
  'gpt',
  'gpts',
  'explorar gpt',
  'explore gpts',
  'proyectos',
  'projects',
  'nuevo proyecto',
  'new project',
  'tus chats',
  'your chats',
  'biblioteca',
  'library',
  'sora',
  'hoy',
  'today',
  'ayer',
  'yesterday',
  'últimos 7 días',
  'previous 7 days',
  'últimos 30 días',
  'previous 30 days'
]);

function slugifyTitleForTaskId(title) {
  const base = (title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 36);
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  }
  return `task_cloud_${base || 'item'}_${hash.toString(36)}`;
}

export function parseConvId(el) {
  if (!el) return null;

  const href =
    el.getAttribute?.('href') ||
    el.querySelector?.(CONV_LINK_SELECTOR)?.getAttribute?.('href') ||
    el.querySelector?.('a[href]')?.getAttribute?.('href') ||
    '';
  const cached = rowIdCache.get(el);
  if (cached && cached.href === href && href) return cached.id;

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
    const taskMatch = TASK_ID_RE.exec(href);
    if (taskMatch) {
      rowIdCache.set(el, { href, id: taskMatch[1] });
      return taskMatch[1];
    }
    const uuidMatch = UUID_RE.exec(href);
    if (uuidMatch) {
      rowIdCache.set(el, { href, id: uuidMatch[1] });
      return uuidMatch[1];
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
  const keyHolder =
    (el.hasAttribute?.('data-sidebar-chatgpt-conversation-key') ? el : null) ||
    el.closest?.('[data-sidebar-chatgpt-conversation-key]') ||
    el.querySelector?.('[data-sidebar-chatgpt-conversation-key]');
  if (keyHolder) {
    const key = keyHolder.getAttribute('data-sidebar-chatgpt-conversation-key');
    if (key) return key;
  }
  const testIdAttr =
    el.getAttribute?.('data-testid') ||
    el.closest?.('[data-testid]')?.getAttribute('data-testid') ||
    '';
  if (testIdAttr) {
    const tm = TASK_ID_RE.exec(testIdAttr) || UUID_RE.exec(testIdAttr);
    if (tm) return tm[1];
  }
  const bridgedId =
    el.getAttribute?.('data-gcm-conv-id') ||
    el.closest?.('[data-gcm-conv-id]')?.getAttribute('data-gcm-conv-id') ||
    el.querySelector?.('[data-gcm-conv-id]')?.getAttribute('data-gcm-conv-id') ||
    '';
  if (bridgedId) return bridgedId;
  return null;
}

export function extractConvTitle(row, convId) {
  // La fila puede ser reutilizada por el framework para otra conversación: el caché se valida por id.
  const cached = rowTitleCache.get(row);
  if (cached && cached.id === convId) return cached.title;

  const linkEl =
    row.querySelector?.('.conversation-title') ||
    row.querySelector?.('[dir="auto"]') ||
    row.querySelector?.(CONV_LINK_SELECTOR) ||
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
  if (title && convId) rowTitleCache.set(row, { id: convId, title });
  return title;
}

export function getSidebarElement() {
  if (
    state.cachedSidebarEl &&
    state.cachedSidebarEl.isConnected &&
    state.cachedSidebarEl.querySelector(SELECTORS.conversationLinks)
  ) {
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

export function isSingleRowContainer(container) {
  if (!container || container === document.body) return false;
  const tag = container.tagName;
  if (tag === 'NAV' || tag === 'ASIDE' || tag === 'MAIN' || tag === 'OL' || tag === 'UL' || tag === 'SECTION') {
    return false;
  }
  if (container.id === 'history' || container.getAttribute?.('data-testid') === 'stage-thread-flyout') {
    return false;
  }
  const links = container.querySelectorAll(CONV_LINK_SELECTOR);
  return links.length <= 1;
}

function findRowContainer(el) {
  for (let i = 0; i < SELECTORS.rowClosest.length; i++) {
    const match = el.closest(SELECTORS.rowClosest[i]);
    if (match && isSingleRowContainer(match)) return match;
  }
  return el;
}

function hasTrailingIconAfterText(el) {
  const firstSvg = el.querySelector?.('svg');
  if (!firstSvg) return false;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.nodeValue && node.nodeValue.trim().length >= 2) {
      // 4 === Node.DOCUMENT_POSITION_FOLLOWING (el SVG aparece después del texto del título, como el ícono de nube ☁️)
      return Boolean(node.compareDocumentPosition(firstSvg) & 4);
    }
    node = walker.nextNode();
  }
  return false;
}

function isLikelyChatGptCloudRow(el, historyContainers) {
  if (!el || el.nodeType !== 1) return false;
  if (el.closest('main') || el.closest('[id^="gcm-"]')) return false;
  if (!isSingleRowContainer(el)) return false;
  if (el.querySelector(CONV_LINK_SELECTOR)) return false;
  if (el.querySelector('.__menu-item, [data-sidebar-item="true"], [data-testid^="history-item"], ol, ul, nav, aside')) {
    return false;
  }

  const href = (el.getAttribute?.('href') || el.querySelector?.('a[href]')?.getAttribute?.('href') || '').trim();
  if (
    href === '/' ||
    href === '/gpts' ||
    href === '/images' ||
    href === '/codex' ||
    href === '/library' ||
    href === '/projects'
  ) {
    return false;
  }

  const title = extractConvTitle(el, '');
  if (!title || title.length < 2 || title.length > 160 || title.includes('\n')) return false;
  if (CHATGPT_STATIC_LABELS.has(title.toLowerCase())) return false;

  const isMenuItem =
    el.classList?.contains('__menu-item') ||
    el.getAttribute?.('data-sidebar-item') === 'true' ||
    (el.getAttribute?.('data-testid') || '').startsWith('history-item');
  const inHistoryList = historyContainers.has(el.parentElement);

  if ((isMenuItem || inHistoryList) && hasTrailingIconAfterText(el)) {
    return true;
  }
  return false;
}

export function getConversationRows() {
  const sidebar = getSidebarElement();
  // En ChatGPT puede haber múltiples contenedores laterales (<nav>, <aside>, flyout de proyectos/tareas):
  // consultar en `document` (excluyendo <main> y nodos propios de ChatFold) garantiza detectar todos los chats.
  const root = PLATFORM_KEY === 'chatgpt' ? document : sidebar || (PLATFORM_KEY !== 'gemini' ? document : null);
  if (!root) return [];

  const candidates = root.querySelectorAll(SELECTORS.conversationLinks);
  const rows = [];
  const seenRows = new Set();
  const seenIds = new Set();
  const historyContainers = new Set();

  for (let i = 0; i < candidates.length; i++) {
    const el = candidates[i];
    // Descartar cualquier enlace que esté dentro del área de mensajes principal (<main>) o de la UI de ChatFold
    if (PLATFORM_KEY !== 'gemini' && el.closest('main')) continue;
    if (el.closest('[id^="gcm-"]')) continue;

    const id = parseConvId(el);
    if (!id || seenIds.has(id)) continue;

    const row = findRowContainer(el);
    if (!isSingleRowContainer(row)) continue;

    if (!seenRows.has(row)) {
      seenRows.add(row);
      seenIds.add(id);
      if (row.parentElement) historyContainers.add(row.parentElement);
      rows.push({
        id,
        row,
        link: el,
        title: extractConvTitle(row, id)
      });
    }
  }

  // En ChatGPT: detectar también las tareas en la nube de Codex (filas con ícono de nube ☁️ a la derecha
  // que React renderiza sin atributo href estándar).
  if (PLATFORM_KEY === 'chatgpt') {
    const cloudSelector =
      'nav .__menu-item, aside .__menu-item, nav [data-sidebar-item="true"], aside [data-sidebar-item="true"], nav [data-testid^="history-item"], aside [data-testid^="history-item"]';
    const extraCandidates = Array.from(root.querySelectorAll(cloudSelector));
    for (const container of historyContainers) {
      if (container && container.children) {
        for (const child of container.children) {
          extraCandidates.push(child);
        }
      }
    }

    for (let i = 0; i < extraCandidates.length; i++) {
      const el = extraCandidates[i];
      const row = findRowContainer(el);
      if (seenRows.has(row)) continue;
      if (!isLikelyChatGptCloudRow(row, historyContainers)) continue;

      const title = extractConvTitle(row, '');
      let id = parseConvId(row) || slugifyTitleForTaskId(title);
      if (seenIds.has(id)) {
        let suffix = 2;
        while (seenIds.has(`${id}_${suffix}`)) suffix++;
        id = `${id}_${suffix}`;
      }
      row.setAttribute('data-gcm-conv-id', id);
      row.setAttribute('data-gcm-task', '1');

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

export function findRowById(targetId) {
  const rows = getConversationRows();
  return rows.find((item) => item.id === targetId) || null;
}
