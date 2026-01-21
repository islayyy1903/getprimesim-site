const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find all patterns where we have ], followed by just [ on next line
// This means unlimitedPlusPackages: is missing
const pattern = /(\],\n)(\s+)\[/g;
let matches = [];
let match;

while ((match = pattern.exec(content)) !== null) {
  // Check context - should be after unlimitedLitePackages
  const before = content.substring(Math.max(0, match.index - 300), match.index);
  if (before.includes('unlimitedLitePackages') && !before.includes('unlimitedPlusPackages:')) {
    matches.push({
      index: match.index,
      fullMatch: match[0],
      replacement: match[1] + match[2] + 'unlimitedPlusPackages: ['
    });
  }
}

// Apply fixes in reverse order
matches.reverse().forEach(fix => {
  content = content.substring(0, fix.index) + fix.replacement + content.substring(fix.index + fix.fullMatch.length);
});

if (matches.length > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${matches.length} missing unlimitedPlusPackages declarations`);
} else {
  console.log('No fixes needed');
}





