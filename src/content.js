import { init } from './main.js';
import { PLATFORM_KEY } from './platform.js';

// Punto de entrada de la extensión: solo arranca en dominios soportados (Gemini o ChatGPT)
if (PLATFORM_KEY) {
  init();
}
