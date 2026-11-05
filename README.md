<p align="center">
  <img src="assets/chatfold-full.png" alt="ChatFold" width="380" />
</p>

# ChatFold v3.5.0: Gestor Universal de Carpetas para Gemini, ChatGPT, Claude, DeepSeek & OpenCode

**ChatFold** es una extensión de Chrome (Manifest V3) que transforma tu experiencia en **Google Gemini**, **OpenAI ChatGPT**, **Anthropic Claude**, **DeepSeek** y **OpenCode**: añade carpetas inteligentes con clasificación automática por palabras clave, sincronización en la nube (`chrome.storage.sync`), bóveda de Prompts rápidos, popup de control, atajos de teclado, barra superior contraíble, búsqueda instantánea, protección de chats con candado, selección múltiple, borrado masivo seguro, exportación a Markdown y respaldo/importación en JSON.

## Novedades en v3.4.0

- 🌐 **Soporte Universal Multi-IA**: Compatible con **Gemini**, **ChatGPT**, **Claude**, **DeepSeek** y **OpenCode**.
- ☁️ **Cloud Sync Automático (`chrome.storage.sync`)**: Sincroniza carpetas, reglas, asignaciones, chats protegidos y prompts entre tus dispositivos.
- ⚡ **Bóveda de Prompts Rápidos (`src/prompts.js`)**: Biblioteca reutilizable de prompts con inserción en 1 clic directamente en el cuadro de texto del chat activo.
- 🎛️ **Popup de Extensión & Atajos de Teclado**: Panel rápido en la barra de Chrome (`popup.html`) con métricas por plataforma y accesos directos (`Alt+Shift+F` para mostrar/ocultar panel, `Alt+Shift+S` para buscar).

## Estructura

```
├── src/                      Código fuente (módulos ES)
│   ├── content.js            Punto de entrada (arranca en Gemini/ChatGPT/Claude/DeepSeek/OpenCode)
│   ├── main.js               refreshUI, init y observer del DOM
│   ├── platform.js           Detección de plataforma y selectores universales (5 IAs)
│   ├── i18n.js               Textos bilingües (es/en) y plantillas por defecto
│   ├── storage.js            Persistencia híbrida localStorage + chrome.storage.sync
│   ├── state.js              Estado compartido (único objeto mutable)
│   ├── prompts.js            Bóveda de Prompts rápidos e inyección en el chat
│   ├── sidebar.js            Detección de filas/ids/títulos en la barra lateral
│   ├── folders.js            Auto-clasificación, insignias, filtros y orden
│   ├── panel.js              Panel flotante de carpetas, atajos y oyentes globales
│   ├── toolbar.js            Barra superior (contraíble)
│   ├── selection.js          Checkboxes, selección por rango, mover a carpeta, proteger
│   ├── dialogs.js            Modales y avisos (toast)
│   ├── deletion.js           Borrado por DOM y respaldo por API (ChatGPT)
│   ├── backup.js             Respaldo e importación JSON
│   ├── markdown-export.js    Exportar a Markdown
│   ├── autoscroll.js         Carga automática del historial
│   └── utils.js              Utilidades de DOM (clic real, polling)
├── tests/                    23 pruebas automatizadas (node:test + jsdom)
├── scripts/build.mjs         Empaquetado con esbuild
└── extension/                ← la extensión lista para cargar en Chrome
    ├── manifest.json
    ├── content.js            GENERADO desde src/ (no editar a mano)
    ├── styles.css
    ├── popup.html / popup.css / popup.js
    └── icons/  _locales/
```

## Desarrollo

```bash
npm install
npm run build    # genera content.js dentro de extension/
npm run watch    # recompila al guardar
npm run lint     # ESLint (0 errores)
npm test         # 23 pruebas unitarias y de integración (jsdom)
npm run check    # lint + tests + build
```
