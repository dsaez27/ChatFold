import { updateStatusToast } from './dialogs.js';
import { P, PLATFORM_KEY, SELECTORS } from './platform.js';
import { getConversationRows } from './sidebar.js';
import { selectedMap, state, t } from './state.js';

export function exportSelectedConversationsToMarkdown() {
  const items = getConversationRows();
  const selectedIds = Array.from(selectedMap.keys());
  const folderLookup = new Map(state.folderState.folders.map((f) => [f.id, f.name]));

  let markdown = `# ${t().mdHeader}\n`;
  markdown += `${t().mdDate}: ${new Date().toLocaleString()}\n\n`;

  // Quedarse solo con el elemento más externo de cada mensaje (evita duplicados por anidamiento
  // sin descartar mensajes distintos que casualmente tengan el mismo texto).
  const allMessages = Array.from(document.querySelectorAll(SELECTORS.activeMessages));
  const messages = allMessages.filter((m) => !allMessages.some((o) => o !== m && o.contains(m)));

  if (selectedIds.length > 0) {
    markdown += `## ${t().mdSelectedIndex(selectedIds.length)}\n\n`;
    selectedIds.forEach((id, idx) => {
      const rowObj = items.find((it) => it.id === id);
      const title = (rowObj?.title || id).replace(/[[\]\r\n]/g, ' ').trim();
      const folderName = folderLookup.get(state.folderState.assignments[id]) || t().pillUnassigned;
      const isLocked = state.folderState.protectedIds[id] ? ' 🔒' : '';
      markdown += `${idx + 1}. **[${title}](${P.buildUrl(id)})** — *${t().mdFolderLabel}: ${folderName}*${isLocked}\n`;
    });
    markdown += `\n---\n\n`;
  }

  if (messages.length > 0) {
    markdown += `## ${t().mdActiveChatHeader}\n\n`;
    messages.forEach((msg) => {
      const text = (msg.innerText || msg.textContent || '').trim();
      if (!text) return;

      const isUser =
        msg.getAttribute?.('data-message-author-role') === 'user' ||
        msg.tagName.toLowerCase().includes('user') ||
        msg.classList.contains('query-text') ||
        !!msg.querySelector?.('[data-message-author-role="user"]');
      markdown += `### ${isUser ? t().mdUser : `✨ ${P.name}`}\n\n${text}\n\n---\n\n`;
    });
  }

  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${PLATFORM_KEY}-export-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);

  updateStatusToast(t().toastMdExported, null, null, 3000);
}
