const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../app/esim/page.tsx');
const content = fs.readFileSync(pagePath, 'utf8');

// Her ülke için unlimitedPlusPackages'ı kontrol et
const countryRegex = /{\s*id: "([^"]+)",\s*name: "([^"]+)",[\s\S]*?unlimitedPlusPackages: \[([\s\S]*?)\],/g;

const errors = [];
let match;

while ((match = countryRegex.exec(content)) !== null) {
  const countryId = match[1];
  const countryName = match[2];
  const packagesSection = match[3];
  
  // Her paketi kontrol et
  const packageRegex = /{\s*name: "([^"]+) – [^"]+",[\s\S]*?countries: "([^"]+)",/g;
  let pkgMatch;
  
  while ((pkgMatch = packageRegex.exec(packagesSection)) !== null) {
    const pkgName = pkgMatch[1];
    const pkgCountries = pkgMatch[2];
    
    // Eğer paket adındaki ülke ile countries field'ındaki ülke eşleşmiyorsa
    // ve countries field'ında countryName yoksa hata var
    if (pkgName !== countryName && !pkgCountries.includes(countryName)) {
      errors.push({
        countryId,
        countryName,
        pkgName,
        pkgCountries,
        line: content.substring(0, match.index).split('\n').length
      });
    }
  }
}

console.log(`Found ${errors.length} errors:\n`);
errors.forEach((error, index) => {
  console.log(`${index + 1}. Country: "${error.countryName}" (id: ${error.countryId})`);
  console.log(`   Package name: "${error.pkgName}"`);
  console.log(`   Package countries: "${error.pkgCountries}"`);
  console.log('');
});

if (errors.length > 0) {
  console.log('\n✅ Errors found. These need to be fixed.');
} else {
  console.log('\n✅ No errors found!');
}

