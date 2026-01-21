const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const newLines = [];
let fixes = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const prevLine = i > 0 ? lines[i - 1] : '';
  const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
  
  // Check if this line is just "      [" and previous line ends with "],"
  if (line.trim() === '[' && prevLine.trim() === '],' && nextLine.trim().startsWith('{')) {
    // Check if we're in the context of unlimitedLitePackages
    const context = lines.slice(Math.max(0, i - 20), i).join('\n');
    if (context.includes('unlimitedLitePackages') && !context.includes('unlimitedPlusPackages:')) {
      // Replace with unlimitedPlusPackages: [
      const indent = line.match(/^(\s+)/)?.[1] || '      ';
      newLines.push(indent + 'unlimitedPlusPackages: [');
      fixes++;
      continue;
    }
  }
  
  newLines.push(line);
}

if (fixes > 0) {
  content = newLines.join('\n');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${fixes} missing unlimitedPlusPackages declarations`);
} else {
  console.log('No fixes needed');
}





