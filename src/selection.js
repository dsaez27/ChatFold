import { toggleAutoScrollHistory } from './autoscroll.js';
import { openCreateFolderModal, updateStatusToast } from './dialogs.js';
import { ICONS, setButtonIconText } from './icons.js';
import { refreshUI } from './main.js';
import { getSidebarElement } from './sidebar.js';
import { selectedMap, state, t } from './state.js';
import { saveFolderData } from './storage.js';
import { updateToolbarState } from './toolbar.js';

export function toggleProtectSelected() {
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
    3000
  );
}

function clearAllSelections() {
  state.autoSelectAllMode = false;
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

export function toggleMoveToFolderPopover(anchorBtn) {
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

  state.folderState.folders.forEach((f) => {
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
  setButtonIconText(removeBtn, ICONS.folderMinus, t().removeFromFolder);
  removeBtn.addEventListener('click', () => {
    assignSelectedToFolder(null);
    popover.remove();
  });
  popover.appendChild(removeBtn);

  const createNewBtn = document.createElement('button');
  createNewBtn.className = 'gcm-popover-item';
  createNewBtn.style.color = '#a8c7fa';
  setButtonIconText(createNewBtn, ICONS.folderPlus, t().createNewFolderMenu);
  createNewBtn.addEventListener('click', () => {
    popover.remove();
    openCreateFolderModal((newFolder) => {
      assignSelectedToFolder(newFolder.id);
    });
  });
  popover.appendChild(createNewBtn);

  document.body.appendChild(popover);
  const popRect = popover.getBoundingClientRect();
  const clampedLeft = Math.min(Math.max(12, rect.left - 30), Math.max(12, window.innerWidth - popRect.width - 12));
  const preferTop = rect.bottom + 8 + popRect.height > window.innerHeight - 12 && rect.top - popRect.height - 8 >= 12
    ? rect.top - popRect.height - 8
    : Math.min(rect.bottom + 8, Math.max(12, window.innerHeight - popRect.height - 12));
  popover.style.left = `${clampedLeft}px`;
  popover.style.top = `${preferTop}px`;

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

export function setupDelegatedSidebarListener() {
  const stopPressOnControls = (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.classList.contains('gcm-checkbox') || target.closest('.gcm-lock-icon')) {
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

      const lockTarget = target.closest('.gcm-lock-icon');
      if (lockTarget) {
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        e.preventDefault();
        const id = lockTarget.dataset.convId;
        if (id) {
          delete state.folderState.protectedIds[id];
          saveFolderData(state.folderState);
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
        if (!willBeChecked) {
          state.autoSelectAllMode = false;
          if (state.autoScrollActive) state.autoScrollActive = false;
        }
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

        if (e.shiftKey && state.lastCheckedCheckbox && state.lastCheckedCheckbox !== checkbox) {
          const start = visibleCheckboxes.indexOf(state.lastCheckedCheckbox);
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

        state.lastCheckedCheckbox = checkbox;
        updateToolbarState();
      }
    },
    true
  );
}

export function injectCheckboxes(items) {
  for (let i = 0; i < items.length; i++) {
    const { id, row } = items[i];
    if (!row.classList.contains('gcm-chat-row')) {
      row.classList.add('gcm-chat-row');
    }
    if (state.autoSelectAllMode && !row.classList.contains('gcm-hidden-by-filter') && !selectedMap.has(id)) {
      selectedMap.set(id, { id });
    }
    const isSelected = selectedMap.has(id);

    const existingCb = row.querySelector('.gcm-checkbox');
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

export function toggleSelectAll(checked) {
  state.autoSelectAllMode = !!checked;
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
  if (checked) {
    if (!state.autoScrollActive) {
      toggleAutoScrollHistory({ silent: true });
    }
  } else if (state.autoScrollActive) {
    state.autoScrollActive = false;
    refreshUI();
  }
}
