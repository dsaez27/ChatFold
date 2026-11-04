import { updateStatusToast } from './dialogs.js';
import { SELECTORS } from './platform.js';
import { state, t } from './state.js';
import { saveFolderData } from './storage.js';

/**
 * Inserta el texto del prompt en el cuadro de entrada del chat activo (compatible con
 * textarea y editores contenteditable de Gemini, ChatGPT, Claude, DeepSeek y OpenCode).
 */
export function insertPromptIntoChat(text) {
  const input = document.querySelector(SELECTORS.promptInput);
  if (!input) {
    try {
      navigator.clipboard?.writeText(text);
    } catch (_) {}
    updateStatusToast(t().toastPromptCopied, null, null, 2800);
    return false;
  }

  input.focus();

  if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
    const existing = input.value ? `${input.value}\n` : '';
    const nextValue = existing + text;
    // Usar el setter nativo para que React/Vue detecten el cambio de estado
    const proto = input.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement?.prototype : window.HTMLInputElement?.prototype;
    const nativeSetter = proto ? Object.getOwnPropertyDescriptor(proto, 'value')?.set : null;
    if (nativeSetter) {
      nativeSetter.call(input, nextValue);
    } else {
      input.value = nextValue;
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  } else {
    // Editor contenteditable (ProseMirror en Claude/ChatGPT, Quill/RichTextarea en Gemini)
    const currentText = (input.textContent || '').trim();
    const nextText = currentText ? `${currentText}\n${text}` : text;
    input.textContent = nextText;
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
  }

  updateStatusToast(t().toastPromptInserted, null, null, 2500);
  return true;
}

export function openPromptsModal() {
  const existing = document.getElementById('gcm-modal-overlay');
  if (existing) existing.remove();

  if (!Array.isArray(state.folderState.prompts)) {
    state.folderState.prompts = t().defaultPrompts.map((p) => ({ ...p }));
  }

  const overlay = document.createElement('div');
  overlay.id = 'gcm-modal-overlay';

  const card = document.createElement('div');
  card.className = 'gcm-modal-card gcm-prompts-modal-card';

  const title = document.createElement('div');
  title.className = 'gcm-modal-title';
  title.textContent = t().modalPromptsTitle;

  const desc = document.createElement('div');
  desc.className = 'gcm-modal-desc';
  desc.textContent = t().modalPromptsDesc;

  const listContainer = document.createElement('div');
  listContainer.className = 'gcm-prompts-list';

  const renderPromptsList = () => {
    listContainer.textContent = '';
    if (state.folderState.prompts.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'gcm-prompts-empty';
      empty.textContent = t().promptsEmpty;
      listContainer.appendChild(empty);
      return;
    }
    state.folderState.prompts.forEach((p) => {
      const item = document.createElement('div');
      item.className = 'gcm-prompt-item';

      const info = document.createElement('div');
      info.className = 'gcm-prompt-info';

      const itemTitle = document.createElement('div');
      itemTitle.className = 'gcm-prompt-item-title';
      itemTitle.textContent = p.title;

      const itemPreview = document.createElement('div');
      itemPreview.className = 'gcm-prompt-item-preview';
      itemPreview.textContent = p.content.trim().slice(0, 110) + (p.content.length > 110 ? '…' : '');

      info.appendChild(itemTitle);
      info.appendChild(itemPreview);

      const itemActions = document.createElement('div');
      itemActions.className = 'gcm-prompt-item-actions';

      const useBtn = document.createElement('button');
      useBtn.className = 'gcm-btn gcm-btn-stop gcm-prompt-use-btn';
      useBtn.textContent = t().insertPromptBtn;
      useBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        overlay.remove();
        insertPromptIntoChat(p.content);
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'gcm-prompt-del-btn';
      delBtn.textContent = '×';
      delBtn.title = t().deletePromptTitle;
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.folderState.prompts = state.folderState.prompts.filter((itemPrompt) => itemPrompt.id !== p.id);
        saveFolderData(state.folderState);
        renderPromptsList();
      });

      itemActions.appendChild(useBtn);
      itemActions.appendChild(delBtn);

      item.addEventListener('click', () => {
        overlay.remove();
        insertPromptIntoChat(p.content);
      });

      item.appendChild(info);
      item.appendChild(itemActions);
      listContainer.appendChild(item);
    });
  };

  renderPromptsList();

  const formBox = document.createElement('div');
  formBox.className = 'gcm-prompt-form';

  const inputTitle = document.createElement('input');
  inputTitle.type = 'text';
  inputTitle.className = 'gcm-modal-input';
  inputTitle.placeholder = t().promptTitlePlaceholder;

  const inputBody = document.createElement('textarea');
  inputBody.className = 'gcm-modal-input gcm-modal-textarea';
  inputBody.placeholder = t().promptBodyPlaceholder;
  inputBody.rows = 3;

  const addPromptBtn = document.createElement('button');
  addPromptBtn.className = 'gcm-btn gcm-btn-folder gcm-add-prompt-submit';
  addPromptBtn.textContent = t().addPromptBtn;
  addPromptBtn.addEventListener('click', () => {
    const newTitle = inputTitle.value.trim();
    const newBody = inputBody.value.trim();
    if (!newTitle || !newBody) {
      (!newTitle ? inputTitle : inputBody).focus();
      return;
    }
    state.folderState.prompts.push({
      id: 'p_' + Date.now().toString(36),
      title: newTitle,
      content: newBody + '\n\n'
    });
    saveFolderData(state.folderState);
    inputTitle.value = '';
    inputBody.value = '';
    renderPromptsList();
  });

  formBox.appendChild(inputTitle);
  formBox.appendChild(inputBody);
  formBox.appendChild(addPromptBtn);

  const actions = document.createElement('div');
  actions.className = 'gcm-modal-actions';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'gcm-btn gcm-btn-cancel';
  closeBtn.textContent = t().cancel;
  closeBtn.addEventListener('click', () => overlay.remove());

  actions.appendChild(closeBtn);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  const onEsc = (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', onEsc);
    }
  };
  document.addEventListener('keydown', onEsc);

  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(listContainer);
  card.appendChild(formBox);
  card.appendChild(actions);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}
