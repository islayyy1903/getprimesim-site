const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find all occurrences where we have ], followed by just [ (missing unlimitedPlusPackages:)
// Pattern: ],\n      [
const pattern = /(\],\n\s+)\[/g;
let matches = [];
let match;

while ((match = pattern.exec(content)) !== null) {
  // Check if the previous line doesn't already have unlimitedPlusPackages
  const before = content.substring(Math.max(0, match.index - 100), match.index);
  if (!before.includes('unlimitedPlusPackages:') && !before.includes('unlimitedLitePackages:')) {
    matches.push({
      index: match.index,
      length: match[0].length,
      replacement: match[1] + 'unlimitedPlusPackages: ['
    });
  }
}

// Apply fixes in reverse order to maintain indices
matches.reverse().forEach(fix => {
  content = content.substring(0, fix.index) + fix.replacement + content.substring(fix.index + fix.length);
});

// Also fix price formatting - price: should have proper indentation
content = content.replace(/(\n\s+countries:\s*"[^"]+",)\nprice:/g, '$1\n          price:');

if (matches.length > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${matches.length} missing unlimitedPlusPackages declarations`);
  console.log(`Fixed price formatting issues`);
} else {
  console.log('No fixes needed');
}





