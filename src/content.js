import { init } from './main.js';
import { PLATFORM_KEY } from './platform.js';

// Punto de entrada de la extensión: solo arranca en dominios soportados (Gemini, ChatGPT, Claude, DeepSeek u OpenCode)
if (PLATFORM_KEY) {
  init();
}
