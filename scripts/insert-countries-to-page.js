const fs = require('fs');
const path = require('path');

// Generated countries JSON'unu oku
const generatedCountries = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'generated-countries.json'), 'utf8')
);

// TypeScript formatına çevir
function countryToTS(country) {
  const packagesTS = country.standardPackages.map(pkg => {
    return `        {
          name: "${pkg.name}",
          bundleId: "${pkg.bundleId}",
          data: "${pkg.data}",
          validity: "${pkg.validity}",
          countries: "${pkg.countries}",
          price: ${pkg.price},
          currency: "${pkg.currency}",
          popular: ${pkg.popular},
          badge: ${pkg.badge ? `"${pkg.badge}"` : 'null'},
          shortDescription: "${pkg.shortDescription}",
        }`;
  }).join(',\n');

  return `    {
      id: "${country.id}",
      name: "${country.name}",
      icon: "${country.icon}",
      color: "${country.color}",
      description: "${country.description}",
      standardPackages: [
${packagesTS}
      ],
      unlimitedLitePackages: [],
      unlimitedPlusPackages: [],
    }`;
}

// Tüm ülkeleri TypeScript formatına çevir
const countriesTS = generatedCountries.map(countryToTS).join(',\n');

// esim/page.tsx dosyasını oku
const pagePath = path.join(__dirname, '../app/esim/page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

// packageCategories array'inin sonunu bul (1912. satır civarı)
// "  ];" pattern'ini bul ve bundan önce yeni ülkeleri ekle
const arrayEndPattern = /(\s+)(\]);\s*\/\/ Flatten packages/s;

if (arrayEndPattern.test(pageContent)) {
  // Yeni ülkeleri ekle
  const replacement = `$1],\n${countriesTS}\n$1$2$3`;
  pageContent = pageContent.replace(arrayEndPattern, replacement);
  
  // Dosyayı yaz
  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log('✅ Countries added to app/esim/page.tsx');
  console.log(`✅ Added ${generatedCountries.length} countries`);
} else {
  console.error('❌ Could not find packageCategories array end pattern');
  console.log('Writing countries to separate file for manual insertion...');
  
  // Fallback: Separate file'a yaz
  const outputPath = path.join(__dirname, 'countries-to-insert.txt');
  fs.writeFileSync(outputPath, countriesTS, 'utf8');
  console.log(`✅ Countries written to ${outputPath}`);
  console.log('⚠️ Please manually insert these countries before the ]; that closes packageCategories array');
}

