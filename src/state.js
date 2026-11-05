import { I18N } from './i18n.js';
import { loadFolderData, saveFolderData } from './storage.js';

// Filtros que existen siempre, independientemente de las carpetas del usuario.
export const BUILTIN_FILTERS = ['ALL', 'UNASSIGNED', 'PROTECTED'];

const folderState = loadFolderData();

/**
 * Estado compartido y mutable de la extensión.
 * Los módulos ES no pueden reasignar bindings importados, por eso todo lo que cambia
 * en tiempo de ejecución vive como propiedad de este único objeto.
 */
export const state = {
  /** Datos persistidos (idioma, carpetas, asignaciones, protegidos, posición, vista). */
  folderState,
  // Al abrir o recargar la página, mostrar siempre "Todas" ('ALL') y orden original ('DEFAULT')
  // para que ningún filtro u orden previo oculte o altere la lista de conversaciones al iniciar.
  activeFolderFilter: 'ALL',
  searchQuery: '',
  sortMode: 'DEFAULT',
  toolbarCollapsed: folderState.view.toolbarCollapsed,
  toolbarVertical: !!folderState.view.toolbarVertical,

  autoScrollActive: false,
  autoScrollRunId: 0,
  autoSelectAllMode: false,

  deletionInProgress: false,
  deletionStopRequested: false,
  lastCheckedCheckbox: null,

  cachedSidebarEl: null,
  cachedChatGptToken: null,
  panelJustDragged: false,
  toolbarJustDragged: false,
  toastTimer: null,
  isRefreshing: false,
  refreshDebounceTimer: null
};

/** Conversaciones seleccionadas en la barra lateral: id -> { id }. */
export const selectedMap = new Map();

/** Ids ya evaluados por la auto-clasificación (evita repetir el trabajo en cada refresco). */
export const autoClassifiedVisited = new Set();

/** Textos del idioma activo. */
export const t = () => I18N[state.folderState.lang] || I18N.es;

/** Guarda la vista actual (filtro, orden y barra contraída/vertical) para retomarla al recargar. */
export function saveView() {
  state.folderState.view = {
    filter: state.activeFolderFilter,
    sort: state.sortMode,
    toolbarCollapsed: state.toolbarCollapsed,
    toolbarVertical: state.toolbarVertical
  };
  saveFolderData(state.folderState);
}
