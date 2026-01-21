const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

let fixes = 0;

// Fix 1: Find all ], followed by just [ (missing unlimitedPlusPackages:)
const pattern1 = /(\],\n\s+)\[/g;
let match;
const replacements = [];

while ((match = pattern1.exec(content)) !== null) {
  const before = content.substring(Math.max(0, match.index - 200), match.index);
  // Check if this is after unlimitedLitePackages and before unlimitedPlusPackages
  if (before.includes('unlimitedLitePackages') && !before.includes('unlimitedPlusPackages:')) {
    replacements.push({
      index: match.index,
      length: match[0].length,
      replacement: match[1] + 'unlimitedPlusPackages: ['
    });
  }
}

// Apply replacements in reverse order
replacements.reverse().forEach(rep => {
  content = content.substring(0, rep.index) + rep.replacement + content.substring(rep.index + rep.length);
  fixes++;
});

// Fix 2: Fix price formatting - price: should have proper indentation
const pricePattern = /(\n\s+countries:\s*"[^"]+",)\nprice:/g;
const priceMatches = content.match(pricePattern);
if (priceMatches) {
  content = content.replace(pricePattern, '$1\n          price:');
  fixes += priceMatches.length;
}

if (fixes > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${fixes} syntax errors`);
} else {
  console.log('No syntax errors found');
}





