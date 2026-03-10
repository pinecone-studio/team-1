const fs = require('fs');
const path = require('path');

const appDir = process.cwd();
const src = path.join(appDir, '.next', 'server', 'middleware.js');
const dest = path.join(
  appDir,
  '.next',
  'standalone',
  'apps',
  'team1-backend',
  '.next',
  'server',
  'middleware.js',
);

if (!fs.existsSync(src)) {
  console.warn(`[fix-standalone-middleware] source missing: ${src}`);
  process.exit(0);
}

const destDir = path.dirname(dest);
fs.mkdirSync(destDir, { recursive: true });

try {
  fs.copyFileSync(src, dest);
  console.log(`[fix-standalone-middleware] copied to ${dest}`);
} catch (err) {
  console.error('[fix-standalone-middleware] failed to copy:', err);
  process.exit(1);
}
