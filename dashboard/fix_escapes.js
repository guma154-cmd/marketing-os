const fs = require('fs');
const path = require('path');
function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      results = results.concat(walkDir(filePath));
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}
const files = walkDir('./');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  if (content.includes('\\`')) { content = content.replace(/\\`/g, '`'); changed = true; }
  if (content.includes('\\${')) { content = content.replace(/\\\$\{/g, '${'); changed = true; }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Corrigido:', file);
  }
});
