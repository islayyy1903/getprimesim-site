const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/esim/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Country ID to ISO code mapping (we'll extract from bundleId pattern)
const countryCodePattern = /_([A-Z]{2})_V2$/;

// Find all country definitions with unlimitedPlusPackages
const countryPattern = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)",([\s\S]*?)(unlimitedPlusPackages:\s*\[)([\s\S]*?)(\],\s*\},)/g;

let match;
let fixes = 0;

while ((match = countryPattern.exec(content)) !== null) {
  const countryId = match[1];
  const countryName = match[2];
  const beforePackages = match[3];
  const packagesStart = match[4];
  let packagesContent = match[5];
  const afterPackages = match[6];
  
  // Find country code from standard packages or unlimited lite packages
  const standardMatch = beforePackages.match(/bundleId:\s*"esim_[^_]+_[^_]+_([A-Z]{2})_V2"/);
  const liteMatch = beforePackages.match(/bundleId:\s*"esim_UL_[^_]+_([A-Z]{2})_V2"/);
  const countryCode = standardMatch ? standardMatch[1] : (liteMatch ? liteMatch[1] : null);
  
  if (!countryCode) {
    console.log(`Warning: Could not find country code for ${countryName} (${countryId})`);
    continue;
  }
  
  // Fix each package in unlimitedPlusPackages
  const packagePattern = /(\{\s*name:\s*")([^"]+)(",\s*bundleId:\s*")([^"]+)(",[\s\S]*?countries:\s*")([^"]+)(",[\s\S]*?\})/g;
  let pkgMatch;
  let newPackagesContent = packagesContent;
  let packageFixes = 0;
  
  while ((pkgMatch = packagePattern.exec(packagesContent)) !== null) {
    const pkgStart = pkgMatch[1];
    const pkgName = pkgMatch[2];
    const bundleIdStart = pkgMatch[3];
    const bundleId = pkgMatch[4];
    const countriesStart = pkgMatch[5];
    const countries = pkgMatch[6];
    const pkgEnd = pkgMatch[7];
    
    // Extract days from bundleId
    const daysMatch = bundleId.match(/ULP_(\d+D)/);
    const days = daysMatch ? daysMatch[1] : '';
    
    // Fix package name
    const correctPkgName = `${countryName} – Unlimited Plus ${days.replace('D', ' Day').replace(/(\d+)D/, '$1 Days')}`;
    
    // Fix bundleId country code
    const correctBundleId = bundleId.replace(/_([A-Z]{2})_V2$/, `_${countryCode}_V2`);
    
    // Fix countries field
    const correctCountries = countryName;
    
    // Only fix if something is wrong
    if (pkgName !== correctPkgName || bundleId !== correctBundleId || countries !== correctCountries) {
      const oldPkg = pkgMatch[0];
      const newPkg = `${pkgStart}${correctPkgName}${bundleIdStart}${correctBundleId}${countriesStart}${correctCountries}${pkgEnd}`;
      newPackagesContent = newPackagesContent.replace(oldPkg, newPkg);
      packageFixes++;
    }
  }
  
  if (packageFixes > 0) {
    // Replace the packages content in the original content
    const oldSection = packagesStart + packagesContent + afterPackages;
    const newSection = packagesStart + newPackagesContent + afterPackages;
    content = content.replace(oldSection, newSection);
    fixes += packageFixes;
    console.log(`Fixed ${packageFixes} packages for ${countryName} (${countryId})`);
  }
}

if (fixes > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\nTotal: Fixed ${fixes} packages`);
} else {
  console.log('No fixes needed');
}





