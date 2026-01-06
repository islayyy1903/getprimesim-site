const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find all country entries
const countries = [];
const countryRegex = /{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",([\s\S]*?)(?={\s*id:|$)/g;

let match;
while ((match = countryRegex.exec(content)) !== null) {
  const countryId = match[1];
  const countryName = match[2];
  const countryContent = match[3];
  
  // Find country code from standard or unlimited lite packages
  let countryCode = null;
  
  // Try to find from standard packages
  const standardMatch = countryContent.match(/bundleId:\s*"esim_[^_]+_[^_]+_([A-Z]{2})_V2"/);
  if (standardMatch) {
    countryCode = standardMatch[1];
  } else {
    // Try unlimited lite
    const liteMatch = countryContent.match(/bundleId:\s*"esim_UL_[^_]+_([A-Z]{2})_V2"/);
    if (liteMatch) {
      countryCode = liteMatch[1];
    }
  }
  
  // Find unlimitedPlusPackages section
  const plusPackagesMatch = countryContent.match(/unlimitedPlusPackages:\s*\[([\s\S]*?)\],/);
  if (plusPackagesMatch && countryCode) {
    const packagesContent = plusPackagesMatch[1];
    
    // Find each package
    const packageRegex = /{\s*name:\s*"([^"]+)",\s*bundleId:\s*"([^"]+)",\s*data:\s*"([^"]+)",\s*validity:\s*"([^"]+)",\s*countries:\s*"([^"]+)",([\s\S]*?)\}/g;
    let pkgMatch;
    const packages = [];
    
    while ((pkgMatch = packageRegex.exec(packagesContent)) !== null) {
      const pkgName = pkgMatch[1];
      const bundleId = pkgMatch[2];
      const validity = pkgMatch[4];
      const pkgCountries = pkgMatch[5];
      const pkgRest = pkgMatch[6];
      
      // Extract days from validity
      const daysMatch = validity.match(/(\d+)\s+day/i);
      const days = daysMatch ? daysMatch[1] : '';
      const daysText = days === '1' ? '1 Day' : `${days} Days`;
      
      // Create correct values
      const correctName = `${countryName} – Unlimited Plus ${daysText}`;
      const correctBundleId = bundleId.replace(/_([A-Z]{2})_V2$/, `_${countryCode}_V2`);
      const correctCountries = countryName;
      
      packages.push({
        original: pkgMatch[0],
        name: correctName,
        bundleId: correctBundleId,
        validity: validity,
        countries: correctCountries,
        rest: pkgRest,
        data: pkgMatch[3]
      });
    }
    
    if (packages.length > 0) {
      countries.push({
        id: countryId,
        name: countryName,
        code: countryCode,
        packages: packages,
        fullMatch: match[0],
        packagesSection: plusPackagesMatch[0]
      });
    }
  }
}

// Now fix the content
let fixedCount = 0;
for (const country of countries) {
  let newPackagesContent = '[\n';
  
  for (const pkg of country.packages) {
    newPackagesContent += `        {\n`;
    newPackagesContent += `          name: "${pkg.name}",\n`;
    newPackagesContent += `          bundleId: "${pkg.bundleId}",\n`;
    newPackagesContent += `          data: "${pkg.data}",\n`;
    newPackagesContent += `          validity: "${pkg.validity}",\n`;
    newPackagesContent += `          countries: "${pkg.countries}",\n`;
    newPackagesContent += pkg.rest.trim();
    newPackagesContent += `\n        },\n`;
  }
  
  newPackagesContent += '      ],';
  
  // Replace in content
  const oldSection = country.packagesSection;
  if (oldSection !== newPackagesContent) {
    content = content.replace(oldSection, newPackagesContent);
    fixedCount += country.packages.length;
    console.log(`Fixed ${country.packages.length} packages for ${country.name} (${country.id})`);
  }
}

if (fixedCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\nTotal: Fixed ${fixedCount} packages`);
} else {
  console.log('No fixes needed');
}





