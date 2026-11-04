// Constructor programático de iconos vectoriales SVG (100% compatible con Trusted Types CSP en Gemini/Claude/ChatGPT).

const SVG_NS = 'http://www.w3.org/2000/svg';

function el(tag, attrs = {}, children = []) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    node.setAttribute(k, String(v));
  }
  for (const child of children) {
    node.appendChild(child);
  }
  return node;
}

function strokeSvg(size, strokeWidth, children, strokeColor = 'currentColor') {
  return el(
    'svg',
    {
      class: 'gcm-svg-icon',
      viewBox: '0 0 24 24',
      width: size,
      height: size,
      fill: 'none',
      stroke: strokeColor,
      'stroke-width': strokeWidth,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    },
    children
  );
}

export const ICONS = {
  chatfoldLogo: () =>
    el(
      'svg',
      {
        class: 'gcm-svg-logo',
        viewBox: '0 0 1024 1024',
        width: 18,
        height: 18,
        fill: 'none'
      },
      [
        el('defs', {}, [
          el('linearGradient', { id: 'gcmLogoGrad', x1: '0%', y1: '0%', x2: '100%', y2: '100%' }, [
            el('stop', { offset: '0%', 'stop-color': '#5B6EF7' }),
            el('stop', { offset: '50%', 'stop-color': '#3B82F6' }),
            el('stop', { offset: '100%', 'stop-color': '#1DA1F2' })
          ])
        ]),
        el('path', {
          d: 'M280 120 L590 120 L844 374 L844 630 A170 170 0 0 1 674 800 L455 800 L295 940 L295 800 L280 800 A170 170 0 0 1 110 630 L110 290 A170 170 0 0 1 280 120 Z',
          fill: 'url(#gcmLogoGrad)'
        }),
        el('path', {
          d: 'M590 120 L844 374 L690 374 A100 100 0 0 1 590 274 Z',
          fill: '#132238'
        }),
        el('rect', { x: 275, y: 405, width: 315, height: 62, rx: 31, fill: '#FFFFFF' }),
        el('rect', { x: 275, y: 535, width: 415, height: 62, rx: 31, fill: '#CBE7FB' })
      ]
    ),

  folderPlus: () =>
    strokeSvg(14, 2, [
      el('path', { d: 'M12 10v6' }),
      el('path', { d: 'M9 13h6' }),
      el('path', {
        d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'
      })
    ]),

  folder: () =>
    strokeSvg(14, 2, [
      el('path', {
        d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'
      })
    ]),

  folderMinus: () =>
    strokeSvg(14, 2, [
      el('path', { d: 'M9 13h6' }),
      el('path', {
        d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'
      })
    ]),

  search: () =>
    strokeSvg(13.5, 2.2, [
      el('circle', { cx: 11, cy: 11, r: 8 }),
      el('path', { d: 'm21 21-4.3-4.3' })
    ]),

  sort: () =>
    strokeSvg(13.5, 2, [
      el('path', { d: 'm3 16 4 4 4-4' }),
      el('path', { d: 'M7 20V4' }),
      el('path', { d: 'm21 8-4-4-4 4' }),
      el('path', { d: 'M17 4v16' })
    ]),

  lock: () =>
    strokeSvg(13.5, 2.1, [
      el('rect', { width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
      el('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
    ]),

  lockSmall: () =>
    strokeSvg(
      11,
      2.4,
      [
        el('rect', { width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
        el('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
      ],
      '#fbbc04'
    ),

  download: () =>
    strokeSvg(13.5, 2, [
      el('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
      el('polyline', { points: '7 10 12 15 17 10' }),
      el('line', { x1: 12, x2: 12, y1: 15, y2: 3 })
    ]),

  upload: () =>
    strokeSvg(13.5, 2, [
      el('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
      el('polyline', { points: '17 8 12 3 7 8' }),
      el('line', { x1: 12, x2: 12, y1: 3, y2: 15 })
    ]),

  fileText: () =>
    strokeSvg(13.5, 2, [
      el('path', { d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' }),
      el('path', { d: 'M14 2v4a2 2 0 0 0 2 2h4' }),
      el('path', { d: 'M10 9H8' }),
      el('path', { d: 'M16 13H8' }),
      el('path', { d: 'M16 17H8' })
    ]),

  trash: () =>
    strokeSvg(13.5, 2, [
      el('path', { d: 'M3 6h18' }),
      el('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
      el('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
      el('line', { x1: 10, x2: 10, y1: 11, y2: 17 }),
      el('line', { x1: 14, x2: 14, y1: 11, y2: 17 })
    ]),

  stop: () =>
    strokeSvg(13.5, 2.2, [
      el('rect', { width: 14, height: 14, x: 5, y: 5, rx: 2 })
    ]),

  zap: () =>
    strokeSvg(13.5, 2, [
      el('path', {
        d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z'
      })
    ]),

  chevronsDown: () =>
    strokeSvg(13.5, 2, [
      el('path', { d: 'm7 6 5 5 5-5' }),
      el('path', { d: 'm7 13 5 5 5-5' })
    ]),

  chevronRight: () =>
    strokeSvg(15, 2.3, [
      el('path', { d: 'm9 18 6-6-6-6' })
    ]),

  menu: () =>
    strokeSvg(15, 2.2, [
      el('line', { x1: 4, x2: 20, y1: 12, y2: 12 }),
      el('line', { x1: 4, x2: 20, y1: 6, y2: 6 }),
      el('line', { x1: 4, x2: 20, y1: 18, y2: 18 })
    ]),

  minus: () =>
    strokeSvg(13, 2.4, [
      el('path', { d: 'M5 12h14' })
    ]),

  close: () =>
    strokeSvg(12, 2.4, [
      el('path', { d: 'M18 6 6 18' }),
      el('path', { d: 'm6 6 12 12' })
    ]),

  plus: () =>
    strokeSvg(13.5, 2.3, [
      el('path', { d: 'M5 12h14' }),
      el('path', { d: 'M12 5v14' })
    ]),

  layoutVertical: () =>
    strokeSvg(13.5, 2.1, [
      el('rect', { width: 10, height: 18, x: 7, y: 3, rx: 2 }),
      el('path', { d: 'M10 7h4' }),
      el('path', { d: 'M10 12h4' }),
      el('path', { d: 'M10 17h4' })
    ]),

  layoutHorizontal: () =>
    strokeSvg(13.5, 2.1, [
      el('rect', { width: 18, height: 10, x: 3, y: 7, rx: 2 }),
      el('path', { d: 'M7 10v4' }),
      el('path', { d: 'M12 10v4' }),
      el('path', { d: 'M17 10v4' })
    ])
};

/** Crea un nodo SVG limpio a partir de una función de `ICONS` (sin usar innerHTML ni DOMParser). */
export function createIconElement(iconBuilder) {
  if (typeof iconBuilder === 'function') {
    return iconBuilder();
  }
  return el('svg', { class: 'gcm-svg-icon', width: 12, height: 12 });
}

/** Rellena un botón o contenedor con un icono SVG + texto seguro. */
export function setButtonIconText(container, iconBuilder, text) {
  if (!container) return;
  container.textContent = '';
  if (iconBuilder) {
    container.appendChild(createIconElement(iconBuilder));
  }
  if (text) {
    const span = document.createElement('span');
    span.textContent = text;
    container.appendChild(span);
  }
}
