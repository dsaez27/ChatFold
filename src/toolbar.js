import { deleteSelectedChats, stopDeletion } from './deletion.js';
import { ICONS, createIconElement, setButtonIconText } from './icons.js';
import { exportSelectedConversationsToMarkdown } from './markdown-export.js';
import { toggleMoveToFolderPopover, toggleProtectSelected, toggleSelectAll } from './selection.js';
import { saveView, selectedMap, state, t } from './state.js';

export function createToolbar() {
  if (document.getElementById('gcm-toolbar')) return;

  const toolbar = document.createElement('div');
  toolbar.id = 'gcm-toolbar';

  const selectAllWrap = document.createElement('label');
  selectAllWrap.className = 'gcm-select-all-wrap';
  selectAllWrap.title = t().selectAllTitle;

  const selectAllCb = document.createElement('input');
  selectAllCb.type = 'checkbox';
  selectAllCb.id = 'gcm-select-all';
  selectAllCb.className = 'gcm-checkbox';
  selectAllCb.style.margin = '0';
  selectAllCb.addEventListener('change', (e) => toggleSelectAll(e.target.checked));

  const selectAllText = document.createElement('span');
  selectAllText.textContent = t().selectAll;

  selectAllWrap.appendChild(selectAllCb);
  selectAllWrap.appendChild(selectAllText);

  const folderBtn = document.createElement('button');
  folderBtn.id = 'gcm-folder-btn';
  folderBtn.className = 'gcm-btn gcm-btn-folder';
  folderBtn.disabled = true;
  setButtonIconText(folderBtn, ICONS.folder, t().folderBtn(0));
  folderBtn.title = t().folderBtnTitle;
  folderBtn.addEventListener('click', () => toggleMoveToFolderPopover(folderBtn));

  const protectBtn = document.createElement('button');
  protectBtn.id = 'gcm-protect-btn';
  protectBtn.className = 'gcm-btn gcm-btn-neutral';
  protectBtn.disabled = true;
  setButtonIconText(protectBtn, ICONS.lock, t().protectBtn);
  protectBtn.title = t().protectBtnTitle;
  protectBtn.addEventListener('click', toggleProtectSelected);

  const exportBtn = document.createElement('button');
  exportBtn.id = 'gcm-export-btn';
  exportBtn.className = 'gcm-btn gcm-btn-neutral';
  setButtonIconText(exportBtn, ICONS.fileText, t().exportBtn);
  exportBtn.title = t().exportBtnTitle;
  exportBtn.addEventListener('click', exportSelectedConversationsToMarkdown);

  const deleteBtn = document.createElement('button');
  deleteBtn.id = 'gcm-delete-btn';
  deleteBtn.className = 'gcm-btn gcm-btn-danger';
  deleteBtn.disabled = true;
  setButtonIconText(deleteBtn, ICONS.trash, t().deleteBtn(0));
  deleteBtn.addEventListener('click', deleteSelectedChats);

  const stopBtn = document.createElement('button');
  stopBtn.id = 'gcm-stop-btn';
  stopBtn.className = 'gcm-btn gcm-btn-stop';
  stopBtn.style.display = 'none';
  setButtonIconText(stopBtn, ICONS.stop, t().stopBtn);
  stopBtn.addEventListener('click', stopDeletion);

  const collapseBtn = document.createElement('button');
  collapseBtn.id = 'gcm-toolbar-toggle';
  collapseBtn.className = 'gcm-toolbar-toggle';
  collapseBtn.addEventListener('click', () => {
    state.toolbarCollapsed = !state.toolbarCollapsed;
    saveView();
    applyToolbarCollapsed();
  });

  toolbar.appendChild(collapseBtn);
  toolbar.appendChild(selectAllWrap);
  toolbar.appendChild(folderBtn);
  toolbar.appendChild(protectBtn);
  toolbar.appendChild(exportBtn);
  toolbar.appendChild(deleteBtn);
  toolbar.appendChild(stopBtn);

  document.body.appendChild(toolbar);
  applyToolbarCollapsed();
}

// Contrae la barra superior a un solo botón (la selección y los datos se conservan).
function applyToolbarCollapsed() {
  const toolbar = document.getElementById('gcm-toolbar');
  const btn = document.getElementById('gcm-toolbar-toggle');
  if (!toolbar || !btn) return;
  toolbar.classList.toggle('gcm-collapsed', state.toolbarCollapsed);
  btn.textContent = '';
  btn.appendChild(createIconElement(state.toolbarCollapsed ? ICONS.menu : ICONS.chevronRight));
  btn.title = state.toolbarCollapsed ? t().toolbarExpandTitle : t().toolbarCollapseTitle;
}

export function updateToolbarState() {
  const folderBtn = document.getElementById('gcm-folder-btn');
  const protectBtn = document.getElementById('gcm-protect-btn');
  const exportBtn = document.getElementById('gcm-export-btn');
  const deleteBtn = document.getElementById('gcm-delete-btn');
  const stopBtn = document.getElementById('gcm-stop-btn');
  const selectAllCb = document.getElementById('gcm-select-all');

  if (!deleteBtn || !stopBtn || !folderBtn) return;

  if (state.deletionInProgress) {
    folderBtn.style.display = 'none';
    if (protectBtn) protectBtn.style.display = 'none';
    if (exportBtn) exportBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
    stopBtn.style.display = 'inline-flex';
    if (selectAllCb) selectAllCb.disabled = true;
  } else {
    folderBtn.style.display = 'inline-flex';
    if (protectBtn) protectBtn.style.display = 'inline-flex';
    if (exportBtn) exportBtn.style.display = 'inline-flex';
    deleteBtn.style.display = 'inline-flex';
    stopBtn.style.display = 'none';
    if (selectAllCb) selectAllCb.disabled = false;

    // El checkbox "Todo" debe reflejar la realidad: si llegó un lote nuevo de chats (carga progresiva)
    // o cambió el filtro, ya no están todos seleccionados.
    if (selectAllCb) {
      const rowCbs = document.querySelectorAll('.gcm-chat-row .gcm-checkbox:not(#gcm-select-all)');
      let visibleTotal = 0;
      let visibleChecked = 0;
      rowCbs.forEach((cb) => {
        const r = cb.closest('.gcm-chat-row') || cb.parentElement;
        if (!r || r.classList.contains('gcm-hidden-by-filter')) return;
        visibleTotal++;
        if (selectedMap.has(cb.dataset.convId)) visibleChecked++;
      });
      const allChecked = visibleTotal > 0 && visibleChecked === visibleTotal;
      if (selectAllCb.checked !== allChecked) selectAllCb.checked = allChecked;
      selectAllCb.classList.toggle('gcm-checked', allChecked);
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
