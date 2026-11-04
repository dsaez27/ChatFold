import { refreshUI } from './main.js';
import { isSingleRowContainer } from './sidebar.js';
import { autoClassifiedVisited, saveView, state, t } from './state.js';
import { saveFolderData } from './storage.js';

export function runAutoClassification(items) {
  let changed = false;
  for (let i = 0; i < items.length; i++) {
    const { id, title } = items[i];
    if (autoClassifiedVisited.has(id) || state.folderState.assignments[id]) {
      autoClassifiedVisited.add(id);
      continue;
    }

    // Si el título aún no cargó, no marcar como visitada: se reintentará en el siguiente refresco.
    const lowerTitle = (title || '').toLowerCase();
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

export function applyFolderBadgesAndFilter(items) {
  const folderLookup = new Map(state.folderState.folders.map((f) => [f.id, f]));
  const cleanQuery = state.searchQuery.trim().toLowerCase();

  for (let i = 0; i < items.length; i++) {
    const { id, row, title } = items[i];
    const assignedFolderId = state.folderState.assignments[id];
    const folder = assignedFolderId ? folderLookup.get(assignedFolderId) : null;
    const isProtected = !!state.folderState.protectedIds[id];

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

        badge.style.background = `linear-gradient(135deg, ${folder.color}55 0%, var(--gcm-badge-bg) 88%), var(--gcm-badge-bg)`;
        badge.style.color = 'var(--gcm-text-primary)';
        badge.style.borderColor = folder.color;
      }
    } else if (badge) {
      badge.remove();
    }

    let visible = true;
    if (state.activeFolderFilter === 'UNASSIGNED') {
      visible = !folder;
    } else if (state.activeFolderFilter === 'PROTECTED') {
      visible = isProtected;
    } else if (state.activeFolderFilter !== 'ALL') {
      visible = folder && folder.id === state.activeFolderFilter;
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

  if (state.sortMode === 'DEFAULT') {
    for (let i = 0; i < items.length; i++) {
      const r = items[i].row;
      if (r.style.order) r.style.order = '';
      if (r.parentElement?.classList.contains('gcm-sort-container')) {
        r.parentElement.classList.remove('gcm-sort-container');
      }
    }
  } else {
    const sorted = [...items].sort((a, b) => {
      const cmp = (a.title || '').localeCompare(b.title || '', state.folderState.lang, { sensitivity: 'base' });
      return state.sortMode === 'AZ' ? cmp : -cmp;
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

export function deleteFolderById(folderId) {
  state.folderState.folders = state.folderState.folders.filter((f) => f.id !== folderId);
  for (const convId of Object.keys(state.folderState.assignments)) {
    if (state.folderState.assignments[convId] === folderId) {
      delete state.folderState.assignments[convId];
    }
  }
  if (state.activeFolderFilter === folderId) {
    state.activeFolderFilter = 'ALL';
  }
  saveView();
  refreshUI();
}
