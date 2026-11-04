// Iconos vectoriales SVG (Lucide / Feather style) para toda la interfaz de ChatFold.

export const ICONS = {
  // Logo oficial de ChatFold en SVG vectorial (sin fondo)
  chatfoldLogo: `<svg class="gcm-svg-logo" viewBox="0 0 1024 1024" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gcmLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#5B6EF7" />
        <stop offset="50%" stop-color="#3B82F6" />
        <stop offset="100%" stop-color="#1DA1F2" />
      </linearGradient>
    </defs>
    <path d="M280 120 L590 120 L844 374 L844 630 A170 170 0 0 1 674 800 L455 800 L295 940 L295 800 L280 800 A170 170 0 0 1 110 630 L110 290 A170 170 0 0 1 280 120 Z" fill="url(#gcmLogoGrad)"/>
    <path d="M590 120 L844 374 L690 374 A100 100 0 0 1 590 274 Z" fill="#132238"/>
    <rect x="275" y="405" width="315" height="62" rx="31" fill="#FFFFFF"/>
    <rect x="275" y="535" width="415" height="62" rx="31" fill="#CBE7FB"/>
  </svg>`,

  folderPlus: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`,

  folder: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`,

  folderMinus: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`,

  search: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,

  sort: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>`,

  lock: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,

  lockSmall: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fbbc04" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,

  download: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,

  upload: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,

  fileText: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,

  trash: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,

  stop: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="5" y="5" rx="2"/></svg>`,

  zap: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,

  chevronsDown: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 6 5 5 5-5"/><path d="m7 13 5 5 5-5"/></svg>`,

  chevronRight: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,

  menu: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,

  minus: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`,

  close: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,

  plus: `<svg class="gcm-svg-icon" viewBox="0 0 24 24" width="13.5" height="13.5" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`
};

const svgParser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;

/** Crea un nodo SVG limpio a partir de un string de `ICONS`. */
export function createIconElement(svgString) {
  if (svgParser) {
    const doc = svgParser.parseFromString(svgString.trim(), 'image/svg+xml');
    const svg = doc.documentElement;
    if (svg && svg.tagName.toLowerCase() === 'svg') {
      return document.importNode(svg, true);
    }
  }
  const span = document.createElement('span');
  span.className = 'gcm-icon-wrap';
  span.innerHTML = svgString;
  return span.firstElementChild || span;
}

/** Rellena un botón o contenedor con un icono SVG + texto seguro. */
export function setButtonIconText(el, svgString, text) {
  if (!el) return;
  el.textContent = '';
  if (svgString) {
    el.appendChild(createIconElement(svgString));
  }
  if (text) {
    const span = document.createElement('span');
    span.textContent = text;
    el.appendChild(span);
  }
}
