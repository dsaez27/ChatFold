const PLATFORM_LIST = [
  { key: 'gemini', name: 'Google Gemini', url: 'https://gemini.google.com/app', storageKey: 'gcm_folders_data_v2', color: '#4285f4' },
  { key: 'chatgpt', name: 'OpenAI ChatGPT', url: 'https://chatgpt.com/', storageKey: 'gcm_chatgpt_folders_data_v1', color: '#10a37f' },
  { key: 'claude', name: 'Anthropic Claude', url: 'https://claude.ai/new', storageKey: 'gcm_claude_folders_data_v1', color: '#d97757' },
  { key: 'deepseek', name: 'DeepSeek Chat', url: 'https://chat.deepseek.com/', storageKey: 'gcm_deepseek_folders_data_v1', color: '#4d6bfe' },
  { key: 'opencode', name: 'OpenCode AI', url: 'https://opencode.ai/', storageKey: 'gcm_opencode_folders_data_v1', color: '#a142f4' }
];

function renderPlatforms(syncData = {}) {
  const container = document.getElementById('cf-platforms-list');
  if (!container) return;
  container.textContent = '';

  PLATFORM_LIST.forEach((p) => {
    const data = syncData[p.storageKey] || {};
    const foldersCount = Array.isArray(data.folders) ? data.folders.length : 3;
    const assignedCount = data.assignments && typeof data.assignments === 'object' ? Object.keys(data.assignments).length : 0;
    const lockedCount = data.protectedIds && typeof data.protectedIds === 'object' ? Object.keys(data.protectedIds).length : 0;

    const card = document.createElement('a');
    card.className = 'cf-platform-card';
    card.href = p.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const left = document.createElement('div');
    left.className = 'cf-platform-left';

    const dot = document.createElement('span');
    dot.className = 'cf-platform-dot';
    dot.style.backgroundColor = p.color;

    const name = document.createElement('span');
    name.className = 'cf-platform-name';
    name.textContent = p.name;

    left.appendChild(dot);
    left.appendChild(name);

    const stats = document.createElement('span');
    stats.className = 'cf-platform-stats';
    stats.textContent = `📁 ${foldersCount} · 💬 ${assignedCount} · 🔒 ${lockedCount}`;

    card.appendChild(left);
    card.appendChild(stats);
    container.appendChild(card);
  });
}

function sendToActiveTab(action) {
  if (typeof chrome === 'undefined' || !chrome.tabs?.query) return;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs?.[0];
    if (!activeTab?.id) return;
    chrome.tabs.sendMessage(activeTab.id, { action }, () => {
      void chrome.runtime?.lastError;
      window.close();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const verEl = document.getElementById('cf-version');
  if (verEl && typeof chrome !== 'undefined' && chrome.runtime?.getManifest) {
    verEl.textContent = `v${chrome.runtime.getManifest().version}`;
  }

  const keys = PLATFORM_LIST.map((p) => p.storageKey);
  if (typeof chrome !== 'undefined' && chrome.storage?.sync?.get) {
    chrome.storage.sync.get(keys, (res) => {
      renderPlatforms(res || {});
    });
  } else {
    renderPlatforms({});
  }

  document.getElementById('cf-btn-toggle')?.addEventListener('click', () => sendToActiveTab('TOGGLE_PANEL'));
  document.getElementById('cf-btn-prompts')?.addEventListener('click', () => sendToActiveTab('OPEN_PROMPTS'));
  document.getElementById('cf-btn-backup')?.addEventListener('click', () => sendToActiveTab('EXPORT_BACKUP'));
});
