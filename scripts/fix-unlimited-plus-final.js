const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix format issues first - replace standalone [ with unlimitedPlusPackages: [
content = content.replace(/\s+\[\s*$/gm, (match, offset) => {
  // Check if this is after unlimitedLitePackages
  const before = content.substring(Math.max(0, offset - 200), offset);
  if (before.includes('unlimitedLitePackages') && !before.includes('unlimitedPlusPackages')) {
    return match.replace('[', 'unlimitedPlusPackages: [');
  }
  return match;
});

// Now find and fix all countries
const countryRegex = /{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",([\s\S]*?)(?={\s*id:|$)/g;

let totalFixed = 0;
const fixes = [];

while ((match = countryRegex.exec(content)) !== null) {
  const countryId = match[1];
  const countryName = match[2];
  const countryContent = match[3];
  
  // Find country code
  let countryCode = null;
  const standardMatch = countryContent.match(/bundleId:\s*"esim_[^_]+_[^_]+_([A-Z]{2})_V2"/);
  if (standardMatch) {
    countryCode = standardMatch[1];
  } else {
    const liteMatch = countryContent.match(/bundleId:\s*"esim_UL_[^_]+_([A-Z]{2})_V2"/);
    if (liteMatch) {
      countryCode = liteMatch[1];
    }
  }
  
  if (!countryCode) continue;
  
  // Find unlimitedPlusPackages section
  const plusMatch = countryContent.match(/(unlimitedPlusPackages:\s*\[)([\s\S]*?)(\],)/);
  if (!plusMatch) continue;
  
  const packagesContent = plusMatch[2];
  
  // Find all packages
  const packageRegex = /{\s*name:\s*"([^"]+)",\s*bundleId:\s*"([^"]+)",\s*data:\s*"([^"]+)",\s*validity:\s*"([^"]+)",\s*countries:\s*"([^"]+)",([\s\S]*?)\}/g;
  const packages = [];
  let pkgMatch;
  
  while ((pkgMatch = packageRegex.exec(packagesContent)) !== null) {
    const validity = pkgMatch[4];
    const daysMatch = validity.match(/(\d+)\s+day/i);
    const days = daysMatch ? daysMatch[1] : '';
    const daysText = days === '1' ? '1 Day' : `${days} Days`;
    
    packages.push({
      name: `${countryName} – Unlimited Plus ${daysText}`,
      bundleId: pkgMatch[2].replace(/_([A-Z]{2})_V2$/, `_${countryCode}_V2`),
      data: pkgMatch[3],
      validity: validity,
      countries: countryName,
      rest: pkgMatch[6]
    });
  }
  
  if (packages.length > 0) {
    let newPackages = '[\n';
    packages.forEach((pkg, idx) => {
      newPackages += `        {\n`;
      newPackages += `          name: "${pkg.name}",\n`;
      newPackages += `          bundleId: "${pkg.bundleId}",\n`;
      newPackages += `          data: "${pkg.data}",\n`;
      newPackages += `          validity: "${pkg.validity}",\n`;
      newPackages += `          countries: "${pkg.countries}",\n`;
      newPackages += pkg.rest.trim();
      newPackages += `\n        }${idx < packages.length - 1 ? ',' : ''}\n`;
    });
    newPackages += '      ],';
    
    const oldSection = plusMatch[0];
    if (oldSection !== newPackages) {
      content = content.replace(oldSection, newPackages);
      totalFixed += packages.length;
      fixes.push(`${countryName}: ${packages.length} packages`);
    }
  }
}

if (totalFixed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${totalFixed} packages across ${fixes.length} countries`);
  console.log('Sample fixes:', fixes.slice(0, 10).join(', '));
} else {
  console.log('No fixes needed');
}





