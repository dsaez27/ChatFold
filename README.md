# ChatFold: Gestor de Carpetas para Gemini & ChatGPT

**ChatFold** es una extensión de Chrome (Manifest V3) que transforma tu experiencia en **Gemini** y **ChatGPT**: añade carpetas inteligentes con clasificación automática por palabras clave, barra superior contraíble, búsqueda instantánea, protección de chats contra borrado accidental, selección múltiple, borrado masivo seguro, exportación a Markdown y respaldo/importación en JSON.

## Estructura

```
├── src/                      Código fuente (módulos ES)
│   ├── content.js            Punto de entrada (arranca solo en Gemini/ChatGPT)
│   ├── main.js               refreshUI, init y observer del DOM
│   ├── platform.js           Detección de plataforma y selectores (Gemini / ChatGPT)
│   ├── i18n.js               Textos es/en
│   ├── storage.js            Lectura, validación y guardado en localStorage
│   ├── state.js              Estado compartido (único objeto mutable)
│   ├── sidebar.js            Detección de filas/ids/títulos en la barra lateral
│   ├── folders.js            Auto-clasificación, insignias, filtros y orden
│   ├── panel.js              Panel flotante de carpetas (arrastre, pills)
│   ├── toolbar.js            Barra superior (contraíble)
│   ├── selection.js          Checkboxes, selección por rango, mover a carpeta, proteger
│   ├── dialogs.js            Modales y avisos (toast)
│   ├── deletion.js           Borrado por DOM y respaldo por API (ChatGPT)
│   ├── backup.js             Respaldo e importación JSON
│   ├── markdown-export.js    Exportar a Markdown
│   ├── autoscroll.js         Carga automática del historial
│   └── utils.js              Utilidades de DOM (clic real, polling)
├── tests/                    Pruebas (node:test + jsdom)
├── scripts/build.mjs         Empaquetado con esbuild
└── extension/                ← la extensión (carpeta a cargar en Chrome)
    ├── manifest.json
    ├── content.js            GENERADO desde src/ (no editar a mano)
    ├── styles.css
    ├── icons/  _locales/
```

## Desarrollo

```bash
npm install
npm run build    # genera content.js dentro de extension/
npm run watch    # recompila al guardar
npm run lint     # ESLint
npm test         # pruebas unitarias y de integración (jsdom)
npm run check    # lint + tests + build
```

Para probar: `chrome://extensions` → activar *Modo desarrollador* → *Cargar descomprimida* → elegir la carpeta `extension/`.

Para publicar: comprimir **el contenido** de la carpeta `extension/` (donde está `manifest.json`).

## Convenciones

- La versión vive solo en `manifest.json` (`APP_VERSION` se lee de ahí). En cada cambio: subir la versión y renombrar las dos carpetas con el número nuevo.
- Todo lo que cambia en tiempo de ejecución va en el objeto `state` de `src/state.js`.
- Los selectores del DOM de cada sitio están únicamente en `src/platform.js`: si Gemini o ChatGPT cambian su HTML, es el primer lugar a revisar.

