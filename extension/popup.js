const PLATFORM_LIST = [
  { key: 'gemini', name: 'Google Gemini', host: 'gemini.google.com', url: 'https://gemini.google.com/app', storageKey: 'gcm_folders_data_v2', color: '#4285f4' },
  { key: 'chatgpt', name: 'OpenAI ChatGPT', host: 'chatgpt.com', altHost: 'chat.openai.com', url: 'https://chatgpt.com/', storageKey: 'gcm_chatgpt_folders_data_v1', color: '#10a37f' },
  { key: 'claude', name: 'Anthropic Claude', host: 'claude.ai', url: 'https://claude.ai/new', storageKey: 'gcm_claude_folders_data_v1', color: '#d97757' },
  { key: 'deepseek', name: 'DeepSeek Chat', host: 'deepseek.com', url: 'https://chat.deepseek.com/', storageKey: 'gcm_deepseek_folders_data_v1', color: '#4d6bfe' },
  { key: 'opencode', name: 'OpenCode AI', host: 'opencode.ai', url: 'https://opencode.ai/', storageKey: 'gcm_opencode_folders_data_v1', color: '#a142f4' }
];

function detectActivePlatformKey(urlStr) {
  if (!urlStr) return null;
  try {
    const { hostname } = new URL(urlStr);
    const found = PLATFORM_LIST.find(
      (p) => hostname.endsWith(p.host) || (p.altHost && hostname.endsWith(p.altHost))
    );
    return found ? found.key : null;
  } catch (_) {
    return null;
  }
}

function renderPlatforms(syncData = {}, activePlatformKey = null) {
  const container = document.getElementById('cf-platforms-list');
  if (!container) return;
  container.textContent = '';

  PLATFORM_LIST.forEach((p) => {
    const data = syncData[p.storageKey] || {};
    const foldersCount = Array.isArray(data.folders) ? data.folders.length : 3;
    const assignedCount = data.assignments && typeof data.assignments === 'object' ? Object.keys(data.assignments).length : 0;
    const lockedCount = data.protectedIds && typeof data.protectedIds === 'object' ? Object.keys(data.protectedIds).length : 0;

    const isCurrent = p.key === activePlatformKey;
    const card = document.createElement('a');
    card.className = 'cf-platform-card' + (isCurrent ? ' cf-active-platform' : '');
    card.href = p.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const left = document.createElement('div');
    left.className = 'cf-platform-left';

    const dot = document.createElement('span');
    dot.className = 'cf-platform-dot';
    dot.style.backgroundColor = p.color;
    dot.style.boxShadow = `0 0 8px ${p.color}`;

    const name = document.createElement('span');
    name.className = 'cf-platform-name';
    name.textContent = p.name;

    left.appendChild(dot);
    left.appendChild(name);

    if (isCurrent) {
      const badge = document.createElement('span');
      badge.className = 'cf-live-badge';
      badge.textContent = 'ACTIVA';
      left.appendChild(badge);
    }

    const stats = document.createElement('span');
    stats.className = 'cf-platform-stats';
    stats.title = `${foldersCount} carpetas · ${assignedCount} chats en carpetas · ${lockedCount} protegidos`;
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

  const initUI = (activeUrl = '') => {
    const activeKey = detectActivePlatformKey(activeUrl);
    const actionsSection = document.getElementById('cf-active-actions');
    const hintEl = document.getElementById('cf-inactive-hint');
    const btns = document.querySelectorAll('.cf-actions-row .cf-btn');

    if (!activeKey) {
      actionsSection?.classList.add('cf-disabled-section');
      btns.forEach((b) => {
        b.disabled = true;
      });
      if (hintEl) hintEl.style.display = 'block';
    } else {
      if (hintEl) hintEl.style.display = 'none';
    }

    if (typeof chrome !== 'undefined' && chrome.storage?.sync?.get) {
      chrome.storage.sync.get(keys, (res) => {
        renderPlatforms(res || {}, activeKey);
      });
    } else {
      renderPlatforms({}, activeKey);
    }
  };

  if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      initUI(tabs?.[0]?.url || '');
    });
  } else {
    initUI('');
  }

  document.getElementById('cf-btn-toggle')?.addEventListener('click', () => sendToActiveTab('TOGGLE_PANEL'));
  document.getElementById('cf-btn-prompts')?.addEventListener('click', () => sendToActiveTab('OPEN_PROMPTS'));
  document.getElementById('cf-btn-backup')?.addEventListener('click', () => sendToActiveTab('EXPORT_BACKUP'));
});
