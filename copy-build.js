import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const srcAssetsDir = path.join(__dirname, 'dist', 'assets');
const destAssetsDir = path.join(__dirname, 'assets');
const srcHtmlFile = path.join(__dirname, 'dist', 'index.source.html'); // Vite builds index.source.html to dist/index.source.html
const destHtmlFile = path.join(__dirname, 'index.html');

// 1. Copy assets
if (fs.existsSync(srcAssetsDir)) {
  if (!fs.existsSync(destAssetsDir)) {
    fs.mkdirSync(destAssetsDir, { recursive: true });
  } else {
    // Clear old assets
    const files = fs.readdirSync(destAssetsDir);
    for (const file of files) {
      fs.unlinkSync(path.join(destAssetsDir, file));
    }
  }
  
  const files = fs.readdirSync(srcAssetsDir);
  for (const file of files) {
    fs.copyFileSync(path.join(srcAssetsDir, file), path.join(destAssetsDir, file));
  }
  console.log('Successfully copied assets to root assets/ folder.');
}

// 2. Copy index.html
// Note: Vite builds index.source.html into dist/index.source.html
let htmlSourcePath = srcHtmlFile;
if (!fs.existsSync(htmlSourcePath)) {
  // Fallback check if it was named index.html in dist
  htmlSourcePath = path.join(__dirname, 'dist', 'index.html');
}

if (fs.existsSync(htmlSourcePath)) {
  let htmlContent = fs.readFileSync(htmlSourcePath, 'utf8');
  // Replace references to index.source.html or similar if needed
  fs.writeFileSync(destHtmlFile, htmlContent, 'utf8');
  console.log('Successfully copied built index.html to root.');
} else {
  console.error('Could not find built HTML file in dist/ to copy.');
}
