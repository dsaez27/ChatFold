import { CONV_LINK_SELECTOR, P, PLATFORM_KEY, SELECTORS } from './platform.js';
import { state } from './state.js';

// Cachés en memoria O(1)
const rowIdCache = new WeakMap();

const rowTitleCache = new WeakMap();

export function parseConvId(el) {
  if (!el) return null;
  const href =
    el.getAttribute?.('href') ||
    el.querySelector?.(CONV_LINK_SELECTOR)?.getAttribute('href') ||
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
  if (title) rowTitleCache.set(row, { id: convId, title });
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
  const links = container.querySelectorAll(CONV_LINK_SELECTOR);
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

export function getConversationRows() {
  const sidebar = getSidebarElement();
  const root = sidebar || (PLATFORM_KEY !== 'gemini' ? document : null);
  if (!root) return [];

  const candidates = root.querySelectorAll(SELECTORS.conversationLinks);
  const rows = [];
  const seenRows = new Set();

  for (let i = 0; i < candidates.length; i++) {
    const el = candidates[i];
    // Descartar cualquier enlace que esté dentro del área de mensajes principal (<main>)
    if (PLATFORM_KEY !== 'gemini' && el.closest('main')) continue;

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

export function findRowById(targetId) {
  const rows = getConversationRows();
  return rows.find((item) => item.id === targetId) || null;
}
