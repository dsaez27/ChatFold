import { I18N, detectInitialLang } from './i18n.js';
import { P } from './platform.js';

// Convierte lo guardado (JSON ya parseado) en un estado válido; descarta datos corruptos.
export function normalizeStoredState(parsed, defaultLang) {
  const isPlainObj = (o) => o && typeof o === 'object' && !Array.isArray(o);
  const lang = parsed.lang === 'en' || parsed.lang === 'es' ? parsed.lang : defaultLang;
  const fallbackPrompts = (I18N[lang]?.defaultPrompts || I18N.es.defaultPrompts).map((p) => ({ ...p }));
  return {
    lang,
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
    prompts: Array.isArray(parsed.prompts)
      ? parsed.prompts
          .filter((p) => p && typeof p.id === 'string' && typeof p.title === 'string' && typeof p.content === 'string')
          .map((p) => ({
            id: p.id,
            title: p.title,
            content: p.content
          }))
      : fallbackPrompts,
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

export function loadFolderData() {
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
    prompts: I18N[defaultLang].defaultPrompts.map((p) => ({ ...p })),
    assignments: {},
    protectedIds: {},
    minimized: false,
    pos: null,
    view: { filter: 'ALL', sort: 'DEFAULT', toolbarCollapsed: false }
  };
  saveFolderData(initial);
  return initial;
}

export function saveFolderData(data) {
  try {
    localStorage.setItem(P.storageKey, JSON.stringify(data));
  } catch (_) {}

  try {
    if (typeof chrome !== 'undefined' && chrome.storage?.sync?.set) {
      const { pos: _pos, view: _view, ...syncPayload } = data;
      chrome.storage.sync.set({ [P.storageKey]: syncPayload });
    }
  } catch (_) {}
}

/**
 * Sincroniza bidireccionalmente con `chrome.storage.sync` para compartir carpetas,
 * asignaciones, protegidos y prompts entre dispositivos con la cuenta del navegador.
 */
export function initCloudSync(getState, applyIncoming) {
  try {
    if (typeof chrome === 'undefined' || !chrome.storage?.sync?.get) return;

    chrome.storage.sync.get([P.storageKey], (res) => {
      try {
        const cloudData = res?.[P.storageKey];
        const current = getState();
        if (cloudData && typeof cloudData === 'object') {
          const merged = normalizeStoredState(
            { ...cloudData, pos: current.pos, view: current.view },
            current.lang
          );
          localStorage.setItem(P.storageKey, JSON.stringify(merged));
          applyIncoming(merged);
        } else {
          const { pos: _pos, view: _view, ...syncPayload } = current;
          chrome.storage.sync.set({ [P.storageKey]: syncPayload });
        }
      } catch (_) {}
    });

    if (chrome.storage.onChanged?.addListener) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'sync' || !changes[P.storageKey]?.newValue) return;
        try {
          const current = getState();
          const merged = normalizeStoredState(
            { ...changes[P.storageKey].newValue, pos: current.pos, view: current.view },
            current.lang
          );
          localStorage.setItem(P.storageKey, JSON.stringify(merged));
          applyIncoming(merged);
        } catch (_) {}
      });
    }
  } catch (_) {}
}
