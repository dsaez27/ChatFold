import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FIXTURES = {
  gemini: {
    url: 'https://gemini.google.com/app/abc12345',
    html: `<body><nav><conversations-list>
      <div data-test-id="conversation"><a href="/app/aaaaa11111"><span class="conversation-title">Python script para facturas</span></a></div>
      <div data-test-id="conversation"><a href="/app/bbbbb22222"><span class="conversation-title">Resumen del examen de historia</span></a></div>
      <div data-test-id="conversation"><a href="/app/ccccc33333"><span class="conversation-title">Receta de empanadas</span></a></div>
      <div data-test-id="conversation"><a href="/app/ddddd44444"><span class="conversation-title">Idea de proyecto nuevo</span></a></div>
    </conversations-list></nav><main></main></body>`
  },
  chatgpt: {
    url: 'https://chatgpt.com/c/zzzzz99999',
    html: `<body><nav aria-label="Historial"><ol>
      <li data-testid="history-item-0"><a href="/c/aaaaa11111"><div dir="auto">Fix javascript bug</div></a></li>
      <li data-testid="history-item-1"><a href="/c/bbbbb22222"><div dir="auto">Course summary</div></a></li>
      <li data-testid="history-item-2"><a href="/c/ccccc33333"><div dir="auto">Cooking tips</div></a></li>
    </ol></nav><main><div data-message-author-role="user">hola</div><div data-message-author-role="assistant">mundo</div></main></body>`
  }
};

/**
 * Carga un content.js en un DOM simulado (jsdom) imitando una página de Gemini o ChatGPT.
 * Devuelve la ventana lista para interactuar.
 */
export function loadExtension(contentJsPath, platform = 'gemini', { storage = {} } = {}) {
  const fx = FIXTURES[platform];
  const dom = new JSDOM(`<!doctype html><html lang="es">${fx.html}</html>`, {
    url: fx.url,
    runScripts: 'outside-only',
    pretendToBeVisual: true
  });
  const { window } = dom;
  Object.entries(storage).forEach(([k, v]) => window.localStorage.setItem(k, v));
  window.chrome = { runtime: { getManifest: () => ({ version: '9.9.9' }), getURL: (p) => `chrome-extension://test/${p}` } };
  Object.defineProperty(window.navigator, 'language', { value: 'es-CL', configurable: true });
  window.URL.createObjectURL = () => 'blob:test';
  window.URL.revokeObjectURL = () => {};
  window.eval(readFileSync(contentJsPath, 'utf8'));
  return window;
}

export const $ = (w, sel) => w.document.querySelector(sel);
export const $$ = (w, sel) => Array.from(w.document.querySelectorAll(sel));

export function click(w, el) {
  el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, view: w }));
}
