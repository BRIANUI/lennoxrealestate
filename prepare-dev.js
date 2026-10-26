import fs from 'fs';

try {
  fs.copyFileSync('index.source.html', 'index.html');
  console.log('Prepared index.html for live development mode.');
} catch (err) {
  console.error('Error preparing index.html:', err);
}
