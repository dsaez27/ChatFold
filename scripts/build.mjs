// Empaqueta src/ en un único content.js (IIFE) dentro de extension/.
import { build, context } from 'esbuild';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const extDir = join(root, 'extension');

if (!existsSync(extDir)) {
  console.error('No se encontró la carpeta de la extensión (extension/).');
  process.exit(1);
}

const options = {
  entryPoints: [join(root, 'src/content.js')],
  outfile: join(extDir, 'content.js'),
  bundle: true,
  format: 'iife',
  target: 'chrome110',
  charset: 'utf8',
  legalComments: 'none',
  banner: { js: '/* Generado con esbuild desde src/. No editar a mano: ejecutar "npm run build". */' },
  logLevel: 'info'
};

if (process.argv.includes('--watch')) {
  const ctx = await context(options);
  await ctx.watch();
  console.log('Observando cambios en src/ ...');
} else {
  await build(options);
}

