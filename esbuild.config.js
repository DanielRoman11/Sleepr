// esbuild.config.js
const esbuild = require('esbuild');
const { join } = require('path');

esbuild.build({
  entryPoints: [join(__dirname, 'src/main.ts')], // Entrypoint de tu aplicación
  bundle: true, // Activar el bundling
  outfile: join(__dirname, 'dist/main.js'), // Archivo de salida
  platform: 'node', // Para aplicaciones de backend
  target: 'node16', // O cualquier versión de Node.js que estés usando
  sourcemap: true, // Opcional: para los sourcemaps
  external: ['@nestjs/core', '@nestjs/common'], // Dependencias de NestJS no las bundlées
}).catch(() => process.exit(1));
