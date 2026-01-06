const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find all patterns: ],\n      [\n        {
// This indicates missing unlimitedPlusPackages:
const lines = content.split('\n');
let fixes = 0;
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
  const nextNextLine = i + 2 < lines.length ? lines[i + 2] : '';
  
  // Check if current line ends with ], and next line is just [
  if (line.trim() === '],' && nextLine.trim() === '[' && nextNextLine.trim().startsWith('{')) {
    // Check if previous context has unlimitedLitePackages but not unlimitedPlusPackages
    const context = lines.slice(Math.max(0, i - 10), i).join('\n');
    if (context.includes('unlimitedLitePackages') && !context.includes('unlimitedPlusPackages:')) {
      newLines.push(line);
      newLines.push('      unlimitedPlusPackages: [');
      i++; // Skip the next line (the [)
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





