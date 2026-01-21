const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Country ID to country code mapping
const countryCodeMap = {
  'antigua-and-barbuda': 'AG',
  'argentina': 'AR',
  'turkey': 'TR',
  'croatia': 'HR',
  // Add more as needed
};

// Find all country definitions
const countryPattern = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)",[\s\S]*?unlimitedPlusPackages:\s*\[([\s\S]*?)\],/g;

const issues = [];
let match;

while ((match = countryPattern.exec(content)) !== null) {
  const countryId = match[1];
  const countryName = match[2];
  const packagesContent = match[3];
  
  // Extract country code from countryId
  const countryCode = countryCodeMap[countryId] || countryId.split('-').map(w => w.charAt(0).toUpperCase()).join('').substring(0, 2);
  
  // Check each package - only Unlimited Plus packages
  const packagePattern = /name:\s*"([^"]+Unlimited Plus[^"]+)",\s*bundleId:\s*"([^"]+)",[\s\S]*?countries:\s*"([^"]+)",/g;
  let pkgMatch;
  
  while ((pkgMatch = packagePattern.exec(packagesContent)) !== null) {
    const pkgName = pkgMatch[1];
    const bundleId = pkgMatch[2];
    const pkgCountries = pkgMatch[3];
    
    // Check if package name contains correct country
    if (!pkgName.includes(countryName)) {
      issues.push({
        countryId,
        countryName,
        issue: 'Package name does not match country',
        packageName: pkgName,
        expected: countryName
      });
    }
    
    // Check if countries field matches
    if (pkgCountries !== countryName && !pkgCountries.includes(countryName)) {
      issues.push({
        countryId,
        countryName,
        issue: 'Countries field does not match',
        packageName: pkgName,
        found: pkgCountries,
        expected: countryName
      });
    }
    
    // Check bundleId country code (simplified check)
    const bundleIdCountryCode = bundleId.match(/_([A-Z]{2})_V2$/);
    if (bundleIdCountryCode) {
      const foundCode = bundleIdCountryCode[1];
      // This is a simplified check - we'd need full mapping
      if (foundCode === 'HR' && countryId !== 'croatia') {
        issues.push({
          countryId,
          countryName,
          issue: 'BundleId has wrong country code (HR)',
          packageName: pkgName,
          bundleId: bundleId
        });
      }
      if (foundCode === 'TR' && countryId !== 'turkey') {
        issues.push({
          countryId,
          countryName,
          issue: 'BundleId has wrong country code (TR)',
          packageName: pkgName,
          bundleId: bundleId
        });
      }
    }
  }
}

console.log('Found', issues.length, 'issues:');
issues.forEach((issue, i) => {
  console.log(`\n${i + 1}. ${issue.countryName} (${issue.countryId}):`);
  console.log(`   Issue: ${issue.issue}`);
  console.log(`   Package: ${issue.packageName}`);
  if (issue.bundleId) console.log(`   BundleId: ${issue.bundleId}`);
  if (issue.found) console.log(`   Found: ${issue.found}, Expected: ${issue.expected}`);
});

