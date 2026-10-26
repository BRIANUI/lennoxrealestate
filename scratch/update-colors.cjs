const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const replacements = [
  { from: /#D4AF37/gi, to: '#F0A500' },
  { from: /#C5A02F/gi, to: '#D4920A' },
  { from: /#121824/gi, to: '#1C2333' },
  { from: /#071326/gi, to: '#1C2333' },
  { from: /#0e131d/gi, to: '#263045' },
  { from: /rgba\(212,\s*175,\s*55/gi, to: 'rgba(240, 165, 0' },
  { from: /rgba\(212,175,55/gi, to: 'rgba(240,165,0' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (file.endsWith('.jsx') || file.endsWith('.js'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const replacement of replacements) {
        if (replacement.from.test(content)) {
          content = content.replace(replacement.from, replacement.to);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated colors in: ${fullPath}`);
      }
    }
  }
}

console.log('Starting color updates...');
processDirectory(srcDir);
console.log('Color updates complete!');
