import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const projectRoot = __dirname;
const distDest = path.join(projectRoot, '..', 'dist');

console.log('Project root:', projectRoot);
console.log('Dist destination:', distDest);

if (!fs.existsSync(distDest)) {
  fs.mkdirSync(distDest, { recursive: true });
}

// 1. Copy assets to dist/assets
const srcAssets = path.join(projectRoot, 'assets');
const destAssets = path.join(distDest, 'assets');

if (!fs.existsSync(destAssets)) {
  fs.mkdirSync(destAssets, { recursive: true });
} else {
  // Clear old assets
  const files = fs.readdirSync(destAssets);
  for (const file of files) {
    fs.unlinkSync(path.join(destAssets, file));
  }
}

const assetFiles = fs.readdirSync(srcAssets);
for (const file of assetFiles) {
  fs.copyFileSync(path.join(srcAssets, file), path.join(destAssets, file));
}
console.log('Copied assets to dest assets/.');

// 2. Copy index.html
fs.copyFileSync(path.join(projectRoot, 'index.html'), path.join(distDest, 'index.html'));
console.log('Copied index.html to dest root.');

// 3. Copy logo and create replacements
const logoSrc = path.join(projectRoot, 'public', 'logo.jpg');
if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, path.join(distDest, 'logo.jpg'));
  fs.copyFileSync(logoSrc, path.join(distDest, 'logo-light.png'));
  fs.copyFileSync(logoSrc, path.join(distDest, 'logo-dark.png'));
  fs.copyFileSync(logoSrc, path.join(distDest, 'favicon.ico'));
  fs.copyFileSync(logoSrc, path.join(distDest, 'favicon.svg'));
  console.log('Copied logo and replaced old logo-light, logo-dark, favicon.ico and favicon.svg.');
}

// 4. Copy public files
const publicDir = path.join(projectRoot, 'public');
const publicFiles = fs.readdirSync(publicDir);
for (const file of publicFiles) {
  if (file !== 'favicon.svg' && file !== 'logo.jpg') {
    fs.copyFileSync(path.join(publicDir, file), path.join(distDest, file));
  }
}
console.log('Copied public images and icons to dest root.');
