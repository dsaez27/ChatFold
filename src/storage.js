import { I18N, detectInitialLang } from './i18n.js';
import { P } from './platform.js';

// Convierte lo guardado (JSON ya parseado) en un estado válido; descarta datos corruptos.
export function normalizeStoredState(parsed, defaultLang) {
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
}
