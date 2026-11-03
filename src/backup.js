import { updateStatusToast } from './dialogs.js';
import { refreshUI } from './main.js';
import { PLATFORM_KEY, PRESET_COLORS } from './platform.js';
import { autoClassifiedVisited, selectedMap, state, t } from './state.js';
import { saveFolderData } from './storage.js';

export function exportBackupConfig() {
  // La posición del panel y la vista actual son locales: no van en el respaldo.
  const { pos: _pos, view: _view, ...backupData } = state.folderState;
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
export function sanitizeMap(src, mapValue) {
  const out = {};
  if (!src || typeof src !== 'object' || Array.isArray(src)) return out;
  for (const key of Object.keys(src)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    const v = mapValue(src[key]);
    if (v !== undefined) out[key] = v;
  }
  return out;
}

export function importBackupConfig() {
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
          state.folderState = {
            lang: parsed.lang === 'en' || parsed.lang === 'es' ? parsed.lang : state.folderState.lang,
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
            pos: state.folderState.pos || null, // la posición del panel es local a esta pantalla
            view: { filter: 'ALL', sort: state.sortMode, toolbarCollapsed: state.toolbarCollapsed }
          };
          state.activeFolderFilter = 'ALL';
          autoClassifiedVisited.clear();
          selectedMap.clear();
          saveFolderData(state.folderState);
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
